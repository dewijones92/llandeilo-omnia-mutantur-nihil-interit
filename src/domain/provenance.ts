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

export type Provenance =
  | { readonly kind: 'documented'; readonly sources: NonEmptyArray<SourceId>; readonly note?: Bilingual }
  | { readonly kind: 'reconstructed'; readonly basis: Bilingual; readonly sources: readonly SourceId[] }
  | { readonly kind: 'imagined'; readonly groundedIn: Bilingual; readonly sources: readonly SourceId[] };
