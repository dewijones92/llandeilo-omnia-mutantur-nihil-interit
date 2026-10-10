import { PointerEventTypes, Vector3, type AbstractMesh } from './world/babylon.ts';
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
import { sceneFeatures, type Cutscene } from './domain/cutscene.ts';
import type { FeatureId, Framing, KeyEvent, RollingStock } from './domain/model.ts';
import { tAt } from './domain/timeline.ts';
import { ad, calendarYear, year, type Year } from './domain/time.ts';
import {
  loadBuildings,
  loadHeightfield,
  loadLidar,
  loadRailways,
  loadRivers,
  loadRoads,
  loadWoodland,
} from './platform/assets.ts';
import { logUnhandled, startupDone, startupStage, watchStartup } from './platform/startup.ts';
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
import { PhotoPanel } from './ui/photo-panel.ts';
import { PhotoPins } from './ui/photo-pins.ts';
import { initialPhotos, rememberPhotos, storedPhotos } from './ui/photos-pref.ts';
import { GuessGame } from './ui/guess.ts';
import { langToggle } from './ui/lang-toggle.ts';
import { OpeningCard } from './ui/opening.ts';
import { QualityMenu, storedQuality } from './ui/quality.ts';
import { showsBegin, welcomeAtStart } from './domain/opening.ts';
import { chooseQuality, QUALITY, type Quality } from './domain/quality.ts';
import { LANDMARK_MODELS } from './content/generated/models.ts';
import { Ambience } from './audio/ambience.ts';
import { h } from './ui/dom.ts';
import { SkyControls } from './ui/sky.ts';
import { LangStore } from './ui/store.ts';
import { TimelineBar } from './ui/timeline.ts';
import { storedWelcome, WelcomePanel, type WelcomeSection } from './ui/welcome.ts';
import { MapControls } from './world/controls.ts';
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
// A double-click flies in to half the distance, but no closer than this.
const DOUBLE_CLICK_MIN_RADIUS = 40;

// Awaits one start-up input and logs the stage when it lands, or when it fails (the caller's catch
// then reports the failure; this names which input it was).
async function loadStage<T>(name: string, work: Promise<T>): Promise<T> {
  try {
    const value = await work;
    startupStage(`${name} loaded`);
    return value;
  } catch (err: unknown) {
    startupStage(`${name} FAILED`, String(err));
    throw err;
  }
}

