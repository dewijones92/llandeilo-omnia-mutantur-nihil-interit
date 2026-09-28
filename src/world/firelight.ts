import {
  Color3,
  Constants,
  DynamicTexture,
  Matrix,
  MeshBuilder,
  Quaternion,
  StandardMaterial,
  Vector3,
  type Mesh,
  type Scene,
} from './babylon.ts';
import type { SmokeSource } from './smoke.ts';
import type { Ground } from './structures.ts';

export class Firelight {
  readonly material: StandardMaterial;
  private readonly glow: DynamicTexture;
  private readonly mesh: Mesh;
  private key = '';

  constructor(
    scene: Scene,
    private readonly ground: Ground,
  ) {
    const glow = new DynamicTexture('firelight-glow', { width: 64, height: 64 }, scene, false);
    const ctx = glow.getContext();
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    g.addColorStop(0, 'rgb(255,200,120)');
    g.addColorStop(0.2, 'rgb(220,110,40)');
    g.addColorStop(0.55, 'rgb(70,28,8)');
    g.addColorStop(0.9, 'rgb(0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    glow.update(false);
    this.glow = glow;
    this.material = new StandardMaterial('firelight-mat', scene);
    this.material.disableLighting = true;
    this.material.diffuseColor = Color3.Black();
    this.material.specularColor = Color3.Black();
    this.material.emissiveColor = Color3.Black();
    this.material.emissiveTexture = glow;
    this.material.alpha = 0.99;
    this.material.alphaMode = Constants.ALPHA_ADD;
    this.material.disableDepthWrite = true;
    this.material.fogEnabled = false;
    this.mesh = MeshBuilder.CreateBox('firelight', { width: 1, height: 0.01, depth: 1 }, scene);
    this.mesh.material = this.material;
    this.mesh.isPickable = false;
    this.mesh.isVisible = false;
  }

  show(sources: readonly SmokeSource[], level: number): void {
    const hearths = sources.filter((s) => s.fire);
    this.mesh.isVisible = level > 0.02 && hearths.length > 0;
    this.glow.level = level * 1.6;
    const key = hearths.map((s) => s.key).join('|');
    if (key === this.key) return;
    this.key = key;
    const m = new Float32Array(Math.max(1, hearths.length) * 16);
    hearths.forEach((s, i) => {
      const r = 3 + s.density * 1.5 + s.spread * 0.4;
      Matrix.Compose(
        new Vector3(r, 1, r),
        Quaternion.Identity(),
        new Vector3(s.x, this.highest(s.x, s.z, r) + 0.3, s.z),
      ).copyToArray(m, i * 16);
    });
    this.mesh.thinInstanceSetBuffer('matrix', m, 16, false);
    this.mesh.thinInstanceCount = hearths.length;
    console.info(`dewidebug firelight hearths=${hearths.length}`);
  }

  private highest(x: number, z: number, r: number): number {
    let top = this.ground(x, z);
    for (let a = 0; a < 8; a++) {
      const t = (a / 8) * Math.PI * 2;
      top = Math.max(top, this.ground(x + Math.cos(t) * r * 0.45, z + Math.sin(t) * r * 0.45));
    }
    return top;
  }
}
