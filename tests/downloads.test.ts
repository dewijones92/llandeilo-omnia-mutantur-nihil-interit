import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { assetFor, RELEASE_DOWNLOAD_URL } from '../src/content/assets.ts';
import { buildDownloads, formatBytes, TERRAIN_AREA_NAMES, type Download } from '../src/content/downloads.ts';
import { LIDAR_CREDIT } from '../src/content/generated/lidar-credit.ts';
import { LANDMARK_TIERS, TRAIN_MODEL } from '../src/content/generated/downloads.ts';
import { TERRAIN_TILES } from '../src/content/generated/terrain-tiles.ts';
import { LANDMARK_MODELS } from '../src/content/generated/models.ts';
import { STRINGS } from '../src/content/strings.ts';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { glbCounts, readGlb, type Glb } from '../tools/models/glb.ts';
import {
  anchorOf,
  isStamped,
  modelPlacement,
  readAssetBlock,
  readSceneBlock,
} from '../tools/downloads/stamp.ts';
import {
  detailedTiles,
  detailStep,
  exportTerrain,
  groundHeightAt,
  loadLidar,
  tileGlb,
} from '../tools/terrain/export-glb.ts';

const root = join(import.meta.dirname, '..');
const publicFile = (file: string): string => join(root, 'public', file);
const downloads = buildDownloads(WORLD_CONTENT.features);
const terrainOut = mkdtempSync(join(tmpdir(), 'llandeilo-terrain-'));
const made = exportTerrain(terrainOut);
afterAll(() => {
  rmSync(terrainOut, { recursive: true, force: true });
});
const terrain = downloads.filter((d) => d.group === 'terrain');
const read = (file: string): Glb =>
  readGlb(readFileSync(terrain.some((d) => d.file === file) ? join(terrainOut, file) : publicFile(file)));
const bytesOf = (d: Download): Buffer =>
  readFileSync(d.group === 'terrain' ? join(terrainOut, d.file) : publicFile(d.file));
const STEP = detailStep(loadLidar().manifest);

