import { describe, expect, it } from 'vitest';
import {
  chooseStep,
  DetailGround,
  drawnSteps,
  insideBounds,
  nearAnyRim,
  parseManifest,
  planSteps,
  regionAt,
  RimProfile,
  RimProfiles,
  rimDistance,
  rimWeight,
  stepForDistance,
  tileDistance,
  tileData,
  tileKey,
  type LidarTileInfo,
} from './lidar.ts';

const REGION = { eMin: 0, eMax: 200, nMin: 0, nMax: 100 };

function rawTile(e: number, over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    e,
    n: 0,
    step: 50,
    offset: Math.abs(e / 100) * 18,
    bytes: 18,
    minHeight: 1,
    maxHeight: 9,
    areas: ['town'],
    ...over,
  };
}

function rawManifest(): Record<string, unknown> {
  return {
    crs: 'EPSG:27700',
    data: 'lidar.bin',
    tileSize: 100,
    heightScale: 0.1,
    blendMetres: 20,
    sceneOrigin: { e: 0, n: 0 },
    regions: [{ id: 'valley', name: 'Valley', ...REGION }],
    areas: [
      {
        id: 'town',
        name: 'Town',
        region: 'valley',
        centre: { e: 100, n: 50 },
        eMin: 0,
        eMax: 200,
        nMin: 0,
        nMax: 100,
      },
    ],
    tiles: [rawTile(0), rawTile(100)],
    source: { credit: 'Contains test data' },
  };
}

function ground(): DetailGround {
  const manifest = parseManifest(rawManifest());
  const west = Uint16Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  const east = Uint16Array.from([30, 31, 32, 60, 61, 62, 90, 91, 92]);
  return new DetailGround(
    manifest,
    new Map([
      [tileKey(0, 0), west],
      [tileKey(100, 0), east],
    ]),
  );
}

describe('level of detail', () => {
  it('uses finer steps nearer the eye', () => {
    expect(stepForDistance(0)).toBe(4);
    expect(stepForDistance(319)).toBe(4);
    expect(stepForDistance(320)).toBe(10);
    expect(stepForDistance(849)).toBe(10);
    expect(stepForDistance(850)).toBe(20);
    expect(stepForDistance(1e6)).toBe(20);
  });

  it('never goes finer than the data in the tile', () => {
    expect(chooseStep(50, 2)).toBe(4);
    expect(chooseStep(50, 10)).toBe(10);
    expect(chooseStep(300, 10)).toBe(10);
    expect(chooseStep(5000, 10)).toBe(20);
  });

  it('lists every step a tile can be drawn at, and chooseStep only ever picks from them', () => {
    expect(drawnSteps(2)).toEqual([4, 10, 20]);
    expect(drawnSteps(10)).toEqual([10, 20]);
    expect(drawnSteps(25)).toEqual([25]);
    for (const tileStep of [2, 10, 25])
      for (let d = 0; d < 3000; d += 7)
        for (const current of [undefined, 4, 10, 20, 25])
          expect(drawnSteps(tileStep)).toContain(chooseStep(d, tileStep, current));
  });

  it('keeps the current step through a small wobble around a band edge', () => {
    expect(chooseStep(340, 2, 4)).toBe(4);
    expect(chooseStep(300, 2, 10)).toBe(10);
    expect(chooseStep(450, 2, 4)).toBe(10);
    expect(chooseStep(180, 2, 10)).toBe(4);
  });

  it('measures from the eye to the nearest point of the tile, height included', () => {
    const tile = { eMin: 0, eMax: 500, nMin: 0, nMax: 500, maxHeight: 50 };
    expect(tileDistance(tile, { e: 250, n: 250, height: 150 })).toBeCloseTo(100);
    expect(tileDistance(tile, { e: 1000, n: 250, height: 50 })).toBeCloseTo(500);
    expect(tileDistance(tile, { e: 1000, n: 1000, height: 50 })).toBeCloseTo(Math.hypot(500, 500));
    expect(tileDistance(tile, { e: 250, n: 250, height: 20 })).toBe(0);
  });

  it('plans a step for every tile, finest where the eye is', () => {
    const info = (e: number, step: number): LidarTileInfo => ({
      e,
      n: 0,
      step,
      offset: 0,
      bytes: 0,
      minHeight: 0,
      maxHeight: 10,
      areas: [],
    });
    const tiles = [info(0, 2), info(500, 2), info(5000, 2), info(1000, 10)];
    const plan = planSteps(tiles, 500, { e: 250, n: 250, height: 60 }, new Map());
    expect(plan.get(tileKey(0, 0))).toBe(4);
    expect(plan.get(tileKey(500, 0))).toBe(4);
    expect(plan.get(tileKey(5000, 0))).toBe(20);
    expect(plan.get(tileKey(1000, 0))).toBe(10);
    expect(plan.size).toBe(4);
  });
});

