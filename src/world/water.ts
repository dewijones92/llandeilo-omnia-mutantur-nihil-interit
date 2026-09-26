import { Color3, Mesh, StandardMaterial, VertexData, type Scene } from './babylon.ts';
import { heightToWorld, WORLD } from '../domain/geo.ts';
import type { RiverPath } from './terrain.ts';

export function buildRivers(scene: Scene, rivers: readonly RiverPath[]): Mesh {
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
      const half = river.width / 2 + 6;
      const nx = (-dn / len) * half;
      const nn = (dx / len) * half;
      const y = heightToWorld(level) + 0.55;
      for (const side of [-1, 1]) {
        positions.push(
          (p.e + nx * side - WORLD.centre.e) / WORLD.metresPerUnit,
          y,
          (p.n + nn * side - WORLD.centre.n) / WORLD.metresPerUnit,
        );
        colors.push(0.435, 0.624, 0.722, 1);
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
