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
});

test('a chunk dropped after start-up began, while the scene loads on demand, is also recovered', async ({
  page,
}) => {
  const { dropped, lines } = await readyAfterOneDroppedChunk(page, (startedMain) => startedMain);
  expect(dropped, 'a script requested after main started was dropped').toHaveLength(1);
  expect(lines.join('\n')).toContain('reloading (attempt 1 of 3)');
});
