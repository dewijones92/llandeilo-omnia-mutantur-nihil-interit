import { describe, expect, it } from 'vitest';
import {
  cornerAt,
  distanceToPath,
  FORT_SIDES,
  gateFrame,
  ringRuns,
  roadside,
  type FortShape,
} from './fort.ts';
import type { Pt } from './plan.ts';

const shape: FortShape = { halfLength: 70, halfWidth: 55, corner: 8 };
const all = (): boolean => true;

const inside = (p: Pt, d: number): boolean =>
  Math.abs(p[0]) <= shape.halfLength + d + 1e-9 && Math.abs(p[1]) <= shape.halfWidth + d + 1e-9;

describe('ringRuns', () => {
  it('draws one unbroken ring when nothing breaks it, round its corners, and keeps to its offset', () => {
    const runs = ringRuns(shape, 3, all, []);
    expect(runs.map((r) => r.side)).toEqual([...FORT_SIDES]);
    const points = runs.flatMap((r) => r.path);
    for (const p of points) expect(inside(p, 3)).toBe(true);
    const sharp = points.filter((p) => Math.abs(p[0]) > 72 && Math.abs(p[1]) > 56);
    expect(sharp).toHaveLength(0);
    const corner = points.filter((p) => p[0] > 62.5 && p[1] > 47.5);
    expect(corner.length).toBeGreaterThanOrEqual(5);
    for (const [a, b] of runs.map((r, i) => [r, runs[(i + 1) % runs.length]] as const)) {
      const end = a.path[a.path.length - 1];
      const start = b?.path[0];
      expect(end && start && Math.hypot(end[0] - start[0], end[1] - start[1])).toBeLessThan(6);
    }
  });

  it('cuts a gap of the given width in the side that holds a gate, and only there', () => {
    const runs = ringRuns(shape, 0, all, [{ side: 'ne', u: 0, width: 12 }]);
    const ne = runs.filter((r) => r.side === 'ne');
    expect(ne).toHaveLength(2);
    const ys = ne.flatMap((r) => r.path.map((p) => p[1]));
    expect(ys.some((y) => Math.abs(y) < 6 - 1e-9)).toBe(false);
    expect(ys.some((y) => Math.abs(Math.abs(y) - 6) < 1e-9)).toBe(true);
    expect(runs.filter((r) => r.side === 'sw')).toHaveLength(1);
  });

  it('cuts two gates in one side, whichever way the side runs, leaving a piece between them', () => {
    const gaps = [
      { side: 'sw', u: 20, width: 6 },
      { side: 'sw', u: -20, width: 6 },
      { side: 'nw', u: 30, width: 8 },
      { side: 'nw', u: -10, width: 8 },
    ] as const;
    const runs = ringRuns(shape, 0, all, gaps);
    const sw = runs.filter((r) => r.side === 'sw');
    expect(sw).toHaveLength(3);
    const between = sw[1]?.path.map((p) => p[1]).sort((a, b) => a - b);
    expect(between?.[0]).toBeCloseTo(-17);
    expect(between?.[between.length - 1]).toBeCloseTo(17);
    const nw = runs.filter((r) => r.side === 'nw');
    expect(nw).toHaveLength(3);
    const middle = nw[1]?.path.map((p) => p[0]).sort((a, b) => a - b);
    expect(middle?.[0]).toBeCloseTo(-6);
    expect(middle?.[middle.length - 1]).toBeCloseTo(26);
  });

  it('gives a side that has no ditch at this offset to its neighbour, so no ring ends in the air', () => {
    const runs = ringRuns(shape, 6, (s) => s !== 'sw', []);
    expect(runs.map((r) => r.side)).toEqual(['ne', 'nw', 'se']);
    const se = runs.find((r) => r.side === 'se');
    expect(se?.path[0]?.[0]).toBeCloseTo(-(shape.halfLength + 6), 6);
  });

  it('leaves nothing when no side is present', () => {
    expect(ringRuns(shape, 0, () => false, [])).toEqual([]);
  });
});

describe('gateFrame', () => {
  it('puts a gate on its side’s line, looking outwards', () => {
    expect(gateFrame(shape, 'ne', 0)).toMatchObject({ at: [70, 0], out: [1, 0], angle: 90 });
    expect(gateFrame(shape, 'sw', 0)).toMatchObject({ at: [-70, 0], out: [-1, 0] });
    expect(gateFrame(shape, 'nw', 10)).toMatchObject({ at: [10, 55], out: [0, 1], angle: 0 });
    expect(gateFrame(shape, 'se', 10)).toMatchObject({ at: [10, -55], out: [0, -1] });
  });
});

describe('cornerAt', () => {
  it('finds the middle of the rounded corner after a side, on its offset ring', () => {
    const [x, y] = cornerAt(shape, -3.5, 'ne');
    const radius = shape.corner - 3.5;
    expect(
      Math.hypot(x - (shape.halfLength - shape.corner), y - (shape.halfWidth - shape.corner)),
    ).toBeCloseTo(radius);
    expect(x).toBeGreaterThan(shape.halfLength - shape.corner);
    expect(y).toBeGreaterThan(shape.halfWidth - shape.corner);
    expect(cornerAt(shape, 0, 'sw')[0]).toBeLessThan(0);
    expect(cornerAt(shape, 0, 'sw')[1]).toBeLessThan(0);
  });
});

describe('distanceToPath', () => {
  const path: readonly Pt[] = [
    [0, 0],
    [10, 0],
    [10, 10],
  ];
  it('measures to the nearest point on any segment, ends included', () => {
    expect(distanceToPath([5, 3], path)).toBeCloseTo(3);
    expect(distanceToPath([12, 5], path)).toBeCloseTo(2);
    expect(distanceToPath([-4, 0], path)).toBeCloseTo(4);
    expect(distanceToPath([10, 14], path)).toBeCloseTo(4);
  });
});

describe('roadside', () => {
  const roads: readonly (readonly Pt[])[] = [
    [
      [0, 0],
      [60, 0],
      [120, -20],
    ],
    [
      [60, 0],
      [120, 10],
    ],
  ];
  const sites = (seed: number) => roadside({ roads, count: 14, seed, nearest: 8, farthest: 24 });

  it('is the same every time for the same seed, and different for another', () => {
    expect(sites(3)).toEqual(sites(3));
    expect(sites(3)).not.toEqual(sites(4));
  });

  it('keeps every house off the road and clear of the others, and within reach of a road', () => {
    const list = sites(3);
    expect(list).toHaveLength(14);
    for (const a of list) {
      const to = Math.min(...roads.map((r) => distanceToPath(a.at, r)));
      expect(to).toBeGreaterThanOrEqual(8 - 1e-9);
      expect(to).toBeLessThanOrEqual(24 + a.length / 2);
    }
    for (const [i, a] of list.entries())
      for (const b of list.slice(i + 1))
        expect(Math.hypot(a.at[0] - b.at[0], a.at[1] - b.at[1])).toBeGreaterThan((a.length + b.length) / 2);
  });

  it('turns the houses every which way, not in rows: no two in a row are parallel', () => {
    const angles = sites(3).map((s) => s.angle);
    const mean = angles.reduce((a, b) => a + b, 0) / angles.length;
    const spread = Math.sqrt(angles.reduce((a, b) => a + (b - mean) ** 2, 0) / angles.length);
    expect(spread).toBeGreaterThan(12);
    const near = angles.filter((a, i) => i > 0 && Math.abs(a - (angles[i - 1] ?? 0)) < 2);
    expect(near).toHaveLength(0);
  });
});
