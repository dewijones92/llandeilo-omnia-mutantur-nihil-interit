import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { TYWI_ROAD_FROM_LLANDOVERY } from '../src/content/cutscenes.ts';
import { placeId } from '../src/content/ids.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { distanceToPath } from '../src/domain/fort.ts';
import type { Feature } from '../src/domain/model.ts';
import { hidesFootprint, partsByTier, rotate, type Part, type Plan, type Pt } from '../src/domain/plan.ts';
import { listedAt, snapshotAt } from '../src/domain/state.ts';
import { ad } from '../src/domain/time.ts';
import { tAt } from '../src/domain/timeline.ts';

const FORT_IDS = ['roman-fort-a', 'roman-fort-b', 'roman-fort-a-levelled', 'roman-vicus'] as const;
const feature = (id: string): Feature => {
  const f = W.features.find((x) => x.id === id);
  if (!f) throw new Error(`no feature ${id}`);
  return f;
};
const plan = (id: string): Plan => {
  const k = feature(id).kind;
  if (k.type !== 'building') throw new Error(`${id} is not a plan`);
  return k.plan;
};
const parts = (id: string): readonly Part[] => plan(id).parts;
const presence = (id: string, year: number): number =>
  snapshotAt(W, tAt(W.timeline, ad(year))).features.find((f) => f.feature.id === id)?.presence ?? 0;
const metres = (a: { e: number; n: number }, b: { e: number; n: number }): number =>
  Math.hypot(a.e - b.e, a.n - b.n);
const text = (p: Part['provenance']): string =>
  p?.kind === 'documented'
    ? `${p.note?.en ?? ''} ${p.note?.cy ?? ''}`
    : p?.kind === 'reconstructed'
      ? `${p.basis.en} ${p.basis.cy}`
      : p
        ? `${p.groundedIn.en} ${p.groundedIn.cy}`
        : '';
const featureText = (f: Feature): string => text(f.provenance);

describe('where the Roman forts stand', () => {
  // The Heneb HER's points (PRN 47636, 47637) and Coflein's for the complex, as grid references.
  const HER_1 = { e: 262180, n: 222450 };
  const HER_2 = { e: 262170, n: 222530 };
  const COFLEIN = { e: 262187, n: 222534 };

  it('puts each fort within the tolerance of the HER’s point for it, and Fort 2 on Coflein’s', () => {
    expect(metres(feature('roman-fort-a').at, HER_1)).toBeLessThan(40);
    expect(metres(feature('roman-fort-b').at, HER_2)).toBeLessThan(30);
    expect(metres(feature('roman-fort-b').at, COFLEIN)).toBeLessThan(10);
  });

  it('puts Fort 2 about 70m north of Fort 1’s centre, on its northern part, not south-east of it', () => {
    const a = feature('roman-fort-a').at;
    const b = feature('roman-fort-b').at;
    expect(b.n - a.n).toBeGreaterThan(60);
    expect(b.n - a.n).toBeLessThan(80);
    expect(b.e - a.e).toBeLessThan(0);
  });

  it('lays both long axes north-east to south-west, between 48 and 53 degrees east of north', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b']) {
      const bearing = 90 - (plan(id).angle ?? 0);
      expect(bearing, id).toBeGreaterThanOrEqual(48);
      expect(bearing, id).toBeLessThanOrEqual(53);
    }
  });

  it('draws the inner ditches round 240m by 160m (Fort 1) and 140m by 110m (Fort 2)', () => {
    const inner = (id: string): { length: number; width: number } => {
      const ring = parts(id).flatMap((p) => (p.type === 'ditch' && p.id?.includes('/ditch-1-') ? p : []));
      const xs = ring.flatMap((p) => p.path.map((q) => Math.abs(q[0])));
      const ys = ring.flatMap((p) => p.path.map((q) => Math.abs(q[1])));
      const lip = 0.85;
      return { length: 2 * (Math.max(...xs) - lip), width: 2 * (Math.max(...ys) - lip) };
    };
    expect(inner('roman-fort-a').length).toBeCloseTo(240, 0);
    expect(inner('roman-fort-a').width).toBeCloseTo(160, 0);
    expect(inner('roman-fort-b').length).toBeCloseTo(140, 0);
    expect(inner('roman-fort-b').width).toBeCloseTo(110, 0);
  });

  it('draws them at true size and true height, not at the 2.6 times landmark scale or the hills’ exaggeration (ADR 0045)', () => {
    for (const id of FORT_IDS) expect(plan(id).setting, id).toBe('true');
  });

  it('puts the vicus north-east of Fort 2, about where its road leaves the front gate', () => {
    const v = feature('roman-vicus').at;
    const b = feature('roman-fort-b').at;
    expect(v.e).toBeGreaterThan(b.e + 60);
    expect(v.n).toBeGreaterThan(b.n + 40);
    const gate = (() => {
      const [dx, dy] = rotate([70, 0], plan('roman-fort-b').angle ?? 0);
      return { e: b.e + dx, n: b.n + dy };
    })();
    const road = parts('roman-vicus').find((p) => p.type === 'road');
    if (road?.type !== 'road') throw new Error('no road');
    const [lx, ly] = road.path[0] ?? [0, 0];
    const [rx, ry] = rotate([lx, ly], plan('roman-vicus').angle ?? 0);
    expect(metres({ e: v.e + rx, n: v.n + ry }, gate)).toBeLessThan(20);
  });

  it('keeps every modern building that stands near them, and hides none under a Roman part', () => {
    const raw = readFileSync(join(import.meta.dirname, '..', 'public', 'data', 'buildings.bin'));
    const data = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
    const hidden: string[] = [];
    for (const id of FORT_IDS) {
      const at = feature(id).at;
      for (let i = 0; i < data.length / 5; i++) {
        const box = {
          e: data[i * 5] ?? 0,
          n: data[i * 5 + 1] ?? 0,
          width: data[i * 5 + 2] ?? 0,
          depth: data[i * 5 + 3] ?? 0,
          angle: data[i * 5 + 4] ?? 0,
        };
        if (metres(box, at) < 400 && hidesFootprint(plan(id), at, box)) hidden.push(`${id}@${String(box.e)}`);
      }
    }
    expect(hidden).toEqual([]);
  });
});

