import { Color4, DynamicTexture, ParticleSystem, Vector3, type AbstractMesh, type Scene } from './babylon.ts';
import type { SmokeStyle } from '../domain/smoke.ts';

export interface SmokeSource {
  readonly key: string;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly spread: number;
  readonly density: number;
  readonly style: SmokeStyle;
  readonly fire: boolean;
  readonly follow?: { readonly mesh: AbstractMesh; readonly offset: Vector3 };
}

interface Look {
  readonly colours: readonly [Color4, Color4];
  /** Puff size at birth and at death; Babylon's size gradient overrides min and max size. */
  readonly grow: readonly [number, number];
  readonly life: readonly [number, number];
  readonly rate: number;
  /** Particles per unit of density, enough for the rate times the longest life. */
  readonly capacity: number;
  /** Drawn only while the eye is this close, across the ground; a town on fire shows from afar. */
  readonly seenWithin: number;
  /** Grey the smoke thins to as it dies. */
  readonly dead: number;
  readonly rise: Vector3;
}

// Burning smoke is darker and heavier than a hearth's; its numbers are tuned by eye.
const LOOK: Readonly<Record<SmokeStyle, Look>> = {
  hearth: {
    colours: [new Color4(0.8, 0.81, 0.83, 0.55), new Color4(0.7, 0.71, 0.74, 0.42)],
    grow: [0.6, 2.4],
    life: [3, 6],
    rate: 8,
    capacity: 60,
    seenWithin: 1600,
    dead: 0.9,
    rise: new Vector3(0.35, 0.5, 0.15),
  },
  steam: {
    colours: [new Color4(0.93, 0.93, 0.94, 0.75), new Color4(0.55, 0.55, 0.58, 0.6)],
    grow: [0.6, 2.4],
    life: [1.6, 3.2],
    rate: 30,
    capacity: 60,
    seenWithin: 1600,
    dead: 0.9,
    rise: new Vector3(0.1, 0.9, 0.05),
  },
  burning: {
    colours: [new Color4(0.36, 0.33, 0.3, 0.8), new Color4(0.2, 0.19, 0.18, 0.65)],
    grow: [5, 28],
    life: [8, 16],
    rate: 20,
    capacity: 330,
    seenWithin: 9000,
    dead: 0.45,
    rise: new Vector3(0.6, 1.4, 0.25),
  },
};

export class Smoke {
  private readonly texture: DynamicTexture;
  private readonly systems = new Map<string, { readonly ps: ParticleSystem; readonly style: SmokeStyle }>();
  private level = 1;

  constructor(private readonly scene: Scene) {
    this.texture = new DynamicTexture('smoke-puff', { width: 64, height: 64 }, scene, false);
    const ctx = this.texture.getContext();
    const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    this.texture.hasAlpha = true;
    this.texture.update(false);
  }

  show(sources: readonly SmokeSource[], cameraDistance: (x: number, z: number) => number): void {
    const wanted = new Set<string>();
    for (const s of sources) {
      if (cameraDistance(s.x, s.z) > LOOK[s.style].seenWithin) continue;
      wanted.add(s.key);
      if (this.systems.has(s.key)) continue;
      this.systems.set(s.key, { ps: this.make(s), style: s.style });
      if (s.style === 'burning') console.info(`dewidebug smoke burning start ${s.key} spread=${s.spread}`);
    }
    for (const [key, sys] of this.systems) {
      if (wanted.has(key)) continue;
      if (sys.style === 'burning') console.info(`dewidebug smoke burning stop ${key}`);
      sys.ps.stop();
      sys.ps.dispose(false);
      this.systems.delete(key);
    }
  }

  shade(level: number): void {
    if (Math.abs(level - this.level) < 0.01) return;
    this.level = level;
    for (const sys of this.systems.values()) this.tint(sys.ps, sys.style);
  }

  private tint(ps: ParticleSystem, style: SmokeStyle): void {
    const k = 0.35 + 0.65 * this.level;
    const { colours, dead } = LOOK[style];
    const [a, b] = colours;
    ps.color1.set(a.r * k, a.g * k, a.b * k, a.a);
    ps.color2.set(b.r * k, b.g * k, b.b * k, b.a);
    ps.colorDead.set(dead * k, dead * k, dead * k, 0);
  }

  private make(s: SmokeSource): ParticleSystem {
    const look = LOOK[s.style];
    const ps = new ParticleSystem(`smoke-${s.key}`, Math.round(look.capacity * s.density), this.scene);
    ps.particleTexture = this.texture;
    if (s.follow) {
      ps.emitter = s.follow.mesh;
      ps.minEmitBox = s.follow.offset.add(new Vector3(-0.1, 0, -0.1));
      ps.maxEmitBox = s.follow.offset.add(new Vector3(0.1, 0.1, 0.1));
    } else {
      ps.emitter = new Vector3(s.x, s.y + 2.5, s.z);
      ps.minEmitBox = new Vector3(-s.spread, 0, -s.spread);
      ps.maxEmitBox = new Vector3(s.spread, 0.5, s.spread);
    }
    ps.color1 = new Color4();
    ps.color2 = new Color4();
    ps.colorDead = new Color4();
    this.tint(ps, s.style);
    [ps.minLifeTime, ps.maxLifeTime] = look.life;
    ps.emitRate = look.rate * s.density;
    ps.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    ps.gravity = look.rise.clone();
    ps.direction1 = new Vector3(-0.1, 0.8, -0.1);
    ps.direction2 = new Vector3(0.2, 1.2, 0.2);
    ps.minEmitPower = 0.3;
    ps.maxEmitPower = 0.8;
    ps.updateSpeed = 0.012;
    ps.addSizeGradient(0, look.grow[0]);
    ps.addSizeGradient(1, look.grow[1]);
    ps.preWarmCycles = s.follow ? 0 : 90;
    ps.preWarmStepOffset = 6;
    ps.start();
    return ps;
  }
}
