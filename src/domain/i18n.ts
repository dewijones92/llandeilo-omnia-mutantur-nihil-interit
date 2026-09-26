export const LANGS = ['en', 'cy'] as const;
export type Lang = (typeof LANGS)[number];

export interface Bilingual {
  readonly en: string;
  readonly cy: string;
}

export function text(value: Bilingual, lang: Lang): string {
  return value[lang];
}

export function isLang(value: string): value is Lang {
  return value === 'en' || value === 'cy';
}
