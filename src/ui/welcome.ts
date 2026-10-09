import type { StringKey } from '../content/strings.ts';
import { PROVENANCE_KINDS } from '../domain/provenance.ts';
import { h, setInert } from './dom.ts';
import { langToggle } from './lang-toggle.ts';
import { provenanceLabel } from './provenance.ts';
import type { LangStore } from './store.ts';

const AT_START = 'llandeilo.welcome.atStart';

/** '0' once the viewer has unticked "Show this at start", '1' once ticked again, else null. */
export function storedWelcome(): string | null {
  try {
    return localStorage.getItem(AT_START);
  } catch (err: unknown) {
    console.warn('dewidebug welcome storage read failed', err);
    return null;
  }
}

function remember(atStart: boolean): void {
  try {
    localStorage.setItem(AT_START, atStart ? '1' : '0');
  } catch (err: unknown) {
    console.warn('dewidebug welcome storage write failed', err);
  }
}

interface Group {
  readonly where: StringKey;
  readonly rows: readonly (readonly [readonly string[], StringKey])[];
}

const KEYS: readonly Group[] = [
  {
    where: 'keysView',
    rows: [
      [['W', 'A', 'S', 'D'], 'keySlide'],
      [['↑', '←', '↓', '→'], 'keySlide'],
      [['Shift'], 'keyFaster'],
      [['Q', 'E'], 'keyTurn'],
      [['R', 'F'], 'keyTilt'],
    ],
  },
  { where: 'keysAnywhere', rows: [[['←', '→'], 'keyStep']] },
  {
    where: 'keysSlider',
    rows: [
      [['←', '→'], 'keyNudge'],
      [['Shift+←', 'Shift+→'], 'keyNudgeMore'],
      [['PageDown', 'PageUp'], 'keyStep'],
      [['Home', 'End'], 'keyEnds'],
    ],
  },
  {
    where: 'keysAlways',
    rows: [
      [['Esc'], 'keyEscape'],
      [['?'], 'keyHelp'],
    ],
  },
];

const MOUSE: readonly StringKey[] = [
  'mouseDrag',
  'mouseTurn',
  'mouseWheel',
  'mouseDouble',
  'clickLabel',
  'clickCompass',
  'clickTrain',
];

const TIME: readonly StringKey[] = ['welcomeSlider', 'welcomeKeyDates', 'welcomeSteps', 'welcomePanels'];
const SETTINGS: readonly StringKey[] = ['welcomeLanguage', 'welcomeGraphics', 'welcomeSound'];

export type WelcomeSection = 'top' | 'controls';

/**
 * The one help surface: how to move, what the timeline and the labels mean, the game and the settings.
 * It opens over a wash that takes the click outside it, and keeps the app behind it inert, as the
 * Begin card does.
 */
export class WelcomePanel {
  readonly el = h('div', { class: 'welcome-scrim', hidden: true });
  readonly panel: HTMLElement;
  readonly button: HTMLButtonElement;
  private readonly title = h('h2', { id: 'welcome-title', tabindex: -1 });
  private readonly body = h('div', { class: 'welcome-body' });
  private readonly closeButton = h('button', { class: 'welcome-close', type: 'button' }, '✕');
  private readonly atStart = h('input', { type: 'checkbox' });
  private readonly atStartText = h('span');
  private readonly aboutButton = h('button', { class: 'tool', type: 'button' });
  private readonly startButton = h('button', { class: 'welcome-start', type: 'button' });
  private readonly caption = h('span', { class: 'help-caption' });
  private controlsHeading: HTMLElement | undefined;
  private returnFocus: HTMLElement | null = null;
  private pressedOnWash = false;

