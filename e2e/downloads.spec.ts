import { readFileSync } from 'node:fs';
import type { Page } from '@playwright/test';
import { expect, ready, test } from './ready.ts';
import { RELEASE_DOWNLOAD_URL } from '../src/content/assets.ts';
import { buildDownloads, formatBytes } from '../src/content/downloads.ts';
import { TERRAIN_TILES } from '../src/content/generated/terrain-tiles.ts';
import { LIDAR_CREDIT } from '../src/content/generated/lidar-credit.ts';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { readAssetBlock, readSceneBlock } from '../tools/downloads/stamp.ts';
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
const TILE = 'lidar-262000-222000.glb';
const OGL = 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/';

const WORDS = {
  en: {
    about: 'About',
    link: 'Download the models and the terrain',
    tab: 'Downloads',
    licence: 'Credit and licence',
    download: 'Download .glb',
    source: 'Source page',
    failed: 'The list of downloads could not be built. The rest of the app is unaffected.',
  },
  cy: {
    about: 'Ynghylch',
    link: 'Lawrlwytho’r modelau a’r tir',
    tab: 'Lawrlwythiadau',
    licence: 'Cydnabyddiaeth a thrwydded',
    download: 'Lawrlwytho .glb',
    source: 'Tudalen y ffynhonnell',
    failed: 'Ni ellid llunio’r rhestr lawrlwytho. Nid yw gweddill yr ap wedi’i effeithio.',
  },
} as const;

async function openApp(page: Page, lang: 'en' | 'cy'): Promise<void> {
  await page.goto(`./?year=1282&lang=${lang}`);
  await ready(page);
}

async function openDownloads(page: Page, lang: 'en' | 'cy'): Promise<void> {
  const w = WORDS[lang];
  await openApp(page, lang);
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
      await expect(row.locator('.dl-link'), file).toHaveAttribute(
        'href',
        d.releaseUrl ?? new RegExp(`/${file.replaceAll('.', '\\.')}$`),
      );
      await expect(row.locator('.dl-link'), file).toHaveAttribute('download', '');
      await expect(row.locator('.dl-link'), file).toHaveText(w.download);
      await expect(row.locator('.dl-credit summary'), file).toHaveText(w.licence);
      await expect(row.locator('.dl-credit'), file).toContainText(d.asset.licence);
      await expect(row.locator('.dl-credit'), file).toContainText(d.asset.source);
    }
    const tile = panel.locator(`.dl[data-file="${TILE}"]`);
    await expect(tile.locator('.dl-name')).toContainText('SN 62000 22000');
    await expect(tile.locator('.dl-name')).toContainText(lang === 'en' ? 'Llandeilo town' : 'Tref Llandeilo');
    await expect(tile.locator('.dl-facts')).toContainText(
      lang === 'en' ? '262000 E, 222000 N' : '262000 D, 222000 G',
    );
    await expect(tile.locator('.dl-credit')).toContainText(LIDAR_CREDIT);
    await expect(tile.locator('.dl-credit')).toContainText('Open Government Licence v3.0');
    await expect(tile.locator('.dl-credit a').first(), 'the licence links to its own text').toHaveAttribute(
      'href',
      OGL,
    );
    await expect(tile.locator('.dl-source')).toHaveText(w.source);
    await expect(
      tile.locator('.dl-link'),
      'a terrain tile is fetched from the latest release',
    ).toHaveAttribute('href', `${RELEASE_DOWNLOAD_URL}/${TILE}`);
    await expect(tile.locator('.dl-facts')).toContainText(formatBytes(byFile(TILE).bytes, lang));
    await expect(panel.locator('#dl-terrain .dl-note').first()).toContainText(
      lang === 'en' ? 'attached to each release on GitHub' : 'ynghlwm wrth bob datganiad ar GitHub',
    );
    await expect(panel.locator('#dl-terrain .dl-attribution')).toContainText(LIDAR_CREDIT);
    const fort = panel.locator(`.dl[data-file="${FORT_1}"]`);
    const tiers = byFile(FORT_1).tiers;
    if (!tiers) throw new Error('the fort’s model has no part tiers');
    await expect(fort.locator('.dl-tier[data-tier="reconstructed"]')).toContainText(
      String(tiers.reconstructed),
    );
    await expect(fort.locator('.dl-tier[data-tier="imagined"]')).toContainText(String(tiers.imagined));
    await expect(fort.locator('.dl-tier[data-tier="reconstructed"] .prov').first()).toBeVisible();
    await expect(
      fort.locator('.prov-wrap'),
      'a model is labelled by its parts, not badged by its site',
    ).toHaveCount(0);
    await expect(panel.locator(`.dl[data-file="${TRAIN}"] .prov-wrap`)).toHaveCount(1);
    for (const credit of await panel.locator('.dl-credit p').allTextContents())
      expect(credit, 'no double full stop in a credit').not.toMatch(/\.\./);
    await panel.locator(`.dl[data-file="${FORT_1}"]`).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/downloads-models-${lang}.png` });
    await panel.locator('#dl-terrain h3').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/downloads-terrain-note-${lang}.png` });
    await tile.scrollIntoViewIfNeeded();
    await tile.locator('.dl-credit summary').click();
    await expect(tile.locator('.dl-credit')).toHaveAttribute('open', '');
    await tile.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/downloads-terrain-${lang}.png` });
  });
}

test('a model’s Downloads link downloads a valid glb that carries its own credit, licence and placement', async ({
  page,
}) => {
  await openDownloads(page, 'en');
  for (const file of [FORT_1, TRAIN]) {
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
    const glb = readGlb(new Uint8Array(bytes));
    const block = readAssetBlock(glb);
    expect(block.copyright, `${file} copyright`).toBe(d.asset.source);
    expect(JSON.stringify(block.extras), `${file} extras`).toContain(
      JSON.stringify(d.asset.licence).slice(1, -1),
    );
    const scene = readSceneBlock(glb);
    expect(scene['credit'], `${file} scene credit`).toBe(d.asset.source);
    expect(scene['licence'], `${file} scene licence`).toBe(d.asset.licence);
    if (file === FORT_1) expect(scene['placement'], `${file} placement`).toBeDefined();
  }
});

test('every terrain tile in the manifest is listed with a link to the latest release’s asset of that name and the size the tool wrote', async ({
  page,
}) => {
  await openDownloads(page, 'en');
  const rows = page.locator('#dl-terrain .dl');
  await expect(rows).toHaveCount(TERRAIN_TILES.length);
  expect(TERRAIN_TILES.length, 'the three 2m areas’ tiles').toBeGreaterThanOrEqual(29);
  for (const tile of TERRAIN_TILES) {
    const row = page.locator(`#dl-terrain .dl[data-file="${tile.file}"]`);
    await expect(row, tile.file).toHaveCount(1);
    await expect(row.locator('.dl-link'), tile.file).toHaveAttribute(
      'href',
      `https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/releases/latest/download/lidar-${String(tile.e)}-${String(tile.n)}.glb`,
    );
    await expect(row.locator('.dl-facts'), tile.file).toContainText(formatBytes(tile.bytes, 'en'));
    await expect(row.locator('.dl-credit'), tile.file).toContainText(LIDAR_CREDIT);
  }
  await expect(page.locator('#dl-terrain .dl[data-file^="lidar-26"]')).toHaveCount(TERRAIN_TILES.length);
});

