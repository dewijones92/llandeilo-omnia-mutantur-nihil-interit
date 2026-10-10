import { ImportMeshAsync, Matrix, Mesh, Vector3, VertexBuffer, VertexData, type Scene } from './babylon.ts';
import type { Level } from '../domain/lod.ts';
import type { Ground } from './buildings.ts';

/** Where a landmark's model goes in the world: its grid reference in world units, its ground there, and its setting's scale. */
export interface LandmarkFrame {
  readonly ox: number;
  readonly oz: number;
  readonly baseY: number;
  readonly across: number;
  readonly up: number;
  readonly ground: Ground;
}

export interface LoadedLandmark {
  /** Every part but the hinged ones, merged into one mesh in the building material; none if the level has no parts. */
  readonly mesh: Mesh | undefined;
  /** Each hinged part (a gate leaf), a child of `mesh` whose origin is its hinge post. */
  readonly hinged: readonly { readonly id: string; readonly mesh: Mesh }[];
  /** Part ids in the order their triangles were merged, with the first triangle of each: for picking later. */
  readonly parts: readonly { readonly id: string; readonly from: number }[];
  readonly probeError: number;
}

type Fit = { readonly kind: 'follow' } | { readonly kind: 'rigid'; readonly at: readonly [number, number] };

interface PartExtras {
  readonly part: string;
  readonly fit: Fit;
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
  const hinge: unknown = Reflect.get(extras, 'hinge');
  const hingeAt: unknown = hinge && typeof hinge === 'object' ? Reflect.get(hinge, 'at') : undefined;
  return { part, fit: parsedFit, ...(isPair(hingeAt) ? { hinge: { at: hingeAt } } : {}) };
}

// Babylon's glTF root turns a right-handed file half round to fit its left-handed scene; this turns the
// result back so x is east, y up and z north, in metres from the anchor. The probe proves it on every load.
const TO_EAST_UP_NORTH = Matrix.Scaling(-1, 1, -1);
const PROBE_LIMIT = 0.5;
const SHADE_FOOT = 0.8;

interface Buffers {
  readonly positions: number[];
  readonly normals: number[];
  readonly colors: number[];
}

/**
 * Loads one level of a landmark's model and fits it to the ground the app draws: a `follow` part (a bank)
 * puts each vertex on the ground below it, a `rigid` one (a tower) stands on the ground at its own point
 * and only its footings reach down to the ground. Returns undefined, and logs why, if anything is off.
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
  const result = await ImportMeshAsync(url, scene);
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
    const merged: Buffers = { positions: [], normals: [], colors: [] };
    const parts: { id: string; from: number }[] = [];
    const hinged: { id: string; at: readonly [number, number]; buffers: Buffers }[] = [];
    let skipped = 0;
    for (const m of result.meshes) {
      if (!(m instanceof Mesh) || m.getTotalVertices() === 0) continue;
      const extras = partExtras(m.metadata);
      if (!extras) {
        skipped++;
        continue;
      }
      const into: Buffers = extras.hinge ? { positions: [], normals: [], colors: [] } : merged;
      if (extras.hinge) hinged.push({ id: extras.part, at: extras.hinge.at, buffers: into });
      else parts.push({ id: extras.part, from: merged.positions.length / 9 });
      appendFitted(m, extras, frame, into, extras.hinge?.at);
    }
    if (skipped)
      console.warn(
        `dewidebug landmark ${feature} ${level} skipped ${String(skipped)} meshes with no part extras`,
      );
    // An empty mesh has no bounds, and a shadow caster without bounds turns the whole frame black.
    if (merged.positions.length === 0 && hinged.length === 0) {
      console.info(`dewidebug landmark ${feature} ${level} has no parts at this level: nothing to draw`);
      return { mesh: undefined, hinged: [], parts: [], probeError };
    }
    const mesh = toMesh(scene, `landmark-${feature}-${level}`, merged);
    mesh.position = new Vector3(frame.ox, frame.baseY, frame.oz);
    mesh.metadata = { parts };
    const leaves = hinged.map((h) => {
      const leaf = toMesh(scene, `landmark-${feature}-${level}-${h.id}`, h.buffers);
      leaf.parent = mesh;
      leaf.position = new Vector3(h.at[0] * frame.across, 0, h.at[1] * frame.across);
      leaf.metadata = { part: h.id };
      return { id: h.id, mesh: leaf };
    });
    console.info(
      `dewidebug landmark ${feature} ${level} loaded parts=${String(parts.length + leaves.length)} hinged=${String(leaves.length)} triangles=${String((merged.positions.length + leaves.reduce((n, l) => n + l.mesh.getTotalVertices() * 3, 0)) / 9)} in ${String(Math.round(performance.now() - started))}ms`,
    );
    return { mesh, hinged: leaves, parts, probeError };
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
): void {
  const positions = m.getVerticesData(VertexBuffer.PositionKind);
  const colors = m.getVerticesData(VertexBuffer.ColorKind);
  const indices = m.getIndices();
  if (!positions || !indices) return;
  const world = m.getWorldMatrix().multiply(TO_EAST_UP_NORTH);
  const { across, up, ground, ox, oz, baseY } = frame;
  const rigid = extras.fit.kind === 'rigid' ? extras.fit.at : undefined;
  const standOn = rigid ? ground(ox + rigid[0] * across, oz + rigid[1] * across) : 0;
  const hx = hinge ? hinge[0] * across : 0;
  const hz = hinge ? hinge[1] * across : 0;
  const placed: number[] = [];
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
    heights.push(v.y);
  }
  // The same darkening towards the foot that the procedural builder gives every part (Sculpt's band).
  const top = heights.reduce((a, b) => Math.max(a, b), 1e-6);
  const shade = (k: number): number =>
    SHADE_FOOT + (1 - SHADE_FOOT) * Math.min(1, Math.max(0, (heights[k] ?? 0) / top));
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
    for (const k of corners) {
      into.positions.push(placed[k * 3] ?? 0, placed[k * 3 + 1] ?? 0, placed[k * 3 + 2] ?? 0);
      into.normals.push(nx, ny, nz);
      const s = shade(k);
      into.colors.push(
        (colors?.[k * 4] ?? 1) * s,
        (colors?.[k * 4 + 1] ?? 1) * s,
        (colors?.[k * 4 + 2] ?? 1) * s,
        1,
      );
    }
  }
}

function toMesh(scene: Scene, name: string, b: Buffers): Mesh {
  const mesh = new Mesh(name, scene);
  const data = new VertexData();
  data.positions = b.positions;
  data.normals = b.normals;
  data.colors = b.colors;
  data.indices = Array.from({ length: b.positions.length / 3 }, (_, i) => i);
  data.applyToMesh(mesh);
  return mesh;
}
