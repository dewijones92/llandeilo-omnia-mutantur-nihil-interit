import { describe, expect, it } from 'vitest';
import { chooseQuality, describeQuality, isQuality, QUALITIES, QUALITY } from './quality.ts';

describe('graphics quality', () => {
  it('defaults to High, with every effect on', () => {
    const { quality, source } = chooseQuality({ param: null, fx: null, stored: null });
    expect([quality, source]).toEqual(['high', 'default']);
    const high = QUALITY.high;
    expect(high.bloom && high.depthOfField && high.sharpen).toBe(true);
    expect(high.trees).toBe(1);
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
      expect(b.trees).toBeLessThanOrEqual(a.trees);
      expect(b.maxPixelRatio).toBeLessThanOrEqual(a.maxPixelRatio);
    }
    expect(medium.bloom || medium.depthOfField).toBe(false);
    expect(low.sharpen).toBe(false);
  });

  it('describes itself for the debug overlay', () => {
    expect(describeQuality(QUALITY.low)).toContain('quality low');
    expect(describeQuality(QUALITY.low)).toContain('bloom off  dof off');
    expect(describeQuality(QUALITY.high)).toContain('bloom on  dof on');
  });
});
