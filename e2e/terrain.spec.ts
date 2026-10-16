import type { Page } from '@playwright/test';
import { expect, ready as waitReady, test } from './ready.ts';
import { PLACES } from '../src/content/places.ts';
import { toWorld, WORLD } from '../src/domain/geo.ts';
import { RIM_SPACING } from '../src/domain/lidar.ts';
import lidar from '../public/data/lidar/lidar.json' with { type: 'json' };

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
  readonly baseInside: number;
  readonly rimEdges: number;
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
    baseInside: num(s, 'baseInside'),
    rimEdges: num(s, 'rimEdges'),
  };
}

async function ready(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await waitReady(page);
}

async function moveCamera(page: Page, x: number, z: number, radius: number): Promise<void> {
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
  await moveCamera(page, town.x, town.z, 40);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(4);
  await expect.poll(async () => (await detail(page)).pending, { timeout: 60_000 }).toBe(0);
  const near = await detail(page);
  expect(near.tileSteps['262500_222000']).toBe(4);
  expect(near.byStep['4']).toBeGreaterThanOrEqual(2);
  expect(near.triangles).toBeLessThan(600_000);
  await moveCamera(page, town.x, town.z, 3500);
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

test('Dinefwr Castle hill gets fine tiles too, where it used to be drawn at 10m', async ({ page }) => {
  const castle = place('dinefwr');
  await ready(page, './?debug&year=1282&hour=12&season=summer&place=dinefwr&radius=30');
  const d = await detail(page);
  const e = Math.floor(castle.at.e / 500) * 500;
  const n = Math.floor(castle.at.n / 500) * 500;
  expect(d.tileSteps[`${String(e)}_${String(n)}`]).toBe(4);
  expect(d.pending).toBe(0);
});

test('the detail meets the coarse terrain along the rim without a gap', async ({ page }) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer&place=llandeilo&radius=40');
  const s = await seam(page);
  expect(s.baseVertices).toBeGreaterThan(300);
  expect(s.detailVertices).toBeGreaterThan(1000);
  expect(s.unmatched).toBe(0);
  expect(s.maxGap).toBeLessThan(0.001);
  const { eMin, eMax, nMin, nMax } = lidar.region;
  expect(s.baseInside).toBe(0);
  expect(s.rimEdges).toBe((2 * (eMax - eMin + (nMax - nMin))) / RIM_SPACING);
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

  const asked = (): Promise<number> =>
    page.evaluate(
      ([e, n]) => {
        const debug: unknown = Reflect.get(window, 'llandeiloDebug');
        const terrain: unknown =
          typeof debug === 'object' && debug ? Reflect.get(debug, 'terrain') : undefined;
        const metres: unknown =
          typeof terrain === 'object' && terrain ? Reflect.get(terrain, 'heightMetres') : undefined;
        if (typeof metres !== 'function') throw new Error('no heightMetres');
        const answer: unknown = Reflect.apply(metres, terrain, [{ e, n }]);
        if (typeof answer !== 'number') throw new Error('heightMetres did not answer a number');
        return answer;
      },
      [ridge.e, ridge.n] as const,
    );

  const before = await surface();
  const askedBefore = await asked();
  expect(before).toBeGreaterThan(0);
  expect(Number.isFinite(before)).toBe(true);
  const builds = (await detail(page)).builds;
  await setEdits(true);
  await expect.poll(async () => (await detail(page)).stale, { timeout: 60_000 }).toBe(0);
  const raised = await surface();
  expect(raised - before).toBeGreaterThan(0.7);
  expect(raised - before).toBeLessThan(0.74);
  // What everything that stands on the ground asks (`heightMetres`) rises by the edit's 3m too. Roads and
  // rails are laid again on the redrawn mesh; trees and the rest placed at start do not move (ADR 0049, decision 8).
  expect((await asked()) - askedBefore).toBeCloseTo(3, 1);
  expectRibbonsOnTheMesh('with the ridge laid', await ribbonsAgainstDrawn(page));
  const rebuilt = (await detail(page)).builds - builds;
  expect(rebuilt).toBeGreaterThanOrEqual(1);
  expect(rebuilt).toBeLessThan(8);
  await setEdits(false);
  await expect.poll(async () => (await detail(page)).stale, { timeout: 60_000 }).toBe(0);
  expect(Math.abs((await surface()) - before)).toBeLessThan(0.001);
  expect(Math.abs((await asked()) - askedBefore)).toBeLessThan(0.001);
});

interface RibbonReport {
  readonly legs: number;
  readonly longest: number;
  readonly lowest: number;
  readonly highest: number;
  readonly under: number;
}

