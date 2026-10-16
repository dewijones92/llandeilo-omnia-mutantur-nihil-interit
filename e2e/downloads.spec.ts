import { readFileSync } from 'node:fs';
import type { Page } from '@playwright/test';
import { expect, ready, test } from './ready.ts';
import { buildDownloads, formatBytes } from '../src/content/downloads.ts';
import { LIDAR_CREDIT } from '../src/content/generated/lidar-credit.ts';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { readAssetBlock } from '../tools/downloads/stamp.ts';
import { readGlb } from '../tools/models/glb.ts';

const downloads = buildDownloads(WORLD_CONTENT.features);
const byFile = (file: string): (typeof downloads)[number] => {
  const d = downloads.find((x) => x.file === file);
  if (!d) throw new Error(`${file} is not in the Downloads list`);
  return d;
};

const FORT_1 = 'models/landmarks/roman-fort-a.near.glb';
const FORT_2 = 'models/landmarks/roman-fort-b.near.glb';
const VICUS = 'models/landmarks/roman-vicus.near.glb';
const TRAIN = 'models/llanelly-train.glb';
const TILE = 'models/terrain/lidar-262000-222000.glb';

const WORDS = {
  en: {
    about: 'About',
    link: 'Download the models and the terrain',
    tab: 'Downloads',
    licence: 'Credit and licence',
    download: 'Download .glb',
  },
  cy: {
    about: 'Ynghylch',
    link: 'Lawrlwytho’r modelau a’r tir',
    tab: 'Lawrlwythiadau',
    licence: 'Cydnabyddiaeth a thrwydded',
    download: 'Lawrlwytho .glb',
  },
} as const;

async function openDownloads(page: Page, lang: 'en' | 'cy'): Promise<void> {
  const w = WORDS[lang];
  await page.goto(`./?year=1282&lang=${lang}`);
  await ready(page);
  await page.getByRole('button', { name: w.about, exact: true }).click();
  await page.getByRole('button', { name: w.link }).click();
  await expect(page.getByRole('tab', { name: w.tab })).toHaveAttribute('aria-selected', 'true');
}

for (const lang of ['en', 'cy'] as const) {
  test(`the Downloads section opens from About and lists the forts’ models and a terrain tile with their credit and licence, in ${lang === 'en' ? 'English' : 'Welsh'}`, async ({
    page,
  }) => {
    await openDownloads(page, lang);
    const w = WORDS[lang];
    const panel = page.locator('.info');
    await expect(panel.locator('.dl')).toHaveCount(downloads.length);
    for (const file of [FORT_1, FORT_2, VICUS, TRAIN, TILE]) {
      const d = byFile(file);
      const row = panel.locator(`.dl[data-file="${file}"]`);
      await expect(row, file).toHaveCount(1);
      await expect(row.locator('.dl-name'), file).toHaveText(d.name[lang]);
      await expect(row.locator('.dl-what'), file).toHaveText(d.what[lang]);
      await expect(row.locator('.dl-facts'), file).toContainText(formatBytes(d.bytes, lang));
      await expect(row.locator('.dl-link'), file).toHaveAttribute('href', new RegExp(`${file}$`));
      await expect(row.locator('.dl-link'), file).toHaveText(w.download);
      await expect(row.locator('.dl-credit summary'), file).toHaveText(w.licence);
      await expect(row.locator('.dl-credit'), file).toContainText(d.asset.licence);
      await expect(row.locator('.dl-credit'), file).toContainText(d.asset.source);
    }
    const tile = panel.locator(`.dl[data-file="${TILE}"]`);
    await expect(tile.locator('.dl-name')).toContainText('SN 62000 22000');
    await expect(tile.locator('.dl-name')).toContainText(lang === 'en' ? 'Llandeilo town' : 'Tref Llandeilo');
    await expect(tile.locator('.dl-facts')).toContainText('262000 E, 222000 N');
    await expect(tile.locator('.dl-credit')).toContainText(LIDAR_CREDIT);
    await expect(tile.locator('.dl-credit')).toContainText('Open Government Licence v3.0');
    await expect(panel.locator('#dl-terrain .dl-attribution')).toContainText(LIDAR_CREDIT);
    await expect(panel.locator(`.dl[data-file="${FORT_1}"] .prov`).first()).toBeVisible();
    await panel.locator(`.dl[data-file="${FORT_1}"]`).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/downloads-models-${lang}.png` });
    await tile.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/downloads-terrain-${lang}.png` });
  });
}

test('a Downloads link downloads a valid glb that carries its own credit and licence, a model and a terrain tile', async ({
  page,
}) => {
  await openDownloads(page, 'en');
  for (const file of [FORT_1, TILE]) {
    const d = byFile(file);
    const row = page.locator(`.info .dl[data-file="${file}"]`);
    await row.scrollIntoViewIfNeeded();
    const started = page.waitForEvent('download');
    await row.locator('.dl-link').click();
    const download = await started;
    expect(download.suggestedFilename(), file).toBe(file.split('/').pop());
    const path = await download.path();
    const bytes = readFileSync(path);
    expect(bytes.subarray(0, 4).toString('latin1'), `${file} magic`).toBe('glTF');
    expect(bytes.readUInt32LE(4), `${file} version`).toBe(2);
    expect(bytes.byteLength, `${file} size`).toBe(d.bytes);
    expect(bytes.readUInt32LE(8), `${file} length field`).toBe(bytes.byteLength);
    const block = readAssetBlock(readGlb(new Uint8Array(bytes)));
    expect(block.copyright, `${file} copyright`).toBe(d.asset.source);
    expect(JSON.stringify(block.extras), `${file} extras`).toContain(
      JSON.stringify(d.asset.licence).slice(1, -1),
    );
  }
});

test('the Downloads tab is reached with the arrow keys, and moving through time leaves its scroll and its open credit as they were', async ({
  page,
}) => {
  await openDownloads(page, 'en');
  const panel = page.locator('.info');
  await page.getByRole('tab', { name: 'About' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Downloads' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Almanac' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: 'Downloads' })).toHaveAttribute('aria-selected', 'true');
  await panel.locator(`.dl[data-file="${TILE}"]`).scrollIntoViewIfNeeded();
  await panel.locator(`.dl[data-file="${TILE}"] .dl-credit summary`).click();
  await expect(panel.locator(`.dl[data-file="${TILE}"] .dl-credit`)).toHaveAttribute('open', '');
  const before = await panel.evaluate((el) => el.scrollTop);
  expect(before).toBeGreaterThan(0);
  const slider = page.getByRole('slider', { name: /Timeline/ });
  await slider.focus();
  await page.keyboard.press('End');
  await expect(page.locator('.tl-year')).toHaveText('2026');
  await expect(panel.locator('.dl')).toHaveCount(downloads.length);
  expect(await panel.evaluate((el) => el.scrollTop)).toBe(before);
  await expect(panel.locator(`.dl[data-file="${TILE}"] .dl-credit`)).toHaveAttribute('open', '');
});
