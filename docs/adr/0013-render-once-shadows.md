---
title: "ADR 0013: Shadows rendered once, refreshed on change"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0013: Shadows rendered once, refreshed on change

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

The shadow map is expensive and the scene is mostly static between scrubs.

## Decision

The shadow generator's `refreshRate` is 0; `refreshShadows()` re-renders it when the scene changes.
Moving casters (the train) are handled explicitly.

## Consequences

Cheap frames. Every new moving caster must be accounted for or its shadow freezes (a regression
found by review on 2026-09-26).

## Alternatives considered

Refreshing every frame (costly on weak GPUs).
