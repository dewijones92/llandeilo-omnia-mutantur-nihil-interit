import { Vector3, type Mesh, type Scene } from './babylon.ts';
import { hex, mix, type Rgb } from '../domain/colour.ts';
import { WORLD } from '../domain/geo.ts';
import { rng } from '../domain/noise.ts';
import {
  archSoffit,
  divide,
  FOOTING,
  hallCorners,
  insideConvex,
  planExtent,
  remains,
  rotate,
  ruinHeights,
  sideRemains,
  type Condition,
  type Material,
  type Part,
  type Plan,
  type Pt,
  type Setting,
  type Side,
} from '../domain/plan.ts';
import { rect, ring, Sculpt, type V2, type V3 } from './sculpt.ts';

export const MONUMENT_SCALE = 2.6;

export type Ground = (x: number, z: number) => number;

const SCALE: Readonly<Record<Setting, { readonly across: number; readonly up: number }>> = {
  landscape: { across: MONUMENT_SCALE, up: MONUMENT_SCALE },
  map: { across: 1, up: WORLD.verticalExaggeration },
};

const MATERIAL: Readonly<Record<Material, Rgb>> = {
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

const WEATHER = hex('#8a9a6c');
const OPENING = hex('#3a3631');
const DITCH = hex('#4b4d39');
const FOUNDATION = 0.5;
const MERLON_SPACING = 2.4;
const PARAPET_INSET = 0.8;

interface Frame {
  readonly sculpt: Sculpt;
  readonly condition: Condition;
  readonly random: () => number;
  readonly across: number;
  readonly up: number;
  readonly angle: number;
  readonly ground: (x: number, z: number) => number;
  readonly terrain: (x: number, z: number) => number;
}

export function planWorldScale(plan: Plan): { readonly across: number; readonly up: number } {
  const s = SCALE[plan.setting];
  return { across: s.across / WORLD.metresPerUnit, up: s.up / WORLD.metresPerUnit };
}

export function planClearing(plan: Plan): number {
  const standing = { ...plan, parts: plan.parts.filter((p) => p.type !== 'bridge') };
  if (standing.parts.length === 0) return 0;
  const extent = planExtent(standing) * planWorldScale(plan).across;
  return extent + (plan.setting === 'map' ? 6 : 30);
}

export function buildPlan(
  scene: Scene,
  plan: Plan,
  condition: Condition,
  seed: number,
  ground: Ground,
  ox: number,
  oz: number,
): Mesh {
  const baseY = ground(ox, oz);
  const scale = planWorldScale(plan);
  const terrain = (x: number, z: number): number => ground(ox + x, oz + z) - baseY;
  const angle = plan.angle ?? 0;
  const platforms = plan.parts.flatMap((p) =>
    p.type === 'platform'
      ? [{ face: p.face, outline: p.outline.map((q): V2 => placeAt(q, angle, scale.across)) }]
      : [],
  );
  const f: Frame = {
    sculpt: new Sculpt(),
    condition,
    random: rng(seed),
    across: scale.across,
    up: scale.up,
    angle,
    ground: (x, z) =>
      platforms.some((p) => insideConvex([x, z], p.outline)) ? Math.max(0, terrain(x, z)) : terrain(x, z),
    terrain,
  };
  for (const p of platforms) platform(f, p.face, p.outline);
  for (const part of plan.parts) buildPart(f, part);
  const mesh = f.sculpt.toMesh(scene, `plan-${condition}`);
  mesh.position = new Vector3(ox, baseY, oz);
  console.info(`dewidebug plan built ${condition} parts=${plan.parts.length} tris=${f.sculpt.triangles}`);
  return mesh;
}

function placeAt(p: Pt, angle: number, across: number): V2 {
  const [x, y] = rotate(p, angle);
  return [x * across, y * across];
}

function world(f: Frame, p: Pt): V2 {
  return placeAt(p, f.angle, f.across);
}

function platform(f: Frame, face: Material, outline: readonly V2[]): void {
  let cx = 0;
  let cz = 0;
  for (const [x, z] of outline) {
    cx += x / outline.length;
    cz += z / outline.length;
  }
  const top: V3[] = [];
  const foot: V3[] = [];
  for (let i = 0; i < outline.length; i++) {
    const p = outline[i];
    const q = outline[(i + 1) % outline.length];
    if (!p || !q) continue;
    const pieces = divide(Math.hypot(q[0] - p[0], q[1] - p[1]) / f.across, 5);
    for (let k = 0; k < pieces; k++) {
      const t = k / pieces;
      const x = p[0] + (q[0] - p[0]) * t;
      const z = p[1] + (q[1] - p[1]) * t;
      const fx = cx + (x - cx) * 1.1;
      const fz = cz + (z - cz) * 1.1;
      top.push([x, 0, z]);
      foot.push([fx, Math.min(0, f.terrain(fx, fz)) - FOUNDATION, fz]);
    }
  }
  const low = Math.min(...foot.map((v) => v[1]));
  const colour = MATERIAL[face];
  f.sculpt.band(low, 0);
  for (let i = 0; i < top.length; i++) {
    const a = top[i];
    const b = top[(i + 1) % top.length];
    const c = foot[(i + 1) % foot.length];
    const d = foot[i];
    if (a && b && c && d) f.sculpt.quad(d, c, b, a, colour, [cx, Math.min(a[1], d[1]) - 1, cz]);
  }
  f.sculpt.band(-1, 0).prism(outline, -0.05, 0, MATERIAL.turf);
}

function colourOf(f: Frame, m: Material): Rgb {
  const c = MATERIAL[m];
  return f.condition === 'ruin' ? mix(c, WEATHER, 0.22) : c;
}

function lowest(f: Frame, pts: readonly V2[]): number {
  return Math.min(...pts.map(([x, z]) => f.terrain(x, z)));
}

function buildPart(f: Frame, part: Part): void {
  switch (part.type) {
    case 'wall':
      wall(f, part);
      return;
    case 'tower':
      tower(f, part);
      return;
    case 'hall':
      hall(f, part);
      return;
    case 'prism':
      prism(f, part);
      return;
    case 'ditch':
      ditch(f, part);
      return;
    case 'bridge':
      bridge(f, part);
      return;
    case 'platform':
      return;
  }
}

function merlons(
  f: Frame,
  a: V2,
  b: V2,
  top: number,
  thickness: number,
  colour: Rgb,
  spacing = MERLON_SPACING,
): void {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const step = spacing * f.across;
  const count = Math.floor(len / step);
  if (count < 1) return;
  const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const size = step * 0.45;
  const h = 1.1 * f.up;
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const cx = a[0] + (b[0] - a[0]) * t;
    const cz = a[1] + (b[1] - a[1]) * t;
    f.sculpt.prism(rect(cx, cz, size, thickness, angle), top, top + h, colour);
  }
}

