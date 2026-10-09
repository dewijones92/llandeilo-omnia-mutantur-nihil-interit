import { Vector3, type AbstractMesh, type Mesh } from './babylon.ts';
import { toGrid, toWorld } from '../domain/geo.ts';
import type { Feature, FeatureId, RollingStock } from '../domain/model.ts';
import type { LampState } from '../domain/lamplight.ts';
import type { FeaturePresence } from '../domain/state.ts';
import { hash2 } from '../domain/noise.ts';
import { hidesFootprint, rotate, type Plan, type Pt } from '../domain/plan.ts';
import { smokingFeatures } from '../domain/smoke.ts';
import { drawnRailway, longestLine, sectionLines } from '../domain/rail.ts';
import type { BuildingFootprints, MapLine } from '../platform/assets.ts';
import type { World } from './scene.ts';
import { Buildings, lineRibbons, Train } from './settlement.ts';
import { planClearing, planWorldScale } from './buildings.ts';
import { buildFeature, type Ground, type WorldPoint } from './structures.ts';
import type { SmokeSource } from './smoke.ts';
import type { Clearing } from './landcover.ts';
import type { LoadedModel } from './models.ts';
import { StreetLamps } from './streetlamps.ts';
import { levelFor, type Level } from '../domain/lod.ts';

interface Monument {
  readonly mesh: Mesh;
  /** The full-detail mesh, drawn instead of `mesh` when the camera is near. */
  readonly near: Mesh | undefined;
  readonly at: { readonly x: number; readonly z: number };
  readonly hearths: readonly WorldPoint[];
  level: Level;
  visible: boolean;
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
  'hall-houses': 45,
  town: 110,
  countryside: 0,
  railway: 0,
  train: 0,
  roads: 0,
  burning: 0,
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
  /** One ribbon per railway feature, each its own stretch of today's track. */
  private readonly rails = new Map<FeatureId, Mesh>();
  private drawnRail = '';
  private readonly roads: Mesh;
  private readonly streetLamps: StreetLamps;
  private readonly train: Train | undefined;
  readonly trainLine: MapLine | undefined;
  private stock: RollingStock | undefined;
  private steam = false;
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
    const onSurface: Ground = (x, z) => world.terrain.surfaceAt(x, z);
    this.surface = onSurface;
    console.info(
      `dewidebug surface vs grid at centre: surface=${onSurface(0, 0).toFixed(2)} grid=${this.ground(0, 0).toFixed(2)}`,
    );
    this.buildings = new Buildings(scene, footprints, this.ground);
    for (const m of this.buildings.meshes) world.addCaster(m);
    world.addLamp(this.buildings.windowMaterial);
    world.addLamp(this.buildings.halos.material);
    const onGround = (lines: readonly MapLine[]): MapLine[] =>
      lines.map((l) => ({ ...l, points: world.terrain.lineOnGround(l.points) }));
    this.roads = lineRibbons(
      scene,
      'roads',
      onGround(roads),
      this.ground,
      (k) => (k === 'A' ? 1.6 : k === 'B' ? 1.1 : 0.8),
      '#b9b6ae',
      0.3,
    );
    this.roads.isVisible = false;
    this.streetLamps = new StreetLamps(scene, roads, this.ground);
    world.addLamp(this.streetLamps.material);
    world.addLamp(this.streetLamps.halos.material);
    const main = longestLine(railways);
    this.trainLine = main;
    const [mainOnGround] = main ? onGround([main]) : [];
    this.train = mainOnGround ? new Train(scene, mainOnGround, this.ground, trainModels) : undefined;
    const started = performance.now();
    const covered = coveredFootprints(features, footprints);
    const visible = (order: Int32Array): Int32Array => order.filter((i) => !covered.has(i));
    console.info(`dewidebug features hide ${covered.size} OS footprints that are drawn as landmark models`);
    for (const f of features) {
      const { x, z } = toWorld(f.at);
      if (f.kind.type === 'railway') {
        const lines = sectionLines(railways, f.kind.section);
        const mesh = lineRibbons(
          scene,
          `rail-${f.id}`,
          onGround(lines),
          this.ground,
          () => 1.1,
          '#6d655c',
          0.35,
        );
        mesh.isVisible = false;
        this.rails.set(f.id, mesh);
        console.info(
          `dewidebug rail ${f.id} within ${JSON.stringify(f.kind.section.within)}: ${String(lines.length)} lines`,
        );
        continue;
      }
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
      const mat = scene.getMaterialByName('building-mat');
      for (const mesh of built.near ? [built.mesh, built.near] : [built.mesh]) {
        mesh.setEnabled(false);
        mesh.receiveShadows = true;
        if (mat) mesh.material = mat;
        if (built.casts) world.addCaster(mesh);
      }
      this.monuments.set(f.id, {
        mesh: built.mesh,
        near: built.near,
        at: { x, z },
        hearths: built.hearths,
        level: 'far',
        visible: false,
      });
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
    return smokingFeatures(present).map(({ feature: f, plume }): SmokeSource => {
      const { x, z } = toWorld(f.at);
      const k = f.kind;
      if (k.type === 'building' && k.plan.hearth) {
        const h = this.buildingHearth(k.plan, k.plan.hearth, x, z);
        const at = { key: f.id, x: h.x, y: h.y + 3, z: h.z, ...plume };
        return plume.fire
          ? { ...at, fire: true, houses: [{ x: h.x, y: h.y + 1.2, z: h.z }] }
          : { ...at, fire: false };
      }
      const at = { key: f.id, x, y: this.ground(x, z) + (k.type === 'town' ? 3 : 2), z, ...plume };
      return plume.fire
        ? { ...at, fire: true, houses: this.monuments.get(f.id)?.hearths ?? [] }
        : { ...at, fire: false };
    });
  }

