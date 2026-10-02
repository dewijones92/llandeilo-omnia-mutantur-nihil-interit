import type { GridRef } from './model.ts';

export const WORLD = {
  centre: { e: 262900, n: 222500 },
  radiusMetres: 16093,
  metresPerUnit: 10,
  verticalExaggeration: 2.4,
  // Landscape plans (castles, the abbey, country houses, follies), Roman forts, roundhouses and
  // longhouses are drawn this much larger than life so they read. Hillforts and the town are true size.
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