function wall(f: Frame, w: Extract<Part, { type: 'wall' }>): void {
  const left = remains(w, f.condition);
  if (left === undefined) return;
  const colour = colourOf(f, w.material);
  const pts = w.path.map((p) => world(f, p));
  const segments = w.closed ? pts.length : pts.length - 1;
  const thick = w.thickness * f.across;
  const height = w.height * f.up;
  const base = (w.base ?? 0) * f.up;
  for (let i = 0; i < segments; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    if (!a || !b) continue;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const n = divide(len / f.across, 7);
    if (f.condition === 'standing') {
      standingWall(f, a, b, angle, n, thick, base + height, colour, w.top === 'battlements');
      continue;
    }
    const heights = ruinHeights(f.random, left, n);
    for (let k = 0; k < n; k++) {
      const t0 = k / n;
      const t1 = (k + 1) / n;
      const p0: V2 = [a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0];
      const p1: V2 = [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1];
      const mid: V2 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      const pieceLen = len / n + (k === 0 || k === n - 1 ? thick / 2 : 0.02);
      const shift = k === 0 ? -thick / 4 : k === n - 1 ? thick / 4 : 0;
      const cx = mid[0] + Math.cos(angle) * shift;
      const cz = mid[1] + Math.sin(angle) * shift;
      const outline = rect(cx, cz, pieceLen, thick, angle);
      const floor = lowest(f, outline) - FOUNDATION;
      const top = f.ground(mid[0], mid[1]) + base + height * (heights[k] ?? 1);
      f.sculpt.band(floor, top).prism(outline, floor, top, colour);
    }
  }
}

