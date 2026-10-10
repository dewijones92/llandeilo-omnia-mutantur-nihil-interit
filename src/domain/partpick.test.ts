import { describe, expect, it } from 'vitest';
import { enterBox, hitTriangle, partRuns, pickPart, runTriangles } from './partpick.ts';

// Two unit squares facing the viewer (+z), each two triangles: part a at z=0 from x 0 to 1, part b at z=-2 from x 0 to 2.
const square = (x0: number, x1: number, z: number): number[] => {
  const corners: readonly (readonly [number, number])[] = [
    [x0, 0],
    [x1, 0],
    [x1, 1],
    [x0, 0],
    [x1, 1],
    [x0, 1],
  ];
  return corners.flatMap(([x, y]) => [x, y, z]);
};
const positions = [...square(0, 1, 0), ...square(0, 2, -2)];
const runs = partRuns(positions, [
  { id: 'a', from: 0 },
  { id: 'b', from: 2 },
]);

describe('picking a part of a model in 3D (ADR 0055)', () => {
  it('keeps each part’s run of triangles and the box round it', () => {
    expect(runs.map((r) => [r.id, r.from, r.to])).toEqual([
      ['a', 0, 2],
      ['b', 2, 4],
    ]);
    expect(runs[1]?.min).toEqual([0, 0, -2]);
    expect(runs[1]?.max).toEqual([2, 1, -2]);
  });

  it('drops a part with no triangles rather than give it an empty box', () => {
    expect(
      partRuns(positions, [
        { id: 'x', from: 0 },
        { id: 'a', from: 0 },
        { id: 'b', from: 2 },
      ]).map((r) => r.id),
    ).toEqual(['a', 'b']);
  });

  it('returns the nearest part the ray meets, and the one behind where the front one is not', () => {
    expect(pickPart([0.5, 0.5, 5], [0, 0, -1], positions, runs)).toEqual({ id: 'a', distance: 5 });
    expect(pickPart([1.5, 0.5, 5], [0, 0, -1], positions, runs)).toEqual({ id: 'b', distance: 7 });
    expect(pickPart([3, 0.5, 5], [0, 0, -1], positions, runs)).toBeUndefined();
  });

  it('meets a face from either side, but nothing behind the ray', () => {
    expect(hitTriangle([0.2, 0.2, -5], [0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 1, 0])).toBeCloseTo(5);
    expect(hitTriangle([0.2, 0.2, 5], [0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 1, 0])).toBeUndefined();
    expect(hitTriangle([0.2, 0.2, 5], [1, 0, 0], [0, 0, 0], [1, 0, 0], [1, 1, 0])).toBeUndefined();
  });

  it('enters a box from outside, from inside at once, and misses one beside or behind the ray', () => {
    expect(enterBox([0, 0, -5], [0, 0, 1], [-1, -1, -1], [1, 1, 1])).toBeCloseTo(4);
    expect(enterBox([0, 0, 0], [0, 0, 1], [-1, -1, -1], [1, 1, 1])).toBe(0);
    expect(enterBox([3, 0, -5], [0, 0, 1], [-1, -1, -1], [1, 1, 1])).toBeUndefined();
    expect(enterBox([0, 0, 5], [0, 0, 1], [-1, -1, -1], [1, 1, 1])).toBeUndefined();
  });

  it('hands back just a part’s own triangles, for the veil drawn over it', () => {
    const b = runs[1];
    expect(b && runTriangles(positions, b)).toEqual(square(0, 2, -2));
  });
});
