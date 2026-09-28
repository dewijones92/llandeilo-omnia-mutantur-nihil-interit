---
title: Research index
kind: index
status: current
updated: 2026-09-26
---

# Research

Each note was written by a research agent working from real sources (WebSearch and WebFetch),
following the method in [`process.md`](process.md). The brief each agent was given (task text verbatim) is kept in
[`briefs/`](briefs/) so a pass can be repeated, extended or audited. Every note separates what is
documented, what is reconstructed by analogy, and what is unknown.

**Start with [`findings.md`](findings.md)**: the headline outcomes, the corrections, and the decisions
the research drove.

| Note | Covers | Status | Brief |
|---|---|---|---|
| [timeline-and-earliest-occupation](timeline-and-earliest-occupation.md) | Earliest evidence of people; key dates to today | draft | [brief](briefs/timeline-and-earliest-occupation.md) |
| [era-iron-age](era-iron-age.md) | c. 800 BC – AD 75: Garn Goch, hillforts, roundhouses, Demetae, Roman arrival | draft | [brief](briefs/era-iron-age.md) |
| [era-medieval-to-1282](era-medieval-to-1282.md) | St Teilo to the conquest: Dinefwr, Carreg Cennen, Dryslwyn, Talley, the 1282 battle | draft | [brief](briefs/era-medieval-to-1282.md) |
| [era-victorian](era-victorian.md) | c. 1830–1901: Rebecca Riots, bridge, railway, chapels, gentry and tenants | draft | [brief](briefs/era-victorian.md) |
| [language-by-class](language-by-class.md) | Spoken language over time and by class; sample phrases | draft | [brief](briefs/language-by-class.md) |
| [deep-time-and-natural-history](deep-time-and-natural-history.md) | Geology, ice ages, vegetation, animals, climate | draft | [brief](briefs/deep-time-and-natural-history.md) |

All six are `draft`: produced in one pass on 2026-09-26, with WebSearch quota exhausted part way
through (see [`process.md`](process.md)). None has yet had an independent verification pass.

## Citing these notes

Each note's `## Sources` list is extracted into `src/content/generated/sources.ts` by
`node tools/research/extract-sources.mjs`, and content cites sources as `src('medieval:S27')`.
An unknown id is a compile error, and CI fails if the generated file is out of date. If a note's
sources are renumbered, every citation of it must be re-mapped by title, not by number.