function standingWall(
  f: Frame,
  a: V2,
  b: V2,
  angle: number,
  n: number,
  thick: number,
  rise: number,
  colour: Rgb,
  battlements: boolean,
): void {
  const ux = Math.cos(angle);
  const uz = Math.sin(angle);
  const nx = -uz * (thick / 2);
  const nz = ux * (thick / 2);
  const ext = thick / 2;
  const start: V2 = [a[0] - ux * ext, a[1] - uz * ext];
  const end: V2 = [b[0] + ux * ext, b[1] + uz * ext];
  const rows: { p: V2; low: number; high: number }[] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const p: V2 = [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t];
    const g = f.ground(p[0], p[1]);
    const low =
      Math.min(f.terrain(p[0], p[1]), f.terrain(p[0] + nx, p[1] + nz), f.terrain(p[0] - nx, p[1] - nz)) -
      FOUNDATION;
    rows.push({ p, low, high: g + rise });
  }
  const floor = Math.min(...rows.map((r) => r.low));
  const ceiling = Math.max(...rows.map((r) => r.high));
  f.sculpt.band(floor, ceiling);
  const at = (r: { p: V2 }, side: number, y: number): V3 => [r.p[0] + nx * side, y, r.p[1] + nz * side];
  for (let k = 0; k < n; k++) {
    const r0 = rows[k];
    const r1 = rows[k + 1];
    if (!r0 || !r1) continue;
    const inside: V3 = [(r0.p[0] + r1.p[0]) / 2, (r0.low + r0.high) / 2, (r0.p[1] + r1.p[1]) / 2];
    for (const side of [-1, 1]) {
      f.sculpt.quad(
        at(r0, side, r0.low),
        at(r1, side, r1.low),
        at(r1, side, r1.high),
        at(r0, side, r0.high),
        colour,
        inside,
      );
    }
    f.sculpt.quad(at(r0, -1, r0.high), at(r1, -1, r1.high), at(r1, 1, r1.high), at(r0, 1, r0.high), colour, [
      inside[0],
      Math.min(r0.high, r1.high) - 1,
      inside[2],
    ]);
    if (battlements) {
      const mid = Math.min(r0.high, r1.high);
      merlons(f, r0.p, r1.p, mid, thick * 0.55, colour);
    }
  }
  const first = rows[0];
  const last = rows[rows.length - 1];
  if (first && last)
    for (const [r, dir] of [
      [first, 1],
      [last, -1],
    ] as const) {
      f.sculpt.quad(at(r, -1, r.low), at(r, 1, r.low), at(r, 1, r.high), at(r, -1, r.high), colour, [
        r.p[0] + ux * dir,
        (r.low + r.high) / 2,
        r.p[1] + uz * dir,
      ]);
    }
}

function turnOf(f: Frame, t: Extract<Part, { type: 'tower' }>): number {
  return (((t.angle ?? 0) + f.angle) * Math.PI) / 180;
}

function towerOutline(
  f: Frame,
  t: Extract<Part, { type: 'tower' }>,
  cx: number,
  cz: number,
  r: number,
): V2[] {
  const turn = turnOf(f, t);
  switch (t.shape) {
    case 'round':
      return ring(cx, cz, r, t.size >= 8 ? 14 : 10, turn);
    case 'hexagonal':
      return ring(cx, cz, r / Math.cos(Math.PI / 6), 6, turn);
    case 'octagonal':
      return ring(cx, cz, r / Math.cos(Math.PI / 8), 8, turn + Math.PI / 8);
    case 'square':
      return rect(cx, cz, r * 2, r * 2, turn);
  }
}

