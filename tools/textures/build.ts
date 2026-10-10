// npm run textures [-- --force]: downloads each surface's photograph (pinned by checksum) and writes the colour
// and normal maps the landmark models use at each size (ADR 0055). The outputs are committed; the downloads stay
// in build/textures (ignored). A map already on disk is kept unless --force.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SURFACES } from '../../src/content/surfaces.ts';
import { TEXTURE_SIZE, TEXTURED, textureFile } from '../../src/domain/surfaces.ts';

const ROOT = join(import.meta.dirname, '../..');
const RAW = join(ROOT, 'build/textures');
const force = process.argv.includes('--force');

async function download(url: string, md5: string, to: string): Promise<void> {
  if (existsSync(to) && createHash('md5').update(readFileSync(to)).digest('hex') === md5) return;
  const res = await fetch(url, { headers: { 'User-Agent': 'llandeilo-texture-build' } });
  if (!res.ok) throw new Error(`${url}: HTTP ${String(res.status)}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const got = createHash('md5').update(bytes).digest('hex');
  if (got !== md5)
    throw new Error(`${url}: md5 ${got}, expected ${md5}: the photograph changed at the library`);
  writeFileSync(to, bytes);
  console.log(`dewidebug textures downloaded ${url} bytes=${String(bytes.byteLength)}`);
}

mkdirSync(RAW, { recursive: true });
mkdirSync(join(ROOT, 'public/textures/landmarks'), { recursive: true });
let written = 0;
for (const id of TEXTURED) {
  const s = SURFACES[id];
  for (const map of ['color', 'normal'] as const) {
    const raw = join(RAW, `${id}-${map}.jpg`);
    await download(s.photo[map].url, s.photo[map].md5, raw);
    for (const size of Object.values(TEXTURE_SIZE)) {
      const out = join(ROOT, 'public', textureFile(id, map, size));
      if (existsSync(out) && !force) continue;
      const args = [join(ROOT, 'tools/textures/process.py'), raw, out, String(size), map];
      execFileSync('python3', ['-I', ...args, ...(map === 'color' ? [String(s.look.detail)] : [])], {
        stdio: ['ignore', 'inherit', 'inherit'],
      });
      written++;
    }
  }
}
console.log(`dewidebug textures wrote ${String(written)} files`);
