import { clamp, lerp } from './assert.ts';
import type { Provenance } from './provenance.ts';
import type { Year } from './time.ts';

export interface ClimateKey {
  readonly year: Year;
  readonly chill: number;
  readonly provenance: Provenance;
}

export function chillAt(keys: readonly ClimateKey[], y: Year): number {
  const first = keys[0];
  if (!first) return 0;
  if (y <= first.year) return first.chill;
  let prev = first;
  for (const k of keys) {
    if (k.year >= y) {
      const f = k.year === prev.year ? 0 : (y - prev.year) / (k.year - prev.year);
      return clamp(lerp(prev.chill, k.chill, f), -1, 1);
    }
    prev = k;
  }
  return prev.chill;
}
