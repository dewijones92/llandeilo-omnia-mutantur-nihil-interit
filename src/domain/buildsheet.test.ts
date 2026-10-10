import { describe, expect, it } from 'vitest';
import { buildSheet, FOOT, liesOnGround, modelFile, PROBE, SEATED, type SheetInput } from './buildsheet.ts';
import { toHex } from './colour.ts';
import { MATERIAL_COLOUR } from './materials.ts';
import { RAISED_DROP } from './proportions.ts';
import type { Part, PartMeta, PartShape, Plan } from './plan.ts';
import type { Provenance, SourceId } from './provenance.ts';
import { mint } from './brand.ts';

const S1 = mint<SourceId>('fort:S1');
const known: Provenance = { kind: 'documented', sources: [S1] };
const guess: Provenance = { kind: 'imagined', groundedIn: { en: 'a guess', cy: 'dyfaliad' }, sources: [] };

const part = (shape: PartShape, id: string, extra: Partial<PartMeta> = {}): Part => ({
  ...shape,
  id,
  name: { en: id, cy: id },
  provenance: known,
  ...extra,
});

const tower: Extract<PartShape, { type: 'tower' }> = {
  type: 'tower',
  at: [10, 0],
  shape: 'square',
  size: 4,
  height: 7,
  top: 'pyramid',
  material: 'timber',
  roofMaterial: 'timber',
};
const hall: Extract<PartShape, { type: 'hall' }> = {
  type: 'hall',
  at: [0, 5],
  length: 20,
  width: 8,
  angle: 0,
  height: 3,
  roof: 'gable',
  pitch: 0.3,
  roofMaterial: 'timber',
  material: 'daub',
};
const bank: Extract<PartShape, { type: 'wall' }> = {
  type: 'wall',
  path: [
    [0, 0],
    [10, 0],
  ],
  height: 3,
  thickness: 4,
  taper: 0.5,
  top: 'plain',
  material: 'turf',
};

const input = (plan: Plan, extra: Partial<SheetInput> = {}): SheetInput => ({
  feature: 'test-fort',
  landmark: 'test',
  at: { e: 262000, n: 222000 },
  plan,
  condition: 'standing',
  kitParams: (id) => ({ [id]: 1 }),
  ...extra,
});

const plan = (parts: readonly Part[], angle = 0): Plan => ({ setting: 'true', angle, parts });

