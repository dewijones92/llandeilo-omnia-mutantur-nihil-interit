import { describe, expect, it } from 'vitest';
import { inWorldBox } from './geo.ts';

describe('a box in world units', () => {
  const box = { xMin: -10, xMax: 20, zMin: 5, zMax: 15 };

  it('holds the points on and inside its edges', () => {
    expect(inWorldBox(box, 0, 10)).toBe(true);
    expect(inWorldBox(box, -10, 5)).toBe(true);
    expect(inWorldBox(box, 20, 15)).toBe(true);
  });

  it('leaves out a point beyond any one edge', () => {
    expect(inWorldBox(box, -10.1, 10)).toBe(false);
    expect(inWorldBox(box, 20.1, 10)).toBe(false);
    expect(inWorldBox(box, 0, 4.9)).toBe(false);
    expect(inWorldBox(box, 0, 15.1)).toBe(false);
  });
});
