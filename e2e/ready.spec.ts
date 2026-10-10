import type { Page } from '@playwright/test';
import { expect, ready, test } from './ready.ts';

test('a page that never becomes ready says where start-up stopped', async ({ page }) => {
  await page.route('**/data/terrain.bin', () => new Promise<void>(() => undefined));
  await page.goto('./');
  const failure = await ready(page, 6_000).then(
    () => undefined,
    (e: unknown) => (e instanceof Error ? e.message : String(e)),
  );
  expect(failure, 'ready() should have timed out').toBeDefined();
  const text = failure ?? '';
  expect(text).toContain('the page never became ready');
  expect(text).toContain('body data-startup=');
  expect(text).toMatch(/body data-startup-pending=\[[^\]]*terrain\.bin/);
  expect(text).toMatch(/requests started but never finished \([1-9]\d*\):[\s\S]*terrain\.bin/);
  expect(text).toContain('dewidebug startup fetch start');
  expect(text).toMatch(/last 30 console lines \(\d+\)/);
});

test('start-up stages reach the body and the console, and the last one is ready', async ({ page }) => {
  const lines: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug startup')) lines.push(m.text());
  });
  await page.goto('./');
  await ready(page);
  await expect(page.locator('body')).toHaveAttribute('data-startup', 'ready');
  await expect(page.locator('body')).toHaveAttribute('data-startup-pending', '');
  const text = lines.join('\n');
  for (const stage of ['main started', 'inputs all loaded', 'world built', 'train model done', 'scene ready'])
    expect(text, stage).toContain(`dewidebug startup ${stage} `);
  expect(text).toContain('dewidebug startup fetch headers');
  expect(text).not.toContain('STILL WAITING');
  expect(text).not.toContain('FAILED');
});

async function readyAfterOneDroppedChunk(
  page: Page,
  dropWhen: (startedMain: boolean) => boolean,
): Promise<{ dropped: string[]; lines: string[] }> {
  const dropped: string[] = [];
  const lines: string[] = [];
  let startedMain = false;
  page.on('console', (m) => {
    const text = m.text();
    if (text.includes('dewidebug startup')) lines.push(text);
    if (text.includes('dewidebug startup main started')) startedMain = true;
  });
  await page.route('**/assets/*.js', (route) => {
    if (dropped.length === 0 && dropWhen(startedMain)) {
      dropped.push(route.request().url());
      return route.abort('connectionreset');
    }
    return route.continue();
  });
  await page.goto('./');
  await ready(page, 60_000);
  return { dropped, lines };
}

test('a script chunk the network drops while the page loads is fetched again by one reload', async ({
  page,
}) => {
  const { dropped, lines } = await readyAfterOneDroppedChunk(page, () => true);
  expect(dropped, 'the first script request was dropped').toHaveLength(1);
  expect(
    lines.filter((l) => l.includes('html head parsed')),
    'the page loaded twice',
  ).toHaveLength(2);
  expect(lines.join('\n')).toContain('reloading (attempt 1 of 3)');
  expect(
    await page.evaluate(() => sessionStorage.getItem('llandeilo.recovered')),
    'the guard is cleared once ready',
  ).toBeNull();
});

test('a chunk dropped after start-up began, while the scene loads on demand, is also recovered', async ({
  page,
}) => {
  const { dropped, lines } = await readyAfterOneDroppedChunk(page, (startedMain) => startedMain);
  expect(dropped, 'a script requested after main started was dropped').toHaveLength(1);
  expect(lines.join('\n')).toContain('reloading (attempt 1 of 3)');
  expect(
    await page.evaluate(() => sessionStorage.getItem('llandeilo.recovered')),
    'the guard is cleared once ready',
  ).toBeNull();
});

test('a failed start is reported at once, not after the timeout', async ({ page }) => {
  await page.route('**/data/terrain.json', (route) => route.abort('connectionreset'));
  await page.goto('./');
  const began = Date.now();
  const failure = await ready(page, 60_000).then(
    () => undefined,
    (e: unknown) => (e instanceof Error ? e.message : String(e)),
  );
  expect(failure, 'ready() should have thrown').toBeDefined();
  expect(failure).toContain('the app failed to start (data-ready=error)');
  expect(Date.now() - began, 'it should not have waited for the timeout').toBeLessThan(20_000);
});

test('a script lost after the app is ready is logged, and the page stays where it is', async ({ page }) => {
  const lines: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug startup')) lines.push(m.text());
  });
  await page.route('**/assets/late-*.js', (route) => route.abort('connectionreset'));
  await page.goto('./');
  await ready(page);
  await page.evaluate(() => {
    Reflect.set(window, 'visitorsPlace', 'kept');
    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('assets/late-element.js', document.baseURI).href;
    document.head.append(script);
    void import(new URL('assets/late-import.js', document.baseURI).href);
    window.dispatchEvent(
      Object.assign(new Event('vite:preloadError'), { payload: new Error('late preload failed') }),
    );
    void Promise.reject(new TypeError('Importing a module script failed.'));
  });
  await expect
    .poll(() => lines.filter((l) => l.includes('chunk lost after ready')).length, { timeout: 15_000 })
    .toBeGreaterThanOrEqual(4);
  const text = lines.join('\n');
  expect(text).toContain('chunk lost after ready preload failed: late preload failed');
  expect(text).toContain('chunk lost after ready Importing a module script failed.');
  expect(
    await page.evaluate(() => String(Reflect.get(window, 'visitorsPlace'))),
    'the page did not navigate',
  ).toBe('kept');
  expect(
    lines.filter((l) => l.includes('html head parsed')),
    'the page loaded once',
  ).toHaveLength(1);
  expect(lines.join('\n')).not.toContain('reloading');
  expect(await page.evaluate(() => sessionStorage.getItem('llandeilo.recovered'))).toBeNull();
});

test('a reload that holds its body back while ready() waits does not fail the wait', async ({ page }) => {
  let documents = 0;
  await page.route(
    (url) => url.pathname.endsWith('/'),
    async (route) => {
      documents += 1;
      if (documents < 2) return route.continue();
      const response = await route.fetch();
      const html = (await response.text()).replace(
        '<head>',
        '<head><script src="assets/hold-body.js"></script>',
      );
      return route.fulfill({
        response,
        body: html,
        headers: { ...response.headers(), 'content-length': String(Buffer.byteLength(html)) },
      });
    },
  );
  await page.route('**/assets/hold-body.js', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return route.fulfill({ contentType: 'text/javascript', body: '' });
  });
  await page.goto('./');
  await page.evaluate(() => {
    setTimeout(() => {
      location.reload();
    }, 300);
  });
  await ready(page, 60_000);
  expect(documents, 'the page was reloaded once while ready() waited').toBe(2);
});

test('with no way to remember a reload, a lost script does not reload the page', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error('storage is full');
    };
  });
  const lines: string[] = [];
  page.on('console', (m) => {
    if (m.text().includes('dewidebug startup')) lines.push(m.text());
  });
  let dropped = false;
  await page.route('**/assets/*.js', (route) => {
    if (dropped) return route.continue();
    dropped = true;
    return route.abort('connectionreset');
  });
  await page.goto('./');
  await expect
    .poll(() => lines.filter((l) => l.includes('not reloading again')).length, { timeout: 15_000 })
    .toBeGreaterThanOrEqual(1);
  await page.waitForTimeout(3000);
  expect(
    lines.filter((l) => l.includes('html head parsed')),
    'the page loaded once',
  ).toHaveLength(1);
  expect(lines.join('\n')).not.toContain('reloading (attempt');
});