describe('when the Roman forts stand', () => {
  it('gives each its documented dates and their limits', () => {
    const a = feature('roman-fort-a');
    expect([a.when.from, a.when.to, a.notBefore, a.notAfter]).toEqual([74, 78, 70, 83]);
    const b = feature('roman-fort-b');
    expect([b.when.from, b.when.to, b.notBefore, b.notAfter]).toEqual([83, 125, 83, 140]);
    const v = feature('roman-vicus');
    expect([v.when.from, v.when.to, v.notBefore, v.notAfter, v.datesExact]).toEqual([
      83,
      135,
      83,
      140,
      undefined,
    ]);
  });

  it('draws Fort 1 from soon after AD 74, never before the Flavian period, and gone by 83', () => {
    expect(presence('roman-fort-a', 66)).toBe(0);
    expect(presence('roman-fort-a', 74)).toBe(1);
    expect(presence('roman-fort-a', 77)).toBe(1);
    const fading = presence('roman-fort-a', 80);
    expect(fading).toBeGreaterThan(0.3);
    expect(fading).toBeLessThan(0.9);
    expect(presence('roman-fort-a', 84)).toBe(0);
    expect(presence('roman-fort-a', 110)).toBe(0);
  });

  it('hands the ground from Fort 1 to Fort 2 in turn: while Fort 1 fades out, nothing of Fort 2, its levelled ditches or the settlement is drawn', () => {
    const a = presence('roman-fort-a', 80);
    expect(a).toBeGreaterThan(0);
    expect(a).toBeLessThan(1);
    for (const id of ['roman-fort-b', 'roman-fort-a-levelled', 'roman-vicus'])
      expect(presence(id, 80), id).toBe(0);
    expect(presence('roman-fort-b', 70)).toBe(0);
    expect(presence('roman-fort-b', 90)).toBe(1);
    expect(presence('roman-fort-b', 120)).toBe(1);
  });

  it('never draws anything with Fort 1 above a whisper while Fort 1 stands: a Fort 1 ditch lies under Fort 2’s levelling, so they were not together', () => {
    const together: string[] = [];
    for (let y = 60; y <= 150; y += 0.25)
      for (const id of ['roman-fort-b', 'roman-fort-a-levelled', 'roman-vicus'])
        if (presence('roman-fort-a', y) > 0.01 && presence(id, y) > 0.01) together.push(`${id}@${String(y)}`);
    expect(together).toEqual([]);
  });

  it('draws Fort 2 until about 125, fading to nothing by 140, when the site was abandoned', () => {
    const late = presence('roman-fort-b', 132);
    expect(late).toBeGreaterThan(0);
    expect(late).toBeLessThan(1);
    expect(presence('roman-fort-b', 141)).toBe(0);
    expect(presence('roman-fort-b', 160)).toBe(0);
  });

  it('draws the backfilled Fort 1 ditches under Fort 2 for as long as Fort 2 stands, and the vicus from Fort 2’s arrival, fading out after 135 like a "c." date', () => {
    expect(presence('roman-fort-a-levelled', 100)).toBe(1);
    expect(presence('roman-fort-a-levelled', 150)).toBe(0);
    expect(presence('roman-vicus', 74)).toBe(0);
    expect(presence('roman-vicus', 82)).toBe(0);
    expect(presence('roman-vicus', 100)).toBe(1);
    expect(presence('roman-vicus', 135)).toBe(1);
    const late = presence('roman-vicus', 137);
    expect(late).toBeGreaterThan(0);
    expect(late).toBeLessThan(1);
    expect(presence('roman-vicus', 141)).toBe(0);
  });

  it('says in the settlement’s ⓘ that earlier activity (pottery from about AD 70) is not drawn as streets, because its layout hangs on Fort 2’s gate', () => {
    const v = featureText(feature('roman-vicus'));
    expect(v).toContain('AD 70 to 90');
    expect(v).toContain('not drawn as streets');
    expect(v).toContain('Fort 2’s front gate');
  });

  it('keeps the contested dates contested in the ⓘ: the HER’s 82, the painting’s 90 to 100, and the speculative 78 to 83', () => {
    const b = featureText(feature('roman-fort-b'));
    expect(b).toContain('possibly around 82 AD');
    expect(b).toContain('unproven');
    expect(b).toContain('around 100AD');
    expect(b).toContain('caption');
    expect(b).toContain('not a founding date');
    expect(b).toContain('drawn from AD 83');
    expect(b).toContain('mid-120s');
    expect(feature('roman-fort-b').when.from).not.toBe(90);
    expect(feature('roman-fort-b').when.from).not.toBe(100);
    const a = featureText(feature('roman-fort-a'));
    expect(a).toContain('perhaps soon after AD 74');
    expect(a).toContain('speculative');
  });
});

