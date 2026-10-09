#!/usr/bin/env node
// Screenshots a scene at several years and, with --perf, measures frames on this machine's GPU:
// idle, orbiting the camera, and scrubbing the slider, plus the app's own "dewidebug apply cost" lines.
//   node tools/frames.mjs <base url> <out dir> [--perf] [--uncapped]
// Env: YEARS=1282,1903  HOUR=23  SEASON=winter  PLACES=overview,llandeilo  EXTRA='&quality=low'
//      DEBUG=1 (show the ?debug overlay in the shots)  PERF_YEAR=1903 (which year to measure)
//      PERF_PLACE=overview (which place to measure: overview or a place id, e.g. llandeilo)
// --uncapped turns vsync and the frame-rate limit off, so idle fps shows the real frame cost
// rather than the display's 60Hz.
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import { formatFrameStats, measureFrames, measureScrub } from './frame-timing.ts';

const [base, outdir, ...flags] = process.argv.slice(2);
if (!base || !outdir)
  throw new Error('usage: node tools/frames.mjs <base url> <out dir> [--perf] [--uncapped]');
const perf = flags.includes('--perf');
const uncapped = flags.includes('--uncapped');
mkdirSync(outdir, { recursive: true });
const local = `${process.env.HOME}/.cache/ms-playwright/chromium-1169/chrome-linux/chrome`;
const browser = await chromium.launch({
  executablePath: existsSync(local) ? local : undefined,
  args: [
    '--use-angle=gl',
    '--ignore-gpu-blocklist',
    ...(uncapped ? ['--disable-gpu-vsync', '--disable-frame-rate-limit'] : []),
  ],
  env: { ...process.env, GALLIUM_DRIVER: 'd3d12', MESA_D3D12_DEFAULT_ADAPTER_NAME: 'NVIDIA' },
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const costs = [];
page.on('console', (m) => {
  if (m.text().includes('dewidebug apply cost')) costs.push(m.text());
});
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));

const list = (v, d) => (v ?? d).split(',');
const years = list(process.env.YEARS, '1282,1880,1903,1942,2000');
const places = list(process.env.PLACES, 'overview,llandeilo');
const hour = process.env.HOUR ?? '23';
const season = process.env.SEASON ?? 'winter';
const extra = process.env.EXTRA ?? '';
const debug = process.env.DEBUG === '1' || perf;

for (const place of places)
  for (const y of years) {
    const where = place === 'overview' ? '' : `&place=${place}`;
    const url = `${base}?webgl${debug ? '&debug' : ''}&year=${y}&hour=${hour}&season=${season}${where}${extra}`;
    await page.goto(url);
    await page.waitForFunction(() => document.body.dataset.ready !== undefined, null, { timeout: 150_000 });
    await page.waitForTimeout(Number(process.env.SETTLE ?? 2500));
    const out = `${outdir}/${place}-${y}-${season}-${hour}h.png`;
    await page.screenshot({ path: out });
    console.log(`dewidebug frames shot ${out}`);
    if (!perf || place !== (process.env.PERF_PLACE ?? 'overview') || y !== (process.env.PERF_YEAR ?? '1903'))
      continue;
    await page.waitForTimeout(3000);
    console.log(`dewidebug frames idle ${formatFrameStats(await measureFrames(page, 6000, false))}`);
    console.log(`dewidebug frames orbit ${formatFrameStats(await measureFrames(page, 6000, true))}`);
    costs.length = 0;
    console.log(`dewidebug frames scrub ${formatFrameStats(await measureScrub(page, 8000))}`);
    console.log(costs.join('\n'));
  }
await browser.close();
