import { describe, expect, it } from 'vitest';
import { bearingOf, northAlpha } from './compass.ts';

describe('compass', () => {
  it('reads the bearing the camera is facing, clockwise from north', () => {
    expect(bearingOf(-Math.PI / 2)).toBeCloseTo(0);
    expect(bearingOf(Math.PI)).toBeCloseTo(90);
    expect(bearingOf(Math.PI / 2)).toBeCloseTo(180);
    expect(bearingOf(0)).toBeCloseTo(270);
  });

  it('stays in 0 to 360 however far the camera has spun', () => {
    for (const alpha of [-20, -7.5, 3.3, 12, 40]) {
      const b = bearingOf(alpha);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThan(360);
    }
  });

  it('turns to face north the short way from wherever the camera is', () => {
    for (const alpha of [-20, -1, 0, 2.5, 3.3, 12, 40]) {
      const target = northAlpha(alpha);
      expect(bearingOf(target)).toBeCloseTo(0);
      expect(Math.abs(target - alpha)).toBeLessThanOrEqual(Math.PI + 1e-9);
    }
  });
});
