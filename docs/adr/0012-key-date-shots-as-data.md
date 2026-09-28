---
title: "ADR 0012: Camera shots for key dates are content data"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0012: Camera shots for key dates are content data

- **Status:** Accepted
- **Date:** 2026-09-28

## Context

Previous and Next step through the key dates and the camera should fly to the action. Where the
action was is a historical claim.

## Decision

A `KeyEvent` carries an optional `shot` (a grid reference and a framing: close, site, area or
valley). `src/domain/steps.ts` orders the steps; `main.ts` maps framings to camera radii. A test
requires every magnetic event to have a shot or a place, and every shot to be inside the disc.

## Consequences

Framing is reviewed like any other content: a shot must not imply a location the research does not
support (hence "area" for the 1282 battle).

## Alternatives considered

Camera positions hard-coded in the renderer (special-casing events there).
