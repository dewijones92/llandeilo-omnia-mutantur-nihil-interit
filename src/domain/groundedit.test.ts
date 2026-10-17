import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import {
  activeEdits,
  applyEdits,
  checkEdit,
  editDelta,
  editsKey,
  type GroundEdit,
  type GroundEditId,
} from './groundedit.ts';
import type { SourceId } from './provenance.ts';
import { ad, range } from './time.ts';

const source = mint<SourceId>('test:S1');

function edit(id: string, over: Partial<GroundEdit> = {}): GroundEdit {
  return {
    id: mint<GroundEditId>(id),
    when: range(ad(74), ad(120)),
    area: { eMin: 900, eMax: 1100, nMin: 400, nMax: 600 },
    shape: {
      kind: 'ridge',
      line: [
        { e: 950, n: 500 },
        { e: 1050, n: 500 },
      ],
      halfWidth: 4,
      metres: 2,
      slope: 6,
    },
    provenance: { kind: 'reconstructed', basis: { en: 'test', cy: 'prawf' }, sources: [source] },
    ...over,
  };
}

describe('ground edits', () => {
  it('apply only in the years they name', () => {
    const a = edit('a');
    const b = edit('b', { when: range(ad(200), ad(300)) });
    expect(activeEdits([a, b], ad(100))).toEqual([a]);
    expect(activeEdits([a, b], ad(74))).toEqual([a]);
    expect(activeEdits([a, b], ad(250))).toEqual([b]);
    expect(activeEdits([a, b], ad(1000))).toEqual([]);
  });

  it('raise the ground along a line, easing off over the slope', () => {
    const rampart = edit('rampart');
    expect(editDelta(rampart, { e: 1000, n: 500 }, 50)).toBeCloseTo(2);
    expect(editDelta(rampart, { e: 1000, n: 504 }, 50)).toBeCloseTo(2);
    expect(editDelta(rampart, { e: 1000, n: 507 }, 50)).toBeCloseTo(1);
    expect(editDelta(rampart, { e: 1000, n: 510 }, 50)).toBeCloseTo(0);
    expect(editDelta(rampart, { e: 1000, n: 560 }, 50)).toBe(0);
  });

  it('measure to the line itself, with rounded ends', () => {
    const rampart = edit('rampart');
    expect(editDelta(rampart, { e: 950, n: 500 }, 50)).toBeCloseTo(2);
    expect(editDelta(rampart, { e: 946, n: 500 }, 50)).toBeCloseTo(2);
    expect(editDelta(rampart, { e: 930, n: 500 }, 50)).toBe(0);
  });

  it('cut a ditch with a negative height', () => {
    const ditch = edit('ditch', {
      shape: {
        kind: 'ridge',
        line: [
          { e: 950, n: 500 },
          { e: 1050, n: 500 },
        ],
        halfWidth: 3,
        metres: -1.5,
        slope: 4,
      },
    });
    expect(editDelta(ditch, { e: 1000, n: 500 }, 50)).toBeCloseTo(-1.5);
    expect(editDelta(ditch, { e: 1000, n: 505 }, 50)).toBeCloseTo(-0.75);
  });

  it('level a platform: the ground is drawn to a set height, easing back to what lies round it', () => {
    const fort = edit('fort', {
      shape: { kind: 'level', centre: { e: 1000, n: 500 }, radius: 40, metres: 60, slope: 20 },
    });
    expect(editDelta(fort, { e: 1000, n: 500 }, 50)).toBeCloseTo(10);
    expect(editDelta(fort, { e: 1000, n: 500 }, 64)).toBeCloseTo(-4);
    expect(editDelta(fort, { e: 1050, n: 500 }, 50)).toBeCloseTo(5);
    expect(editDelta(fort, { e: 1070, n: 500 }, 50)).toBe(0);
    expect(applyEdits(50, { e: 1000, n: 500 }, [fort])).toBeCloseTo(60);
  });

  it('level a terrace: a turned rectangle cut and filled to a set height, easing into the slope round it', () => {
    const plot = edit('plot', {
      shape: {
        kind: 'terrace',
        centre: { e: 1000, n: 500 },
        halfLength: 20,
        halfWidth: 5,
        angle: 90,
        metres: 60,
        slope: 2,
      },
    });
    // Its length runs north (90 degrees from east), so 18m north is still on it and 18m east is not.
    expect(applyEdits(63, { e: 1000, n: 518 }, [plot])).toBeCloseTo(60);
    expect(applyEdits(57, { e: 1004.9, n: 480.1 }, [plot])).toBeCloseTo(60);
    expect(editDelta(plot, { e: 1018, n: 500 }, 57)).toBeCloseTo(0);
    expect(editDelta(plot, { e: 1006, n: 500 }, 64)).toBeCloseTo(-2);
    expect(editDelta(plot, { e: 1007, n: 500 }, 64)).toBeCloseTo(0);
    expect(editDelta(plot, { e: 1000, n: 521 }, 58)).toBeCloseTo(1);
    // Past a corner the distance is to the corner, not to either side's line.
    expect(editDelta(plot, { e: 1006, n: 521 }, 58)).toBeGreaterThan(0);
    expect(editDelta(plot, { e: 1006.5, n: 521.5 }, 58)).toBeCloseTo(0);
  });

  it('add together on the base ground, and leave it alone outside their area', () => {
    const a = edit('a');
    const b = edit('b', {
      shape: {
        kind: 'ridge',
        line: [
          { e: 1000, n: 450 },
          { e: 1000, n: 550 },
        ],
        halfWidth: 4,
        metres: 1,
        slope: 6,
      },
    });
    expect(applyEdits(50, { e: 1000, n: 500 }, [a, b])).toBeCloseTo(53);
    expect(applyEdits(50, { e: 1000, n: 500 }, [])).toBe(50);
    expect(applyEdits(50, { e: 5000, n: 500 }, [a, b])).toBe(50);
  });

  it('are named by the set of edits drawn, whatever their order', () => {
    expect(editsKey([edit('b'), edit('a')])).toBe(editsKey([edit('a'), edit('b')]));
    expect(editsKey([edit('a')])).not.toBe(editsKey([edit('a'), edit('b')]));
    expect(editsKey([])).toBe('');
  });

  it('must lie wholly inside the detail region, clear of its blended rim', () => {
    const region = { eMin: 0, eMax: 2000, nMin: 0, nMax: 1000 };
    expect(() => {
      checkEdit(edit('a'), region, 300);
    }).not.toThrow();
    expect(() => {
      checkEdit(edit('a', { area: { eMin: 100, eMax: 1100, nMin: 400, nMax: 600 } }), region, 300);
    }).toThrow(/rim/);
    const line = [
      { e: 950, n: 500 },
      { e: 1095, n: 500 },
    ];
    expect(() => {
      checkEdit(
        edit('a', { shape: { kind: 'ridge', line, halfWidth: 4, metres: 2, slope: 6 } }),
        region,
        300,
      );
    }).toThrow(/area/);
    const platform = {
      kind: 'level',
      centre: { e: 1000, n: 500 },
      radius: 80,
      metres: 60,
      slope: 30,
    } as const;
    expect(() => {
      checkEdit(edit('a', { shape: platform }), region, 300);
    }).toThrow(/area/);
    expect(() => {
      checkEdit(edit('a', { shape: { ...platform, radius: 60 } }), region, 300);
    }).not.toThrow();
  });
});
