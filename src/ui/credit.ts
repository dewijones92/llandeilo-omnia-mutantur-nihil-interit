import { h } from './dom.ts';
import type { LangStore } from './store.ts';

export interface CreditLinked {
  readonly licence: string;
  readonly licenceUrl?: string;
  readonly url: string;
}

/** The links a credit carries, one rule for the About credits and the Downloads list: the licence at its own text where the record has one (else at the source page), and the source page beside it when they differ. */
export function creditLinks(asset: CreditLinked, store: LangStore): HTMLElement[] {
  return [
    h('a', { href: asset.licenceUrl ?? asset.url, target: '_blank', rel: 'noopener' }, asset.licence),
    ...(asset.licenceUrl
      ? [
          h(
            'a',
            { class: 'dl-source', href: asset.url, target: '_blank', rel: 'noopener' },
            store.t('downloadSourcePage'),
          ),
        ]
      : []),
  ];
}
