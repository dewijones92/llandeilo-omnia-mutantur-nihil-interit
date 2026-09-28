import { describe, expect, it } from 'vitest';
import { rng } from './noise.ts';
import {
  archSoffit,
  covers,
  divide,
  footprintContains,
  hidesFootprint,
  insideConvex,
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

describe('divide', () => {
  it('splits a length into the fewest pieces no longer than the maximum, and never fewer than one', () => {
    expect(divide(10, 4)).toBe(3);
    expect(divide(8, 4)).toBe(2);
    expect(divide(0.5, 4)).toBe(1);
    expect(divide(0, 4)).toBe(1);
  });
});

describe('plan geometry across every part type', () => {
  const square: readonly [number, number][] = [
    [-2, -2],
    [2, -2],
    [2, 2],
    [-2, 2],
  ];
  const parts: Part[] = [
    {
      type: 'wall',
      path: [
        [0, 0],
        [10, 0],
      ],
      height: 5,
      thickness: 1,
      top: 'plain',
      material: 'rubble',
    },
    {
      type: 'ditch',
      path: [
        [0, 0],
        [0, 12],
      ],
      width: 3,
    },
    { type: 'prism', outline: square, height: 4, top: 'plain', material: 'rubble' },
    {
      type: 'platform',
      outline: [
        [-14, 0],
        [-13, 1],
        [-13, -1],
      ],
      face: 'rock',
    },
    { type: 'bridge', from: [0, -15], to: [0, -5], width: 4, height: 6, arches: [], material: 'sandstone' },
    { type: 'tower', at: [20, 0], shape: 'round', size: 6, height: 10, top: 'plain', material: 'rubble' },
    {
      type: 'hall',
      at: [0, 30],
      length: 8,
      width: 4,
      angle: 90,
      height: 5,
      roof: 'gable',
      material: 'rubble',
    },
  ];
  const plan: Plan = { setting: 'landscape', parts };

  it('measures the extent from whichever part reaches furthest', () => {
    expect(planExtent(plan)).toBeCloseTo(Math.hypot(2, 34));
    const platform: Part = {
      type: 'platform',
      outline: [
        [-14, 0],
        [-13, 1],
        [-13, -1],
      ],
      face: 'rock',
    };
    expect(planExtent({ setting: 'landscape', parts: [platform] })).toBeCloseTo(14);
  });

  it('covers ground inside halls, prisms and towers, never under walls, ditches, platforms or bridges', () => {
    expect(covers(plan, [0, 0.5])).toBe(true);
    expect(covers(plan, [20, 2.9])).toBe(true);
    expect(covers(plan, [20, 3.1])).toBe(false);
    expect(covers(plan, [1, 33])).toBe(true);
    expect(covers(plan, [3, 30])).toBe(false);
    expect(
      covers(
        {
          setting: 'landscape',
          parts: parts.filter((q) => ['wall', 'ditch', 'platform', 'bridge'].includes(q.type)),
        },
        [0, 0],
      ),
    ).toBe(false);
  });

  it('tests convex polygons either way round, and treats a broken outline as outside', () => {
    expect(insideConvex([0, 0], square)).toBe(true);
    expect(insideConvex([0, 0], [...square].reverse())).toBe(true);
    expect(insideConvex([3, 0], square)).toBe(false);
    expect(insideConvex([2, 0], square)).toBe(true);
  });
});

describe('what survives of a part', () => {
  const stone = { material: 'rubble' as const };
  const timber = { material: 'timber' as const };

  it('keeps everything standing, and in a ruin follows the part’s own ruin data first', () => {
    expect(remains(stone, 'standing')).toBe(1);
    expect(remains({ ...stone, ruin: 'gone' }, 'ruin')).toBeUndefined();
    expect(remains({ ...stone, ruin: { stands: 0.7 } }, 'ruin')).toBe(0.7);
  });

  it('loses timber, daub and thatch in a ruin, and leaves stone at about half height', () => {
    expect(remains(timber, 'ruin')).toBeUndefined();
    expect(remains(stone, 'ruin')).toBe(0.45);
  });

  it('keeps only the named sides of a ruin, leaving footings elsewhere', () => {
    const part = { ...stone, ruin: { stands: 0.8, sides: ['n', 'e'] as const } };
    expect(sideRemains(part, 'n', 'ruin')).toBe(0.8);
    expect(sideRemains(part, 's', 'ruin')).toBe(FOOTING);
    expect(sideRemains({ ...stone, ruin: { stands: 0.8 } }, 's', 'ruin')).toBe(0.8);
    expect(sideRemains(part, 's', 'standing')).toBe(1);
    expect(sideRemains({ ...stone, ruin: 'gone' }, 'n', 'ruin')).toBeUndefined();
    expect(sideRemains(stone, 'n', 'ruin')).toBe(0.45);
  });
});
