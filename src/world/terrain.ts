import { Color3, Mesh, StandardMaterial, VertexBuffer, VertexData, type Scene } from './babylon.ts';
import Delaunator from 'delaunator';
import { hex, type Rgb } from '../domain/colour.ts';
import type { SeasonLook } from '../domain/daylight.ts';
import { heightToWorld, toGrid, toWorld, WORLD, type WorldBox } from '../domain/geo.ts';
import { sampleHeight, type Heightfield } from '../domain/heightfield.ts';
import {
  LOD_STEPS,
  RIM_SPACING,
  nearAnyRim,
  RimProfiles,
  type DetailGround,
  type Eye,
} from '../domain/lidar.ts';
import type { GridRef } from '../domain/model.ts';
import { hash2, rng } from '../domain/noise.ts';
import { densify, densifyWhere } from '../domain/polyline.ts';
import { carveChannel, RiverIndex } from '../domain/rivers.ts';
import { applyEdits, checkEdit, editsKey, type GroundEdit } from '../domain/groundedit.ts';
import { onRim, rimGap, rimTopology, type RimBox, type SeamReport } from '../domain/seam.ts';

// The seam of every region together (counts summed, the largest gap), and of each region by id.
export interface SeamReports extends SeamReport {
  readonly regions: Readonly<Record<string, SeamReport>>;
}
import type { Environment } from '../domain/state.ts';
import { Surface } from '../domain/surface.ts';
import { DetailTerrain, type DetailStats } from './detail-terrain.ts';
import {
  newScores,
  paint,
  paintContext,
  RankTable,
  scoreSurface,
  terrainTriangles,
  UPLAND_M,
  COVER_CODE,
  type Clearing,
  type LandSurface,
  type MutableRgb,
  type RankTables,
  type TerrainTriangles,
} from './landcover.ts';
import type { RiverLine } from '../platform/assets.ts';

const SPACING_M = 105;
const PLINTH_BOTTOM = -70;

export const MAIN_RIVERS: Readonly<Record<string, number>> = {
  'Afon Tywi': 42,
  'Afon Cothi': 28,
  'Afon Aman': 18,
  'Afon Llwchwr': 18,
  'Afon Sawdde': 16,
  'Afon Dulais': 15,
  'Afon Cennen': 15,
  'Afon Marlais': 13,
  'Afon Bran': 13,
  'Afon Dulas': 13,
};

export interface RiverPath {
  readonly name: string;
  readonly width: number;
  readonly points: readonly GridRef[];
  readonly levels: readonly number[];
}

// The one place that answers "how high is the ground here". The base surface is OS Terrain 50; where
// the LiDAR tiles reach, the LiDAR is eased into it. Everything that stands on the ground asks here.
export class Terrain {
  readonly mesh: Mesh;
  readonly plinth: Mesh;
  readonly tris: TerrainTriangles;
  readonly rivers: readonly RiverPath[];
  readonly cover: Uint8Array;
  readonly detail: DetailTerrain;
  private readonly colours: Float32Array;
  private readonly surface: Surface;
  private readonly land: LandSurface;
  private lastKey = '';
  private readonly drawnListeners: ((areas: readonly WorldBox[]) => void)[] = [];
  private edits: readonly GroundEdit[] = [];

