import { describe, expect, it } from 'vitest';
import { HALO_KINDS, HALOS, haloSize, unitsPerPixel } from './halo.ts';

const FOV = 0.8;
const SCREEN = 1080;

describe('unitsPerPixel', () => {
  it('is how many world units one screen pixel covers at a distance', () => {
    expect(unitsPerPixel(1000, FOV, SCREEN)).toBeCloseTo((2 * 1000 * Math.tan(0.4)) / 1080, 9);
    expect(unitsPerPixel(2000, FOV, SCREEN)).toBeCloseTo(2 * unitsPerPixel(1000, FOV, SCREEN), 9);
  });
});

describe('haloSize', () => {
  it('keeps its own size close up, where that is bigger than the minimum on screen', () => {
    for (const kind of HALO_KINDS) expect(haloSize(HALOS[kind], 20, FOV, SCREEN)).toBe(HALOS[kind].worldSize);
  });

  it('grows with distance so a light far off is still a few pixels across, not lost', () => {
    for (const kind of HALO_KINDS) {
      const spec = HALOS[kind];
      const far = haloSize(spec, 3500, FOV, SCREEN);
      expect(far).toBeGreaterThan(spec.worldSize);
      expect(far / unitsPerPixel(3500, FOV, SCREEN)).toBeCloseTo(spec.minPixels, 6);
    }
  });

  it('shows a street lamp at least as large on screen as a lit window, and a hearth larger still', () => {
    expect(HALOS.street.minPixels).toBeGreaterThanOrEqual(HALOS.window.minPixels);
    expect(HALOS.hearth.worldSize).toBeGreaterThan(HALOS.window.worldSize);
  });
});
