// A marker's x is its date and never moves; markers whose dates fall a few pixels apart are fanned
// into lanes above and below the line instead, so every one can still be reached by the mouse
// (ADR 0039). Lane 0 is the line, then one above, one below, two above, two below.
export const LANES: readonly number[] = [0, -1, 1, -2, 2];

export type MarkerShape = 'dot' | 'diamond';

export interface LaneMarker {
  readonly x: number;
  readonly shape: MarkerShape;
  // Key steps are placed first, so they keep the line when they can.
  readonly key: boolean;
}

// How far each shape reaches from its centre, in px: a dot's radius, and a diamond's half-diagonal
// (a square turned 45°, so its reach is measured along the axes).
export interface MarkerReach {
  readonly dot: number;
  readonly diamond: number;
}

export interface LanePlacement {
  readonly lane: number;
  // How far, in px, this marker's centre is from the nearest other marker's edge, or that marker's
  // centre from this one's edge, whichever is less. Below the margin means the crowd was too big.
  readonly clearance: number;
}

interface Placed {
  readonly x: number;
  readonly y: number;
  readonly shape: MarkerShape;
}

function reachInto(m: Placed, px: number, py: number, reach: MarkerReach): number {
  return m.shape === 'dot'
    ? Math.hypot(px - m.x, py - m.y) - reach.dot
    : Math.abs(px - m.x) + Math.abs(py - m.y) - reach.diamond;
}

function clearance(a: Placed, b: Placed, reach: MarkerReach): number {
  return Math.min(reachInto(b, a.x, a.y, reach), reachInto(a, b.x, b.y, reach));
}

export function markerLanes(
  markers: readonly LaneMarker[],
  reach: MarkerReach,
  step: number,
  margin: number,
): LanePlacement[] {
  const order = markers
    .map((m, i) => ({ m, i }))
    .sort((a, b) => Number(b.m.key) - Number(a.m.key) || a.m.x - b.m.x);
  const placed: Placed[] = [];
  const out: LanePlacement[] = markers.map(() => ({ lane: 0, clearance: Infinity }));
  for (const { m, i } of order) {
    const tries = LANES.map((lane) => {
      const here: Placed = { x: m.x, y: lane * step, shape: m.shape };
      return {
        lane,
        clearance: placed.reduce((least, p) => Math.min(least, clearance(here, p, reach)), Infinity),
      };
    });
    const chosen =
      tries.find((t) => t.clearance >= margin) ??
      tries.reduce((a, b) => (b.clearance > a.clearance ? b : a), { lane: 0, clearance: -Infinity });
    out[i] = chosen;
    placed.push({ x: m.x, y: chosen.lane * step, shape: m.shape });
  }
  return out;
}
