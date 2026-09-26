import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONVERSATIONS } from '../../src/content/conversations.ts';
import { PEOPLE } from '../../src/content/people.ts';
import type { LanguageCode, Person } from '../../src/domain/model.ts';

const out = join(import.meta.dirname, '../../public/voices');
const manifestPath = join(out, 'manifest.json');

const VOICES: Record<LanguageCode, { male: string; female: string }> = {
  unknown: { male: 'cy-GB-AledNeural', female: 'cy-GB-NiaNeural' },
  brittonic: { male: 'cy-GB-AledNeural', female: 'cy-GB-NiaNeural' },
  'old-welsh': { male: 'cy-GB-AledNeural', female: 'cy-GB-NiaNeural' },
  'middle-welsh': { male: 'cy-GB-AledNeural', female: 'cy-GB-NiaNeural' },
  welsh: { male: 'cy-GB-AledNeural', female: 'cy-GB-NiaNeural' },
  latin: { male: 'it-IT-DiegoNeural', female: 'it-IT-IsabellaNeural' },
  'anglo-norman': { male: 'fr-FR-HenriNeural', female: 'fr-FR-DeniseNeural' },
  'middle-english': { male: 'en-GB-RyanNeural', female: 'en-GB-SoniaNeural' },
  english: { male: 'en-GB-RyanNeural', female: 'en-GB-SoniaNeural' },
};

const TUNING: Record<Person['age'], { pitch: string; rate: string }> = {
  child: { pitch: '+22Hz', rate: '+6%' },
  adult: { pitch: '+0Hz', rate: '+0%' },
  elder: { pitch: '-12Hz', rate: '-10%' },
};

const manifest: Record<string, string> = {};
if (existsSync(manifestPath)) {
  const raw: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (raw && typeof raw === 'object') {
    for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') manifest[k] = v;
  }
}
const people = new Map(PEOPLE.map((p) => [p.id, p]));
let made = 0;
let kept = 0;
for (const c of CONVERSATIONS) {
  c.lines.forEach((l, i) => {
    const person = people.get(l.speaker);
    if (!person) throw new Error(`Unknown speaker ${l.speaker} in ${c.id}`);
    const voice = VOICES[l.language][person.voice];
    const tune = TUNING[person.age];
    const key = `${c.id}-${i}`;
    const hash = createHash('sha1')
      .update(`${voice}|${tune.pitch}|${tune.rate}|${l.spoken}`)
      .digest('hex')
      .slice(0, 12);
    const file = join(out, `${key}.mp3`);
    if (manifest[key] === hash && existsSync(file)) {
      kept++;
      return;
    }
    execFileSync(
      'edge-tts',
      [
        '--voice',
        voice,
        `--pitch=${tune.pitch}`,
        `--rate=${tune.rate}`,
        '--text',
        l.spoken,
        '--write-media',
        file,
      ],
      {
        stdio: 'inherit',
      },
    );
    manifest[key] = hash;
    made++;
    console.log(`dewidebug voice ${key} ${voice} ${tune.pitch} ${tune.rate}`);
  });
}
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`dewidebug voices made=${made} kept=${kept}`);
