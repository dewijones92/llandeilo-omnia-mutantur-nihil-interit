---
title: "ADR 0033: The railway is drawn in dated sections of today's track"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0033: The railway is drawn in dated sections of today's track

- **Status:** Accepted; the northing cut and "shown by its presence" superseded by [0034](0034-exact-dates-draw-nothing-outside-them.md)
- **Date:** 2026-10-03

## Context

One `railway` feature, from 1857 with exact dates, drew every line in `public/data/railways.json`
(today's track from OS Open Map Local) at once. The line north-east of Llandeilo station is the Vale
of Towy Railway, which opened to passengers on 1 April 1858, so an 1857 scene, and a "When are
we?" round at 1857, showed track that did not exist yet as a firm clue. The train also ran along
that stretch in 1857.

## Decision

- **A railway feature names its section of the drawn track**:
  `{ type: 'railway'; section: { side: 'north' | 'south'; ofN } }`, the parts of the lines north or
  south of a grid northing, cut where they cross it (`sectionLines` in `src/domain/rail.ts`, pure).
  Llandeilo station's northing splits the Llanelly Railway (from January 1857) from the Vale of Towy
  Railway (from 1 April 1858), each its own documented feature with exact dates.
- **The renderer draws one ribbon per railway feature** and shows it by that feature's presence.
- **The train runs only on the drawn stretch of its line**: `sectionSpan` gives the part of the
  train's line the present sections cover, and the train turns at its ends.

## Consequences

A further split (say, a branch with its own dates) is one more feature with a section, as long as a
northing separates it; a split that a northing cannot express would need a richer section type.
The other drawn lines (the Brynaman branch, a line near the western edge) still appear with the
1857 railway; their dates are an open question.

## Alternatives considered

Dropping `datesExact` from the one feature (honest about the clue, but the 1857 scene would still
draw the 1858 line); splitting the data file in the OS build script (the cut is a content fact, so it
belongs in content, next to its source).

## Corrected 2026-10-03

This ADR's fix did not work on screen. "Shows it by that feature's presence" meant the general fade,
which starts before `from`, so the Vale of Towy line was drawn from about 1849.7 and in the 1857 scene,
and the train ran on it. Its test checked content dates, not what is drawn. The southern section also
drew track the sources date to 1840 as an exact 1857 date. [ADR 0034](0034-exact-dates-draw-nothing-outside-them.md)
fixes both: exact dates draw nothing outside them, the drawn rule is a domain function the tests
sample, and sections are grid boxes dated stretch by stretch.