describe('the rim of the detail region', () => {
  it('has no weight on or outside the rim, and full weight past the margin', () => {
    expect(rimWeight({ e: 0, n: 50 }, REGION, 20)).toBe(0);
    expect(rimWeight({ e: -5, n: 50 }, REGION, 20)).toBe(0);
    expect(rimWeight({ e: 20, n: 50 }, REGION, 20)).toBe(1);
    expect(rimWeight({ e: 100, n: 50 }, REGION, 20)).toBe(1);
  });

  it('eases in with a smooth step, nearest edge winning at a corner', () => {
    expect(rimWeight({ e: 10, n: 50 }, REGION, 20)).toBeCloseTo(0.5);
    expect(rimWeight({ e: 5, n: 5 }, REGION, 20)).toBeCloseTo(0.15625);
    expect(rimWeight({ e: 195, n: 50 }, REGION, 20)).toBeCloseTo(0.15625);
  });

  it('says whether a point is inside the region', () => {
    expect(insideBounds(REGION, { e: 100, n: 50 })).toBe(true);
    expect(insideBounds(REGION, { e: 0, n: 0 })).toBe(true);
    expect(insideBounds(REGION, { e: 201, n: 50 })).toBe(false);
    expect(insideBounds(REGION, { e: 100, n: -1 })).toBe(false);
  });
});

describe('the rim profile', () => {
  const base = (g: { e: number; n: number }): number => (g.e * g.e) / 100 + g.n;

  it('has a point every spacing along all four edges, corners included', () => {
    const rim = new RimProfile(REGION, 50, base);
    expect(rim.points).toHaveLength(12);
    expect(rim.points).toContainEqual({ e: 0, n: 0 });
    expect(rim.points).toContainEqual({ e: 200, n: 100 });
    expect(rim.points).toContainEqual({ e: 100, n: 100 });
    expect(rim.points).toContainEqual({ e: 0, n: 50 });
  });

  it('matches the base surface at its points and is straight between them', () => {
    const rim = new RimProfile(REGION, 50, base);
    expect(rim.heightAt({ e: 50, n: 0 })).toBeCloseTo(25);
    expect(rim.heightAt({ e: 25, n: 0 })).toBeCloseTo(12.5);
    expect(rim.heightAt({ e: 200, n: 75 })).toBeCloseTo(475);
    expect(rim.heightAt({ e: 150, n: 100 })).toBeCloseTo(base({ e: 150, n: 100 }));
    expect(rim.heightAt({ e: 0, n: 0 })).toBeCloseTo(0);
    expect(rim.heightAt({ e: 0, n: 25 })).toBeCloseTo(25);
  });

  it('has no height inside the region, off the rim', () => {
    const rim = new RimProfile(REGION, 50, base);
    expect(rim.heightAt({ e: 25, n: 50 })).toBeUndefined();
    expect(rim.heightAt({ e: 100, n: 50 })).toBeUndefined();
    expect(rim.heightAt({ e: 300, n: 0 })).toBeUndefined();
  });

  it('refuses a spacing that does not divide the edges', () => {
    expect(() => new RimProfile(REGION, 30, base)).toThrow(/spacing/);
  });
});

