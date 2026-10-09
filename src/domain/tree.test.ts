import { describe, expect, it } from 'vitest';
import { leafRolls, treeSeed, treeTraits } from './tree.ts';

describe('a tree keeps its identity when the mesh around it is renumbered', () => {
  it('has a seed that depends only on where its triangle is', () => {
    expect(treeSeed(12.5, -80.25)).toBe(treeSeed(12.5, -80.25));
    expect(treeSeed(12.5, -80.25)).not.toBe(treeSeed(12.5, -80.2));
    expect(treeSeed(12.5, -80.25)).not.toBe(treeSeed(-80.25, 12.5));
  });

  it('shrugs off float noise far below the grid it rounds to', () => {
    expect(treeSeed(12.5 + 1e-9, -80.25 - 1e-9)).toBe(treeSeed(12.5, -80.25));
  });

  it('gives a million triangle centres nearly all different seeds', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 1000; i++)
      for (let j = 0; j < 1000; j++) seen.add(treeSeed(i * 0.9 - 450, j * 0.9 - 450));
    expect(seen.size).toBeGreaterThan(995_000);
  });

  it('keeps every trait in its range and the same for the same seed', () => {
    for (let s = 0; s < 2000; s++) {
      const t = treeTraits(treeSeed(s * 0.37, s * 0.11));
      expect(t).toEqual(treeTraits(treeSeed(s * 0.37, s * 0.11)));
      expect(t.rank).toBeGreaterThanOrEqual(0);
      expect(t.rank).toBeLessThanOrEqual(1);
      expect(t.scale).toBeGreaterThanOrEqual(1.5);
      expect(t.scale).toBeLessThanOrEqual(2.4);
      expect(Math.abs(t.jitterX)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(t.jitterZ)).toBeLessThanOrEqual(1.5);
      expect(t.shade).toBeGreaterThanOrEqual(0.75);
      expect(t.shade).toBeLessThanOrEqual(1.1);
      expect(t.tallness).toBeGreaterThanOrEqual(0.9);
      expect(t.tallness).toBeLessThanOrEqual(1.25);
    }
  });

  it('draws its leaf colours from the same seed too', () => {
    const seed = treeSeed(3, 4);
    expect(leafRolls(seed)).toEqual(leafRolls(seed));
    expect(leafRolls(seed)).not.toEqual(leafRolls(treeSeed(3, 4.5)));
  });

  it('has traits that do not depend on any index: the same seed gives the same tree wherever it is numbered', () => {
    const triangles = [treeSeed(1, 1), treeSeed(2, 2), treeSeed(3, 3)];
    const renumbered = [triangles[2], triangles[0], triangles[1]].map((s) => treeTraits(s ?? 0).rank);
    const original = triangles.map((s) => treeTraits(s).rank);
    expect(renumbered).toEqual([original[2], original[0], original[1]]);
  });
});
