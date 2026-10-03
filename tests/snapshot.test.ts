import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { hasStreetLamps, lampsAt } from '../src/domain/lamplight.ts';
import { drawnRailway, longestLine } from '../src/domain/rail.ts';
import { snapshotAt } from '../src/domain/state.ts';
import { keySteps } from '../src/domain/steps.ts';
import { ad, contains } from '../src/domain/time.ts';
import { tAt } from '../src/domain/timeline.ts';
import { parseLines } from '../src/platform/assets.ts';

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
  const key = (y: number) => {
    const k = at(y);
    if (!k) throw new Error(`no night-light key in ${String(y)}`);
    return k;
  };

  it('has no street lamps before the first documented gas lighting in 1876', () => {
    const lit: number[] = [];
    for (let y = -7000; y < 1876; y += 1) {
      const k = at(y);
      if (k && hasStreetLamps(k.streets)) lit.push(y);
    }
    expect(lit).toEqual([]);
    expect(key(1880).streets.kind).toBe('gas');
  });

  it('says nothing of the night before its first key (7800 BC), and lights nothing there', () => {
    for (const y of [-12000, -9000, -7801]) {
      expect(at(y)).toBeUndefined();
      expect(snapAt(y).almanac.filter((a) => a.topic === 'light')).toEqual([]);
    }
    expect(key(-7799).homes).toBe('hearth');
  });

  it('lights the streets by electricity from 1902, and draws homes with flame light as before, since home lighting is not recorded', () => {
    expect(key(1903).streets.kind).toBe('electric');
    expect([key(1903).homes, key(1903).warmth]).toEqual([key(1880).homes, key(1880).warmth]);
  });

  it('draws the electric street lamps of 1903 whiter than the gas lamps of 1880', () => {
    // The colour the renderer gives the street lamps, at full evening lamp level.
    const streetColour = (y: number) => {
      const c = lampsAt(key(y), 1).street?.colour;
      if (!c) throw new Error(`no street lamps in ${String(y)}`);
      return c;
    };
    expect(streetColour(1903).b).toBeGreaterThan(streetColour(1880).b);
  });

  it('puts every light out in the blackout, dims it from 17 September 1944, and lights the streets again', () => {
    const war = key(1942);
    expect([war.homes, war.streets.kind, war.windows, war.hearth]).toEqual(['blacked-out', 'off', 0, 0]);
    expect(key(1944.7).streets.kind).toBe('off');
    expect(key(1944.72).streets.kind).toBe('dimmed');
    expect(key(1945).streets.kind).toBe('dimmed');
    expect(key(1950).streets.kind).toBe('electric');
  });

  it('lights medieval homes by the hearth alone', () => {
    expect(key(1282).homes).toBe('hearth');
    expect(key(1282).streets.kind).toBe('none');
  });

  it('tells the almanac how the night was lit, with the ⓘ of the key that lights the scene', () => {
    for (const y of [-5000, 1282, 1880, 1942, 1990]) {
      const s = snapAt(y);
      const light = s.almanac.filter((a) => a.topic === 'light');
      expect(light.map((a) => a.text)).toEqual([key(y).text]);
      expect(light[0]?.provenance).toBe(key(y).provenance);
    }
    expect(snapAt(1880).almanac.find((a) => a.topic === 'light')?.text.en).toMatch(/^By 1876 gas lamps/);
  });
});

// What the renderer draws of the railway, through the same rule (drawnRailway), not the content dates.
describe('snapshotAt: the railway on screen', () => {
  const W = WORLD_CONTENT;
  const path = 'public/data/railways.json';
  const lines = parseLines(JSON.parse(readFileSync(join(import.meta.dirname, '..', path), 'utf8')), path);
  const trainLine = longestLine(lines)?.points;
  const drawnAtT = (t: number) => drawnRailway(snapshotAt(W, t).features, trainLine);
  const drawnAt = (y: number) => drawnAtT(tAt(W.timeline, ad(y)));
  const ids = (t: number) => drawnAtT(t).sections.map((s) => s.feature.id);
  const step1857 = keySteps(W.timeline, W.events).find((s) => s.event.id === 'railway');

  it('draws no Vale of Towy line at the 1857 key step, or before it opened on 1 April 1858', () => {
    expect(step1857).toBeDefined();
    const t = step1857?.t ?? 0;
    expect(ids(t)).toContain('railway');
    expect(ids(t)).not.toContain('railway-vale-of-towy');
    expect(ids(tAt(W.timeline, ad(1858.2)))).not.toContain('railway-vale-of-towy');
    expect(ids(tAt(W.timeline, ad(1858.3)))).toContain('railway-vale-of-towy');
  });

  it('draws no train before the railway reached Llandeilo in January 1857', () => {
    const early: string[] = [];
    for (let y = 1800; y < 1857; y += 0.1) if (drawnAt(y).train) early.push(y.toFixed(1));
    expect(early).toEqual([]);
    expect(drawnAtT(step1857?.t ?? 0).train?.feature.id).toBe('train-llanelly');
  });

  it('never draws a train that is not heard', () => {
    const silent: string[] = [];
    for (let y = 1800; y <= 2026; y += 0.1) {
      const t = tAt(W.timeline, ad(y));
      const levels = snapshotAt(W, t).sound.levels;
      if (drawnAtT(t).train && levels.train <= 0 && levels.railcar <= 0) silent.push(y.toFixed(1));
    }
    expect(silent).toEqual([]);
  });

  it('draws a steam train only until steam passenger trains ended on 13 June 1964, then a diesel unit', () => {
    expect(drawnAt(1960).train?.steam).toBe(true);
    const later = drawnAt(2000).train;
    expect(later).toBeDefined();
    expect(later?.steam).toBe(false);
  });
});