describe('the detail ground', () => {
  it('returns the vertex heights exactly and interpolates between them', () => {
    const g = ground();
    expect(g.lidarAt({ e: 0, n: 100 })).toBeCloseTo(1);
    expect(g.lidarAt({ e: 50, n: 50 })).toBeCloseTo(5);
    expect(g.lidarAt({ e: 25, n: 100 })).toBeCloseTo(1.5);
    expect(g.lidarAt({ e: 150, n: 50 })).toBeCloseTo(6.1);
  });

  it('agrees on the vertices that two tiles share', () => {
    const g = ground();
    expect(g.lidarAt({ e: 100, n: 0 })).toBeCloseTo(9);
    expect(g.lidarAt({ e: 99.999, n: 0 })).toBeCloseTo(9, 2);
    expect(g.lidarAt({ e: 100, n: 100 })).toBeCloseTo(3);
  });

  it('reads the far rim of the region from the last tile', () => {
    const g = ground();
    expect(g.lidarAt({ e: 200, n: 50 })).toBeCloseTo(6.2);
    expect(g.lidarAt({ e: 200, n: 100 })).toBeCloseTo(3.2);
  });

  it('has nothing outside the region', () => {
    const g = ground();
    expect(g.contains({ e: 100, n: 50 })).toBe(true);
    expect(g.contains({ e: 250, n: 50 })).toBe(false);
    expect(g.lidarAt({ e: 250, n: 50 })).toBeUndefined();
    expect(g.metresAt({ e: 250, n: 50 }, 77)).toBe(77);
  });

  it('blends from the base surface at the rim to the LiDAR a margin inside', () => {
    const g = ground();
    expect(g.metresAt({ e: 0, n: 50 }, 100)).toBeCloseTo(100);
    expect(g.metresAt({ e: 50, n: 50 }, 100)).toBeCloseTo(5);
    expect(g.metresAt({ e: 10, n: 50 }, 100)).toBeCloseTo(0.5 * 100 + 0.5 * 4.2);
    expect(g.weightAt({ e: 10, n: 50 })).toBeCloseTo(0.5);
  });

  it('refuses a tile whose data is the wrong size or missing', () => {
    const manifest = parseManifest(rawManifest());
    expect(() => new DetailGround(manifest, new Map([[tileKey(0, 0), new Uint16Array(4)]]))).toThrow(
      /expected 9/,
    );
    expect(() => new DetailGround(manifest, new Map())).toThrow(/no data for tile 0_0/);
  });
});

