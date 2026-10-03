import { mintNumber, type Brand } from './brand.ts';
import type { Lang } from './i18n.ts';

export type Year = Brand<number, 'Year'>;

export const PRESENT_YEAR = 2026;

export function year(value: number): Year {
  if (!Number.isFinite(value)) throw new Error(`Invalid year ${value}`);
  return mintNumber<Year>(value);
}

export function ad(value: number): Year {
  return year(value);
}

export function bc(value: number): Year {
  return year(1 - value);
}

export function yearsAgo(value: number): Year {
  return year(PRESENT_YEAR - value);
}

export interface TimeRange {
  readonly from: Year;
  readonly to: Year;
}

export function range(from: Year, to: Year): TimeRange {
  if (to < from) throw new Error(`Range ends before it starts: ${from}..${to}`);
  return { from, to };
}

export function contains(r: TimeRange, y: Year): boolean {
  return y >= r.from && y <= r.to;
}

const ERA_LABEL: Record<Lang, { bc: string; ad: string; ago: string; million: string; circa: string }> = {
  en: { bc: 'BC', ad: 'AD', ago: 'years ago', million: 'million years ago', circa: 'c.' },
  cy: { bc: 'CC', ad: 'OC', ago: 'o flynyddoedd yn ôl', million: 'miliwn o flynyddoedd yn ôl', circa: 'tua' },
};

export function groupDigits(value: number, lang: Lang): string {
  return Math.round(value).toLocaleString(lang === 'cy' ? 'cy-GB' : 'en-GB');
}

// A year value is a fractional calendar year (ad(1858.25) is 1 April 1858), so its label is the
// year it lies in, astronomical year 0 being 1 BC. The epsilon (about 30 seconds) lets a key date that
// float error brings back as 1856.9999999 still read 1857.
export const YEAR_EPSILON = 1e-6;

export function calendarYear(value: number): number {
  return Math.floor(value + YEAR_EPSILON);
}

export function formatYear(value: Year, lang: Lang, approximate = false): string {
  const labels = ERA_LABEL[lang];
  const y = calendarYear(value);
  const before = PRESENT_YEAR - value;
  if (before >= 1_000_000) {
    const millions = before / 1_000_000;
    return `${millions >= 10 ? Math.round(millions) : millions.toFixed(1)} ${labels.million}`;
  }
  if (before >= 20_000) return `${labels.circa} ${groupDigits(before, lang)} ${labels.ago}`;
  const prefix = approximate ? `${labels.circa} ` : '';
  if (y <= 0) return `${prefix}${groupDigits(1 - y, lang)} ${labels.bc}`;
  if (y < 1000) return `${prefix}${labels.ad} ${y}`;
  return `${prefix}${y}`;
}

// A year read off the slider rather than from a record: before AD 1000 the timeline is too
// compressed for a single year to mean much, so it carries "c.".
export function formatSliderYear(value: Year, lang: Lang): string {
  return formatYear(value, lang, value < 1000);
}
