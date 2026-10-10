import { describe, expect, it } from 'vitest';
import {
  groundTriangleCount,
  tileGeometry,
  tileSurfaceAt,
  tileTriangleCount,
  type TileGeometry,
} from './tilemesh.ts';
import { rng } from './noise.ts';

type V3 = readonly [number, number, number];

function corners(g: TileGeometry, t: number): [V3, V3, V3] {
  const p = g.positions;
  const o = t * 9;
  return [
    [p[o] ?? 0, p[o + 1] ?? 0, p[o + 2] ?? 0],
    [p[o + 3] ?? 0, p[o + 4] ?? 0, p[o + 5] ?? 0],
    [p[o + 6] ?? 0, p[o + 7] ?? 0, p[o + 8] ?? 0],
  ];
}

function cross([a, b, c]: [V3, V3, V3]): V3 {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]] as const;
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]] as const;
  return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
}

function normal(g: TileGeometry, t: number): V3 {
  const n = g.normals;
  return [n[t * 9] ?? 0, n[t * 9 + 1] ?? 0, n[t * 9 + 2] ?? 0];
}

const flat = (cells: number, h = 5): Float32Array => new Float32Array((cells + 1) ** 2).fill(h);

describe('a tile of triangles', () => {
  it('has two triangles a cell and a skirt of two along each edge segment', () => {
    expect(groundTriangleCount(3)).toBe(18);
    expect(tileTriangleCount(3)).toBe(18 + 24);
    const g = tileGeometry(flat(3), 3, 1, 0, 0, 2);
    expect(g.triangles).toBe(42);
    expect(g.groundTriangles).toBe(18);
    expect(g.positions).toHaveLength(42 * 9);
    expect(g.normals).toHaveLength(42 * 9);
  });

  it('lays the cells out from the north-west corner, east then south', () => {
    const g = tileGeometry(flat(2), 2, 10, 100, 200, 1);
    const xs = new Set<number>();
    const zs = new Set<number>();
    for (let t = 0; t < g.groundTriangles; t++)
      for (const [x, , z] of corners(g, t)) {
        xs.add(x);
        zs.add(z);
      }
    expect([...xs].sort((a, b) => a - b)).toEqual([100, 110, 120]);
    expect([...zs].sort((a, b) => a - b)).toEqual([180, 190, 200]);
    const first = corners(g, 0).map(([x, , z]) => [x, z]);
    expect(first).toContainEqual([100, 200]);
  });

  it('faces every ground triangle up, wound so its cross product points down', () => {
    const h = Float32Array.from({ length: 16 }, (_, i) => Math.sin(i) * 3);
    const g = tileGeometry(h, 3, 4, 0, 0, 1);
    for (let t = 0; t < g.groundTriangles; t++) {
      expect(normal(g, t)[1], `normal ${String(t)}`).toBeGreaterThan(0);
      expect(cross(corners(g, t))[1], `winding ${String(t)}`).toBeLessThan(0);
      expect(Math.hypot(...normal(g, t))).toBeCloseTo(1);
    }
  });

  it('tilts the normal with the ground', () => {
    const rise = Float32Array.from({ length: 9 }, (_, i) => (i % 3) * 5);
    const g = tileGeometry(rise, 2, 10, 0, 0, 1);
    const [nx, ny] = normal(g, 0);
    expect(nx).toBeLessThan(0);
    expect(ny).toBeGreaterThan(0);
    expect(nx / ny).toBeCloseTo(-0.5);
  });

  it('splits each cell along the diagonal whose ends are nearer in height', () => {
    const shares = (g: TileGeometry, t: number, x: number, z: number): boolean =>
      corners(g, t).some(([cx, , cz]) => cx === x && cz === z);
    // Cell (0, 0) has corners NW (0, 0), NE (10, 0), SW (0, -10) and SE (10, -10).
    const lowSouthWest = tileGeometry(new Float32Array([0, 0, 0, 9, 0, 0, 0, 0, 0]), 2, 10, 0, 0, 1);
    expect(shares(lowSouthWest, 0, 0, 0) && shares(lowSouthWest, 1, 0, 0)).toBe(true);
    expect(shares(lowSouthWest, 0, 10, -10) && shares(lowSouthWest, 1, 10, -10)).toBe(true);
    const highNorthWest = tileGeometry(new Float32Array([9, 0, 0, 0, 0, 0, 0, 0, 0]), 2, 10, 0, 0, 1);
    expect(shares(highNorthWest, 0, 10, 0) && shares(highNorthWest, 1, 10, 0)).toBe(true);
    expect(shares(highNorthWest, 0, 0, -10) && shares(highNorthWest, 1, 0, -10)).toBe(true);
  });

  it('hangs a skirt of the given depth from each edge, facing outwards', () => {
    const g = tileGeometry(flat(2, 7), 2, 10, 0, 0, 3);
    const skirts: { dir: V3; tri: [V3, V3, V3] }[] = [];
    for (let t = g.groundTriangles; t < g.triangles; t++)
      skirts.push({ dir: normal(g, t), tri: corners(g, t) });
    expect(skirts).toHaveLength(16);
    for (const s of skirts) {
      const ys = s.tri.map((v) => v[1]);
      expect(Math.max(...ys)).toBeCloseTo(7);
      expect(Math.min(...ys)).toBeCloseTo(4);
      expect(s.dir[1]).toBeCloseTo(0);
      const c = cross(s.tri);
      expect(c[0] * s.dir[0] + c[2] * s.dir[2]).toBeLessThan(0);
    }
    const heading = (i: number, x: number, z: number): void => {
      expect(skirts[i]?.dir[0]).toBeCloseTo(x);
      expect(skirts[i]?.dir[2]).toBeCloseTo(z);
    };
    heading(0, 0, 1);
    heading(2, 0, -1);
    heading(4, -1, 0);
    heading(6, 1, 0);
    const north = skirts.slice(0, 2).flatMap((s) => s.tri);
    expect(north.every(([, , z]) => z === 0)).toBe(true);
    const south = skirts.slice(2, 4).flatMap((s) => s.tri);
    expect(south.every(([, , z]) => z === -20)).toBe(true);
    const west = skirts.slice(4, 6).flatMap((s) => s.tri);
    expect(west.every(([x]) => x === 0)).toBe(true);
    const east = skirts.slice(6, 8).flatMap((s) => s.tri);
    expect(east.every(([x]) => x === 20)).toBe(true);
  });

  it('refuses heights that do not fit the cells', () => {
    expect(() => tileGeometry(new Float32Array(5), 2, 1, 0, 0, 1)).toThrow(/expected 9/);
  });
});

