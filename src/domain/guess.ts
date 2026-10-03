import { assertNever, clamp } from './assert.ts';
import { chillAt, type ClimateKey } from './climate.ts';
import { lowestSnowM, seasonLook, type Season } from './daylight.ts';
import { streetWarmth, type LampKey, type Streets } from './lamplight.ts';
import type { Feature, GridRef } from './model.ts';
import type { Provenance } from './provenance.ts';
import { drawnRailway } from './rail.ts';
import type { Rgb } from './colour.ts';
import type { Environment, Snapshot, WorldContent } from './state.ts';
import { snapshotAt } from './state.ts';
import type { Step } from './steps.ts';
import { PRESENT_YEAR, YEAR_EPSILON, range, year, type TimeRange, type Year } from './time.ts';
import { tAt, type Timeline } from './timeline.ts';

export const ROUNDS = 5;
export const MAX_POINTS = 100;
// Distances along the slider (t), so a century counts for more where the timeline spreads it out.
const SPOT_ON_T = 0.005;
const NOTHING_T = 0.2;
const ON_SCREEN = 0.5;
// Below this the modelled chill barely moves the snow line, so it is not something you could see.
const CLIMATE_VISIBLE = 0.2;
const SAME_LAND = 0.05;
const SAME_CHILL = 0.1;
// Per channel, 0..1: about the smallest step in sky colour you would notice.
const SAME_SKY = 0.03;
const CLUE_LIMIT = 5;

export type ClueStrength = 'firm' | 'probable';

interface ClueBase {
  readonly when: TimeRange;
  readonly span: number;
  readonly provenance: Provenance;
}

// A climate clue is always probable: it comes from the reconstructed model, never from a record.
export type Clue =
  | (ClueBase & { readonly kind: 'feature'; readonly feature: Feature; readonly strength: ClueStrength })
  | (ClueBase & {
      readonly kind: 'climate';
      readonly colder: boolean;
      readonly chill: number;
      readonly strength: 'probable';
    });

// Firm needs both a record and exact dates; a documented feature drawn over rounded or inferred
// years is only probable, like a reconstruction, exact dates or not (ADR 0035).
export function clueStrength(p: Provenance, datesExact: boolean): ClueStrength | undefined {
  switch (p.kind) {
    case 'documented':
      return datesExact ? 'firm' : 'probable';
    case 'reconstructed':
      return 'probable';
    case 'imagined':
      return undefined;
    default:
      return assertNever(p, 'provenance');
  }
}

function spanOf(timeline: Timeline, when: TimeRange): number {
  return tAt(timeline, when.to) - tAt(timeline, when.from);
}

// Half-open, so where one phase hands over to the next at the true year only the new one counts;
// a range running to the present still includes it.
function datesCover(when: TimeRange, y: Year): boolean {
  return when.from <= y && (y < when.to || when.to >= PRESENT_YEAR);
}

function featureClues(timeline: Timeline, snap: Snapshot): Clue[] {
  const out: Clue[] = [];
  // Nudged so a key date's year, which can come back through the slider a hair short, still counts.
  const y = year(snap.year + YEAR_EPSILON);
  for (const { feature, presence } of snap.features) {
    // A phase fading in or out is on screen, but its dates do not cover the year, so they would mislead.
    if (presence < ON_SCREEN || !datesCover(feature.when, y)) continue;
    const strength = clueStrength(feature.provenance, feature.datesExact === true);
    if (!strength) continue;
    out.push({
      kind: 'feature',
      feature,
      strength,
      when: feature.when,
      span: spanOf(timeline, feature.when),
      provenance: feature.provenance,
    });
  }
  return out;
}

