import { describe, expect, it } from 'vitest';
import {
  chooseQuality,
  describeGraphics,
  isQuality,
  MAX_TREE_DENSITY,
  QUALITIES,
  QUALITY,
} from './quality.ts';

describe('graphics quality', () => {
  it('defaults to High, with every effect on', () => {
    const { quality, source } = chooseQuality({ param: null, fx: null, stored: null });
    expect([quality, source]).toEqual(['high', 'default']);
    const high = QUALITY.high;
    expect(high.bloom && high.depthOfField && high.sharpen).toBe(true);
    expect(high.treeDensity).toBe(MAX_TREE_DENSITY);
  });

  it('keeps ?fx=low as an alias for Low', () => {
    expect(chooseQuality({ param: null, fx: 'low', stored: 'high' })).toEqual({
      quality: 'low',
      source: 'fx',
    });
  });

  it('lets a link win over the remembered choice, and ignores junk', () => {
    expect(chooseQuality({ param: 'medium', fx: 'low', stored: 'low' }).quality).toBe('medium');
    expect(chooseQuality({ param: 'ultra', fx: null, stored: 'medium' })).toEqual({
      quality: 'medium',
      source: 'stored',
    });
    expect(chooseQuality({ param: null, fx: 'high', stored: 'nonsense' }).quality).toBe('high');
    expect(isQuality('ultra')).toBe(false);
  });

  it('only sheds cost going down the levels', () => {
    const [high, medium, low] = QUALITIES.map((q) => QUALITY[q]);
    if (!high || !medium || !low) throw new Error('missing level');
    for (const [a, b] of [
      [high, medium],
      [medium, low],
    ] as const) {
      expect(b.shadowMapSize).toBeLessThan(a.shadowMapSize);
      expect(b.msaa).toBeLessThanOrEqual(a.msaa);
      expect(b.treeDensity).toBeLessThan(a.treeDensity);
      expect(b.maxPixelRatio).toBeLessThanOrEqual(a.maxPixelRatio);
    }
    expect(medium.bloom || medium.depthOfField).toBe(false);
    expect(low.sharpen).toBe(false);
  });

  it('raises tree density at High above the old single density, and keeps it at Medium', () => {
    expect(QUALITY.high.treeDensity).toBeGreaterThan(0.62);
    expect(QUALITY.medium.treeDensity).toBe(0.62);
  });

  it('accepts every level the table defines', () => {
    for (const q of QUALITIES) expect(isQuality(q)).toBe(true);
  });

  it('describes the live renderer state for the debug overlay', () => {
    const line = describeGraphics({
      quality: 'low',
      shadowMapSize: 1024,
      shadowFilter: 'low',
      msaa: 1,
      bloom: false,
      depthOfField: false,
      sharpen: false,
      treesDrawn: 1234,
      pixelRatio: 1,
    });
    expect(line).toBe(
      'quality low  shadows 1024/low  msaa 1  bloom off  dof off  sharpen off  trees 1234  pixels 1.00',
    );
  });
});
