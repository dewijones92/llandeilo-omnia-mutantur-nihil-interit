export type Level = 'far' | 'near';

/** Metres are world units of 10m: a monument closer than this to the camera is drawn in full (ADR 0047). */
export const NEAR = 200;
const HOLD = 1.15;

/**
 * Which level of detail a monument is drawn at, from the camera's distance to it. It switches to `near`
 * inside `NEAR` and back to `far` only beyond `NEAR` by 15%, so a camera hovering at the edge does not
 * swap the meshes every frame.
 */
export function levelFor(distance: number, previous: Level): Level {
  if (distance < NEAR) return 'near';
  if (distance > NEAR * HOLD) return 'far';
  return previous;
}