// The spell is the stretch of years around y over which the model keeps the chill past the visible
// threshold on the same side; it is named by its strongest key (the Little Ice Age, say).
function visibleEdge(keys: readonly ClimateKey[], y: Year, sign: number, dir: 1 | -1): Year {
  const seen = (c: number): boolean => c * sign >= CLIMATE_VISIBLE;
  const ordered = dir === 1 ? keys : [...keys].reverse();
  let prev: { year: Year; chill: number } = { year: y, chill: chillAt(keys, y) };
  for (const k of ordered) {
    if ((k.year - y) * dir <= 0) continue;
    if (!seen(k.chill)) {
      const f = (sign * CLIMATE_VISIBLE - prev.chill) / (k.chill - prev.chill);
      return year(prev.year + (k.year - prev.year) * f);
    }
    prev = k;
  }
  return prev.year;
}

function climateClue(timeline: Timeline, keys: readonly ClimateKey[], y: Year): Clue | undefined {
  const chill = chillAt(keys, y);
  if (Math.abs(chill) < CLIMATE_VISIBLE) return undefined;
  const sign = Math.sign(chill);
  const when = range(visibleEdge(keys, y, sign, -1), visibleEdge(keys, y, sign, 1));
  let strongest: ClimateKey | undefined;
  for (const k of keys) {
    const inside = k.year >= when.from && k.year <= when.to;
    if (inside && (!strongest || k.chill * sign > strongest.chill * sign)) strongest = k;
  }
  if (!strongest || !clueStrength(strongest.provenance, false)) return undefined;
  return {
    kind: 'climate',
    colder: chill > 0,
    chill,
    strength: 'probable',
    when,
    span: spanOf(timeline, when),
    provenance: strongest.provenance,
  };
}

function rank(strength: ClueStrength): number {
  return strength === 'firm' ? 0 : 1;
}

export function clues(world: Pick<WorldContent, 'timeline' | 'climate'>, snap: Snapshot): readonly Clue[] {
  const list = featureClues(world.timeline, snap);
  const climate = climateClue(world.timeline, world.climate, snap.year);
  if (climate) list.push(climate);
  return list.sort((a, b) => a.span - b.span || rank(a.strength) - rank(b.strength)).slice(0, CLUE_LIMIT);
}

// A round needs something drawn to date it by; the climate alone would let deep time in, and that
// layer is not built yet.
export function playableSteps(world: WorldContent, steps: readonly Step[]): readonly Step[] {
  return steps.filter((s) => clues(world, snapshotAt(world, s.t)).some((c) => c.kind === 'feature'));
}

export function pickRound(
  playable: readonly Step[],
  rng: () => number,
  played: ReadonlySet<number>,
): Step | undefined {
  const left = playable.filter((s) => !played.has(s.index));
  return left[Math.min(left.length - 1, Math.floor(rng() * left.length))];
}

export function scoreGuess(guessT: number, trueT: number): number {
  const off = Math.abs(guessT - trueT);
  return Math.round(MAX_POINTS * clamp(1 - (off - SPOT_ON_T) / (NOTHING_T - SPOT_ON_T), 0, 1));
}

// The snow line follows the season, so a climate clue can be true of the model yet invisible in
// the scene: summer snow never reaches these hills. Compared against today's snow at chill 0.
export function climateShows(season: Season, chill: number, highestM: number): boolean {
  const lowest = Math.min(lowestSnowM(seasonLook(season, chill)), lowestSnowM(seasonLook(season, 0)));
  return lowest < highestM;
}

const sameLand = (a: number, b: number): boolean => Math.abs(a - b) < SAME_LAND;
const sameSky = (a: Rgb, b: Rgb): boolean =>
  [a.r - b.r, a.g - b.g, a.b - b.b].every((d) => Math.abs(d) < SAME_SKY);

