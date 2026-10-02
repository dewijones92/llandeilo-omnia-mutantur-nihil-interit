import {
  MAX_POINTS,
  ROUNDS,
  clues,
  pickRound,
  playableSteps,
  sceneMatches,
  scoreGuess,
  type Clue,
} from '../domain/guess.ts';
import type { StringKey } from '../content/strings.ts';
import type { GridRef } from '../domain/model.ts';
import type { Source } from '../domain/provenance.ts';
import { snapshotAt, type WorldContent } from '../domain/state.ts';
import type { Step } from '../domain/steps.ts';
import { PRESENT_YEAR, formatYear, type TimeRange } from '../domain/time.ts';
import { yearAt } from '../domain/timeline.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';
import type { TimelineBar } from './timeline.ts';

const BEST_KEY = 'llandeilo.whenAreWe.best';
// One class on the root hides every element marked .reveals-when (styles.css), so no panel needs to
// know the game exists.
const PLAYING_CLASS = 'guessing';

export interface GuessHost {
  readonly world: WorldContent;
  readonly steps: readonly Step[];
  readonly timeline: TimelineBar;
  readonly sources: ReadonlyMap<string, Source>;
  jumpTo(t: number): void;
  sweepTo(t: number, done: () => void): void;
  overview(): void;
  showMe(at: GridRef): void;
  closePanels(): void;
}

interface RoundResult {
  readonly step: Step;
  readonly guessT: number;
  readonly points: number;
}

type Phase =
  | { readonly kind: 'idle' }
  | { readonly kind: 'guessing'; readonly step: Step; readonly guessT: number | undefined }
  | { readonly kind: 'revealed'; readonly result: RoundResult }
  | { readonly kind: 'finished'; readonly total: number; readonly best: number; readonly newBest: boolean };

function readBest(): number {
  try {
    const n = Number(localStorage.getItem(BEST_KEY) ?? '0');
    return Number.isFinite(n) ? n : 0;
  } catch (err: unknown) {
    console.info('dewidebug guess best score unreadable', err);
    return 0;
  }
}

function writeBest(score: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch (err: unknown) {
    console.info('dewidebug guess best score not saved', err);
  }
}

function present(...nodes: (Node | null)[]): Node[] {
  return nodes.filter((n): n is Node => n !== null);
}

export class GuessGame {
  readonly button: HTMLButtonElement;
  readonly el = h('aside', { class: 'guess panel', hidden: true, 'aria-live': 'polite' });
  private phase: Phase = { kind: 'idle' };
  private results: RoundResult[] = [];
  private readonly playable: readonly Step[];

  constructor(
    private readonly store: LangStore,
    private readonly host: GuessHost,
    private readonly rng: () => number = Math.random,
  ) {
    this.playable = playableSteps(host.world, host.steps);
    this.button = h('button', { class: 'tool guess-start', type: 'button' }, store.t('whenAreWe'));
    this.button.addEventListener('click', () => {
      this.start();
    });
    store.onChange(() => {
      this.button.textContent = store.t('whenAreWe');
      this.render();
    });
    console.info(`dewidebug guess playable rounds=${String(this.playable.length)}`);
  }

  get hidingTheYear(): boolean {
    return this.phase.kind === 'guessing';
  }

  start(): void {
    this.results = [];
    this.host.closePanels();
    this.el.hidden = false;
    this.nextRound();
  }

  stop(): void {
    console.info(`dewidebug guess stopped phase=${this.phase.kind} rounds=${String(this.results.length)}`);
    this.phase = { kind: 'idle' };
    this.host.timeline.takeGuess(undefined);
    this.host.timeline.showGhost(undefined);
    document.documentElement.classList.remove(PLAYING_CLASS);
    this.el.hidden = true;
  }

