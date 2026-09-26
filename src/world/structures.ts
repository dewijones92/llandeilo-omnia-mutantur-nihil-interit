import { Mesh, Vector3, type Scene } from './babylon.ts';
import { assertNever } from '../domain/assert.ts';
import { hex, mix } from '../domain/colour.ts';
import type { FeatureKind } from '../domain/model.ts';
import { rng } from '../domain/noise.ts';
import { box, cone, cylinder, gable, merge, paint, place } from './meshkit.ts';

export const MONUMENT_SCALE = 2.6;

export type Ground = (x: number, z: number) => number;

const STONE = hex('#b7b0a2');
const STONE_DARK = hex('#8f887c');
const RUIN = hex('#a3a192');
const MOSS = hex('#8a9a6c');
const THATCH = hex('#d2b172');
const DAUB = hex('#d4c29a');
const TIMBER = hex('#7a5a3c');
const SLATE = hex('#5f6670');
const TILE = hex('#b5613f');
const EARTH = hex('#8f935f');
const RAMPART = hex('#8a7f6e');
const LIMEWASH = hex('#f1ede2');

export interface Built {
  readonly mesh: Mesh;
  readonly casts: boolean;
}

export function buildFeature(
  scene: Scene,
  kind: FeatureKind,
  seed: number,
  ground: Ground,
  ox: number,
  oz: number,
): Built | undefined {
  const random = rng(seed);
  const s = MONUMENT_SCALE / 10;
  const baseY = ground(ox, oz);
  const at = (parts: Mesh[], name: string): Built => {
    const m = merge(name, parts);
    m.position = new Vector3(ox, baseY - 0.3, oz);
    return { mesh: m, casts: true };
  };
  switch (kind.type) {
    case 'roundhouses': {
      const parts: Mesh[] = [];
      for (let i = 0; i < kind.count; i++) {
        const a = random() * Math.PI * 2;
        const r = Math.sqrt(random()) * kind.spread * s;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        const d = (6 + random() * 5) * s * 0.95;
        const y = ground(ox + x, oz + z) - baseY;
        parts.push(roundhouse(scene, d, x, y, z, a));
      }
      return at(parts, 'roundhouses');
    }
    case 'hillfort':
      return { mesh: rampart(scene, kind, ground, ox, oz), casts: true };
    case 'roman-fort':
      return at(romanFort(scene, kind.width * s, kind.length * s, kind.angle, random), 'roman-fort');
    case 'castle':
      return at(
        castle(scene, kind.towers, kind.radius * s, kind.ruined, kind.keep, random),
        kind.ruined ? 'castle-ruin' : 'castle',
      );
    case 'church':
      return at(church(scene, kind.length * s, kind.tower, kind.angle), 'church');
    case 'abbey':
      return at(abbey(scene, kind.ruined, kind.angle, s, random), kind.ruined ? 'abbey-ruin' : 'abbey');
    case 'hall-houses': {
      const parts: Mesh[] = [];
      for (let i = 0; i < kind.count; i++) {
        const a = random() * Math.PI * 2;
        const r = Math.sqrt(random()) * kind.spread * s;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        const y = ground(ox + x, oz + z) - baseY;
        parts.push(...longhouse(scene, x, y, z, random() * Math.PI, s));
      }
      return at(parts, 'hall-houses');
    }
    case 'mansion':
      return at(mansion(scene, kind.width * s, kind.depth * s, kind.angle, kind.turrets), 'mansion');
    case 'bridge':
      return at(bridge(scene, kind.span * s * 0.6, kind.angle, kind.arches), 'bridge');
    case 'tower':
      return at(folly(scene, kind.height * s), 'tower');
    case 'town':
    case 'countryside':
    case 'railway':
    case 'roads':
      return undefined;
    default:
      return assertNever(kind, 'feature kind');
  }
}

function roundhouse(scene: Scene, d: number, x: number, y: number, z: number, a: number): Mesh {
  const wall = place(cylinder(scene, d, d * 0.2, DAUB, 12), x, y, z, a);
  const roof = place(cone(scene, d * 1.18, d * 0.62, THATCH, 12), x, y + d * 0.2, z, a);
  const door = place(
    box(scene, d * 0.16, d * 0.17, d * 0.08, TIMBER),
    x + Math.cos(-0.6) * d * 0.5,
    y,
    z + Math.sin(-0.6) * d * 0.5,
    0.6,
  );
  return merge('rh', [wall, roof, door]);
}

