import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ASSETS } from '../src/content/assets.ts';
import { STRINGS } from '../src/content/strings.ts';
import { voiceLines, voiceSignature } from '../src/content/voices.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { WORLD } from '../src/domain/geo.ts';
import { AMBIENT_BEDS } from '../src/domain/model.ts';
import { environmentAt, latestStarting } from '../src/domain/state.ts';
import { shotFor } from '../src/domain/steps.ts';
import { rotate } from '../src/domain/plan.ts';
import { ad, bc, contains, year } from '../src/domain/time.ts';
import { tAt, yearAt } from '../src/domain/timeline.ts';

const root = join(import.meta.dirname, '..');

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

function unique(ids: readonly string[]): string[] {
  return ids.filter((id, i) => ids.indexOf(id) !== i);
}

describe('content integrity', () => {
  const places = new Set(W.places.map((p) => p.id));
  const people = new Set(W.people.map((p) => p.id));
  const sources = new Set(W.sources.map((s) => s.id));

  it('has unique ids everywhere', () => {
    expect(unique(W.places.map((p) => p.id))).toEqual([]);
    expect(unique(W.events.map((e) => e.id))).toEqual([]);
    expect(unique(W.features.map((f) => f.id))).toEqual([]);
    expect(unique(W.people.map((p) => p.id))).toEqual([]);
    expect(unique(W.conversations.map((c) => c.id))).toEqual([]);
    expect(unique(W.almanac.map((a) => a.id))).toEqual([]);
    expect(unique(W.eras.map((e) => e.id))).toEqual([]);
  });

  it('only refers to places, people and sources that exist', () => {
    const missing: string[] = [];
    for (const e of W.events) if (e.place && !places.has(e.place)) missing.push(`event ${e.id} → ${e.place}`);
    for (const f of W.features)
      if (f.place && !places.has(f.place)) missing.push(`feature ${f.id} → ${f.place}`);
    for (const c of W.conversations) {
      if (!places.has(c.place)) missing.push(`conversation ${c.id} → ${c.place}`);
      for (const p of c.people) if (!people.has(p)) missing.push(`conversation ${c.id} → ${p}`);
      for (const l of c.lines)
        if (!c.people.includes(l.speaker))
          missing.push(`conversation ${c.id} line by ${l.speaker}, not in its cast`);
    }
    const all = [
      ...W.events,
      ...W.features,
      ...W.places,
      ...W.conversations,
      ...W.almanac,
      ...W.language,
      ...W.climate,
    ];
    for (const item of all)
      for (const s of item.provenance.sources) if (!sources.has(s)) missing.push(`source ${s}`);
    for (const e of W.events)
      for (const s of e.recordedSky?.sources ?? []) if (!sources.has(s)) missing.push(`sky source ${s}`);
    expect(missing).toEqual([]);
  });

  it('keeps every recorded sky honest: a real hour, a documented event, and a chosen hour said to be chosen', () => {
    const skies = W.events.flatMap((e) => (e.recordedSky ? [{ e, sky: e.recordedSky }] : []));
    expect(skies.length).toBeGreaterThan(0);
    const bad = skies.flatMap(({ e, sky }) => [
      ...(sky.hour && (sky.hour.value < 0 || sky.hour.value >= 24) ? [`${e.id}: hour out of range`] : []),
      ...(e.provenance.kind !== 'documented' ? [`${e.id}: not documented`] : []),
      ...(sky.hour?.kind === 'chosen' && !sky.note.en.includes('not recorded')
        ? [`${e.id}: chosen hour not flagged`]
        : []),
      ...(sky.hour?.kind === 'chosen' && !sky.note.cy.includes('ni chofnodwyd')
        ? [`${e.id}: chosen hour not flagged in Welsh`]
        : []),
    ]);
    expect(bad).toEqual([]);
  });

  it('never cites one page twice under different keys, which would pass for two sources', () => {
    const url = new Map(
      W.sources.map((s) => [s.id, s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/[/#]+$/, '')]),
    );
    const all = [...W.events, ...W.features, ...W.places, ...W.conversations, ...W.almanac, ...W.language];
    const twice = all.flatMap((item) => {
      const pages = item.provenance.sources.map((s) => url.get(s) ?? s).filter((u) => u !== '');
      const dup = pages.filter((u, i) => pages.indexOf(u) !== i);
      return dup.length > 0 ? [`${item.id}: ${[...new Set(dup)].join(', ')}`] : [];
    });
    expect(twice).toEqual([]);
  });

  it('keeps the climate keyframes in time order, within range', () => {
    const years = W.climate.map((k) => k.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(W.climate.every((k) => k.chill >= -1 && k.chill <= 1)).toBe(true);
  });

  it('never has a documented item without a source', () => {
    const all = [...W.events, ...W.features, ...W.places, ...W.almanac, ...W.language];
    expect(
      all.filter((i) => i.provenance.kind === 'documented' && i.provenance.sources.length === 0),
    ).toEqual([]);
  });

  it('marks every conversation as imagined', () => {
    expect(W.conversations.filter((c) => c.provenance.kind !== 'imagined').map((c) => c.id)).toEqual([]);
  });

  it('has an era for every slider position', () => {
    const gaps: number[] = [];
    for (let i = 0; i <= 4000; i++)
      if (!latestStarting(W.eras, yearAt(W.timeline, i / 4000))) gaps.push(i / 4000);
    expect(gaps).toEqual([]);
  });

  it('keeps magnetic key dates far enough apart to scrub between', () => {
    const ts = W.events
      .filter((e) => e.magnetic)
      .map((e) => tAt(W.timeline, e.when.from))
      .sort((a, b) => a - b);
    const tooClose = ts.filter((t, i) => i > 0 && t - (ts[i - 1] ?? 0) < 0.004);
    expect(tooClose.length).toBeLessThan(3);
  });
});

describe('ambient sound beds', () => {
  const sources = new Set(W.sources.map((s) => s.id));
  const beds = W.environment.flatMap((k) =>
    AMBIENT_BEDS.flatMap((bed) => {
      const b = k.ambient[bed];
      return b === undefined ? [] : [{ key: `${String(k.year)} ${bed}`, bed, year: k.year, b }];
    }),
  );

  it('gives every sounding bed in every environment key a level and a provenance', () => {
    expect(beds.length).toBeGreaterThan(0);
    const bad = beds.filter(
      ({ b }) =>
        !(b.level > 0 && b.level <= 1) ||
        typeof b.provenance !== 'object' ||
        (b.provenance.kind === 'documented' && b.provenance.sources.length === 0) ||
        (b.provenance.kind === 'reconstructed' &&
          (b.provenance.basis.en === '' || b.provenance.basis.cy === '')) ||
        b.provenance.sources.some((s) => !sources.has(s)),
    );
    expect(bad.map((x) => x.key)).toEqual([]);
  });

  it('rings no bell and runs no train before the railway opened in January 1857 (effects:S7)', () => {
    expect(
      beds.filter((x) => (x.bed === 'bells' || x.bed === 'train') && x.year < ad(1857)).map((x) => x.key),
    ).toEqual([]);
    const heard: string[] = [];
    for (let y: number = bc(12500); y <= 1850; y += 5) {
      const a = environmentAt(W.environment, year(y)).ambient;
      if (a.bells > 0 || a.train > 0) heard.push(String(y));
    }
    expect(heard).toEqual([]);
    const first = beds.find((x) => x.bed === 'bells');
    expect(first?.year).toBe(ad(1857));
    expect(first?.b.provenance.sources).toContain('effects:S7');
  });
});

describe('languages', () => {
  const modern = new Set(['welsh', 'english']);

  it('explains every conversation that uses an old language or a stand-in', () => {
    const unexplained = W.conversations
      .filter((c) => c.lines.some((l) => !modern.has(l.language)) && !c.languageNote)
      .map((c) => c.id);
    expect(unexplained).toEqual([]);
  });

  it('never labels speech before about AD 500 as Welsh', () => {
    const early = W.conversations.filter((c) => c.when.to < 500);
    expect(
      early.flatMap((c) => c.lines.filter((l) => l.language === 'welsh').map((l) => `${c.id}:${l.spoken}`)),
    ).toEqual([]);
  });
});

describe('voices', () => {
  const lines = voiceLines(W.conversations, W.people);
  const manifestPath = join(root, 'public/voices/manifest.json');
  const raw: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const manifest: Record<string, string> = {};
  if (raw && typeof raw === 'object')
    for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') manifest[k] = v;

  it('have an up-to-date clip for every line (run node tools/voices/build-voices.ts)', () => {
    const stale = lines.filter((l) => {
      const hash = createHash('sha1').update(voiceSignature(l)).digest('hex').slice(0, 12);
      return manifest[l.key] !== hash || !existsSync(join(root, 'public/voices', `${l.key}.mp3`));
    });
    expect(stale.map((l) => l.key)).toEqual([]);
  });

  it('have no orphaned clips', () => {
    const keys = new Set(lines.map((l) => l.key));
    expect(Object.keys(manifest).filter((k) => !keys.has(k))).toEqual([]);
    const onDisk = readdirSync(join(root, 'public/voices')).filter((f) => f.endsWith('.mp3'));
    expect(onDisk.filter((f) => !keys.has(f.slice(0, -4)))).toEqual([]);
  });
});

describe('assets', () => {
  it('records the source and licence of every shipped file', () => {
    const shipped = files(join(root, 'public')).map((f) => relative(join(root, 'public'), f));
    expect(shipped.filter((f) => !ASSETS.some((a) => a.files.test(f)))).toEqual([]);
  });
});

describe('trains', () => {
  const trains = W.features.filter((f) => f.kind.type === 'train');
  const railway = W.features.find((f) => f.kind.type === 'railway');

  it('run only while the railway exists', () => {
    expect(railway).toBeDefined();
    const outside = trains.filter(
      (t) => !railway || t.when.from < railway.when.from || t.when.to > railway.when.to,
    );
    expect(outside.map((t) => t.id)).toEqual([]);
  });

  it('never overlap, so one train is on the line at a time', () => {
    const sorted = [...trains].sort((a, b) => a.when.from - b.when.from);
    const overlaps = sorted.flatMap((t, i) => {
      const next = sorted[i + 1];
      return next && next.when.from <= t.when.to ? [`${t.id}/${next.id}`] : [];
    });
    expect(overlaps).toEqual([]);
  });

  it('cover the whole life of the railway', () => {
    const years = new Set<number>();
    for (const t of trains) for (let y = t.when.from; y <= t.when.to; y++) years.add(y);
    const missing: number[] = [];
    if (railway)
      for (let y = railway.when.from; y <= railway.when.to; y++) if (!years.has(y)) missing.push(y);
    expect(missing).toEqual([]);
  });
});

describe('key-date camera shots', () => {
  const places = new Map(W.places.map((p) => [p.id, p]));
  const features = new Map(W.features.map((f) => [f.id, f]));

  it('resolves a shot for every event unless it asks for the whole valley', () => {
    const unframed = W.events
      .filter((e) => e.shot?.framing !== 'valley' && !shotFor(e, places, features))
      .map((e) => e.id);
    expect(unframed).toEqual([]);
  });

  it('names only features that exist, and exist at the date of the event', () => {
    const wrong = W.events.flatMap((e) => {
      const id = e.shot?.feature;
      if (!id) return [];
      const f = features.get(id);
      return f && contains(f.when, e.when.from) ? [] : [e.id];
    });
    expect(wrong).toEqual([]);
  });

  it('only points the camera inside the ten-mile disc', () => {
    const outside = W.events
      .map((e) => ({ id: e.id, at: shotFor(e, places, features)?.at }))
      .filter(
        (x) => x.at && Math.hypot(x.at.e - WORLD.centre.e, x.at.n - WORLD.centre.n) > WORLD.radiusMetres,
      )
      .map((x) => x.id);
    expect(outside).toEqual([]);
  });
});

describe('building plans', () => {
  const plans = W.features.flatMap((f) =>
    f.kind.type === 'building' ? [{ id: f.id, plan: f.kind.plan }] : [],
  );
  const parts = (id: string) => plans.find((p) => p.id === id)?.plan.parts ?? [];

  it('keeps every platform convex, as the levelling assumes', () => {
    const bent: string[] = [];
    for (const { id, plan } of plans)
      for (const part of plan.parts) {
        if (part.type !== 'platform') continue;
        const o = part.outline;
        const turns = o.map((a, i) => {
          const b = o[(i + 1) % o.length] ?? a;
          const c = o[(i + 2) % o.length] ?? a;
          return Math.sign((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]));
        });
        if (new Set(turns.filter((t) => t !== 0)).size > 1) bent.push(id);
      }
    expect(bent).toEqual([]);
  });

  it('draws the documented dimensions', () => {
    const cc = parts('carreg-cennen-giffard');
    const walls = cc.flatMap((p) => (p.type === 'wall' ? p.path : []));
    const xs = walls.map((p) => p[0]);
    const ys = walls.map((p) => p[1]);
    expect(Math.max(...xs) - Math.min(...xs)).toBe(60);
    expect(Math.max(...ys) - Math.min(...ys)).toBe(60);
    const inner = parts('carreg-cennen-inner').flatMap((p) => (p.type === 'platform' ? p.outline : []));
    expect(Math.max(...inner.map((p) => p[0])) - Math.min(...inner.map((p) => p[0]))).toBe(32);
    expect(Math.max(...inner.map((p) => p[1])) - Math.min(...inner.map((p) => p[1]))).toBe(28);
    expect(cc.some((p) => p.type === 'tower' && p.shape === 'round' && p.size === 8)).toBe(true);
    expect(cc.filter((p) => p.type === 'tower' && p.shape === 'octagonal')).toHaveLength(2);

    const bridges = parts('bridge').flatMap((p) => (p.type === 'bridge' ? [p] : []));
    const bridge = bridges[0];
    expect(bridge && Math.hypot(bridge.to[0] - bridge.from[0], bridge.to[1] - bridge.from[1])).toBeCloseTo(
      110.6,
      1,
    );
    expect(bridge?.arches[0]).toMatchObject({ span: 44.2, rise: 12.65 });

    const towers = parts('talley-abbey').flatMap((p) => (p.type === 'tower' ? [p] : []));
    expect(towers[0]?.height).toBe(29);
    const ruin = towers[0]?.ruin;
    expect(ruin && ruin !== 'gone' ? ruin.stands * 29 : 0).toBeCloseTo(26);

    expect(parts('dinefwr-castle').some((p) => p.type === 'tower' && p.size === 12)).toBe(true);
  });

  it('draws Talley as finished (about 49m), with its tower on the Coflein point and dated to 1536', () => {
    const tower = parts('talley-abbey').find((p) => p.type === 'tower');
    expect(tower?.type === 'tower' && tower.at).toEqual([0, 0]);
    // The church: the presbytery and the built nave, both on the main axis (the ranges lie south of it).
    const xs = parts('talley-abbey').flatMap((p) =>
      p.type === 'hall' && p.angle === 0 && p.at[1] === 0
        ? [p.at[0] - p.length / 2, p.at[0] + p.length / 2]
        : [],
    );
    expect(xs).toHaveLength(4);
    const length = Math.max(...xs) - Math.min(...xs);
    expect(length).toBeGreaterThan(48.5);
    expect(length).toBeLessThan(50.5);
    const talley = W.places.find((p) => p.id === 'talley');
    const abbey = W.features.find((f) => f.id === 'talley-abbey');
    expect(abbey?.at).toEqual(talley?.at);
    expect(abbey?.when.to).toBe(1536);
    expect(W.features.find((f) => f.id === 'talley-parish-church')?.when).toEqual({ from: 1536, to: 1773 });
  });

  it('grows Dryslwyn ward by ward, each phase containing the one before', () => {
    const ids = ['dryslwyn-first', 'dryslwyn-two-wards', 'dryslwyn-castle'];
    const phases = ids.map((id) => parts(id));
    for (let i = 1; i < phases.length; i++) {
      for (const part of phases[i - 1] ?? []) expect(phases[i]).toContain(part);
      expect(phases[i]?.length).toBeGreaterThan(phases[i - 1]?.length ?? 0);
    }
    const spans = ids.map((id) => W.features.find((f) => f.id === id)?.when);
    expect(spans.map((w) => w?.from)).toEqual([1225, 1250, 1280]);
    expect(spans.map((w) => w?.to)).toEqual([1250, 1280, 1430]);
    expect(phases[0]?.some((p) => p.type === 'tower' && p.shape === 'round' && p.size === 12)).toBe(true);
  });

  it('lays Dryslwyn out as the research describes, each part on its own side', () => {
    const plan = W.features.find((f) => f.id === 'dryslwyn-castle');
    if (plan?.kind.type !== 'building') throw new Error('dryslwyn-castle is not a building');
    const { parts: all, angle = 0 } = plan.kind.plan;
    const centre = (pts: readonly (readonly [number, number])[]): [number, number] => [
      pts.reduce((a, p) => a + p[0], 0) / pts.length,
      pts.reduce((a, p) => a + p[1], 0) / pts.length,
    ];
    const bearing = (from: readonly [number, number], to: readonly [number, number]): number => {
      const [x, y] = rotate([to[0] - from[0], to[1] - from[1]], angle);
      return (90 - (Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    };
    const walls = all.flatMap((p) => (p.type === 'wall' ? [p.path] : []));
    const [inner, middle, outer] = walls.map(centre);
    const find = (test: (p: (typeof all)[number]) => boolean): [number, number] => {
      const part = all.find(test);
      if (!part || !('at' in part)) throw new Error('part missing');
      return [part.at[0], part.at[1]];
    };
    const keep = find((p) => p.type === 'tower' && p.shape === 'round');
    const chapel = find((p) => p.type === 'tower' && p.shape === 'square' && p.size === 7);
    const gatehouse = find((p) => p.type === 'tower' && p.shape === 'square' && p.size === 8);
    const hall = find((p) => p.type === 'hall' && p.length === 16);
    const apartments = find((p) => p.type === 'hall' && p.length === 14);
    if (!inner || !middle || !outer) throw new Error('wards missing');
    const within = (b: number, lo: number, hi: number): boolean => b > lo && b < hi;
    expect(within(bearing(inner, middle), 30, 70)).toBe(true);
    expect(within(bearing(middle, outer), 5, 45)).toBe(true);
    expect(within(bearing(outer, gatehouse), 0, 45)).toBe(true);
    expect(within(bearing(inner, keep), 60, 110)).toBe(true);
    expect(within(bearing(inner, hall), 150, 210)).toBe(true);
    expect(within(bearing(inner, chapel), 100, 160)).toBe(true);
    expect(within(bearing(inner, apartments), 160, 240)).toBe(true);
  });

  it('labels a building reconstructed where the research does not give its form', () => {
    const guessed = [
      'clas-church',
      'carreg-cennen-welsh',
      'dinefwr-rhys',
      'newton-house',
      'newton-house-turrets',
      'golden-grove-earlier',
    ];
    const wrong = W.features.filter((f) => guessed.includes(f.id) && f.provenance.kind !== 'reconstructed');
    expect(wrong.map((f) => f.id)).toEqual([]);
  });
});

describe('the About panel', () => {
  it('states the real hill exaggeration and landmark scale, in both languages', () => {
    for (const text of [STRINGS.aboutBody.en, STRINGS.aboutBody.cy]) {
      expect(text).toContain(` ${String(WORLD.verticalExaggeration)} `);
      expect(text).toContain(` ${String(WORLD.landmarkScale)} `);
    }
  });
});
