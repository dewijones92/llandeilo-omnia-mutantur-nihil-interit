import { expect, test, type Page } from '@playwright/test';
import { EVENTS } from '../src/content/events.ts';
import { TIMELINE } from '../src/content/timeline.ts';
import { toWorld } from '../src/domain/geo.ts';
import { keySteps, stepFrom } from '../src/domain/steps.ts';
import { tAt } from '../src/domain/timeline.ts';

test('the valley loads and the slider moves through time', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  await page.getByRole('button', { name: 'Cymraeg' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'cy');
  await expect(page.locator('.tl-era')).toHaveText('Yr Oesoedd Canol');
});

test('a conversation opens from its bubble and lists its lines', async ({ page }) => {
  await page.goto('./?place=llandeilo&year=1282&radius=200');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  const bubble = page.locator('.bubble').filter({ visible: true });
  await expect(bubble).toBeVisible();
  await bubble.click();
  const panel = page.locator('.convo');
  await expect(panel).toBeVisible();
  await expect(panel.locator('h2')).toHaveText('News of the ambush');
  await expect(panel.locator('.line')).toHaveCount(6);
  await expect(panel.locator('.prov-imagined')).toBeVisible();
  await expect(panel.locator('.line-quote')).toContainText('Peryf ap Cedifor');
  await page.screenshot({ path: 'test-results/conversation-1282.png' });
});

test('the almanac, language and sound controls work for the chosen year', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?year=1843');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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

test('arrow keys move the slider without snapping back to a key date', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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

test('the 3D view receives the mouse through the overlay layers', async ({ page }) => {
  await page.goto('./?year=1282');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  const target = await page.evaluate(
    () => document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.id ?? '',
  );
  expect(target).toBe('scene');
});

test('a place label flies the camera in and offers the whole valley back', async ({ page }) => {
  await page.goto('./?year=1282');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  await page.locator('.label', { hasText: 'Talyllychau' }).click();
  const home = page.getByRole('button', { name: 'Whole valley' });
  await expect(home).toBeVisible();
  await home.click();
  await expect(home).toBeHidden();
});

test('a provenance badge explains itself and lists its sources', async ({ page }) => {
  await page.goto('./?year=1282');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  await page.getByRole('button', { name: 'Cymraeg' }).click();
  await expect(page.locator('.moment h2')).toHaveText('Brwydr Llandeilo Fawr');
  await expect(page.locator('.label').first()).toHaveAttribute('title', /^Ymweld /);
  await expect(page.getByRole('slider', { name: /Timeline|Llinell amser/ })).toHaveAttribute(
    'aria-label',
    'Llinell amser',
  );
});

test('Next and Previous step through key dates and fly the camera there', async ({ page }) => {
  await page.goto('./?year=1282');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  await page.goto('./?year=1282');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  const compass = page.locator('.compass');
  const box = await page.locator('#scene').boundingBox();
  if (!box) throw new Error('no canvas');
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.3);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.3, { steps: 6 });
  await page.mouse.up();
  await expect.poll(async () => Number(await compass.getAttribute('data-bearing'))).toBeGreaterThan(10);
  await compass.click();
  await expect(compass).toHaveAttribute('data-bearing', '0', { timeout: 60_000 });
});

test('tapping the train makes the camera follow it until you stop', async ({ page }) => {
  await page.goto('./?debug&year=1860');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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
  const chip = page.locator('.follow-chip');
  await expect(chip).toBeVisible({ timeout: 30_000 });
  await expect(chip).toContainText('A Llanelly Railway train');
  await page.evaluate(() => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
    const camera: unknown =
      scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
    if (camera && typeof camera === 'object') Reflect.set(camera, 'lockedTarget', null);
  });
  const first = await cameraTarget(page);
  await page.waitForTimeout(3000);
  const later = await cameraTarget(page);
  expect(Math.hypot(later.x - first.x, later.z - first.z)).toBeGreaterThan(5);
  await chip.getByRole('button', { name: 'Stop' }).click();
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
    await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
    await expect(page.locator('.desktop-banner')).toHaveCount(0);
  });
});

test('no desktop banner on a desktop', async ({ page }) => {
  await page.goto('./?year=1282');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  await expect(page.locator('.desktop-banner')).toHaveCount(0);
});

test('time of day and season controls relight the valley, in both languages', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./?year=1282&hour=12&season=summer&debug');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
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

test('the day passes on its own when asked, and stops when the slider is moved', async ({ page }) => {
  await page.goto('./?year=1880&hour=10');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  const play = page.getByRole('button', { name: 'Let the day pass' });
  await play.click();
  await expect(play).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sky-readout')).not.toHaveText('Morning 10:00');
  await page.getByRole('slider', { name: 'Time of day' }).fill('6');
  await expect(play).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.sky-readout')).toHaveText('Morning 06:00');
});
