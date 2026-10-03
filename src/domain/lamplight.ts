import { clamp, type NonEmptyArray } from './assert.ts';
import { hex, mix, type Rgb } from './colour.ts';
import type { Bilingual } from './i18n.ts';
import type { AlmanacEntry, GridRef } from './model.ts';
import type { Provenance } from './provenance.ts';
import { PRESENT_YEAR, range, year, type Year } from './time.ts';

// What most homes burned; 'mixed' is electric light, gas and oil side by side.
export type HomeLight = 'hearth' | 'rushlight' | 'oil-lamp' | 'mixed' | 'blacked-out' | 'curtained';

// 'on': the change came on the key's date, to the precision given. 'by': it came no later than
// that date; when it began is not known (a sample date, or the first source that mentions it).
// 'in': the key's date only marks a period the text names (say, the Middle Ages); no source dates it closer.
export type Dated = 'on' | 'by' | 'in';

/** An outline of grid points, at least three, in either winding. */
export interface LitArea {
  readonly id: string;
  readonly outline: readonly [GridRef, GridRef, GridRef, ...GridRef[]];
  readonly label: Bilingual;
}

// 'none': no street lighting existed. 'off': lamps existed but were put out (the blackout).
export type Streets =
  | { readonly kind: 'none' }
  | { readonly kind: 'off' }
  | { readonly kind: 'gas' | 'electric' | 'dimmed'; readonly glow: number; readonly area: LitArea };

export interface LampKey {
  readonly year: Year;
  readonly dated: Dated;
  readonly homes: HomeLight;
  readonly streets: Streets;
  /** 0 is electric white, 1 is the orange of an open flame. */
  readonly warmth: number;
  /** Share of houses showing a lit window, 0..1. */
  readonly windows: number;
  /** How bright a lit window is, 0..1. */
  readonly glow: number;
  /** Strength of hearth glow at roundhouses and halls, 0..1. */
  readonly hearth: number;
  /** What the almanac says of this light; it must state the date as `dated` does. */
  readonly text: Bilingual;
  readonly provenance: Provenance;
}

// Technology arrives on a date, so keys hold rather than blend: a blend would draw half-gaslit years.
// Before the first key nothing is known, so there is no key: -1 (ADR 0032).
function keyIndexAt(keys: NonEmptyArray<LampKey>, y: Year): number {
  let at = -1;
  keys.forEach((k, i) => {
    if (k.year <= y) at = i;
  });
  return at;
}

export function lampStyleAt(keys: NonEmptyArray<LampKey>, y: Year): LampKey | undefined {
  return keys[keyIndexAt(keys, y)];
}

export function lampAlmanacAt(keys: NonEmptyArray<LampKey>, y: Year): AlmanacEntry | undefined {
  const i = keyIndexAt(keys, y);
  const key = keys[i];
  if (!key) return undefined;
  const next = keys[i + 1];
  return {
    id: `light-${key.year.toFixed(2)}`,
    when: range(key.year, next ? next.year : year(Math.max(PRESENT_YEAR, key.year))),
    topic: 'light',
    text: key.text,
    provenance: key.provenance,
  };
}

export interface StreetGlow {
  readonly level: number;
  readonly area: LitArea;
}

export interface LampState {
  readonly colour: Rgb;
  readonly windows: number;
  readonly windowShare: number;
  readonly hearth: number;
  readonly street: StreetGlow | undefined;
}

const FLAME = hex('#ffb25e');
const ELECTRIC = hex('#fff1dc');

export function lampColour(warmth: number): Rgb {
  return mix(ELECTRIC, FLAME, clamp(warmth, 0, 1));
}

export type LitStreets = Extract<Streets, { readonly area: LitArea }>;

/** The one rule for whether street lamps stand and shine: not 'none' (none built), not 'off' (the blackout). */
export function hasStreetLamps(streets: Streets): streets is LitStreets {
  return streets.kind !== 'none' && streets.kind !== 'off';
}

/**
 * `level` is the time-of-day lamp level from lightingAt: 0 by day, about 1 in the evening.
 * With no key (before the first one) nothing is lit.
 */
export function lampsAt(style: LampKey | undefined, level: number): LampState {
  if (!style) return { colour: lampColour(1), windows: 0, windowShare: 0, hearth: 0, street: undefined };
  const l = clamp(level, 0, 1);
  const s = style.streets;
  return {
    colour: lampColour(style.warmth),
    windows: l * style.glow,
    windowShare: style.windows,
    hearth: l * style.hearth,
    street: hasStreetLamps(s) ? { level: l * s.glow, area: s.area } : undefined,
  };
}

/** Even-odd test, so the outline may be concave (the town's edge follows the river). */
export function insideArea(area: LitArea, p: GridRef): boolean {
  const o = area.outline;
  let inside = false;
  for (let i = 0, j = o.length - 1; i < o.length; j = i++) {
    const a = o[i];
    const b = o[j];
    if (!a || !b) continue;
    if (a.n > p.n !== b.n > p.n && p.e < ((b.e - a.e) * (p.n - a.n)) / (b.n - a.n) + a.e) inside = !inside;
  }
  return inside;
}

export interface LampSpacing {
  readonly every: number;
  readonly minGap: number;
}

/** Points every `spacing.every` metres along the lines, kept where `accept` allows and no closer than `minGap`. */
function pointsAlong(
  lines: readonly { readonly points: readonly GridRef[] }[],
  spacing: LampSpacing,
  accept: (p: GridRef) => boolean,
): GridRef[] {
  const out: GridRef[] = [];
  const far = (p: GridRef): boolean => out.every((q) => Math.hypot(q.e - p.e, q.n - p.n) >= spacing.minGap);
  for (const line of lines) {
    let carry = 0;
    for (let i = 1; i < line.points.length; i++) {
      const a = line.points[i - 1];
      const b = line.points[i];
      if (!a || !b) continue;
      const len = Math.hypot(b.e - a.e, b.n - a.n);
      for (let d = carry; d < len; d += spacing.every) {
        const f = d / len;
        const p = { e: a.e + (b.e - a.e) * f, n: a.n + (b.n - a.n) * f };
        if (accept(p) && far(p)) out.push(p);
      }
      carry = (carry - len) % spacing.every;
      if (carry < 0) carry += spacing.every;
    }
  }
  return out;
}

/** Street lamps along the town's built-up roads, only inside the area the key says was lit. */
export function streetLampPoints(
  lines: readonly { readonly points: readonly GridRef[] }[],
  spacing: LampSpacing,
  builtUp: (p: GridRef) => boolean,
  area: LitArea,
): GridRef[] {
  return pointsAlong(lines, spacing, (p) => builtUp(p) && insideArea(area, p));
}
