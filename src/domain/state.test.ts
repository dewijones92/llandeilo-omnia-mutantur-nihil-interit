import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT } from '../content/world.ts';
import type { EnvironmentKey } from './model.ts';
import { environmentAt, latestStarting, presenceAt, snapshotAt } from './state.ts';
import { ad, contains, range } from './time.ts';
import { createTimeline, tAt } from './timeline.ts';

const tl = createTimeline([
  { t: 0, year: ad(1000), scale: 'linear' },
  { t: 1, year: ad(2000), scale: 'linear' },
]);

describe('presenceAt', () => {
  const when = range(ad(1200), ad(1500));

  it('is fully present from its first year to its last', () => {
    expect(presenceAt(tl, when, 0.2)).toBe(1);
    expect(presenceAt(tl, when, 0.35)).toBe(1);
    expect(presenceAt(tl, when, 0.5)).toBe(1);
  });

  it('fades in before it starts and out after it ends', () => {
    expect(presenceAt(tl, when, 0.1)).toBe(0);
    expect(presenceAt(tl, when, 0.195)).toBeGreaterThan(0);
    expect(presenceAt(tl, when, 0.505)).toBeLessThan(1);
    expect(presenceAt(tl, when, 0.6)).toBe(0);
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

describe('presenceAt at the ends of the slider', () => {
  it('never fades a feature that starts at the first year or runs to the last', () => {
    expect(presenceAt(tl, range(ad(1000), ad(1100)), 0)).toBe(1);
    expect(presenceAt(tl, range(ad(1900), ad(2000)), 1)).toBe(1);
  });
});

describe('environmentAt', () => {
  const key = (y: number, forest: number, sky: string, river?: number): EnvironmentKey => ({
    year: ad(y),
    forest,
    farmland: 1 - forest,
    moor: 0.1,
    skyTop: sky,
    skyHorizon: sky,
    sun: sky,
    fog: 0.2,
    mappedWoodland: 0,
    ambient: river === undefined ? {} : { river },
  });
  const keys = [key(1000, 0.8, '#000000', 1), key(1200, 0.4, '#ffffff')];

  it('interpolates between the keyframes either side', () => {
    const e = environmentAt(keys, ad(1100));
    expect(e.forest).toBeCloseTo(0.6);
    expect(e.farmland).toBeCloseTo(0.4);
    expect(e.skyTop.r).toBeCloseTo(0.5, 2);
    expect(e.ambient.river).toBeCloseTo(0.5);
  });

  it('holds the first and last keyframes beyond the ends', () => {
    expect(environmentAt(keys, ad(900)).forest).toBeCloseTo(0.8);
    expect(environmentAt(keys, ad(1500)).forest).toBeCloseTo(0.4);
  });

  it('is exactly the keyframe on its own year, and silent for beds it does not name', () => {
    const e = environmentAt(keys, ad(1200));
    expect(e.forest).toBe(0.4);
    expect(e.ambient.river).toBe(0);
    expect(e.ambient.train).toBe(0);
  });

  it('refuses an empty keyframe list', () => {
    expect(() => environmentAt([], ad(1000))).toThrow();
  });
});

describe('snapshotAt: what is on screen and heard in 1282', () => {
  const t = tAt(WORLD_CONTENT.timeline, ad(1282));
  const snap = snapshotAt(WORLD_CONTENT, t);

  it('names the year, its era and its language', () => {
    expect(Math.round(snap.year)).toBe(1282);
    expect(snap.era && contains(snap.era.when, snap.year)).toBe(true);
    expect(snap.language && contains(snap.language.when, snap.year)).toBe(true);
  });

  it('shows only features that exist then or are fading at their edges', () => {
    expect(snap.features.length).toBeGreaterThan(0);
    for (const f of snap.features) {
      expect(f.presence).toBeGreaterThan(0);
      expect(f.presence).toBeLessThanOrEqual(1);
      if (f.presence === 1) expect(contains(f.feature.when, snap.year)).toBe(true);
    }
    const shown = new Set(snap.features.map((f) => f.feature.id));
    const missing = WORLD_CONTENT.features
      .filter((f) => contains(f.when, snap.year) && !shown.has(f.id))
      .map((f) => f.id);
    expect(missing).toEqual([]);
  });

  it('plays only the conversations and almanac entries of that year', () => {
    for (const c of snap.conversations) expect(contains(c.when, snap.year)).toBe(true);
    for (const a of snap.almanac) expect(contains(a.when, snap.year)).toBe(true);
    expect(snap.almanac.length).toBeGreaterThan(0);
  });

  it('knows the nearest key date is the battle', () => {
    expect(snap.nearestEvent?.id).toBe('battle-1282');
  });

  it('agrees with itself everywhere on the slider', () => {
    for (let i = 0; i <= 200; i++) {
      const s = snapshotAt(WORLD_CONTENT, i / 200);
      expect(s.era).toBeDefined();
      expect(s.environment.forest).toBeGreaterThanOrEqual(0);
      expect(s.environment.forest).toBeLessThanOrEqual(1);
      for (const c of s.conversations) expect(contains(c.when, s.year)).toBe(true);
    }
  });
});
