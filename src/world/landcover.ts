import { clamp, smoothstep } from '../domain/assert.ts';
import { hex, type Rgb } from '../domain/colour.ts';
import { seasonKey, snowCover, type SeasonLook } from '../domain/daylight.ts';
import { WORLD } from '../domain/geo.ts';
import type { Heightfield } from '../domain/heightfield.ts';
import { fbm, hash2 } from '../domain/noise.ts';
import type { RiverIndex } from '../domain/rivers.ts';
import type { Environment } from '../domain/state.ts';

export const UPLAND_M = 290;

const PALETTE = {
  pasture: hex('#8fae6a'),
  meadow: hex('#86ab66'),
  meadowWet: hex('#7ea465'),
  grass: hex('#a3b27a'),
  scrub: hex('#97aa70'),
  wood: hex('#5f7f4c'),
  woodDark: hex('#557446'),
  moor: hex('#b9ab7c'),
  heather: hex('#a39487'),
  uplandGrass: hex('#b3b584'),
  rock: hex('#9c978d'),
  tundra: hex('#b8b08e'),
  snow: hex('#eef1f3'),
} as const;

const FIELD_COLOURS: readonly Rgb[] = [
  '#9fb873',
  '#a9bd7b',
  '#93b16d',
  '#a2b674',
  '#b8b77a',
  '#9cb56f',
  '#c2b280',
].map(hex);

export interface TerrainTriangles {
  readonly count: number;
  readonly cx: Float32Array;
  readonly cz: Float32Array;
  readonly cy: Float32Array;
  readonly heightM: Float32Array;
  readonly slope: Float32Array;
  readonly woodRank: Float32Array;
  readonly farmRank: Float32Array;
  readonly moorRank: Float32Array;
  readonly floodplain: Uint8Array;
  readonly field: Uint16Array;
  readonly shade: Float32Array;
  readonly mapped: Uint8Array;
  readonly mix: Float32Array;
  readonly north: Float32Array;
}

export function terrainTriangles(count: number): TerrainTriangles {
  return {
    count,
    cx: new Float32Array(count),
    cz: new Float32Array(count),
    cy: new Float32Array(count),
    heightM: new Float32Array(count),
    slope: new Float32Array(count),
    woodRank: new Float32Array(count),
    farmRank: new Float32Array(count),
    moorRank: new Float32Array(count),
    floodplain: new Uint8Array(count),
    field: new Uint16Array(count),
    shade: new Float32Array(count),
    mapped: new Uint8Array(count),
    mix: new Float32Array(count),
    north: new Float32Array(count),
  };
}

export type LandCover = 'wood' | 'farm' | 'meadow' | 'moor' | 'grass' | 'rock';

export interface Clearing {
  readonly x: number;
  readonly z: number;
  readonly radius: number;
}

export const COVER_CODE: Readonly<Record<LandCover, number>> = {
  wood: 1,
  farm: 2,
  meadow: 3,
  moor: 4,
  grass: 5,
  rock: 6,
};

export interface MutableRgb {
  r: number;
  g: number;
  b: number;
}

// Everything that decides what a patch of ground looks like at one moment: the environment, the
// season, and the clearings round features. Painting a triangle or a detail block reads only this.
export interface PaintContext {
  readonly env: Environment;
  readonly look: SeasonLook;
  readonly farmShare: number;
  readonly cold: number;
  readonly clearings: readonly Clearing[];
  readonly key: string;
}

const STEPS = 48;

function q(v: number): number {
  return Math.round(v * STEPS) / STEPS;
}

function quantise(env: Environment): Environment {
  return {
    ...env,
    forest: q(env.forest),
    farmland: q(env.farmland),
    moor: q(env.moor),
    mappedWoodland: q(env.mappedWoodland),
  };
}

export function paintContext(
  raw: Environment,
  look: SeasonLook,
  clearings: readonly Clearing[],
): PaintContext {
  const env = quantise(raw);
  const key = `${seasonKey(look)}|${env.forest}|${env.farmland}|${env.moor}|${env.mappedWoodland}|${clearings.map((c) => `${Math.round(c.x)},${Math.round(c.z)},${Math.round(c.radius)}`).join(';')}`;
  return {
    env,
    look,
    farmShare: env.farmland / Math.max(0.0001, 1 - env.forest),
    cold: 1 - smoothstep(0.04, 0.2, env.forest),
    clearings,
    key,
  };
}

