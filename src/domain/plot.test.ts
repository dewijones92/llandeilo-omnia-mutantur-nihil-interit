import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import { applyEdits } from './groundedit.ts';
import { SETTING_SCALE } from './materials.ts';
import type { Part, Plan } from './plan.ts';
import {
  columnTops,
  floorFromTops,
  footprint,
  footprintSamples,
  seatOf,
  seats,
  terraceEdits,
} from './plot.ts';
import type { SourceId } from './provenance.ts';
import { ad, range } from './time.ts';

const tower = (
  shape: Extract<Part, { type: 'tower' }>['shape'],
  angle?: number,
): Extract<Part, { type: 'tower' }> => ({
  type: 'tower',
  at: [10, 0],
  shape,
  size: 4,
  height: 6,
  top: 'plain',
  material: 'timber',
  ...(angle === undefined ? {} : { angle }),
});

const basis = {
  kind: 'reconstructed' as const,
  basis: { en: 'test', cy: 'prawf' },
  sources: [mint<SourceId>('test:S1')],
};

describe('where a building stands (ADR 0056)', () => {
  it('reads a square tower’s corners turned by its angle, and a round one’s ring', () => {
    const square = footprint(tower('square', 45));
    expect(square).toHaveLength(4);
    for (const [x, y] of square) expect(Math.hypot(x - 10, y)).toBeCloseTo(Math.SQRT2 * 2);
    expect(Math.max(...square.map(([x]) => x))).toBeCloseTo(10 + Math.SQRT2 * 2);
    const round = footprint(tower('round'));
    expect(round).toHaveLength(10);
    for (const [x, y] of round) expect(Math.hypot(x - 10, y)).toBeCloseTo(2);
  });

  it('reads a hexagonal and an octagonal tower at the corners the renderer draws, further out than its radius', () => {
    const hex = footprint({ ...tower('square'), shape: 'hexagonal' });
    expect(hex).toHaveLength(6);
    for (const [x, y] of hex) expect(Math.hypot(x - 10, y)).toBeCloseTo(2 / Math.cos(Math.PI / 6));
    const oct = footprint({ ...tower('square'), shape: 'octagonal', angle: 10 });
    expect(oct).toHaveLength(8);
    for (const [x, y] of oct) expect(Math.hypot(x - 10, y)).toBeCloseTo(2 / Math.cos(Math.PI / 8));
    const first = oct[0] ?? [0, 0];
    expect(Math.atan2(first[1], first[0] - 10)).toBeCloseTo(((22.5 + 10) * Math.PI) / 180);
    expect(Math.max(...hex.map(([x]) => x))).toBeCloseTo(10 + 2 / Math.cos(Math.PI / 6));
  });

  it('reads a prism’s own outline, and samples corners, side middles and the centre', () => {
    const prism: Extract<Part, { type: 'prism' }> = {
      type: 'prism',
      outline: [
        [0, 0],
        [4, 0],
        [4, 2],
        [0, 2],
      ],
      height: 3,
      top: 'plain',
      material: 'rubble',
    };
    expect(footprint(prism)).toEqual(prism.outline);
    const samples = footprintSamples(prism);
    expect(samples).toHaveLength(9);
    expect(samples).toContainEqual([2, 0]);
    expect(samples.at(-1)).toEqual([2, 1]);
  });

  it('puts the floor at the highest ground under the footprint, and reports what one point would have given', () => {
    const slope = ([x]: readonly [number, number]): number => x;
    expect(seatOf(tower('square'), slope)).toBeCloseTo(12);
    const plan: Plan = { setting: 'true', parts: [{ ...tower('square'), id: 't' }] };
    const [s] = seats(plan, slope);
    expect(s).toEqual({ id: 't', floor: 12, atPoint: 10, lowest: 8, highest: 12 });
  });
});

