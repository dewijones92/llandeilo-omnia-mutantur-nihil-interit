---
title: "ADR 0017: Procedural architecture, scripted Blender for props"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0017: Procedural architecture, scripted Blender for props

- **Status:** Accepted
- **Date:** 2026-09-28

## Context

Dewi asked why Blender (installed 2026-09-26) is not used, and left the choice to Claude ("whatever
you think is best"). Buildings are generated from typed, phase-by-phase plans in code. That keeps
each wall tied to its source and lets one model change through time, but organic shapes (a
locomotive, people, animals, trees) look crude when built from boxes. The bundle size limit that
argued against glTF is gone (ADR 0016).

## Decision

Two routes, chosen by what the thing is:

- **Architecture stays procedural**: castles, churches, abbeys, houses and bridges are data plans in
  `src/content` rendered by one builder per kind, because their shape is a historical claim that must
  stay reviewable in a diff and change by phase.
- **Props are built in Blender by committed scripts**: `blender -b -P tools/models/<name>.py` writes a
  glTF into `public/models/`, so the model is reproducible and reviewable as code, never a hand-edited
  binary. Each model gets an asset-manifest entry (author, licence, the research it rests on) and a
  provenance like any other content. First candidate: the 1857 locomotive, once its type is researched.

## Consequences

A second pipeline to keep working (Blender 4.0.2 headless, glTF loading in Babylon, which needs its
loader modules imported). Models must still be low-poly to match the agreed look. A prop whose
design is not researched is labelled reconstructed or imagined, like any other content.

## Alternatives considered

Everything procedural (props stay crude); everything in Blender (architecture loses its sourced,
per-phase plans); hand-modelled binaries (unreviewable, unreproducible).
