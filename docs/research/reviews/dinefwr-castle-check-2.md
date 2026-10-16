---
title: Check 2 of dinefwr-castle.md
kind: review
status: current
updated: 2026-10-16
---

# Check 2: Dinefwr Castle, phase by phase, for a Blender model

Reviewed note: [`../dinefwr-castle.md`](../dinefwr-castle.md) (status: draft, 2026-10-10), after
[check 1](dinefwr-castle-check-1.md) and the second-Opus review recorded there.

**This is the independent check the todo path's step 3 asks for**: a second Opus checked every documented claim
against the sources and reported six important findings and a list of suggestions. Each was then **verified again
against the source, fetched afresh** (the Cadw listing, the HER record, castlewales.com, medievalheritage.eu, the Brut
in the Rolls Series translation, Renn's pages from the Welsh Journals page images, and both Cadw plans downloaded and
measured), before being fixed. The verdicts below say what was found, not what was reported. Fixes were made by a Claude
agent working from the findings, so the fixes themselves still want a reader who did not make them.

**Corrected 2026-10-16 by [check 3](dinefwr-castle-check-3.md):** finding 3's "S11 needs no 5% correction" held for the 1280 panel only; finding 1's "about 1500 at most" and its "end of the 15th century" credit to the HER were not the HER's words; and the suggestion that "all ten kits cite `fort:S1`" was wrong (seven do). The table below is left as written.

## Important findings

