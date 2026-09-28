import { Color4, DynamicTexture, ParticleSystem, Vector3, type AbstractMesh, type Scene } from './babylon.ts';

export interface SmokeSource {
  readonly key: string;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly spread: number;
  readonly density: number;
  readonly style: 'hearth' | 'steam';
  readonly fire: boolean;
  readonly follow?: { readonly mesh: AbstractMesh; readonly offset: Vector3 };
}

const STEAM = [new Color4(0.93, 0.93, 0.94, 0.75), new Color4(0.55, 0.55, 0.58, 0.6)] as const;
const HEARTH = [new Color4(0.8, 0.81, 0.83, 0.55), new Color4(0.7, 0.71, 0.74, 0.42)] as const;

export class Smoke {
  private readonly texture: DynamicTexture;
  private readonly systems = new Map<string, { readonly ps: ParticleSystem; readonly steam: boolean }>();
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
      if (cameraDistance(s.x, s.z) > 1600) continue;
      wanted.add(s.key);
      if (!this.systems.has(s.key)) this.systems.set(s.key, { ps: this.make(s), steam: s.style === 'steam' });
    }
    for (const [key, sys] of this.systems) {
      if (wanted.has(key)) continue;
      sys.ps.stop();
      sys.ps.dispose(false);
      this.systems.delete(key);
    }
  }

  shade(level: number): void {
    if (Math.abs(level - this.level) < 0.01) return;
    this.level = level;
    for (const sys of this.systems.values()) this.tint(sys.ps, sys.steam);
  }

  private tint(ps: ParticleSystem, steam: boolean): void {
    const k = 0.35 + 0.65 * this.level;
    const [a, b] = steam ? STEAM : HEARTH;
    ps.color1.set(a.r * k, a.g * k, a.b * k, a.a);
    ps.color2.set(b.r * k, b.g * k, b.b * k, b.a);
    ps.colorDead.set(0.9 * k, 0.9 * k, 0.9 * k, 0);
  }

  private make(s: SmokeSource): ParticleSystem {
    const ps = new ParticleSystem(`smoke-${s.key}`, Math.round(60 * s.density), this.scene);
    ps.particleTexture = this.texture;
    const steam = s.style === 'steam';
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
    this.tint(ps, steam);
    ps.minSize = steam ? 0.7 : 1.6;
    ps.maxSize = steam ? 1.6 : 3.4;
    ps.minLifeTime = steam ? 1.6 : 3;
    ps.maxLifeTime = steam ? 3.2 : 6;
    ps.emitRate = (steam ? 30 : 8) * s.density;
    ps.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    ps.gravity = steam ? new Vector3(0.1, 0.9, 0.05) : new Vector3(0.35, 0.5, 0.15);
    ps.direction1 = new Vector3(-0.1, 0.8, -0.1);
    ps.direction2 = new Vector3(0.2, 1.2, 0.2);
    ps.minEmitPower = 0.3;
    ps.maxEmitPower = 0.8;
    ps.updateSpeed = 0.012;
    ps.addSizeGradient(0, 0.6);
    ps.addSizeGradient(1, 2.4);
    ps.preWarmCycles = s.follow ? 0 : 90;
    ps.preWarmStepOffset = 6;
    ps.start();
    return ps;
  }
}
