import type { Place } from './model.ts';

// True when the year is before the place is known by its name, so the name must say "(today)".
export function namedLater(place: Place, year: number): boolean {
  return year < place.namedFrom;
}
