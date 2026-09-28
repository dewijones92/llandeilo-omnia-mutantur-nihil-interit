---
title: "ADR 0011: Procedural ambient sound"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0011: Procedural ambient sound

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

Each era needs a sound bed that follows the slider continuously, with no licence risk.

## Decision

`src/audio/ambience.ts` synthesises beds with Web Audio and crossfades them between the environment keyframes as the slider moves; `near(bed,
factor)` scales a bed by the camera's distance to its source (the train, 2026-09-28).

## Consequences

Nothing to license or credit. The sound is synthetic, and whether real recordings are wanted is
under discussion (`docs/design/sound-and-assets.md`).

## Alternatives considered

Recorded CC0 or CC-BY loops (credits and curation; may come later).
