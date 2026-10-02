import { clamp, type NonEmptyArray } from './assert.ts';
import { hex, mix, type Rgb } from './colour.ts';
import type { Provenance } from './provenance.ts';
import type { Year } from './time.ts';

// What most homes burned; 'mixed' is electric light, gas and oil side by side.
export type HomeLight = 'hearth' | 'rushlight' | 'oil-lamp' | 'mixed' | 'blacked-out' | 'curtained';

// 'none' means no street lighting existed; 'off' means lamps existed but were put out (the blackout).
export type StreetLight = 'none' | 'gas' | 'electric' | 'off' | 'dimmed';

export interface LampKey {
  readonly year: Year;
  readonly homes: HomeLight;
  readonly street: StreetLight;
  /** 0 is electric white, 1 is the orange of an open flame. */
  readonly warmth: number;
  /** Share of houses showing a lit window, 0..1. */
  readonly windows: number;
  /** How bright a lit window is, 0..1. */
  readonly glow: number;
  /** Strength of hearth glow at roundhouses and halls, 0..1. */
  readonly hearth: number;
  /** Strength of street lamps, 0..1; 0 whenever `street` is 'none' or 'off'. */
  readonly streetGlow: number;
  readonly provenance: Provenance;
}

// Technology arrives on a date, so keys hold rather than blend: a blend would draw half-gaslit years.
export function lampStyleAt(keys: NonEmptyArray<LampKey>, y: Year): LampKey {
  let current = keys[0];
  for (const k of keys) if (k.year <= y) current = k;
  return current;
}

export interface LampState {
  readonly colour: Rgb;
  readonly windows: number;
  readonly windowShare: number;
  readonly hearth: number;
  readonly street: number;
}

const FLAME = hex('#ffb25e');
const ELECTRIC = hex('#fff1dc');

export function lampColour(warmth: number): Rgb {
  return mix(ELECTRIC, FLAME, clamp(warmth, 0, 1));
}

/** `level` is the time-of-day lamp level from lightingAt: 0 by day, about 1 in the evening. */
export function lampsAt(style: LampKey, level: number): LampState {
  const l = clamp(level, 0, 1);
  return {
    colour: lampColour(style.warmth),
    windows: l * style.glow,
    windowShare: style.windows,
    hearth: l * style.hearth,
    street: l * style.streetGlow,
  };
}
