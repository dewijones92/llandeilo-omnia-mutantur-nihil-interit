// The maths of the map-style camera (ADR 0050): sliding the land, zooming at the cursor, gliding.
// World axes: x east, z north, y up; an ArcRotate camera sits at target + r·(cos α sin β, cos β, sin α sin β).

export interface Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface Ray {
  readonly origin: Vec3;
  /** Unit length. */
  readonly direction: Vec3;
}

export interface GroundXZ {
  readonly x: number;
  readonly z: number;
}

export type GroundAt = (x: number, z: number) => number;

const PIXELS_PER_LINE = 16;
const PIXELS_PER_PAGE = 400;
// One wheel notch (about 100px) changes the distance by about a fifth, as Babylon's wheel did here.
const ZOOM_PER_PIXEL = 0.002;
const BISECTIONS = 24;

export function along(ray: Ray, t: number): Vec3 {
  const { origin: o, direction: d } = ray;
  return { x: o.x + d.x * t, y: o.y + d.y * t, z: o.z + d.z * t };
}

/**
 * Where a ray meets the level plane y = height, or nothing when it never does (a ray into the sky)
 * or only beyond maxDistance, where a pixel would stand for thousands of units.
 */
export function hitPlane(ray: Ray, height: number, maxDistance: number): Vec3 | undefined {
  const t = (height - ray.origin.y) / ray.direction.y;
  return Number.isFinite(t) && t > 0 && t <= maxDistance ? along(ray, t) : undefined;
}

/**
 * How far to move the target so the point grabbed at the start of a drag is under the cursor again.
 * The drag holds to the level plane through the grabbed point, so the land moves with the cursor;
 * a cursor pulled above the horizon gives nothing, and the land stays put.
 */
export function panShift(grab: Vec3, ray: Ray, maxDistance: number): GroundXZ | undefined {
  const hit = hitPlane(ray, grab.y, maxDistance);
  return hit ? { x: grab.x - hit.x, z: grab.z - hit.z } : undefined;
}

/** The ground under the cursor; past the map, the level of the target; in the sky, nothing. */
export function pointUnder(
  ray: Ray,
  ground: GroundAt,
  planeHeight: number,
  maxDistance: number,
  step: number,
): { point: Vec3; on: 'ground' | 'plane' } | undefined {
  const hit = rayGround(ray, ground, maxDistance, step);
  if (hit) return { point: hit, on: 'ground' };
  const plane = hitPlane(ray, planeHeight, maxDistance);
  return plane ? { point: plane, on: 'plane' } : undefined;
}

/** The first point where a ray meets the ground: march in steps, then bisect the step that crossed it. */
export function rayGround(ray: Ray, ground: GroundAt, maxDistance: number, step: number): Vec3 | undefined {
  const below = (t: number): boolean => {
    const p = along(ray, t);
    return p.y <= ground(p.x, p.z);
  };
  if (below(0)) return ray.origin;
  let before = 0;
  for (let t = step; before < maxDistance; t += step) {
    const at = Math.min(t, maxDistance);
    if (below(at)) {
      let lo = before;
      let hi = at;
      for (let i = 0; i < BISECTIONS; i++) {
        const mid = (lo + hi) / 2;
        if (below(mid)) hi = mid;
        else lo = mid;
      }
      return along(ray, hi);
    }
    before = at;
  }
  return undefined;
}

/**
 * The target after scaling the camera's distance by k about a point: the eye moves along its line to
 * the point, so the point stays under the cursor.
 */
export function zoomAbout(target: Vec3, point: Vec3, k: number): Vec3 {
  return {
    x: point.x + (target.x - point.x) * k,
    y: point.y + (target.y - point.y) * k,
    z: point.z + (target.z - point.z) * k,
  };
}

/** A wheel event as the natural log of the change in distance: positive zooms out. */
export function wheelLog(deltaY: number, deltaMode: number): number {
  const pixels =
    deltaMode === 1 ? deltaY * PIXELS_PER_LINE : deltaMode === 2 ? deltaY * PIXELS_PER_PAGE : deltaY;
  return pixels * ZOOM_PER_PIXEL;
}

/** One frame of a glide that slows exponentially, the same however long the frame. */
export function glide(velocity: number, dtMs: number, tauMs: number): { moved: number; velocity: number } {
  const decay = Math.exp(-dtMs / tauMs);
  return { moved: velocity * tauMs * (1 - decay), velocity: velocity * decay };
}

export function clampToDisc(p: GroundXZ, radius: number): GroundXZ {
  const d = Math.hypot(p.x, p.z);
  if (d <= radius) return p;
  return { x: (p.x / d) * radius, z: (p.z / d) * radius };
}

/** The ground direction for held keys: forward is the way the camera faces, right is to its right. */
export function slideDirection(alpha: number, forward: number, right: number): GroundXZ {
  if (forward === 0 && right === 0) return { x: 0, z: 0 };
  const x = -Math.cos(alpha) * forward - Math.sin(alpha) * right;
  const z = -Math.sin(alpha) * forward + Math.cos(alpha) * right;
  const n = Math.hypot(x, z);
  return n > 1 ? { x: x / n, z: z / n } : { x, z };
}

/** As Babylon decides a tap: a press is a drag once it has moved past the threshold on either axis. */
export function isDrag(dx: number, dy: number, threshold: number): boolean {
  return Math.abs(dx) > threshold || Math.abs(dy) > threshold;
}