  constructor(
    private readonly scene: Scene,
    private readonly heightfield: Heightfield,
    riverLines: readonly RiverLine[],
    woodland: Uint8Array,
    private readonly ground: DetailGround,
    onDetailMesh: (mesh: Mesh, added: boolean) => void,
  ) {
    const started = performance.now();
    if (woodland.length !== heightfield.meta.width * heightfield.meta.height) {
      throw new Error(
        `woodland.bin has ${woodland.length} cells, expected ${heightfield.meta.width * heightfield.meta.height}`,
      );
    }
    this.rivers = buildRiverPaths((g) => this.groundMetres(g), riverLines);
    const land: LandSurface = {
      heightfield,
      woodland,
      rivers: new RiverIndex(this.rivers),
    };
    this.land = land;
    const rim = new RimProfiles(ground.manifest.regions, RIM_SPACING, (g) => sampleHeight(heightfield, g));
    const { positions, tris, visible, ranks } = triangulate(land, this.rivers, ground, rim);
    this.tris = tris;
    this.cover = new Uint8Array(tris.count);
    this.colours = new Float32Array(tris.count * 12);
    this.mesh = new Mesh('terrain', scene);
    const data = new VertexData();
    data.positions = positions;
    data.indices = visible;
    const normals = new Float32Array(positions.length);
    VertexData.ComputeNormals(positions, visible, normals);
    data.normals = normals;
    data.colors = this.colours;
    data.applyToMesh(this.mesh, true);
    const mat = new StandardMaterial('terrain-mat', scene);
    mat.specularColor = new Color3(0.02, 0.02, 0.02);
    mat.diffuseColor = Color3.White();
    this.mesh.material = mat;
    this.mesh.useVertexColors = true;
    this.mesh.receiveShadows = true;
    this.mesh.isPickable = true;
    this.plinth = buildPlinth(scene, heightfield);
    this.surface = new Surface(visibleCorners(positions, visible));
    this.detail = new DetailTerrain({
      scene,
      ground,
      material: mat,
      baseMetres: (g) => sampleHeight(heightfield, g),
      metresAt: (g) => this.metresAt(g),
      shape: (g, metres) => this.shape(g, metres),
      rim,
      land,
      ranks,
      onMesh: onDetailMesh,
    });
    console.info(
      `dewidebug terrain mesh tris=${tris.count} drawn=${visible.length / 3} (rest lie under the LiDAR) rivers=${this.rivers.length} built in ${Math.round(performance.now() - started)}ms`,
    );
  }

  private groundMetres(g: GridRef): number {
    return this.ground.metresAt(g, sampleHeight(this.heightfield, g));
  }

  // Where the LiDAR reaches, the river channels are cut into the ground and the period's ground edits
  // laid over it, so the drawn surface and everything standing on it agree.
  private shape(g: GridRef, metres: number, edits: readonly GroundEdit[] = this.edits): number {
    if (!this.ground.contains(g)) return metres;
    const w = this.ground.weightAt(g);
    const channel = w > 0 ? this.land.rivers.channelAt(g.e, g.n) : undefined;
    const carved = channel ? carveChannel(metres, channel, w) : metres;
    return applyEdits(carved, g, edits);
  }

  metresAt(g: GridRef): number {
    return this.shape(g, this.groundMetres(g));
  }

  // The ground with `edits` laid over it instead of the ones drawn now: what a feature is built on, since it
  // is built once at start but drawn only in the years its own ground edits hold (ADR 0056).
  metresWith(g: GridRef, edits: readonly GroundEdit[]): number {
    return this.shape(g, this.groundMetres(g), edits);
  }

  // Where a feature built for `edits` stands, in world units: `surfaceAt` with those edits, whatever is drawn now.
  surfaceWith(x: number, z: number, edits: readonly GroundEdit[]): number {
    return this.inDetail(x, z)
      ? heightToWorld(this.metresWith(toGrid({ x, z }), edits))
      : this.surfaceAt(x, z);
  }

  // The mesh a tile at `step` would draw with `edits` laid over it, whatever is drawn now: where a road or ditch
  // built for those edits must lie to meet the mesh drawn once they are (a 4m mesh cannot follow a terrace's
  // batter as the smooth ground does). Outside the LiDAR region it is `surfaceAt`.
  meshWith(x: number, z: number, edits: readonly GroundEdit[], step: number): number {
    if (!this.inDetail(x, z)) return this.surfaceAt(x, z);
    return (
      this.detail.drawnWith(x, z, step, editsKey(edits), (g, metres) => this.shape(g, metres, edits)) ??
      this.surfaceWith(x, z, edits)
    );
  }

