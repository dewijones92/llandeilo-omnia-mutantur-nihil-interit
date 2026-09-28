import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const DISMISSED = 'llandeilo.desktopBanner.dismissed';
const NOT_DESKTOP = '(pointer: coarse), (max-width: 900px)';

function dismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED) === '1';
  } catch (err: unknown) {
    console.warn('dewidebug desktop banner storage read failed', err);
    return false;
  }
}

function remember(): void {
  try {
    localStorage.setItem(DISMISSED, '1');
  } catch (err: unknown) {
    console.warn('dewidebug desktop banner storage write failed', err);
  }
}

export function desktopBanner(store: LangStore): HTMLElement | undefined {
  const notDesktop = window.matchMedia(NOT_DESKTOP).matches;
  const hidden = dismissed();
  console.info(`dewidebug desktop banner notDesktop=${notDesktop} dismissed=${hidden}`);
  if (!notDesktop || hidden) return undefined;
  const text = h('span', {}, store.t('desktopBest'));
  const close = h('button', { class: 'tool', type: 'button' }, store.t('close'));
  const el = h('div', { class: 'desktop-banner panel', role: 'status' }, text, close);
  close.addEventListener('click', () => {
    remember();
    el.remove();
    console.info('dewidebug desktop banner dismissed');
  });
  store.onChange(() => {
    text.textContent = store.t('desktopBest');
    close.textContent = store.t('close');
  });
  return el;
}