describe('terraces as ground edits', () => {
  const terrace = (provenance?: typeof basis): Extract<Part, { type: 'terrace' }> => ({
    type: 'terrace',
    at: [0, 0],
    length: 20,
    width: 10,
    angle: 90,
    batter: 2,
    carries: [],
    id: 'plot',
    ...(provenance ? { provenance } : {}),
  });

  it('levels each at the mean height of the ground across it, turned with its plan', () => {
    const plan: Plan = { setting: 'true', angle: 30, parts: [terrace(basis)] };
    const [edit] = terraceEdits({
      feature: 'f',
      plan,
      at: { e: 1000, n: 500 },
      when: range(ad(74), ad(78)),
      baseMetres: (g) => 50 + (g.n - 500) * 0.1,
    });
    if (edit?.shape.kind !== 'terrace') throw new Error('no terrace');
    expect(edit.id).toBe('f:plot');
    expect(edit.shape.metres).toBeCloseTo(50);
    expect(edit.shape.angle).toBe(120);
    expect(applyEdits(51, { e: 1000, n: 510 }, [edit])).toBeCloseTo(50);
    expect(edit.area.eMin).toBeLessThan(1000 - 5);
    expect(edit.area.nMax).toBeGreaterThan(500 + 5);
  });

  it('puts a terrace on a landscape-scale plan where the plan draws its buildings, at the setting’s scale', () => {
    const across = SETTING_SCALE.landscape.across;
    const input = {
      feature: 'f',
      at: { e: 1000, n: 500 },
      when: range(ad(74), ad(78)),
      baseMetres: () => 50,
    };
    const edit = (setting: Plan['setting']) =>
      terraceEdits({ ...input, plan: { setting, parts: [{ ...terrace(basis), at: [30, 10] }] } })[0];
    const true_ = edit('true');
    const scaled = edit('landscape');
    if (true_?.shape.kind !== 'terrace' || scaled?.shape.kind !== 'terrace') throw new Error('no terrace');
    expect(scaled.shape.halfLength).toBeCloseTo(true_.shape.halfLength * across);
    expect(scaled.shape.centre.e - 1000).toBeCloseTo((true_.shape.centre.e - 1000) * across);
    expect(scaled.shape.centre.n - 500).toBeCloseTo((true_.shape.centre.n - 500) * across);
  });

  it('refuse a terrace that does not say what it rests on', () => {
    const plan: Plan = { setting: 'true', parts: [terrace()] };
    expect(() =>
      terraceEdits({
        feature: 'f',
        plan,
        at: { e: 0, n: 0 },
        when: range(ad(1), ad(2)),
        baseMetres: () => 0,
      }),
    ).toThrow(/provenance/);
  });
});

describe('reading a part’s floor off what was drawn (ADR 0056)', () => {
  // Two triangles of a box 4m across: a wall top at y=6 over (0,0), (4,0) and (4,4), and a peak at y=9 over (2,2).
  const positions = [0, 6, 0, 4, 6, 0, 4, 6, 4, 0, 6, 0, 2, 9, 2, 4, 6, 4];
  const corners = [
    [0, 0],
    [4, 0],
    [4, 4],
    [9, 9],
  ] as const;

  it('takes the highest vertex near each corner, and nothing where none is near', () => {
    expect(columnTops(positions, { from: 0, to: 2 }, [0, 0, 0], corners, 0.1)).toEqual([6, 6, 6, undefined]);
  });

  it('moves with the mesh’s position and stretch, and reads only its own run', () => {
    expect(columnTops(positions, { from: 0, to: 2 }, [10, 100, 20], [[14, 20]], 0.1, 2)).toEqual([112]);
    expect(columnTops(positions, { from: 1, to: 2 }, [0, 0, 0], [[0, 0]], 0.1)).toEqual([6]);
    expect(columnTops(positions, { from: 1, to: 2 }, [0, 0, 0], [[2, 2]], 0.1)).toEqual([9]);
    expect(columnTops(positions, { from: 0, to: 1 }, [0, 0, 0], [[2, 2]], 0.1)).toEqual([undefined]);
  });

  it('gives the floor as the lowest wall top less the wall’s height, so a merlon never lowers it', () => {
    expect(floorFromTops([6, 7.2, 6], 4)).toBe(2);
    expect(floorFromTops([7.2, 6.5, undefined], 4)).toBe(2.5);
    expect(floorFromTops([undefined], 4)).toBeUndefined();
  });
});