  setGroundEdits(edits: readonly GroundEdit[]): void {
    if (editsKey(edits) === editsKey(this.edits)) return;
    for (const e of edits) checkEdit(e, this.ground.manifest.regions, this.ground.manifest.blendMetres);
    const touched = [...this.edits, ...edits].map((e) => e.area);
    this.edits = edits;
    this.detail.invalidate(
      touched,
      edits.map((e) => e.area),
    );
    console.info(
      `dewidebug terrain ground edits now [${editsKey(edits)}] touching ${String(touched.length)} areas`,
    );
  }

  heightAt(g: GridRef): number {
    return heightToWorld(this.metresAt(g));
  }

  heightMetres(g: GridRef): number {
    return this.metresAt(g);
  }

  // Where things are placed: the base mesh's own triangles outside the LiDAR region, and inside it the
  // smooth ground from the 2m and 10m samples, which is not the mesh drawn there (that is cut at 4, 10 or
  // 20m by camera distance; see `drawnAt`).
  surfaceAt(x: number, z: number): number {
    if (this.inDetail(x, z)) return this.heightAt(toGrid({ x, z }));
    return this.surface.heightAt(x, z) ?? this.heightAt(toGrid({ x, z }));
  }

  // The height of the mesh drawn at world (x, z) at this moment: the resident LiDAR tile at the step it is
  // at inside the region, the base mesh outside it. Undefined inside the region before its tile is built.
  drawnAt(x: number, z: number): number | undefined {
    return this.inDetail(x, z) ? this.detail.drawnAt(x, z) : this.surfaceAt(x, z);
  }

  // The height the LiDAR tile under (x, z) would be drawn with at `step` metres.
  drawnAtStep(x: number, z: number, step: number): number | undefined {
    return this.detail.drawnAtStep(x, z, step);
  }

  // Where a road or rail ribbon is laid: on the mesh drawn inside the LiDAR region, which a ribbon follows
  // as its tile changes step (`onDrawnChange`), and on the ground outside it.
  ribbonGroundAt(x: number, z: number): number {
    const ground = this.heightAt(toGrid({ x, z }));
    return this.inDetail(x, z) ? (this.detail.drawnAt(x, z) ?? ground) : ground;
  }

  // Calls `listener` with the areas of the LiDAR tiles just redrawn, at a new step or after a ground edit.
  onDrawnChange(listener: (areas: readonly WorldBox[]) => void): void {
    this.drawnListeners.push(listener);
  }

  // The land cover code under a tree at world (x, z) that stands on base triangle `tri`: the detail
  // block's inside the LiDAR region, so trees stand on what the ground there is drawn as.
  coverAt(x: number, z: number, tri: number): number {
    if (this.inDetail(x, z)) {
      const g = toGrid({ x, z });
      const block = this.detail.coverAt(g.e, g.n);
      if (block !== undefined) return block;
    }
    return this.cover[tri] ?? 0;
  }

  // The line with a point every mesh step inside the LiDAR region, so a ribbon laid along it follows the
  // ground between its vertices rather than cutting a straight chord through the bumps.
  lineOnGround(points: readonly GridRef[]): GridRef[] {
    return densifyWhere(points, LOD_STEPS[0] ?? 4, (g) => this.ground.contains(g));
  }

  inDetail(x: number, z: number): boolean {
    return this.ground.contains(toGrid({ x, z }));
  }

