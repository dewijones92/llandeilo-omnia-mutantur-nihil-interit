/**
 * Texture coordinates for a landmark model's faces (ADR 0055). The Blender script decides which way each face's
 * texture runs and writes it into the face colour's alpha; the app works the coordinates out from that, in metres
 * of the model's own frame, so a texture is never stretched however long a wall is, and the files stay small.
 */

/** How a face's texture runs: up the face (up a roof's slope), or along its longest edge (a post, a board, a beam). */
export type Grain = 'upright' | 'lengthwise';

/** The Blender script writes alpha = (code + 1) / GRAIN_STEPS; codes are 0 upright and 1 lengthwise. */
export const GRAIN_STEPS = 4;

export function grainOf(alpha: number): Grain {
  return Math.round(alpha * GRAIN_STEPS) - 1 === 1 ? 'lengthwise' : 'upright';
}

/**
 * A colour map averages this grey (tools/textures/process.py), so a textured face's vertex colour is divided by it:
 * the palette's colour on average, the photograph's light and dark about it. (Babylon clamps a material's diffuse
 * colour before it meets the texture, so the lift has to be in the vertex colour.)
 */
export const DETAIL_MEAN = 0.5;

export type V3 = readonly [number, number, number];

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V3, b: V3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const unit = (a: V3): V3 => {
  const n = Math.hypot(a[0], a[1], a[2]);
  return n > 0 ? [a[0] / n, a[1] / n, a[2] / n] : [0, 0, 0];
};

// Positions are x east, y up and z north, in metres.
const UP: V3 = [0, 1, 0];
const NORTH: V3 = [0, 0, 1];
const FLAT = 1e-6;
// Any fixed direction off the axes, so an edge and its reverse can always be told apart.
const SENSE: V3 = [0.31, 0.87, 0.38];

/**
 * The texture coordinates, in metres, of a triangle's three corners: v runs along the grain as it lies on the face,
 * u across it. A level face has no "up" on it, so its v runs north. Both triangles of a flat quad get the same axes
 * (they share its normal and its diagonal), so a texture runs on across them without a seam.
 */
export function triangleUv(a: V3, b: V3, c: V3, grain: Grain): readonly number[] {
  const normal = unit(cross(sub(b, a), sub(c, a)));
  let along: V3;
  if (grain === 'lengthwise') {
    const edges = [sub(b, a), sub(c, b), sub(a, c)];
    const longest = edges.reduce((best, e) => (dot(e, e) > dot(best, best) ? e : best));
    // Both triangles of a quad share its diagonal, but each walks it the other way: one sense for both.
    along = dot(longest, SENSE) < 0 ? [-longest[0], -longest[1], -longest[2]] : longest;
  } else {
    const k = dot(UP, normal);
    along = [UP[0] - k * normal[0], UP[1] - k * normal[1], UP[2] - k * normal[2]];
    if (dot(along, along) < FLAT) along = NORTH;
  }
  const t = unit(along);
  const u = unit(cross(normal, t));
  return [dot(a, u), dot(a, t), dot(b, u), dot(b, t), dot(c, u), dot(c, t)];
}
