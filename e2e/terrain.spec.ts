import { expect, test, type Page } from '@playwright/test';
import { PLACES } from '../src/content/places.ts';
import { toWorld } from '../src/domain/geo.ts';

interface DetailStats {
  readonly tiles: number;
  readonly resident: number;
  readonly byStep: Readonly<Record<string, number>>;
  readonly tileSteps: Readonly<Record<string, number>>;
  readonly triangles: number;
  readonly pending: number;
  readonly stale: number;
  readonly unpainted: number;
  readonly builds: number;
}

interface Seam {
  readonly baseVertices: number;
  readonly detailVertices: number;
  readonly maxGap: number;
  readonly unmatched: number;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function num(v: Record<string, unknown>, key: string): number {
  const n = v[key];
  if (typeof n !== 'number') throw new Error(`${key} is not a number`);
  return n;
}

function numbers(v: unknown): Record<string, number> {
  if (!isRecord(v)) throw new Error('not a record');
  return Object.fromEntries(Object.keys(v).map((k) => [k, num(v, k)]));
}

async function hook(page: Page, name: 'detail' | 'seam'): Promise<Record<string, unknown>> {
  const json = await page.evaluate((hookName) => {
    const debug: unknown = Reflect.get(window, 'llandeiloDebug');
    const fn: unknown = typeof debug === 'object' && debug ? Reflect.get(debug, hookName) : undefined;
    if (typeof fn !== 'function') throw new Error(`no ${hookName} hook`);
    const result: unknown = Reflect.apply(fn, debug, []);
    return JSON.stringify(result);
  }, name);
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) throw new Error(`${name} hook returned ${json}`);
  return parsed;
}

async function detail(page: Page): Promise<DetailStats> {
  const d = await hook(page, 'detail');
  return {
    tiles: num(d, 'tiles'),
    resident: num(d, 'resident'),
    byStep: numbers(d['byStep']),
    tileSteps: numbers(d['tileSteps']),
    triangles: num(d, 'triangles'),
    pending: num(d, 'pending'),
    stale: num(d, 'stale'),
    unpainted: num(d, 'unpainted'),
    builds: num(d, 'builds'),
  };
}

async function seam(page: Page): Promise<Seam> {
  const s = await hook(page, 'seam');
  return {
    baseVertices: num(s, 'baseVertices'),
    detailVertices: num(s, 'detailVertices'),
    maxGap: num(s, 'maxGap'),
    unmatched: num(s, 'unmatched'),
  };
}

async function ready(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true', { timeout: 150_000 });
}

function finest(d: DetailStats): number {
  return Math.min(...Object.keys(d.byStep).map(Number));
}

const place = (id: string) => {
  const p = PLACES.find((x) => x.id === id);
  if (!p) throw new Error(`no place ${id}`);
  return p;
};

test('from the overview the LiDAR tiles are drawn coarse, and the whole region is covered', async ({
  page,
}) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer');
  const d = await detail(page);
  expect(d.tiles).toBeGreaterThan(50);
  expect(d.resident).toBe(d.tiles);
  expect(finest(d)).toBe(20);
  expect(d.triangles).toBeLessThan(200_000);
  await expect.poll(async () => (await detail(page)).unpainted, { timeout: 60_000 }).toBe(0);
});

test('flying into Llandeilo swaps its tiles to a fine step, and flying out takes them back', async ({
  page,
}) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer');
  expect(finest(await detail(page))).toBe(20);
  const town = toWorld(place('llandeilo').at);
  const moveCamera = async (x: number, z: number, radius: number): Promise<void> => {
    await page.evaluate(
      ([cx, cz, r]) => {
        const debug: unknown = Reflect.get(window, 'llandeiloDebug');
        const scene: unknown = typeof debug === 'object' && debug ? Reflect.get(debug, 'scene') : undefined;
        const camera: unknown =
          typeof scene === 'object' && scene ? Reflect.get(scene, 'activeCamera') : undefined;
        if (typeof camera !== 'object' || !camera) throw new Error('no camera');
        const target: unknown = Reflect.get(camera, 'target');
        if (typeof target !== 'object' || !target) throw new Error('no target');
        Reflect.set(target, 'x', cx);
        Reflect.set(target, 'z', cz);
        Reflect.set(camera, 'target', target);
        Reflect.set(camera, 'beta', 0.98);
        Reflect.set(camera, 'radius', r);
      },
      [x, z, radius] as const,
    );
  };
  await moveCamera(town.x, town.z, 40);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(4);
  await expect.poll(async () => (await detail(page)).pending, { timeout: 60_000 }).toBe(0);
  const near = await detail(page);
  expect(near.tileSteps['262500_222000']).toBe(4);
  expect(near.byStep['4']).toBeGreaterThanOrEqual(2);
  expect(near.triangles).toBeLessThan(600_000);
  await moveCamera(town.x, town.z, 3500);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(20);
  await expect.poll(async () => (await detail(page)).pending, { timeout: 60_000 }).toBe(0);
});