  // How well the drawn LiDAR tiles meet the coarse terrain along the rim of each detail region.
  seam(): SeamReports {
    const mpu = WORLD.metresPerUnit;
    const positions = this.mesh.getVerticesData(VertexBuffer.PositionKind);
    const indices = this.mesh.getIndices();
    const corners: number[] = [];
    if (positions && indices) {
      for (const v of indices)
        corners.push(positions[v * 3] ?? 0, positions[v * 3 + 1] ?? 0, positions[v * 3 + 2] ?? 0);
    }
    const regions: Record<string, SeamReport> = {};
    for (const region of this.ground.manifest.regions) {
      const box: RimBox = {
        xMin: (region.eMin - WORLD.centre.e) / mpu,
        xMax: (region.eMax - WORLD.centre.e) / mpu,
        zMin: (region.nMin - WORLD.centre.n) / mpu,
        zMax: (region.nMax - WORLD.centre.n) / mpu,
      };
      const base: number[] = [];
      for (let i = 0; i + 2 < corners.length; i += 3) {
        const x = corners[i] ?? 0;
        const z = corners[i + 2] ?? 0;
        if (onRim(box, x, z)) base.push(x, corners[i + 1] ?? 0, z);
      }
      const topology = rimTopology(box, corners);
      const report: SeamReport = {
        ...rimGap(box, base, this.detail.rimVertices(box)),
        baseInside: topology.inside,
        rimEdges: topology.rimEdges,
      };
      regions[region.id] = report;
      console.info(
        `dewidebug terrain seam region=${region.id} base=${String(report.baseVertices)} detail=${String(report.detailVertices)} maxGap=${report.maxGap.toFixed(7)} unmatched=${String(report.unmatched)} baseInside=${String(report.baseInside)} rimEdges=${String(report.rimEdges)}`,
      );
    }
    const all = Object.values(regions);
    const sum = (k: 'baseVertices' | 'detailVertices' | 'unmatched' | 'baseInside' | 'rimEdges'): number =>
      all.reduce((n, r) => n + r[k], 0);
    return {
      baseVertices: sum('baseVertices'),
      detailVertices: sum('detailVertices'),
      maxGap: Math.max(0, ...all.map((r) => r.maxGap)),
      unmatched: sum('unmatched'),
      baseInside: sum('baseInside'),
      rimEdges: sum('rimEdges'),
      regions,
    };
  }

  updateDetail(eye: Eye, budgetMs: number): void {
    const built = this.detail.update(eye, budgetMs);
    if (built.length === 0) return;
    const size = this.ground.manifest.tileSize;
    const areas = built.map((t): WorldBox => {
      const nw = toWorld({ e: t.e, n: t.n + size });
      const se = toWorld({ e: t.e + size, n: t.n });
      return { xMin: nw.x, xMax: se.x, zMin: se.z, zMax: nw.z };
    });
    for (const listener of this.drawnListeners) listener(areas);
  }

  get detailBuilds(): number {
    return this.detail.built;
  }

  detailStats(): DetailStats {
    return this.detail.stats();
  }

  applyEnvironment(raw: Environment, look: SeasonLook, clearings: readonly Clearing[] = []): boolean {
    const ctx = paintContext(raw, look, clearings);
    if (ctx.key === this.lastKey) return false;
    this.lastKey = ctx.key;
    const started = performance.now();
    const t = this.tris;
    const c = this.colours;
    const col: MutableRgb = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < t.count; i++) {
      this.cover[i] = COVER_CODE[paint(t, i, ctx, col)];
      const o = i * 12;
      for (let v = 0; v < 3; v++) {
        c[o + v * 4] = col.r;
        c[o + v * 4 + 1] = col.g;
        c[o + v * 4 + 2] = col.b;
        c[o + v * 4 + 3] = 1;
      }
    }
    const computed = performance.now();
    this.mesh.updateVerticesData(VertexBuffer.ColorKind, c);
    const done = performance.now();
    this.detail.setPaint(ctx);
    console.info(
      `dewidebug terrain recolour key=${ctx.key.slice(0, 40)} tris=${String(t.count)} compute=${Math.round(computed - started)}ms upload=${Math.round(done - computed)}ms`,
    );
    return true;
  }

  dispose(): void {
    this.detail.dispose();
    this.mesh.dispose();
    this.plinth.dispose();
    this.scene.getMaterialByName('terrain-mat')?.dispose();
  }
}

