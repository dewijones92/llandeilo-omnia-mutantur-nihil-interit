import { describe, expect, it } from 'vitest';
import {
  bearing,
  cumulativeLengths,
  densify,
  densifyWhere,
  distanceToSegment,
  nearestOnSegment,
  legs,
  pointAlong,
  polylineLength,
  segmentAt,
} from './polyline.ts';

// Due north for 1000m, then due east for 1000m.
const line = [
  { e: 0, n: 0 },
  { e: 0, n: 1000 },
  { e: 1000, n: 1000 },
] as const;

describe('a polyline', () => {
  it('measures its legs, their running lengths and its whole length', () => {
    expect(legs(line).map((l) => [l.start, l.length])).toEqual([
      [0, 1000],
      [1000, 1000],
    ]);
    expect(cumulativeLengths(line)).toEqual([0, 1000, 2000]);
    expect(polylineLength(line)).toBe(2000);
    expect(polylineLength([{ e: 5, n: 5 }])).toBe(0);
  });

  it('finds a point and the bearing of its leg, clamped to the ends', () => {
    expect(pointAlong(line, 500)).toEqual({ at: { e: 0, n: 500 }, heading: 0 });
    const turned = pointAlong(line, 1500);
    expect(turned.at).toEqual({ e: 500, n: 1000 });
    expect(turned.heading).toBeCloseTo(90);
    expect(pointAlong(line, 5000).at).toEqual({ e: 1000, n: 1000 });
    expect(pointAlong(line, -10).at).toEqual({ e: 0, n: 0 });
    expect(pointAlong([{ e: 3, n: 4 }], 10)).toEqual({ at: { e: 3, n: 4 }, heading: 0 });
  });

  it('finds the leg a distance falls on and how far along it, from running lengths', () => {
    const along = cumulativeLengths(line);
    expect(segmentAt(along, 250)).toEqual({ index: 0, f: 0.25 });
    expect(segmentAt(along, 1500)).toEqual({ index: 1, f: 0.5 });
    expect(segmentAt(along, 1000)).toEqual({ index: 0, f: 1 });
    expect(segmentAt(along, -5)).toEqual({ index: 0, f: 0 });
    expect(segmentAt(along, 9000)).toEqual({ index: 1, f: 1 });
    expect(segmentAt([0, 0, 10], 4)).toEqual({ index: 1, f: 0.4 });
    expect(segmentAt([0], 4)).toEqual({ index: 0, f: 0 });
  });

  it('gives compass bearings clockwise from north', () => {
    expect(bearing({ e: 0, n: 0 }, { e: 0, n: -1 })).toBeCloseTo(180);
    expect(bearing({ e: 0, n: 0 }, { e: -1, n: 0 })).toBeCloseTo(270);
  });
});

describe('densifying a polyline', () => {
  it('keeps every original point and splits each leg into equal pieces no longer than the step', () => {
    const out = densify(line, 400);
    expect(out).toHaveLength(7);
    expect(out[0]).toEqual({ e: 0, n: 0 });
    expect(out[3]).toEqual({ e: 0, n: 1000 });
    expect(out[6]).toEqual({ e: 1000, n: 1000 });
    expect(out[1]).toEqual({ e: 0, n: 1000 / 3 });
    for (let i = 1; i < out.length; i++) {
      const a = out[i - 1];
      const b = out[i];
      expect(Math.hypot((b?.e ?? 0) - (a?.e ?? 0), (b?.n ?? 0) - (a?.n ?? 0))).toBeLessThanOrEqual(400);
    }
  });

  it('leaves a leg shorter than the step whole, repeats nothing for a zero-length leg and returns one point as it is', () => {
    expect(densify(line, 5000)).toEqual([...line]);
    expect(
      densify(
        [
          { e: 1, n: 1 },
          { e: 1, n: 1 },
        ],
        10,
      ),
    ).toEqual([
      { e: 1, n: 1 },
      { e: 1, n: 1 },
    ]);
    expect(densify([{ e: 3, n: 4 }], 10)).toEqual([{ e: 3, n: 4 }]);
    expect(densify([], 10)).toEqual([]);
  });
});

describe('densifying only where the line matters', () => {
  const long = [
    { e: 0, n: 0 },
    { e: 1000, n: 0 },
  ] as const;
  const inside = (g: { e: number }): boolean => g.e >= 400 && g.e <= 600;

  it('adds points to a long leg only inside the place that matters, and keeps the originals', () => {
    const out = densifyWhere(long, 4, inside);
    expect(out[0]).toEqual({ e: 0, n: 0 });
    expect(out[out.length - 1]).toEqual({ e: 1000, n: 0 });
    const between = out.filter((p) => p.e > 0 && p.e < 1000);
    expect(between.length).toBeGreaterThanOrEqual(49);
    expect(between.every(inside)).toBe(true);
  });

  it('leaves no stretch inside the place longer than the step', () => {
    const out = densifyWhere(long, 4, inside);
    const gaps = legs(out)
      .filter((l) => l.b.e > 400 && l.a.e < 600)
      .map((l) => l.length);
    expect(Math.max(...gaps)).toBeLessThanOrEqual(4.0001);
  });

  it('changes nothing for a line that never meets the place, or a leg already short enough', () => {
    expect(densifyWhere(long, 4, () => false)).toEqual([...long]);
    const short = [
      { e: 450, n: 0 },
      { e: 452, n: 0 },
    ];
    expect(densifyWhere(short, 4, inside)).toEqual(short);
  });

  it('keeps a single point and an empty line as they are', () => {
    expect(densifyWhere([{ e: 1, n: 2 }], 4, inside)).toEqual([{ e: 1, n: 2 }]);
    expect(densifyWhere([], 4, inside)).toEqual([]);
  });
});

describe('the distance to a segment', () => {
  const a = { e: 0, n: 0 };
  const b = { e: 10, n: 0 };

  it('is the perpendicular distance beside the segment and the distance to the end past it', () => {
    expect(distanceToSegment(a, b, { e: 5, n: 3 })).toBe(3);
    expect(distanceToSegment(a, b, { e: 14, n: 3 })).toBe(5);
    expect(distanceToSegment(a, b, { e: -3, n: -4 })).toBe(5);
  });

  it('is the distance to the point when the segment has no length', () => {
    expect(distanceToSegment(a, a, { e: 3, n: 4 })).toBe(5);
  });
});

describe('the nearest point on a segment', () => {
  it('says how far along the segment it is, clamped to its ends', () => {
    const a = { e: 0, n: 0 };
    const b = { e: 10, n: 0 };
    expect(nearestOnSegment(a, b, { e: 2.5, n: 7 })).toEqual({ t: 0.25, distance: 7 });
    expect(nearestOnSegment(a, b, { e: -5, n: 0 })).toEqual({ t: 0, distance: 5 });
    expect(nearestOnSegment(a, b, { e: 99, n: 0 }).t).toBe(1);
  });
});
