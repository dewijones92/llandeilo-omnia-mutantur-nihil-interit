import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DINEFWR_CASTLE_AT } from '../src/content/places.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { WORLD } from '../src/domain/geo.ts';
import { createHeightfield, sampleHeight } from '../src/domain/heightfield.ts';
import {
  DetailGround,
  insideBounds,
  parseManifest,
  RIM_SPACING,
  tileData,
  tileKey,
} from '../src/domain/lidar.ts';
import { LIDAR_CREDIT } from '../src/content/generated/lidar-credit.ts';
import lidarJson from '../public/data/lidar/lidar.json';

const dir = join(import.meta.dirname, '..', 'public', 'data');
const manifest = parseManifest(JSON.parse(readFileSync(join(dir, 'lidar', 'lidar.json'), 'utf8')));
const size = manifest.tileSize;

const blob = readFileSync(join(dir, 'lidar', manifest.data));
const data = tileData(manifest, blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength));
const ground = new DetailGround(manifest, data);
const name = (t: { e: number; n: number }): string => tileKey(t.e, t.n);

describe('the LiDAR tiles on disk', () => {
  it('carry the credit the app shows, which build-lidar.py writes to one generated file', () => {
    expect(lidarJson.source.credit).toBe(LIDAR_CREDIT);
    expect(LIDAR_CREDIT).toContain('Open Government Licence');
  });

  it('fill the data file exactly, one after another, each the size its step says', () => {
    let next = 0;
    for (const t of manifest.tiles) {
      const side = size / t.step + 1;
      expect(t.offset, name(t)).toBe(next);
      expect(t.bytes, name(t)).toBe(side * side * 2);
      next += t.bytes;
    }
    expect(blob.byteLength).toBe(next);
  });

  it('keep each tile within the heights the manifest records', () => {
    for (const t of manifest.tiles) {
      const values = data.get(tileKey(t.e, t.n)) ?? new Uint16Array();
      expect(Math.min(...values) * manifest.heightScale, name(t)).toBeCloseTo(t.minHeight, 6);
      expect(Math.max(...values) * manifest.heightScale, name(t)).toBeCloseTo(t.maxHeight, 6);
    }
  });

  it('share their edge vertices with the neighbouring tile', () => {
    const at = (e: number, n: number): number => ground.lidarAt({ e, n }) ?? Number.NaN;
    for (const t of manifest.tiles) {
      const east = manifest.tiles.find((o) => o.e === t.e + size && o.n === t.n);
      if (!east) continue;
      const step = Math.max(t.step, east.step);
      for (let n = t.n; n <= t.n + size; n += step) {
        const mine = data.get(tileKey(t.e, t.n)) ?? new Uint16Array();
        const side = size / t.step + 1;
        const row = (t.n + size - n) / t.step;
        expect(mine[row * side + side - 1], `${name(t)} east edge at n=${String(n)}`).toBe(
          Math.round(at(t.e + size, n) / manifest.heightScale),
        );
      }
    }
  });

  it('are at the finest step wherever an area needs detail, and only there', () => {
    const finest = Math.min(...manifest.tiles.map((t) => t.step));
    for (const a of manifest.areas) {
      const touching = manifest.tiles.filter(
        (t) => t.e < a.eMax && t.e + size > a.eMin && t.n < a.nMax && t.n + size > a.nMin,
      );
      expect(touching.length, a.id).toBeGreaterThan(0);
      for (const t of touching) {
        expect(t.step, `${a.id} ${name(t)}`).toBe(finest);
        expect(t.areas, `${a.id} ${name(t)}`).toContain(a.id);
      }
    }
    for (const t of manifest.tiles.filter((x) => x.areas.length === 0))
      expect(t.step).toBeGreaterThan(finest);
  });
});