function buildRiverPaths(metresAt: (g: GridRef) => number, lines: readonly RiverLine[]): RiverPath[] {
  const out: RiverPath[] = [];
  for (const line of lines) {
    const width = line.name ? MAIN_RIVERS[line.name] : undefined;
    if (width === undefined || !line.name) continue;
    const pts = densify(line.points, 45).filter(
      (p) => Math.hypot(p.e - WORLD.centre.e, p.n - WORLD.centre.n) < WORLD.radiusMetres - 60,
    );
    if (pts.length < 2) continue;
    const raw = pts.map((p) => lowestNear(metresAt, p, width * 0.6 + 40));
    const levels = raw.map((_, i) => {
      let min = Infinity;
      for (let k = Math.max(0, i - 3); k <= Math.min(raw.length - 1, i + 3); k++)
        min = Math.min(min, raw[k] ?? Infinity);
      return min;
    });
    out.push({ name: line.name, width, points: pts, levels });
  }
  return out;
}

function lowestNear(metresAt: (g: GridRef) => number, p: GridRef, r: number): number {
  let min = metresAt(p);
  for (let a = 0; a < 8; a++) {
    const ang = (a / 8) * Math.PI * 2;
    min = Math.min(min, metresAt({ e: p.e + Math.cos(ang) * r, n: p.n + Math.sin(ang) * r }));
  }
  return min;
}

interface Pt {
  x: number;
  z: number;
  hM: number;
  river: boolean;
}

