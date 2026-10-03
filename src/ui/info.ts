import { ASSETS, EXTERNAL_CREDITS } from '../content/assets.ts';
import { ALMANAC_TOPICS } from '../content/languages.ts';
import type { AlmanacEntry, LanguageSnapshot } from '../domain/model.ts';
import type { Source } from '../domain/provenance.ts';
import { formatSliderYear } from '../domain/time.ts';
import type { Snapshot } from '../domain/state.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

export type InfoTab = 'almanac' | 'language' | 'about';

export class InfoPanel {
  readonly el = h('aside', { class: 'info panel', hidden: true });
  private tab: InfoTab = 'almanac';
  private snapshot: Snapshot | undefined;
  private key = '';
  private readonly whenEl = h('p', { class: 'info-when' });

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

  onVisibility: (() => void) | undefined;

  open(tab: InfoTab): void {
    this.tab = tab;
    const wasHidden = this.el.hidden;
    this.el.hidden = false;
    this.key = '';
    this.render();
    if (wasHidden) this.onVisibility?.();
    console.info(`dewidebug info open tab=${tab}`);
  }

  close(): void {
    if (this.el.hidden) return;
    this.el.hidden = true;
    this.onVisibility?.();
  }

  update(s: Snapshot): void {
    this.snapshot = s;
    if (this.el.hidden) return;
    this.render();
    const lang = this.store.lang;
    const when = `${formatSliderYear(s.year, lang)}${s.era ? ` · ${s.era.name[lang]}` : ''}`;
    if (this.whenEl.textContent !== when) this.whenEl.textContent = when;
  }

  private render(): void {
    const s = this.snapshot;
    const key = `${this.tab}|${this.store.lang}|${s?.almanac.map((a) => a.id).join(',') ?? ''}|${s?.language?.id ?? ''}|${s?.era?.id ?? ''}`;
    if (key === this.key) return;
    this.key = key;
    const tabs = (['almanac', 'language', 'about'] as const).map((t) => {
      const b = h(
        'button',
        {
          type: 'button',
          role: 'tab',
          id: `info-tab-${t}`,
          'aria-controls': 'info-body',
          'aria-selected': this.tab === t,
          tabindex: this.tab === t ? 0 : -1,
        },
        this.store.t(t),
      );
      b.addEventListener('click', () => {
        this.open(t);
        this.el.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus();
      });
      b.addEventListener('keydown', (e) => {
        const order = ['almanac', 'language', 'about'] as const;
        const i = order.indexOf(t);
        const next =
          e.key === 'ArrowRight'
            ? order[(i + 1) % 3]
            : e.key === 'ArrowLeft'
              ? order[(i + 2) % 3]
              : undefined;
        if (!next) return;
        e.preventDefault();
        this.open(next);
        this.el.querySelector<HTMLElement>(`#info-tab-${next}`)?.focus();
      });
      return b;
    });
    const close = h('button', { class: 'tool', type: 'button' }, this.store.t('close'));
    close.addEventListener('click', () => {
      this.close();
    });
    const lang = this.store.lang;
    this.whenEl.textContent = s
      ? `${formatSliderYear(s.year, lang)}${s.era ? ` · ${s.era.name[lang]}` : ''}`
      : '';
    let body: HTMLElement;
    if (this.tab === 'almanac') body = this.almanac(s?.almanac ?? []);
    else if (this.tab === 'language') body = this.language(s?.language);
    else body = this.about();
    this.el.replaceChildren(
      h('div', { class: 'info-head' }, h('div', { class: 'seg', role: 'tablist' }, ...tabs), close),
      this.tab === 'about' ? h('div') : this.whenEl,
      h('div', { id: 'info-body', role: 'tabpanel', 'aria-labelledby': `info-tab-${this.tab}` }, body),
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
          h('span', { class: 'info-topic' }, ALMANAC_TOPICS[e.topic][lang]),
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
      h(
        'ul',
        { class: 'info-credits' },
        ...[...ASSETS, ...EXTERNAL_CREDITS].map((a) =>
          h(
            'li',
            {},
            h('b', {}, `${a.what[this.store.lang]}: `),
            `${a.source}. `,
            h('a', { href: a.url, target: '_blank', rel: 'noopener' }, a.licence),
          ),
        ),
      ),
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
