import {
  Color3,
  Matrix,
  Mesh,
  StandardMaterial,
  Vector3,
  VertexBuffer,
  VertexData,
  type Scene,
} from './babylon.ts';
import type { GroundAt } from '../domain/camera-moves.ts';
import type { Feature } from '../domain/model.ts';
import { hiddenByGround, pickPart, runTriangles } from '../domain/partpick.ts';
import type { FeatureLayer } from './features.ts';
import type { World } from './scene.ts';

/** A part of a Blender model under the cursor (ADR 0055). */
export interface PartPick {
  readonly feature: Feature;
  readonly part: string;
  readonly distance: number;
}

// A pale veil over the part, the same at noon and at night: a highlight, not a colour that could read as a fact.
const VEIL = new Color3(1, 0.95, 0.8);
const VEIL_ALPHA = 0.07;
// Drawn a little in front of the part's own faces, so the veil never fights them for depth.
const VEIL_OFFSET = -2;

/**
 * Finds the part of a Blender model under a screen point, and veils it while it is hovered. Only models on screen
 * are searched (FeatureLayer.pickables), so the procedural fallback and Low graphics are never picked; a part
 * behind a hill is not found, because the ground is marched along the ray as far as the part.
 */
export class PartPicker {
  private readonly material: StandardMaterial;
  private veil: Mesh[] = [];
  private veiled = '';
  private readonly positions = new WeakMap<Mesh, ArrayLike<number>>();

  constructor(
    private readonly world: World,
    private readonly features: FeatureLayer,
    private readonly ground: GroundAt,
  ) {
    const mat = new StandardMaterial('part-veil-mat', world.scene);
    mat.disableLighting = true;
    mat.emissiveColor = VEIL;
    mat.diffuseColor = Color3.Black();
    mat.specularColor = Color3.Black();
    mat.alpha = VEIL_ALPHA;
    // A part is many overlapping layers; with a depth pre-pass only the nearest one blends, so the veil stays a veil.
    mat.needDepthPrePass = true;
    mat.zOffset = VEIL_OFFSET;
    // A lamp to the night dimming (World.dimSelfLit), so the veil does not fade after dark.
    world.addLamp(mat);
    this.material = mat;
  }

  private get scene(): Scene {
    return this.world.scene;
  }

  pick(x: number, y: number): PartPick | undefined {
    const ray = this.scene.createPickingRay(x, y, null, this.world.camera);
    let best: PartPick | undefined;
    for (const model of this.features.pickables())
      for (const lm of model.meshes) {
        const world = lm.mesh.getWorldMatrix();
        const inv = world.clone().invert();
        const o = Vector3.TransformCoordinates(ray.origin, inv);
        const d = Vector3.TransformNormal(ray.direction, inv);
        const hit = pickPart([o.x, o.y, o.z], [d.x, d.y, d.z], this.positionsOf(lm.mesh), lm.runs);
        if (!hit) continue;
        const at = Vector3.TransformCoordinates(o.add(d.scale(hit.distance)), world);
        const distance = Vector3.Distance(ray.origin, at);
        if (!best || distance < best.distance) best = { feature: model.feature, part: hit.id, distance };
      }
    if (!best) return undefined;
    if (hiddenByGround({ origin: ray.origin, direction: ray.direction }, this.ground, best.distance)) {
      console.info(`dewidebug part pick ${best.part} is behind the ground: not picked`);
      return undefined;
    }
    return best;
  }