  private nextRound(): void {
    const played = new Set(this.results.map((r) => r.step.index));
    const step = pickRound(this.playable, this.rng, played);
    if (!step) {
      console.info('dewidebug guess no round left to play');
      this.finish();
      return;
    }
    console.info(`dewidebug guess round=${String(this.results.length + 1)} event=${step.event.id}`);
    this.phase = { kind: 'guessing', step, guessT: undefined };
    document.documentElement.classList.add(PLAYING_CLASS);
    this.host.timeline.showGhost(undefined);
    this.host.timeline.takeGuess((t) => {
      if (this.phase.kind !== 'guessing') return;
      const first = this.phase.guessT === undefined;
      this.phase = { ...this.phase, guessT: t };
      if (first) this.render();
    });
    this.host.jumpTo(step.t);
    this.host.overview();
    this.render();
  }

  private lockIn(): void {
    if (this.phase.kind !== 'guessing' || this.phase.guessT === undefined) return;
    const { step, guessT } = this.phase;
    const result: RoundResult = { step, guessT, points: scoreGuess(guessT, step.t) };
    this.results.push(result);
    console.info(
      `dewidebug guess locked event=${step.event.id} guessT=${guessT.toFixed(4)} trueT=${step.t.toFixed(4)} points=${String(result.points)}`,
    );
    this.phase = { kind: 'revealed', result };
    this.host.timeline.takeGuess(undefined);
    document.documentElement.classList.remove(PLAYING_CLASS);
    // The scene runs from the guessed moment to the true one, so you see what changed in between.
    this.host.jumpTo(guessT);
    this.host.sweepTo(step.t, () => {
      console.info(`dewidebug guess reveal arrived event=${step.event.id}`);
    });
    this.render();
  }

  private finish(): void {
    const total = this.results.reduce((sum, r) => sum + r.points, 0);
    const before = readBest();
    const newBest = this.results.length > 0 && total > before;
    if (newBest) writeBest(total);
    console.info(`dewidebug guess finished total=${String(total)} best=${String(Math.max(before, total))}`);
    this.phase = { kind: 'finished', total, best: Math.max(before, total), newBest };
    this.host.timeline.takeGuess(undefined);
    this.host.timeline.showGhost(undefined);
    document.documentElement.classList.remove(PLAYING_CLASS);
    this.render();
  }

  private roundLabel(n: number): string {
    const total = Math.min(ROUNDS, this.playable.length);
    return `${this.store.t('guessRound')} ${String(n)} ${this.store.t('guessOf')} ${String(total)}`;
  }

  private action(key: StringKey, onClick: () => void, cls = 'tool'): HTMLButtonElement {
    const b = h('button', { class: cls, type: 'button' }, this.store.t(key));
    b.addEventListener('click', onClick);
    return b;
  }

  private render(): void {
    const phase = this.phase;
    const stop = this.action('guessStop', () => {
      this.stop();
    });
    switch (phase.kind) {
      case 'idle':
        this.el.replaceChildren();
        return;
      case 'guessing': {
        const lock = this.action(
          'guessLock',
          () => {
            this.lockIn();
          },
          'tool primary',
        );
        lock.disabled = phase.guessT === undefined;
        this.el.replaceChildren(
          ...present(
            h('p', { class: 'guess-round' }, this.roundLabel(this.results.length + 1)),
            h('h2', {}, this.store.t('whenAreWe')),
            h('p', {}, this.store.t('guessIntro')),
            phase.guessT === undefined
              ? h('p', { class: 'guess-hint' }, this.store.t('guessPlaceFirst'))
              : null,
            h('div', { class: 'guess-actions' }, lock, stop),
          ),
        );
        return;
      }
      case 'revealed':
        this.el.replaceChildren(
          ...present(...this.reveal(phase.result), h('div', { class: 'guess-actions' }, this.onward(), stop)),
        );
        return;
      case 'finished': {
        const lang = this.store.lang;
        const max = String(this.results.length * MAX_POINTS);
        this.el.replaceChildren(
          ...present(
            h('h2', {}, this.store.t('guessTotal')),
            h('p', { class: 'guess-score' }, `${String(phase.total)} / ${max}`),
            phase.newBest ? h('p', { class: 'guess-best new' }, this.store.t('guessNewBest')) : null,
            h(
              'p',
              { class: 'guess-best' },
              `${this.store.t('guessBest')}: ${phase.best.toLocaleString(lang === 'cy' ? 'cy-GB' : 'en-GB')}`,
            ),
            h(
              'div',
              { class: 'guess-actions' },
              this.action(
                'guessAgain',
                () => {
                  this.start();
                },
                'tool primary',
              ),
              this.action('close', () => {
                this.stop();
              }),
            ),
          ),
        );
        return;
      }
    }
  }

