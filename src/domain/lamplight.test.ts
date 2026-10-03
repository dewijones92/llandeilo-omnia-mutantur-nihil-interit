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
    expect(lampStyleAt(keys, ad(1875.9)).streets.kind).toBe('none');
    expect(lampStyleAt(keys, ad(1876)).streets.kind).toBe('gas');
    expect(lampStyleAt(keys, ad(1900))).toBe(gas);
    expect(lampStyleAt(keys, ad(1939.7)).homes).toBe('blacked-out');
  });

  it('holds the first key before it and the last key after it', () => {
    expect(lampStyleAt(keys, ad(-5000))).toBe(fire);
    expect(lampStyleAt(keys, ad(2026))).toBe(blackout);
  });
});

describe('lampAlmanacAt', () => {
  it('gives the almanac the current key’s words and provenance, over the years it holds', () => {
    const e = lampAlmanacAt(keys, ad(1900));
    expect(e.topic).toBe('light');
    expect(e.text).toBe(gas.text);
    expect(e.provenance).toBe(gas.provenance);
    expect([e.when.from, e.when.to]).toEqual([1876, 1939.67]);
    expect(lampAlmanacAt(keys, ad(2000)).when.to).toBe(2026);
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
