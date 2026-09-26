#!/usr/bin/env node
// Usage: node tools/shot.mjs <url> <out.png> [width] [height]
// Captures the page once it reports ready, plus its console. Local runs use Chromium 136 because
// newer Chromium cannot navigate on this WSL box (see ~/.claude/memory).
import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';

const [url, out, w = '1600', hgt = '900'] = process.argv.slice(2);
const local = `${process.env.HOME}/.cache/ms-playwright/chromium-1169/chrome-linux/chrome`;
const browser = await chromium.launch({
  executablePath: existsSync(local) ? local : undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(hgt) } });
page.on('console', (m) => console.log(`[console.${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
const started = Date.now();
await page.goto(url);
await page.waitForFunction(() => document.body.dataset.ready !== undefined, null, { timeout: 120000 });
await page.waitForTimeout(Number(process.env.SETTLE ?? 1500));
await page.screenshot({ path: out });
console.log(
  `dewidebug shot ${out} ready=${await page.evaluate(() => document.body.dataset.ready)} in ${Date.now() - started}ms`,
);
await browser.close();