describe('the manifest', () => {
  it('reads what the build script writes', () => {
    const m = parseManifest(rawManifest());
    expect(m.tileSize).toBe(100);
    expect(m.tiles).toHaveLength(2);
    expect(m.areas[0]?.id).toBe('town');
    expect(m.credit).toBe('Contains test data');
    expect(m.regions).toEqual([{ id: 'valley', name: 'Valley', ...REGION }]);
    expect(m.sceneOrigin).toEqual({ e: 0, n: 0 });
  });

  it('refuses a missing or malformed field', () => {
    expect(() => parseManifest(null)).toThrow(/manifest/);
    expect(() => parseManifest({ ...rawManifest(), tileSize: 0 })).toThrow(/tileSize/);
    expect(() => parseManifest({ ...rawManifest(), heightScale: 'x' })).toThrow(/heightScale/);
    expect(() => parseManifest({ ...rawManifest(), tiles: 'x' })).toThrow(/tiles/);
  });

  it('refuses a tile that is off the grid, outside the region, repeated or missing', () => {
    const raw = rawManifest();
    const first = rawTile(0);
    expect(() => parseManifest({ ...raw, tiles: [first, rawTile(100, { n: 7 })] })).toThrow(/grid/);
    expect(() => parseManifest({ ...raw, tiles: [first, rawTile(300)] })).toThrow(/outside/);
    expect(() => parseManifest({ ...raw, tiles: [first, first] })).toThrow(/twice/);
    expect(() => parseManifest({ ...raw, tiles: [first] })).toThrow(/covers/);
    expect(() => parseManifest({ ...raw, tiles: [first, rawTile(100, { step: 30 })] })).toThrow(/step/);
  });

  it('refuses a tile whose byte count does not fit its step, or whose offset is odd', () => {
    const raw = rawManifest();
    expect(() => parseManifest({ ...raw, tiles: [rawTile(0), rawTile(100, { bytes: 20 })] })).toThrow(
      /bytes/,
    );
    expect(() => parseManifest({ ...raw, tiles: [rawTile(0), rawTile(100, { offset: 19 })] })).toThrow(
      /offset/,
    );
  });

  it('names the data file', () => {
    expect(parseManifest(rawManifest()).data).toBe('lidar.bin');
    expect(() => parseManifest({ ...rawManifest(), data: 3 })).toThrow(/data/);
  });

  it('refuses a region that is not a whole number of tiles', () => {
    expect(() =>
      parseManifest({ ...rawManifest(), regions: [{ id: 'valley', name: 'Valley', ...REGION, eMax: 250 }] }),
    ).toThrow(/region/);
  });
});

describe('the distance to the rim', () => {
  it('measures to the nearest edge, from either side', () => {
    expect(rimDistance(REGION, { e: 50, n: 30 })).toBeCloseTo(30);
    expect(rimDistance(REGION, { e: 190, n: 50 })).toBeCloseTo(10);
    expect(rimDistance(REGION, { e: -7, n: 50 })).toBeCloseTo(7);
    expect(rimDistance(REGION, { e: 210, n: 50 })).toBeCloseTo(10);
    expect(rimDistance(REGION, { e: 203, n: 104 })).toBeCloseTo(5);
    expect(rimDistance(REGION, { e: 100, n: 0 })).toBe(0);
  });
});

