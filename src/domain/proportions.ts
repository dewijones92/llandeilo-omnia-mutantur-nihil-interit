import type { Material, Part } from './plan.ts';

/**
 * The proportions the procedural builder (world/buildings.ts) and the Blender build sheet share, so a model
 * and its fallback cannot drift apart (ADR 0053). Metres, in the plan's own scale before a setting scales it.
 */

/** Metres a part raised off the ground (a walkway, a granary) reaches below its floor. */
export const RAISED_DROP = 0.4;

/** A roof's footprint and rise, metres, along and across the part it covers. */
export interface RoofSpec {
  readonly kind: 'gable' | 'hip' | 'pyramid' | 'cone';
  readonly material: Material;
  readonly length: number;
  readonly width: number;
  readonly rise: number;
}

/** A tower's roof overhangs its outline by this share of its size, and rises by this share of it. */
export const TOWER_ROOF = {
  pyramid: { overhang: 1.05, rise: 0.35 },
  cone: { overhang: 1.08, rise: 0.95 },
} as const;

/** A hall's roof overhangs its walls by this much along and across, and rises by `pitch` of its width unless the plan says. */
export const HALL_ROOF = { alongOver: 0.4, acrossOver: 0.5, pitch: 0.45 } as const;

export function towerRoofSpec(t: Extract<Part, { type: 'tower' }>): RoofSpec | null {
  const material = t.roofMaterial ?? 'slate';
  switch (t.top) {
    case 'pyramid':
    case 'cone': {
      const r = TOWER_ROOF[t.top];
      return {
        kind: t.top,
        material,
        length: t.size * r.overhang,
        width: t.size * r.overhang,
        rise: t.size * r.rise,
      };
    }
    case 'plain':
    case 'battlements':
    case 'machicolated':
      return null;
  }
}

export function hallRoofRise(width: number, pitch: number | undefined): number {
  return width * (pitch ?? HALL_ROOF.pitch);
}

export function hallRoofSpec(h: Extract<Part, { type: 'hall' }>): RoofSpec | null {
  const material = h.roofMaterial ?? 'slate';
  switch (h.roof) {
    case 'gable':
    case 'hip':
      return {
        kind: h.roof,
        material,
        length: h.length + HALL_ROOF.alongOver,
        width: h.width + HALL_ROOF.acrossOver,
        rise: hallRoofRise(h.width, h.pitch),
      };
    case 'none':
    case 'parapet':
    case 'battlements':
      return null;
  }
}
