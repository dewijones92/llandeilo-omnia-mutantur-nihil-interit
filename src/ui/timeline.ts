import { clamp } from '../domain/assert.ts';
import type { Era, KeyEvent } from '../domain/model.ts';
import { latestStarting } from '../domain/state.ts';
import { formatYear } from '../domain/time.ts';
import { tAt, yearAt, type Timeline } from '../domain/timeline.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

export interface TimelineCallbacks {
  onScrub(t: number): void;
  onRelease(t: number): void;
}

export class TimelineBar {
  readonly el: HTMLElement;
  private readonly track: HTMLElement;
  private readonly thumb: HTMLElement;
  private readonly yearEl: HTMLElement;
  private readonly eraEl: HTMLElement;
  private readonly bands: HTMLElement;
  private readonly markers: HTMLElement;
  private readonly ticks: HTMLElement;
  private t = 0;
  private dragging = false;
  private animation = 0;

  constructor(
    private readonly timeline: Timeline,
    private readonly eras: readonly Era[],
    private readonly events: readonly KeyEvent[],
    private readonly store: LangStore,
    private readonly cb: TimelineCallbacks,
  ) {
    this.yearEl = h('span', { class: 'tl-year' });
    this.eraEl = h('span', { class: 'tl-era' });
    this.bands = h('div', { class: 'tl-bands', 'aria-hidden': 'true' });
    this.markers = h('div', { class: 'tl-markers' });
    this.thumb = h('div', { class: 'tl-thumb', 'aria-hidden': 'true' }, h('span', { class: 'tl-knob' }));
    this.track = h(
      'div',
      {
        class: 'tl-track',
        role: 'slider',
        tabindex: 0,
        'aria-valuemin': 0,
        'aria-valuemax': 1000,
        'aria-label': store.t('timeline'),
        'aria-describedby': 'tl-hint',
      },
      this.bands,
      this.thumb,
    );
    const hint = h('span', { id: 'tl-hint', class: 'sr-only' }, store.t('sliderHint'));
    this.ticks = h('div', { class: 'tl-ticks', 'aria-hidden': 'true' });
    this.el = h(
      'section',
      { class: 'timeline panel', 'aria-label': store.t('timeline') },
      h('div', { class: 'tl-readout' }, this.yearEl, this.eraEl),
      h('div', { class: 'tl-rail' }, this.track, this.markers),
      this.ticks,
      hint,
    );
    this.render();
    this.bind();
    store.onChange(() => {
      this.el.setAttribute('aria-label', store.t('timeline'));
      this.track.setAttribute('aria-label', store.t('timeline'));
      hint.textContent = store.t('sliderHint');
      this.render();
      this.set(this.t);
    });
  }

  get value(): number {
    return this.t;
  }

  set(t: number): void {
    this.t = clamp(t, 0, 1);
    const y = yearAt(this.timeline, this.t);
    const era = latestStarting(this.eras, y);
    const lang = this.store.lang;
    this.thumb.style.left = `${this.t * 100}%`;
    this.yearEl.textContent = formatYear(y, lang, y < 1000);
    this.eraEl.textContent = era ? era.name[lang] : '';
    this.el.style.setProperty('--era', era?.colour ?? '#667085');
    this.track.setAttribute('aria-valuenow', String(Math.round(this.t * 1000)));
    this.track.setAttribute(
      'aria-valuetext',
      `${this.yearEl.textContent}${era ? `, ${era.name[lang]}` : ''}`,
    );
  }

  animateTo(target: number, done?: () => void): void {
    cancelAnimationFrame(this.animation);
    const from = this.t;
    const start = performance.now();
    const duration = 520;
    const step = (now: number): void => {
      const f = clamp((now - start) / duration, 0, 1);
      const e = 1 - Math.pow(1 - f, 3);
      this.set(from + (target - from) * e);
      this.cb.onScrub(this.t);
      if (f < 1) this.animation = requestAnimationFrame(step);
      else done?.();
    };
    this.animation = requestAnimationFrame(step);
  }

  private render(): void {
    const lang = this.store.lang;
    this.bands.replaceChildren(
      ...this.eras.map((era) => {
        const a = tAt(this.timeline, era.when.from);
        const b = tAt(this.timeline, era.when.to);
        const band = h('div', { class: 'tl-band', title: era.name[lang] });
        band.style.left = `${a * 100}%`;
        band.style.width = `${(b - a) * 100}%`;
        band.style.background = era.colour;
        return band;
      }),
    );
    this.markers.replaceChildren(
      ...this.events.map((ev) => {
        const t = tAt(this.timeline, ev.when.from);
        const m = h(
          'button',
          {
            class: `tl-marker${ev.magnetic ? ' magnetic' : ''}`,
            type: 'button',
            tabindex: -1,
            'aria-label': `${formatYear(ev.when.from, lang, ev.approximate)}: ${ev.title[lang]}`,
          },
          h(
            'span',
            { class: 'tl-marker-tip' },
            h('b', {}, formatYear(ev.when.from, lang, ev.approximate)),
            ` ${ev.title[lang]}`,
          ),
        );
        m.style.left = `${t * 100}%`;
        m.addEventListener('click', (e) => {
          e.stopPropagation();
          this.animateTo(t, () => {
            this.cb.onRelease(t);
          });
        });
        m.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
        });
        return m;
      }),
    );
    this.ticks.replaceChildren(
      ...this.timeline.anchors.map((a) => {
        const label = h('span', { class: 'tl-tick' }, formatYear(a.year, lang));
        label.style.left = `${a.t * 100}%`;
        return label;
      }),
    );
  }

  private tFromPointer(clientX: number): number {
    const rect = this.track.getBoundingClientRect();
    return clamp((clientX - rect.left) / rect.width, 0, 1);
  }

  private bind(): void {
    this.track.addEventListener('pointerdown', (e) => {
      cancelAnimationFrame(this.animation);
      this.dragging = true;
      this.track.setPointerCapture(e.pointerId);
      this.el.classList.add('dragging');
      this.set(this.tFromPointer(e.clientX));
      this.cb.onScrub(this.t);
    });
    this.track.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      this.set(this.tFromPointer(e.clientX));
      this.cb.onScrub(this.t);
    });
    const end = (e: PointerEvent): void => {
      if (!this.dragging) return;
      this.dragging = false;
      this.el.classList.remove('dragging');
      if (this.track.hasPointerCapture(e.pointerId)) this.track.releasePointerCapture(e.pointerId);
      this.cb.onRelease(this.t);
    };
    this.track.addEventListener('pointerup', end);
    this.track.addEventListener('pointercancel', end);
    this.track.addEventListener('keydown', (e) => {
      const magnetic = this.events.filter((ev) => ev.magnetic).map((ev) => tAt(this.timeline, ev.when.from));
      let target: number | undefined;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = this.t + (e.shiftKey ? 0.02 : 0.002);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = this.t - (e.shiftKey ? 0.02 : 0.002);
      else if (e.key === 'PageUp') target = magnetic.find((m) => m > this.t + 0.0005) ?? 1;
      else if (e.key === 'PageDown') target = [...magnetic].reverse().find((m) => m < this.t - 0.0005) ?? 0;
      else if (e.key === 'Home') target = 0;
      else if (e.key === 'End') target = 1;
      if (target === undefined) return;
      e.preventDefault();
      const final = clamp(target, 0, 1);
      if (e.key.startsWith('Arrow')) {
        this.set(final);
        this.cb.onScrub(this.t);
      } else {
        this.animateTo(final, () => {
          this.cb.onRelease(final);
        });
      }
    });
  }
}
