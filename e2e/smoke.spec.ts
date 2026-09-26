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