| # | Finding | Verified against | Verdict | Fix |
|---|---|---|---|---|
| 1 | "a residence to Sir Rhys ap Thomas's death in 1525 [S2][S3][S9]" and "working at it to 1525": none of the three says 1525 | Listing: "Late C15 additions"; HER: "In Tudor times, it was modified by Sir Rhys ap Thomas, but he soon abandoned the castle in favour of a new mansion at Newton House"; medievalheritage: "At the end of the fifteenth century ... carried out its rebuilding". A search of S1, S2, S3, S8 and S9 for "1525" finds nothing; it is only the DWB's death year [S21] | **Confirmed.** An unsupported date had been put in three places | The Tudor reading now reads: works at the end of the 15th century, then "soon abandoned", ending the castle about 1500 (an estimate from "soon"). Summary, Phase 4, the phase table (`dinefwr-castle`, `dinefwr-decay`, the dates line) and the open-questions row all say c. 1450, or about 1500 on the Tudor reading |
| 2 | 1213: "Walls and one tower held against engines and ladders" contradicts the Brut | Rolls Series 1860, 1213: "he placed engines and inventions for attacking the castle; and placed ladders against the walls ... and thus did he possess himself of the castle altogether, save one tower; and in that the garrison secured themselves in fighting and defending, with missiles and other engines ... they were compelled, before the afternoon, to surrender the castle; and they delivered three hostages" | **Confirmed.** The Summary had been corrected; Phase 2 still carried the old reading, and called Cadw's reading a second source (it is Cadw's gloss on the same entry) | Phase 2 now follows the Summary: walls scaled and taken, one tower held out until before the afternoon; Cadw's "walls and a tower strong enough to withstand siege engines" is a reading of the Brut, not a second source. Heading changed to "documented: the chronicle" |
| 3 | The 1280s inner gatehouse is missing | S9: "perhaps a gatehouse was placed" and the grand stair partly occupies "the site of a lost gatehouse from the late 13th century"; S8: the new gate "may have been an extensive remodelling ... creating an inner gate and barbican from the original gatehouse, which was itself extended outwards" (the note had dropped "may have been"); S11's 1280, 1330 and 1750 panels viewed: two hollow square towers either side of the inner gate in 1280 and 1330, gone in 1750 where the grand stair stands | **Confirmed.** Measured: S11 fitted to the survey by the same method as S10 (the keep and north-west tower centres from the survey, three corners from the S10 fit), residuals 0.35-1.0m. Towers about 5.1 x 5.2m and 5.1 x 4.9m outside, hollow about 2.6m, centres (1.7, -15.4) and (7.8, -15.5), drawn gap about 1m at (4.8, -16.1), 1.4m from S10's Inner Gate (4.4, -17.5), which is a consistency check. **A discrepancy with the brief**: S11 needs no 5% correction (6.52 px/m fitted against its 20m bar's 6.63, 2%, within reading error); the 5% excess is S10's alone, so S11 was used at its own fit, not S10's | Part `dinefwr/gatehouse-inner` added to `dinefwr-crown` (and so every later phase), dated 1280 to before 1750, ending at the start of `dinefwr-summerhouse` and always before `dinefwr/stair-grand`; a "parts as recorded" row; Summary and 1280s narrative; contested point 15. **Tier: reconstructed** (one source, Cadw; S9 hedges with "perhaps"; nothing stands to measure), the first of the two readings the finding allowed ("tiered from Cadw only") |
| 4 | The kit list keeps `merlon-and-crenel` though `top: 'battlements'` carries the crenellations | `src/domain/plan.ts`: a wall's, prism's and tower's `top` includes `'battlements'`; no merlon or crenel size is recorded anywhere | **Confirmed.** A kit that claims nothing | Dropped, with a sentence saying why and what would justify one (a measurement) |
| 5 | "survive only in short lengths" is quoted as `models:S22` but S22 says otherwise | medievalheritage: "Only the outer bailey is in the poor state of preservation, currently covered with forest and without any significant visible stonework fragments"; and the phrase "short lengths" is in no source read (searched all fetched texts) | **Confirmed.** An invented quotation; `building-models.md` row 172 carried the paraphrase | Quotation marks dropped; the rows cite what S9 says; the ruin phase draws the outer wards as banks and ditches on the terrain model, with no standing outer-ward wall on S9's authority; `building-models.md` corrected and marked |
| 6 | Many plan rows marked documented rest on the Cadw guide or plans alone | The note's own rule says S1, S8 and S9 agreeing is one source | **Confirmed.** **Rule applied: documented (one source: Cadw).** The schema allows `documented` on one reputable source, but CLAUDE.md asks for two independent ones, so the label says the cross-check is not met and these parts are the first to re-check; **reconstructed** only where nothing stands and Cadw hedges or draws a dashed line (the gatehouse; the east curtain already). Plain **documented** only with a second independent strand (the survey where fabric stands, the listing, the HER, Renn, the paintings). The HER's grey-literature titles (Crane 2002, Murphy and Ramsey 2001) are named but unread, so they are not counted as a second source | Rule stated in the paragraph after "How it was done"; labels applied to `gate-inner`, `gate-middle`, `gate-outer`, `gate-se`, `latrine-sw`, `latrine-turret`, `turret-s` (the survey fits it as a control point), `west-building`, `stair-grand`, `cross-walls`, `barbican`, `curtain-north` (the surveyed wall-top shows a wall stands), `outer-ward-wall` and `outer-ward-lower` (banks agree to about 5m) and the matching "parts as recorded" rows. Not done: a second source for any of them |

## Suggestions

| Suggestion | Verdict | Where |
|---|---|---|
| Renn page numbers | **Confirmed on the page images**: the roll-moulded string course is p. 134 and the ivy p. 137 (the draft cited p. 139); p. 140 has the Dynevor entry and "200 ft.a.s.l."; p. 132 has the three symmetrical openings and the "plastered over" group | Source S17; the text now cites pages |
| Renn's "1185-1245" into contested point 4 | **Confirmed** (p. 137: "points to the period 1185-1245, from Longtown to Tretower. Bronllys and Builth are rather later"). A date for the group, Dynevor not singled out; it would admit a keep of the Lord Rhys's time (an inference) | Contested point 4 and the Phase 3 text |
| Renn's "200 ft a.s.l." against the measured ~100m OD | **Confirmed**: 200 ft is 61m, the ward floor is 99.7-100m (about 330 ft). Noted, not resolved | The ridge bullet |
| Ownership: NT (S26) against the Dyfed Wildlife Trust (Moore, 1979) | **Confirmed as a contradiction**, stated and not picked; a later transfer would reconcile them and no source says so | Phase 5, contested point 17, Gaps, open-questions.md |
| "via the King's Works" | **Confirmed**: S8 says "documentary sources reveal", naming none; the King's Works is where they are likely to be, not read | 1280s bullet |
| Crenellated barbican in the 1280s as an inference | **Confirmed**: S8 calls the wall crenellated only for its post-1403 rebuilding | Barbican row in `dinefwr-crown` |
| Prisms: ADR 0053 refuses them | **Confirmed** (ADR 0053 lists "ruins, prisms and bridges" as refused by the sheet); the chamber block and any prism ring need build support | Build list point 2 |
| Turret function contested (S8 watch turret, S9 latrine turret) | **Confirmed** (S8: "equipped with a watch turret"; S9: "four-sided latrine turret") | `latrine-turret` and `turret-s` rows, contested point 14, open-questions.md |
| The 1316 burning into open-questions | **Confirmed**: Wikipedia's "recorded to have been burnt" cites Cadw's page, which has nothing on it; medievalheritage says "attacked ... but avoided significant damages". `timeline-and-earliest-occupation.md` row 187 marks it documented on one uncited source and was **not** changed here | open-questions.md, contested point 16 |
| Lord Rhys phase reusing the Roman forts' kits | **Confirmed**: all ten kits in `src/content/kits.ts` cite the Roman fort survey (`fort:S1`) | A paragraph before the Welsh-stone phase; build list point 3 |
| The painting's roofed tower: the middle gate as a candidate | **Plausible, tentative**: in the south-west painting the tower is directly right of the keep, the keep's south-east side from that viewpoint, where the Middle Gate and the curtain's south-east end lie, while the south turret and the inner gatehouse lie left of the keep. The painter's viewpoint is not known | Phase 5 and the roofed-turret row |

## What this check did not do

- Re-measure the S10 fit (check 1 did); the S11 fit used eyeballed pixel positions off a 3x enlargement (about ±3 pixels,
  under 0.5m), so each gatehouse position carries about ±2m.
- Read the Cadw guidebook, the HER's grey literature, the King's Works or Kenyon. Every "one source: Cadw" label stays
  until one of those is read.
- Re-check the claims check 1 confirmed and this check was not told were wrong.
