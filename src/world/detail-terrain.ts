import { Mesh, VertexBuffer, VertexData, type Scene, type StandardMaterial } from './babylon.ts';
import { heightToWorld, toGrid, WORLD } from '../domain/geo.ts';
import {
  drawnSteps,
  planSteps,
  tileDistance,
  tileKey,
  type Bounds,
  type DetailGround,
  type Eye,
  type LidarTileInfo,
  type RimProfile,
} from '../domain/lidar.ts';
import type { GridRef } from '../domain/model.ts';
import { hash2 } from '../domain/noise.ts';
import { onRim, type RimBox } from '../domain/seam.ts';
import { tileGeometry, tileSurfaceAt } from '../domain/tilemesh.ts';
import {
  COVER_CODE,
  newScores,
  paint,
  ranksFor,
  scoreSurface,
  slopeOfGradient,
  terrainTriangles,
  type LandSurface,
  type MutableRgb,
  type PaintContext,
  type RankTables,
  type TerrainTriangles,
} from './landcover.ts';

// Ground cover is decided once per block, whatever step a tile is drawn at, so a tile changing
// step does not change its colours.
const BLOCK_M = 10;
// A skirt hangs from each tile's edge so that a neighbour at another step leaves no gap.
const SKIRT_M = 6;
const SKIRT_SHADE = 0.85;
// Once every tile is the step its distance wants and painted, a camera that has moved less than this
// is not looked at again.
const SETTLED_MOVE_M = 2;
// The random part of a block's cover score is shared by blocks this far apart, so that it makes
// clumps rather than a chequerboard where two covers meet.
const JITTER_CELL_M = 40;
// What a block is covered with follows the lie of the land over this many blocks each way, not the
// bumps between neighbouring blocks, or the covers dither where two meet. Whether it is bare rock
// follows the block's own slope.
const SCORE_SPAN_BLOCKS = 4;
// Each triangle's brightness varies a little, as the coarse terrain's do; finer facets vary less, or
// they read as grain.
const GRAIN_MIN = 0.01;
const GRAIN_PER_M = 0.004;
const GRAIN_MAX = 0.05;

export interface DetailDeps {
  readonly scene: Scene;
  readonly ground: DetailGround;
  readonly material: StandardMaterial;
  readonly baseMetres: (g: GridRef) => number;
  readonly metresAt: (g: GridRef) => number;
  readonly shape: (g: GridRef, metres: number) => number;
  readonly rim: RimProfile;
  readonly land: LandSurface;
  readonly ranks: RankTables;
  readonly onMesh: (mesh: Mesh, added: boolean) => void;
}

export interface DetailStats {
  readonly tiles: number;
  readonly resident: number;
  readonly byStep: Readonly<Record<string, number>>;
  readonly tileSteps: Readonly<Record<string, number>>;
  readonly triangles: number;
  readonly pending: number;
  readonly stale: number;
  readonly unpainted: number;
  readonly builds: number;
  readonly finestStep: number | undefined;
}

interface Blocks {
  readonly tris: TerrainTriangles;
  readonly colours: Float32Array;
  paintKey: string;
}

interface Resident {
  readonly info: LidarTileInfo;
  readonly step: number;
  readonly mesh: Mesh;
  readonly heights: Float32Array;
  readonly triangles: number;
  readonly groundTriangles: number;
  readonly jitter: Float32Array;
  readonly colours: Float32Array;
  paintKey: string;
  stale: boolean;
}

const heightsKey = (info: LidarTileInfo, step: number): string =>
  `${tileKey(info.e, info.n)}@${String(step)}`;

const SCRATCH: MutableRgb = { r: 0, g: 0, b: 0 };

export class DetailTerrain {
  private readonly resident = new Map<string, Resident>();
  private readonly blocks = new Map<string, Blocks>();
  private readonly heightsAt = new Map<string, Float32Array>();
  private readonly heightsWith = new Map<string, Float32Array>();
  private paintContext: PaintContext | undefined;
  private builds = 0;
  private pending = 0;
  private settledAt: Eye | undefined;
  // The tiles under a period ground edit drawn now, which take a finer step (ADR 0056).
  private edited: ReadonlySet<string> = new Set();

  private readonly infos = new Map<string, LidarTileInfo>();

  constructor(private readonly deps: DetailDeps) {
    for (const t of deps.ground.manifest.tiles) this.infos.set(tileKey(t.e, t.n), t);
  }

