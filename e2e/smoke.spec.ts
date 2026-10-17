import { mkdirSync, writeFileSync } from 'node:fs';
import type { Locator, Page } from '@playwright/test';
import { expect, ready, test } from './ready.ts';
import { CUTSCENES } from '../src/content/cutscenes.ts';
import { EVENTS } from '../src/content/events.ts';
import { HARRIES_PHOTOGRAPHS } from '../src/content/photographs.ts';
import { TIMELINE } from '../src/content/timeline.ts';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { playableSteps } from '../src/domain/guess.ts';
import { toWorld } from '../src/domain/geo.ts';
import { keySteps, stepFrom } from '../src/domain/steps.ts';
import { tAt } from '../src/domain/timeline.ts';
import { formatSliderYear, year } from '../src/domain/time.ts';

test('the valley loads and the slider moves through time', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./');
  await ready(page);
  const slider = page.getByRole('slider', { name: /Timeline|Llinell amser/ });
  await expect(slider).toBeVisible();
  await expect(page.locator('.tl-year')).toHaveText('1282');
  await slider.focus();
  await page.keyboard.press('End');
  await expect(page.locator('.tl-year')).toHaveText('2026');
  await page.keyboard.press('Home');
  await expect(page.locator('.tl-year')).toContainText('BC');
  await page.screenshot({ path: 'test-results/smoke-start.png' });
  expect(errors).toEqual([]);
});

test('the interface switches to Welsh', async ({ page }) => {
  await page.goto('./');
  await ready(page);
  await page.getByRole('button', { name: 'Cymraeg' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'cy');
  await expect(page.locator('.tl-era')).toHaveText('Yr Oesoedd Canol');
});

test('a conversation opens from its bubble and lists its lines', async ({ page }) => {
  await page.goto('./?place=llandeilo&year=1282&radius=200');
  await ready(page);
  const bubble = page.locator('.bubble').filter({ visible: true });
  await expect(bubble).toBeVisible();
  await bubble.click();
  const panel = page.locator('.convo');
  await expect(panel).toBeVisible();
  await expect(panel.locator('h2')).toHaveText('News of the ambush');
  await expect(panel.locator('.line')).toHaveCount(6);
  await expect(panel.locator('.prov-imagined')).toBeVisible();
  await expect(panel.locator('.line-quote')).toContainText('Peryf ap Cedifor');
  await expect(panel.locator('.convo-note', { hasText: 'About the voice' })).toHaveCount(0);
  const [p, c] = [await panel.boundingBox(), await page.locator('.compass').boundingBox()];
  expect(p && c && p.y < c.y + c.height && p.x + p.width > c.x).toBe(false);
  await page.screenshot({ path: 'test-results/conversation-1282.png' });
});

test('a conversation in modern Welsh says the voice has a standard accent, not the local dialect', async ({
  page,
}) => {
  await page.goto('./?place=llandeilo&year=1843&radius=200');
  await ready(page);
  await page.locator('.bubble').filter({ visible: true }).first().click();
  const note = page.locator('.convo .convo-note', { hasText: 'About the voice' });
  await expect(note).toContainText('Dyfedeg');
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await expect(page.locator('.convo .convo-note', { hasText: 'Am y llais' })).toContainText('Dyfedeg');
});

test('the almanac, language and sound controls work for the chosen year', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?year=1843');
  await ready(page);
  await page.getByRole('button', { name: 'Almanac' }).click();
  const info = page.locator('.info');
  await expect(info).toBeVisible();
  await expect(info.locator('.info-list li').first()).toBeVisible();
  await expect(info).toContainText('turnpike');
  await expect(info.locator('.prov').first()).toBeVisible();
  await page.screenshot({ path: 'test-results/almanac-1843.png' });
  await info.getByRole('tab', { name: 'Language' }).click();
  await expect(info).toContainText('84.9%');
  const sound = page.getByRole('button', { name: 'Sound off' });
  await sound.click();
  await expect(page.getByRole('button', { name: 'Sound on' })).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});

