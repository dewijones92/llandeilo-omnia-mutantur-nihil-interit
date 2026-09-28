import { Vector3, type AbstractMesh, type ArcRotateCamera } from './babylon.ts';

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
  private followed: { mesh: AbstractMesh; radius: number; onEnd: () => void } | undefined;
  readonly home: Pose;

  constructor(private readonly camera: ArcRotateCamera) {
    this.home = this.pose();
  }

  private pose(): Pose {
    const c = this.camera;
    return { target: c.target.clone(), radius: c.radius, alpha: c.alpha, beta: c.beta };
  }

  follow(mesh: AbstractMesh, radius: number, onEnd: () => void): void {
    this.stopFollowing('replaced');
    this.from = undefined;
    this.to = undefined;
    this.followed = { mesh, radius, onEnd };
    console.info(`dewidebug camera follow mesh=${mesh.name} radius=${radius}`);
  }

  stopFollowing(reason: string): void {
    const f = this.followed;
    if (!f) return;
    this.followed = undefined;
    console.info(`dewidebug camera stop following mesh=${f.mesh.name} reason=${reason}`);
    f.onEnd();
  }

  get following(): boolean {
    return this.followed !== undefined;
  }

  flyTo(target: Vector3, radius: number, beta = 1.0): void {
    this.stopFollowing('fly');
    this.from = this.pose();
    const alpha = this.camera.alpha;
    this.to = { target, radius, alpha, beta };
    this.elapsed = 0;
    console.info(`dewidebug camera fly to x=${target.x.toFixed(0)} z=${target.z.toFixed(0)} r=${radius}`);
  }

  flyHome(): void {
    this.stopFollowing('home');
    this.from = this.pose();
    const turns = Math.round((this.from.alpha - this.home.alpha) / (Math.PI * 2));
    this.to = { ...this.home, alpha: this.home.alpha + turns * Math.PI * 2 };
    this.elapsed = 0;
  }

  turnTo(alpha: number): void {
    this.from = this.pose();
    this.to = { ...this.from, target: this.from.target.clone(), alpha };
    this.elapsed = 0;
    console.info(`dewidebug camera turn from alpha=${this.from.alpha.toFixed(2)} to=${alpha.toFixed(2)}`);
  }

  get flying(): boolean {
    return this.to !== undefined;
  }

  tick(dt: number): void {
    this.track(dt);
    const { from, to } = this;
    if (!from || !to) return;
    this.elapsed += dt;
    const f = Math.min(1, this.elapsed / this.duration);
    const e = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
    const arc =
      Math.sin(f * Math.PI) * Math.max(0, Math.min(1400, Vector3.Distance(from.target, to.target) * 0.6));
    const c = this.camera;
    if (!this.followed) {
      c.target = Vector3.Lerp(from.target, to.target, e);
      c.radius = from.radius + (to.radius - from.radius) * e + arc;
    }
    c.alpha = from.alpha + (to.alpha - from.alpha) * e;
    c.beta = from.beta + (to.beta - from.beta) * e;
    if (f >= 1) {
      this.from = undefined;
      this.to = undefined;
    }
  }

  private track(dt: number): void {
    const f = this.followed;
    if (!f) return;
    if (!f.mesh.isVisible || f.mesh.isDisposed()) {
      this.stopFollowing('gone');
      return;
    }
    const c = this.camera;
    const { alpha, beta } = c;
    const radius = c.radius + (f.radius - c.radius) * Math.min(1, dt / 500);
    c.target = f.mesh.position.clone();
    c.alpha = alpha;
    c.beta = beta;
    c.radius = radius;
  }
}
