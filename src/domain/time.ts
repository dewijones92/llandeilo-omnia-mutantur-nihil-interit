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

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

function isLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/**
 * The start of a day a source names, as a fractional year: onDay(1840, 4, 10) is midnight beginning
 * 10 April 1840. Gregorian, so only for dates after Britain adopted it in 1752.
 */
export function onDay(y: number, month: number, day: number): Year {
  const lengths = MONTH_DAYS.map((d, i) => (i === 1 && isLeap(y) ? 29 : d));
  const inMonth = lengths[month - 1];
  if (
    !Number.isInteger(y) ||
    y < 1753 ||
    inMonth === undefined ||
    !Number.isInteger(day) ||
    day < 1 ||
    day > inMonth
  )
    throw new Error(`Invalid day ${String(y)}-${String(month)}-${String(day)}`);
  const before = lengths.slice(0, month - 1).reduce((sum, d) => sum + d, 0) + day - 1;
  return year(y + before / (isLeap(y) ? 366 : 365));
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

// About 30 seconds. A slider position converted to a year can come back a hair either side of a whole
// year (549.9999999999998 for the AD 550 key); within this it is that year. Snapping onto the whole
// year, rather than adding the epsilon, keeps a range ending at a key year (or at the present) whole.
export const YEAR_EPSILON = 1e-6;

export function settledYear(value: number): number {
  const whole = Math.round(value);
  return Math.abs(value - whole) < YEAR_EPSILON ? whole : value;
}

// A year value is a fractional calendar year (ad(1858.5) is about 2 July 1858; onDay names a day),
// so its label is the year it lies in, astronomical year 0 being 1 BC.
export function calendarYear(value: number): number {
  return Math.floor(settledYear(value));
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
