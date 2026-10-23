import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Delaunator from 'delaunator';
import { describe, expect, it } from 'vitest';
import { WORLD } from '../src/domain/geo.ts';
import { nearAnyRim, parseManifest, RIM_SPACING, rimDistance, RimProfiles } from '../src/domain/lidar.ts';
import type { GridRef } from '../src/domain/model.ts';
import { rng } from '../src/domain/noise.ts';
import { treeSites, type TreeSite } from '../src/domain/tree.ts';

const manifest = parseManifest(
  JSON.parse(readFileSync(join(import.meta.dirname, '..', 'public', 'data', 'lidar', 'lidar.json'), 'utf8')),
);
const { regions } = manifest;
// One box round every region, so the scatter holds all of them and the ground between.
const region = {
  eMin: Math.min(...regions.map((r) => r.eMin)),
  eMax: Math.max(...regions.map((r) => r.eMax)),
  nMin: Math.min(...regions.map((r) => r.nMin)),
  nMax: Math.max(...regions.map((r) => r.nMax)),
};
const FAR_M = 500;
const SPACING_M = 105;

function scatter(): GridRef[] {
  const random = rng(1282);
  const points: GridRef[] = [];
  for (let n = region.nMin - 3000; n <= region.nMax + 3000; n += SPACING_M)
    for (let e = region.eMin - 3000; e <= region.eMax + 3000; e += SPACING_M)
      points.push({
        e: e + (random() - 0.5) * SPACING_M * 0.7,
        n: n + (random() - 0.5) * SPACING_M * 0.7,
      });
  return points;
}

interface Triangulation {
  readonly centres: Map<string, { readonly index: number; readonly at: GridRef }>;
  readonly sites: Map<number, TreeSite>;
}

function triangulate(points: readonly GridRef[]): Triangulation {
  const coords = new Float64Array(points.length * 2);
  points.forEach((p, i) => {
    coords[i * 2] = p.e;
    coords[i * 2 + 1] = p.n;
  });
  const corners = new Delaunator(coords).triangles;
  const count = corners.length / 3;
  const cx = new Float32Array(count);
  const cz = new Float32Array(count);
  const centres = new Map<string, { index: number; at: GridRef }>();
  for (let t = 0; t < count; t++) {
    const ring = [0, 1, 2].map((k) => points[corners[t * 3 + k] ?? 0] ?? { e: 0, n: 0 });
    const e = ring.reduce((sum, p) => sum + p.e, 0) / 3;
    const n = ring.reduce((sum, p) => sum + p.n, 0) / 3;
    cx[t] = (e - WORLD.centre.e) / WORLD.metresPerUnit;
    cz[t] = (n - WORLD.centre.n) / WORLD.metresPerUnit;
    centres.set(`${String(cx[t])},${String(cz[t])}`, { index: t, at: { e, n } });
  }
  const sites = new Map(
    treeSites({ count, cx, cz, heightM: new Float32Array(count) }).map((s) => [s.tri, s] as const),
  );
  return { centres, sites };
}

const withoutIndex = (s: TreeSite | undefined): unknown =>
  s && { seed: s.seed, traits: s.traits, x: s.x, z: s.z, conifer: s.conifer, heightM: s.heightM };

describe('a tree keeps its identity when the LiDAR rims renumber the coarse mesh', () => {
  const plain = scatter();
  const rim = new RimProfiles(regions, RIM_SPACING, () => 0);
  const withRim = [...plain.filter((p) => !nearAnyRim(regions, p)), ...rim.points];
  const before = triangulate(plain);
  const after = triangulate(withRim);
  // More than 500m outside every region (a point inside one is never far).
  function far(g: GridRef): boolean {
    return regions.every((r) => {
      const outside = g.e < r.eMin || g.e > r.eMax || g.n < r.nMin || g.n > r.nMax;
      return outside && rimDistance(r, g) > FAR_M;
    });
  }

  const shared = [...before.centres].filter(([key, t]) => far(t.at) && after.centres.has(key));

  it('shares most of the triangles more than 500m outside the region, at the same centres', () => {
    const farBefore = [...before.centres.values()].filter((t) => far(t.at)).length;
    expect(farBefore).toBeGreaterThan(10_000);
    expect(shared.length / farBefore).toBeGreaterThan(0.99);
  });

  it('renumbers those triangles, so a seed taken from the index would change them', () => {
    const moved = shared.filter(([key, t]) => after.centres.get(key)?.index !== t.index).length;
    expect(moved / shared.length).toBeGreaterThan(0.9);
  });

  it('gives each such triangle the same tree, seed, position and traits, in both', () => {
    const differing: string[] = [];
    let planted = 0;
    for (const [key, t] of shared) {
      const a = before.sites.get(t.index);
      const b = after.sites.get(after.centres.get(key)?.index ?? -1);
      if (a) planted++;
      if (JSON.stringify(withoutIndex(a)) !== JSON.stringify(withoutIndex(b))) differing.push(key);
    }
    expect(planted).toBeGreaterThan(1000);
    expect(
      differing.length,
      `${String(differing.length)} trees changed, first at ${differing[0] ?? '-'}`,
    ).toBe(0);
  });
});
