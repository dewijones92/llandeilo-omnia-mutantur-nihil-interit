import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import type { Feature, FeatureId, FeatureKind } from './model.ts';
import { plumeOf, smokingFeatures, SMOKE_PRESENCE } from './smoke.ts';
import { ad, range } from './time.ts';

const feature = (kind: FeatureKind): Feature => ({
  id: mint<FeatureId>(kind.type),
  kind,
  at: { e: 0, n: 0 },
  when: range(ad(1213), ad(1213)),
  provenance: { kind: 'reconstructed', basis: { en: 'test', cy: 'prawf' }, sources: [] },
  label: { en: 'test', cy: 'prawf' },
});

describe('plumeOf', () => {
  it('gives a recorded burning dark smoke with a fire, as wide and dense as the content says', () => {
    expect(plumeOf({ type: 'burning', spread: 70, density: 3 })).toEqual({
      style: 'burning',
      fire: true,
      spread: 70,
      density: 3,
    });
  });

  it('keeps hearth smoke for homes and old towns, and none for a modern town, a ruin or a hillfort', () => {
    expect(plumeOf({ type: 'hall-houses', count: 8, spread: 100 })).toEqual({
      style: 'hearth',
      fire: true,
      spread: 6,
      density: 1.5,
    });
    expect(plumeOf({ type: 'town', nearest: 1, radius: 1, style: 'victorian' })?.fire).toBe(false);
    expect(plumeOf({ type: 'town', nearest: 1, radius: 1, style: 'modern' })).toBeUndefined();
    const hearth = { setting: 'map', parts: [], hearth: [0, 0] } as const;
    expect(plumeOf({ type: 'building', plan: hearth, condition: 'standing' })?.density).toBe(0.5);
    expect(plumeOf({ type: 'building', plan: hearth, condition: 'ruin' })).toBeUndefined();
    expect(
      plumeOf({ type: 'hillfort', length: 1, width: 1, angle: 0, rings: 1, stone: true, ruined: false }),
    ).toBeUndefined();
  });
});

describe('smokingFeatures', () => {
  it('smokes only what is present enough, so a fading feature stops smoking before it is gone', () => {
    const burning = feature({ type: 'burning', spread: 70, density: 3 });
    const roads = feature({ type: 'roads' });
    const smoking = smokingFeatures([
      { feature: burning, presence: SMOKE_PRESENCE },
      { feature: { ...burning, id: mint<FeatureId>('faint') }, presence: SMOKE_PRESENCE - 0.01 },
      { feature: roads, presence: 1 },
    ]);
    expect(smoking.map((s) => [s.feature.id, s.plume.style])).toEqual([['burning', 'burning']]);
  });
});