describe('the height of the surface a tile draws', () => {
  function drawnBy(g: TileGeometry, x: number, z: number): number | undefined {
    for (let t = 0; t < g.groundTriangles; t++) {
      const [a, b, c] = corners(g, t);
      const det = (b[2] - c[2]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[2] - c[2]);
      const wa = ((b[2] - c[2]) * (x - c[0]) + (c[0] - b[0]) * (z - c[2])) / det;
      const wb = ((c[2] - a[2]) * (x - c[0]) + (a[0] - c[0]) * (z - c[2])) / det;
      const wc = 1 - wa - wb;
      if (wa >= -1e-9 && wb >= -1e-9 && wc >= -1e-9) return wa * a[1] + wb * b[1] + wc * c[1];
    }
    return undefined;
  }

  it('is the height of the triangle drawn there, whichever way the cell is cut', () => {
    const random = rng(7);
    const cells = 6;
    const spacing = 10;
    const heights = new Float32Array((cells + 1) ** 2).map(() => random() * 20);
    const g = tileGeometry(heights, cells, spacing, 100, 300, 2);
    let checked = 0;
    for (let k = 0; k < 400; k++) {
      const x = 100 + random() * cells * spacing;
      const z = 300 - random() * cells * spacing;
      const drawn = drawnBy(g, x, z);
      expect(drawn).toBeDefined();
      expect(tileSurfaceAt(heights, cells, spacing, 100, 300, x, z)).toBeCloseTo(drawn ?? Number.NaN, 4);
      checked++;
    }
    expect(checked).toBe(400);
  });

  it('cuts across a ridge and across a valley differently, as the mesh does', () => {
    const ridge = new Float32Array([0, 9, 0, 9, 0, 0, 0, 0, 0]);
    const valley = new Float32Array([9, 0, 0, 0, 0, 0, 0, 0, 0]);
    const at = (h: Float32Array): number | undefined => tileSurfaceAt(h, 2, 10, 0, 0, 7, -2);
    const mesh = (h: Float32Array): number | undefined => drawnBy(tileGeometry(h, 2, 10, 0, 0, 1), 7, -2);
    expect(at(ridge)).toBeCloseTo(4.5, 5);
    expect(at(valley)).toBeCloseTo(0.9, 5);
    expect(mesh(ridge)).toBeCloseTo(4.5, 4);
    expect(mesh(valley)).toBeCloseTo(0.9, 4);
  });

  it('is exact at the vertices and on the far edges, and absent outside the tile', () => {
    const h = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 0, 0)).toBeCloseTo(1);
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 20, 0)).toBeCloseTo(3);
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 20, -20)).toBeCloseTo(9);
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 0, -20)).toBeCloseTo(7);
    expect(tileSurfaceAt(h, 2, 10, 0, 0, -0.1, -5)).toBeUndefined();
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 5, 0.1)).toBeUndefined();
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 20.1, -5)).toBeUndefined();
    expect(tileSurfaceAt(h, 2, 10, 0, 0, 5, -20.1)).toBeUndefined();
  });

  it('refuses heights that do not fit the cells', () => {
    expect(() => tileSurfaceAt(new Float32Array(5), 2, 1, 0, 0, 0, 0)).toThrow(/expected 9/);
  });
});