  private onward(): HTMLButtonElement {
    const last = this.results.length >= Math.min(ROUNDS, this.playable.length);
    return this.action(
      last ? 'guessFinish' : 'guessNext',
      () => {
        if (last) this.finish();
        else this.nextRound();
      },
      'tool primary',
    );
  }

  private reveal(r: RoundResult): (HTMLElement | null)[] {
    const lang = this.store.lang;
    const { world } = this.host;
    const ev = r.step.event;
    this.host.timeline.showGhost(r.guessT);
    const truth = snapshotAt(world, r.step.t);
    const list = clues(world, truth);
    const same = r.points < MAX_POINTS && sceneMatches(snapshotAt(world, r.guessT), truth);
    const guessYear = yearAt(world.timeline, r.guessT);
    return [
      h('p', { class: 'guess-round' }, this.roundLabel(this.results.length)),
      h('p', { class: 'guess-score' }, `${String(r.points)} ${this.store.t('guessPoints')}`),
      h(
        'dl',
        { class: 'guess-years' },
        h('dt', { class: 'yours' }, this.store.t('guessYours')),
        h('dd', {}, formatYear(guessYear, lang, guessYear < 1000)),
        h('dt', {}, this.store.t('guessAnswer')),
        h('dd', {}, `${formatYear(ev.when.from, lang, ev.approximate)}: ${ev.title[lang]}`),
      ),
      same ? h('p', { class: 'guess-note' }, this.store.t('guessSameScene')) : null,
      h('h3', {}, this.store.t('guessClues')),
      list.some((c) => c.strength === 'firm')
        ? null
        : h('p', { class: 'guess-note' }, this.store.t('guessNoFirm')),
      h('ul', { class: 'guess-clues' }, ...list.map((c) => this.clueItem(c))),
    ];
  }

  private span(when: TimeRange, approximate: boolean): string {
    const lang = this.store.lang;
    const to = when.to >= PRESENT_YEAR ? this.store.t('todayName') : formatYear(when.to, lang, approximate);
    return `${this.store.t('guessFrom')} ${formatYear(when.from, lang, approximate)} ${this.store.t('guessTo')} ${to}`;
  }

  private clueItem(c: Clue): HTMLElement {
    const lang = this.store.lang;
    const strength = h(
      'span',
      { class: `guess-strength ${c.strength}` },
      this.store.t(c.strength === 'firm' ? 'guessFirm' : 'guessProbable'),
    );
    const badge = provenanceBadge(c.provenance, this.store, this.host.sources);
    switch (c.kind) {
      case 'feature': {
        const show = this.action('guessShowMe', () => {
          console.info(`dewidebug guess show me feature=${c.feature.id}`);
          this.host.showMe(c.feature.at);
        });
        return h(
          'li',
          {},
          strength,
          h('b', {}, c.feature.label[lang]),
          h('span', { class: 'guess-when' }, `${this.store.t('guessInScene')} ${this.span(c.when, false)}`),
          h('span', { class: 'guess-tools' }, badge, show),
        );
      }
      case 'climate':
        return h(
          'li',
          {},
          strength,
          h('b', {}, this.store.t(c.colder ? 'guessColder' : 'guessWarmer')),
          h('span', { class: 'guess-when' }, this.span(c.when, true)),
          h('span', { class: 'guess-model' }, this.store.t('guessClimateModel')),
          h('span', { class: 'guess-tools' }, badge),
        );
    }
  }
}
