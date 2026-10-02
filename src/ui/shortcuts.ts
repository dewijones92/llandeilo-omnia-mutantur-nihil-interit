import type { StringKey } from '../content/strings.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

interface Group {
  readonly where: StringKey;
  readonly rows: readonly (readonly [readonly string[], StringKey])[];
}

const GROUPS: readonly Group[] = [
  { where: 'keysAnywhere', rows: [[['←', '→'], 'keyStep']] },
  {
    where: 'keysSlider',
    rows: [
      [['←', '→'], 'keyNudge'],
      [['Shift+←', 'Shift+→'], 'keyNudgeMore'],
      [['PageDown', 'PageUp'], 'keyStep'],
      [['Home', 'End'], 'keyEnds'],
    ],
  },
  {
    where: 'keysAlways',
    rows: [
      [['Esc'], 'keyEscape'],
      [['?'], 'keyHelp'],
    ],
  },
];

const CLICKS: readonly StringKey[] = ['clickCompass', 'clickTrain', 'clickLabel'];

export class Shortcuts {
  readonly el = h('div', { class: 'shortcuts panel', role: 'dialog', hidden: true });
  private returnFocus: HTMLElement | null = null;

  constructor(private readonly store: LangStore) {
    store.onChange(() => {
      if (!this.el.hidden) this.render();
    });
  }

  get isOpen(): boolean {
    return !this.el.hidden;
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  open(): void {
    this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.render();
    this.el.hidden = false;
    this.el.querySelector<HTMLElement>('h2')?.focus();
    console.info('dewidebug shortcuts open');
  }

  close(): void {
    this.el.hidden = true;
    this.returnFocus?.focus();
    console.info('dewidebug shortcuts close');
  }

  private render(): void {
    const t = (k: StringKey): string => this.store.t(k);
    const close = h('button', { class: 'tool', type: 'button' }, t('close'));
    close.addEventListener('click', () => {
      this.close();
    });
    this.el.setAttribute('aria-label', t('keysTitle'));
    const row = ([keys, what]: Group['rows'][number]): HTMLElement =>
      h('tr', {}, h('th', { scope: 'row' }, ...keys.map((k) => h('kbd', {}, k))), h('td', {}, t(what)));
    this.el.replaceChildren(
      h('div', { class: 'info-head' }, h('h2', { tabindex: -1 }, t('keysTitle')), close),
      ...GROUPS.flatMap((g) => [
        h('p', { class: 'shortcuts-where' }, t(g.where)),
        h('table', {}, h('tbody', {}, ...g.rows.map(row))),
      ]),
      h('ul', { class: 'shortcuts-clicks' }, ...CLICKS.map((k) => h('li', {}, t(k)))),
    );
  }
}
