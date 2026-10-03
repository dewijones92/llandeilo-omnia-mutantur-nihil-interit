import { Vector3, VertexBuffer, type AbstractMesh, type Mesh } from './babylon.ts';
import { toGrid, toWorld } from '../domain/geo.ts';
import type { Feature, FeatureId, RollingStock } from '../domain/model.ts';
import type { LampState } from '../domain/lamplight.ts';
import type { FeaturePresence } from '../domain/state.ts';
import { hash2 } from '../domain/noise.ts';
import { hidesFootprint, rotate } from '../domain/plan.ts';
import { Surface } from '../domain/surface.ts';
import type { BuildingFootprints, MapLine } from '../platform/assets.ts';
import type { World } from './scene.ts';
import { Buildings, lineRibbons, longestLine, Train } from './settlement.ts';
import { planClearing, planWorldScale } from './buildings.ts';
import { buildFeature, type Ground } from './structures.ts';
import type { SmokeSource } from './smoke.ts';
import type { Clearing } from './terrain.ts';
import type { LoadedModel } from './models.ts';
import { StreetLamps } from './streetlamps.ts';

interface Monument {
  readonly mesh: Mesh;
}

interface TownSet {
  readonly order: Int32Array;
  readonly target: number;
  /** Towns get street lamps; the scattered countryside does not. */
  readonly lit: boolean;
}

const TOWN_CORE_RADIUS = 1300;

const CLEARING: Readonly<Record<Exclude<Feature['kind']['type'], 'building'>, number>> = {
  roundhouses: 40,
  hillfort: 85,
  'roman-fort': 60,
  'hall-houses': 45,
  town: 110,
  countryside: 0,
  railway: 0,
  train: 0,
  roads: 0,
};

function clearingOf(kind: Feature['kind']): number {
  return kind.type === 'building' ? planClearing(kind.plan) : CLEARING[kind.type];
}

function coveredFootprints(features: readonly Feature[], footprints: BuildingFootprints): Set<number> {
  const covered = new Set<number>();
  const plans = features.flatMap((f) =>
    f.kind.type === 'building' ? [{ at: f.at, plan: f.kind.plan }] : [],
  );
  const d = footprints.data;
  for (let i = 0; i < footprints.count; i++) {
    const e = d[i * 5] ?? 0;
    const n = d[i * 5 + 1] ?? 0;
    const box = { e, n, width: d[i * 5 + 2] ?? 0, depth: d[i * 5 + 3] ?? 0, angle: d[i * 5 + 4] ?? 0 };
    for (const m of plans) {
      if (Math.hypot(e - m.at.e, n - m.at.n) > 400) continue;
      if (hidesFootprint(m.plan, m.at, box)) covered.add(i);
    }
  }
  return covered;
}

export class FeatureLayer {
  private readonly monuments = new Map<FeatureId, Monument>();
  private readonly towns = new Map<FeatureId, TownSet>();
  private readonly buildings: Buildings;
  private readonly rail: Mesh;
  private readonly roads: Mesh;
  private readonly streetLamps: StreetLamps;
  private readonly train: Train | undefined;
  private stock: RollingStock | undefined;
  private trainFeature: Feature | undefined;
  readonly ground: Ground;
  private readonly surface: Ground;

