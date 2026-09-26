import type { Conversation, Person } from '../domain/model.ts';
import type { Source } from '../domain/provenance.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

const LANGUAGE_NAMES: Readonly<Record<string, { en: string; cy: string }>> = {
  unknown: { en: 'Unknown language', cy: 'Iaith anhysbys' },
  brittonic: { en: 'Brittonic', cy: 'Brythoneg' },
  latin: { en: 'Latin', cy: 'Lladin' },
  'old-welsh': { en: 'Old Welsh', cy: 'Hen Gymraeg' },
  'middle-welsh': { en: 'Middle Welsh', cy: 'Cymraeg Canol' },
  welsh: { en: 'Welsh', cy: 'Cymraeg' },
  'anglo-norman': { en: 'Anglo-Norman French', cy: 'Ffrangeg Eingl-Normanaidd' },
  'middle-english': { en: 'Middle English', cy: 'Saesneg Canol' },
  english: { en: 'English', cy: 'Saesneg' },
};

export class ConversationPanel {
  readonly el = h('aside', { class: 'convo panel', hidden: true, 'aria-label': 'Conversation' });
  private current: Conversation | undefined;
  private audio: HTMLAudioElement | undefined;
  private playingAll = false;

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
    this.current = c;
    this.render(c);
    this.el.hidden = false;
    console.info(`dewidebug conversation open id=${c.id}`);
  }

  close(): void {
    this.stop();
    this.current = undefined;
    this.el.hidden = true;
  }

  private voiceUrl(c: Conversation, i: number): string {
    return `${import.meta.env.BASE_URL}voices/${c.id}-${i}.mp3`;
  }

  private stop(): void {
    this.playingAll = false;
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
    audio.addEventListener('ended', () => {
      row?.classList.remove('speaking');
      then?.();
    });
    audio.play().catch((err: unknown) => {
      console.warn(`dewidebug voice play failed ${c.id}-${i}`, err);
      row?.classList.remove('speaking');
    });
    console.info(`dewidebug voice play ${c.id}-${i}`);
  }

  private playAll(c: Conversation, i = 0): void {
    if (i === 0) this.playingAll = true;
    if (!this.playingAll || i >= c.lines.length) {
      this.playingAll = false;
      return;
    }
    this.play(c, i, () => {
      setTimeout(() => {
        this.playAll(c, i + 1);
      }, 350);
    });
  }

  private render(c: Conversation): void {
    const lang = this.store.lang;
    const close = h('button', { class: 'tool convo-close', type: 'button' }, this.store.t('close'));
    close.addEventListener('click', () => {
      this.close();
    });
    const playAll = h('button', { class: 'tool convo-play', type: 'button' }, `▶ ${this.store.t('playAll')}`);
    playAll.addEventListener('click', () => {
      this.stop();
      this.playAll(c);
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
      const language = LANGUAGE_NAMES[l.language]?.[lang] ?? l.language;
      const showTranslation = l.spoken !== l.translation[lang];
      return h(
        'li',
        { class: 'line', 'data-line': i },
        play,
        h(
          'div',
          { class: 'line-body' },
          h('div', { class: 'line-who' }, h('b', {}, person?.name ?? ''), h('span', {}, ` ${language}`)),
          h(
            'p',
            {
              class: 'line-spoken',
              lang: l.language === 'english' ? 'en' : l.language === 'latin' ? 'la' : 'cy',
            },
            l.spoken,
          ),
          showTranslation ? h('p', { class: 'line-translation' }, l.translation[lang]) : null,
          l.quote ? h('p', { class: 'line-quote' }, l.quote[lang]) : null,
        ),
      );
    });
    const cast = c.people
      .map((id) => this.people.get(id))
      .filter((p): p is Person => p !== undefined)
      .map((p) =>
        h('li', {}, h('b', {}, p.name), ` ${p.role[lang]}${p.family ? ` · ${this.store.t('family')}` : ''}`),
      );
    const note = c.languageNote
      ? h('p', { class: 'convo-note' }, h('b', {}, `${this.store.t('aboutLanguage')} `), c.languageNote[lang])
      : undefined;
    this.el.replaceChildren(
      h(
        'div',
        { class: 'convo-head' },
        h('div', {}, h('span', { class: 'convo-when' }, c.setIn[lang]), h('h2', {}, c.title[lang])),
        close,
      ),
      h('div', { class: 'convo-meta' }, provenanceBadge(c.provenance, this.store, this.sources), playAll),
      h('ul', { class: 'convo-cast' }, ...cast),
      h('ol', { class: 'convo-lines' }, ...lines),
    );
    if (note) this.el.append(note);
  }
}
