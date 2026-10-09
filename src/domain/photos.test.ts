import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import type { Photograph, PhotoId } from './model.ts';
import { PHOTO_LINGER_YEARS, datedLabel, isPlaced, photoWindow, pinAnchors, pinnedPhotos } from './photos.ts';
import { range, year } from './time.ts';

const photo = (id: string, from: number, to: number, extra: Partial<Photograph> = {}): Photograph => ({
  id: mint<PhotoId>(id),
  file: `photos/${id}.jpg`,
  title: id,
  dated: `c. ${String(from)}`,
  when: range(year(from), year(to)),
  dateNote: 'the caption',
  creator: 'A Photographer',
  credit: 'A Photographer',
  catalogueId: id,
  catalogueUrl: `https://example.org/${id}`,
  shows: 'a street',
  where: 'a street',
  status: 'ok',
  placement: {
    kind: 'placed',
    at: { e: 262900, n: 222400 },
    accuracyM: 25,
    basis: 'documented',
    note: 'a note',
  },
  provenance: { kind: 'documented', sources: [mint('s')] },
  ...extra,
});

describe('which photographs are pinned at a year', () => {
  const p = photo('a', 1895, 1905);

  it('shows a photograph from the start of its date range to the linger after its end, and not outside', () => {
    expect(PHOTO_LINGER_YEARS).toBeGreaterThan(0);
    const w = photoWindow(p);
    expect(w.from).toBe(1895);
    expect(w.to).toBe(1905 + PHOTO_LINGER_YEARS);
    expect(pinnedPhotos([p], year(1894.9))).toEqual([]);
    expect(pinnedPhotos([p], year(1895))).toEqual([p]);
    expect(pinnedPhotos([p], year(1900))).toEqual([p]);
    expect(pinnedPhotos([p], year(1905 + PHOTO_LINGER_YEARS))).toEqual([p]);
    expect(pinnedPhotos([p], year(1905 + PHOTO_LINGER_YEARS + 0.1))).toEqual([]);
  });

  it('never pins a photograph that is not placed, or whose caption is wrong', () => {
    const unplaced = photo('u', 1895, 1905, { placement: { kind: 'unplaced', reason: 'no place named' } });
    const wrong = photo('m', 1895, 1905, { status: 'miscaptioned' });
    expect(isPlaced(unplaced)).toBe(false);
    expect(isPlaced(wrong)).toBe(false);
    expect(pinnedPhotos([unplaced, wrong, p], year(1900))).toEqual([p]);
  });
});

describe('where pins stand', () => {
  it('leaves a lone photograph exactly on its point', () => {
    const lone = photo('lone', 1900, 1900);
    expect(pinAnchors([lone]).get(lone.id)).toEqual({ e: 262900, n: 222400 });
  });

  it('fans photographs that share a point round it, each near the point and apart from the others', () => {
    const three = ['x', 'y', 'z'].map((id) => photo(id, 1900, 1900));
    const anchors = pinAnchors(three);
    const spots = three.map((t) => anchors.get(t.id));
    for (const s of spots) {
      expect(s).toBeDefined();
      expect(Math.hypot((s?.e ?? 0) - 262900, (s?.n ?? 0) - 222400)).toBeGreaterThan(5);
      expect(Math.hypot((s?.e ?? 0) - 262900, (s?.n ?? 0) - 222400)).toBeLessThan(30);
    }
    for (const [i, a] of spots.entries())
      for (const b of spots.slice(i + 1))
        expect(Math.hypot((a?.e ?? 0) - (b?.e ?? 0), (a?.n ?? 0) - (b?.n ?? 0))).toBeGreaterThan(10);
  });

  it('does not move a pin when other photographs are added elsewhere or the order changes', () => {
    const a = photo('a', 1900, 1900);
    const b = photo('b', 1900, 1900);
    const far = photo('far', 1900, 1900, {
      placement: {
        kind: 'placed',
        at: { e: 263500, n: 222900 },
        accuracyM: 30,
        basis: 'reconstructed',
        note: 'n',
      },
    });
    expect(pinAnchors([a, b, far]).get(a.id)).toBeDefined();
    expect(pinAnchors([a, b, far]).get(a.id)).toEqual(pinAnchors([b, a]).get(a.id));
  });
});

describe('the date as shown', () => {
  it('keeps the catalogue’s words in English, and turns a plain "c." date into tua in Welsh', () => {
    expect(datedLabel(photo('a', 1895, 1905, { dated: 'c. 1900' }), 'en')).toBe('c. 1900');
    expect(datedLabel(photo('a', 1895, 1905, { dated: 'c. 1900' }), 'cy')).toBe('tua 1900');
    expect(datedLabel(photo('b', 1905, 1915, { dated: 'c. 1910-20' }), 'cy')).toBe('tua 1910-20');
  });

  it('falls back to the range of years in Welsh when the date carries English caveats', () => {
    const p = photo('c', 1918, 1930, { dated: 'after 1918 (caption c. 1910)' });
    expect(datedLabel(p, 'en')).toBe('after 1918 (caption c. 1910)');
    expect(datedLabel(p, 'cy')).toBe('1918–1930');
  });
});