// Every field of the environment is drawn. The mapped type makes a new one a compile error here
// until it is compared.
function sameEnvironment(a: Environment, b: Environment): boolean {
  const same: Readonly<Record<keyof Environment, boolean>> = {
    forest: sameLand(a.forest, b.forest),
    farmland: sameLand(a.farmland, b.farmland),
    moor: sameLand(a.moor, b.moor),
    mappedWoodland: sameLand(a.mappedWoodland, b.mappedWoodland),
    fog: sameLand(a.fog, b.fog),
    skyTop: sameSky(a.skyTop, b.skyTop),
    skyHorizon: sameSky(a.skyHorizon, b.skyHorizon),
    sun: sameSky(a.sun, b.sun),
  };
  return Object.values(same).every(Boolean);
}

function sameStreets(a: Streets, b: Streets): boolean {
  if (a.kind === 'none' || a.kind === 'off' || b.kind === 'none' || b.kind === 'off')
    return a.kind === b.kind;
  return (
    a.kind === b.kind && a.glow === b.glow && a.area.id === b.area.id && streetWarmth(a) === streetWarmth(b)
  );
}

// Every field of a night-light key is drawn or not seen, so a new field is a compile error here
// until it is classified; two keys that draw the same night (the c. 1200 key, say) look the same.
function sameLight(a: LampKey | undefined, b: LampKey | undefined): boolean {
  if (!a || !b) return a === b;
  const same: Readonly<Record<keyof LampKey, boolean | 'not seen'>> = {
    year: 'not seen',
    dated: 'not seen',
    text: 'not seen',
    provenance: 'not seen',
    homes: a.homes === b.homes,
    streets: sameStreets(a.streets, b.streets),
    warmth: a.warmth === b.warmth,
    windows: a.windows === b.windows,
    glow: a.glow === b.glow,
    hearth: a.hearth === b.hearth,
  };
  return Object.values(same).every((v) => v !== false);
}

type Compare = (a: Snapshot, b: Snapshot, trainLine: readonly GridRef[] | undefined) => boolean;

// Every Snapshot field is either compared or said not to be seen, so a new drawn field is a compile
// error here until it is compared. Hidden during a round: the year, the era, the almanac, the
// language panel and the nearest event (ADR 0029); sound is heard, not seen.
const SCENE: Readonly<Record<keyof Snapshot, Compare | 'not seen'>> = {
  t: 'not seen',
  year: 'not seen',
  era: 'not seen',
  sound: 'not seen',
  almanac: 'not seen',
  language: 'not seen',
  nearestEvent: 'not seen',
  environment: (a, b) => sameEnvironment(a.environment, b.environment),
  chill: (a, b) => Math.abs(a.chill - b.chill) < SAME_CHILL,
  lamplight: (a, b) => sameLight(a.lamplight, b.lamplight),
  features: (a, b, trainLine) => sameIds(drawnFeatures(a, trainLine), drawnFeatures(b, trainLine)),
  // Each live conversation puts its people in the scene.
  conversations: (a, b) => sameIds(talking(a), talking(b)),
};

function talking(snap: Snapshot): string[] {
  return snap.conversations.map((c) => c.id);
}

// The railway and its train are on screen exactly when drawnRailway draws them; the rest by presence.
function drawnFeatures(snap: Snapshot, trainLine: readonly GridRef[] | undefined): string[] {
  const rail = drawnRailway(snap.features, trainLine);
  const others = snap.features.filter(
    (f) => f.presence >= ON_SCREEN && f.feature.kind.type !== 'railway' && f.feature.kind.type !== 'train',
  );
  return [
    ...others.map((f) => f.feature.id),
    ...rail.sections.map((s) => s.feature.id),
    ...(rail.train ? [rail.train.feature.id] : []),
  ];
}

function sameIds(a: readonly string[], b: readonly string[]): boolean {
  const sb = new Set(b);
  return a.length === b.length && a.every((id) => sb.has(id));
}

/** `trainLine` is the line the train runs on (the longest drawn line), as the renderer is given it. */
export function sceneMatches(a: Snapshot, b: Snapshot, trainLine: readonly GridRef[] | undefined): boolean {
  return Object.values(SCENE).every((same) => same === 'not seen' || same(a, b, trainLine));
}