describe('the parts list on the key date’s card', () => {
  const listed = (year: number): string[] =>
    listedAt(snapshotAt(W, tAt(W.timeline, ad(year))).features, placeId('roman-forts')).map((f) => f.id);

  it('lists what is drawn at the year the slider is at, not at the key date’s own year', () => {
    expect(listed(74)).toEqual(['roman-fort-a']);
    expect(listed(80)).toEqual(['roman-fort-a']);
    expect(listed(110).sort()).toEqual(['roman-fort-a-levelled', 'roman-fort-b', 'roman-vicus']);
    expect(listed(132).sort()).toEqual(['roman-fort-a-levelled', 'roman-fort-b', 'roman-vicus']);
    expect(listed(138).sort()).toEqual(['roman-fort-a-levelled', 'roman-fort-b', 'roman-vicus']);
    expect(listed(150)).toEqual([]);
  });

  it('lists no feature of another place, and none without parts that carry their own tier', () => {
    const here = listedAt(snapshotAt(W, tAt(W.timeline, ad(110))).features, placeId('somewhere-else'));
    expect(here).toEqual([]);
  });
});

describe('what each part of the Roman forts rests on', () => {
  it('gives every part an id of its own, a name in both languages and its own provenance tier', () => {
    const ids = FORT_IDS.flatMap((f) => parts(f).map((p) => p.id));
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
    for (const f of FORT_IDS)
      for (const p of parts(f)) {
        expect(p.id, `${f} part`).toBeTruthy();
        expect(p.name?.en.length, p.id).toBeGreaterThan(2);
        expect(p.name?.cy.length, p.id).toBeGreaterThan(2);
        expect(p.provenance, p.id).toBeDefined();
      }
  });

  it('names every part of a plan differently, in both languages, so the list on the card tells them apart', () => {
    for (const f of FORT_IDS) {
      const en = parts(f).map((p) => p.name?.en);
      const cy = parts(f).map((p) => p.name?.cy);
      expect(
        en.filter((n, i) => en.indexOf(n) !== i),
        f,
      ).toEqual([]);
      expect(
        cy.filter((n, i) => cy.indexOf(n) !== i),
        f,
      ).toEqual([]);
    }
  });

  it('cites a source that exists for every documented part, and says in both languages why for the rest', () => {
    const known = new Set(W.sources.map((s) => s.id));
    for (const f of FORT_IDS)
      for (const p of parts(f)) {
        const pr = p.provenance;
        if (!pr) throw new Error(`${p.id ?? '?'} has no provenance`);
        if (pr.kind === 'documented') {
          expect(pr.sources.length, p.id).toBeGreaterThan(0);
          expect(pr.note?.en.length, p.id).toBeGreaterThan(20);
          expect(pr.note?.cy.length, p.id).toBeGreaterThan(20);
        } else {
          const why = pr.kind === 'reconstructed' ? pr.basis : pr.groundedIn;
          expect(why.en.length, p.id).toBeGreaterThan(20);
          expect(why.cy.length, p.id).toBeGreaterThan(20);
        }
        for (const s of pr.sources) expect(known.has(s), `${p.id ?? '?'}: ${s}`).toBe(true);
      }
  });

  it('draws a gate only where one is evidenced, and shows Fort 2’s rear gate as unproven', () => {
    const gates = (id: string): string[] => [
      ...new Set(parts(id).flatMap((p) => /\/gate-(\w+)\//.exec(p.id ?? '')?.[1] ?? [])),
    ];
    expect(gates('roman-fort-a').sort()).toEqual(['se', 'sw']);
    expect(gates('roman-fort-b').sort()).toEqual(['ne', 'nw', 'se', 'sw']);
    for (const id of ['roman-fort-a', 'roman-fort-b'])
      for (const gate of gates(id)) {
        const own = parts(id).filter((p) => p.id?.includes(`/gate-${gate}/`));
        const passage = own.find((p) => p.id?.endsWith('/passage'));
        const evidenced = passage?.provenance?.kind === 'documented';
        const unproven = id === 'roman-fort-b' && gate === 'sw';
        expect(evidenced, `${id} ${gate}`).toBe(!unproven);
        if (unproven)
          for (const p of own) {
            expect(p.provenance?.kind, p.id).not.toBe('documented');
            expect(text(p.provenance), p.id).toContain('not demonstrated');
          }
      }
  });

  it('draws no tower as documented except the one found at Fort 1’s south-west gate, on its north side, and its north-east interval tower', () => {
    const documentedTowers = FORT_IDS.flatMap((f) =>
      parts(f).flatMap((p) => (p.type === 'tower' && p.provenance?.kind === 'documented' ? [p.id] : [])),
    );
    expect(documentedTowers.sort()).toEqual(['fort1/gate-sw/tower-right', 'fort1/interval-tower-ne']);
    const found = parts('roman-fort-a').find((p) => p.id === 'fort1/gate-sw/tower-right');
    const twin = parts('roman-fort-a').find((p) => p.id === 'fort1/gate-sw/tower-left');
    expect(found?.type === 'tower' && found.at[1]).toBeGreaterThan(0);
    expect(twin?.type === 'tower' && twin.at[1]).toBeLessThan(0);
    expect(twin?.provenance?.kind).toBe('reconstructed');
    const corners = FORT_IDS.flatMap((f) => parts(f).filter((p) => p.id?.includes('/corner-tower-')));
    expect(corners).toHaveLength(8);
    for (const c of corners) expect(c.provenance?.kind).toBe('reconstructed');
  });

  it('holds the interiors to analogy: every barrack, granary and headquarters is reconstructed, never documented', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b']) {
      const inside = parts(id).filter((p) => /\/(barrack|granary|principia|praetorium)-/.test(p.id ?? ''));
      expect(inside.length, id).toBeGreaterThan(8);
      for (const p of inside) expect(p.provenance?.kind, p.id).toBe('reconstructed');
    }
    expect(parts('roman-fort-b').filter((p) => p.id?.includes('/barrack-'))).toHaveLength(6);
  });

  it('draws the ditches as the survey counts them: three and two on Fort 1’s measured sides, at least three on Fort 2’s', () => {
    const rings = (id: string, side: string): number[] => [
      ...new Set(
        parts(id).flatMap((p) => {
          const m = new RegExp(`/ditch-(\\d)-${side}-`).exec(p.id ?? '');
          return m?.[1] && p.provenance?.kind === 'documented' ? [Number(m[1])] : [];
        }),
      ),
    ];
    expect(rings('roman-fort-a', 'se').sort()).toEqual([1, 2, 3]);
    expect(rings('roman-fort-a', 'sw').sort()).toEqual([1, 2]);
    expect(rings('roman-fort-a', 'ne')).toEqual([]);
    expect(rings('roman-fort-b', 'se').sort()).toEqual([1, 2, 3]);
    const profile = (id: string, ring: number): { width: number; depth: number } | undefined => {
      const d = parts(id).find((p) => p.type === 'ditch' && p.id?.includes(`/ditch-${String(ring)}-se-`));
      return d?.type === 'ditch' ? { width: d.width, depth: d.depth ?? 0 } : undefined;
    };
    expect(profile('roman-fort-a', 1)).toEqual({ width: 1.7, depth: 1.1 });
    expect(profile('roman-fort-a', 3)).toEqual({ width: 1, depth: 0.5 });
  });

  it('gives Fort 1’s south-west side the profiles Trench 1 measured, 1.7m by 1.1m and 1.0m by 0.5m, and says the south-east side’s are not measured', () => {
    const sw = (ring: number) =>
      parts('roman-fort-a').filter((p) => p.type === 'ditch' && p.id?.includes(`/ditch-${String(ring)}-sw-`));
    for (const [ring, width, depth] of [
      [1, 1.7, 1.1],
      [2, 1, 0.5],
    ] as const) {
      expect(sw(ring).length, `ring ${String(ring)}`).toBeGreaterThan(0);
      for (const d of sw(ring)) {
        expect(d.type === 'ditch' && [d.width, d.depth]).toEqual([width, depth]);
        expect(d.provenance?.kind, d.id).toBe('documented');
        expect(text(d.provenance), d.id).toContain('Trench 1');
      }
    }
    expect(text(sw(1)[0]?.provenance)).toContain('square butt');
    const se = parts('roman-fort-a').filter((p) => p.type === 'ditch' && /\/ditch-\d-se-/.test(p.id ?? ''));
    expect(se.length).toBeGreaterThan(2);
    for (const d of se) {
      expect(text(d.provenance), d.id).toContain('not measured here');
      expect(text(d.provenance), d.id).not.toContain('square butt');
      expect(text(d.provenance), d.id).not.toContain('excavation');
    }
  });

  it('draws timber and earth only: no stone, no limewash, no tile or slate, no palisade', () => {
    const stone = [
      'rubble',
      'limestone',
      'sandstone',
      'freestone',
      'shale',
      'black-limestone',
      'render',
      'slate',
    ];
    for (const f of FORT_IDS)
      for (const p of parts(f)) {
        if (p.type === 'road' || p.type === 'ditch') continue;
        if ('material' in p) expect(stone, `${p.id ?? '?'} ${p.material}`).not.toContain(p.material);
        if (p.type === 'hall' || p.type === 'tower')
          expect(stone, `${p.id ?? '?'} roof`).not.toContain(p.roofMaterial ?? 'none');
        if (p.type === 'tower' && p.top !== 'plain') expect(p.roofMaterial, p.id).toBeDefined();
      }
    const ramparts = parts('roman-fort-a').filter((p) => p.id?.includes('/rampart-'));
    expect(ramparts.length).toBeGreaterThan(3);
    for (const r of ramparts) expect(r.type === 'wall' && r.material).toBe('turf');
    expect(text(parts('roman-fort-a').find((p) => p.id?.includes('/rampart-'))?.provenance)).toContain(
      'turf',
    );
  });

  it('says in the roofs’ parts that their material is a choice, and shows no tile where the finds are only possible', () => {
    const barrack = parts('roman-fort-b').find((p) => p.id?.includes('/barrack-'));
    expect(text(barrack?.provenance)).toContain('roof');
    expect(text(barrack?.provenance)).toContain('choice');
    const house = parts('roman-vicus').find((p) => p.id?.includes('/house-'));
    expect(house?.type === 'hall' && house.roofMaterial).toBe('thatch');
  });

  it('credits Neil Ludlow, for Cambria Archaeology, and the report, in both languages, on each fort and the vicus', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b', 'roman-vicus']) {
      const f = feature(id);
      const p = f.provenance;
      const all = featureText(f);
      expect(all, id).toContain('Neil Ludlow');
      expect(all, id).toContain('Cambria Archaeology');
      expect(all, id).toContain('Heneb');
      const note = p.kind === 'documented' ? p.note : p.kind === 'reconstructed' ? p.basis : p.groundedIn;
      expect(note?.en, id).toContain('Neil Ludlow');
      expect(note?.cy, id).toContain('Neil Ludlow');
      expect(p.sources, id).toContain('fort:S1');
    }
    const ev = W.events.find((e) => e.id === 'roman-forts');
    expect(ev?.provenance.kind === 'documented' && ev.provenance.note?.en).toContain('Neil Ludlow');
    expect(ev?.provenance.sources).toContain('fort:S4');
  });

  it('labels Fort 1 and Fort 2 documented for their size and place, and the vicus reconstructed, its houses imagined', () => {
    expect(feature('roman-fort-a').provenance.kind).toBe('documented');
    expect(feature('roman-fort-b').provenance.kind).toBe('documented');
    expect(feature('roman-vicus').provenance.kind).toBe('reconstructed');
    const by = partsByTier(plan('roman-vicus'));
    expect(by.documented.map((p) => p.type)).toEqual(['road', 'road']);
    expect(by.imagined.length).toBeGreaterThanOrEqual(12);
    expect(by.reconstructed).toEqual([]);
  });
});

