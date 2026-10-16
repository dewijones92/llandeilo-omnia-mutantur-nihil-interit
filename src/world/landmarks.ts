import { ImportMeshAsync, Matrix, Mesh, Vector3, VertexBuffer, VertexData, type Scene } from './babylon.ts';
import type { Level } from '../domain/lod.ts';
import { partRuns, type PartRun } from '../domain/partpick.ts';
import { isTextured, type TexturedSurface } from '../domain/surfaces.ts';
import { DETAIL_MEAN, grainOf, triangleUv, type V3 } from '../domain/texturing.ts';
import type { Ground } from './buildings.ts';
import { SHADE_BOTTOM } from './sculpt.ts';

/** Where a landmark's model goes in the world: its grid reference in world units, its ground there, and its setting's scale. */
export interface LandmarkFrame {
  readonly ox: number;
  readonly oz: number;
  readonly baseY: number;
  readonly across: number;
  readonly up: number;
  readonly ground: Ground;
  /** Where a rigid part's floor stands, world y: the plan's seating rule for that part (ADR 0056). */
  readonly seat: (part: string) => number | undefined;
}

/** What a mesh is drawn in: a textured surface's own material, or the shared flat building material (ADR 0055). */
export type DrawKey = TexturedSurface | 'flat';

/** One mesh of a loaded level, with the runs of triangles each part was merged from, for picking a part. */
export interface LandmarkMesh {
  readonly mesh: Mesh;
  readonly key: DrawKey;
  readonly runs: readonly PartRun[];
}

export interface LoadedLandmark {
  /** Every part but the hinged ones, merged into one mesh per draw key; empty if the level has no parts. */
  readonly meshes: readonly LandmarkMesh[];
  /** Each hinged part (a gate leaf), its meshes children of the first merged mesh, their origin on its hinge post. */
  readonly hinged: readonly { readonly id: string; readonly meshes: readonly LandmarkMesh[] }[];
  /** Part ids in the order they were merged. */
  readonly parts: readonly string[];
  readonly probeError: number;
}

type Fit = { readonly kind: 'follow' } | { readonly kind: 'rigid'; readonly at: readonly [number, number] };

interface PartExtras {
  readonly part: string;
  readonly fit: Fit;
  readonly surfaces: readonly string[];
  readonly hinge?: { readonly at: readonly [number, number] };
}

const isPair = (v: unknown): v is readonly [number, number] =>
  Array.isArray(v) && v.length === 2 && typeof v[0] === 'number' && typeof v[1] === 'number';

// The glTF extras are untrusted data from a file: checked here, trusted inside.
function partExtras(metadata: unknown): PartExtras | undefined {
  if (!metadata || typeof metadata !== 'object') return undefined;
  const gltf: unknown = Reflect.get(metadata, 'gltf');
  const extras: unknown = gltf && typeof gltf === 'object' ? Reflect.get(gltf, 'extras') : undefined;
  if (!extras || typeof extras !== 'object') return undefined;
  const part: unknown = Reflect.get(extras, 'part');
  const fit: unknown = Reflect.get(extras, 'fit');
  if (typeof part !== 'string' || !fit || typeof fit !== 'object') return undefined;
  const kind: unknown = Reflect.get(fit, 'kind');
  const at: unknown = Reflect.get(fit, 'at');
  const parsedFit: Fit | undefined =
    kind === 'follow'
      ? { kind: 'follow' }
      : kind === 'rigid' && isPair(at)
        ? { kind: 'rigid', at }
        : undefined;
  if (!parsedFit) return undefined;
  const listed: unknown = Reflect.get(extras, 'surfaces');
  const surfaces = Array.isArray(listed) ? listed.filter((s): s is string => typeof s === 'string') : [];
  const hinge: unknown = Reflect.get(extras, 'hinge');
  const hingeAt: unknown = hinge && typeof hinge === 'object' ? Reflect.get(hinge, 'at') : undefined;
  return { part, fit: parsedFit, surfaces, ...(isPair(hingeAt) ? { hinge: { at: hingeAt } } : {}) };
}

