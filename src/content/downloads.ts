import { snGridRef } from '../domain/geo.ts';
import type { Bilingual, Lang } from '../domain/i18n.ts';
import type { Feature } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import type { TimeRange } from '../domain/time.ts';
import { assetFor, RELEASE_DOWNLOAD_URL, type AssetRecord } from './assets.ts';
import { LANDMARK_TIERS, TRAIN_MODEL } from './generated/downloads.ts';
import { TERRAIN_TILES } from './generated/terrain-tiles.ts';
import { LANDMARK_MODELS } from './generated/models.ts';

/** A published .glb with its size, as `tools/downloads/build.ts` found it; the Downloads list is built from these and the asset manifest. */
export interface ModelFile {
  readonly file: string;
  readonly bytes: number;
  readonly triangles: number;
}

/** How many of a model's parts are documented, reconstructed or imagined, counted from the parts' own tiers in the glb. */
export type PartTiers = Readonly<Record<Provenance['kind'], number>>;

/** A terrain tile as `tools/terrain/export-glb.ts` made it: a release asset, so `file` is its asset name and the hash is of those bytes. */
export interface TerrainTileFile extends ModelFile {
  readonly sha256: string;
  readonly e: number;
  readonly n: number;
  readonly size: number;
  readonly step: number;
  readonly areas: readonly string[];
  readonly minHeight: number;
  readonly maxHeight: number;
}

export type Period =
  | { readonly kind: 'range'; readonly when: TimeRange; readonly approximate: boolean }
  | { readonly kind: 'text'; readonly text: Bilingual };

export interface Download {
  /** The file's path under public/ for a model; a terrain tile's name as a release asset. */
  readonly file: string;
  /** Set where the file is not served by the app: the whole URL, on the latest GitHub release. */
  readonly releaseUrl?: string;
  readonly bytes: number;
  readonly group: 'models' | 'terrain';
  readonly name: Bilingual;
  readonly variant?: Bilingual;
  readonly what: Bilingual;
  readonly period: Period;
  readonly asset: AssetRecord;
  /** Set only where the whole file has one tier (the train); a landmark model is labelled by `tiers`, never by its site's. */
  readonly provenance?: Provenance;
  readonly tiers?: PartTiers;
  readonly triangles: number;
  readonly tile?: {
    readonly e: number;
    readonly n: number;
    readonly size: number;
    readonly step: number;
    readonly gridRef: string;
    readonly minHeight: number;
    readonly maxHeight: number;
  };
}

/** The names the exported terrain's areas go by; a tile in an area with no name here fails the content tests. */
export const TERRAIN_AREA_NAMES: Readonly<Record<string, Bilingual>> = {
  llandeilo: { en: 'Llandeilo town', cy: 'Tref Llandeilo' },
  'roman-forts': { en: 'Dinefwr Roman forts', cy: 'Caerau Rhufeinig Dinefwr' },
  'dinefwr-castle': { en: 'Dinefwr Castle hill', cy: 'Bryn Castell Dinefwr' },
};

const NEAR_WHAT: Bilingual = {
  en: 'The full model, built from the plan in real metres. Every part is tagged documented, reconstructed or imagined, with its source ids, inside the file.',
  cy: 'Y model llawn, wedi’i adeiladu o’r cynllun mewn metrau go iawn. Mae pob rhan wedi’i thagio’n wedi’i gofnodi, wedi’i ail-greu neu’n ddychmygol, gyda dynodwyr eu ffynonellau, y tu mewn i’r ffeil.',
};

const FAR_WHAT: Bilingual = {
  en: 'The simplified model the app draws from a distance: the same plan with fewer parts and less detail.',
  cy: 'Y model symlach y mae’r ap yn ei dynnu o bell: yr un cynllun â llai o rannau a llai o fanylion.',
};

const VARIANT: Readonly<Record<'near' | 'far', Bilingual>> = {
  near: { en: 'detailed', cy: 'manwl' },
  far: { en: 'simplified', cy: 'symlach' },
};

const TRAIN_WHAT: Bilingual = {
  en: 'A steam engine, tender and carriages of the Llanelly Railway’s trains of the 1850s, as the app draws them. Reconstructed: the colours, tender and carriages are guesses.',
  cy: 'Injan stêm, tendr a cherbydau trenau Rheilffordd Llanelli yn y 1850au, fel y mae’r ap yn eu tynnu. Wedi’i ail-greu: dyfalu yw’r lliwiau, y tendr a’r cerbydau.',
};

const TERRAIN_PERIOD: Bilingual = {
  en: 'Today: the ground as surveyed from the air in the winter of 2021 to 2022 (the tile files are dated December 2021 to February 2022)',
  cy: 'Heddiw: y tir fel yr arolygwyd ef o’r awyr yng ngaeaf 2021 i 2022 (mae ffeiliau’r teils wedi’u dyddio Rhagfyr 2021 i Chwefror 2022)',
};

