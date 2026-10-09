import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { WORLD } from '../src/domain/geo.ts';
import { createHeightfield, sampleHeight } from '../src/domain/heightfield.ts';
import { DetailGround, insideBounds, parseManifest, RIM_SPACING, tileKey } from '../src/domain/lidar.ts';

const dir = join(import.meta.dirname, '..', 'public', 'data');
const manifest = parseManifest(JSON.parse(readFileSync(join(dir, 'lidar', 'lidar.json'), 'utf8')));
const size = manifest.tileSize;

function samples(file: string): Uint16Array {
  const raw = readFileSync(join(dir, 'lidar', file));
  return new Uint16Array(raw.buffer, raw.byteOffset, raw.byteLength / 2);
}

const data = new Map(manifest.tiles.map((t) => [tileKey(t.e, t.n), samples(t.file)]));
const ground = new DetailGround(manifest, data);

describe('the LiDAR tiles on disk', () => {
  it('are the size the manifest says, one file per tile', () => {
    for (const t of manifest.tiles) {
      const side = size / t.step + 1;
      expect(statSync(join(dir, 'lidar', t.file)).size, t.file).toBe(side * side * 2);
    }
  });

  it('keep each tile within the heights the manifest records', () => {
    for (const t of manifest.tiles) {
      const values = data.get(tileKey(t.e, t.n)) ?? new Uint16Array();
      expect(Math.min(...values) * manifest.heightScale, t.file).toBeCloseTo(t.minHeight, 6);
      expect(Math.max(...values) * manifest.heightScale, t.file).toBeCloseTo(t.maxHeight, 6);
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
        expect(mine[row * side + side - 1], `${t.file} east edge at n=${String(n)}`).toBe(
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
        expect(t.step, `${a.id} ${t.file}`).toBe(finest);
        expect(t.areas, `${a.id} ${t.file}`).toContain(a.id);
      }
    }
    for (const t of manifest.tiles.filter((x) => x.areas.length === 0))
      expect(t.step).toBeGreaterThan(finest);
  });
});

describe('the detail region', () => {
  it('holds the town and the Roman forts, at the places the content names', () => {
    for (const id of ['llandeilo', 'roman-forts']) {
      const place = W.places.find((p) => p.id === id);
      expect(place, id).toBeDefined();
      const area = manifest.areas.find((a) => a.id === id);
      expect(area, id).toBeDefined();
      if (place && area) expect(insideBounds(area, place.at), id).toBe(true);
    }
  });

  it('lies inside the disc and leaves room for the blend inside every area', () => {
    const r = manifest.region;
    for (const e of [r.eMin, r.eMax])
      for (const n of [r.nMin, r.nMax])
        expect(Math.hypot(e - WORLD.centre.e, n - WORLD.centre.n)).toBeLessThan(WORLD.radiusMetres - 100);
    for (const a of manifest.areas) {
      expect(a.eMin - r.eMin).toBeGreaterThanOrEqual(manifest.blendMetres);
      expect(r.eMax - a.eMax).toBeGreaterThanOrEqual(manifest.blendMetres);
      expect(a.nMin - r.nMin).toBeGreaterThanOrEqual(manifest.blendMetres);
      expect(r.nMax - a.nMax).toBeGreaterThanOrEqual(manifest.blendMetres);
    }
  });

  it('has a rim spacing that divides every edge', () => {
    const r = manifest.region;
    expect((r.eMax - r.eMin) % RIM_SPACING).toBe(0);
    expect((r.nMax - r.nMin) % RIM_SPACING).toBe(0);
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

  it('agrees to within a few metres on average, so the frames and datum are the same', () => {
    const r = manifest.region;
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
    expect(count).toBeGreaterThan(1000);
    expect(total / count).toBeLessThan(1.5);
    expect(Math.abs(signed / count)).toBeLessThan(0.6);
  });

  it('puts the blend at the rim: the surface there is the Terrain 50 surface', () => {
    const r = manifest.region;
    const g = { e: r.eMin, n: (r.nMin + r.nMax) / 2 };
    expect(ground.metresAt(g, 123.4)).toBeCloseTo(123.4);
  });
});
