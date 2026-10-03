import { clamp } from './assert.ts';
import type { GridRef } from './model.ts';

export interface HeightfieldMeta {
  readonly originEasting: number;
  readonly originNorthing: number;
  readonly cellSize: number;
  readonly width: number;
  readonly height: number;
  readonly heightScale: number;
}

export interface Heightfield {
  readonly meta: HeightfieldMeta;
  readonly data: Uint16Array;
}

export function createHeightfield(meta: HeightfieldMeta, data: Uint16Array): Heightfield {
  if (data.length !== meta.width * meta.height) {
    throw new Error(`Heightfield has ${data.length} samples, expected ${meta.width * meta.height}`);
  }
  return { meta, data };
}

export function highestM(h: Heightfield): number {
  let top = 0;
  for (const v of h.data) top = Math.max(top, v);
  return top * h.meta.heightScale;
}

function at(h: Heightfield, col: number, row: number): number {
  const c = clamp(col, 0, h.meta.width - 1);
  const r = clamp(row, 0, h.meta.height - 1);
  return (h.data[r * h.meta.width + c] ?? 0) * h.meta.heightScale;
}

export function sampleHeight(h: Heightfield, g: GridRef): number {
  const { originEasting, originNorthing, cellSize } = h.meta;
  const fx = (g.e - originEasting) / cellSize - 0.5;
  const fy = (originNorthing - g.n) / cellSize - 0.5;
  const c0 = Math.floor(fx);
  const r0 = Math.floor(fy);
  const tx = fx - c0;
  const ty = fy - r0;
  const top = at(h, c0, r0) * (1 - tx) + at(h, c0 + 1, r0) * tx;
  const bottom = at(h, c0, r0 + 1) * (1 - tx) + at(h, c0 + 1, r0 + 1) * tx;
  return top * (1 - ty) + bottom * ty;
}