describe('a tile of vertex heights', () => {
  const base = (g: { e: number; n: number }): number => 100 + g.e / 10;
  const rim = (): RimProfile => new RimProfile(REGION, 50, base);

  it('reads the LiDAR through at the tile step', () => {
    const wide = { eMin: -300, eMax: 500, nMin: -300, nMax: 400 };
    const manifest = parseManifest({
      ...rawManifest(),
      regions: [{ id: 'valley', name: 'Valley', ...wide }],
      blendMetres: 20,
      tiles: Array.from({ length: 56 }, (_, i) =>
        rawTile(-300 + (i % 8) * 100, { n: -300 + Math.floor(i / 8) * 100 }),
      ),
    });
    const data = new Map(
      manifest.tiles.map((t) => [tileKey(t.e, t.n), Uint16Array.from({ length: 9 }, (_, k) => 10 * (k + 1))]),
    );
    const g = new DetailGround(manifest, data);
    const tile = manifest.tiles.find((t) => t.e === 0 && t.n === 0);
    if (!tile) throw new Error('fixture');
    const heights = g.tileHeights(tile, 50, base, rim());
    expect(Array.from(heights)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const coarse = g.tileHeights(tile, 100, base, rim());
    expect(Array.from(coarse)).toEqual([1, 3, 7, 9]);
  });

  it('takes the rim profile on the rim and eases to the LiDAR inside it', () => {
    const g = ground();
    const tile = g.manifest.tiles[0];
    if (!tile) throw new Error('fixture');
    const h = g.tileHeights(tile, 50, base, rim());
    expect(h[3]).toBeCloseTo(rim().heightAt({ e: 0, n: 50 }) ?? Number.NaN);
    expect(h[0]).toBeCloseTo(rim().heightAt({ e: 0, n: 100 }) ?? Number.NaN);
    expect(h[6]).toBeCloseTo(rim().heightAt({ e: 0, n: 0 }) ?? Number.NaN);
    expect(h[1]).toBeCloseTo(rim().heightAt({ e: 50, n: 100 }) ?? Number.NaN);
    expect(h[4]).toBeCloseTo(5);
    expect(h[5]).toBeCloseTo(6);
  });

  it('gives two neighbouring tiles the same height on their shared edge', () => {
    const g = ground();
    const [west, east] = g.manifest.tiles;
    if (!west || !east) throw new Error('fixture');
    const a = g.tileHeights(west, 50, base, rim());
    const b = g.tileHeights(east, 50, base, rim());
    expect(a[5]).toBeCloseTo(6);
    expect(a[2]).toBeCloseTo(rim().heightAt({ e: 100, n: 100 }) ?? Number.NaN);
    for (let row = 0; row < 3; row++) expect(a[row * 3 + 2]).toBeCloseTo(b[row * 3] ?? Number.NaN);
  });

  it('lets the ground be shaped on every vertex off the rim, and never on the rim', () => {
    const g = ground();
    const tile = g.manifest.tiles[0];
    if (!tile) throw new Error('fixture');
    const seen: { e: number; n: number }[] = [];
    const h = g.tileHeights(tile, 50, base, rim(), (at, metres) => {
      seen.push(at);
      return metres + 100;
    });
    expect(h[4]).toBeCloseTo(105);
    expect(h[5]).toBeCloseTo(106);
    expect(h[3]).toBeCloseTo(rim().heightAt({ e: 0, n: 50 }) ?? Number.NaN);
    expect(seen).toContainEqual({ e: 50, n: 50 });
    expect(seen).not.toContainEqual({ e: 0, n: 50 });
  });

  it('refuses a step the tile data cannot supply', () => {
    const g = ground();
    const tile = g.manifest.tiles[0];
    if (!tile) throw new Error('fixture');
    expect(() => g.tileHeights(tile, 20, base, rim())).toThrow(/step/);
    expect(() => g.tileHeights(tile, 25, base, rim())).toThrow(/step/);
  });
});

describe('slicing the data file into tiles', () => {
  it('gives each tile its own samples, by offset', () => {
    const manifest = parseManifest(rawManifest());
    const all = Uint16Array.from([
      ...Array.from({ length: 9 }, (_, i) => i),
      ...Array.from({ length: 9 }, (_, i) => 100 + i),
    ]);
    const data = tileData(manifest, all.buffer);
    expect(Array.from(data.get(tileKey(0, 0)) ?? [])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(Array.from(data.get(tileKey(100, 0)) ?? [])).toEqual([
      100, 101, 102, 103, 104, 105, 106, 107, 108,
    ]);
  });

  it('refuses a file of the wrong length', () => {
    const manifest = parseManifest(rawManifest());
    expect(() => tileData(manifest, new ArrayBuffer(30))).toThrow(/36 bytes/);
  });
});

// Two regions a tile and more apart: the valley (two tiles) and, 200m east of it, the crag (one tile).
const CRAG = { eMin: 400, eMax: 500, nMin: 0, nMax: 100 };

function twoRegions(over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    ...rawManifest(),
    regions: [
      { id: 'valley', name: 'Valley', ...REGION },
      { id: 'crag', name: 'Crag', ...CRAG },
    ],
    areas: [
      { id: 'town', name: 'Town', region: 'valley', centre: { e: 100, n: 50 }, ...REGION },
      { id: 'castle', name: 'Castle', region: 'crag', centre: { e: 450, n: 50 }, ...CRAG },
    ],
    tiles: [rawTile(0), rawTile(100), rawTile(400, { offset: 36, areas: ['castle'] })],
    ...over,
  };
}

function twoGrounds(): DetailGround {
  const manifest = parseManifest(twoRegions());
  const west = Uint16Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  const east = Uint16Array.from([30, 31, 32, 60, 61, 62, 90, 91, 92]);
  const crag = Uint16Array.from([500, 510, 520, 530, 540, 550, 560, 570, 580]);
  return new DetailGround(
    manifest,
    new Map([
      [tileKey(0, 0), west],
      [tileKey(100, 0), east],
      [tileKey(400, 0), crag],
    ]),
  );
}

describe('several detail regions', () => {
  it('reads every region, its areas and its tiles from the manifest', () => {
    const m = parseManifest(twoRegions());
    expect(m.regions.map((r) => r.id)).toEqual(['valley', 'crag']);
    expect(m.areas.map((a) => [a.id, a.region])).toEqual([
      ['town', 'valley'],
      ['castle', 'crag'],
    ]);
    expect(m.tiles).toHaveLength(3);
  });

  it('keys every tile by its grid origin, so no two tiles in any region share an id', () => {
    const m = parseManifest(twoRegions());
    const keys = m.tiles.map((t) => tileKey(t.e, t.n));
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys).toEqual(['0_0', '100_0', '400_0']);
  });

  it('finds the region a point is in, and none between them', () => {
    const regions = parseManifest(twoRegions()).regions;
    expect(regionAt(regions, { e: 50, n: 50 })?.id).toBe('valley');
    expect(regionAt(regions, { e: 450, n: 50 })?.id).toBe('crag');
    expect(regionAt(regions, { e: 500, n: 100 })?.id).toBe('crag');
    expect(regionAt(regions, { e: 300, n: 50 })).toBeUndefined();
    expect(regionAt(regions, { e: 450, n: 150 })).toBeUndefined();
  });

  it('has no ground of its own at a point in no region', () => {
    const g = twoGrounds();
    const between = { e: 300, n: 50 };
    expect(g.contains(between)).toBe(false);
    expect(g.weightAt(between)).toBe(0);
    expect(g.lidarAt(between)).toBeUndefined();
    expect(g.metresAt(between, 77)).toBe(77);
  });

  it('reads a point in the second region from that region’s own tile, far rim included', () => {
    const g = twoGrounds();
    expect(g.contains({ e: 450, n: 50 })).toBe(true);
    expect(g.lidarAt({ e: 450, n: 50 })).toBeCloseTo(54);
    expect(g.lidarAt({ e: 500, n: 50 })).toBeCloseTo(55);
    expect(g.lidarAt({ e: 500, n: 100 })).toBeCloseTo(52);
    expect(g.lidarAt({ e: 400, n: 0 })).toBeCloseTo(56);
  });

  it('eases each region into the base from its own rim', () => {
    const g = twoGrounds();
    // 10m inside the crag's west rim: half way, though the valley's rim is 210m off.
    expect(g.weightAt({ e: 410, n: 50 })).toBeCloseTo(0.5);
    expect(g.weightAt({ e: 400, n: 50 })).toBe(0);
    expect(g.weightAt({ e: 450, n: 50 })).toBe(1);
    expect(g.metresAt({ e: 400, n: 50 }, 100)).toBeCloseTo(100);
    expect(g.metresAt({ e: 450, n: 50 }, 100)).toBeCloseTo(54);
    // The valley's own rim still blends as before.
    expect(g.weightAt({ e: 10, n: 50 })).toBeCloseTo(0.5);
    expect(g.weightAt({ e: 195, n: 50 })).toBeCloseTo(0.15625);
  });

  it('gives a tile’s edge vertices on any region’s rim that region’s rim profile', () => {
    const base = (p: { e: number; n: number }): number => 100 + p.e / 10;
    const g = twoGrounds();
    const rims = new RimProfiles(g.manifest.regions, 50, base);
    const crag = g.manifest.tiles.find((t) => t.e === 400);
    if (!crag) throw new Error('fixture');
    const h = g.tileHeights(crag, 50, base, rims);
    expect(h[0]).toBeCloseTo(base({ e: 400, n: 100 }));
    expect(h[3]).toBeCloseTo(base({ e: 400, n: 50 }));
    expect(h[5]).toBeCloseTo(base({ e: 500, n: 50 }));
    expect(h[4]).toBeCloseTo(54);
  });

  it('has a rim profile point on every region’s rim, and no height on a rim line beyond its region', () => {
    const base = (p: { e: number; n: number }): number => p.e;
    const rims = new RimProfiles(parseManifest(twoRegions()).regions, 50, base);
    expect(rims.points).toHaveLength(12 + 8);
    expect(rims.points).toContainEqual({ e: 450, n: 100 });
    expect(rims.heightAt({ e: 425, n: 0 })).toBeCloseTo(425);
    expect(rims.heightAt({ e: 100, n: 100 })).toBeCloseTo(100);
    // On the valley's south line, extended, but in neither region.
    expect(rims.heightAt({ e: 300, n: 0 })).toBeUndefined();
    expect(rims.heightAt({ e: 450, n: 50 })).toBeUndefined();
  });

  it('drops base points near any region’s rim, and only those', () => {
    const regions = parseManifest(twoRegions()).regions;
    expect(nearAnyRim(regions, { e: 405, n: 50 })).toBe(true);
    expect(nearAnyRim(regions, { e: 5, n: 50 })).toBe(true);
    expect(nearAnyRim(regions, { e: 300, n: 50 })).toBe(false);
    expect(nearAnyRim(regions, { e: 450, n: 50 })).toBe(false);
  });

  it('refuses regions that overlap or come within a tile of each other', () => {
    const regions = (crag: Record<string, number>): Record<string, unknown> =>
      twoRegions({
        regions: [
          { id: 'valley', name: 'Valley', ...REGION },
          { id: 'crag', name: 'Crag', ...crag },
        ],
      });
    expect(() => parseManifest(regions({ eMin: 100, eMax: 200, nMin: 0, nMax: 100 }))).toThrow(/apart/);
    expect(() => parseManifest(regions({ eMin: 200, eMax: 300, nMin: 0, nMax: 100 }))).toThrow(/apart/);
    expect(() => parseManifest(regions({ eMin: 200, eMax: 300, nMin: 100, nMax: 200 }))).toThrow(/apart/);
    const tileApart = twoRegions({
      regions: [
        { id: 'valley', name: 'Valley', ...REGION },
        { id: 'crag', name: 'Crag', eMin: 300, eMax: 400, nMin: 0, nMax: 100 },
      ],
      areas: [],
      tiles: [rawTile(0), rawTile(100), rawTile(300, { offset: 36 })],
    });
    expect(parseManifest(tileApart).regions).toHaveLength(2);
  });

  it('refuses a repeated region id, a tile in no region and a region not wholly tiled', () => {
    expect(() =>
      parseManifest(
        twoRegions({
          regions: [
            { id: 'valley', name: 'Valley', ...REGION },
            { id: 'valley', name: 'Crag', ...CRAG },
          ],
        }),
      ),
    ).toThrow(/twice/);
    expect(() =>
      parseManifest(twoRegions({ tiles: [rawTile(0), rawTile(100), rawTile(300, { offset: 36 })] })),
    ).toThrow(/outside every region/);
    expect(() => parseManifest(twoRegions({ tiles: [rawTile(0), rawTile(100)] }))).toThrow(/crag covers 1/);
  });

  it('refuses an area outside its own region', () => {
    expect(() =>
      parseManifest(
        twoRegions({
          areas: [{ id: 'castle', name: 'Castle', region: 'valley', centre: { e: 450, n: 50 }, ...CRAG }],
        }),
      ),
    ).toThrow(/castle is not inside its region valley/);
    expect(() =>
      parseManifest(
        twoRegions({
          areas: [{ id: 'castle', name: 'Castle', region: 'moor', centre: { e: 450, n: 50 }, ...CRAG }],
        }),
      ),
    ).toThrow(/no region moor/);
  });
});
