import { describe, expect, it } from 'vitest';
import {
  advance,
  cameraAt,
  cuesBetween,
  cutsceneId,
  frameAt,
  placements,
  pointAlong,
  routeLength,
  sec,
  START,
  type ActorsTrack,
  type CameraKey,
  type Cutscene,
  type Route,
} from './cutscene.ts';
import { mint } from './brand.ts';
import type { EventId, FeatureId } from './model.ts';

const imagined = { kind: 'imagined', groundedIn: { en: 'test', cy: 'prawf' }, sources: [] } as const;

const key = (at: number, e: number, over: Partial<CameraKey> = {}): CameraKey => ({
  at: sec(at),
  target: { e, n: 0 },
  distance: 100,
  heading: 0,
  pitch: 20,
  arrive: 'linear',
  ...over,
});

// Due north for 1000m, then due east for 1000m.
const route: Route = {
  id: 'test',
  label: { en: 'test', cy: 'prawf' },
  points: [
    { e: 0, n: 0 },
    { e: 0, n: 1000 },
    { e: 1000, n: 1000 },
  ],
  provenance: imagined,
};

const column = (over: Partial<ActorsTrack> = {}): ActorsTrack => ({
  kind: 'actors',
  actor: 'auxiliary',
  count: 6,
  abreast: 2,
  spacing: { rank: 10, file: 4 },
  route,
  head: { from: 100, to: 600 },
  from: sec(10),
  to: sec(20),
  provenance: imagined,
  ...over,
});

const scene: Cutscene = {
  id: cutsceneId('test'),
  event: mint<EventId>('roman-forts'),
  title: { en: 'test', cy: 'prawf' },
  duration: sec(30),
  camera: [key(0, 0), key(10, 1000), key(20, 0, { arrive: 'cut' })],
  tracks: [
    column(),
    { kind: 'caption', text: { en: 'one', cy: 'un' }, from: sec(2), to: sec(8), provenance: imagined },
    { kind: 'sound', sound: 'cornu', from: sec(5), to: sec(7), provenance: imagined },
    { kind: 'feature', feature: mint<FeatureId>('fort'), show: 'build', from: sec(12), to: sec(16) },
  ],
  provenance: imagined,
};

describe('the scene clock', () => {
  it('moves on by dt and ends exactly at the scene’s duration', () => {
    const mid = advance(START, 12.5, scene.duration);
    expect(mid).toEqual({ s: 12.5, ended: false });
    const end = advance(mid, 100, scene.duration);
    expect(end).toEqual({ s: 30, ended: true });
    expect(advance(end, 5, scene.duration)).toBe(end);
    expect(advance(mid, -3, scene.duration).s).toBe(12.5);
  });

  it('refuses a negative or non-finite scene time', () => {
    expect(() => sec(-1)).toThrow();
    expect(() => sec(Number.NaN)).toThrow();
  });
});

describe('camera keys', () => {
  it('interpolate between eased keys and sit exactly on a key at its time', () => {
    expect(cameraAt(scene.camera, 0).target.e).toBe(0);
    expect(cameraAt(scene.camera, 5).target.e).toBeCloseTo(500);
    expect(cameraAt(scene.camera, 10).target.e).toBe(1000);
  });

  it('hold the previous key until a cut, then jump', () => {
    expect(cameraAt(scene.camera, 19.9).target.e).toBe(1000);
    expect(cameraAt(scene.camera, 20).target.e).toBe(0);
    expect(cameraAt(scene.camera, 99).target.e).toBe(0);
  });

  it('turn the short way round through north, and zoom geometrically', () => {
    const keys = [
      key(0, 0, { heading: 350, distance: 100 }),
      key(10, 0, { heading: 10, distance: 400 }),
    ] as const;
    expect(cameraAt(keys, 5).heading).toBeCloseTo(0);
    expect(cameraAt(keys, 5).distance).toBeCloseTo(200);
  });

  it('ease in and out, and ease out, through the midpoint as named', () => {
    const inOut = [key(0, 0), key(10, 1000, { arrive: 'in-out' })] as const;
    const out = [key(0, 0), key(10, 1000, { arrive: 'out' })] as const;
    expect(cameraAt(inOut, 2.5).target.e).toBeCloseTo(62.5);
    expect(cameraAt(inOut, 5).target.e).toBeCloseTo(500);
    expect(cameraAt(out, 5).target.e).toBeCloseTo(875);
  });
});

