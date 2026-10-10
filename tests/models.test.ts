import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LANDMARK_MODELS } from '../src/content/generated/models.ts';
import { KITS, kitInfo, kitParams } from '../src/content/kits.ts';
import { MODELLED, modelSheets } from '../src/content/landmarks.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { liesOnGround, MODEL_BUDGET, PROBE, type BuildSheet } from '../src/domain/buildsheet.ts';
import type { Feature } from '../src/domain/model.ts';
import { KIT_IDS, type Part } from '../src/domain/plan.ts';
import { glbCounts, readGlb, type GlbJson } from '../tools/models/glb.ts';
import { inputHash, sheets } from '../tools/models/sheets.ts';

const root = join(import.meta.dirname, '..');
const LEVELS = ['near', 'far'] as const;
const SHEETS = sheets();

const feature = (id: string): Feature => {
  const f = W.features.find((x) => x.id === id);
  if (!f) throw new Error(`no feature ${id}`);
  return f;
};
const planParts = (id: string): readonly Part[] => {
  const k = feature(id).kind;
  if (k.type !== 'building') throw new Error(`${id} has no plan`);
  return k.plan.parts;
};
const sheetOf = (id: string): BuildSheet => {
  const s = SHEETS.find((x) => x.feature === id);
  if (!s) throw new Error(`no sheet ${id}`);
  return s;
};
const glb = (file: string): GlbJson => readGlb(readFileSync(join(root, 'public', file))).json;
const partNodes = (json: GlbJson) =>
  json.nodes.flatMap((n) => {
    const e = n.extras;
    return e && typeof e['part'] === 'string' ? [{ node: n, id: e['part'], extras: e }] : [];
  });

describe('the Blender landmark models (ADR 0053)', () => {
  it('lists a model for every modelled feature in the index, and no other, with both levels on disk', () => {
    expect(LANDMARK_MODELS.map((m) => m.feature)).toEqual(MODELLED.map((m) => m.feature));
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS)
        expect(existsSync(join(root, 'public', m[level].file)), m[level].file).toBe(true);
  });

  it('is up to date with its plan, the Blender script and the finishing step: run `npm run models` if not', () => {
    const stale = LANDMARK_MODELS.filter((m) => m.inputHash !== inputHash(sheetOf(m.feature)));
    expect(stale.map((m) => m.feature)).toEqual([]);
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS)
        expect(glb(m[level].file).scenes?.[0]?.extras?.['inputHash']).toBe(m.inputHash);
  });

  it('holds every standing part of the plan in the near model and every part not marked detail in the far one, each once', () => {
    for (const m of LANDMARK_MODELS) {
      const standing = planParts(m.feature).filter((p) => !liesOnGround(p));
      for (const level of LEVELS) {
        const want = standing.filter((p) => level === 'near' || !p.detail).map((p) => p.id);
        const got = partNodes(glb(m[level].file)).map((n) => n.id);
        expect(got.toSorted(), `${m.feature} ${level}`).toEqual(want.toSorted());
        expect(new Set(got).size).toBe(got.length);
      }
    }
  });

  it('gives each part in the model the plan’s tier, sources and kits, so its ⓘ says what the plan says', () => {
    for (const m of LANDMARK_MODELS) {
      const byId = new Map(planParts(m.feature).map((p) => [p.id, p]));
      for (const level of LEVELS)
        for (const { id, extras } of partNodes(glb(m[level].file))) {
          const p = byId.get(id);
          expect(p, id).toBeDefined();
          expect(extras['tier'], id).toBe(p?.provenance?.kind);
          expect(extras['sources'], id).toEqual(p?.provenance?.sources);
          expect(extras['kits'], id).toEqual(p?.kits ?? []);
          expect(extras['detail'], id).toBe(p?.detail === true);
        }
    }
  });

  it('draws no kit the catalogue lacks and no kit its part did not ask for', () => {
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS)
        for (const { id, extras } of partNodes(glb(m[level].file))) {
          const kits = extras['kits'];
          expect(Array.isArray(kits), id).toBe(true);
          if (Array.isArray(kits)) for (const k of kits) expect(KIT_IDS, `${id} ${String(k)}`).toContain(k);
        }
  });

  it('is anchored on its feature’s grid reference, with the probe 10m east and 10m north of it, so it cannot come out turned or mirrored', () => {
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS) {
        const json = glb(m[level].file);
        const scene = json.scenes?.[0]?.extras;
        expect(scene?.['anchor']).toEqual(feature(m.feature).at);
        expect(scene?.['crs']).toBe('EPSG:27700');
        expect([scene?.['feature'], scene?.['level']]).toEqual([m.feature, level]);
        const probe = json.nodes.find((n) => n.name?.startsWith('_probe'));
        // glTF is +Y up and -Z north.
        expect(probe?.translation).toEqual([PROBE[0], 0, -PROBE[1]]);
      }
  });

  it('puts each gate leaf’s origin on its hinge post, turned as drawn, so it can swing', () => {
    let leaves = 0;
    for (const m of LANDMARK_MODELS) {
      const sheet = sheetOf(m.feature);
      for (const { node, id } of partNodes(glb(m.near.file))) {
        const hinge = sheet.parts.find((p) => p.id === id)?.hinge;
        if (!hinge) continue;
        leaves++;
        const t = node.translation ?? [];
        expect(t[0], id).toBeCloseTo(hinge.at[0], 4);
        expect(t[2], id).toBeCloseTo(-hinge.at[1], 4);
        const q = node.rotation ?? [0, 0, 0, 1];
        // A turn about glTF's +Y (Blender's +Z), anticlockwise from east seen from above.
        const turn = (2 * Math.atan2(q[1] ?? 0, q[3] ?? 1) * 180) / Math.PI;
        expect(((((turn - hinge.drawn) % 360) + 540) % 360) - 180, id).toBeCloseTo(0, 2);
      }
    }
    expect(leaves).toBe(4 + 8);
  });

  it('stays within its budget at High (ADR 0053), and the index says what the files hold', () => {
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS) {
        const entry = m[level];
        const bytes = readFileSync(join(root, 'public', entry.file)).byteLength;
        const json = glb(entry.file);
        expect(entry.bytes, entry.file).toBe(bytes);
        expect(entry.triangles, entry.file).toBe(glbCounts(json).triangles);
        expect(entry.parts, entry.file).toBe(partNodes(json).length);
        expect(bytes, entry.file).toBeLessThanOrEqual(MODEL_BUDGET[level].bytes);
        expect(entry.triangles, entry.file).toBeLessThanOrEqual(MODEL_BUDGET[level].triangles);
        expect(entry.drawCalls, entry.file).toBeLessThanOrEqual(MODEL_BUDGET[level].drawCalls);
      }
  });

  it('keeps every part id short enough for Blender’s object names', () => {
    for (const s of SHEETS)
      for (const p of s.parts) expect(`${p.id}@far`.length, p.id).toBeLessThanOrEqual(63);
  });

  it('builds no sheet for a feature that is missing or has no plan', () => {
    expect(() => modelSheets([])).toThrow(/no feature/);
    const roads = W.features
      .filter((f) => f.kind.type !== 'building')
      .map((f) => ({ ...f, id: feature('roman-fort-a').id }));
    expect(() => modelSheets(roads)).toThrow(/no plan/);
  });
});

