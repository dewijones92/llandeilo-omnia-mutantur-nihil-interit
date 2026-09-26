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

export function voiceSignature(line: VoiceLine): string {
  return `${line.voice}|${line.pitch}|${line.rate}|${line.text}`;
}
