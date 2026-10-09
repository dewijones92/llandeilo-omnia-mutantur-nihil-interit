import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ASSETS } from '../src/content/assets.ts';
import { HARRIES_PHOTOGRAPHS, PHOTOGRAPH_PROVENANCE } from '../src/content/photographs.ts';
import { STRINGS } from '../src/content/strings.ts';
import { voiceLines, voiceSignature } from '../src/content/voices.ts';
import {
  CROSS_HANDS_NARROW_GAUGE,
  DUFFRYN_STATION,
  END_OF_STEAM,
  GARNANT_STATION,
  GWAUN_CAE_GURWEN_JOIN,
  LLANDEILO_STATION,
} from '../src/content/features.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { WORLD } from '../src/domain/geo.ts';
import { hasStreetLamps, insideArea, streetWarmth } from '../src/domain/lamplight.ts';
import { DEFAULT_CLOCK, sunElevation } from '../src/domain/daylight.ts';
import type { Bilingual } from '../src/domain/i18n.ts';
import { AMBIENT_BEDS, type GridRef } from '../src/domain/model.ts';
import type { Provenance } from '../src/domain/provenance.ts';
import { latestStarting, soundAt } from '../src/domain/state.ts';
import { shotFor } from '../src/domain/steps.ts';
import { rotate } from '../src/domain/plan.ts';
import { sectionLines, type GridBox } from '../src/domain/rail.ts';
import { parseLines } from '../src/platform/assets.ts';
import { ad, bc, contains, onDay, year } from '../src/domain/time.ts';
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
      ...W.lamplight,
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

  it('keeps the night-light keys in time order and in range, with street lamps only where documented', () => {
    const years = W.lamplight.map((k) => k.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    const levels = W.lamplight.flatMap((k) => [
      k.warmth,
      k.windows,
      k.glow,
      k.hearth,
      ...(hasStreetLamps(k.streets) ? [k.streets.glow, streetWarmth(k.streets)] : []),
    ]);
    expect(levels.filter((v) => v < 0 || v > 1)).toEqual([]);
    expect(
      W.lamplight
        .filter((k) => hasStreetLamps(k.streets) && k.provenance.kind !== 'documented')
        .map((k) => k.year),
    ).toEqual([]);
  });

  it('lights only the town’s streets: never Ffairfach, south of the Tywi, where no source says lamps stood', () => {
    const church = { e: 262930, n: 222236 };
    const ffairfach = [
      { e: 262901, n: 221064 },
      { e: 262905, n: 221019 },
      { e: 262800, n: 221500 },
    ];
    const lit = W.lamplight.flatMap((k) => (hasStreetLamps(k.streets) ? [k.streets.area] : []));
    expect(lit.length).toBeGreaterThan(0);
    for (const area of lit) {
      expect(insideArea(area, church)).toBe(true);
      expect(ffairfach.filter((p) => insideArea(area, p))).toEqual([]);
    }
  });

  it('says, in both languages, that farms’ lit windows are a guess in every key that lights a drawn farm', () => {
    const farms = W.features.filter((f) => f.kind.type === 'countryside');
    expect(farms.length).toBeGreaterThan(0);
    const said = (p: Provenance): Bilingual | undefined =>
      p.kind === 'documented' ? p.note : p.kind === 'reconstructed' ? p.basis : p.groundedIn;
    const unlabelled = W.lamplight.filter((k, i) => {
      const until = W.lamplight[i + 1]?.year ?? Number.POSITIVE_INFINITY;
      const lightsFarms = k.windows > 0 && farms.some((f) => f.when.from < until && f.when.to > k.year);
      const text = said(k.provenance);
      const labelled =
        text !== undefined &&
        /farms/i.test(text.en) &&
        /guess/i.test(text.en) &&
        /ffermydd/i.test(text.cy) &&
        /dyfal/i.test(text.cy);
      return lightsFarms && !labelled;
    });
    expect(unlabelled.map((k) => k.year)).toEqual([]);
  });

  it('words every night-light key with the certainty of its date', () => {
    const lead = { by: ['By ', 'Erbyn '], on: ['From ', 'O '], in: ['In ', 'Yn '] } as const;
    expect(
      W.lamplight
        .filter((k) => !k.text.en.startsWith(lead[k.dated][0]) || !k.text.cy.startsWith(lead[k.dated][1]))
        .map((k) => k.year),
    ).toEqual([]);
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
  const points = AMBIENT_BEDS.flatMap((bed) =>
    W.soundscape[bed].map((p, i) => ({ bed, i, p, key: `${bed} ${String(p.year)}` })),
  );
  const heard = points.flatMap(({ bed, i, p, key }) => (p.kind === 'heard' ? [{ bed, i, p, key }] : []));
  const said = (b: { en: string; cy: string } | undefined): boolean =>
    b !== undefined && b.en !== '' && b.cy !== '';

  it('gives every heard point a level, sources that resolve, and the words its tier asks for', () => {
    expect(heard.length).toBeGreaterThan(0);
    const bad = heard.filter(({ p }) => {
      const why = p.provenance;
      const words =
        why.kind === 'documented'
          ? said(why.note)
          : why.kind === 'reconstructed'
            ? said(why.basis)
            : said(why.groundedIn);
      return !(p.level > 0 && p.level <= 1) || !words || why.sources.some((s) => !sources.has(s));
    });
    expect(bad.map((x) => x.key)).toEqual([]);
  });

  it('keeps each bed’s points in date order, on the timeline, sharing a year only where a cut silences a bed', () => {
    const first = yearAt(W.timeline, 0);
    const last = yearAt(W.timeline, 1);
    const bad = points.filter(({ bed, i, p }) => {
      const before = W.soundscape[bed][i - 1];
      const cut = before?.kind === 'heard' && p.kind === 'silent' && before.year === p.year;
      return p.year < first || p.year > last || (before !== undefined && before.year >= p.year && !cut);
    });
    expect(bad.map((x) => x.key)).toEqual([]);
  });

  it('rings no bell and runs no train before the railway opened in January 1857 (effects:S7)', () => {
    expect(
      heard.filter((x) => (x.bed === 'bells' || x.bed === 'train') && x.p.year < ad(1857)).map((x) => x.key),
    ).toEqual([]);
    const early: string[] = [];
    for (let y: number = bc(12500); y < 1857; y += y < 1850 ? 5 : 0.25) {
      const a = soundAt(W.soundscape, year(y)).levels;
      if (a.bells > 0 || a.train > 0) early.push(String(y));
    }
    expect(early).toEqual([]);
    const first = heard.find((x) => x.bed === 'bells');
    expect(first?.p.year).toBe(ad(1857));
    expect(first?.p.provenance.sources).toContain('effects:S7');
  });

  it('holds the market from the fair granted on 20 May 1290, through the market recorded in 1326 (sound:S20)', () => {
    const first = heard.find((x) => x.bed === 'market');
    expect(first?.p.year).toBe(onDay(1290, 5, 20));
    expect(first?.p.provenance.sources).toContain('sound:S20');
    expect(soundAt(W.soundscape, year(onDay(1290, 5, 20) - 0.01)).levels.market).toBe(0);
    const unheard: string[] = [];
    for (let y = 1290.5; y < 1950; y += 0.5)
      if (soundAt(W.soundscape, year(y)).levels.market <= 0) unheard.push(String(y));
    expect(unheard).toEqual([]);
    const in1330 = soundAt(W.soundscape, ad(1330)).beds.find((b) => b.bed === 'market');
    expect(in1330?.since.kind).toBe('documented');
    expect(in1330?.since.sources).toContain('sound:S20');
  });

  it('plays steam only until steam passenger trains ended on 13 June 1964, and is never silent while a train runs', () => {
    const trains = W.features.filter((f) => f.kind.type === 'train');
    const wrong: string[] = [];
    for (let y = 1857; y <= 2026; y += 0.25) {
      const at = soundAt(W.soundscape, year(y));
      const steam = at.levels.train;
      const anyTrain = AMBIENT_BEDS.filter((b) => b === 'train' || b === 'railcar').some(
        (b) => at.levels[b] > 0,
      );
      if (y >= END_OF_STEAM && steam > 0) wrong.push(`steam heard in ${y.toFixed(2)}`);
      if (trains.some((t) => contains(t.when, year(y))) && !anyTrain)
        wrong.push(`a train runs in ${y.toFixed(2)}, unheard`);
    }
    expect(wrong).toEqual([]);
  });

  it('never fades a bed in from silence: it is heard only from the point that names it', () => {
    const early: string[] = [];
    for (const { bed, i, p } of heard) {
      const before = W.soundscape[bed][i - 1];
      if (before?.kind === 'heard') continue;
      const from = before?.year ?? yearAt(W.timeline, 0);
      for (let j = 0; j < 20; j++) {
        const y = year(from + ((p.year - from) * j) / 20);
        if (y < p.year && soundAt(W.soundscape, y).levels[bed] > 0) early.push(`${bed} ${y.toFixed(1)}`);
      }
      if (soundAt(W.soundscape, year(p.year - 0.01)).levels[bed] > 0)
        early.push(`${bed} just before ${String(p.year)}`);
    }
    expect(early).toEqual([]);
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

describe('the Harries photographs', () => {
  const centre = { e: 262900, n: 222500 };
  const tenMiles = 16093;

  it('has unique ids and one file on disk per photograph, and no stray files', () => {
    expect(unique(HARRIES_PHOTOGRAPHS.map((p) => p.id))).toEqual([]);
    const onDisk = readdirSync(join(root, 'public/photos/harries')).map((f) => `photos/harries/${f}`);
    expect(onDisk.sort()).toEqual(HARRIES_PHOTOGRAPHS.map((p) => p.file).sort());
  });

  it('credits every photograph to Harries with a catalogue id and a URL ending in that id', () => {
    for (const p of HARRIES_PHOTOGRAPHS) {
      expect(p.creator, p.id).toContain('D C Harries');
      expect(p.credit, p.id).toContain('D C Harries');
      expect(p.catalogueUrl, p.id).toBe(
        `https://www.peoplescollection.wales/items/${p.catalogueId.replace('PCW ', '')}`,
      );
      expect(p.id, p.id).toBe(`harries-${p.catalogueId.replace('PCW ', '')}`);
      expect(p.from, p.id).toBeLessThanOrEqual(p.to);
    }
  });

  it('places every usable photograph inside the ten miles, and never places a miscaptioned one', () => {
    for (const p of HARRIES_PHOTOGRAPHS) {
      if (p.status === 'miscaptioned') {
        expect(p.placement.kind, p.id).toBe('unplaced');
      }
      if (p.placement.kind === 'placed') {
        const { at, accuracyM } = p.placement;
        expect(Math.hypot(at.e - centre.e, at.n - centre.n), p.id).toBeLessThan(tenMiles);
        expect(accuracyM, p.id).toBeGreaterThan(0);
      }
    }
  });

  it('cites sources that exist', () => {
    const cited = PHOTOGRAPH_PROVENANCE.sources;
    expect(cited.length).toBeGreaterThan(0);
    const known = new Set(W.sources.map((s) => s.id));
    for (const s of cited) expect(known.has(s), s).toBe(true);
  });
});

describe('the railway', () => {
  const railways = 'public/data/railways.json';
  const rails = parseLines(JSON.parse(readFileSync(join(root, railways), 'utf8')), railways);
  const sections = W.features.flatMap((f) =>
    f.kind.type === 'railway'
      ? [{ feature: f, boxes: f.kind.section.within, lines: sectionLines(rails, f.kind.section) }]
      : [],
  );
  const gap = (a: GridRef, b: GridRef) => Math.hypot(a.e - b.e, a.n - b.n);
  const length = (ls: readonly { points: readonly GridRef[] }[]) =>
    ls.reduce((sum, l) => sum + l.points.slice(1).reduce((s, p, i) => s + gap(p, l.points[i] ?? p), 0), 0);
  // Where today's track runs on past the edge of the drawn data (towards Pontarddulais, towards
  // Llandovery, and down the Gwendraeth valley towards Pontyberem).
  const MAP_EDGE: readonly GridRef[] = [
    { e: 260395, n: 206650 },
    { e: 273922, n: 232559 },
    { e: 251225, n: 211493 },
  ];
  const leavesMap = (p: GridRef) => MAP_EDGE.some((e) => gap(p, e) < 50);
  // Coflein's grid reference for Pantyffynnon station (victorian:S72), where a short spur ends.
  const PANTYFFYNNON_STATION = { e: 262290, n: 210780 };

  // The stretch each exactly dated section's sources date: Duffryn (Ammanford) to Llandeilo,
  // January 1857 (victorian:S29, S70); Llandeilo on to Llandovery, 1 April 1858 (victorian:S29, S31);
  // the lines south of Duffryn and up the Amman valley to Garnant, 10 April 1840 (victorian:S29); and
  // east of Garnant, the line of 4 November 1907 to where it joined the old course (victorian:S29, S74).
  const DATED: Readonly<Record<string, readonly GridRef[]>> = {
    railway: [DUFFRYN_STATION, LLANDEILO_STATION],
    'railway-vale-of-towy': [LLANDEILO_STATION],
    'railway-llanelly-1840': [DUFFRYN_STATION, GARNANT_STATION, PANTYFFYNNON_STATION],
    'railway-gwaun-cae-gurwen': [GARNANT_STATION, GWAUN_CAE_GURWEN_JOIN],
  };

  it('lists as map edges only tips near the edge of the ten-mile circle', () => {
    expect(MAP_EDGE.filter((p) => gap(p, WORLD.centre) < WORLD.radiusMetres - 1500)).toEqual([]);
  });

  it('draws each exactly dated section as one unbroken stretch between the places its sources date', () => {
    const wrong: string[] = [];
    for (const { feature, lines } of sections.filter((s) => s.feature.datesExact)) {
      const ends = DATED[feature.id];
      if (!ends) {
        wrong.push(`${feature.id}: no dated stretch recorded`);
        continue;
      }
      const tips = lines
        .flatMap((l) => [l.points[0], l.points[l.points.length - 1]])
        .filter((p) => p !== undefined);
      const free = tips.filter((p) => !tips.some((q) => q !== p && gap(p, q) < 50));
      for (const p of free)
        if (!ends.some((e) => gap(p, e) < 300) && !leavesMap(p))
          wrong.push(`${feature.id}: track ends at E${Math.round(p.e)} N${Math.round(p.n)}`);
      for (const e of ends)
        if (!free.some((p) => gap(p, e) < 300)) wrong.push(`${feature.id}: no track reaches E${e.e} N${e.n}`);
    }
    expect(wrong).toEqual([]);
  });

  // Every stretch of today's track belongs to exactly one dated section, so nothing is left undrawn
  // (Dewi, 2026-10-03: undated lines are drawn with estimated dates, labelled as educated guesses).
  it("draws every stretch of today's track in exactly one section", () => {
    const inBox = (p: GridRef, b: GridBox) =>
      p.e >= (b.minE ?? -Infinity) &&
      p.e <= (b.maxE ?? Infinity) &&
      p.n >= (b.minN ?? -Infinity) &&
      p.n <= (b.maxN ?? Infinity);
    const wrong: string[] = [];
    for (const l of rails)
      for (let i = 1; i < l.points.length; i++) {
        const a = l.points[i - 1];
        const b = l.points[i];
        if (!a || !b) continue;
        const mid = { e: (a.e + b.e) / 2, n: (a.n + b.n) / 2 };
        const owners = sections.filter((s) => s.boxes.some((x) => inBox(mid, x)));
        if (owners.length !== 1)
          wrong.push(
            `E${Math.round(mid.e)} N${Math.round(mid.n)}: ${owners.map((o) => o.feature.id).join(', ') || 'undrawn'}`,
          );
      }
    expect(wrong).toEqual([]);
    const drawn = sections.reduce((sum, s) => sum + length(s.lines), 0);
    expect(drawn).toBeCloseTo(length(rails), 0);
  });

  // An estimate is reconstructed when a source places the line, imagined when none does; either way
  // its ⓘ says it is a guess and rests on sources, and an earliest date never comes after its "c." one.
  it('labels every railway section without exact dates as an educated guess, in both languages, with sources', () => {
    const estimated = sections.filter((s) => !s.feature.datesExact);
    const wrong = estimated
      .filter(({ feature: { provenance: p, notBefore, when } }) => {
        if (notBefore === undefined || notBefore > when.from) return true;
        const text = p.kind === 'reconstructed' ? p.basis : p.kind === 'imagined' ? p.groundedIn : undefined;
        return (
          !text ||
          !/educated guess/i.test(text.en) ||
          !/dyfaliad gwybodus/i.test(text.cy) ||
          p.sources.length < 2
        );
      })
      .map((s) => s.feature.id);
    expect(estimated.length).toBeGreaterThan(0);
    expect(wrong).toEqual([]);
  });

  it('never gives a feature an earliest date after its "c." start (ADR 0037)', () => {
    const late = W.features.filter((f) => f.notBefore !== undefined && f.notBefore > f.when.from);
    expect(late.map((f) => f.id)).toEqual([]);
  });

  it('draws the narrow-gauge stub near Cross Hands as imagined, since no source names it', () => {
    const stub = sections.find((s) => s.boxes === CROSS_HANDS_NARROW_GAUGE.within);
    expect(stub?.feature.provenance.kind).toBe('imagined');
    const len = length(stub?.lines ?? []);
    expect(len).toBeGreaterThan(30);
    expect(len).toBeLessThan(60);
  });

  it('draws the 1907 line east of Garnant for the 1 mile 22 chains its source gives it', () => {
    const line1907 = sections.find((s) => s.feature.id === 'railway-gwaun-cae-gurwen');
    // victorian:S74: 1 mile 22 chains is 2,052m.
    expect(Math.abs(length(line1907?.lines ?? []) - 2052)).toBeLessThan(20);
  });
});

describe('trains', () => {
  const trains = W.features.filter((f) => f.kind.type === 'train');
  // The trains run on the line through Llandeilo, which the railway reached in 1857.
  const railway = W.features.find((f) => f.id === 'railway');

  it('run only while the railway exists', () => {
    expect(railway).toBeDefined();
    const outside = trains.filter(
      (t) => !railway || t.when.from < railway.when.from || t.when.to > railway.when.to,
    );
    expect(outside.map((t) => t.id)).toEqual([]);
  });

  it('hand over at shared boundaries, so one train runs at a time with no gap however close you look', () => {
    const sorted = [...trains].sort((a, b) => a.when.from - b.when.from);
    const wrong = sorted.flatMap((t, i) => {
      const next = sorted[i + 1];
      return next && next.when.from !== t.when.to
        ? [`${t.id} ends ${String(t.when.to)}, ${next.id} starts ${String(next.when.from)}`]
        : [];
    });
    expect(wrong).toEqual([]);
    expect(sorted[0]?.when.from).toBe(railway?.when.from);
    expect(sorted[sorted.length - 1]?.when.to).toBe(railway?.when.to);
  });

  it('cover the whole life of the railway, at every boundary too', () => {
    const missing: string[] = [];
    const boundaries = trains.flatMap((t) => [t.when.from, t.when.to]);
    if (railway)
      for (let y: number = railway.when.from; y <= railway.when.to; y += 0.25)
        if (!trains.some((t) => contains(t.when, year(y)))) missing.push(y.toFixed(2));
    for (const y of boundaries)
      for (const d of [-1e-4, 0, 1e-4])
        if (
          railway &&
          contains(railway.when, year(y + d)) &&
          !trains.some((t) => contains(t.when, year(y + d)))
        )
          missing.push((y + d).toFixed(4));
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

describe('battles and black swans: 1213, 1257, 1849 and 1918', () => {
  const ev = (id: string) => W.events.find((e) => e.id === id);
  const sourcesOf = (id: string): readonly string[] => ev(id)?.provenance.sources ?? [];
  const noteOf = (id: string) => {
    const p = ev(id)?.provenance;
    return p?.kind === 'documented' ? p.note : undefined;
  };
  const text = (id: string): string => {
    const e = ev(id);
    return e ? `${e.summary.en} ${noteOf(id)?.en ?? ''}` : '';
  };

  it('dates each one to its year, documented, from the checked notes, in both languages', () => {
    const want = {
      'llandeilo-burned-1213': 1213,
      'cymerau-1257': 1257,
      'cholera-1849': 1849,
      'influenza-1918': 1918,
    };
    for (const [id, y] of Object.entries(want)) {
      const e = ev(id);
      expect(e?.when, id).toEqual({ from: ad(y), to: ad(y) });
      expect(e?.provenance.kind).toBe('documented');
      expect(e?.title.cy).not.toBe(e?.title.en);
      expect(e?.summary.cy).not.toBe(e?.summary.en);
    }
  });

  it('1213: led by young Rhys, Llandeilo burned by Rhys Gryg, Dinefwr held to terms, in winter', () => {
    const said = text('llandeilo-burned-1213');
    expect(said).toMatch(/young Rhys/);
    expect(said).toMatch(/Rhys Gryg burned Llandeilo/);
    expect(said).toMatch(/unless help came by the next evening/);
    expect(sourcesOf('llandeilo-burned-1213')).toEqual(
      expect.arrayContaining(['invasions:S1', 'invasions:S5']),
    );
    expect(ev('llandeilo-burned-1213')?.recordedSky?.season).toBe('winter');
  });

  it('1257: Bauzan killed, the camp at Llandeilo in one chronicle only, the sites contested and the dead not “English”', () => {
    const said = text('cymerau-1257');
    expect(said).toMatch(/Bauzan was killed/);
    expect(said).toMatch(/one chronicle/);
    expect(said).toMatch(/mostly Welsh foot soldiers/);
    expect(said).not.toMatch(/English (dead|killed)|3,000 English/);
    expect(said).toMatch(/“Saxons”/);
    expect(said).toMatch(/none is marked/);
    expect(sourcesOf('cymerau-1257')).toEqual(
      expect.arrayContaining(['invasions:S3', 'invasions:S5', 'invasions:S7', 'invasions:S17']),
    );
    expect(ev('cymerau-1257')?.recordedSky).toMatchObject({
      season: 'summer',
      hour: { kind: 'recorded', value: 12 },
    });
  });

  it('1849: a card, not a step or a scene, because one partly illegible report is all there is', () => {
    expect(ev('cholera-1849')?.magnetic).toBe(false);
    expect(sourcesOf('cholera-1849')).toContain('ripples:S24');
    expect(noteOf('cholera-1849')?.en).toMatch(/one newspaper report/i);
    expect(ev('cholera-1849')?.recordedSky).toBeUndefined();
  });

  it('1918: cross-checked across the local papers, with its season and its soldier from France', () => {
    expect(text('influenza-1918')).toMatch(/France/);
    expect(sourcesOf('influenza-1918')).toEqual(
      expect.arrayContaining(['ripples:S36', 'ripples:S37', 'ripples:S38', 'ripples:S39']),
    );
    expect(ev('influenza-1918')?.recordedSky?.season).toBe('autumn');
  });

  it('no longer says no cholera case was found in Llandeilo, now that an 1849 report is read', () => {
    const at1849 = W.almanac.filter((a) => a.topic === 'health' && contains(a.when, ad(1849)));
    expect(at1849.filter((a) => a.text.en.includes('no case in Llandeilo')).map((a) => a.id)).toEqual([]);
    expect(at1849.some((a) => a.provenance.sources.some((s) => String(s) === 'ripples:S25'))).toBe(true);
  });

  it('arrives at a recorded burning by day, so its smoke can be seen, with the hour said to be chosen', () => {
    const burnings = W.features.filter((f) => f.kind.type === 'burning');
    const arrivals = W.events.filter(
      (e) => e.magnetic && burnings.some((f) => contains(f.when, e.when.from)),
    );
    expect(arrivals.map((e) => e.id)).toEqual(['llandeilo-burned-1213']);
    for (const e of arrivals) {
      const sky = e.recordedSky;
      expect(sky?.hour?.kind).toBe('chosen');
      expect(
        sunElevation({ season: sky?.season ?? 'summer', hour: sky?.hour?.value ?? DEFAULT_CLOCK.hour }),
      ).toBeGreaterThan(5);
    }
  });

  it('1257: keeps both readings of the wood’s name visible, Coed Llathen and Llanarthne', () => {
    for (const lang of ['en', 'cy'] as const) expect(noteOf('cymerau-1257')?.[lang]).toMatch(/Ll?anarthne/);
  });

  it('dates the 1849 cases from 1849 and keeps the later absence a reconstructed gap, with no hindsight before', () => {
    const health = W.almanac.filter((a) => a.topic === 'health');
    const at1840 = health.filter((a) => contains(a.when, ad(1840)));
    expect(at1840.filter((a) => /1849|1854|1866/.test(a.text.en)).map((a) => a.id)).toEqual([]);
    const the1849 = health.filter((a) => a.provenance.sources.some((s) => String(s) === 'ripples:S24'));
    expect(the1849.length).toBeGreaterThan(0);
    for (const a of the1849) {
      expect(a.provenance.kind).toBe('documented');
      expect(a.when.from).toBeGreaterThanOrEqual(ad(1849));
    }
    const absences = health.filter((a) => /no case|none has been found/.test(a.text.en));
    expect(absences.filter((a) => a.provenance.kind !== 'reconstructed').map((a) => a.id)).toEqual([]);
  });

  it('draws a burning only where a documented source records one, and only for its exact dates', () => {
    const burnings = W.features.filter((f) => f.kind.type === 'burning');
    expect(burnings.map((f) => f.id)).toEqual(['llandeilo-burning-1213']);
    for (const f of burnings) {
      expect(f.provenance.kind).toBe('documented');
      expect(f.datesExact).toBe(true);
    }
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
