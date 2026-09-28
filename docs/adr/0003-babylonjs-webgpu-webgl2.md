---
title: "ADR 0003: Babylon.js, WebGPU first with a WebGL2 fallback"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0003: Babylon.js, WebGPU first with a WebGL2 fallback

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

A 3D diorama needs a real engine. Dewi chose Babylon.js over three.js for its fuller toolset
(inspector, scene tooling, audio, shadows, particles) and first-class WebGPU.

## Decision

Babylon.js 9. `src/world/engine.ts` probes `WebGPUEngine.IsSupportedAsync` and falls back to the
WebGL2 `Engine`; `?webgl` forces the fallback.

## Consequences

Everything automated here runs WebGL2 through SwiftShader at about 1fps, so the WebGPU path and real
frame rates are not measured yet (backlog). Babylon's barrel import is huge; see ADR 0004.

## Alternatives considered

three.js (more assembly required); raw WebGPU (writing an engine); Unity or Godot web exports (heavy
downloads).