// A part with more than one surface is loaded as one Babylon mesh per glTF primitive, named `<node>_primitive<i>`,
// under a node that holds the extras; a part with one surface is one mesh holding them itself.
function primitiveOf(m: Mesh): { readonly extras: PartExtras | undefined; readonly index: number } {
  const own = partExtras(m.metadata);
  if (own) return { extras: own, index: 0 };
  const index = Number(/_primitive(\d+)$/.exec(m.name)?.[1] ?? 0);
  return { extras: partExtras(m.parent?.metadata), index };
}

// Babylon's glTF root turns a right-handed file half round to fit its left-handed scene; this turns the
// result back so x is east, y up and z north, in metres from the anchor. The probe proves it on every load.
const TO_EAST_UP_NORTH = Matrix.Scaling(-1, 1, -1);
const PROBE_LIMIT = 0.5;

interface Buffers {
  readonly positions: number[];
  readonly normals: number[];
  readonly colors: number[];
  readonly uvs: number[];
  readonly starts: { id: string; from: number }[];
}

const buffers = (): Buffers => ({ positions: [], normals: [], colors: [], uvs: [], starts: [] });

/**
 * Loads one level of a landmark's model and fits it to the ground the app draws: a `follow` part (a bank)
 * puts each vertex on the ground below it, a `rigid` one (a tower) stands level at the seat the plan gives
 * it, the highest ground under its footprint (ADR 0056), and only its footings reach down to the ground.
 * Near parts are split by surface, each with texture coordinates in metres; the far level is drawn flat.
 * Returns undefined, and logs why, if anything is off.
 */