// Every road and rail ribbon leg inside the LiDAR region, both edges sampled along their length, against
// the mesh drawn there now.
async function ribbonsAgainstDrawn(page: Page): Promise<RibbonReport> {
  const { eMin, eMax, nMin, nMax } = lidar.region;
  return page.evaluate(
    ([e0, e1, n0, n1, cE, cN, mpu]) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      const scene: unknown = typeof debug === 'object' && debug ? Reflect.get(debug, 'scene') : undefined;
      const terrain: unknown = typeof debug === 'object' && debug ? Reflect.get(debug, 'terrain') : undefined;
      if (typeof scene !== 'object' || !scene || typeof terrain !== 'object' || !terrain)
        throw new Error('no scene or terrain');
      const meshes: unknown = Reflect.get(scene, 'meshes');
      const drawnAt: unknown = Reflect.get(terrain, 'drawnAt');
      if (!Array.isArray(meshes) || typeof drawnAt !== 'function') throw new Error('no hooks');
      const numbers = (v: unknown): ArrayLike<number> | undefined => {
        if (v instanceof Float32Array || v instanceof Uint32Array || v instanceof Uint16Array) return v;
        if (v instanceof Int32Array) return v;
        return Array.isArray(v) ? v.filter((x): x is number => typeof x === 'number') : undefined;
      };
      const inner = (x: number, z: number): boolean => {
        const e = cE + x * mpu;
        const n = cN + z * mpu;
        return e > e0 && e < e1 && n > n0 && n < n1;
      };
      let legs = 0;
      let longest = 0;
      let lowest = Number.POSITIVE_INFINITY;
      let highest = Number.NEGATIVE_INFINITY;
      let under = 0;
      for (const mesh of meshes) {
        const name = typeof mesh === 'object' && mesh ? String(Reflect.get(mesh, 'name')) : '';
        if (name !== 'roads' && !name.startsWith('rail-')) continue;
        const getData: unknown = Reflect.get(mesh, 'getVerticesData');
        const getIndices: unknown = Reflect.get(mesh, 'getIndices');
        if (typeof getData !== 'function' || typeof getIndices !== 'function')
          throw new Error('no mesh hooks');
        const pos = numbers(Reflect.apply(getData, mesh, ['position']));
        const idx = numbers(Reflect.apply(getIndices, mesh, []));
        if (!pos || !idx) throw new Error(`no geometry for ${name}`);
        const at = (i: number): [number, number, number] => [
          pos[i * 3] ?? 0,
          pos[i * 3 + 1] ?? 0,
          pos[i * 3 + 2] ?? 0,
        ];
        for (let k = 0; k + 5 < idx.length; k += 6) {
          const a = at(idx[k] ?? 0);
          const b = at(idx[k + 1] ?? 0);
          const c = at(idx[k + 2] ?? 0);
          const d = at(idx[k + 4] ?? 0);
          const mid = (p: readonly number[], q: readonly number[], i: number): number =>
            ((p[i] ?? 0) + (q[i] ?? 0)) / 2;
          if (!inner(mid(a, b, 0), mid(a, b, 2)) || !inner(mid(c, d, 0), mid(c, d, 2))) continue;
          legs++;
          longest = Math.max(
            longest,
            Math.hypot(mid(c, d, 0) - mid(a, b, 0), mid(c, d, 2) - mid(a, b, 2)) * mpu,
          );
          for (const [from, to] of [
            [a, c],
            [b, d],
          ] as const) {
            for (let q = 0; q <= 8; q++) {
              const f = q / 8;
              const x = from[0] + (to[0] - from[0]) * f;
              const z = from[2] + (to[2] - from[2]) * f;
              const ribbon = from[1] + (to[1] - from[1]) * f;
              const drawn: unknown = Reflect.apply(drawnAt, terrain, [x, z]);
              if (typeof drawn !== 'number') continue;
              lowest = Math.min(lowest, ribbon - drawn);
              highest = Math.max(highest, ribbon - drawn);
              if (ribbon < drawn) under++;
            }
          }
        }
      }
      return { legs, longest, lowest, highest, under };
    },
    [eMin, eMax, nMin, nMax, WORLD.centre.e, WORLD.centre.n, WORLD.metresPerUnit] as const,
  );
}

function expectRibbonsOnTheMesh(label: string, r: RibbonReport): void {
  console.info(`dewidebug ribbons ${label}: ${JSON.stringify(r)}`);
  expect(r.legs, label).toBeGreaterThan(1500);
  expect(r.longest, label).toBeLessThan(5);
  expect(r.under, `${label}: samples under the mesh drawn`).toBe(0);
  expect(r.lowest, label).toBeGreaterThan(0);
  expect(r.highest, `${label}: the most a ribbon floats above the mesh drawn`).toBeLessThan(0.8);
}