function rampart(
  scene: Scene,
  k: Extract<FeatureKind, { type: 'hillfort' }>,
  ground: Ground,
  ox: number,
  oz: number,
): Mesh {
  const base = ground(ox, oz);
  const parts: Mesh[] = [];
  const segments = 96;
  for (let ring = 0; ring < k.rings; ring++) {
    const shrink = 1 - ring * 0.14;
    const a = (k.length / 2 / 10) * shrink;
    const b = (k.width / 2 / 10) * shrink;
    const height = (k.stone ? 1.25 : 0.95) * (k.ruined ? 0.6 : 1);
    const half = k.stone ? 3.2 : 3.6;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const lx = Math.cos(t) * a;
      const lz = Math.sin(t) * b;
      const x = lx * Math.cos(k.angle) - lz * Math.sin(k.angle);
      const z = lx * Math.sin(k.angle) + lz * Math.cos(k.angle);
      const len = Math.hypot(x, z) || 1;
      const nx = x / len;
      const nz = z / len;
      const g = ground(ox + x, oz + z) - base;
      const wobble = k.ruined ? 0.6 + 0.4 * Math.sin(i * 1.7 + ring) : 1;
      positions.push(x - nx * half, g - 0.4, z - nz * half);
      positions.push(x, g + height * wobble, z);
      positions.push(x + nx * half, g - 0.4, z + nz * half);
      if (i > 0) {
        const v = i * 3;
        indices.push(v - 3, v, v - 2, v - 2, v, v + 1, v - 2, v + 1, v - 1, v - 1, v + 1, v + 2);
      }
    }
    const both = [...indices];
    for (let i = 0; i < indices.length; i += 3)
      both.push(indices[i] ?? 0, indices[i + 2] ?? 0, indices[i + 1] ?? 0);
    const m = new Mesh('rampart', scene);
    m.setVerticesData('position', positions);
    m.setIndices(both);
    parts.push(paint(m, k.stone ? (k.ruined ? mix(RAMPART, MOSS, 0.3) : RAMPART) : EARTH, 1.06, 0.84));
  }
  const merged = merge('hillfort', parts);
  merged.position = new Vector3(ox, base, oz);
  return merged;
}

function romanFort(scene: Scene, w: number, l: number, angle: number, random: () => number): Mesh[] {
  const parts: Mesh[] = [];
  const bank = (x: number, z: number, len: number, rot: number): void => {
    parts.push(place(box(scene, len, 1.3, 2.4, EARTH), x, 0, z, rot));
    parts.push(place(box(scene, len, 2.6, 0.35, TIMBER), x, 1.2, z, rot));
  };
  const rot = (x: number, z: number): [number, number] => [
    x * Math.cos(angle) - z * Math.sin(angle),
    x * Math.sin(angle) + z * Math.cos(angle),
  ];
  const edges: [number, number, number, number][] = [
    [0, l / 2, w, 0],
    [0, -l / 2, w, 0],
    [w / 2, 0, l, Math.PI / 2],
    [-w / 2, 0, l, Math.PI / 2],
  ];
  for (const [x, z, len, r] of edges) {
    const [rx, rz] = rot(x, z);
    bank(rx, rz, len, -angle + r);
  }
  for (const [x, z] of [
    [0, l / 2],
    [0, -l / 2],
    [w / 2, 0],
    [-w / 2, 0],
  ] as const) {
    const [rx, rz] = rot(x, z);
    parts.push(place(box(scene, 3.2, 5.2, 3.2, TIMBER), rx, 0, rz, -angle));
  }
  const rows = Math.max(2, Math.round(w / 9));
  for (let i = 0; i < rows; i++) {
    for (const side of [-1, 1]) {
      const x = -w / 2 + (w / (rows + 1)) * (i + 1);
      const z = side * l * 0.26;
      const [rx, rz] = rot(x, z);
      const len = l * 0.3 * (0.85 + random() * 0.15);
      parts.push(place(box(scene, 2.2, 1.8, len, DAUB), rx, 0, rz, -angle));
      parts.push(place(gable(scene, len, 2.8, 1.1, TILE), rx, 1.8, rz, -angle + Math.PI / 2));
    }
  }
  parts.push(place(box(scene, w * 0.22, 2.4, l * 0.16, LIMEWASH), 0, 0, 0, -angle));
  parts.push(place(gable(scene, w * 0.22, l * 0.18, 1.2, TILE), 0, 2.4, 0, -angle));
  return parts;
}

