import { hex, type Rgb } from './colour.ts';
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

/** How much larger than life each setting draws a plan, across and up (ADR 0046). */
export const SETTING_SCALE: Readonly<Record<Setting, { readonly across: number; readonly up: number }>> = {
  landscape: { across: WORLD.landmarkScale, up: WORLD.landmarkScale },
  map: { across: 1, up: WORLD.verticalExaggeration },
  true: { across: 1, up: 1 },
};
