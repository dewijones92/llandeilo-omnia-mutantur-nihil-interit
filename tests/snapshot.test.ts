import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { streetGlowOf } from '../src/domain/lamplight.ts';
import { snapshotAt } from '../src/domain/state.ts';
import { ad, contains } from '../src/domain/time.ts';
import { tAt } from '../src/domain/timeline.ts';

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

describe('snapshotAt: how the night was lit', () => {
  const snapAt = (y: number) => snapshotAt(WORLD_CONTENT, tAt(WORLD_CONTENT.timeline, ad(y)));
  const at = (y: number) => snapAt(y).lamplight;

  it('has no street lamps before the first documented gas lighting in 1876', () => {
    const lit: number[] = [];
    for (let y = -7000; y < 1876; y += 1) if (streetGlowOf(at(y).streets) > 0) lit.push(y);
    expect(lit).toEqual([]);
    expect(at(1880).streets.kind).toBe('gas');
  });

  it('lights the streets by electricity from 1902, puts every light out in the blackout, and dims it in 1944', () => {
    expect(at(1903).streets.kind).toBe('electric');
    const war = at(1942);
    expect([war.homes, war.streets.kind, war.windows, war.hearth]).toEqual(['blacked-out', 'off', 0, 0]);
    expect(at(1945).streets.kind).toBe('dimmed');
    expect(at(1950).streets.kind).toBe('electric');
  });

  it('lights medieval homes by the hearth alone', () => {
    expect(at(1282).homes).toBe('hearth');
    expect(at(1282).streets.kind).toBe('none');
  });

  it('tells the almanac how the night was lit, with the ⓘ of the key that lights the scene', () => {
    for (const y of [-5000, 1282, 1880, 1942, 1990]) {
      const s = snapAt(y);
      const light = s.almanac.filter((a) => a.topic === 'light');
      expect(light.map((a) => a.text)).toEqual([s.lamplight.text]);
      expect(light[0]?.provenance).toBe(s.lamplight.provenance);
    }
    expect(snapAt(1880).almanac.find((a) => a.topic === 'light')?.text.en).toMatch(/^By 1876 gas lamps/);
  });
});
