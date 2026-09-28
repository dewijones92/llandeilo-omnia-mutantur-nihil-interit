import { Mesh, VertexData, type Scene } from './babylon.ts';
import type { Rgb } from '../domain/colour.ts';

export type V3 = readonly [number, number, number];
export type V2 = readonly [number, number];

const SHADE_BOTTOM = 0.8;

export class Sculpt {
  private readonly positions: number[] = [];
  private readonly colours: number[] = [];
  private bandLow = 0;
  private bandHigh = 1;

  band(low: number, high: number): this {
    this.bandLow = low;
    this.bandHigh = high > low ? high : low + 1;
    return this;
  }

  get triangles(): number {
    return this.positions.length / 9;
  }

  tri(a: V3, b: V3, c: V3, colour: Rgb, inside: V3): void {
    const ux = b[0] - a[0];
    const uy = b[1] - a[1];
    const uz = b[2] - a[2];
    const vx = c[0] - a[0];
    const vy = c[1] - a[1];
    const vz = c[2] - a[2];
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const ox = (a[0] + b[0] + c[0]) / 3 - inside[0];
    const oy = (a[1] + b[1] + c[1]) / 3 - inside[1];
    const oz = (a[2] + b[2] + c[2]) / 3 - inside[2];
    const order = nx * ox + ny * oy + nz * oz >= 0 ? [a, c, b] : [a, b, c];
    for (const p of order) {
      this.positions.push(p[0], p[1], p[2]);
      const f = Math.min(1, Math.max(0, (p[1] - this.bandLow) / (this.bandHigh - this.bandLow)));
      const s = SHADE_BOTTOM + (1 - SHADE_BOTTOM) * f;
      this.colours.push(colour.r * s, colour.g * s, colour.b * s, 1);
    }
  }

  quad(a: V3, b: V3, c: V3, d: V3, colour: Rgb, inside: V3): void {
    this.tri(a, b, c, colour, inside);
    this.tri(a, c, d, colour, inside);
  }

  prism(outline: readonly V2[], bottom: number, top: number, colour: Rgb, cap = true): void {
    const n = outline.length;
    if (n < 3 || top <= bottom) return;
    let cx = 0;
    let cz = 0;
    for (const [x, z] of outline) {
      cx += x / n;
      cz += z / n;
    }
    const inside: V3 = [cx, (bottom + top) / 2, cz];
    for (let i = 0; i < n; i++) {
      const p = outline[i];
      const q = outline[(i + 1) % n];
      if (!p || !q) continue;
      this.quad(
        [p[0], bottom, p[1]],
        [q[0], bottom, q[1]],
        [q[0], top, q[1]],
        [p[0], top, p[1]],
        colour,
        inside,
      );
      if (cap) this.tri([p[0], top, p[1]], [q[0], top, q[1]], [cx, top, cz], colour, [cx, top - 1, cz]);
    }
  }

  frustum(outline: readonly V2[], inner: readonly V2[], bottom: number, top: number, colour: Rgb): void {
    const n = Math.min(outline.length, inner.length);
    if (top <= bottom) return;
    let cx = 0;
    let cz = 0;
    for (const [x, z] of inner) {
      cx += x / n;
      cz += z / n;
    }
    const centre: V3 = [cx, (bottom + top) / 2, cz];
    for (let i = 0; i < n; i++) {
      const p = outline[i];
      const q = outline[(i + 1) % n];
      const pi = inner[i];
      const qi = inner[(i + 1) % n];
      if (!p || !q || !pi || !qi) continue;
      this.quad(
        [p[0], bottom, p[1]],
        [q[0], bottom, q[1]],
        [qi[0], top, qi[1]],
        [pi[0], top, pi[1]],
        colour,
        centre,
      );
    }
  }

  cone(outline: readonly V2[], bottom: number, apex: V3, colour: Rgb): void {
    const n = outline.length;
    const inside: V3 = [apex[0], bottom, apex[2]];
    for (let i = 0; i < n; i++) {
      const p = outline[i];
      const q = outline[(i + 1) % n];
      if (!p || !q) continue;
      this.tri([p[0], bottom, p[1]], [q[0], bottom, q[1]], apex, colour, inside);
    }
  }

  ribbon(left: readonly V3[], right: readonly V3[], colour: Rgb): void {
    for (let i = 0; i + 1 < left.length && i + 1 < right.length; i++) {
      const a = left[i];
      const b = left[i + 1];
      const c = right[i + 1];
      const d = right[i];
      if (!a || !b || !c || !d) continue;
      const below: V3 = [(a[0] + c[0]) / 2, Math.min(a[1], b[1], c[1], d[1]) - 10, (a[2] + c[2]) / 2];
      this.quad(a, b, c, d, colour, below);
    }
  }

  toMesh(scene: Scene, name: string): Mesh {
    const indices = Array.from({ length: this.positions.length / 3 }, (_, i) => i);
    const normals: number[] = [];
    VertexData.ComputeNormals(this.positions, indices, normals);
    const data = new VertexData();
    data.positions = this.positions;
    data.indices = indices;
    data.normals = normals;
    data.colors = this.colours;
    const mesh = new Mesh(name, scene);
    data.applyToMesh(mesh);
    mesh.useVertexColors = true;
    mesh.isPickable = false;
    return mesh;
  }
}

export function ring(cx: number, cz: number, radius: number, sides: number, turn = 0): V2[] {
  return Array.from({ length: sides }, (_, i): V2 => {
    const a = turn + (i / sides) * Math.PI * 2;
    return [cx + Math.cos(a) * radius, cz + Math.sin(a) * radius];
  });
}

export function rect(cx: number, cz: number, length: number, width: number, angle: number): V2[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const l = length / 2;
  const w = width / 2;
  return (
    [
      [-l, -w],
      [l, -w],
      [l, w],
      [-l, w],
    ] as const
  ).map(([x, z]): V2 => [cx + x * c - z * s, cz + x * s + z * c]);
}
