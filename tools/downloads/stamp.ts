// The credit and licence a downloadable glb carries in its own asset block (ADR 0058), taken from the one asset manifest
// (src/content/assets.ts) so the file and the Downloads list never say different things.
import { REPO_URL, type AssetRecord } from '../../src/content/assets.ts';
import type { Glb } from '../models/glb.ts';

export interface AssetBlock {
  readonly copyright: string;
  readonly extras: {
    readonly collection: string;
    readonly licence: string;
    readonly sourceUrl: string;
    readonly project: string;
    readonly projectUrl: string;
  };
}

export function assetBlock(record: AssetRecord): AssetBlock {
  return {
    copyright: record.source,
    extras: {
      collection: record.what.en,
      licence: record.licence,
      sourceUrl: record.url,
      project: 'Llandeilo Through Time',
      projectUrl: REPO_URL,
    },
  };
}

/** What the file's asset block says now, for comparing with `assetBlock`. */
export function readAssetBlock(glb: Glb): { readonly copyright?: unknown; readonly extras?: unknown } {
  return {
    copyright: Reflect.get(glb.json.asset, 'copyright'),
    extras: Reflect.get(glb.json.asset, 'extras'),
  };
}

export function isStamped(glb: Glb, record: AssetRecord): boolean {
  const want = assetBlock(record);
  const have = readAssetBlock(glb);
  return have.copyright === want.copyright && JSON.stringify(have.extras) === JSON.stringify(want.extras);
}

/** The same glb with its asset block carrying the record's credit and licence; the geometry and every other field are untouched. */
export function stampAsset(glb: Glb, record: AssetRecord): Glb {
  const block = assetBlock(record);
  const asset = { ...glb.json.asset, copyright: block.copyright, extras: block.extras };
  return { json: { ...glb.json, asset }, bin: glb.bin };
}
