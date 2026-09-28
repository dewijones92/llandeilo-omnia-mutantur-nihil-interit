import {
  Color3,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  VertexBuffer,
  VertexData,
  type Scene,
} from './babylon.ts';
import { hex, type Rgb } from '../domain/colour.ts';

export type Colour = Rgb | string;

function rgb(c: Colour): Rgb {
  return typeof c === 'string' ? hex(c) : c;
}

export function paint(mesh: Mesh, colour: Colour, shadeTop = 1, shadeBottom = 0.82): Mesh {
  const c = rgb(colour);
  const count = mesh.getTotalVertices();
  const pos = mesh.getVerticesData(VertexBuffer.PositionKind) ?? [];
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < count; i++) {
    const y = pos[i * 3 + 1] ?? 0;
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const span = maxY - minY || 1;
  const cols = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    const f = ((pos[i * 3 + 1] ?? 0) - minY) / span;
    const s = shadeBottom + (shadeTop - shadeBottom) * f;
    cols.set([c.r * s, c.g * s, c.b * s, 1], i * 4);
  }
  mesh.setVerticesData(VertexBuffer.ColorKind, cols);
  return mesh;
}

export function solidMaterial(scene: Scene, name: string): StandardMaterial {
  const mat = new StandardMaterial(name, scene);
  mat.specularColor = new Color3(0.04, 0.04, 0.04);
  mat.emissiveColor = new Color3(0.2, 0.19, 0.18);
  return mat;
}

export function place(mesh: Mesh, x: number, y: number, z: number, rotY = 0): Mesh {
  mesh.rotation.y = rotY;
  mesh.position = new Vector3(x, y, z);
  mesh.bakeCurrentTransformIntoVertices();
  return mesh;
}

export function box(scene: Scene, w: number, h: number, d: number, colour: Colour): Mesh {
  const m = MeshBuilder.CreateBox('b', { width: w, height: h, depth: d }, scene);
  m.position.y = h / 2;
  m.bakeCurrentTransformIntoVertices();
  return paint(m, colour);
}

export function cylinder(scene: Scene, d: number, h: number, colour: Colour, tess = 10, top = d): Mesh {
  const m = MeshBuilder.CreateCylinder(
    'c',
    { diameterBottom: d, diameterTop: top, height: h, tessellation: tess },
    scene,
  );
  m.position.y = h / 2;
  m.bakeCurrentTransformIntoVertices();
  return paint(m, colour);
}

export function cone(scene: Scene, d: number, h: number, colour: Colour, tess = 10): Mesh {
  return cylinder(scene, d, h, colour, tess, 0);
}

export function gable(scene: Scene, w: number, d: number, h: number, colour: Colour): Mesh {
  const hw = w / 2;
  const hd = d / 2;
  // prettier-ignore
  const positions = [
    -hw, 0, -hd, hw, 0, -hd, hw, h, 0, -hw, h, 0,
    -hw, 0, hd, -hw, h, 0, hw, h, 0, hw, 0, hd,
    -hw, 0, -hd, -hw, h, 0, -hw, 0, hd,
    hw, 0, -hd, hw, 0, hd, hw, h, 0,
  ];
  const indices = [0, 2, 1, 0, 3, 2, 4, 6, 5, 4, 7, 6, 8, 10, 9, 11, 13, 12];
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);
  const m = new Mesh('gable', scene);
  const data = new VertexData();
  data.positions = positions;
  data.indices = indices;
  data.normals = normals;
  data.applyToMesh(m);
  return paint(m, colour, 1.05, 0.85);
}

function normalise(m: Mesh): void {
  for (const kind of m.getVerticesDataKinds()) {
    if (
      kind !== VertexBuffer.PositionKind &&
      kind !== VertexBuffer.NormalKind &&
      kind !== VertexBuffer.ColorKind
    ) {
      m.removeVerticesData(kind);
    }
  }
  if (!m.isVerticesDataPresent(VertexBuffer.NormalKind)) {
    const normals: number[] = [];
    VertexData.ComputeNormals(
      m.getVerticesData(VertexBuffer.PositionKind) ?? [],
      m.getIndices() ?? [],
      normals,
    );
    m.setVerticesData(VertexBuffer.NormalKind, normals);
  }
  if (!m.isVerticesDataPresent(VertexBuffer.ColorKind)) paint(m, '#ffffff');
}

export function merge(name: string, parts: readonly Mesh[]): Mesh {
  for (const p of parts) normalise(p);
  const merged = Mesh.MergeMeshes([...parts], true, true);
  if (!merged) throw new Error(`merge failed for ${name}`);
  merged.name = name;
  merged.convertToFlatShadedMesh();
  merged.useVertexColors = true;
  merged.isPickable = false;
  return merged;
}
