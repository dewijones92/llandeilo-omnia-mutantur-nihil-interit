import { PointerEventTypes, Vector3 } from './world/babylon.ts';
import './ui/styles.css';
import { WORLD_CONTENT } from './content/world.ts';
import { toWorld } from './domain/geo.ts';
import { isLang } from './domain/i18n.ts';
import { STRINGS } from './content/strings.ts';
import { lightingAt, parseClock, seasonLook } from './domain/daylight.ts';
import { lampsAt } from './domain/lamplight.ts';
import { snapshotAt, type Snapshot } from './domain/state.ts';
import { keySteps, nearestStep, shotFor } from './domain/steps.ts';
import type { Framing, KeyEvent, RollingStock } from './domain/model.ts';
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
import { loadModel, type LoadedModel } from './world/models.ts';
import { Compass } from './ui/compass.ts';
import { northAlpha } from './domain/compass.ts';
import { FollowChip } from './ui/follow-chip.ts';
import { desktopBanner } from './ui/desktop-banner.ts';
import { ConversationPanel } from './ui/conversation.ts';
import { InfoPanel, type InfoTab } from './ui/info.ts';
import { Ambience } from './audio/ambience.ts';
import { h } from './ui/dom.ts';
import { Shortcuts } from './ui/shortcuts.ts';
import { SkyControls } from './ui/sky.ts';
import { LangStore } from './ui/store.ts';
import { TimelineBar } from './ui/timeline.ts';
import { createEngine } from './world/engine.ts';
import { FeatureLayer } from './world/features.ts';
import { Firelight } from './world/firelight.ts';
import { Flight } from './world/flight.ts';
import { People } from './world/people.ts';
import { Smoke } from './world/smoke.ts';
import { World } from './world/scene.ts';

