import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { SLOPE_SEATING } from '../src/content/buildings.ts';
import { WORLD } from '../src/domain/geo.ts';
import { applyEdits, checkEdit, type GroundEdit } from '../src/domain/groundedit.ts';
import { createHeightfield, sampleHeight } from '../src/domain/heightfield.ts';
import { DetailGround, parseManifest, tileData } from '../src/domain/lidar.ts';
import { SETTING_SCALE } from '../src/domain/materials.ts';
import type { Feature, GridRef } from '../src/domain/model.ts';
import { insideConvex, rotate, type Part, type Pt } from '../src/domain/plan.ts';
import {
  editsBuiltOn,
  editsDrawn,
  footprint,
  footprintSamples,
  SEAT_TOLERANCE,
  seats,
  standsOnGround,
  terracesByFeature,
} from '../src/domain/plot.ts';
import { presenceAt, snapshotAt } from '../src/domain/state.ts';
import { ad } from '../src/domain/time.ts';
import { tAt } from '../src/domain/timeline.ts';

// The LiDAR the app draws, read the way the app reads it, so these numbers are the app's ground (ADR 0049).
const dir = join(import.meta.dirname, '..', 'public', 'data');
const manifest = parseManifest(JSON.parse(readFileSync(join(dir, 'lidar', 'lidar.json'), 'utf8')));
const blob = readFileSync(join(dir, 'lidar', manifest.data));
const lidar = new DetailGround(
  manifest,
  tileData(manifest, blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength)),
);
const base = (g: GridRef): number => {
  const h = lidar.lidarAt(g);
  if (h === undefined) throw new Error(`no LiDAR at ${String(g.e)},${String(g.n)}`);
  return h;
};

const FORTS = ['roman-fort-a', 'roman-fort-b', 'roman-vicus'] as const;
const feature = (id: string): Feature => {
  const f = W.features.find((x) => x.id === id);
  if (!f) throw new Error(`no feature ${id}`);
  return f;
};
const terraces = terracesByFeature(W.features, base);

// Plan-local metres to the ground a feature is built on: the base with the terraces drawn in its first year.
function groundOf(f: Feature, edits: readonly GroundEdit[]): (p: Pt) => number {
  if (f.kind.type !== 'building') throw new Error(`${f.id} is not a plan`);
  const angle = f.kind.plan.angle ?? 0;
  return (p) => {
    const [x, y] = rotate(p, angle);
    const g = { e: f.at.e + x, n: f.at.n + y };
    return applyEdits(base(g), g, edits);
  };
}

const planOf = (f: Feature): readonly Part[] => (f.kind.type === 'building' ? f.kind.plan.parts : []);
const carried = (f: Feature): Set<string> =>
  new Set(planOf(f).flatMap((p) => (p.type === 'terrace' ? p.carries : [])));

