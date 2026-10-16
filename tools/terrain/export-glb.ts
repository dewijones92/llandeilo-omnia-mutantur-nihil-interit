// node tools/terrain/export-glb.ts [--step <metres>] [--out <dir>]: writes each detailed LiDAR tile of public/data/lidar
// as a .glb (ADR 0058), from the same tiles and the same cut of each cell into triangles that the app draws. Heights are
// the LiDAR's own: no blending into the coarser terrain, no river channels, no period earthworks. `npm run downloads` runs it.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { assetFor } from '../../src/content/assets.ts';
import { parseManifest, tileData, type LidarManifest, type LidarTileInfo } from '../../src/domain/lidar.ts';
import { gridMesh } from '../../src/domain/tilemesh.ts';
import { stampAsset } from '../downloads/stamp.ts';
import { writeGlb, type Glb } from '../models/glb.ts';

const ROOT = join(import.meta.dirname, '../..');
const LIDAR_DIR = join(ROOT, 'public/data/lidar');
export const TERRAIN_DIR = 'models/terrain';
/** The step each tile is exported at: the app's own near mesh, which keeps the whole set small enough to commit. */
export const EXPORT_STEP_M = 4;

export interface TerrainExport {
  readonly file: string;
  readonly e: number;
  readonly n: number;
  readonly size: number;
  readonly step: number;
  readonly areas: readonly string[];
  readonly bytes: number;
  readonly triangles: number;
  readonly minHeight: number;
  readonly maxHeight: number;
}

export const terrainFile = (e: number, n: number): string =>
  `${TERRAIN_DIR}/lidar-${String(e)}-${String(n)}.glb`;

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
          heights:
            'the LiDAR’s own bare-earth heights (the 1m DTM averaged to 2m, here every ' +
            `${String(step / tile.step)}th sample) in metres; the source does not state a vertical datum, and it agrees with OS Terrain 50 (Ordnance Datum Newlyn) to about 0.2m on average`,
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

export function exportTerrain(outRoot: string, step: number = EXPORT_STEP_M): TerrainExport[] {
  const { manifest, data } = loadLidar();
  const stamp = assetFor(terrainFile(0, 0));
  if (!stamp) throw new Error('assets.ts has no record for the terrain glbs');
  mkdirSync(join(outRoot, TERRAIN_DIR), { recursive: true });
  return detailedTiles(manifest).map((tile) => {
    const samples = data.get(`${String(tile.e)}_${String(tile.n)}`);
    if (!samples) throw new Error(`no data for tile ${String(tile.e)} ${String(tile.n)}`);
    const built = tileGlb(manifest, tile, samples, step);
    const bytes = writeGlb(stampAsset(built.glb, stamp));
    const file = terrainFile(tile.e, tile.n);
    writeFileSync(join(outRoot, file), bytes);
    const triangles = (manifest.tileSize / step) ** 2 * 2;
    console.log(
      `dewidebug terrain glb ${file} step=${String(step)}m triangles=${String(triangles)} bytes=${String(bytes.byteLength)}`,
    );
    return {
      file,
      e: tile.e,
      n: tile.n,
      size: manifest.tileSize,
      step,
      areas: tile.areas,
      bytes: bytes.byteLength,
      triangles,
      minHeight: built.minHeight,
      maxHeight: built.maxHeight,
    };
  });
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const flag = (name: string): string | undefined => args[args.indexOf(name) + 1];
  const step = args.includes('--step') ? Number(flag('--step')) : EXPORT_STEP_M;
  if (!Number.isInteger(step) || step < 1) throw new Error('--step needs a whole number of metres');
  const out = args.includes('--out') ? (flag('--out') ?? '') : join(ROOT, 'public');
  const list = exportTerrain(out, step);
  console.log(
    `dewidebug terrain glb wrote ${String(list.length)} tiles at ${String(step)}m into ${out}: ${String(list.reduce((s, t) => s + t.bytes, 0))} bytes`,
  );
}
