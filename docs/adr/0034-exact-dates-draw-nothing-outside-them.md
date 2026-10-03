---
title: "ADR 0034: Exact dates draw nothing outside them, and the railway's drawn rule is in the domain"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0034: Exact dates draw nothing outside them, and the railway's drawn rule is in the domain

- **Status:** Accepted, amends [0033](0033-railway-drawn-in-dated-sections.md)
- **Date:** 2026-10-03

## Context

`presenceAt` faded every feature in over a stretch of the slider before its `from` and out over a
stretch after its `to` (`FADE_T` = 0.012 of the slider, about 17 years around 1850). So ADR 0033's
split did nothing on screen: the Vale of Towy line, opened on 1 April 1858, was drawn from about 1849.7
and at the 1857 key step, and the train ran silently on it from 1853.7. The tests passed because they
checked content dates, not what the renderer draws. The second-Opus review of 2026-10-03 found it.

The same review found the southern section over-claimed: it drew every line south of Llandeilo
station from January 1857 as an exact date, though its own source (victorian:S29) puts track from
Pontarddulais to Cwmamman there in 1840, with Duffryn, today's Ammanford station, the terminus
towards Llandeilo until 1857. A northing cannot separate the Amman valley branch from the main line.

## Decision

- **A feature with `datesExact` is never present outside its dates.** `presenceAt` takes the item
  (`when` and `datesExact`) and returns 1 from `from` to `to` inclusive, 0 outside, compared on the
  slider's own `t` so a key step at the same year always counts. Features dated "c." keep the soft
  fade, since their dates are uncertain anyway. The renderer does not special-case anything.
- **What of the railway is drawn is one pure rule**, `drawnRailway` in `src/domain/rail.ts`: a
  section is drawn above presence 0.5; the train is drawn when the railway and a train are above 0.9
  and a drawn section covers part of the train's line, which gives its span; `steam` comes from the
  rolling stock (`STEAM` in the model). The renderer calls it, and the tests sample it through
  `snapshotAt`, so a railway test is a test of the picture.
- **A railway section is a set of grid boxes** (`{ within: [GridBox, ...] }`, each bound optional),
  clipped Liang–Barsky, so a branch can be told from the main line where a northing cannot. This
  replaces 0033's `{ side, ofN }`.
- **Each section carries the dates its sources give for the track inside it**:
  - `railway`, Duffryn (Ammanford station) to Llandeilo station, January 1857, exact.
  - `railway-vale-of-towy`, north-east of Llandeilo station, 1 April 1858, exact.
  - `railway-llanelly-1840`, south of Duffryn and up the Amman valley, from April 1840, reconstructed
    and not exact: part of it opened in May 1841, and the sources differ on Duffryn's date.
  - The short lines near Pontyberem and Cross Hands, undated in the notes, are in no section and are
    not drawn.
- **A content test holds each exact section to the stretch its sources date**: its drawn lines must
  form one unbroken stretch whose ends are the dated stations (or the edge of the map), and every line
  east of Pontyberem must be drawn once.

## Consequences

Exact-dated features (the railway sections, Llandeilo Bridge, Carreg Cennen's ruin) now pop on and
off at their years rather than growing in; that is the honest picture of a dated event. Anything
else that reads presence for a visible decision should go through a domain rule the tests can
sample, as the railway now does. Undated lines are left undrawn rather than given a guessed date; if
they are researched they become one more section.

## Alternatives considered

Gating the railway alone on its year in the renderer (a special case, and the same fault would come
back for the next exact feature); giving railway features a fade that starts at `from` (still a
special case); dropping `datesExact` from the southern section and keeping one 1857 section (honest
about the clue, but 1840 to 1856 scenes would still draw no track where the sources put it); drawing
the western lines with a guessed date (inventing a date).
