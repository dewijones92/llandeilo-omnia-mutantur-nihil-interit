import type { Bilingual } from '../domain/i18n.ts';

export interface AssetRecord {
  readonly files: RegExp;
  readonly what: Bilingual;
  readonly source: string;
  readonly licence: string;
  readonly url: string;
}

const OS = 'Contains OS data © Crown copyright and database right 2026';
const OGL = 'Open Government Licence v3.0';

export const ASSETS: readonly AssetRecord[] = [
  {
    files: /^data\/terrain\.(bin|json)$/,
    what: { en: 'Terrain heights', cy: 'Uchderau’r tir' },
    source: `${OS} (OS Terrain 50)`,
    licence: OGL,
    url: 'https://www.ordnancesurvey.co.uk/products/os-terrain-50',
  },
  {
    files: /^data\/rivers\.json$/,
    what: { en: 'Rivers', cy: 'Afonydd' },
    source: `${OS} (OS Open Rivers)`,
    licence: OGL,
    url: 'https://www.ordnancesurvey.co.uk/products/os-open-rivers',
  },
  {
    files: /^data\/(buildings\.bin|railways\.json|roads\.json|woodland\.bin|osdata\.json)$/,
    what: {
      en: 'Buildings, railways, roads and woodland',
      cy: 'Adeiladau, rheilffyrdd, ffyrdd a choetiroedd',
    },
    source: `${OS} (OS Open Map Local)`,
    licence: OGL,
    url: 'https://www.ordnancesurvey.co.uk/products/os-open-map-local',
  },
  {
    files: /^voices\/.+\.(mp3|json)$/,
    what: { en: 'Voices', cy: 'Lleisiau' },
    source: 'Microsoft neural text-to-speech via edge-tts, generated from this project’s own scripts',
    licence: 'Generated audio of original text',
    url: 'https://github.com/rany2/edge-tts',
  },
];
