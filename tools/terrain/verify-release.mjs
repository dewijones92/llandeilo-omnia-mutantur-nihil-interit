// node tools/terrain/verify-release.mjs <dir>: checks the terrain tiles in <dir> (built by `npm run terrain-glb -- <dir>`)
// against the committed manifest, src/content/generated/terrain-tiles.ts: every tile in the manifest is there with its
// size and sha256, and <dir> holds no other .glb. Exits 1 on any mismatch, so a release is never cut from stale tiles.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { TERRAIN_TILES } from '../../src/content/generated/terrain-tiles.ts';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node tools/terrain/verify-release.mjs <dir>');
  process.exit(2);
}
if (!existsSync(dir)) {
  console.error(`dewidebug verify-release ${dir} does not exist: run npm run terrain-glb -- ${dir}`);
  process.exit(1);
}

const problems = [];
for (const tile of TERRAIN_TILES) {
  const path = join(dir, tile.file);
  if (!existsSync(path)) {
    problems.push(`${tile.file}: missing`);
    continue;
  }
  const bytes = readFileSync(path);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (bytes.byteLength !== tile.bytes)
    problems.push(`${tile.file}: ${String(bytes.byteLength)} bytes, manifest says ${String(tile.bytes)}`);
  if (sha256 !== tile.sha256) problems.push(`${tile.file}: sha256 ${sha256}, manifest says ${tile.sha256}`);
}
const known = new Set(TERRAIN_TILES.map((t) => t.file));
for (const file of readdirSync(dir))
  if (file.endsWith('.glb') && !known.has(file)) problems.push(`${file}: not in the manifest (stale tile?)`);

if (problems.length > 0) {
  for (const p of problems) console.error(`dewidebug verify-release ${p}`);
  console.error(`dewidebug verify-release FAILED: ${String(problems.length)} problem(s) in ${dir}`);
  process.exit(1);
}
console.log(`dewidebug verify-release ${String(TERRAIN_TILES.length)} tiles in ${dir} match the manifest`);
