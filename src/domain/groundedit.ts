import { smoothstep } from './assert.ts';
import type { Brand } from './brand.ts';
import { insideBounds, rimDistance, type Bounds } from './lidar.ts';
import type { GridRef } from './model.ts';
import type { Provenance } from './provenance.ts';
import { contains, type TimeRange, type Year } from './time.ts';

export type GroundEditId = Brand<string, 'GroundEditId'>;

// A bank (positive) or ditch (negative) along a line: a rampart, a lost road's cutting, an old
// river course.
export interface RidgeShape {
  readonly kind: 'ridge';
  readonly line: readonly GridRef[];
  readonly halfWidth: number;
  readonly metres: number;
  readonly slope: number;
}

// A level platform at a height above sea level, eased into the ground round it: a fort's interior.
export interface LevelShape {
  readonly kind: 'level';
  readonly centre: GridRef;
  readonly radius: number;
  readonly metres: number;
  readonly slope: number;
}

// More kinds join this union; each is laid over the ground by the one function below, so the
// renderer never learns about them.
export type EditShape = RidgeShape | LevelShape;

// A change to the ground that holds for some years: a rampart, a ditch, a lost road, an old river
// course. The base ground (OS Terrain 50 with the LiDAR) is never altered; the edits are laid over
// it for the years they name, and each says where it comes from like any other content.
export interface GroundEdit {
  readonly id: GroundEditId;
  readonly when: TimeRange;
  readonly area: Bounds;
  readonly shape: EditShape;
  readonly provenance: Provenance;
}

export function activeEdits(edits: readonly GroundEdit[], year: Year): GroundEdit[] {
  return edits.filter((e) => contains(e.when, year));
}

function distanceToLine(line: readonly GridRef[], g: GridRef): number {
  let best = Infinity;
  for (let i = 0; i < line.length; i++) {
    const a = line[i];
    const b = line[i + 1] ?? a;
    if (!a || !b) continue;
    const sx = b.e - a.e;
    const sn = b.n - a.n;
    const length2 = sx * sx + sn * sn;
    const t = length2 === 0 ? 0 : Math.min(1, Math.max(0, ((g.e - a.e) * sx + (g.n - a.n) * sn) / length2));
    best = Math.min(best, Math.hypot(g.e - (a.e + sx * t), g.n - (a.n + sn * t)));
  }
  return best;
}

// How much the edit raises (or lowers) the ground at `g`, where the ground already stands `metres` high.
export function editDelta(edit: GroundEdit, g: GridRef, metres: number): number {
  const s = edit.shape;
  switch (s.kind) {
    case 'ridge':
      return s.metres * (1 - smoothstep(s.halfWidth, s.halfWidth + s.slope, distanceToLine(s.line, g)));
    case 'level':
      return (
        (s.metres - metres) *
        (1 - smoothstep(s.radius, s.radius + s.slope, Math.hypot(g.e - s.centre.e, g.n - s.centre.n)))
      );
  }
}

export function applyEdits(metres: number, g: GridRef, edits: readonly GroundEdit[]): number {
  let out = metres;
  for (const e of edits) if (insideBounds(e.area, g)) out += editDelta(e, g, out);
  return out;
}

export function editsKey(edits: readonly GroundEdit[]): string {
  return edits
    .map((e) => e.id)
    .sort()
    .join(',');
}

// An edit must sit inside the detail region and clear of its blended rim, where the base ground is
// not the LiDAR; and its area must hold the whole of its shape.
export function checkEdit(edit: GroundEdit, region: Bounds, margin: number): void {
  const a = edit.area;
  const corners: GridRef[] = [
    { e: a.eMin, n: a.nMin },
    { e: a.eMin, n: a.nMax },
    { e: a.eMax, n: a.nMin },
    { e: a.eMax, n: a.nMax },
  ];
  if (corners.some((c) => rimDistance(region, c) < margin || !insideBounds(region, c)))
    throw new Error(`ground edit ${edit.id}: its area is within ${String(margin)}m of the region's rim`);
  const s = edit.shape;
  const [points, reach] =
    s.kind === 'ridge' ? [s.line, s.halfWidth + s.slope] : [[s.centre], s.radius + s.slope];
  for (const p of points) {
    if (p.e - reach < a.eMin || p.e + reach > a.eMax || p.n - reach < a.nMin || p.n + reach > a.nMax)
      throw new Error(`ground edit ${edit.id}: its shape reaches outside its area`);
  }
}
