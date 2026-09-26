import type { NonEmptyArray } from './assert.ts';
import type { Brand } from './brand.ts';
import type { Bilingual } from './i18n.ts';

export type SourceId = Brand<string, 'SourceId'>;

export interface Source {
  readonly id: SourceId;
  readonly title: string;
  readonly publisher: string;
  readonly url: string;
}

/**
 * Every piece of content carries one of these. "Documented" cannot exist without a source:
 * the type makes the empty case unrepresentable.
 */
export type Provenance =
  | { readonly kind: 'documented'; readonly sources: NonEmptyArray<SourceId>; readonly note?: Bilingual }
  | { readonly kind: 'reconstructed'; readonly basis: Bilingual; readonly sources: readonly SourceId[] }
  | { readonly kind: 'imagined'; readonly groundedIn: Bilingual; readonly sources: readonly SourceId[] };

export type ProvenanceKind = Provenance['kind'];

export function sourcesOf(p: Provenance): readonly SourceId[] {
  return p.sources;
}
