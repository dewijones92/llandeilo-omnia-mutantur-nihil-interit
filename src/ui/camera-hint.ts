import { h } from './dom.ts';
import type { LangStore } from './store.ts';

const SEEN = 'llandeilo.cameraHint.seen';

function seen(): boolean {
  try {
    return localStorage.getItem(SEEN) === '1';
  } catch (err: unknown) {
    console.warn('dewidebug camera hint storage read failed', err);
    return false;
  }
}

function remember(): void {
  try {
    localStorage.setItem(SEEN, '1');
  } catch (err: unknown) {
    console.warn('dewidebug camera hint storage write failed', err);
  }
}

/** A one-time line on how to move the camera, shown once the valley opens and gone after the first drag. */
export class CameraHint {
  readonly el = h('div', { class: 'camera-hint panel', role: 'status', hidden: true });
  private done = seen();

  constructor(private readonly store: LangStore) {
    this.render();
    store.onChange(() => {
      this.render();
    });
  }

  show(): void {
    console.info(`dewidebug camera hint show seenBefore=${String(this.done)}`);
    if (this.done) return;
    this.el.hidden = false;
  }

  dismiss(): void {
    if (this.done) return;
    this.done = true;
    this.el.hidden = true;
    remember();
    console.info('dewidebug camera hint dismissed after the first drag');
  }

  private render(): void {
    this.el.textContent = this.store.t('cameraHint');
  }
}
