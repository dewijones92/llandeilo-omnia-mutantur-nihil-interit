---
title: "ADR 0043: One helper measures lines of grid points and walks along them"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0043: One helper measures lines of grid points and walks along them

- **Status:** Accepted (decided by Claude under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md), so Dewi can overrule it)
- **Date:** 2026-10-03

## Context

The cutscene branch added a fifth copy of the same loop: sum the lengths of a polyline's legs, or walk
a distance along it. Copies were in `src/domain/cutscene.ts` (routes), `src/domain/rail.ts`
(`sectionSpan`, `longestLine`), `src/domain/lamplight.ts` (lamps every so many metres),
`src/world/settlement.ts` (the train's running lengths), `src/world/water.ts` (distance along a river
for its ripples) and `src/world/terrain.ts` (`densify`). The second-Opus review of 2026-10-03 flagged
it under the DRY law.

## Decision

`src/domain/polyline.ts` is the one place: `legs` (each leg with its start and length),
`cumulativeLengths`, `polylineLength`, `bearing` and `pointAlong` (a point and its leg's bearing,
clamped to the ends). Every copy above now uses it. The train's path is in world units, which are grid
metres divided by `WORLD.metresPerUnit`, so its running lengths are the grid ones scaled.

## Consequences

One unit test (`src/domain/polyline.test.ts`) covers the measuring; the callers' own tests still pass
unchanged. A missing river level no longer drops a leg from the distance along the river, which the
old running sum did by accident.

## Alternatives considered

- **Leaving the world-layer copies** (they work in world units): the conversion is one division, so
  there was no reason to keep them.
