import { h } from './dom.ts';
import type { LangStore } from './store.ts';

export function langToggle(store: LangStore): HTMLElement {
  const en = h('button', { type: 'button', 'aria-pressed': store.lang === 'en' }, 'English');
  const cy = h('button', { type: 'button', 'aria-pressed': store.lang === 'cy' }, 'Cymraeg');
  const sync = (): void => {
    en.setAttribute('aria-pressed', String(store.lang === 'en'));
    cy.setAttribute('aria-pressed', String(store.lang === 'cy'));
  };
  en.addEventListener('click', () => {
    store.set('en');
  });
  cy.addEventListener('click', () => {
    store.set('cy');
  });
  store.onChange(sync);
  return h('div', { class: 'seg', role: 'group', 'aria-label': 'Language / Iaith' }, en, cy);
}
