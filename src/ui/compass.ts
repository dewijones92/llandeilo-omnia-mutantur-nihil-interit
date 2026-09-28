import { bearingOf } from '../domain/compass.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

export class Compass {
  readonly el: HTMLButtonElement;
  private readonly rose: HTMLElement;
  private readonly letter: HTMLElement;
  private shown = -1;

  constructor(store: LangStore, onFaceNorth: () => void) {
    this.letter = h('span', { class: 'compass-n' }, store.t('northLetter'));
    this.rose = h('span', { class: 'compass-rose' }, h('span', { class: 'compass-needle' }), this.letter);
    this.el = h(
      'button',
      {
        class: 'compass panel',
        type: 'button',
        title: store.t('faceNorth'),
        'aria-label': store.t('faceNorth'),
      },
      this.rose,
    );
    this.el.addEventListener('click', () => {
      console.info(`dewidebug compass click bearing=${this.shown}`);
      onFaceNorth();
    });
    store.onChange(() => {
      this.letter.textContent = store.t('northLetter');
      this.el.title = store.t('faceNorth');
      this.el.setAttribute('aria-label', store.t('faceNorth'));
    });
  }

  update(alpha: number): void {
    const bearing = Math.round(bearingOf(alpha)) % 360;
    if (bearing === this.shown) return;
    this.shown = bearing;
    this.rose.style.transform = `rotate(${-bearing}deg)`;
    this.el.dataset['bearing'] = String(bearing);
  }
}
