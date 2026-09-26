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

export async function loadRivers(): Promise<readonly RiverLine[]> {
  const res = await fetch(asset('data/rivers.json'));
  if (!res.ok) throw new Error(`rivers fetch failed: ${res.status}`);
  const raw = (await res.json()) as {
    features: {
      properties: { watercourse_name: string | null };
      geometry: { type: string; coordinates: number[][] };
    }[];
  };
  const lines: RiverLine[] = [];
  for (const f of raw.features) {
    if (f.geometry.type !== 'LineString') continue;
    lines.push({
      name: f.properties.watercourse_name,
      points: f.geometry.coordinates.map(([e = 0, n = 0]) => ({ e, n })),
    });
  }
  console.info(`dewidebug rivers loaded lines=${lines.length}`);
  return lines;
}
