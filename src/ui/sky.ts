import { mix, toHex } from '../domain/colour.ts';
import {
  lightingAt,
  phaseOf,
  SEASONS,
  wrapHour,
  type Clock,
  type LightInput,
  type Season,
} from '../domain/daylight.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const HOURS_PER_SECOND = 0.4;

export function formatHour(hour: number): string {
  const minutes = Math.round(wrapHour(hour) * 60) % (24 * 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

export class SkyControls {
  readonly el: HTMLElement;
  private readonly slider: HTMLInputElement;
  private readonly readout: HTMLElement;
  private readonly play: HTMLButtonElement;
  private readonly summary: HTMLElement;
  private readonly body: HTMLElement;
  private readonly group: HTMLElement;
  private readonly note: HTMLElement;
  private labelKey = '';
  private readonly seasons = new Map<Season, HTMLButtonElement>();
  private clock: Clock;
  private playing = false;
  private trackKey = '';

  constructor(
    private readonly store: LangStore,
    initial: Clock,
    private readonly onChange: (clock: Clock) => void,
  ) {
    this.clock = initial;
    this.readout = h('span', { class: 'sky-readout' });
    this.slider = h('input', {
      class: 'sky-hour',
      type: 'range',
      min: 0,
      max: 24,
      step: 0.25,
      value: String(initial.hour),
    });
    this.slider.addEventListener('input', () => {
      this.stop();
      this.set({ ...this.clock, hour: Number(this.slider.value) });
    });
    this.play = h('button', { class: 'tool sky-play', type: 'button', 'aria-pressed': false });
    this.play.append(h('span', { class: 'sky-play-icon', 'aria-hidden': 'true' }));
    this.play.addEventListener('click', () => {
      this.playing = !this.playing;
      this.play.setAttribute('aria-pressed', String(this.playing));
      console.info(`dewidebug sky play=${this.playing}`);
    });
    const group = h('div', { class: 'seg sky-seasons', role: 'group' });
    for (const season of SEASONS) {
      const b = h('button', { type: 'button', 'aria-pressed': season === initial.season });
      b.addEventListener('click', () => {
        this.set({ ...this.clock, season });
      });
      this.seasons.set(season, b);
      group.append(b);
    }
    this.group = group;
    this.summary = h('summary', { class: 'sky-summary' });
    this.note = h('div', { class: 'sky-note' });
    this.body = h(
      'div',
      { class: 'sky-body', role: 'group' },
      h('div', { class: 'sky-row' }, this.readout, this.play),
      this.slider,
      group,
      this.note,
    );
    const details = h('details', { class: 'sky' }, this.summary, this.body);
    details.open = !window.matchMedia('(max-width: 640px)').matches;
    this.el = details;
    this.label();
    store.onChange(() => {
      this.label();
    });
  }

  get value(): Clock {
    return this.clock;
  }

  tick(dtMs: number): void {
    if (!this.playing) return;
    this.set({ ...this.clock, hour: wrapHour(this.clock.hour + (dtMs / 1000) * HOURS_PER_SECOND) });
  }

  paintTrack(env: LightInput): void {
    const key = `${this.clock.season}${toHex(env.skyTop)}${toHex(env.skyHorizon)}`;
    if (key === this.trackKey) return;
    this.trackKey = key;
    const stops: string[] = [];
    for (let hour = 0; hour <= 24; hour += 1) {
      const l = lightingAt(env, { hour, season: this.clock.season });
      stops.push(`${toHex(mix(l.skyTop, l.skyHorizon, 0.45))} ${((hour / 24) * 100).toFixed(1)}%`);
    }
    this.slider.style.setProperty('--sky-track', `linear-gradient(90deg, ${stops.join(', ')})`);
  }

  private stop(): void {
    if (!this.playing) return;
    this.playing = false;
    this.play.setAttribute('aria-pressed', 'false');
  }

  private set(next: Clock): void {
    const seasonChanged = next.season !== this.clock.season;
    this.clock = next;
    if (document.activeElement !== this.slider) this.slider.value = String(next.hour);
    if (seasonChanged) console.info(`dewidebug sky season=${next.season}`);
    this.label();
    this.onChange(next);
  }

  private label(): void {
    const t = (k: Parameters<LangStore['t']>[0]): string => this.store.t(k);
    const phase = t(phaseOf(this.clock));
    const time = formatHour(this.clock.hour);
    const key = `${this.store.lang}|${phase}|${time}|${this.clock.season}`;
    if (key === this.labelKey) return;
    this.labelKey = key;
    this.readout.replaceChildren(h('strong', {}, phase), ` ${time}`);
    this.slider.setAttribute('aria-label', t('timeOfDay'));
    this.slider.setAttribute('aria-valuetext', `${phase}, ${time}`);
    this.body.setAttribute('aria-label', `${t('timeOfDay')} / ${t('season')}`);
    this.summary.textContent = `${phase} ${time} · ${t(this.clock.season)}`;
    this.el.title = t('skyNote');
    this.note.textContent = t('skyCaption');
    this.play.setAttribute('aria-label', t('playDay'));
    this.play.title = t('playDay');
    this.group.setAttribute('aria-label', t('season'));
    for (const [season, b] of this.seasons) {
      b.textContent = t(season);
      b.setAttribute('aria-pressed', String(season === this.clock.season));
    }
  }
}
