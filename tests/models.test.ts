import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LANDMARK_MODELS } from '../src/content/generated/models.ts';
import { KITS, kitInfo, kitParams } from '../src/content/kits.ts';
import { MODELLED, modelSheets } from '../src/content/landmarks.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import {
  liesOnGround,
  MODEL_BUDGET,
  PROBE,
  shapesGround,
  type BuildSheet,
} from '../src/domain/buildsheet.ts';
import type { Feature } from '../src/domain/model.ts';
import { KIT_IDS, type Part } from '../src/domain/plan.ts';
import {
  drawGroups,
  glbCounts,
  hasIdentityTransform,
  nodeBounds,
  readGlb,
  type Glb,
  type GlbJson,
} from '../tools/models/glb.ts';
import { partSurfaces } from '../src/domain/surfaces.ts';
import { GRAIN_STEPS } from '../src/domain/texturing.ts';
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
      const standing = planParts(m.feature).filter((p) => !liesOnGround(p) && !shapesGround(p));
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

  it('puts every rigid part where its sheet says, as wide and as long as its footprint turned by its angle, so a misplaced or mis-turned part is caught', () => {
    let checked = 0;
    for (const m of LANDMARK_MODELS) {
      const sheet = sheetOf(m.feature);
      for (const level of LEVELS) {
        const json = glb(m[level].file);
        for (const { node, id } of partNodes(json)) {
          const part = sheet.parts.find((p) => p.id === id);
          const s = part?.shape;
          if (!part || part.hinge || part.fit.kind !== 'rigid' || !s || s.type === 'wall') continue;
          const box = nodeBounds(json, node);
          expect(box, id).toBeDefined();
          if (!box) continue;
          // glTF x is east and z is minus north.
          const centre = [(box.min[0] + box.max[0]) / 2, -(box.min[2] + box.max[2]) / 2];
          const a = (s.turn * Math.PI) / 180;
          const along = s.type === 'hall' ? s.length : s.size;
          const across = s.type === 'hall' ? s.width : s.size;
          const want = [
            Math.abs(along * Math.cos(a)) + Math.abs(across * Math.sin(a)),
            Math.abs(along * Math.sin(a)) + Math.abs(across * Math.cos(a)),
          ];
          const got = [box.max[0] - box.min[0], box.max[2] - box.min[2]];
          expect(centre[0], `${id} east`).toBeCloseTo(s.at[0], 0);
          expect(centre[1], `${id} north`).toBeCloseTo(s.at[1], 0);
          // Square outlines only: a round tower's box does not turn with it.
          if (s.type === 'hall' || s.outline === 'square')
            for (const k of [0, 1]) {
              expect(got[k] ?? 0, `${id} extent ${String(k)}`).toBeGreaterThanOrEqual((want[k] ?? 0) - 0.1);
              expect(got[k] ?? 0, `${id} extent ${String(k)}`).toBeLessThanOrEqual((want[k] ?? 0) + 1.6);
            }
          expect(box.min[1], `${id} foot`).toBeCloseTo(s.bottom, 1);
          if (!s.roof) expect(box.max[1], `${id} top`).toBeCloseTo(s.top, 1);
          else expect(box.max[1], `${id} roof`).toBeGreaterThanOrEqual(s.top + s.roof.rise - 0.1);
          checked++;
        }
      }
    }
    expect(checked).toBeGreaterThan(60);
  });

  it('lays every wall along its path, as wide as its thickness, from its foot to its top, so a shifted or squashed bank is caught', () => {
    let checked = 0;
    for (const m of LANDMARK_MODELS) {
      const sheet = sheetOf(m.feature);
      for (const level of LEVELS) {
        const json = glb(m[level].file);
        for (const { node, id } of partNodes(json)) {
          const s = sheet.parts.find((p) => p.id === id)?.shape;
          if (s?.type !== 'wall') continue;
          const box = nodeBounds(json, node);
          expect(box, id).toBeDefined();
          if (!box) continue;
          const east = s.path.map((p) => p[0]);
          const north = s.path.map((p) => p[1]);
          // glTF x is east and z is minus north.
          const got = { w: box.min[0], e: box.max[0], s: -box.max[2], n: -box.min[2] };
          const near = 0.1;
          expect(got.w, `${id} west`).toBeLessThanOrEqual(Math.min(...east) + near);
          expect(got.e, `${id} east`).toBeGreaterThanOrEqual(Math.max(...east) - near);
          expect(got.s, `${id} south`).toBeLessThanOrEqual(Math.min(...north) + near);
          expect(got.n, `${id} north`).toBeGreaterThanOrEqual(Math.max(...north) - near);
          expect(got.w, `${id} west edge`).toBeGreaterThanOrEqual(Math.min(...east) - s.thickness);
          expect(got.e, `${id} east edge`).toBeLessThanOrEqual(Math.max(...east) + s.thickness);
          expect(got.s, `${id} south edge`).toBeGreaterThanOrEqual(Math.min(...north) - s.thickness);
          expect(got.n, `${id} north edge`).toBeLessThanOrEqual(Math.max(...north) + s.thickness);
          expect(box.min[1], `${id} foot`).toBeCloseTo(s.bottom, 1);
          expect(box.max[1], `${id} top`).toBeGreaterThanOrEqual(s.top - 0.05);
          expect(box.max[1], `${id} top`).toBeLessThanOrEqual(s.top + 0.5);
          checked++;
        }
      }
    }
    expect(checked).toBeGreaterThan(30);
  });

  it('leaves every node at the origin, unturned and unscaled, except the hinged leaves and the probe, so the bounds the tests read are scene positions', () => {
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS) {
        const json = glb(m[level].file);
        const moved = json.nodes
          .filter((n) => n.extras?.['hinge'] === undefined && !n.name?.startsWith('_probe'))
          .filter((n) => !hasIdentityTransform(json, n))
          .map((n) => n.name);
        expect(moved, `${m.feature} ${level}`).toEqual([]);
      }
  });

  it('uses every kit measurement in the Blender script, and the script reads no measurement a kit does not hold', () => {
    const script = readFileSync(join(root, 'tools/models/build_landmark.py'), 'utf8');
    const held = new Set(KIT_IDS.flatMap((id) => Object.keys(kitParams(id))));
    const read = new Set([...script.matchAll(/\b(?:k|b|roof_kit)\["([a-zA-Z]+)"\]/g)].map((x) => x[1] ?? ''));
    expect([...held].filter((n) => !read.has(n))).toEqual([]);
    expect([...read].filter((n) => !held.has(n))).toEqual([]);
  });

  it('draws every detail from a kit measurement or a named script constant: no bare number in any function of the script', () => {
    const script = readFileSync(join(root, 'tools/models/build_landmark.py'), 'utf8').replace(
      /"""[\s\S]*?"""/g,
      '""',
    );
    // Colour, and the preview render's camera: not the model's geometry, so they may hold their own numbers.
    const exempt = new Set(['rgb', 'shade', 'toward', 'jitter', 'fail', 'preview']);
    const defs = [...script.matchAll(/^[ ]*def (\w+)\(/gm)];
    expect(defs.length).toBeGreaterThan(30);
    // A colour is not a measurement: drop whole shade(...) and jitter(...) calls before looking.
    const withoutColour = (code: string): string => {
      let out = code;
      for (;;) {
        const m = /\b(?:shade|jitter)\(/.exec(out);
        if (!m) return out;
        let depth = 1;
        let i = m.index + m[0].length;
        while (depth > 0 && i < out.length) {
          depth += out[i] === '(' ? 1 : out[i] === ')' ? -1 : 0;
          i++;
        }
        out = `${out.slice(0, m.index)}COLOUR${out.slice(i)}`;
      }
    };
    // Whole numbers are mesh topology, counts and halving; half a unit is centring. A decimal (with or without a
    // leading digit), an exponent or a written fraction such as 1 / 3 is a measurement and belongs in a kit.
    const allowed = new Set(['0.5']);
    const bare: string[] = [];
    defs.forEach((d, k) => {
      const name = d[1] ?? '';
      if (exempt.has(name)) return;
      const end = defs[k + 1]?.index ?? script.length;
      const code = withoutColour(script.slice(d.index, end))
        .split('\n')
        .map((l) => l.replace(/#.*$/, '').replace(/"[^"]*"/g, '""'))
        .join('\n');
      for (const m of code.matchAll(/(?<![\w.])(?:\d*\.\d+(?:e-?\d+)?|\d+e-?\d+|\d+\s*\/\s*\d+)(?!\w)/g))
        if (!allowed.has(m[0])) bare.push(`${name}: ${m[0]}`);
    });
    expect(bare).toEqual([]);
  });

  it('takes the roof and footing proportions the procedural builder draws from src/domain/proportions.ts, as the build sheet does', () => {
    const source = readFileSync(join(root, 'src/world/buildings.ts'), 'utf8');
    expect(source).toMatch(/from '..\/domain\/proportions.ts'/);
    for (const literal of [
      /\* 0\.35 \*/,
      /\* 0\.95 \*/,
      /r \* 2\.1/,
      /r \* 1\.08/,
      /\+ 0\.4 \* f\.across/,
      /\?\? 0\.45/,
      /ground - 0\.4/,
    ])
      expect(source).not.toMatch(literal);
  });

  it('has a Blender builder for every kit in the catalogue and no other', () => {
    const script = readFileSync(join(root, 'tools/models/build_landmark.py'), 'utf8');
    const block = /KNOWN_KITS = \{([^}]*)\}/.exec(script)?.[1] ?? '';
    const known = [...block.matchAll(/"([a-z-]+)"/g)].map((x) => x[1]);
    expect(known.toSorted()).toEqual([...KIT_IDS].toSorted());
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
        expect(entry.drawCalls, entry.file).toBe(drawGroups(json));
      }
  });

  it('tells the app each near part’s surfaces, exactly as the plan gives them, and the far level none (ADR 0055)', () => {
    let checked = 0;
    for (const m of LANDMARK_MODELS) {
      const byId = new Map(planParts(m.feature).map((p) => [p.id, p]));
      for (const { id, extras } of partNodes(glb(m.near.file))) {
        const p = byId.get(id);
        const surfaces = extras['surfaces'];
        expect(Array.isArray(surfaces), id).toBe(true);
        expect(Array.isArray(surfaces) && [...new Set(surfaces)].sort(), id).toEqual(
          p && [...partSurfaces(p)],
        );
        checked++;
      }
      for (const { id, extras } of partNodes(glb(m.far.file))) expect(extras['surfaces'], id).toBeUndefined();
    }
    expect(checked).toBeGreaterThan(100);
  });

  it('brings no materials of its own, so every model is lit by the app’s one set (ADR 0055)', () => {
    for (const m of LANDMARK_MODELS)
      for (const level of LEVELS) {
        const json = glb(m[level].file);
        expect(json.materials, m[level].file).toBeUndefined();
        for (const mesh of json.meshes ?? [])
          for (const prim of mesh.primitives) expect(prim.material, m[level].file).toBeUndefined();
      }
  });

  it('writes each near face’s grain into its colour’s alpha, in byte colours, as a code the app can read (ADR 0055)', () => {
    const codes = new Map<number, number>();
    for (const m of LANDMARK_MODELS) {
      const file = readGlb(readFileSync(join(root, 'public', m.near.file)));
      for (const mesh of file.json.meshes ?? [])
        for (const prim of mesh.primitives) {
          const alpha = colourAlphas(file, prim.attributes?.COLOR_0);
          for (const a of alpha) codes.set(a, (codes.get(a) ?? 0) + 1);
        }
    }
    // Byte alpha = (code + 1) / GRAIN_STEPS of 255: upright and lengthwise, and nothing else.
    const allowed = [1, 2].map((k) => Math.round((k / GRAIN_STEPS) * 255));
    expect([...codes.keys()].sort((a, b) => a - b)).toEqual(allowed);
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

/** Every alpha byte of a primitive's colour attribute, which must be unsigned bytes. */
function colourAlphas(file: Glb, accessor: number | undefined): number[] {
  const a = accessor === undefined ? undefined : file.json.accessors?.[accessor];
  if (!a) throw new Error('a primitive has no colour');
  expect(a.componentType).toBe(5121);
  const view = file.json.bufferViews?.[a.bufferView ?? -1];
  if (!view) throw new Error('a colour has no buffer view');
  const from = (view.byteOffset ?? 0) + (a.byteOffset ?? 0);
  return Array.from({ length: a.count }, (_, i) => file.bin[from + i * 4 + 3] ?? -1);
}

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

  it('credit Jay Lane (S16) only with what its page says: post layouts and sizes, never a stage, boarding or an open frame', () => {
    const text = (id: (typeof KIT_IDS)[number]): string => {
      const p = kitInfo(id).provenance;
      return p.kind === 'reconstructed' ? p.basis.en : p.kind === 'imagined' ? p.groundedIn.en : '';
    };
    for (const id of ['post-tower-six', 'post-tower-four'] as const) {
      expect(text(id), id).not.toMatch(/stage|board|open below|open frame/i);
      expect(kitInfo(id).provenance.kind, id).toBe('reconstructed');
    }
    // Jay Lane's excavator read the gate towers as a guard-room at ground level, so the kit that draws a stage
    // and walls in the ground storey is Claude's guess, said to be one.
    const boarding = kitInfo('tower-boarding');
    expect(boarding.provenance.kind).toBe('imagined');
    expect(text('tower-boarding')).toMatch(/guard-room/);
    expect(text('tower-boarding')).toMatch(/guess/);
  });

  it('say that Jay Lane contradicts itself on its turf, never that turf revetments are recorded there, and cite Dinefwr’s own inference from Fort 1’s ditch fill', () => {
    const p = kitInfo('turf-courses').provenance;
    const basis = p.kind === 'reconstructed' ? p.basis : undefined;
    for (const lang of ['en', 'cy'] as const) {
      expect(basis?.[lang], lang).not.toMatch(/recorded at Jay Lane|Cofnodir wynebau tyweirch/);
    }
    expect(basis?.en).toMatch(/contradicts itself/);
    expect(basis?.en).toMatch(/ditch/);
    expect(basis?.cy).toMatch(/gwrth-ddweud/);
    expect(p.sources.map(String)).toContain('fort:S1');
    expect(p.sources.map(String)).toContain('fort:S16');
  });

  it('lay turves in courses half a Roman foot deep, as Vegetius gives them, and say the faces were laid grass side down', () => {
    expect(kitParams('turf-courses')['course']).toBe(0.15);
    const p = kitInfo('turf-courses').provenance;
    const basis = p.kind === 'reconstructed' ? p.basis : undefined;
    expect(basis?.en).toMatch(/Vegetius/);
    expect(basis?.en).toMatch(/grass side down/);
    expect(basis?.cy).toMatch(/Vegetius/);
    expect(p.sources.map(String)).toEqual(expect.arrayContaining(['surfaces:S1', 'surfaces:S2']));
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

describe('reading a glTF node’s place', () => {
  const json: GlbJson = {
    asset: { version: '2.0' },
    nodes: [
      { name: 'group', children: [1], translation: [10, 0, -20] },
      { name: 'part', mesh: 0 },
      { name: 'turned', mesh: 0, rotation: [0, Math.SQRT1_2, 0, Math.SQRT1_2] },
    ],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }],
    accessors: [{ count: 8, min: [-1, 0, -2], max: [1, 3, 2] }],
  };

  it('carries a part’s box through its parents’ transforms, so a part under a shifted group is not read at the origin', () => {
    const part = json.nodes[1];
    expect(part && nodeBounds(json, part)).toEqual({ min: [9, 0, -22], max: [11, 3, -18] });
    expect(part && hasIdentityTransform(json, part)).toBe(false);
  });

  it('turns a box with its node: a quarter turn about +Y swaps its width and depth', () => {
    const turned = json.nodes[2];
    const box = turned && nodeBounds(json, turned);
    expect(box?.max[0]).toBeCloseTo(2, 6);
    expect(box?.max[2]).toBeCloseTo(1, 6);
  });
});
