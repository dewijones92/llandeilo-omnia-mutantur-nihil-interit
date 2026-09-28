import type { Bilingual } from '../domain/i18n.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

export class FollowChip {
  readonly el = h('div', { class: 'follow-chip panel', hidden: true, role: 'status' });
  private label: Bilingual | undefined;

  constructor(
    private readonly store: LangStore,
    private readonly onStop: () => void,
  ) {
    store.onChange(() => {
      this.render();
    });
  }

  show(label: Bilingual): void {
    this.label = label;
    this.render();
  }

  hide(): void {
    this.label = undefined;
    this.el.hidden = true;
  }

  private render(): void {
    const label = this.label;
    if (!label) return;
    const stop = h('button', { class: 'tool', type: 'button' }, this.store.t('stopFollowing'));
    stop.addEventListener('click', () => {
      this.onStop();
    });
    this.el.replaceChildren(
      h('span', {}, h('b', {}, `${this.store.t('following')}: `), label[this.store.lang]),
      stop,
    );
    this.el.hidden = false;
  }
}
