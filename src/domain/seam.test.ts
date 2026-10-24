import { describe, expect, it } from 'vitest';
import { onRim, rimGap, rimTopology, type RimBox } from './seam.ts';

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

  it('holds only the points on the rim itself, not on its sides carried on beyond the box', () => {
    expect(onRim(box, 150, 0)).toBe(false);
    expect(onRim(box, -40, 60)).toBe(false);
    expect(onRim(box, 0, 90)).toBe(false);
    expect(onRim(box, 100, -0.5)).toBe(false);
    expect(onRim(box, 100.0005, 60.0005)).toBe(true);
  });

  it('leaves out of the gap and the edge count what lies on a side carried on beyond the box', () => {
    // A second region's rim vertex on this box's south line, 50 units east of it.
    const r = rimGap(box, verts([0, 1, 0], [100, 1, 0]), verts([150, 9, 0], [50, 1, 0]));
    expect(r.detailVertices).toBe(1);
    expect(r.unmatched).toBe(0);
    expect(r.maxGap).toBeCloseTo(0);
    const beyond = verts([120, 0, 0], [160, 0, 0], [140, 0, 20]);
    expect(rimTopology(box, beyond).rimEdges).toBe(0);
  });
});

describe('the topology of the coarse terrain at the rim', () => {
  // A ring of triangles round a box: x, y, z triples, three corners to a triangle.
  const tri = (...c: [number, number][]): number[] => c.flatMap(([x, z]) => [x, 0, z]);
  const outside = [
    ...tri([-10, -10], [0, 0], [50, 0]),
    ...tri([-10, -10], [50, 0], [100, 0]),
    ...tri([100, 0], [100, 60], [120, 30]),
  ];

  it('finds no corner inside the box and counts each rim edge once, even where two triangles share it', () => {
    const t = rimTopology(box, [...outside, ...tri([50, 0], [0, 0], [-10, 20])]);
    expect(t.inside).toBe(0);
    // (0,0)-(50,0) is drawn twice; (50,0)-(100,0) once; (100,0)-(100,60) once.
    expect(t.rimEdges).toBe(3);
  });

  it('counts a corner strictly inside the box, which means a triangle crosses the rim', () => {
    const t = rimTopology(box, [...outside, ...tri([-10, 10], [30, 30], [0, 50])]);
    expect(t.inside).toBe(1);
  });

  it('does not count an edge that joins two sides, or one that merely touches the rim at a corner', () => {
    const t = rimTopology(box, tri([0, 0], [100, 60], [-20, 80]));
    expect(t.rimEdges).toBe(0);
    expect(t.inside).toBe(0);
  });
});
