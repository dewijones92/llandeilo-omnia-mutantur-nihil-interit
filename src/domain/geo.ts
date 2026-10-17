import type { GridRef } from './model.ts';

export const WORLD = {
  centre: { e: 262900, n: 222500 },
  radiusMetres: 16093,
  metresPerUnit: 10,
  verticalExaggeration: 2.4,
  // Landscape plans (castles, the abbey, country houses, follies), roundhouses and longhouses are
  // drawn this much larger than life so they read. Hillforts, the Roman forts and the town are true size.
  landmarkScale: 2.6,
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

export interface WorldBox {
  readonly xMin: number;
  readonly xMax: number;
  readonly zMin: number;
  readonly zMax: number;
}

export function inWorldBox(box: WorldBox, x: number, z: number): boolean {
  return x >= box.xMin && x <= box.xMax && z >= box.zMin && z <= box.zMax;
}

// A grid reference in the 100km square SN (eastings and northings 200 to 299km), which holds every tile this app has.
export function snGridRef(g: GridRef): string {
  if (g.e < 200000 || g.e >= 300000 || g.n < 200000 || g.n >= 300000)
    throw new Error(`${String(g.e)},${String(g.n)} is not in the grid square SN`);
  const digits = (v: number): string => String(Math.floor(v % 100000)).padStart(5, '0');
  return `SN ${digits(g.e)} ${digits(g.n)}`;
}