export async function loadLandmark(
  scene: Scene,
  url: string,
  feature: string,
  level: Level,
  probeAt: readonly [number, number],
  frame: LandmarkFrame,
): Promise<LoadedLandmark | undefined> {
  const started = performance.now();
  // The app supplies the materials, so the loader makes none (a default one per load would be left behind).
  const result = await ImportMeshAsync(url, scene, { pluginOptions: { gltf: { skipMaterials: true } } });
  const dispose = (): void => {
    for (const m of result.meshes) if (!m.isDisposed()) m.dispose();
    for (const n of result.transformNodes) n.dispose();
  };
  try {
    for (const m of result.meshes) m.computeWorldMatrix(true);
    for (const n of result.transformNodes) n.computeWorldMatrix(true);
    const probe = result.transformNodes.find((n) => n.name.startsWith('_probe'));
    if (!probe) {
      console.warn(`dewidebug landmark ${feature} ${level} has no probe: drawn procedurally`);
      return undefined;
    }
    const raw = probe.getAbsolutePosition();
    const p = Vector3.TransformCoordinates(raw, TO_EAST_UP_NORTH);
    const probeError = Math.hypot(p.x - probeAt[0], p.y, p.z - probeAt[1]);
    console.info(
      `dewidebug landmark ${feature} ${level} probe raw=${raw.x.toFixed(2)},${raw.y.toFixed(2)},${raw.z.toFixed(2)} east-up-north=${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)} error=${probeError.toFixed(3)}m`,
    );
    if (probeError > PROBE_LIMIT) {
      console.warn(
        `dewidebug landmark ${feature} ${level} probe is ${probeError.toFixed(2)}m out: drawn procedurally`,
      );
      return undefined;
    }
    const merged = new Map<DrawKey, Buffers>();
    const hinged = new Map<string, { at: readonly [number, number]; groups: Map<DrawKey, Buffers> }>();
    const order: string[] = [];
    let skipped = 0;
    let unknownSurface = 0;
    for (const m of result.meshes) {
      if (!(m instanceof Mesh) || m.getTotalVertices() === 0) continue;
      const { extras, index } = primitiveOf(m);
      if (!extras) {
        skipped++;
        continue;
      }
      const surface = extras.surfaces[index];
      if (level === 'near' && surface === undefined) unknownSurface++;
      const key: DrawKey =
        level === 'near' && surface !== undefined && isTextured(surface) ? surface : 'flat';
      let groups = merged;
      if (extras.hinge) {
        const h = hinged.get(extras.part) ?? { at: extras.hinge.at, groups: new Map<DrawKey, Buffers>() };
        hinged.set(extras.part, h);
        groups = h.groups;
      }
      const into = groups.get(key) ?? buffers();
      groups.set(key, into);
      if (!order.includes(extras.part)) order.push(extras.part);
      into.starts.push({ id: extras.part, from: into.positions.length / 9 });
      appendFitted(m, extras, frame, into, extras.hinge?.at, key !== 'flat');
    }
    if (skipped)
      console.warn(
        `dewidebug landmark ${feature} ${level} skipped ${String(skipped)} meshes with no part extras`,
      );
    if (unknownSurface)
      console.warn(
        `dewidebug landmark ${feature} ${level} has ${String(unknownSurface)} primitives with no surface: drawn flat`,
      );
    // An empty mesh has no bounds, and a shadow caster without bounds turns the whole frame black.
    if (merged.size === 0 && hinged.size === 0) {
      console.info(`dewidebug landmark ${feature} ${level} has no parts at this level: nothing to draw`);
      return { meshes: [], hinged: [], parts: [], probeError };
    }
    const meshes = [...merged].map(([key, b]) => {
      const mesh = toMesh(scene, `landmark-${feature}-${level}-${key}`, b);
      mesh.position = new Vector3(frame.ox, frame.baseY, frame.oz);
      return { mesh, key, runs: partRuns(b.positions, b.starts) };
    });
    const root = meshes[0]?.mesh;
    const leaves = [...hinged].map(([id, h]) => ({
      id,
      meshes: [...h.groups].map(([key, b]) => {
        const leaf = toMesh(scene, `landmark-${feature}-${level}-${id}-${key}`, b);
        leaf.position = new Vector3(h.at[0] * frame.across, 0, h.at[1] * frame.across);
        if (root) leaf.parent = root;
        else leaf.position.addInPlaceFromFloats(frame.ox, frame.baseY, frame.oz);
        return { mesh: leaf, key, runs: partRuns(b.positions, b.starts) };
      }),
    }));
    const all = [...meshes, ...leaves.flatMap((l) => l.meshes)];
    const triangles = all.reduce((n, l) => n + l.mesh.getTotalVertices() / 3, 0);
    console.info(
      `dewidebug landmark ${feature} ${level} loaded parts=${String(order.length)} hinged=${String(leaves.length)} meshes=${all.map((l) => l.key).join(',')} triangles=${String(triangles)} in ${String(Math.round(performance.now() - started))}ms`,
    );
    return { meshes, hinged: leaves, parts: order, probeError };
  } finally {
    dispose();
  }
}

