import { h } from './dom.ts';
import { langToggle } from './lang-toggle.ts';
import type { LangStore } from './store.ts';

// The title card over the loading valley. In Begin mode it stays, veiled over the finished scene,
// until the viewer presses Begin; otherwise it fades once the valley is ready.
export class OpeningCard {
  readonly el: HTMLElement;
  private readonly title = h('h1', { id: 'opening-title' });
  private readonly motto = h('p', { class: 'motto', lang: 'la' });
  private readonly meaning = h('p', { class: 'motto-meaning' });
  private readonly source = h('p', { class: 'motto-source' });
  private readonly loading = h('p', { class: 'loading' });
  private readonly bar = h('div', { class: 'loader-bar' }, h('span'));
  private readonly beginButton = h('button', { class: 'begin', type: 'button', hidden: true });
  private readonly note = h('p', { class: 'begin-note', hidden: true });

  constructor(
    private readonly store: LangStore,
    private readonly begin: boolean,
  ) {
    const card = h(
      'div',
      { class: 'loader-card' },
      this.title,
      this.motto,
      this.meaning,
      this.source,
      this.loading,
      this.bar,
      this.beginButton,
      this.note,
      begin ? h('div', { class: 'begin-lang' }, langToggle(store)) : null,
    );
    this.el = begin
      ? h(
          'div',
          { class: 'loader', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'opening-title' },
          card,
        )
      : h('div', { class: 'loader', role: 'status' }, card);
    this.render();
    store.onChange(() => {
      this.render();
    });
    console.info(`dewidebug opening card begin=${String(begin)}`);
  }

  ready(onBegin: () => void): void {
    if (!this.begin) {
      this.dismiss();
      return;
    }
    this.loading.hidden = true;
    this.bar.hidden = true;
    this.beginButton.hidden = false;
    this.note.hidden = false;
    this.el.classList.add('ready');
    this.beginButton.addEventListener('click', () => {
      console.info('dewidebug opening begin pressed');
      onBegin();
      this.dismiss();
    });
    this.beginButton.focus();
  }

  private dismiss(): void {
    this.el.classList.add('done');
    setTimeout(() => {
      this.el.remove();
    }, 900);
  }

  private render(): void {
    const t = this.store.t.bind(this.store);
    this.title.textContent = t('title');
    this.motto.textContent = t('motto');
    this.meaning.textContent = t('mottoMeaning');
    this.source.textContent = t('mottoSource');
    this.loading.textContent = t('loading');
    this.beginButton.textContent = t('begin');
    this.note.textContent = t('beginSound');
  }
}