function tower(f: Frame, t: Extract<Part, { type: 'tower' }>): void {
  const left = remains(t, f.condition);
  if (left === undefined) return;
  const colour = colourOf(f, t.material);
  const [cx, cz] = world(f, t.at);
  const r = (t.size / 2) * f.across;
  const outline = towerOutline(f, t, cx, cz, r);
  const ground = f.ground(cx, cz) + (t.base ?? 0) * f.up;
  const floor = raisedFloor(f, t.base, ground) ?? lowest(f, outline) - FOUNDATION;
  const height = t.height * f.up;
  if (t.size >= 10)
    console.info(
      `dewidebug tower ${t.shape} size=${t.size} at=${cx.toFixed(1)},${cz.toFixed(1)} floor=${floor.toFixed(2)} ground=${ground.toFixed(2)} top=${(ground + height).toFixed(2)} terrain=${f.terrain(cx, cz).toFixed(2)} sides=${outline.length}`,
    );
  if (f.condition === 'ruin') {
    ruinShell(f, t, outline, floor, ground, height, r * 0.34, colour);
    return;
  }
  const top = ground + height;
  f.sculpt.band(floor, top);
  if (t.batter) {
    const flare = towerOutline(f, t, cx, cz, r * 1.2);
    const knee = ground + height * 0.22;
    f.sculpt.prism(flare, floor, ground, colour, false);
    f.sculpt.frustum(flare, outline, ground, knee, colour);
    f.sculpt.prism(outline, knee, top, colour);
  } else {
    f.sculpt.prism(outline, floor, top, colour);
  }
  towerTop(f, t, cx, cz, r, top, colour);
}

function raisedFloor(f: Frame, base: number | undefined, ground: number): number | undefined {
  return base !== undefined && base > 0 ? ground - 0.4 * f.up : undefined;
}

function towerTop(
  f: Frame,
  t: Extract<Part, { type: 'tower' }>,
  cx: number,
  cz: number,
  r: number,
  top: number,
  colour: Rgb,
): void {
  const spacing = t.size < 7 ? 1.9 : MERLON_SPACING;
  const edge = (outline: readonly V2[], y: number, depth: number): void => {
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i];
      const b = outline[(i + 1) % outline.length];
      if (!a || !b) continue;
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len >= spacing * f.across) {
        merlons(f, a, b, y, depth, colour, spacing);
      } else if (i % 2 === 0) {
        const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
        const mid: V2 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        f.sculpt.prism(rect(mid[0], mid[1], len * 0.95, depth, angle), y, y + 1.1 * f.up, colour);
      }
    }
  };
  switch (t.top) {
    case 'plain':
      return;
    case 'battlements':
      edge(towerOutline(f, t, cx, cz, r * 0.93), top, r * 0.14);
      return;
    case 'machicolated': {
      const wide = towerOutline(f, t, cx, cz, r * 1.12);
      const lip = top - 1.6 * f.up;
      f.sculpt.frustum(
        towerOutline(f, t, cx, cz, r),
        wide,
        lip - 0.6 * f.up,
        lip,
        mix(colour, OPENING, 0.25),
      );
      f.sculpt.prism(wide, lip, top, colour);
      edge(towerOutline(f, t, cx, cz, r * 1.05), top, r * 0.14);
      return;
    }
    case 'cone':
      f.sculpt.cone(
        towerOutline(f, t, cx, cz, r * 1.08),
        top,
        [cx, top + t.size * 0.95 * f.up, cz],
        MATERIAL.slate,
      );
      return;
    case 'pyramid':
      f.sculpt.cone(
        rect(cx, cz, r * 2.1, r * 2.1, turnOf(f, t)),
        top,
        [cx, top + t.size * 0.35 * f.up, cz],
        MATERIAL.slate,
      );
      return;
  }
}

const SIDES_OF_RECT: readonly Side[] = ['s', 'e', 'n', 'w'];

function ruinShell(
  f: Frame,
  part: Extract<Part, { type: 'tower' | 'hall' | 'prism' }>,
  outline: readonly V2[],
  floor: number,
  ground: number,
  height: number,
  thickness: number,
  colour: Rgb,
): void {
  const square = outline.length === 4;
  const orient = signedArea(outline) > 0 ? 1 : -1;
  for (let i = 0; i < outline.length; i++) {
    const a = outline[i];
    const b = outline[(i + 1) % outline.length];
    if (!a || !b) continue;
    const side = SIDES_OF_RECT[i] ?? 'n';
    const left = square ? sideRemains(part, side, f.condition) : remains(part, f.condition);
    if (left === undefined) continue;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = square ? divide(len / f.across, 6) : 1;
    const heights = ruinHeights(f.random, left, n);
    const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const inward = angle + Math.PI / 2;
    const nx = Math.cos(inward) * thickness * 0.5;
    const nz = Math.sin(inward) * thickness * 0.5;
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n;
      const cx = a[0] + (b[0] - a[0]) * t;
      const cz = a[1] + (b[1] - a[1]) * t;
      const pieceLen = len / n + thickness * (square ? 0.5 : 0.6);
      const piece = rect(cx + nx * orient, cz + nz * orient, pieceLen, thickness, angle);
      const top = ground + height * Math.max(FOOTING, heights[k] ?? left);
      f.sculpt.band(floor, top).prism(piece, floor, top, colour);
    }
  }
}