function triangulate(
  land: LandSurface,
  rivers: readonly RiverPath[],
  ground: DetailGround,
  rim: RimProfiles,
): { positions: Float32Array; tris: TerrainTriangles; visible: Uint32Array; ranks: RankTables } {
  const hf = land.heightfield;
  const regions = ground.manifest.regions;
  const R = WORLD.radiusMetres;
  const pts: Pt[] = [];
  const random = rng(1282);
  const cell = SPACING_M;

  for (const river of rivers) {
    for (let i = 0; i < river.points.length; i += 1) {
      const p = river.points[i];
      const prev = river.points[Math.max(0, i - 1)];
      const next = river.points[Math.min(river.points.length - 1, i + 1)];
      const level = river.levels[i];
      if (!p || !prev || !next || level === undefined) continue;
      const dx = next.e - prev.e;
      const dn = next.n - prev.n;
      const len = Math.hypot(dx, dn) || 1;
      const nx = -dn / len;
      const nn = dx / len;
      const half = river.width / 2 + 10;
      if (i % 2 === 0) {
        for (const side of [-1, 1]) {
          const e = p.e + nx * half * side;
          const n = p.n + nn * half * side;
          if (nearAnyRim(regions, { e, n })) continue;
          pts.push({ x: e, z: n, hM: level + 0.4, river: true });
        }
      }
    }
  }

  for (let gz = -R; gz <= R; gz += cell) {
    for (let gx = -R; gx <= R; gx += cell) {
      const x = gx + (random() - 0.5) * cell * 0.7;
      const z = gz + (random() - 0.5) * cell * 0.7;
      if (x * x + z * z > (R - cell * 0.5) ** 2) continue;
      const e = WORLD.centre.e + x;
      const n = WORLD.centre.n + z;
      if (land.rivers.near(e, n) && land.rivers.distance(e, n, 200) < cell * 0.55) continue;
      if (nearAnyRim(regions, { e, n })) continue;
      pts.push({ x: e, z: n, hM: sampleHeight(hf, { e, n }), river: false });
    }
  }
  const ringCount = Math.round((2 * Math.PI * R) / (cell * 0.8));
  for (let i = 0; i < ringCount; i++) {
    const a = (i / ringCount) * Math.PI * 2;
    const e = WORLD.centre.e + Math.cos(a) * R;
    const n = WORLD.centre.n + Math.sin(a) * R;
    pts.push({ x: e, z: n, hM: sampleHeight(hf, { e, n }), river: false });
  }
  for (const p of rim.points) pts.push({ x: p.e, z: p.n, hM: sampleHeight(hf, p), river: false });

  const coords = new Float64Array(pts.length * 2);
  pts.forEach((p, i) => {
    coords[i * 2] = p.x;
    coords[i * 2 + 1] = p.z;
  });
  const del = new Delaunator(coords);
  const triIdx = del.triangles;
  const count = triIdx.length / 3;
  const positions = new Float32Array(count * 9);
  const tris = terrainTriangles(count);
  const woodScore = new Float32Array(count);
  const farmScore = new Float32Array(count);
  const moorScore = new Float32Array(count);
  const lowland: number[] = [];
  const upland: number[] = [];
  const drawn: number[] = [];
  const scores = newScores();

  for (let t = 0; t < count; t++) {
    const ia = triIdx[t * 3] ?? 0;
    const ib = triIdx[t * 3 + 2] ?? 0;
    const ic = triIdx[t * 3 + 1] ?? 0;
    const A = pts[ia];
    const B = pts[ib];
    const C = pts[ic];
    if (!A || !B || !C) continue;
    const verts = [A, B, C];
    let sy = 0;
    verts.forEach((p, v) => {
      const o = t * 9 + v * 3;
      const wx = (p.x - WORLD.centre.e) / WORLD.metresPerUnit;
      const wz = (p.z - WORLD.centre.n) / WORLD.metresPerUnit;
      const wy = heightToWorld(p.hM);
      positions[o] = wx;
      positions[o + 1] = wy;
      positions[o + 2] = wz;
      sy += wy;
    });
    const ex = (A.x + B.x + C.x) / 3;
    const ez = (A.z + B.z + C.z) / 3;
    const hM = (A.hM + B.hM + C.hM) / 3;
    if (!ground.contains({ e: ex, n: ez })) drawn.push(t * 3, t * 3 + 1, t * 3 + 2);
    tris.cx[t] = (ex - WORLD.centre.e) / WORLD.metresPerUnit;
    tris.cz[t] = (ez - WORLD.centre.n) / WORLD.metresPerUnit;
    tris.cy[t] = sy / 3;
    tris.heightM[t] = hM;
    const ux = B.x - A.x;
    const uy = (B.hM - A.hM) * WORLD.verticalExaggeration;
    const uz = B.z - A.z;
    const vx = C.x - A.x;
    const vy = (C.hM - A.hM) * WORLD.verticalExaggeration;
    const vz = C.z - A.z;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const nl = Math.hypot(nx, ny, nz) || 1;
    const slope = 1 - Math.abs(ny / nl);
    tris.slope[t] = slope;
    tris.north[t] = (ny < 0 ? -nz : nz) / nl;
    scoreSurface(land, ex, ez, hM, slope, A.river || B.river || C.river, scores);
    tris.shade[t] = scores.shade;
    tris.mapped[t] = scores.mapped;
    tris.mix[t] = scores.mix;
    tris.floodplain[t] = scores.floodplain;
    tris.field[t] = scores.field;
    woodScore[t] = scores.woodScore;
    farmScore[t] = scores.farmScore;
    moorScore[t] = scores.moorScore;
    (hM < UPLAND_M ? lowland : upland).push(t);
  }
  rank(lowland, woodScore, tris.woodRank);
  rank(upland, woodScore, tris.woodRank);
  rank(lowland, farmScore, tris.farmRank);
  rank(upland, moorScore, tris.moorRank);
  const pick = (ids: readonly number[], score: Float32Array): RankTable =>
    new RankTable(ids.map((id) => score[id] ?? 0));
  const ranks: RankTables = {
    lowWood: pick(lowland, woodScore),
    highWood: pick(upland, woodScore),
    lowFarm: pick(lowland, farmScore),
    highMoor: pick(upland, moorScore),
  };
  return { positions, tris, visible: Uint32Array.from(drawn), ranks };
}

function rank(ids: readonly number[], score: Float32Array, out: Float32Array): void {
  const sorted = [...ids].sort((a, b) => (score[a] ?? 0) - (score[b] ?? 0));
  const n = Math.max(1, sorted.length - 1);
  sorted.forEach((id, i) => {
    out[id] = i / n;
  });
}