// Classifies triangle `i` for the paint context, writes its colour to `out` and returns its cover.
export function paint(t: TerrainTriangles, i: number, p: PaintContext, out: MutableRgb): LandCover {
  let cover = classify(t, i, p.env, p.farmShare);
  if (cover === 'wood' && p.clearings.length > 0) {
    const cx = t.cx[i] ?? 0;
    const cz = t.cz[i] ?? 0;
    for (const cl of p.clearings) {
      const d = Math.hypot(cx - cl.x, cz - cl.z);
      if (d < cl.radius * (0.75 + (t.mix[i] ?? 0) * 0.5)) {
        cover = (t.heightM[i] ?? 0) >= UPLAND_M ? 'grass' : 'farm';
        break;
      }
    }
  }
  colourInto(out, t, i, cover, p.env, p.cold);
  seasonInto(out, t, i, cover, p.look);
  return cover;
}

function classify(t: TerrainTriangles, i: number, env: Environment, farmShare: number): LandCover {
  const slope = t.slope[i] ?? 0;
  const h = t.heightM[i] ?? 0;
  if (slope > 0.62) return 'rock';
  const useMap = (t.mix[i] ?? 1) < env.mappedWoodland;
  const wood = useMap ? ((t.mapped[i] ?? 0) === 1 ? 1 : 0) : (t.woodRank[i] ?? 0);
  if (useMap && wood === 1) return 'wood';
  if (h >= UPLAND_M) {
    const treeLine = UPLAND_M + (h > 520 ? 0 : 230) * env.forest;
    if (!useMap && h < treeLine && wood > 1 - env.forest * 0.85) return 'wood';
    if ((t.moorRank[i] ?? 0) > 1 - env.moor) return 'moor';
    return 'grass';
  }
  if ((t.floodplain[i] ?? 0) === 1 && env.forest < 0.75) return 'meadow';
  if (!useMap && wood > 1 - env.forest) return 'wood';
  if ((t.farmRank[i] ?? 0) > 1 - farmShare) return 'farm';
  return 'grass';
}

function set(out: MutableRgb, c: Rgb): void {
  out.r = c.r;
  out.g = c.g;
  out.b = c.b;
}

function blend(out: MutableRgb, c: Rgb, t: number): void {
  out.r += (c.r - out.r) * t;
  out.g += (c.g - out.g) * t;
  out.b += (c.b - out.b) * t;
}

function colourInto(
  out: MutableRgb,
  t: TerrainTriangles,
  i: number,
  cover: LandCover,
  env: Environment,
  cold: number,
): void {
  const shade = t.shade[i] ?? 1;
  const h = t.heightM[i] ?? 0;
  switch (cover) {
    case 'rock':
      set(out, PALETTE.rock);
      break;
    case 'wood':
      set(out, PALETTE.wood);
      blend(out, PALETTE.woodDark, (t.woodRank[i] ?? 0) * 0.8);
      break;
    case 'farm':
      set(out, FIELD_COLOURS[(t.field[i] ?? 0) % FIELD_COLOURS.length] ?? PALETTE.pasture);
      blend(out, PALETTE.pasture, 0.25);
      break;
    case 'meadow':
      set(out, PALETTE.meadow);
      blend(out, PALETTE.meadowWet, shade - 0.975);
      break;
    case 'moor':
      set(out, PALETTE.moor);
      blend(out, PALETTE.heather, smoothstep(0.4, 0.8, t.moorRank[i] ?? 0) * 0.5);
      blend(out, PALETTE.tundra, cold);
      break;
    case 'grass':
      set(out, PALETTE.grass);
      blend(out, PALETTE.scrub, 1 - env.farmland);
      blend(out, PALETTE.uplandGrass, smoothstep(UPLAND_M - 60, UPLAND_M + 120, h));
      blend(out, PALETTE.tundra, cold * 0.85);
      break;
  }
  out.r *= shade;
  out.g *= shade;
  out.b *= shade;
}

function seasonInto(
  out: MutableRgb,
  t: TerrainTriangles,
  i: number,
  cover: LandCover,
  look: SeasonLook,
): void {
  const shade = t.shade[i] ?? 1;
  const tint = (c: Rgb, amount: number): void => {
    blend(out, { r: c.r * shade, g: c.g * shade, b: c.b * shade }, amount);
  };
  switch (cover) {
    case 'wood':
      tint(look.woodFloor, look.woodFloorAmount);
      break;
    case 'farm':
      tint(look.grass, look.grassAmount * 0.7);
      if (((t.field[i] ?? 0) % 97) / 97 < look.fieldShare) tint(look.fields, 0.55);
      break;
    case 'meadow':
    case 'grass':
      tint(look.grass, look.grassAmount);
      break;
    case 'moor':
      tint(look.moor, look.moorAmount);
      break;
    case 'rock':
      break;
  }
  const snow = snowCover(look, t.heightM[i] ?? 0, t.north[i] ?? 0, t.mix[i] ?? 0.5);
  if (snow > 0) blend(out, PALETTE.snow, snow * (cover === 'wood' ? 0.6 : 1));
}

