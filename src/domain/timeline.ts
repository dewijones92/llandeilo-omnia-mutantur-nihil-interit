import { clamp, lerp } from './assert.ts';
import { PRESENT_YEAR, year, type Year } from './time.ts';

export interface TimelineAnchor {
  /** Slider position in [0, 1]. */
  readonly t: number;
  readonly year: Year;
  /** How to interpolate from the previous anchor to this one. */
  readonly scale: 'linear' | 'log';
}

export interface Timeline {
  readonly anchors: readonly TimelineAnchor[];
}

export function createTimeline(anchors: readonly TimelineAnchor[]): Timeline {
  const first = anchors[0];
  const last = anchors[anchors.length - 1];
  if (!first || !last || anchors.length < 2) throw new Error('A timeline needs at least two anchors');
  if (first.t !== 0 || last.t !== 1) throw new Error('Timeline anchors must span t = 0 to t = 1');
  for (let i = 1; i < anchors.length; i++) {
    const prev = anchors[i - 1];
    const cur = anchors[i];
    if (!prev || !cur) continue;
    if (!(cur.t > prev.t) || !(cur.year > prev.year)) {
      throw new Error(`Timeline anchors must strictly increase (at index ${i})`);
    }
    if (cur.scale === 'log' && cur.year >= PRESENT_YEAR) {
      throw new Error('A log segment must end before the present');
    }
  }
  return { anchors };
}

function before(y: number): number {
  return PRESENT_YEAR + 1 - y;
}

function segmentAt(
  timeline: Timeline,
  key: 't' | 'year',
  value: number,
): { a: TimelineAnchor; b: TimelineAnchor } {
  const { anchors } = timeline;
  for (let i = 1; i < anchors.length; i++) {
    const a = anchors[i - 1];
    const b = anchors[i];
    if (a && b && value <= b[key]) return { a, b };
  }
  const a = anchors[anchors.length - 2];
  const b = anchors[anchors.length - 1];
  if (!a || !b) throw new Error('Timeline has no segments');
  return { a, b };
}

export function yearAt(timeline: Timeline, t: number): Year {
  const tt = clamp(t, 0, 1);
  const { a, b } = segmentAt(timeline, 't', tt);
  const f = (tt - a.t) / (b.t - a.t);
  if (f <= 0) return a.year;
  if (f >= 1) return b.year;
  if (b.scale === 'log') {
    const la = Math.log(before(a.year));
    const lb = Math.log(before(b.year));
    return year(PRESENT_YEAR + 1 - Math.exp(lerp(la, lb, f)));
  }
  return year(lerp(a.year, b.year, f));
}

export function tAt(timeline: Timeline, y: Year): number {
  const first = timeline.anchors[0];
  const last = timeline.anchors[timeline.anchors.length - 1];
  if (!first || !last) return 0;
  const yy = clamp(y, first.year, last.year);
  const { a, b } = segmentAt(timeline, 'year', yy);
  const f =
    b.scale === 'log'
      ? (Math.log(before(yy)) - Math.log(before(a.year))) /
        (Math.log(before(b.year)) - Math.log(before(a.year)))
      : (yy - a.year) / (b.year - a.year);
  return lerp(a.t, b.t, f);
}

export function timelineStart(timeline: Timeline): Year {
  return timeline.anchors[0]?.year ?? year(0);
}

export function timelineEnd(timeline: Timeline): Year {
  return timeline.anchors[timeline.anchors.length - 1]?.year ?? year(PRESENT_YEAR);
}
