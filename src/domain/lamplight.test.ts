import { describe, expect, it } from 'vitest';
import type { NonEmptyArray } from './assert.ts';
import {
  insideArea,
  lampAlmanacAt,
  lampColour,
  lampsAt,
  lampStyleAt,
  streetLampPoints,
  type LampKey,
  type LitArea,
} from './lamplight.ts';
import { ad } from './time.ts';

const basis = { kind: 'reconstructed', basis: { en: 'test', cy: 'prawf' }, sources: [] } as const;
const town: LitArea = {
  id: 'test-town',
  label: { en: 'town', cy: 'tref' },
  outline: [
    { e: 0, n: -50 },
    { e: 400, n: -50 },
    { e: 400, n: 50 },
    { e: 0, n: 50 },
  ],
};
const fire: LampKey = {
  year: ad(1000),
  dated: 'by',
  homes: 'hearth',
  streets: { kind: 'none' },
  warmth: 1,
  windows: 0.2,
  glow: 0.4,
  hearth: 1,
  text: { en: 'fire', cy: 'tân' },
  provenance: basis,
};
const gas: LampKey = {
  ...fire,
  year: ad(1876),
  homes: 'oil-lamp',
  streets: { kind: 'gas', glow: 0.8, area: town },
  text: { en: 'gas', cy: 'nwy' },
};
const blackout: LampKey = {
  ...fire,
  year: ad(1939.67),
  dated: 'on',
  homes: 'blacked-out',
  streets: { kind: 'off' },
  windows: 0,
  glow: 0,
  hearth: 0,
  text: { en: 'blackout', cy: 'blacowt' },
};
const keys: NonEmptyArray<LampKey> = [fire, gas, blackout];

describe('lampStyleAt', () => {
  it('holds each key until the next, with no blend between technologies', () => {
    expect(lampStyleAt(keys, ad(1875.9))?.streets.kind).toBe('none');
    expect(lampStyleAt(keys, ad(1876))?.streets.kind).toBe('gas');
    expect(lampStyleAt(keys, ad(1900))).toBe(gas);
    expect(lampStyleAt(keys, ad(1939.7))?.homes).toBe('blacked-out');
  });

  it('has no key before the first, where nothing is known, and holds the last key after it', () => {
    expect(lampStyleAt(keys, ad(-5000))).toBeUndefined();
    expect(lampStyleAt(keys, ad(2026))).toBe(blackout);
  });
});

describe('lampAlmanacAt', () => {
  it('gives the almanac the current key’s words and provenance, over the years it holds', () => {
    const e = lampAlmanacAt(keys, ad(1900));
    if (!e) throw new Error('no entry in 1900');
    expect(e.topic).toBe('light');
    expect(e.text).toBe(gas.text);
    expect(e.provenance).toBe(gas.provenance);
    expect([e.when.from, e.when.to]).toEqual([1876, 1939.67]);
    expect(lampAlmanacAt(keys, ad(2000))?.when.to).toBe(2026);
  });

  it('says nothing before the first key, rather than stretching the first key back over years it does not cover', () => {
    expect(lampAlmanacAt(keys, ad(999))).toBeUndefined();
  });
});

describe('lampsAt', () => {
  it('scales windows, hearths and street lamps by the time-of-day level', () => {
    const night = lampsAt(gas, 1);
    expect(night.windows).toBeCloseTo(0.4, 6);
    expect(night.windowShare).toBe(0.2);
    expect(night.hearth).toBe(1);
    expect(night.street?.level).toBeCloseTo(0.8, 6);
    expect(night.street?.area).toBe(town);
    const dusk = lampsAt(gas, 0.5);
    expect(dusk.street?.level).toBeCloseTo(0.4, 6);
    expect(dusk.windows).toBeCloseTo(0.2, 6);
  });

  it('is dark by day whatever the era', () => {
    const day = lampsAt(gas, 0);
    expect([day.windows, day.hearth, day.street?.level]).toEqual([0, 0, 0]);
  });

  it('lights nothing before the first key', () => {
    const night = lampsAt(undefined, 1);
    expect([night.windows, night.windowShare, night.hearth, night.street]).toEqual([0, 0, 0, undefined]);
  });

  it('shows no light at all in the blackout, even at night', () => {
    const night = lampsAt(blackout, 1);
    expect([night.windows, night.windowShare, night.hearth, night.street]).toEqual([0, 0, 0, undefined]);
  });

  it('draws flame warm and electric light whiter', () => {
    const flame = lampColour(1);
    const bulb = lampColour(0);
    expect(flame.r).toBeGreaterThan(flame.b);
    expect(bulb.b).toBeGreaterThan(flame.b);
    expect(lampsAt(gas, 1).colour).toEqual(flame);
  });
});

