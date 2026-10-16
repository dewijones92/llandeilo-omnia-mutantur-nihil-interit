import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import { applyEdits } from './groundedit.ts';
import type { Part, Plan } from './plan.ts';
import { footprint, footprintSamples, seatOf, seats, terraceEdits } from './plot.ts';
import type { SourceId } from './provenance.ts';
import { ad, range } from './time.ts';

const tower = (shape: 'square' | 'round', angle?: number): Extract<Part, { type: 'tower' }> => ({
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
    expect(round).toHaveLength(8);
    for (const [x, y] of round) expect(Math.hypot(x - 10, y)).toBeCloseTo(2);
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
  const terrace = (provenance?: typeof basis): Part => ({
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
