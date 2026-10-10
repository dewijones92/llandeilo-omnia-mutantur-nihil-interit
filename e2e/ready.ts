import { expect, test as base, type ConsoleMessage, type Page, type Request } from '@playwright/test';

// The one way a spec waits for the app to be ready. A page that never gets `data-ready` fails with
// where it stopped (`data-startup`, the fetches in flight, the console, page errors, failed and
// unfinished requests) instead of a bare timeout, so a hang names its cause (docs/process/build-log.md,
// 2026-10-10). Every spec imports `test` from here so the listeners are on before the first navigation.

export const READY_TIMEOUT_MS = 150_000;
const CONSOLE_TAIL = 30;
const EVALUATE_PATIENCE_MS = 5_000;

interface Trace {
  readonly began: number;
  readonly console: string[];
  readonly startupLines: string[];
  readonly errors: string[];
  readonly failed: string[];
  readonly inflight: Map<Request, number>;
}

const traces = new WeakMap<Page, Trace>();

const stamp = (trace: Trace): string => `+${String(Date.now() - trace.began).padStart(6, ' ')}ms`;
const shown = (url: string): string => (url.length > 160 ? `${url.slice(0, 160)}...` : url);

export function watchPage(page: Page): void {
  if (traces.has(page)) return;
  const trace: Trace = {
    began: Date.now(),
    console: [],
    startupLines: [],
    errors: [],
    failed: [],
    inflight: new Map(),
  };
  traces.set(page, trace);
  page.on('console', (m: ConsoleMessage) => {
    const line = `${stamp(trace)} ${m.type()}: ${m.text()}`;
    trace.console.push(line);
    if (trace.console.length > 500) trace.console.shift();
    if (m.text().includes('dewidebug startup')) trace.startupLines.push(line);
  });
  page.on('pageerror', (e) => trace.errors.push(`${stamp(trace)} pageerror: ${e.message}`));
  page.on('crash', () => trace.errors.push(`${stamp(trace)} PAGE CRASHED`));
  page.on('request', (r) => {
    if (!r.url().startsWith('data:')) trace.inflight.set(r, Date.now());
  });
  page.on('requestfinished', (r) => trace.inflight.delete(r));
  page.on('requestfailed', (r) => {
    trace.inflight.delete(r);
    trace.failed.push(
      `${stamp(trace)} FAILED ${r.method()} ${shown(r.url())}: ${r.failure()?.errorText ?? '?'}`,
    );
  });
  page.on('response', (r) => {
    if (r.status() >= 400) trace.failed.push(`${stamp(trace)} HTTP ${String(r.status())} ${shown(r.url())}`);
  });
}

export const test = base.extend<{ startupTrace: undefined }>({
  startupTrace: [
    async ({ context }, use) => {
      for (const p of context.pages()) watchPage(p);
      context.on('page', watchPage);
      await use(undefined);
    },
    { auto: true },
  ],
});

export { expect };

async function pageState(page: Page): Promise<string> {
  const answer = page.evaluate(() => {
    const body = document.body;
    return [
      `ready=${String(body.dataset['ready'])}`,
      `body data-startup=${String(body.dataset['startup'])}`,
      `body data-startup-pending=[${body.dataset['startupPending'] ?? ''}]`,
      `html data-startup=${String(document.documentElement.dataset['startup'])}`,
      `document.readyState=${document.readyState}`,
      `performance.now=${String(Math.round(performance.now()))}ms`,
    ].join('\n  ');
  });
  const patience = new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve(
        `page did not answer evaluate within ${String(EVALUATE_PATIENCE_MS)}ms (main thread blocked, or the page is gone)`,
      );
    }, EVALUATE_PATIENCE_MS),
  );
  return Promise.race([answer, patience]).catch((e: unknown) => `evaluate failed: ${String(e)}`);
}

export async function describeNotReady(page: Page): Promise<string> {
  watchPage(page);
  const trace = traces.get(page);
  if (!trace) return 'no trace';
  const now = Date.now();
  const section = (title: string, lines: readonly string[]): string =>
    `${title} (${String(lines.length)}):\n${lines.length ? lines.map((l) => `  ${l}`).join('\n') : '  none'}`;
  return [
    `url: ${page.url()}`,
    `page state:\n  ${await pageState(page)}`,
    section(
      'requests started but never finished',
      [...trace.inflight].map(([r, at]) => `${String(now - at)}ms old ${r.method()} ${shown(r.url())}`),
    ),
    section('failed requests and HTTP errors', trace.failed),
    section('page errors', trace.errors),
    section('app start-up log', trace.startupLines),
    section(`last ${String(CONSOLE_TAIL)} console lines`, trace.console.slice(-CONSOLE_TAIL)),
  ].join('\n');
}

/**
 * Waits for `body[data-ready]` to be 'true' or 'error' (a failed start, which `main.ts` reports at once)
 * and passes only on 'true'. Throws with everything known about where start-up stopped on a timeout or an
 * 'error'.
 */
export async function ready(page: Page, timeout = READY_TIMEOUT_MS): Promise<void> {
  watchPage(page);
  let state: unknown;
  try {
    const handle = await page.waitForFunction(
      () => {
        const value = document.body.dataset['ready'];
        return value === 'true' || value === 'error' ? value : false;
      },
      null,
      { timeout, polling: 250 },
    );
    state = await handle.jsonValue();
  } catch (err: unknown) {
    const report = await describeNotReady(page);
    const cause = err instanceof Error ? err.message.split('\n')[0] : String(err);
    throw new Error(`the page never became ready (${String(cause)})\n${report}`, { cause: err });
  }
  if (state !== 'true')
    throw new Error(`the app failed to start (data-ready=${String(state)})\n${await describeNotReady(page)}`);
}
