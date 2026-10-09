import type { Provenance } from '../domain/provenance.ts';
import { src, type SourceKey } from './ids.ts';

export const documented = (
  keys: readonly [SourceKey, ...SourceKey[]],
  en?: string,
  cy?: string,
): Provenance => ({
  kind: 'documented',
  sources: [src(keys[0]), ...keys.slice(1).map(src)],
  ...(en && cy ? { note: { en, cy } } : {}),
});

export const reconstructed = (en: string, cy: string, keys: readonly SourceKey[]): Provenance => ({
  kind: 'reconstructed',
  basis: { en, cy },
  sources: keys.map(src),
});

export const imagined = (en: string, cy: string, keys: readonly SourceKey[]): Provenance => ({
  kind: 'imagined',
  groundedIn: { en, cy },
  sources: keys.map(src),
});
