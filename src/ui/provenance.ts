import type { Provenance, Source } from '../domain/provenance.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const ICON = {
  documented: '✓',
  reconstructed: '◇',
  imagined: 'i',
} as const;

/** The provenance chip: hover, focus or tap to see what kind of claim this is and why. */
export function provenanceBadge(
  p: Provenance,
  store: LangStore,
  sources: ReadonlyMap<string, Source>,
): HTMLElement {
  const lang = store.lang;
  const label = store.t(p.kind);
  const help = store.t(`${p.kind}Help`);
  const basis =
    p.kind === 'documented'
      ? (p.note?.[lang] ?? null)
      : p.kind === 'reconstructed'
        ? p.basis[lang]
        : p.groundedIn[lang];
  const list = p.sources
    .map((id) => sources.get(id))
    .filter((s): s is Source => s !== undefined)
    .map((s) =>
      h('li', {}, s.url ? h('a', { href: s.url, target: '_blank', rel: 'noopener' }, s.title) : s.title),
    );
  const pop = h(
    'span',
    { class: 'prov-pop', role: 'tooltip' },
    h('strong', {}, label),
    h('span', { class: 'prov-help' }, help),
    basis ? h('span', { class: 'prov-basis' }, h('b', {}, `${store.t('basedOn')}: `), basis) : null,
    list.length
      ? h('span', { class: 'prov-sources' }, h('b', {}, store.t('sources')), h('ul', {}, ...list))
      : null,
  );
  const badge = h(
    'button',
    { class: `prov prov-${p.kind}`, type: 'button', 'aria-label': `${label}. ${help}` },
    h('span', { class: 'prov-icon', 'aria-hidden': 'true' }, ICON[p.kind]),
    h('span', { class: 'prov-label' }, label),
  );
  const wrap = h('span', { class: 'prov-wrap' }, badge, pop);
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    wrap.classList.remove('open');
  });
  return wrap;
}
