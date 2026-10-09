import { rng } from './noise.ts';
import type { Pt } from './plan.ts';

export const FORT_SIDES = ['ne', 'nw', 'sw', 'se'] as const;
export type FortSide = (typeof FORT_SIDES)[number];

/**
 * A fort's outline in its own plan: x along the long axis towards the front (north-east), y across it
 * towards the left (north-west). The corners are rounded, as a Roman fort's were.
 */
export interface FortShape {
  readonly halfLength: number;
  readonly halfWidth: number;
  readonly corner: number;
}

/** A break in a side's line (a gate's causeway), centred `u` along it: u is x on nw and se, y on ne and sw. */
export interface Gap {
  readonly side: FortSide;
  readonly u: number;
  readonly width: number;
}

export interface Run {
  readonly side: FortSide;
  readonly path: readonly Pt[];
}

export interface GateFrame {
  readonly at: Pt;
  /** The unit vector pointing out of the fort, in plan coordinates. */
  readonly out: Pt;
  /** The angle, in degrees, of a part laid across the passage (its length along the side). */
  readonly angle: number;
}

const ARC_STEPS = 6;

interface Corner {
  readonly centre: Pt;
  readonly from: number;
}

// Walked anticlockwise from the start of the north-east side; each side is followed by the corner after it.
function corners(shape: FortShape, offset: number): Readonly<Record<FortSide, Corner>> {
  const x = shape.halfLength + offset - (shape.corner + offset);
  const y = shape.halfWidth + offset - (shape.corner + offset);
  return {
    ne: { centre: [x, y], from: 0 },
    nw: { centre: [-x, y], from: 90 },
    sw: { centre: [-x, -y], from: 180 },
    se: { centre: [x, -y], from: 270 },
  };
}

function straight(shape: FortShape, side: FortSide, offset: number): readonly [Pt, Pt] {
  const a = shape.halfLength + offset;
  const b = shape.halfWidth + offset;
  const x = a - (shape.corner + offset);
  const y = b - (shape.corner + offset);
  switch (side) {
    case 'ne':
      return [
        [a, -y],
        [a, y],
      ];
    case 'nw':
      return [
        [x, b],
        [-x, b],
      ];
    case 'sw':
      return [
        [-a, y],
        [-a, -y],
      ];
    case 'se':
      return [
        [-x, -b],
        [x, -b],
      ];
  }
}

function along(side: FortSide, p: Pt): number {
  return side === 'ne' || side === 'sw' ? p[1] : p[0];
}

// The straight part of a side as points, cut at each gap: the points of a cut end sit exactly on the
// gap's edge, and nothing is left inside it.
function cut(side: FortSide, from: Pt, to: Pt, gaps: readonly Gap[]): Pt[][] {
  const vertical = side === 'ne' || side === 'sw';
  const a = along(side, from);
  const b = along(side, to);
  const sign = Math.sign(b - a);
  const at = (u: number): Pt => (vertical ? [from[0], u] : [u, from[1]]);
  const mine = gaps
    .filter((g) => g.side === side)
    .map((g) => [g.u - g.width / 2, g.u + g.width / 2] as const)
    .sort((p, q) => sign * (p[0] - q[0]));
  const runs: Pt[][] = [];
  let start = a;
  for (const [lo, hi] of mine) {
    const first = sign > 0 ? lo : hi;
    const second = sign > 0 ? hi : lo;
    if (sign * (first - start) > 0) runs.push([at(start), at(first)]);
    start = second;
  }
  if (sign * (b - start) > 0) runs.push([at(start), at(b)]);
  return runs;
}

function arc(c: Corner, radius: number): Pt[] {
  return Array.from({ length: ARC_STEPS + 1 }, (_, i): Pt => {
    const a = ((c.from + (90 * i) / ARC_STEPS) * Math.PI) / 180;
    return [c.centre[0] + Math.cos(a) * radius, c.centre[1] + Math.sin(a) * radius];
  });
}

/**
 * The ring that runs round a fort at `offset` metres outside its line (a rampart at 0, a ditch beyond
 * it), as one run of points per side and per gap-cut piece, with the corner after a side drawn as part
 * of it. A side with none at this offset (`present` false) hands its corners to its neighbour, so no
 * ring ends loose at a corner both sides share.
 */
