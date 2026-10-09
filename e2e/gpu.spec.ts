// Runs only under playwright.gpu.config.ts (tools/gpu/run.sh): Windows Chrome on the real GPU, at the
// default High graphics. It fails on a WebGPU error or a page that never gets ready; frame rates are
// recorded in test-results-gpu/, not asserted.
import { expect, test, type Page } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { formatFrameStats, measureFrames, measureScrub } from '../tools/frame-timing.ts';
import { FRAMES_FILE, WEBGPU_FILE, type FramesResult, type WebGpuResult } from '../tools/gpu/results.ts';

const OUT = process.env['GPU_RESULTS_DIR'] ?? 'test-results-gpu';
const SHOT_YEARS = [-300, 1282, 1843, 1942, 2026];
// The year, hour and season tools/frames.mjs has measured since 2026-10-02, so numbers compare.
const PERF = '?debug&year=1903&hour=23&season=winter';
const UNCAPPED = process.env['GPU_UNCAPPED'] === '1';

const save = (name: string, data: unknown): void => {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, name), `${JSON.stringify(data, null, 2)}\n`);
};

// Anything the browser or Babylon says about WebGPU going wrong, plus uncaught page errors.
function gpuErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    const text = m.text();
    const gpuish = /webgpu|wgsl|GPUValidationError|device (was )?lost|uncaptured/i.test(text);
    if (
      (m.type() === 'error' && gpuish) ||
      text.includes('webgpu init failed') ||
      text.includes('app failed')
    )
      errors.push(`console.${m.type()}: ${text}`);
  });
  return errors;
}

async function ready(page: Page): Promise<void> {
  await page.waitForFunction(() => document.body.dataset['ready'] !== undefined, null, { timeout: 150_000 });
  expect(await page.locator('body').getAttribute('data-ready')).toBe('true');
}

const debugField = (page: Page, key: string): Promise<string> =>
  page.evaluate((k) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    return debug && typeof debug === 'object' ? String(Reflect.get(debug, k)) : 'no ?debug hook';
  }, key);

const overlayLine = async (page: Page, prefix: string): Promise<string> =>
  ((await page.locator('.debug').textContent()) ?? '').split('\n').find((l) => l.startsWith(prefix)) ?? '';

test('the valley runs on WebGPU on the real GPU, with no WebGPU errors', async ({ page }) => {
  const errors = gpuErrors(page);
  await page.goto('./?debug');
  await ready(page);
  const result: WebGpuResult = {
    backend: await debugField(page, 'backend'),
    gpu: await debugField(page, 'gpu'),
    userAgent: await page.evaluate(() => navigator.userAgent),
    errors,
  };
  console.log(`dewidebug gpu engine backend=${result.backend} gpu=${result.gpu}`);
  save(WEBGPU_FILE, result);
  await page.screenshot({ path: join(OUT, 'webgpu-default.png') });
  expect(await overlayLine(page, 'backend ')).toContain('backend webgpu');
  expect(result.backend).toBe('webgpu');
  expect(errors).toEqual([]);
});

test.describe('frame timings at 1920x1080', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  // --uncapped launches a browser of its own with vsync and the frame-rate limit off, for this test only:
  // left on for the page loads after it, the uncapped run of 2026-10-09 stalled with a page stuck loading.
  test('frame timings at High on the overview: idle, orbiting and scrubbing', async ({
    page: shared,
    playwright,
    channel,
    headless,
    baseURL,
  }) => {
    const own = UNCAPPED
      ? await playwright.chromium.launch({
          ...(channel ? { channel } : {}),
          headless,
          args: ['--disable-gpu-vsync', '--disable-frame-rate-limit'],
        })
      : undefined;
    const page = own
      ? await own.newPage({ ...(baseURL ? { baseURL } : {}), viewport: { width: 1920, height: 1080 } })
      : shared;
    const errors = gpuErrors(page);
    await page.goto(`./${PERF}`);
    await ready(page);
    await expect.poll(() => overlayLine(page, 'quality ')).toMatch(/^quality high /);
    await page.waitForTimeout(5000);
    await page.screenshot({ path: join(OUT, 'frames-1903-winter-23h.png') });
    const idle = await measureFrames(page, 6000, false);
    const orbit = await measureFrames(page, 6000, true);
    const scrub = await measureScrub(page, 8000);
    const result: FramesResult = {
      url: PERF,
      graphics: await overlayLine(page, 'quality '),
      viewport: '1920x1080',
      uncapped: UNCAPPED,
      idle,
      orbit,
      scrub,
    };
    for (const [name, s] of [
      ['idle', idle],
      ['orbit', orbit],
      ['scrub', scrub],
    ] as const)
      console.log(`dewidebug gpu frames ${name} ${formatFrameStats(s)}`);
    save(FRAMES_FILE, result);
    await own?.close();
    expect(errors).toEqual([]);
  });
});

test.describe('screenshots at 1920x1080', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  for (const y of SHOT_YEARS)
    test(`a screenshot of the valley in ${String(y)} at High`, async ({ page }) => {
      const errors = gpuErrors(page);
      await page.goto(`./?year=${String(y)}`);
      await ready(page);
      await page.waitForTimeout(2500);
      await page.screenshot({ path: join(OUT, `shot-${String(y)}.png`) });
      expect(errors).toEqual([]);
    });
});