function assetOf(file: string): AssetRecord {
  const asset = assetFor(file);
  if (!asset) throw new Error(`${file} is listed for download but the asset manifest has no record of it`);
  return asset;
}

function tiersOf(file: string): PartTiers {
  const tiers = LANDMARK_TIERS[file];
  if (!tiers) throw new Error(`${file} is a landmark model with no part tiers in generated/downloads.ts`);
  return tiers;
}

function featureNamed(features: readonly Feature[], id: string): Feature {
  const f = features.find((x) => x.id === id);
  if (!f) throw new Error(`no feature ${id} for a download`);
  return f;
}

function featurePeriod(f: Feature): Period {
  return { kind: 'range', when: f.when, approximate: f.datesExact !== true };
}

function areaNames(areas: readonly string[]): Bilingual {
  const named = areas.map((a) => {
    const name = TERRAIN_AREA_NAMES[a];
    if (!name) throw new Error(`terrain area ${a} has no name in TERRAIN_AREA_NAMES`);
    return name;
  });
  return { en: named.map((n) => n.en).join(' / '), cy: named.map((n) => n.cy).join(' / ') };
}

function terrainWhat(size: number, step: number): Bilingual {
  return {
    en: `The bare ground of a ${String(size)}m square, from the Welsh Government LiDAR survey, at a ${String(step)}m grid.`,
    cy: `Tir noeth sgwâr ${String(size)}m, o arolwg LiDAR Llywodraeth Cymru, ar grid ${String(step)}m.`,
  };
}

/** Everything the app offers for download, in the order it is listed: the landmark models, the train, then the terrain tiles. */
export function buildDownloads(features: readonly Feature[]): Download[] {
  const out: Download[] = [];
  for (const m of LANDMARK_MODELS) {
    const f = featureNamed(features, m.feature);
    for (const level of ['near', 'far'] as const) {
      const entry = m[level];
      if (entry.triangles === 0) continue;
      out.push({
        file: entry.file,
        bytes: entry.bytes,
        group: 'models',
        name: f.label,
        variant: VARIANT[level],
        what: level === 'near' ? NEAR_WHAT : FAR_WHAT,
        period: featurePeriod(f),
        asset: assetOf(entry.file),
        tiers: tiersOf(entry.file),
        triangles: entry.triangles,
      });
    }
  }
  const train = featureNamed(features, 'train-llanelly');
  out.push({
    file: TRAIN_MODEL.file,
    bytes: TRAIN_MODEL.bytes,
    group: 'models',
    name: train.label,
    what: TRAIN_WHAT,
    period: featurePeriod(train),
    asset: assetOf(TRAIN_MODEL.file),
    provenance: train.provenance,
    triangles: TRAIN_MODEL.triangles,
  });
  const areaOrder = Object.keys(TERRAIN_AREA_NAMES);
  const firstArea = (t: TerrainTileFile): number => areaOrder.indexOf(t.areas[0] ?? '');
  const tiles = [...TERRAIN_TILES].sort((a, b) => firstArea(a) - firstArea(b) || a.n - b.n || a.e - b.e);
  for (const t of tiles) {
    const gridRef = snGridRef({ e: t.e, n: t.n });
    const areas = areaNames(t.areas);
    out.push({
      file: t.file,
      releaseUrl: `${RELEASE_DOWNLOAD_URL}/${t.file}`,
      bytes: t.bytes,
      group: 'terrain',
      name: {
        en: `${areas.en}, tile ${gridRef}`,
        cy: `${areas.cy}, teilsen ${gridRef}`,
      },
      what: terrainWhat(t.size, t.step),
      period: { kind: 'text', text: TERRAIN_PERIOD },
      asset: assetOf(t.file),
      triangles: t.triangles,
      tile: {
        e: t.e,
        n: t.n,
        size: t.size,
        step: t.step,
        gridRef,
        minHeight: t.minHeight,
        maxHeight: t.maxHeight,
      },
    });
  }
  return out;
}

/** A file size as people read it: 528 bytes, 27 KB, 1.2 MB (thousands, as a file manager shows them). */
export function formatBytes(bytes: number, lang: Lang): string {
  const unit = lang === 'cy' ? 'beit' : 'bytes';
  if (bytes < 1000) return `${String(bytes)} ${unit}`;
  const number = (v: number, digits: number): string =>
    v.toLocaleString(lang === 'cy' ? 'cy-GB' : 'en-GB', {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  return bytes < 1_000_000 ? `${number(bytes / 1000, 0)} KB` : `${number(bytes / 1_000_000, 1)} MB`;
}
