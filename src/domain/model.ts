import type { Brand } from './brand.ts';
import type { Season } from './daylight.ts';
import type { Bilingual } from './i18n.ts';
import type { Condition, Plan } from './plan.ts';
import type { NonEmptyArray } from './assert.ts';
import type { Provenance, SourceId } from './provenance.ts';
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
  // Before this year the name shows "(today)": the earliest record of the name, or, where none is
  // found, a late bound (the oldest use we can cite, or when the thing we draw begins).
  readonly namedFrom: Year;
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
  // The season, and sometimes the hour, that a source gives for this moment.
  readonly recordedSky?: RecordedSky;
}

export interface RecordedSky {
  readonly season: Season;
  // A recorded hour comes from the source; a chosen one only fits what the source says (by day,
  // at night) and the note must say the hour itself is not recorded.
  readonly hour?: { readonly kind: 'recorded' | 'chosen'; readonly value: number };
  readonly note: Bilingual;
  readonly sources: NonEmptyArray<SourceId>;
}

export type Framing = 'close' | 'site' | 'area';

export type Shot =
  | { readonly framing: 'valley'; readonly feature?: never }
  | { readonly framing: Framing; readonly feature?: FeatureId };

export type LanguageCode =
  | 'unknown'
  | 'brittonic'
  | 'latin'
  | 'primitive-welsh'
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

export type RollingStock = 'llanelly-1850s' | 'generic';

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
  | { readonly type: 'train'; readonly stock: RollingStock }
  | { readonly type: 'roads' };

export interface Feature {
  readonly id: FeatureId;
  readonly kind: FeatureKind;
  readonly at: GridRef;
  readonly place?: PlaceId;
  readonly when: TimeRange;
  readonly provenance: Provenance;
  readonly label: Bilingual;
  // Set only where a source gives both ends as attested years (an end at the present counts);
  // most drawn ranges are rounded or inferred, and "When are we?" calls those clues only probable.
  readonly datesExact?: true;
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

// Each bed has its own dated points, so a sound date never needs a look keyframe. A bed is silent
// before its first point and after a silent one, and never fades in from silence: a level cannot
// exist without a heard point's reason, and cannot leak before that point's date.
export type BedPoint =
  | { readonly kind: 'heard'; readonly year: Year; readonly level: number; readonly provenance: Provenance }
  | { readonly kind: 'silent'; readonly year: Year };

export type Soundscape = Readonly<Record<AmbientBed, readonly BedPoint[]>>;

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
}
