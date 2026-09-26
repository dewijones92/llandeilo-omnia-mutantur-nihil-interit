import type { Brand } from './brand.ts';
import type { Bilingual } from './i18n.ts';
import type { Provenance } from './provenance.ts';
import type { TimeRange, Year } from './time.ts';

export type PlaceId = Brand<string, 'PlaceId'>;
export type EventId = Brand<string, 'EventId'>;
export type FeatureId = Brand<string, 'FeatureId'>;
export type PersonId = Brand<string, 'PersonId'>;
export type ConversationId = Brand<string, 'ConversationId'>;
export type EraId = Brand<string, 'EraId'>;

/** British National Grid (EPSG:27700), metres. */
export interface GridRef {
  readonly e: number;
  readonly n: number;
}

export interface Place {
  readonly id: PlaceId;
  /** Welsh first, per the house rule; English/historic forms in `other`. */
  readonly name: string;
  readonly other?: string;
  readonly at: GridRef;
  readonly description: Bilingual;
  readonly provenance: Provenance;
  /** Places you can fly into. */
  readonly visitable: boolean;
}

export interface KeyEvent {
  readonly id: EventId;
  readonly when: TimeRange;
  readonly approximate: boolean;
  readonly title: Bilingual;
  readonly summary: Bilingual;
  readonly place?: PlaceId;
  /** Magnetic events snap the slider and get a "moment". */
  readonly magnetic: boolean;
  readonly provenance: Provenance;
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
  /** Hex colour for the era band on the timeline. */
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
  /** Real, documented historical figure (never given invented quotes as if real). */
  readonly historical: boolean;
  /** Member of the imagined family that recurs through time. */
  readonly family: boolean;
}

export interface Line {
  readonly speaker: PersonId;
  readonly language: LanguageCode;
  /** As spoken, in the period language where we have it; otherwise a modern stand-in. */
  readonly spoken: string;
  readonly translation: Bilingual;
}

export interface Conversation {
  readonly id: ConversationId;
  readonly when: TimeRange;
  readonly place: PlaceId;
  readonly title: Bilingual;
  readonly people: readonly PersonId[];
  readonly lines: readonly Line[];
  readonly provenance: Provenance;
  /** Note shown when the spoken form is a stand-in or approximation. */
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

/** Things the renderer draws. One union, one builder per kind, exhaustive in the world layer. */
export type FeatureKind =
  | { readonly type: 'roundhouses'; readonly count: number; readonly spread: number }
  | {
      readonly type: 'hillfort';
      readonly radius: number;
      readonly rings: number;
      readonly stone: boolean;
      readonly elongation: number;
      readonly angle: number;
    }
  | { readonly type: 'roman-fort'; readonly width: number; readonly length: number; readonly angle: number }
  | {
      readonly type: 'castle';
      readonly towers: number;
      readonly radius: number;
      readonly ruined: boolean;
      readonly keep: boolean;
    }
  | { readonly type: 'church'; readonly length: number; readonly tower: boolean; readonly angle: number }
  | { readonly type: 'abbey'; readonly length: number; readonly ruined: boolean; readonly angle: number }
  | { readonly type: 'hall-houses'; readonly count: number; readonly spread: number }
  | {
      readonly type: 'town';
      readonly streets: readonly (readonly GridRef[])[];
      readonly density: number;
      readonly style: 'medieval' | 'georgian' | 'modern';
    }
  | { readonly type: 'mansion'; readonly width: number; readonly depth: number; readonly angle: number }
  | { readonly type: 'bridge'; readonly span: number; readonly angle: number; readonly stone: boolean }
  | { readonly type: 'railway'; readonly path: readonly GridRef[]; readonly trains: number }
  | { readonly type: 'fields'; readonly radius: number; readonly hedged: boolean }
  | { readonly type: 'tower'; readonly height: number };

export interface Feature {
  readonly id: FeatureId;
  readonly kind: FeatureKind;
  readonly at: GridRef;
  readonly place?: PlaceId;
  readonly when: TimeRange;
  readonly provenance: Provenance;
  readonly label: Bilingual;
}

export type AmbientBed =
  | 'wind'
  | 'river'
  | 'birds'
  | 'forest'
  | 'livestock'
  | 'forge'
  | 'bells'
  | 'market'
  | 'train'
  | 'traffic'
  | 'chant';

/** Environment keyframe: interpolated between neighbours for any year. */
export interface EnvironmentKey {
  readonly year: Year;
  /** 0..1 share of lowland covered in woodland. */
  readonly forest: number;
  /** 0..1 share of lowland in fields/pasture. */
  readonly farmland: number;
  /** 0..1 moorland/heath on the uplands. */
  readonly moor: number;
  /** Sky zenith and horizon colours, sun warmth. */
  readonly skyTop: string;
  readonly skyHorizon: string;
  readonly sun: string;
  readonly fog: number;
  readonly ambient: Readonly<Partial<Record<AmbientBed, number>>>;
}
