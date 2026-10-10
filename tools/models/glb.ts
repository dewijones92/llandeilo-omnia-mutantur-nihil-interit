// Reading and writing the binary glTF container, and the few fields of its JSON the pipeline and its tests use.

export interface GlbNode {
  readonly name?: string;
  readonly mesh?: number;
  readonly children?: readonly number[];
  readonly translation?: readonly number[];
  readonly rotation?: readonly number[];
  extras?: Record<string, unknown>;
}

export interface GlbJson {
  readonly asset: { readonly version: string; generator?: string };
  readonly nodes: GlbNode[];
  readonly meshes?: readonly { readonly primitives: readonly { readonly indices?: number }[] }[];
  readonly accessors?: readonly { readonly count: number }[];
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