describe('the build sheet a Blender model is made from', () => {
  it('turns plan points into metres east and north of the grid reference, by the plan’s angle', () => {
    const sheet = buildSheet(input(plan([part({ ...tower, angle: 15 }, 't')], 90)));
    const t = sheet.parts[0];
    expect(t?.shape.type === 'tower' && t.shape.at[0]).toBeCloseTo(0, 9);
    expect(t?.shape.type === 'tower' && t.shape.at[1]).toBeCloseTo(10, 9);
    expect(t?.shape.type === 'tower' && t.shape.turn).toBe(105);
    expect(sheet.anchor).toEqual({ e: 262000, n: 222000 });
    expect(sheet.crs).toBe('EPSG:27700');
  });

  it('leaves ditches, roads and platforms to the app, which draws them on its own ground', () => {
    const ditch = part(
      {
        type: 'ditch',
        path: [
          [0, 0],
          [10, 0],
        ],
        width: 2,
      },
      'd',
    );
    const road = part(
      {
        type: 'road',
        path: [
          [0, 0],
          [5, 0],
        ],
        width: 5,
        material: 'rubble',
      },
      'r',
    );
    const pad = part(
      {
        type: 'platform',
        outline: [
          [0, 0],
          [1, 0],
          [1, 1],
        ],
        face: 'rock',
      },
      'p',
    );
    const sheet = buildSheet(input(plan([part(tower, 't'), ditch, road, pad])));
    expect(sheet.parts.map((p) => p.id)).toEqual(['t']);
    expect(sheet.procedural).toEqual(['d', 'r', 'p']);
    expect([ditch, road, pad, part(tower, 't')].map(liesOnGround)).toEqual([true, true, true, false]);
  });

  it('puts every standing part in the near model and leaves the detail parts out of the far one', () => {
    const sheet = buildSheet(input(plan([part(tower, 't'), part(hall, 'h', { detail: true })])));
    expect(sheet.levels).toEqual({ near: ['t', 'h'], far: ['t'] });
    expect(sheet.parts.find((p) => p.id === 'h')?.detail).toBe(true);
  });

  it('carries each part’s tier and source ids, so the model’s ⓘ can be checked against the plan', () => {
    const sheet = buildSheet(input(plan([part(tower, 't'), part(hall, 'h', { provenance: guess })])));
    expect(sheet.parts.map((p) => [p.id, p.tier, p.sources])).toEqual([
      ['t', 'documented', ['fort:S1']],
      ['h', 'imagined', []],
    ]);
  });

  it('sinks standing walls into the ground, hangs raised floors as the procedural one does, and seats a wall set on another', () => {
    const raised = part({ ...hall, base: 4.2, roof: 'none' }, 'deck');
    const breast = part(
      {
        type: 'wall',
        path: bank.path,
        base: 3,
        height: 1.7,
        thickness: 0.5,
        top: 'plain',
        material: 'timber',
      },
      'breast',
    );
    const sheet = buildSheet(input(plan([part(tower, 't'), raised, part(bank, 'bank'), breast])));
    const shape = (id: string) => sheet.parts.find((p) => p.id === id)?.shape;
    expect(shape('t')).toMatchObject({ bottom: -FOOT, top: 7 });
    expect(shape('deck')).toMatchObject({ bottom: 4.2 - RAISED_DROP, top: 4.2 + 3, roof: null });
    expect(shape('bank')).toMatchObject({
      bottom: -FOOT,
      top: 3,
      taper: 0.5,
      battlements: false,
      closed: false,
    });
    const breastShape = shape('breast');
    expect(breastShape).toMatchObject({ bottom: 3 - SEATED, taper: 1 });
    expect(breastShape?.top).toBeCloseTo(4.7, 9);
  });

  it('lays banks over the ground vertex by vertex and stands towers and halls on the ground at their own point', () => {
    const sheet = buildSheet(input(plan([part(bank, 'bank'), part(tower, 't'), part(hall, 'h')])));
    expect(sheet.parts.map((p) => p.fit)).toEqual([
      { kind: 'follow' },
      { kind: 'rigid', at: [10, 0] },
      { kind: 'rigid', at: [0, 5] },
    ]);
  });

  it('gives roofs the overhangs and rises the procedural builder draws, so model and fallback agree', () => {
    const cone = part(
      { type: 'tower', at: [0, 0], shape: 'round', size: 4, height: 7, top: 'cone', material: 'rubble' },
      'cone',
    );
    const hip = part(
      {
        type: 'hall',
        at: [0, 0],
        length: 20,
        width: 8,
        angle: 0,
        height: 3,
        roof: 'hip',
        material: 'rubble',
      },
      'hip',
    );
    const sheet = buildSheet(input(plan([part(tower, 'pyr'), cone, part(hall, 'gab'), hip])));
    const roof = (id: string) => {
      const s = sheet.parts.find((p) => p.id === id)?.shape;
      return s && s.type !== 'wall' ? s.roof : undefined;
    };
    expect(roof('pyr')).toEqual({
      kind: 'pyramid',
      material: 'timber',
      length: 4.2,
      width: 4.2,
      rise: 4 * 0.35,
    });
    expect(roof('cone')).toMatchObject({ kind: 'cone', material: 'slate', rise: 4 * 0.95 });
    expect(roof('gab')).toEqual({
      kind: 'gable',
      material: 'timber',
      length: 20.4,
      width: 8.5,
      rise: 8 * 0.3,
    });
    expect(roof('hip')).toMatchObject({ kind: 'hip', material: 'slate', rise: 8 * 0.45 });
  });

  it('draws no roof on a flat-topped tower or a hall with none, a parapet or battlements', () => {
    const flat = (['plain', 'battlements', 'machicolated'] as const).map((top, i) =>
      part({ ...tower, top }, `t${String(i)}`),
    );
    const open = (['none', 'parapet', 'battlements'] as const).map((roof, i) =>
      part({ ...hall, roof }, `h${String(i)}`),
    );
    const sheet = buildSheet(input(plan([...flat, ...open])));
    for (const p of sheet.parts) expect(p.shape.type !== 'wall' && p.shape.roof, p.id).toBeNull();
  });

  it('turns a leaf’s hinge with the plan, so its origin goes on the hinge post', () => {
    const leaf = part({ ...hall, length: 1.8, width: 0.25, roof: 'none' }, 'leaf', {
      hinge: { at: [5, 0], closed: 180, drawn: 115 },
    });
    const sheet = buildSheet(input(plan([leaf], 90)));
    const h = sheet.parts[0]?.hinge;
    expect(h?.at[0]).toBeCloseTo(0, 9);
    expect(h?.at[1]).toBeCloseTo(5, 9);
    expect([h?.closed, h?.drawn]).toEqual([270, 205]);
  });

  it('takes each kit’s measurements from the catalogue, only for the kits the parts ask for', () => {
    const asked: string[] = [];
    const sheet = buildSheet(
      input(
        plan([
          part(tower, 't', { kits: ['shingle-roof', 'post-tower-six'] }),
          part(hall, 'h', { kits: ['shingle-roof'] }),
        ]),
        {
          kitParams: (id) => {
            asked.push(id);
            return { course: 0.3 };
          },
        },
      ),
    );
    expect(Object.keys(sheet.kits)).toEqual(['post-tower-six', 'shingle-roof']);
    expect(asked.sort()).toEqual(['post-tower-six', 'shingle-roof']);
    expect(sheet.parts.map((p) => p.kits)).toEqual([['shingle-roof', 'post-tower-six'], ['shingle-roof']]);
  });

  it('carries the one palette, the setting’s scale and the probe, so the script holds no copy of any', () => {
    const sheet = buildSheet(input({ setting: 'landscape', parts: [part(tower, 't')] }));
    expect(sheet.palette['turf']).toBe(toHex(MATERIAL_COLOUR.turf));
    expect(Object.keys(sheet.palette).sort()).toEqual(Object.keys(MATERIAL_COLOUR).sort());
    expect(sheet.scale).toEqual({ across: 2.6, up: 2.6 });
    expect(sheet.probe).toEqual(PROBE);
  });

  it('refuses what it cannot model yet, rather than drawing it wrong: a ruin, a prism, a bridge', () => {
    expect(() => buildSheet(input(plan([part(tower, 't')]), { condition: 'ruin' }))).toThrow(/ruin/);
    const prism = part(
      {
        type: 'prism',
        outline: [
          [0, 0],
          [1, 0],
          [1, 1],
        ],
        height: 2,
        top: 'plain',
        material: 'rubble',
      },
      'p',
    );
    expect(() => buildSheet(input(plan([prism])))).toThrow(/prism/);
    const bridge = part(
      { type: 'bridge', from: [0, 0], to: [10, 0], width: 4, height: 5, arches: [], material: 'rubble' },
      'b',
    );
    expect(() => buildSheet(input(plan([bridge])))).toThrow(/bridge/);
  });

  it('refuses a part without its own id or provenance, which its ⓘ in the model would need', () => {
    expect(() => buildSheet(input(plan([{ ...tower }])))).toThrow(/id/);
    expect(() => buildSheet(input(plan([{ ...tower, id: 'x' }])))).toThrow(/provenance/);
    expect(() =>
      buildSheet(input(plan([part(tower, 't'), { type: 'road', path: [], width: 1, material: 'rubble' }]))),
    ).toThrow(/id/);
  });

  it('names each level’s published file after the feature', () => {
    expect(modelFile('roman-fort-a', 'near')).toBe('models/landmarks/roman-fort-a.near.glb');
    expect(modelFile('roman-fort-a', 'far')).toBe('models/landmarks/roman-fort-a.far.glb');
  });
});
