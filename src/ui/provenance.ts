import type { Provenance, Source } from '../domain/provenance.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const ICON = {
  documented: '✓',
  reconstructed: '◇',
  imagined: 'i',
} as const;

let listening = false;

function closeAll(): void {
  for (const el of document.querySelectorAll('.prov-wrap.open')) el.classList.remove('open');
}

function listenOnce(): void {
  if (listening) return;
  listening = true;
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeAll();
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest('.prov-wrap')) active.blur();
  });
}

export function provenanceBadge(
  p: Provenance,
  store: LangStore,
  sources: ReadonlyMap<string, Source>,
): HTMLElement {
  const lang = store.lang;
  const basis =
    p.kind === 'documented'
      ? (p.note?.[lang] ?? null)
      : p.kind === 'reconstructed'
        ? p.basis[lang]
        : p.groundedIn[lang];
  return infoBadge(p.kind, store, [
    basis ? h('span', { class: 'prov-basis' }, h('b', {}, `${store.t('basedOn')}: `), basis) : null,
    sourceList(p, store, sources),
  ]);
}

export function sourceList(
  p: Provenance,
  store: LangStore,
  sources: ReadonlyMap<string, Source>,
): HTMLElement | null {
  const list = p.sources
    .map((id) => sources.get(id))
    .filter((s): s is Source => s !== undefined)
    .map((s) =>
      h('li', {}, s.url ? h('a', { href: s.url, target: '_blank', rel: 'noopener' }, s.title) : s.title),
    );
  return list.length
    ? h('span', { class: 'prov-sources' }, h('b', {}, store.t('sources')), h('ul', {}, ...list))
    : null;
}

/** A tier badge whose popover opens with the tier's own name and meaning, then `parts`. */
export function infoBadge(
  kind: Provenance['kind'],
  store: LangStore,
  parts: readonly (Node | null)[],
): HTMLElement {
  const label = store.t(kind);
  const help = store.t(`${kind}Help`);
  const pop = h(
    'span',
    { class: 'prov-pop', role: 'tooltip' },
    h('strong', {}, label),
    h('span', { class: 'prov-help' }, help),
    ...parts,
  );
  const badge = h(
    'button',
    { class: `prov prov-${kind}`, type: 'button', 'aria-label': `${label}. ${help}` },
    h('span', { class: 'prov-icon', 'aria-hidden': 'true' }, ICON[kind]),
    h('span', { class: 'prov-label' }, label),
  );
  const wrap = h('span', { class: 'prov-wrap' }, badge, pop);
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !wrap.classList.contains('open');
    closeAll();
    wrap.classList.toggle('open', open);
  });
  listenOnce();
  return wrap;
}