describe('the detail kits a model may draw', () => {
  const used = new Set(
    W.features.flatMap((f) =>
      f.kind.type === 'building' ? f.kind.plan.parts.flatMap((p) => p.kits ?? []) : [],
    ),
  );

  it('are each used by some part, so no detail sits in the catalogue unexamined', () => {
    expect(KIT_IDS.filter((k) => !used.has(k))).toEqual([]);
  });

  it('each say in both languages how they are known, and cite sources that exist', () => {
    const sources = new Set(W.sources.map((s) => String(s.id)));
    for (const id of KIT_IDS) {
      const { name, provenance } = kitInfo(id);
      expect(name.en && name.cy, id).toBeTruthy();
      expect(provenance.kind, id).not.toBe('documented');
      const basis =
        provenance.kind === 'reconstructed'
          ? provenance.basis
          : provenance.kind === 'imagined'
            ? provenance.groundedIn
            : undefined;
      expect(basis?.en.length, id).toBeGreaterThan(40);
      expect(basis?.cy.length, id).toBeGreaterThan(40);
      expect(provenance.sources.length, id).toBeGreaterThan(0);
      for (const s of provenance.sources) expect(sources.has(String(s)), `${id} ${String(s)}`).toBe(true);
    }
  });

  it('take every measurement from the catalogue as a positive number of metres', () => {
    for (const id of KIT_IDS) {
      const params = Object.values(kitParams(id));
      expect(params.length, id).toBeGreaterThan(0);
      for (const v of params) expect(v, id).toBeGreaterThan(0);
    }
    expect(Object.keys(KITS).toSorted()).toEqual([...KIT_IDS].toSorted());
  });

  it('roof a part only as its plan says: shingle where the roof is timber, thatch where it is thatch, nothing on an open top', () => {
    for (const f of W.features) {
      if (f.kind.type !== 'building') continue;
      for (const p of f.kind.plan.parts) {
        const kits = p.kits ?? [];
        const roofed = (p.type === 'tower' && p.top !== 'plain') || (p.type === 'hall' && p.roof !== 'none');
        const roof = p.type === 'tower' || p.type === 'hall' ? p.roofMaterial : undefined;
        if (kits.includes('shingle-roof')) expect(roofed && roof === 'timber', p.id).toBe(true);
        if (kits.includes('thatch-roof')) expect(roofed && roof === 'thatch', p.id).toBe(true);
      }
    }
  });

  it('frames walls in timber only on buildings of timber and daub, and lays turves only on banks of turf', () => {
    for (const f of W.features) {
      if (f.kind.type !== 'building') continue;
      for (const p of f.kind.plan.parts) {
        const kits = p.kits ?? [];
        if (kits.includes('timber-frame')) expect(p.type === 'hall' && p.material, p.id).toBe('daub');
        if (kits.includes('turf-courses')) expect(p.type === 'wall' && p.material, p.id).toBe('turf');
        if (kits.some((k) => k.startsWith('post-tower')))
          expect(p.type === 'tower' && p.material, p.id).toBe('timber');
      }
    }
  });
});
