// npm run terrain-glb -- <outdir> [--step <metres>] [--no-manifest]: writes each detailed LiDAR tile of public/data/lidar as a
// .glb into <outdir> (ADR 0058), from the same tiles and the same cut of each cell into triangles that the app draws, at the
// tiles' own 2m. Heights are the LiDAR's own: no blending into the coarser terrain, no river channels, no period earthworks.
// The files are attached to each GitHub release, not committed; the tool also writes the manifest the app's list is built from
// (src/content/generated/terrain-tiles.ts: names, sizes, hashes), so the same sources always give the same files.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { assetFor } from '../../src/content/assets.ts';
import { parseManifest, tileData, type LidarManifest, type LidarTileInfo } from '../../src/domain/lidar.ts';
import { gridMesh } from '../../src/domain/tilemesh.ts';
import { stampAsset } from '../downloads/stamp.ts';
import { writeGlb, type Glb } from '../models/glb.ts';

const ROOT = join(import.meta.dirname, '../..');
const LIDAR_DIR = join(ROOT, 'public/data/lidar');
const MANIFEST = join(ROOT, 'src/content/generated/terrain-tiles.ts');

export interface TerrainExport {
  readonly file: string;
  readonly e: number;
  readonly n: number;
  readonly size: number;
  readonly step: number;
  readonly areas: readonly string[];
  readonly bytes: number;
  readonly sha256: string;
  readonly triangles: number;
  readonly minHeight: number;
  readonly maxHeight: number;
}

/** The name a tile has as a release asset. */
export const tileFile = (e: number, n: number): string => `lidar-${String(e)}-${String(n)}.glb`;

const ARRAY_BUFFER = 34962;
const ELEMENT_ARRAY_BUFFER = 34963;
const FLOAT = 5126;
const UNSIGNED_SHORT = 5123;
const UNSIGNED_INT = 5125;

export function loadLidar(): {
  readonly manifest: LidarManifest;
  readonly data: ReadonlyMap<string, Uint16Array>;
} {
  const manifest = parseManifest(JSON.parse(readFileSync(join(LIDAR_DIR, 'lidar.json'), 'utf8')));
  const blob = readFileSync(join(LIDAR_DIR, manifest.data));
  const data = tileData(manifest, blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength));
  return { manifest, data };
}

/** The tiles worth exporting: those held at the finest step, which are the ones inside a priority area. */
export function detailedTiles(manifest: LidarManifest): LidarTileInfo[] {
  const finest = Math.min(...manifest.tiles.map((t) => t.step));
  return manifest.tiles.filter((t) => t.step === finest);
}

/** The tile's heights in metres at `step`, row by row from the north-west corner, taken from the stored samples as they are. */
export function tileHeightsAt(
  manifest: LidarManifest,
  tile: LidarTileInfo,
  samples: Uint16Array,
  step: number,
): Float32Array {
  const stride = step / tile.step;
  if (!Number.isInteger(stride) || stride < 1 || manifest.tileSize % step !== 0)
    throw new Error(
      `tile ${String(tile.e)} ${String(tile.n)} (${String(tile.step)}m data) cannot be exported at ${String(step)}m`,
    );
  const stored = manifest.tileSize / tile.step + 1;
  const side = manifest.tileSize / step + 1;
  const out = new Float32Array(side * side);
  for (let i = 0; i < side; i++)
    for (let j = 0; j < side; j++)
      out[i * side + j] = (samples[i * stride * stored + j * stride] ?? 0) * manifest.heightScale;
  return out;
}

/** The step the detailed tiles are held at, which is the step they are exported at unless one is asked for. */
export function detailStep(manifest: LidarManifest): number {
  return Math.min(...manifest.tiles.map((t) => t.step));
}

