import { describe, expect, it } from 'vitest';
import {
  clampToDisc,
  glide,
  hitPlane,
  isDrag,
  panShift,
  pointUnder,
  rayGround,
  slideDirection,
  wheelLog,
  zoomAbout,
  type Ray,
  type Vec3,
} from './camera-moves.ts';

const towards = (origin: Vec3, at: Vec3): Ray => {
  const d = { x: at.x - origin.x, y: at.y - origin.y, z: at.z - origin.z };
  const n = Math.hypot(d.x, d.y, d.z);
  return { origin, direction: { x: d.x / n, y: d.y / n, z: d.z / n } };
};

const eye = { x: 0, y: 100, z: -100 };

describe('sliding the land under the cursor', () => {
  it('finds where a ray meets a level plane', () => {
    const hit = hitPlane(towards(eye, { x: 10, y: 0, z: 5 }), 0, 10_000);
    expect(hit?.x).toBeCloseTo(10);
    expect(hit?.y).toBeCloseTo(0);
    expect(hit?.z).toBeCloseTo(5);
  });

  it('finds no point for a ray that never meets the plane, or meets it beyond reach', () => {
    const up = { origin: eye, direction: { x: 0, y: 1, z: 0 } };
    expect(hitPlane(up, 0, 500)).toBeUndefined();
    const level = { origin: eye, direction: { x: 0, y: 0, z: 1 } };
    expect(hitPlane(level, 0, 500)).toBeUndefined();
    const shallow = towards(eye, { x: 0, y: 99, z: 10_000 });
    expect(hitPlane(shallow, 0, 800)).toBeUndefined();
    expect(hitPlane(shallow, 0, 2_000_000)?.y).toBeCloseTo(0);
  });

  it('gives no shift for a drag pulled above the horizon, so the land stays put', () => {
    const sky = towards(eye, { x: 0, y: 150, z: 300 });
    expect(panShift({ x: 0, y: 0, z: 0 }, sky, 10_000)).toBeUndefined();
  });

  it('moves the target so the grabbed point is back under the cursor', () => {
    const grab = { x: 0, y: 0, z: 0 };
    const ray = towards(eye, { x: 10, y: 0, z: 5 });
    const shift = panShift(grab, ray, 10_000);
    if (!shift) throw new Error('no shift');
    expect(shift.x).toBeCloseTo(-10);
    expect(shift.z).toBeCloseTo(-5);
    const moved = { ...ray, origin: { x: eye.x + shift.x, y: eye.y, z: eye.z + shift.z } };
    const after = hitPlane(moved, grab.y, 10_000);
    expect(after?.x).toBeCloseTo(grab.x);
    expect(after?.z).toBeCloseTo(grab.z);
  });

  it('grabs at the height of the grabbed point, not at zero', () => {
    const grab = { x: 0, y: 40, z: 0 };
    const ray = towards(eye, { x: 6, y: 40, z: 0 });
    expect(panShift(grab, ray, 10_000)?.x).toBeCloseTo(-6);
  });
});

describe('finding the ground under the cursor', () => {
  it('meets flat ground', () => {
    const hit = rayGround(
      { origin: { x: 0, y: 100, z: 0 }, direction: { x: 0, y: -1, z: 0 } },
      () => 5,
      1000,
      4,
    );
    expect(hit?.y).toBeCloseTo(5, 2);
  });

  it('meets a slope rising to meet a level ray', () => {
    const hit = rayGround(
      { origin: { x: -100, y: 50, z: 0 }, direction: { x: 1, y: 0, z: 0 } },
      (x) => x * 0.5,
      1000,
      4,
    );
    expect(hit?.x).toBeCloseTo(100, 2);
  });

  it('stops at the first hill rather than the valley behind it', () => {
    const hill = (x: number): number => (x > 40 && x < 60 ? 100 : 0);
    const hit = rayGround(towards({ x: 0, y: 50, z: 0 }, { x: 500, y: 0, z: 0 }), hill, 2000, 4);
    expect(hit?.x).toBeCloseTo(40, 1);
  });

  it('finds nothing when the ground is out of reach', () => {
    const level = { origin: { x: 0, y: 100, z: 0 }, direction: { x: 1, y: 0, z: 0 } };
    expect(rayGround(level, () => 0, 500, 4)).toBeUndefined();
    const down = { origin: { x: 0, y: 100, z: 0 }, direction: { x: 0, y: -1, z: 0 } };
    expect(rayGround(down, () => 0, 50, 4)).toBeUndefined();
    expect(rayGround(down, () => 0, 200, 4)).toBeDefined();
  });

  it('points at the ground, at the level of the target where the ground is out of reach, and at nothing in the sky', () => {
    const down = { origin: { x: 0, y: 100, z: 0 }, direction: { x: 0, y: -1, z: 0 } };
    expect(pointUnder(down, () => 5, 0, 1000, 4)?.on).toBe('ground');
    const deep = pointUnder(down, () => -5000, 0, 1000, 4);
    expect(deep?.on).toBe('plane');
    expect(deep?.point.y).toBeCloseTo(0);
    const sky = towards({ x: 0, y: 100, z: 0 }, { x: 0, y: 160, z: 900 });
    expect(pointUnder(sky, () => 0, 0, 9000, 4)).toBeUndefined();
  });

  it('answers at once when the ray starts under the ground', () => {
    const start = { x: 3, y: -1, z: 4 };
    expect(rayGround({ origin: start, direction: { x: 1, y: 0, z: 0 } }, () => 0, 500, 4)).toEqual(start);
  });
});

