import { describe, expect, it } from 'vitest';
import { GRAIN_STEPS, grainOf, triangleUv, type V3 } from './texturing.ts';

const span = (uv: readonly number[], axis: 0 | 1): number => {
  const vals = [uv[axis] ?? 0, uv[axis + 2] ?? 0, uv[axis + 4] ?? 0];
  return Math.max(...vals) - Math.min(...vals);
};

describe('texture coordinates for a model’s faces (ADR 0055)', () => {
  it('reads the grain the Blender script wrote into a face colour’s alpha, after Blender’s byte colours', () => {
    expect(grainOf(1 / GRAIN_STEPS)).toBe('upright');
    expect(grainOf(2 / GRAIN_STEPS)).toBe('lengthwise');
    // Bytes: 64 and 128 of 255.
    expect(grainOf(64 / 255)).toBe('upright');
    expect(grainOf(128 / 255)).toBe('lengthwise');
    expect(grainOf(1)).toBe('upright');
  });

  it('measures in metres along a wall however long it is, so a 40m face carries 40m of texture and a 4m one 4m', () => {
    for (const length of [4, 40]) {
      const uv = triangleUv([0, 0, 0], [length, 0, 0], [length, 3, 0], 'upright');
      expect(span(uv, 0)).toBeCloseTo(length);
      expect(span(uv, 1)).toBeCloseTo(3);
    }
  });

  it('runs an upright texture up a wall and up a roof’s slope, never along it', () => {
    const wall = triangleUv([0, 0, 0], [5, 0, 0], [0, 2, 0], 'upright');
    expect([wall[1], wall[5]].map((v) => (v ?? 0) - (wall[1] ?? 0))).toEqual([0, 2]);
    // A roof rising 3 in 4 to the north: its slope is 5 long, and v runs the whole of it.
    const roof = triangleUv([0, 0, 0], [6, 0, 0], [0, 3, 4], 'upright');
    expect(span(roof, 1)).toBeCloseTo(5);
    expect(span(roof, 0)).toBeCloseTo(6);
  });

  it('runs a lengthwise texture along a timber’s longest edge, lying down or standing up', () => {
    const beam: [V3, V3, V3] = [
      [0, 0, 0],
      [3, 0, 4],
      [3, 0.2, 4],
    ];
    expect(span(triangleUv(...beam, 'lengthwise'), 1)).toBeCloseTo(5);
    const post = triangleUv([0, 0, 0], [0.4, 0, 0], [0.4, 6, 0], 'lengthwise');
    expect(span(post, 1)).toBeGreaterThan(5.9);
  });

  it('gives a level face north for its v, and both triangles of a flat quad the same axes, so no seam shows', () => {
    const a = triangleUv([0, 1, 0], [2, 1, 0], [2, 1, 3], 'upright');
    const b = triangleUv([0, 1, 0], [2, 1, 3], [0, 1, 3], 'upright');
    expect(span(a, 1)).toBeCloseTo(3);
    // Shared corners land on the same coordinates in both triangles.
    const same = (x: readonly number[], i: number, y: readonly number[], j: number): void => {
      expect(x[i] ?? NaN).toBeCloseTo(y[j] ?? NaN);
      expect(x[i + 1] ?? NaN).toBeCloseTo(y[j + 1] ?? NaN);
    };
    same(b, 0, a, 0);
    same(b, 2, a, 4);
    const c = triangleUv([0, 0, 0], [6, 0, 0.3], [6, 2, 0.3], 'lengthwise');
    const d = triangleUv([0, 0, 0], [6, 2, 0.3], [0, 2, 0], 'lengthwise');
    same(d, 0, c, 0);
    same(d, 2, c, 4);
  });
});