test('the downloads list is built when its tab is first opened, and once, not when the app starts', async ({
  page,
}) => {
  const built: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug downloads list built')) built.push(m.text());
  });
  await openApp(page, 'en');
  await page.getByRole('button', { name: 'About', exact: true }).click();
  await expect(page.getByRole('tab', { name: 'About' })).toHaveAttribute('aria-selected', 'true');
  expect(built, 'nothing is built while the list is not shown').toEqual([]);
  await page.getByRole('button', { name: WORDS.en.link }).click();
  await expect(page.locator('.info .dl')).toHaveCount(downloads.length);
  await page.getByRole('tab', { name: 'Almanac' }).click();
  await page.getByRole('tab', { name: 'Downloads' }).click();
  await expect(page.locator('.info .dl')).toHaveCount(downloads.length);
  expect(built).toEqual([`dewidebug downloads list built rows=${String(downloads.length)}`]);
});

test('a gap in the downloads’ data costs the Downloads tab an error line and the rest of the app nothing', async ({
  page,
}) => {
  const marker = '"dinefwr-castle":{en:`';
  let patched = 0;
  await page.route('**/assets/*.js', async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (body.split(marker).length === 2) {
      patched++;
      await route.fulfill({ response, body: body.replace(marker, '"dinefwr-castle-gone":{en:`') });
    } else await route.fulfill({ response });
  });
  const failed: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug downloads list failed')) failed.push(m.text());
  });
  page.on('pageerror', (e) => pageErrors.push(e.message));
  await openApp(page, 'en');
  expect(patched, 'the area’s name was taken out of the bundle once').toBe(1);
  expect(failed, 'a gap does not touch start-up').toEqual([]);
  await page.getByRole('button', { name: 'About', exact: true }).click();
  await page.getByRole('button', { name: WORDS.en.link }).click();
  await expect(page.locator('.info .dl-error')).toHaveText(WORDS.en.failed);
  await expect(page.locator('.info .dl')).toHaveCount(0);
  expect(failed.length, 'the failure is logged, with its cause').toBeGreaterThan(0);
  await page.getByRole('tab', { name: 'Almanac' }).click();
  await expect(page.getByRole('tab', { name: 'Almanac' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.info .dl-error')).toHaveCount(0);
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true');
  expect(pageErrors).toEqual([]);
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
