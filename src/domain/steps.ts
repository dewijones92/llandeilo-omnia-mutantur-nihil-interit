import type { Feature, FeatureId, Framing, GridRef, KeyEvent, Place, PlaceId } from './model.ts';
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

export function nearestStep(steps: readonly Step[], t: number, radius: number): Step | undefined {
  let found: Step | undefined;
  let best = radius;
  for (const s of steps) {
    const d = Math.abs(s.t - t);
    if (d <= best) {
      best = d;
      found = s;
    }
  }
  return found;
}

export function stepAt(steps: readonly Step[], t: number): Step | undefined {
  return steps.find((s) => Math.abs(s.t - t) <= SAME_PLACE);
}

export interface ResolvedShot {
  readonly at: GridRef;
  readonly framing: Framing;
}

export function shotFor(
  event: KeyEvent,
  places: ReadonlyMap<PlaceId, Place>,
  features: ReadonlyMap<FeatureId, Feature>,
): ResolvedShot | undefined {
  const shot = event.shot ?? { framing: 'site' };
  if (shot.framing === 'valley') return undefined;
  const feature = shot.feature ? features.get(shot.feature) : undefined;
  const at = feature?.at ?? (event.place ? places.get(event.place)?.at : undefined);
  return at ? { at, framing: shot.framing } : undefined;
}
