import { hex, mix, type Rgb } from './colour.ts';
import { WORLD } from './geo.ts';
import type { Material, Setting } from './plan.ts';

/** The one palette for a plan's materials: the procedural builder and every Blender model read it (ADR 0053). */
export const MATERIAL_COLOUR: Readonly<Record<Material, Rgb>> = {
  rubble: hex('#b3ac9e'),
  limestone: hex('#c9c4b6'),
  sandstone: hex('#b09080'),
  freestone: hex('#dcd3c0'),
  shale: hex('#8d8e8a'),
  'black-limestone': hex('#626466'),
  render: hex('#ebe4d4'),
  timber: hex('#7a5a3c'),
  daub: hex('#d4c29a'),
  thatch: hex('#d2b172'),
  slate: hex('#5f6670'),
  rock: hex('#a19f92'),
  turf: hex('#80925f'),
};

/** Cut earth: a ditch's floor and sides as the procedural builder draws them. */
export const CUT_EARTH = { floor: hex('#4b4d39'), side: mix(hex('#4b4d39'), hex('#8a8c6a'), 0.55) } as const;

/**
 * The soil of a turf bank's course faces on a model (ADR 0055): brown and light, so the bank reads as earth beside
 * the grass of its walk. The ditch's olive cut earth, under the soil photograph's detail, read as a dark hedge.
 */
export const TURF_FACE = hex('#947c5c');

/** How much larger than life each setting draws a plan, across and up (ADR 0046). */
export const SETTING_SCALE: Readonly<Record<Setting, { readonly across: number; readonly up: number }>> = {
  landscape: { across: WORLD.landmarkScale, up: WORLD.landmarkScale },
  map: { across: 1, up: WORLD.verticalExaggeration },
  true: { across: 1, up: 1 },
};
