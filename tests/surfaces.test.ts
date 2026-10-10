import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ASSETS } from '../src/content/assets.ts';
import { SOURCES } from '../src/content/sources.ts';
import { SURFACE_LICENCE, SURFACES } from '../src/content/surfaces.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { MODELLED } from '../src/content/landmarks.ts';
import { basisOf } from '../src/ui/provenance.ts';
import { isTextured, partSurfaces, TEXTURE_SIZE, TEXTURED, textureFile } from '../src/domain/surfaces.ts';

const root = join(import.meta.dirname, '..');
const SIZES = Object.values(TEXTURE_SIZE);
const MAPS = ['color', 'normal'] as const;

/** A lossy WebP's width and height, from its VP8 frame header. */
function webpSize(file: string): { readonly width: number; readonly height: number } {
  const b = readFileSync(file);
  expect(b.toString('ascii', 0, 4)).toBe('RIFF');
  expect(b.toString('ascii', 8, 12)).toBe('WEBP');
  expect(b.toString('ascii', 12, 16), file).toBe('VP8 ');
  return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
}

describe('the textures on the landmark models (ADR 0055)', () => {
  it('ship a colour map and a normal map for every textured surface, at full size for High and half for Medium', () => {
    for (const id of TEXTURED)
      for (const map of MAPS)
        for (const size of SIZES) {
          const file = join(root, 'public', textureFile(id, map, size));
          expect(existsSync(file), file).toBe(true);
          expect(webpSize(file), file).toEqual({ width: size, height: size });
        }
  });

  it('fit the texture budget: under 256MB of GPU memory at High and half that at Medium, with mipmaps', () => {
    const memory = (size: number): number => TEXTURED.length * MAPS.length * size * size * 4 * (4 / 3);
    expect(memory(TEXTURE_SIZE.high)).toBeLessThanOrEqual(256 * 2 ** 20);
    expect(memory(TEXTURE_SIZE.medium)).toBeLessThanOrEqual(128 * 2 ** 20);
  });

  it('credit every photograph in the asset manifest, under an open licence, with its page at the library', () => {
    for (const id of TEXTURED)
      for (const map of MAPS)
        for (const size of SIZES) {
          const path = textureFile(id, map, size);
          const record = ASSETS.find((a) => a.files.test(path));
          expect(record, path).toBeDefined();
          expect(record?.licence, path).toBe(SURFACE_LICENCE);
          expect(record?.url, path).toBe(SURFACES[id].photo.page);
          expect(record?.source, path).toContain(SURFACES[id].photo.author);
        }
    expect(SURFACE_LICENCE).toMatch(/^CC0/);
  });

  it('pin each photograph by its checksum, at the library the credit names', () => {
    for (const id of TEXTURED)
      for (const map of MAPS) {
        const d = SURFACES[id].photo[map];
        expect(d.url, id).toMatch(/^https:\/\/dl\.polyhaven\.org\//);
        expect(d.md5, id).toMatch(/^[0-9a-f]{32}$/);
      }
  });

  it('say in both languages what each surface was, that its photograph is a stand-in, and cite sources that exist', () => {
    const known = new Set(SOURCES.map((s) => String(s.id)));
    for (const id of TEXTURED) {
      const p = SURFACES[id].provenance;
      // A photograph of a modern surface can never document an ancient one.
      expect(p.kind, id).not.toBe('documented');
      expect(basisOf(p, 'en'), id).toMatch(/photograph/);
      expect(basisOf(p, 'cy'), id).toMatch(/Ffotograff/);
      expect(p.sources.length, id).toBeGreaterThan(0);
      for (const s of p.sources) expect(known.has(String(s)), `${id} ${String(s)}`).toBe(true);
      expect(SURFACES[id].photo.metres, id).toBeGreaterThan(0);
    }
    // What roofed the forts and the settlement is not known.
    expect(SURFACES.shingle.provenance.kind).toBe('imagined');
    expect(SURFACES.thatch.provenance.kind).toBe('imagined');
  });

  it('cover every surface the forts’ models show with a texture, so no part of them is left flat', () => {
    const shown = new Set(
      MODELLED.flatMap(({ feature }) => {
        const f = W.features.find((x) => x.id === feature);
        return f?.kind.type === 'building' ? f.kind.plan.parts.flatMap((p) => [...partSurfaces(p)]) : [];
      }),
    );
    expect([...shown].filter((s) => !isTextured(s))).toEqual([]);
  });
});
