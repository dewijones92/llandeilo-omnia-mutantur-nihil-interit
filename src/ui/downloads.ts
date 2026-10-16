import { formatBytes, type Download, type Period } from '../content/downloads.ts';
import type { Lang } from '../domain/i18n.ts';
import type { Source } from '../domain/provenance.ts';
import { formatYear } from '../domain/time.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

function periodText(p: Period, lang: Lang): string {
  if (p.kind === 'text') return p.text[lang];
  return `${formatYear(p.when.from, lang, p.approximate)}–${formatYear(p.when.to, lang)}`;
}

const count = (v: number, lang: Lang): string => v.toLocaleString(lang === 'cy' ? 'cy-GB' : 'en-GB');

function fact(label: string, value: string): HTMLElement[] {
  return [h('dt', {}, label), h('dd', {}, value)];
}

function row(d: Download, store: LangStore, sources: ReadonlyMap<string, Source>): HTMLElement {
  const lang = store.lang;
  const facts = [
    ...fact(store.t('downloadPeriod'), periodText(d.period, lang)),
    ...fact(store.t('downloadSize'), formatBytes(d.bytes, lang)),
    ...fact(store.t('downloadTriangles'), count(d.triangles, lang)),
    ...(d.tile
      ? [
          ...fact(
            store.t('downloadHeights'),
            `${d.tile.minHeight.toFixed(1)}–${d.tile.maxHeight.toFixed(1)}m`,
          ),
          ...fact(
            store.t('downloadOrigin'),
            `${String(d.tile.e)} E, ${String(d.tile.n)} N (${store.t('downloadOriginNote')})`,
          ),
        ]
      : []),
  ];
  return h(
    'li',
    { class: 'dl', 'data-file': d.file },
    h(
      'div',
      { class: 'dl-head' },
      h('b', { class: 'dl-name' }, d.name[lang]),
      d.variant ? h('span', { class: 'dl-variant' }, d.variant[lang]) : null,
    ),
    h('p', { class: 'dl-what' }, d.what[lang]),
    h('dl', { class: 'dl-facts' }, ...facts),
    d.provenance ? provenanceBadge(d.provenance, store, sources) : null,
    h(
      'details',
      { class: 'dl-credit' },
      h('summary', {}, store.t('downloadCreditLicence')),
      h('p', {}, `${d.asset.source}. `),
      h('a', { href: d.asset.url, target: '_blank', rel: 'noopener' }, d.asset.licence),
    ),
    h(
      'a',
      {
        class: 'tool dl-link',
        href: `${import.meta.env.BASE_URL}${d.file}`,
        download: true,
      },
      store.t('downloadLink'),
    ),
  );
}

function section(
  title: string,
  note: string,
  rows: readonly Download[],
  store: LangStore,
  sources: ReadonlyMap<string, Source>,
  id: string,
): HTMLElement {
  const first = rows[0]?.asset.source;
  const shared = first !== undefined && rows.every((d) => d.asset.source === first);
  return h(
    'section',
    { class: 'dl-section', id },
    h('h3', {}, title),
    h('p', { class: 'dl-note' }, note),
    shared ? h('p', { class: 'dl-note dl-attribution' }, first) : null,
    h('ul', { class: 'info-list dl-list' }, ...rows.map((d) => row(d, store, sources))),
  );
}

/** The Downloads tab: every file the app offers, with what it shows, its period and size, its credit and licence, and a link. */
export function downloadsBody(
  downloads: readonly Download[],
  store: LangStore,
  sources: ReadonlyMap<string, Source>,
): HTMLElement {
  const models = downloads.filter((d) => d.group === 'models');
  const terrain = downloads.filter((d) => d.group === 'terrain');
  return h(
    'div',
    { class: 'info-about info-downloads' },
    h('p', {}, store.t('downloadsIntro')),
    section(store.t('downloadsModels'), store.t('downloadsModelsNote'), models, store, sources, 'dl-models'),
    section(
      store.t('downloadsTerrain'),
      store.t('downloadsTerrainNote'),
      terrain,
      store,
      sources,
      'dl-terrain',
    ),
  );
}
