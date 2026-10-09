export interface RimBox {
  readonly xMin: number;
  readonly xMax: number;
  readonly zMin: number;
  readonly zMax: number;
}

export interface GapReport {
  readonly baseVertices: number;
  readonly detailVertices: number;
  readonly maxGap: number;
  readonly unmatched: number;
}

export interface RimTopology {
  /** Drawn coarse-terrain corners strictly inside the box: nonzero means a triangle crosses the rim. */
  readonly inside: number;
  /** Drawn coarse-terrain triangle edges lying along the rim, each counted once. */
  readonly rimEdges: number;
}

export interface SeamReport extends GapReport {
  readonly baseInside: number;
  readonly rimEdges: number;
}

export const RIM_TOLERANCE = 1e-3;

export function onRim(box: RimBox, x: number, z: number, tolerance = RIM_TOLERANCE): boolean {
  return (
    Math.abs(z - box.zMin) <= tolerance ||
    Math.abs(z - box.zMax) <= tolerance ||
    Math.abs(x - box.xMin) <= tolerance ||
    Math.abs(x - box.xMax) <= tolerance
  );
}

type Side = 'south' | 'north' | 'west' | 'east';

interface Line {
  readonly along: number[];
  readonly height: Map<number, number>;
}

// Which sides of the box a vertex lies on, and its position along each.
function sidesOf(box: RimBox, x: number, z: number, tolerance: number): { side: Side; along: number }[] {
  const out: { side: Side; along: number }[] = [];
  if (Math.abs(z - box.zMin) <= tolerance) out.push({ side: 'south', along: x });
  if (Math.abs(z - box.zMax) <= tolerance) out.push({ side: 'north', along: x });
  if (Math.abs(x - box.xMin) <= tolerance) out.push({ side: 'west', along: z });
  if (Math.abs(x - box.xMax) <= tolerance) out.push({ side: 'east', along: z });
  return out;
}

function strictlyInside(box: RimBox, x: number, z: number, tolerance: number): boolean {
  return (
    x > box.xMin + tolerance &&
    x < box.xMax - tolerance &&
    z > box.zMin + tolerance &&
    z < box.zMax - tolerance
  );
}

// What the coarse terrain's drawn triangles do at the box: how many of their corners lie strictly inside
// it (none, if the box is cut out cleanly), and how many of their edges run along its rim. `corners` are
// x, y, z triples, three to a triangle.
export function rimTopology(box: RimBox, corners: ArrayLike<number>, tolerance = RIM_TOLERANCE): RimTopology {
  let inside = 0;
  const edges = new Set<string>();
  const key = (x: number, z: number): string =>
    `${String(Math.round(x / tolerance))},${String(Math.round(z / tolerance))}`;
  for (let t = 0; t + 8 < corners.length; t += 9) {
    for (let c = 0; c < 3; c++) {
      const ax = corners[t + c * 3] ?? 0;
      const az = corners[t + c * 3 + 2] ?? 0;
      if (strictlyInside(box, ax, az, tolerance)) inside++;
      const next = (c + 1) % 3;
      const bx = corners[t + next * 3] ?? 0;
      const bz = corners[t + next * 3 + 2] ?? 0;
      const shared = sidesOf(box, ax, az, tolerance).some(({ side: a }) =>
        sidesOf(box, bx, bz, tolerance).some(({ side: b }) => a === b),
      );
      if (!shared) continue;
      const [first, second] = [key(ax, az), key(bx, bz)].sort();
      edges.add(`${first ?? ''}|${second ?? ''}`);
    }
  }
  return { inside, rimEdges: edges.size };
}

// Compares the drawn rim of the detail meshes with the coarse terrain's, from their vertex positions
// (x, y, z triples; z is northing). Along each side the coarse terrain's rim is the straight lines
// between its vertices on it; every detail vertex on the rim should lie on those lines. The report
// gives how many vertices were compared and the largest height gap between them.
export function rimGap(
  box: RimBox,
  base: ArrayLike<number>,
  detail: ArrayLike<number>,
  tolerance = RIM_TOLERANCE,
): GapReport {
  const lines: Record<Side, Line> = {
    south: { along: [], height: new Map() },
    north: { along: [], height: new Map() },
    west: { along: [], height: new Map() },
    east: { along: [], height: new Map() },
  };
  const unique = new Set<string>();
  for (let i = 0; i + 2 < base.length; i += 3) {
    const x = base[i] ?? 0;
    const z = base[i + 2] ?? 0;
    const sides = sidesOf(box, x, z, tolerance);
    if (sides.length === 0) continue;
    unique.add(`${String(Math.round(x / tolerance))},${String(Math.round(z / tolerance))}`);
    for (const { side, along } of sides) {
      const line = lines[side];
      const key = Math.round(along / tolerance);
      if (line.height.has(key)) continue;
      line.height.set(key, base[i + 1] ?? 0);
      line.along.push(along);
    }
  }
  for (const line of Object.values(lines)) line.along.sort((a, b) => a - b);

  let detailVertices = 0;
  let unmatched = 0;
  let maxGap = 0;
  for (let i = 0; i + 2 < detail.length; i += 3) {
    const sides = sidesOf(box, detail[i] ?? 0, detail[i + 2] ?? 0, tolerance);
    if (sides.length === 0) continue;
    detailVertices++;
    let missing = false;
    for (const { side, along } of sides) {
      const line = lines[side];
      const at = line.along;
      const hi = at.findIndex((a) => a >= along - tolerance);
      const first = at[0];
      const last = at[at.length - 1];
      if (hi === -1 || first === undefined || last === undefined || along < first - tolerance) {
        missing = true;
        continue;
      }
      const upper = at[hi] ?? 0;
      const upperY = line.height.get(Math.round(upper / tolerance)) ?? 0;
      let expected = upperY;
      if (hi > 0 && upper - along > tolerance) {
        const lower = at[hi - 1] ?? 0;
        const lowerY = line.height.get(Math.round(lower / tolerance)) ?? 0;
        expected = lowerY + ((upperY - lowerY) * (along - lower)) / (upper - lower);
      }
      maxGap = Math.max(maxGap, Math.abs((detail[i + 1] ?? 0) - expected));
    }
    if (missing) unmatched++;
  }
  return { baseVertices: unique.size, detailVertices, maxGap, unmatched };
}
