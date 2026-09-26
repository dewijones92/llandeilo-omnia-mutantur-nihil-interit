import { LANGUAGES } from '../content/languages.ts';
import type { Conversation, Person } from '../domain/model.ts';
import type { Source } from '../domain/provenance.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

export class ConversationPanel {
  readonly el = h('aside', { class: 'convo panel', hidden: true });
  private current: Conversation | undefined;
  private audio: HTMLAudioElement | undefined;
  private generation = 0;
  private returnFocus: HTMLElement | null = null;
  onVisibility: (() => void) | undefined;

  constructor(
    private readonly store: LangStore,
    private readonly people: ReadonlyMap<string, Person>,
    private readonly sources: ReadonlyMap<string, Source>,
  ) {
    store.onChange(() => {
      if (this.current) this.render(this.current);
    });
  }

  get open(): Conversation | undefined {
    return this.current;
  }

  show(c: Conversation): void {
    this.stop();
    this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.current = c;
    this.render(c);
    this.el.hidden = false;
    this.el.querySelector<HTMLElement>('h2')?.focus();
    this.onVisibility?.();
    console.info(`dewidebug conversation open id=${c.id}`);
  }

  close(): void {
    if (this.el.hidden) return;
    this.stop();
    this.current = undefined;
    this.el.hidden = true;
    if (this.el.contains(document.activeElement)) this.returnFocus?.focus();
    this.returnFocus = null;
    this.onVisibility?.();
  }

  private voiceUrl(c: Conversation, i: number): string {
    return `${import.meta.env.BASE_URL}voices/${c.id}-${i}.mp3`;
  }

  private stop(): void {
    this.generation++;
    this.audio?.pause();
    this.audio = undefined;
    for (const el of this.el.querySelectorAll('.line.speaking')) el.classList.remove('speaking');
  }

  private play(c: Conversation, i: number, then?: () => void): void {
    this.audio?.pause();
    for (const el of this.el.querySelectorAll('.line.speaking')) el.classList.remove('speaking');
    const row = this.el.querySelector(`[data-line="${i}"]`);
    row?.classList.add('speaking');
    row?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const audio = new Audio(this.voiceUrl(c, i));
    this.audio = audio;
    const finish = (): void => {
      row?.classList.remove('speaking');
      then?.();
    };
    audio.addEventListener('ended', finish);
    audio.addEventListener('error', () => {
      console.warn(`dewidebug voice failed to load ${c.id}-${i}`);
      finish();
    });
    audio.play().catch((err: unknown) => {
      console.warn(`dewidebug voice play failed ${c.id}-${i}`, err);
      row?.classList.remove('speaking');
    });
    console.info(`dewidebug voice play ${c.id}-${i}`);
  }

  private playAll(c: Conversation, i: number, run: number): void {
    if (run !== this.generation || i >= c.lines.length) return;
    this.play(c, i, () => {
      setTimeout(() => {
        this.playAll(c, i + 1, run);
      }, 350);
    });
  }

  private render(c: Conversation): void {
    const lang = this.store.lang;
    this.el.setAttribute('aria-label', `${this.store.t('conversation')}: ${c.title[lang]}`);
    const close = h('button', { class: 'tool convo-close', type: 'button' }, this.store.t('close'));
    close.addEventListener('click', () => {
      this.close();
    });
    const playAll = h('button', { class: 'tool convo-play', type: 'button' }, `▶ ${this.store.t('playAll')}`);
    playAll.addEventListener('click', () => {
      this.stop();
      this.playAll(c, 0, this.generation);
    });
    const lines = c.lines.map((l, i) => {
      const person = this.people.get(l.speaker);
      const play = h(
        'button',
        {
          class: 'line-play',
          type: 'button',
          'aria-label': `${this.store.t('play')}: ${person?.name ?? ''}`,
        },
        '▶',
      );
      play.addEventListener('click', () => {
        this.stop();
        this.play(c, i);
      });
      const info = LANGUAGES[l.language];
      const body = h(
        'div',
        { class: 'line-body' },
        h('div', { class: 'line-who' }, h('b', {}, person?.name ?? ''), h('span', {}, ` ${info.name[lang]}`)),
        h('p', { class: 'line-spoken', lang: info.tag }, l.spoken),
      );
      if (l.spoken !== l.translation[lang])
        body.append(h('p', { class: 'line-translation' }, l.translation[lang]));
      if (l.quote) body.append(h('p', { class: 'line-quote' }, l.quote[lang]));
      return h('li', { class: 'line', 'data-line': i }, play, body);
    });
    const cast = c.people
      .map((id) => this.people.get(id))
      .filter((p): p is Person => p !== undefined)
      .map((p) =>
        h('li', {}, h('b', {}, p.name), ` ${p.role[lang]}${p.family ? ` · ${this.store.t('family')}` : ''}`),
      );
    this.el.replaceChildren(
      h(
        'div',
        { class: 'convo-head' },
        h(
          'div',
          {},
          h('span', { class: 'convo-when' }, c.setIn[lang]),
          h('h2', { tabindex: -1 }, c.title[lang]),
        ),
        close,
      ),
      h('div', { class: 'convo-meta' }, provenanceBadge(c.provenance, this.store, this.sources), playAll),
      h('ul', { class: 'convo-cast' }, ...cast),
      h('ol', { class: 'convo-lines' }, ...lines),
    );
    if (c.languageNote) {
      this.el.append(
        h(
          'p',
          { class: 'convo-note' },
          h('b', {}, `${this.store.t('aboutLanguage')} `),
          c.languageNote[lang],
        ),
      );
    }
  }
}
