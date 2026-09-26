import type { AlmanacEntry, AlmanacTopic, LanguageSnapshot } from '../domain/model.ts';
import type { Source } from '../domain/provenance.ts';
import { formatYear } from '../domain/time.ts';
import type { Snapshot } from '../domain/state.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

export type InfoTab = 'almanac' | 'language' | 'about';

const TOPICS: Readonly<Record<AlmanacTopic, { en: string; cy: string }>> = {
  food: { en: 'Food', cy: 'Bwyd' },
  clothing: { en: 'Clothing', cy: 'Dillad' },
  homes: { en: 'Homes', cy: 'Cartrefi' },
  religion: { en: 'Belief', cy: 'Cred' },
  money: { en: 'Money', cy: 'Arian' },
  health: { en: 'Health', cy: 'Iechyd' },
  travel: { en: 'Travel', cy: 'Teithio' },
  population: { en: 'People', cy: 'Pobl' },
  nature: { en: 'Nature', cy: 'Natur' },
};

export class InfoPanel {
  readonly el = h('aside', { class: 'info panel', hidden: true });
  private tab: InfoTab = 'almanac';
  private snapshot: Snapshot | undefined;
  private key = '';

  constructor(
    private readonly store: LangStore,
    private readonly sources: ReadonlyMap<string, Source>,
    private readonly counts: { readonly sources: number; readonly events: number; readonly features: number },
  ) {
    store.onChange(() => {
      this.key = '';
      this.render();
    });
  }

  get isOpen(): boolean {
    return !this.el.hidden;
  }

  open(tab: InfoTab): void {
    this.tab = tab;
    this.el.hidden = false;
    this.key = '';
    this.render();
    console.info(`dewidebug info open tab=${tab}`);
  }

  close(): void {
    this.el.hidden = true;
  }

  update(s: Snapshot): void {
    this.snapshot = s;
    if (!this.el.hidden) this.render();
  }

  private render(): void {
    const s = this.snapshot;
    const key = `${this.tab}|${this.store.lang}|${s?.almanac.map((a) => a.id).join(',') ?? ''}|${s?.language?.id ?? ''}|${s?.era?.id ?? ''}`;
    if (key === this.key) return;
    this.key = key;
    const tabs = (['almanac', 'language', 'about'] as const).map((t) => {
      const b = h('button', { type: 'button', 'aria-pressed': this.tab === t }, this.store.t(t));
      b.addEventListener('click', () => {
        this.open(t);
      });
      return b;
    });
    const close = h('button', { class: 'tool', type: 'button' }, this.store.t('close'));
    close.addEventListener('click', () => {
      this.close();
    });
    const lang = this.store.lang;
    const when = s
      ? `${formatYear(s.year, lang, s.year < 1000)}${s.era ? ` · ${s.era.name[lang]}` : ''}`
      : '';
    let body: HTMLElement;
    if (this.tab === 'almanac') body = this.almanac(s?.almanac ?? []);
    else if (this.tab === 'language') body = this.language(s?.language);
    else body = this.about();
    this.el.replaceChildren(
      h('div', { class: 'info-head' }, h('div', { class: 'seg', role: 'tablist' }, ...tabs), close),
      this.tab === 'about' ? h('div') : h('p', { class: 'info-when' }, when),
      body,
    );
  }

  private almanac(entries: readonly AlmanacEntry[]): HTMLElement {
    const lang = this.store.lang;
    if (entries.length === 0) return h('p', { class: 'info-empty' }, this.store.t('nothingRecorded'));
    return h(
      'ul',
      { class: 'info-list' },
      ...entries.map((e) =>
        h(
          'li',
          {},
          h('span', { class: 'info-topic' }, TOPICS[e.topic][lang]),
          h('p', {}, e.text[lang]),
          provenanceBadge(e.provenance, this.store, this.sources),
        ),
      ),
    );
  }

  private language(snap: LanguageSnapshot | undefined): HTMLElement {
    const lang = this.store.lang;
    if (!snap) return h('p', { class: 'info-empty' }, this.store.t('nothingRecorded'));
    return h(
      'div',
      {},
      h(
        'ul',
        { class: 'info-list' },
        ...snap.uses.map((u) =>
          h('li', {}, h('span', { class: 'info-topic' }, u.who[lang]), h('p', {}, u.note[lang])),
        ),
      ),
      provenanceBadge(snap.provenance, this.store, this.sources),
    );
  }

  private about(): HTMLElement {
    const repo = 'https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit';
    return h(
      'div',
      { class: 'info-about' },
      h('p', {}, this.store.t('aboutBody')),
      h(
        'p',
        {},
        `${this.counts.events} ${this.store.t('keyDates')} · ${this.counts.features} ${this.store.t('featuresCount')} · ${this.counts.sources} ${this.store.t('sourcesCount')}`,
      ),
      h('h3', {}, this.store.t('credits')),
      h('p', {}, this.store.t('osCredit')),
      h('p', {}, this.store.t('voicesCredit')),
      h('p', {}, this.store.t('soundCredit')),
      h(
        'p',
        {},
        h(
          'a',
          { href: `${repo}/tree/main/docs`, target: '_blank', rel: 'noopener' },
          this.store.t('researchLink'),
        ),
      ),
    );
  }
}