test('roads and rails follow the LiDAR mesh drawn, as its tiles change step', async ({ page }) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer');
  const town = toWorld(place('llandeilo').at);
  const settle = async (): Promise<void> => {
    await expect.poll(async () => (await detail(page)).pending, { timeout: 60_000 }).toBe(0);
  };
  await settle();
  expect(finest(await detail(page))).toBe(20);
  expectRibbonsOnTheMesh('overview, 20m', await ribbonsAgainstDrawn(page));
  await moveCamera(page, town.x, town.z, 60);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(4);
  await settle();
  expectRibbonsOnTheMesh('town, 4m near and 10m, 20m beyond', await ribbonsAgainstDrawn(page));
  await moveCamera(page, town.x, town.z, 3500);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(20);
  await settle();
  expectRibbonsOnTheMesh('overview again, 20m', await ribbonsAgainstDrawn(page));
});

interface TrainReading {
  readonly x: number;
  readonly z: number;
  readonly above: number;
}

// Puts the train at the vertex of its line nearest (x, z), waits two frames for it to be drawn there, and
// reads how far it stands above the mesh drawn under it.
async function trainAboveDrawn(page: Page, at: { x: number; z: number }): Promise<TrainReading> {
  return page.evaluate(
    async ([px, pz]) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      if (typeof debug !== 'object' || !debug) throw new Error('no debug hook');
      const scene: unknown = Reflect.get(debug, 'scene');
      const terrain: unknown = Reflect.get(debug, 'terrain');
      const place: unknown = Reflect.get(debug, 'placeTrainNear');
      if (typeof scene !== 'object' || !scene || typeof terrain !== 'object' || !terrain)
        throw new Error('no scene or terrain');
      if (typeof place !== 'function') throw new Error('no placeTrainNear hook');
      if (Reflect.apply(place, debug, [px, pz]) !== true) throw new Error('the train could not be placed');
      const frame = (): Promise<void> =>
        new Promise((done) => {
          requestAnimationFrame(() => {
            done();
          });
        });
      await frame();
      await frame();
      const meshes: unknown = Reflect.get(scene, 'meshes');
      const drawnAt: unknown = Reflect.get(terrain, 'drawnAt');
      if (!Array.isArray(meshes) || typeof drawnAt !== 'function') throw new Error('no hooks');
      const train: unknown = meshes.find(
        (m: unknown) =>
          typeof m === 'object' &&
          m !== null &&
          Reflect.get(m, 'name') === 'diesel-unit' &&
          Reflect.get(m, 'isVisible') === true,
      );
      const position: unknown =
        typeof train === 'object' && train ? Reflect.get(train, 'position') : undefined;
      if (typeof position !== 'object' || !position) throw new Error('no visible train');
      const x: unknown = Reflect.get(position, 'x');
      const y: unknown = Reflect.get(position, 'y');
      const z: unknown = Reflect.get(position, 'z');
      if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number')
        throw new Error('train has no position');
      const drawn: unknown = Reflect.apply(drawnAt, terrain, [x, z]);
      if (typeof drawn !== 'number')
        throw new Error(`no drawn ground under the train at ${String(x)}, ${String(z)}`);
      return { x, z, above: y - drawn };
    },
    [at.x, at.z] as const,
  );
}

// The diesel unit's lift above the ground its path is laid on (`Stock.lift`).
const TRAIN_LIFT = 0.4;

test('the train stands on the mesh drawn under it, as its tiles change step', async ({ page }) => {
  await ready(page, './?debug&year=2020&hour=12&season=summer');
  const settle = async (): Promise<void> => {
    await expect.poll(async () => (await detail(page)).pending, { timeout: 60_000 }).toBe(0);
  };
  await settle();
  const town = toWorld(place('llandeilo').at);
  const first = await trainAboveDrawn(page, town);
  console.info(`dewidebug train overview ${JSON.stringify(first)}`);
  await moveCamera(page, first.x, first.z, 40);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(4);
  await settle();
  const near = await trainAboveDrawn(page, first);
  console.info(`dewidebug train near ${JSON.stringify(near)}`);
  await moveCamera(page, first.x, first.z, 3500);
  await expect.poll(async () => finest(await detail(page)), { timeout: 60_000 }).toBe(20);
  await settle();
  const out = await trainAboveDrawn(page, first);
  console.info(`dewidebug train out ${JSON.stringify(out)}`);
  for (const [label, r] of [
    ['overview', first],
    ['close, tiles at 4m', near],
    ['out again, tiles at 20m', out],
  ] as const) {
    expect(
      Math.abs(r.above - TRAIN_LIFT),
      `${label}: the train's height above the mesh drawn under it, less its lift`,
    ).toBeLessThan(0.05);
  }
});
