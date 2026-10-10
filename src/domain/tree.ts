import { hash2 } from './noise.ts';
import { MAX_TREE_DENSITY } from './quality.ts';

const GRID_PER_UNIT = 64;

// A tree's identity comes from where its triangle is, never from the triangle's number: the coarse
// mesh is renumbered whenever points are added or removed anywhere (the LiDAR rim did), and a number
// would reshuffle every tree on the map with it. World units.
export function treeSeed(cx: number, cz: number): number {
  let h =
    Math.imul(Math.round(cx * GRID_PER_UNIT), 0x9e3779b1) ^
    Math.imul(Math.round(cz * GRID_PER_UNIT) + 0x7f4a7c15, 0x85ebca6b);
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return h & 0x7fffffff;
}

export interface TreeTraits {
  /** Uniform in [0, 1): the tree is drawn when this is below the quality's tree density. */
  readonly rank: number;
  readonly scale: number;
  readonly tallness: number;
  readonly spin: number;
  readonly jitterX: number;
  readonly jitterZ: number;
  readonly shade: number;
  readonly coniferRoll: number;
}

export function treeTraits(seed: number): TreeTraits {
  return {
    rank: hash2(seed, 91, 5),
    scale: 1.5 + hash2(seed, 17, 2) * 0.9,
    tallness: 0.9 + hash2(seed, 8, 3) * 0.35,
    spin: hash2(seed, 3, 9) * Math.PI * 2,
    jitterX: (hash2(seed, 5, 1) - 0.5) * 3,
    jitterZ: (hash2(seed, 6, 1) - 0.5) * 3,
    shade: 0.75 + hash2(seed, 12, 4) * 0.35,
    coniferRoll: hash2(seed, 44, 8),
  };
}

export interface LeafRolls {
  readonly season: number;
  readonly autumn: number;
  readonly blossom: number;
  readonly blossomPick: number;
}

export function leafRolls(seed: number): LeafRolls {
  return {
    season: hash2(seed, 71, 3),
    autumn: hash2(seed, 72, 5),
    blossom: hash2(seed, 73, 7),
    blossomPick: hash2(seed, 74, 2),
  };
}

export interface TreeCentres {
  readonly count: number;
  readonly cx: ArrayLike<number>;
  readonly cz: ArrayLike<number>;
  readonly heightM: ArrayLike<number>;
}

export interface TreeSite {
  readonly tri: number;
  readonly seed: number;
  readonly traits: TreeTraits;
  readonly x: number;
  readonly z: number;
  readonly heightM: number;
  readonly conifer: boolean;
}

export function treeSites(centres: TreeCentres): TreeSite[] {
  const sites: TreeSite[] = [];
  for (let i = 0; i < centres.count; i++) {
    const cx = centres.cx[i] ?? 0;
    const cz = centres.cz[i] ?? 0;
    const seed = treeSeed(cx, cz);
    const traits = treeTraits(seed);
    if (traits.rank >= MAX_TREE_DENSITY) continue;
    const heightM = centres.heightM[i] ?? 0;
    sites.push({
      tri: i,
      seed,
      traits,
      x: cx + traits.jitterX,
      z: cz + traits.jitterZ,
      heightM,
      conifer: heightM > 330 || traits.coniferRoll > 0.9,
    });
  }
  return sites;
}
