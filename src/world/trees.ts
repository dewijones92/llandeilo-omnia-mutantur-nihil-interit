import {
  Color3,
  Matrix,
  Mesh,
  MeshBuilder,
  Quaternion,
  StandardMaterial,
  Vector3,
  VertexData,
  type Scene,
} from '@babylonjs/core';
import { hash2 } from '../domain/noise.ts';
import { COVER_CODE, type Terrain } from './terrain.ts';

interface Candidate {
  readonly tri: number;
  readonly matrix: Float32Array;
  readonly colour: readonly [number, number, number];
  readonly conifer: boolean;
}

/** Instanced low-poly trees, shown where the terrain is currently woodland. */
export class Forest {
  private readonly broadleaf: Mesh;
  private readonly conifer: Mesh;
  private readonly candidates: readonly Candidate[];
  private lastVisible = -1;

  constructor(
    scene: Scene,
    private readonly terrain: Terrain,
  ) {
    const mat = new StandardMaterial('tree-mat', scene);
    mat.specularColor = new Color3(0.03, 0.03, 0.03);
    this.broadleaf = makeBroadleaf(scene, mat);
    this.conifer = makeConifer(scene, mat);
    const list: Candidate[] = [];
    const t = terrain.tris;
    for (let i = 0; i < t.count; i++) {
      const r = hash2(i, 91, 5);
      if (r > 0.62) continue;
      const scale = 3.2 + hash2(i, 17, 2) * 2.4;
      const rot = Quaternion.RotationAxis(Vector3.Up(), hash2(i, 3, 9) * Math.PI * 2);
      const jx = (hash2(i, 5, 1) - 0.5) * 3;
      const jz = (hash2(i, 6, 1) - 0.5) * 3;
      const m = Matrix.Compose(
        new Vector3(scale, scale * (0.9 + hash2(i, 8, 3) * 0.35), scale),
        rot,
        new Vector3((t.cx[i] ?? 0) + jx, (t.cy[i] ?? 0) - 0.3, (t.cz[i] ?? 0) + jz),
      );
      const g = 0.75 + hash2(i, 12, 4) * 0.35;
      const conifer = (t.heightM[i] ?? 0) > 330 || hash2(i, 44, 8) > 0.9;
      const colour: readonly [number, number, number] = conifer
        ? [0.2 * g, 0.42 * g, 0.3 * g]
        : [0.28 * g, 0.5 * g, 0.26 * g];
      const arr = new Float32Array(16);
      m.copyToArray(arr);
      list.push({ tri: i, matrix: arr, colour, conifer });
    }
    this.candidates = list;
    console.info(`dewidebug forest candidates=${list.length}`);
  }

  get meshes(): readonly Mesh[] {
    return [this.broadleaf, this.conifer];
  }

  update(): void {
    const code = COVER_CODE.wood;
    const broad: Candidate[] = [];
    const con: Candidate[] = [];
    for (const c of this.candidates) {
      if (this.terrain.cover[c.tri] === code) (c.conifer ? con : broad).push(c);
    }
    const visible = broad.length + con.length;
    if (visible === this.lastVisible) return;
    this.lastVisible = visible;
    apply(this.broadleaf, broad);
    apply(this.conifer, con);
  }
}

function apply(mesh: Mesh, list: readonly Candidate[]): void {
  const matrices = new Float32Array(Math.max(1, list.length) * 16);
  const colours = new Float32Array(Math.max(1, list.length) * 4);
  list.forEach((c, i) => {
    matrices.set(c.matrix, i * 16);
    colours.set([c.colour[0], c.colour[1], c.colour[2], 1], i * 4);
  });
  mesh.thinInstanceSetBuffer('matrix', matrices, 16, false);
  mesh.thinInstanceSetBuffer('color', colours, 4, false);
  mesh.thinInstanceCount = list.length;
  mesh.isVisible = list.length > 0;
}

function makeBroadleaf(scene: Scene, mat: StandardMaterial): Mesh {
  const crown = MeshBuilder.CreateIcoSphere('crown', { radius: 1, subdivisions: 1, flat: true }, scene);
  crown.scaling = new Vector3(1, 0.85, 1);
  crown.position.y = 1.55;
  crown.bakeCurrentTransformIntoVertices();
  const trunk = MeshBuilder.CreateCylinder(
    'trunk',
    { height: 1, diameterTop: 0.18, diameterBottom: 0.26, tessellation: 5 },
    scene,
  );
  trunk.position.y = 0.5;
  trunk.bakeCurrentTransformIntoVertices();
  return merge('broadleaf', crown, trunk, mat);
}

function makeConifer(scene: Scene, mat: StandardMaterial): Mesh {
  const lower = MeshBuilder.CreateCylinder(
    'lower',
    { height: 1.6, diameterTop: 0, diameterBottom: 1.5, tessellation: 6 },
    scene,
  );
  lower.position.y = 1.3;
  lower.bakeCurrentTransformIntoVertices();
  const upper = MeshBuilder.CreateCylinder(
    'upper',
    { height: 1.2, diameterTop: 0, diameterBottom: 1.05, tessellation: 6 },
    scene,
  );
  upper.position.y = 2.1;
  upper.bakeCurrentTransformIntoVertices();
  const trunk = MeshBuilder.CreateCylinder('ctrunk', { height: 0.7, diameter: 0.2, tessellation: 5 }, scene);
  trunk.position.y = 0.35;
  trunk.bakeCurrentTransformIntoVertices();
  const top = merge('conifer-top', lower, upper, mat);
  return merge('conifer', top, trunk, mat);
}

function merge(name: string, a: Mesh, b: Mesh, mat: StandardMaterial): Mesh {
  const tint = (m: Mesh, c: number): void => {
    const count = m.getTotalVertices();
    const cols = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) cols.set([c, c, c, 1], i * 4);
    m.setVerticesData('color', cols);
  };
  tint(a, 1);
  tint(b, 0.55);
  const merged = Mesh.MergeMeshes([a, b], true, true);
  if (!merged) throw new Error(`Could not merge ${name}`);
  merged.name = name;
  merged.material = mat;
  merged.useVertexColors = true;
  merged.isPickable = false;
  merged.receiveShadows = true;
  const data = VertexData.ExtractFromMesh(merged);
  data.applyToMesh(merged);
  return merged;
}
