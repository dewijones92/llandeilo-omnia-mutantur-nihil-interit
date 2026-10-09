import { describe, expect, it } from 'vitest';
import { bearing, cumulativeLengths, legs, pointAlong, polylineLength } from './polyline.ts';

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

  it('gives compass bearings clockwise from north', () => {
    expect(bearing({ e: 0, n: 0 }, { e: 0, n: -1 })).toBeCloseTo(180);
    expect(bearing({ e: 0, n: 0 }, { e: -1, n: 0 })).toBeCloseTo(270);
  });
});
