import { clamp, lerp, smoothstep } from './assert.ts';
import { createHeightfield, sampleHeight, type Heightfield } from './heightfield.ts';
import type { GridRef } from './model.ts';

export interface Bounds {
  readonly eMin: number;
  readonly eMax: number;
  readonly nMin: number;
  readonly nMax: number;
}

export interface LidarArea extends Bounds {
  readonly id: string;
  readonly name: string;
  readonly centre: GridRef;
}

export interface LidarTileInfo {
  readonly e: number;
  readonly n: number;
  readonly step: number;
  readonly offset: number;
  readonly bytes: number;
  readonly minHeight: number;
  readonly maxHeight: number;
  readonly areas: readonly string[];
}

export interface LidarManifest {
  readonly data: string;
  readonly tileSize: number;
  readonly heightScale: number;
  readonly blendMetres: number;
  readonly region: Bounds;
  readonly areas: readonly LidarArea[];
  readonly tiles: readonly LidarTileInfo[];
  readonly credit: string;
}

export interface Eye {
  readonly e: number;
  readonly n: number;
  readonly height: number;
}

export const LOD_STEPS: readonly number[] = [4, 10, 20];
export const RIM_SPACING = 40;

const BAND_EDGES: readonly number[] = [320, 850];
const HYSTERESIS = 0.15;
const RIM_EPSILON = 1e-6;
const CELL_STRIDE = 1 << 21;

export function tileKey(e: number, n: number): string {
  return `${String(e)}_${String(n)}`;
}

// The mesh step wanted at a distance from the eye, before the tile's own data limits it.
export function stepForDistance(distance: number): number {
  const band = BAND_EDGES.findIndex((edge) => distance < edge);
  return LOD_STEPS[band === -1 ? LOD_STEPS.length - 1 : band] ?? 20;
}

export function chooseStep(distance: number, tileStep: number, current?: number): number {
  let step = stepForDistance(distance);
  if (current !== undefined) {
    const finest = stepForDistance(distance * (1 - HYSTERESIS));
    const coarsest = stepForDistance(distance * (1 + HYSTERESIS));
    if (current >= finest && current <= coarsest) step = current;
  }
  return Math.max(step, tileStep);
}

// Every step a tile can be drawn at: each step the distance bands give, held to the tile's own data step.
export function drawnSteps(tileStep: number): number[] {
  return [...new Set(LOD_STEPS.map((s) => Math.max(s, tileStep)))];
}

export function tileDistance(tile: Bounds & { readonly maxHeight: number }, eye: Eye): number {
  const dx = Math.max(tile.eMin - eye.e, 0, eye.e - tile.eMax);
  const dn = Math.max(tile.nMin - eye.n, 0, eye.n - tile.nMax);
  const dh = Math.max(0, eye.height - tile.maxHeight);
  return Math.hypot(dx, dn, dh);
}

// A tile under a period ground edit is drawn as if this much nearer, so a terrace a few metres across is
// drawn at the finest step out to the second band's edge rather than smeared by a coarse one (ADR 0056).
export const EDITED_NEARER = (BAND_EDGES[0] ?? 320) / (BAND_EDGES[1] ?? 850);

export function planSteps(
  tiles: readonly LidarTileInfo[],
  size: number,
  eye: Eye,
  current: ReadonlyMap<string, number>,
  edited: ReadonlySet<string> = new Set(),
): Map<string, number> {
  const plan = new Map<string, number>();
  for (const t of tiles) {
    const key = tileKey(t.e, t.n);
    const distance = tileDistance(
      { eMin: t.e, eMax: t.e + size, nMin: t.n, nMax: t.n + size, maxHeight: t.maxHeight },
      eye,
    );
    const seen = edited.has(key) ? distance * EDITED_NEARER : distance;
    plan.set(key, chooseStep(seen, t.step, current.get(key)));
  }
  return plan;
}

export function insideBounds(b: Bounds, g: GridRef): boolean {
  return g.e >= b.eMin && g.e <= b.eMax && g.n >= b.nMin && g.n <= b.nMax;
}

// 0 on the rim of the region, easing to 1 a margin inside it.
export function rimWeight(g: GridRef, region: Bounds, margin: number): number {
  const inside = Math.min(g.e - region.eMin, region.eMax - g.e, g.n - region.nMin, region.nMax - g.n);
  return smoothstep(0, margin, inside);
}

