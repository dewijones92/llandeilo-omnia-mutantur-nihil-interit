import type { Bilingual } from '../domain/i18n.ts';
import { TEXTURED } from '../domain/surfaces.ts';
import { LIDAR_CREDIT } from './generated/lidar-credit.ts';
import { SURFACE_LICENCE, SURFACES } from './surfaces.ts';

export interface AssetRecord {
  readonly files: RegExp;
  readonly what: Bilingual;
  readonly source: string;
  readonly licence: string;
  /** Where the licence's own text is, where that is a different page from the source's. */
  readonly licenceUrl?: string;
  readonly url: string;
}

const OS = 'Contains OS data © Crown copyright and database right 2026';
const OGL = 'Open Government Licence v3.0';
const LIDAR_LICENCE = `${OGL}, as stated on the DataMapWales LiDAR download page (the tile catalogue's own entry states none)`;
const LIDAR_URL = 'https://datamap.gov.wales/maps/lidar-data-download/';
const OGL_URL = 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/';

export const REPO_URL = 'https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit';

/** Where a file attached to the latest GitHub release can be fetched: the terrain tiles are published there, not in the repo (ADR 0058). */
export const RELEASE_DOWNLOAD_URL = `${REPO_URL}/releases/latest/download`;

/** The name a terrain tile has as a release asset; no file of this name is in public/. */
export const RELEASE_TILE_FILE = /^lidar-\d+-\d+\.glb$/;

export const EXTERNAL_CREDITS: readonly {
  readonly what: Bilingual;
  readonly source: string;
  readonly licence: string;
  readonly url: string;
}[] = [
  {
    what: { en: 'Typefaces', cy: 'Ffontiau' },
    source: 'Fraunces and Source Sans 3, served by Google Fonts',
    licence: 'SIL Open Font License 1.1',
    url: 'https://openfontlicense.org',
  },
];

export const ASSETS: readonly AssetRecord[] = [
  {
    files: /^data\/terrain\.(bin|json)$/,
    what: { en: 'Terrain heights', cy: 'Uchderau’r tir' },
    source: `${OS} (OS Terrain 50)`,
    licence: OGL,
    url: 'https://www.ordnancesurvey.co.uk/products/os-terrain-50',
  },
  {
    files: /^data\/lidar\/lidar\.(bin|json)$/,
    what: { en: 'Close-up terrain heights', cy: 'Uchderau’r tir manwl' },
    source: `${LIDAR_CREDIT} Resampled to 2m and 10m by tools/terrain/build-lidar.py.`,
    licence: LIDAR_LICENCE,
    licenceUrl: OGL_URL,
    url: LIDAR_URL,
  },
  {
    files: RELEASE_TILE_FILE,
    what: {
      en: 'Close-up terrain tiles (glb, release assets)',
      cy: 'Teils tir manwl (glb, asedau rhyddhau)',
    },
    source: `${LIDAR_CREDIT} Exported to glb at 2m by tools/terrain/export-glb.ts from the tiles in public/data/lidar, with the heights unchanged.`,
    licence: LIDAR_LICENCE,
    licenceUrl: OGL_URL,
    url: LIDAR_URL,
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
    files: /^models\/llanelly-train\.glb$/,
    what: { en: 'The 1850s train', cy: 'Trên y 1850au' },
    source:
      'Built by this project’s Blender script tools/models/llanelly-train.py, from the Board of Trade report of 1858 (docs/research/railway-locomotives.md)',
    licence: 'Original work of this project',
    url: 'https://www.railwaysarchive.co.uk/documents/BoT_Pantyffynnon1858.pdf',
  },
  {
    files: /^models\/landmarks\/[a-z0-9-]+\.(near|far)\.glb$/,
    what: { en: 'The landmark models', cy: 'Modelau’r tirnodau' },
    source:
      'Built by this project’s Blender script tools/models/build_landmark.py from the typed plans in src/content (ADR 0053); each part’s sources are in its ⓘ',
    licence: 'Original work of this project',
    url: `${REPO_URL}/tree/main/tools/models`,
  },
  // One row per photograph a model's surfaces are textured with (ADR 0055); what each surface claims is in its ⓘ.
  ...TEXTURED.map((id): AssetRecord => ({
    files: new RegExp(`^textures/landmarks/${id}-(color|normal)-(1024|512)\\.webp$`),
    what: {
      en: `Texture for the models: ${SURFACES[id].name.en}`,
      cy: `Gwead ar gyfer y modelau: ${SURFACES[id].name.cy}`,
    },
    source: `“${SURFACES[id].photo.title}” by ${SURFACES[id].photo.author}, Poly Haven; resized and normalised to mid-grey by tools/textures/build.ts; the app tints it to its own colour for the material`,
    licence: SURFACE_LICENCE,
    url: SURFACES[id].photo.page,
  })),
  {
    files: /^photos\/harries\/\d+\.jpg$/,
    what: { en: 'Photographs by D C Harries', cy: 'Ffotograffau gan D C Harries' },
    source:
      'D C Harries (Llandeilo photographer, c. 1888 to 1940); prints in the Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales; each photograph’s own credit and item number are in src/content/photographs.ts. PCW’s item pages state its Creative Archive Licence (non-commercial downloads)',
    licence:
      'People’s Collection Wales Creative Archive Licence (non-commercial), as stated on each item page; not checked per item',
    url: 'https://www.peoplescollection.wales/collections/2287136',
  },
  {
    files: /^voices\/.+\.(mp3|json)$/,
    what: { en: 'Voices', cy: 'Lleisiau' },
    source: 'Microsoft neural text-to-speech via edge-tts, generated from this project’s own scripts',
    licence: 'Generated audio of original text',
    url: 'https://github.com/rany2/edge-tts',
  },
];

/** The record that credits a published file (its path under public/), if any. */
export function assetFor(file: string): AssetRecord | undefined {
  return ASSETS.find((a) => a.files.test(file));
}
