import type { GridRef } from './model.ts';

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
