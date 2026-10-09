#!/usr/bin/env node
import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';

// Screenshots of the photo layer: a pin in the scene at 1900, and an open photograph, in English and Welsh.
// Usage: node tools/photo-shots.mjs <base url, ending in /> <out dir> [photo id]
const [base, out, photo = 'harries-2282291'] = process.argv.slice(2);
const local = `${process.env.HOME}/.cache/ms-playwright/chromium-1169/chrome-linux/chrome`;
const gpu = process.env.SHOT_GPU !== '0' && existsSync('/dev/dxg');
const browser = await chromium.launch({
  executablePath: existsSync(local) ? local : undefined,
  args: gpu
    ? ['--use-angle=gl', '--ignore-gpu-blocklist']
    : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  ...(gpu
    ? { env: { ...process.env, GALLIUM_DRIVER: 'd3d12', MESA_D3D12_DEFAULT_ADAPTER_NAME: 'NVIDIA' } }
    : {}),
});
for (const lang of ['en', 'cy']) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
  await page.goto(`${base}?lang=${lang}&photos=1&year=1900&place=llandeilo&radius=140`);
  await page.waitForFunction(() => document.body.dataset.ready !== undefined, null, { timeout: 120000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${out}/pin-1900-${lang}.png` });
  const pin = page.locator(`.pin[data-photo="${photo}"]`);
  const pins = await page.locator('.pin').filter({ visible: true }).count();
  console.log(
    `dewidebug photo-shots ${lang} visible pins=${pins} wanted ${photo} visible=${await pin.isVisible()}`,
  );
  await ((await pin.isVisible()) ? pin : page.locator('.pin').filter({ visible: true }).first()).click();
  await page.locator('.photo').waitFor({ state: 'visible' });
  await page.locator('.photo-img').evaluate((img) => img.decode());
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/photo-open-${lang}.png` });
  await page.locator('.photo .prov').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/photo-sure-${lang}.png` });
  await page.close();
}
await browser.close();
