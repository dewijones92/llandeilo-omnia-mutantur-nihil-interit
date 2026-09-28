import { expect, test } from '@playwright/test';

test('the valley loads and the slider moves through time', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
  const slider = page.getByRole('slider');
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
  const slider = page.getByRole('slider');
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
  await expect(page.getByRole('slider')).toHaveAttribute('aria-label', 'Llinell amser');
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
