---
title: "ADR 0035: Exact dates are about the dates, not about how firm a clue is"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0035: Exact dates are about the dates, not about how firm a clue is

- **Status:** Accepted, amends [0029](0029-guess-game-hides-giveaways-by-one-root-class.md) and
  [0034](0034-exact-dates-draw-nothing-outside-them.md)
- **Date:** 2026-10-03

## Context

`datesExact` meant two things. ADR 0029 made it half of a firm clue in "When are we?" (a documented
feature with exact dates), and a test held that only documented features could carry it. ADR 0034 then
made it the switch that draws nothing outside a feature's dates. So a feature reconstructed for its
course but exactly dated could not be drawn on its date: the Llanelly Railway's lines of 10 April
1840, reconstructed because they are drawn on today's track, faded in from about 1831, and their ⓘ
and ADR 0034 both said "from April 1840". The third review (2026-10-03) found it.

## Decision

- **`datesExact` says only that a source gives both ends as dates** (an end at the present counts).
  It is allowed on any provenance; a section can be reconstructed for its drawn course and still have
  an exact opening date.
- **A firm clue is still a documented feature with exact dates** (`clueStrength`). A reconstructed
  feature with exact dates is a probable clue, and the guess tests say so.
- `railway-llanelly-1840` carries exact dates, and so does the new `railway-gwaun-cae-gurwen` section
  (the 1907 line east of Garnant).
- **Adjacent phases share a boundary.** Where one train's dates end, the next one's begin on the same
  value (one exported constant for the end of steam, used by the trains and the sound). At that instant
  both are fully present, and `drawnRailway` draws the one that starts there, as the sound does. A heard
  point and a silent point at the same year cut a sound bed off rather than fading it.

## Consequences

Exactness and firmness can now be set separately, so a reconstructed but dated thing is drawn on its
date without being oversold as a clue. The phase *before* an exact feature is unchanged: unless it is
exact too, it still fades out over the years after its `to`, so for some years the old phase and the
new one are both drawn (the standing castle beside the 1462 ruin, the old bridge beside the 1848
bridge). The alternative, a per-end exactness flag, was not built; it is the fix if that overlap is
judged wrong.

## Alternatives considered

A separate `fade: 'none'` flag (a second switch meaning almost the same as the first); starting every
feature's fade-in at its `from` (changes every "c." feature at once, and puts the uncertainty all on
one side); correcting the ⓘ to say the lines grow in from about 1831 (true of the screen, false of
the history).
