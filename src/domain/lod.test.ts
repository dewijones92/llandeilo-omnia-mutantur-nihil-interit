import { describe, expect, it } from 'vitest';
import { levelFor, NEAR } from './lod.ts';

describe('levelFor', () => {
  it('draws a monument in full when the camera is within reach, and from afar when it is not', () => {
    expect(levelFor(NEAR * 0.5, 'far')).toBe('near');
    expect(levelFor(NEAR * 3, 'near')).toBe('far');
  });

  it('keeps the level it had while the camera hovers on the edge, so the meshes do not swap every frame', () => {
    expect(levelFor(NEAR * 1.05, 'near')).toBe('near');
    expect(levelFor(NEAR * 1.05, 'far')).toBe('far');
    expect(levelFor(NEAR * 1.16, 'near')).toBe('far');
    expect(levelFor(NEAR * 0.99, 'far')).toBe('near');
  });
});
