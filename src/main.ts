import { PointerEventTypes, Vector3 } from './world/babylon.ts';
import './ui/styles.css';
import { WORLD_CONTENT } from './content/world.ts';
import { toWorld } from './domain/geo.ts';
import { isLang } from './domain/i18n.ts';
import { STRINGS } from './content/strings.ts';
import { snapshotAt } from './domain/state.ts';
import { keySteps, nearestStep, shotFor } from './domain/steps.ts';
import type { Framing, KeyEvent } from './domain/model.ts';
import { tAt } from './domain/timeline.ts';
import { ad, year } from './domain/time.ts';
import {
  loadBuildings,
  loadHeightfield,
  loadRailways,
  loadRivers,
  loadRoads,
  loadWoodland,
} from './platform/assets.ts';
import { DebugOverlay } from './ui/debug.ts';
import { PlaceLabels } from './ui/labels.ts';
import { MomentCard } from './ui/moment.ts';
import { Bubbles } from './ui/bubbles.ts';
import { desktopBanner } from './ui/desktop-banner.ts';
import { ConversationPanel } from './ui/conversation.ts';
import { InfoPanel, type InfoTab } from './ui/info.ts';
import { Ambience } from './audio/ambience.ts';
import { h } from './ui/dom.ts';
import { LangStore } from './ui/store.ts';
import { TimelineBar } from './ui/timeline.ts';
import { createEngine } from './world/engine.ts';
import { FeatureLayer } from './world/features.ts';
import { Flight } from './world/flight.ts';
import { People } from './world/people.ts';
import { Smoke } from './world/smoke.ts';
import { World } from './world/scene.ts';

