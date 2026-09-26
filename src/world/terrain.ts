import { Color3, Mesh, StandardMaterial, VertexBuffer, VertexData, type Scene } from '@babylonjs/core';
import Delaunator from 'delaunator';
import { clamp, smoothstep } from '../domain/assert.ts';
import { hex, mix, type Rgb } from '../domain/colour.ts';
import { heightToWorld, toGrid, WORLD } from '../domain/geo.ts';
import { sampleHeight, type Heightfield } from '../domain/heightfield.ts';
import type { GridRef } from '../domain/model.ts';
import { fbm, hash2, rng } from '../domain/noise.ts';
import type { Environment } from '../domain/state.ts';
import type { RiverLine } from '../platform/assets.ts';

const SPACING_M = 105;
const UPLAND_M = 290;
const PLINTH_BOTTOM = -70;

export const MAIN_RIVERS: Readonly<Record<string, number>> = {
  'Afon Tywi': 75,
  'Afon Cothi': 42,
  'Afon Aman': 28,
  'Afon Llwchwr': 28,
  'Afon Sawdde': 26,
  'Afon Dulais': 24,
  'Afon Cennen': 24,
  'Afon Marlais': 20,
  'Afon Bran': 20,
  'Afon Dulas': 20,
};

const PALETTE = {
  meadow: hex('#8fc46a'),
  meadowWet: hex('#79b866'),
  grass: hex('#a9c97a'),
  scrub: hex('#9bb86b'),
  wood: hex('#3f7a45'),
  woodDark: hex('#2f6440'),
  moor: hex('#b59a62'),
  heather: hex('#9a7a8c'),
  uplandGrass: hex('#b8c07e'),
  rock: hex('#9a9690'),
  fieldA: hex('#9fcb6b'),
  fieldB: hex('#b3d178'),
  fieldC: hex('#d3c77a'),
  fieldD: hex('#8ec262'),
  fieldE: hex('#c7b27a'),
  riverbed: hex('#6f9f6a'),
} as const;

const FIELD_COLOURS: readonly Rgb[] = [
  PALETTE.fieldA,
  PALETTE.fieldB,
  PALETTE.fieldD,
  PALETTE.fieldA,
  PALETTE.fieldB,
  PALETTE.fieldD,
  PALETTE.fieldC,
  PALETTE.fieldA,
  PALETTE.fieldE,
];

export interface RiverPath {
  readonly name: string;
  readonly width: number;
  readonly points: readonly GridRef[];
  readonly levels: readonly number[];
}

export interface TerrainTriangles {
  readonly count: number;
  readonly cx: Float32Array;
  readonly cz: Float32Array;
  readonly cy: Float32Array;
  readonly heightM: Float32Array;
  readonly slope: Float32Array;
  readonly woodRank: Float32Array;
  readonly farmRank: Float32Array;
  readonly moorRank: Float32Array;
  readonly floodplain: Uint8Array;
  readonly field: Uint16Array;
  readonly shade: Float32Array;
  readonly mapped: Uint8Array;
  readonly mix: Float32Array;
}

export type LandCover = 'wood' | 'farm' | 'meadow' | 'moor' | 'grass' | 'rock';

export class Terrain {
  readonly mesh: Mesh;
  readonly plinth: Mesh;
  readonly tris: TerrainTriangles;
  readonly rivers: readonly RiverPath[];
  readonly cover: Uint8Array;
  private readonly colours: Float32Array;
  private lastKey = '';

  constructor(
    private readonly scene: Scene,
    private readonly heightfield: Heightfield,
    riverLines: readonly RiverLine[],
    woodland: Uint8Array,
  ) {
    const started = performance.now();
    this.rivers = buildRiverPaths(heightfield, riverLines);
    const { positions, tris } = triangulate(heightfield, this.rivers, woodland);
    this.tris = tris;
    this.cover = new Uint8Array(tris.count);
    this.colours = new Float32Array(tris.count * 12);
    this.mesh = new Mesh('terrain', scene);
    const data = new VertexData();
    data.positions = positions;
    const indices = new Uint32Array(tris.count * 3);
    for (let i = 0; i < indices.length; i++) indices[i] = i;
    data.indices = indices;
    const normals = new Float32Array(positions.length);
    VertexData.ComputeNormals(positions, indices, normals);
    data.normals = normals;
    data.colors = this.colours;
    data.applyToMesh(this.mesh, true);
    const mat = new StandardMaterial('terrain-mat', scene);
    mat.specularColor = new Color3(0.02, 0.02, 0.02);
    mat.diffuseColor = Color3.White();
    this.mesh.material = mat;
    this.mesh.useVertexColors = true;
    this.mesh.receiveShadows = true;
    this.mesh.isPickable = true;
    this.plinth = buildPlinth(scene, heightfield);
    console.info(
      `dewidebug terrain mesh tris=${tris.count} rivers=${this.rivers.length} built in ${Math.round(performance.now() - started)}ms`,
    );
  }

