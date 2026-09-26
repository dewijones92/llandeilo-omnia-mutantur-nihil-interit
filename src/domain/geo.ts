import type { GridRef } from './model.ts';

/** The diorama: a disc of 10 miles radius centred on Llandeilo. */
export const WORLD = {
  centre: { e: 262900, n: 222500 },
  radiusMetres: 16093,
  metresPerUnit: 10,
  /** Hills are exaggerated so the valley reads at diorama scale (stated in the About panel). */
  verticalExaggeration: 2.4,
} as const;

export interface WorldXZ {
  readonly x: number;
  readonly z: number;
}

export function toWorld(g: GridRef): WorldXZ {
  return {
    x: (g.e - WORLD.centre.e) / WORLD.metresPerUnit,
    z: (g.n - WORLD.centre.n) / WORLD.metresPerUnit,
  };
}

export function toGrid(p: WorldXZ): GridRef {
  return { e: p.x * WORLD.metresPerUnit + WORLD.centre.e, n: p.z * WORLD.metresPerUnit + WORLD.centre.n };
}

export function heightToWorld(metres: number): number {
  return (metres * WORLD.verticalExaggeration) / WORLD.metresPerUnit;
}

export function distanceMetres(a: GridRef, b: GridRef): number {
  return Math.hypot(a.e - b.e, a.n - b.n);
}

export function insideDisc(g: GridRef): boolean {
  return distanceMetres(g, WORLD.centre) <= WORLD.radiusMetres;
}
