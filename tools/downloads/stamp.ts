// The credit and licence a downloadable glb carries in its own asset block (ADR 0058), taken from the one asset manifest
// (src/content/assets.ts) so the file and the Downloads list never say different things.
import { REPO_URL, type AssetRecord } from '../../src/content/assets.ts';
import type { PartTiers } from '../../src/content/downloads.ts';
import type { Glb } from '../models/glb.ts';

export interface AssetBlock {
  readonly copyright: string;
  readonly extras: Readonly<Record<string, unknown>>;
}

/** The credit and licence from the manifest, and whatever else the file's own kind adds (a landmark's `placement`). */
export function assetBlock(record: AssetRecord, extra: Readonly<Record<string, unknown>> = {}): AssetBlock {
  return {
    copyright: record.source,
    extras: {
      collection: record.what.en,
      licence: record.licence,
      sourceUrl: record.url,
      project: 'Llandeilo Through Time',
      projectUrl: REPO_URL,
      ...extra,
    },
  };
}

/** The model's anchor on the British National Grid, from its scene extras. */
export function anchorOf(glb: Glb): { readonly e: number; readonly n: number } {
  const anchor: unknown = glb.json.scenes?.[0]?.extras?.['anchor'];
  const e: unknown = anchor && typeof anchor === 'object' ? Reflect.get(anchor, 'e') : undefined;
  const n: unknown = anchor && typeof anchor === 'object' ? Reflect.get(anchor, 'n') : undefined;
  if (typeof e !== 'number' || typeof n !== 'number')
    throw new Error('a landmark model has no anchor in its scene extras');
  return { e, n };
}

/** How a landmark model sits among the terrain tiles: its anchor on the grid, and where that is in the tiles' shared scene. */
export function modelPlacement(
  glb: Glb,
  region: { readonly eMin: number; readonly nMin: number },
): Record<string, unknown> {
  const anchor = anchorOf(glb);
  return {
    anchorBng: anchor,
    atInTerrainScene: [anchor.e - region.eMin, 0, -(anchor.n - region.nMin)],
    how: 'x is metres east, y is metres up and z is minus the metres north of the model’s anchor, which is at anchorBng on the British National Grid. Put the anchor at atInTerrainScene to place the model among the terrain tiles, which share that scene origin (the region’s south-west corner). The model’s y is not tied to any terrain: the app drops each part onto the ground it draws when the model loads (ADR 0053), so lower or raise each part onto the ground you use.',
  };
}

/** The tiers of a landmark model's parts, counted from the parts' own extras. */
export function partTiers(glb: Glb): PartTiers {
  const counted = { documented: 0, reconstructed: 0, imagined: 0 };
  for (const node of glb.json.nodes) {
    const tier = node.extras?.['tier'];
    if (tier === 'documented' || tier === 'reconstructed' || tier === 'imagined') counted[tier]++;
  }
  return counted;
}

/** What the file's asset block says now, for comparing with `assetBlock`. */
export function readAssetBlock(glb: Glb): { readonly copyright?: unknown; readonly extras?: unknown } {
  return {
    copyright: Reflect.get(glb.json.asset, 'copyright'),
    extras: Reflect.get(glb.json.asset, 'extras'),
  };
}

export function isStamped(glb: Glb, record: AssetRecord, extra?: Readonly<Record<string, unknown>>): boolean {
  const want = assetBlock(record, extra);
  const have = readAssetBlock(glb);
  return have.copyright === want.copyright && JSON.stringify(have.extras) === JSON.stringify(want.extras);
}

/** The same glb with its asset block carrying the record's credit and licence; the geometry and every other field are untouched. */
export function stampAsset(glb: Glb, record: AssetRecord, extra?: Readonly<Record<string, unknown>>): Glb {
  const block = assetBlock(record, extra);
  const asset = { ...glb.json.asset, copyright: block.copyright, extras: block.extras };
  return { json: { ...glb.json, asset }, bin: glb.bin };
}