interface Placement {
  readonly anchorBng: { readonly e: number; readonly n: number };
  readonly groundAtAnchorMetres: number;
  readonly atInTerrainScene: readonly number[];
}
const placementOf = (glb: Glb): Placement => {
  const placement: unknown = Reflect.get(readAssetBlock(glb).extras ?? {}, 'placement');
  const ground: unknown = Reflect.get(placement ?? {}, 'groundAtAnchorMetres');
  const at: unknown = Reflect.get(placement ?? {}, 'atInTerrainScene');
  const anchor: unknown = Reflect.get(placement ?? {}, 'anchorBng');
  if (typeof ground !== 'number' || !Array.isArray(at) || !at.every((v) => typeof v === 'number'))
    throw new Error('a landmark model has no placement with a ground height in its asset extras');
  if (typeof anchor !== 'object' || anchor === null) throw new Error('the placement has no anchor');
  return {
    anchorBng: { e: Number(Reflect.get(anchor, 'e')), n: Number(Reflect.get(anchor, 'n')) },
    groundAtAnchorMetres: ground,
    atInTerrainScene: at,
  };
};
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
      const bytes = bytesOf(d);
      expect(bytes.byteLength, `${d.file} size`).toBe(d.bytes);
      expect(bytes.subarray(0, 4).toString('latin1'), `${d.file} magic`).toBe('glTF');
      expect(bytes.readUInt32LE(4), `${d.file} version`).toBe(2);
      expect(bytes.readUInt32LE(8), `${d.file} length field`).toBe(bytes.byteLength);
    }
    for (const d of downloads.filter((x) => x.group === 'models'))
      expect(statSync(publicFile(d.file)).size, d.file).toBe(d.bytes);
  });

  it('keeps no terrain in the repo and links each tile to the latest release, by the asset’s own name', () => {
    expect(
      existsSync(publicFile('models/terrain')),
      'the terrain is a release asset, not a committed file',
    ).toBe(false);
    expect(RELEASE_DOWNLOAD_URL).toBe(
      'https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/releases/latest/download',
    );
    for (const d of terrain) {
      expect(d.file, d.file).toMatch(/^lidar-\d+-\d+\.glb$/);
      expect(d.releaseUrl, d.file).toBe(`${RELEASE_DOWNLOAD_URL}/${d.file}`);
      expect(existsSync(publicFile(d.file)), `${d.file} is not served by the app`).toBe(false);
    }
    for (const d of downloads.filter((x) => x.group === 'models'))
      expect(d.releaseUrl, `${d.file} is served by the app`).toBeUndefined();
  });

  it('offers every glb the app ships that holds anything, so a new model is never forgotten', () => {
    const shipped = [
      ...readdirSync(publicFile('models/landmarks')).map((f) => `models/landmarks/${f}`),
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
    const { data } = loadLidar();
    for (const d of downloads) {
      const glb = read(d.file);
      const anchor = d.file.startsWith('models/landmarks/') ? anchorOf(glb) : undefined;
      const extra = anchor
        ? {
            placement: modelPlacement(
              glb,
              manifest.region,
              groundHeightAt(manifest, data, anchor.e, anchor.n),
            ),
          }
        : undefined;
      expect(isStamped(glb, d.asset, extra), `${d.file}: run npm run downloads`).toBe(true);
      const block = readAssetBlock(glb);
      expect(block.copyright, d.file).toBe(d.asset.source);
      expect(JSON.stringify(block.extras), d.file).toContain(JSON.stringify(d.asset.licence).slice(1, -1));
    }
  });

  it('repeats the credit, licence and placement in the first scene’s extras, where Blender reads them', () => {
    for (const d of downloads) {
      const scene = readSceneBlock(read(d.file));
      expect(scene['credit'], d.file).toBe(d.asset.source);
      expect(scene['licence'], d.file).toBe(d.asset.licence);
      expect(scene['sourceUrl'], d.file).toBe(d.asset.url);
      expect(scene['licenceUrl'], d.file).toBe(d.asset.licenceUrl);
      const placed = d.file.startsWith('models/landmarks/');
      expect(scene['placement'] !== undefined, `${d.file} placement`).toBe(placed);
      if (placed)
        expect(readAssetBlock(read(d.file)).extras, d.file).toMatchObject({ placement: scene['placement'] });
    }
    const tile = terrain[0];
    expect(readGlb(readFileSync(join(terrainOut, tile?.file ?? ''))).json.scenes?.[0]?.extras).toMatchObject({
      crs: 'EPSG:27700',
      licence: tile?.asset.licence,
    });
  });

  it('links the Open Government Licence’s own text from every LiDAR record, and stamps it into the tiles', () => {
    const OGL = 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/';
    expect(assetFor('data/lidar/lidar.bin')?.licenceUrl).toBe(OGL);
    for (const d of terrain) {
      expect(d.asset.licenceUrl, d.file).toBe(OGL);
      expect(readAssetBlock(read(d.file)).extras, d.file).toMatchObject({ licenceUrl: OGL });
    }
    expect(assetFor('models/llanelly-train.glb')?.licenceUrl).toBeUndefined();
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
      const extras = readAssetBlock(glb).extras;
      const placement = placementOf(glb);
      expect(placement.anchorBng, d.file).toEqual(anchor);
      expect(placement.atInTerrainScene[0], d.file).toBe(anchor.e - manifest.region.eMin);
      expect(placement.atInTerrainScene[2], d.file).toBe(-(anchor.n - manifest.region.nMin));
      const text = JSON.stringify(extras);
      expect(text, d.file).toContain('onto the ground you use');
      expect(text, d.file).toContain('Over sloping ground the parts do not all stand on the tiles');
    }
  });

  it('puts each model’s anchor on the exported tile’s ground, not 76m under it: y is the tile’s height there to 0.5m', () => {
    const { manifest } = loadLidar();
    for (const d of downloads.filter((x) => x.file.startsWith('models/landmarks/'))) {
      const glb = read(d.file);
      const anchor = anchorOf(glb);
      const tile = terrain
        .map(tileOf)
        .find(
          (t) => anchor.e >= t.e && anchor.e < t.e + t.size && anchor.n >= t.n && anchor.n < t.n + t.size,
        );
      if (!tile) throw new Error(`no exported tile holds ${d.file}’s anchor`);
      const tileFile = terrain.find((t) => tileOf(t).e === tile.e && tileOf(t).n === tile.n)?.file ?? '';
      const tileBin = read(tileFile).bin;
      const view = new DataView(tileBin.buffer, tileBin.byteOffset, tileBin.byteLength);
      const cells = tile.size / tile.step;
      const side = cells + 1;
      const col = (anchor.e - tile.e) / tile.step;
      const row = cells - (anchor.n - tile.n) / tile.step;
      const [i0, j0] = [Math.min(Math.floor(row), cells - 1), Math.min(Math.floor(col), cells - 1)];
      const [fi, fj] = [row - i0, col - j0];
      const height = (i: number, j: number): number => view.getFloat32((i * side + j) * 12 + 4, true);
      const fromTile =
        height(i0, j0) * (1 - fi) * (1 - fj) +
        height(i0, j0 + 1) * (1 - fi) * fj +
        height(i0 + 1, j0) * fi * (1 - fj) +
        height(i0 + 1, j0 + 1) * fi * fj;
      const placement = placementOf(glb);
      expect(placement.atInTerrainScene[1], `${d.file} y`).toBeGreaterThan(50);
      expect(
        Math.abs((placement.atInTerrainScene[1] ?? 0) - fromTile),
        `${d.file} y against the tile`,
      ).toBeLessThan(0.5);
      expect(placement.groundAtAnchorMetres, d.file).toBe(placement.atInTerrainScene[1]);
      expect(placement.atInTerrainScene[0], d.file).toBe(anchor.e - manifest.region.eMin);
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
      expect(d.file, d.file).toBe(`lidar-${String(tileOf(d).e)}-${String(tileOf(d).n)}.glb`);
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
      const cells = manifest.tileSize / STEP;
      const side = cells + 1;
      const stride = STEP / tile.step;
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
        expect(view.getFloat32(at, true), `${d.file} x ${String(i)},${String(j)}`).toBe(j * STEP);
        expect(view.getFloat32(at + 4, true), `${d.file} height ${String(i)},${String(j)}`).toBeCloseTo(
          want,
          4,
        );
        expect(view.getFloat32(at + 8, true), `${d.file} z ${String(i)},${String(j)}`).toBe(
          (i - cells) * STEP,
        );
      }
      expect(glbCounts(glb.json).triangles, d.file).toBe(d.triangles);
    }
  });

  it('share their edges with their neighbours exactly, so they meet without a gap', () => {
    const heightsOf = (file: string): Float32Array => {
      const { bin } = read(file);
      const view = new DataView(bin.buffer, bin.byteOffset, bin.byteLength);
      const side = manifest.tileSize / STEP + 1;
      return Float32Array.from({ length: side * side }, (_, v) => view.getFloat32(v * 12 + 4, true));
    };
    const side = manifest.tileSize / STEP + 1;
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

  it('are the full 2m detail, listed in the manifest with the size and hash of the very files the tool makes', () => {
    expect(STEP).toBe(2);
    expect(made.map((m) => m.file).sort()).toEqual(terrain.map((d) => d.file).sort());
    expect(TERRAIN_TILES.length).toBe(detailed.length);
    for (const m of made) {
      const listed = TERRAIN_TILES.find((t) => t.file === m.file);
      expect(
        listed,
        `${m.file} is in generated/terrain-tiles.ts: run npm run terrain-glb -- <outdir>`,
      ).toBeDefined();
      expect(listed, m.file).toEqual(m);
      const bytes = readFileSync(join(terrainOut, m.file));
      expect(bytes.byteLength, m.file).toBe(m.bytes);
      expect(createHash('sha256').update(bytes).digest('hex'), m.file).toBe(m.sha256);
      expect(m.step, m.file).toBe(2);
      expect(m.triangles, m.file).toBe(250 * 250 * 2);
    }
  });

  it('are made the same every time, so a release’s files can be checked against the manifest', () => {
    const again = mkdtempSync(join(tmpdir(), 'llandeilo-terrain-again-'));
    try {
      const second = exportTerrain(again);
      expect(second.map((m) => m.sha256)).toEqual(made.map((m) => m.sha256));
    } finally {
      rmSync(again, { recursive: true, force: true });
    }
  });

  it('say which sample they keep in plain words: every sample at 2m, every second one if exported coarser', () => {
    for (const d of terrain) {
      const note = String(read(d.file).json.nodes[0]?.extras?.['heights']);
      expect(note, d.file).toContain('averaged to 2m, here every sample');
      expect(note, d.file).not.toMatch(/\dth sample/);
    }
    const tile = detailed[0];
    const samples = tile && data.get(`${String(tile.e)}_${String(tile.n)}`);
    if (!tile || !samples) throw new Error('no detailed tile');
    const coarse = tileGlb(manifest, tile, samples, 4);
    expect(String(coarse.glb.json.nodes[0]?.extras?.['heights'])).toContain('every second sample');
    expect(String(coarse.glb.json.nodes[0]?.extras?.['heights'])).not.toMatch(/2th|first sample/);
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
});

describe('the words around the files', () => {
  it('say the terrain is 2m, still coarser than the 1m survey, and claim no period ground that the app does not have', () => {
    const note = STRINGS.downloadsTerrainNote;
    expect(note.en).toMatch(/coarser than the survey/);
    expect(note.en).toMatch(/the survey itself is 1m/);
    expect(note.en).toMatch(/at 2m, the grid the app stores/);
    expect(note.cy).toMatch(/bras/);
    expect(note.cy).toMatch(/1m yw’r arolwg ei hun/);
    for (const text of [note.en, note.cy]) {
      expect(text).not.toMatch(/earlier ground|tir cynharach/);
      expect(text).toMatch(/2m|2 m/);
    }
  });

  it('say the terrain is a release asset fetched from GitHub’s latest release, not kept in the app', () => {
    const note = STRINGS.downloadsTerrainNote;
    expect(note.en).toMatch(/attached to each release on GitHub/);
    expect(note.cy).toMatch(/GitHub/);
    expect(note.en).not.toMatch(/stay small|4m/);
  });

  it('say the models carry shapes, part names and vertex colours, but no textures or materials, and only source ids', () => {
    const note = STRINGS.downloadsModelsNote;
    expect(note.en).toMatch(/ids of its sources/);
    expect(note.en).toMatch(/vertex colours/);
    expect(note.en).toMatch(/no textures and not the app’s materials/);
    expect(note.en).toMatch(/alpha value of each colour is an internal code/);
    expect(note.en).not.toMatch(/no colours|with no colours/);
    expect(note.en).toMatch(/ground/);
    expect(note.cy).toMatch(/lliwiau fertig/);
    expect(note.cy).toMatch(/gweadau/);
    expect(note.cy).toMatch(/dynodwyr/);
    expect(note.cy).not.toMatch(/heb liwiau/);
    expect(note.en).not.toMatch(/how sure we are of the whole/);
    expect(downloads.find((d) => d.file.includes('fort-a.near'))?.what.en).not.toMatch(/with its sources/);
  });

  it('are true of the files: every model glb carries COLOR_0 vertex colours and no textures or materials', () => {
    for (const d of downloads.filter((x) => x.group === 'models' && x.triangles > 0)) {
      const { json } = read(d.file);
      const primitives = (json.meshes ?? []).flatMap((m) => m.primitives);
      expect(primitives.length, d.file).toBeGreaterThan(0);
      for (const p of primitives) expect(p.attributes?.COLOR_0, `${d.file} COLOR_0`).toBeDefined();
      expect(json['textures'], `${d.file} textures`).toBeUndefined();
      expect(json['images'], `${d.file} images`).toBeUndefined();
      expect(json.materials, `${d.file} materials`).toBeUndefined();
    }
  });
});

describe('the list when something is missing', () => {
  it('says so in both languages, so the tab can show it instead of the app stopping', () => {
    expect(STRINGS.downloadsFailed.en).toMatch(/could not be built/);
    expect(STRINGS.downloadsFailed.cy).toMatch(/Ni ellid llunio/);
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