/** The LiDAR's own ground height at a grid point (bilinear between the stored samples), from the finest tile that holds it. */
export function groundHeightAt(
  manifest: LidarManifest,
  data: ReadonlyMap<string, Uint16Array>,
  e: number,
  n: number,
): number {
  const size = manifest.tileSize;
  const holding = manifest.tiles
    .filter((t) => e >= t.e && e <= t.e + size && n >= t.n && n <= t.n + size)
    .sort((a, b) => a.step - b.step)[0];
  const samples = holding && data.get(`${String(holding.e)}_${String(holding.n)}`);
  if (!holding || !samples) throw new Error(`no LiDAR tile holds E ${String(e)} N ${String(n)}`);
  const stored = size / holding.step + 1;
  const col = (e - holding.e) / holding.step;
  const row = (holding.n + size - n) / holding.step;
  const j0 = Math.min(Math.floor(col), stored - 2);
  const i0 = Math.min(Math.floor(row), stored - 2);
  const fj = col - j0;
  const fi = row - i0;
  const at = (i: number, j: number): number => (samples[i * stored + j] ?? 0) * manifest.heightScale;
  const metres =
    at(i0, j0) * (1 - fi) * (1 - fj) +
    at(i0, j0 + 1) * (1 - fi) * fj +
    at(i0 + 1, j0) * fi * (1 - fj) +
    at(i0 + 1, j0 + 1) * fi * fj;
  return Math.round(metres * 100) / 100;
}

/** Which of the stored samples an export keeps, in words: every one, every second, every fourth. */
function samplesKept(stride: number): string {
  if (stride === 1) return 'every sample';
  const words: Readonly<Record<number, string>> = { 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth' };
  return `every ${words[stride] ?? `${String(stride)}th`} sample`;
}

const pad4 = (n: number): number => (4 - (n % 4)) % 4;

export function tileGlb(
  manifest: LidarManifest,
  tile: LidarTileInfo,
  samples: Uint16Array,
  step: number,
): { readonly glb: Glb; readonly minHeight: number; readonly maxHeight: number } {
  const size = manifest.tileSize;
  const cells = size / step;
  const heights = tileHeightsAt(manifest, tile, samples, step);
  const mesh = gridMesh(heights, cells, step);
  const positions = new Uint8Array(
    mesh.positions.buffer,
    mesh.positions.byteOffset,
    mesh.positions.byteLength,
  );
  const indices = new Uint8Array(mesh.indices.buffer, mesh.indices.byteOffset, mesh.indices.byteLength);
  const indexPad = pad4(indices.byteLength);
  const bin = new Uint8Array(positions.byteLength + indices.byteLength + indexPad);
  bin.set(positions, 0);
  bin.set(indices, positions.byteLength);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let v = 0; v < mesh.positions.length; v += 3)
    for (let k = 0; k < 3; k++) {
      min[k] = Math.min(min[k] ?? Infinity, mesh.positions[v + k] ?? 0);
      max[k] = Math.max(max[k] ?? -Infinity, mesh.positions[v + k] ?? 0);
    }
  const { region } = manifest;
  // The heights are whole centimetres, so a metre figure keeps two places and none of the float's noise.
  const minHeight = Math.round(Math.min(...heights) * 100) / 100;
  const maxHeight = Math.round(Math.max(...heights) * 100) / 100;
  const name = `lidar_${String(tile.e)}_${String(tile.n)}_${String(step)}m`;
  const json = {
    asset: { version: '2.0', generator: 'Llandeilo Through Time, tools/terrain/export-glb.ts' },
    scene: 0,
    scenes: [
      {
        nodes: [0],
        extras: {
          crs: 'EPSG:27700',
          sceneOriginBng: { e: region.eMin, n: region.nMin },
          axes: 'x is metres east, y is metres up, and z is minus the metres north, of the scene origin; a node’s translation puts its tile in place',
        },
      },
    ],
    nodes: [
      {
        name,
        mesh: 0,
        translation: [tile.e - region.eMin, 0, -(tile.n - region.nMin)],
        extras: {
          crs: 'EPSG:27700',
          tileOriginBng: { e: tile.e, n: tile.n },
          tileOriginMeaning:
            'the tile’s south-west corner, where its own x = 0 and z = 0; BNG easting = e + x, northing = n - z',
          tileSizeMetres: size,
          stepMetres: step,
          cells,
          minHeightMetres: minHeight,
          maxHeightMetres: maxHeight,
          areas: tile.areas,
          heights: `the LiDAR’s own bare-earth heights (the 1m DTM averaged to ${String(tile.step)}m, here ${samplesKept(step / tile.step)}) in metres; the source does not state a vertical datum, and it agrees with OS Terrain 50 (Ordnance Datum Newlyn) to about 0.2m on average`,
          edges: 'edge vertices are shared exactly with the neighbouring tile, so tiles meet without a gap',
        },
      },
    ],
    meshes: [{ name, primitives: [{ attributes: { POSITION: 0 }, indices: 1, material: 0, mode: 4 }] }],
    materials: [
      {
        name: 'ground',
        pbrMetallicRoughness: {
          baseColorFactor: [0.62, 0.6, 0.52, 1],
          metallicFactor: 0,
          roughnessFactor: 1,
        },
      },
    ],
    accessors: [
      { bufferView: 0, componentType: FLOAT, count: mesh.positions.length / 3, type: 'VEC3', min, max },
      {
        bufferView: 1,
        componentType: mesh.indices instanceof Uint16Array ? UNSIGNED_SHORT : UNSIGNED_INT,
        count: mesh.indices.length,
        type: 'SCALAR',
      },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: positions.byteLength, target: ARRAY_BUFFER },
      {
        buffer: 0,
        byteOffset: positions.byteLength,
        byteLength: indices.byteLength,
        target: ELEMENT_ARRAY_BUFFER,
      },
    ],
    buffers: [{ byteLength: bin.byteLength }],
  };
  return { glb: { json, bin }, minHeight, maxHeight };
}