const SNAP_RADIUS = 0.009;
const MOMENT_RADIUS = 0.01;
const FRAMING_RADIUS: Readonly<Record<Framing, number>> = {
  close: 160,
  site: 420,
  area: 950,
};

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

  const [{ engine, backend }, heightfield, rivers, woodland, footprints, railways, roads] = await Promise.all(
    [
      createEngine(canvas, params.has('webgl')),
      loadHeightfield(),
      loadRivers(),
      loadWoodland(),
      loadBuildings(),
      loadRailways(),
      loadRoads(),
    ],
  );
  const world = new World(engine, heightfield, rivers, woodland);
  const content = WORLD_CONTENT;
  const features = new FeatureLayer(world, content.features, footprints, railways, roads);
  const people = new People(world.scene, content.conversations, content.people, features.ground);
  for (const m of people.meshes) world.addCaster(m);
  const smoke = new Smoke(world.scene);
  let smokeSources = features.smokeSources([]);

  const debug = params.has('debug') ? new DebugOverlay(engine, backend, world.camera) : undefined;
  let pending = true;
  let t = Number(params.get('t') ?? Number.NaN);
  const yearParam = Number(params.get('year') ?? Number.NaN);
  if (Number.isFinite(yearParam)) t = tAt(content.timeline, year(yearParam));
  if (!Number.isFinite(t)) t = tAt(content.timeline, ad(1282));

  const places = new Map(content.places.map((p) => [p.id, p]));
  const featureMap = new Map(content.features.map((f) => [f.id, f]));
  const steps = keySteps(content.timeline, content.events);
  let goToShot: (event: KeyEvent) => void = () => undefined;
  const timeline = new TimelineBar(content.timeline, content.eras, content.events, steps, store, {
    onScrub(next) {
      t = next;
      pending = true;
    },
    onRelease(next) {
      const target = nearestStep(steps, next, SNAP_RADIUS);
      console.info(
        `dewidebug slider release t=${next.toFixed(4)} snap=${target?.event.id ?? 'none'} camera=stays`,
      );
      if (target) timeline.snapTo(target);
    },
    onArrive(event) {
      goToShot(event);
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
  const moment = new MomentCard(store, new Map(content.sources.map((s) => [s.id, s])), places);
  const flight = new Flight(world.camera);
  const home = h('button', { class: 'tool home', type: 'button', hidden: true }, store.t('overview'));
  home.addEventListener('click', () => {
    flight.flyHome();
    home.hidden = true;
  });
  goToShot = (event: KeyEvent): void => {
    const shot = shotFor(event, places, featureMap);
    console.info(`dewidebug shot event=${event.id} framing=${shot?.framing ?? 'valley'}`);
    if (!shot) {
      flight.flyHome();
      home.hidden = true;
      return;
    }
    const { x, z } = toWorld(shot.at);
    flight.flyTo(new Vector3(x, features.ground(x, z), z), FRAMING_RADIUS[shot.framing], 0.98);
    home.hidden = false;
  };
  const labels = new PlaceLabels(world.scene, content.places, features.ground, store, (place, at) => {
    console.info(`dewidebug visit place=${place.id}`);
    flight.flyTo(at, FRAMING_RADIUS.site, 0.98);
    home.hidden = false;
  });
  store.onChange(() => {
    home.textContent = store.t('overview');
  });
  const sourceMap = new Map(content.sources.map((s) => [s.id, s]));
  const panel = new ConversationPanel(store, new Map(content.people.map((p) => [p.id, p])), sourceMap);
  const info = new InfoPanel(store, sourceMap, {
    sources: content.sources.length,
    events: content.events.length,
    features: content.features.length,
  });
  const openConversation = (c: (typeof content.conversations)[number]): void => {
    info.close();
    panel.show(c);
    const g = people.groups.get(c.id);
    if (g) flight.flyTo(g.anchor.clone(), 30, 1.12);
    home.hidden = false;
  };
  const bubbles = new Bubbles(world.scene, people.groups.values(), store, openConversation);
  world.scene.onPointerObservable.add((info) => {
    if (info.type !== PointerEventTypes.POINTERTAP) return;
    const hit = info.pickInfo?.pickedMesh;
    const meta: unknown = hit?.metadata;
    if (meta && typeof meta === 'object' && 'conversation' in meta) {
      const c = content.conversations.find((x) => x.id === meta.conversation);
      if (c) openConversation(c);
    }
  });
  let ambience: Ambience | undefined;
  let soundOn = false;
  const sound = h('button', { class: 'tool', type: 'button', 'aria-pressed': false }, store.t('soundOff'));
  sound.addEventListener('click', () => {
    soundOn = !soundOn;
    ambience ??= new Ambience();
    ambience.set(snapshotAt(content, t).environment.ambient);
    ambience.enable(soundOn);
    sound.setAttribute('aria-pressed', String(soundOn));
    sound.textContent = store.t(soundOn ? 'soundOn' : 'soundOff');
  });
  const tabButton = (tab: InfoTab): HTMLButtonElement => {
    const b = h('button', { class: 'tool', type: 'button' }, store.t(tab));
    b.addEventListener('click', () => {
      panel.close();
      info.open(tab);
    });
    store.onChange(() => {
      b.textContent = store.t(tab);
    });
    return b;
  };
  store.onChange(() => {
    sound.textContent = store.t(soundOn ? 'soundOn' : 'soundOff');
  });
  const row2 = h(
    'div',
    { class: 'brand-row' },
    tabButton('almanac'),
    tabButton('language'),
    tabButton('about'),
    sound,
  );
  brand.append(row2);
  brand.querySelector('.brand-row')?.append(home);
  app.append(labels.el, bubbles.el, brand, moment.el, timeline.el, panel.el, info.el);
  const compact = (): void => {
    moment.el.classList.toggle('compact', panel.open !== undefined || info.isOpen);
  };
  panel.onVisibility = compact;
  info.onVisibility = compact;
  document.addEventListener('keydown', (e) => {
    const stepKey = e.key === 'ArrowRight' || e.key === 'ArrowLeft';
    const modified = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const focus = document.activeElement;
    const inTimeline = focus?.closest('.timeline') && !focus.classList.contains('tl-track');
    if (stepKey && !modified && (focus === document.body || inTimeline)) {
      e.preventDefault();
      timeline.step(e.key === 'ArrowRight' ? 1 : -1);
      return;
    }
    if (e.key !== 'Escape') return;
    if (document.querySelector('.prov-wrap.open') || document.activeElement?.closest('.prov-wrap')) return;
    if (panel.open) panel.close();
    else if (info.isOpen) info.close();
  });
  const startPlace = content.places.find((p) => p.id === params.get('place'));
  if (startPlace) {
    const { x, z } = toWorld(startPlace.at);
    world.camera.target = new Vector3(x, features.ground(x, z), z);
    const radius = Number(params.get('radius') ?? FRAMING_RADIUS.site);
    world.camera.radius = Number.isFinite(radius) && radius > 0 ? radius : FRAMING_RADIUS.site;
    world.camera.beta = 0.98;
    home.hidden = false;
  }
  const banner = desktopBanner(store);
  if (banner) app.append(banner);
  if (debug) app.append(debug.el);

  let active = new Set<(typeof content.conversations)[number]['id']>();
  const apply = (): void => {
    if (!pending) return;
    pending = false;
    const snap = snapshotAt(content, t);
    world.applyEnvironment(snap.environment, features.clearings(snap.features));
    features.apply(snap.features);
    world.refreshShadows();
    smokeSources = features.smokeSources(snap.features);
    active = new Set(snap.conversations.map((c) => c.id));
    const open = panel.open;
    if (open && !active.has(open.id)) panel.close();
    labels.setYear(Math.round(snap.year));
    const near = snap.nearestEvent;
    moment.show(
      near && Math.abs(tAt(content.timeline, near.when.from) - t) < MOMENT_RADIUS ? near : undefined,
    );
    debug?.update(snap);
    info.update(snap);
    ambience?.set(snap.environment.ambient);
  };
  apply();

  engine.runRenderLoop(() => {
    apply();
    const dt = engine.getDeltaTime();
    features.tick(dt);
    flight.tick(dt);
    const now = performance.now();
    people.show(active, now);
    const eye = world.camera.globalPosition;
    const trainSmoke = features.trainSmoke();
    smoke.show(trainSmoke ? [...smokeSources, trainSmoke] : smokeSources, (x, z) =>
      Math.hypot(eye.x - x, eye.z - z),
    );
    const train = features.trainPosition();
    ambience?.near(
      'train',
      train ? 0.15 + 0.85 * Math.max(0, 1 - Vector3.Distance(eye, train) / 1400) ** 2 : 0,
    );
    world.scene.render();
    bubbles.update(active, now);
    labels.update(bubbles.visible);
  });
  window.addEventListener('resize', () => {
    engine.resize();
  });
  await world.scene.whenReadyAsync();
  loader.classList.add('done');
  setTimeout(() => {
    loader.remove();
  }, 900);
  if (debug) Object.assign(window, { llandeiloDebug: { scene: world.scene } });
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
  const lang = new URLSearchParams(location.search).get('lang') === 'cy' ? 'cy' : 'en';
  document.body.dataset['ready'] = 'error';
  const msg = document.createElement('p');
  msg.className = 'panel';
  msg.style.cssText =
    'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);padding:20px;z-index:200';
  msg.textContent = `${STRINGS.loadingFailed[lang]} ${err instanceof Error ? err.message : String(err)}`;
  document.body.append(msg);
});
