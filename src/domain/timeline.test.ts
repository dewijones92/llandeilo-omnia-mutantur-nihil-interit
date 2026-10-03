import { describe, expect, it } from 'vitest';
import { createTimeline, tAt, yearAt } from './timeline.ts';
import { bc, ad, year, calendarYear, formatSliderYear, formatYear, groupDigits, yearsAgo } from './time.ts';

const tl = createTimeline([
  { t: 0, year: yearsAgo(450_000_000), scale: 'linear' },
  { t: 0.2, year: bc(12_000), scale: 'log' },
  { t: 0.5, year: ad(1000), scale: 'linear' },
  { t: 1, year: ad(2026), scale: 'linear' },
]);

describe('timeline', () => {
  it('maps the ends exactly', () => {
    expect(yearAt(tl, 0)).toBe(yearsAgo(450_000_000));
    expect(yearAt(tl, 1)).toBe(2026);
  });

  it('is monotonic across linear and log segments', () => {
    let prev = -Infinity;
    for (let i = 0; i <= 1000; i++) {
      const y = yearAt(tl, i / 1000);
      expect(y).toBeGreaterThan(prev);
      prev = y;
    }
  });

  it('round-trips year -> t -> year', () => {
    for (const y of [bc(9000), bc(500), ad(75), ad(1282), ad(1850), ad(2000)]) {
      expect(yearAt(tl, tAt(tl, y))).toBeCloseTo(y, 3);
    }
  });

  it('rejects anchors that do not increase', () => {
    expect(() =>
      createTimeline([
        { t: 0, year: year(10), scale: 'linear' },
        { t: 1, year: year(5), scale: 'linear' },
      ]),
    ).toThrow(/strictly increase/);
  });

  it('clamps out-of-range input', () => {
    expect(yearAt(tl, -1)).toBe(yearAt(tl, 0));
    expect(tAt(tl, ad(3000))).toBe(1);
  });
});

describe('formatYear', () => {
  it('formats both eras in both languages', () => {
    expect(formatYear(bc(800), 'en')).toBe('800 BC');
    expect(formatYear(bc(800), 'cy')).toBe('800 CC');
    expect(formatYear(ad(75), 'en', true)).toBe('c. AD 75');
    expect(formatYear(ad(1282), 'cy')).toBe('1282');
    expect(formatYear(yearsAgo(450_000_000), 'en')).toBe('450 million years ago');
  });
});

describe('formatSliderYear and groupDigits', () => {
  it('marks a slider reading before AD 1000 as approximate, and groups digits per language', () => {
    expect(formatSliderYear(ad(830), 'en')).toBe('c. AD 830');
    expect(formatSliderYear(ad(1282), 'en')).toBe('1282');
    expect(groupDigits(12500, 'en')).toBe('12,500');
  });
});

describe('formatYear with fractional years (as the slider produces)', () => {
  it('names the calendar year a fractional year lies in, in every branch', () => {
    expect(formatYear(year(1892.857142857143), 'en')).toBe('1892');
    expect(formatYear(year(1858.5), 'en')).toBe('1858');
    expect(formatYear(year(74.48), 'en', true)).toBe('c. AD 74');
    expect(formatYear(year(1023.28), 'cy')).toBe('1023');
    // Astronomical year 0 is 1 BC and -800 is 801 BC; a year runs from its value up to the next.
    expect(formatYear(year(-799.6), 'en')).toBe('801 BC');
    expect(formatYear(year(-0.5), 'en')).toBe('2 BC');
    expect(formatYear(year(0.5), 'en')).toBe('1 BC');
  });

  it('reads a year that float error left just short of a whole year as that year', () => {
    expect(formatYear(year(1856.9999999), 'en')).toBe('1857');
    expect(formatYear(year(-800.0000001), 'en')).toBe('801 BC');
    expect(calendarYear(1856.9999999)).toBe(1857);
    expect(calendarYear(1858.9)).toBe(1858);
  });

  it('never prints a decimal point for any slider position', () => {
    for (let i = 0; i <= 2000; i++) {
      const text = formatYear(yearAt(tl, i / 2000), 'en');
      expect(text).not.toMatch(/\d\.\d{2,}/);
    }
  });
});