const SNAP_RADIUS = 0.009;
const TRAIN_SCALE = 0.66;
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
  const world = new World(engine, heightfield, rivers, woodland, params.get('fx') !== 'low');
  const content = WORLD_CONTENT;
  const trainModels = new Map<RollingStock, LoadedModel>();
  const llanelly = await loadModel(
    world.scene,
    `${import.meta.env.BASE_URL}models/llanelly-train.glb`,
    TRAIN_SCALE,
  );
  if (llanelly) trainModels.set('llanelly-1850s', llanelly);
  const features = new FeatureLayer(world, content.features, footprints, railways, roads, trainModels);
  const people = new People(world.scene, content.conversations, content.people, features.ground);
  for (const m of people.meshes) world.addCaster(m);
  const smoke = new Smoke(world.scene);
  const firelight = new Firelight(world.scene, features.ground);
  world.addLamp(firelight.material);
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
      skyControls.forget();
    },
    onRelease(next) {
      const target = nearestStep(steps, next, SNAP_RADIUS);
      console.info(
        `dewidebug slider release t=${next.toFixed(4)} snap=${target?.event.id ?? 'none'} camera=stays`,
      );
      // A snap leaves the camera where it is, but the sky still follows the record.
      const sky = target?.event.recordedSky;
      if (target)
        timeline.snapTo(
          target,
          sky
            ? () => {
                skyControls.adopt(sky);
              }
            : undefined,
        );
    },
    onArrive(event) {
      goToShot(event);
    },
  });
  timeline.set(t);

  let clock = parseClock(params.get('hour'), params.get('season'));
  let lightPending = true;
  console.info(`dewidebug sky start hour=${clock.hour} season=${clock.season}`);
  const sourceMap = new Map(content.sources.map((s) => [s.id, s]));
  const skyControls = new SkyControls(store, clock, sourceMap, (next) => {
    if (next.season !== clock.season) pending = true;
    clock = next;
    lightPending = true;
  });
  // Opening a link at a key date shows its recorded sky, unless the link sets its own.
  const openedAt = nearestStep(steps, t, 1e-6)?.event.recordedSky;
  if (openedAt && !params.has('hour') && !params.has('season')) skyControls.adopt(openedAt);
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
  const moment = new MomentCard(store, sourceMap, places);
  const flight = new Flight(world.camera);
  const home = h('button', { class: 'tool home', type: 'button', hidden: true }, store.t('overview'));
  home.addEventListener('click', () => {
    flight.flyHome();
    home.hidden = true;
  });
  goToShot = (event: KeyEvent): void => {
    if (event.recordedSky) skyControls.adopt(event.recordedSky);
    else skyControls.forget();
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
  const followChip = new FollowChip(store, () => {
    flight.stopFollowing('stop button');
  });
  const bubbles = new Bubbles(world.scene, people.groups.values(), store, openConversation);
  world.scene.onPointerObservable.add((info) => {
    if (info.type !== PointerEventTypes.POINTERTAP) return;
    const hit = info.pickInfo?.pickedMesh;
    const tracked = features.trackable(hit);
    if (hit && tracked) {
      flight.follow(hit, FRAMING_RADIUS.close * 0.25, () => {
        followChip.hide();
      });
      followChip.show(tracked.label);
      home.hidden = false;
      return;
    }
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
  const shortcuts = new Shortcuts(store);
  const keysButton = h(
    'button',
    { class: 'tool', type: 'button', 'aria-keyshortcuts': '?' },
    store.t('keys'),
  );
  keysButton.addEventListener('click', () => {
    shortcuts.toggle();
  });
  store.onChange(() => {
    keysButton.textContent = store.t('keys');
  });
  const row2 = h(
    'div',
    { class: 'brand-row' },
    tabButton('almanac'),
    tabButton('language'),
    tabButton('about'),
    sound,
    keysButton,
  );
  brand.append(row2, skyControls.el);
  brand.querySelector('.brand-row')?.append(home);
  app.append(labels.el, bubbles.el, brand, moment.el, timeline.el, panel.el, info.el, shortcuts.el);
  const compact = (): void => {
    moment.el.classList.toggle('compact', panel.open !== undefined || info.isOpen);
  };
  panel.onVisibility = compact;
  info.onVisibility = compact;
  document.addEventListener('keydown', (e) => {
    const stepKey = e.key === 'ArrowRight' || e.key === 'ArrowLeft';
    const modified = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const focus = document.activeElement;
    if (stepKey && !modified && !ownsArrows(focus)) {
      e.preventDefault();
      timeline.step(e.key === 'ArrowRight' ? 1 : -1);
      return;
    }
    const typing = focus instanceof HTMLInputElement && focus.type !== 'range';
    if (e.key === '?' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      shortcuts.toggle();
      return;
    }
    if (e.key !== 'Escape') return;
    if (document.querySelector('.prov-wrap.open') || document.activeElement?.closest('.prov-wrap')) return;
    if (shortcuts.isOpen) shortcuts.close();
    else if (panel.open) panel.close();
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
  const compass = new Compass(store, () => {
    flight.turnTo(northAlpha(world.camera.alpha));
  });
  app.append(compass.el, followChip.el);
  const chrome = [brand, moment.el, timeline.el, compass.el, followChip.el, panel.el, info.el, shortcuts.el];
  if (debug) chrome.push(debug.el);
  const banner = desktopBanner(store);
  if (banner) app.append(banner);
  if (debug) app.append(debug.el);

  let active = new Set<(typeof content.conversations)[number]['id']>();
  let snap: Snapshot = snapshotAt(content, t);
  const applyLight = (): void => {
    if (!lightPending) return;
    lightPending = false;
    const light = lightingAt(snap.environment, clock);
    world.applyLighting(light);
    const lamps = lampsAt(snap.lamplight, light.lamps);
    features.setLamps(lamps);
    firelight.show(smokeSources, lamps.hearth);
    smoke.shade(light.selfLit);
    document.documentElement.classList.toggle('night', light.night > 0.5);
    skyControls.paintTrack(snap.environment);
    debug?.light(clock, light, lamps);
  };
  const applyCost = new StageCost(['snapshot', 'features', 'environment']);
  // Recolouring the terrain, rebuilding the forest and re-rendering the shadow map cost a frame or
  // more, so while the slider moves they run at most this often, and once more when it stops.
  const HEAVY_INTERVAL_MS = 150;
  let heavyDue = false;
  let heavyAt = Number.NEGATIVE_INFINITY;
  const applyHeavy = (): void => {
    const now = performance.now();
    if (!heavyDue || now - heavyAt < HEAVY_INTERVAL_MS) return;
    heavyDue = false;
    heavyAt = now;
    world.applyEnvironment(
      snap.environment,
      seasonLook(clock.season, snap.chill),
      features.clearings(snap.features),
    );
    world.refreshShadows();
    applyCost.add(0, 0, performance.now() - now);
  };
  const apply = (): void => {
    if (!pending) {
      applyHeavy();
      applyLight();
      return;
    }
    pending = false;
    lightPending = true;
    heavyDue = true;
    const t0 = performance.now();
    snap = snapshotAt(content, t);
    const t1 = performance.now();
    features.apply(snap.features);
    applyCost.add(t1 - t0, performance.now() - t1, 0);
    smokeSources = features.smokeSources(snap.features);
    active = new Set(snap.conversations.map((c) => c.id));
    const open = panel.open;
    if (open && !active.has(open.id)) panel.close();
    labels.setYear(Math.round(snap.year));
    const near = snap.nearestEvent;
    const shown =
      near && Math.abs(tAt(content.timeline, near.when.from) - t) < MOMENT_RADIUS ? near : undefined;
    moment.show(shown);
    labels.setFocus(shown?.place);
    debug?.update(snap);
    info.update(snap);
    ambience?.set(snap.environment.ambient);
    applyHeavy();
    applyLight();
  };
  apply();

  engine.runRenderLoop(() => {
    const dt = engine.getDeltaTime();
    skyControls.tick(dt);
    apply();
    world.tick(dt);
    features.tick(dt);
    flight.tick(dt);
    compass.update(world.camera.alpha);
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
    labels.update([...bubbles.visible, ...onScreen(chrome)]);
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

// The slider, the info tabs, form fields and the 3D view (camera turning) use the arrow keys
// themselves; everywhere else they step.
function ownsArrows(focus: Element | null): boolean {
  if (!focus) return false;
  if (focus instanceof HTMLCanvasElement) return true;
  if (
    focus instanceof HTMLInputElement ||
    focus instanceof HTMLTextAreaElement ||
    focus instanceof HTMLSelectElement
  )
    return true;
  return focus.classList.contains('tl-track') || focus.getAttribute('role') === 'tab';
}

function onScreen(elements: readonly HTMLElement[]): DOMRect[] {
  return elements
    .filter((el) => !el.hidden)
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0);
}

// Sums the cost of each stage of a time change and logs one line every two seconds while it is busy.
class StageCost {
  private readonly total: number[];
  private readonly worst: number[];
  private count = 0;
  private since = performance.now();

  constructor(private readonly names: readonly string[]) {
    this.total = names.map(() => 0);
    this.worst = names.map(() => 0);
  }

  add(...ms: number[]): void {
    ms.forEach((v, i) => {
      this.total[i] = (this.total[i] ?? 0) + v;
      this.worst[i] = Math.max(this.worst[i] ?? 0, v);
    });
    this.count++;
    const now = performance.now();
    if (now - this.since < 2000) return;
    const parts = this.names.map(
      (n, i) =>
        `${n} avg=${((this.total[i] ?? 0) / this.count).toFixed(1)} max=${(this.worst[i] ?? 0).toFixed(1)}`,
    );
    console.info(`dewidebug apply cost n=${String(this.count)} ${parts.join(' ')} (ms)`);
    this.total.fill(0);
    this.worst.fill(0);
    this.count = 0;
    this.since = now;
  }
}
