---
title: "ADR 0016: No bundle size limit"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0016: No bundle size limit

- **Status:** Accepted; supersedes the budget in [0004](0004-babylon-deep-imports-bundle-budget.md)
- **Date:** 2026-09-28

## Context

ADR 0004 added a CI check failing the build when the gzipped main chunk passed 450KB. It was set by
Claude on 2026-09-26 after cutting the bundle from 1.6MB, not by Dewi, and the brief says nothing
about size. By 2026-09-28 the chunk was 418KB, and richer looks and models were about to push it
over. Dewi, 2026-09-28: "did I say the app is meant to be under half a MB??? if so please remove
this limit".

## Decision

There is no size limit. CI prints the gzipped size of the main chunk on every run so growth stays
visible, and CLAUDE.md records the latest figure. Babylon is still imported through
`src/world/babylon.ts` with deep imports, because that costs nothing and keeps first load quick.

## Consequences

Features that need more engine (post-processing, glTF models, bigger textures) are not blocked by a
number. First load feeling quick on a desktop is still the goal in CLAUDE.md's quality bar, judged by
measurement rather than a fixed threshold.

## Alternatives considered

Raising the limit (still an invented number); keeping it as a warning only (noise nobody asked for).