function signedArea(outline: readonly V2[]): number {
  let area = 0;
  for (let k = 0; k < outline.length; k++) {
    const p = outline[k];
    const q = outline[(k + 1) % outline.length];
    if (p && q) area += p[0] * q[1] - q[0] * p[1];
  }
  return area;
}

function hall(f: Frame, h: Extract<Part, { type: 'hall' }>): void {
  const left = remains(h, f.condition);
  if (left === undefined) return;
  const colour = colourOf(f, h.material);
  const outline = hallCorners(h).map((p) => world(f, p));
  const [cx, cz] = world(f, h.at);
  const angle = ((h.angle + f.angle) * Math.PI) / 180;
  const ground = f.ground(cx, cz) + (h.base ?? 0) * f.up;
  const floor = raisedFloor(f, h.base, ground) ?? lowest(f, outline) - FOUNDATION;
  const height = h.height * f.up;
  if (f.condition === 'ruin') {
    ruinShell(
      f,
      h,
      outline,
      floor,
      ground,
      height,
      Math.min(1.1 * f.across, h.width * 0.14 * f.across),
      colour,
    );
    return;
  }
  const top = ground + height;
  f.sculpt.band(floor, top).prism(outline, floor, top, colour);
  for (const o of h.openings ?? []) openings(f, h, o, outline, ground, height);
  const roofColour = MATERIAL[h.roofMaterial ?? 'slate'];
  const L = h.length * f.across;
  const W = h.width * f.across;
  const rise = W * (h.pitch ?? 0.45) * (f.up / f.across);
  switch (h.roof) {
    case 'none':
      return;
    case 'gable':
      gableRoof(f, cx, cz, L + 0.4 * f.across, W + 0.5 * f.across, angle, top, rise, roofColour, false);
      return;
    case 'hip':
      gableRoof(f, cx, cz, L + 0.4 * f.across, W + 0.5 * f.across, angle, top, rise, roofColour, true);
      return;
    case 'parapet':
    case 'battlements': {
      const dress = MATERIAL[h.roofMaterial ?? h.material];
      const lip = rect(cx, cz, L + 0.3 * f.across, W + 0.3 * f.across, angle);
      f.sculpt.band(top, top + 1.1 * f.up).prism(lip, top - 0.3 * f.up, top + 0.8 * f.up, dress);
      if (h.roof === 'battlements')
        for (let i = 0; i < 4; i++) {
          const a = lip[i];
          const b = lip[(i + 1) % 4];
          if (a && b) merlons(f, a, b, top + 0.8 * f.up, 0.5 * f.across, dress);
        }
      return;
    }
  }
}

function openings(
  f: Frame,
  h: Extract<Part, { type: 'hall' }>,
  o: NonNullable<Extract<Part, { type: 'hall' }>['openings']>[number],
  outline: readonly V2[],
  ground: number,
  height: number,
): void {
  const index = SIDES_OF_RECT.indexOf(o.side);
  const a = outline[index];
  const b = outline[(index + 1) % 4];
  if (!a || !b) return;
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const rows = o.rows ?? 1;
  const w = Math.min(len / (o.count * 2.2), 1.6 * f.across);
  const storey = height / rows;
  const tall = o.tall ?? false;
  const oh = tall ? storey * 0.55 : Math.min(storey * 0.42, 1.9 * f.up);
  const out = 0.08 * f.across;
  const nx = Math.cos(angle - Math.PI / 2) * out;
  const nz = Math.sin(angle - Math.PI / 2) * out;
  const colour = mix(OPENING, MATERIAL[h.material], 0.15);
  for (let r = 0; r < rows; r++) {
    const y0 = ground + storey * r + (tall ? storey * 0.22 : storey * 0.34);
    for (let i = 0; i < o.count; i++) {
      const t = (i + 0.5) / o.count;
      const cx = a[0] + (b[0] - a[0]) * t + nx;
      const cz = a[1] + (b[1] - a[1]) * t + nz;
      f.sculpt.band(y0, y0 + oh).prism(rect(cx, cz, w, out * 3, angle), y0, y0 + oh, colour);
    }
  }
}

