import { describe, expect, it } from 'vitest';
import { BANK_M, carveChannel, RiverIndex } from './rivers.ts';

const straight = {
  width: 40,
  points: [
    { e: 0, n: 0 },
    { e: 45, n: 0 },
    { e: 90, n: 0 },
    { e: 135, n: 0 },
  ],
  levels: [10, 9.5, 9, 8.5],
};

describe('the river index', () => {
  const rivers = new RiverIndex([straight]);

  it('knows when a river is within a cell or so', () => {
    expect(rivers.near(0, 0)).toBe(true);
    expect(rivers.near(150, 150)).toBe(true);
    expect(rivers.near(2000, 2000)).toBe(false);
  });

  it('measures to the edge of the water from the river points it samples', () => {
    expect(rivers.distance(45, 30, 300)).toBeCloseTo(Math.hypot(45, 30) - 20);
    expect(rivers.distance(5000, 5000, 300)).toBe(Infinity);
  });

  it('gives the channel under a point: how far from the line, how wide, how low', () => {
    const c = rivers.channelAt(45, 10);
    expect(c?.distance).toBeCloseTo(10);
    expect(c?.halfWidth).toBe(20);
    expect(c?.level).toBeCloseTo(9.5);
    expect(rivers.channelAt(22.5, 5)?.level).toBeCloseTo(9.75);
    expect(rivers.channelAt(60, -8)?.distance).toBeCloseTo(8);
  });

  it('measures to the line itself, not to the nearest sampled point', () => {
    expect(rivers.channelAt(67.5, 0)?.distance).toBeCloseTo(0);
  });

  it('has no channel beyond the banks', () => {
    expect(rivers.channelAt(45, 20 + BANK_M + 1)).toBeUndefined();
    expect(rivers.channelAt(45, 20 + BANK_M - 1)).toBeDefined();
    expect(rivers.channelAt(-400, 0)).toBeUndefined();
  });

  it('takes the river whose water is nearest where two lie close', () => {
    const both = new RiverIndex([
      straight,
      {
        width: 10,
        points: [
          { e: 0, n: 30 },
          { e: 45, n: 30 },
        ],
        levels: [20, 20],
      },
    ]);
    expect(both.channelAt(20, 24)?.level).toBeCloseTo(20);
    expect(both.channelAt(20, 8)?.level).toBeCloseTo(9.778);
  });
});

describe('carving a channel', () => {
  const at = (distance: number) => ({ distance, halfWidth: 20, level: 9.5 });

  it('brings the ground down to the water across the channel', () => {
    expect(carveChannel(12, at(0))).toBeCloseTo(9.5);
    expect(carveChannel(12, at(20))).toBeCloseTo(9.5);
  });

  it('leaves ground that is already lower alone', () => {
    expect(carveChannel(8, at(0))).toBe(8);
  });

  it('eases back up the banks and leaves the ground beyond them untouched', () => {
    expect(carveChannel(12, at(20 + BANK_M / 2))).toBeCloseTo(10.75);
    expect(carveChannel(12, at(20 + BANK_M))).toBe(12);
    expect(carveChannel(12, at(500))).toBe(12);
  });

  it('can be eased off by a weight, as it is near the edge of the detail region', () => {
    expect(carveChannel(12, at(0), 0)).toBe(12);
    expect(carveChannel(12, at(0), 0.5)).toBeCloseTo(10.75);
  });
});
