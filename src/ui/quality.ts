import { QUALITIES, type Quality } from '../domain/quality.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const KEY = 'llandeilo.quality';

export function storedQuality(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch (err: unknown) {
    console.warn('dewidebug quality storage read failed', err);
    return null;
  }
}

function remember(q: Quality): void {
  try {
    localStorage.setItem(KEY, q);
  } catch (err: unknown) {
    console.warn('dewidebug quality storage write failed', err);
  }
}

export class QualityMenu {
  readonly el: HTMLElement;
  private readonly buttons = new Map<Quality, HTMLButtonElement>();

  constructor(
    store: LangStore,
    private current: Quality,
    onChoose: (q: Quality) => void,
  ) {
    const label = h('span', { class: 'quality-label' });
    const group = h('div', { class: 'seg', role: 'group' });
    for (const q of QUALITIES) {
      const b = h('button', { type: 'button', 'aria-pressed': q === current });
      b.addEventListener('click', () => {
        if (q === this.current) return;
        this.current = q;
        remember(q);
        this.sync();
        console.info(`dewidebug quality chosen=${q}`);
        onChoose(q);
      });
      this.buttons.set(q, b);
      group.append(b);
    }
    const text = (): void => {
      label.textContent = store.t('graphics');
      group.setAttribute('aria-label', store.t('graphics'));
      for (const [q, b] of this.buttons) b.textContent = store.t(q);
    };
    text();
    store.onChange(text);
    this.el = h('div', { class: 'brand-row quality' }, label, group);
  }

  private sync(): void {
    for (const [q, b] of this.buttons) b.setAttribute('aria-pressed', String(q === this.current));
  }
}
