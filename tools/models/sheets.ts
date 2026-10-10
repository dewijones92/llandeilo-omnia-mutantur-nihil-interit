import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { modelSheets } from '../../src/content/landmarks.ts';
import { WORLD_CONTENT } from '../../src/content/world.ts';
import type { BuildSheet } from '../../src/domain/buildsheet.ts';

export const ROOT = join(import.meta.dirname, '../..');
export const SCRIPT = join(ROOT, 'tools/models/build_landmark.py');
// The finishing step and this hash: a change to any of these files changes what a glb carries, so every model counts as stale.
// The Blender version is not here, so the test needs no Blender; `npm run models` compares it with the one a model was built by.
const FINISH = ['tools/models/build.ts', 'tools/models/glb.ts', 'tools/models/sheets.ts'] as const;

export function sheets(): BuildSheet[] {
  return modelSheets(WORLD_CONTENT.features);
}

/** What a model was built from: its sheet, the Blender script and the finishing step's source. A change to any makes it stale. */
export function inputHash(sheet: BuildSheet): string {
  return createHash('sha1')
    .update(JSON.stringify(sheet))
    .update(readFileSync(SCRIPT))
    .update(FINISH.map((f) => readFileSync(join(ROOT, f), 'utf8')).join('\0'))
    .digest('hex')
    .slice(0, 16);
}
