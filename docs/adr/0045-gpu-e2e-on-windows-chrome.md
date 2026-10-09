---
title: "ADR 0045: The GPU tests run on Windows Chrome, against a preview served from WSL"
kind: adr
status: accepted
updated: 2026-10-09
---

# ADR 0045: The GPU tests run on Windows Chrome, against a preview served from WSL

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
`test-results-gpu/`; the script does its own `npm ci` when `node_modules` is missing or older than the
lockfile, and a lock file stops two runs sharing the one Windows working copy.

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