  heightAt(g: GridRef): number {
    return heightToWorld(sampleHeight(this.heightfield, g));
  }

  heightMetres(g: GridRef): number {
    return sampleHeight(this.heightfield, g);
  }

  applyEnvironment(env: Environment): boolean {
    const key = `${env.forest.toFixed(3)}|${env.farmland.toFixed(3)}|${env.moor.toFixed(3)}`;
    if (key === this.lastKey) return false;
    this.lastKey = key;
    const t = this.tris;
    const c = this.colours;
    const farmShare = env.farmland / Math.max(0.0001, 1 - env.forest);
    for (let i = 0; i < t.count; i++) {
      const cover = classify(t, i, env, farmShare);
      this.cover[i] = COVER_CODE[cover];
      const col = colourFor(t, i, cover, env);
      const o = i * 12;
      for (let v = 0; v < 3; v++) {
        c[o + v * 4] = col.r;
        c[o + v * 4 + 1] = col.g;
        c[o + v * 4 + 2] = col.b;
        c[o + v * 4 + 3] = 1;
      }
    }
    this.mesh.updateVerticesData(VertexBuffer.ColorKind, c);
    return true;
  }

  dispose(): void {
    this.mesh.dispose();
    this.plinth.dispose();
    this.scene.getMaterialByName('terrain-mat')?.dispose();
  }
}

export const COVER_CODE: Readonly<Record<LandCover, number>> = {
  wood: 1,
  farm: 2,
  meadow: 3,
  moor: 4,
  grass: 5,
  rock: 6,
};

function classify(t: TerrainTriangles, i: number, env: Environment, farmShare: number): LandCover {
  const slope = t.slope[i] ?? 0;
  const h = t.heightM[i] ?? 0;
  if (slope > 0.62) return 'rock';
  const useMap = (t.mix[i] ?? 1) < env.mappedWoodland;
  const wood = useMap ? ((t.mapped[i] ?? 0) === 1 ? 1 : 0) : (t.woodRank[i] ?? 0);
  if (useMap && wood === 1) return 'wood';
  if (h >= UPLAND_M) {
    const treeLine = UPLAND_M + (h > 520 ? 0 : 230) * env.forest;
    if (!useMap && h < treeLine && wood > 1 - env.forest * 0.85) return 'wood';
    if ((t.moorRank[i] ?? 0) > 1 - env.moor) return 'moor';
    return 'grass';
  }
  if ((t.floodplain[i] ?? 0) === 1 && env.forest < 0.75) return 'meadow';
  if (!useMap && wood > 1 - env.forest) return 'wood';
  if ((t.farmRank[i] ?? 0) > 1 - farmShare) return 'farm';
  return 'grass';
}

function colourFor(t: TerrainTriangles, i: number, cover: LandCover, env: Environment): Rgb {
  const shade = t.shade[i] ?? 1;
  let base: Rgb;
  switch (cover) {
    case 'rock':
      base = PALETTE.rock;
      break;
    case 'wood':
      base = mix(PALETTE.wood, PALETTE.woodDark, (t.woodRank[i] ?? 0) * 0.8);
      break;
    case 'farm':
      base = FIELD_COLOURS[(t.field[i] ?? 0) % FIELD_COLOURS.length] ?? PALETTE.fieldA;
      break;
    case 'meadow':
      base = mix(PALETTE.meadow, PALETTE.meadowWet, shade - 0.9);
      break;
    case 'moor': {
      const heath = smoothstep(0.4, 0.8, t.moorRank[i] ?? 0);
      base = mix(PALETTE.moor, PALETTE.heather, heath * 0.55);
      break;
    }
    case 'grass': {
      const up = smoothstep(UPLAND_M - 60, UPLAND_M + 120, t.heightM[i] ?? 0);
      base = mix(mix(PALETTE.grass, PALETTE.scrub, 1 - env.farmland), PALETTE.uplandGrass, up);
      break;
    }
  }
  return { r: base.r * shade, g: base.g * shade, b: base.b * shade };
}

