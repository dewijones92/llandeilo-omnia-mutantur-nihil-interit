export type Material =
  | 'rubble'
  | 'limestone'
  | 'sandstone'
  | 'freestone'
  | 'shale'
  | 'black-limestone'
  | 'render'
  | 'timber'
  | 'daub'
  | 'thatch'
  | 'slate'
  | 'rock'
  | 'turf';

export type Pt = readonly [number, number];

export type Side = 'n' | 'e' | 's' | 'w';

export type Ruin = 'gone' | { readonly stands: number; readonly sides?: readonly Side[] };

export type TowerTop = 'plain' | 'battlements' | 'machicolated' | 'cone' | 'pyramid';

export type Roof = 'none' | 'gable' | 'hip' | 'parapet' | 'battlements';

export interface Opening {
  readonly side: Side;
  readonly count: number;
  readonly rows?: number;
  readonly tall?: boolean;
}

export interface Arch {
  readonly at: number;
  readonly span: number;
  readonly rise: number;
}

export interface Built {
  readonly material: Material;
  readonly base?: number;
  readonly ruin?: Ruin;
}

export type Part =
  | (Built & {
      readonly type: 'wall';
      readonly path: readonly Pt[];
      readonly closed?: boolean;
      readonly height: number;
      readonly thickness: number;
      readonly top: 'plain' | 'battlements';
    })
  | (Built & {
      readonly type: 'tower';
      readonly at: Pt;
      readonly shape: 'round' | 'square' | 'hexagonal' | 'octagonal';
      readonly size: number;
      readonly height: number;
      readonly top: TowerTop;
      readonly angle?: number;
      readonly batter?: boolean;
    })
  | (Built & {
      readonly type: 'hall';
      readonly at: Pt;
      readonly length: number;
      readonly width: number;
      readonly angle: number;
      readonly height: number;
      readonly roof: Roof;
      readonly pitch?: number;
      readonly roofMaterial?: Material;
      readonly openings?: readonly Opening[];
    })
  | (Built & {
      readonly type: 'prism';
      readonly outline: readonly Pt[];
      readonly height: number;
      readonly top: 'plain' | 'battlements';
    })
  | { readonly type: 'ditch'; readonly path: readonly Pt[]; readonly width: number }
  | { readonly type: 'platform'; readonly outline: readonly Pt[]; readonly face: 'rock' | 'turf' }
  | (Built & {
      readonly type: 'bridge';
      readonly from: Pt;
      readonly to: Pt;
      readonly width: number;
      readonly height: number;
      readonly arches: readonly Arch[];
    });

export type Setting = 'landscape' | 'map';

export interface Plan {
  readonly setting: Setting;
  readonly angle?: number;
  readonly parts: readonly Part[];
  readonly hearth?: Pt;
}

export type Condition = 'standing' | 'ruin';

const DEG = Math.PI / 180;

export function rotate(p: Pt, degrees: number): Pt {
  const c = Math.cos(degrees * DEG);
  const s = Math.sin(degrees * DEG);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c];
}

export function partPoints(part: Part): readonly Pt[] {
  switch (part.type) {
    case 'wall':
    case 'ditch':
      return part.path;
    case 'prism':
    case 'platform':
      return part.outline;
    case 'bridge':
      return [part.from, part.to];
    case 'tower': {
      const r = part.size / 2;
      return [
        [part.at[0] - r, part.at[1] - r],
        [part.at[0] + r, part.at[1] + r],
      ];
    }
    case 'hall':
      return hallCorners(part);
  }
}

export function hallCorners(h: Extract<Part, { type: 'hall' }>): readonly Pt[] {
  const l = h.length / 2;
  const w = h.width / 2;
  return (
    [
      [-l, -w],
      [l, -w],
      [l, w],
      [-l, w],
    ] as const
  ).map((p): Pt => {
    const [x, y] = rotate(p, h.angle);
    return [x + h.at[0], y + h.at[1]];
  });
}

export function planExtent(plan: Plan): number {
  let r = 0;
  for (const part of plan.parts) for (const [x, y] of partPoints(part)) r = Math.max(r, Math.hypot(x, y));
  return r;
}

export function toPlanLocal(plan: Plan, east: number, north: number): Pt {
  return rotate([east, north], -(plan.angle ?? 0));
}

export function insideConvex(p: Pt, poly: readonly Pt[]): boolean {
  let sign = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    if (!a || !b) return false;
    const cross = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
    if (cross !== 0) {
      const s = Math.sign(cross);
      if (sign !== 0 && s !== sign) return false;
      sign = s;
    }
  }
  return true;
}

export function covers(plan: Plan, local: Pt): boolean {
  return plan.parts.some((part) => {
    switch (part.type) {
      case 'hall':
        return insideConvex(local, hallCorners(part));
      case 'prism':
        return insideConvex(local, part.outline);
      case 'tower':
        return Math.hypot(local[0] - part.at[0], local[1] - part.at[1]) <= part.size / 2;
      case 'wall':
      case 'ditch':
      case 'platform':
      case 'bridge':
        return false;
    }
  });
}

export function archSoffit(arch: Arch, s: number): number | undefined {
  const u = (s - arch.at) / (arch.span / 2);
  if (Math.abs(u) >= 1) return undefined;
  return arch.rise * Math.sqrt(1 - u * u);
}

export function divide(length: number, maxPiece: number): number {
  return Math.max(1, Math.ceil(length / maxPiece));
}

const PERISHABLE: readonly Material[] = ['timber', 'daub', 'thatch'];

export const FOOTING = 0.06;

export function remains(part: Built, condition: Condition): number | undefined {
  if (condition === 'standing') return 1;
  const r = part.ruin;
  if (r === 'gone') return undefined;
  if (r) return r.stands;
  return PERISHABLE.includes(part.material) ? undefined : 0.45;
}

export function sideRemains(part: Built, side: Side, condition: Condition): number | undefined {
  const left = remains(part, condition);
  if (left === undefined || condition === 'standing' || part.ruin === undefined || part.ruin === 'gone')
    return left;
  const only = part.ruin.sides;
  return !only || only.includes(side) ? left : FOOTING;
}

export function ruinHeights(random: () => number, stands: number, count: number): number[] {
  const out: number[] = [];
  let walk = 0;
  for (let i = 0; i < count; i++) {
    walk = walk * 0.6 + (random() - 0.5) * 0.5;
    const gap = stands < 0.95 && random() < 0.2 * (1 - stands);
    const h = gap ? FOOTING : stands * (0.72 + 0.28 * random() + walk);
    out.push(Math.min(stands, Math.max(Math.min(FOOTING, stands), h)));
  }
  return out;
}

export interface Footprint {
  readonly e: number;
  readonly n: number;
  readonly width: number;
  readonly depth: number;
  readonly angle: number;
}

export function footprintContains(box: Footprint, at: { readonly e: number; readonly n: number }): boolean {
  const dx = at.e - box.e;
  const dy = at.n - box.n;
  const c = Math.cos(box.angle);
  const s = Math.sin(box.angle);
  return Math.abs(dx * c + dy * s) <= box.width / 2 && Math.abs(-dx * s + dy * c) <= box.depth / 2;
}

export function hidesFootprint(
  plan: Plan,
  at: { readonly e: number; readonly n: number },
  box: Footprint,
): boolean {
  if (footprintContains(box, at)) return true;
  return plan.setting === 'map' && covers(plan, toPlanLocal(plan, box.e - at.e, box.n - at.n));
}
