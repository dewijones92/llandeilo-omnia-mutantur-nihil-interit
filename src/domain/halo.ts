// How each kind of night light shows as a soft halo (ADR 0040). Rendering constants, not history:
// what is lit, how brightly and in what colour still comes from the dated lamp keys (ADR 0030).

export const HALO_KINDS = ['window', 'street', 'hearth'] as const;
export type HaloKind = (typeof HALO_KINDS)[number];

export interface HaloSpec {
  /** Diameter in world units (10m each) close up. */
  readonly worldSize: number;
  /** Diameter on screen however far away, so a lit town still reads from the overview. */
  readonly minPixels: number;
  /** Brightness at full level. Above 1 the glow's core saturates wider, so a halo a few pixels across still reads as a dot. */
  readonly strength: number;
}

// Tuned by eye at 1920x1080: a house's glow is about its own width, a lamp's a little wider than the
// street, a hearth's spills past the roundhouse wall.
export const HALOS: Readonly<Record<HaloKind, HaloSpec>> = {
  window: { worldSize: 3, minPixels: 4, strength: 2.2 },
  street: { worldSize: 3.5, minPixels: 7, strength: 3.5 },
  hearth: { worldSize: 5, minPixels: 8, strength: 3 },
};

/** World units covered by one screen pixel at `distance`, for a vertical field of view `fovY` (radians). */
export function unitsPerPixel(distance: number, fovY: number, screenHeight: number): number {
  return (2 * distance * Math.tan(fovY / 2)) / Math.max(1, screenHeight);
}

export function haloSize(spec: HaloSpec, distance: number, fovY: number, screenHeight: number): number {
  return Math.max(spec.worldSize, spec.minPixels * unitsPerPixel(distance, fovY, screenHeight));
}