test('the chosen tab keeps its dark background while the mouse is still over it', async ({ page }) => {
  await page.goto('./?year=1843');
  await ready(page);
  await page.getByRole('button', { name: 'Almanac' }).click();
  const tab = page.locator('.info').getByRole('tab', { name: 'Language' });
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
  const look = (): Promise<string> =>
    tab.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.backgroundColor} / ${s.color}`;
    });
  await page.mouse.move(5, 5);
  const away = await look();
  expect(away, 'a chosen tab has white text').toMatch(/ \/ rgb\(255, 255, 255\)$/);
  await tab.hover();
  expect(await look(), 'hovering the chosen tab must not wash out its background').toBe(away);
});

test('arrow keys move the slider without snapping back to a key date', async ({ page }) => {
  await page.goto('./');
  await ready(page);
  const slider = page.getByRole('slider', { name: /Timeline|Llinell amser/ });
  await slider.focus();
  await page.keyboard.press('Home');
  const start = await page.locator('.tl-year').textContent();
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
  await expect(page.locator('.tl-year')).not.toHaveText(start ?? '');
  await expect(page.locator('.tl-year')).not.toHaveText(/\d\.\d/);
  await page.keyboard.press('PageUp');
  await expect(page.locator('.moment')).toBeVisible();
});

test('the 3D view receives the mouse through the overlay layers, and keeps its arrow keys', async ({
  page,
}) => {
  const steps: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug timeline step')) steps.push(m.text());
  });
  await page.goto('./?debug&year=1282');
  await ready(page);
  const target = await page.evaluate(
    () => document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.id ?? '',
  );
  expect(target).toBe('scene');
  await page.mouse.click(1100, 150);
  await expect(page.locator('#scene')).toBeFocused();
  const before = await cameraState(page);
  await page.keyboard.press('ArrowRight');
  // The counter redraws only on a rendered frame (about 1fps here), so check the logged decision.
  await page.waitForTimeout(1000);
  expect(steps).toEqual([]);
  // In the 3D view the arrows slide the camera across the land, as WASD does.
  await expect.poll(async () => moved(before, await cameraState(page))).toBeGreaterThan(1);
});

test('a place label flies the camera in and offers the whole valley back', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  await page.locator('.label', { hasText: 'Talyllychau' }).click();
  const home = page.getByRole('button', { name: 'Whole valley' });
  await expect(home).toBeVisible();
  await home.click();
  await expect(home).toBeHidden();
});

test('a provenance badge explains itself and lists its sources', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  const badge = page.locator('.moment .prov');
  await badge.click();
  const pop = page.locator('.moment .prov-pop');
  await expect(pop).toBeVisible();
  await expect(pop).toContainText('Recorded in historical or archaeological sources');
  await expect(pop.locator('a').first()).toHaveAttribute('href', /^https?:\/\//);
  await page.keyboard.press('Escape');
  await page.mouse.move(5, 5);
  await expect(pop).toBeHidden();
});

test('switching to Welsh translates the moment card and the labels', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  const note = (name: RegExp) => page.locator('.label', { hasText: name }).locator('.label-note');
  await expect(note(/^Garn Goch/)).toHaveText(' (today)');
  await expect(note(/^Dinefwr/)).toHaveText('');
  await page.getByRole('button', { name: 'Cymraeg' }).click();
  await expect(note(/^Garn Goch/)).toHaveText(' (heddiw)');
  await expect(page.locator('.moment h2')).toHaveText('Brwydr Llandeilo Fawr');
  await expect(page.locator('.label').first()).toHaveAttribute('title', /^Ymweld /);
  await expect(page.getByRole('slider', { name: /Timeline|Llinell amser/ })).toHaveAttribute(
    'aria-label',
    'Llinell amser',
  );
  await page.goto('./?year=74');
  await ready(page);
  await expect(page.locator('.moment-place')).toHaveText('Caerau Rhufeinig Dinefwr (today)');
});

test('Next and Previous step through key dates and fly the camera there', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  await expect(page.locator('.tl-counter')).toHaveText(/^\d+ \/ \d+$/);
  const start = await page.locator('.tl-counter').textContent();
  await page.getByRole('button', { name: /Next/ }).click();
  await expect(page.locator('.moment h2')).toHaveText('The siege of Dryslwyn');
  await expect(page.getByRole('button', { name: 'Whole valley' })).toBeVisible();
  await page.getByRole('button', { name: /Previous/ }).click();
  await expect(page.locator('.tl-counter')).toHaveText(start ?? '');
  await expect(page.locator('.moment h2')).toHaveText('Battle of Llandeilo Fawr');
});

const cameraTarget = async (page: Page): Promise<{ x: number; z: number }> => {
  await expect(page.locator('.debug')).toHaveAttribute('data-camera', /,/);
  const [x, z] = ((await page.locator('.debug').getAttribute('data-camera')) ?? '').split(',').map(Number);
  return { x: x ?? Number.NaN, z: z ?? Number.NaN };
};

test('two quick clicks on Next move two key dates', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  const [n, total] = ((await page.locator('.tl-counter').textContent()) ?? '').split(' / ').map(Number);
  await page.getByRole('button', { name: /Next/ }).evaluate((b) => {
    if (!(b instanceof HTMLElement)) throw new Error('Next is not a button');
    b.click();
    b.click();
  });
  await expect(page.locator('.tl-counter')).toHaveText(`${(n ?? 0) + 2} / ${total ?? 0}`);
});

test('letting go near a key date snaps the slider but leaves the camera where it was', async ({ page }) => {
  await page.goto('./?debug&year=1282&place=talley');
  await ready(page);
  const before = await cameraTarget(page);
  const track = page.locator('.tl-track');
  const box = await track.boundingBox();
  const left = await page.getByRole('button', { name: /The railway arrives/ }).getAttribute('style');
  const leftPct = Number(/left:\s*([\d.]+)%/.exec(left ?? '')?.[1]);
  if (!box) throw new Error('no track');
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width * 0.3, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * (leftPct / 100 + 0.004), y, { steps: 4 });
  await page.mouse.up();
  await expect(page.locator('.tl-counter')).toHaveText(/^\d+ \/ \d+$/);
  await page.waitForTimeout(3000);
  const after = await cameraTarget(page);
  expect(Math.hypot(after.x - before.x, after.z - before.z)).toBeLessThan(1);
  await expect(page.getByRole('button', { name: 'Whole valley' })).toBeVisible();
});

test('a minor marker flies the camera to its own event', async ({ page }) => {
  await page.goto('./?debug&year=1282');
  await ready(page);
  await page.getByRole('button', { name: /Paxton’s Tower/ }).dispatchEvent('click');
  const paxton = toWorld({ e: 254094, n: 219151 });
  await expect
    .poll(
      async () => {
        const t = await cameraTarget(page);
        return Math.hypot(t.x - paxton.x, t.z - paxton.z);
      },
      { timeout: 60_000 },
    )
    .toBeLessThan(5);
});

test('Next straight after a minor marker click steps on from that marker', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  const paxton = EVENTS.find((e) => e.id === 'paxtons-tower');
  if (!paxton) throw new Error('no Paxton event');
  const expected = stepFrom(keySteps(TIMELINE, EVENTS), tAt(TIMELINE, paxton.when.from), 1);
  if (!expected) throw new Error('no key date after Paxton');
  await page.evaluate(() => {
    const marker = [...document.querySelectorAll('.tl-marker')].find((m) =>
      m.getAttribute('aria-label')?.includes('Paxton'),
    );
    const next = [...document.querySelectorAll('.tl-step')].find((b) => b.textContent.includes('Next'));
    if (!(marker instanceof HTMLElement) || !(next instanceof HTMLElement))
      throw new Error('controls missing');
    marker.click();
    next.click();
  });
  await expect(page.locator('.tl-counter')).toHaveAttribute('title', expected.event.title.en);
});

test('the compass shows the heading and turns the view to face north', async ({ page }) => {
  await page.goto('./?debug&year=1282');
  await ready(page);
  const compass = page.locator('.compass');
  const box = await page.locator('#scene').boundingBox();
  if (!box) throw new Error('no canvas');
  const bearing = async (): Promise<number> => Number(await compass.getAttribute('data-bearing'));
  // The opening view already faces about 20°, so the test reads a change, not a value.
  const start = await bearing();
  const turned = async (): Promise<number> => {
    const d = Math.abs((await bearing()) - start) % 360;
    return Math.min(d, 360 - d);
  };
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.3);
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.3, { steps: 6 });
  await page.mouse.up({ button: 'right' });
  await expect.poll(turned).toBeGreaterThan(10);
  // The click comes while the turn is still gliding, which is when it used to be undone.
  expect(await turnGlide(page)).not.toBe(0);
  await compass.click();
  await expect(compass).toHaveAttribute('data-bearing', '0', { timeout: 60_000 });
  await framesRendered(page, 4);
  await expect(compass).toHaveAttribute('data-bearing', '0');
});

test('a right-drag already turning when a flight starts takes the camera back from it', async ({ page }) => {
  const seen: string[] = [];
  page.on('console', (m) => seen.push(m.text()));
  await page.goto('./?debug&year=1282');
  await ready(page);
  const compass = page.locator('.compass');
  const box = await page.locator('#scene').boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.3);
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.3, { steps: 4 });
  await expect.poll(() => seen.some((t) => t.includes('dewidebug camera drag start kind=turn'))).toBe(true);
  // A flight starts under the held drag, as stepping to a key date does (the compass is the nearest button).
  await compass.evaluate((el) => {
    if (el instanceof HTMLElement) el.click();
  });
  await expect.poll(() => seen.some((t) => t.includes('dewidebug camera turn from'))).toBe(true);
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.3, { steps: 4 });
  await page.mouse.up({ button: 'right' });
  await expect
    .poll(() => seen.some((t) => t.includes('dewidebug camera flight interrupted by=turn')), {
      message: 'the held drag interrupted the flight',
    })
    .toBe(true);
  await cameraSettled(page);
  expect(await compass.getAttribute('data-bearing'), 'the flight to north did not finish').not.toBe('0');
});

const turnGlide = (page: Page): Promise<number> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const cam: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    if (!cam || typeof cam !== 'object') throw new Error('no camera');
    return Number(Reflect.get(cam, 'inertialAlphaOffset'));
  });

interface CameraState {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly alpha: number;
  readonly beta: number;
  readonly radius: number;
  /** The scene's frame id, read in the same evaluate as the pose, so the two belong together. */
  readonly frame: number;
}

const cameraState = (page: Page): Promise<CameraState> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const cam: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    if (!cam || typeof cam !== 'object') throw new Error('no camera');
    const t: unknown = Reflect.get(cam, 'target');
    const n = (o: unknown, k: string): number =>
      Number(o && typeof o === 'object' ? Reflect.get(o, k) : Number.NaN);
    const frameOf = (sc: unknown): number => {
      const fn: unknown = sc && typeof sc === 'object' ? Reflect.get(sc, 'getFrameId') : undefined;
      return typeof fn === 'function' ? Number(fn.call(sc)) : Number.NaN;
    };
    return {
      x: n(t, 'x'),
      y: n(t, 'y'),
      z: n(t, 'z'),
      alpha: n(cam, 'alpha'),
      beta: n(cam, 'beta'),
      radius: n(cam, 'radius'),
      frame: frameOf(scene),
    };
  });

const moved = (a: CameraState, b: CameraState): number => Math.hypot(b.x - a.x, b.z - a.z);

// A screenshot of a panel that is still rising shows it half transparent.
const settled = (panel: Locator): Promise<unknown> =>
  panel.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));

/** The point of the terrain (the coarse mesh or a LiDAR detail tile, not a tree or a building) under a screen point. */
const terrainAt = (page: Page, x: number, y: number): Promise<{ x: number; z: number }> =>
  page.evaluate(
    ([px, py]) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
      const pick: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'pick') : undefined;
      if (typeof pick !== 'function') throw new Error('no scene.pick');
      const isTerrain = (m: unknown): boolean => {
        const name: unknown = m && typeof m === 'object' ? Reflect.get(m, 'name') : undefined;
        return name === 'terrain' || (typeof name === 'string' && name.startsWith('detail-'));
      };
      const info: unknown = Reflect.apply(pick, scene, [px, py, isTerrain]);
      const p: unknown = info && typeof info === 'object' ? Reflect.get(info, 'pickedPoint') : undefined;
      if (!p || typeof p !== 'object') throw new Error(`no terrain under ${String(px)},${String(py)}`);
      return { x: Number(Reflect.get(p, 'x')), z: Number(Reflect.get(p, 'z')) };
    },
    [x, y],
  );

test('a click outside the welcome closes it without moving the land, then a left-drag slides the land', async ({
  page,
}) => {
  await page.goto('./?debug&year=1282&welcome=1');
  await ready(page);
  const welcome = page.getByRole('dialog', { name: 'How to explore' });
  await expect(welcome).toBeVisible();
  await expect(welcome).toContainText('Drag to slide the land, as on a map.');
  const before = await cameraState(page);
  // The wash around the panel takes the click, so the click that closes it never reaches the 3D view.
  await page.mouse.click(60, 600);
  await expect(welcome).toBeHidden();
  expect(moved(before, await cameraState(page))).toBe(0);
  const [ax, ay, bx, by] = [900, 520, 620, 380];
  const grabbed = await terrainAt(page, ax, ay);
  await page.mouse.move(ax, ay);
  await page.mouse.down();
  await page.mouse.move(bx, by, { steps: 8 });
  // Still held: the ground point grabbed is now under the cursor, as on a map.
  const under = await terrainAt(page, bx, by);
  expect(Math.hypot(under.x - grabbed.x, under.z - grabbed.z)).toBeLessThan(6);
  await page.mouse.up();
  const after = await cameraState(page);
  expect(moved(before, after)).toBeGreaterThan(50);
  expect(after.alpha).toBeCloseTo(before.alpha, 5);
  expect(after.beta).toBeCloseTo(before.beta, 5);
});

test('a right-drag turns the view about the same spot', async ({ page }) => {
  await page.goto('./?debug&year=1282');
  await ready(page);
  const before = await cameraState(page);
  await page.mouse.move(700, 400);
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(900, 340, { steps: 8 });
  await page.mouse.up({ button: 'right' });
  await expect
    .poll(async () => Math.abs((await cameraState(page)).alpha - before.alpha))
    .toBeGreaterThan(0.1);
  expect(moved(before, await cameraState(page))).toBeLessThan(1);
});

test('WASD slides the camera, and Q turns it, once the 3D view has focus', async ({ page }) => {
  await page.goto('./?debug&year=1282');
  await ready(page);
  await page.mouse.click(1100, 150);
  await expect(page.locator('#scene')).toBeFocused();
  const before = await cameraState(page);
  await page.keyboard.down('w');
  await page.waitForTimeout(1500);
  await page.keyboard.up('w');
  await expect.poll(async () => moved(before, await cameraState(page))).toBeGreaterThan(5);
  const mid = await cameraState(page);
  // Forward is the way the camera faces, from the eye towards the target.
  const facing = { x: -Math.cos(before.alpha), z: -Math.sin(before.alpha) };
  expect((mid.x - before.x) * facing.x + (mid.z - before.z) * facing.z).toBeGreaterThan(0);
  await page.keyboard.press('q');
  await expect.poll(async () => (await cameraState(page)).alpha).toBeGreaterThan(mid.alpha);
});

test('the wheel zooms towards the point under the cursor', async ({ page }) => {
  await page.goto('./?debug&year=1282');
  await ready(page);
  const before = await cameraState(page);
  const [x, y] = [1050, 560];
  const spot = await terrainAt(page, x, y);
  await page.mouse.move(x, y);
  for (let i = 0; i < 4; i++) await page.mouse.wheel(0, -100);
  await expect.poll(async () => (await cameraState(page)).radius).toBeLessThan(before.radius * 0.6);
  const after = await cameraState(page);
  const gap = (s: CameraState): number => Math.hypot(spot.x - s.x, spot.z - s.z);
  expect(gap(after)).toBeLessThan(gap(before) * 0.8);
});

/** Whether the terrain is under a screen point (false over the sky). */
const terrainUnder = (page: Page, x: number, y: number): Promise<boolean> =>
  terrainAt(page, x, y).then(
    () => true,
    () => false,
  );

const setCamera = async (page: Page, pose: { beta: number; radius: number }): Promise<void> => {
  await page.evaluate((p) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const cam: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    if (!cam || typeof cam !== 'object') throw new Error('no camera');
    Reflect.set(cam, 'beta', p.beta);
    Reflect.set(cam, 'radius', p.radius);
  }, pose);
  await expect
    .poll(async () => {
      const s = await cameraState(page);
      return Math.abs(s.beta - pose.beta) + Math.abs(s.radius - pose.radius);
    })
    .toBeLessThan(0.01);
};

test('pointing at the sky neither throws the camera across the map nor slides it', async ({ page }) => {
  await page.goto('./?debug&year=1282');
  await ready(page);
  // Tilted as far as the limit allows, the top of the view is sky.
  await setCamera(page, { beta: 1.38, radius: 600 });
  const [x, y] = [720, 40];
  expect(await terrainUnder(page, x, y)).toBe(false);
  const before = await cameraState(page);
  await page.mouse.move(x, y);
  await page.mouse.wheel(0, -100);
  await expect.poll(async () => (await cameraState(page)).radius).toBeLessThan(before.radius * 0.9);
  await page.waitForTimeout(500);
  const zoomed = await cameraState(page);
  // One notch in at the centre moves the target nowhere; at the sky it once moved it about 1,500.
  expect(moved(before, zoomed)).toBeLessThan(30);
  // A drag that starts on the sky has no land to hold, so it turns the view instead of sliding it.
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 200, y + 10, { steps: 8 });
  await page.mouse.up();
  await expect
    .poll(async () => Math.abs((await cameraState(page)).alpha - zoomed.alpha))
    .toBeGreaterThan(0.1);
  expect(moved(zoomed, await cameraState(page))).toBeLessThan(30);
});

test('a double-click on the land flies the camera there', async ({ page }) => {
  const flights: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug camera fly to')) flights.push(m.text());
  });
  await page.goto('./?debug&year=1282');
  await ready(page);
  const [x, y] = [520, 600];
  const spot = await terrainAt(page, x, y);
  await page.mouse.dblclick(x, y);
  await expect.poll(() => flights.length).toBe(1);
  await expect
    .poll(
      async () => {
        const s = await cameraState(page);
        return Math.hypot(spot.x - s.x, spot.z - s.z);
      },
      { timeout: 60_000 },
    )
    .toBeLessThan(5);
  await expect(page.getByRole('button', { name: 'Whole valley' })).toBeVisible();
  // A drag while a flight is under way takes the camera back: the flight stops where it is.
  const interrupted: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug camera flight interrupted by=pan')) interrupted.push(m.text());
  });
  const [fx, fy] = [1000, 300];
  await page.mouse.dblclick(fx, fy);
  await expect.poll(() => flights.length).toBe(2);
  await page.mouse.move(700, 600);
  await page.mouse.down();
  await page.mouse.move(760, 560, { steps: 4 });
  await page.mouse.up();
  await expect.poll(() => interrupted.length).toBe(1);
});

/** Lock the camera on the train, then tap it, as a viewer would. */
const tapTrain = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    if (!debug || typeof debug !== 'object') throw new Error('no debug hook');
    const scene: unknown = Reflect.get(debug, 'scene');
    const meshes: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'meshes') : undefined;
    const camera: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    const train: unknown = Array.isArray(meshes)
      ? meshes.find(
          (m: unknown) =>
            m && typeof m === 'object' && String(Reflect.get(m, 'name')).includes('llanelly-train'),
        )
      : undefined;
    if (!train || !camera || typeof camera !== 'object') throw new Error('no train or camera');
    Reflect.set(camera, 'lockedTarget', train);
    Reflect.set(camera, 'radius', 30);
  });
  await page.waitForTimeout(3000);
  const box = await page.locator('#scene').boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page.locator('.follow-chip')).toBeVisible({ timeout: 30_000 });
  await page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const camera: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    if (camera && typeof camera === 'object') Reflect.set(camera, 'lockedTarget', null);
  });
};

test('tapping the train makes the camera follow it until you stop', async ({ page }) => {
  await page.goto('./?debug&year=1860');
  await ready(page);
  await tapTrain(page);
  const chip = page.locator('.follow-chip');
  await expect(chip).toContainText('A Llanelly Railway train');
  const first = await cameraTarget(page);
  await expect
    .poll(
      async () => {
        const later = await cameraTarget(page);
        return Math.hypot(later.x - first.x, later.z - first.z);
      },
      { timeout: 60_000 },
    )
    .toBeGreaterThan(5);
  await chip.getByRole('button', { name: 'Stop' }).click();
  await expect(chip).toBeHidden();
  // Turning the view keeps the follow; sliding away ends it.
  await tapTrain(page);
  const [dx, dy] = [900, 560];
  const under = await page.evaluate((p) => document.elementFromPoint(p.x, p.y)?.id, { x: dx, y: dy });
  expect(under, 'the drag must start on the 3D view, not a panel over it').toBe('scene');
  await page.mouse.move(dx, dy);
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(dx + 120, dy - 20, { steps: 6 });
  await page.mouse.up({ button: 'right' });
  await page.waitForTimeout(500);
  await expect(chip).toBeVisible();
  await page.mouse.move(dx, dy);
  await page.mouse.down();
  await page.mouse.move(dx + 120, dy - 40, { steps: 6 });
  await page.mouse.up();
  await expect(chip).toBeHidden();
});

test.describe('off a desktop', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('a banner says it is best on a desktop, and stays gone once closed', async ({ page }) => {
    await page.goto('./?year=1282');
    const banner = page.locator('.desktop-banner');
    await expect(banner).toContainText('best viewed on a desktop');
    await banner.getByRole('button', { name: 'Close' }).click();
    await expect(banner).toHaveCount(0);
    await page.reload();
    await ready(page);
    await expect(page.locator('.desktop-banner')).toHaveCount(0);
  });
});

test('no desktop banner on a desktop', async ({ page }) => {
  await page.goto('./?year=1282');
  await ready(page);
  await expect(page.locator('.desktop-banner')).toHaveCount(0);
});

test('time of day and season controls relight the valley, in both languages', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?year=1282&hour=12&season=summer&debug');
  await ready(page);
  const readout = page.locator('.sky-readout');
  await expect(readout).toHaveText('Midday 12:00');
  await expect(page.locator('.debug')).toContainText('sky summer 12.00h');
  const hour = page.getByRole('slider', { name: 'Time of day' });
  await hour.focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  await expect(readout).toHaveText('Afternoon 13:00');
  await hour.fill('22.5');
  await expect(readout).toHaveText('Night 22:30');
  await expect(hour).toHaveAttribute('aria-valuetext', 'Night, 22:30');
  await expect(page.locator('.debug')).toContainText(/sky summer 22\.50h .* moon/);
  const winter = page.getByRole('button', { name: 'Winter' });
  await winter.click();
  await expect(winter).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Summer' })).toHaveAttribute('aria-pressed', 'false');
  await hour.fill('16.5');
  await expect(readout).toHaveText('Dusk 16:30');
  await hour.fill('17');
  await expect(readout).toHaveText('Night 17:00');
  await expect(page.locator('.debug')).toContainText('sky winter 17.00h');
  await page.screenshot({ path: 'test-results/sky-winter-night.png' });
  await page.getByRole('button', { name: 'Cymraeg' }).click();
  await expect(page.getByRole('button', { name: 'Gaeaf' })).toHaveAttribute('aria-pressed', 'true');
  await expect(readout).toHaveText('Nos 17:00');
  await expect(page.getByRole('slider', { name: 'Adeg o’r dydd' })).toBeVisible();
  expect(errors).toEqual([]);
});

const meshState = async (page: Page, name: string): Promise<{ visible: boolean; count: number }> =>
  page.evaluate((n) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const meshes: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'meshes') : undefined;
    const mesh: unknown = Array.isArray(meshes)
      ? meshes.find((m: unknown) => m && typeof m === 'object' && Reflect.get(m, 'name') === n)
      : undefined;
    if (!mesh || typeof mesh !== 'object') throw new Error(`no mesh ${n}`);
    return {
      visible: Reflect.get(mesh, 'isVisible') === true,
      count: Number(Reflect.get(mesh, 'thinInstanceCount')),
    };
  }, name);

// Mean luminance (0..1) of a part of the page, and the share of its pixels that are warm and lit (a
// lamp or window glow, not a white star or label), read back from a screenshot of it.
const pixels = async (
  page: Page,
  clip: { x: number; y: number; width: number; height: number },
): Promise<{ luminance: number; warm: number }> => {
  const png = (await page.screenshot({ clip })).toString('base64');
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('no 2d context');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let sum = 0;
    let warm = 0;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i] ?? 0;
      const g = d[i + 1] ?? 0;
      const b = d[i + 2] ?? 0;
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (r >= 90 && r > b * 1.4) warm++;
    }
    const n = d.length / 4;
    return { luminance: sum / n / 255, warm: warm / n };
  }, png);
};
const luminance = async (
  page: Page,
  clip: { x: number; y: number; width: number; height: number },
): Promise<number> => (await pixels(page, clip)).luminance;

// Shows or hides every halo mesh, then waits for a few frames so a screenshot shows the change.
const setHalos = async (page: Page, enabled: boolean): Promise<number> =>
  page.evaluate(async (on) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    if (!scene || typeof scene !== 'object') throw new Error('no scene');
    const meshes: unknown = Reflect.get(scene, 'meshes');
    let changed = 0;
    if (Array.isArray(meshes))
      for (const m of meshes) {
        if (!m || typeof m !== 'object') continue;
        const name: unknown = Reflect.get(m, 'name');
        const setEnabled: unknown = Reflect.get(m, 'setEnabled');
        if (typeof name === 'string' && name.startsWith('halos-') && typeof setEnabled === 'function') {
          Reflect.apply(setEnabled, m, [on]);
          changed++;
        }
      }
    const after: unknown = Reflect.get(scene, 'onAfterRenderObservable');
    const add: unknown = after && typeof after === 'object' ? Reflect.get(after, 'add') : undefined;
    const remove: unknown = after && typeof after === 'object' ? Reflect.get(after, 'remove') : undefined;
    if (typeof add !== 'function' || typeof remove !== 'function') throw new Error('no render observable');
    await new Promise<void>((resolve) => {
      let frames = 0;
      const observer: unknown = Reflect.apply(add, after, [
        () => {
          frames++;
          if (frames >= 3) {
            Reflect.apply(remove, after, [observer]);
            resolve();
          }
        },
      ]);
    });
    return changed;
  }, enabled);

// Open countryside above the town at ?place=llandeilo, clear of the panels and the speech bubbles.
const COUNTRYSIDE = { x: 420, y: 20, width: 660, height: 300 };

test('the night is dark and lit by the light of its time: gas lamps glow in 1880, the 1942 blackout is black', async ({
  page,
}) => {
  test.slow(
    Boolean(process.env['CI']),
    'two night scenes with thousands of halos, rendered on the CPU in CI',
  );
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const debug = page.locator('.debug');
  await page.goto('./?year=1880&hour=21&season=winter&place=llandeilo&debug');
  await ready(page);
  await expect(debug).toContainText(
    'light homes oil-lamp street gas in town-north-of-tywi by 1876.00 [documented]',
  );
  await expect(debug).toContainText('street warmth 0.85');
  await expect(debug).toContainText(/\(windows 0\.[1-9]\d hearth \d\.\d\d street 0\.[1-9]\d\)/);
  await expect.poll(async () => (await meshState(page, 'street-lamps')).visible).toBe(true);
  expect((await meshState(page, 'street-lamps')).count).toBeGreaterThan(10);
  expect((await meshState(page, 'building-windows')).count).toBeGreaterThan(0);
  await expect(page.locator('.loader')).toHaveCount(0);
  const night = await luminance(page, COUNTRYSIDE);
  console.info(`dewidebug e2e night luminance 1880 21:00 = ${night.toFixed(3)}`);
  expect(night).toBeLessThan(0.12);
  // Halos that face the camera and stay a few pixels wide, so the lamps read from the overview too.
  expect(await meshState(page, 'halos-street')).toEqual({
    visible: true,
    count: (await meshState(page, 'street-lamps')).count,
  });
  expect((await meshState(page, 'halos-window')).visible).toBe(true);
  expect((await meshState(page, 'halos-window')).count).toBeGreaterThan(10);
  await page.getByRole('button', { name: 'Almanac' }).click();
  const light = page.locator('.info .info-list li', { hasText: 'Light after dark' });
  await expect(light).toContainText('By 1876 gas lamps');
  await expect(light.locator('.prov')).toBeVisible();
  await expect(page.locator('.loader')).toHaveCount(0);
  await page.screenshot({ path: 'test-results/light-1880-night.png' });
  await page.goto('./?year=1942&hour=21&season=winter&place=llandeilo&debug');
  await ready(page);
  await expect(debug).toContainText('light homes blacked-out street off on 1939.67 [documented]');
  await expect(debug).not.toContainText('street warmth');
  await expect(debug).toContainText('(windows 0.00 hearth 0.00 street 0.00)');
  await expect.poll(async () => (await meshState(page, 'street-lamps')).visible).toBe(false);
  expect((await meshState(page, 'building-windows')).count).toBe(0);
  for (const kind of ['window', 'street', 'hearth'])
    expect((await meshState(page, `halos-${kind}`)).visible).toBe(false);
  await expect(page.locator('.loader')).toHaveCount(0);
  await page.screenshot({ path: 'test-results/light-1942-blackout.png' });
  expect(errors).toEqual([]);
});

// The diorama at the overview, clear of the side panel and the timeline.
const OVERVIEW_LAND = { x: 330, y: 230, width: 760, height: 420 };

test('the night light reads from the overview: the halos put the lit town and farms on screen', async ({
  page,
}) => {
  // About 5,400 halos over the whole valley; on CI's CPU renderer this ran 7 minutes on 2026-10-09.
  test.slow(
    Boolean(process.env['CI']),
    'the whole valley at night with every halo, rendered on the CPU in CI',
  );
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?year=1880&hour=23&season=winter&debug');
  await ready(page);
  await expect(page.locator('.loader')).toHaveCount(0);
  await expect.poll(async () => (await meshState(page, 'halos-window')).visible).toBe(true);
  expect(await setHalos(page, true)).toBe(3);
  const on = await pixels(page, OVERVIEW_LAND);
  await page.screenshot({ path: 'test-results/halos-1880-overview-on.png' });
  await setHalos(page, false);
  const off = await pixels(page, OVERVIEW_LAND);
  await page.screenshot({ path: 'test-results/halos-1880-overview-off.png' });
  await setHalos(page, true);
  console.info(
    `dewidebug e2e overview 1880 23:00 warm on=${on.warm.toFixed(4)} off=${off.warm.toFixed(4)} luminance on=${on.luminance.toFixed(3)} off=${off.luminance.toFixed(3)}`,
  );
  // Without halos the windows are under a pixel from here, so nearly all the warm light is theirs.
  expect(on.warm).toBeGreaterThan(0.004);
  expect(on.warm).toBeGreaterThan(off.warm * 3);
  // Soft round glows measured 0.026 here; a halo drawn as a flat square measured 0.15.
  expect(on.warm).toBeLessThan(0.08);
  expect(errors).toEqual([]);
});

test('the day passes on its own when asked, and stops when the slider is moved', async ({ page }) => {
  await page.goto('./?year=1880&hour=10');
  await ready(page);
  const play = page.getByRole('button', { name: 'Let the day pass' });
  await play.click();
  await expect(play).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sky-readout')).not.toHaveText('Morning 10:00');
  await page.getByRole('slider', { name: 'Time of day' }).fill('6');
  await expect(play).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.sky-readout')).toHaveText('Morning 06:00');
});

test('the timeline year labels never overlap, at any desktop width, in either language', async ({ page }) => {
  await page.goto('./');
  await ready(page);
  const overlaps = async (): Promise<string[]> =>
    page.$$eval('.tl-tick', (els) => {
      const boxes = els
        .map((e) => ({ text: e.textContent, box: e.getBoundingClientRect() }))
        .filter(({ box }) => box.width > 0);
      const bad: string[] = [];
      for (let i = 1; i < boxes.length; i++) {
        const a = boxes[i - 1];
        const b = boxes[i];
        if (a && b && b.box.left < a.box.right + 4) bad.push(`${a.text} / ${b.text}`);
      }
      return bad;
    });
  for (const lang of ['English', 'Cymraeg']) {
    await page.getByRole('button', { name: lang, exact: true }).click();
    await expect(page.locator('.tl-tick').first()).toContainText(lang === 'English' ? 'BC' : 'CC');
    for (const width of [1024, 1280, 1920]) {
      await page.setViewportSize({ width, height: 860 });
      expect(await overlaps(), `${lang} at ${String(width)}px`).toEqual([]);
    }
  }
});

test('place labels never sit under the panels, the compass or the timeline', async ({ page }) => {
  await page.goto('./?year=1880&place=llandeilo');
  await ready(page);
  await expect(page.locator('.label').filter({ visible: true }).first()).toBeVisible();
  const covered = async (): Promise<(string | null)[]> =>
    page.evaluate(() => {
      const panels = [
        ...document.querySelectorAll<HTMLElement>(
          '.brand, .timeline, .compass, .help-button, .moment, .welcome, .info, .convo, .follow-chip, .debug',
        ),
      ]
        .filter((el) => !el.hidden)
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0);
      return [...document.querySelectorAll<HTMLElement>('.label')]
        .filter((el) => el.style.display !== 'none')
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return panels.some(
            (p) => r.left < p.right && r.right > p.left && r.top < p.bottom && r.bottom > p.top,
          );
        })
        .map((el) => el.textContent);
    });
  expect(await covered()).toEqual([]);
  await page.locator('body').press('?');
  await expect(page.getByRole('dialog', { name: 'How to explore' })).toBeVisible();
  await expect.poll(covered).toEqual([]);
});

test('photo pins, on by default, never sit under the panels, the timeline, the compass or a label', async ({
  page,
}) => {
  const covered = async (): Promise<string[]> =>
    page.evaluate(() => {
      const box = (el: Element): DOMRect => el.getBoundingClientRect();
      const others = [
        ...document.querySelectorAll<HTMLElement>(
          '.brand, .timeline, .compass, .help-button, .moment, .welcome, .info, .convo, .follow-chip, .photo, .guess, .label',
        ),
      ].filter((el) => !el.hidden && el.style.display !== 'none' && box(el).width > 0);
      const pins = [...document.querySelectorAll<HTMLElement>('.pin')].filter(
        (el) => el.style.display !== 'none',
      );
      const out: string[] = [];
      for (const pin of pins) {
        const a = box(pin);
        for (const o of others) {
          const b = box(o);
          if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)
            out.push(`${pin.dataset['photo'] ?? '?'} under ${o.className} ${o.textContent.slice(0, 20)}`);
        }
      }
      return out;
    });
  for (const url of [
    './?year=1900',
    './?year=1900&place=llandeilo&radius=140',
    './?year=1925&place=llandeilo&radius=400',
    './?year=1950&place=llandeilo&radius=140',
  ]) {
    await page.goto(url);
    await ready(page);
    // In the overview the one pin that fits sits under Llandeilo's label, which wins, so none need show.
    if (url.includes('place='))
      await expect(page.locator('.pin').filter({ visible: true }).first()).toBeVisible();
    // Pins re-lay themselves out on a rendered frame, which at CI's ~1fps can take a second or more.
    await expect.poll(covered, { message: url, timeout: 20_000 }).toEqual([]);
    await page.locator('body').press('?');
    await expect(page.getByRole('dialog', { name: 'How to explore' })).toBeVisible();
    await expect.poll(covered, { message: `${url} with the welcome open`, timeout: 20_000 }).toEqual([]);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Almanac' }).click();
    await expect(page.locator('.info')).toBeVisible();
    await settled(page.locator('.info'));
    await expect.poll(covered, { message: `${url} with the almanac open`, timeout: 20_000 }).toEqual([]);
  }
});

test('every fifth year the photographs are pinned (1895 to 1955) shows a pin at some standard view, and 1960 shows none', async ({
  page,
}) => {
  const views = ['&place=llandeilo&radius=140', '&place=llandeilo&radius=400', ''];
  const years = [1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1955, 1960];
  const pins = page.locator('.pin').filter({ visible: true });
  // One page load per view: the year is dragged along the timeline inside the page, which is how a
  // visitor moves it, with the mouse held down so that letting go never snaps to a key date.
  const shownAt = new Map<number, number>();
  for (const view of views) {
    const todo = years.filter((y) => !shownAt.has(y) || y === 1960);
    const first = todo[0];
    if (first === undefined) break;
    await page.goto(`./?year=${String(first)}${view}`);
    await ready(page);
    const box = await page.locator('.tl-track').boundingBox();
    if (!box) throw new Error('The timeline has no box');
    const at = (y: number): number => box.x + tAt(TIMELINE, year(y)) * box.width;
    const mid = box.y + box.height / 2;
    // Start the drag on a bit of track no key-date marker covers: a marker takes the press for itself.
    const bare = await page.evaluate(
      (from) => {
        for (let dx = 0; dx < 200; dx += 3)
          for (const x of [from.x + dx, from.x - dx]) {
            const el = document.elementFromPoint(x, from.y);
            if (el?.closest('.tl-track') && !el.closest('.tl-marker')) return x;
          }
        return undefined;
      },
      { x: at(first), y: mid },
    );
    if (bare === undefined) throw new Error('No bare track to start the drag on');
    await page.mouse.move(bare, mid);
    await page.mouse.down();
    for (const y of todo) {
      // A real mouse reports x as a 32-bit float, which lands a year short of a whole year about half the
      // time, and a photograph's window ends on a whole year; so the held drag is carried by a pointermove
      // at the exact x of the year, and the next rendered frame is waited for in the same breath.
      await page.evaluate((x) => {
        const track = document.querySelector('.tl-track');
        if (!track) throw new Error('no timeline');
        track.dispatchEvent(new PointerEvent('pointermove', { clientX: x, bubbles: true }));
      }, at(y));
      await expect(page.locator('.tl-year'), `${String(y)}${view}`).toHaveText(String(y));
      // The pin layer stamps the year it last laid out, so the count below is for exactly this year.
      await expect(page.locator('.pins'), `${String(y)}${view} laid out`).toHaveAttribute(
        'data-year',
        String(y),
      );
      const n = await pins.count();
      console.info(`dewidebug e2e pins year=${String(y)} view="${view}" visible=${String(n)}`);
      if (n > 0) shownAt.set(y, n);
    }
    await page.mouse.up();
  }
  const missing = years.filter((y) => y !== 1960 && !shownAt.has(y));
  expect(missing).toEqual([]);
  // Known gap: 2281931 is the only photograph pinned in 1956 to 1960 and it sits under the Llandeilo label
  // at every standard view (labels win), so those years show no pin until the camera moves.
  expect(shownAt.get(1960) ?? 0).toBe(0);
});

test('with the pins on by default the Llandeilo label still shows, in the overview and in the town', async ({
  page,
}) => {
  for (const url of [
    './?year=1900',
    './?year=1925&place=llandeilo&radius=400',
    './?year=1950&place=llandeilo&radius=140',
  ]) {
    await page.goto(url);
    await ready(page);
    if (url.includes('place='))
      await expect(page.locator('.pin').filter({ visible: true }).first(), url).toBeVisible();
    await expect(
      page
        .locator('.label')
        .filter({ hasText: /^Llandeilo/ })
        .filter({ visible: true }),
      url,
    ).toHaveCount(1);
  }
});

test('the ? icon and its caption never sit over the right-hand panels, in either language', async ({
  page,
}) => {
  const clash = async (panel: string, target: Locator = page.locator(panel)): Promise<string> => {
    const [icon, box] = [await page.locator('.help-button').boundingBox(), await target.boundingBox()];
    if (!icon || !box) return `${panel}: no box`;
    const overlaps =
      icon.x < box.x + box.width &&
      icon.x + icon.width > box.x &&
      icon.y < box.y + box.height &&
      icon.y + icon.height > box.y;
    console.info(
      `dewidebug e2e help icon ${panel} icon.bottom=${String(Math.round(icon.y + icon.height))} panel.top=${String(Math.round(box.y))}`,
    );
    return overlaps ? `${panel} overlaps the help icon` : '';
  };
  await page.setViewportSize({ width: 1440, height: 860 });
  for (const [lang, game] of [
    ['en', 'When are we?'],
    ['cy', 'Pryd ydyn ni?'],
  ] as const) {
    await page.goto(`./?year=1282&place=llandeilo&radius=200&lang=${lang}`);
    await ready(page);
    await page.locator('.bubble').filter({ visible: true }).click();
    await expect(page.locator('.convo')).toBeVisible();
    expect(await clash('.convo'), lang).toBe('');
    await page.getByRole('button', { name: 'Almanac' }).click();
    await expect(page.locator('.info')).toBeVisible();
    expect(await clash('.info'), lang).toBe('');
    await page.screenshot({ path: `test-results/help-icon-about-${lang}.png` });
    await page.getByRole('button', { name: game }).click();
    await expect(page.locator('.guess')).toBeVisible();
    expect(await clash('.guess'), lang).toBe('');
    await page.goto(`./?year=1900&place=llandeilo&radius=140&photos=1&lang=${lang}`);
    await ready(page);
    const photos = page.getByRole('button', { name: lang === 'en' ? 'Photos' : 'Lluniau', exact: true });
    await expect(photos).toHaveAttribute('aria-pressed', 'true');
    expect(await clash('Photos', photos), lang).toBe('');
    await page.locator('.pin').filter({ visible: true }).first().click();
    await expect(page.locator('.photo')).toBeVisible();
    await settled(page.locator('.photo'));
    expect(await clash('.photo'), lang).toBe('');
    await page.screenshot({ path: `test-results/help-icon-photo-${lang}.png` });
  }
});

test('? or the Keys button open the welcome at its controls, and Escape or ✕ closes it, in both languages', async ({
  page,
}) => {
  await page.goto('./');
  await ready(page);
  const dialog = page.getByRole('dialog', { name: 'How to explore' });
  // Automated browsers are not shown it at start (?welcome=1 asks for it).
  await expect(dialog).toBeHidden();
  await page.locator('body').press('?');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Moving around the valley' })).toBeFocused();
  await expect(dialog).toContainText('PageUp');
  await expect(dialog).toContainText('Slide across the land');
  await expect(dialog).toContainText('Right-drag (or Ctrl+drag) to turn and tilt.');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await page.getByRole('button', { name: 'Bysellau', exact: true }).click();
  const cy = page.getByRole('dialog', { name: 'Sut i grwydro' });
  await expect(cy).toBeVisible();
  await expect(cy.getByRole('heading', { name: 'Symud o gwmpas y dyffryn' })).toBeFocused();
  await expect(cy).toContainText('Llithro ar draws y tir');
  await cy.getByRole('button', { name: 'Cau' }).click();
  await expect(cy).toBeHidden();
  await expect(page.getByRole('button', { name: 'Bysellau', exact: true })).toBeFocused();
  const before = await page.locator('.tl-counter').textContent();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.tl-counter')).not.toHaveText(before ?? '');
});

test('the welcome opens after Begin, reopens from its icon, explains the labels, and can be turned off', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?begin=1&welcome=1');
  await ready(page);
  const card = page.getByRole('dialog', { name: 'Llandeilo' });
  const welcome = page.getByRole('dialog', { name: 'How to explore' });
  await expect(card).toBeVisible();
  await expect(welcome).toBeHidden();
  await card.getByRole('button', { name: 'Begin' }).click();
  await expect(welcome).toBeVisible();
  await expect(welcome.getByRole('heading', { name: 'How to explore' })).toBeFocused();
  for (const text of [
    'Drag to slide the land, as on a map.',
    'Previous and Next',
    'key dates',
    'ⓘ',
    'When are we?',
    'Graphics',
    'Sound',
  ])
    await expect(welcome).toContainText(text);
  await expect(welcome).toContainText('English and Cymraeg switch the whole app.');
  await expect(welcome).toContainText('Photos pins old photographs where each was taken');
  await expect(welcome).toContainText('It is on to begin with: press Photos to switch it off');
  expect(await welcome.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
  for (const kind of ['documented', 'reconstructed', 'imagined'])
    await expect(welcome.locator(`.prov-${kind}`)).toBeVisible();
  // Like the Begin card, it keeps focus and clicks off the app behind it while it is open.
  const appInert = (): Promise<boolean> =>
    page.evaluate(() => document.getElementById('app')?.inert === true);
  expect(await appInert()).toBe(true);
  await expect(card).toBeHidden();
  await settled(welcome);
  await page.screenshot({ path: 'test-results/welcome-en.png' });
  await welcome.getByRole('button', { name: 'Close' }).click();
  await expect(welcome).toBeHidden();
  expect(await appInert()).toBe(false);

  const icon = page.getByRole('button', { name: 'How to explore' });
  await expect(icon).toHaveAttribute('title', 'How to explore: the controls, and what the labels mean');
  await icon.click();
  await expect(welcome).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(welcome).toBeHidden();
  await expect(icon).toBeFocused();

  await icon.click();
  await welcome.getByRole('button', { name: 'Cymraeg' }).click();
  const cy = page.getByRole('dialog', { name: 'Sut i grwydro' });
  await expect(cy).toContainText('Llusgwch i symud y tir, fel ar fap.');
  await expect(cy).toContainText('Mae Lluniau yn pinio hen ffotograffau lle tynnwyd pob un');
  await expect(cy).toContainText('Mae ymlaen i ddechrau: pwyswch Lluniau i’w ddiffodd');
  await expect(cy.locator('.prov-imagined')).toContainText('Dychmygol');
  await expect(cy.getByRole('checkbox', { name: 'Dangos hwn wrth ddechrau' })).toBeChecked();
  await expect(page.getByRole('button', { name: 'Sut i grwydro' })).toHaveAttribute(
    'title',
    'Sut i grwydro: y rheolyddion, a beth mae’r labeli’n ei olygu',
  );
  await settled(cy);
  await page.screenshot({ path: 'test-results/welcome-cy.png' });
  await cy.getByRole('button', { name: 'English' }).click();

  await welcome.getByRole('button', { name: 'About this project' }).click();
  await expect(welcome).toBeHidden();
  await expect(page.locator('.info')).toContainText('Credits and licences');

  await icon.click();
  const atStart = welcome.getByRole('checkbox', { name: 'Show this at start' });
  await expect(atStart).toBeChecked();
  await atStart.uncheck();
  await page.reload();
  await ready(page);
  await card.getByRole('button', { name: 'Begin' }).click();
  await expect(card).toBeHidden();
  await expect(welcome).toBeHidden();
  await page.getByRole('button', { name: 'How to explore' }).click();
  await expect(welcome.getByRole('checkbox', { name: 'Show this at start' })).not.toBeChecked();
  expect(errors).toEqual([]);
});

test('place labels never overlap one another on the overview', async ({ page }) => {
  await page.goto('./?year=74');
  await ready(page);
  await expect(page.locator('.label').filter({ visible: true }).first()).toBeVisible();
  const clashes = async (): Promise<string[]> =>
    page.evaluate(() => {
      const shown = [...document.querySelectorAll<HTMLElement>('.label')]
        .filter((el) => el.style.display !== 'none')
        .map((el) => ({ text: el.textContent, r: el.getBoundingClientRect() }));
      const out: string[] = [];
      shown.forEach((a, i) => {
        for (const b of shown.slice(i + 1)) {
          if (a.r.left < b.r.right && a.r.right > b.r.left && a.r.top < b.r.bottom && a.r.bottom > b.r.top)
            out.push(`${a.text} / ${b.text}`);
        }
      });
      return out;
    });
  await expect.poll(clashes).toEqual([]);
  // At a key date the label of the moment's own place wins any clash.
  await page.goto('./?year=1172');
  await ready(page);
  await expect(page.locator('.moment-place')).toHaveText('Dinefwr');
  await expect(page.locator('.label', { hasText: /^Dinefwr/ })).toBeVisible();
  await expect.poll(clashes).toEqual([]);
});

test('a key date whose season and hour a source records sets the sky to match, until you change it', async ({
  page,
}) => {
  await page.goto('./?year=1850&hour=17&season=summer');
  await ready(page);
  await page.locator('.tl-marker[aria-label^="1857"]').first().click();
  await expect(page.locator('.sky-note')).toContainText(
    'Season from the record, hour chosen: Tuesday 20 January 1857',
  );
  await expect(page.locator('.sky-note .prov')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Winter' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sky-readout')).toContainText('13:00');
  await page.getByRole('button', { name: 'Summer' }).click();
  await expect(page.locator('.sky-note')).toHaveText('Atmosphere only, not a record of this year');
  // Arriving again and then moving the slider away drops the caption too.
  await page.locator('.tl-marker[aria-label^="1857"]').first().click();
  await expect(page.locator('.sky-note')).toContainText('from the record', { ignoreCase: true });
  await page.getByRole('slider', { name: 'Timeline' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.sky-note')).toHaveText('Atmosphere only, not a record of this year');
});

test('the debug overlay names each sounding bed and its reason: no bells before the 1857 peal, a market from 1290, fades labelled as fades', async ({
  page,
}) => {
  const debug = page.locator('.debug');
  const at = async (y: number): Promise<void> => {
    await page.goto(`./?debug&year=${String(y)}`);
    await ready(page);
  };
  await at(1282);
  await expect(debug).toContainText(/sound river 0\.\d\d reconstructed deeptime:S40/);
  await expect(debug).not.toContainText('sound bells');
  await expect(debug).not.toContainText('sound market');
  // The market from the fair granted in 1290, documented from the record of 1326 (sound:S20).
  await at(1330);
  await expect(debug).toContainText(/sound market 0\.\d\d documented sound:S20/);
  await at(1855);
  await expect(debug).toContainText('sound wind');
  await expect(debug).not.toContainText('sound bells');
  await expect(debug).not.toContainText('sound train');
  await at(1700);
  await expect(debug).toContainText(
    /sound market 0\.\d\d documented sound:S20, fading to documented victorian:S41 victorian:S65/,
  );
  await at(1900);
  await expect(debug).toContainText(
    /sound bells 0\.\d\d documented effects:S7, fading to reconstructed effects:S7/,
  );
  // Steam ended on 13 June 1964; a diesel unit is heard after it, never faint steam.
  await at(2000);
  await expect(debug).toContainText(/sound railcar 0\.\d\d reconstructed railwaylater:S2/);
  await expect(debug).not.toContainText('sound train');
});

test('When are we? hides the year, takes a guess on the timeline, then reveals it with clues', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // A fixed draw makes the first round the siege of Dryslwyn (1287) on every run.
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  await page.goto('./?debug');
  await ready(page);
  await expect(page.locator('.debug')).toBeVisible();
  await page.getByRole('button', { name: 'Almanac' }).click();
  await expect(page.locator('.info')).toBeVisible();
  await page.getByRole('button', { name: 'When are we?' }).click();
  const game = page.locator('.guess');
  await expect(game).toContainText('Round 1 of 5');
  for (const giveaway of [
    '.tl-year',
    '.tl-era',
    '.tl-thumb',
    '.moment',
    '.labels',
    '.bubbles',
    '.pins',
    '.photo',
    '.info',
    '.debug',
  ]) {
    await expect(page.locator(giveaway)).toBeHidden();
  }
  await expect(page.locator('.tl-marker').first()).toBeHidden();
  await expect(page.locator('.tl-band').first()).toBeHidden();
  // The labels go, but each tick keeps a visible mark, so the bar keeps its scale.
  const tick = page.locator('.tl-tick', { hasText: '800 BC' });
  await expect(tick).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
  const mark = await tick.evaluate((el) => {
    const s = getComputedStyle(el, '::before');
    return {
      content: s.content,
      display: s.display,
      height: parseFloat(s.height),
      colour: s.backgroundColor,
    };
  });
  expect(mark.content).not.toBe('none');
  expect(mark.display).not.toBe('none');
  expect(mark.height).toBeGreaterThan(0);
  expect(mark.colour).not.toBe('rgba(0, 0, 0, 0)');
  await expect(page.getByRole('button', { name: 'Almanac' })).toBeHidden();
  const lock = game.getByRole('button', { name: 'Make my guess' });
  await expect(lock).toBeDisabled();

  const slider = page.getByRole('slider', { name: 'Timeline' });
  const hidden = await slider.getAttribute('aria-valuenow');
  const box = await slider.boundingBox();
  if (!box) throw new Error('The timeline has no box');
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width * 0.6, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, y, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator('.tl-ghost-flag')).toHaveText('Your guess');
  // Dragging moved only the guess, not time.
  expect(await slider.getAttribute('aria-valuenow')).toBe(hidden);
  await page.screenshot({ path: 'test-results/guess-taking.png' });

  await lock.click();
  await expect(page.locator('.tl-year')).toBeVisible();
  await expect(game.locator('.guess-score')).toContainText('points');
  await expect(game.locator('.guess-years')).toContainText('The siege of Dryslwyn');
  await expect(slider).toHaveAttribute('aria-valuenow', hidden ?? '');
  // The reveal arrives at the key date as a snap would, so its recorded season comes with it.
  await expect(page.locator('.sky-note')).toContainText('from the record', { ignoreCase: true });
  const clue = game.locator('.guess-clues li').first();
  await expect(clue.locator('.guess-strength')).toHaveText(/Firm clue|Probable clue/);
  const badge = clue.locator('.prov');
  await expect(badge).toBeVisible();
  await badge.click();
  await expect(clue.locator('.prov-pop')).toBeVisible();
  await page.screenshot({ path: 'test-results/guess-reveal.png' });

  // The almanac opens in the game panel's place, so the game steps aside until it closes.
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Almanac' }).click();
  const almanac = page.locator('.info');
  await expect(almanac).toBeVisible();
  await expect(game).toBeHidden();
  await almanac.getByRole('button', { name: 'Close' }).click();
  await expect(game).toBeVisible();
  expect(errors).toEqual([]);
});

test('the Begin card shows the motto in both languages, and Begin opens the valley with sound', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?begin=1&welcome=1');
  await ready(page);
  const card = page.getByRole('dialog', { name: 'Llandeilo' });
  await expect(card).toBeVisible();
  await expect(card).toContainText('Omnia mutantur, nihil interit');
  await expect(card).toContainText('Everything changes, nothing perishes');
  await expect(card).toContainText('Ovid, Metamorphoses XV');
  // A see-through card let place labels and speech bubbles show through the motto.
  const cardBackground = await card
    .locator('.loader-card')
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(cardBackground).toBe('rgb(255, 255, 255)');
  const counter = await page.locator('.tl-counter').textContent();
  const year = await page.locator('.tl-year').textContent();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('?');
  // Nothing behind the card can take focus: Tab stays in the card, so arrows cannot move the year.
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const behind = await page.evaluate(() => {
      const f = document.activeElement;
      return f !== null && (document.getElementById('app')?.contains(f) === true || f.id === 'scene');
    });
    expect(behind, `Tab ${String(i + 1)} reached the app behind the card`).toBe(false);
  }
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.tl-year')).toHaveText(year ?? '');
  await expect(page.locator('.tl-counter')).toHaveText(counter ?? '');
  await expect(page.locator('html')).not.toHaveClass(/guessing/);
  await card.getByRole('button', { name: 'Cymraeg' }).click();
  await expect(card).toContainText('Mae popeth yn newid, does dim byd yn darfod');
  await expect(card.getByRole('button', { name: 'Dechrau' })).toBeVisible();
  await card.getByRole('button', { name: 'English' }).click();
  await page.screenshot({ path: 'test-results/begin-card.png' });
  // The ? pressed while the card waited did not open the welcome under it.
  const welcome = page.getByRole('dialog', { name: 'How to explore' });
  await expect(welcome).toBeHidden();
  await card.getByRole('button', { name: 'Begin' }).click();
  await expect(card).toBeHidden();
  await expect(welcome).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(welcome).toBeHidden();
  await expect(page.getByRole('button', { name: 'Sound on' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.tl-counter')).toHaveText(counter ?? '');
  expect(errors).toEqual([]);
});

test('runs at the graphics level E2E_QUALITY stores, when it is set', async ({ page }) => {
  const wanted = process.env['E2E_QUALITY'];
  test.skip(wanted === undefined, 'only when the run stores a graphics level (CI uses Low)');
  await page.goto('./?debug&year=1282');
  await ready(page);
  const line = async (): Promise<string> =>
    ((await page.locator('.debug').textContent()) ?? '').split('\n').find((l) => l.startsWith('quality ')) ??
    '';
  await expect.poll(line).toMatch(new RegExp(`^quality ${String(wanted)} `));
});

test.describe('at the default graphics level', () => {
  // This test starts from the visitor's default (High), so it ignores CI's stored Low.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('choosing Low graphics turns the effects off in the renderer, and the choice is remembered', async ({
    page,
  }) => {
    await page.goto('./?debug&year=1282');
    await ready(page);
    const debug = page.locator('.debug');
    // The overlay reads these back from the renderer (pipeline, shadow map, forest), not from the table.
    const live = async (): Promise<string> =>
      ((await debug.textContent()) ?? '').split('\n').find((l) => l.startsWith('quality ')) ?? '';
    const trees = (line: string): number => Number(/ trees (\d+) /.exec(line)?.[1] ?? Number.NaN);
    await expect.poll(live).toMatch(/^quality high .* bloom on {2}dof on {2}sharpen on /);
    const high = await live();
    expect(Number(/shadows (\d+)\//.exec(high)?.[1])).toBeGreaterThan(2048);
    const highTrees = trees(high);
    expect(highTrees).toBeGreaterThan(0);
    const graphics = page.getByRole('group', { name: 'Graphics' });
    await expect(graphics.getByRole('button', { name: 'High' })).toHaveAttribute('aria-pressed', 'true');
    await graphics.getByRole('button', { name: 'Low' }).click();
    await expect(graphics.getByRole('button', { name: 'Low' })).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(live).toMatch(/^quality low /);
    const low = await live();
    expect(low).toContain('shadows 1024/low  msaa 1  bloom off  dof off  sharpen off');
    // Low draws 0.31 of woodland triangles against High's 0.9.
    const share = trees(low) / highTrees;
    expect(share).toBeGreaterThan(0.25);
    expect(share).toBeLessThan(0.45);
    await page.reload();
    await ready(page);
    await expect.poll(live).toMatch(/^quality low .* bloom off {2}dof off /);
  });
});

test('a cutscene plays from the moment card, moves its captions on, and Skip lands on its key date', async ({
  page,
}) => {
  const errors: string[] = [];
  const landed: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.text().includes('dewidebug cutscene landed')) landed.push(m.text());
  });
  const scene = CUTSCENES.find((c) => c.id === 'roman-arrival');
  const captions = scene?.tracks.flatMap((t) => (t.kind === 'caption' ? [t.text.en] : [])) ?? [];
  expect(captions.length).toBeGreaterThan(1);
  const ad74 = formatSliderYear(year(74), 'en');
  await page.goto('./?year=74');
  await ready(page);
  await expect(page.locator('.moment h2')).toHaveText('Rome builds forts at Dinefwr');
  await page.getByRole('button', { name: /Watch/ }).click();
  const overlay = page.locator('.cutscene');
  await expect(overlay).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/cutscene-playing/);
  await expect(page.locator('.cs-caption')).toHaveText(captions[0] ?? '');
  // The scene clock runs on rendered frames (about one a second in CI), so give the next caption time.
  await expect(page.locator('.cs-caption')).toHaveText(captions[1] ?? '', { timeout: 90_000 });
  // The faded interface behind the scene cannot take focus: Tab stays in the letterbox.
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press('Tab');
    const where = await page.evaluate(() => {
      const f = document.activeElement;
      if (!f || f === document.body || f.closest('.cutscene')) return 'ok';
      return `${f.tagName}.${f.className}`;
    });
    expect(where, `Tab ${String(i + 1)} reached the interface behind the scene`).toBe('ok');
  }
  // Reading a caption's sources pauses the scene, and Escape closes the ⓘ without skipping the scene.
  await page.locator('.cs-caption-prov .prov').click();
  await expect(page.locator('.cs-caption-prov .prov-pop')).toBeVisible();
  // Text wraps inside the popover, and the popover stays on screen.
  const fit = await page.locator('.cs-caption-prov .prov-pop').evaluate((el) => {
    const r = el.getBoundingClientRect();
    const spill = [...el.querySelectorAll('*')].some((c) => c.getBoundingClientRect().right > r.right + 1);
    return { spill, onScreen: r.left >= 0 && r.right <= window.innerWidth };
  });
  expect(fit).toEqual({ spill: false, onScreen: true });
  await expect(overlay).toHaveClass(/paused/);
  const progress = page.locator('.cs-progress-bar');
  const held = await progress.getAttribute('style');
  await page.waitForTimeout(3000);
  await expect(progress).toHaveAttribute('style', held ?? '');
  await expect(page.locator('.cs-caption')).toHaveText(captions[1] ?? '');
  await page.keyboard.press('Escape');
  await page.mouse.move(5, 5);
  await expect(page.locator('.cs-caption-prov .prov-pop')).toBeHidden();
  await expect(overlay).toBeVisible();
  await expect(overlay).not.toHaveClass(/paused/);
  await expect.poll(() => progress.getAttribute('style'), { timeout: 60_000 }).not.toBe(held);
  await expect(page.locator('.timeline')).toHaveClass(/locked/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.tl-year')).toHaveText(ad74);
  await page.screenshot({ path: 'test-results/cutscene-roman-arrival.png' });
  await page.getByRole('button', { name: /Skip/ }).click();
  await expect(overlay).toBeHidden();
  await expect(page.locator('html')).not.toHaveClass(/cutscene-playing/);
  await expect(page.locator('.timeline')).not.toHaveClass(/locked/);
  await expect(page.locator('.tl-year')).toHaveText(ad74);
  await expect(page.locator('.moment h2')).toHaveText('Rome builds forts at Dinefwr');
  await expect(page.getByRole('button', { name: /Watch/ })).toBeVisible();
  expect(landed.some((l) => l.includes('event=roman-forts skipped=true'))).toBe(true);
  expect(errors).toEqual([]);
});

const particleSystems = async (page: Page): Promise<string[]> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const systems: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'particleSystems') : undefined;
    return Array.isArray(systems)
      ? systems.map((s: unknown) => (s && typeof s === 'object' ? String(Reflect.get(s, 'name')) : ''))
      : [];
  });

test('Next from Talley reaches Llandeilo burning in the winter of 1213, and on past Dryslwyn to Cymerau at its recorded midday in 1257', async ({
  page,
}) => {
  await page.goto('./?debug&year=1185');
  await ready(page);
  const next = page.getByRole('button', { name: /Next/ });
  await next.click();
  await expect(page.locator('.moment h2')).toHaveText('Llandeilo burned, Dinefwr besieged');
  await expect(page.getByRole('button', { name: 'Winter' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sky-note')).toContainText('Late January 1213');
  await expect(page.locator('.sky-readout')).toContainText('13:00');
  await expect(page.locator('.debug')).toContainText('llandeilo-burning-1213@1.00[documented]');
  await expect.poll(() => particleSystems(page)).toContain('smoke-llandeilo-burning-1213');
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'test-results/burning-1213.png' });
  await next.click();
  await expect(page.locator('.moment h2')).toHaveText('Dryslwyn Castle rises');
  await expect.poll(() => particleSystems(page)).not.toContain('smoke-llandeilo-burning-1213');
  await next.click();
  await expect(page.locator('.moment h2')).toHaveText('The battles of Coed Llathen and Cymerau');
  await expect(page.getByRole('button', { name: 'Summer' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sky-readout')).toContainText('12:00');
  await page.locator('.moment .prov').click();
  await expect(page.locator('.moment .prov-pop')).toContainText('none is marked');
});

test('the 1849 cholera marker opens its card and almanac, in both languages, with no claim that no case was found', async ({
  page,
}) => {
  await page.goto('./?year=1857');
  await ready(page);
  const marker = page.locator('.tl-marker[aria-label^="1849"]');
  await expect(marker).toHaveCount(1);
  await marker.click({ timeout: 10_000 });
  await expect(page.locator('.moment h2')).toHaveText('Cholera reaches Llandeilo');
  await page.getByRole('button', { name: 'Almanac' }).click();
  await expect(page.locator('.info')).toContainText('Asiatic Cholera');
  await expect(page.locator('.info')).not.toContainText('no case in Llandeilo');
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await expect(page.locator('.moment h2')).toHaveText('Colera yn cyrraedd Llandeilo');
});

test('Next from the railway reaches the 1918 influenza, in the autumn its papers record', async ({
  page,
}) => {
  await page.goto('./?year=1857');
  await ready(page);
  await page.getByRole('button', { name: /Next/ }).click();
  await expect(page.locator('.moment h2')).toHaveText('Influenza grips Llandeilo');
  await expect(page.getByRole('button', { name: 'Autumn' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sky-note')).toContainText('about 21 November 1918');
});

test('every timeline marker can be clicked at its own centre, however close its neighbours', async ({
  page,
}) => {
  await page.goto('./?year=1282');
  await ready(page);
  const covered = (): Promise<string[]> =>
    page.evaluate(() =>
      [...document.querySelectorAll('.tl-marker')].flatMap((m) => {
        const r = m.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return hit?.closest('.tl-marker') === m ? [] : [m.getAttribute('aria-label') ?? '?'];
      }),
    );
  await expect.poll(covered).toEqual([]);
  await page.screenshot({ path: 'test-results/marker-lanes-1440.png' });
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect.poll(covered).toEqual([]);
  await page.screenshot({ path: 'test-results/marker-lanes-1280.png' });
});

// The scene's camera pose and the controls' last change both land before the next render, so a
// value read between frames shows whichever moved the camera last.
const sampleCamera = async (page: Page, ms: number): Promise<CameraState[]> => {
  const samples: CameraState[] = [];
  const until = Date.now() + ms;
  while (Date.now() < until) {
    samples.push(await cameraState(page));
    await page.waitForTimeout(100);
  }
  return samples;
};

// Waits until the camera has not moved (a landing flight, a glide) across three samples, each of which has a new
// rendered frame in it: one slow frame can leave two reads the same while a flight is still under way.
const cameraSettled = async (page: Page): Promise<CameraState> => {
  let last = await cameraState(page);
  let stillFor = 0;
  for (let i = 0; i < 240; i++) {
    await page.waitForTimeout(750);
    const now = await cameraState(page);
    // A sample with no new frame in it says nothing: the camera cannot have moved without one.
    if (now.frame <= last.frame) continue;
    const still =
      moved(last, now) < 0.01 &&
      Math.abs(now.alpha - last.alpha) < 1e-4 &&
      Math.abs(now.radius - last.radius) < 0.01;
    last = now;
    stillFor = still ? stillFor + 1 : 0;
    if (stillFor >= 3) return now;
  }
  throw new Error('the camera never settled');
};

test('the map controls stand aside while a scene plays, and come back as they were after Skip', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?debug&year=74');
  await ready(page);
  await page.getByRole('button', { name: /Watch/ }).click();
  await expect(page.locator('.cutscene')).toBeVisible();
  // An open ⓘ holds the scene, so its camera stays on one pose and any other move shows.
  await page.locator('.cs-caption-prov .prov').click();
  await expect(page.locator('.cutscene')).toHaveClass(/paused/);
  const held = await cameraSettled(page);
  // Keys and the wheel sent straight to the 3D view (as one held from before the scene would be).
  await page.evaluate(() => {
    const canvas = document.getElementById('scene');
    canvas?.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW', key: 'w', bubbles: true }));
    canvas?.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyQ', key: 'q', bubbles: true }));
    canvas?.dispatchEvent(new WheelEvent('wheel', { deltaY: -400, bubbles: true, cancelable: true }));
  });
  const during = await sampleCamera(page, 3000);
  const drift = Math.max(...during.map((s) => moved(held, s)));
  const turn = Math.max(...during.map((s) => Math.abs(s.alpha - held.alpha)));
  const zoom = Math.max(...during.map((s) => Math.abs(s.radius - held.radius)));
  expect({ drift, turn, zoom }).toEqual({ drift: 0, turn: 0, zoom: 0 });
  // The letterbox, not the 3D view, takes a left-drag across the middle of the screen.
  expect(await page.evaluate(() => document.elementFromPoint(720, 430)?.closest('.cutscene') !== null)).toBe(
    true,
  );
  await page.keyboard.press('Escape');
  await page.mouse.move(5, 5);
  await page.getByRole('button', { name: /Skip/ }).click();
  await expect(page.locator('.cutscene')).toBeHidden();
  await page.evaluate(() => {
    const canvas = document.getElementById('scene');
    canvas?.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW', key: 'w', bubbles: true }));
    canvas?.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyQ', key: 'q', bubbles: true }));
  });
  // After the landing flight, a left-drag slides the land under the cursor and turns nothing.
  const before = await cameraSettled(page);
  const [ax, ay, bx, by] = [900, 520, 620, 420];
  const grabbed = await terrainAt(page, ax, ay);
  await page.mouse.move(ax, ay);
  await page.mouse.down();
  await page.mouse.move(bx, by, { steps: 8 });
  // Babylon's own inputs, if they were handed back, would turn the view on this left-drag as well.
  const dragging = await cameraState(page);
  expect({ alpha: dragging.alpha, beta: dragging.beta }).toEqual({ alpha: before.alpha, beta: before.beta });
  const under = await terrainAt(page, bx, by);
  expect(Math.hypot(under.x - grabbed.x, under.z - grabbed.z)).toBeLessThan(6);
  await page.mouse.up();
  const after = await cameraState(page);
  expect(moved(before, after)).toBeGreaterThan(50);
  expect(after.alpha).toBeCloseTo(before.alpha, 5);
  expect(after.beta).toBeCloseTo(before.beta, 5);
  // The arrow keys slide the view, as before the scene, and do not also turn it.
  await page.locator('#scene').focus();
  // Settled first: the drag's glide moves the camera on its own, which once let this pass with no key.
  const keyed = await cameraSettled(page);
  // Held until it moves, not for a fixed time: at CI's ~1fps a fixed 1.5s hold can span no frame at all.
  const heldFrom = Date.now();
  await page.keyboard.down('ArrowUp');
  await expect
    .poll(async () => moved(keyed, await cameraState(page)), { timeout: 20_000, intervals: [250] })
    .toBeGreaterThan(5);
  await page.keyboard.up('ArrowUp');
  console.log(`dewidebug e2e arrow slide moved after ${String(Date.now() - heldFrom)}ms held`);
  const slid = await cameraState(page);
  expect(moved(keyed, slid)).toBeGreaterThan(5);
  expect(slid.alpha).toBeCloseTo(keyed.alpha, 5);
  expect(errors).toEqual([]);
});

test('the welcome waits for a scene to end, says how to watch one, and the ? icon steps back meanwhile', async ({
  page,
}) => {
  await page.goto('./?cutscene=roman-arrival&welcome=1');
  await ready(page);
  const welcome = page.getByRole('dialog', { name: 'How to explore' });
  const icon = page.locator('.help-button');
  await expect(page.locator('.cutscene')).toBeVisible();
  await expect(welcome).toBeHidden();
  await page.keyboard.press('?');
  await expect(welcome).toBeHidden();
  await expect(icon).toHaveCSS('opacity', '0');
  expect(await icon.evaluate((el) => el.closest('[inert]') !== null)).toBe(true);
  expect(await page.evaluate(() => document.getElementById('scene')?.inert)).toBe(true);
  const clear = await page.evaluate(() => {
    const r = document.querySelector('.help-button')?.getBoundingClientRect();
    const hit = r ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null;
    return hit?.closest('.help-button') === null;
  });
  expect(clear).toBe(true);
  await page.screenshot({ path: 'test-results/cutscene-with-welcome-due.png' });
  await page.keyboard.press('Escape');
  await expect(page.locator('.cutscene')).toBeHidden();
  await expect(welcome).toBeVisible();
  await expect(welcome).toContainText('press Watch on its card');
  await expect(welcome).toContainText('End a scene, or close a panel or a popup');
  await expect(icon).toHaveCSS('opacity', '1');
  await page.keyboard.press('Escape');
  await expect(welcome).toBeHidden();
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await icon.click();
  await expect(page.getByRole('dialog', { name: 'Sut i grwydro' })).toContainText('pwyswch Gwylio');
});

test('a welcome due at start waits behind the Begin card and the scene it starts, and opens after Skip', async ({
  page,
}) => {
  await page.goto('./?begin=1&welcome=1&cutscene=roman-arrival');
  await ready(page);
  const welcome = page.getByRole('dialog', { name: 'How to explore' });
  await page.getByRole('dialog', { name: 'Llandeilo' }).getByRole('button', { name: 'Begin' }).click();
  await expect(page.locator('.cutscene')).toBeVisible();
  await expect(welcome).toBeHidden();
  expect(await page.evaluate(() => document.getElementById('scene')?.inert)).toBe(true);
  await page.getByRole('button', { name: /Skip/ }).click();
  await expect(page.locator('.cutscene')).toBeHidden();
  await expect(welcome).toBeVisible();
});

const AT_1900 = './?year=1900&place=llandeilo&radius=140';

const photoFor = (id: string | null): (typeof HARRIES_PHOTOGRAPHS)[number] => {
  const found = HARRIES_PHOTOGRAPHS.find((p) => p.id === id);
  if (!found) throw new Error(`No photograph ${String(id)}`);
  return found;
};

test('a first visit shows the pins in Llandeilo in 1900 and none in 1850, and switching Photos off is remembered across a reload', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(AT_1900);
  await ready(page);
  expect(await page.evaluate(() => localStorage.getItem('llandeilo.photos'))).toBeNull();
  const toggle = page.getByRole('button', { name: 'Photos', exact: true });
  const pins = page.locator('.pin').filter({ visible: true });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => pins.count()).toBeGreaterThanOrEqual(3);
  for (const pin of await pins.all()) {
    const p = photoFor(await pin.getAttribute('data-photo'));
    await expect(pin).toHaveAccessibleName(`Photograph: ${p.where}`);
    expect(p.placement.kind).toBe('placed');
  }
  await page.screenshot({ path: 'test-results/photo-pins-1900.png' });
  await page.reload();
  await ready(page);
  await expect(page.getByRole('button', { name: 'Photos', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect.poll(() => page.locator('.pin').filter({ visible: true }).count()).toBeGreaterThanOrEqual(3);
  await page.goto('./?year=1850&place=llandeilo&radius=140');
  await ready(page);
  await page.waitForTimeout(1500);
  await expect(page.locator('.pin').filter({ visible: true })).toHaveCount(0);
  await page.goto(AT_1900);
  await ready(page);
  await expect.poll(() => page.locator('.pin').filter({ visible: true }).count()).toBeGreaterThanOrEqual(3);
  await page.getByRole('button', { name: 'Photos', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Photos', exact: true })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await expect(page.locator('.pin').filter({ visible: true })).toHaveCount(0);
  await page.reload();
  await ready(page);
  await expect(page.getByRole('button', { name: 'Photos', exact: true })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await page.waitForTimeout(1500);
  await expect(page.locator('.pin').filter({ visible: true })).toHaveCount(0);
  await page.goto(`${AT_1900}&photos=1`);
  await ready(page);
  await expect.poll(() => page.locator('.pin').filter({ visible: true }).count()).toBeGreaterThanOrEqual(3);
  expect(errors).toEqual([]);
});

test('a pin opens its photograph with the credit and an ⓘ for the date and the placement, and Escape closes it', async ({
  page,
}) => {
  await page.goto(`${AT_1900}&photos=1`);
  await ready(page);
  const pin = page.locator('.pin').filter({ visible: true }).first();
  await expect(pin).toBeVisible();
  const p = photoFor(await pin.getAttribute('data-photo'));
  await pin.click();
  const panel = page.locator('.photo');
  await expect(panel).toBeVisible();
  await expect(panel.locator('h2')).toHaveText(p.title);
  const image = panel.locator('img');
  await expect(image).toHaveAttribute('src', new RegExp(`${p.file.replaceAll('.', '\\.')}$`));
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(500);
  await expect(panel.locator('figcaption')).toContainText('D C Harries');
  await expect(panel.locator('figcaption')).toContainText('People’s Collection Wales');
  await expect(panel.locator('figcaption a')).toHaveAttribute('href', p.catalogueUrl);
  await expect(panel).toContainText(p.dated);
  const [box, compass] = [await panel.boundingBox(), await page.locator('.compass').boundingBox()];
  expect(box && compass && box.y < compass.y + compass.height && box.x + box.width > compass.x).toBe(false);
  await panel.locator('.prov').click();
  const pop = panel.locator('.prov-pop');
  await expect(pop).toBeVisible();
  await expect(pop).toContainText('Date:');
  await expect(pop).toContainText(p.dateNote.slice(0, 40));
  await expect(pop).toContainText('Placement:');
  if (p.placement.kind === 'placed') await expect(pop).toContainText(`${String(p.placement.accuracyM)} m`);
  await expect(pop.locator('a').first()).toHaveAttribute('href', /^https?:\/\//);
  await page.screenshot({ path: 'test-results/photo-open-1900.png' });
  await page.keyboard.press('Escape');
  await page.mouse.move(5, 5);
  await expect(pop).toBeHidden();
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
});

// Presses, lets go after a pause so the land stops dead rather than gliding on, and refuses to run unless
// the press really lands on `layer`: otherwise a drag from the bare canvas would pass a test of the pass-through.
const dragFrom = async (
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
  layer: string,
): Promise<void> => {
  const startsOn = await page.evaluate(
    ([x, y, selector]) => document.elementFromPoint(x, y)?.closest(selector)?.className ?? 'none',
    [from.x, from.y, layer] as const,
  );
  console.info(
    `dewidebug e2e drag ${String(Math.round(from.x))},${String(Math.round(from.y))} to ${String(Math.round(to.x))},${String(Math.round(to.y))} starts on=${startsOn} wanted=${layer}`,
  );
  expect(startsOn).not.toBe('none');
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.waitForTimeout(200);
  await page.mouse.up();
};

const centreOf = async (target: Locator): Promise<{ x: number; y: number }> => {
  await expect(target).toBeVisible();
  const box = await target.boundingBox();
  if (!box) throw new Error('no box for the element to press');
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

test('a press on a pin that moves slides the land and opens nothing, the wheel over it zooms, and a click still opens it', async ({
  page,
}) => {
  await page.goto(`${AT_1900}&photos=1&debug`);
  await ready(page);
  const panel = page.locator('.photo');
  const pin = page.locator('.pin').filter({ visible: true }).first();
  let before = await cameraSettled(page);
  let at = await centreOf(pin);
  await dragFrom(page, at, { x: at.x - 100, y: at.y + 30 }, '.pin');
  await expect.poll(async () => moved(before, await cameraState(page))).toBeGreaterThan(5);
  expect(Math.abs((await cameraState(page)).alpha - before.alpha)).toBeLessThan(1e-3);
  await page.waitForTimeout(500);
  await expect(panel).toBeHidden();

  before = await cameraSettled(page);
  at = await centreOf(pin);
  await page.mouse.move(at.x, at.y);
  await page.mouse.wheel(0, -300);
  await expect.poll(async () => (await cameraState(page)).radius).toBeLessThan(before.radius * 0.9);

  await cameraSettled(page);
  const p = photoFor(await pin.getAttribute('data-photo'));
  await pin.click();
  await expect(panel).toBeVisible();
  await expect(panel.locator('h2')).toHaveText(p.title);
});

test('a drag that starts on a speech bubble slides the land and drops its click', async ({ page }) => {
  await page.goto('./?year=1843&place=llandeilo&radius=200&debug');
  await ready(page);
  const bubble = page.locator('.bubble').filter({ visible: true }).first();
  const before = await cameraSettled(page);
  const at = await centreOf(bubble);
  await dragFrom(page, at, { x: at.x - 100, y: at.y + 30 }, '.bubble');
  await expect.poll(async () => moved(before, await cameraState(page))).toBeGreaterThan(5);
  expect(Math.abs((await cameraState(page)).alpha - before.alpha)).toBeLessThan(1e-3);
  await page.waitForTimeout(500);
  await expect(page.locator('.convo')).toBeHidden();
});

test('a drag that starts on a place label slides the land without flying there, and the wheel over it zooms', async ({
  page,
}) => {
  await page.goto('./?year=1282&debug');
  await ready(page);
  const label = page.locator('.label', { hasText: 'Talyllychau' });
  let before = await cameraSettled(page);
  let at = await centreOf(label);
  await dragFrom(page, at, { x: at.x + 100, y: at.y - 30 }, '.label');
  await expect.poll(async () => moved(before, await cameraState(page))).toBeGreaterThan(5);
  await page.waitForTimeout(1500);
  const after = await cameraState(page);
  expect(Math.abs(after.alpha - before.alpha)).toBeLessThan(1e-3);
  expect(Math.abs(after.radius - before.radius)).toBeLessThan(1e-3);

  before = await cameraSettled(page);
  at = await centreOf(label);
  await page.mouse.move(at.x, at.y);
  await page.mouse.wheel(0, -300);
  await expect.poll(async () => (await cameraState(page)).radius).toBeLessThan(before.radius * 0.9);
});

test('Escape closes the welcome before the photograph under it, then the photograph', async ({ page }) => {
  await page.goto(`${AT_1900}&photos=1`);
  await ready(page);
  const panel = page.locator('.photo');
  await page.locator('.pin').filter({ visible: true }).first().click();
  await expect(panel).toBeVisible();
  await page.getByRole('button', { name: 'How to explore' }).click();
  const welcome = page.getByRole('dialog', { name: 'How to explore' });
  await expect(welcome).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(welcome).toBeHidden();
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
});

test('a photograph whose caption its picture contradicts is not pinned in 1900, and reads as reconstructed in the 1920s', async ({
  page,
}) => {
  const inn = photoFor('harries-2282261');
  await page.goto('./?year=1900&photos=1&place=llandeilo&radius=400');
  await ready(page);
  // Two or more: a pin under a place label waits for the label, which wins.
  await expect.poll(() => page.locator('.pin').filter({ visible: true }).count()).toBeGreaterThanOrEqual(2);
  await expect(page.locator(`.pin[data-photo="${inn.id}"]`)).toBeHidden();
  await page.goto('./?year=1925&photos=1&place=llandeilo&radius=400');
  await ready(page);
  const pin = page.locator(`.pin[data-photo="${inn.id}"]`);
  await expect(pin).toBeVisible();
  await pin.click();
  const panel = page.locator('.photo');
  await expect(panel.locator('h2')).toHaveText(inn.title);
  await panel.locator('.prov').click();
  const pop = panel.locator('.prov-pop');
  await expect(pop).toContainText('Reconstructed');
  await expect(pop).toContainText('motorcycle');
  await expect(panel.locator('.prov')).toContainText('Reconstructed');
});

test('a photograph closes when the slider leaves its years or Photos is switched off', async ({ page }) => {
  await page.goto(`${AT_1900}&photos=1`);
  await ready(page);
  await page.locator('.pin').filter({ visible: true }).first().click();
  await expect(page.locator('.photo')).toBeVisible();
  await page.getByRole('button', { name: 'Photos', exact: true }).click();
  await expect(page.locator('.photo')).toBeHidden();
  await page.getByRole('button', { name: 'Photos', exact: true }).click();
  await page.locator('.pin').filter({ visible: true }).first().click();
  await expect(page.locator('.photo')).toBeVisible();
  const slider = page.getByRole('slider', { name: /Timeline|Llinell amser/ });
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(page.locator('.photo')).toBeHidden();
});

test('the photo layer reads in Welsh: the toggle, the pin names, the panel’s labels and the ⓘ', async ({
  page,
}) => {
  await page.goto(`${AT_1900}&photos=1&lang=cy`);
  await ready(page);
  await expect(page.getByRole('button', { name: 'Lluniau', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const pin = page.locator('.pin').filter({ visible: true }).first();
  await expect(pin).toBeVisible();
  const p = photoFor(await pin.getAttribute('data-photo'));
  await expect(pin).toHaveAccessibleName(`Ffotograff: ${p.where}`);
  await pin.click();
  const panel = page.locator('.photo');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('button', { name: 'Cau' })).toBeVisible();
  await expect(panel).toContainText('Cydnabyddiaeth:');
  await expect(panel).toContainText('Dyddiad');
  await expect(panel).toContainText('Yr hyn a welir');
  await expect(panel).toContainText('Pa mor sicr ydym ni?');
  await expect(panel.locator('figcaption a')).toHaveText('Gweld yng Nghasgliad y Werin Cymru');
  await panel.locator('.prov').click();
  const pop = panel.locator('.prov-pop');
  await expect(pop).toContainText('Dyddiad:');
  await expect(pop).toContainText('Lleoliad:');
  await expect(pop).toContainText('Wedi’i leoli o fewn tua');
  await expect(pop).toContainText('yn Saesneg yn unig');
  await expect(panel.locator('h2')).toHaveAttribute('lang', 'en');
  await page.screenshot({ path: 'test-results/photo-open-1900-cy.png' });
  await page.getByRole('button', { name: 'English' }).click();
  await expect(panel.getByRole('button', { name: 'Close' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Photos', exact: true })).toBeVisible();
});

test('the credits on the About tab list every photograph with its credit and catalogue link', async ({
  page,
}) => {
  await page.goto('./?year=1900');
  await ready(page);
  await page.getByRole('button', { name: 'About' }).click();
  const credits = page.locator('.photo-credits li');
  await expect(credits).toHaveCount(HARRIES_PHOTOGRAPHS.length);
  const first = HARRIES_PHOTOGRAPHS[0];
  if (!first) throw new Error('no photographs');
  const item = page.locator(`[data-photo-credit="${first.id}"]`);
  await expect(item).toContainText('D C Harries');
  await expect(item.locator('a')).toHaveAttribute('href', first.catalogueUrl);
  await expect(page.locator('.info-credits').first()).toContainText('Photographs by D C Harries');
});

const presenceOf = async (page: Page, id: string): Promise<number | undefined> => {
  const text = (await page.locator('.debug').textContent()) ?? '';
  const m = new RegExp(`${id}@(\\d\\.\\d\\d)\\[`).exec(text);
  return m?.[1] ? Number(m[1]) : undefined;
};

const drawnPlans = async (page: Page): Promise<{ near: number; far: number }> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const meshes: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'meshes') : undefined;
    const enabled = (m: unknown): boolean => {
      if (!m || typeof m !== 'object') return false;
      const isEnabled: unknown = Reflect.get(m, 'isEnabled');
      if (typeof isEnabled !== 'function') return false;
      const on: unknown = isEnabled.call(m);
      return on === true;
    };
    const on = (level: string): number =>
      Array.isArray(meshes)
        ? meshes.filter(
            (m: unknown) =>
              m !== null &&
              typeof m === 'object' &&
              Reflect.get(m, 'name') === `plan-standing-${level}` &&
              enabled(m),
          ).length
        : 0;
    return { near: on('near'), far: on('far') };
  });

test('flying to the Roman forts at AD 80 shows Fort 1 going and nothing of Fort 2, and at AD 84 Fort 2 whole over Fort 1’s backfilled ditches, with the settlement, read through ?debug', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?debug&place=roman-forts&year=80&radius=45');
  await ready(page);
  const debug = page.locator('.debug');
  await expect(debug).toContainText('year AD 80');
  await expect.poll(() => presenceOf(page, 'roman-fort-a')).toBeGreaterThan(0.3);
  expect(await presenceOf(page, 'roman-fort-a')).toBeLessThan(0.9);
  for (const id of ['roman-fort-b', 'roman-fort-a-levelled', 'roman-vicus'])
    expect(await presenceOf(page, id), id).toBeUndefined();
  await expect(debug).toContainText('roman-fort-a@');
  await expect(debug).toContainText('[documented]');
  await expect(debug).toContainText(
    /plan roman-fort-a: \d+ parts \(\d+ documented, \d+ reconstructed, \d+ imagined\), \d+ detail only/,
  );
  await expect(debug).not.toContainText('plan roman-fort-b');
  await expect(debug).toContainText('detail roman-fort-a=near');
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 1, far: 0 });
  await page.screenshot({ path: 'test-results/roman-forts-80.png' });
  await page.goto('./?debug&place=roman-forts&year=84&radius=45');
  await ready(page);
  await expect(debug).toContainText('year AD 84');
  await expect.poll(() => presenceOf(page, 'roman-fort-b')).toBe(1);
  expect(await presenceOf(page, 'roman-fort-a')).toBeUndefined();
  expect(await presenceOf(page, 'roman-fort-a-levelled')).toBe(1);
  expect(await presenceOf(page, 'roman-vicus')).toBe(1);
  await expect(debug).toContainText('roman-vicus@1.00[reconstructed]');
  await expect(debug).toContainText(/plan roman-fort-b: \d+ parts/);
  await expect(debug).toContainText('detail roman-fort-a=near roman-fort-b=near roman-vicus=near');
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 3, far: 0 });
  await page.screenshot({ path: 'test-results/roman-forts-84.png' });
  expect(errors).toEqual([]);
});

test('at AD 110 Fort 2 stands over Fort 1’s backfilled ditches beside the settlement, and from afar only their defences are drawn', async ({
  page,
}) => {
  await page.goto('./?debug&place=roman-forts&year=110&radius=45');
  await ready(page);
  await expect.poll(() => presenceOf(page, 'roman-fort-b')).toBe(1);
  expect(await presenceOf(page, 'roman-fort-a')).toBeUndefined();
  expect(await presenceOf(page, 'roman-fort-a-levelled')).toBe(1);
  expect(await presenceOf(page, 'roman-vicus')).toBe(1);
  await expect(page.locator('.debug')).toContainText(
    'detail roman-fort-a=near roman-fort-b=near roman-vicus=near',
  );
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 3, far: 0 });
  await page.screenshot({ path: 'test-results/roman-forts-110-near.png' });
  await page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const camera: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    if (camera && typeof camera === 'object') Reflect.set(camera, 'radius', 420);
  });
  await expect(page.locator('.debug')).toContainText(
    'detail roman-fort-a=far roman-fort-b=far roman-vicus=far',
    {
      timeout: 60_000,
    },
  );
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 1, far: 2 });
  await page.screenshot({ path: 'test-results/roman-forts-110-far.png' });
});

const modelParts = async (page: Page, id: string): Promise<string[]> =>
  page.evaluate((feature) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const fn: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'modelParts') : undefined;
    const got: unknown = typeof fn === 'function' ? fn.call(debug, feature) : [];
    return Array.isArray(got) ? got.filter((x): x is string => typeof x === 'string') : [];
  }, id);

test('at AD 84 at High, Fort 2 and the settlement are drawn from their Blender models, and a gate tower from the model opens its ⓘ with the detail it carries, in both languages', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const loaded: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug landmark')) loaded.push(m.text());
  });
  await page.goto('./?debug&quality=high&place=roman-forts&year=84&radius=45');
  await ready(page);
  const debug = page.locator('.debug');
  await expect(debug).toContainText('roman-fort-b=glb:near', { timeout: 90_000 });
  await expect(debug).toContainText('roman-vicus=glb:near', { timeout: 90_000 });
  expect(loaded.filter((l) => /probe .* error=0\.0\d\dm/.test(l)).length).toBeGreaterThanOrEqual(4);
  const parts = await modelParts(page, 'roman-fort-b');
  expect(parts).toContain('fort2/gate-ne/tower-left');
  expect(parts).toContain('fort2/gate-ne/leaf-left');
  expect(parts.some((p) => p.includes('/ditch-'))).toBe(false);
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 3, far: 0 });
  await page.screenshot({ path: 'test-results/roman-forts-84-models.png' });
  const card = page.locator('.moment-parts');
  await card.locator('summary').first().click();
  const tower = card.locator('details[data-part="fort2/gate-ne/tower-left"]');
  await tower.locator('summary').click();
  await expect(tower.locator('[data-kit="post-tower-six"]')).toContainText('Six-post timber tower');
  await expect(tower.locator('[data-kit="post-tower-six"]')).toContainText('Reconstructed');
  await expect(tower.locator('[data-kit="shingle-roof"]')).toContainText('Imagined');
  await expect(tower.locator('[data-kit="tower-boarding"]')).toContainText('Imagined');
  await expect(tower.locator('[data-kit="tower-boarding"]')).toContainText('guard-room');
  await expect(tower.locator('[data-kit="post-tower-six"]')).not.toContainText('stage');
  await expect(tower.locator('[data-kit="post-tower-six"] a[href*="herefordshire"]')).toHaveCount(1);
  await expect(tower.locator('.moment-kits-off')).toHaveCount(0);
  await expect(tower).toContainText('rendering, not evidence');
  await page.screenshot({ path: 'test-results/roman-forts-84-models-part.png' });
  await page.keyboard.press('Escape');
  await page.mouse.move(900, 200);
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await page.locator('.moment-parts summary').first().click();
  const twr = page.locator('.moment-parts details[data-part="fort2/gate-ne/tower-left"]');
  await twr.locator('summary').click();
  await expect(twr.locator('[data-kit="post-tower-six"]')).toContainText('Tŵr pren chwe phostyn');
  expect(errors).toEqual([]);
});

// Debug hooks for clicking a part of a Blender model in 3D (ADR 0055): bring the part to the middle of the view, then
// find a screen point over it where a pick finds it. A camera move only shows in the projection once frames have
// rendered with it (two, measured on SwiftShader at about 1fps), so this waits for frames and then for the point, not
// for a fixed time.
const frameId = (page: Page): Promise<number> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const fn: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'getFrameId') : undefined;
    return typeof fn === 'function' ? Number(fn.call(scene)) : Number.NaN;
  });

// Waits for frames to render, which is the only thing a "nothing happens" check can wait on: after a fixed time a
// slow renderer may not have run a frame, and an absence would pass without the app having had the chance to act.
const framesRendered = async (page: Page, count: number): Promise<void> => {
  const before = await frameId(page);
  await expect
    .poll(() => frameId(page), { message: `${String(count)} frames rendered`, timeout: 90_000 })
    .toBeGreaterThanOrEqual(before + count);
};

// Moves the camera onto a part and returns the screen point over it. The frame id is read in the same evaluate as the
// move, so no frame can fall between them: the first frame drawn with the new camera has an id above it, and waiting
// for it to rise by three means two frames have been drawn with the new camera and a third has begun.
async function partPoint(page: Page, feature: string, part: string): Promise<{ x: number; y: number }> {
  const moveFrame = await page.evaluate(
    ([f, p]) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      const fn: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'partCentre') : undefined;
      const centre: unknown = typeof fn === 'function' ? fn.call(debug, f, p) : undefined;
      const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
      const camera: unknown =
        scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
      if (!centre || typeof centre !== 'object' || !camera || typeof camera !== 'object') return Number.NaN;
      const target: unknown = Reflect.get(camera, 'target');
      const set: unknown = target && typeof target === 'object' ? Reflect.get(target, 'set') : undefined;
      if (typeof set === 'function')
        set.call(target, Reflect.get(centre, 'x'), Reflect.get(centre, 'y'), Reflect.get(centre, 'z'));
      Reflect.set(camera, 'radius', 10);
      Reflect.set(camera, 'beta', 1.1);
      const frameOf: unknown =
        scene && typeof scene === 'object' ? Reflect.get(scene, 'getFrameId') : undefined;
      return typeof frameOf === 'function' ? Number(frameOf.call(scene)) : Number.NaN;
    },
    [feature, part],
  );
  if (Number.isNaN(moveFrame)) throw new Error(`could not move the camera onto ${part}`);
  await expect
    .poll(() => frameId(page), { message: 'frames rendered after the camera moved', timeout: 90_000 })
    .toBeGreaterThanOrEqual(moveFrame + 3);
  let at: { x: number; y: number } | undefined;
  await expect
    .poll(
      async () => {
        at = await page.evaluate(
          ([f, p]) => {
            const debug: unknown = Reflect.get(window, 'llandeiloDebug');
            const fn: unknown =
              debug && typeof debug === 'object' ? Reflect.get(debug, 'partScreenPoint') : undefined;
            const got: unknown = typeof fn === 'function' ? fn.call(debug, f, p) : undefined;
            return got && typeof got === 'object'
              ? { x: Number(Reflect.get(got, 'x')), y: Number(Reflect.get(got, 'y')) }
              : undefined;
          },
          [feature, part],
        );
        return at !== undefined;
      },
      { message: `a screen point over ${part}`, timeout: 90_000 },
    )
    .toBe(true);
  if (!at) throw new Error(`no screen point over ${part}`);
  return at;
}

const hoveredPart = async (page: Page): Promise<string> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const fn: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'hoveredPart') : undefined;
    const got: unknown = typeof fn === 'function' ? fn.call(debug) : '';
    return typeof got === 'string' ? got : '';
  });

const veilState = async (page: Page): Promise<{ meshes: number; prepass: boolean }> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const meshes: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'meshes') : undefined;
    const get: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'getMaterialByName') : undefined;
    const mat: unknown = typeof get === 'function' ? get.call(scene, 'part-veil-mat') : undefined;
    const count = Array.isArray(meshes)
      ? meshes.filter((m: unknown) => {
          const name: unknown = m && typeof m === 'object' ? Reflect.get(m, 'name') : '';
          return typeof name === 'string' && name.startsWith('part-veil');
        }).length
      : -1;
    return {
      meshes: count,
      prepass: mat && typeof mat === 'object' ? Reflect.get(mat, 'needDepthPrePass') === true : false,
    };
  });

test('at AD 84 at High, hovering a gate tower of Fort 2’s model veils and names it, a click opens its ⓘ with its tier in both languages, and a drag across it opens nothing', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?debug&quality=high&place=roman-forts&year=84&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('roman-fort-b=glb:near', { timeout: 90_000 });
  await expect(page.locator('.debug')).toContainText('textures=1024');
  const tower = 'fort2/gate-ne/tower-left';
  const at = await partPoint(page, 'roman-fort-b', tower);
  const canvasAt = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.id ?? '', at);
  expect(canvasAt).toBe('scene');
  await page.mouse.move(at.x - 30, at.y - 30);
  await page.mouse.move(at.x, at.y, { steps: 3 });
  await expect.poll(() => hoveredPart(page)).toBe(`roman-fort-b|${tower}`);
  const tip = page.locator('.part-tip');
  await expect(tip).toBeVisible();
  await expect(tip).toContainText('north-east');
  await expect(tip).toContainText('Fort 2');
  // The veil is one mesh drawn with a depth pre-pass, so a tower's many overlapping layers blend once, not each over the last.
  expect(await veilState(page)).toEqual({ meshes: 1, prepass: true });
  await page.screenshot({ path: 'test-results/roman-forts-84-part-hover.png' });
  await page.mouse.click(at.x, at.y);
  const info = page.locator('.part-info');
  await expect(info).toBeVisible();
  await expect(info).toHaveAttribute('data-part', tower);
  await expect(info.locator('.part-info-tier')).toContainText('Reconstructed');
  await expect(info.locator('[data-kit="post-tower-six"]')).toContainText('Six-post timber tower');
  await expect(info.locator('[data-surface="timber"]')).toContainText('Rough Wood');
  await expect(info.locator('[data-surface="shingle"]')).toContainText('Imagined');
  await expect(tip).toBeHidden();
  await page.screenshot({ path: 'test-results/roman-forts-84-part-info.png' });
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await expect(info.locator('.part-info-tier')).toContainText('Wedi’i ail-greu');
  await expect(info.locator('[data-kit="post-tower-six"]')).toContainText('Tŵr pren chwe phostyn');
  await page.keyboard.press('Escape');
  await expect(info).toBeHidden();
  // A drag that starts and ends on the tower slides the land (ADR 0050) and opens nothing.
  await page.getByRole('button', { name: 'English', exact: true }).click();
  const again = await partPoint(page, 'roman-fort-b', tower);
  await page.mouse.move(again.x - 50, again.y);
  await page.mouse.down();
  // Quick, and back to where it began: a press that passed the drag threshold on the way is not a click.
  await page.mouse.move(again.x + 50, again.y, { steps: 2 });
  await page.mouse.move(again.x - 50, again.y, { steps: 2 });
  await page.mouse.up();
  await framesRendered(page, 3);
  await expect(info).toBeHidden();
  expect(errors).toEqual([]);
});

const FORT1_TOWER = 'fort1/gate-sw/tower-right';

const partInfoOpen = async (page: Page): Promise<boolean> =>
  page.locator('.part-info').evaluate((el) => el instanceof HTMLElement && !el.hidden);

test('a part of the AD 74 fort opens its ⓘ, and it closes when a "When are we?" round begins, and parts stay inert through the round', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // A fixed draw makes the round the one for the forts' own key date, whose year draws them.
  const steps = keySteps(WORLD_CONTENT.timeline, WORLD_CONTENT.events);
  const playable = playableSteps(WORLD_CONTENT, steps);
  const index = playable.findIndex((st) => st.event.id === 'roman-forts');
  expect(index, 'the forts are a playable round').toBeGreaterThanOrEqual(0);
  const draw = (index + 0.5) / playable.length;
  await page.addInitScript((d) => {
    Math.random = () => d;
  }, draw);
  await page.goto('./?debug&quality=high&place=roman-forts&year=74&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('roman-fort-a=glb:near', { timeout: 90_000 });
  const at = await partPoint(page, 'roman-fort-a', FORT1_TOWER);
  await page.mouse.move(at.x - 30, at.y - 30);
  await page.mouse.move(at.x, at.y, { steps: 3 });
  await expect.poll(() => hoveredPart(page)).toBe(`roman-fort-a|${FORT1_TOWER}`);
  await page.mouse.click(at.x, at.y);
  await expect.poll(() => partInfoOpen(page)).toBe(true);

  await page.getByRole('button', { name: 'When are we?' }).click();
  await expect(page.locator('.guess')).toContainText('Round 1 of 5');
  // The round took the open ⓘ with it, and the year is still the forts' own.
  expect(await partInfoOpen(page)).toBe(false);
  await cameraSettled(page);
  const during = await partPoint(page, 'roman-fort-a', FORT1_TOWER);
  // The point must be over the canvas, not under the round's panel, or the absences below would prove nothing.
  const duringOver = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.id ?? '', during);
  expect(duringOver, 'the part is over the canvas during the round').toBe('scene');
  await page.mouse.move(during.x - 30, during.y - 30);
  await page.mouse.move(during.x, during.y, { steps: 3 });
  await framesRendered(page, 3);
  expect(await hoveredPart(page)).toBe('');
  await expect(page.locator('.part-tip')).toHaveJSProperty('hidden', true);
  await page.mouse.click(during.x, during.y);
  await framesRendered(page, 3);
  expect(await partInfoOpen(page)).toBe(false);

  // Stopping the game gives the parts back: the same point now hovers and opens.
  await page.getByRole('button', { name: 'Stop the game' }).click();
  await cameraSettled(page);
  const after = await partPoint(page, 'roman-fort-a', FORT1_TOWER);
  await page.mouse.move(after.x - 30, after.y - 30);
  await page.mouse.move(after.x, after.y, { steps: 3 });
  await expect.poll(() => hoveredPart(page)).toBe(`roman-fort-a|${FORT1_TOWER}`);
  await page.mouse.click(after.x, after.y);
  await expect.poll(() => partInfoOpen(page)).toBe(true);

  // Scrubbing to a year the fort is gone from takes its panel away.
  await page.getByRole('slider', { name: /Timeline|Llinell amser/ }).press('End');
  // The present is the heaviest scene: on one slow core it takes two frames of about 8s each to draw, and the panel
  // closes in the first apply after them.
  await expect
    .poll(() => partInfoOpen(page), {
      message: 'the panel closes once the present has drawn',
      timeout: 120_000,
    })
    .toBe(false);
  expect(errors).toEqual([]);
});

test('a cutscene takes an open part ⓘ away, and the veil with it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?debug&quality=high&place=roman-forts&year=74&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('roman-fort-a=glb:near', { timeout: 90_000 });
  const at = await partPoint(page, 'roman-fort-a', FORT1_TOWER);
  await page.mouse.move(at.x - 30, at.y - 30);
  await page.mouse.move(at.x, at.y, { steps: 3 });
  await expect.poll(() => hoveredPart(page)).toBe(`roman-fort-a|${FORT1_TOWER}`);
  await page.mouse.click(at.x, at.y);
  await expect.poll(() => partInfoOpen(page)).toBe(true);
  await page.getByRole('button', { name: /Watch/ }).click();
  await expect(page.locator('.cutscene')).toBeVisible();
  expect(await partInfoOpen(page)).toBe(false);
  expect(await hoveredPart(page)).toBe('');
  await page.getByRole('button', { name: /Skip/ }).click();
  await expect(page.locator('.cutscene')).toBeHidden();
  expect(errors).toEqual([]);
});

test('if one texture fails to load, the parts that use it are drawn from a flat grey, not black, and keep every other map', async ({
  page,
}) => {
  const warnings: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug landmark')) warnings.push(m.text());
  });
  await page.route('**/timber-color-1024.webp', (route) => route.abort());
  await page.goto('./?debug&quality=high&place=roman-forts&year=84&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('roman-fort-b=glb:near', { timeout: 90_000 });
  const state = async (name: string) =>
    page.evaluate((n) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
      const get: unknown =
        scene && typeof scene === 'object' ? Reflect.get(scene, 'getMaterialByName') : undefined;
      const mat: unknown = typeof get === 'function' ? get.call(scene, n) : undefined;
      if (!mat || typeof mat !== 'object') return undefined;
      const colour: unknown = Reflect.get(mat, 'diffuseColor');
      const channel = (c: string): number =>
        colour && typeof colour === 'object' ? Number(Reflect.get(colour, c)) : Number.NaN;
      const map: unknown = Reflect.get(mat, 'diffuseTexture');
      return {
        colourMap:
          map !== null &&
          !(map && typeof map === 'object' && Reflect.get(map, 'name') === 'landmark-detail-mean'),
        midGrey:
          map !== null && typeof map === 'object' && Reflect.get(map, 'name') === 'landmark-detail-mean',
        normalMap: Reflect.get(mat, 'bumpTexture') !== null,
        diffuse: [channel('r'), channel('g'), channel('b')],
      };
    }, name);
  await expect.poll(() => state('landmark-timber-mat').then((s) => s?.colourMap)).toBe(false);
  // The photographs average mid-grey and the vertex colours are lifted to meet them, so the failed map is
  // replaced by a flat mid-grey (a diffuse colour alone would leave the light and the glow unscaled).
  expect(await state('landmark-timber-mat')).toMatchObject({
    colourMap: false,
    midGrey: true,
    diffuse: [1, 1, 1],
  });
  // Only the failed map is dropped: its normal map and every other surface keep theirs.
  expect((await state('landmark-timber-mat'))?.normalMap).toBe(true);
  expect(await state('landmark-shingle-mat')).toMatchObject({
    colourMap: true,
    midGrey: false,
    normalMap: true,
    diffuse: [1, 1, 1],
  });
  expect(warnings.some((w) => w.includes('timber') && w.includes('without its color map'))).toBe(true);
});

// Timber colour, read from frames of the scene.
//   hue: the mean colour of the timber-coloured pixels (orange-brown: red well over green, green over blue), so a part
//        drawn too bright, too dark or black shows as a number.
//   surface: the mean colour of exactly the timber material's pixels, found by drawing the view with the timber
//        meshes shown and hidden and taking the pixels that differ. A hue filter would take in the shingle and other
//        browns, and a failed texture is judged against the photograph on the same geometry.
// How a frame is read depends on the backend. page.screenshot asks the compositor for a fresh frame, which cost 20-40s
// each on one slow core under WebGL on SwiftShader (ten of them put this test past its time), so there the canvas is
// read inside the render observer straight after a frame is drawn, the only moment a WebGL canvas can be read without
// preserveDrawingBuffer. On WebGPU that read comes back blank (the frame is not presented until the render ends), and
// the GPU makes a screenshot cheap, so there the frame is a clip screenshot.
const FORT_CLIP = { x: 520, y: 320, width: 390, height: 220 };
const SURFACE_CLIP = { x: 300, y: 180, width: 840, height: 520 };
type Clip = typeof FORT_CLIP;
interface TimberRead {
  readonly n: number;
  readonly mean: [number, number, number];
  readonly png: string;
}

const backendOf = (page: Page): Promise<string> =>
  page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const backend: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'backend') : undefined;
    return typeof backend === 'string' ? backend : '';
  });

// The next frame drawn, as a base64 PNG of the clip, read from the canvas inside the render observer.
const canvasFrame = (page: Page, clip: Clip): Promise<string> =>
  page.evaluate(async (area) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const after: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'onAfterRenderObservable') : undefined;
    const addOnce: unknown = after && typeof after === 'object' ? Reflect.get(after, 'addOnce') : undefined;
    if (typeof addOnce !== 'function') throw new Error('no onAfterRenderObservable');
    const canvas = document.getElementById('scene');
    if (!(canvas instanceof HTMLCanvasElement)) throw new Error('no scene canvas');
    const scratch = document.createElement('canvas');
    scratch.width = area.width;
    scratch.height = area.height;
    const ctx = scratch.getContext('2d');
    if (!ctx) throw new Error('no 2d context');
    const box = canvas.getBoundingClientRect();
    const kx = canvas.width / box.width;
    const ky = canvas.height / box.height;
    return new Promise<string>((resolve) => {
      addOnce.call(after, () => {
        ctx.drawImage(
          canvas,
          (area.x - box.left) * kx,
          (area.y - box.top) * ky,
          area.width * kx,
          area.height * ky,
          0,
          0,
          area.width,
          area.height,
        );
        resolve(scratch.toDataURL('image/png').split(',')[1] ?? '');
      });
    });
  }, clip);

const timberVisible = (page: Page, visible: boolean): Promise<void> =>
  page.evaluate((on) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const find: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'getMaterialByName') : undefined;
    const mat: unknown = typeof find === 'function' ? find.call(scene, 'landmark-timber-mat') : undefined;
    const meshes: unknown = scene && typeof scene === 'object' ? Reflect.get(scene, 'meshes') : undefined;
    if (!mat || !Array.isArray(meshes)) throw new Error('no timber material or scene meshes');
    for (const mesh of meshes)
      if (mesh && typeof mesh === 'object' && Reflect.get(mesh, 'material') === mat)
        Reflect.set(mesh, 'isVisible', on);
  }, visible);

const readTimber = async (page: Page, clip: Clip, mode: 'hue' | 'surface'): Promise<TimberRead> => {
  const webgpu = (await backendOf(page)) === 'webgpu';
  let frame: () => Promise<string>;
  if (webgpu) {
    // A WebGPU read is a screenshot, which takes whatever the DOM draws over the clip, so both modes hide the UI.
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.dataset['hideUi'] = '';
      style.textContent = '* { visibility: hidden !important } canvas { visibility: visible !important }';
      document.head.append(style);
    });
    frame = async () => {
      await framesRendered(page, 2);
      return (await page.screenshot({ clip })).toString('base64');
    };
  } else frame = () => canvasFrame(page, clip);
  const shown = await frame();
  let hidden: string | undefined;
  if (mode === 'surface') {
    await timberVisible(page, false);
    // The first frame after the change is the one that draws it; the second is the one read, in case an effect lags.
    if (!webgpu) await frame();
    hidden = await frame();
    await timberVisible(page, true);
  }
  if (webgpu)
    await page.evaluate(() => {
      document.querySelector('style[data-hide-ui]')?.remove();
    });
  const mean = await page.evaluate(
    async ([a, b]) => {
      const load = async (b64: string): Promise<Uint8ClampedArray> => {
        const img = new Image();
        img.src = `data:image/png;base64,${b64}`;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('no 2d context');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      };
      const x = await load(a);
      const y = b ? await load(b) : undefined;
      const sum = [0, 0, 0];
      let n = 0;
      for (let i = 0; i < x.length; i += 4) {
        const r = x[i] ?? 0;
        const g = x[i + 1] ?? 0;
        const bl = x[i + 2] ?? 0;
        const hit = y
          ? Math.abs(r - (y[i] ?? 0)) + Math.abs(g - (y[i + 1] ?? 0)) + Math.abs(bl - (y[i + 2] ?? 0)) > 10
          : r > g * 1.3 && r > bl * 2;
        if (!hit) continue;
        n++;
        sum[0] = (sum[0] ?? 0) + r;
        sum[1] = (sum[1] ?? 0) + g;
        sum[2] = (sum[2] ?? 0) + bl;
      }
      const m: [number, number, number] = [(sum[0] ?? 0) / n, (sum[1] ?? 0) / n, (sum[2] ?? 0) / n];
      return { n, mean: m };
    },
    [shown, hidden] as const,
  );
  return { ...mean, png: shown };
};

const keepShot = (name: string, png: string): void => {
  mkdirSync('test-results', { recursive: true });
  writeFileSync(`test-results/${name}`, Buffer.from(png, 'base64'));
};

const timberMean = async (page: Page, shotName: string): Promise<[number, number, number]> => {
  const got = await readTimber(page, FORT_CLIP, 'hue');
  keepShot(shotName, got.png);
  if (got.n < 2000)
    throw new Error(`only ${String(got.n)} timber-coloured pixels: the forts are not in the clip`);
  return got.mean;
};

const timberSurfaceMean = (page: Page): Promise<TimberRead> => readTimber(page, SURFACE_CLIP, 'surface');

test('a part whose texture failed is drawn as the photograph draws it, within 3% a channel, and near the palette', async ({
  page,
}) => {
  test.slow(
    Boolean(process.env['CI']),
    'five forts loads and ten reads on the CPU in CI take 4.5 to 4.9 minutes of the 7 allowed',
  );
  const loadForts = async (query: string, ready_: string): Promise<void> => {
    await page.goto(`./?debug&quality=high&place=roman-forts&year=84&radius=45${query}`);
    await ready(page);
    await expect(page.locator('.debug')).toContainText(ready_, { timeout: 90_000 });
    await cameraSettled(page);
    await framesRendered(page, 3);
  };
  // Failed: the timber's colour map is aborted, so it is the flat grey in its place.
  await page.route('**/timber-color-1024.webp', (route) => route.abort());
  await loadForts('', 'roman-fort-b=glb:near');
  const blockedHue = await timberMean(page, 'roman-forts-84-timber-map-failed.png');
  const failed = await timberSurfaceMean(page);

  // The same framing with the photograph: a failed map must leave the timber where the photograph does.
  await page.unroute('**/timber-color-1024.webp');
  await loadForts('', 'roman-fort-b=glb:near');
  const photo = await timberSurfaceMean(page);
  expect(failed.n, 'timber pixels with the map failed').toBeGreaterThan(1000);
  expect(photo.n, 'timber pixels with the photograph').toBeGreaterThan(1000);
  // The photograph averages mid-grey, so the two agree to under 1% on both GPU and SwiftShader; a fallback
  // grey 20% off moves red by about 8% and 6%.
  for (const i of [0, 1, 2]) {
    const want = photo.mean[i] ?? 0;
    expect(
      Math.abs((failed.mean[i] ?? 0) - want) / want,
      `channel ${String(i)}: failed ${failed.mean.map((v) => v.toFixed(1)).join('/')} vs photograph ${photo.mean.map((v) => v.toFixed(1)).join('/')}`,
    ).toBeLessThanOrEqual(0.03);
  }

  // A loose check against the plans drawn from their palette (different geometry, so a wide margin): the
  // colour a failed part should also be near, and not black.
  await loadForts('&models=off', 'roman-fort-b=procedural:near');
  const palette = await timberMean(page, 'roman-forts-84-models-off.png');
  for (const i of [0, 1, 2]) {
    const want = palette[i] ?? 0;
    expect(
      Math.abs((blockedHue[i] ?? 0) - want),
      `channel ${String(i)}: blocked ${blockedHue.join('/')} vs palette ${palette.join('/')}`,
    ).toBeLessThanOrEqual(Math.max(want * 0.15, 4));
  }
});

// The card must not list detail that is not drawn: with the plans on screen it says so instead.
async function expectNoKitsOnCard(page: Page): Promise<void> {
  const card = page.locator('.moment-parts');
  await card.locator('summary').first().click();
  const tower = card.locator('details[data-part="fort2/gate-ne/tower-left"]');
  await tower.locator('summary').click();
  await expect(tower.locator('[data-kit]')).toHaveCount(0);
  await expect(tower.locator('.moment-kits-off')).toContainText('simplified model is on screen');
}

test('with ?models=off, and at Low, the forts are drawn from their plans as before, and their card lists no model detail', async ({
  page,
}) => {
  await page.goto('./?debug&quality=high&models=off&place=roman-forts&year=84&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('roman-fort-b=procedural:near');
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 3, far: 0 });
  expect(await modelParts(page, 'roman-fort-b')).toEqual([]);
  await expectNoKitsOnCard(page);
  await page.goto('./?debug&quality=low&place=roman-forts&year=84&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('roman-fort-b=procedural:near');
  expect(await modelParts(page, 'roman-fort-b')).toEqual([]);
  await expectNoKitsOnCard(page);
});

test('switching to Low mid-session brings the procedural forts back and takes the model detail off an open card, leaving the open part open', async ({
  page,
}) => {
  await page.goto('./?debug&quality=high&place=roman-forts&year=84&radius=45');
  await ready(page);
  const debug = page.locator('.debug');
  await expect(debug).toContainText('roman-fort-b=glb:near', { timeout: 90_000 });
  const card = page.locator('.moment-parts');
  await card.locator('summary').first().click();
  const tower = card.locator('details[data-part="fort2/gate-ne/tower-left"]');
  await tower.locator('summary').click();
  await expect(tower.locator('[data-kit]').first()).toBeVisible();
  await expect(tower.locator('.moment-kits h5')).toContainText('close-up model');
  const graphics = page.getByRole('group', { name: 'Graphics' });
  await graphics.getByRole('button', { name: 'Low' }).click();
  await expect(debug).toContainText('roman-fort-b=procedural:near');
  await expect.poll(() => drawnPlans(page)).toEqual({ near: 3, far: 0 });
  await expect(tower).toHaveJSProperty('open', true);
  await expect(card.first()).toHaveJSProperty('open', true);
  await expect(tower.locator('[data-kit]')).toHaveCount(0);
  await expect(tower.locator('.moment-kits-off')).toContainText('simplified model is on screen');
  await graphics.getByRole('button', { name: 'High' }).click();
  await expect(debug).toContainText('quality high');
  // Coming back to High loads the models and their textures again, which at CI's ~1fps takes as long as the first load.
  await expect(debug).toContainText('roman-fort-b=glb:near', { timeout: 90_000 });
  await expect(tower).toHaveJSProperty('open', true);
  await expect(tower.locator('[data-kit="post-tower-six"]')).toBeVisible();
});

test('the Roman forts are there from AD 74 and gone by AD 140, and nothing of them stands in between the years the sources rule out', async ({
  page,
}) => {
  await page.goto('./?debug&place=roman-forts&year=74&radius=45');
  await ready(page);
  await expect.poll(() => presenceOf(page, 'roman-fort-a')).toBe(1);
  expect(await presenceOf(page, 'roman-fort-b')).toBeUndefined();
  await page.screenshot({ path: 'test-results/roman-forts-74.png' });
  await page.goto('./?debug&place=roman-forts&year=140&radius=45');
  await ready(page);
  await expect(page.locator('.debug')).toContainText('year AD 140');
  await expect(page.locator('.debug')).not.toContainText(/features \d+:[^\n]*roman-(fort-|vicus)/);
  expect(await drawnPlans(page)).toEqual({ near: 0, far: 0 });
  await page.screenshot({ path: 'test-results/roman-forts-140.png' });
});

test('the first Roman key date lists what is drawn, part by part, and each part says how it is known, in both languages, with the credit', async ({
  page,
}) => {
  await page.goto('./?year=74&place=roman-forts&radius=45');
  await ready(page);
  await expect(page.locator('.moment h2')).toHaveText('Rome builds forts at Dinefwr');
  const parts = page.locator('.moment-parts');
  await expect(parts.locator('summary')).toHaveText('What is drawn here, part by part');
  await parts.locator('summary').click();
  await expect(parts.locator('h3').first()).toHaveText('The larger Roman fort (Fort 1)');
  await expect(parts.locator('h4.tier-documented').first()).toContainText('Documented');
  await expect(parts.locator('h4.tier-reconstructed').first()).toContainText('Reconstructed');
  await expect(parts.locator('h4.tier-imagined').first()).toContainText('Imagined');
  const gate = parts.locator('details[data-part="fort1/gate-sw/tower-right"]');
  await gate.locator('summary').click();
  await expect(gate).toContainText('six-post gate tower');
  await expect(gate).toContainText('Hughes');
  await page.screenshot({ path: 'test-results/roman-forts-parts.png' });
  await page.locator('.moment > .prov-wrap .prov').click();
  await expect(page.locator('.moment > .prov-wrap .prov-pop')).toContainText('Neil Ludlow');
  await page.keyboard.press('Escape');
  await page.mouse.move(900, 200);
  await page.getByRole('button', { name: 'Cymraeg', exact: true }).click();
  await expect(page.locator('.moment-parts summary')).toHaveText(
    'Beth sy’n cael ei dynnu yma, rhan wrth ran',
  );
  await page.locator('.moment-parts summary').click();
  await expect(page.locator('.moment-parts h3').first()).toHaveText('Y gaer Rufeinig fwyaf (Caer 1)');
});

test('at AD 110 the card lists what is drawn then, Fort 2 with its rear gate shown as unproven and not Fort 1, which has gone', async ({
  page,
}) => {
  await page.goto('./?year=110&place=roman-forts&radius=45');
  await ready(page);
  await expect(page.locator('.moment h2')).toHaveText('Rome builds forts at Dinefwr');
  const parts = page.locator('.moment-parts');
  await parts.locator('summary').click();
  await expect(parts.locator('h3')).toHaveText([
    'The smaller Roman fort (Fort 2)',
    'Fort 1’s ditches, backfilled',
    'The civilian settlement (vicus)',
  ]);
  await expect(parts.locator('details[data-part^="fort1/"]')).toHaveCount(0);
  const rear = parts.locator('details[data-part="fort2/gate-sw/passage"]');
  await rear.locator('summary').click();
  await expect(rear).toContainText('not demonstrated');
  await page.screenshot({ path: 'test-results/roman-forts-parts-110.png' });
});
