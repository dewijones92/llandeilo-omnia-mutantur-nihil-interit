import { mint } from '../domain/brand.ts';
import type { ConversationId, EraId, EventId, FeatureId, PersonId, PlaceId } from '../domain/model.ts';
import type { SourceId } from '../domain/provenance.ts';
import { SOURCE_SEEDS } from './generated/sources.ts';

export type SourceKey = (typeof SOURCE_SEEDS)[number]['id'];

export const src = (key: SourceKey): SourceId => mint<SourceId>(key);
export const placeId = (v: string): PlaceId => mint<PlaceId>(v);
export const eventId = (v: string): EventId => mint<EventId>(v);
export const featureId = (v: string): FeatureId => mint<FeatureId>(v);
export const personId = (v: string): PersonId => mint<PersonId>(v);
export const conversationId = (v: string): ConversationId => mint<ConversationId>(v);
export const eraId = (v: string): EraId => mint<EraId>(v);
