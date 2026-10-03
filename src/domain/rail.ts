import type { Feature, GridRef, RollingStock } from './model.ts';
import type { FeaturePresence } from './state.ts';

/** A box of grid space; a bound left out is open. */
export interface GridBox {
  readonly minE?: number;
  readonly maxE?: number;
  readonly minN?: number;
  readonly maxN?: number;
}

/**
 * Part of today's drawn track, so a stretch can appear on the date it opened: the parts of the
 * lines inside any of its boxes, cut where they cross a box's edge (ADR 0034).
 */
export interface RailSection {
  readonly within: readonly [GridBox, ...GridBox[]];
}

interface Line {
  readonly kind: string;
  readonly points: readonly GridRef[];
}

type Interval = readonly [number, number];

// Liang–Barsky: the part of the segment a→b inside the box, as fractions of its length.
function clip(a: GridRef, b: GridRef, box: GridBox): Interval | undefined {
  const de = b.e - a.e;
  const dn = b.n - a.n;
  const edges: readonly (readonly [number, number])[] = [
    [-de, a.e - (box.minE ?? -Infinity)],
    [de, (box.maxE ?? Infinity) - a.e],
    [-dn, a.n - (box.minN ?? -Infinity)],
    [dn, (box.maxN ?? Infinity) - a.n],
  ];
  let t0 = 0;
  let t1 = 1;
  for (const [p, q] of edges) {
    if (p === 0) {
      if (q < 0) return undefined;
      continue;
    }
    const r = q / p;
    if (p < 0) t0 = Math.max(t0, r);
    else t1 = Math.min(t1, r);
  }
  return t1 > t0 ? [t0, t1] : undefined;
}

/** The parts of a→b inside the section, in order, with touching parts merged. */
function inside(a: GridRef, b: GridRef, section: RailSection): Interval[] {
  const parts = section.within
    .map((box) => clip(a, b, box))
    .filter((x): x is Interval => x !== undefined)
    .sort((x, y) => x[0] - y[0]);
  const out: [number, number][] = [];
  for (const [t0, t1] of parts) {
    const last = out[out.length - 1];
    if (last && t0 <= last[1]) last[1] = Math.max(last[1], t1);
    else out.push([t0, t1]);
  }
  return out;
}

function pointAt(a: GridRef, b: GridRef, t: number): GridRef {
  if (t === 0) return a;
  if (t === 1) return b;
  return { e: a.e + (b.e - a.e) * t, n: a.n + (b.n - a.n) * t };
}

export function sectionLines(
  lines: readonly Line[],
  section: RailSection,
): { kind: string; points: GridRef[] }[] {
  const out: { kind: string; points: GridRef[] }[] = [];
  for (const line of lines) {
    let run: GridRef[] = [];
    // Whether the run reaches the end of the last segment, so the next segment can carry it on.
    let open = false;
    const flush = (): void => {
      if (run.length > 1) out.push({ kind: line.kind, points: run });
      run = [];
      open = false;
    };
    for (let i = 1; i < line.points.length; i++) {
      const a = line.points[i - 1];
      const b = line.points[i];
      if (!a || !b) continue;
      const parts = inside(a, b, section);
      if (parts.length === 0) flush();
      for (const [t0, t1] of parts) {
        if (!(open && t0 === 0)) {
          flush();
          run.push(pointAt(a, b, t0));
        }
        run.push(pointAt(a, b, t1));
        open = t1 === 1;
        if (!open) flush();
      }
    }
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
    for (const s of sections)
      for (const [t0, t1] of inside(a, b, s)) {
        from = Math.min(from, at + len * t0);
        to = Math.max(to, at + len * t1);
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