  constructor(
    private readonly store: LangStore,
    private readonly behind: readonly HTMLElement[],
    onAbout: () => void,
  ) {
    this.atStart.checked = storedWelcome() !== '0';
    this.panel = h(
      'section',
      { class: 'welcome', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'welcome-title' },
      h('div', { class: 'welcome-head' }, this.title, langToggle(store), this.closeButton),
      this.body,
      h(
        'div',
        { class: 'welcome-foot' },
        h('label', { class: 'welcome-check' }, this.atStart, this.atStartText),
        this.aboutButton,
        this.startButton,
      ),
    );
    this.el.append(this.panel);
    this.button = h(
      'button',
      { class: 'help-button', type: 'button', 'aria-keyshortcuts': '?' },
      h('span', { class: 'help-mark', 'aria-hidden': 'true' }, '?'),
      this.caption,
    );
    this.button.addEventListener('click', () => {
      this.open('top');
    });
    this.closeButton.addEventListener('click', () => {
      this.close('✕');
    });
    this.startButton.addEventListener('click', () => {
      this.close('start exploring');
    });
    this.aboutButton.addEventListener('click', () => {
      this.close('about');
      onAbout();
    });
    this.atStart.addEventListener('change', () => {
      remember(this.atStart.checked);
      console.info(`dewidebug welcome show at start=${String(this.atStart.checked)}`);
    });
    // Only a click that both starts and ends on the wash closes it, so selecting text in the panel
    // and letting go outside does not.
    this.el.addEventListener('pointerdown', (e) => {
      this.pressedOnWash = e.target === this.el;
    });
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el && this.pressedOnWash) this.close('click outside');
    });
    this.texts();
    store.onChange(() => {
      this.texts();
      if (this.isOpen) this.render();
    });
  }

  get isOpen(): boolean {
    return !this.el.hidden;
  }

  open(section: WelcomeSection): void {
    if (!this.isOpen) {
      this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      this.render();
      this.el.hidden = false;
      setInert(this.behind, true, 'welcome');
    }
    if (section === 'controls' && this.controlsHeading) {
      this.controlsHeading.focus();
    } else {
      this.body.scrollTop = 0;
      this.title.focus();
    }
    console.info(`dewidebug welcome open section=${section}`);
  }

  close(why: string): void {
    if (!this.isOpen) return;
    this.el.hidden = true;
    setInert(this.behind, false, 'welcome');
    const back = this.returnFocus;
    this.returnFocus = null;
    if (back?.isConnected) back.focus();
    console.info(
      `dewidebug welcome close by=${why} focusBack=${back?.isConnected === true ? back.tagName : 'none'}`,
    );
  }

  private texts(): void {
    const t = (k: StringKey): string => this.store.t(k);
    this.title.textContent = t('welcomeTitle');
    this.closeButton.setAttribute('aria-label', t('close'));
    this.closeButton.title = t('close');
    this.atStartText.textContent = t('welcomeAtStart');
    this.aboutButton.textContent = t('welcomeAbout');
    this.startButton.textContent = t('welcomeStart');
    this.caption.textContent = t('welcomeTitle');
    this.button.title = t('welcomeButton');
  }

  private render(): void {
    const t = (k: StringKey): string => this.store.t(k);
    const scroll = this.body.scrollTop;
    const list = (keys: readonly StringKey[]): HTMLElement =>
      h('ul', { class: 'welcome-list' }, ...keys.map((k) => h('li', {}, t(k))));
    const row = ([keys, what]: Group['rows'][number]): HTMLElement =>
      h('tr', {}, h('th', { scope: 'row' }, ...keys.map((k) => h('kbd', {}, k))), h('td', {}, t(what)));
    const controls = h('h3', { id: 'welcome-controls', tabindex: -1 }, t('welcomeMove'));
    this.controlsHeading = controls;
    this.body.replaceChildren(
      h('p', { class: 'welcome-intro' }, t('welcomeIntro')),
      h(
        'div',
        { class: 'welcome-cols' },
        h(
          'section',
          { 'aria-labelledby': 'welcome-controls' },
          controls,
          list(MOUSE),
          ...KEYS.flatMap((g) => [
            h('p', { class: 'welcome-where' }, t(g.where)),
            h('table', { class: 'welcome-keys' }, h('tbody', {}, ...g.rows.map(row))),
          ]),
        ),
        h(
          'div',
          {},
          h('section', {}, h('h3', {}, t('welcomeTime')), list(TIME)),
          h(
            'section',
            {},
            h('h3', {}, t('welcomeTruth')),
            h('p', {}, t('welcomeTruthIntro')),
            h(
              'dl',
              { class: 'welcome-prov' },
              ...PROVENANCE_KINDS.flatMap((kind) => [
                h('dt', {}, provenanceLabel(kind, this.store)),
                h('dd', {}, t(`${kind}Help`)),
              ]),
            ),
            h('p', {}, t('welcomeInfo')),
          ),
          h('section', {}, h('h3', {}, t('whenAreWe')), h('p', {}, t('welcomeGame'))),
          h('section', {}, h('h3', {}, t('welcomeSettings')), list(SETTINGS)),
        ),
      ),
    );
    this.body.scrollTop = scroll;
  }
}
