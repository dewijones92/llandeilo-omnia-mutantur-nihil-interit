---
title: "ADR 0037: An estimated date can carry the earliest date its sources allow"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0037: An estimated date can carry the earliest date its sources allow

- **Status:** Accepted
- **Date:** 2026-10-03
- **Decided by:** Claude, under the proactive mandate (ADR 0027), for the review of the estimated
  railway lines; Dewi can overrule it.

## Context

A feature whose dates are "c." fades in over a stretch of the slider before its `from` (`FADE_T`,
about 17 years around 1840), and a railway section is drawn once its presence passes one half
(ADR 0034). When Dewi decided on 2026-10-03 to draw the undated railway lines as labelled estimates,
the colliery line at Gwaun-cae-Gurwen, guessed "c. 1841", was half drawn by 1830 and visible from about
1822, though the railway reached Gwaun-cae-Gurwen only on 6 May 1841 and the Llanelly Railway opened
only on 10 April 1840. The Gwendraeth line, "c. 1870", showed from about 1857, before the Acts of
1865–66 and the opening of 23 June 1869. An estimate is uncertain about when, but some of its bounds are
documented, and the fade crossed them.

## Decision

A feature without exact dates may carry `notBefore`, the earliest date a source allows for its start.
Its fade-in then runs from the later of `from - FADE_T` and `notBefore`, up to `from`; where the two
dates are the same it switches on at that date. Nothing is drawn before `notBefore`. The type makes
`notBefore` and `datesExact` exclusive (`FeatureDating`), and a content test holds that `notBefore`
never falls after `from` and that every estimated railway section has one.

## Consequences

- An estimate keeps its "c." fade where the sources leave room for it, and loses it where they do
  not: the colliery line switches on at 6 May 1841, and the line past the Hirwaun Isaf incline, dated
  to the month, fades in across June 1886.
- Features without `notBefore` are unchanged.
- A section is drawn at the midpoint of its fade, so a short fade between a documented earliest date
  and a "c." date draws it between the two, which is what the ⓘ says.

## Alternatives considered

Fading every "c." feature in after its `from` rather than before it (changes every feature at once,
and moves all the uncertainty to the later side, which ADR 0035 already rejected); moving the
estimates' `from` later to hide the early fade (a date chosen for the fade, not the history);
giving them exact dates (ADR 0035: they are not dated by a source).
