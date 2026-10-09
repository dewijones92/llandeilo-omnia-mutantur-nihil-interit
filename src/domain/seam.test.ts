import { describe, expect, it } from 'vitest';
import { onRim, rimGap, type RimBox } from './seam.ts';

const box: RimBox = { xMin: 0, xMax: 100, zMin: 0, zMax: 60 };

// x, y, z triples
const verts = (...v: [number, number, number][]): number[] => v.flat();

describe('the seam where the detail meets the coarse terrain', () => {
  const base = verts([0, 1, 0], [40, 3, 0], [80, 2, 0], [100, 2, 0], [100, 4, 60], [100, 4, 30], [20, 9, 33]);

  it('finds no gap where the detail follows the base along the rim', () => {
    const detail = verts([20, 2, 0], [40, 3, 0], [60, 2.5, 0], [100, 4, 45]);
    const r = rimGap(box, base, detail);
    expect(r.maxGap).toBeCloseTo(0);
    expect(r.detailVertices).toBe(4);
    expect(r.unmatched).toBe(0);
  });

  it('measures how far a detail vertex sits above or below the base line', () => {
    const r = rimGap(box, base, verts([60, 3, 0], [100, 4.5, 45]));
    expect(r.maxGap).toBeCloseTo(0.5);
  });

  it('counts the base vertices on the rim and ignores those inside it', () => {
    expect(rimGap(box, base, []).baseVertices).toBe(6);
  });

  it('ignores detail vertices that are not on the rim', () => {
    const r = rimGap(box, base, verts([50, 99, 20], [20, 2, 0]));
    expect(r.detailVertices).toBe(1);
  });

  it('counts a detail vertex on the rim with no base vertices round it as unmatched', () => {
    const r = rimGap(box, base, verts([60, 3, 60]));
    expect(r.detailVertices).toBe(1);
    expect(r.unmatched).toBe(1);
  });

  it('reads all four sides of the rim', () => {
    const square = verts([0, 5, 0], [0, 7, 60], [100, 7, 0], [100, 9, 60], [50, 1, 0], [50, 1, 60]);
    const r = rimGap(box, square, verts([0, 6, 30], [100, 8, 30], [50, 1, 0], [50, 1, 60]));
    expect(r.unmatched).toBe(0);
    expect(r.maxGap).toBeCloseTo(0, 5);
  });
});

describe('the rim of a box', () => {
  it('holds the points on any of its four sides, within a tolerance', () => {
    expect(onRim(box, 50, 0)).toBe(true);
    expect(onRim(box, 50, 60)).toBe(true);
    expect(onRim(box, 0, 30)).toBe(true);
    expect(onRim(box, 100, 30)).toBe(true);
    expect(onRim(box, 100.0005, 30)).toBe(true);
    expect(onRim(box, 50, 30)).toBe(false);
    expect(onRim(box, 100.01, 30)).toBe(false);
    expect(onRim(box, 50, 30, 100)).toBe(true);
  });
});
