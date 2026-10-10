/**
 * Which part of a model a ray hits (ADR 0055): a merged mesh keeps, for each part, the run of triangles it was
 * merged from; a box round each run lets most of the mesh be skipped, so a pick on every pointer move stays cheap.
 * Positions are a flat triangle list (x, y, z per corner, three corners per triangle), as the loader builds them.
 */

export type P3 = readonly [number, number, number];

export interface PartRun {
  readonly id: string;
  /** First triangle of the run, and one past its last. */
  readonly from: number;
  readonly to: number;
  readonly min: P3;
  readonly max: P3;
}

export interface PartHit {
  readonly id: string;
  readonly distance: number;
}

/** Runs of triangles per part, each with the box round it, from where each part's triangles begin. */
export function partRuns(
  positions: ArrayLike<number>,
  starts: readonly { readonly id: string; readonly from: number }[],
): PartRun[] {
  const total = Math.floor(positions.length / 9);
  return starts.flatMap((s, i) => {
    const to = starts[i + 1]?.from ?? total;
    if (to <= s.from) return [];
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let k = s.from * 9; k < to * 9; k += 3)
      for (let a = 0; a < 3; a++) {
        const v = positions[k + a] ?? 0;
        min[a] = Math.min(min[a] ?? v, v);
        max[a] = Math.max(max[a] ?? v, v);
      }
    return [
      {
        id: s.id,
        from: s.from,
        to,
        min: [min[0] ?? 0, min[1] ?? 0, min[2] ?? 0],
        max: [max[0] ?? 0, max[1] ?? 0, max[2] ?? 0],
      },
    ];
  });
}

/** Where a ray enters a box, or undefined if it misses it or the box is wholly behind the ray. */
export function enterBox(origin: P3, dir: P3, min: P3, max: P3): number | undefined {
  let near = -Infinity;
  let far = Infinity;
  for (let a = 0; a < 3; a++) {
    const o = origin[a] ?? 0;
    const d = dir[a] ?? 0;
    const lo = min[a] ?? 0;
    const hi = max[a] ?? 0;
    if (Math.abs(d) < 1e-12) {
      if (o < lo || o > hi) return undefined;
      continue;
    }
    const t1 = (lo - o) / d;
    const t2 = (hi - o) / d;
    near = Math.max(near, Math.min(t1, t2));
    far = Math.min(far, Math.max(t1, t2));
  }
  if (near > far || far < 0) return undefined;
  return Math.max(0, near);
}

/** Distance along the ray to a triangle, either side (Möller and Trumbore), or undefined if it misses. */
export function hitTriangle(origin: P3, dir: P3, a: P3, b: P3, c: P3): number | undefined {
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]] as const;
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]] as const;
  const p = [
    dir[1] * e2[2] - dir[2] * e2[1],
    dir[2] * e2[0] - dir[0] * e2[2],
    dir[0] * e2[1] - dir[1] * e2[0],
  ];
  const det = e1[0] * (p[0] ?? 0) + e1[1] * (p[1] ?? 0) + e1[2] * (p[2] ?? 0);
  if (Math.abs(det) < 1e-12) return undefined;
  const inv = 1 / det;
  const s = [origin[0] - a[0], origin[1] - a[1], origin[2] - a[2]] as const;
  const u = (s[0] * (p[0] ?? 0) + s[1] * (p[1] ?? 0) + s[2] * (p[2] ?? 0)) * inv;
  if (u < 0 || u > 1) return undefined;
  const q = [s[1] * e1[2] - s[2] * e1[1], s[2] * e1[0] - s[0] * e1[2], s[0] * e1[1] - s[1] * e1[0]];
  const v = (dir[0] * (q[0] ?? 0) + dir[1] * (q[1] ?? 0) + dir[2] * (q[2] ?? 0)) * inv;
  if (v < 0 || u + v > 1) return undefined;
  const t = (e2[0] * (q[0] ?? 0) + e2[1] * (q[1] ?? 0) + e2[2] * (q[2] ?? 0)) * inv;
  return t > 0 ? t : undefined;
}

/** The nearest part a ray hits, testing only the triangles of runs whose box it enters, nearest box first. */
export function pickPart(
  origin: P3,
  dir: P3,
  positions: ArrayLike<number>,
  runs: readonly PartRun[],
): PartHit | undefined {
  const candidates = runs
    .map((r) => ({ r, t: enterBox(origin, dir, r.min, r.max) }))
    .filter((c): c is { r: PartRun; t: number } => c.t !== undefined)
    .sort((x, y) => x.t - y.t);
  let best: PartHit | undefined;
  const corner = (k: number): P3 => [positions[k] ?? 0, positions[k + 1] ?? 0, positions[k + 2] ?? 0];
  for (const { r, t } of candidates) {
    if (best && t > best.distance) break;
    for (let i = r.from; i < r.to; i++) {
      const k = i * 9;
      const d = hitTriangle(origin, dir, corner(k), corner(k + 3), corner(k + 6));
      if (d !== undefined && (!best || d < best.distance)) best = { id: r.id, distance: d };
    }
  }
  return best;
}

/** The corners of a run's triangles, for drawing a highlight over just that part. */
export function runTriangles(positions: ArrayLike<number>, run: PartRun): number[] {
  return Array.from({ length: (run.to - run.from) * 9 }, (_, i) => positions[run.from * 9 + i] ?? 0);
}