describe('the detail regions', () => {
  it('holds the town, the Roman forts and the three castles, at the places the content names', () => {
    const pairs = [
      ['llandeilo', 'llandeilo'],
      ['roman-forts', 'roman-forts'],
      ['dinefwr', 'dinefwr-castle'],
      ['carreg-cennen', 'carreg-cennen-castle'],
      ['dryslwyn', 'dryslwyn-castle'],
    ] as const;
    for (const [placeId, areaId] of pairs) {
      const place = W.places.find((p) => p.id === placeId);
      expect(place, placeId).toBeDefined();
      const area = manifest.areas.find((a) => a.id === areaId);
      expect(area, areaId).toBeDefined();
      if (place && area) expect(insideBounds(area, place.at), areaId).toBe(true);
    }
  });

  it('centres the castle area on the one castle point, which the place and every castle feature use', () => {
    const keep = { e: 261168.5, n: 221724 };
    const area = manifest.areas.find((a) => a.id === 'dinefwr-castle');
    const place = W.places.find((p) => p.id === 'dinefwr');
    expect(area).toBeDefined();
    expect(place).toBeDefined();
    if (!area || !place) return;
    const { centre } = area;
    expect((area.eMin + area.eMax) / 2, 'east midpoint is the centre').toBe(centre.e);
    expect((area.nMin + area.nMax) / 2, 'north midpoint is the centre').toBe(centre.n);
    expect(centre, 'area centre is the castle point').toEqual(DINEFWR_CASTLE_AT);
    expect(place.at, 'place is the castle point').toEqual(DINEFWR_CASTLE_AT);
    expect(DINEFWR_CASTLE_AT, "Coflein's SN 61150 21731").toEqual({ e: 261150, n: 221731 });
    const castleFeatures = W.features.filter((f) => f.place === place.id && f.id.startsWith('dinefwr-'));
    expect(castleFeatures.map((f) => f.id).sort()).toEqual(
      ['dinefwr-castle', 'dinefwr-ruin', 'dinefwr-rhys', 'dinefwr-summerhouse'].sort(),
    );
    for (const f of castleFeatures) expect(f.at, `${f.id} is at the castle point`).toEqual(DINEFWR_CASTLE_AT);
    expect(insideBounds(area, keep), 'keep').toBe(true);
    for (const [de, dn] of [
      [-300, 0],
      [300, 0],
      [0, -300],
      [0, 300],
    ] as const)
      expect(insideBounds(area, { e: centre.e + de, n: centre.n + dn }), `${String(de)},${String(dn)}`).toBe(
        true,
      );
  });

  // Coflein's grid references (research notes carreg-cennen.md and dryslwyn.md, [S1] in each): each castle's area
  // is centred on its own. The places in places.ts are 14.4m and 6.7m from them, and are not moved here.
  it('centres each new castle area on Coflein’s grid reference, with the castle’s ground inside it', () => {
    const cases = [
      { area: 'carreg-cennen-castle', place: 'carreg-cennen', coflein: { e: 266789, n: 219075 }, half: 500 },
      { area: 'dryslwyn-castle', place: 'dryslwyn', coflein: { e: 255387, n: 220288 }, half: 250 },
    ];
    for (const c of cases) {
      const area = manifest.areas.find((a) => a.id === c.area);
      const place = W.places.find((p) => p.id === c.place);
      expect(area, c.area).toBeDefined();
      expect(place, c.place).toBeDefined();
      if (!area || !place) continue;
      expect(area.centre, `${c.area} centre`).toEqual(c.coflein);
      expect([area.eMax - area.eMin, area.nMax - area.nMin], c.area).toEqual([2 * c.half, 2 * c.half]);
      expect((area.eMin + area.eMax) / 2, `${c.area} east midpoint`).toBe(c.coflein.e);
      expect((area.nMin + area.nMax) / 2, `${c.area} north midpoint`).toBe(c.coflein.n);
      expect(Math.hypot(place.at.e - c.coflein.e, place.at.n - c.coflein.n), c.place).toBeLessThan(20);
    }
    // Carreg Cennen: the cliff (slope over 30 degrees, joined to the crag) reaches 322m east and 140m south of
    // Coflein's point, and the Afon Cennen's floor lies 254m south (measured from the 1m DTM, 2026-10-23).
    const cc = manifest.areas.find((a) => a.id === 'carreg-cennen-castle');
    if (cc) {
      expect(insideBounds(cc, { e: 266789 + 322, n: 219075 - 140 }), 'the cliff').toBe(true);
      expect(insideBounds(cc, { e: 266789, n: 219075 - 254 }), 'the river floor').toBe(true);
    }
    // Dryslwyn: the hill above 30m OD joined to the castle runs 98m west to 218m east and 59m south to 231m north.
    const dr = manifest.areas.find((a) => a.id === 'dryslwyn-castle');
    if (dr)
      for (const [de, dn] of [
        [-98, -59],
        [218, 231],
      ] as const)
        expect(insideBounds(dr, { e: 255387 + de, n: 220288 + dn }), `hill ${String(de)},${String(dn)}`).toBe(
          true,
        );
  });

  it('puts every area in its own region, inside the disc, with room for the blend inside each', () => {
    for (const r of manifest.regions) {
      for (const e of [r.eMin, r.eMax])
        for (const n of [r.nMin, r.nMax])
          expect(Math.hypot(e - WORLD.centre.e, n - WORLD.centre.n), r.id).toBeLessThan(
            WORLD.radiusMetres - 100,
          );
    }
    for (const a of manifest.areas) {
      const r = manifest.regions.find((x) => x.id === a.region);
      expect(r, a.id).toBeDefined();
      if (!r) continue;
      expect(a.eMin - r.eMin, a.id).toBeGreaterThanOrEqual(manifest.blendMetres);
      expect(r.eMax - a.eMax, a.id).toBeGreaterThanOrEqual(manifest.blendMetres);
      expect(a.nMin - r.nMin, a.id).toBeGreaterThanOrEqual(manifest.blendMetres);
      expect(r.nMax - a.nMax, a.id).toBeGreaterThanOrEqual(manifest.blendMetres);
    }
  });

  it('has three regions, a tile apart, each with a rim spacing that divides its edges', () => {
    expect(manifest.regions.map((r) => r.id)).toEqual(['llandeilo-dinefwr', 'carreg-cennen', 'dryslwyn']);
    for (const r of manifest.regions) {
      expect((r.eMax - r.eMin) % RIM_SPACING, r.id).toBe(0);
      expect((r.nMax - r.nMin) % RIM_SPACING, r.id).toBe(0);
    }
  });

  it('keeps the first region and its scene origin where they were, its tiles first in the data file', () => {
    const [first] = manifest.regions;
    expect(first).toEqual({
      id: 'llandeilo-dinefwr',
      name: 'Llandeilo and Dinefwr',
      eMin: 260000,
      eMax: 265000,
      nMin: 220500,
      nMax: 224500,
    });
    expect(manifest.sceneOrigin).toEqual({ e: 260000, n: 220500 });
    const inFirst = manifest.tiles.filter(
      (t) => first && insideBounds(first, { e: t.e + 250, n: t.n + 250 }),
    );
    expect(inFirst).toHaveLength(80);
    expect(manifest.tiles.slice(0, 80)).toEqual(inFirst);
    expect(inFirst.reduce((sum, t) => sum + t.bytes, 0)).toBe(3_919_360);
  });

  it('gives every tile in every region a key of its own', () => {
    const keys = manifest.tiles.map(name);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys).toHaveLength(132);
  });
});

