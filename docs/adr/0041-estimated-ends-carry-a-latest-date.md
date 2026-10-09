---
title: "ADR 0041: An estimated end can carry the latest date its sources allow"
kind: adr
status: accepted
updated: 2026-10-09
---

# ADR 0041: An estimated end can carry the latest date its sources allow

- **Status:** Accepted, amends [0035](0035-exact-dates-are-about-dates-not-clues.md) alongside [0037](0037-estimates-carry-an-earliest-date.md)
- **Date:** 2026-10-09
- **Decided by:** Claude, under the proactive mandate (ADR 0027), for the Roman forts (issue 3); Dewi can
  overrule it.

## Context

A feature whose dates are "c." fades out over `FADE_T` (0.012 of the slider) after its `to`. In the Roman
stretch of the timeline (AD 74 to 410 across 0.07 of the slider) that is about 57 years, so Fort 1, given up
"between AD 78 and 83" on the report's speculative reading, would still be 70% present in AD 100 and half
present about AD 107, drawn beside the Fort 2 that replaced it, which is what a Fort 1 ditch lying under Fort 2's
levelling rules out. Fort 2's own end ("abandoned by AD 140", with troops perhaps gone by the mid-120s) had
the same fault: 81% present in AD 132 and still drawn to about AD 180. ADR 0037 gave a start an earliest date;
an end had no equivalent, and the only other switch, `datesExact`, is for dates a source states at both ends.

## Decision

A feature without exact dates may carry `notAfter`, the latest date a source allows for its end. Its fade-out
then runs from `to` to the earlier of `to + FADE_T` and `notAfter`, and where the two are the same it switches
off after `to`. The type makes `notAfter` exclusive with `datesExact` (`FeatureDating`), the feature builder
passes it through, and a content test holds that `notAfter` is never before `to`, never on an exact feature,
and is carried only by the three Roman features that need it.

- Fort 1: from AD 74 (never before AD 70, the start of the Flavian period, since pre-Flavian pottery is
  absent), to AD 78 and gone by AD 83, the report's speculative reading.
- Fort 2: from about AD 82 (the Heneb record's unproven reading; never before AD 78), to about AD 125 and gone
  by AD 140.

## Consequences

An estimate keeps its soft fade where the sources leave room for it and no longer outlives its sources. In AD
80 both forts are part present (Fort 1 about 0.65 and falling, Fort 2 about 0.5 and rising), which is what the
uncertain handover looks like; in AD 90 only Fort 2 stands. The dates are Claude's reading of "perhaps", "may"
and "by": `notAfter` 83 is the same speculation's far end, not an attested date, and the ⓘ says so.

## Alternatives considered

Exact dates for both forts (ADR 0035 reserves them for dates a source states, and the forts' are hedged);
moving `to` early so the fade finished near AD 83 (a date chosen for the fade, not the history); a per-feature
fade length (a second switch that means almost the same).
