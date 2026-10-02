#!/usr/bin/env node
import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';

const [url, out, w = '1600', hgt = '900'] = process.argv.slice(2);
const local = `${process.env.HOME}/.cache/ms-playwright/chromium-1169/chrome-linux/chrome`;
// On WSL with a GPU, render WebGL on it through Mesa's D3D12 driver (SHOT_GPU=0 forces SwiftShader).
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
