import { lerp, smoothstep } from './assert.ts';
import type { GridRef } from './model.ts';

const CELL_M = 200;
export const BANK_M = 20;

export interface RiverLike {
  readonly width: number;
  readonly points: readonly GridRef[];
  readonly levels: readonly number[];
}

export interface Channel {
  readonly distance: number;
  readonly halfWidth: number;
  readonly level: number;
}

interface Segment {
  readonly a: GridRef;
  readonly b: GridRef;
  readonly levelA: number;
  readonly levelB: number;
  readonly half: number;
}

const cellKey = (ce: number, cn: number): string => `${String(ce)},${String(cn)}`;

// Where the rivers are, for asking "is a river near here, how far, and how low does its water lie".
export class RiverIndex {
  private readonly all = new Set<string>();
  private readonly sampled = new Map<string, { e: number; n: number; half: number }[]>();
  private readonly segments = new Map<string, Segment[]>();

  constructor(rivers: readonly RiverLike[]) {
    const cell = (v: number): number => Math.floor(v / CELL_M);
    const push = <T>(map: Map<string, T[]>, key: string, value: T): void => {
      const list = map.get(key);
      if (list) list.push(value);
      else map.set(key, [value]);
    };
    for (const river of rivers) {
      river.points.forEach((p, i) => {
        const key = cellKey(cell(p.e), cell(p.n));
        this.all.add(key);
        if (i % 2 === 0) push(this.sampled, key, { e: p.e, n: p.n, half: river.width / 2 });
        const next = river.points[i + 1];
        if (!next) return;
        const segment: Segment = {
          a: p,
          b: next,
          levelA: river.levels[i] ?? 0,
          levelB: river.levels[i + 1] ?? 0,
          half: river.width / 2,
        };
        push(this.segments, key, segment);
        const far = cellKey(cell(next.e), cell(next.n));
        if (far !== key) push(this.segments, far, segment);
      });
    }
  }

  near(e: number, n: number): boolean {
    const ce = Math.floor(e / CELL_M);
    const cn = Math.floor(n / CELL_M);
    for (let dx = -1; dx <= 1; dx++)
      for (let dz = -1; dz <= 1; dz++) if (this.all.has(cellKey(ce + dx, cn + dz))) return true;
    return false;
  }

  // Distance from (e, n) to the edge of the water, from every second sampled river point. Reliable
  // only below `limit`; beyond it the answer may be Infinity.
  distance(e: number, n: number, limit: number): number {
    const reach = Math.ceil((limit + 25) / CELL_M);
    const ce = Math.floor(e / CELL_M);
    const cn = Math.floor(n / CELL_M);
    let best = Infinity;
    for (let dx = -reach; dx <= reach; dx++) {
      for (let dz = -reach; dz <= reach; dz++) {
        for (const p of this.sampled.get(cellKey(ce + dx, cn + dz)) ?? []) {
          best = Math.min(best, Math.hypot(p.e - e, p.n - n) - p.half);
        }
      }
    }
    return best;
  }

  // The river whose water is nearest (e, n), if it is within its banks: how far the point is from the
  // river's line, the half-width of the water, and the water's level beside the point.
  channelAt(e: number, n: number): Channel | undefined {
    const ce = Math.floor(e / CELL_M);
    const cn = Math.floor(n / CELL_M);
    let best: Channel | undefined;
    let bestEdge = Infinity;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (const s of this.segments.get(cellKey(ce + dx, cn + dz)) ?? []) {
          const sx = s.b.e - s.a.e;
          const sn = s.b.n - s.a.n;
          const length2 = sx * sx + sn * sn;
          const t =
            length2 === 0 ? 0 : Math.min(1, Math.max(0, ((e - s.a.e) * sx + (n - s.a.n) * sn) / length2));
          const distance = Math.hypot(e - (s.a.e + sx * t), n - (s.a.n + sn * t));
          const edge = distance - s.half;
          if (edge < bestEdge) {
            bestEdge = edge;
            best = { distance, halfWidth: s.half, level: lerp(s.levelA, s.levelB, t) };
          }
        }
      }
    }
    return best && best.distance <= best.halfWidth + BANK_M ? best : undefined;
  }
}

// Eases the ground down to the river's level across the channel, and back up over the banks. The
// weight (0 to 1) lessens the cut, for ground near the edge of the detail region.
export function carveChannel(metres: number, channel: Channel, weight = 1): number {
  const t = (1 - smoothstep(channel.halfWidth, channel.halfWidth + BANK_M, channel.distance)) * weight;
  return t <= 0 ? metres : Math.min(metres, lerp(metres, channel.level, t));
}
