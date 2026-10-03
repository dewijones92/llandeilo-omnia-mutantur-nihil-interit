import { describe, expect, it } from 'vitest';
import { sectionLines, sectionSpan, type RailSection } from './rail.ts';

const NORTH: RailSection = { side: 'north', ofN: 100 };
const SOUTH: RailSection = { side: 'south', ofN: 100 };
// A line from the north-east down through the cut at n = 100, and a branch wholly south of it.
const main = {
  kind: 'rail',
  points: [
    { e: 300, n: 300 },
    { e: 200, n: 200 },
    { e: 100, n: 0 },
  ],
};
const branch = {
  kind: 'rail',
  points: [
    { e: 100, n: 0 },
    { e: 0, n: -50 },
  ],
};

describe('sectionLines', () => {
  it('cuts a line where it crosses the northing, so the two sections meet at one point', () => {
    const north = sectionLines([main, branch], NORTH);
    const south = sectionLines([main, branch], SOUTH);
    expect(north.map((l) => l.points)).toEqual([
      [
        { e: 300, n: 300 },
        { e: 200, n: 200 },
        { e: 150, n: 100 },
      ],
    ]);
    expect(south.map((l) => l.points)).toEqual([
      [
        { e: 150, n: 100 },
        { e: 100, n: 0 },
      ],
      branch.points,
    ]);
    expect(south.every((l) => l.kind === 'rail')).toBe(true);
  });
});

describe('sectionSpan', () => {
  it('gives the stretch of a line that the drawn sections cover, as fractions of its length', () => {
    const total = Math.hypot(100, 100) + Math.hypot(100, 200);
    const cut = (Math.hypot(100, 100) + Math.hypot(50, 100)) / total;
    const south = sectionSpan(main.points, [SOUTH]);
    expect(south?.[0]).toBeCloseTo(cut, 6);
    expect(south?.[1]).toBeCloseTo(1, 6);
    expect(sectionSpan(main.points, [NORTH, SOUTH])).toEqual([0, 1]);
    expect(sectionSpan(main.points, [])).toBeUndefined();
  });
});