describe('what the notes say no more than the sources do', () => {
  it('keeps the excavator’s suggestion that Fort 1’s northern and eastern defences stayed in use as an annex beside the backfilled ditches', () => {
    expect(featureText(feature('roman-fort-a-levelled'))).toContain('annex');
    for (const d of parts('roman-fort-a-levelled').filter((p) => p.type === 'ditch')) {
      expect(text(d.provenance), d.id).toContain('annex');
      expect(d.provenance?.kind, d.id).toBe('reconstructed');
    }
  });

  it('says the settlement draws no tile roofs although Roman tile was found there, and no stone', () => {
    const v = featureText(feature('roman-vicus'));
    expect(v).not.toContain('No tile and no stone');
    expect(v).toContain('Roman tile fragments were found');
    expect(v).toContain('No tile roofs are drawn');
    expect(v).toContain('darnau teilsen Rufeinig');
  });

  it('says one corner tower was found at Jay Lane, thought to be six-post from four posts, not that towers were excavated', () => {
    const c = parts('roman-fort-a').find((p) => p.id === 'fort1/corner-tower-ne');
    const t = text(c?.provenance);
    expect(t).not.toContain('towers on six posts');
    expect(t).toContain('thought to have stood on six posts');
    expect(t).toContain('four were found');
  });

  it('does not cite a wider berm between Fort 2’s second and third ditches without saying it is not drawn', () => {
    const d = parts('roman-fort-b').find((p) => p.id?.includes('/ditch-1-se-'));
    expect(text(d?.provenance)).toContain('not drawn');
  });
});

