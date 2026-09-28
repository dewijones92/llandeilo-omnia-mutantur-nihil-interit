import { describe, expect, it } from 'vitest';
import { rng } from './noise.ts';
import {
  archSoffit,
  covers,
  footprintContains,
  hidesFootprint,
  FOOTING,
  planExtent,
  remains,
  ruinHeights,
  sideRemains,
  toPlanLocal,
  type Part,
  type Plan,
} from './plan.ts';

const tower: Part = {
  type: 'tower',
  at: [0, 0],
  shape: 'square',
  size: 9,
  height: 29,
  top: 'pyramid',
  material: 'rubble',
  ruin: { stands: 0.9, sides: ['n', 'e'] },
};

const hall: Part = {
  type: 'hall',
  at: [10, 0],
  length: 20,
  width: 6,
  angle: 90,
  height: 8,
  roof: 'gable',
  material: 'rubble',
};

describe('building plans', () => {
  it('shapes an elliptical arch that springs at its ends and peaks at its rise', () => {
    const arch = { at: 50, span: 44.2, rise: 12.65 };
    expect(archSoffit(arch, 50)).toBeCloseTo(12.65);
    expect(archSoffit(arch, 50 + 22.09) ?? -1).toBeCloseTo(0.38, 1);
    expect(archSoffit(arch, 50 - 23)).toBeUndefined();
    const quarter = archSoffit(arch, 50 + 11.05) ?? 0;
    expect(quarter).toBeCloseTo(12.65 * Math.sqrt(0.75));
  });

  it('measures how far a plan reaches from its grid reference', () => {
    const plan: Plan = { setting: 'landscape', parts: [tower, hall] };
    expect(planExtent(plan)).toBeCloseTo(Math.hypot(13, 10));
  });

  it('knows which points a rotated plan covers', () => {
    const plan: Plan = { setting: 'map', angle: 90, parts: [hall] };
    expect(covers(plan, toPlanLocal(plan, 0, 10))).toBe(true);
    expect(covers(plan, toPlanLocal(plan, 10, 0))).toBe(false);
    expect(covers(plan, toPlanLocal(plan, 0, 25))).toBe(false);
  });

  it('keeps named walls standing and reduces the rest to footings', () => {
    expect(remains(tower, 'standing')).toBe(1);
    expect(sideRemains(tower, 'n', 'ruin')).toBe(0.9);
    expect(sideRemains(tower, 'e', 'ruin')).toBe(0.9);
    expect(sideRemains(tower, 's', 'ruin')).toBe(FOOTING);
  });

  it('lets timber rot away in a ruin unless told otherwise', () => {
    const stable: Part = { ...hall, material: 'daub' };
    expect(remains(stable, 'ruin')).toBeUndefined();
    expect(remains(stable, 'standing')).toBe(1);
    expect(remains({ ...hall, ruin: 'gone' }, 'ruin')).toBeUndefined();
  });

  it('breaks ruined walls deterministically, never above what stands', () => {
    const a = ruinHeights(rng(7), 0.5, 40);
    const b = ruinHeights(rng(7), 0.5, 40);
    expect(a).toEqual(b);
    expect(Math.max(...a)).toBeLessThanOrEqual(0.5);
    expect(Math.min(...a)).toBeGreaterThanOrEqual(FOOTING);
    expect(new Set(a.map((h) => h.toFixed(3))).size).toBeGreaterThan(10);
  });

  it('recognises an OS footprint that contains a landmark’s grid reference', () => {
    const box = { e: 100, n: 200, width: 120, depth: 60, angle: Math.PI / 2 };
    expect(footprintContains(box, { e: 100, n: 255 })).toBe(true);
    expect(footprintContains(box, { e: 135, n: 200 })).toBe(false);
    expect(footprintContains(box, { e: 125, n: 200 })).toBe(true);
  });

  it('hides an OS footprint only when it is the landmark itself, or under an in-map model', () => {
    const house: Plan = { setting: 'landscape', parts: [hall] };
    const church: Plan = { setting: 'map', parts: [hall] };
    const at = { e: 1000, n: 1000 };
    const neighbour = { e: 1010, n: 1005, width: 6, depth: 4, angle: 0 };
    const itself = { e: 1002, n: 1001, width: 30, depth: 20, angle: 0 };
    expect(hidesFootprint(house, at, itself)).toBe(true);
    expect(hidesFootprint(house, at, neighbour)).toBe(false);
    expect(hidesFootprint(church, at, neighbour)).toBe(true);
    expect(hidesFootprint(church, at, { ...neighbour, e: 1040 })).toBe(false);
  });
});
