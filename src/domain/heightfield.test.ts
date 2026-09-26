import { describe, expect, it } from 'vitest';
import { createHeightfield, sampleHeight } from './heightfield.ts';

describe('heightfield', () => {
  const meta = { originEasting: 0, originNorthing: 100, cellSize: 50, width: 2, height: 2, heightScale: 0.1 };
  const hf = createHeightfield(meta, Uint16Array.from([0, 1000, 2000, 3000]));

  it('returns cell values at cell centres', () => {
    expect(sampleHeight(hf, { e: 25, n: 75 })).toBeCloseTo(0);
    expect(sampleHeight(hf, { e: 75, n: 75 })).toBeCloseTo(100);
    expect(sampleHeight(hf, { e: 25, n: 25 })).toBeCloseTo(200);
  });

  it('interpolates between cells', () => {
    expect(sampleHeight(hf, { e: 50, n: 50 })).toBeCloseTo(150);
  });

  it('rejects data of the wrong size', () => {
    expect(() => createHeightfield(meta, new Uint16Array(3))).toThrow(/expected 4/);
  });
});