describe('the civilian settlement', () => {
  const houses = (): Extract<Part, { type: 'hall' }>[] =>
    parts('roman-vicus').flatMap((p) => (p.type === 'hall' ? [p] : []));

  it('is a scatter of small timber houses turned every way, not rows: the survey shows no street grid', () => {
    const list = houses();
    expect(list.length).toBeGreaterThanOrEqual(12);
    const angles = list.map((h) => ((h.angle % 180) + 180) % 180);
    const mean = angles.reduce((a, b) => a + b, 0) / angles.length;
    const spread = Math.sqrt(angles.reduce((a, b) => a + (b - mean) ** 2, 0) / angles.length);
    expect(spread).toBeGreaterThan(12);
    const gap = list.map((h) =>
      Math.min(...list.filter((o) => o !== h).map((o) => Math.hypot(h.at[0] - o.at[0], h.at[1] - o.at[1]))),
    );
    const meanGap = gap.reduce((a, b) => a + b, 0) / gap.length;
    const gapSpread = Math.sqrt(gap.reduce((a, b) => a + (b - meanGap) ** 2, 0) / gap.length);
    expect(gapSpread / meanGap).toBeGreaterThan(0.15);
    for (const h of list) {
      expect(h.length).toBeLessThanOrEqual(11.5);
      expect(h.width).toBeLessThanOrEqual(6);
    }
  });

  it('keeps every house off the roads, and the roads on two lines that meet near the gate', () => {
    const roads = parts('roman-vicus').flatMap((p) => (p.type === 'road' ? [p.path] : []));
    expect(roads).toHaveLength(2);
    for (const h of houses()) for (const r of roads) expect(distanceToPath(h.at, r)).toBeGreaterThan(7.9);
    const split = distanceToPath(roads[1]?.[0] ?? [0, 0], roads[0] ?? []);
    expect(split).toBeLessThan(1);
  });

  it('draws the houses’ small parts only up close, and the roads from afar', () => {
    for (const p of parts('roman-vicus')) expect(p.detail === true, p.id).toBe(p.type === 'hall');
  });
});

