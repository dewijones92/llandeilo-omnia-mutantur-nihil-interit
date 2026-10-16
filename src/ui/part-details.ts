import { kitInfo } from '../content/kits.ts';
import { SURFACE_LIBRARY, SURFACE_LICENCE_SHORT, SURFACES } from '../content/surfaces.ts';
import type { Part } from '../domain/plan.ts';
import type { Source } from '../domain/provenance.ts';
import { isTextured, partSurfaces } from '../domain/surfaces.ts';
import { h } from './dom.ts';
import { basisOf, sourceItems, TIER_ICON } from './provenance.ts';
import type { LangStore } from './store.ts';

/**
 * What a part's ⓘ says, wherever it opens: in the key date's parts list or from a click on the part in 3D
 * (ADR 0055). How the part is known, its sources, and, while its Blender model is on screen, the construction
 * detail and the surfaces the model draws, each with its own tier.
 */
export function partBody(
  p: Part,
  modelled: boolean,
  store: LangStore,
  sources: ReadonlyMap<string, Source>,
): HTMLElement[] {
  const lang = store.lang;
  const pr = p.provenance;
  const note = pr ? basisOf(pr, lang) : null;
  const list = pr ? sourceItems(pr, sources) : [];
  return [
    ...(note ? [h('p', {}, note)] : []),
    ...(list.length ? [h('ul', { class: 'moment-sources' }, ...list)] : []),
    ...(modelled ? [kitsOf(p, store, sources), surfacesOf(p, store, sources)] : [kitsOff(p, store)]).filter(
      (e): e is HTMLElement => e !== null,
    ),
  ];
}

// On screen the simplified plan, not the model: say so rather than list detail that is not drawn.
function kitsOff(p: Part, store: LangStore): HTMLElement | null {
  if (!p.kits?.length) return null;
  return h('p', { class: 'moment-kits-off' }, store.t('partKitsOff'));
}

// The construction details a Blender model draws on the part, each with its own tier (ADR 0053).
function kitsOf(p: Part, store: LangStore, sources: ReadonlyMap<string, Source>): HTMLElement | null {
  if (!p.kits?.length) return null;
  const lang = store.lang;
  return h(
    'div',
    { class: 'moment-kits' },
    h('h5', {}, store.t('partKits')),
    h(
      'ul',
      {},
      ...p.kits.map((id) => {
        const kit = kitInfo(id);
        const basis = basisOf(kit.provenance, lang);
        const kitSources = sourceItems(kit.provenance, sources);
        return h(
          'li',
          { class: `tier-${kit.provenance.kind}`, 'data-kit': id },
          h('b', {}, `${TIER_ICON[kit.provenance.kind]} ${kit.name[lang]} (${store.t(kit.provenance.kind)})`),
          basis ? ` ${basis}` : null,
          ...(kitSources.length ? [h('ul', { class: 'moment-sources' }, ...kitSources)] : []),
        );
      }),
    ),
    h('p', { class: 'moment-finish' }, store.t('modelFinish')),
  );
}

// The photographic surfaces the close-up model shows on the part: what each was made of, and the photograph's credit (ADR 0055).
function surfacesOf(p: Part, store: LangStore, sources: ReadonlyMap<string, Source>): HTMLElement | null {
  const shown = partSurfaces(p).filter(isTextured);
  if (shown.length === 0) return null;
  const lang = store.lang;
  return h(
    'div',
    { class: 'moment-surfaces' },
    h('h5', {}, store.t('partSurfaces')),
    h(
      'ul',
      {},
      ...shown.map((id) => {
        const s = SURFACES[id];
        const basis = basisOf(s.provenance, lang);
        const list = sourceItems(s.provenance, sources);
        return h(
          'li',
          { class: `tier-${s.provenance.kind}`, 'data-surface': id },
          h('b', {}, `${TIER_ICON[s.provenance.kind]} ${s.name[lang]} (${store.t(s.provenance.kind)})`),
          basis ? ` ${basis}` : null,
          h(
            'span',
            { class: 'moment-photo' },
            `${store.t('surfacePhoto')}: `,
            h('a', { href: s.photo.page, target: '_blank', rel: 'noopener' }, `“${s.photo.title}”`),
            ` ${store.t('surfaceBy')} ${s.photo.author}, ${SURFACE_LIBRARY}, ${SURFACE_LICENCE_SHORT}`,
          ),
          ...(list.length ? [h('ul', { class: 'moment-sources' }, ...list)] : []),
        );
      }),
    ),
  );
}