function castle(
  scene: Scene,
  towers: number,
  radius: number,
  ruined: boolean,
  keep: boolean,
  random: () => number,
): Mesh[] {
  const parts: Mesh[] = [];
  const stone = ruined ? RUIN : STONE;
  const wallH = 5.5;
  const pts: [number, number][] = [];
  for (let i = 0; i < towers; i++) {
    const a = (i / towers) * Math.PI * 2 + random() * 0.3;
    const r = radius * (0.85 + random() * 0.3);
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  pts.forEach(([x, z], i) => {
    const next = pts[(i + 1) % pts.length];
    if (!next) return;
    const [nx, nz] = next;
    const len = Math.hypot(nx - x, nz - z);
    const rot = -Math.atan2(nz - z, nx - x);
    if (ruined && random() < 0.3) return;
    const h = ruined ? wallH * (0.35 + random() * 0.45) : wallH;
    parts.push(
      place(box(scene, len, h, 1.3, mix(stone, STONE_DARK, 0.15)), (x + nx) / 2, 0, (z + nz) / 2, rot),
    );
    if (!ruined) {
      for (let k = 0; k < Math.floor(len / 1.6); k++) {
        const f = (k + 0.5) / Math.floor(len / 1.6);
        parts.push(place(box(scene, 0.8, 0.8, 1.4, stone), x + (nx - x) * f, h, z + (nz - z) * f, rot));
      }
    }
  });
  pts.forEach(([x, z]) => {
    const h = ruined ? 5 + random() * 4 : 8.5;
    parts.push(place(cylinder(scene, 3.6, h, stone, 10), x, 0, z));
    if (!ruined) parts.push(place(cylinder(scene, 4.1, 0.9, mix(stone, LIMEWASH, 0.2), 10), x, h, z));
  });
  if (keep) {
    const h = ruined ? 8 + random() * 3 : 13;
    parts.push(
      place(cylinder(scene, 6.4, h, mix(stone, LIMEWASH, 0.12), 14), radius * 0.15, 0, -radius * 0.1),
    );
    if (!ruined) parts.push(place(cone(scene, 7, 3.2, SLATE, 14), radius * 0.15, h, -radius * 0.1));
  }
  if (!ruined) {
    parts.push(
      place(
        box(scene, radius * 0.9, 4.2, radius * 0.45, mix(stone, LIMEWASH, 0.25)),
        -radius * 0.2,
        0,
        radius * 0.25,
        0.2,
      ),
    );
    parts.push(
      place(gable(scene, radius * 0.9, radius * 0.5, 2.4, SLATE), -radius * 0.2, 4.2, radius * 0.25, 0.2),
    );
  }
  if (ruined)
    parts.push(place(box(scene, radius * 1.6, 0.4, radius * 1.6, mix(MOSS, RUIN, 0.4)), 0, -0.1, 0, 0.3));
  return parts;
}

function church(scene: Scene, length: number, tower: boolean, angle: number): Mesh[] {
  const w = length * 0.34;
  const parts: Mesh[] = [
    place(box(scene, length, w * 0.8, w, LIMEWASH), 0, 0, 0, angle),
    place(gable(scene, length, w * 1.1, w * 0.55, SLATE), 0, w * 0.8, 0, angle),
    place(
      box(scene, length * 0.35, w * 0.65, w * 0.8, LIMEWASH),
      Math.cos(-angle) * length * 0.6,
      0,
      Math.sin(-angle) * length * 0.6,
      angle,
    ),
  ];
  if (tower) {
    const tx = Math.cos(-angle) * -length * 0.58;
    const tz = Math.sin(-angle) * -length * 0.58;
    parts.push(place(box(scene, w * 0.9, w * 2.2, w * 0.9, STONE), tx, 0, tz, angle));
    parts.push(place(box(scene, w, w * 0.2, w, STONE_DARK), tx, w * 2.2, tz, angle));
  }
  return parts;
}

function abbey(scene: Scene, ruined: boolean, angle: number, s: number, random: () => number): Mesh[] {
  const parts: Mesh[] = [];
  const stone = ruined ? RUIN : mix(STONE, LIMEWASH, 0.2);
  const cos = Math.cos(-angle);
  const sin = Math.sin(-angle);
  const along = (d: number): [number, number] => [cos * d * s, sin * d * s];
  const [cx, cz] = along(0);
  const towerH = (ruined ? 26 : 29) * s;
  const tw = 9 * s;
  if (ruined) {
    parts.push(place(box(scene, tw, towerH, 1.4 * s, stone), cx, 0, cz + tw * 0.45, angle));
    parts.push(place(box(scene, 1.4 * s, towerH * 0.92, tw, stone), cx + tw * 0.45, 0, cz, angle));
  } else {
    parts.push(place(box(scene, tw, towerH, tw, stone), cx, 0, cz, angle));
    parts.push(place(cone(scene, tw * 1.35, 5 * s, SLATE, 4), cx, towerH, cz, angle + Math.PI / 4));
  }
  const chancelH = (ruined ? 5 + random() * 3 : 12) * s;
  const [chx, chz] = along(12);
  parts.push(place(box(scene, 15 * s, chancelH, 8 * s, stone), chx, 0, chz, angle));
  if (!ruined) parts.push(place(gable(scene, 15 * s, 9 * s, 4.5 * s, SLATE), chx, chancelH, chz, angle));
  for (const side of [-1, 1]) {
    const tx = cx - sin * side * 11 * s;
    const tz = cz + cos * side * 11 * s;
    const h = (ruined ? 3 + random() * 4 : 11) * s;
    parts.push(place(box(scene, 8 * s, h, 12 * s, stone), tx, 0, tz, angle));
    if (!ruined) parts.push(place(gable(scene, 12 * s, 9 * s, 4 * s, SLATE), tx, h, tz, angle + Math.PI / 2));
  }
  const [nx, nz] = along(-30);
  parts.push(place(box(scene, 50 * s, 1.2 * s, 18 * s, mix(stone, MOSS, 0.3)), nx, 0, nz, angle));
  const [clx, clz] = along(-14);
  parts.push(
    place(
      box(scene, 23 * s, ruined ? 1 * s : 6 * s, 1.2 * s, stone),
      clx - sin * 20 * s,
      0,
      clz + cos * 20 * s,
      angle,
    ),
  );
  return parts;
}

function longhouse(scene: Scene, x: number, y: number, z: number, rot: number, s: number): Mesh[] {
  const len = 14 * s * 0.8;
  const w = 5.5 * s * 0.8;
  return [
    place(box(scene, len, w * 0.45, w, DAUB), x, y, z, rot),
    place(gable(scene, len * 1.05, w * 1.25, w * 0.75, THATCH), x, y + w * 0.45, z, rot),
  ];
}

function mansion(scene: Scene, w: number, d: number, angle: number, turrets: boolean): Mesh[] {
  const h = w * 0.42;
  const parts: Mesh[] = [
    place(box(scene, w, h, d, hex('#e9e2d2')), 0, 0, 0, angle),
    place(gable(scene, w * 0.98, d * 1.02, h * 0.28, SLATE), 0, h, 0, angle),
  ];
  if (turrets) {
    for (const [sx, sz] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ] as const) {
      const lx = (sx * w) / 2;
      const lz = (sz * d) / 2;
      const x = lx * Math.cos(-angle) - lz * Math.sin(-angle);
      const z = lx * Math.sin(-angle) + lz * Math.cos(-angle);
      parts.push(place(cylinder(scene, d * 0.28, h * 1.25, hex('#e3dccb'), 8), x, 0, z));
      parts.push(place(cone(scene, d * 0.32, h * 0.3, SLATE, 8), x, h * 1.25, z));
    }
  }
  return parts;
}

