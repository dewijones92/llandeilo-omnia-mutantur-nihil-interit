const KEY = 'llandeilo.photos';

export function storedPhotos(): boolean | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'on' ? true : v === 'off' ? false : null;
  } catch (err: unknown) {
    console.warn('dewidebug photos storage read failed', err);
    return null;
  }
}

export function rememberPhotos(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch (err: unknown) {
    console.warn('dewidebug photos storage write failed', err);
  }
}

// `?photos=1` or `?photos=0` sets the first state for a link, over what the browser remembers.
export function initialPhotos(param: string | null, stored: boolean | null): boolean {
  if (param === '1') return true;
  if (param === '0') return false;
  return stored ?? false;
}