export function ringRuns(
  shape: FortShape,
  offset: number,
  present: (side: FortSide) => boolean,
  gaps: readonly Gap[],
): Run[] {
  const turns = corners(shape, offset);
  const radius = shape.corner + offset;
  const owner = (side: FortSide): FortSide | undefined => {
    const i = FORT_SIDES.indexOf(side);
    const next = FORT_SIDES[(i + 1) % FORT_SIDES.length] ?? side;
    return present(side) ? side : present(next) ? next : undefined;
  };
  const pieces: { readonly side: FortSide; readonly owner: FortSide; readonly path: Pt[] }[] = [];
  for (const side of FORT_SIDES) {
    const [from, to] = straight(shape, side, offset);
    const o = owner(side);
    if (present(side)) for (const path of cut(side, from, to, gaps)) pieces.push({ side, owner: side, path });
    if (o) pieces.push({ side, owner: o, path: arc(turns[side], radius) });
  }
  const runs: Run[] = [];
  for (const piece of pieces) {
    const last = runs[runs.length - 1];
    const tail = last?.path[last.path.length - 1];
    const head = piece.path[0];
    if (last?.side === piece.owner && tail && head && Math.hypot(tail[0] - head[0], tail[1] - head[1]) < 1e-6)
      runs[runs.length - 1] = { side: last.side, path: [...last.path, ...piece.path.slice(1)] };
    else runs.push({ side: piece.owner, path: piece.path });
  }
  return runs;
}

export function gateFrame(shape: FortShape, side: FortSide, u: number): GateFrame {
  switch (side) {
    case 'ne':
      return { at: [shape.halfLength, u], out: [1, 0], angle: 90 };
    case 'sw':
      return { at: [-shape.halfLength, u], out: [-1, 0], angle: 90 };
    case 'nw':
      return { at: [u, shape.halfWidth], out: [0, 1], angle: 0 };
    case 'se':
      return { at: [u, -shape.halfWidth], out: [0, -1], angle: 0 };
  }
}

/** The middle of the rounded corner that follows `side` on the ring `offset` metres outside the fort's line. */
export function cornerAt(shape: FortShape, offset: number, side: FortSide): Pt {
  const c = corners(shape, offset)[side];
  const a = ((c.from + 45) * Math.PI) / 180;
  const r = shape.corner + offset;
  return [c.centre[0] + Math.cos(a) * r, c.centre[1] + Math.sin(a) * r];
}

function toSegment(p: Pt, a: Pt, b: Pt): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

export function distanceToPath(p: Pt, path: readonly Pt[]): number {
  let best = Infinity;
  for (let i = 0; i + 1 < path.length; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (a && b) best = Math.min(best, toSegment(p, a, b));
  }
  return best;
}

export interface Site {
  readonly at: Pt;
  /** Degrees, of the long axis from the plan's x axis. */
  readonly angle: number;
  readonly length: number;
  readonly width: number;
}

function walk(path: readonly Pt[], distance: number): { readonly at: Pt; readonly heading: number } {
  let left = distance;
  for (let i = 0; i + 1 < path.length; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (!a || !b) continue;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (left <= len || i + 2 === path.length) {
      const t = len === 0 ? 0 : Math.min(1, left / len);
      return {
        at: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t],
        heading: Math.atan2(b[1] - a[1], b[0] - a[0]),
      };
    }
    left -= len;
  }
  return { at: path[0] ?? [0, 0], heading: 0 };
}

function pathLength(path: readonly Pt[]): number {
  return path.reduce((sum, p, i) => {
    const q = path[i + 1];
    return q ? sum + Math.hypot(q[0] - p[0], q[1] - p[1]) : sum;
  }, 0);
}

const TURN = 40;

/**
 * Small houses strewn along roads: each between `nearest` and `farthest` metres from a road, its long
 * axis running away from the road but turned by up to 40° either way, never closer to another than
 * their lengths allow. The same seed gives the same houses, so a plan built from it is data.
 */
export function roadside(spec: {
  readonly roads: readonly (readonly Pt[])[];
  readonly count: number;
  readonly seed: number;
  readonly nearest: number;
  readonly farthest: number;
}): Site[] {
  const random = rng(spec.seed);
  const lengths = spec.roads.map(pathLength);
  const total = lengths.reduce((a, b) => a + b, 0);
  const sites: Site[] = [];
  for (let tries = 0; tries < 4000 && sites.length < spec.count; tries++) {
    let pick = random() * total;
    const index = lengths.findIndex((len) => (pick -= len) <= 0);
    const road = spec.roads[Math.max(0, index)];
    if (!road) break;
    const { at, heading } = walk(road, random() * pathLength(road));
    const side = random() < 0.5 ? -1 : 1;
    const d = spec.nearest + random() * (spec.farthest - spec.nearest);
    const centre: Pt = [at[0] - Math.sin(heading) * d * side, at[1] + Math.cos(heading) * d * side];
    const length = 6 + random() * 5;
    const width = 4 + random() * 2;
    const angle = (heading * 180) / Math.PI + 90 + (random() * 2 - 1) * TURN;
    const clear = spec.roads.every((r) => distanceToPath(centre, r) >= spec.nearest - 1e-9);
    const free = sites.every(
      (s) => Math.hypot(s.at[0] - centre[0], s.at[1] - centre[1]) > (s.length + length) / 2,
    );
    if (clear && free) sites.push({ at: centre, angle, length, width });
  }
  return sites;
}
