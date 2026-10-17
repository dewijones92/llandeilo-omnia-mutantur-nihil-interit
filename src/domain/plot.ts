import { mint } from './brand.ts';
import type { GroundEdit, GroundEditId } from './groundedit.ts';
import { SETTING_SCALE } from './materials.ts';
import type { Feature, FeatureId, FeatureKind, GridRef } from './model.ts';
import { hallCorners, planExtent, rotate, towerRing, type Part, type Plan, type Pt } from './plan.ts';
import { presenceAt, type FeaturePresence } from './state.ts';
import type { TimeRange } from './time.ts';
import { tAt, type Timeline } from './timeline.ts';

/**
 * Where a building stands (ADR 0056). One rule for every standing part of every plan, drawn by the
 * procedural builder and the Blender models alike: its floor is level at the highest ground under its
 * footprint, so no corner is ever buried, and its walls carry down to the lowest. A plan whose sources
 * support it levels the ground first, with terrace parts that the ground draws as period edits.
 */

/** Metres a floor may lie under the ground at a corner and still count as standing on it: a sill beam's depth. */
export const SEAT_TOLERANCE = 0.15;

/** Metres apart the ground is sampled across a terrace to find its level. */
const LEVEL_STEP = 2;

type Standing = Extract<Part, { type: 'hall' | 'tower' | 'prism' }>;

/** A part with walls that stands on the ground, or on posts from it: not a ditch, road, bank or terrace. */
export function standsOnGround(part: Part): part is Standing {
  return part.type === 'hall' || part.type === 'tower' || part.type === 'prism';
}

/** The outline of a standing part, plan-local metres, before the plan is turned. */
export function footprint(part: Standing): readonly Pt[] {
  switch (part.type) {
    case 'hall':
      return hallCorners(part);
    case 'prism':
      return part.outline;
    case 'tower':
      return towerRing(part);
  }
}

/** The points the ground is read at to seat a part: its corners, the middle of each side and its centre. */
export function footprintSamples(part: Standing): readonly Pt[] {
  const ring = footprint(part);
  const mids = ring.map((p, i): Pt => {
    const q = ring[(i + 1) % ring.length] ?? p;
    return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  });
  const centre: Pt = [
    ring.reduce((s, p) => s + p[0], 0) / ring.length,
    ring.reduce((s, p) => s + p[1], 0) / ring.length,
  ];
  return [...ring, ...mids, centre];
}

/**
 * The highest drawn vertex within `radius` of each point (world x, z), among the triangles `from` to `to` of a flat
 * triangle list whose mesh sits at `origin` and is stretched `yScale` upright: the wall top at each corner of a part as it was drawn, read from the
 * geometry and not from what a builder recorded. Undefined where the run has no vertex that near.
 */
export function columnTops(
  positions: ArrayLike<number>,
  run: { readonly from: number; readonly to: number },
  origin: readonly [number, number, number],
  points: readonly (readonly [number, number])[],
  radius: number,
  yScale = 1,
): (number | undefined)[] {
  const tops: (number | undefined)[] = points.map(() => undefined);
  const limit = radius * radius;
  for (let k = run.from * 9; k < run.to * 9; k += 3) {
    const x = (positions[k] ?? 0) + origin[0];
    const z = (positions[k + 2] ?? 0) + origin[2];
    const y = (positions[k + 1] ?? 0) * yScale + origin[1];
    points.forEach((p, i) => {
      if ((x - p[0]) ** 2 + (z - p[1]) ** 2 > limit) return;
      const best = tops[i];
      if (best === undefined || y > best) tops[i] = y;
    });
  }
  return tops;
}

/** Where a part's floor was actually drawn: its lowest wall top less its height (a merlon or a post only ever raises a corner's top). */
export function floorFromTops(tops: readonly (number | undefined)[], rise: number): number | undefined {
  const found = tops.filter((t): t is number => t !== undefined);
  return found.length === 0 ? undefined : Math.min(...found) - rise;
}

/** The height a part's floor stands at, on whatever ground `heightAt` reads (plan-local points in, any unit out). */
export function seatOf(part: Standing, heightAt: (p: Pt) => number): number {
  return Math.max(...footprintSamples(part).map(heightAt));
}

export interface Seat {
  readonly id: string;
  /** Where the floor stands now: the highest ground under the footprint. */
  readonly floor: number;
  /** Where the floor stood under the old rule: the ground at a hall's or tower's own point (ADR 0053's rigid fit); a prism already stood at its highest corner. */
  readonly atPoint: number;
  readonly lowest: number;
  readonly highest: number;
}

/** Each standing part's seat on `heightAt`, for the debug log, the overlay and the tests. */
export function seats(plan: Plan, heightAt: (p: Pt) => number): Seat[] {
  return plan.parts.filter(standsOnGround).map((part) => {
    const heights = footprintSamples(part).map(heightAt);
    const floor = seatOf(part, heightAt);
    return {
      id: part.id ?? '?',
      floor,
      atPoint: part.type === 'prism' ? floor : heightAt(part.at),
      lowest: Math.min(...heights),
      highest: Math.max(...heights),
    };
  });
}

export interface TerraceInput {
  readonly feature: string;
  readonly plan: Plan;
  readonly at: GridRef;
  readonly when: TimeRange;
  /** The ground with no period edits, metres above sea level. */
  readonly baseMetres: (g: GridRef) => number;
}

