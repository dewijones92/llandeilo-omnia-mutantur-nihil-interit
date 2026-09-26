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
  await info.getByRole('button', { name: 'Language' }).click();
  await expect(info).toContainText('84.9%');
  const sound = page.getByRole('button', { name: 'Sound off' });
  await sound.click();
  await expect(page.getByRole('button', { name: 'Sound on' })).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});
