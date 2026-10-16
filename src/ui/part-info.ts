import type { Feature } from '../domain/model.ts';
import type { Part } from '../domain/plan.ts';
import type { Source } from '../domain/provenance.ts';
import { h } from './dom.ts';
import { partBody } from './part-details.ts';
import { provenanceLabel } from './provenance.ts';
import type { LangStore } from './store.ts';

// Keeps the tip off the cursor, and the panel this far inside the window's edges.
const TIP_OFFSET = 16;
const EDGE = 12;

function partOf(feature: Feature, id: string): Part | undefined {
  return feature.kind.type === 'building' ? feature.kind.plan.parts.find((p) => p.id === id) : undefined;
}

/**
 * A part of a Blender model, clicked or hovered in 3D (ADR 0055): a tip with its name while hovered, and on a
 * click a panel with its ⓘ, the same as the key date's parts list gives it. Both follow the language toggle.
 */
export class PartInfo {
  readonly tip = h('div', { class: 'part-tip panel', role: 'tooltip', hidden: true });
  readonly el = h('aside', { class: 'part-info panel', hidden: true });
  private shown: { feature: Feature; part: string; at: { x: number; y: number } } | undefined;
  private tipFor: { feature: Feature; part: string } | undefined;

  constructor(
    private readonly store: LangStore,
    private readonly sources: ReadonlyMap<string, Source>,
  ) {
    this.el.setAttribute('aria-label', store.t('partInfo'));
    store.onChange(() => {
      this.el.setAttribute('aria-label', store.t('partInfo'));
      if (this.shown) this.render(this.shown.feature, this.shown.part);
      if (this.tipFor) this.fillTip(this.tipFor.feature, this.tipFor.part);
    });
  }

  get open(): { readonly feature: string; readonly part: string } | undefined {
    return this.shown ? { feature: this.shown.feature.id, part: this.shown.part } : undefined;
  }

  showTip(feature: Feature, part: string, x: number, y: number): void {
    if (this.tipFor?.feature !== feature || this.tipFor.part !== part) {
      this.tipFor = { feature, part };
      this.fillTip(feature, part);
    }
    this.tip.hidden = false;
    this.tip.style.left = `${String(x + TIP_OFFSET)}px`;
    this.tip.style.top = `${String(y + TIP_OFFSET)}px`;
  }

  hideTip(): void {
    this.tipFor = undefined;
    this.tip.hidden = true;
  }

  show(feature: Feature, part: string, x: number, y: number): void {
    this.shown = { feature, part, at: { x, y } };
    this.render(feature, part);
    this.el.hidden = false;
    this.place(x, y);
    console.info(`dewidebug part info opened ${part} on ${feature.id}`);
  }

  close(why: string): void {
    if (!this.shown) return;
    console.info(`dewidebug part info closed ${this.shown.part} why=${why}`);
    this.shown = undefined;
    this.el.hidden = true;
    this.el.replaceChildren();
  }

  private fillTip(feature: Feature, part: string): void {
    const lang = this.store.lang;
    const p = partOf(feature, part);
    this.tip.replaceChildren(
      h('b', {}, p?.name?.[lang] ?? part),
      h('span', {}, feature.label[lang]),
      h('span', { class: 'part-tip-hint' }, this.store.t('partTipHint')),
    );
  }

  private render(feature: Feature, part: string): void {
    const lang = this.store.lang;
    const p = partOf(feature, part);
    const close = h('button', { class: 'tool part-info-close', type: 'button' }, this.store.t('close'));
    close.addEventListener('click', () => {
      this.close('close button');
    });
    this.el.dataset['part'] = part;
    this.el.replaceChildren(
      close,
      h('p', { class: 'part-info-of' }, feature.label[lang]),
      h('h2', {}, p?.name?.[lang] ?? part),
      ...(p?.provenance
        ? [
            h(
              'p',
              { class: 'part-info-tier' },
              `${this.store.t('partTier')}: `,
              provenanceLabel(p.provenance.kind, this.store),
            ),
          ]
        : []),
      ...(p ? partBody(p, true, this.store, this.sources) : []),
    );
  }

  // Beside the click, kept inside the window.
  private place(x: number, y: number): void {
    const r = this.el.getBoundingClientRect();
    const left = Math.min(Math.max(EDGE, x + TIP_OFFSET), window.innerWidth - r.width - EDGE);
    const top = Math.min(Math.max(EDGE, y - r.height / 2), window.innerHeight - r.height - EDGE);
    this.el.style.left = `${String(Math.max(EDGE, left))}px`;
    this.el.style.top = `${String(Math.max(EDGE, top))}px`;
  }
}
