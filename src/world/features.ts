import { Vector3, type Mesh } from './babylon.ts';
import { toGrid, toWorld } from '../domain/geo.ts';
import type { Feature, FeatureId } from '../domain/model.ts';
import type { FeaturePresence } from '../domain/state.ts';
import { hash2 } from '../domain/noise.ts';
import type { BuildingFootprints, MapLine } from '../platform/assets.ts';
import type { World } from './scene.ts';
import { Buildings, lineRibbons, longestLine, Train } from './settlement.ts';
import { buildFeature, type Ground } from './structures.ts';
import type { SmokeSource } from './smoke.ts';
import type { Clearing } from './terrain.ts';

interface Monument {
  readonly mesh: Mesh;
}

interface TownSet {
  readonly order: Int32Array;
  readonly target: number;
}

const TOWN_CORE_RADIUS = 1300;

const CLEARING: Readonly<Record<Feature['kind']['type'], number>> = {
  roundhouses: 40,
  hillfort: 85,
  'roman-fort': 60,
  castle: 45,
  church: 25,
  abbey: 45,
  'hall-houses': 45,
  town: 110,
  countryside: 0,
  mansion: 40,
  bridge: 0,
  railway: 0,
  roads: 0,
  tower: 20,
};

export class FeatureLayer {
  private readonly monuments = new Map<FeatureId, Monument>();
  private readonly towns = new Map<FeatureId, TownSet>();
  private readonly buildings: Buildings;
  private readonly rail: Mesh;
  private readonly roads: Mesh;
  private readonly train: Train | undefined;
  private railPresence = 0;
  readonly ground: Ground;

  constructor(
    world: World,
    features: readonly Feature[],
    footprints: BuildingFootprints,
    railways: readonly MapLine[],
    roads: readonly MapLine[],
  ) {
    const scene = world.scene;
    this.ground = (x, z) => world.terrain.heightAt(toGrid({ x, z }));
    this.buildings = new Buildings(scene, footprints, this.ground);
    for (const m of this.buildings.meshes) world.addCaster(m);
    world.addLamp(this.buildings.windowMaterial);
    this.rail = lineRibbons(scene, 'rail', railways, this.ground, () => 1.1, '#6d655c', 0.35);
    this.rail.isVisible = false;
    this.roads = lineRibbons(
      scene,
      'roads',
      roads,
      this.ground,
      (k) => (k === 'A' ? 1.6 : k === 'B' ? 1.1 : 0.8),
      '#b9b6ae',
      0.3,
    );
    this.roads.isVisible = false;
    const main = longestLine(railways);
    this.train = main ? new Train(scene, main, this.ground) : undefined;
    const started = performance.now();
    for (const f of features) {
      const { x, z } = toWorld(f.at);
      if (f.kind.type === 'town') {
        const order = this.buildings.distanceOrder(f.at, f.kind.radius).slice(0, f.kind.nearest);
        this.towns.set(f.id, { order, target: order.length });
        continue;
      }
      if (f.kind.type === 'countryside') {
        const order = this.buildings.countrysideOrder(f.at, TOWN_CORE_RADIUS);
        this.towns.set(f.id, { order, target: Math.round(order.length * f.kind.share) });
        continue;
      }
      const built = buildFeature(scene, f.kind, Math.floor(hash2(x, z, 7) * 1e6), this.ground, x, z);
      if (!built) continue;
      built.mesh.setEnabled(false);
      built.mesh.receiveShadows = true;
      const mat = scene.getMaterialByName('building-mat');
      if (mat) built.mesh.material = mat;
      if (built.casts) world.addCaster(built.mesh);
      this.monuments.set(f.id, { mesh: built.mesh });
    }
    console.info(
      `dewidebug features built monuments=${this.monuments.size} towns=${this.towns.size} in ${Math.round(performance.now() - started)}ms`,
    );
  }

  clearings(present: readonly FeaturePresence[]): Clearing[] {
    const out: Clearing[] = [];
    for (const p of present) {
      if (p.presence < 0.35) continue;
      const r = CLEARING[p.feature.kind.type];
      if (r === 0) continue;
      const { x, z } = toWorld(p.feature.at);
      out.push({ x, z, radius: r });
    }
    return out;
  }

  smokeSources(present: readonly FeaturePresence[]): SmokeSource[] {
    const out: SmokeSource[] = [];
    for (const p of present) {
      if (p.presence < 0.6) continue;
      const k = p.feature.kind;
      const { x, z } = toWorld(p.feature.at);
      const y = this.ground(x, z) + 2;
      if (k.type === 'roundhouses' || k.type === 'hall-houses') {
        out.push({
          key: p.feature.id,
          x,
          y,
          z,
          spread: (k.spread / 10) * 0.5 + 1,
          density: Math.min(1.5, k.count / 4),
          style: 'hearth',
          fire: true,
        });
      } else if (k.type === 'town' && k.style !== 'modern') {
        out.push({
          key: p.feature.id,
          x,
          y: y + 1,
          z,
          spread: 18,
          density: 1.8,
          style: 'hearth',
          fire: false,
        });
      } else if (k.type === 'mansion') {
        out.push({
          key: p.feature.id,
          x,
          y: y + 3,
          z,
          spread: 1.5,
          density: 0.5,
          style: 'hearth',
          fire: true,
        });
      }
    }
    return out;
  }

  apply(present: readonly FeaturePresence[]): void {
    const active = new Map(present.map((p) => [p.feature.id, p]));
    for (const [id, m] of this.monuments) {
      const p = active.get(id)?.presence ?? 0;
      m.mesh.setEnabled(p > 0.01);
      if (p > 0.01) m.mesh.scaling.y = 0.05 + 0.95 * (1 - Math.pow(1 - p, 3));
    }
    const selections: { id: string; order: Int32Array; count: number }[] = [];
    for (const [id, t] of this.towns) {
      const p = active.get(id)?.presence ?? 0;
      if (p > 0) selections.push({ id, order: t.order, count: Math.floor(t.target * p) });
    }
    this.buildings.show(selections);
    let rail = 0;
    let road = 0;
    for (const p of present) {
      if (p.feature.kind.type === 'railway') rail = Math.max(rail, p.presence);
      if (p.feature.kind.type === 'roads') road = Math.max(road, p.presence);
    }
    this.railPresence = rail;
    this.rail.isVisible = rail > 0.5;
    this.roads.isVisible = road > 0.5;
  }

  setLamps(level: number): void {
    this.buildings.setLamps(level);
  }

  tick(dt: number): void {
    this.train?.step(dt, this.railPresence > 0.9);
  }

  trainSmoke(): SmokeSource | undefined {
    const train = this.train;
    if (!train?.mesh.isVisible) return undefined;
    const p = train.mesh.position;
    return {
      key: 'train',
      x: p.x,
      y: p.y,
      z: p.z,
      spread: 0,
      density: 1,
      style: 'steam',
      fire: false,
      follow: { mesh: train.mesh, offset: new Vector3(1.1, 2.6, 0) },
    };
  }

  trainPosition(): Vector3 | undefined {
    return this.train?.mesh.isVisible ? this.train.mesh.position : undefined;
  }
}
