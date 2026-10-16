#!/usr/bin/env node
// Screenshots of the Roman forts at the framing of issue 3's comment (Fort 1 from the south-east, its
// south-east side towards the camera), at several years, with each fort's worst buried corner on the mesh
// drawn: node tools/fort-shots.mjs <base url/> <out dir> [years...]
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [base, out, ...rest] = process.argv.slice(2);
if (!base || !out) throw new Error('usage: node tools/fort-shots.mjs <base url/> <out dir> [years...]');
const years = rest.length ? rest.map(Number) : [74, 84, 110];
mkdirSync(out, { recursive: true });
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
// The framing of the commenter's screenshot: looking north-west across Fort 1, about 35 degrees down.
const FRAMING = {
  target: process.env.TARGET,
  alpha: Number(process.env.ALPHA ?? -Math.PI / 4),
  beta: Number(process.env.BETA ?? 0.95),
  radius: Number(process.env.RADIUS ?? 55),
};
for (const year of years) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
  page.on('console', (m) => {
    const t = m.text();
    if (t.includes('dewidebug seats') || t.includes('dewidebug terrain ground edits'))
      console.log(`[${year}] ${t}`);
  });
  await page.goto(
    `${base}?year=${year}&hour=13&season=summer&place=${process.env.PLACE ?? 'roman-forts'}&debug${process.env.EXTRA ?? ''}`,
  );
  await page.waitForFunction(() => document.body.dataset.ready !== undefined, null, { timeout: 180000 });
  const report = await page.evaluate(async (f) => {
    const debug = Reflect.get(window, 'llandeiloDebug');
    for (const el of document.querySelectorAll('.debug.panel')) el.style.display = 'none';
    const cam = debug.scene.activeCamera;
    cam.alpha = f.alpha;
    cam.beta = f.beta;
    cam.radius = f.radius;
    // TARGET=e,n aims at a grid reference (metres), e.g. Fort 1's south-west barracks, where the ground falls most.
    if (f.target) {
      const [e, n] = f.target.split(',').map(Number);
      const x = (e - 262900) / 10;
      const z = (n - 222500) / 10;
      cam.target.x = x;
      cam.target.z = z;
      cam.target.y = debug.terrain.surfaceAt(x, z);
    }
    const settle = () => new Promise((r) => setTimeout(r, 400));
    // Tiles change step only as frames run after the camera moves: wait for that, then for the builds.
    for (let i = 0; i < 6; i++) await settle();
    for (let i = 0; i < 60 && debug.detail().pending + debug.detail().stale > 0; i++) await settle();
    await settle();
    const worst = {};
    for (const id of ['roman-fort-a', 'roman-fort-b', 'roman-vicus']) {
      let max = -Infinity;
      let part = '';
      // A build from before ADR 0056 has no `standing` hook: its shots are taken with no numbers.
      for (const s of typeof debug.standing === 'function' ? debug.standing(id) : []) {
        for (const [x, z] of s.at) {
          const drawn = debug.terrain.drawnAt(x, z);
          if (drawn === undefined) continue;
          if (drawn - s.floor > max) {
            max = drawn - s.floor;
            part = s.id;
          }
        }
      }
      // World units to metres at the forts' true height (10m a unit), so 0.3 means a wall 0.3m under.
      worst[id] = { buriedMetres: Number((max * 10).toFixed(2)), part };
    }
    return { worst, steps: debug.detail().byStep };
  }, FRAMING);
  await page.waitForTimeout(Number(process.env.SETTLE ?? 1500));
  const file = join(out, `fort-ad${year}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 88 });
  console.log(`dewidebug fort-shots AD ${year} -> ${file} ${JSON.stringify(report)}`);
  await page.close();
}
await browser.close();
