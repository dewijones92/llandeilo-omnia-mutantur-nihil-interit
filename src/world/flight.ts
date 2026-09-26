import { Vector3, type ArcRotateCamera } from '@babylonjs/core';

interface Pose {
  readonly target: Vector3;
  readonly radius: number;
  readonly alpha: number;
  readonly beta: number;
}

export class Flight {
  private from: Pose | undefined;
  private to: Pose | undefined;
  private elapsed = 0;
  private readonly duration = 1600;
  readonly home: Pose;

  constructor(private readonly camera: ArcRotateCamera) {
    this.home = this.pose();
  }

  private pose(): Pose {
    const c = this.camera;
    return { target: c.target.clone(), radius: c.radius, alpha: c.alpha, beta: c.beta };
  }

  flyTo(target: Vector3, radius: number, beta = 1.0): void {
    this.from = this.pose();
    const alpha = this.camera.alpha;
    this.to = { target, radius, alpha, beta };
    this.elapsed = 0;
    console.info(`dewidebug camera fly to x=${target.x.toFixed(0)} z=${target.z.toFixed(0)} r=${radius}`);
  }

  flyHome(): void {
    this.from = this.pose();
    const turns = Math.round((this.from.alpha - this.home.alpha) / (Math.PI * 2));
    this.to = { ...this.home, alpha: this.home.alpha + turns * Math.PI * 2 };
    this.elapsed = 0;
  }

  get flying(): boolean {
    return this.to !== undefined;
  }

  tick(dt: number): void {
    const { from, to } = this;
    if (!from || !to) return;
    this.elapsed += dt;
    const f = Math.min(1, this.elapsed / this.duration);
    const e = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
    const arc =
      Math.sin(f * Math.PI) * Math.max(0, Math.min(1400, Vector3.Distance(from.target, to.target) * 0.6));
    const c = this.camera;
    c.target = Vector3.Lerp(from.target, to.target, e);
    c.radius = from.radius + (to.radius - from.radius) * e + arc;
    c.alpha = from.alpha + (to.alpha - from.alpha) * e;
    c.beta = from.beta + (to.beta - from.beta) * e;
    if (f >= 1) {
      this.from = undefined;
      this.to = undefined;
    }
  }
}