function gableRoof(
  f: Frame,
  cx: number,
  cz: number,
  length: number,
  width: number,
  angle: number,
  y: number,
  rise: number,
  colour: Rgb,
  hipped: boolean,
): void {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const at = (x: number, z: number, h: number): V3 => [cx + x * c - z * s, y + h, cz + x * s + z * c];
  const l = length / 2;
  const w = width / 2;
  const ridge = hipped ? Math.max(0, l - w) : l;
  const inside: V3 = [cx, y + rise * 0.3, cz];
  const a = at(-l, -w, 0);
  const b = at(l, -w, 0);
  const cc = at(l, w, 0);
  const d = at(-l, w, 0);
  const r0 = at(-ridge, 0, rise);
  const r1 = at(ridge, 0, rise);
  f.sculpt.band(y - rise * 0.5, y + rise);
  f.sculpt.quad(a, b, r1, r0, colour, inside);
  f.sculpt.quad(d, cc, r1, r0, colour, inside);
  f.sculpt.tri(b, cc, r1, colour, inside);
  f.sculpt.tri(a, d, r0, colour, inside);
}

function prism(f: Frame, p: Extract<Part, { type: 'prism' }>): void {
  const left = remains(p, f.condition);
  if (left === undefined) return;
  const colour = colourOf(f, p.material);
  const outline = p.outline.map((q) => world(f, q));
  const floor = lowest(f, outline) - FOUNDATION;
  const ground = Math.max(...outline.map(([x, z]) => f.ground(x, z))) + (p.base ?? 0) * f.up;
  const height = p.height * f.up;
  if (f.condition === 'ruin') {
    ruinShell(f, p, outline, floor, ground, height, 1 * f.across, colour);
    return;
  }
  const top = ground + height;
  f.sculpt.band(floor, top).prism(outline, floor, top, colour);
  if (p.top === 'battlements')
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i];
      const b = outline[(i + 1) % outline.length];
      if (a && b) merlons(f, a, b, top, 0.5 * f.across, colour);
    }
}

function ditch(f: Frame, d: Extract<Part, { type: 'ditch' }>): void {
  const pts = d.path.map((p) => world(f, p));
  const half = (d.width / 2) * f.across;
  const left: V3[] = [];
  const right: V3[] = [];
  const lift = 0.12;
  pts.forEach((p, i) => {
    const prev = pts[Math.max(0, i - 1)] ?? p;
    const next = pts[Math.min(pts.length - 1, i + 1)] ?? p;
    const dx = next[0] - prev[0];
    const dz = next[1] - prev[1];
    const len = Math.hypot(dx, dz) || 1;
    const nx = (-dz / len) * half;
    const nz = (dx / len) * half;
    left.push([p[0] + nx, f.ground(p[0] + nx, p[1] + nz) + lift, p[1] + nz]);
    right.push([p[0] - nx, f.ground(p[0] - nx, p[1] - nz) + lift, p[1] - nz]);
  });
  f.sculpt.band(-1e3, 1e3).ribbon(left, right, DITCH);
}

