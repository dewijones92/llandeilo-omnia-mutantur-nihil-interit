import { describe, expect, it } from 'vitest';
import type { NonEmptyArray } from './assert.ts';
import { lampColour, lampsAt, lampStyleAt, type LampKey } from './lamplight.ts';
import { ad } from './time.ts';

const basis = { kind: 'reconstructed', basis: { en: 'test', cy: 'prawf' }, sources: [] } as const;
const fire: LampKey = {
  year: ad(1000),
  homes: 'hearth',
  street: 'none',
  warmth: 1,
  windows: 0.2,
  glow: 0.4,
  hearth: 1,
  streetGlow: 0,
  provenance: basis,
};
const gas: LampKey = { ...fire, year: ad(1876), homes: 'oil-lamp', street: 'gas', streetGlow: 0.8 };
const blackout: LampKey = {
  ...fire,
  year: ad(1939.67),
  homes: 'blacked-out',
  street: 'off',
  windows: 0,
  glow: 0,
  hearth: 0,
  streetGlow: 0,
};
const keys: NonEmptyArray<LampKey> = [fire, gas, blackout];

describe('lampStyleAt', () => {
  it('holds each key until the next, with no blend between technologies', () => {
    expect(lampStyleAt(keys, ad(1875.9)).street).toBe('none');
    expect(lampStyleAt(keys, ad(1876)).street).toBe('gas');
    expect(lampStyleAt(keys, ad(1900)).streetGlow).toBe(0.8);
    expect(lampStyleAt(keys, ad(1939.7)).homes).toBe('blacked-out');
  });

  it('holds the first key before it and the last key after it', () => {
    expect(lampStyleAt(keys, ad(-5000))).toBe(fire);
    expect(lampStyleAt(keys, ad(2026))).toBe(blackout);
  });
});

describe('lampsAt', () => {
  it('scales windows, hearths and street lamps by the time-of-day level', () => {
    const night = lampsAt(gas, 1);
    expect(night.windows).toBeCloseTo(0.4, 6);
    expect(night.windowShare).toBe(0.2);
    expect(night.hearth).toBe(1);
    expect(night.street).toBeCloseTo(0.8, 6);
    const dusk = lampsAt(gas, 0.5);
    expect(dusk.street).toBeCloseTo(0.4, 6);
    expect(dusk.windows).toBeCloseTo(0.2, 6);
  });

  it('is dark by day whatever the era', () => {
    const day = lampsAt(gas, 0);
    expect([day.windows, day.hearth, day.street]).toEqual([0, 0, 0]);
  });

  it('shows no light at all in the blackout, even at night', () => {
    const night = lampsAt(blackout, 1);
    expect([night.windows, night.windowShare, night.hearth, night.street]).toEqual([0, 0, 0, 0]);
  });

  it('draws flame warm and electric light whiter', () => {
    const flame = lampColour(1);
    const bulb = lampColour(0);
    expect(flame.r).toBeGreaterThan(flame.b);
    expect(bulb.b).toBeGreaterThan(flame.b);
    expect(lampsAt(gas, 1).colour).toEqual(flame);
  });
});
