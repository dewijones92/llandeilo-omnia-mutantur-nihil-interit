import type { Framing, GridRef, KeyEvent, Place } from './model.ts';
import { tAt, type Timeline } from './timeline.ts';

export interface Step {
  readonly event: KeyEvent;
  readonly t: number;
  readonly index: number;
}

const SAME_PLACE = 0.0005;

export function keySteps(timeline: Timeline, events: readonly KeyEvent[]): readonly Step[] {
  return events
    .filter((e) => e.magnetic)
    .map((event) => ({ event, t: tAt(timeline, event.when.from) }))
    .sort((a, b) => a.t - b.t)
    .map((s, index) => ({ ...s, index }));
}

export function stepFrom(steps: readonly Step[], t: number, direction: 1 | -1): Step | undefined {
  if (direction === 1) return steps.find((s) => s.t > t + SAME_PLACE);
  for (let i = steps.length - 1; i >= 0; i--) {
    const s = steps[i];
    if (s && s.t < t - SAME_PLACE) return s;
  }
  return undefined;
}

export function stepAt(steps: readonly Step[], t: number): Step | undefined {
  return steps.find((s) => Math.abs(s.t - t) <= SAME_PLACE);
}

export interface ResolvedShot {
  readonly at: GridRef;
  readonly framing: Exclude<Framing, 'valley'>;
}

export function shotFor(event: KeyEvent, places: ReadonlyMap<string, Place>): ResolvedShot | undefined {
  const framing = event.shot?.framing ?? 'site';
  if (framing === 'valley') return undefined;
  const at = event.shot?.at ?? (event.place ? places.get(event.place)?.at : undefined);
  return at ? { at, framing } : undefined;
}