// How far a point is from the rim, on whichever side it lies.
export function rimDistance(region: Bounds, g: GridRef): number {
  const dx = Math.max(region.eMin - g.e, 0, g.e - region.eMax);
  const dn = Math.max(region.nMin - g.n, 0, g.n - region.nMax);
  if (dx > 0 || dn > 0) return Math.hypot(dx, dn);
  return Math.min(g.e - region.eMin, region.eMax - g.e, g.n - region.nMin, region.nMax - g.n);
}

// Base points this close to the rim are dropped, so that every rim edge is an edge of the triangulation:
// the circle on a rim segment as its diameter then holds no other point.
export const RIM_CLEARANCE_M = RIM_SPACING * 0.55;

export function nearRim(region: Bounds, g: GridRef): boolean {
  return rimDistance(region, g) < RIM_CLEARANCE_M;
}

type Edge = 'south' | 'east' | 'north' | 'west';

// The base surface's heights at points spaced along the rim, joined by straight lines. The coarse
// terrain's triangles meet the rim along exactly these lines, so a detail mesh whose edge vertices
// take these heights meets them without a crack.
export class RimProfile {
  readonly points: readonly GridRef[];
  private readonly edges: Readonly<Record<Edge, readonly number[]>>;

  constructor(
    private readonly region: Bounds,
    private readonly spacing: number,
    baseAt: (g: GridRef) => number,
  ) {
    const width = region.eMax - region.eMin;
    const height = region.nMax - region.nMin;
    if (width % spacing !== 0 || height % spacing !== 0)
      throw new Error(`rim spacing ${String(spacing)} does not divide the region's edges`);
    const along = (length: number): number[] =>
      Array.from({ length: length / spacing + 1 }, (_, i) => i * spacing);
    const edgePoints = (edge: Edge): GridRef[] =>
      edge === 'south' || edge === 'north'
        ? along(width).map((d) => ({ e: region.eMin + d, n: edge === 'south' ? region.nMin : region.nMax }))
        : along(height).map((d) => ({ e: edge === 'west' ? region.eMin : region.eMax, n: region.nMin + d }));
    this.edges = {
      south: edgePoints('south').map(baseAt),
      east: edgePoints('east').map(baseAt),
      north: edgePoints('north').map(baseAt),
      west: edgePoints('west').map(baseAt),
    };
    const unique: GridRef[] = [];
    for (const edge of ['south', 'east', 'north', 'west'] as const) {
      for (const p of edgePoints(edge)) {
        if (!unique.some((q) => q.e === p.e && q.n === p.n)) unique.push(p);
      }
    }
    this.points = unique;
  }

  heightAt(g: GridRef): number | undefined {
    const r = this.region;
    const near = (a: number, b: number): boolean => Math.abs(a - b) < RIM_EPSILON;
    if (g.e < r.eMin - RIM_EPSILON || g.e > r.eMax + RIM_EPSILON) return undefined;
    if (g.n < r.nMin - RIM_EPSILON || g.n > r.nMax + RIM_EPSILON) return undefined;
    if (near(g.n, r.nMin)) return this.along('south', g.e - r.eMin);
    if (near(g.e, r.eMin)) return this.along('west', g.n - r.nMin);
    if (near(g.n, r.nMax)) return this.along('north', g.e - r.eMin);
    if (near(g.e, r.eMax)) return this.along('east', g.n - r.nMin);
    return undefined;
  }

  private along(edge: Edge, distance: number): number | undefined {
    const heights = this.edges[edge];
    const t = clamp(distance / this.spacing, 0, heights.length - 1);
    const i = Math.min(Math.floor(t), heights.length - 2);
    const a = heights[i];
    const b = heights[i + 1];
    if (a === undefined || b === undefined) return undefined;
    return lerp(a, b, t - i);
  }
}

// The ground where LiDAR tiles exist: the LiDAR heights, eased into the coarser surface at the rim.
export class DetailGround {
  private readonly fields = new Map<string, Heightfield>();
  private readonly byCell = new Map<number, Heightfield>();

