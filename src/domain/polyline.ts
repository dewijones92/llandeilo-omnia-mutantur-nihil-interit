import { clamp, lerp, type NonEmptyArray } from './assert.ts';
import type { GridRef } from './model.ts';

// The one place that measures a line of grid points and walks along it (ADR 0043).

export interface Leg {
  readonly a: GridRef;
  readonly b: GridRef;
  /** Metres along the line where this leg starts. */
  readonly start: number;
  readonly length: number;
}

export function legs(points: readonly GridRef[]): Leg[] {
  const out: Leg[] = [];
  let start = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) continue;
    const length = Math.hypot(b.e - a.e, b.n - a.n);
    out.push({ a, b, start, length });
    start += length;
  }
  return out;
}

/** Metres from the first point to each point in turn, starting at 0. */
export function cumulativeLengths(points: readonly GridRef[]): number[] {
  return [0, ...legs(points).map((l) => l.start + l.length)];
}

export function polylineLength(points: readonly GridRef[]): number {
  return legs(points).reduce((sum, l) => sum + l.length, 0);
}

/** Compass bearing from a to b, degrees clockwise from north. */
export function bearing(a: GridRef, b: GridRef): number {
  return ((((Math.atan2(b.e - a.e, b.n - a.n) * 180) / Math.PI) % 360) + 360) % 360;
}

/** The point `d` metres along the line, clamped to its ends, and the bearing of the leg it is on. */
export function pointAlong(
  points: NonEmptyArray<GridRef>,
  d: number,
): { readonly at: GridRef; readonly heading: number } {
  const all = legs(points);
  const left = Math.max(0, d);
  for (const [i, leg] of all.entries()) {
    if (left <= leg.start + leg.length || i === all.length - 1) {
      const f = leg.length > 0 ? clamp((left - leg.start) / leg.length, 0, 1) : 0;
      return {
        at: { e: lerp(leg.a.e, leg.b.e, f), n: lerp(leg.a.n, leg.b.n, f) },
        heading: bearing(leg.a, leg.b),
      };
    }
  }
  return { at: points[0], heading: 0 };
}
