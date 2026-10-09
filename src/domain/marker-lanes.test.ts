import { describe, expect, it } from 'vitest';
import { LANES, markerLanes, type LaneMarker, type MarkerReach } from './marker-lanes.ts';

const reach: MarkerReach = { dot: 6, diamond: 9.9 };
const STEP = 12;
const MARGIN = 2;
const dot = (x: number): LaneMarker => ({ x, shape: 'dot', key: false });
const diamond = (x: number): LaneMarker => ({ x, shape: 'diamond', key: true });

// Is point (px, py) inside marker m drawn at (x, y)? Dots are round; diamonds are squares turned 45°.
const inside = (m: LaneMarker, x: number, y: number, px: number, py: number): boolean =>
  m.shape === 'dot'
    ? Math.hypot(px - x, py - y) <= reach.dot
    : Math.abs(px - x) + Math.abs(py - y) <= reach.diamond;

const centresCovered = (markers: readonly LaneMarker[]): number[] => {
  const placed = markerLanes(markers, reach, STEP, MARGIN);
  return markers.flatMap((m, i) =>
    markers.some(
      (o, j) => j !== i && inside(o, o.x, (placed[j]?.lane ?? 0) * STEP, m.x, (placed[i]?.lane ?? 0) * STEP),
    )
      ? [i]
      : [],
  );
};

describe('marker lanes', () => {
  it('keeps every marker on the line when none is near another', () => {
    expect(markerLanes([dot(0), diamond(40), dot(80)], reach, STEP, MARGIN).map((p) => p.lane)).toEqual([
      0, 0, 0,
    ]);
  });

  it('fans markers on the same date into lanes, so no centre is covered', () => {
    const same = [diamond(100), dot(100), dot(100)];
    expect(new Set(markerLanes(same, reach, STEP, MARGIN).map((p) => p.lane)).size).toBe(3);
    expect(centresCovered(same)).toEqual([]);
  });

  it('keeps a key date on the line and moves the minor marker beside it', () => {
    expect(markerLanes([dot(100), diamond(101)], reach, STEP, MARGIN).map((p) => p.lane)).toEqual([-1, 0]);
  });

  it('clears the Victorian cluster: Rebecca, the bridge, the church, cholera and the railway', () => {
    const victorian = [diamond(0), diamond(4.1), dot(4.1), dot(4.9), diamond(12.5)];
    const placed = markerLanes(victorian, reach, STEP, MARGIN);
    expect(centresCovered(victorian)).toEqual([]);
    expect(placed.every((p) => p.clearance >= MARGIN)).toBe(true);
  });

  it('uses all five lanes and no more, and reports a crowd it cannot clear', () => {
    const crowd = Array.from({ length: LANES.length + 1 }, () => dot(50));
    const placed = markerLanes(crowd, reach, STEP, MARGIN);
    expect(placed.every((p) => LANES.includes(p.lane))).toBe(true);
    expect(new Set(placed.map((p) => p.lane)).size).toBe(5);
    expect(placed.some((p) => p.clearance < MARGIN)).toBe(true);
  });
});
