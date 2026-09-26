import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONVERSATIONS } from '../../src/content/conversations.ts';
import { PEOPLE } from '../../src/content/people.ts';
import { voiceLines, voiceSignature } from '../../src/content/voices.ts';

const out = join(import.meta.dirname, '../../public/voices');
const manifestPath = join(out, 'manifest.json');

const previous: Record<string, string> = {};
if (existsSync(manifestPath)) {
  const raw: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (raw && typeof raw === 'object') {
    for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') previous[k] = v;
  }
}
const manifest: Record<string, string> = {};
let made = 0;
let kept = 0;
for (const line of voiceLines(CONVERSATIONS, PEOPLE)) {
  const hash = createHash('sha1').update(voiceSignature(line)).digest('hex').slice(0, 12);
  const file = join(out, `${line.key}.mp3`);
  manifest[line.key] = hash;
  if (previous[line.key] === hash && existsSync(file)) {
    kept++;
    continue;
  }
  execFileSync(
    'edge-tts',
    [
      '--voice',
      line.voice,
      `--pitch=${line.pitch}`,
      `--rate=${line.rate}`,
      '--text',
      line.text,
      '--write-media',
      file,
    ],
    {
      stdio: 'inherit',
    },
  );
  made++;
  console.log(`dewidebug voice ${line.key} ${line.voice} ${line.pitch} ${line.rate}`);
}
let removed = 0;
for (const f of readdirSync(out)) {
  if (f.endsWith('.mp3') && !(f.slice(0, -4) in manifest)) {
    unlinkSync(join(out, f));
    removed++;
  }
}
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`dewidebug voices made=${made} kept=${kept} removed=${removed}`);
