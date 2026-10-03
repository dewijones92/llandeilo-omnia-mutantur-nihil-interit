import type { Bilingual } from '../domain/i18n.ts';
import type { AlmanacTopic, LanguageCode } from '../domain/model.ts';

export interface LanguageInfo {
  readonly name: Bilingual;
  readonly tag: string;
  readonly voices: { readonly male: string; readonly female: string };
}

const WELSH_VOICES = { male: 'cy-GB-AledNeural', female: 'cy-GB-NiaNeural' } as const;
const ENGLISH_VOICES = { male: 'en-GB-RyanNeural', female: 'en-GB-SoniaNeural' } as const;

export const LANGUAGES: Readonly<Record<LanguageCode, LanguageInfo>> = {
  unknown: { name: { en: 'Unknown language', cy: 'Iaith anhysbys' }, tag: 'cy', voices: WELSH_VOICES },
  brittonic: { name: { en: 'Brittonic', cy: 'Brythoneg' }, tag: 'cy', voices: WELSH_VOICES },
  latin: {
    name: { en: 'Latin', cy: 'Lladin' },
    tag: 'la',
    voices: { male: 'it-IT-DiegoNeural', female: 'it-IT-IsabellaNeural' },
  },
  'primitive-welsh': {
    name: { en: 'Primitive Welsh', cy: 'Cymraeg Cyntefig' },
    tag: 'cy',
    voices: WELSH_VOICES,
  },
  'old-welsh': { name: { en: 'Old Welsh', cy: 'Hen Gymraeg' }, tag: 'cy', voices: WELSH_VOICES },
  'middle-welsh': { name: { en: 'Middle Welsh', cy: 'Cymraeg Canol' }, tag: 'cy', voices: WELSH_VOICES },
  welsh: { name: { en: 'Welsh', cy: 'Cymraeg' }, tag: 'cy', voices: WELSH_VOICES },
  'anglo-norman': {
    name: { en: 'Anglo-Norman French', cy: 'Ffrangeg Eingl-Normanaidd' },
    tag: 'fr',
    voices: { male: 'fr-FR-HenriNeural', female: 'fr-FR-DeniseNeural' },
  },
  'middle-english': {
    name: { en: 'Middle English', cy: 'Saesneg Canol' },
    tag: 'en',
    voices: ENGLISH_VOICES,
  },
  english: { name: { en: 'English', cy: 'Saesneg' }, tag: 'en', voices: ENGLISH_VOICES },
};

export const VOICE_TUNING = {
  child: { pitch: '+22Hz', rate: '+6%' },
  adult: { pitch: '+0Hz', rate: '+0%' },
  elder: { pitch: '-12Hz', rate: '-10%' },
} as const;

export const ALMANAC_TOPICS: Readonly<Record<AlmanacTopic, Bilingual>> = {
  food: { en: 'Food', cy: 'Bwyd' },
  clothing: { en: 'Clothing', cy: 'Dillad' },
  homes: { en: 'Homes', cy: 'Cartrefi' },
  light: { en: 'Light after dark', cy: 'Golau’r nos' },
  religion: { en: 'Belief', cy: 'Cred' },
  money: { en: 'Money', cy: 'Arian' },
  health: { en: 'Health', cy: 'Iechyd' },
  travel: { en: 'Travel', cy: 'Teithio' },
  population: { en: 'People', cy: 'Pobl' },
  nature: { en: 'Nature', cy: 'Natur' },
};
