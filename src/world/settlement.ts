import {
  Color3,
  Matrix,
  Mesh,
  Quaternion,
  StandardMaterial,
  Vector3,
  VertexData,
  type Scene,
} from './babylon.ts';
import { hex } from '../domain/colour.ts';
import { WORLD } from '../domain/geo.ts';
import type { GridRef } from '../domain/model.ts';
import { hash2 } from '../domain/noise.ts';
import type { BuildingFootprints, MapLine } from '../platform/assets.ts';
import { box, gable, merge } from './meshkit.ts';
import type { Ground } from './structures.ts';

const WALLS = ['#f3efe6', '#efe6d2', '#e9dfcf', '#f4ecd8', '#e5ded6', '#efe3d8', '#e2e4de', '#ecdcc3'].map(
  hex,
);

export class Buildings {
  private readonly walls: Mesh;
  private readonly roofs: Mesh;
  private readonly matrices: Float32Array;
  private readonly roofMatrices: Float32Array;
  private readonly colours: Float32Array;
  private lastKey = '';

  constructor(
    scene: Scene,
    private readonly footprints: BuildingFootprints,
    ground: Ground,
  ) {
    const mat = new StandardMaterial('building-mat', scene);
    mat.specularColor = new Color3(0.04, 0.04, 0.04);
    mat.emissiveColor = new Color3(0.2, 0.19, 0.18);
    this.walls = merge('building-walls', [box(scene, 1, 1, 1, '#ffffff')]);
    this.walls.material = mat;
    this.roofs = merge('building-roofs', [gable(scene, 1, 1, 1, '#5f6670')]);
    this.roofs.material = mat;
    const n = footprints.count;
    this.matrices = new Float32Array(n * 16);
    this.roofMatrices = new Float32Array(n * 16);
    this.colours = new Float32Array(n * 4);
    const d = footprints.data;
    for (let i = 0; i < n; i++) {
      const e = d[i * 5] ?? 0;
      const nn = d[i * 5 + 1] ?? 0;
      const w = Math.max(3, d[i * 5 + 2] ?? 0) / WORLD.metresPerUnit;
      const dep = Math.max(3, d[i * 5 + 3] ?? 0) / WORLD.metresPerUnit;
      const angle = d[i * 5 + 4] ?? 0;
      const x = (e - WORLD.centre.e) / WORLD.metresPerUnit;
      const z = (nn - WORLD.centre.n) / WORLD.metresPerUnit;
      const area = w * dep * 100;
      const h = (area > 500 ? 0.75 : area < 60 ? 0.6 : 0.85 + hash2(i, 1, 2) * 0.35) * 1.6;
      const y = ground(x, z) - 0.15;
      const q = Quaternion.RotationAxis(Vector3.Up(), -angle);
      Matrix.Compose(new Vector3(w, h, dep), q, new Vector3(x, y, z)).copyToArray(this.matrices, i * 16);
      const roofH = Math.min(w, dep) * 0.45;
      Matrix.Compose(new Vector3(w, roofH, dep), q, new Vector3(x, y + h, z)).copyToArray(
        this.roofMatrices,
        i * 16,
      );
      const c = WALLS[Math.floor(hash2(i, 7, 3) * WALLS.length)] ?? WALLS[0];
      if (c) this.colours.set([c.r, c.g, c.b, 1], i * 4);
    }
    this.walls.isVisible = false;
    this.roofs.isVisible = false;
  }

  get meshes(): readonly Mesh[] {
    return [this.walls, this.roofs];
  }

  distanceOrder(centre: GridRef, radius: number): Int32Array {
    const d = this.footprints.data;
    const ids: number[] = [];
    for (let i = 0; i < this.footprints.count; i++) {
      const dist = Math.hypot((d[i * 5] ?? 0) - centre.e, (d[i * 5 + 1] ?? 0) - centre.n);
      if (dist <= radius) ids.push(i);
    }
    ids.sort((a, b) => {
      const da = Math.hypot((d[a * 5] ?? 0) - centre.e, (d[a * 5 + 1] ?? 0) - centre.n);
      const db = Math.hypot((d[b * 5] ?? 0) - centre.e, (d[b * 5 + 1] ?? 0) - centre.n);
      return da - db;
    });
    return Int32Array.from(ids);
  }

  countrysideOrder(exclude: GridRef, radius: number): Int32Array {
    const d = this.footprints.data;
    const ids: number[] = [];
    for (let i = 0; i < this.footprints.count; i++) {
      if (Math.hypot((d[i * 5] ?? 0) - exclude.e, (d[i * 5 + 1] ?? 0) - exclude.n) > radius) ids.push(i);
    }
    ids.sort((a, b) => hash2(a, 11, 5) - hash2(b, 11, 5));
    return Int32Array.from(ids);
  }

  show(selections: readonly { id: string; order: Int32Array; count: number }[]): void {
    const key = selections.map((s) => `${s.id}:${s.count}`).join('|');
    if (key === this.lastKey) return;
    this.lastKey = key;
    const chosen = new Set<number>();
    for (const s of selections)
      for (let i = 0; i < s.count && i < s.order.length; i++) chosen.add(s.order[i] ?? 0);
    const n = chosen.size;
    const m = new Float32Array(Math.max(1, n) * 16);
    const rm = new Float32Array(Math.max(1, n) * 16);
    const c = new Float32Array(Math.max(1, n) * 4);
    let k = 0;
    for (const id of chosen) {
      m.set(this.matrices.subarray(id * 16, id * 16 + 16), k * 16);
      rm.set(this.roofMatrices.subarray(id * 16, id * 16 + 16), k * 16);
      c.set(this.colours.subarray(id * 4, id * 4 + 4), k * 4);
      k++;
    }
    this.walls.thinInstanceSetBuffer('matrix', m, 16, false);
    this.walls.thinInstanceSetBuffer('color', c, 4, false);
    this.walls.thinInstanceCount = n;
    this.roofs.thinInstanceSetBuffer('matrix', rm, 16, false);
    this.roofs.thinInstanceCount = n;
    this.walls.isVisible = n > 0;
    this.roofs.isVisible = n > 0;
  }
}