export function exportTerrain(outDir: string, step?: number): TerrainExport[] {
  const { manifest, data } = loadLidar();
  const at = step ?? detailStep(manifest);
  const stamp = assetFor(tileFile(0, 0));
  if (!stamp) throw new Error('assets.ts has no record for the terrain glbs');
  mkdirSync(outDir, { recursive: true });
  return detailedTiles(manifest)
    .sort((a, b) => a.n - b.n || a.e - b.e)
    .map((tile) => {
      const samples = data.get(`${String(tile.e)}_${String(tile.n)}`);
      if (!samples) throw new Error(`no data for tile ${String(tile.e)} ${String(tile.n)}`);
      const built = tileGlb(manifest, tile, samples, at);
      const bytes = writeGlb(stampAsset(built.glb, stamp));
      const file = tileFile(tile.e, tile.n);
      writeFileSync(join(outDir, file), bytes);
      const triangles = (manifest.tileSize / at) ** 2 * 2;
      const sha256 = createHash('sha256').update(bytes).digest('hex');
      console.log(
        `dewidebug terrain glb ${file} step=${String(at)}m triangles=${String(triangles)} bytes=${String(bytes.byteLength)} sha256=${sha256.slice(0, 12)}`,
      );
      return {
        file,
        e: tile.e,
        n: tile.n,
        size: manifest.tileSize,
        step: at,
        areas: tile.areas,
        bytes: bytes.byteLength,
        sha256,
        triangles,
        minHeight: built.minHeight,
        maxHeight: built.maxHeight,
      };
    });
}

/** The generated module the Downloads list reads the tiles from: what the release carries, so its sizes are the files'. */
export function manifestSource(list: readonly TerrainExport[]): string {
  return `// Generated by tools/terrain/export-glb.ts (npm run terrain-glb -- <outdir>): do not edit. The tiles are attached to each GitHub release.\nimport type { TerrainTileFile } from '../downloads.ts';\n\nexport const TERRAIN_TILES: readonly TerrainTileFile[] = ${JSON.stringify(list, null, 2)};\n`;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const flag = (name: string): string | undefined => args[args.indexOf(name) + 1];
  const out = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--step');
  if (!out) throw new Error('usage: npm run terrain-glb -- <outdir> [--step <metres>] [--no-manifest]');
  const step = args.includes('--step') ? Number(flag('--step')) : undefined;
  if (step !== undefined && (!Number.isInteger(step) || step < 1))
    throw new Error('--step needs a whole number of metres');
  const list = exportTerrain(out, step);
  const total = list.reduce((sum, t) => sum + t.bytes, 0);
  if (!args.includes('--no-manifest')) {
    writeFileSync(MANIFEST, manifestSource(list));
    console.log(`dewidebug terrain glb wrote the manifest ${MANIFEST}`);
  }
  console.log(`dewidebug terrain glb wrote ${String(list.length)} tiles into ${out}: ${String(total)} bytes`);
}