  constructor(
    world: World,
    features: readonly Feature[],
    footprints: BuildingFootprints,
    railways: readonly MapLine[],
    roads: readonly MapLine[],
    trainModels: ReadonlyMap<RollingStock, LoadedModel>,
  ) {
    const scene = world.scene;
    this.ground = (x, z) => world.terrain.heightAt(toGrid({ x, z }));
    const surface = new Surface(world.terrain.mesh.getVerticesData(VertexBuffer.PositionKind) ?? []);
    const onSurface: Ground = (x, z) => surface.heightAt(x, z) ?? this.ground(x, z);
    this.surface = onSurface;
    console.info(
      `dewidebug surface vs grid at centre: surface=${surface.heightAt(0, 0)?.toFixed(2) ?? 'none'} grid=${this.ground(0, 0).toFixed(2)}`,
    );
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
    this.streetLamps = new StreetLamps(scene, roads, this.ground);
    world.addLamp(this.streetLamps.material);
    const main = longestLine(railways);
    this.train = main ? new Train(scene, main, this.ground, trainModels) : undefined;
    const started = performance.now();
    const covered = coveredFootprints(features, footprints);
    const visible = (order: Int32Array): Int32Array => order.filter((i) => !covered.has(i));
    console.info(`dewidebug features hide ${covered.size} OS footprints that are drawn as landmark models`);
    for (const f of features) {
      const { x, z } = toWorld(f.at);
      if (f.kind.type === 'town') {
        const order = visible(this.buildings.distanceOrder(f.at, f.kind.radius)).slice(0, f.kind.nearest);
        this.towns.set(f.id, { order, target: order.length, lit: true });
        this.streetLamps.addTown(f.id, this.buildings.nearHouses(order));
        continue;
      }
      if (f.kind.type === 'countryside') {
        const order = visible(this.buildings.countrysideOrder(f.at, TOWN_CORE_RADIUS));
        this.towns.set(f.id, { order, target: Math.round(order.length * f.kind.share), lit: false });
        continue;
      }
      const built = buildFeature(scene, f.kind, Math.floor(hash2(x, z, 7) * 1e6), onSurface, x, z);
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
      const r = clearingOf(p.feature.kind);
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
      } else if (k.type === 'building' && k.condition === 'standing' && k.plan.hearth) {
        const across = planWorldScale(k.plan).across;
        const [hx, hz] = rotate(k.plan.hearth, k.plan.angle ?? 0);
        const sx = x + hx * across;
        const sz = z + hz * across;
        out.push({
          key: p.feature.id,
          x: sx,
          y: this.surface(sx, sz) + 3,
          z: sz,
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
    let lampTown: { id: string; presence: number } | undefined;
    for (const [id, t] of this.towns) {
      const p = active.get(id)?.presence ?? 0;
      if (p > 0) selections.push({ id, order: t.order, count: Math.floor(t.target * p) });
      if (t.lit && p > 0.5 && p > (lampTown?.presence ?? 0)) lampTown = { id, presence: p };
    }
    this.buildings.show(selections);
    this.streetLamps.showTown(lampTown?.id);
    let rail = 0;
    let road = 0;
    let train: { feature: Feature; stock: RollingStock; presence: number } | undefined;
    for (const p of present) {
      const k = p.feature.kind;
      if (k.type === 'railway') rail = Math.max(rail, p.presence);
      if (k.type === 'roads') road = Math.max(road, p.presence);
      if (k.type === 'train' && p.presence > (train?.presence ?? 0.9))
        train = { feature: p.feature, stock: k.stock, presence: p.presence };
    }
    this.stock = rail > 0.9 ? train?.stock : undefined;
    this.trainFeature = this.stock ? train?.feature : undefined;
    this.rail.isVisible = rail > 0.5;
    this.roads.isVisible = road > 0.5;
  }

  setLamps(state: LampState): void {
    this.buildings.setLamps(state);
    this.streetLamps.set(state.colour, state.street);
  }

  tick(dt: number): void {
    this.train?.step(dt, this.stock);
  }

  trackable(mesh: AbstractMesh | null | undefined): Feature | undefined {
    const train = this.train?.mesh;
    return mesh && train && mesh === train && train.isVisible ? this.trainFeature : undefined;
  }

  trainSmoke(): SmokeSource | undefined {
    const mesh = this.train?.mesh;
    const chimney = this.train?.chimney;
    if (!mesh || !chimney) return undefined;
    const p = mesh.position;
    return {
      key: `train-${mesh.name}`,
      x: p.x,
      y: p.y,
      z: p.z,
      spread: 0,
      density: 1,
      style: 'steam',
      fire: false,
      follow: { mesh, offset: chimney },
    };
  }

  trainPosition(): Vector3 | undefined {
    return this.train?.mesh?.position;
  }
}
