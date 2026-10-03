import { describe, expect, it } from 'vitest';
import type { BedPoint, EnvironmentKey, Soundscape } from './model.ts';
import type { Provenance } from './provenance.ts';
import { environmentAt, latestStarting, presenceAt, soundAt } from './state.ts';
import { ad, range } from './time.ts';
import { createTimeline } from './timeline.ts';

const tl = createTimeline([
  { t: 0, year: ad(1000), scale: 'linear' },
  { t: 1, year: ad(2000), scale: 'linear' },
]);

describe('presenceAt', () => {
  const when = range(ad(1200), ad(1500));

  it('is fully present from its first year to its last', () => {
    expect(presenceAt(tl, { when }, 0.2)).toBe(1);
    expect(presenceAt(tl, { when }, 0.35)).toBe(1);
    expect(presenceAt(tl, { when }, 0.5)).toBe(1);
  });

  it('fades in before it starts and out after it ends', () => {
    expect(presenceAt(tl, { when }, 0.1)).toBe(0);
    expect(presenceAt(tl, { when }, 0.195)).toBeGreaterThan(0);
    expect(presenceAt(tl, { when }, 0.505)).toBeLessThan(1);
    expect(presenceAt(tl, { when }, 0.6)).toBe(0);
  });

  it('is never present outside dates a source gives exactly: on at the first year, gone after the last', () => {
    const exact = (t: number) => presenceAt(tl, { when, datesExact: true }, t);
    expect(exact(0.195)).toBe(0);
    expect(exact(0.2)).toBe(1);
    expect(exact(0.5)).toBe(1);
    expect(exact(0.505)).toBe(0);
  });
});

describe('latestStarting', () => {
  const eras = [
    { id: 'a', when: range(ad(1000), ad(1099)) },
    { id: 'b', when: range(ad(1100), ad(1199)) },
  ];

  it('covers the gap between whole-year ranges', () => {
    expect(latestStarting(eras, ad(1099.5))?.id).toBe('a');
    expect(latestStarting(eras, ad(1100))?.id).toBe('b');
  });

  it('is empty before the first and after the last range', () => {
    expect(latestStarting(eras, ad(999))).toBeUndefined();
    expect(latestStarting(eras, ad(1201))).toBeUndefined();
  });
});

describe('environmentAt', () => {
  const key = (y: number, forest: number, sky: string): EnvironmentKey => ({
    year: ad(y),
    forest,
    farmland: 1 - forest,
    moor: 0.1,
    skyTop: sky,
    skyHorizon: sky,
    sun: sky,
    fog: 0.2,
    mappedWoodland: 0,
  });
  const keys = [key(1000, 0.8, '#000000'), key(1200, 0.4, '#ffffff')];

  it('interpolates between the keyframes either side', () => {
    const e = environmentAt(keys, ad(1100));
    expect(e.forest).toBeCloseTo(0.6);
    expect(e.farmland).toBeCloseTo(0.4);
    expect(e.skyTop.r).toBeCloseTo(0.5, 2);
  });

  it('holds the first and last keyframes beyond the ends', () => {
    expect(environmentAt(keys, ad(900)).forest).toBeCloseTo(0.8);
    expect(environmentAt(keys, ad(1500)).forest).toBeCloseTo(0.4);
  });

  it('is exactly the keyframe on its own year', () => {
    expect(environmentAt(keys, ad(1200)).forest).toBe(0.4);
  });

  it('refuses an empty keyframe list', () => {
    expect(() => environmentAt([], ad(1000))).toThrow();
  });
});

describe('soundAt', () => {
  const basis = (en: string): Provenance => ({ kind: 'reconstructed', basis: { en, cy: en }, sources: [] });
  const early = basis('early');
  const late = basis('late');
  const heard = (y: number, level: number, why: Provenance): BedPoint => ({
    kind: 'heard',
    year: ad(y),
    level,
    provenance: why,
  });
  const silent = (y: number): BedPoint => ({ kind: 'silent', year: ad(y) });
  const river = (...points: BedPoint[]): Soundscape => ({
    wind: [],
    river: points,
    birds: [],
    forest: [],
    livestock: [],
    forge: [],
    bells: [],
    market: [],
    train: [],
    railcar: [],
    traffic: [],
    chant: [],
  });
  const fades = river(heard(1000, 1, early), silent(1200));

  it('interpolates a bed between its points and fades it out to a silent point', () => {
    expect(soundAt(fades, ad(1100)).levels.river).toBeCloseTo(0.5);
    expect(soundAt(fades, ad(1200)).levels.river).toBe(0);
    expect(soundAt(fades, ad(1100)).levels.train).toBe(0);
  });

  it('is silent before its first point and holds its last', () => {
    const held = river(heard(1000, 0.4, early));
    expect(soundAt(held, ad(999)).levels.river).toBe(0);
    expect(soundAt(held, ad(2000)).levels.river).toBe(0.4);
  });

  it('names the reason a bed is heard from, and the reason it is fading towards', () => {
    const both = river(heard(1000, 1, early), heard(1200, 0.5, late));
    expect(soundAt(both, ad(1000)).beds).toEqual([{ bed: 'river', level: 1, since: early }]);
    expect(soundAt(both, ad(1100)).beds).toEqual([
      { bed: 'river', level: 0.75, since: early, towards: late },
    ]);
    expect(soundAt(fades, ad(1100)).beds).toEqual([
      { bed: 'river', level: 0.5, since: early, towards: 'silence' },
    ]);
    expect(soundAt(fades, ad(1200)).beds).toEqual([]);
  });

  it('never fades a bed in from silence: it starts at the point that names it', () => {
    const starts = river(silent(1000), heard(1200, 0.5, late));
    expect(soundAt(starts, ad(1100)).levels.river).toBe(0);
    expect(soundAt(starts, ad(1199.99)).levels.river).toBe(0);
    expect(soundAt(starts, ad(1200)).levels.river).toBe(0.5);
  });
});
