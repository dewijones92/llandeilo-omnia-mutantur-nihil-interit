import { describe, expect, it } from 'vitest';
import { inWorldBox, snGridRef } from './geo.ts';

describe('a box in world units', () => {
  const box = { xMin: -10, xMax: 20, zMin: 5, zMax: 15 };

  it('holds the points on and inside its edges', () => {
    expect(inWorldBox(box, 0, 10)).toBe(true);
    expect(inWorldBox(box, -10, 5)).toBe(true);
    expect(inWorldBox(box, 20, 15)).toBe(true);
  });

  it('leaves out a point beyond any one edge', () => {
    expect(inWorldBox(box, -10.1, 10)).toBe(false);
    expect(inWorldBox(box, 20.1, 10)).toBe(false);
    expect(inWorldBox(box, 0, 4.9)).toBe(false);
    expect(inWorldBox(box, 0, 15.1)).toBe(false);
  });
});

describe('a grid reference in square SN', () => {
  it('is the last five digits of each, padded', () => {
    expect(snGridRef({ e: 262000, n: 221000 })).toBe('SN 62000 21000');
    expect(snGridRef({ e: 262757, n: 222001 })).toBe('SN 62757 22001');
    expect(snGridRef({ e: 200003, n: 299999 })).toBe('SN 00003 99999');
  });

  it('refuses a point outside the square, where SN would be the wrong letters', () => {
    expect(() => snGridRef({ e: 300000, n: 222000 })).toThrow(/not in the grid square SN/);
    expect(() => snGridRef({ e: 262000, n: 199999 })).toThrow(/not in the grid square SN/);
  });
});
