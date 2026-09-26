import type { Source } from '../domain/provenance.ts';
import { SOURCE_SEEDS } from './generated/sources.ts';
import { src } from './ids.ts';

export const SOURCES: readonly Source[] = SOURCE_SEEDS.map((s) => ({
  id: src(s.id),
  title: s.title,
  publisher: s.doc,
  url: s.url,
}));
