import type { Brand } from './brand.ts';
import type { Bilingual } from './i18n.ts';
import type { Condition, Plan } from './plan.ts';
import type { Provenance } from './provenance.ts';
import type { TimeRange, Year } from './time.ts';

export type PlaceId = Brand<string, 'PlaceId'>;
export type EventId = Brand<string, 'EventId'>;
export type FeatureId = Brand<string, 'FeatureId'>;
export type PersonId = Brand<string, 'PersonId'>;
export type ConversationId = Brand<string, 'ConversationId'>;
export type EraId = Brand<string, 'EraId'>;

export interface GridRef {
  readonly e: number;
  readonly n: number;
}

export interface Place {
  readonly id: PlaceId;
  readonly name: string;
  readonly other?: string;
  readonly at: GridRef;
  readonly description: Bilingual;
  readonly provenance: Provenance;
  readonly visitable: boolean;
  readonly namedFrom?: Year;
}

export interface KeyEvent {
  readonly id: EventId;
  readonly when: TimeRange;
  readonly approximate: boolean;
  readonly title: Bilingual;
  readonly summary: Bilingual;
  readonly place?: PlaceId;
  readonly magnetic: boolean;
  readonly provenance: Provenance;
  readonly shot?: Shot;
}

export type Framing = 'close' | 'site' | 'area' | 'valley';

export interface Shot {
  readonly at?: GridRef;
  readonly framing: Framing;
}

export type LanguageCode =
  | 'unknown'
  | 'brittonic'
  | 'latin'
  | 'old-welsh'
  | 'middle-welsh'
  | 'welsh'
  | 'anglo-norman'
  | 'middle-english'
  | 'english';

export interface Era {
  readonly id: EraId;
  readonly name: Bilingual;
  readonly when: TimeRange;
  readonly colour: string;
}

export type Clothing =
  | 'iron-age'
  | 'roman'
  | 'medieval-welsh'
  | 'medieval-norman'
  | 'clergy'
  | 'victorian'
  | 'victorian-gentry'
  | 'modern';

export interface Person {
  readonly id: PersonId;
  readonly name: string;
  readonly role: Bilingual;
  readonly clothing: Clothing;
  readonly voice: 'male' | 'female';
  readonly age: 'child' | 'adult' | 'elder';
  readonly historical: boolean;
  readonly family: boolean;
}

export interface Line {
  readonly speaker: PersonId;
  readonly language: LanguageCode;
  readonly spoken: string;
  readonly translation: Bilingual;
  readonly quote?: Bilingual;
}

export interface Conversation {
  readonly id: ConversationId;
  readonly when: TimeRange;
  readonly place: PlaceId;
  readonly at: GridRef;
  readonly setIn: Bilingual;
  readonly title: Bilingual;
  readonly people: readonly PersonId[];
  readonly lines: readonly Line[];
  readonly provenance: Provenance;
  readonly languageNote?: Bilingual;
}

export type AlmanacTopic =
  'food' | 'clothing' | 'homes' | 'religion' | 'money' | 'health' | 'travel' | 'population' | 'nature';

export interface AlmanacEntry {
  readonly id: string;
  readonly when: TimeRange;
  readonly topic: AlmanacTopic;
  readonly text: Bilingual;
  readonly provenance: Provenance;
}

export interface LanguageUse {
  readonly who: Bilingual;
  readonly language: LanguageCode;
  readonly note: Bilingual;
}

export interface LanguageSnapshot {
  readonly id: string;
  readonly when: TimeRange;
  readonly uses: readonly LanguageUse[];
  readonly provenance: Provenance;
}

export type FeatureKind =
  | { readonly type: 'roundhouses'; readonly count: number; readonly spread: number }
  | {
      readonly type: 'hillfort';
      readonly length: number;
      readonly width: number;
      readonly angle: number;
      readonly rings: number;
      readonly stone: boolean;
      readonly ruined: boolean;
    }
  | { readonly type: 'roman-fort'; readonly width: number; readonly length: number; readonly angle: number }
  | { readonly type: 'hall-houses'; readonly count: number; readonly spread: number }
  | {
      readonly type: 'town';
      readonly nearest: number;
      readonly radius: number;
      readonly style: 'georgian' | 'victorian' | 'modern';
    }
  | { readonly type: 'countryside'; readonly share: number }
  | { readonly type: 'building'; readonly plan: Plan; readonly condition: Condition }
  | { readonly type: 'railway' }
  | { readonly type: 'roads' };

export interface Feature {
  readonly id: FeatureId;
  readonly kind: FeatureKind;
  readonly at: GridRef;
  readonly place?: PlaceId;
  readonly when: TimeRange;
  readonly provenance: Provenance;
  readonly label: Bilingual;
}

export const AMBIENT_BEDS = [
  'wind',
  'river',
  'birds',
  'forest',
  'livestock',
  'forge',
  'bells',
  'market',
  'train',
  'traffic',
  'chant',
] as const;
export type AmbientBed = (typeof AMBIENT_BEDS)[number];

export interface EnvironmentKey {
  readonly year: Year;
  readonly forest: number;
  readonly farmland: number;
  readonly moor: number;
  readonly skyTop: string;
  readonly skyHorizon: string;
  readonly sun: string;
  readonly fog: number;
  readonly mappedWoodland: number;
  readonly ambient: Readonly<Partial<Record<AmbientBed, number>>>;
}