/**
 * A plan's terrace parts as ground edits: each a level plot at the mean height of the ground across it, so
 * what is cut from the uphill side roughly fills the downhill side, eased into the slope over its batter.
 */
export function terraceEdits(input: TerraceInput): GroundEdit[] {
  const { plan, at } = input;
  const turn = plan.angle ?? 0;
  const scale = SETTING_SCALE[plan.setting].across;
  const toGrid = (p: Pt): GridRef => {
    const [x, y] = rotate(p, turn);
    return { e: at.e + x * scale, n: at.n + y * scale };
  };
  return plan.parts.flatMap((part): GroundEdit[] => {
    if (part.type !== 'terrace') return [];
    if (!part.provenance)
      throw new Error(`${input.feature}: terrace ${part.id ?? '?'} needs its own provenance`);
    const across = Math.max(1, Math.round(part.width / LEVEL_STEP));
    const along = Math.max(1, Math.round(part.length / LEVEL_STEP));
    let sum = 0;
    for (let i = 0; i <= along; i++)
      for (let j = 0; j <= across; j++) {
        const local = rotate([(i / along - 0.5) * part.length, (j / across - 0.5) * part.width], part.angle);
        sum += input.baseMetres(toGrid([local[0] + part.at[0], local[1] + part.at[1]]));
      }
    const metres = sum / ((along + 1) * (across + 1));
    const centre = toGrid(part.at);
    const corners = hallCorners(part).map(toGrid);
    const reach = part.batter + 1;
    return [
      {
        id: mint<GroundEditId>(`${input.feature}:${part.id ?? '?'}`),
        when: input.when,
        area: {
          eMin: Math.floor(Math.min(...corners.map((c) => c.e)) - reach),
          eMax: Math.ceil(Math.max(...corners.map((c) => c.e)) + reach),
          nMin: Math.floor(Math.min(...corners.map((c) => c.n)) - reach),
          nMax: Math.ceil(Math.max(...corners.map((c) => c.n)) + reach),
        },
        shape: {
          kind: 'terrace',
          centre,
          halfLength: (part.length * scale) / 2,
          halfWidth: (part.width * scale) / 2,
          angle: part.angle + turn,
          metres,
          slope: part.batter,
        },
        provenance: part.provenance,
      },
    ];
  });
}

/** Every feature's own terraces, as ground edits: what the ground draws while that feature is drawn. */
export function terracesByFeature(
  features: readonly Feature[],
  baseMetres: (g: GridRef) => number,
): ReadonlyMap<FeatureId, readonly GroundEdit[]> {
  const out = new Map<FeatureId, readonly GroundEdit[]>();
  for (const f of features) {
    if (f.kind.type !== 'building') continue;
    const edits = terraceEdits({ feature: f.id, plan: f.kind.plan, at: f.at, when: f.when, baseMetres });
    if (edits.length > 0) out.set(f.id, edits);
  }
  return out;
}

/** The ground edits drawn now: those of every feature drawn now, so the ground and what stands on it change together. */
export function editsDrawn(
  terraces: ReadonlyMap<FeatureId, readonly GroundEdit[]>,
  present: readonly FeaturePresence[],
): GroundEdit[] {
  return present.flatMap((p) => terraces.get(p.feature.id) ?? []);
}

const CLEARING_METRES: Readonly<Record<Exclude<FeatureKind['type'], 'building'>, number>> = {
  roundhouses: 400,
  hillfort: 850,
  'hall-houses': 450,
  town: 1100,
  countryside: 0,
  railway: 0,
  train: 0,
  roads: 0,
  burning: 0,
};

/** How far from its anchor a feature clears the ground and stands on it, metres: the trees stay out of it, and the edits that reach it are drawn under it. */
export function clearingMetres(kind: FeatureKind): number {
  if (kind.type !== 'building') return CLEARING_METRES[kind.type];
  const standing = kind.plan.parts.filter((p) => p.type !== 'bridge');
  if (standing.length === 0) return 0;
  const { setting } = kind.plan;
  return (
    planExtent({ ...kind.plan, parts: standing }) * SETTING_SCALE[setting].across +
    (setting === 'landscape' ? 300 : 60)
  );
}

/**
 * The ground edits a feature is built on, once, at start: those of the features drawn in full in its
 * first year, its own among them, and  only those that reach the ground it clears (within its
 * anchor, `clearingMetres`): a feature that starts in a fort's years elsewhere in the valley is not built on its terraces.
 * Fort 1's backfilled ditches are built on Fort 2's terraces, which are drawn with them; neither is built
 * on Fort 1's, which are gone by then.
 */
export function editsBuiltOn(
  feature: Feature,
  features: readonly Feature[],
  timeline: Timeline,
  terraces: ReadonlyMap<FeatureId, readonly GroundEdit[]>,
): GroundEdit[] {
  const reachMetres = clearingMetres(feature.kind);
  const t = tAt(timeline, feature.when.from);
  const { e, n } = feature.at;
  const reaches = (a: GroundEdit['area']): boolean =>
    a.eMin < e + reachMetres &&
    a.eMax > e - reachMetres &&
    a.nMin < n + reachMetres &&
    a.nMax > n - reachMetres;
  return features
    .flatMap((f) => (presenceAt(timeline, f, t) > 0.5 ? (terraces.get(f.id) ?? []) : []))
    .filter((edit) => reaches(edit.area));
}