  constructor(
    readonly manifest: LidarManifest,
    data: ReadonlyMap<string, Uint16Array>,
  ) {
    const size = manifest.tileSize;
    for (const t of manifest.tiles) {
      const key = tileKey(t.e, t.n);
      const samples = data.get(key);
      if (!samples) throw new Error(`no data for tile ${key}`);
      const side = size / t.step + 1;
      const field = createHeightfield(
        {
          originEasting: t.e - t.step / 2,
          originNorthing: t.n + size + t.step / 2,
          cellSize: t.step,
          width: side,
          height: side,
          heightScale: manifest.heightScale,
        },
        samples,
      );
      this.fields.set(key, field);
      this.byCell.set((t.e / size) * CELL_STRIDE + t.n / size, field);
    }
  }

  contains(g: GridRef): boolean {
    return insideBounds(this.manifest.region, g);
  }

  weightAt(g: GridRef): number {
    return rimWeight(g, this.manifest.region, this.manifest.blendMetres);
  }

  lidarAt(g: GridRef): number | undefined {
    if (!this.contains(g)) return undefined;
    const { tileSize, region } = this.manifest;
    const e = g.e === region.eMax ? g.e - tileSize : g.e;
    const n = g.n === region.nMax ? g.n - tileSize : g.n;
    const field = this.byCell.get(Math.floor(e / tileSize) * CELL_STRIDE + Math.floor(n / tileSize));
    return field ? sampleHeight(field, g) : undefined;
  }

  // Heights in metres of the (tileSize / step + 1) squared vertices of a tile, row by row from the
  // north-west corner. On the rim they take the rim profile; inside it they ease from the base
  // surface to the LiDAR; deeper in they are the LiDAR itself. `shape` then adjusts every vertex off
  // the rim (a carved river channel, a period's earthworks).
  tileHeights(
    tile: LidarTileInfo,
    step: number,
    baseAt: (g: GridRef) => number,
    rim: RimProfile,
    shape?: (g: GridRef, metres: number) => number,
  ): Float32Array {
    const { tileSize: size, heightScale, blendMetres, region } = this.manifest;
    const stride = step / tile.step;
    if (!Number.isInteger(stride) || stride < 1 || size % step !== 0)
      throw new Error(`tile ${tileKey(tile.e, tile.n)} has no data for a step of ${String(step)}m`);
    const field = this.fields.get(tileKey(tile.e, tile.n));
    if (!field) throw new Error(`no data for tile ${tileKey(tile.e, tile.n)}`);
    const side = size / step + 1;
    const stored = size / tile.step + 1;
    const deep =
      Math.min(
        tile.e - region.eMin,
        region.eMax - tile.e - size,
        tile.n - region.nMin,
        region.nMax - tile.n - size,
      ) >= blendMetres;
    const out = new Float32Array(side * side);
    for (let i = 0; i < side; i++) {
      for (let j = 0; j < side; j++) {
        const lidar = (field.data[i * stride * stored + j * stride] ?? 0) * heightScale;
        if (deep && !shape) {
          out[i * side + j] = lidar;
          continue;
        }
        const g = { e: tile.e + j * step, n: tile.n + size - i * step };
        const onRim = deep ? undefined : rim.heightAt(g);
        if (onRim !== undefined) {
          out[i * side + j] = onRim;
          continue;
        }
        const eased = deep ? lidar : lerp(baseAt(g), lidar, this.weightAt(g));
        out[i * side + j] = shape ? shape(g, eased) : eased;
      }
    }
    return out;
  }

