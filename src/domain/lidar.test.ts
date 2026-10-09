import { describe, expect, it } from 'vitest';
import {
  chooseStep,
  DetailGround,
  insideBounds,
  parseManifest,
  planSteps,
  RimProfile,
  rimWeight,
  stepForDistance,
  tileDistance,
  tileKey,
  type LidarTileInfo,
} from './lidar.ts';

const REGION = { eMin: 0, eMax: 200, nMin: 0, nMax: 100 };

function rawTile(e: number, over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    e,
    n: 0,
    step: 50,
    file: `${String(e)}_0.bin`,
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
    tileSize: 100,
    heightScale: 0.1,
    blendMetres: 20,
    region: REGION,
    areas: [{ id: 'town', name: 'Town', centre: { e: 100, n: 50 }, eMin: 0, eMax: 200, nMin: 0, nMax: 100 }],
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
    expect(stepForDistance(0)).toBe(2);
    expect(stepForDistance(299)).toBe(2);
    expect(stepForDistance(300)).toBe(4);
    expect(stepForDistance(699)).toBe(4);
    expect(stepForDistance(700)).toBe(10);
    expect(stepForDistance(1799)).toBe(10);
    expect(stepForDistance(1800)).toBe(20);
    expect(stepForDistance(1e6)).toBe(20);
  });

  it('never goes finer than the data in the tile', () => {
    expect(chooseStep(50, 2)).toBe(2);
    expect(chooseStep(50, 10)).toBe(10);
    expect(chooseStep(500, 10)).toBe(10);
    expect(chooseStep(5000, 10)).toBe(20);
  });

  it('keeps the current step through a small wobble around a band edge', () => {
    expect(chooseStep(320, 2, 2)).toBe(2);
    expect(chooseStep(290, 2, 4)).toBe(4);
    expect(chooseStep(400, 2, 2)).toBe(4);
    expect(chooseStep(200, 2, 4)).toBe(2);
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
      file: `${String(e)}.bin`,
      minHeight: 0,
      maxHeight: 10,
      areas: [],
    });
    const tiles = [info(0, 2), info(500, 2), info(5000, 2), info(1000, 10)];
    const plan = planSteps(tiles, 500, { e: 250, n: 250, height: 60 }, new Map());
    expect(plan.get(tileKey(0, 0))).toBe(2);
    expect(plan.get(tileKey(500, 0))).toBe(2);
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
    expect(m.region).toEqual(REGION);
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

  it('refuses a region that is not a whole number of tiles', () => {
    expect(() => parseManifest({ ...rawManifest(), region: { ...REGION, eMax: 250 } })).toThrow(/region/);
  });
});
