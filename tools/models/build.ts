// npm run models [-- <feature>...] [--force] [--preview]: builds the Blender landmark models whose inputs changed (ADR 0053).
// Writes each feature's build sheet, runs headless Blender once per landmark, finishes each glb (provenance
// in the extras, the probe checked) and writes the index the app loads them from.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  modelFile,
  type BuildSheet,
  type LandmarkModel,
  type ModelLevel,
} from '../../src/domain/buildsheet.ts';
import {
  drawGroups,
  glbCounts,
  readGlb,
  withByteColours,
  writeGlb,
  type Glb,
  type GlbJson,
  type GlbNode,
} from './glb.ts';
import { inputHash, ROOT, SCRIPT, sheets } from './sheets.ts';

const BUILD = join(ROOT, 'build/models');
const INDEX = join(ROOT, 'src/content/generated/models.ts');
const LEVELS = ['near', 'far'] as const;
type LevelName = (typeof LEVELS)[number];

const args = process.argv.slice(2);
const force = args.includes('--force');
const preview = args.includes('--preview');
const only = args.filter((a) => !a.startsWith('--'));

const published = (feature: string, level: LevelName): string =>
  join(ROOT, 'public', modelFile(feature, level));

function blenderVersion(): string | undefined {
  try {
    const out = execFileSync('blender', ['--version'], { encoding: 'utf8' });
    return /^Blender \d.*$/m.exec(out)?.[0].trim();
  } catch (err: unknown) {
    console.warn(
      `dewidebug models could not run blender --version: ${err instanceof Error ? err.message : String(err)}`,
    );
    return undefined;
  }
}

function builtWith(feature: string): string | undefined {
  const file = published(feature, 'near');
  if (!existsSync(file)) return undefined;
  const v = readGlb(readFileSync(file)).json.scenes?.[0]?.extras?.['blenderVersion'];
  return typeof v === 'string' ? v : undefined;
}

function builtHash(feature: string): string | undefined {
  const file = published(feature, 'near');
  if (!existsSync(file)) return undefined;
  const hash = readGlb(readFileSync(file)).json.scenes?.[0]?.extras?.['inputHash'];
  return typeof hash === 'string' ? hash : undefined;
}

const all = sheets();
const inScope = all.filter((s) => only.length === 0 || only.includes(s.feature));
const staleByInputs = inScope.filter((s) => force || builtHash(s.feature) !== inputHash(s));
// With nothing stale by its inputs a machine without Blender is fine: only the check for a model made by another version is skipped.
const found = blenderVersion();
if (staleByInputs.length > 0 && found === undefined)
  throw new Error('blender is needed to build and could not be run');
const blenderNow = found ?? 'unknown';
const stale =
  found === undefined
    ? []
    : inScope.filter((s) => staleByInputs.includes(s) || builtWith(s.feature) !== found);
const landmarks = [...new Set(stale.map((s) => s.landmark))];
console.log(
  `dewidebug models ${blenderNow}; ${String(all.length)} features, ${String(stale.length)} to build: ${stale.map((s) => s.feature).join(', ') || 'none'}`,
);

mkdirSync(BUILD, { recursive: true });
mkdirSync(join(ROOT, 'public/models/landmarks'), { recursive: true });
for (const landmark of landmarks) {
  const group = all.filter((s) => s.landmark === landmark);
  const files = group.map((s) => {
    const file = join(BUILD, `${s.feature}.sheet.json`);
    writeFileSync(file, `${JSON.stringify(s, null, 2)}\n`);
    return file;
  });
  const started = Date.now();
  execFileSync(
    'blender',
    ['-b', '--factory-startup', '-P', SCRIPT, '--', BUILD, ...files, ...(preview ? ['--preview'] : [])],
    {
      stdio: ['ignore', 'inherit', 'inherit'],
    },
  );
  console.log(
    `dewidebug models blender built ${landmark} in ${String(Math.round((Date.now() - started) / 1000))}s`,
  );
  for (const s of group) for (const level of LEVELS) finish(s, level);
}
writeIndex(all);

