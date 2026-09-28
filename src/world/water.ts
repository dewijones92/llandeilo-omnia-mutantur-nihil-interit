import { Color3, DynamicTexture, Mesh, StandardMaterial, VertexData, type Scene } from './babylon.ts';
import { mix, type Rgb } from '../domain/colour.ts';
import { heightToWorld, WORLD } from '../domain/geo.ts';
import type { RiverPath } from './terrain.ts';

const RIPPLE = 128;
const FLOW_PER_MS = 0.00004;

export class Water {
  readonly mesh: Mesh;
  readonly material: StandardMaterial;
  private readonly ripples: DynamicTexture;

  constructor(scene: Scene, rivers: readonly RiverPath[]) {
    this.mesh = buildRivers(scene, rivers);
    const mat = this.mesh.material;
    if (!(mat instanceof StandardMaterial)) throw new Error('river material missing');
    this.material = mat;
    this.ripples = rippleTexture(scene);
    mat.bumpTexture = this.ripples;
  }

  reflect(top: Rgb, horizon: Rgb, level: number): void {
    const sky = mix(horizon, top, 0.35);
    const lit = 0.55 + 0.45 * level;
    this.material.diffuseColor.set(lit, lit, lit);
    this.material.emissiveColor.set(sky.r * 0.32 * level, sky.g * 0.32 * level, sky.b * 0.32 * level);
  }

  tick(dt: number): void {
    this.ripples.vOffset = (this.ripples.vOffset + dt * FLOW_PER_MS) % 1;
  }
}

function rippleTexture(scene: Scene): DynamicTexture {
  const t = new DynamicTexture('river-ripples', { width: RIPPLE, height: RIPPLE }, scene, true);
  const ctx = t.getContext();
  const img = ctx.getImageData(0, 0, RIPPLE, RIPPLE);
  const k = (Math.PI * 2) / RIPPLE;
  const height = (x: number, y: number): number =>
    Math.sin(x * k * 3 + Math.sin(y * k * 2) * 1.5) * 0.5 +
    Math.sin((x + y) * k * 5) * 0.3 +
    Math.sin((x * 2 - y) * k * 4 + 1.3) * 0.25 +
    Math.sin(y * k * 7 + x * k) * 0.15;
  for (let y = 0; y < RIPPLE; y++) {
    for (let x = 0; x < RIPPLE; x++) {
      const dx = height(x + 1, y) - height(x - 1, y);
      const dy = height(x, y + 1) - height(x, y - 1);
      const l = Math.hypot(dx, dy, 1);
      const o = (y * RIPPLE + x) * 4;
      img.data[o] = Math.round((-dx / l) * 127 + 128);
      img.data[o + 1] = Math.round((-dy / l) * 127 + 128);
      img.data[o + 2] = Math.round((1 / l) * 127 + 128);
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  t.update(false);
  t.wrapU = DynamicTexture.WRAP_ADDRESSMODE;
  t.wrapV = DynamicTexture.WRAP_ADDRESSMODE;
  t.level = 0.55;
  return t;
}

function buildRivers(scene: Scene, rivers: readonly RiverPath[]): Mesh {
  const banks = ribbon(scene, 'river-banks', rivers, 9, 0.25, [0.81, 0.78, 0.65]);
  const bankMat = new StandardMaterial('bank-mat', scene);
  bankMat.diffuseColor = Color3.White();
  bankMat.specularColor = Color3.Black();
  bankMat.backFaceCulling = false;
  bankMat.zOffset = -1;
  banks.material = bankMat;
  banks.useVertexColors = true;
  banks.receiveShadows = true;
  banks.isPickable = false;
  return buildWater(scene, rivers);
}

function ribbon(
  scene: Scene,
  name: string,
  rivers: readonly RiverPath[],
  extra: number,
  lift: number,
  rgb: readonly [number, number, number],
): Mesh {
  const positions: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];
  let v = 0;
  for (const river of rivers) {
    const pts = river.points;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const level = river.levels[i];
      if (!p || !prev || !next || level === undefined) continue;
      const dx = next.e - prev.e;
      const dn = next.n - prev.n;
      const len = Math.hypot(dx, dn) || 1;
      const half = river.width / 2 + extra;
      const nx = (-dn / len) * half;
      const nn = (dx / len) * half;
      const y = heightToWorld(level) + lift;
      for (const side of [-1, 1]) {
        positions.push(
          (p.e + nx * side - WORLD.centre.e) / WORLD.metresPerUnit,
          y,
          (p.n + nn * side - WORLD.centre.n) / WORLD.metresPerUnit,
        );
        colors.push(rgb[0], rgb[1], rgb[2], 1);
      }
      if (i > 0) indices.push(v - 2, v, v - 1, v - 1, v, v + 1);
      v += 2;
    }
  }
  const mesh = new Mesh(name, scene);
  const data = new VertexData();
  data.positions = positions;
  data.indices = indices;
  data.colors = colors;
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);
  data.normals = normals;
  data.applyToMesh(mesh);
  return mesh;
}

function buildWater(scene: Scene, rivers: readonly RiverPath[]): Mesh {
  const positions: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  let v = 0;
  for (const river of rivers) {
    const pts = river.points;
    let along = 0;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const level = river.levels[i];
      if (!p || !prev || !next || level === undefined) continue;
      const dx = next.e - prev.e;
      const dn = next.n - prev.n;
      const len = Math.hypot(dx, dn) || 1;
      const half = river.width / 2 + 6;
      const nx = (-dn / len) * half;
      const nn = (dx / len) * half;
      const y = heightToWorld(level) + 0.55;
      if (i > 0) along += Math.hypot(p.e - (pts[i - 1]?.e ?? p.e), p.n - (pts[i - 1]?.n ?? p.n));
      for (const side of [-1, 1]) {
        positions.push(
          (p.e + nx * side - WORLD.centre.e) / WORLD.metresPerUnit,
          y,
          (p.n + nn * side - WORLD.centre.n) / WORLD.metresPerUnit,
        );
        colors.push(0.435, 0.624, 0.722, 1);
        uvs.push(side < 0 ? 0 : river.width / 60, along / 60);
      }
      if (i > 0) indices.push(v - 2, v, v - 1, v - 1, v, v + 1);
      v += 2;
    }
  }
  const mesh = new Mesh('rivers', scene);
  const data = new VertexData();
  data.positions = positions;
  data.indices = indices;
  data.colors = colors;
  data.uvs = uvs;
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);
  data.normals = normals;
  data.applyToMesh(mesh);
  const mat = new StandardMaterial('water-mat', scene);
  mat.diffuseColor = Color3.White();
  mat.specularColor = new Color3(0.45, 0.45, 0.42);
  mat.specularPower = 64;
  mat.emissiveColor = new Color3(0.03, 0.05, 0.07);
  mat.backFaceCulling = false;
  mat.zOffset = -2;
  mesh.material = mat;
  mesh.useVertexColors = true;
  mesh.receiveShadows = true;
  mesh.isPickable = false;
  console.info(`dewidebug rivers mesh verts=${v}`);
  return mesh;
}
