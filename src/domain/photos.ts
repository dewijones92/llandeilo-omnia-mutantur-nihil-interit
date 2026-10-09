import type { GridRef, PhotoId, Photograph, PhotoPlacement } from './model.ts';
import { range, year, type TimeRange, type Year } from './time.ts';

// A photograph is a window onto its own time, and the street it shows changed slowly, so its pin
// stays up for this many years after the end of its date range; it never appears before the start.
export const PHOTO_LINGER_YEARS = 25;

const FAN_RADIUS_M = 15;

export type PlacedPhoto = Photograph & {
  readonly placement: Extract<PhotoPlacement, { readonly kind: 'placed' }>;
};

export function isPlaced(photo: Photograph): photo is PlacedPhoto {
  return photo.placement.kind === 'placed' && photo.status === 'ok';
}

export function photoWindow(photo: Pick<Photograph, 'when'>): TimeRange {
  return range(photo.when.from, year(photo.when.to + PHOTO_LINGER_YEARS));
}

export function pinnedPhotos(photos: readonly Photograph[], y: Year): readonly PlacedPhoto[] {
  return photos.filter(isPlaced).filter((p) => {
    const w = photoWindow(p);
    return y >= w.from && y <= w.to;
  });
}

/** The tier of the photograph as a whole: its placement's, unless the date itself is in dispute. */
export function photoTier(photo: Photograph): 'documented' | 'reconstructed' {
  if (photo.dateDisputed) return 'reconstructed';
  return photo.placement.kind === 'placed' ? photo.placement.basis : 'reconstructed';
}

const spot = (g: GridRef): string => `${String(g.e)},${String(g.n)}`;

/**
 * Where each placed photograph's pin stands. Photographs given the same point (three of the bus
 * accident, two of the station) are fanned round it, in id order, so every pin can be reached; the
 * result depends only on the photographs sharing a point, never on the year or on the others.
 */
export function pinAnchors(photos: readonly Photograph[]): ReadonlyMap<PhotoId, GridRef> {
  const groups = new Map<string, PlacedPhoto[]>();
  for (const p of photos.filter(isPlaced)) {
    const key = spot(p.placement.at);
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  const anchors = new Map<PhotoId, GridRef>();
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => a.id.localeCompare(b.id));
    sorted.forEach((p, i) => {
      const at = p.placement.at;
      if (sorted.length === 1) {
        anchors.set(p.id, at);
        return;
      }
      const angle = (2 * Math.PI * i) / sorted.length;
      anchors.set(p.id, {
        e: Math.round(at.e + FAN_RADIUS_M * Math.cos(angle)),
        n: Math.round(at.n + FAN_RADIUS_M * Math.sin(angle)),
      });
    });
  }
  return anchors;
}

/** The photograph's date as shown: the catalogue's own words in English, and in Welsh a "c." date turned into "tua". */
export function datedLabel(photo: Pick<Photograph, 'dated' | 'when'>, lang: 'en' | 'cy'): string {
  if (lang === 'en') return photo.dated;
  const plain = /^c\. (\d{4}(?:-\d{1,4})?)$/.exec(photo.dated);
  if (plain?.[1]) return `tua ${plain[1]}`;
  return `${String(Math.floor(photo.when.from))}–${String(Math.floor(photo.when.to))}`;
}
