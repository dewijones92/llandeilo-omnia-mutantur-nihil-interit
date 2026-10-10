import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { modelSheets } from '../../src/content/landmarks.ts';
import { WORLD_CONTENT } from '../../src/content/world.ts';
import type { BuildSheet } from '../../src/domain/buildsheet.ts';

export const ROOT = join(import.meta.dirname, '../..');
export const SCRIPT = join(ROOT, 'tools/models/build_landmark.py');
// Bump when finish-gltf changes what it writes, so every model counts as stale.
export const FINISH_VERSION = '1';

export function sheets(): BuildSheet[] {
  return modelSheets(WORLD_CONTENT.features);
}

/** What a model was built from: its sheet, the Blender script and the finishing step. A change to any makes it stale. */
export function inputHash(sheet: BuildSheet): string {
  return createHash('sha1')
    .update(JSON.stringify(sheet))
    .update(readFileSync(SCRIPT))
    .update(FINISH_VERSION)
    .digest('hex')
    .slice(0, 16);
}