  // The land cover code of the 10m block at (e, n), for the paint now in force; undefined before
  // any paint is set.
  coverAt(e: number, n: number): number | undefined {
    const ctx = this.paintContext;
    const size = this.deps.ground.manifest.tileSize;
    const info = this.infos.get(tileKey(Math.floor(e / size) * size, Math.floor(n / size) * size));
    if (!ctx || !info) return undefined;
    const blocks = this.blocksFor(info);
    const perSide = size / BLOCK_M;
    const col = Math.min(perSide - 1, Math.floor((e - info.e) / BLOCK_M));
    const row = Math.min(perSide - 1, Math.floor((info.n + size - n) / BLOCK_M));
    return COVER_CODE[paint(blocks.tris, row * perSide + col, ctx, SCRATCH)];
  }

  // The height of the mesh now drawn at world (x, z): the resident tile at the step it is at.
  drawnAt(x: number, z: number): number | undefined {
    const info = this.tileAt(x, z);
    const r = info && this.resident.get(tileKey(info.e, info.n));
    return info && r ? this.surfaceIn(info, r.step, r.heights, x, z) : undefined;
  }

  // The height the tile under (x, z) would be drawn with at `step`, whether or not it is drawn so now.
  drawnAtStep(x: number, z: number, step: number): number | undefined {
    const info = this.tileAt(x, z);
    return info && step >= info.step
      ? this.surfaceIn(info, step, this.tileHeights(info, step), x, z)
      : undefined;
  }

  // The height a tile drawn at `step` would have with the ground edits behind `shape` (named by `key`) laid over
  // it, whatever is drawn now: what a ribbon built at start must lie on to meet the mesh once its edits are drawn.
  drawnWith(
    x: number,
    z: number,
    step: number,
    key: string,
    shape: (g: GridRef, metres: number) => number,
  ): number | undefined {
    const info = this.tileAt(x, z);
    if (!info || step < info.step) return undefined;
    const cacheKey = `${heightsKey(info, step)}#${key}`;
    let heights = this.heightsWith.get(cacheKey);
    if (!heights) {
      const { ground, baseMetres, rim } = this.deps;
      const metres = ground.tileHeights(info, step, baseMetres, rim, shape);
      heights = new Float32Array(metres.length);
      for (let i = 0; i < heights.length; i++) heights[i] = heightToWorld(metres[i] ?? 0);
      this.heightsWith.set(cacheKey, heights);
      console.info(`dewidebug detail heights with edits [${key}] tile ${heightsKey(info, step)} built`);
    }
    return this.surfaceIn(info, step, heights, x, z);
  }

  get built(): number {
    return this.builds;
  }

  setPaint(ctx: PaintContext): void {
    if (this.paintContext?.key !== ctx.key) this.settledAt = undefined;
    this.paintContext = ctx;
  }

  // Builds the tile meshes the eye now wants and repaints stale ones, nearest first, until the time
  // budget is spent (always doing at least one job). An infinite budget finishes everything. Answers the
  // tiles it built.
  update(eye: Eye, budgetMs: number): readonly LidarTileInfo[] {
    const settled = this.settledAt;
    if (
      settled &&
      Math.hypot(eye.e - settled.e, eye.n - settled.n, eye.height - settled.height) < SETTLED_MOVE_M
    )
      return [];
    const started = performance.now();
    const { manifest } = this.deps.ground;
    const current = new Map([...this.resident].map(([k, r]) => [k, r.step]));
    const plan = planSteps(manifest.tiles, manifest.tileSize, eye, current, this.edited);
    const todo: { info: LidarTileInfo; want: number; distance: number }[] = [];
    for (const info of manifest.tiles) {
      const key = tileKey(info.e, info.n);
      const want = plan.get(key);
      const have = this.resident.get(key);
      if (want === undefined || (have?.step === want && !have.stale)) continue;
      todo.push({ info, want, distance: this.distanceTo(info, eye) });
    }
    todo.sort((a, b) => a.distance - b.distance);
    this.pending = todo.length;
    const drawn: LidarTileInfo[] = [];
    let built = 0;
    for (const job of todo) {
      if (built > 0 && performance.now() - started > budgetMs) break;
      this.build(job.info, job.want);
      built++;
      drawn.push(job.info);
      this.pending--;
    }
    const repainted = this.repaint(eye, started, budgetMs, built === 0);
    const ctx = this.paintContext;
    const finished =
      this.pending === 0 && !!ctx && [...this.resident.values()].every((r) => r.paintKey === ctx.key);
    this.settledAt = finished ? eye : undefined;
    if (built === 0 && repainted === 0) return drawn;
    const stats = this.stats();
    console.info(
      `dewidebug detail update built=${String(built)} repainted=${String(repainted)} pending=${String(stats.pending)} unpainted=${String(stats.unpainted)} resident=${String(stats.resident)} steps=${JSON.stringify(stats.byStep)} tris=${String(stats.triangles)} eye=${Math.round(eye.e)},${Math.round(eye.n)} h=${Math.round(eye.height)}m in ${Math.round(performance.now() - started)}ms`,
    );
    return drawn;
  }

