// Reading and writing the binary glTF container, and the few fields of its JSON the pipeline and its tests use.

export interface GlbNode {
  readonly name?: string;
  readonly mesh?: number;
  readonly children?: readonly number[];
  readonly translation?: readonly number[];
  readonly rotation?: readonly number[];
  readonly scale?: readonly number[];
  readonly matrix?: readonly number[];
  extras?: Record<string, unknown>;
}

export interface GlbJson {
  readonly asset: { readonly version: string; generator?: string };
  readonly nodes: GlbNode[];
  readonly meshes?: readonly {
    readonly primitives: readonly {
      readonly indices?: number;
      readonly attributes?: { readonly POSITION?: number };
    }[];
  }[];
  readonly accessors?: readonly {
    readonly count: number;
    readonly min?: readonly number[];
    readonly max?: readonly number[];
  }[];
  readonly scenes?: { extras?: Record<string, unknown> }[];
  readonly [key: string]: unknown;
}

export interface Glb {
  readonly json: GlbJson;
  readonly bin: Uint8Array;
}

const MAGIC = 0x46546c67;
const JSON_CHUNK = 0x4e4f534a;
const BIN_CHUNK = 0x004e4942;

function isGlbJson(v: unknown): v is GlbJson {
  return (
    typeof v === 'object' &&
    v !== null &&
    'asset' in v &&
    'nodes' in v &&
    Array.isArray(Reflect.get(v, 'nodes'))
  );
}

export function readGlb(bytes: Uint8Array): Glb {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (view.getUint32(0, true) !== MAGIC) throw new Error('not a glb');
  const jsonLength = view.getUint32(12, true);
  if (view.getUint32(16, true) !== JSON_CHUNK) throw new Error('glb has no JSON chunk first');
  const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes.subarray(20, 20 + jsonLength)));
  if (!isGlbJson(parsed)) throw new Error('glb JSON has no asset or nodes');
  const at = 20 + jsonLength;
  if (at >= bytes.byteLength) return { json: parsed, bin: new Uint8Array(0) };
  const binLength = view.getUint32(at, true);
  if (view.getUint32(at + 4, true) !== BIN_CHUNK) throw new Error('glb second chunk is not BIN');
  return { json: parsed, bin: bytes.subarray(at + 8, at + 8 + binLength) };
}

const pad = (n: number): number => (4 - (n % 4)) % 4;

export function writeGlb(glb: Glb): Uint8Array {
  const text = new TextEncoder().encode(JSON.stringify(glb.json));
  const jsonPad = pad(text.byteLength);
  const binPad = pad(glb.bin.byteLength);
  const total =
    12 + 8 + text.byteLength + jsonPad + (glb.bin.byteLength ? 8 + glb.bin.byteLength + binPad : 0);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  view.setUint32(0, MAGIC, true);
  view.setUint32(4, 2, true);
  view.setUint32(8, total, true);
  view.setUint32(12, text.byteLength + jsonPad, true);
  view.setUint32(16, JSON_CHUNK, true);
  out.set(text, 20);
  out.fill(0x20, 20 + text.byteLength, 20 + text.byteLength + jsonPad);
  if (glb.bin.byteLength) {
    const at = 20 + text.byteLength + jsonPad;
    view.setUint32(at, glb.bin.byteLength + binPad, true);
    view.setUint32(at + 4, BIN_CHUNK, true);
    out.set(glb.bin, at + 8);
  }
  return out;
}

/** Triangles and draw calls (primitives) in the file: what the budgets count. */
export function glbCounts(json: GlbJson): { readonly triangles: number; readonly drawCalls: number } {
  let triangles = 0;
  let drawCalls = 0;
  for (const node of json.nodes) {
    if (node.mesh === undefined) continue;
    for (const p of json.meshes?.[node.mesh]?.primitives ?? []) {
      drawCalls++;
      if (p.indices !== undefined) triangles += (json.accessors?.[p.indices]?.count ?? 0) / 3;
    }
  }
  return { triangles, drawCalls };
}

type Mat = readonly number[];

const IDENTITY: Mat = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function mul(a: Mat, b: Mat): Mat {
  const out: number[] = [];
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += (a[k * 4 + r] ?? 0) * (b[c * 4 + k] ?? 0);
      out.push(sum);
    }
  return out;
}

/** A node's own transform as a column-major matrix: its `matrix`, or translation, rotation (a quaternion) and scale. */
function localMatrix(n: GlbNode): Mat {
  if (n.matrix) return n.matrix;
  const [x = 0, y = 0, z = 0, w = 1] = n.rotation ?? [];
  const [sx = 1, sy = 1, sz = 1] = n.scale ?? [];
  const [tx = 0, ty = 0, tz = 0] = n.translation ?? [];
  return [
    (1 - 2 * (y * y + z * z)) * sx,
    2 * (x * y + z * w) * sx,
    2 * (x * z - y * w) * sx,
    0,
    2 * (x * y - z * w) * sy,
    (1 - 2 * (x * x + z * z)) * sy,
    2 * (y * z + x * w) * sy,
    0,
    2 * (x * z + y * w) * sz,
    2 * (y * z - x * w) * sz,
    (1 - 2 * (x * x + y * y)) * sz,
    0,
    tx,
    ty,
    tz,
    1,
  ];
}

/** A node's transform in the scene: its own, then each ancestor's. */
export function worldMatrix(json: GlbJson, node: GlbNode): Mat {
  let m = localMatrix(node);
  let at: GlbNode = node;
  for (let depth = 0; depth < 64; depth++) {
    const here = at;
    const parent = json.nodes.find((p) => p.children?.some((c) => json.nodes[c] === here));
    if (!parent) return m;
    m = mul(localMatrix(parent), m);
    at = parent;
  }
  throw new Error('glb node tree is deeper than 64 levels or loops');
}

/** True if the node and every ancestor sit at the origin, unturned and unscaled: its vertices are already scene positions. */
export function hasIdentityTransform(json: GlbJson, node: GlbNode): boolean {
  return worldMatrix(json, node).every((v, i) => Math.abs(v - (IDENTITY[i] ?? 0)) < 1e-6);
}

/** The box a node's mesh fills in the scene, in glTF axes (x east, y up, z south): its position accessors' boxes carried through the node's world matrix; undefined for a node with no mesh. */
export function nodeBounds(
  json: GlbJson,
  node: GlbNode,
):
  | { readonly min: readonly [number, number, number]; readonly max: readonly [number, number, number] }
  | undefined {
  if (node.mesh === undefined) return undefined;
  const world = worldMatrix(json, node);
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (const p of json.meshes?.[node.mesh]?.primitives ?? []) {
    const a = p.attributes?.POSITION === undefined ? undefined : json.accessors?.[p.attributes.POSITION];
    if (!a?.min || !a.max) continue;
    for (let corner = 0; corner < 8; corner++) {
      const local = [0, 1, 2].map((i) => ((corner >> i) & 1 ? a.max?.[i] : a.min?.[i]) ?? 0);
      for (let i = 0; i < 3; i++) {
        const v =
          (world[i] ?? 0) * (local[0] ?? 0) +
          (world[4 + i] ?? 0) * (local[1] ?? 0) +
          (world[8 + i] ?? 0) * (local[2] ?? 0) +
          (world[12 + i] ?? 0);
        min[i] = Math.min(min[i] ?? Infinity, v);
        max[i] = Math.max(max[i] ?? -Infinity, v);
      }
    }
  }
  return Number.isFinite(min[0]) ? { min, max } : undefined;
}