describe('zooming towards the cursor', () => {
  it('moves the target towards the point by the zoom factor', () => {
    expect(zoomAbout({ x: 0, y: 0, z: 0 }, { x: 100, y: 10, z: -20 }, 0.5)).toEqual({ x: 50, y: 5, z: -10 });
  });

  it('keeps the point in the same direction from the eye, so it stays under the cursor', () => {
    const target = { x: 0, y: 0, z: 0 };
    const point = { x: 80, y: 3, z: 40 };
    const k = 0.6;
    const next = zoomAbout(target, point, k);
    const offset = { x: eye.x - target.x, y: eye.y - target.y, z: eye.z - target.z };
    const eye2 = { x: next.x + offset.x * k, y: next.y + offset.y * k, z: next.z + offset.z * k };
    const before = towards(eye, point).direction;
    const after = towards(eye2, point).direction;
    expect(after.x).toBeCloseTo(before.x);
    expect(after.y).toBeCloseTo(before.y);
    expect(after.z).toBeCloseTo(before.z);
  });

  it('zooms in for a wheel turned away from you, out for towards, by the same amount', () => {
    expect(wheelLog(-100, 0)).toBeLessThan(0);
    expect(wheelLog(100, 0)).toBeCloseTo(-wheelLog(-100, 0));
    const notch = Math.exp(wheelLog(100, 0));
    expect(notch).toBeGreaterThan(1.15);
    expect(notch).toBeLessThan(1.3);
  });

  it('reads wheels that count in lines or pages as pixels', () => {
    expect(wheelLog(3, 1)).not.toBe(0);
    expect(wheelLog(3, 1)).toBeCloseTo(wheelLog(48, 0));
    expect(wheelLog(1, 2)).toBeCloseTo(wheelLog(400, 0));
  });
});

describe('gliding after a fling', () => {
  it('does nothing in no time and travels at most velocity times tau', () => {
    expect(glide(2, 0, 100)).toEqual({ moved: 0, velocity: 2 });
    const long = glide(2, 100_000, 100);
    expect(long.moved).toBeCloseTo(200);
    expect(long.velocity).toBeCloseTo(0);
  });

  it('travels the same whether the frames are short or long', () => {
    const a = glide(1.5, 50, 120);
    const b = glide(a.velocity, 50, 120);
    const once = glide(1.5, 100, 120);
    expect(once.moved).toBeGreaterThan(0);
    expect(a.moved + b.moved).toBeCloseTo(once.moved);
    expect(b.velocity).toBeCloseTo(once.velocity);
  });
});

describe('the map edge and the keys', () => {
  it('leaves a point inside the disc alone and pulls one outside back to its edge', () => {
    expect(clampToDisc({ x: 30, z: -40 }, 100)).toEqual({ x: 30, z: -40 });
    const p = clampToDisc({ x: 300, z: -400 }, 100);
    expect(p.x).toBeCloseTo(60);
    expect(p.z).toBeCloseTo(-80);
  });

  it('slides forward the way the camera faces and right to its right', () => {
    const north = -Math.PI / 2;
    const f = slideDirection(north, 1, 0);
    expect(f.x).toBeCloseTo(0);
    expect(f.z).toBeCloseTo(1);
    const r = slideDirection(north, 0, 1);
    expect(r.x).toBeCloseTo(1);
    expect(r.z).toBeCloseTo(0);
    const facingEast = Math.PI;
    expect(slideDirection(facingEast, 1, 0).x).toBeCloseTo(1);
  });

  it('slides no faster on a diagonal, and not at all with no key held', () => {
    const d = slideDirection(0.7, 1, -1);
    expect(Math.hypot(d.x, d.z)).toBeCloseTo(1);
    expect(slideDirection(0.7, 0, 0)).toEqual({ x: 0, z: 0 });
  });

  it('counts a press as a drag only once it moves past the threshold on either axis', () => {
    expect(isDrag(10, -10, 10)).toBe(false);
    expect(isDrag(11, 0, 10)).toBe(true);
    expect(isDrag(0, -11, 10)).toBe(true);
  });
});
