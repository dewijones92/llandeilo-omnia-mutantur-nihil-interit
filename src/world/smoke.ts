import { Color4, DynamicTexture, ParticleSystem, Vector3, type Scene } from './babylon.ts';

export interface SmokeSource {
  readonly key: string;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly spread: number;
  readonly density: number;
}

export class Smoke {
  private readonly texture: DynamicTexture;
  private readonly systems = new Map<string, ParticleSystem>();

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
      if (cameraDistance(s.x, s.z) > 1600) continue;
      wanted.add(s.key);
      if (!this.systems.has(s.key)) this.systems.set(s.key, this.make(s));
    }
    for (const [key, ps] of this.systems) {
      if (wanted.has(key)) continue;
      ps.stop();
      ps.dispose(false);
      this.systems.delete(key);
    }
  }

  private make(s: SmokeSource): ParticleSystem {
    const ps = new ParticleSystem(`smoke-${s.key}`, Math.round(60 * s.density), this.scene);
    ps.particleTexture = this.texture;
    ps.emitter = new Vector3(s.x, s.y + 2.5, s.z);
    ps.minEmitBox = new Vector3(-s.spread, 0, -s.spread);
    ps.maxEmitBox = new Vector3(s.spread, 0.5, s.spread);
    ps.color1 = new Color4(0.8, 0.81, 0.83, 0.55);
    ps.color2 = new Color4(0.7, 0.71, 0.74, 0.42);
    ps.colorDead = new Color4(0.9, 0.9, 0.9, 0);
    ps.minSize = 1.6;
    ps.maxSize = 3.4;
    ps.minLifeTime = 3;
    ps.maxLifeTime = 6;
    ps.emitRate = 8 * s.density;
    ps.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    ps.gravity = new Vector3(0.35, 0.5, 0.15);
    ps.direction1 = new Vector3(-0.1, 0.8, -0.1);
    ps.direction2 = new Vector3(0.2, 1.2, 0.2);
    ps.minEmitPower = 0.3;
    ps.maxEmitPower = 0.8;
    ps.updateSpeed = 0.012;
    ps.addSizeGradient(0, 0.6);
    ps.addSizeGradient(1, 2.4);
    ps.preWarmCycles = 90;
    ps.preWarmStepOffset = 6;
    ps.start();
    return ps;
  }
}
