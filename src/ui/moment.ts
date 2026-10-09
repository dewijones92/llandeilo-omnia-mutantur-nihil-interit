import type { Cutscene } from '../domain/cutscene.ts';
import type { EventId, KeyEvent, Place } from '../domain/model.ts';
import { namedLater } from '../domain/places.ts';
import type { Source } from '../domain/provenance.ts';
import { formatYear } from '../domain/time.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

export class MomentCard {
  readonly el = h('article', { class: 'moment panel', 'aria-live': 'polite', hidden: true });
  private current: KeyEvent | undefined;

  constructor(
    private readonly store: LangStore,
    private readonly sources: ReadonlyMap<string, Source>,
    private readonly places: ReadonlyMap<string, Place>,
    private readonly scenes: ReadonlyMap<EventId, Cutscene>,
    private readonly onWatch: (scene: Cutscene) => void,
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
    );
    const scene = this.scenes.get(ev.id);
    if (scene) {
      const watch = h(
        'button',
        { class: 'tool moment-watch', type: 'button', title: this.store.t('watchHint') },
        `▶ ${this.store.t('watch')}`,
      );
      watch.addEventListener('click', () => {
        console.info(`dewidebug moment watch event=${ev.id} scene=${scene.id}`);
        this.onWatch(scene);
      });
      this.el.append(watch);
    }
    this.el.hidden = false;
    console.info(`dewidebug moment shown event=${ev.id}`);
  }
}