  // The corners (x, y, z triples) of the ground triangles, skirts left out, that lie on the box, for
  // checking the seam with the coarse terrain.
  rimVertices(box: RimBox): number[] {
    const out: number[] = [];
    for (const r of this.resident.values()) {
      const positions = r.mesh.getVerticesData(VertexBuffer.PositionKind);
      if (!positions) continue;
      for (let i = 0; i < r.groundTriangles * 9; i += 3) {
        const x = positions[i] ?? 0;
        const z = positions[i + 2] ?? 0;
        if (onRim(box, x, z)) out.push(x, positions[i + 1] ?? 0, z);
      }
    }
    return out;
  }

  // The ground changed under these areas: their tiles are rebuilt, at their present steps, as the
  // time budget allows.
  invalidate(areas: readonly Bounds[], edited: readonly Bounds[] = []): void {
    const size = this.deps.ground.manifest.tileSize;
    let marked = 0;
    this.edited = new Set(
      this.deps.ground.manifest.tiles
        .filter((t) =>
          edited.some((a) => t.e < a.eMax && t.e + size > a.eMin && t.n < a.nMax && t.n + size > a.nMin),
        )
        .map((t) => tileKey(t.e, t.n)),
    );
    for (const info of this.deps.ground.manifest.tiles) {
      const hit = areas.some(
        (a) => info.e < a.eMax && info.e + size > a.eMin && info.n < a.nMax && info.n + size > a.nMin,
      );
      if (!hit) continue;
      this.settledAt = undefined;
      this.blocks.delete(tileKey(info.e, info.n));
      for (const step of drawnSteps(info.step)) this.heightsAt.delete(heightsKey(info, step));
      const r = this.resident.get(tileKey(info.e, info.n));
      if (r) {
        r.stale = true;
        marked++;
      }
    }
    console.info(
      `dewidebug detail invalidate areas=${String(areas.length)} tiles marked stale=${String(marked)} drawn finer for their edits=${String(this.edited.size)}`,
    );
  }

  stats(): DetailStats {
    const byStep: Record<string, number> = {};
    const tileSteps: Record<string, number> = {};
    let triangles = 0;
    let unpainted = 0;
    for (const [key, r] of this.resident) {
      tileSteps[key] = r.step;
      byStep[String(r.step)] = (byStep[String(r.step)] ?? 0) + 1;
      triangles += r.triangles;
      if (r.paintKey !== this.paintContext?.key) unpainted++;
    }
    const steps = [...this.resident.values()].map((r) => r.step);
    return {
      tiles: this.deps.ground.manifest.tiles.length,
      resident: this.resident.size,
      byStep,
      tileSteps,
      triangles,
      pending: this.pending,
      stale: [...this.resident.values()].filter((r) => r.stale).length,
      unpainted,
      builds: this.builds,
      finestStep: steps.length > 0 ? Math.min(...steps) : undefined,
    };
  }

  dispose(): void {
    for (const r of this.resident.values()) this.drop(r);
    this.resident.clear();
  }

  private tileAt(x: number, z: number): LidarTileInfo | undefined {
    const g = toGrid({ x, z });
    const size = this.deps.ground.manifest.tileSize;
    return this.infos.get(tileKey(Math.floor(g.e / size) * size, Math.floor(g.n / size) * size));
  }

  private surfaceIn(
    info: LidarTileInfo,
    step: number,
    heights: Float32Array,
    x: number,
    z: number,
  ): number | undefined {
    const size = this.deps.ground.manifest.tileSize;
    return tileSurfaceAt(
      heights,
      size / step,
      step / WORLD.metresPerUnit,
      (info.e - WORLD.centre.e) / WORLD.metresPerUnit,
      (info.n + size - WORLD.centre.n) / WORLD.metresPerUnit,
      x,
      z,
    );
  }

  private tileHeights(info: LidarTileInfo, step: number): Float32Array {
    const key = heightsKey(info, step);
    const cached = this.heightsAt.get(key);
    if (cached) return cached;
    const { ground, baseMetres, rim, shape } = this.deps;
    const metres = ground.tileHeights(info, step, baseMetres, rim, shape);
    const heights = new Float32Array(metres.length);
    for (let i = 0; i < heights.length; i++) heights[i] = heightToWorld(metres[i] ?? 0);
    this.heightsAt.set(key, heights);
    return heights;
  }