test('the Roman forts get their own fine tiles when you go there', async ({ page }) => {
  const forts = place('roman-forts');
  await ready(page, './?debug&year=100&hour=12&season=summer&place=roman-forts&radius=30');
  const d = await detail(page);
  const tile = `${String(Math.floor(forts.at.e / 500) * 500)}_${String(Math.floor(forts.at.n / 500) * 500)}`;
  expect(d.tileSteps[tile]).toBe(4);
  expect(d.pending).toBe(0);
});

test('the detail meets the coarse terrain along the rim without a gap', async ({ page }) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer&place=llandeilo&radius=40');
  const s = await seam(page);
  expect(s.baseVertices).toBeGreaterThan(300);
  expect(s.detailVertices).toBeGreaterThan(1000);
  expect(s.unmatched).toBe(0);
  expect(s.maxGap).toBeLessThan(0.001);
});

test('a period change to the ground rebuilds only the tiles under it and leaves the base alone', async ({
  page,
}) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer&place=llandeilo&radius=40');
  const ridge = { e: 262950, n: 222450 };
  const { x, z } = toWorld(ridge);
  const surface = (): Promise<number> =>
    page.evaluate(
      ([wx, wz]) => {
        const debug: unknown = Reflect.get(window, 'llandeiloDebug');
        const scene: unknown = typeof debug === 'object' && debug ? Reflect.get(debug, 'scene') : undefined;
        const meshes: unknown = typeof scene === 'object' && scene ? Reflect.get(scene, 'meshes') : undefined;
        if (!Array.isArray(meshes)) throw new Error('no meshes');
        let nearest = Number.POSITIVE_INFINITY;
        let height = Number.NaN;
        for (const m of meshes) {
          if (typeof m !== 'object' || !m || !String(Reflect.get(m, 'name')).startsWith('detail-')) continue;
          const getter: unknown = Reflect.get(m, 'getVerticesData');
          if (typeof getter !== 'function') continue;
          const data: unknown = Reflect.apply(getter, m, ['position']);
          if (!(data instanceof Float32Array)) continue;
          for (let i = 0; i < data.length; i += 3) {
            const d = Math.hypot((data[i] ?? 0) - wx, (data[i + 2] ?? 0) - wz);
            if (d < nearest) {
              nearest = d;
              height = data[i + 1] ?? height;
            }
          }
        }
        return height;
      },
      [x, z] as const,
    );
  const setEdits = (on: boolean): Promise<void> =>
    page.evaluate((withRidge) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      const terrain: unknown = typeof debug === 'object' && debug ? Reflect.get(debug, 'terrain') : undefined;
      const set: unknown =
        typeof terrain === 'object' && terrain ? Reflect.get(terrain, 'setGroundEdits') : undefined;
      if (typeof set !== 'function') throw new Error('no setGroundEdits');
      const edit = {
        id: 'e2e-ridge',
        when: { from: -1e9, to: 1e9 },
        area: { eMin: 262700, eMax: 263200, nMin: 222300, nMax: 222600 },
        shape: {
          kind: 'ridge',
          line: [
            { e: 262800, n: 222450 },
            { e: 263100, n: 222450 },
          ],
          halfWidth: 6,
          metres: 3,
          slope: 10,
        },
        provenance: { kind: 'imagined', groundedIn: { en: 'a test', cy: 'prawf' }, sources: [] },
      };
      Reflect.apply(set, terrain, [withRidge ? [edit] : []]);
    }, on);

  const before = await surface();
  expect(before).toBeGreaterThan(0);
  expect(Number.isFinite(before)).toBe(true);
  const builds = (await detail(page)).builds;
  await setEdits(true);
  await expect.poll(async () => (await detail(page)).stale, { timeout: 60_000 }).toBe(0);
  const raised = await surface();
  expect(raised - before).toBeGreaterThan(0.7);
  expect(raised - before).toBeLessThan(0.74);
  const rebuilt = (await detail(page)).builds - builds;
  expect(rebuilt).toBeGreaterThanOrEqual(1);
  expect(rebuilt).toBeLessThan(8);
  await setEdits(false);
  await expect.poll(async () => (await detail(page)).stale, { timeout: 60_000 }).toBe(0);
  expect(Math.abs((await surface()) - before)).toBeLessThan(0.001);
});
