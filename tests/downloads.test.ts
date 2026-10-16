import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { assetFor } from '../src/content/assets.ts';
import { buildDownloads, formatBytes, TERRAIN_AREA_NAMES, type Download } from '../src/content/downloads.ts';
import { LIDAR_CREDIT } from '../src/content/generated/lidar-credit.ts';
import { LANDMARK_TIERS, TERRAIN_TILES, TRAIN_MODEL } from '../src/content/generated/downloads.ts';
import { LANDMARK_MODELS } from '../src/content/generated/models.ts';
import { STRINGS } from '../src/content/strings.ts';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { glbCounts, readGlb, type Glb } from '../tools/models/glb.ts';
import { anchorOf, isStamped, modelPlacement, readAssetBlock } from '../tools/downloads/stamp.ts';
import {
  detailedTiles,
  EXPORT_STEP_M,
  exportTerrain,
  loadLidar,
  tileGlb,
} from '../tools/terrain/export-glb.ts';

const root = join(import.meta.dirname, '..');
const publicFile = (file: string): string => join(root, 'public', file);
const downloads = buildDownloads(WORLD_CONTENT.features);
const read = (file: string): Glb => readGlb(readFileSync(publicFile(file)));
const terrain = downloads.filter((d) => d.group === 'terrain');
const tileOf = (d: Download): NonNullable<Download['tile']> => {
  if (!d.tile) throw new Error(`${d.file} is a terrain tile with no tile record`);
  return d.tile;
};

