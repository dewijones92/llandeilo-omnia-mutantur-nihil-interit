import { Vector3, type ArcRotateCamera } from './babylon.ts';
import { cameraAngles } from '../domain/compass.ts';
import type { CameraPose, Frame } from '../domain/cutscene.ts';
import { toWorld, WORLD } from '../domain/geo.ts';
import type { Crowd } from './crowd.ts';
import type { Flight } from './flight.ts';
import { PERSON_HEIGHT } from './people.ts';
import type { SmokeSource } from './smoke.ts';
import type { Ground } from './structures.ts';

// The camera must stay this far (world units) above the ground under it; a shot that would put it
// inside a hill is tilted up until it clears.
const CLEARANCE = 3;
// One dust plume for every this many walking figures.
const DUST_EVERY = 30;

interface Limits {
  readonly lowerRadius: number | null;
  readonly lowerBeta: number | null;
  readonly upperBeta: number | null;
}

/** Draws a cutscene frame in the world: the camera, the crowd and the dust they raise. */
export class Stage {
  private saved: Limits | undefined;
  private lifted = false;

  constructor(
    private readonly camera: ArcRotateCamera,
    private readonly flight: Flight,
    private readonly crowd: Crowd,
    private readonly ground: Ground,
  ) {}

  /** Hands the camera to the scene: no mouse control, and close, low shots allowed. */
  begin(): void {
    const c = this.camera;
    this.saved = {
      lowerRadius: c.lowerRadiusLimit,
      lowerBeta: c.lowerBetaLimit,
      upperBeta: c.upperBetaLimit,
    };
    c.detachControl();
    c.lowerRadiusLimit = 5;
    c.lowerBetaLimit = 0.02;
    c.upperBetaLimit = 1.55;
  }

  end(): void {
    const c = this.camera;
    const s = this.saved;
    if (s) {
      c.lowerRadiusLimit = s.lowerRadius;
      c.lowerBetaLimit = s.lowerBeta;
      c.upperBetaLimit = s.upperBeta;
    }
    this.saved = undefined;
    c.attachControl(true);
    this.crowd.clear();
  }

  /** Draws the frame and returns the dust plumes for the smoke layer. */
  show(frame: Frame, timeMs: number): SmokeSource[] {
    this.pose(frame.camera);
    this.crowd.show(frame.actors, timeMs);
    const dust: SmokeSource[] = [];
    for (const g of frame.actors) {
      g.members.forEach((m, i) => {
        if (!m.walking || i % DUST_EVERY !== DUST_EVERY >> 1) return;
        const { x, z } = toWorld(m.at);
        dust.push({
          key: `dust-${String(g.track)}-${String(i)}`,
          x,
          y: this.ground(x, z),
          z,
          spread: 2.2,
          density: g.actor === 'rider' || g.actor === 'mule' ? 0.9 : 0.6,
          style: 'dust',
          fire: false,
        });
      });
    }
    return dust;
  }

  private pose(p: CameraPose): void {
    const { x, z } = toWorld(p.target);
    const target = new Vector3(x, this.ground(x, z) + PERSON_HEIGHT * 0.6, z);
    const radius = p.distance / WORLD.metresPerUnit;
    let { alpha, beta } = cameraAngles(p.heading, p.pitch);
    let tilts = 0;
    for (; tilts < 30; tilts++) {
      const cx = target.x + radius * Math.cos(alpha) * Math.sin(beta);
      const cz = target.z + radius * Math.sin(alpha) * Math.sin(beta);
      const cy = target.y + radius * Math.cos(beta);
      if (cy > this.ground(cx, cz) + CLEARANCE) break;
      beta -= 0.02;
    }
    const lifted = tilts > 0;
    if (lifted !== this.lifted) {
      this.lifted = lifted;
      console.info(`dewidebug stage camera lifted=${String(lifted)} by=${(tilts * 0.02).toFixed(2)}rad`);
    }
    // Keep alpha within a turn of the camera's own, so its inputs never see a jump of 2π.
    alpha += Math.round((this.camera.alpha - alpha) / (Math.PI * 2)) * Math.PI * 2;
    this.flight.hold(target, radius, alpha, beta);
  }
}
