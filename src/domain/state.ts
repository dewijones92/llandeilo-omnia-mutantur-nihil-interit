import { clamp, lerp, smoothstep } from './assert.ts';
import { hex, mix, type Rgb } from './colour.ts';
import type {
  AlmanacEntry,
  AmbientBed,
  Conversation,
  EnvironmentKey,
  Era,
  Feature,
  KeyEvent,
  LanguageSnapshot,
  Person,
  Place,
} from './model.ts';
import type { Source } from './provenance.ts';
import { contains, type TimeRange, type Year } from './time.ts';
import { tAt, yearAt, type Timeline } from './timeline.ts';

export interface WorldContent {
  readonly timeline: Timeline;
  readonly eras: readonly Era[];
  readonly environment: readonly EnvironmentKey[];
  readonly places: readonly Place[];
  readonly events: readonly KeyEvent[];
  readonly features: readonly Feature[];
  readonly people: readonly Person[];
  readonly conversations: readonly Conversation[];
  readonly almanac: readonly AlmanacEntry[];
  readonly language: readonly LanguageSnapshot[];
  readonly sources: readonly Source[];
}

export interface Environment {
  readonly forest: number;
  readonly farmland: number;
  readonly moor: number;
  readonly skyTop: Rgb;
  readonly skyHorizon: Rgb;
  readonly sun: Rgb;
  readonly fog: number;
  readonly mappedWoodland: number;
  readonly ambient: Readonly<Record<AmbientBed, number>>;
}

export interface FeaturePresence {
  readonly feature: Feature;
  readonly presence: number;
}

export interface Snapshot {
  readonly t: number;
  readonly year: Year;
  readonly era: Era | undefined;
  readonly environment: Environment;
  readonly features: readonly FeaturePresence[];
  readonly conversations: readonly Conversation[];
  readonly almanac: readonly AlmanacEntry[];
  readonly language: LanguageSnapshot | undefined;
  readonly nearestEvent: KeyEvent | undefined;
}

export function everyBed(value: (bed: AmbientBed) => number): Record<AmbientBed, number> {
  return {
    wind: value('wind'),
    river: value('river'),
    birds: value('birds'),
    forest: value('forest'),
    livestock: value('livestock'),
    forge: value('forge'),
    bells: value('bells'),
    market: value('market'),
    train: value('train'),
    traffic: value('traffic'),
    chant: value('chant'),
  };
}

export const FADE_T = 0.012;

export function environmentAt(keys: readonly EnvironmentKey[], y: Year): Environment {
  const first = keys[0];
  if (!first) throw new Error('No environment keyframes');
  let a = first;
  let b = first;
  for (const k of keys) {
    if (k.year <= y) a = k;
    if (k.year >= y) {
      b = k;
      break;
    }
    b = k;
  }
  const f = b.year === a.year ? 0 : clamp((y - a.year) / (b.year - a.year), 0, 1);
  const ambient = everyBed((bed) => lerp(a.ambient[bed] ?? 0, b.ambient[bed] ?? 0, f));
  return {
    forest: lerp(a.forest, b.forest, f),
    farmland: lerp(a.farmland, b.farmland, f),
    moor: lerp(a.moor, b.moor, f),
    skyTop: mix(hex(a.skyTop), hex(b.skyTop), f),
    skyHorizon: mix(hex(a.skyHorizon), hex(b.skyHorizon), f),
    sun: mix(hex(a.sun), hex(b.sun), f),
    fog: lerp(a.fog, b.fog, f),
    mappedWoodland: lerp(a.mappedWoodland, b.mappedWoodland, f),
    ambient,
  };
}

export function latestStarting<T extends { readonly when: TimeRange }>(
  items: readonly T[],
  y: Year,
): T | undefined {
  let best: T | undefined;
  for (const item of items) {
    if (item.when.from <= y && (!best || item.when.from > best.when.from)) best = item;
  }
  return best && y < best.when.to + 1 ? best : undefined;
}

export function presenceAt(timeline: Timeline, when: TimeRange, t: number): number {
  const from = tAt(timeline, when.from);
  const to = tAt(timeline, when.to);
  const fadeIn = from <= 0 ? 1 : smoothstep(from - FADE_T, from, t);
  const fadeOut = to >= 1 ? 1 : 1 - smoothstep(to, to + FADE_T, t);
  return Math.min(fadeIn, fadeOut);
}

export function snapshotAt(world: WorldContent, t: number): Snapshot {
  const y = yearAt(world.timeline, t);
  const features = world.features
    .map((feature) => ({ feature, presence: presenceAt(world.timeline, feature.when, t) }))
    .filter((f) => f.presence > 0.001);
  let nearestEvent: KeyEvent | undefined;
  let best = Infinity;
  for (const ev of world.events) {
    const d = Math.abs(tAt(world.timeline, ev.when.from) - t);
    if (d < best) {
      best = d;
      nearestEvent = ev;
    }
  }
  return {
    t,
    year: y,
    era: latestStarting(world.eras, y),
    environment: environmentAt(world.environment, y),
    features,
    conversations: world.conversations.filter((c) => contains(c.when, y)),
    almanac: world.almanac.filter((a) => contains(a.when, y)),
    language: latestStarting(world.language, y),
    nearestEvent,
  };
}