function buildRiverPaths(hf: Heightfield, lines: readonly RiverLine[]): RiverPath[] {
  const out: RiverPath[] = [];
  for (const line of lines) {
    const width = line.name ? MAIN_RIVERS[line.name] : undefined;
    if (width === undefined || !line.name) continue;
    const pts = densify(line.points, 45).filter(
      (p) => Math.hypot(p.e - WORLD.centre.e, p.n - WORLD.centre.n) < WORLD.radiusMetres - 60,
    );
    if (pts.length < 2) continue;
    const raw = pts.map((p) => lowestNear(hf, p, width * 0.6 + 40));
    const levels = raw.map((_, i) => {
      let min = Infinity;
      for (let k = Math.max(0, i - 3); k <= Math.min(raw.length - 1, i + 3); k++)
        min = Math.min(min, raw[k] ?? Infinity);
      return min;
    });
    out.push({ name: line.name, width, points: pts, levels });
  }
  return out;
}

function densify(points: readonly GridRef[], step: number): GridRef[] {
  const out: GridRef[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (!a || !b) continue;
    const d = Math.hypot(b.e - a.e, b.n - a.n);
    const n = Math.max(1, Math.ceil(d / step));
    for (let k = 0; k < n; k++) out.push({ e: a.e + ((b.e - a.e) * k) / n, n: a.n + ((b.n - a.n) * k) / n });
  }
  const last = points[points.length - 1];
  if (last) out.push(last);
  return out;
}

function lowestNear(hf: Heightfield, p: GridRef, r: number): number {
  let min = sampleHeight(hf, p);
  for (let a = 0; a < 8; a++) {
    const ang = (a / 8) * Math.PI * 2;
    min = Math.min(min, sampleHeight(hf, { e: p.e + Math.cos(ang) * r, n: p.n + Math.sin(ang) * r }));
  }
  return min;
}

interface Pt {
  x: number;
  z: number;
  hM: number;
  river: boolean;
}