describe('levels of detail', () => {
  it('leaves the interiors, breastworks, corner towers and gate fittings to the near mesh, and the defences to both', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b']) {
      const all = parts(id);
      const far = all.filter((p) => !p.detail);
      const near = all.length;
      expect(far.length, id).toBeGreaterThan(20);
      expect(far.length, id).toBeLessThan(near * 0.7);
      expect(
        far.some((p) => p.id?.includes('/rampart-')),
        id,
      ).toBe(true);
      expect(
        far.some((p) => p.type === 'ditch'),
        id,
      ).toBe(true);
      expect(
        far.some((p) => p.type === 'tower'),
        id,
      ).toBe(true);
      for (const p of all.filter((q) =>
        /\/(barrack|granary|principia|breastwork|corner-tower|leaf)/.test(q.id ?? ''),
      ))
        expect(p.detail, p.id).toBe(true);
    }
  });
});

describe('the arrival cutscene’s road', () => {
  const fort = feature('roman-fort-a');
  const inFort = (p: { e: number; n: number }): Pt =>
    rotate([p.e - fort.at.e, p.n - fort.at.n], -(plan('roman-fort-a').angle ?? 0));
  const route = TYWI_ROAD_FROM_LLANDOVERY.points;

  it('ends outside Fort 1’s evidenced south-east gate, at true scale, not at a placeholder’s edge', () => {
    const end = inFort(route[route.length - 1] ?? fort.at);
    expect(Math.abs(end[0] - 18)).toBeLessThan(2);
    expect(end[1]).toBeLessThan(-80);
    expect(end[1]).toBeGreaterThan(-100);
  });

  it('goes round the fort rather than through it, keeping clear of its outermost ditch', () => {
    const inside: string[] = [];
    route.forEach((p, i) => {
      const [x, y] = inFort(p);
      if (Math.abs(x) < 120 + 12 && Math.abs(y) < 80 + 12 && i < route.length - 1) inside.push(String(i));
    });
    expect(inside).toEqual([]);
    for (let i = 1; i < route.length; i++) {
      const a = inFort(route[i - 1] ?? fort.at);
      const b = inFort(route[i] ?? fort.at);
      for (let k = 0; k <= 50; k++) {
        const x = a[0] + ((b[0] - a[0]) * k) / 50;
        const y = a[1] + ((b[1] - a[1]) * k) / 50;
        if (i < route.length - 1)
          expect(Math.abs(x) < 120 && Math.abs(y) < 80, `leg ${String(i)}`).toBe(false);
      }
    }
  });

  it('says in its ⓘ that the gate chosen is a choice, not a record', () => {
    const p = TYWI_ROAD_FROM_LLANDOVERY.provenance;
    expect(p.kind === 'reconstructed' && p.basis.en).toContain('south-east gate');
    expect(p.kind === 'reconstructed' && p.basis.cy).toContain('de-ddwyreiniol');
  });
});