  private buildingHearth(plan: Plan, hearth: Pt, x: number, z: number): WorldPoint {
    const across = planWorldScale(plan).across;
    const [hx, hz] = rotate(hearth, plan.angle ?? 0);
    const sx = x + hx * across;
    const sz = z + hz * across;
    return { x: sx, y: this.surface(sx, sz), z: sz };
  }

  apply(present: readonly FeaturePresence[]): void {
    const active = new Map(present.map((p) => [p.feature.id, p]));
    for (const [id, m] of this.monuments) {
      const p = active.get(id)?.presence ?? 0;
      m.visible = p > 0.01;
      if (m.visible) {
        const rise = 0.05 + 0.95 * (1 - Math.pow(1 - p, 3));
        m.mesh.scaling.y = rise;
        if (m.near) m.near.scaling.y = rise;
      }
      this.show(m);
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
    let road = 0;
    for (const p of present) if (p.feature.kind.type === 'roads') road = Math.max(road, p.presence);
    const railway = drawnRailway(present, this.trainLine?.points);
    const drawn = new Set(railway.sections.map((s) => s.feature.id));
    for (const [id, mesh] of this.rails) mesh.isVisible = drawn.has(id);
    const said = `${[...drawn].join(',') || 'none'} train=${railway.train?.feature.id ?? 'none'} steam=${String(railway.train?.steam ?? false)}`;
    if (said !== this.drawnRail) {
      this.drawnRail = said;
      console.info(`dewidebug rail drawn ${said}`);
    }
    this.stock = railway.train?.stock;
    this.steam = railway.train?.steam ?? false;
    this.trainFeature = railway.train?.feature;
    this.train?.setSpan(railway.train?.span);
    this.roads.isVisible = road > 0.5;
  }

  private show(m: Monument): void {
    const full = m.near && m.level === 'near';
    m.mesh.setEnabled(m.visible && !full);
    m.near?.setEnabled(m.visible && full === true);
  }

  /** Swaps each detailed monument between its levels by how far the camera is; true if any swapped, so the shadows can be redrawn. */
  setViewer(eye: { readonly x: number; readonly y: number; readonly z: number }): boolean {
    let swapped = false;
    for (const [id, m] of this.monuments) {
      if (!m.near) continue;
      const g = this.surface(m.at.x, m.at.z);
      const distance = Math.hypot(eye.x - m.at.x, eye.y - g, eye.z - m.at.z);
      const level = levelFor(distance, m.level);
      if (level === m.level) continue;
      m.level = level;
      swapped = true;
      this.show(m);
      console.info(
        `dewidebug lod ${id} now ${level} at ${Math.round(distance)} units from the camera (${m.visible ? 'drawn' : 'not drawn now'})`,
      );
    }
    return swapped;
  }

  /** Where each detailed monument is drawn, for the debug overlay. */
  levels(): string {
    return [...this.monuments]
      .filter(([, m]) => m.near)
      .map(([id, m]) => `${id}=${m.level}`)
      .join(' ');
  }

  setLamps(state: LampState): void {
    this.buildings.setLamps(state);
    this.streetLamps.set(state.street);
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
    if (!mesh || !chimney || !this.steam) return undefined;
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
