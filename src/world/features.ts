import { Vector3, VertexBuffer, type AbstractMesh, type Mesh } from './babylon.ts';
import { toGrid, toWorld, WORLD } from '../domain/geo.ts';
import type { Feature, FeatureId, RollingStock } from '../domain/model.ts';
import type { LampState } from '../domain/lamplight.ts';
import type { FeaturePresence } from '../domain/state.ts';
import { hash2 } from '../domain/noise.ts';
import { hidesFootprint, rotate, type Plan, type Pt } from '../domain/plan.ts';
import { LOD_STEPS } from '../domain/lidar.ts';
import { smokingFeatures } from '../domain/smoke.ts';
import { drawnRailway, longestLine, sectionLines } from '../domain/rail.ts';
import type { BuildingFootprints, MapLine } from '../platform/assets.ts';
import type { World } from './scene.ts';
import { Buildings, lineRibbons, Train, type Ribbon } from './settlement.ts';
import { buildPlan, newDrawn, planGroundAt, planWorldScale, type Drawn } from './buildings.ts';
import type { GroundEdit } from '../domain/groundedit.ts';
import {
  clearingMetres,
  editsBuiltOn,
  editsDrawn,
  columnTops,
  footprint,
  floorFromTops,
  footprintSamples,
  SEAT_TOLERANCE,
  seats,
  standsOnGround,
  terracesByFeature,
} from '../domain/plot.ts';
import type { Timeline } from '../domain/timeline.ts';
import { heightToWorld } from '../domain/geo.ts';
import { buildFeature, type Ground, type WorldPoint } from './structures.ts';
import type { SmokeSource } from './smoke.ts';
import type { Clearing } from './landcover.ts';
import type { LoadedModel } from './models.ts';
import { StreetLamps } from './streetlamps.ts';
import { levelFor, type Level } from '../domain/lod.ts';
import { liesOnGround, PROBE, type LandmarkModel } from '../domain/buildsheet.ts';
import { loadLandmark, type LandmarkMesh, type LoadedLandmark } from './landmarks.ts';
import type { LandmarkMaterials } from './landmark-materials.ts';

/** A monument's Blender model (ADR 0053): both levels, each the ground parts the app draws plus the loaded model. */
interface ModelSlot {
  readonly entry: LandmarkModel;
  readonly feature: Feature;
  state: 'idle' | 'loading' | 'ready' | 'failed';
  far: readonly Mesh[];
  near: readonly Mesh[];
  parts: readonly string[];
  /** Where the model set each rigid part's floor, world y (ADR 0056). */
  floors: ReadonlyMap<string, number>;
  /** What the plan's ground parts (roads, ditches) drew beside the model, for the debug hook. */
  readonly modelDrawn: Drawn;
  /** The model's meshes at each level, with their part runs, for picking a part in 3D (ADR 0055). */
  pick: { far: readonly LandmarkMesh[]; near: readonly LandmarkMesh[] };
}

/** One standing part as drawn: the floors the builders set (undefined if that builder drew none), and its footprint points. */
export interface StandingPart {
  readonly id: string;
  readonly procedural: number | undefined;
  readonly model: number | undefined;
  readonly at: [number, number][];
  /** How many of `at` are the footprint's corners (they come first). */
  readonly corners: number;
  /** A wall's height above its floor, world units (base and height, at the plan's vertical scale). */
  readonly rise: number;
  /** The floor each builder drew the part standing on, read off its mesh (the lowest wall top less `rise`); undefined if that builder drew none of it. */
  readonly drawn: { readonly procedural: number | undefined; readonly model: number | undefined };
}

/** The points a road's edges were laid on, from the procedural draw or from the ground parts drawn beside the model. */
export interface DrawnRoad {
  readonly id: string;
  readonly source: 'procedural' | 'model';
  readonly points: readonly [number, number, number][];
}

/** A mesh of a monument's model that is on screen now, for picking a part in 3D. */
export interface PickableModel {
  readonly feature: Feature;
  readonly level: Level;
  readonly meshes: readonly LandmarkMesh[];
}