describe('the Roman forts’ buildings on their ground (issue 3, ADR 0056)', () => {
  it('bury no corner of any standing part deeper than a sill beam, on the ground each fort is built on', () => {
    for (const id of FORTS) {
      const f = feature(id);
      if (f.kind.type !== 'building') throw new Error(id);
      const ground = groundOf(f, editsBuiltOn(f, W.features, W.timeline, terraces));
      const all = seats(f.kind.plan, ground);
      expect(all.length, id).toBeGreaterThan(10);
      for (const s of all) expect(s.highest - s.floor, `${id} ${s.id}`).toBeLessThanOrEqual(SEAT_TOLERANCE);
    }
  });

  it('bury no point of any standing part’s floor, read on a 1m grid across its whole footprint', () => {
    for (const id of FORTS) {
      const f = feature(id);
      if (f.kind.type !== 'building') throw new Error(id);
      const ground = groundOf(f, editsBuiltOn(f, W.features, W.timeline, terraces));
      let checked = 0;
      for (const s of seats(f.kind.plan, ground)) {
        const part = f.kind.plan.parts.find((p) => p.id === s.id);
        if (!part || !standsOnGround(part)) throw new Error(`${id} ${s.id}`);
        const ring = footprint(part);
        const xs = ring.map((p) => p[0]);
        const ys = ring.map((p) => p[1]);
        for (let x = Math.min(...xs); x <= Math.max(...xs); x += 1)
          for (let y = Math.min(...ys); y <= Math.max(...ys); y += 1) {
            if (!insideConvex([x, y], ring)) continue;
            checked++;
            expect(
              ground([x, y]) - s.floor,
              `${id} ${s.id} at ${x.toFixed(0)},${y.toFixed(0)}`,
            ).toBeLessThanOrEqual(SEAT_TOLERANCE);
          }
      }
      expect(checked, id).toBeGreaterThan(500);
    }
  });

  it('stand every fort building on its terrace, so its downhill footing is no more than a few tenths of a metre', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b'] as const) {
      const f = feature(id);
      if (f.kind.type !== 'building') throw new Error(id);
      const ground = groundOf(f, editsBuiltOn(f, W.features, W.timeline, terraces));
      const plotted = carried(f);
      const onPlots = seats(f.kind.plan, ground).filter((s) => plotted.has(s.id));
      expect(onPlots.length, id).toBe(id === 'roman-fort-a' ? 20 : 10);
      for (const s of onPlots) expect(s.floor - s.lowest, `${id} ${s.id}`).toBeLessThan(0.3);
    }
  });

  it('measures what the terraces level: today’s ground falls up to about 3.6m across a Fort 1 building and 1.8m across a Fort 2 one, as their ⓘ says', () => {
    const falls = (id: string): number => {
      const f = feature(id);
      if (f.kind.type !== 'building') throw new Error(id);
      const ground = groundOf(f, []);
      return Math.max(
        ...planOf(f)
          .filter((p) => p.type === 'hall' && carried(f).has(p.id ?? ''))
          .map((p) => {
            if (!standsOnGround(p)) return 0;
            const h = footprintSamples(p).map(ground);
            return Math.max(...h) - Math.min(...h);
          }),
      );
    };
    const said = (id: string): string => {
      const t = planOf(feature(id)).find((p) => p.type === 'terrace')?.provenance;
      return t?.kind === 'reconstructed' ? t.basis.en : '';
    };
    expect(said('roman-fort-a')).toContain(`up to about ${falls('roman-fort-a').toFixed(1)}m`);
    expect(said('roman-fort-b')).toContain(`up to about ${falls('roman-fort-b').toFixed(1)}m`);
  });

  it('lays each terrace inside the detail region, clear of its rim, so the ground can draw it', () => {
    for (const edits of terraces.values())
      for (const e of edits) {
        expect(() => {
          checkEdit(e, manifest.regions, manifest.blendMetres);
        }).not.toThrow();
      }
  });

  it('draws a fort’s terraces exactly while the fort is drawn, and none in 2020', () => {
    const at = (year: number): string[] =>
      editsDrawn(terraces, snapshotAt(W, tAt(W.timeline, ad(year))).features).map((e) => e.id);
    expect(at(76).some((id) => id.startsWith('roman-fort-a:'))).toBe(true);
    expect(at(76).some((id) => id.startsWith('roman-fort-b:'))).toBe(false);
    expect(at(110).some((id) => id.startsWith('roman-fort-b:'))).toBe(true);
    expect(at(110).some((id) => id.startsWith('roman-fort-a:'))).toBe(false);
    expect(at(2020)).toEqual([]);
  });

  it('builds a feature that starts in a fort’s years elsewhere in the valley on none of the forts’ terraces', () => {
    const far = feature('garn-goch-fawr-ruin');
    expect(presenceAt(W.timeline, feature('roman-fort-a'), tAt(W.timeline, far.when.from))).toBeGreaterThan(
      0.5,
    );
    expect(editsBuiltOn(far, W.features, W.timeline, terraces)).toEqual([]);
  });

  it('builds Fort 1’s backfilled ditches on Fort 2’s terraces, which are drawn with them, and never on Fort 1’s own', () => {
    const on = editsBuiltOn(feature('roman-fort-a-levelled'), W.features, W.timeline, terraces).map(
      (e) => e.id,
    );
    expect(on.some((id) => id.startsWith('roman-fort-b:'))).toBe(true);
    expect(on.some((id) => id.startsWith('roman-fort-a:'))).toBe(false);
  });
});

