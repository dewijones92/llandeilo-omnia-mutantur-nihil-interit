import { clamp } from '../domain/assert.ts';
import type { Era, KeyEvent } from '../domain/model.ts';
import { latestStarting } from '../domain/state.ts';
import { formatSliderYear, formatYear } from '../domain/time.ts';
import { stepAt, stepFrom, type Step } from '../domain/steps.ts';
import { tAt, yearAt, type Timeline } from '../domain/timeline.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const GHOST_START = 0.5;

export interface TimelineCallbacks {
  onScrub(t: number): void;
  onRelease(t: number): void;
  onArrive(event: KeyEvent): void;
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
  private readonly prev: HTMLButtonElement;
  private readonly next: HTMLButtonElement;
  private readonly counter: HTMLElement;
  private destination: number | undefined;
  private readonly ghost: HTMLElement;
  private ghostT: number | undefined;
  private onGuess: ((t: number) => void) | undefined;

  constructor(
    private readonly timeline: Timeline,
    private readonly eras: readonly Era[],
    private readonly events: readonly KeyEvent[],
    private readonly steps: readonly Step[],
    private readonly store: LangStore,
    private readonly cb: TimelineCallbacks,
  ) {
    this.prev = h('button', { class: 'tool tl-step', type: 'button' }, `◀ ${store.t('previous')}`);
    this.ghost = h(
      'div',
      { class: 'tl-ghost', hidden: true, 'aria-hidden': 'true' },
      h('span', { class: 'tl-ghost-flag' }, store.t('guessYours')),
    );
    this.next = h('button', { class: 'tool tl-step', type: 'button' }, `${store.t('next')} ▶`);
    this.counter = h('span', { class: 'tl-counter', 'aria-live': 'polite' });
    this.prev.addEventListener('click', () => {
      this.step(-1);
    });
    this.next.addEventListener('click', () => {
      this.step(1);
    });
    // reveals-when: hidden while a guess-the-year round is being played (see styles.css).
    this.yearEl = h('span', { class: 'tl-year reveals-when' });
    this.eraEl = h('span', { class: 'tl-era reveals-when' });
    this.bands = h('div', { class: 'tl-bands', 'aria-hidden': 'true' });
    this.markers = h('div', { class: 'tl-markers reveals-when' });
    this.thumb = h(
      'div',
      { class: 'tl-thumb reveals-when', 'aria-hidden': 'true' },
      h('span', { class: 'tl-knob' }),
    );
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
      this.ghost,
    );
    const hint = h('span', { id: 'tl-hint', class: 'sr-only' }, store.t('sliderHint'));
    this.ticks = h('div', { class: 'tl-ticks', 'aria-hidden': 'true' });
    this.el = h(
      'section',
      { class: 'timeline panel', 'aria-label': store.t('timeline') },
      h(
        'div',
        { class: 'tl-readout' },
        this.yearEl,
        this.eraEl,
        h('span', { class: 'tl-nav reveals-when' }, this.prev, this.counter, this.next),
      ),
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
      this.prev.textContent = `◀ ${store.t('previous')}`;
      this.next.textContent = `${store.t('next')} ▶`;
      this.ghost.firstElementChild?.replaceChildren(store.t('guessYours'));
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
    this.yearEl.textContent = formatSliderYear(y, lang);
    this.eraEl.textContent = era ? era.name[lang] : '';
    this.el.style.setProperty('--era', era?.colour ?? '#667085');
    this.track.setAttribute('aria-valuenow', String(Math.round(this.t * 1000)));
    this.updateNav();
    this.track.setAttribute(
      'aria-valuetext',
      `${this.yearEl.textContent}${era ? `, ${era.name[lang]}` : ''}`,
    );
  }

  private get settled(): number {
    return this.destination ?? this.t;
  }

  // While a guess is being taken the track moves the ghost marker instead of time, and stepping
  // between key dates is off, so neither can reveal the hidden year.
  takeGuess(onGuess: ((t: number) => void) | undefined): void {
    this.onGuess = onGuess;
    this.el.classList.toggle('taking-guess', onGuess !== undefined);
    console.info(`dewidebug timeline guess capture=${String(onGuess !== undefined)}`);
  }

  jump(t: number): void {
    this.settle();
    this.set(t);
    this.cb.onScrub(this.t);
  }

  showGhost(t: number | undefined): void {
    this.ghostT = t;
    this.ghost.hidden = t === undefined;
    if (t !== undefined) this.ghost.style.left = `${clamp(t, 0, 1) * 100}%`;
  }

