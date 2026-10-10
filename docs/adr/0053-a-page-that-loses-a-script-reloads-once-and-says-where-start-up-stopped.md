---
title: "ADR 0053: A page that loses a script to the network reloads, and start-up says where it stopped"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0053: A page that loses a script to the network reloads, and start-up says where it stopped

- **Status:** Accepted
- **Date:** 2026-10-10
- **Number:** written as 0053 on its branch; check the highest number at the push, not at the merge.

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
On this laptop a Docker container joins and leaves the bridge every 11 to 15 seconds (`docker events`
showed the connect and disconnect pairs across the failing run; which container it is was not checked), so a page load that spans one of
those moments loses whatever it was fetching. A visitor switching from wifi to mobile data can get the same
error, so it is not only a test-machine problem: the app showed a blank page and never said why.

## Decision

- **`index.html` carries a small inline script**, before any module or stylesheet so it cannot itself be
  lost: when a same-origin `<script>` or `<link>` fails to load, when Vite reports a preload error, or when
  an unhandled rejection says a dynamically imported module failed, the page reloads. It reloads at most
  three times per tab session (a counter in `sessionStorage`, cleared when start-up completes) and only once
  per page load, and logs each decision with `dewidebug startup`. If `sessionStorage` is unavailable it logs
  that and does not reload, rather than risk a loop.
- **`src/platform/startup.ts`** logs each start-up stage (`main started`, each input loaded or FAILED,
  `inputs all loaded`, `world built`, `train model loading/done`, `scene built`, `scene ready`, `ready`) with
  the milliseconds since navigation, every start-up fetch (start, headers and status, failure), unhandled
  errors and rejections tagged with the stage, WebGL context loss, and a "STILL WAITING" line at 15s, 60s and
  120s naming the last stage and the fetches in flight. The last stage is `body[data-startup]`, the fetches
  in flight `body[data-startup-pending]`.
- **`e2e/ready.ts`** is the one way a spec waits for the app (the `ready(page)` helper, and the `test`
  every spec imports so the page's console, errors and requests are recorded from before the first
  navigation). On a timeout it fails with that record instead of a bare timeout.

## Consequences

- A hang now names its cause in the failure message. The three above would have read "ERR_NETWORK_CHANGED
  on assets/…" at once.
- A dropped chunk costs one extra load instead of a blank page. `e2e/ready.spec.ts` drops one script
  request, once before start-up and once after it began, and checks the page loads again and becomes ready
  (both seen red without the recovery script: never ready after 60s).
- Not covered: a network that stays down fails all three attempts and the page stays blank (it is logged).
  A failed `fetch()` of a data file is not retried: it already reaches the "failed to start" message.
- The first-load cost is a few hundred bytes of inline script.