export function lineRibbons(
  scene: Scene,
  name: string,
  lines: readonly MapLine[],
  ground: Ground,
  widthFor: (kind: string) => number,
  colour: string,
  lift: number,
): Mesh {
  const positions: number[] = [];
  const indices: number[] = [];
  let v = 0;
  for (const line of lines) {
    const w = widthFor(line.kind);
    if (w <= 0) continue;
    const pts = line.points.map((p) => ({
      x: (p.e - WORLD.centre.e) / WORLD.metresPerUnit,
      z: (p.n - WORLD.centre.n) / WORLD.metresPerUnit,
    }));
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const a = pts[Math.max(0, i - 1)];
      const b = pts[Math.min(pts.length - 1, i + 1)];
      if (!p || !a || !b) continue;
      const len = Math.hypot(b.x - a.x, b.z - a.z) || 1;
      const nx = (-(b.z - a.z) / len) * (w / 2);
      const nz = ((b.x - a.x) / len) * (w / 2);
      const y = ground(p.x, p.z) + lift;
      positions.push(p.x + nx, y, p.z + nz, p.x - nx, y, p.z - nz);
      if (i > 0) indices.push(v - 2, v - 1, v, v - 1, v + 1, v);
      v += 2;
    }
  }
  const mesh = new Mesh(name, scene);
  const data = new VertexData();
  data.positions = positions;
  data.indices = indices;
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);
  data.normals = normals;
  data.applyToMesh(mesh);
  const mat = new StandardMaterial(`${name}-mat`, scene);
  mat.diffuseColor = Color3.FromHexString(colour);
  mat.specularColor = Color3.Black();
  mat.backFaceCulling = false;
  mat.zOffset = -1;
  mesh.material = mat;
  mesh.receiveShadows = true;
  mesh.isPickable = false;
  return mesh;
}

export class Train {
  readonly mesh: Mesh;
  private readonly path: { x: number; y: number; z: number }[];
  private readonly lengths: number[];
  private readonly total: number;
  private distance = 0;

  constructor(scene: Scene, line: MapLine, ground: Ground) {
    this.path = line.points.map((p) => {
      const x = (p.e - WORLD.centre.e) / WORLD.metresPerUnit;
      const z = (p.n - WORLD.centre.n) / WORLD.metresPerUnit;
      return { x, y: ground(x, z) + 0.4, z };
    });
    this.lengths = [0];
    for (let i = 1; i < this.path.length; i++) {
      const a = this.path[i - 1];
      const b = this.path[i];
      this.lengths.push((this.lengths[i - 1] ?? 0) + (a && b ? Math.hypot(b.x - a.x, b.z - a.z) : 0));
    }
    this.total = this.lengths[this.lengths.length - 1] ?? 0;
    const parts = [box(scene, 3.2, 1.5, 1.2, '#2f3437'), box(scene, 0.5, 1, 0.5, '#2f3437')];
    parts[1]?.position.set(1.1, 1.5, 0);
    parts[1]?.bakeCurrentTransformIntoVertices();
    for (let c = 0; c < 3; c++) {
      const car = box(scene, 3.6, 1.4, 1.15, c % 2 ? '#7b2d26' : '#8a3a2e');
      car.position.x = -4 - c * 4;
      car.bakeCurrentTransformIntoVertices();
      parts.push(car);
    }
    this.mesh = merge('train', parts);
    const mat = new StandardMaterial('train-mat', scene);
    mat.specularColor = new Color3(0.2, 0.2, 0.2);
    this.mesh.material = mat;
    this.mesh.isVisible = false;
  }

  step(dt: number, visible: boolean): void {
    this.mesh.isVisible = visible && this.total > 0;
    if (!this.mesh.isVisible) return;
    this.distance = (this.distance + dt * 0.012) % (this.total * 2);
    const d = this.distance > this.total ? this.total * 2 - this.distance : this.distance;
    const forward = this.distance <= this.total;
    let i = 1;
    while (i < this.lengths.length - 1 && (this.lengths[i] ?? 0) < d) i++;
    const a = this.path[i - 1];
    const b = this.path[i];
    if (!a || !b) return;
    const seg = (this.lengths[i] ?? 0) - (this.lengths[i - 1] ?? 0) || 1;
    const f = (d - (this.lengths[i - 1] ?? 0)) / seg;
    this.mesh.position.set(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, a.z + (b.z - a.z) * f);
    const heading = Math.atan2(b.z - a.z, b.x - a.x);
    this.mesh.rotation.y = -heading + (forward ? 0 : Math.PI);
  }
}

export function longestLine(lines: readonly MapLine[]): MapLine | undefined {
  let best: MapLine | undefined;
  let bestLen = 0;
  for (const l of lines) {
    let len = 0;
    for (let i = 1; i < l.points.length; i++) {
      const a = l.points[i - 1];
      const b = l.points[i];
      if (a && b) len += Math.hypot(b.e - a.e, b.n - a.n);
    }
    if (len > bestLen) {
      bestLen = len;
      best = l;
    }
  }
  return best;
}
