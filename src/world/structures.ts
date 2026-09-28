import { Mesh, Vector3, type Scene } from './babylon.ts';
import { assertNever } from '../domain/assert.ts';
import { hex, mix } from '../domain/colour.ts';
import type { FeatureKind } from '../domain/model.ts';
import { rng } from '../domain/noise.ts';
import { buildPlan, MONUMENT_SCALE, type Ground } from './buildings.ts';
import { box, cone, cylinder, gable, merge, paint, place } from './meshkit.ts';

export type { Ground };

const MOSS = hex('#8a9a6c');
const THATCH = hex('#d2b172');
const DAUB = hex('#d4c29a');
const TIMBER = hex('#7a5a3c');
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
    case 'building':
      return {
        mesh: buildPlan(scene, kind.plan, kind.condition, seed, ground, ox, oz),
        casts: true,
      };
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
    case 'town':
    case 'countryside':
    case 'railway':
    case 'train':
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

function longhouse(scene: Scene, x: number, y: number, z: number, rot: number, s: number): Mesh[] {
  const len = 14 * s * 0.8;
  const w = 5.5 * s * 0.8;
  return [
    place(box(scene, len, w * 0.45, w, DAUB), x, y, z, rot),
    place(gable(scene, len * 1.05, w * 1.25, w * 0.75, THATCH), x, y + w * 0.45, z, rot),
  ];
}