describe('the Downloads list (ADR 0058)', () => {
  it('lists the Blender models, the train and the detailed terrain tiles, each once', () => {
    const files = downloads.map((d) => d.file);
    expect(new Set(files).size).toBe(files.length);
    const models = downloads.filter((d) => d.group === 'models').map((d) => d.file);
    expect(models).toContain('models/landmarks/roman-fort-a.near.glb');
    expect(models).toContain('models/landmarks/roman-fort-b.far.glb');
    expect(models).toContain('models/landmarks/roman-vicus.near.glb');
    expect(models).toContain('models/llanelly-train.glb');
    expect(terrain.length).toBe(TERRAIN_TILES.length);
    expect(terrain.length).toBeGreaterThan(0);
  });

  it('lists a file that exists, is a glb, and is the size it says', () => {
    for (const d of downloads) {
      const bytes = readFileSync(publicFile(d.file));
      expect(bytes.byteLength, `${d.file} size`).toBe(d.bytes);
      expect(bytes.subarray(0, 4).toString('latin1'), `${d.file} magic`).toBe('glTF');
      expect(bytes.readUInt32LE(4), `${d.file} version`).toBe(2);
      expect(bytes.readUInt32LE(8), `${d.file} length field`).toBe(bytes.byteLength);
      expect(statSync(publicFile(d.file)).size, d.file).toBe(d.bytes);
    }
  });

  it('offers every glb the app ships that holds anything, so a new model is never forgotten', () => {
    const shipped = [
      ...readdirSync(publicFile('models/landmarks')).map((f) => `models/landmarks/${f}`),
      ...readdirSync(publicFile('models/terrain')).map((f) => `models/terrain/${f}`),
      'models/llanelly-train.glb',
    ].filter((f) => f.endsWith('.glb'));
    const listed = new Set(downloads.map((d) => d.file));
    const forgotten = shipped.filter((f) => !listed.has(f) && glbCounts(read(f).json).triangles > 0);
    expect(forgotten).toEqual([]);
    const empty = shipped.filter((f) => !listed.has(f));
    for (const f of empty)
      expect(glbCounts(read(f).json).triangles, `${f} is not listed, so holds nothing`).toBe(0);
  });

  it('has a manifest entry with a source, a licence and a link for every download, and no second list', () => {
    for (const d of downloads) {
      const record = assetFor(d.file);
      expect(record, d.file).toBeDefined();
      expect(d.asset, d.file).toBe(record);
      expect(d.asset.licence.length, d.file).toBeGreaterThan(10);
      expect(d.asset.source.length, d.file).toBeGreaterThan(10);
      expect(d.asset.url, d.file).toMatch(/^https:\/\//);
    }
  });

  it('carries every download’s credit and licence inside the glb itself, as the manifest states them', () => {
    const { manifest } = loadLidar();
    for (const d of downloads) {
      const glb = read(d.file);
      const extra = d.file.startsWith('models/landmarks/')
        ? { placement: modelPlacement(glb, manifest.region) }
        : undefined;
      expect(isStamped(glb, d.asset, extra), `${d.file}: run npm run downloads`).toBe(true);
      const block = readAssetBlock(glb);
      expect(block.copyright, d.file).toBe(d.asset.source);
      expect(JSON.stringify(block.extras), d.file).toContain(JSON.stringify(d.asset.licence).slice(1, -1));
    }
  });

  it('keeps the LiDAR’s attribution text exact, and its licence, in every terrain tile', () => {
    expect(LIDAR_CREDIT).toContain('Open Government Licence v3.0');
    for (const d of terrain) {
      const block = readAssetBlock(read(d.file));
      expect(String(block.copyright).startsWith(LIDAR_CREDIT), d.file).toBe(true);
      expect(JSON.stringify(block.extras), d.file).toContain('Open Government Licence v3.0');
      expect(d.asset.source.startsWith(LIDAR_CREDIT), d.file).toBe(true);
    }
  });

  it('names every area a tile is in, in both languages, and every download in both', () => {
    const { manifest } = loadLidar();
    for (const a of manifest.areas) {
      expect(TERRAIN_AREA_NAMES[a.id]?.en, a.id).toBeTruthy();
      expect(TERRAIN_AREA_NAMES[a.id]?.cy, a.id).toBeTruthy();
    }
    expect(TERRAIN_AREA_NAMES['dinefwr-castle']?.en, 'the castle area the 2m branch adds').toBe(
      'Dinefwr Castle hill',
    );
    expect(TERRAIN_AREA_NAMES['dinefwr-castle']?.cy).toBeTruthy();
    for (const d of downloads) {
      for (const text of [d.name, d.what]) {
        expect(text.en.length, d.file).toBeGreaterThan(0);
        expect(text.cy.length, d.file).toBeGreaterThan(0);
        expect(text.cy, `${d.file} Welsh uses curly apostrophes`).not.toMatch(/[a-z]'[a-z]/i);
      }
    }
  });

  it('gives each model its feature’s dates and name, and leaves out a level with nothing in it', () => {
    const fort = downloads.find((d) => d.file === 'models/landmarks/roman-fort-a.near.glb');
    const feature = WORLD_CONTENT.features.find((f) => f.id === 'roman-fort-a');
    expect(fort?.period).toEqual({ kind: 'range', when: feature?.when, approximate: true });
    expect(fort?.name).toBe(feature?.label);
    const vicus = LANDMARK_MODELS.find((m) => m.feature === 'roman-vicus');
    expect(vicus?.far.triangles).toBe(0);
    expect(downloads.some((d) => d.file === vicus?.far.file)).toBe(false);
    const train = downloads.find((d) => d.file === TRAIN_MODEL.file);
    expect(train?.period.kind).toBe('range');
    expect(train?.triangles).toBe(glbCounts(read(TRAIN_MODEL.file).json).triangles);
  });

  it('labels a landmark model by its parts, never by its site: no row claims a tier its parts do not have', () => {
    const landmarks = downloads.filter((d) => d.file.startsWith('models/landmarks/'));
    expect(landmarks.length).toBeGreaterThan(0);
    for (const d of landmarks) {
      expect(d.provenance, `${d.file} is badged by its feature, not its parts`).toBeUndefined();
      const counted = { documented: 0, reconstructed: 0, imagined: 0 };
      for (const node of read(d.file).json.nodes) {
        const tier = node.extras?.['tier'];
        if (tier === 'documented' || tier === 'reconstructed' || tier === 'imagined') counted[tier]++;
      }
      expect(d.tiers, d.file).toEqual(counted);
      expect(counted.documented + counted.reconstructed + counted.imagined, d.file).toBeGreaterThan(0);
    }
    expect(Object.keys(LANDMARK_TIERS).sort()).toEqual(landmarks.map((d) => d.file).sort());
    const fort1 = downloads.find((d) => d.file === 'models/landmarks/roman-fort-a.near.glb');
    const vicus = downloads.find((d) => d.file === 'models/landmarks/roman-vicus.near.glb');
    expect(
      fort1?.tiers?.documented,
      'the fort’s site is documented, but few of its drawn parts are',
    ).toBeLessThan(fort1?.tiers?.reconstructed ?? 0);
    expect(vicus?.tiers?.documented, 'the vicus is drawn entirely from invention').toBe(0);
    expect(vicus?.tiers?.reconstructed).toBe(0);
    expect(vicus?.tiers?.imagined).toBeGreaterThan(0);
    const train = downloads.find((d) => d.file === TRAIN_MODEL.file);
    expect(train?.provenance?.kind, 'the train is one reconstructed model').toBe('reconstructed');
    expect(train?.tiers).toBeUndefined();
  });

  it('tells a downloader how to put a landmark model on the terrain, from its own anchor, inside the glb', () => {
    const { manifest } = loadLidar();
    for (const d of downloads.filter((x) => x.file.startsWith('models/landmarks/'))) {
      const glb = read(d.file);
      const anchor = anchorOf(glb);
      expect(readAssetBlock(glb).extras, d.file).toMatchObject({
        placement: {
          anchorBng: anchor,
          atInTerrainScene: [anchor.e - manifest.region.eMin, 0, -(anchor.n - manifest.region.nMin)],
        },
      });
      expect(JSON.stringify(readAssetBlock(glb).extras), d.file).toContain('onto the ground you use');
    }
  });
});

describe('the terrain tiles', () => {
  const { manifest, data } = loadLidar();
  const detailed = detailedTiles(manifest);

  it('are exactly the detailed tiles of the LiDAR manifest, each with its British National Grid origin in the list', () => {
    expect(terrain.map((d) => [tileOf(d).e, tileOf(d).n]).sort()).toEqual(
      detailed.map((t) => [t.e, t.n]).sort(),
    );
    for (const d of terrain) {
      expect(tileOf(d).gridRef, d.file).toMatch(/^SN \d{5} \d{5}$/);
      expect(d.file, d.file).toBe(`models/terrain/lidar-${String(tileOf(d).e)}-${String(tileOf(d).n)}.glb`);
    }
  });

  it('record the same origin in the glb’s extras as the list, in real metres on the grid', () => {
    for (const d of terrain) {
      const { json } = read(d.file);
      const node = json.nodes[0];
      const origin = node?.extras?.['tileOriginBng'];
      expect(origin, d.file).toEqual({ e: tileOf(d).e, n: tileOf(d).n });
      expect(node?.extras?.['tileSizeMetres'], d.file).toBe(tileOf(d).size);
      expect(node?.extras?.['stepMetres'], d.file).toBe(tileOf(d).step);
      expect(json.scenes?.[0]?.extras?.['crs'], d.file).toBe('EPSG:27700');
      const sceneOrigin = json.scenes?.[0]?.extras?.['sceneOriginBng'];
      expect(sceneOrigin, d.file).toEqual({ e: manifest.region.eMin, n: manifest.region.nMin });
      expect(node?.translation, d.file).toEqual([
        tileOf(d).e - manifest.region.eMin,
        0,
        -(tileOf(d).n - manifest.region.nMin),
      ]);
      const position = json.accessors?.[0];
      expect(position?.min?.[0], d.file).toBe(0);
      expect(position?.max?.[0], d.file).toBe(tileOf(d).size);
      expect(position?.min?.[2], d.file).toBe(-tileOf(d).size);
      expect(position?.max?.[2], d.file).toBe(0);
    }
  });

  it('hold the LiDAR’s own heights, unblended, at the step they say', () => {
    for (const d of terrain) {
      const tile = detailed.find((t) => t.e === tileOf(d).e && t.n === tileOf(d).n);
      const samples = data.get(`${String(tile?.e)}_${String(tile?.n)}`);
      if (!tile || !samples) throw new Error(`no data for ${d.file}`);
      const glb = read(d.file);
      const view = new DataView(glb.bin.buffer, glb.bin.byteOffset, glb.bin.byteLength);
      const cells = manifest.tileSize / EXPORT_STEP_M;
      const side = cells + 1;
      const stride = EXPORT_STEP_M / tile.step;
      const stored = manifest.tileSize / tile.step + 1;
      for (const [i, j] of [
        [0, 0],
        [0, cells],
        [cells, 0],
        [cells, cells],
        [37, 61],
        [100, 12],
      ] as const) {
        const at = (i * side + j) * 12;
        const want = (samples[i * stride * stored + j * stride] ?? 0) * manifest.heightScale;
        expect(view.getFloat32(at, true), `${d.file} x ${String(i)},${String(j)}`).toBe(j * EXPORT_STEP_M);
        expect(view.getFloat32(at + 4, true), `${d.file} height ${String(i)},${String(j)}`).toBeCloseTo(
          want,
          4,
        );
        expect(view.getFloat32(at + 8, true), `${d.file} z ${String(i)},${String(j)}`).toBe(
          (i - cells) * EXPORT_STEP_M,
        );
      }
      expect(glbCounts(glb.json).triangles, d.file).toBe(d.triangles);
    }
  });

  it('share their edges with their neighbours exactly, so they meet without a gap', () => {
    const heightsOf = (file: string): Float32Array => {
      const { bin } = read(file);
      const view = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
      const side = manifest.tileSize / EXPORT_STEP_M + 1;
      return Float32Array.from({ length: side * side }, (_, v) => view.getFloat32(v * 12 + 4, true));
    };
    const side = manifest.tileSize / EXPORT_STEP_M + 1;
    let checked = 0;
    for (const a of terrain) {
      const east = terrain.find(
        (b) => tileOf(b).e === tileOf(a).e + manifest.tileSize && tileOf(b).n === tileOf(a).n,
      );
      const north = terrain.find(
        (b) => tileOf(b).n === tileOf(a).n + manifest.tileSize && tileOf(b).e === tileOf(a).e,
      );
      const ha = heightsOf(a.file);
      if (east) {
        const hb = heightsOf(east.file);
        for (let i = 0; i < side; i++)
          expect(ha[i * side + side - 1], `${a.file} east edge row ${String(i)}`).toBe(hb[i * side]);
        checked++;
      }
      if (north) {
        const hb = heightsOf(north.file);
        for (let j = 0; j < side; j++)
          expect(ha[j], `${a.file} north edge column ${String(j)}`).toBe(hb[(side - 1) * side + j]);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(20);
  });

  it('are up to date with the LiDAR tiles: run `npm run downloads` if not', () => {
    const out = mkdtempSync(join(tmpdir(), 'llandeilo-terrain-'));
    try {
      const made = exportTerrain(out);
      expect(made.map((m) => m.file).sort()).toEqual(terrain.map((d) => d.file).sort());
      for (const m of made) {
        const fresh = readFileSync(join(out, m.file));
        const committed = readFileSync(publicFile(m.file));
        expect(fresh.equals(committed), `${m.file} differs from what the tool makes now`).toBe(true);
      }
      expect(made.length).toBe(terrain.length);
      expect(made.reduce((sum, m) => sum + m.bytes, 0)).toBe(terrain.reduce((sum, d) => sum + d.bytes, 0));
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  });

  it('say which sample they keep in plain words, and say every sample when they keep them all', () => {
    for (const d of terrain) {
      const note = String(read(d.file).json.nodes[0]?.extras?.['heights']);
      expect(note, d.file).toContain('every second sample');
      expect(note, d.file).not.toMatch(/\dth sample/);
    }
    const tile = detailed[0];
    const samples = tile && data.get(`${String(tile.e)}_${String(tile.n)}`);
    if (!tile || !samples) throw new Error('no detailed tile');
    const full = tileGlb(manifest, tile, samples, tile.step);
    expect(String(full.glb.json.nodes[0]?.extras?.['heights'])).toContain('every sample');
    expect(String(full.glb.json.nodes[0]?.extras?.['heights'])).not.toMatch(/1th|first sample/);
  });

  it('are dated as the tile files are, not as the whole national survey', () => {
    for (const d of terrain) {
      expect(d.period.kind, d.file).toBe('text');
      const text = d.period.kind === 'text' ? d.period.text : undefined;
      expect(text?.en, d.file).toMatch(/December 2021 to February 2022/);
      expect(text?.en, d.file).not.toMatch(/2020/);
      expect(text?.cy, d.file).toMatch(/Rhagfyr 2021 i Chwefror 2022/);
      expect(text?.cy, d.file).not.toMatch(/2020/);
    }
  });

  it('stay small enough to commit: the whole set under 10MB', () => {
    expect(terrain.reduce((sum, d) => sum + d.bytes, 0)).toBeLessThan(10_000_000);
  });
});

describe('the words around the files', () => {
  it('say the terrain is coarser than the survey, and claim no period ground that the app does not have', () => {
    const note = STRINGS.downloadsTerrainNote;
    expect(note.en).toMatch(/coarser than the survey/);
    expect(note.cy).toMatch(/bras/);
    for (const text of [note.en, note.cy]) {
      expect(text).not.toMatch(/earlier ground|tir cynharach/);
      expect(text).toMatch(/2m|2 m/);
    }
  });

  it('say the models carry shape and part names but not the app’s colours, where the parts sit, and only source ids', () => {
    const note = STRINGS.downloadsModelsNote;
    expect(note.en).toMatch(/ids of its sources/);
    expect(note.en).toMatch(/not (its|the) (colours|textures)|no colours/);
    expect(note.en).toMatch(/ground/);
    expect(note.cy).toMatch(/dynodwyr/);
    expect(note.en).not.toMatch(/how sure we are of the whole/);
    expect(downloads.find((d) => d.file.includes('fort-a.near'))?.what.en).not.toMatch(/with its sources/);
  });
});

describe('a file size as people read it', () => {
  it('says bytes, then KB, then MB, with a Welsh unit for bytes', () => {
    expect(formatBytes(528, 'en')).toBe('528 bytes');
    expect(formatBytes(528, 'cy')).toBe('528 beit');
    expect(formatBytes(27_656, 'en')).toBe('28 KB');
    expect(formatBytes(1_201_844, 'en')).toBe('1.2 MB');
    expect(formatBytes(380_536, 'cy')).toBe('381 KB');
  });
});

describe('the list built from a world without its features', () => {
  it('refuses a model whose feature is missing', () => {
    expect(() => buildDownloads([])).toThrow(/no feature/);
  });
});
