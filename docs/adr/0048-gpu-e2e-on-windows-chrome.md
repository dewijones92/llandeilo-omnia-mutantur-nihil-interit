---
title: "ADR 0048: The GPU tests run on Windows Chrome, against a preview served from WSL"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0048: The GPU tests run on Windows Chrome, against a preview served from WSL

- **Status:** Accepted. The idea and the self-hosted CI runner are Dewi's (2026-10-09); the design
  details are Claude's, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md))
- **Date:** 2026-10-09

## Context

Dewi, 2026-10-09: "Chrome exe in windows has beefy GPU, maybe run any graphics stuff on there? If
that's a good idea then set it up so ci uses it? Be clever?" He chose a self-hosted runner for CI.

Until now nothing automated had run the app on WebGPU, its default engine. CI has no GPU and renders
WebGL2 on the CPU through SwiftShader; WSL can put WebGL on the laptop's NVIDIA GPU through Mesa's D3D12
layer, but WebGPU through WSL stalls. So the WGSL code (the night halos, ADR 0040) had never run, and
every frame rate recorded was WebGL through a translation layer.

Windows Chrome reaches the GPU directly. Driving it from WSL does not work: the Hyper-V firewall blocks
WSL→Windows TCP, so WSL cannot reach a Windows browser's debugging port, and Playwright's pipe
connection cannot cross the WSL/Windows boundary. The other direction works: Windows can load a server
running in WSL through `localhost` (WSL's NAT mode forwards it).

## Decision

`npm run e2e:gpu` runs `tools/gpu/run.sh` in WSL, which:

1. builds `dist/` with `PAGES_BASE` (CI's Pages path by default) and serves it from a `vite preview`
   in WSL on a free port, never the dev server's 5051;
2. packs only the test code (the specs, the `src/` modules they import, `tools/frame-timing.ts`,
   `tools/gpu/`, `playwright.gpu.config.ts`) and hands it to `tools/gpu/windows.ps1`, which unpacks it
   fresh into `C:\llandeilo-gpu\repo` every run;
3. on Windows installs only `@playwright/test`, at the version `package-lock.json` pins, into
   `C:\llandeilo-gpu\node_modules` (found from the repo copy by Node's usual walk up), and keeps it until
   that version or Windows' Node changes;
4. checks Windows can reach the preview and that it is the app, then runs Playwright with
   `playwright.gpu.config.ts`: Chrome (`channel: 'chrome'`, the installed Windows Chrome), headless,
   the default High graphics (`E2E_QUALITY` unset), in two passes: `gpu` alone first (one test at a
   time, so the frame timings never share the GPU), then the normal `e2e` specs on two workers;
5. copies `test-results-gpu/` back to WSL, prints a one-line summary and exits with the first failing
   pass's code.

`e2e/gpu.spec.ts` runs only under this config (the normal config ignores it). It fails if the app is
not on WebGPU, if the browser or Babylon reports a WebGPU error, or if `data-ready` is never `true`.
It records frame timings at High on the 1903 winter night overview (the scene `tools/frames.mjs` has
measured since 2026-10-02) idle, orbiting and scrubbing, in `frames.json`, and screenshots five years.
Frame rates are recorded, not asserted. `--uncapped` turns vsync and Chrome's frame-rate limit off for
the timings, as `tools/frames.mjs --uncapped` does; `--gpu-only` skips the normal specs.

The engine readout this needed is in the app: `createEngine` names the adapter it got (Babylon's
`getInfo()`), the `?debug` overlay's first line shows it (`backend webgpu (nvidia lovelace)`), and
`window.llandeiloDebug` carries `backend` and `gpu` beside `scene`.

The CI job (a self-hosted runner in WSL on this laptop) only calls `tools/gpu/run.sh` and uploads
`test-results-gpu/`. The script runs `npm ci` only when `node_modules` is missing: `npm ci` deletes
`node_modules`, which the dev server on 5051 serves from, so a `node_modules` whose package versions differ
from the lockfile (`tools/gpu/lockdrift.ts`, compared by content, so a release's version-only bump is not
drift) stops the run with a message unless `GPU_NPM_CI=1`. A lock file stops two runs sharing the one
Windows working copy; the preview and the Windows side are started without the lock's file descriptor, so
a `kill -9` of the script cannot leave an orphan holding it.

Three guards were added after the first review:

- **The WebGPU error guard reads warnings.** Babylon reports uncaptured WebGPU errors and a lost device
  through `console.warn`, and its other WebGPU failures through `console.error` with a `BJS -` prefix
  that never says "webgpu". `isGpuError` (`tools/gpu/results.ts`) therefore reads both types, and a GPU
  test causes a real validation error (a zero-size texture) and checks the guard sees it. That test was
  seen to fail against the old error-only guard.
- **The time limit belongs to `windows.ps1`.** `timeout` from WSL kills the Windows `powershell.exe` but
  not its children, so each pass runs under `Start-Process`, with a limit (`GPU_PASS_TIMEOUT`, default
  2100s) after which `taskkill /T /F` kills the pass's whole tree, Chrome included, and the results are
  still copied back. The run's own `timeout` (4800s) is only a backstop; if it fires, a cleanup pass
  kills any leftover run under `C:\llandeilo-gpu`. Every run starts with the same cleanup.
- **A run says what it tested.** `run.json` records the commit, how many files were dirty and whether
  the build was skipped, the summary line shows them, and a software adapter (SwiftShader, WARP, Basic
  Render) reads as WebGPU NO.

## Alternatives considered

- **Driving Windows Chrome from WSL over CDP.** Blocked by the firewall; opening it needs an admin
  firewall rule or mirrored networking (`.wslconfig` and `wsl --shutdown`, which stops everything
  running in WSL), both changes to the machine rather than the repo.
- **A visible Chrome window.** Headless Chrome got the same NVIDIA adapter for WebGPU and WebGL in a
  probe on 2026-10-09, and keeps windows from opening on Dewi's desktop mid-run.
- **`npm ci` of the whole project on Windows.** Windows' npm is 6.14 (through Volta), older than the
  lockfile's format (version 3, from npm 7 on), and the install would fetch Vite, Rolldown's native
  binaries and Babylon for a side that only runs Playwright.
- **`git archive` of HEAD.** Would test committed code against a `dist/` built from the working tree;
  packing the working tree keeps the two the same.
- **One fixed Chrome profile (`--user-data-dir`).** Playwright refuses that flag in its launch args, and
  two workers cannot share one profile. Each worker's Chrome gets its own throwaway profile instead,
  which is just as separate from Dewi's own Chrome, and Playwright closes only the browsers it started.

## Consequences

- WebGPU is tested for the first time, on a real GPU, and the WGSL halo code runs.
- Headless Chrome paints at about 57 frames a second here, so capped idle numbers read that ceiling;
  `--uncapped` shows the real frame cost.
- The normal specs run on Windows' fonts, so a layout test can differ from CI's Linux run; a failure
  only here is a finding to look into, not a flake.
- The kit needs Windows with Chrome and Node 20+ on the Windows side, and Node 22.18+ in WSL. It is a
  local and self-hosted tool; the GitHub-hosted CI stays as it is.

## The self-hosted runner (2026-10-10)

Dewi chose a self-hosted runner as well (2026-10-09: "If that's a good idea then set it up so ci uses
it? Be clever?", then "Self-hosted runner too"). A GitHub Actions runner, `dewi-laptop-gpu` (labels
`gpu`, `windows-chrome`), is registered to this repository only and runs in WSL as the systemd user
service `llandeilo-gh-runner` (`~/actions-runner-llandeilo`). CI's `gpu` job runs `npm run e2e:gpu`
on it and uploads `test-results-gpu/`.

- **Only pushes to main**: the job's `if` excludes pull requests, so a fork's code never runs on the
  laptop through this job, and the repository requires approval for every outside contributor's
  workflow run (`all_external_contributors`, set 2026-10-09), because a pull request can edit the
  workflow file itself.
- **Never blocking**: `continue-on-error`, and `deploy` does not need it. When the laptop is off the
  job waits in the queue.
- **One run at a time**: the kit's lock is global (`~/.cache/llandeilo-gpu.lock`), so a local run and a
  runner run never share the GPU or `C:\llandeilo-gpu`.
- **To stop or remove it**: `systemctl --user disable --now llandeilo-gh-runner`, then
  `./config.sh remove` in the runner folder with a removal token.

## Amended 2026-10-10: CI queues behind a local run

The CI `gpu` job on 93d072c failed in seconds with exit 2: a local GPU run (an agent building Blender
textures) held the lock. The lock was right to refuse a second run on the one GPU and Windows working copy,
but a non-blocking CI check that fails because someone is using the laptop tells nobody anything. `run.sh`
now waits up to `GPU_LOCK_WAIT` seconds for the lock (default 0, so a local second run still fails at once
and says why), and CI sets 1800; the job's 90-minute timeout still caps it. Decided by Claude, under the
proactive mandate (ADR 0027).
