---
title: "ADR 0008: A piecewise timeline with log segments"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0008: A piecewise timeline with log segments

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

12,500 years on a linear slider leaves everything since the Romans in the last sliver, and deep time
(millions of years) is planned.

## Decision

`src/domain/timeline.ts` maps slider position t in [0,1] to a year through anchors; each segment is
linear or logarithmic in years before the present.

## Consequences

Deep time can be added by new anchors without a rewrite. Distances on the slider are not
proportional to time, so the tick labels matter.

## Alternatives considered

Linear (unusable); a zoomable timeline (more UI than needed now).
