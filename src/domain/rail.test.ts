import { describe, expect, it } from 'vitest';
import { sectionLines, sectionSpan, type RailSection } from './rail.ts';

const NORTH: RailSection = { within: [{ minN: 100 }] };
const SOUTH: RailSection = { within: [{ maxN: 100 }] };
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

describe('sectionLines with boxes', () => {
  // A branch leaving the main line eastwards: an easting bound tells them apart where a northing cannot.
  const branchEast = {
    kind: 'rail',
    points: [
      { e: 100, n: 0 },
      { e: 400, n: 60 },
    ],
  };
  const MAIN_ONLY: RailSection = { within: [{ minN: -10, maxN: 100, maxE: 160 }] };
  const BRANCH_AND_SOUTH: RailSection = { within: [{ maxN: -10 }, { minE: 160, maxN: 100 }] };

  it('cuts a line at whichever edge of a box it crosses', () => {
    expect(sectionLines([branchEast], MAIN_ONLY).map((l) => l.points)).toEqual([
      [
        { e: 100, n: 0 },
        { e: 160, n: 12 },
      ],
    ]);
    expect(sectionLines([branchEast], BRANCH_AND_SOUTH).map((l) => l.points)).toEqual([
      [
        { e: 160, n: 12 },
        { e: 400, n: 60 },
      ],
    ]);
  });

  it('draws each part of a line once across sections that share only their edges', () => {
    const lines = [main, branch, branchEast];
    const length = (ls: readonly { points: readonly { e: number; n: number }[] }[]) =>
      ls.reduce(
        (sum, l) =>
          sum +
          l.points.slice(1).reduce((s, p, i) => {
            const q = l.points[i];
            return s + (q ? Math.hypot(p.e - q.e, p.n - q.n) : 0);
          }, 0),
        0,
      );
    const north = sectionLines(lines, NORTH);
    const parts = [north, sectionLines(lines, MAIN_ONLY), sectionLines(lines, BRANCH_AND_SOUTH)];
    expect(parts.reduce((sum, p) => sum + length(p), 0)).toBeCloseTo(length(lines), 6);
  });

  it('keeps a line whole when every segment stays inside', () => {
    expect(sectionLines([branch], SOUTH).map((l) => l.points)).toEqual([branch.points]);
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
