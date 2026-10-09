import { Matrix, Vector3, type Scene } from '../world/babylon.ts';

export interface Box {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

export interface ScreenPoint {
  readonly x: number;
  readonly y: number;
  readonly inView: boolean;
}

export type Projector = (world: Vector3) => ScreenPoint;

export function overlaps(a: Box, b: Box): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

/**
 * Where a point in the scene falls on the page, in CSS pixels, and whether it is in front of the camera
 * and inside the canvas. One projection for every page element that follows the scene (place labels,
 * conversation bubbles, photograph pins); undefined while there is no camera.
 */
export function projector(scene: Scene): Projector | undefined {
  const camera = scene.activeCamera;
  if (!camera) return undefined;
  const engine = scene.getEngine();
  const w = engine.getRenderWidth();
  const hgt = engine.getRenderHeight();
  const scale = window.innerWidth / w;
  const viewport = camera.viewport.toGlobal(w, hgt);
  const transform = scene.getTransformMatrix();
  return (world) => {
    const p = Vector3.Project(world, Matrix.IdentityReadOnly, transform, viewport);
    return {
      x: p.x * scale,
      y: p.y * scale,
      inView: p.z > 0 && p.z < 1 && p.x > 0 && p.x < w && p.y > 0 && p.y < hgt,
    };
  };
}