interface Monument {
  readonly feature: Feature;
  readonly mesh: Mesh;
  /** The full-detail mesh, drawn instead of `mesh` when the camera is near. */
  readonly near: Mesh | undefined;
  readonly at: { readonly x: number; readonly z: number };
  readonly hearths: readonly WorldPoint[];
  readonly seed: number;
  /** The ground it was built on: the base ground with the terraces drawn in its first year (ADR 0056). */
  readonly ground: Ground;
  /** Where its roads and ditches lie: the mesh drawn once those terraces are; undefined if it has none. */
  readonly ribbon: Ground | undefined;
  /** What the procedural draw set, for the debug hook (ADR 0056). */
  readonly drawn: Drawn | undefined;
  /** Each standing part's floor as the procedural draw set it, world y: the model stands where its fallback does. */
  readonly seats: ReadonlyMap<string, number>;
  readonly model: ModelSlot | undefined;
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

/**
 * How near a corner, in world units (0.1m), a vertex counts as part of its wall when the walls are read off the mesh.
 * It must stay under the vicus thatch's eave offset from the corners (0.2m, `HALL_ROOF`), or read inside the corners.
 */
const TOP_RADIUS = 0.01;

const vector = (v: {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}): [number, number, number] => [v.x, v.y, v.z];

// The highest vertex of a part's near model at each corner point, over every mesh the part was merged into. A gate
// leaf hangs from the model on its hinge and turns, so its corners are not where the plan's are: its top is its highest vertex.
function modelTops(
  m: Monument,
  part: string,
  points: readonly (readonly [number, number])[],
): (number | undefined)[] | undefined {
  const runs = (m.model?.pick.near ?? []).flatMap((l) =>
    l.runs.filter((r) => r.id === part).map((run) => ({ l, run })),
  );
  if (runs.length === 0) return undefined;
  const tops: (number | undefined)[] = points.map(() => undefined);
  for (const { l, run } of runs) {
    const positions = l.mesh.getVerticesData(VertexBuffer.PositionKind);
    if (!positions) continue;
    const hung = l.mesh.parent !== null;
    const read = hung ? inWorld(l.mesh, positions) : positions;
    const origin = hung ? [0, 0, 0] : vector(l.mesh.position);
    const found = columnTops(
      read,
      run,
      [origin[0] ?? 0, origin[1] ?? 0, origin[2] ?? 0],
      points,
      hung ? Number.POSITIVE_INFINITY : TOP_RADIUS,
      hung ? 1 : l.mesh.scaling.y,
    );
    found.forEach((t, i) => {
      const best = tops[i];
      if (t !== undefined && (best === undefined || t > best)) tops[i] = t;
    });
  }
  return tops;
}

function inWorld(mesh: Mesh, positions: ArrayLike<number>): number[] {
  const matrix = mesh.computeWorldMatrix(true);
  const out: number[] = [];
  const v = new Vector3();
  for (let i = 0; i < positions.length; i += 3) {
    Vector3.TransformCoordinatesFromFloatsToRef(
      positions[i] ?? 0,
      positions[i + 1] ?? 0,
      positions[i + 2] ?? 0,
      matrix,
      v,
    );
    out.push(v.x, v.y, v.z);
  }
  return out;
}

function clearingOf(kind: Feature['kind']): number {
  return clearingMetres(kind) / WORLD.metresPerUnit;
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

function meshesOf(m: Monument): Mesh[] {
  return [m.mesh, ...(m.near ? [m.near] : []), ...(m.model?.far ?? []), ...(m.model?.near ?? [])];
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
  private readonly ribbons: Ribbon[] = [];
  private modelsOn: boolean;
  private readonly modelListeners: (() => void)[] = [];
  private readonly terraces: ReadonlyMap<FeatureId, readonly GroundEdit[]>;

  constructor(
    private readonly world: World,
    features: readonly Feature[],
    footprints: BuildingFootprints,
    railways: readonly MapLine[],
    roads: readonly MapLine[],
    trainModels: ReadonlyMap<RollingStock, LoadedModel>,
    private readonly landmarkModels: {
      readonly list: readonly LandmarkModel[];
      readonly base: string;
      readonly on: boolean;
      readonly materials: LandmarkMaterials;
    },
    timeline: Timeline,
  ) {
    this.modelsOn = landmarkModels.on;
    const scene = world.scene;
    this.ground = (x, z) => world.terrain.heightAt(toGrid({ x, z }));
    const onSurface: Ground = (x, z) => world.terrain.surfaceAt(x, z);
    const onRibbon: Ground = (x, z) => world.terrain.ribbonGroundAt(x, z);
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
    const ribbon = (
      name: string,
      lines: readonly MapLine[],
      widthFor: (kind: string) => number,
      colour: string,
      lift: number,
    ): Mesh => {
      const made = lineRibbons(scene, name, onGround(lines), onRibbon, widthFor, colour, lift, (x, z) =>
        world.terrain.inDetail(x, z),
      );
      this.ribbons.push(made);
      made.mesh.isVisible = false;
      return made.mesh;
    };
    this.roads = ribbon('roads', roads, (k) => (k === 'A' ? 1.6 : k === 'B' ? 1.1 : 0.8), '#b9b6ae', 0.3);
    this.streetLamps = new StreetLamps(scene, roads, this.ground);
    world.addLamp(this.streetLamps.material);
    world.addLamp(this.streetLamps.halos.material);
    const main = longestLine(railways);
    this.trainLine = main;
    const [mainOnGround] = main ? onGround([main]) : [];
    this.train = mainOnGround ? new Train(scene, mainOnGround, onRibbon, trainModels) : undefined;
    const started = performance.now();
    this.terraces = terracesByFeature(features, (g) => world.terrain.metresWith(g, []));
    console.info(
      `dewidebug terraces ${[...this.terraces].map(([id, e]) => `${id}=${String(e.length)}`).join(' ') || 'none'}`,
    );
    const covered = coveredFootprints(features, footprints);
    const visible = (order: Int32Array): Int32Array => order.filter((i) => !covered.has(i));
    console.info(`dewidebug features hide ${covered.size} OS footprints that are drawn as landmark models`);
    for (const f of features) {
      const { x, z } = toWorld(f.at);
      if (f.kind.type === 'railway') {
        const lines = sectionLines(railways, f.kind.section);
        this.rails.set(
          f.id,
          ribbon(`rail-${f.id}`, lines, () => 1.1, '#6d655c', 0.35),
        );
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
      const seed = Math.floor(hash2(x, z, 7) * 1e6);
      const builtOn = editsBuiltOn(f, features, timeline, this.terraces);
      const ground: Ground =
        builtOn.length > 0 ? (gx, gz) => world.terrain.surfaceWith(gx, gz, builtOn) : onSurface;
      const ribbonGround: Ground | undefined =
        builtOn.length > 0
          ? (gx, gz) => world.terrain.meshWith(gx, gz, builtOn, LOD_STEPS[0] ?? 4)
          : undefined;
      const built = buildFeature(scene, f.kind, seed, ground, x, z, ribbonGround);
      if (!built) continue;
      const seated = built.drawn?.floors ?? new Map<string, number>();
      if (f.kind.type === 'building') this.logSeats(f, ground, x, z, builtOn.length);
      const mat = scene.getMaterialByName('building-mat');
      for (const mesh of built.near ? [built.mesh, built.near] : [built.mesh]) {
        mesh.setEnabled(false);
        mesh.receiveShadows = true;
        if (mat) mesh.material = mat;
        if (built.casts) world.addCaster(mesh);
      }
      const entry = landmarkModels.list.find((e) => e.feature === f.id);
      this.monuments.set(f.id, {
        feature: f,
        mesh: built.mesh,
        near: built.near,
        at: { x, z },
        hearths: built.hearths,
        seed,
        ground,
        ribbon: ribbonGround,
        drawn: built.drawn,
        seats: seated,
        model: entry
          ? {
              entry,
              feature: f,
              state: 'idle',
              far: [],
              near: [],
              parts: [],
              floors: new Map(),
              modelDrawn: newDrawn(),
              pick: { far: [], near: [] },
            }
          : undefined,
        level: 'far',
        visible: false,
      });
    }
    world.terrain.onDrawnChange((areas) => {
      for (const r of this.ribbons) r.relay(areas);
      this.train?.relay(areas);
    });
    console.info(
      `dewidebug features built monuments=${this.monuments.size} towns=${this.towns.size} in ${Math.round(performance.now() - started)}ms`,
    );
  }

  placeTrainNear(x: number, z: number): boolean {
    return this.train?.placeNear(x, z) ?? false;
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
    this.world.terrain.setGroundEdits(editsDrawn(this.terraces, present));
    const active = new Map(present.map((p) => [p.feature.id, p]));
    for (const [id, m] of this.monuments) {
      const p = active.get(id)?.presence ?? 0;
      m.visible = p > 0.01;
      if (m.visible) {
        const rise = 0.05 + 0.95 * (1 - Math.pow(1 - p, 3));
        for (const mesh of meshesOf(m)) mesh.scaling.y = rise;
        if (m.model?.state === 'idle' && this.modelsOn) void this.loadModel(id, m, m.model);
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
    const modelled = this.modelsOn && m.model?.state === 'ready';
    const full = m.level === 'near' && (modelled || m.near !== undefined);
    m.mesh.setEnabled(m.visible && !modelled && !full);
    m.near?.setEnabled(m.visible && !modelled && full);
    for (const mesh of m.model?.far ?? []) mesh.setEnabled(m.visible && modelled && !full);
    for (const mesh of m.model?.near ?? []) mesh.setEnabled(m.visible && modelled && full);
  }

  /** Draws the monuments that have Blender models from them (true), or from the procedural plans (false, and at Low). */
  setModels(on: boolean): void {
    if (on === this.modelsOn) return;
    this.modelsOn = on;
    console.info(`dewidebug landmark models ${on ? 'on' : 'off'}`);
    for (const [id, m] of this.monuments) {
      if (on && m.visible && m.model?.state === 'idle') void this.loadModel(id, m, m.model);
      this.show(m);
    }
    this.world.refreshShadows();
    for (const fn of this.modelListeners) fn();
  }

  // Fetched the first time the monument is drawn, so nothing is added to the start; it swaps in once both levels arrive.
  private async loadModel(id: FeatureId, m: Monument, slot: ModelSlot): Promise<void> {
    slot.state = 'loading';
    const kind = slot.feature.kind;
    if (kind.type !== 'building') {
      slot.state = 'failed';
      return;
    }
    const scale = planWorldScale(kind.plan);
    const frame = {
      ox: m.at.x,
      oz: m.at.z,
      baseY: m.ground(m.at.x, m.at.z),
      across: scale.across,
      up: scale.up,
      ground: m.ground,
      seat: (part: string) => m.seats.get(part),
    };
    console.info(`dewidebug landmark ${id} loading ${slot.entry.near.file} and ${slot.entry.far.file}`);
    const load = (level: Level): Promise<LoadedLandmark | undefined> =>
      loadLandmark(
        this.world.scene,
        `${this.landmarkModels.base}${slot.entry[level].file}`,
        id,
        level,
        PROBE,
        frame,
      ).catch((err: unknown) => {
        console.warn(`dewidebug landmark ${id} ${level} failed to load: drawn procedurally`, err);
        return undefined;
      });
    const [far, near] = await Promise.all([load('far'), load('near')]);
    if (!far || !near) {
      for (const l of [...(far?.meshes ?? []), ...(near?.meshes ?? [])]) l.mesh.dispose();
      slot.state = 'failed';
      this.show(m);
      for (const fn of this.modelListeners) fn();
      return;
    }
    const groundPlan = { ...kind.plan, parts: kind.plan.parts.filter(liesOnGround) };
    const mat = this.world.scene.getMaterialByName('building-mat');
    const levelMeshes = (level: Level, loaded: LoadedLandmark): Mesh[] => {
      // A mesh with no triangles has no bounds, and a shadow caster without bounds blacks out the frame.
      const ground =
        groundPlan.parts.length > 0
          ? [
              buildPlan(
                this.world.scene,
                groundPlan,
                kind.condition,
                m.seed,
                m.ground,
                m.at.x,
                m.at.z,
                level,
                slot.modelDrawn,
                m.ribbon,
              ),
            ]
          : [];
      // Leaves hang from the first model mesh; a level of leaves alone has none, so they stand in the list themselves.
      const leaves = loaded.meshes.length ? [] : loaded.hinged.flatMap((h) => h.meshes.map((l) => l.mesh));
      const meshes = [...ground, ...loaded.meshes.map((l) => l.mesh), ...leaves];
      for (const mesh of meshes) mesh.setEnabled(false);
      for (const mesh of ground) {
        mesh.receiveShadows = true;
        if (mat) mesh.material = mat;
      }
      // Hinged leaves are children of the first model mesh, so they show and hide with it.
      for (const l of [...loaded.meshes, ...loaded.hinged.flatMap((h) => h.meshes)]) {
        l.mesh.receiveShadows = true;
        const surfaceMat = l.key === 'flat' ? mat : this.landmarkModels.materials.get(l.key);
        if (surfaceMat) l.mesh.material = surfaceMat;
      }
      for (const mesh of meshes) this.world.addCaster(mesh);
      return meshes;
    };
    slot.far = levelMeshes('far', far);
    slot.near = levelMeshes('near', near);
    slot.parts = near.parts;
    slot.floors = near.floors;
    const pickable = (l: LoadedLandmark): LandmarkMesh[] => [
      ...l.meshes,
      ...l.hinged.flatMap((h) => h.meshes),
    ];
    slot.pick = { far: pickable(far), near: pickable(near) };
    const rise = m.mesh.scaling.y;
    for (const mesh of [...slot.far, ...slot.near]) mesh.scaling.y = rise;
    slot.state = 'ready';
    this.show(m);
    this.world.refreshShadows();
    for (const fn of this.modelListeners) fn();
    console.info(
      `dewidebug landmark ${id} drawn from its model now (${m.level}, probe error near ${near.probeError.toFixed(3)}m far ${far.probeError.toFixed(3)}m)`,
    );
  }

  /** Where each monument with a Blender model is drawn from, for the debug overlay: `roman-fort-b=glb:near`. */
  models(): string {
    return [...this.monuments]
      .flatMap(([id, m]) => {
        if (!m.model) return [];
        const source = this.modelsOn && m.model.state === 'ready' ? 'glb' : 'procedural';
        const state = m.model.state === 'ready' || m.model.state === 'idle' ? '' : `(${m.model.state})`;
        return [`${id}=${source}:${m.level}${state}`];
      })
      .concat(this.modelsOn ? [`textures=${String(this.landmarkModels.materials.textureSize)}`] : [])
      .join(' ');
  }

  /** Whether a monument is drawn from its Blender model now (loaded, and models on), so a card can say what is on screen. */
  modelled(id: string): boolean {
    for (const [key, m] of this.monuments) if (key === id) return this.modelsOn && m.model?.state === 'ready';
    return false;
  }

  /** Calls `fn` whenever a monument starts or stops being drawn from its model. */
  onModelsChanged(fn: () => void): void {
    this.modelListeners.push(fn);
  }

  /** The model meshes on screen now, with their part runs, for picking a part in 3D; none at Low or from the plans. */
  pickables(): PickableModel[] {
    if (!this.modelsOn) return [];
    return [...this.monuments.values()].flatMap((m) => {
      const slot = m.model;
      if (slot?.state !== 'ready' || !m.visible) return [];
      const meshes = slot.pick[m.level].filter((l) => l.mesh.isEnabled(true));
      return meshes.length ? [{ feature: slot.feature, level: m.level, meshes }] : [];
    });
  }

  /**
   * Where each road of a monument's plan was laid: the ground its edges were set on, per draw, to read against
   * the mesh drawn there. These are the heights the builder used.
   */
  drawnRoads(id: string): DrawnRoad[] {
    const m = this.monumentNamed(id);
    if (!m) return [];
    const from = (source: DrawnRoad['source'], drawn: Drawn | undefined): DrawnRoad[] =>
      [...(drawn?.roads ?? [])].map(([road, points]) => ({ id: road, source, points }));
    return [...from('procedural', m.drawn), ...from('model', m.model?.modelDrawn)];
  }

  /**
   * Where each standing part of a monument was drawn standing, for the debug hook and the e2e test: the floor
   * the procedural draw set (world y), the floor its Blender model set once loaded, and the world points under
   * its footprint, to read against the mesh drawn there. These are what the builders used, not what the plan says.
   */
  standing(id: string): StandingPart[] {
    const m = this.monumentNamed(id);
    const f = m?.feature;
    if (!m || f?.kind.type !== 'building') return [];
    const plan = f.kind.plan;
    const { across } = planWorldScale(plan);
    const { up } = planWorldScale(plan);
    const drawnMesh = m.near ?? m.mesh;
    const proceduralPositions = drawnMesh.getVerticesData(VertexBuffer.PositionKind);
    return plan.parts.filter(standsOnGround).flatMap((part) => {
      if (!part.id) return [];
      const at = footprintSamples(part).map((p): [number, number] => {
        const [x, z] = rotate(p, plan.angle ?? 0);
        return [m.at.x + x * across, m.at.z + z * across];
      });
      const corners = footprint(part).length;
      const cornerPoints = at.slice(0, corners);
      const run = m.drawn?.runs.get(part.id);
      const rise = ((part.base ?? 0) + part.height) * up;
      const proceduralTops =
        run && proceduralPositions
          ? columnTops(
              proceduralPositions,
              run,
              vector(drawnMesh.position),
              cornerPoints,
              TOP_RADIUS,
              drawnMesh.scaling.y,
            )
          : undefined;
      const modelled = modelTops(m, part.id, cornerPoints);
      return [
        {
          id: part.id,
          procedural: m.seats.get(part.id),
          model: m.model?.floors.get(part.id),
          at,
          corners,
          rise,
          drawn: {
            procedural: proceduralTops && floorFromTops(proceduralTops, rise),
            model: modelled && floorFromTops(modelled, rise),
          },
        },
      ];
    });
  }

  // How deep each standing part's corners would be buried under the old rule (the floor at the part's own
  // point) and under the seating rule now, against the ground the monument is built on: the numbers behind ADR 0056.
  private logSeats(f: Feature, ground: Ground, x: number, z: number, terraces: number): void {
    if (f.kind.type !== 'building') return;
    const plan = f.kind.plan;
    const all = seats(plan, planGroundAt(plan, ground, x, z));
    if (all.length === 0) return;
    const metres = (world: number): number => world / heightToWorld(1);
    const before = Math.max(...all.map((s) => metres(s.highest - s.atPoint)));
    const after = Math.max(...all.map((s) => metres(s.highest - s.floor)));
    const step = Math.max(...all.map((s) => metres(s.floor - s.lowest)));
    const over = all.filter((s) => metres(s.highest - s.atPoint) > SEAT_TOLERANCE);
    console.info(
      `dewidebug seats ${f.id} parts=${String(all.length)} terraces=${String(terraces)} buried-at-one-point max=${before.toFixed(2)}m (${String(over.length)} over ${String(SEAT_TOLERANCE)}m) buried-now max=${after.toFixed(2)}m tallest-footing=${step.toFixed(2)}m (ground metres)`,
    );
    for (const s of over)
      console.info(
        `dewidebug seat ${f.id} ${s.id} would-be-buried=${metres(s.highest - s.atPoint).toFixed(2)}m footing=${metres(s.floor - s.lowest).toFixed(2)}m`,
      );
  }

  private monumentNamed(id: string): Monument | undefined {
    for (const [key, m] of this.monuments) if (key === id) return m;
    return undefined;
  }

  /** The part ids a monument's near model holds, once loaded; empty before. */
  modelParts(id: string): readonly string[] {
    return this.monumentNamed(id)?.model?.parts ?? [];
  }

  /** Swaps each detailed monument between its levels by how far the camera is; true if any swapped, so the shadows can be redrawn. */
  setViewer(eye: { readonly x: number; readonly y: number; readonly z: number }): boolean {
    let swapped = false;
    for (const [id, m] of this.monuments) {
      if (!m.near && !m.model) continue;
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
      .filter(([, m]) => m.near ?? m.model)
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