function bridge(f: Frame, b: Extract<Part, { type: 'bridge' }>): void {
  const left = remains(b, f.condition);
  if (left === undefined) return;
  const colour = colourOf(f, b.material);
  const a = world(f, b.from);
  const z = world(f, b.to);
  const length = Math.hypot(z[0] - a[0], z[1] - a[1]);
  const metres = length / f.across;
  const dir: V2 = [(z[0] - a[0]) / length, (z[1] - a[1]) / length];
  const side: V2 = [-dir[1], dir[0]];
  const half = (b.width / 2) * f.across;
  const at = (s: number): V2 => [a[0] + dir[0] * s * f.across, a[1] + dir[1] * s * f.across];
  const groundAt = (s: number): number => {
    const [x, zz] = at(s);
    return f.ground(x, zz);
  };
  const springs = b.arches.map((arch) => {
    const samples = [-0.5, -0.25, 0, 0.25, 0.5].map((k) => groundAt(arch.at + arch.span * k));
    return Math.min(...samples);
  });
  const main = b.arches.reduce((best, arch, i) => (arch.span > (b.arches[best]?.span ?? 0) ? i : best), 0);
  const mainArch = b.arches[main];
  const crown = (springs[main] ?? 0) + b.height * f.up;
  const rampStart = mainArch ? mainArch.at - mainArch.span / 2 : metres / 2;
  const rampEnd = mainArch ? mainArch.at + mainArch.span / 2 : metres / 2;
  const endA = groundAt(0);
  const endZ = groundAt(metres);
  const deckAt = (s: number): number => {
    const ramp =
      s < rampStart
        ? endA + (crown - endA) * (s / Math.max(1, rampStart))
        : s > rampEnd
          ? crown + (endZ - crown) * ((s - rampEnd) / Math.max(1, metres - rampEnd))
          : crown;
    return Math.max(ramp, groundAt(s) + 0.3 * f.up);
  };
  const soffitAt = (s: number, deck: number): number => {
    let y = Math.min(groundAt(s), deck) - FOUNDATION;
    b.arches.forEach((arch, i) => {
      const rise = archSoffit(arch, s);
      if (rise !== undefined) y = (springs[i] ?? 0) + rise * f.up;
    });
    return Math.min(y, deck - 0.9 * f.up);
  };
  const steps = divide(metres, 1.6);
  const rows: { deck: number; soffit: number; p: V2 }[] = [];
  for (let i = 0; i <= steps; i++) {
    const s = (i / steps) * metres;
    const deck = deckAt(s);
    rows.push({ deck, soffit: soffitAt(s, deck), p: at(s) });
  }
  const off = (p: V2, k: number, y: number): V3 => [p[0] + side[0] * half * k, y, p[1] + side[1] * half * k];
  const parapet = 1.1 * f.up;
  const low = Math.min(...rows.map((r) => r.soffit));
  f.sculpt.band(low, crown + parapet);
  for (let i = 0; i < steps; i++) {
    const r0 = rows[i];
    const r1 = rows[i + 1];
    if (!r0 || !r1) continue;
    const midY = (r0.deck + r0.soffit + r1.deck + r1.soffit) / 4;
    const mid: V3 = [(r0.p[0] + r1.p[0]) / 2, midY, (r0.p[1] + r1.p[1]) / 2];
    const d0 = r0.deck + parapet;
    const d1 = r1.deck + parapet;
    for (const k of [-1, 1]) {
      const inset = k * PARAPET_INSET;
      const edge = off([mid[0], mid[2]], k * 1.5, r0.deck);
      f.sculpt.quad(
        off(r0.p, k, r0.soffit),
        off(r1.p, k, r1.soffit),
        off(r1.p, k, d1),
        off(r0.p, k, d0),
        colour,
        mid,
      );
      f.sculpt.quad(off(r0.p, k, d0), off(r1.p, k, d1), off(r1.p, inset, d1), off(r0.p, inset, d0), colour, [
        mid[0],
        r0.deck,
        mid[2],
      ]);
      f.sculpt.quad(
        off(r0.p, inset, r0.deck),
        off(r1.p, inset, r1.deck),
        off(r1.p, inset, d1),
        off(r0.p, inset, d0),
        colour,
        edge,
      );
    }
    f.sculpt.quad(
      off(r0.p, -PARAPET_INSET, r0.deck),
      off(r1.p, -PARAPET_INSET, r1.deck),
      off(r1.p, PARAPET_INSET, r1.deck),
      off(r0.p, PARAPET_INSET, r0.deck),
      mix(colour, OPENING, 0.2),
      [mid[0], r0.deck - 5, mid[2]],
    );
    f.sculpt.quad(
      off(r0.p, -1, r0.soffit),
      off(r1.p, -1, r1.soffit),
      off(r1.p, 1, r1.soffit),
      off(r0.p, 1, r0.soffit),
      mix(colour, OPENING, 0.35),
      [mid[0], r0.soffit + 5, mid[2]],
    );
  }
  for (const r of [rows[0], rows[rows.length - 1]]) {
    if (!r) continue;
    const inward = r === rows[0] ? 1 : -1;
    f.sculpt.quad(
      off(r.p, -1, r.soffit),
      off(r.p, 1, r.soffit),
      off(r.p, 1, r.deck),
      off(r.p, -1, r.deck),
      colour,
      [r.p[0] + dir[0] * inward, (r.deck + r.soffit) / 2, r.p[1] + dir[1] * inward],
    );
  }
}
