import { describe, expect, it } from 'vitest';
import { latestStarting, presenceAt } from './state.ts';
import { ad, range } from './time.ts';
import { createTimeline } from './timeline.ts';

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
