import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ASSETS } from '../src/content/assets.ts';
import { voiceLines, voiceSignature } from '../src/content/voices.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { WORLD } from '../src/domain/geo.ts';
import { latestStarting } from '../src/domain/state.ts';
import { shotFor } from '../src/domain/steps.ts';
import { contains } from '../src/domain/time.ts';
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
    const all = [...W.events, ...W.features, ...W.places, ...W.conversations, ...W.almanac, ...W.language];
    for (const item of all)
      for (const s of item.provenance.sources) if (!sources.has(s)) missing.push(`source ${s}`);
    expect(missing).toEqual([]);
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