  private moveGhost(t: number): void {
    this.showGhost(clamp(t, 0, 1));
    this.onGuess?.(clamp(t, 0, 1));
  }

  step(direction: 1 | -1): void {
    if (this.onGuess) {
      console.info('dewidebug timeline step ignored: a guess is being taken');
      return;
    }
    const target = stepFrom(this.steps, this.settled, direction);
    console.info(
      `dewidebug timeline step dir=${direction} at=${this.t.toFixed(4)} from=${this.settled.toFixed(4)} to=${target?.event.id ?? 'none'}`,
    );
    if (target) this.arrive(target);
  }

  arrive(target: Step): void {
    this.visit(target.event);
  }

  snapTo(target: Step, done?: () => void): void {
    this.animateTo(target.t, done);
  }

  private visit(event: KeyEvent): void {
    this.animateTo(tAt(this.timeline, event.when.from), () => {
      this.cb.onArrive(event);
    });
  }

  private settle(): void {
    cancelAnimationFrame(this.animation);
    this.destination = undefined;
  }

  private updateNav(): void {
    const here = stepAt(this.steps, this.t);
    const lang = this.store.lang;
    this.prev.disabled = !stepFrom(this.steps, this.settled, -1);
    this.next.disabled = !stepFrom(this.steps, this.settled, 1);
    const text = here ? `${here.index + 1} / ${this.steps.length}` : '';
    if (this.counter.textContent !== text) this.counter.textContent = text;
    this.counter.title = here ? here.event.title[lang] : '';
  }

  animateTo(target: number, done?: () => void): void {
    cancelAnimationFrame(this.animation);
    this.destination = target;
    const from = this.t;
    const start = performance.now();
    const duration = 520;
    const step = (now: number): void => {
      const f = clamp((now - start) / duration, 0, 1);
      const e = 1 - Math.pow(1 - f, 3);
      this.set(from + (target - from) * e);
      this.cb.onScrub(this.t);
      if (f < 1) this.animation = requestAnimationFrame(step);
      else {
        this.destination = undefined;
        this.updateNav();
        done?.();
      }
    };
    this.animation = requestAnimationFrame(step);
  }

  private render(): void {
    const lang = this.store.lang;
    this.bands.replaceChildren(
      ...this.eras.map((era) => {
        const a = tAt(this.timeline, era.when.from);
        const b = tAt(this.timeline, era.when.to);
        const band = h('div', { class: 'tl-band reveals-when', title: era.name[lang] });
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
          this.visit(ev);
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
      if (this.onGuess) {
        this.dragging = true;
        this.track.setPointerCapture(e.pointerId);
        this.moveGhost(this.tFromPointer(e.clientX));
        return;
      }
      this.settle();
      this.dragging = true;
      this.track.setPointerCapture(e.pointerId);
      this.el.classList.add('dragging');
      this.set(this.tFromPointer(e.clientX));
      this.cb.onScrub(this.t);
    });
    this.track.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      if (this.onGuess) {
        this.moveGhost(this.tFromPointer(e.clientX));
        return;
      }
      this.set(this.tFromPointer(e.clientX));
      this.cb.onScrub(this.t);
    });
    const end = (e: PointerEvent): void => {
      if (!this.dragging) return;
      this.dragging = false;
      this.el.classList.remove('dragging');
      if (this.track.hasPointerCapture(e.pointerId)) this.track.releasePointerCapture(e.pointerId);
      if (this.onGuess) return;
      this.cb.onRelease(this.t);
    };
    this.track.addEventListener('pointerup', end);
    this.track.addEventListener('pointercancel', end);
    this.track.addEventListener('keydown', (e) => {
      let target: number | undefined;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = this.t + (e.shiftKey ? 0.02 : 0.002);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = this.t - (e.shiftKey ? 0.02 : 0.002);
      else if (e.key === 'PageUp' || e.key === 'PageDown') {
        e.preventDefault();
        this.step(e.key === 'PageUp' ? 1 : -1);
        return;
      } else if (e.key === 'Home') target = 0;
      else if (e.key === 'End') target = 1;
      if (target === undefined) return;
      e.preventDefault();
      if (this.onGuess) {
        // Arrows nudge the ghost from where it is (the middle if not yet placed), never from the
        // hidden time itself, which would give it away.
        const nudge = e.key.startsWith('Arrow');
        this.moveGhost(nudge ? (this.ghostT ?? GHOST_START) + (target - this.t) : target);
        return;
      }
      const final = clamp(target, 0, 1);
      if (e.key.startsWith('Arrow')) {
        this.settle();
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
