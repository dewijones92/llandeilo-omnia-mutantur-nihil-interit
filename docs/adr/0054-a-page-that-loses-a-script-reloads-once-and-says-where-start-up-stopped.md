---
title: "ADR 0054: A page that loses a script to the network reloads, and start-up says where it stopped"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0054: A page that loses a script to the network reloads, and start-up says where it stopped

- **Status:** Accepted
- **Date:** 2026-10-10
- **Number:** written as 0053 on its branch, renumbered to 0054 because the Blender pipeline branch merges first and takes 0053; check the highest number at the push, not at the merge.

## Context

About one e2e run in ten (more under load) failed with `data-ready` never set after 150s, on a different
test each time, and re-running the test alone passed. It was called a flake for two days without anything
that could tell it apart from a hang in the app.

A run with the start-up instrumentation in place (below), three workers, caught three at once. Every one
had `net::ERR_NETWORK_CHANGED` on same-origin script chunks:

1. Before `main.ts` ran (`data-startup` never set): the entry's static imports failed, so the app never
   started and nothing was reported (a failed module script is a console line, not a page error).
2. The same, at +71ms.
3. After start-up began: Babylon fetches shader chunks on demand at first render; one failed with a page
   error "Failed to fetch dynamically imported module", and the scene's `whenReadyAsync` never settled, so
   start-up sat at `scene built` for ever.

Chromium cancels requests in flight with `ERR_NETWORK_CHANGED` when the host's network interfaces change.
On this laptop a Docker container joined and left the bridge every 11 to 15 seconds (`docker events` showed
the connect and disconnect pairs across the failing run). The container is `fis-worker.service`, a local
stand-in for another project's worker that runs `docker run --rm` about every 10 seconds; an earlier note
recorded the same `ERR_NETWORK_CHANGED` effect on 2026-10-02. The failure timestamps were not matched to
individual docker events, so the evidence is a correlation plus that second independent observation. The unit
was stopped on 2026-10-10 at Dewi's choice, which is the real fix for local runs. A visitor switching from
wifi to mobile data can get the same error, so it is not only a test-machine problem: the app showed a
blank page and never said why.

## Decision

- **`index.html` carries a small inline script**, before any module or stylesheet so it cannot itself be
  lost: when a same-origin `<script>` or `<link>` fails to load, when Vite reports a preload error, or when
  an unhandled rejection says a dynamically imported module failed (Chromium and Firefox's "Failed to fetch
  dynamically imported module", Safari's "Importing a module script failed"), the page reloads. It reloads
  at most three times per tab session (a counter in `sessionStorage`) and only once per page load, and logs
  each decision with `dewidebug startup`. If `sessionStorage` is unavailable it logs that and does not
  reload, rather than risk a loop. The script owns its key: `startupDone()` dispatches `llandeilo:ready` and
  the script clears the counter on it.
- **Only before the app is ready.** Once `body[data-ready]` is `true` the script does not reload: it logs
  `dewidebug startup chunk lost after ready <url>` and carries on, and the effect that needed the chunk may
  not render. Babylon fetches some chunks after start-up (a shader when something first needs it), and a
  deploy to Pages while a tab is open makes the next chunk it asks for a 404; a reload there would throw the
  visitor back to the opening card and lose their year and place. This choice is Claude's, under the
  proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)); Dewi can
  overrule it.
- **`src/platform/startup.ts`** logs each start-up stage (`main started`, each input loaded or FAILED,
  `inputs all loaded`, `world built`, `train model loading/done`, `scene built`, `scene ready`, `ready`) with
  the milliseconds since navigation, every start-up fetch (start, headers and status, failure), unhandled
  errors and rejections tagged with the stage, WebGL context loss, and a "STILL WAITING" line at 15s, 60s and
  120s naming the last stage and the fetches still awaiting their response headers. The last stage is
  `body[data-startup]`; `body[data-startup-pending]` lists the fetches awaiting headers (a fetch leaves the
  list when its headers arrive, so a body that stalls after that is not in it; the stage log names which
  input had not finished).
- **`e2e/ready.ts`** is the one way a spec waits for the app (the `ready(page)` helper, and the `test`
  every spec imports so the page's console, errors and requests are recorded from before the first
  navigation). It waits for `data-ready` to be `true` or `error`, so a build that reports a failed start fails
  at once, and on a timeout or an `error` it fails with that record instead of a bare timeout.

## Consequences

- A hang now names its cause in the failure message. The three above would have read "ERR_NETWORK_CHANGED
  on assets/…" at once.
- A dropped chunk costs one extra load instead of a blank page. `e2e/ready.spec.ts` drops one script
  request, once before start-up and once after it began, and checks the page loads again, becomes ready and
  clears the counter (seen red without the recovery script: never ready after 60s; without the clearing: the
  counter left at 1). A script and a dynamic import lost after ready are logged and the page does not
  navigate (a window marker survives; seen red without the guard: the page reloaded and nothing was logged).
- Not covered: a network that stays down fails all three attempts and the page stays blank (it is logged).
  A failed `fetch()` of a data file is not retried: it already reaches the "failed to start" message.
- The first-load cost is a few hundred bytes of inline script.
