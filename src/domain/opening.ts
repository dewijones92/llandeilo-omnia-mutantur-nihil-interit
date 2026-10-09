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

export interface WelcomeChoice {
  readonly show: boolean;
  readonly why: string;
}

// The welcome ("How to explore") opens once the valley does, deep links included: a shared link is
// often a first visit. Automated browsers skip it unless ?welcome=1 asks, as with the Begin card; the
// viewer's own "Show this at start" choice (`stored`, '0' when unticked) wins over both.
export function welcomeAtStart(params: Params, automated: boolean, stored: string | null): WelcomeChoice {
  const asked = params.get('welcome');
  if (asked === '0') return { show: false, why: '?welcome=0' };
  if (automated && asked !== '1') return { show: false, why: 'automated browser' };
  if (stored === '0') return { show: false, why: 'turned off by the viewer' };
  return { show: true, why: asked === '1' ? '?welcome=1' : 'on at start' };
}
