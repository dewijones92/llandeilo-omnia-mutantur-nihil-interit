import type { Feature, KeyEvent, Place } from '../domain/model.ts';
import { partsByTier, TIERS, type Part } from '../domain/plan.ts';
import { namedLater } from '../domain/places.ts';
import type { Source } from '../domain/provenance.ts';
import { contains, formatYear } from '../domain/time.ts';
import { h } from './dom.ts';
import { basisOf, provenanceBadge, sourceItems, TIER_ICON } from './provenance.ts';
import type { LangStore } from './store.ts';

export class MomentCard {
  readonly el = h('article', { class: 'moment panel', 'aria-live': 'polite', hidden: true });
  private current: KeyEvent | undefined;

  constructor(
    private readonly store: LangStore,
    private readonly sources: ReadonlyMap<string, Source>,
    private readonly places: ReadonlyMap<string, Place>,
    private readonly features: readonly Feature[] = [],
  ) {
    store.onChange(() => {
      const ev = this.current;
      this.current = undefined;
      this.show(ev);
    });
  }

  show(ev: KeyEvent | undefined): void {
    if (ev === this.current) return;
    this.current = ev;
    if (!ev) {
      this.el.hidden = true;
      return;
    }
    const lang = this.store.lang;
    const from = formatYear(ev.when.from, lang, ev.approximate);
    const to = ev.when.to > ev.when.from ? `–${formatYear(ev.when.to, lang)}` : '';
    const place = ev.place ? this.places.get(ev.place) : undefined;
    const parts = this.drawnHere(ev);
    this.el.replaceChildren(
      h(
        'div',
        { class: 'moment-meta' },
        h('span', { class: 'moment-date' }, `${from}${to}`),
        place
          ? h(
              'span',
              { class: 'moment-place' },
              namedLater(place, ev.when.from) ? `${place.name} (${this.store.t('todayName')})` : place.name,
            )
          : null,
      ),
      h('h2', {}, ev.title[lang]),
      h('p', {}, ev.summary[lang]),
      provenanceBadge(ev.provenance, this.store, this.sources),
      ...(parts ? [parts] : []),
    );
    this.el.hidden = false;
    console.info(`dewidebug moment shown event=${ev.id}`);
  }

  // What is drawn at this place and moment, part by part, for the models whose parts carry their own tier.
  private drawnHere(ev: KeyEvent): HTMLElement | null {
    const here = this.features.filter(
      (f) =>
        f.place === ev.place &&
        f.kind.type === 'building' &&
        f.kind.plan.parts.some((p) => p.provenance) &&
        contains(f.when, ev.when.from),
    );
    if (here.length === 0) return null;
    const body = h('div', { class: 'moment-parts-body panel' });
    const details = h(
      'details',
      { class: 'moment-parts' },
      h('summary', {}, this.store.t('partsHeading')),
      body,
    );
    details.addEventListener('toggle', () => {
      if (!details.open || details.dataset['filled']) return;
      details.dataset['filled'] = 'true';
      body.append(...here.flatMap((f) => this.partsOf(f)));
      console.info(`dewidebug moment parts opened features=${here.map((f) => f.id).join(',')}`);
    });
    return details;
  }

  private partsOf(f: Feature): HTMLElement[] {
    if (f.kind.type !== 'building') return [];
    const lang = this.store.lang;
    const by = partsByTier(f.kind.plan);
    return [
      h('h3', {}, f.label[lang]),
      ...TIERS.flatMap((tier) => {
        const parts = by[tier];
        if (parts.length === 0) return [];
        return [
          h(
            'h4',
            { class: `tier tier-${tier}` },
            `${TIER_ICON[tier]} ${this.store.t(tier)} (${String(parts.length)})`,
          ),
          h('ul', {}, ...parts.map((p) => this.partItem(p))),
        ];
      }),
    ];
  }

  private partItem(p: Part): HTMLElement {
    const lang = this.store.lang;
    const pr = p.provenance;
    const note = pr ? basisOf(pr, lang) : null;
    const list = pr ? sourceItems(pr, this.sources) : [];
    return h(
      'li',
      {},
      h(
        'details',
        { 'data-part': p.id ?? '' },
        h('summary', {}, p.name?.[lang] ?? p.id ?? ''),
        note ? h('p', {}, note) : null,
        list.length ? h('ul', { class: 'moment-sources' }, ...list) : null,
      ),
    );
  }
}
