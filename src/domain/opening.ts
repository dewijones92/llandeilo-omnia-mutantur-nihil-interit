export interface Params {
  has(name: string): boolean;
  get(name: string): string | null;
}

// Links into a time or place, and the debug view, open straight onto the valley.
const DEEP_LINKS = ['year', 't', 'place', 'debug'] as const;

// The Begin card waits for a click, which browsers need before they play sound. Automated browsers
// (e2e, screenshots) skip it unless ?begin=1 asks for it.
export function showsBegin(params: Params, automated: boolean): boolean {
  const begin = params.get('begin');
  if (begin === '1') return true;
  if (begin === '0' || automated) return false;
  return !DEEP_LINKS.some((k) => params.has(k));
}
