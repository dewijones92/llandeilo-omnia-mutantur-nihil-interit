import { describe, expect, it } from 'vitest';
import { assertNever, clamp, lerp, smoothstep } from './assert.ts';
import { hex, mix, toHex } from './colour.ts';
import { heightToWorld, toGrid, toWorld, WORLD } from './geo.ts';
import { isLang } from './i18n.ts';
import { fbm, hash2, rng, valueNoise } from './noise.ts';

describe('numbers', () => {
  it('clamps, interpolates and eases', () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
    expect(smoothstep(0, 1, 0.5)).toBe(0.5);
    expect(smoothstep(0, 1, -1)).toBe(0);
    expect(smoothstep(0, 1, 2)).toBe(1);
  });

  it('treats a zero-width smoothstep as a step', () => {
    expect(smoothstep(1, 1, 0.9)).toBe(0);
    expect(smoothstep(1, 1, 1)).toBe(1);
  });

  it('fails loudly on an unhandled case', () => {
    expect(() => {
      Reflect.apply(assertNever, undefined, ['x', 'test']);
    }).toThrow(/Unhandled test: "x"/);
  });
});

describe('colour', () => {
  it('parses, mixes and prints hex colours', () => {
    expect(hex('#ff8000')).toEqual({ r: 1, g: 128 / 255, b: 0 });
    expect(toHex(mix(hex('#000000'), hex('#ffffff'), 0.5))).toBe('#808080');
    expect(toHex(hex('#12abef'))).toBe('#12abef');
  });

  it('clamps out-of-range channels and rejects bad input', () => {
    expect(toHex({ r: 2, g: -1, b: 0.5 })).toBe('#ff0080');
    expect(() => hex('red')).toThrow();
    expect(() => hex('#fff')).toThrow();
  });
});

describe('geo', () => {
  it('puts Llandeilo at the origin and round-trips grid references', () => {
    expect(toWorld(WORLD.centre)).toEqual({ x: 0, z: 0 });
    const g = { e: 254094, n: 219151 };
    expect(toGrid(toWorld(g))).toEqual(g);
    expect(toWorld({ e: WORLD.centre.e + 1000, n: WORLD.centre.n }).x).toBe(1000 / WORLD.metresPerUnit);
  });

  it('exaggerates height by the documented factor', () => {
    expect(heightToWorld(100)).toBeCloseTo((100 * WORLD.verticalExaggeration) / WORLD.metresPerUnit);
  });
});

describe('language codes', () => {
  it('accepts only English and Welsh', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('cy')).toBe(true);
    expect(isLang('fr')).toBe(false);
  });
});

describe('noise', () => {
  it('is deterministic and stays in range', () => {
    expect(hash2(3, 4, 1)).toBe(hash2(3, 4, 1));
    expect(hash2(3, 4, 1)).not.toBe(hash2(3, 4, 2));
    for (let i = 0; i < 100; i++) {
      const v = valueNoise(i * 0.37, i * 0.73, 5);
      const f = fbm(i * 0.11, i * 0.29, 4, 5);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThanOrEqual(1);
    }
  });

  it('matches the lattice at whole-number points', () => {
    expect(valueNoise(2, 7, 3)).toBe(hash2(2, 7, 3));
  });

  it('gives the same sequence from the same seed', () => {
    const a = rng(42);
    const b = rng(42);
    const xs = Array.from({ length: 5 }, () => a());
    expect(Array.from({ length: 5 }, () => b())).toEqual(xs);
    for (const x of xs) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
});
