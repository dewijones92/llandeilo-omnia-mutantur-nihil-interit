import type { Photograph } from '../domain/model.ts';
import { datedLabel, isPlaced } from '../domain/photos.ts';
import type { Source } from '../domain/provenance.ts';
import { formatYear } from '../domain/time.ts';
import { h } from './dom.ts';
import { infoBadge, sourceList } from './provenance.ts';
import type { LangStore } from './store.ts';

// The catalogue's words and our notes are English; the panel's own labels follow the language toggle.
const english = (text: string, className = ''): HTMLElement =>
  h('span', { lang: 'en', class: className }, text);

export class PhotoPanel {
  readonly el = h('aside', { class: 'photo panel', hidden: true });
  private current: Photograph | undefined;
  private returnFocus: HTMLElement | null = null;
  onVisibility: (() => void) | undefined;

  constructor(
    private readonly store: LangStore,
    private readonly sources: ReadonlyMap<string, Source>,
  ) {
    store.onChange(() => {
      if (this.current) this.render(this.current);
    });
  }

  get open(): Photograph | undefined {
    return this.current;
  }

  show(photo: Photograph): void {
    this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.current = photo;
    this.render(photo);
    this.el.hidden = false;
    this.el.scrollTop = 0;
    this.el.querySelector<HTMLElement>('h2')?.focus();
    this.onVisibility?.();
    console.info(`dewidebug photo open id=${photo.id} placement=${photo.placement.kind}`);
  }

  close(): void {
    if (this.el.hidden) return;
    const was = this.current?.id;
    this.current = undefined;
    this.el.hidden = true;
    if (this.el.contains(document.activeElement)) this.returnFocus?.focus();
    this.returnFocus = null;
    this.onVisibility?.();
    console.info(`dewidebug photo close id=${was ?? '-'}`);
  }

  private row(label: string, value: Node): HTMLElement {
    return h('div', { class: 'photo-row' }, h('dt', {}, label), h('dd', {}, value));
  }

  private surety(photo: Photograph): HTMLElement {
    const t = (k: Parameters<LangStore['t']>[0]): string => this.store.t(k);
    const placed = isPlaced(photo) ? photo.placement : undefined;
    const kind = placed?.basis ?? 'reconstructed';
    const range = `${formatYear(photo.when.from, this.store.lang)}–${formatYear(photo.when.to, this.store.lang)}`;
    return infoBadge(kind, this.store, [
      h(
        'span',
        { class: 'prov-basis' },
        h('b', {}, `${t('photoDate')}: `),
        range,
        '. ',
        english(photo.dateNote),
      ),
      placed
        ? h(
            'span',
            { class: 'prov-basis' },
            h('b', {}, `${t('photoPlacement')}: `),
            `${t('photoWithin')} ${String(placed.accuracyM)} m. `,
            english(placed.note),
          )
        : null,
      sourceList(photo.provenance, this.store, this.sources),
      h('span', { class: 'prov-help' }, t('photoEnglishOnly')),
    ]);
  }

  private render(photo: Photograph): void {
    const lang = this.store.lang;
    const t = (k: Parameters<LangStore['t']>[0]): string => this.store.t(k);
    this.el.setAttribute('aria-label', `${t('photo')}: ${photo.where}`);
    const close = h('button', { class: 'tool photo-close', type: 'button' }, t('close'));
    close.addEventListener('click', () => {
      this.close();
    });
    const image = h('img', {
      class: 'photo-img',
      src: `${import.meta.env.BASE_URL}${photo.file}`,
      alt: photo.shows,
      lang: 'en',
    });
    this.el.replaceChildren(
      h(
        'div',
        { class: 'photo-head' },
        h(
          'div',
          {},
          h('span', { class: 'photo-when' }, `${t('photo')} · ${datedLabel(photo, lang)}`),
          h('h2', { tabindex: -1, lang: 'en' }, photo.title),
        ),
        close,
      ),
      h(
        'figure',
        { class: 'photo-figure' },
        image,
        h(
          'figcaption',
          {},
          h('b', {}, `${t('photoCredit')}: `),
          english(photo.credit),
          ' ',
          h('a', { href: photo.catalogueUrl, target: '_blank', rel: 'noopener' }, t('photoView')),
        ),
      ),
      h(
        'div',
        { class: 'photo-meta' },
        h('span', { class: 'photo-sure' }, `${t('photoSure')} `),
        this.surety(photo),
      ),
      h(
        'dl',
        { class: 'photo-facts' },
        this.row(t('photoDate'), h('span', {}, datedLabel(photo, lang))),
        this.row(t('photoShows'), english(photo.shows)),
        this.row(t('photoWhere'), english(photo.where)),
      ),
    );
  }
}