  metresAt(g: GridRef, baseMetres: number): number {
    const w = this.weightAt(g);
    if (w <= 0) return baseMetres;
    const lidar = this.lidarAt(g);
    return lidar === undefined ? baseMetres : lerp(baseMetres, lidar, w);
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function positive(v: unknown, field: string): number {
  if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0)
    throw new Error(`lidar.json: ${field} is not a positive number`);
  return v;
}

function finite(v: unknown, field: string): number {
  if (typeof v !== 'number' || !Number.isFinite(v)) throw new Error(`lidar.json: ${field} is not a number`);
  return v;
}

function text(v: unknown, field: string): string {
  if (typeof v !== 'string') throw new Error(`lidar.json: ${field} is not a string`);
  return v;
}

function list(v: unknown, field: string): unknown[] {
  if (!Array.isArray(v)) throw new Error(`lidar.json: ${field} is not a list`);
  const out: unknown[] = v;
  return out;
}

function record(v: unknown, field: string): Record<string, unknown> {
  if (!isRecord(v)) throw new Error(`lidar.json: ${field} is not an object`);
  return v;
}

function bounds(v: unknown, field: string): Bounds {
  const r = record(v, field);
  return {
    eMin: finite(r['eMin'], `${field}.eMin`),
    eMax: finite(r['eMax'], `${field}.eMax`),
    nMin: finite(r['nMin'], `${field}.nMin`),
    nMax: finite(r['nMax'], `${field}.nMax`),
  };
}

export function parseManifest(raw: unknown): LidarManifest {
  if (!isRecord(raw)) throw new Error('lidar.json: the manifest is not an object');
  const tileSize = positive(raw['tileSize'], 'tileSize');
  const region = bounds(raw['region'], 'region');
  for (const v of [region.eMin, region.eMax, region.nMin, region.nMax]) {
    if (v % tileSize !== 0)
      throw new Error(`lidar.json: region is not a whole number of ${String(tileSize)}m tiles`);
  }
  const areas = list(raw['areas'], 'areas').map((a, i): LidarArea => {
    const r = record(a, `areas[${String(i)}]`);
    const centre = record(r['centre'], `areas[${String(i)}].centre`);
    return {
      ...bounds(r, `areas[${String(i)}]`),
      id: text(r['id'], 'area id'),
      name: text(r['name'], 'area name'),
      centre: { e: finite(centre['e'], 'centre.e'), n: finite(centre['n'], 'centre.n') },
    };
  });
  const seen = new Set<string>();
  const tiles = list(raw['tiles'], 'tiles').map((t, i): LidarTileInfo => {
    const r = record(t, `tiles[${String(i)}]`);
    const e = finite(r['e'], 'tile e');
    const n = finite(r['n'], 'tile n');
    const step = positive(r['step'], 'tile step');
    const key = tileKey(e, n);
    if (e % tileSize !== 0 || n % tileSize !== 0)
      throw new Error(`lidar.json: tile ${key} is not on the ${String(tileSize)}m grid`);
    if (e < region.eMin || e >= region.eMax || n < region.nMin || n >= region.nMax)
      throw new Error(`lidar.json: tile ${key} is outside the region`);
    if (tileSize % step !== 0)
      throw new Error(`lidar.json: tile ${key} step ${String(step)} does not divide ${String(tileSize)}`);
    if (seen.has(key)) throw new Error(`lidar.json: tile ${key} is listed twice`);
    seen.add(key);
    const offset = finite(r['offset'], 'tile offset');
    const bytes = finite(r['bytes'], 'tile bytes');
    const side = tileSize / step + 1;
    if (bytes !== side * side * 2)
      throw new Error(
        `lidar.json: tile ${key} has ${String(bytes)} bytes, expected ${String(side * side * 2)}`,
      );
    if (offset < 0 || offset % 2 !== 0)
      throw new Error(`lidar.json: tile ${key} offset ${String(offset)} is not even`);
    return {
      e,
      n,
      step,
      offset,
      bytes,
      minHeight: finite(r['minHeight'], 'tile minHeight'),
      maxHeight: finite(r['maxHeight'], 'tile maxHeight'),
      areas: list(r['areas'], 'tile areas').map((a) => text(a, 'tile area')),
    };
  });
  const expected = ((region.eMax - region.eMin) / tileSize) * ((region.nMax - region.nMin) / tileSize);
  if (tiles.length !== expected)
    throw new Error(`lidar.json: ${String(tiles.length)} tiles, but the region covers ${String(expected)}`);
  return {
    data: text(raw['data'], 'data'),
    tileSize,
    heightScale: positive(raw['heightScale'], 'heightScale'),
    blendMetres: positive(raw['blendMetres'], 'blendMetres'),
    region,
    areas,
    tiles,
    credit: text(record(raw['source'], 'source')['credit'], 'source.credit'),
  };
}

// Slices the data file, every tile's samples one after another, into a tile's samples by key.
export function tileData(manifest: LidarManifest, buffer: ArrayBuffer): Map<string, Uint16Array> {
  const expected = manifest.tiles.reduce((sum, t) => sum + t.bytes, 0);
  if (buffer.byteLength !== expected)
    throw new Error(
      `${manifest.data} is ${String(buffer.byteLength)} bytes, expected ${String(expected)} bytes`,
    );
  return new Map(
    manifest.tiles.map((t) => [tileKey(t.e, t.n), new Uint16Array(buffer, t.offset, t.bytes / 2)]),
  );
}