describe('the LiDAR against OS Terrain 50', () => {
  const meta: unknown = JSON.parse(readFileSync(join(dir, 'terrain.json'), 'utf8'));
  const field = (k: string): number => {
    const v: unknown = typeof meta === 'object' && meta !== null ? Reflect.get(meta, k) : undefined;
    if (typeof v !== 'number') throw new Error(`terrain.json: ${k} is not a number`);
    return v;
  };
  const raw = readFileSync(join(dir, 'terrain.bin'));
  const t50 = createHeightfield(
    {
      originEasting: field('originEasting'),
      originNorthing: field('originNorthing'),
      cellSize: field('cellSize'),
      width: field('width'),
      height: field('height'),
      heightScale: field('heightScale'),
    },
    new Uint16Array(raw.buffer, raw.byteOffset, raw.byteLength / 2),
  );

  it('agrees to within a few metres on average in every region, so the frames and datum are the same', () => {
    for (const r of manifest.regions) {
      let total = 0;
      let signed = 0;
      let count = 0;
      for (let e = r.eMin + 200; e < r.eMax - 200; e += 100) {
        for (let n = r.nMin + 200; n < r.nMax - 200; n += 100) {
          const lidar = ground.lidarAt({ e, n }) ?? Number.NaN;
          const diff = lidar - sampleHeight(t50, { e, n });
          total += Math.abs(diff);
          signed += diff;
          count++;
        }
      }
      expect(count, r.id).toBeGreaterThan(200);
      expect(total / count, r.id).toBeLessThan(1.5);
      expect(Math.abs(signed / count), r.id).toBeLessThan(0.6);
    }
  });

  it('agrees tile by tile, so one tile transposed or shifted shows (unless the ground is nearly symmetric)', () => {
    const size = manifest.tileSize;
    for (const t of manifest.tiles) {
      let total = 0;
      let count = 0;
      for (let e = t.e + 25; e < t.e + size; e += 50) {
        for (let n = t.n + 25; n < t.n + size; n += 50) {
          total += Math.abs((ground.lidarAt({ e, n }) ?? Number.NaN) - sampleHeight(t50, { e, n }));
          count++;
        }
      }
      expect(total / count, name(t)).toBeLessThan(2);
    }
  });

  it('puts the blend at every region’s rim: the surface there is the Terrain 50 surface', () => {
    for (const r of manifest.regions)
      for (const g of [
        { e: r.eMin, n: (r.nMin + r.nMax) / 2 },
        { e: r.eMax, n: (r.nMin + r.nMax) / 2 },
        { e: (r.eMin + r.eMax) / 2, n: r.nMin },
        { e: (r.eMin + r.eMax) / 2, n: r.nMax },
      ])
        expect(ground.metresAt(g, 123.4), `${r.id} ${String(g.e)},${String(g.n)}`).toBeCloseTo(123.4);
  });
});
