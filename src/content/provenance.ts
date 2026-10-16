import type { Bilingual } from '../domain/i18n.ts';
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

const joined = (a: Bilingual, b: Bilingual): Bilingual => ({ en: `${a.en} ${b.en}`, cy: `${a.cy} ${b.cy}` });

/** The same provenance with a sentence added to its note, basis or grounding: what it says about the content stays one claim. */
export function withNote(p: Provenance, note: Bilingual): Provenance {
  switch (p.kind) {
    case 'documented':
      return { ...p, note: p.note ? joined(p.note, note) : note };
    case 'reconstructed':
      return { ...p, basis: joined(p.basis, note) };
    case 'imagined':
      return { ...p, groundedIn: joined(p.groundedIn, note) };
  }
}
