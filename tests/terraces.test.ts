import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { applyEdits, checkEdit, type GroundEdit } from '../src/domain/groundedit.ts';
import { DetailGround, parseManifest, tileData } from '../src/domain/lidar.ts';
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
          checkEdit(e, manifest.region, manifest.blendMetres);
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
