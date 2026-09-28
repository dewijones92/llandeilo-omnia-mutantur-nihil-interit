import { describe, expect, it } from 'vitest';
import { Surface } from './surface.ts';

const slope = [0, 0, 0, 100, 10, 0, 0, 0, 100, 100, 10, 0, 100, 10, 100, 0, 0, 100];

describe('surface height lookup', () => {
  it('interpolates within the triangle under a point', () => {
    const s = new Surface(slope, 25);
    expect(s.heightAt(50, 50)).toBeCloseTo(5);
    expect(s.heightAt(10, 90)).toBeCloseTo(1);
    expect(s.heightAt(90, 10)).toBeCloseTo(9);
  });

  it('answers exactly on shared edges and corners', () => {
    const s = new Surface(slope, 25);
    expect(s.heightAt(0, 0)).toBeCloseTo(0);
    expect(s.heightAt(100, 100)).toBeCloseTo(10);
    expect(s.heightAt(50, 0)).toBeCloseTo(5);
  });

  it('says it does not know outside the mesh', () => {
    const s = new Surface(slope, 25);
    expect(s.heightAt(150, 50)).toBeUndefined();
    expect(s.heightAt(-1, -1)).toBeUndefined();
  });
});
