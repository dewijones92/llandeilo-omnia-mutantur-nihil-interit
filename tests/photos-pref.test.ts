import { describe, expect, it } from 'vitest';
import { initialPhotos } from '../src/ui/photos-pref.ts';

describe('the photo layer default', () => {
  it('is on for a first visit with nothing remembered and no link parameter', () => {
    expect(initialPhotos(null, null)).toBe(true);
  });

  it('stays off for a visitor who switched it off', () => {
    expect(initialPhotos(null, false)).toBe(false);
  });

  it('stays on for a visitor who left it on', () => {
    expect(initialPhotos(null, true)).toBe(true);
  });

  it('lets ?photos=0 turn it off, and ?photos=1 turn it on, over what is remembered', () => {
    expect(initialPhotos('0', null)).toBe(false);
    expect(initialPhotos('0', true)).toBe(false);
    expect(initialPhotos('1', false)).toBe(true);
  });

  it('ignores any other parameter value', () => {
    expect(initialPhotos('yes', null)).toBe(true);
    expect(initialPhotos('yes', false)).toBe(false);
  });
});