describe('routes', () => {
  it('measure their length and find a point and its bearing along them', () => {
    expect(routeLength(route)).toBe(2000);
    expect(pointAlong(route, 500)).toEqual({ at: { e: 0, n: 500 }, heading: 0 });
    const turned = pointAlong(route, 1500);
    expect(turned.at).toEqual({ e: 500, n: 1000 });
    expect(turned.heading).toBeCloseTo(90);
    expect(pointAlong(route, 5000).at).toEqual({ e: 1000, n: 1000 });
  });
});

describe('a column of actors', () => {
  it('is drawn only while its track runs', () => {
    expect(placements(column(), 9.9)).toEqual([]);
    expect(placements(column(), 10)).not.toEqual([]);
    expect(placements(column(), 20.1)).toEqual([]);
  });

  it('puts its front rank at the head, ranks behind it and files side by side across the route', () => {
    const at = placements(column({ head: { from: 500, to: 500 } }), 15);
    expect(at).toHaveLength(6);
    const [a, b] = at;
    expect(a?.at.n).toBeGreaterThan(498);
    expect(a?.at.n).toBeLessThan(502);
    // Two abreast, 4m apart: one file left of the line (west), one right (east).
    expect(a?.at.e).toBeLessThan(-1);
    expect(b?.at.e).toBeGreaterThan(1);
    expect(at[4]?.at.n).toBeLessThan(483);
  });

  it('hides members not yet on the route and those past its end', () => {
    expect(placements(column({ head: { from: 15, to: 15 } }), 15)).toHaveLength(4);
    expect(placements(column({ head: { from: 2014, to: 2014 } }), 15)).toHaveLength(2);
  });

  it('marches along the route while moving, and a standing group faces its point', () => {
    const moving = placements(column(), 15);
    expect(moving.every((p) => p.walking && p.heading === 0)).toBe(true);
    const standing = placements(column({ head: { from: 500, to: 500 }, faces: { e: 1000, n: 500 } }), 15);
    expect(standing.every((p) => !p.walking)).toBe(true);
    expect(standing[0]?.heading).toBeGreaterThan(85);
    expect(standing[0]?.heading).toBeLessThan(95);
  });
});

describe('a scene frame', () => {
  it('shows each caption from its start to just before its end', () => {
    expect(frameAt(scene, 1.9).caption).toBeUndefined();
    expect(frameAt(scene, 2).caption?.text.en).toBe('one');
    expect(frameAt(scene, 8).caption).toBeUndefined();
  });

  it('builds a feature from nothing to whole over its track, and leaves other features alone', () => {
    const fort = mint<FeatureId>('fort');
    expect(frameAt(scene, 11).features.get(fort)).toBe(0);
    expect(frameAt(scene, 14).features.get(fort)).toBeCloseTo(0.5);
    expect(frameAt(scene, 17).features.get(fort)).toBe(1);
    expect(frameAt(scene, 17).features.size).toBe(1);
  });

  it('carries only the actors whose tracks are running', () => {
    expect(frameAt(scene, 5).actors).toEqual([]);
    expect(frameAt(scene, 15).actors[0]?.actor).toBe('auxiliary');
  });

  it('clamps a time past the end to the end', () => {
    expect(frameAt(scene, 99).s).toBe(30);
  });
});

describe('sound cues', () => {
  it('fire once, as the clock passes their start', () => {
    expect(cuesBetween(scene, 0, 4.9)).toEqual([]);
    expect(cuesBetween(scene, 4.9, 5).map((c) => c.sound)).toEqual(['cornu']);
    expect(cuesBetween(scene, 5, 6)).toEqual([]);
  });
});