describe('the terraces as parts', () => {
  it('put one terrace under every headquarters, commander’s house, granary and barrack, named in both languages and reconstructed', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b'] as const) {
      const parts = planOf(feature(id));
      const interior = parts.filter(
        (p) => p.type === 'hall' && /\/(principia|praetorium|granary|barrack)-\d+$/.test(p.id ?? ''),
      );
      expect(interior.length, id).toBeGreaterThan(0);
      for (const b of interior) {
        const on = parts.filter((p) => p.type === 'terrace' && p.carries.includes(b.id ?? ''));
        expect(on.length, `${b.id ?? ''} stands on one terrace`).toBe(1);
        const t = on[0];
        expect(t?.provenance?.kind).toBe('reconstructed');
        expect(t?.name?.en).toMatch(/^Levelled terrace: /);
        expect(t?.name?.cy).toMatch(/^Teras wedi’i lefelu: /);
      }
    }
  });

  it('keeps every building it carries on its level part, at least a metre inside its edge', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b'] as const) {
      const parts = planOf(feature(id));
      for (const t of parts) {
        if (t.type !== 'terrace') continue;
        expect(t.carries.length, t.id).toBeGreaterThan(0);
        for (const c of t.carries) {
          const b = parts.find((p) => p.id === c);
          if (b?.type !== 'hall') throw new Error(`${t.id ?? ''} carries no hall ${c}`);
          expect(b.angle).toBe(t.angle);
          // Both run 90 degrees: length along the plan's y, width along x.
          expect(Math.abs(b.at[1] - t.at[1]) + b.length / 2 + 1, c).toBeLessThanOrEqual(t.length / 2);
          expect(Math.abs(b.at[0] - t.at[0]) + b.width / 2 + 1, c).toBeLessThanOrEqual(t.width / 2);
        }
      }
    }
  });
});

const textOf = (p: Feature['provenance']): { readonly en: string; readonly cy: string } | undefined =>
  p.kind === 'documented' ? p.note : p.kind === 'reconstructed' ? p.basis : p.groundedIn;

describe('what the ⓘ says about the slope and the terraces (ADR 0056)', () => {
  it('says on every Dryslwyn plan, in both languages, that a downhill wall’s extra height is how the app draws the ground', () => {
    for (const id of ['dryslwyn-first', 'dryslwyn-two-wards', 'dryslwyn-castle', 'dryslwyn-ruin']) {
      const text = textOf(feature(id).provenance);
      expect(text?.en, id).toMatch(
        /downhill wall therefore shows taller than the plan gives.*not from the sources/s,
      );
      expect(text?.cy, id).toMatch(/nid o’r ffynonellau/);
    }
  });

  it('leaves Birdoswald, an encyclopedia lead nobody has read the source of, out of every terrace ⓘ', () => {
    for (const id of ['roman-fort-a', 'roman-fort-b']) {
      for (const t of planOf(feature(id)).filter((p) => p.type === 'terrace')) {
        const text = t.provenance && textOf(t.provenance);
        expect(`${text?.en ?? ''} ${text?.cy ?? ''}`, t.id).not.toMatch(/Birdoswald/);
        expect(text?.en, t.id).toMatch(/Vindolanda/);
      }
    }
  });
});

const t50Meta: unknown = JSON.parse(readFileSync(join(dir, 'terrain.json'), 'utf8'));
const t50Field = (k: string): number => {
  const v: unknown = typeof t50Meta === 'object' && t50Meta !== null ? Reflect.get(t50Meta, k) : undefined;
  if (typeof v !== 'number') throw new Error(`terrain.json: ${k} is not a number`);
  return v;
};
const t50Raw = readFileSync(join(dir, 'terrain.bin'));
const t50 = createHeightfield(
  {
    originEasting: t50Field('originEasting'),
    originNorthing: t50Field('originNorthing'),
    cellSize: t50Field('cellSize'),
    width: t50Field('width'),
    height: t50Field('height'),
    heightScale: t50Field('heightScale'),
  },
  new Uint16Array(t50Raw.buffer, t50Raw.byteOffset, t50Raw.byteLength / 2),
);

/**
 * A building's footing, in metres exaggerated 2.4 times: how far its floor stands above the lowest ground under its
 * footprint. The ground is read as the app reads it for placing things (the LiDAR where there is some, OS Terrain 50
 * elsewhere, with the ground edits the building is built on), not from the blended mesh drawn, and platforms raise it as
 * the builder does, so this is the footing to within the mesh's rounding, not to the centimetre.
 */