async function start(): Promise<void> {
  startupStage('main started');
  logUnhandled();
  let contextState = 'no webgl context event seen';
  const params = new URLSearchParams(location.search);
  const langParam = params.get('lang') ?? '';
  const store = new LangStore(isLang(langParam) ? langParam : 'en');
  document.documentElement.lang = store.lang;
  const app = document.getElementById('app');
  const canvas = document.getElementById('scene');
  if (!app || !(canvas instanceof HTMLCanvasElement)) throw new Error('Missing #app or #scene');

  canvas.addEventListener('webglcontextlost', () => {
    contextState = `webgl context LOST at ${String(Math.round(performance.now()))}ms`;
    console.error(`dewidebug startup ${contextState}`);
  });
  canvas.addEventListener('webglcontextcreationerror', (e) => {
    contextState = 'webgl context creation FAILED';
    console.error(`dewidebug startup ${contextState}`, e);
  });
  watchStartup([15_000, 60_000, 120_000], () => contextState);

  const opening = new OpeningCard(store, showsBegin(params, navigator.webdriver), [app, canvas]);
  document.body.append(opening.el);

  const [{ engine, backend, gpu }, heightfield, rivers, woodland, lidar, footprints, railways, roads] =
    await Promise.all([
      loadStage('engine', createEngine(canvas, params.has('webgl'))),
      loadStage('heightfield', loadHeightfield()),
      loadStage('rivers', loadRivers()),
      loadStage('woodland', loadWoodland()),
      loadStage('lidar', loadLidar()),
      loadStage('buildings', loadBuildings()),
      loadStage('railways', loadRailways()),
      loadStage('roads', loadRoads()),
    ]);
  startupStage('inputs all loaded', `backend=${backend}`);
  const chosen = chooseQuality({
    param: params.get('quality'),
    fx: params.get('fx'),
    stored: storedQuality(),
  });
  console.info(`dewidebug quality start=${chosen.quality} from=${chosen.source}`);
  const world = new World(engine, heightfield, rivers, woodland, lidar, QUALITY[chosen.quality]);
  startupStage('world built');
  const content = WORLD_CONTENT;
  const trainModels = new Map<RollingStock, LoadedModel>();
  startupStage('train model loading');
  const llanelly = await loadModel(
    world.scene,
    `${import.meta.env.BASE_URL}models/llanelly-train.glb`,
    TRAIN_SCALE,
  );
  startupStage('train model done', llanelly ? 'loaded' : 'missing (see the model warning above)');
  if (llanelly) trainModels.set('llanelly-1850s', llanelly);
  // Blender models for the important landmarks (ADR 0053), above Low only; ?models=off draws them procedurally.
  const modelsFor = (q: Quality): boolean => q !== 'low' && params.get('models') !== 'off';
  const features = new FeatureLayer(world, content.features, footprints, railways, roads, trainModels, {
    list: LANDMARK_MODELS,
    base: import.meta.env.BASE_URL,
    on: modelsFor(chosen.quality),
  });
  const people = new People(world.scene, content.conversations, content.people, features.ground);
  for (const m of people.meshes) world.addCaster(m);
  const smoke = new Smoke(world.scene);
  const firelight = new Firelight(world.scene, features.ground);
  world.addLamp(firelight.material);
  world.addLamp(firelight.halos.material);
  let smokeSources = features.smokeSources([]);

  const debug = params.has('debug')
    ? new DebugOverlay(
        engine,
        `${backend} (${gpu})`,
        world.camera,
        () => world.graphics(),
        () => world.terrain.detailStats(),
        () => features.levels(),
        () => features.models(),
      )
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
  const moment = new MomentCard(
    store,
    sourceMap,
    places,
    scenes,
    (scene) => {
      player.play(scene);
    },
    (id) => features.modelled(id),
  );
  features.onModelsChanged(() => {
    moment.refresh();
  });
  const flight = new Flight(world.camera);
  let dust: SmokeSource[] = [];
  // While a cutscene plays: its year, and the presence of the features it builds (ADR 0042).
  let sceneWorld: { readonly year: Year; built: ReadonlyMap<FeatureId, number> } | undefined;
  let shadowsAt = 0;
  let sceneSaid = '';
  const withScene = (present: readonly FeaturePresence[]): readonly FeaturePresence[] => {
    if (!sceneWorld) return present;
    const drawn = sceneFeatures(present, sceneWorld.built, sceneWorld.year, (id) => featureMap.get(id));
    const kept = new Set(drawn.map((p) => p.feature.id));
    const hidden = present.filter((p) => !kept.has(p.feature.id)).map((p) => p.feature.id);
    const said = `year=${String(sceneWorld.year)} hidden=${hidden.join(',') || 'none'}`;
    if (said !== sceneSaid) {
      sceneSaid = said;
      console.info(`dewidebug scene world ${said} (dates do not contain the scene's year)`);
    }
    return drawn;
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
    photographs: content.photographs,
  });
  const photoPanel = new PhotoPanel(store, sourceMap);
  const pins = new PhotoPins(world.scene, content.photographs, features.ground, store, (photo) => {
    panel.close();
    info.close();
    photoPanel.show(photo);
  });
  let photosOn = initialPhotos(params.get('photos'), storedPhotos());
  console.info(`dewidebug photos start on=${String(photosOn)}`);
  const openConversation = (c: (typeof content.conversations)[number]): void => {
    info.close();
    photoPanel.close();
    panel.show(c);
    const g = people.groups.get(c.id);
    if (g) flight.flyTo(g.anchor.clone(), 30, 1.12);
    home.hidden = false;
  };
  const followChip = new FollowChip(store, () => {
    flight.stopFollowing('stop button');
  });
  const bubbles = new Bubbles(world.scene, people.groups.values(), store, openConversation);
  const conversationOf = (mesh: AbstractMesh | null | undefined) => {
    const meta: unknown = mesh?.metadata;
    if (!meta || typeof meta !== 'object' || !('conversation' in meta)) return undefined;
    return content.conversations.find((x) => x.id === meta.conversation);
  };
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
    if (guess.hidingTheYear) return;
    const c = conversationOf(hit);
    if (c) openConversation(c);
  });
  const controls = new MapControls(world.camera, world.scene, canvas, features.ground, flight, {
    onMove(move) {
      if (move !== 'turn') home.hidden = false;
    },
    onDoubleClick(at, x, y) {
      // A double-click on a person or a train is two clicks on them, which they already answer.
      const hit = world.scene.pick(x, y).pickedMesh;
      if (features.trackable(hit) || conversationOf(hit)) {
        console.info(`dewidebug camera double-click on ${hit?.name ?? '?'} left to its own click`);
        return;
      }
      flight.flyTo(at, Math.max(DOUBLE_CLICK_MIN_RADIUS, world.camera.radius * 0.5), world.camera.beta);
      home.hidden = false;
    },
  });
  controls.passThrough(pins.el, 'photo pin');
  controls.passThrough(labels.el, 'place label');
  controls.passThrough(bubbles.el, 'speech bubble');
  const stage = new Stage(
    world.camera,
    flight,
    new Crowd(world.scene, features.ground),
    features.ground,
    controls,
  );
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
      photoPanel.close();
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
  const welcome = new WelcomePanel(store, [app, canvas], () => {
    panel.close();
    info.open('about');
  });
  document.body.append(welcome.el);
  const keysButton = h(
    'button',
    { class: 'tool', type: 'button', 'aria-keyshortcuts': '?' },
    store.t('keys'),
  );
  // A scene holds the screen, so the welcome waits for it; one asked for at start opens when it ends.
  let welcomeAfterScene = false;
  const openWelcome = (section: WelcomeSection, why: string): void => {
    if (player.playing) {
      console.info(`dewidebug welcome not opened over a scene why=${why}`);
      return;
    }
    welcome.open(section);
  };
  keysButton.addEventListener('click', () => {
    openWelcome('controls', 'keys button');
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
      photoPanel.close();
      info.close();
    },
  });
  onSeason = () => {
    guess.seasonChanged();
  };
  const photosButton = h(
    'button',
    { class: 'tool', type: 'button', 'aria-pressed': photosOn, title: store.t('photosHelp') },
    store.t('photos'),
  );
  const syncPins = (): void => {
    pins.setShown(photosOn ? snap.photographs : []);
    const open = photoPanel.open;
    if (open && !pins.has(open.id)) photoPanel.close();
  };
  photosButton.addEventListener('click', () => {
    photosOn = !photosOn;
    rememberPhotos(photosOn);
    photosButton.setAttribute('aria-pressed', String(photosOn));
    console.info(`dewidebug photos toggled on=${String(photosOn)} pinned=${String(snap.photographs.length)}`);
    syncPins();
  });
  store.onChange(() => {
    photosButton.textContent = store.t('photos');
    photosButton.title = store.t('photosHelp');
  });
  const eventsById = new Map(content.events.map((e) => [e.id, e]));
  const keyDateOf = (scene: Cutscene): KeyEvent => {
    const ev = eventsById.get(scene.event);
    if (!ev) throw new Error(`Cutscene ${scene.id} names no event ${scene.event}`);
    return ev;
  };
  // The faded interface behind a playing scene, and the canvas, are inert, so Tab and Enter cannot
  // reach them; the stage holds the camera meanwhile.
  const behindScene = (inert: boolean): void => {
    const els = [canvas, ...app.children].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== player.el,
    );
    for (const el of els) el.inert = inert;
    console.info(`dewidebug cutscene interface behind inert=${String(inert)} elements=${String(els.length)}`);
  };
  const player = new CutscenePlayer(store, sourceMap, {
    onStart(scene) {
      const ev = keyDateOf(scene);
      // Closing the welcome clears its own inert marks, so it closes before the scene sets them, and it
      // comes back once the scene ends.
      if (welcome.isOpen) {
        welcomeAfterScene = true;
        welcome.close('a scene began');
      }
      behindScene(true);
      panel.close();
      photoPanel.close();
      info.close();
      flight.stopFollowing('cutscene');
      sceneWorld = { year: ev.when.from, built: new Map() };
      timeline.jump(tAt(content.timeline, ev.when.from));
      timeline.lock(true);
      stage.begin();
      ambience?.duck(true);
    },
    onEnd(scene, skipped) {
      const ev = keyDateOf(scene);
      behindScene(false);
      ambience?.stopCues();
      ambience?.duck(false);
      stage.end();
      dust = [];
      sceneWorld = undefined;
      timeline.lock(false);
      timeline.jump(tAt(content.timeline, ev.when.from));
      world.refreshShadows();
      console.info(`dewidebug cutscene landed event=${ev.id} skipped=${String(skipped)}`);
      goToShot(ev);
      if (welcomeAfterScene) {
        welcomeAfterScene = false;
        console.info('dewidebug welcome opens now that the scene has ended');
        welcome.open('top');
      }
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
    photosButton,
    sound,
    keysButton,
    guess.button,
  );
  const quality = new QualityMenu(store, chosen.quality, (q) => {
    world.setQuality(QUALITY[q]);
    features.setModels(modelsFor(q));
  });
  brand.append(row2, skyControls.el, quality.el);
  brand.querySelector('.brand-row')?.append(home);
  // Everything that would give the year away during a "When are we?" round (see styles.css).
  for (const el of [
    labels.el,
    bubbles.el,
    pins.el,
    moment.el,
    panel.el,
    photoPanel.el,
    info.el,
    followChip.el,
    debug?.el,
  ]) {
    el?.classList.add('reveals-when');
  }
  app.append(
    labels.el,
    bubbles.el,
    pins.el,
    brand,
    moment.el,
    timeline.el,
    panel.el,
    photoPanel.el,
    info.el,
    guess.el,
    player.el,
  );
  const compact = (): void => {
    const sideOpen = panel.open !== undefined || photoPanel.open !== undefined || info.isOpen;
    moment.el.classList.toggle('compact', sideOpen);
    // The game panel shares the right-hand slot with these, so it steps aside while one is open.
    document.documentElement.classList.toggle('side-panel-open', sideOpen);
  };
  panel.onVisibility = compact;
  photoPanel.onVisibility = compact;
  info.onVisibility = compact;
  document.addEventListener('keydown', (e) => {
    if (opening.isWaiting) {
      console.info(`dewidebug key ${e.key} ignored while the Begin card waits`);
      return;
    }
    if (player.playing) {
      if (e.key === 'Escape' && e.defaultPrevented) {
        console.info('dewidebug Escape closed an ⓘ; the cutscene plays on');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        player.skip('escape');
      } else if (e.key.startsWith('Arrow') || e.key === '?' || e.key.startsWith('Page')) {
        e.preventDefault();
        console.info(`dewidebug key ${e.key} ignored while a cutscene plays`);
      }
      return;
    }
    const helpKey = e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey;
    // The welcome is modal: Escape and ? close it, and every other key stays with it (scrolling it,
    // ticking its box) rather than stepping the timeline behind it.
    if (welcome.isOpen) {
      if (e.key === 'Escape' || helpKey) {
        e.preventDefault();
        welcome.close(e.key);
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
    if (helpKey && !typing) {
      e.preventDefault();
      openWelcome('controls', '? key');
      return;
    }
    if (e.key !== 'Escape') return;
    if (
      e.defaultPrevented ||
      document.querySelector('.prov-wrap.open') ||
      document.activeElement?.closest('.prov-wrap')
    )
      return;
    if (panel.open) panel.close();
    else if (photoPanel.open) photoPanel.close();
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
  app.append(compass.el, welcome.button, followChip.el);
  const chrome = [
    brand,
    moment.el,
    timeline.el,
    compass.el,
    welcome.button,
    welcome.panel,
    followChip.el,
    panel.el,
    photoPanel.el,
    info.el,
    guess.el,
  ];
  if (debug) chrome.push(debug.el);
  const banner = desktopBanner(store);
  if (banner) app.append(banner);
  if (debug) app.append(debug.el);

  let active = new Set<(typeof content.conversations)[number]['id']>();
  let snap: Snapshot = snapshotAt(content, t);
  let drawn: readonly FeaturePresence[] = [];
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
    world.applyEnvironment(snap.environment, seasonLook(clock.season, snap.chill), features.clearings(drawn));
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
    drawn = withScene(snap.features);
    features.apply(drawn);
    applyCost.add(t1 - t0, performance.now() - t1, 0);
    smokeSources = features.smokeSources(drawn);
    active = new Set(snap.conversations.map((c) => c.id));
    const open = panel.open;
    if (open && !active.has(open.id)) panel.close();
    labels.setYear(calendarYear(snap.year));
    const near = snap.nearestEvent;
    const shown =
      near && Math.abs(tAt(content.timeline, near.when.from) - t) < MOMENT_RADIUS ? near : undefined;
    moment.show(shown, snap.features);
    labels.setFocus(shown?.place);
    syncPins();
    debug?.update(snap);
    info.update(snap);
    ambience?.set(snap.sound.levels);
    applyHeavy();
    applyLight();
  };
  apply();
  world.settleDetail();

  engine.runRenderLoop(() => {
    const dt = engine.getDeltaTime();
    skyControls.tick(dt);
    apply();
    const frame = player.tick(dt);
    if (frame) {
      dust = stage.show(frame, performance.now());
      const scene = sceneWorld;
      if (scene && frame.features.size) {
        const changed = [...frame.features].some(
          ([id, p]) => Math.abs((scene.built.get(id) ?? -1) - p) > 0.004,
        );
        if (changed) {
          scene.built = frame.features;
          drawn = withScene(snap.features);
          features.apply(drawn);
          smokeSources = features.smokeSources(drawn);
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
    controls.tick(dt);
    if (features.setViewer(world.camera.globalPosition)) world.refreshShadows();
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
    const chromeBoxes = onScreen(chrome);
    labels.update([...bubbles.visible, ...chromeBoxes]);
    pins.update([...bubbles.visible, ...labels.visible, ...chromeBoxes]);
  });
  window.addEventListener('resize', () => {
    engine.resize();
  });
  startupStage('scene built', 'waiting for scene.whenReadyAsync');
  await world.scene.whenReadyAsync();
  startupStage('scene ready');
  opening.ready(
    () => {
      setSound(true);
    },
    () => {
      if (player.playing) behindScene(true);
      const atStart = welcomeAtStart(params, navigator.webdriver, storedWelcome());
      console.info(`dewidebug welcome at start show=${String(atStart.show)} why=${atStart.why}`);
      if (!atStart.show) return;
      if (player.playing) {
        welcomeAfterScene = true;
        console.info(`dewidebug welcome at start waits for the scene ${player.playing.id} to end`);
      } else welcome.open('top');
    },
  );
  if (debug)
    Object.assign(window, {
      llandeiloDebug: {
        scene: world.scene,
        backend,
        gpu,
        detail: () => world.terrain.detailStats(),
        seam: () => world.terrain.seam(),
        terrain: world.terrain,
        placeTrainNear: (x: number, z: number) => features.placeTrainNear(x, z),
        modelParts: (id: string) => features.modelParts(id),
      },
    });
  // ?cutscene=<id>&cutsceneAt=<seconds> starts a scene part-way through, for screenshots.
  const sceneParam = CUTSCENES.find((c) => c.id === params.get('cutscene'));
  if (sceneParam) {
    player.play(sceneParam);
    const at = Number(params.get('cutsceneAt') ?? 0);
    if (Number.isFinite(at) && at > 0) player.tick(at * 1000);
    console.info(`dewidebug cutscene from url id=${sceneParam.id} at=${String(at)}`);
  }
  document.body.dataset['ready'] = 'true';
  startupDone();
  console.info(`dewidebug app ready backend=${backend}`);
}

start().catch((err: unknown) => {
  console.error('dewidebug app failed to start', err);
  startupStage('FAILED', err instanceof Error ? err.message : String(err));
  const lang = new URLSearchParams(location.search).get('lang') === 'cy' ? 'cy' : 'en';
  document.body.dataset['ready'] = 'error';
  const msg = document.createElement('p');
  msg.className = 'panel';
  msg.style.cssText =
    'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);padding:20px;z-index:200';
  msg.textContent = `${STRINGS.loadingFailed[lang]} ${err instanceof Error ? err.message : String(err)}`;
  document.body.append(msg);
});

// The slider, the info tabs, form fields and the 3D view (sliding the camera) use the arrow keys
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
