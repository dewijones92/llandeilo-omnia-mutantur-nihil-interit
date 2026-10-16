import type { KitId, Material, Part } from './plan.ts';
import { hallRoofSpec, towerRoofSpec } from './proportions.ts';

/**
 * What a face of a Blender model shows (ADR 0055): a plan material, or one of the two surfaces a kit adds,
 * the cut edges of a turf bank's courses and the shingles of a roof. A textured surface's look is a claim, so
 * each has an entry, with its provenance, in the surface catalogue (src/content/surfaces.ts).
 */
export type SurfaceId = Material | 'turf-face' | 'shingle';

/** The few facts about a part's shape that decide which surfaces its model shows. */
export interface SurfaceShape {
  readonly type: 'wall' | 'tower' | 'hall';
  readonly material: Material;
  readonly kits: readonly KitId[];
  readonly roof: { readonly kind: 'gable' | 'hip' | 'pyramid' | 'cone'; readonly material: Material } | null;
  readonly hinged: boolean;
}

const has = (s: SurfaceShape, k: KitId): boolean => s.kits.includes(k);

/** The surfaces a part's near model shows, sorted: the Blender script draws exactly these, and the tests hold it to them. */
export function surfacesOf(s: SurfaceShape): readonly SurfaceId[] {
  const out = new Set<SurfaceId>();
  switch (s.type) {
    case 'wall':
      if (has(s, 'turf-courses')) {
        out.add('turf');
        out.add('turf-face');
      } else out.add(s.material);
      break;
    case 'tower':
      out.add(s.material);
      if (s.roof) out.add(s.roof.kind !== 'cone' && has(s, 'shingle-roof') ? 'shingle' : s.roof.material);
      break;
    case 'hall': {
      out.add(s.material);
      if (s.hinged && has(s, 'ledged-leaf')) break;
      if (has(s, 'plank-deck')) break;
      if (has(s, 'timber-frame')) out.add('timber');
      if (s.roof) {
        if (has(s, 'thatch-roof')) out.add('thatch');
        else if (has(s, 'shingle-roof')) {
          out.add('shingle');
          // The ridge beam the shingle kit draws along the top.
          out.add('timber');
        } else out.add(s.roof.material);
      }
      break;
    }
  }
  return [...out].sort();
}

/** The surfaces a plan part's near model shows; none for a part the app draws on the ground itself. */
export function partSurfaces(p: Part): readonly SurfaceId[] {
  const kits = p.kits ?? [];
  const hinged = p.hinge !== undefined;
  switch (p.type) {
    case 'wall':
      return surfacesOf({ type: 'wall', material: p.material, kits, roof: null, hinged });
    case 'tower':
      return surfacesOf({ type: 'tower', material: p.material, kits, roof: towerRoofSpec(p), hinged });
    case 'hall':
      return surfacesOf({ type: 'hall', material: p.material, kits, roof: hallRoofSpec(p), hinged });
    case 'prism':
    case 'bridge':
    case 'ditch':
    case 'road':
    case 'platform':
    case 'terrace':
      return [];
  }
}

/** The surfaces that carry a photographic texture on a near model; any other surface keeps the flat palette. */
export const TEXTURED = ['turf', 'turf-face', 'timber', 'shingle', 'daub', 'thatch'] as const;
export type TexturedSurface = (typeof TEXTURED)[number];

export function isTextured(s: string): s is TexturedSurface {
  return TEXTURED.some((t) => t === s);
}

export type TextureMap = 'color' | 'normal';

/** Texture edge in pixels per graphics level that draws models: Medium takes half (ADR 0055); Low draws no model. */
export const TEXTURE_SIZE = { high: 1024, medium: 512 } as const;
export type TextureSize = (typeof TEXTURE_SIZE)[keyof typeof TEXTURE_SIZE];

/** Where a surface's texture is published, relative to the site's base. */
export function textureFile(surface: TexturedSurface, map: TextureMap, size: TextureSize): string {
  return `textures/landmarks/${surface}-${map}-${String(size)}.webp`;
}