function finish(sheet: BuildSheet, level: LevelName): void {
  const raw = readGlb(readFileSync(join(BUILD, `${sheet.feature}.${level}.raw.glb`)));
  const byId = new Map(sheet.parts.map((p) => [p.id, p]));
  const seen = new Set<string>();
  let probe = false;
  for (const node of raw.json.nodes) {
    const part = node.extras?.['part'];
    if (node.name?.startsWith('_probe')) {
      const t = node.translation ?? [0, 0, 0];
      // glTF is +Y up with -Z north: the probe at [east, north] must read [east, 0, -north].
      const off = Math.hypot((t[0] ?? 0) - sheet.probe[0], t[1] ?? 0, (t[2] ?? 0) + sheet.probe[1]);
      if (off > 1e-3)
        throw new Error(
          `${sheet.feature} ${level}: probe at ${JSON.stringify(t)}, ${off.toFixed(3)}m from where the sheet put it`,
        );
      node.extras = { probe: sheet.probe };
      probe = true;
      continue;
    }
    if (typeof part !== 'string') {
      delete node.extras;
      continue;
    }
    const p = byId.get(part);
    if (!p)
      throw new Error(
        `${sheet.feature} ${level}: node ${node.name ?? '?'} is part ${part}, which the sheet does not have`,
      );
    if (seen.has(part)) throw new Error(`${sheet.feature} ${level}: part ${part} appears twice`);
    seen.add(part);
    const surfaces = level === 'near' ? surfacesIn(raw.json, node) : undefined;
    if (surfaces && [...surfaces].sort().join() !== [...p.surfaces].join())
      throw new Error(
        `${sheet.feature} ${level}: part ${part} shows ${surfaces.join(',')}, its sheet ${p.surfaces.join(',')}`,
      );
    node.extras = {
      part: p.id,
      tier: p.tier,
      sources: p.sources,
      detail: p.detail,
      kits: p.kits,
      fit: p.fit,
      ...(surfaces ? { surfaces } : {}),
      ...(p.hinge ? { hinge: p.hinge } : {}),
    };
  }
  // The app supplies the materials (ADR 0055): each part's surfaces, in primitive order, are all a glb keeps of them.
  for (const mesh of raw.json.meshes ?? []) for (const prim of mesh.primitives) delete prim.material;
  delete raw.json.materials;
  if (!probe) throw new Error(`${sheet.feature} ${level}: no probe`);
  const want = sheet.levels[level];
  const missing = want.filter((id) => !seen.has(id));
  if (missing.length)
    throw new Error(`${sheet.feature} ${level}: parts missing from the model: ${missing.join(', ')}`);
  const scene = raw.json.scenes?.[0];
  if (!scene) throw new Error(`${sheet.feature} ${level}: no scene`);
  scene.extras = {
    feature: sheet.feature,
    landmark: sheet.landmark,
    level,
    crs: sheet.crs,
    anchor: sheet.anchor,
    setting: sheet.setting,
    inputHash: inputHash(sheet),
    blender: raw.json.asset.generator ?? 'unknown',
    blenderVersion: blenderNow,
  };
  const done: Glb = withByteColours({ json: raw.json, bin: raw.bin });
  const bytes = writeGlb(done);
  writeFileSync(published(sheet.feature, level), bytes);
  const counts = glbCounts(raw.json);
  console.log(
    `dewidebug models finished ${sheet.feature} ${level} parts=${String(seen.size)} triangles=${String(counts.triangles)} drawCalls=${String(counts.drawCalls)} bytes=${String(bytes.byteLength)}`,
  );
}

/** The surface of each of a part node's primitives, in order, from the material Blender named for it. */
function surfacesIn(json: GlbJson, node: GlbNode): string[] {
  if (node.mesh === undefined) throw new Error(`node ${node.name ?? '?'} has no mesh`);
  return (json.meshes?.[node.mesh]?.primitives ?? []).map((prim) => {
    const name = prim.material === undefined ? undefined : json.materials?.[prim.material]?.name;
    if (!name) throw new Error(`node ${node.name ?? '?'} has a primitive with no surface material`);
    return name;
  });
}

function levelOf(sheet: BuildSheet, level: LevelName): ModelLevel {
  const file = published(sheet.feature, level);
  const bytes = readFileSync(file);
  const { json } = readGlb(bytes);
  const counts = glbCounts(json);
  const parts = json.nodes.filter((n) => typeof n.extras?.['part'] === 'string');
  return {
    file: modelFile(sheet.feature, level),
    bytes: bytes.byteLength,
    triangles: counts.triangles,
    drawCalls: drawGroups(json),
    parts: parts.length,
  };
}

function writeIndex(list: readonly BuildSheet[]): void {
  const entries: LandmarkModel[] = list
    .filter((s) => existsSync(published(s.feature, 'near')) && existsSync(published(s.feature, 'far')))
    .map((s) => ({
      feature: s.feature,
      landmark: s.landmark,
      inputHash: builtHash(s.feature) ?? '',
      near: levelOf(s, 'near'),
      far: levelOf(s, 'far'),
    }));
  writeFileSync(
    INDEX,
    `// Generated by tools/models/build.ts (npm run models): do not edit.\nimport type { LandmarkModel } from '../../domain/buildsheet.ts';\n\nexport const LANDMARK_MODELS: readonly LandmarkModel[] = ${JSON.stringify(entries, null, 2)};\n`,
  );
  console.log(`dewidebug models index lists ${String(entries.length)} features`);
}
