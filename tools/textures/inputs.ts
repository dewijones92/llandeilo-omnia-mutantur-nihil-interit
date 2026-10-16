import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SURFACES } from '../../src/content/surfaces.ts';
import { textureFile, type TexturedSurface, type TextureSize } from '../../src/domain/surfaces.ts';

export const ROOT = join(import.meta.dirname, '../..');
export const PROCESS = join(ROOT, 'tools/textures/process.py');

export type MapKind = 'color' | 'normal';

/**
 * What a map was made from: the photograph's checksum, the surface's detail strength (colour maps only), the
 * size and the processing script. A change to any makes the committed map stale.
 */
export function textureInputHash(surface: TexturedSurface, map: MapKind, size: TextureSize): string {
  const s = SURFACES[surface];
  return createHash('sha1')
    .update(s.photo[map].md5)
    .update(map === 'color' ? String(s.look.detail) : '-')
    .update(String(size))
    .update(readFileSync(PROCESS))
    .digest('hex')
    .slice(0, 16);
}

export const textureKey = (surface: TexturedSurface, map: MapKind, size: TextureSize): string =>
  textureFile(surface, map, size);
