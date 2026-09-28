import { describe, expect, it } from 'vitest';
import { chillAt } from './climate.ts';
import { ad } from './time.ts';

const neutral = { kind: 'reconstructed', basis: { en: 'test', cy: 'prawf' }, sources: [] } as const;
const keys = [
  { year: ad(1000), chill: -0.4, provenance: neutral },
  { year: ad(1500), chill: 0.6, provenance: neutral },
];

describe('chillAt', () => {
  it('interpolates between keyframes', () => {
    expect(chillAt(keys, ad(1250))).toBeCloseTo(0.1, 6);
  });

  it('holds the end values outside the keyframes', () => {
    expect(chillAt(keys, ad(500))).toBe(-0.4);
    expect(chillAt(keys, ad(1900))).toBe(0.6);
    expect(chillAt([], ad(1900))).toBe(0);
  });
});
