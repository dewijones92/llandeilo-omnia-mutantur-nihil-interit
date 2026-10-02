import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import type { Place, PlaceId } from './model.ts';
import { namedLater } from './places.ts';
import { ad } from './time.ts';

const place: Place = {
  id: mint<PlaceId>('p'),
  name: 'P',
  namedFrom: ad(1185),
  at: { e: 0, n: 0 },
  description: { en: '', cy: '' },
  provenance: { kind: 'reconstructed', basis: { en: '', cy: '' }, sources: [] },
  visitable: true,
};

describe('namedLater', () => {
  it('is true only before the year the name is first known', () => {
    expect(namedLater(place, 1184)).toBe(true);
    expect(namedLater(place, 1184.9)).toBe(true);
    expect(namedLater(place, 1185)).toBe(false);
    expect(namedLater(place, 2026)).toBe(false);
  });
});
