---
title: "ADR 0004: Deep-import Babylon through one module, with a bundle budget"
kind: adr
status: accepted, budget superseded
updated: 2026-09-28
---

# ADR 0004: Deep-import Babylon through one module, with a bundle budget

- **Status:** Accepted; the size budget is superseded by [0016](0016-no-bundle-size-limit.md)
- **Date:** 2026-09-26

## Context

Importing from `@babylonjs/core` pulled in the whole engine: 1.6MB gzipped.

## Decision

All Babylon imports go through `src/world/babylon.ts`, which deep-imports only the classes used plus
the side-effect modules they need (ray picking, layer and shadow scene components, thin instances,
particles). CI fails if the gzipped main chunk exceeds 450KB.

## Consequences

387KB gzipped at the time (418KB by 2026-09-28 as features grew; see CLAUDE.md for the current
figure). A missing side-effect import fails only at runtime, so any new Babylon feature must
be checked by screenshot and the e2e suite on the production build.

## Alternatives considered

Code-splitting the engine (still downloads it all before the first frame); accepting 1.6MB.
