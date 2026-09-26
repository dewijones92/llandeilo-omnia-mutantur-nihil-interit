import type { Lang } from '../domain/i18n.ts';
import { STRINGS, type StringKey } from '../content/strings.ts';

type Listener = () => void;

export class LangStore {
  private listeners: Listener[] = [];

  constructor(private current: Lang) {}

  get lang(): Lang {
    return this.current;
  }

  set(lang: Lang): void {
    if (lang === this.current) return;
    this.current = lang;
    document.documentElement.lang = lang;
    console.info(`dewidebug ui language=${lang}`);
    for (const l of this.listeners) l();
  }

  onChange(listener: Listener): void {
    this.listeners.push(listener);
  }

  t(key: StringKey): string {
    return STRINGS[key][this.current];
  }
}
