import './ui/styles.css';
import { WORLD_CONTENT } from './content/world.ts';
import { isLang } from './domain/i18n.ts';
import { snapshotAt, snapTarget } from './domain/state.ts';
import { tAt } from './domain/timeline.ts';
import { ad } from './domain/time.ts';
import { loadHeightfield, loadRivers } from './platform/assets.ts';
import { DebugOverlay } from './ui/debug.ts';
import { h } from './ui/dom.ts';
import { LangStore } from './ui/store.ts';
import { TimelineBar } from './ui/timeline.ts';
import { createEngine } from './world/engine.ts';
import { World } from './world/scene.ts';

const SNAP_RADIUS = 0.018;

async function start(): Promise<void> {
  const params = new URLSearchParams(location.search);
  const langParam = params.get('lang') ?? '';
  const store = new LangStore(isLang(langParam) ? langParam : 'en');
  document.documentElement.lang = store.lang;
  const app = document.getElementById('app');
  const canvas = document.getElementById('scene');
  if (!app || !(canvas instanceof HTMLCanvasElement)) throw new Error('Missing #app or #scene');

  const loader = h(
    'div',
    { class: 'loader', role: 'status' },
    h(
      'div',
      { class: 'loader-card' },
      h('h1', {}, store.t('title')),
      h('p', {}, store.t('loading')),
      h('div', { class: 'loader-bar' }, h('span')),
    ),
  );
  document.body.append(loader);

  const [{ engine, backend }, heightfield, rivers] = await Promise.all([
    createEngine(canvas, params.has('webgl')),
    loadHeightfield(),
    loadRivers(),
  ]);
  const world = new World(engine, heightfield, rivers);
  const content = WORLD_CONTENT;

  const debug = params.has('debug') ? new DebugOverlay(engine, backend) : undefined;
  let pending = true;
  let t = Number(params.get('t') ?? Number.NaN);
  if (!Number.isFinite(t)) t = tAt(content.timeline, ad(1282));

  const timeline = new TimelineBar(content.timeline, content.eras, content.events, store, {
    onScrub(next) {
      t = next;
      pending = true;
    },
    onRelease(next) {
      const target = snapTarget(content, next, SNAP_RADIUS);
      console.info(`dewidebug slider release t=${next.toFixed(4)} snap=${target?.id ?? 'none'}`);
      if (target) timeline.animateTo(tAt(content.timeline, target.when.from));
    },
  });
  timeline.set(t);

  const brand = h(
    'header',
    { class: 'brand panel' },
    h('h1', {}, store.t('title')),
    h('p', {}, store.t('subtitle')),
    h('div', { class: 'brand-row' }, langToggle(store)),
  );
  store.onChange(() => {
    brand.querySelector('p')?.replaceChildren(store.t('subtitle'));
  });
  app.append(brand, timeline.el);
  if (debug) app.append(debug.el);

  const apply = (): void => {
    if (!pending) return;
    pending = false;
    const snap = snapshotAt(content, t);
    world.applyEnvironment(snap.environment);
    debug?.update(snap);
  };
  apply();

  engine.runRenderLoop(() => {
    apply();
    world.scene.render();
  });
  window.addEventListener('resize', () => {
    engine.resize();
  });
  await world.scene.whenReadyAsync();
  loader.classList.add('done');
  setTimeout(() => {
    loader.remove();
  }, 900);
  document.body.dataset['ready'] = 'true';
  console.info(`dewidebug app ready backend=${backend}`);
}

function langToggle(store: LangStore): HTMLElement {
  const en = h('button', { type: 'button', 'aria-pressed': store.lang === 'en' }, 'English');
  const cy = h('button', { type: 'button', 'aria-pressed': store.lang === 'cy' }, 'Cymraeg');
  const sync = (): void => {
    en.setAttribute('aria-pressed', String(store.lang === 'en'));
    cy.setAttribute('aria-pressed', String(store.lang === 'cy'));
  };
  en.addEventListener('click', () => {
    store.set('en');
  });
  cy.addEventListener('click', () => {
    store.set('cy');
  });
  store.onChange(sync);
  return h('div', { class: 'seg', role: 'group', 'aria-label': 'Language / Iaith' }, en, cy);
}

start().catch((err: unknown) => {
  console.error('dewidebug app failed to start', err);
  document.body.dataset['ready'] = 'error';
  const msg = document.createElement('p');
  msg.className = 'panel';
  msg.style.cssText =
    'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);padding:20px;z-index:200';
  msg.textContent = `Something went wrong loading the valley: ${err instanceof Error ? err.message : String(err)}`;
  document.body.append(msg);
});
