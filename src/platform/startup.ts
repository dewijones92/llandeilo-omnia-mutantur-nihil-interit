// Start-up diagnostics: one line per stage from page load to `data-ready`, so a page that never
// becomes ready says where it stopped. The last stage reached is on `body[data-startup]`; the
// fetches still awaiting their response headers are on `body[data-startup-pending]`. Each fires once per load.

const pending = new Set<string>();
let last = 'none';
let done = false;

function publish(): void {
  document.body.dataset['startup'] = last;
  document.body.dataset['startupPending'] = [...pending].join(' ');
}

const since = (): string => `${String(Math.round(performance.now()))}ms`;

export function startupStage(stage: string, detail = ''): void {
  last = stage;
  publish();
  console.info(`dewidebug startup ${stage} ${since()}${detail ? ` ${detail}` : ''}`);
}

export function startupDone(): void {
  done = true;
  startupStage('ready');
  window.dispatchEvent(new Event('llandeilo:ready'));
}

/** `fetch` that logs when each request starts and how it ended, and tracks which are still pending. */
export async function tracedFetch(url: string): Promise<Response> {
  const began = performance.now();
  pending.add(url);
  publish();
  console.info(`dewidebug startup fetch start ${url} ${since()}`);
  try {
    const res = await fetch(url);
    console.info(
      `dewidebug startup fetch headers ${url} status=${String(res.status)} in ${String(Math.round(performance.now() - began))}ms`,
    );
    return res;
  } catch (err: unknown) {
    console.error(
      `dewidebug startup fetch FAILED ${url} after ${String(Math.round(performance.now() - began))}ms`,
      err,
    );
    throw err;
  } finally {
    pending.delete(url);
    publish();
  }
}

/** Logs, once at each delay, that start-up has not finished and what it is waiting on. */
export function watchStartup(delaysMs: readonly number[], extra: () => string): void {
  for (const delay of delaysMs)
    window.setTimeout(() => {
      if (done) return;
      console.warn(
        `dewidebug startup STILL WAITING after ${String(delay)}ms: last stage=${last} fetchesAwaitingHeaders=[${[...pending].join(' ')}] ${extra()}`,
      );
    }, delay);
}

/** Logs errors and rejections that nothing handled, tagged with the stage they happened in. */
export function logUnhandled(): void {
  window.addEventListener('error', (e) => {
    console.error(`dewidebug startup window error at stage=${last}: ${e.message}`);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error(`dewidebug startup unhandled rejection at stage=${last}`, e.reason);
  });
}
