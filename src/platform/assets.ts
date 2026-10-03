import type { GridRef } from '../domain/model.ts';
import { createHeightfield, type Heightfield, type HeightfieldMeta } from '../domain/heightfield.ts';

export interface RiverLine {
  readonly name: string | null;
  readonly points: readonly GridRef[];
}

function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function num(v: unknown, field: string): number {
  if (typeof v !== 'number') throw new Error(`terrain.json: ${field} is not a number`);
  return v;
}

export async function loadHeightfield(): Promise<Heightfield> {
  const [metaRes, binRes] = await Promise.all([
    fetch(asset('data/terrain.json')),
    fetch(asset('data/terrain.bin')),
  ]);
  if (!metaRes.ok || !binRes.ok) throw new Error(`terrain fetch failed: ${metaRes.status} ${binRes.status}`);
  const raw: unknown = await metaRes.json();
  if (!isRecord(raw)) throw new Error('terrain.json is not an object');
  const meta: HeightfieldMeta = {
    originEasting: num(raw['originEasting'], 'originEasting'),
    originNorthing: num(raw['originNorthing'], 'originNorthing'),
    cellSize: num(raw['cellSize'], 'cellSize'),
    width: num(raw['width'], 'width'),
    height: num(raw['height'], 'height'),
    heightScale: num(raw['heightScale'], 'heightScale'),
  };
  const data = new Uint16Array(await binRes.arrayBuffer());
  console.info(
    `dewidebug terrain loaded ${meta.width}x${meta.height} cell=${meta.cellSize}m bytes=${data.byteLength}`,
  );
  return createHeightfield(meta, data);
}

function points(v: unknown): GridRef[] {
  if (!Array.isArray(v)) throw new Error('expected an array of points');
  return v.map((p: unknown) => {
    if (!Array.isArray(p) || typeof p[0] !== 'number' || typeof p[1] !== 'number')
      throw new Error('bad point');
    return { e: p[0], n: p[1] };
  });
}

export async function loadRivers(): Promise<readonly RiverLine[]> {
  const res = await fetch(asset('data/rivers.json'));
  if (!res.ok) throw new Error(`rivers fetch failed: ${res.status}`);
  const raw: unknown = await res.json();
  if (!isRecord(raw) || !Array.isArray(raw['features'])) throw new Error('rivers.json has no features');
  const lines: RiverLine[] = [];
  for (const f of raw['features'] as unknown[]) {
    if (!isRecord(f) || !isRecord(f['geometry']) || !isRecord(f['properties'])) continue;
    if (f['geometry']['type'] !== 'LineString') continue;
    const name = f['properties']['watercourse_name'];
    lines.push({
      name: typeof name === 'string' ? name : null,
      points: points(f['geometry']['coordinates']),
    });
  }
  console.info(`dewidebug rivers loaded lines=${lines.length}`);
  return lines;
}

export interface BuildingFootprints {
  readonly count: number;
  readonly data: Float32Array;
}

export async function loadBuildings(): Promise<BuildingFootprints> {
  const res = await fetch(asset('data/buildings.bin'));
  if (!res.ok) throw new Error(`buildings fetch failed: ${res.status}`);
  const data = new Float32Array(await res.arrayBuffer());
  if (data.length % 5 !== 0) throw new Error(`buildings.bin has ${data.length} floats, not a multiple of 5`);
  console.info(`dewidebug buildings loaded count=${data.length / 5}`);
  return { count: data.length / 5, data };
}

export interface MapLine {
  readonly kind: string;
  readonly points: readonly GridRef[];
}

async function loadLines(path: string): Promise<readonly MapLine[]> {
  const res = await fetch(asset(path));
  if (!res.ok) throw new Error(`${path} fetch failed: ${res.status}`);
  return parseLines(await res.json(), path);
}

/** Checks a lines file (railways.json, roads.json) and turns its [e, n] pairs into grid refs. */
export function parseLines(raw: unknown, path: string): MapLine[] {
  if (!isRecord(raw) || !Array.isArray(raw['lines'])) throw new Error(`${path} has no lines`);
  return (raw['lines'] as unknown[]).map((l) => {
    if (!isRecord(l) || typeof l['kind'] !== 'string') throw new Error(`${path}: bad line`);
    return { kind: l['kind'], points: points(l['points']) };
  });
}

export const loadRailways = (): Promise<readonly MapLine[]> => loadLines('data/railways.json');
export const loadRoads = (): Promise<readonly MapLine[]> => loadLines('data/roads.json');

export async function loadWoodland(): Promise<Uint8Array> {
  const res = await fetch(asset('data/woodland.bin'));
  if (!res.ok) throw new Error(`woodland fetch failed: ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}