function triangulate(
  hf: Heightfield,
  rivers: readonly RiverPath[],
  woodland: Uint8Array,
): { positions: Float32Array; tris: TerrainTriangles } {
  const R = WORLD.radiusMetres;
  const pts: Pt[] = [];
  const random = rng(1282);
  const cell = SPACING_M;
  const riverGrid = new Map<string, number>();
  const key = (e: number, n: number): string => `${Math.floor(e / 200)},${Math.floor(n / 200)}`;

  for (const river of rivers) {
    for (let i = 0; i < river.points.length; i += 1) {
      const p = river.points[i];
      const prev = river.points[Math.max(0, i - 1)];
      const next = river.points[Math.min(river.points.length - 1, i + 1)];
      const level = river.levels[i];
      if (!p || !prev || !next || level === undefined) continue;
      const dx = next.e - prev.e;
      const dn = next.n - prev.n;
      const len = Math.hypot(dx, dn) || 1;
      const nx = -dn / len;
      const nn = dx / len;
      const half = river.width / 2 + 10;
      if (i % 2 === 0) {
        for (const side of [-1, 1]) {
          const e = p.e + nx * half * side;
          const n = p.n + nn * half * side;
          pts.push({ x: e, z: n, hM: level + 0.4, river: true });
        }
      }
      const k = key(p.e, p.n);
      riverGrid.set(k, Math.max(riverGrid.get(k) ?? 0, river.width));
    }
  }

  const nearRiver = (e: number, n: number): boolean => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (riverGrid.has(`${Math.floor(e / 200) + dx},${Math.floor(n / 200) + dz}`)) return true;
      }
    }
    return false;
  };
  const riverDistance = (e: number, n: number, limit: number): number => {
    let best = Infinity;
    for (const river of rivers) {
      for (let i = 0; i < river.points.length; i += 2) {
        const p = river.points[i];
        if (!p) continue;
        const d = Math.hypot(p.e - e, p.n - n) - river.width / 2;
        if (d < best) best = d;
        if (best < limit * 0.1) return best;
      }
    }
    return best;
  };

  for (let gz = -R; gz <= R; gz += cell) {
    for (let gx = -R; gx <= R; gx += cell) {
      const x = gx + (random() - 0.5) * cell * 0.7;
      const z = gz + (random() - 0.5) * cell * 0.7;
      if (x * x + z * z > (R - cell * 0.5) ** 2) continue;
      const e = WORLD.centre.e + x;
      const n = WORLD.centre.n + z;
      if (nearRiver(e, n) && riverDistance(e, n, 200) < cell * 0.55) continue;
      pts.push({ x: e, z: n, hM: sampleHeight(hf, { e, n }), river: false });
    }
  }
  const ringCount = Math.round((2 * Math.PI * R) / (cell * 0.8));
  for (let i = 0; i < ringCount; i++) {
    const a = (i / ringCount) * Math.PI * 2;
    const e = WORLD.centre.e + Math.cos(a) * R;
    const n = WORLD.centre.n + Math.sin(a) * R;
    pts.push({ x: e, z: n, hM: sampleHeight(hf, { e, n }), river: false });
  }

  const coords = new Float64Array(pts.length * 2);
  pts.forEach((p, i) => {
    coords[i * 2] = p.x;
    coords[i * 2 + 1] = p.z;
  });
  const del = new Delaunator(coords);
  const triIdx = del.triangles;
  const count = triIdx.length / 3;
  const positions = new Float32Array(count * 9);
  const tris: TerrainTriangles = {
    count,
    cx: new Float32Array(count),
    cz: new Float32Array(count),
    cy: new Float32Array(count),
    heightM: new Float32Array(count),
    slope: new Float32Array(count),
    woodRank: new Float32Array(count),
    farmRank: new Float32Array(count),
    moorRank: new Float32Array(count),
    floodplain: new Uint8Array(count),
    field: new Uint16Array(count),
    shade: new Float32Array(count),
    mapped: new Uint8Array(count),
    mix: new Float32Array(count),
  };
  const woodScore = new Float32Array(count);
  const farmScore = new Float32Array(count);
  const moorScore = new Float32Array(count);
  const lowland: number[] = [];
  const upland: number[] = [];

  for (let t = 0; t < count; t++) {
    const ia = triIdx[t * 3] ?? 0;
    const ib = triIdx[t * 3 + 2] ?? 0;
    const ic = triIdx[t * 3 + 1] ?? 0;
    const A = pts[ia];
    const B = pts[ib];
    const C = pts[ic];
    if (!A || !B || !C) continue;
    const verts = [A, B, C];
    let sy = 0;
    verts.forEach((p, v) => {
      const o = t * 9 + v * 3;
      const wx = (p.x - WORLD.centre.e) / WORLD.metresPerUnit;
      const wz = (p.z - WORLD.centre.n) / WORLD.metresPerUnit;
      const wy = heightToWorld(p.hM);
      positions[o] = wx;
      positions[o + 1] = wy;
      positions[o + 2] = wz;
      sy += wy;
    });
    const ex = (A.x + B.x + C.x) / 3;
    const ez = (A.z + B.z + C.z) / 3;
    const hM = (A.hM + B.hM + C.hM) / 3;
    tris.cx[t] = (ex - WORLD.centre.e) / WORLD.metresPerUnit;
    tris.cz[t] = (ez - WORLD.centre.n) / WORLD.metresPerUnit;
    tris.cy[t] = sy / 3;
    tris.heightM[t] = hM;
    const ux = B.x - A.x;
    const uy = (B.hM - A.hM) * WORLD.verticalExaggeration;
    const uz = B.z - A.z;
    const vx = C.x - A.x;
    const vy = (C.hM - A.hM) * WORLD.verticalExaggeration;
    const vz = C.z - A.z;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const nl = Math.hypot(nx, ny, nz) || 1;
    const slope = 1 - Math.abs(ny / nl);
    tris.slope[t] = slope;
    const riverSide = A.river || B.river || C.river;
    const large = fbm(ex / 2600, ez / 2600, 4, 7);
    const medium = fbm(ex / 700, ez / 700, 3, 11);
    const jitter = hash2(Math.round(ex), Math.round(ez), 3);
    tris.shade[t] = 0.95 + jitter * 0.07;
    const col = Math.floor((ex - hf.meta.originEasting) / hf.meta.cellSize);
    const row = Math.floor((hf.meta.originNorthing - ez) / hf.meta.cellSize);
    tris.mapped[t] = woodland[row * hf.meta.width + col] ?? 0;
    tris.mix[t] = fbm(ex / 1800, ez / 1800, 3, 29) * 0.85 + jitter * 0.15;
    woodScore[t] = large * 0.55 + medium * 0.2 + smoothstep(0.05, 0.35, slope) * 0.35 + jitter * 0.05;
    const flat = 1 - smoothstep(0.03, 0.25, slope);
    farmScore[t] = flat * 0.45 + (1 - clamp(hM / UPLAND_M, 0, 1)) * 0.3 + medium * 0.25;
    moorScore[t] = clamp((hM - UPLAND_M) / 300, 0, 1) * 0.6 + large * 0.4;
    const nearTywi = riverSide || (nearRiver(ex, ez) && riverDistance(ex, ez, 300) < 260);
    tris.floodplain[t] = nearTywi && slope < 0.12 && hM < 120 ? 1 : 0;
    const fx = Math.floor(ex / 420 + fbm(ex / 1400, ez / 1400, 2, 5) * 1.4);
    const fz = Math.floor(ez / 330 + fbm(ez / 1400, ex / 1400, 2, 9) * 1.4);
    tris.field[t] = Math.floor(hash2(fx, fz, 21) * 997);
    (hM < UPLAND_M ? lowland : upland).push(t);
  }
  rank(lowland, woodScore, tris.woodRank);
  rank(upland, woodScore, tris.woodRank);
  rank(lowland, farmScore, tris.farmRank);
  rank(upland, moorScore, tris.moorRank);
  return { positions, tris };
}

