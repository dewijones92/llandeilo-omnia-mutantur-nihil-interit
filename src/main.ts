import { PointerEventTypes, Vector3 } from './world/babylon.ts';
import './ui/styles.css';
import { CUTSCENES } from './content/cutscenes.ts';
import { WORLD_CONTENT } from './content/world.ts';
import { toWorld } from './domain/geo.ts';
import { highestM } from './domain/heightfield.ts';
import { isLang } from './domain/i18n.ts';
import { STRINGS } from './content/strings.ts';
import { lightingAt, parseClock, seasonLook } from './domain/daylight.ts';
import { lampsAt } from './domain/lamplight.ts';
import { snapshotAt, type FeaturePresence, type Snapshot } from './domain/state.ts';
import { keySteps, nearestStep, shotFor } from './domain/steps.ts';
import type { Cutscene } from './domain/cutscene.ts';
import type { FeatureId, Framing, KeyEvent, RollingStock } from './domain/model.ts';
import { tAt } from './domain/timeline.ts';
import { ad, calendarYear, year } from './domain/time.ts';
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
import { CutscenePlayer } from './ui/cutscene.ts';
import { Bubbles } from './ui/bubbles.ts';
import { loadModel, type LoadedModel } from './world/models.ts';
import { Compass } from './ui/compass.ts';
import { northAlpha } from './domain/compass.ts';
import { FollowChip } from './ui/follow-chip.ts';
import { desktopBanner } from './ui/desktop-banner.ts';
import { ConversationPanel } from './ui/conversation.ts';
import { InfoPanel, type InfoTab } from './ui/info.ts';
import { GuessGame } from './ui/guess.ts';
import { langToggle } from './ui/lang-toggle.ts';
import { OpeningCard } from './ui/opening.ts';
import { QualityMenu, storedQuality } from './ui/quality.ts';
import { showsBegin } from './domain/opening.ts';
import { chooseQuality, QUALITY } from './domain/quality.ts';
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
import { Crowd } from './world/crowd.ts';
import { Stage } from './world/stage.ts';
import type { SmokeSource } from './world/smoke.ts';
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

  const opening = new OpeningCard(store, showsBegin(params, navigator.webdriver), [app, canvas]);
  document.body.append(opening.el);

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
  const chosen = chooseQuality({
    param: params.get('quality'),
    fx: params.get('fx'),
    stored: storedQuality(),
  });
  console.info(`dewidebug quality start=${chosen.quality} from=${chosen.source}`);
  const world = new World(engine, heightfield, rivers, woodland, QUALITY[chosen.quality]);
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

  const debug = params.has('debug')
    ? new DebugOverlay(engine, backend, world.camera, () => world.graphics())
    : undefined;
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
  let onSeason: () => void = () => undefined;
  const skyControls = new SkyControls(store, clock, sourceMap, (next) => {
    const seasonChanged = next.season !== clock.season;
    if (seasonChanged) pending = true;
    clock = next;
    lightPending = true;
    if (seasonChanged) onSeason();
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
  const scenes = new Map(CUTSCENES.map((c) => [c.event, c]));
  const moment = new MomentCard(store, sourceMap, places, scenes, (scene) => {
    player.play(scene);
  });
  const flight = new Flight(world.camera);
  const stage = new Stage(world.camera, flight, new Crowd(world.scene, features.ground), features.ground);
  let dust: SmokeSource[] = [];
  // Presence of the features a playing cutscene builds; it overrides the timeline's own.
  let sceneFeatures: ReadonlyMap<FeatureId, number> | undefined;
  let shadowsAt = 0;
  const withScene = (present: readonly FeaturePresence[]): readonly FeaturePresence[] => {
    const over = sceneFeatures;
    if (!over) return present;
    const out = present
      .filter((p) => !over.has(p.feature.id))
      .concat(
        present
          .filter((p) => over.has(p.feature.id))
          .map((p) => ({ ...p, presence: over.get(p.feature.id) ?? 0 })),
      );
    for (const [id, presence] of over) {
      const feature = featureMap.get(id);
      if (feature && !present.some((p) => p.feature.id === id)) out.push({ feature, presence });
    }
    return out;
  };
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
    if (info.type !== PointerEventTypes.POINTERTAP || player.playing) return;
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
    if (guess.hidingTheYear) return;
    if (meta && typeof meta === 'object' && 'conversation' in meta) {
      const c = content.conversations.find((x) => x.id === meta.conversation);
      if (c) openConversation(c);
    }
  });
  let ambience: Ambience | undefined;
  let soundOn = false;
  const sound = h('button', { class: 'tool', type: 'button', 'aria-pressed': false }, store.t('soundOff'));
  // Browsers only start audio from a click, so this must run inside one.
  const setSound = (on: boolean): void => {
    soundOn = on;
    ambience ??= new Ambience();
    ambience.set(snapshotAt(content, t).sound.levels);
    ambience.enable(soundOn);
    sound.setAttribute('aria-pressed', String(soundOn));
    sound.textContent = store.t(soundOn ? 'soundOn' : 'soundOff');
  };
  sound.addEventListener('click', () => {
    setSound(!soundOn);
  });
  const tabButton = (tab: InfoTab): HTMLButtonElement => {
    const b = h('button', { class: 'tool reveals-when', type: 'button' }, store.t(tab));
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
  const guess = new GuessGame(store, {
    world: content,
    trainLine: features.trainLine?.points,
    steps,
    timeline,
    sources: sourceMap,
    highestGroundM: highestM(heightfield),
    season() {
      return clock.season;
    },
    jumpTo(next) {
      timeline.jump(next);
    },
    sweepTo(step, done) {
      const sky = step.event.recordedSky;
      timeline.snapTo(step, () => {
        if (sky) skyControls.adopt(sky);
        done();
      });
    },
    overview() {
      flight.flyHome();
      home.hidden = true;
    },
    showMe(at) {
      const { x, z } = toWorld(at);
      flight.flyTo(new Vector3(x, features.ground(x, z), z), FRAMING_RADIUS.site, 0.98);
      home.hidden = false;
    },
    closePanels() {
      panel.close();
      info.close();
    },
  });
  onSeason = () => {
    guess.seasonChanged();
  };
  const eventsById = new Map(content.events.map((e) => [e.id, e]));
  const keyDateOf = (scene: Cutscene): KeyEvent => {
    const ev = eventsById.get(scene.event);
    if (!ev) throw new Error(`Cutscene ${scene.id} names no event ${scene.event}`);
    return ev;
  };
  const player = new CutscenePlayer(store, sourceMap, {
    onStart(scene) {
      const ev = keyDateOf(scene);
      panel.close();
      info.close();
      if (shortcuts.isOpen) shortcuts.close();
      flight.stopFollowing('cutscene');
      timeline.jump(tAt(content.timeline, ev.when.from));
      timeline.lock(() => {
        player.skip('timeline');
      });
      stage.begin();
      ambience?.duck(true);
    },
    onEnd(scene, skipped) {
      const ev = keyDateOf(scene);
      ambience?.stopCues();
      ambience?.duck(false);
      stage.end();
      dust = [];
      sceneFeatures = undefined;
      timeline.lock(undefined);
      timeline.jump(tAt(content.timeline, ev.when.from));
      world.refreshShadows();
      console.info(`dewidebug cutscene landed event=${ev.id} skipped=${String(skipped)}`);
      goToShot(ev);
    },
    soundOn() {
      return soundOn;
    },
    cue(sound, seconds) {
      ambience?.cue(sound, seconds);
    },
  });
  const row2 = h(
    'div',
    { class: 'brand-row' },
    tabButton('almanac'),
    tabButton('language'),
    tabButton('about'),
    sound,
    keysButton,
    guess.button,
  );
  const quality = new QualityMenu(store, chosen.quality, (q) => {
    world.setQuality(QUALITY[q]);
  });
  brand.append(row2, skyControls.el, quality.el);
  brand.querySelector('.brand-row')?.append(home);
  // Everything that would give the year away during a "When are we?" round (see styles.css).
  for (const el of [labels.el, bubbles.el, moment.el, panel.el, info.el, followChip.el, debug?.el]) {
    el?.classList.add('reveals-when');
  }
  app.append(
    labels.el,
    bubbles.el,
    brand,
    moment.el,
    timeline.el,
    panel.el,
    info.el,
    shortcuts.el,
    guess.el,
    player.el,
  );
  const compact = (): void => {
    moment.el.classList.toggle('compact', panel.open !== undefined || info.isOpen);
    // The game panel shares the right-hand slot with these, so it steps aside while one is open.
    document.documentElement.classList.toggle('side-panel-open', panel.open !== undefined || info.isOpen);
  };
  panel.onVisibility = compact;
  info.onVisibility = compact;
  document.addEventListener('keydown', (e) => {
    if (opening.isWaiting) {
      console.info(`dewidebug key ${e.key} ignored while the Begin card waits`);
      return;
    }
    if (player.playing) {
      if (e.key === 'Escape') {
        e.preventDefault();
        player.skip('escape');
      } else if (e.key.startsWith('Arrow') || e.key === '?' || e.key.startsWith('Page')) {
        e.preventDefault();
        console.info(`dewidebug key ${e.key} ignored while a cutscene plays`);
      }
      return;
    }
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
  const chrome = [
    brand,
    moment.el,
    timeline.el,
    compass.el,
    followChip.el,
    panel.el,
    info.el,
    shortcuts.el,
    guess.el,
  ];
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
    features.apply(withScene(snap.features));
    applyCost.add(t1 - t0, performance.now() - t1, 0);
    smokeSources = features.smokeSources(snap.features);
    active = new Set(snap.conversations.map((c) => c.id));
    const open = panel.open;
    if (open && !active.has(open.id)) panel.close();
    labels.setYear(calendarYear(snap.year));
    const near = snap.nearestEvent;
    const shown =
      near && Math.abs(tAt(content.timeline, near.when.from) - t) < MOMENT_RADIUS ? near : undefined;
    moment.show(shown);
    labels.setFocus(shown?.place);
    debug?.update(snap);
    info.update(snap);
    ambience?.set(snap.sound.levels);
    applyHeavy();
    applyLight();
  };
  apply();

  engine.runRenderLoop(() => {
    const dt = engine.getDeltaTime();
    skyControls.tick(dt);
    apply();
    const frame = player.tick(dt);
    if (frame) {
      dust = stage.show(frame, performance.now());
      if (frame.features.size) {
        const changed =
          !sceneFeatures ||
          [...frame.features].some(([id, p]) => Math.abs((sceneFeatures?.get(id) ?? -1) - p) > 0.004);
        if (changed) {
          sceneFeatures = frame.features;
          features.apply(withScene(snap.features));
          const now = performance.now();
          if (now - shadowsAt > 250) {
            shadowsAt = now;
            world.refreshShadows();
          }
        }
      }
    }
    world.tick(dt);
    features.tick(dt);
    flight.tick(dt);
    compass.update(world.camera.alpha);
    const now = performance.now();
    people.show(active, now);
    const eye = world.camera.globalPosition;
    const trainSmoke = features.trainSmoke();
    smoke.show([...smokeSources, ...(trainSmoke ? [trainSmoke] : []), ...dust], (x, z) =>
      Math.hypot(eye.x - x, eye.z - z),
    );
    const train = features.trainPosition();
    const trainNear = train ? 0.15 + 0.85 * Math.max(0, 1 - Vector3.Distance(eye, train) / 1400) ** 2 : 0;
    ambience?.near('train', trainNear);
    ambience?.near('railcar', trainNear);
    world.scene.render();
    bubbles.update(active, now);
    labels.update([...bubbles.visible, ...onScreen(chrome)]);
  });
  window.addEventListener('resize', () => {
    engine.resize();
  });
  await world.scene.whenReadyAsync();
  opening.ready(() => {
    setSound(true);
  });
  if (debug) Object.assign(window, { llandeiloDebug: { scene: world.scene } });
  // ?cutscene=<id>&cutsceneAt=<seconds> starts a scene part-way through, for screenshots.
  const sceneParam = CUTSCENES.find((c) => c.id === params.get('cutscene'));
  if (sceneParam) {
    player.play(sceneParam);
    const at = Number(params.get('cutsceneAt') ?? 0);
    if (Number.isFinite(at) && at > 0) player.tick(at * 1000);
    console.info(`dewidebug cutscene from url id=${sceneParam.id} at=${String(at)}`);
  }
  document.body.dataset['ready'] = 'true';
  console.info(`dewidebug app ready backend=${backend}`);
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
