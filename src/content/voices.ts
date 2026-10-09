import type { Cutscene } from '../domain/cutscene.ts';
import { LANGS, type Lang } from '../domain/i18n.ts';
import type { Conversation, Person } from '../domain/model.ts';
import { LANGUAGES, VOICE_TUNING } from './languages.ts';

export interface VoiceLine {
  readonly key: string;
  readonly voice: string;
  readonly pitch: string;
  readonly rate: string;
  readonly text: string;
}

export function voiceLines(conversations: readonly Conversation[], people: readonly Person[]): VoiceLine[] {
  const byId = new Map(people.map((p) => [p.id, p]));
  return conversations.flatMap((c) =>
    c.lines.map((l, i) => {
      const person = byId.get(l.speaker);
      if (!person) throw new Error(`Unknown speaker ${l.speaker} in ${c.id}`);
      const tune = VOICE_TUNING[person.age];
      return {
        key: `${c.id}-${i}`,
        voice: LANGUAGES[l.language].voices[person.voice],
        pitch: tune.pitch,
        rate: tune.rate,
        text: l.spoken,
      };
    }),
  );
}

// The narrator reads each caption in the interface language. Welsh has only two voices, so Nia
// also reads the woman at the fort (at-the-fort-1, -3), a known overlap (docs/content/voices.md).
const NARRATOR: Readonly<Record<Lang, string>> = {
  en: LANGUAGES.english.voices.female,
  cy: LANGUAGES.welsh.voices.female,
};

export function narrationKey(scene: Cutscene, caption: number, lang: Lang): string {
  return `${scene.id}-${String(caption)}-${lang}`;
}

export function narrationLines(scenes: readonly Cutscene[]): VoiceLine[] {
  return scenes.flatMap((scene) =>
    scene.tracks
      .flatMap((t) => (t.kind === 'caption' ? [t] : []))
      .flatMap((caption, i) =>
        LANGS.map((lang) => ({
          key: narrationKey(scene, i, lang),
          voice: NARRATOR[lang],
          pitch: '+0Hz',
          rate: '+4%',
          text: caption.text[lang],
        })),
      ),
  );
}

export function voiceSignature(line: VoiceLine): string {
  return `${line.voice}|${line.pitch}|${line.rate}|${line.text}`;
}