function bridge(scene: Scene, span: number, angle: number, arches: number): Mesh[] {
  const parts: Mesh[] = [];
  const w = 1.4;
  const seg = 10;
  const rise = arches === 1 ? span * 0.22 : span * 0.08;
  for (let i = 0; i < seg; i++) {
    const t0 = i / seg - 0.5;
    const t1 = (i + 1) / seg - 0.5;
    const arch = (t: number): number => {
      const u = arches === 1 ? t * 2 : (((t + 0.5) * arches) % 1) * 2 - 1;
      return rise * (1 - u * u);
    };
    const x0 = t0 * span;
    const x1 = t1 * span;
    const y = (arch(t0) + arch(t1)) / 2;
    const mx = (x0 + x1) / 2;
    parts.push(
      place(
        box(scene, span / seg + 0.1, 1.1, w, STONE),
        mx * Math.cos(-angle),
        y,
        mx * Math.sin(-angle),
        angle,
      ),
    );
  }
  return parts;
}

function folly(scene: Scene, h: number): Mesh[] {
  const parts: Mesh[] = [place(cylinder(scene, h * 0.34, h, STONE, 6), 0, 0, 0)];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const r = h * 0.2;
    parts.push(place(cylinder(scene, h * 0.16, h * 1.05, STONE, 8), Math.cos(a) * r, 0, Math.sin(a) * r));
  }
  parts.push(place(cylinder(scene, h * 0.4, h * 0.08, STONE_DARK, 6), 0, h, 0));
  return parts;
}