// The corners of just the triangles that are drawn, three vertices each, for the surface lookup.
function visibleCorners(positions: Float32Array, visible: Uint32Array): Float32Array {
  const out = new Float32Array(visible.length * 3);
  for (let i = 0; i < visible.length; i++) {
    const v = (visible[i] ?? 0) * 3;
    out[i * 3] = positions[v] ?? 0;
    out[i * 3 + 1] = positions[v + 1] ?? 0;
    out[i * 3 + 2] = positions[v + 2] ?? 0;
  }
  return out;
}

function buildPlinth(scene: Scene, hf: Heightfield): Mesh {
  const R = WORLD.radiusMetres;
  const segments = 360;
  const bands: readonly { depth: number; colour: Rgb }[] = [
    { depth: 0, colour: hex('#7a5a42') },
    { depth: 6, colour: hex('#8c5a4a') },
    { depth: 18, colour: hex('#9a7a5c') },
    { depth: 34, colour: hex('#6d6a72') },
    { depth: 1000, colour: hex('#807b76') },
  ];
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  let v = 0;
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const p0 = { x: Math.cos(a0) * R, z: Math.sin(a0) * R };
    const p1 = { x: Math.cos(a1) * R, z: Math.sin(a1) * R };
    const top0 = heightToWorld(
      sampleHeight(hf, toGrid({ x: p0.x / WORLD.metresPerUnit, z: p0.z / WORLD.metresPerUnit })),
    );
    const top1 = heightToWorld(
      sampleHeight(hf, toGrid({ x: p1.x / WORLD.metresPerUnit, z: p1.z / WORLD.metresPerUnit })),
    );
    for (let b = 0; b < bands.length - 1; b++) {
      const band = bands[b];
      const nextBand = bands[b + 1];
      if (!band || !nextBand) continue;
      const y00 = Math.max(PLINTH_BOTTOM, top0 - band.depth);
      const y01 = Math.max(PLINTH_BOTTOM, top1 - band.depth);
      const y10 = Math.max(PLINTH_BOTTOM, top0 - nextBand.depth);
      const y11 = Math.max(PLINTH_BOTTOM, top1 - nextBand.depth);
      if (y00 === y10 && y01 === y11) continue;
      const quad = [
        [p0.x, y00, p0.z],
        [p1.x, y01, p1.z],
        [p1.x, y11, p1.z],
        [p0.x, y10, p0.z],
      ];
      for (const q of quad) {
        positions.push((q[0] ?? 0) / WORLD.metresPerUnit, q[1] ?? 0, (q[2] ?? 0) / WORLD.metresPerUnit);
        const shade = 0.92 + hash2(i, b, 4) * 0.08;
        colors.push(band.colour.r * shade, band.colour.g * shade, band.colour.b * shade, 1);
      }
      indices.push(v, v + 1, v + 2, v, v + 2, v + 3);
      v += 4;
    }
  }
  const centre = v;
  positions.push(0, PLINTH_BOTTOM, 0);
  colors.push(0.43, 0.42, 0.45, 1);
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    positions.push(
      (Math.cos(a) * R) / WORLD.metresPerUnit,
      PLINTH_BOTTOM,
      (Math.sin(a) * R) / WORLD.metresPerUnit,
    );
    colors.push(0.43, 0.42, 0.45, 1);
  }
  for (let i = 0; i < segments; i++) indices.push(centre, centre + 1 + ((i + 1) % segments), centre + 1 + i);
  const mesh = new Mesh('plinth', scene);
  const data = new VertexData();
  data.positions = positions;
  data.indices = indices;
  data.colors = colors;
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);
  data.normals = normals;
  data.applyToMesh(mesh);
  const mat = new StandardMaterial('plinth-mat', scene);
  mat.specularColor = Color3.Black();
  mat.emissiveColor = new Color3(0.22, 0.2, 0.19);
  mat.backFaceCulling = false;
  mesh.material = mat;
  mesh.useVertexColors = true;
  mesh.convertToFlatShadedMesh();
  mesh.isPickable = false;
  return mesh;
}