export interface LandSurface {
  readonly heightfield: Heightfield;
  readonly woodland: Uint8Array;
  readonly rivers: RiverIndex;
}

export interface Scores {
  woodScore: number;
  farmScore: number;
  moorScore: number;
  floodplain: number;
  field: number;
  shade: number;
  mapped: number;
  mix: number;
  jitter: number;
}

export function newScores(): Scores {
  return {
    woodScore: 0,
    farmScore: 0,
    moorScore: 0,
    floodplain: 0,
    field: 0,
    shade: 1,
    mapped: 0,
    mix: 0,
    jitter: 0,
  };
}

// The slope (0 flat, towards 1 vertical) and the northward lean of a surface from its gradient in
// metres of height per metre of ground east and north, with the world's vertical exaggeration.
export function slopeOfGradient(dhdE: number, dhdN: number): { slope: number; north: number } {
  const lean = WORLD.verticalExaggeration * dhdN;
  const length = Math.hypot(WORLD.verticalExaggeration * dhdE, 1, lean);
  return { slope: 1 - 1 / length, north: -lean / length };
}

// What a patch of ground at (ex, ez) metres, `hM` metres high and with this slope, scores for each
// kind of cover. Base triangles and detail blocks both go through here, so they read alike.
export function scoreSurface(
  land: LandSurface,
  ex: number,
  ez: number,
  hM: number,
  slope: number,
  riverSide: boolean,
  out: Scores,
  jitterCell = 1,
): void {
  const hf = land.heightfield;
  const large = fbm(ex / 2600, ez / 2600, 4, 7);
  const medium = fbm(ex / 700, ez / 700, 3, 11);
  const jitter = hash2(Math.round(ex / jitterCell), Math.round(ez / jitterCell), 3);
  out.jitter = jitter;
  out.shade = 0.975 + jitter * 0.05;
  const col = Math.floor((ex - hf.meta.originEasting) / hf.meta.cellSize);
  const row = Math.floor((hf.meta.originNorthing - ez) / hf.meta.cellSize);
  out.mapped = land.woodland[row * hf.meta.width + col] ?? 0;
  out.mix = fbm(ex / 1800, ez / 1800, 3, 29) * 0.85 + jitter * 0.15;
  out.woodScore = large * 0.55 + medium * 0.2 + smoothstep(0.05, 0.35, slope) * 0.35 + jitter * 0.05;
  const flat = 1 - smoothstep(0.03, 0.25, slope);
  out.farmScore = flat * 0.45 + (1 - clamp(hM / UPLAND_M, 0, 1)) * 0.3 + medium * 0.25;
  out.moorScore = clamp((hM - UPLAND_M) / 300, 0, 1) * 0.6 + large * 0.4;
  const nearTywi = riverSide || (land.rivers.near(ex, ez) && land.rivers.distance(ex, ez, 300) < 260);
  out.floodplain = nearTywi && slope < 0.12 && hM < 120 ? 1 : 0;
  const fx = Math.floor(ex / 420 + fbm(ex / 1400, ez / 1400, 2, 5) * 1.4);
  const fz = Math.floor(ez / 330 + fbm(ez / 1400, ex / 1400, 2, 9) * 1.4);
  out.field = Math.floor(hash2(fx, fz, 21) * 997);
}

// The scores of the base triangles, sorted, so a detail block can be given the same percentile
// rank a base triangle with that score would have.
export class RankTable {
  private readonly sorted: Float32Array;

  constructor(scores: readonly number[]) {
    this.sorted = Float32Array.from(scores).sort();
  }

  rank(score: number): number {
    let lo = 0;
    let hi = this.sorted.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if ((this.sorted[mid] ?? 0) < score) lo = mid + 1;
      else hi = mid;
    }
    return lo / Math.max(1, this.sorted.length - 1);
  }
}

export interface RankTables {
  readonly lowWood: RankTable;
  readonly highWood: RankTable;
  readonly lowFarm: RankTable;
  readonly highMoor: RankTable;
}

export function ranksFor(
  scores: Scores,
  hM: number,
  tables: RankTables,
): { wood: number; farm: number; moor: number } {
  const upland = hM >= UPLAND_M;
  return {
    wood: (upland ? tables.highWood : tables.lowWood).rank(scores.woodScore),
    farm: upland ? 0 : tables.lowFarm.rank(scores.farmScore),
    moor: upland ? tables.highMoor.rank(scores.moorScore) : 0,
  };
}
