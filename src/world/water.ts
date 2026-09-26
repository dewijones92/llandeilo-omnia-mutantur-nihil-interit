import { Color3, Mesh, StandardMaterial, VertexData, type Scene } from '@babylonjs/core';
import { heightToWorld, WORLD } from '../domain/geo.ts';
import type { RiverPath } from './terrain.ts';

export function buildRivers(scene: Scene, rivers: readonly RiverPath[]): Mesh {
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
        const deep = river.width > 50 ? 0 : 0.06;
        colors.push(0.36 + deep, 0.62 + deep, 0.78, 1);
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
  mat.specularColor = new Color3(0.9, 0.9, 0.85);
  mat.specularPower = 96;
  mat.emissiveColor = new Color3(0.06, 0.1, 0.14);
  mat.backFaceCulling = false;
  mat.zOffset = -2;
  mesh.material = mat;
  mesh.useVertexColors = true;
  mesh.receiveShadows = true;
  mesh.isPickable = false;
  console.info(`dewidebug rivers mesh verts=${v}`);
  return mesh;
}