  private distanceTo(info: LidarTileInfo, eye: Eye): number {
    const size = this.deps.ground.manifest.tileSize;
    return tileDistance(
      { eMin: info.e, eMax: info.e + size, nMin: info.n, nMax: info.n + size, maxHeight: info.maxHeight },
      eye,
    );
  }

  private drop(r: Resident): void {
    this.deps.onMesh(r.mesh, false);
    r.mesh.dispose();
  }

  private build(info: LidarTileInfo, step: number): void {
    const key = tileKey(info.e, info.n);
    const before = this.resident.get(key);
    const next = this.makeMesh(info, step);
    this.resident.set(key, next);
    this.deps.onMesh(next.mesh, true);
    if (before) this.drop(before);
    this.builds++;
    this.paintResident(next);
  }

  private makeMesh(info: LidarTileInfo, step: number): Resident {
    const started = performance.now();
    const { ground, scene } = this.deps;
    const size = ground.manifest.tileSize;
    const cells = size / step;
    const heights = this.tileHeights(info, step);
    const geometry = tileGeometry(
      heights,
      cells,
      step / WORLD.metresPerUnit,
      (info.e - WORLD.centre.e) / WORLD.metresPerUnit,
      (info.n + size - WORLD.centre.n) / WORLD.metresPerUnit,
      heightToWorld(SKIRT_M),
    );
    const grain = Math.min(GRAIN_MAX, GRAIN_MIN + step * GRAIN_PER_M);
    const jitter = new Float32Array(cells * cells * 2);
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        const e = info.e + j * step;
        const north = info.n + size - i * step;
        jitter[(i * cells + j) * 2] = 1 + (hash2(e, north, 5) - 0.5) * grain;
        jitter[(i * cells + j) * 2 + 1] = 1 + (hash2(e, north, 6) - 0.5) * grain;
      }
    }
    const colours = new Float32Array(geometry.triangles * 12).fill(0.5);
    const mesh = new Mesh(`detail-${tileKey(info.e, info.n)}-${String(step)}m`, scene);
    mesh.isUnIndexed = true;
    const data = new VertexData();
    data.positions = geometry.positions;
    data.normals = geometry.normals;
    data.applyToMesh(mesh, false);
    mesh.setVerticesData(VertexBuffer.ColorKind, colours, true);
    mesh.material = this.deps.material;
    mesh.useVertexColors = true;
    mesh.receiveShadows = true;
    mesh.isPickable = false;
    mesh.freezeWorldMatrix();
    console.info(
      `dewidebug detail mesh tile=${tileKey(info.e, info.n)} step=${String(step)}m tris=${String(geometry.triangles)} in ${(performance.now() - started).toFixed(1)}ms`,
    );
    return {
      info,
      step,
      mesh,
      heights,
      triangles: geometry.triangles,
      groundTriangles: geometry.groundTriangles,
      jitter,
      colours,
      paintKey: '',
      stale: false,
    };
  }

  private repaint(eye: Eye, started: number, budgetMs: number, forceOne: boolean): number {
    const ctx = this.paintContext;
    if (!ctx) return 0;
    const stale = [...this.resident.values()]
      .filter((r) => r.paintKey !== ctx.key)
      .map((r) => ({ r, d: this.distanceTo(r.info, eye) }))
      .sort((a, b) => a.d - b.d);
    let done = 0;
    for (const { r } of stale) {
      if ((done > 0 || !forceOne) && performance.now() - started > budgetMs) break;
      this.paintResident(r);
      done++;
    }
    return done;
  }

  private paintResident(r: Resident): void {
    const ctx = this.paintContext;
    if (!ctx) return;
    const blocks = this.blocksFor(r.info);
    if (blocks.paintKey !== ctx.key) this.paintBlocks(blocks, ctx);
    const size = this.deps.ground.manifest.tileSize;
    const n = size / r.step;
    const perSide = size / BLOCK_M;
    const c = r.colours;
    const bc = blocks.colours;
    const put = (tri: number, red: number, green: number, blue: number, shade: number): void => {
      const o = tri * 12;
      for (let v = 0; v < 3; v++) {
        c[o + v * 4] = red * shade;
        c[o + v * 4 + 1] = green * shade;
        c[o + v * 4 + 2] = blue * shade;
        c[o + v * 4 + 3] = 1;
      }
    };
    const block = (i: number, j: number): number => {
      const row = Math.min(perSide - 1, Math.floor(((i + 0.5) * r.step) / BLOCK_M));
      const col = Math.min(perSide - 1, Math.floor(((j + 0.5) * r.step) / BLOCK_M));
      return (row * perSide + col) * 3;
    };
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const b = block(i, j);
        const cell = i * n + j;
        const red = bc[b] ?? 0;
        const green = bc[b + 1] ?? 0;
        const blue = bc[b + 2] ?? 0;
        put(cell * 2, red, green, blue, r.jitter[cell * 2] ?? 1);
        put(cell * 2 + 1, red, green, blue, r.jitter[cell * 2 + 1] ?? 1);
      }
    }
    let tri = n * n * 2;
    const edge = (i: number, j: number): void => {
      const b = block(i, j);
      put(
        tri++,
        (bc[b] ?? 0) * SKIRT_SHADE,
        (bc[b + 1] ?? 0) * SKIRT_SHADE,
        (bc[b + 2] ?? 0) * SKIRT_SHADE,
        1,
      );
      put(
        tri++,
        (bc[b] ?? 0) * SKIRT_SHADE,
        (bc[b + 1] ?? 0) * SKIRT_SHADE,
        (bc[b + 2] ?? 0) * SKIRT_SHADE,
        1,
      );
    };
    for (let k = 0; k < n; k++) {
      edge(0, k);
      edge(n - 1, k);
      edge(k, 0);
      edge(k, n - 1);
    }
    r.mesh.updateVerticesData(VertexBuffer.ColorKind, c);
    r.paintKey = ctx.key;
  }

  private blocksFor(info: LidarTileInfo): Blocks {
    const key = tileKey(info.e, info.n);
    const cached = this.blocks.get(key);
    if (cached) return cached;
    const { ground, metresAt, land, ranks } = this.deps;
    const size = ground.manifest.tileSize;
    const perSide = size / BLOCK_M;
    const tris = terrainTriangles(perSide * perSide);
    const scores = newScores();
    const margin = SCORE_SPAN_BLOCKS;
    const wide = perSide + 2 * margin;
    const heights = new Float32Array(wide * wide);
    for (let gi = 0; gi < wide; gi++) {
      for (let gj = 0; gj < wide; gj++) {
        heights[gi * wide + gj] = metresAt({
          e: info.e + (gj - margin + 0.5) * BLOCK_M,
          n: info.n + size - (gi - margin + 0.5) * BLOCK_M,
        });
      }
    }
    const h = (row: number, col: number): number => heights[(row + margin) * wide + col + margin] ?? 0;
    for (let row = 0; row < perSide; row++) {
      for (let col = 0; col < perSide; col++) {
        const i = row * perSide + col;
        const e = info.e + (col + 0.5) * BLOCK_M;
        const n = info.n + size - (row + 0.5) * BLOCK_M;
        const hM = h(row, col);
        const { slope, north } = slopeOfGradient(
          (h(row, col + 1) - h(row, col - 1)) / (2 * BLOCK_M),
          (h(row - 1, col) - h(row + 1, col)) / (2 * BLOCK_M),
        );
        const reach = 2 * margin * BLOCK_M;
        const broad = slopeOfGradient(
          (h(row, col + margin) - h(row, col - margin)) / reach,
          (h(row - margin, col) - h(row + margin, col)) / reach,
        );
        scoreSurface(land, e, n, hM, broad.slope, false, scores, JITTER_CELL_M);
        const rank = ranksFor(scores, hM, ranks);
        tris.cx[i] = (e - WORLD.centre.e) / WORLD.metresPerUnit;
        tris.cz[i] = (n - WORLD.centre.n) / WORLD.metresPerUnit;
        tris.cy[i] = heightToWorld(hM);
        tris.heightM[i] = hM;
        tris.slope[i] = slope;
        tris.north[i] = north;
        tris.woodRank[i] = rank.wood;
        tris.farmRank[i] = rank.farm;
        tris.moorRank[i] = rank.moor;
        tris.floodplain[i] = scores.floodplain;
        tris.field[i] = scores.field;
        tris.shade[i] = 1;
        tris.mapped[i] = scores.mapped;
        tris.mix[i] = scores.mix;
      }
    }
    const made: Blocks = {
      tris,
      colours: new Float32Array(perSide * perSide * 3),
      paintKey: '',
    };
    this.blocks.set(key, made);
    return made;
  }

  private paintBlocks(blocks: Blocks, ctx: PaintContext): void {
    const out: MutableRgb = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < blocks.tris.count; i++) {
      paint(blocks.tris, i, ctx, out);
      blocks.colours[i * 3] = out.r;
      blocks.colours[i * 3 + 1] = out.g;
      blocks.colours[i * 3 + 2] = out.b;
    }
    blocks.paintKey = ctx.key;
  }
}