function rank(ids: readonly number[], score: Float32Array, out: Float32Array): void {
  const sorted = [...ids].sort((a, b) => (score[a] ?? 0) - (score[b] ?? 0));
  const n = Math.max(1, sorted.length - 1);
  sorted.forEach((id, i) => {
    out[id] = i / n;
  });
}

function buildPlinth(scene: Scene, hf: Heightfield): Mesh {
  const R = WORLD.radiusMetres;
  const segments = 360;
  const bands: readonly { depth: number; colour: Rgb }[] = [
    { depth: 0, colour: hex('#6b4f36') },
    { depth: 6, colour: hex('#8a6b4a') },
    { depth: 18, colour: hex('#a58a67') },
    { depth: 34, colour: hex('#7f7a73') },
    { depth: 1000, colour: hex('#5f5b56') },
  ];
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  let v = 0;
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const p0 = { x: Math.cos(a0) * R, z: Math.sin(a0) * R };
    const p1 = { x: Math.cos(a1) * R, z: Math.sin(a1) * R };
    const top0 = heightToWorld(
      sampleHeight(hf, toGrid({ x: p0.x / WORLD.metresPerUnit, z: p0.z / WORLD.metresPerUnit })),
    );
    const top1 = heightToWorld(
      sampleHeight(hf, toGrid({ x: p1.x / WORLD.metresPerUnit, z: p1.z / WORLD.metresPerUnit })),
    );
    for (let b = 0; b < bands.length - 1; b++) {
      const band = bands[b];
      const nextBand = bands[b + 1];
      if (!band || !nextBand) continue;
      const y00 = Math.max(PLINTH_BOTTOM, top0 - band.depth);
      const y01 = Math.max(PLINTH_BOTTOM, top1 - band.depth);
      const y10 = Math.max(PLINTH_BOTTOM, top0 - nextBand.depth);
      const y11 = Math.max(PLINTH_BOTTOM, top1 - nextBand.depth);
      if (y00 === y10 && y01 === y11) continue;
      const quad = [
        [p0.x, y00, p0.z],
        [p1.x, y01, p1.z],
        [p1.x, y11, p1.z],
        [p0.x, y10, p0.z],
      ];
      for (const q of quad) {
        positions.push((q[0] ?? 0) / WORLD.metresPerUnit, q[1] ?? 0, (q[2] ?? 0) / WORLD.metresPerUnit);
        const shade = 0.92 + hash2(i, b, 4) * 0.08;
        colors.push(band.colour.r * shade, band.colour.g * shade, band.colour.b * shade, 1);
      }
      indices.push(v, v + 1, v + 2, v, v + 2, v + 3);
      v += 4;
    }
  }
  const centre = v;
  positions.push(0, PLINTH_BOTTOM, 0);
  colors.push(0.3, 0.28, 0.26, 1);
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    positions.push(
      (Math.cos(a) * R) / WORLD.metresPerUnit,
      PLINTH_BOTTOM,
      (Math.sin(a) * R) / WORLD.metresPerUnit,
    );
    colors.push(0.3, 0.28, 0.26, 1);
  }
  for (let i = 0; i < segments; i++) indices.push(centre, centre + 1 + ((i + 1) % segments), centre + 1 + i);
  const mesh = new Mesh('plinth', scene);
  const data = new VertexData();
  data.positions = positions;
  data.indices = indices;
  data.colors = colors;
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);
  data.normals = normals;
  data.applyToMesh(mesh);
  const mat = new StandardMaterial('plinth-mat', scene);
  mat.specularColor = Color3.Black();
  mat.backFaceCulling = false;
  mesh.material = mat;
  mesh.useVertexColors = true;
  mesh.convertToFlatShadedMesh();
  mesh.isPickable = false;
  return mesh;
}
