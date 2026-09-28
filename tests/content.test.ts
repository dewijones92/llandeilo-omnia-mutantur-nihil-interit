import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ASSETS } from '../src/content/assets.ts';
import { voiceLines, voiceSignature } from '../src/content/voices.ts';
import { WORLD_CONTENT as W } from '../src/content/world.ts';
import { latestStarting } from '../src/domain/state.ts';
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

describe('key-date camera shots', () => {
  const places = new Map(W.places.map((p) => [p.id, p]));

  it('frames a real place or asks for the whole valley at every magnetic key date', () => {
    const unframed = W.events.filter((e) => e.magnetic && !e.shot && !e.place).map((e) => e.id);
    expect(unframed).toEqual([]);
  });

  it('only points the camera inside the ten-mile disc', () => {
    const outside = W.events
      .map((e) => ({ id: e.id, at: e.shot?.at ?? (e.place ? places.get(e.place)?.at : undefined) }))
      .filter((x) => x.at && Math.hypot(x.at.e - 262900, x.at.n - 222500) > 16093)
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
