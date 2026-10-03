import type { Feature, GridRef, RollingStock } from './model.ts';
import type { FeaturePresence } from './state.ts';

/**
 * Part of today's drawn track, so a stretch can appear on the date it opened: the parts of the
 * lines north (or south) of a grid northing, cut where they cross it.
 */
export interface RailSection {
  readonly side: 'north' | 'south';
  readonly ofN: number;
}

interface Line {
  readonly kind: string;
  readonly points: readonly GridRef[];
}

const inside = (s: RailSection, p: GridRef): boolean => (s.side === 'north' ? p.n >= s.ofN : p.n <= s.ofN);

function crossing(a: GridRef, b: GridRef, n: number): GridRef {
  const f = (n - a.n) / (b.n - a.n);
  return { e: a.e + (b.e - a.e) * f, n };
}

export function sectionLines(
  lines: readonly Line[],
  section: RailSection,
): { kind: string; points: GridRef[] }[] {
  const out: { kind: string; points: GridRef[] }[] = [];
  for (const line of lines) {
    let run: GridRef[] = [];
    const flush = (): void => {
      if (run.length > 1) out.push({ kind: line.kind, points: run });
      run = [];
    };
    line.points.forEach((p, i) => {
      const prev = line.points[i - 1];
      const now = inside(section, p);
      if (prev && now !== inside(section, prev) && prev.n !== p.n) {
        const x = crossing(prev, p, section.ofN);
        if (now) run.push(x);
        else {
          run.push(x);
          flush();
        }
      }
      if (now) run.push(p);
    });
    flush();
  }
  return out;
}

/** The stretch of one line covered by any of the sections, as fractions [from, to] of its length. */
export function sectionSpan(
  points: readonly GridRef[],
  sections: readonly RailSection[],
): readonly [number, number] | undefined {
  if (sections.length === 0) return undefined;
  const lengths = [0];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    lengths.push((lengths[i - 1] ?? 0) + (a && b ? Math.hypot(b.e - a.e, b.n - a.n) : 0));
  }
  const total = lengths[lengths.length - 1] ?? 0;
  if (total <= 0) return undefined;
  let from = Infinity;
  let to = -Infinity;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) continue;
    const at = lengths[i - 1] ?? 0;
    const len = (lengths[i] ?? 0) - at;
    for (const s of sections) {
      const ia = inside(s, a);
      const ib = inside(s, b);
      if (!ia && !ib) continue;
      const cut = ia !== ib && a.n !== b.n ? at + len * ((s.ofN - a.n) / (b.n - a.n)) : undefined;
      from = Math.min(from, ia ? at : (cut ?? at));
      to = Math.max(to, ib ? at + len : (cut ?? at + len));
    }
  }
  return from <= to ? [from / total, to / total] : undefined;
}

export function longestLine<L extends Line>(lines: readonly L[]): L | undefined {
  let best: L | undefined;
  let bestLen = 0;
  for (const l of lines) {
    let len = 0;
    for (let i = 1; i < l.points.length; i++) {
      const a = l.points[i - 1];
      const b = l.points[i];
      if (a && b) len += Math.hypot(b.e - a.e, b.n - a.n);
    }
    if (len > bestLen) {
      bestLen = len;
      best = l;
    }
  }
  return best;
}

// The one rule for what of the railway is on screen; the renderer draws exactly this, and the tests
// sample it, so a test of the railway is a test of the picture.
const SECTION_DRAWN = 0.5;
const TRAIN_DRAWN = 0.9;

export interface DrawnSection {
  readonly feature: Feature;
  readonly section: RailSection;
}

export interface DrawnTrain {
  readonly feature: Feature;
  readonly stock: RollingStock;
  /** The stretch of its line the train runs on, as fractions of the line's length. */
  readonly span: readonly [number, number];
}

export interface DrawnRailway {
  readonly sections: readonly DrawnSection[];
  readonly train: DrawnTrain | undefined;
}

/**
 * A section is drawn once its presence passes one half. A train is drawn when the railway and the
 * train are both nearly fully present and some drawn section covers part of the train's line, which
 * is where it runs.
 */
export function drawnRailway(
  present: readonly FeaturePresence[],
  trainLine: readonly GridRef[] | undefined,
): DrawnRailway {
  let rail = 0;
  const sections: DrawnSection[] = [];
  let train: { feature: Feature; stock: RollingStock; presence: number } | undefined;
  for (const p of present) {
    const k = p.feature.kind;
    if (k.type === 'railway') {
      rail = Math.max(rail, p.presence);
      if (p.presence > SECTION_DRAWN) sections.push({ feature: p.feature, section: k.section });
    }
    if (k.type === 'train' && p.presence > (train?.presence ?? TRAIN_DRAWN))
      train = { feature: p.feature, stock: k.stock, presence: p.presence };
  }
  const span = trainLine
    ? sectionSpan(
        trainLine,
        sections.map((s) => s.section),
      )
    : undefined;
  return {
    sections,
    train:
      rail > TRAIN_DRAWN && train && span ? { feature: train.feature, stock: train.stock, span } : undefined,
  };
}