function drawnFootingMetres(f: Feature): number {
  if (f.kind.type !== 'building') return 0;
  const plan = f.kind.plan;
  const edits = editsBuiltOn(f, W.features, W.timeline, terraces);
  const across = SETTING_SCALE[plan.setting].across;
  const raw = (p: Pt): number => {
    const [x, y] = rotate(p, plan.angle ?? 0);
    const g = { e: f.at.e + x * across, n: f.at.n + y * across };
    return applyEdits(lidar.lidarAt(g) ?? sampleHeight(t50, g), g, edits);
  };
  const anchor = raw([0, 0]);
  const platforms = plan.parts.flatMap((p) => (p.type === 'platform' ? [p.outline] : []));
  const ground = (p: Pt): number =>
    platforms.some((o) => insideConvex(p, o)) ? Math.max(anchor, raw(p)) : raw(p);
  const fall = Math.max(0, ...seats(plan, ground).map((s) => s.floor - s.lowest));
  return fall * WORLD.verticalExaggeration;
}

// 3 drawn metres: the extra wall a viewer sees under the highest corner is then about a storey of an ordinary
// house, enough to read as the building rising from a taller footing than its plan gives, where less passes as a
// plinth. It sits in a gap in the landscape plans' measured footings (largest below it 1.6m, Paxton's Tower;
// smallest above 3.4m, Newton House), so no plan is within 0.4m of the line.
const SLOPE_NOTE_FROM = 3;

const landscapeBuildings = W.features.filter(
  (f) => f.kind.type === 'building' && f.kind.plan.setting === 'landscape',
);

describe('the slope note on a plan’s ⓘ (ADR 0056)', () => {
  it('is carried by every landscape plan whose footing, read off the LiDAR and OS Terrain 50 and exaggerated 2.4 times, is over 3m, in both languages', () => {
    const over = landscapeBuildings.filter((f) => drawnFootingMetres(f) > SLOPE_NOTE_FROM);
    // 20 since 2026-10-23: on Carreg Cennen's 2m LiDAR the first Welsh castle's footing fell from 7.1m to 1.2m.
    expect(over.length, 'landscape plans over the line').toBeGreaterThanOrEqual(20);
    for (const f of over) {
      const text = textOf(f.provenance);
      expect(text?.en, `${f.id} (${drawnFootingMetres(f).toFixed(1)}m drawn)`).toContain(SLOPE_SEATING.en);
      expect(text?.cy, `${f.id} (${drawnFootingMetres(f).toFixed(1)}m drawn)`).toContain(SLOPE_SEATING.cy);
    }
  });

  it('has no landscape plan within 0.3m of the line, so a change of ground data cannot quietly flip one', () => {
    for (const f of landscapeBuildings)
      expect(Math.abs(drawnFootingMetres(f) - SLOPE_NOTE_FROM), f.id).toBeGreaterThan(0.3);
  });

  it('is carried by no plan under the line, where it would claim an extra height nobody can see', () => {
    for (const f of W.features) {
      if (f.kind.type !== 'building') continue;
      const text = textOf(f.provenance);
      if (!text?.en.includes(SLOPE_SEATING.en)) continue;
      expect(f.kind.plan.setting, `${f.id}: the note speaks of a building drawn larger than life`).toBe(
        'landscape',
      );
      expect(drawnFootingMetres(f), f.id).toBeGreaterThan(SLOPE_NOTE_FROM);
    }
  });

  it('says on every vicus house, in both languages, that the hills are exaggerated and the house is not', () => {
    const houses = planOf(feature('roman-vicus')).filter((p) => p.type === 'hall');
    expect(houses.length).toBeGreaterThan(5);
    for (const h of houses) {
      const text = h.provenance && textOf(h.provenance);
      expect(text?.en, h.id).toContain(
        `${String(WORLD.verticalExaggeration)} times as high but these houses are not`,
      );
      expect(text?.cy, h.id).toContain(
        `${String(WORLD.verticalExaggeration)} gwaith mor uchel ond nid y tai hyn`,
      );
    }
  });

  it('is carried by no map-scale or true-size plan: the note speaks of a building drawn larger than life, and a map-scale plan’s walls are exaggerated with the hills (so its fall is the real one) while a true-size plan’s are not (its note says so itself)', () => {
    for (const f of W.features) {
      if (f.kind.type !== 'building' || f.kind.plan.setting === 'landscape') continue;
      expect(textOf(f.provenance)?.en ?? '', f.id).not.toContain(SLOPE_SEATING.en);
    }
  });
});
