import { Color3, Matrix, MeshBuilder, StandardMaterial, type Mesh, type Scene } from './babylon.ts';
import { WORLD } from '../domain/geo.ts';
import { streetLampPoints, type LampSpacing, type StreetGlow } from '../domain/lamplight.ts';
import type { GridRef } from '../domain/model.ts';
import type { MapLine } from '../platform/assets.ts';
import type { Ground } from './structures.ts';

// Where the lamps stood is not recorded (light-after-dark research), so they follow today's roads
// where the town's houses stand, inside the area the lighting key says was lit.
const SPACING: LampSpacing = { every: 45, minGap: 25 };
const HEAD_LIFT = 0.55;

interface LampSet {
  readonly matrices: Float32Array;
  readonly count: number;
}

export class StreetLamps {
  readonly material: StandardMaterial;
  private readonly mesh: Mesh;
  private readonly towns = new Map<string, (p: GridRef) => boolean>();
  private readonly placed = new Map<string, LampSet>();
  private town: string | undefined;
  private street: StreetGlow | undefined;
  private colourSaid = '';
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

  addTown(id: string, builtUp: (p: GridRef) => boolean): void {
    this.towns.set(id, builtUp);
  }

  /** The one town whose streets get lamps; the town most present, so a fade never draws two sets. */
  showTown(id: string | undefined): void {
    if (id === this.town) return;
    this.town = id;
    this.place(this.street);
    this.refresh();
  }

  set(street: StreetGlow | undefined): void {
    const said = street
      ? [street.colour.r, street.colour.g, street.colour.b].map((c) => c.toFixed(2)).join(',')
      : 'none';
    if (said !== this.colourSaid) {
      this.colourSaid = said;
      console.info(`dewidebug street lamps colour=${said}`);
    }
    this.street = street;
    this.place(street);
    this.refresh();
  }

  private refresh(): void {
    const level = this.street?.level ?? 0;
    const colour = this.street?.colour;
    this.mesh.isVisible = level > 0.02 && this.count > 0;
    if (colour) this.material.emissiveColor.set(colour.r * level, colour.g * level, colour.b * level);
  }

  private place(street: StreetGlow | undefined): void {
    const builtUp = this.town === undefined ? undefined : this.towns.get(this.town);
    const key = builtUp && street ? `${this.town ?? ''}|${street.area.id}` : 'none';
    if (key === this.key) return;
    this.key = key;
    const set =
      builtUp && street ? this.lampsFor(key, builtUp, street) : { matrices: new Float32Array(16), count: 0 };
    this.mesh.thinInstanceSetBuffer('matrix', set.matrices, 16, false);
    this.mesh.thinInstanceCount = set.count;
    this.count = set.count;
    console.info(`dewidebug street lamps showing ${key} lamps=${set.count}`);
  }

  private lampsFor(key: string, builtUp: (p: GridRef) => boolean, street: StreetGlow): LampSet {
    const cached = this.placed.get(key);
    if (cached) return cached;
    const points = streetLampPoints(this.roads, SPACING, builtUp, street.area);
    const matrices = new Float32Array(Math.max(1, points.length) * 16);
    points.forEach((p, i) => {
      const x = (p.e - WORLD.centre.e) / WORLD.metresPerUnit;
      const z = (p.n - WORLD.centre.n) / WORLD.metresPerUnit;
      Matrix.Translation(x, this.ground(x, z) + HEAD_LIFT, z).copyToArray(matrices, i * 16);
    });
    const set = { matrices, count: points.length };
    this.placed.set(key, set);
    console.info(`dewidebug street lamps placed ${key} lamps=${points.length}`);
    return set;
  }
}
