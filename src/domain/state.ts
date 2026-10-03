import { clamp, lerp, smoothstep } from './assert.ts';
import { chillAt, type ClimateKey } from './climate.ts';
import { hex, mix, type Rgb } from './colour.ts';
import {
  AMBIENT_BEDS,
  type AlmanacEntry,
  type AmbientBed,
  type BedPoint,
  type Conversation,
  type EnvironmentKey,
  type Era,
  type Feature,
  type KeyEvent,
  type LanguageSnapshot,
  type Person,
  type Place,
  type Soundscape,
} from './model.ts';
import type { Provenance, Source } from './provenance.ts';
import { contains, type TimeRange, type Year } from './time.ts';
import { tAt, yearAt, type Timeline } from './timeline.ts';

export interface WorldContent {
  readonly timeline: Timeline;
  readonly eras: readonly Era[];
  readonly environment: readonly EnvironmentKey[];
  readonly soundscape: Soundscape;
  readonly climate: readonly ClimateKey[];
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
}

// `since` is the reason of the last point that names the bed; `towards` is set only between two
// points with different reasons, or while fading out, so an in-between year never wears the next
// point's reason as its own.
export interface SoundingBed {
  readonly bed: AmbientBed;
  readonly level: number;
  readonly since: Provenance;
  readonly towards?: Provenance | 'silence';
}

export interface Sound {
  readonly levels: Readonly<Record<AmbientBed, number>>;
  readonly beds: readonly SoundingBed[];
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
  readonly sound: Sound;
  readonly chill: number;
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
  return {
    forest: lerp(a.forest, b.forest, f),
    farmland: lerp(a.farmland, b.farmland, f),
    moor: lerp(a.moor, b.moor, f),
    skyTop: mix(hex(a.skyTop), hex(b.skyTop), f),
    skyHorizon: mix(hex(a.skyHorizon), hex(b.skyHorizon), f),
    sun: mix(hex(a.sun), hex(b.sun), f),
    fog: lerp(a.fog, b.fog, f),
    mappedWoodland: lerp(a.mappedWoodland, b.mappedWoodland, f),
  };
}

function bedAt(bed: AmbientBed, points: readonly BedPoint[], y: Year): SoundingBed | undefined {
  let i = -1;
  while ((points[i + 1]?.year ?? Infinity) <= y) i++;
  const a = points[i];
  if (a?.kind !== 'heard') return undefined;
  const b = points[i + 1];
  if (!b || a.year === y) return { bed, level: a.level, since: a.provenance };
  const f = (y - a.year) / (b.year - a.year);
  if (b.kind === 'silent')
    return { bed, level: lerp(a.level, 0, f), since: a.provenance, towards: 'silence' };
  const level = lerp(a.level, b.level, f);
  return b.provenance === a.provenance
    ? { bed, level, since: a.provenance }
    : { bed, level, since: a.provenance, towards: b.provenance };
}

export function soundAt(soundscape: Soundscape, y: Year): Sound {
  const beds = AMBIENT_BEDS.flatMap((bed) => {
    const heard = bedAt(bed, soundscape[bed], y);
    return heard && heard.level > 0 ? [heard] : [];
  });
  const levels = everyBed((bed) => beds.find((b) => b.bed === bed)?.level ?? 0);
  return { levels, beds };
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
  const fadeIn = smoothstep(from - FADE_T, from, t);
  const fadeOut = 1 - smoothstep(to, to + FADE_T, t);
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
    sound: soundAt(world.soundscape, y),
    chill: chillAt(world.climate, y),
    features,
    conversations: world.conversations.filter((c) => contains(c.when, y)),
    almanac: world.almanac.filter((a) => contains(a.when, y)),
    language: latestStarting(world.language, y),
    nearestEvent,
  };
}