  /** Veils the hovered part (or nothing), across every mesh of its model it was merged into. */
  highlight(hit: PartPick | undefined): void {
    const key = hit ? `${hit.feature.id}|${hit.part}` : '';
    if (key === this.veiled) return;
    for (const m of this.veil) m.dispose();
    this.veil = [];
    this.veiled = key;
    if (!hit) return;
    // One veil mesh for all of a part's triangles that share a transform, so the depth pre-pass sees every layer of the
    // part at once; one mesh per surface (as the model is merged) would each blend over the others.
    const groups: { readonly parent: Mesh; readonly positions: number[] }[] = [];
    for (const model of this.features.pickables()) {
      if (model.feature.id !== hit.feature.id) continue;
      for (const lm of model.meshes)
        for (const run of lm.runs) {
          if (run.id !== hit.part) continue;
          const matrix = lm.mesh.getWorldMatrix();
          const same = groups.find((g) => g.parent.getWorldMatrix().equals(matrix));
          const triangles = runTriangles(this.positionsOf(lm.mesh), run);
          if (same) for (const v of triangles) same.positions.push(v);
          else groups.push({ parent: lm.mesh, positions: triangles });
        }
    }
    for (const g of groups) {
      const data = new VertexData();
      data.positions = g.positions;
      data.indices = Array.from({ length: g.positions.length / 3 }, (_, i) => i);
      const normals: number[] = [];
      VertexData.ComputeNormals(g.positions, data.indices, normals);
      data.normals = normals;
      const veil = new Mesh(`part-veil-${hit.part}`, this.scene);
      data.applyToMesh(veil);
      veil.material = this.material;
      veil.isPickable = false;
      veil.parent = g.parent;
      this.veil.push(veil);
    }
    console.info(
      `dewidebug part hover ${hit.part} on ${hit.feature.id} veiled meshes=${String(this.veil.length)}`,
    );
  }

  /** The part veiled now, as `feature|part`, or '' for none: for tests and the debug overlay. */
  get hovered(): string {
    return this.veiled;
  }

  /** The centre of the part's box in world units, or undefined if it is not on screen: for tests and screenshots. */
  centreOf(feature: string, part: string): { x: number; y: number; z: number } | undefined {
    for (const model of this.features.pickables()) {
      if (model.feature.id !== feature) continue;
      for (const lm of model.meshes)
        for (const run of lm.runs) {
          if (run.id !== part) continue;
          const local = new Vector3(
            (run.min[0] + run.max[0]) / 2,
            (run.min[1] + run.max[1]) / 2,
            (run.min[2] + run.max[2]) / 2,
          );
          const c = Vector3.TransformCoordinates(local, lm.mesh.getWorldMatrix());
          return { x: c.x, y: c.y, z: c.z };
        }
    }
    return undefined;
  }

  /** A screen point over the part, found by projecting each of its triangles' centres and picking there: for tests. */
  screenPointOf(feature: string, part: string): { x: number; y: number } | undefined {
    const scene = this.scene;
    const engine = scene.getEngine();
    const width = engine.getRenderWidth() * engine.getHardwareScalingLevel();
    const height = engine.getRenderHeight() * engine.getHardwareScalingLevel();
    const view = scene.getTransformMatrix();
    for (const model of this.features.pickables()) {
      if (model.feature.id !== feature) continue;
      for (const lm of model.meshes)
        for (const run of lm.runs) {
          if (run.id !== part) continue;
          const tris = runTriangles(this.positionsOf(lm.mesh), run);
          const step = Math.max(1, Math.floor(tris.length / 9 / 40));
          for (let t = 0; t < tris.length / 9; t += step) {
            const mean = (a: number): number =>
              ((tris[t * 9 + a] ?? 0) + (tris[t * 9 + 3 + a] ?? 0) + (tris[t * 9 + 6 + a] ?? 0)) / 3;
            const world = Vector3.TransformCoordinates(
              new Vector3(mean(0), mean(1), mean(2)),
              lm.mesh.getWorldMatrix(),
            );
            const p = Vector3.Project(
              world,
              Matrix.Identity(),
              view,
              this.world.camera.viewport.toGlobal(width, height),
            );
            if (p.z < 0 || p.z > 1 || p.x < 0 || p.y < 0 || p.x > width || p.y > height) continue;
            if (this.pick(p.x, p.y)?.part === part) return { x: p.x, y: p.y };
          }
        }
    }
    return undefined;
  }

  private positionsOf(mesh: Mesh): ArrayLike<number> {
    const have = this.positions.get(mesh);
    if (have) return have;
    const data = mesh.getVerticesData(VertexBuffer.PositionKind) ?? [];
    this.positions.set(mesh, data);
    return data;
  }
}
