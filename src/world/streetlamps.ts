import { Color3, Matrix, MeshBuilder, StandardMaterial, type Mesh, type Scene } from './babylon.ts';
import type { Rgb } from '../domain/colour.ts';
import { WORLD } from '../domain/geo.ts';
import type { MapLine } from '../platform/assets.ts';
import type { Ground } from './structures.ts';

// Where the lamps stood is not recorded (light-after-dark research), so they follow today's roads
// where the town's houses stand.
const SPACING_M = 45;
const MIN_GAP_M = 25;
const HEAD_LIFT = 0.55;

export class StreetLamps {
  readonly material: StandardMaterial;
  private readonly mesh: Mesh;
  private readonly sets = new Map<string, Float32Array>();
  private key = '';
  private count = 0;

  constructor(
    scene: Scene,
    private readonly roads: readonly MapLine[],
    private readonly ground: Ground,
  ) {
    this.material = new StandardMaterial('street-lamp-mat', scene);
    this.material.disableLighting = true;
    this.material.diffuseColor = Color3.Black();
    this.material.specularColor = Color3.Black();
    this.material.emissiveColor = Color3.Black();
    this.material.fogEnabled = false;
    this.mesh = MeshBuilder.CreateBox('street-lamps', { size: 0.26 }, scene);
    this.mesh.material = this.material;
    this.mesh.isPickable = false;
    this.mesh.isVisible = false;
    this.mesh.thinInstanceCount = 0;
  }

  addTown(id: string, builtUp: (e: number, n: number) => boolean): void {
    const points: { e: number; n: number }[] = [];
    const far = (e: number, n: number): boolean =>
      points.every((p) => Math.hypot(p.e - e, p.n - n) >= MIN_GAP_M);
    for (const line of this.roads) {
      let carry = 0;
      for (let i = 1; i < line.points.length; i++) {
        const a = line.points[i - 1];
        const b = line.points[i];
        if (!a || !b) continue;
        const len = Math.hypot(b.e - a.e, b.n - a.n);
        for (let d = carry; d < len; d += SPACING_M) {
          const f = d / len;
          const e = a.e + (b.e - a.e) * f;
          const n = a.n + (b.n - a.n) * f;
          if (builtUp(e, n) && far(e, n)) points.push({ e, n });
        }
        carry = (carry - len) % SPACING_M;
        if (carry < 0) carry += SPACING_M;
      }
    }
    const m = new Float32Array(Math.max(1, points.length) * 16);
    points.forEach((p, i) => {
      const x = (p.e - WORLD.centre.e) / WORLD.metresPerUnit;
      const z = (p.n - WORLD.centre.n) / WORLD.metresPerUnit;
      Matrix.Translation(x, this.ground(x, z) + HEAD_LIFT, z).copyToArray(m, i * 16);
    });
    this.sets.set(id, points.length > 0 ? m : new Float32Array(0));
    console.info(`dewidebug street lamps town=${id} lamps=${points.length}`);
  }

  show(towns: readonly string[]): void {
    const key = towns.join('|');
    if (key === this.key) return;
    this.key = key;
    const chosen = towns.flatMap((t) => {
      const s = this.sets.get(t);
      return s && s.length > 0 ? [s] : [];
    });
    const total = chosen.reduce((n, s) => n + s.length / 16, 0);
    const m = new Float32Array(Math.max(1, total) * 16);
    let at = 0;
    for (const s of chosen) {
      m.set(s, at);
      at += s.length;
    }
    this.mesh.thinInstanceSetBuffer('matrix', m, 16, false);
    this.mesh.thinInstanceCount = total;
    this.count = total;
    console.info(`dewidebug street lamps towns=${key || 'none'} lamps=${total}`);
  }

  setLevel(colour: Rgb, strength: number): void {
    this.mesh.isVisible = strength > 0.02 && this.count > 0;
    this.material.emissiveColor.set(colour.r * strength, colour.g * strength, colour.b * strength);
  }
}