describe('where the street lamps stand', () => {
  it('tests a concave outline by even-odd, so a river bend can be left out', () => {
    const notch: LitArea = {
      ...town,
      outline: [
        { e: 0, n: 0 },
        { e: 100, n: 0 },
        { e: 100, n: 100 },
        { e: 50, n: 20 },
        { e: 0, n: 100 },
      ],
    };
    expect(insideArea(notch, { e: 10, n: 10 })).toBe(true);
    expect(insideArea(notch, { e: 50, n: 60 })).toBe(false);
    expect(insideArea(notch, { e: 150, n: 10 })).toBe(false);
  });

  it('places lamps along a built-up road only inside the lit area', () => {
    const road = [
      {
        points: [
          { e: -300, n: 0 },
          { e: 1000, n: 0 },
        ],
      },
    ];
    const lamps = streetLampPoints(road, { every: 45, minGap: 25 }, () => true, town);
    expect(lamps.length).toBeGreaterThan(5);
    expect(lamps.filter((p) => p.e < 0 || p.e > 400)).toEqual([]);
  });

  it('never puts two lamps closer than the minimum gap where roads meet or overlap', () => {
    // Two roads meeting at a junction (400, 0), and a third doubling the first, as OS lines do.
    const roads = [
      {
        points: [
          { e: 0, n: 0 },
          { e: 400, n: 0 },
        ],
      },
      {
        points: [
          { e: 400, n: 0 },
          { e: 400, n: 40 },
        ],
      },
      {
        points: [
          { e: 0, n: 0 },
          { e: 400, n: 0 },
        ],
      },
    ];
    const big: LitArea = {
      ...town,
      outline: [
        { e: -10, n: -10 },
        { e: 410, n: -10 },
        { e: 410, n: 50 },
        { e: -10, n: 50 },
      ],
    };
    const lamps = streetLampPoints(roads, { every: 45, minGap: 25 }, () => true, big);
    const close = lamps.flatMap((p, i) =>
      lamps
        .slice(i + 1)
        .filter((q) => Math.hypot(q.e - p.e, q.n - p.n) < 25)
        .map((q) => [p, q]),
    );
    expect(close).toEqual([]);
    // First road: 0, 45 … 360 (9 lamps). Second starts at the junction, 400 m along the first (a
    // lamp would have stood at 405), so (400, 0) is 40 m from (360, 0) and kept; (400, 45) is off
    // the 40 m road. The doubled road adds nothing.
    expect(lamps).toHaveLength(10);
  });

  it('carries the spacing across a bend, so a polyline is lit as evenly as a straight road', () => {
    const bent = [
      {
        points: [
          { e: 0, n: 0 },
          { e: 100, n: 0 },
          { e: 100, n: 100 },
        ],
      },
    ];
    const big: LitArea = {
      ...town,
      outline: [
        { e: -10, n: -10 },
        { e: 110, n: -10 },
        { e: 110, n: 110 },
        { e: -10, n: 110 },
      ],
    };
    const lamps = streetLampPoints(bent, { every: 45, minGap: 0 }, () => true, big);
    // 0, 45, 90 along the first leg; 135 m along the whole line is 35 m up the second leg, then 80 m.
    expect(lamps.map((p) => [Math.round(p.e), Math.round(p.n)])).toEqual([
      [0, 0],
      [45, 0],
      [90, 0],
      [100, 35],
      [100, 80],
    ]);
  });

  it('keeps lamps off open road outside the built-up area', () => {
    const road = [
      {
        points: [
          { e: 0, n: 0 },
          { e: 400, n: 0 },
        ],
      },
    ];
    const lamps = streetLampPoints(road, { every: 45, minGap: 25 }, (p) => p.e < 200, town);
    expect(lamps.filter((p) => p.e >= 200)).toEqual([]);
  });
});