function appendFitted(
  m: Mesh,
  extras: PartExtras,
  frame: LandmarkFrame,
  into: Buffers,
  hinge: readonly [number, number] | undefined,
  textured: boolean,
): void {
  const positions = m.getVerticesData(VertexBuffer.PositionKind);
  const colors = m.getVerticesData(VertexBuffer.ColorKind);
  const indices = m.getIndices();
  if (!positions || !indices) return;
  const world = m.getWorldMatrix().multiply(TO_EAST_UP_NORTH);
  const { across, up, ground, ox, oz, baseY } = frame;
  const rigid = extras.fit.kind === 'rigid' ? extras.fit.at : undefined;
  const standOn = rigid
    ? (frame.seat(extras.part) ?? ground(ox + rigid[0] * across, oz + rigid[1] * across))
    : 0;
  const hx = hinge ? hinge[0] * across : 0;
  const hz = hinge ? hinge[1] * across : 0;
  const placed: number[] = [];
  const model: V3[] = [];
  const heights: number[] = [];
  const v = new Vector3();
  for (let i = 0; i < positions.length; i += 3) {
    Vector3.TransformCoordinatesFromFloatsToRef(
      positions[i] ?? 0,
      positions[i + 1] ?? 0,
      positions[i + 2] ?? 0,
      world,
      v,
    );
    const x = v.x * across;
    const z = v.z * across;
    const below = rigid
      ? v.y < 0
        ? Math.min(standOn, ground(ox + x, oz + z))
        : standOn
      : ground(ox + x, oz + z);
    placed.push(x - hx, below - baseY + v.y * up, z - hz);
    model.push([v.x, v.y, v.z]);
    heights.push(v.y);
  }
  // The same darkening towards the foot that the procedural builder gives every part (Sculpt's band).
  const top = heights.reduce((a, b) => Math.max(a, b), 1e-6);
  const shade = (k: number): number =>
    SHADE_BOTTOM + (1 - SHADE_BOTTOM) * Math.min(1, Math.max(0, (heights[k] ?? 0) / top));
  for (let t = 0; t + 2 < indices.length; t += 3) {
    const corners = [indices[t] ?? 0, indices[t + 1] ?? 0, indices[t + 2] ?? 0];
    const [a, b, c] = corners.map((k) => [
      placed[k * 3] ?? 0,
      placed[k * 3 + 1] ?? 0,
      placed[k * 3 + 2] ?? 0,
    ]);
    if (!a || !b || !c) continue;
    const ux = (b[0] ?? 0) - (a[0] ?? 0);
    const uy = (b[1] ?? 0) - (a[1] ?? 0);
    const uz = (b[2] ?? 0) - (a[2] ?? 0);
    const wx = (c[0] ?? 0) - (a[0] ?? 0);
    const wy = (c[1] ?? 0) - (a[1] ?? 0);
    const wz = (c[2] ?? 0) - (a[2] ?? 0);
    // The file's frame to this one is a mirror, so a face that was anticlockwise from outside is now clockwise
    // from outside, which is the front face here (as in Sculpt), and its outward normal is the reversed cross product.
    let nx = uz * wy - uy * wz;
    let ny = ux * wz - uz * wx;
    let nz = uy * wx - ux * wy;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    // Texture coordinates come from the model's own metres, before it is fitted to the ground (ADR 0055).
    const origin: V3 = [0, 0, 0];
    const [ma, mb, mc] = corners.map((k) => model[k] ?? origin);
    const uv =
      textured && ma && mb && mc
        ? triangleUv(ma, mb, mc, grainOf(colors?.[(corners[0] ?? 0) * 4 + 3] ?? 0))
        : [];
    corners.forEach((k, i) => {
      into.positions.push(placed[k * 3] ?? 0, placed[k * 3 + 1] ?? 0, placed[k * 3 + 2] ?? 0);
      into.normals.push(nx, ny, nz);
      const s = shade(k) / (textured ? DETAIL_MEAN : 1);
      into.colors.push(
        (colors?.[k * 4] ?? 1) * s,
        (colors?.[k * 4 + 1] ?? 1) * s,
        (colors?.[k * 4 + 2] ?? 1) * s,
        1,
      );
      into.uvs.push(uv[i * 2] ?? 0, uv[i * 2 + 1] ?? 0);
    });
  }
}

function toMesh(scene: Scene, name: string, b: Buffers): Mesh {
  const mesh = new Mesh(name, scene);
  const data = new VertexData();
  data.positions = b.positions;
  data.normals = b.normals;
  data.colors = b.colors;
  data.uvs = b.uvs;
  data.indices = Array.from({ length: b.positions.length / 3 }, (_, i) => i);
  data.applyToMesh(mesh);
  return mesh;
}
