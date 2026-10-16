---
title: Check 3 of dinefwr-castle.md
kind: review
status: current
updated: 2026-10-16
---

> **Partly superseded by [check 4](dinefwr-castle-check-4.md).** Finding 2's fix (the towers set 3.0m apart) and the
> reasons given for it were wrong and are withdrawn; the S2 "1966 designation text" independence claim in finding 5a and the
> `fort:S14` description in the suggestions were also wrong. Those cells below now say so rather than being quietly
> rewritten.

# Check 3: Dinefwr Castle, a third independent read

Reviewed note: [`../dinefwr-castle.md`](../dinefwr-castle.md) (status: draft), at commit c77fd89, after
[check 1](dinefwr-castle-check-1.md) and [check 2](dinefwr-castle-check-2.md).

A third read, by a reader who had not made either of the earlier fixes, reported five important findings and a list of
suggestions. Each was **verified again before it was fixed**: the cached Cadw listing, the HER record,
medievalheritage.eu and castlewales.com texts, and the Rolls Series Brut were searched for the quoted words, and the S11
image (1300 x 1013 pixels) was re-measured from the pixels. Fixes were made by a Claude agent working from the findings,
so they still want a reader who did not make them. Whether the findings are right is not taken from the reader: the
verdicts below say what was found.

## Important findings

| # | Finding | Verified against | Verdict | Fix |
|---|---|---|---|---|
| 1 | "S11 needs no scale correction" holds only for its 1280 panel | The S11 image. Hole centres of the keep and the north-west tower found by connected-component analysis on each panel; survey distance between them 40.36m. 1250-70: 273.5 px (6.78 px/m); 1280: 261.4 (6.48); 1330: 296.1 (7.33); 1750: 292.2 (7.24). The shared 20m bar runs 131 px at the row measured (130-133 allowing for tick width), 6.5-6.65 px/m. The keep's hole is 46-50 px wide on the 1230-50, 1250-70 and 1280 panels and 53-54 on the 1330 and 1750, the same ratio as the distances, so it is scale and not a moved tower | **Confirmed to the pixel.** The earlier fit was right for its panel (a two-point fit on the 1280 hole centres gives 6.48 px/m against the first fit's 6.52) and wrong as a statement about "Cadw's two plans" | The Summary, the S11 source line and the plan row now say the fit is the 1280 panel's, record the four scales, and require a per-panel fit before measuring any other panel; "not common to Cadw's two plans" is gone from the note, `findings.md` and `build-log.md`; the open-questions scale row has the panel point; the Gaps list names the unfitted panels |
| 2 | `dinefwr/gate-inner` has a 3m passage estimate but the gatehouse towers leave a 1.0m gap | The 1280 panel: tower hole centres (959.6, 312.4) and (999.2, 316.7) px, 6.1m apart on the two-point fit, each tower about 5.1m across, so the gap is 1.0m (**check 4 re-measured the gap from the pixels at 8-9 clear pixels, 1.2-1.4m, and found S10 draws the gate 1.2-1.5m wide, not "a hairline"**). The fit's two-point result is (2.0, -15.3) and (8.1, -15.3) with rotation 5.7 degrees, against the first fit's (1.7, -15.4) and (7.8, -15.5) and 4.2 degrees (a difference of 0.3m) | **Confirmed.** The reader's two-point numbers reproduce | **Withdrawn in check 4.** The fix made here treated Cadw's gap as schematic and set the towers 3.0m apart as a "departure from the plan", on the grounds that a 1m gap leaves no gate and that nothing says the passage was that narrow. Both grounds were wrong: both Cadw plans draw the gate about 1.3-1.5m wide, and S9's "the door's bar hole" fits a door-width gate. The model now follows the drawings: towers on the fitted centres, a door of about 1.4m |
| 3 | Tudor credit: the HER says only "In Tudor times"; "end of the 15th century" is the listing's and S9's | `her.txt`: "In Tudor times, it was modified by Sir Rhys ap Thomas, but he soon abandoned the castle in favour of a new mansion at Newton House". Listing: "Late C15 additions by Sir Rhys ap Thomas". medievalheritage: "At the end of the fifteenth century ... carried out its rebuilding" and "In 1531 his grandson, Rhys ap Gruffydd, was executed for treason, and the castle was confiscated by the Crown, though later the family could get it back" | **Confirmed.** The note, after check 2's fix, had credited the end of the 15th century to all three sources, and its "about 1500 at most" reasoned from that credit | Credit given correctly everywhere; the end is now a range, **c. 1485-1525, with c. 1500 as the estimate** (the HER's "Tudor times" from 1485; 1525 is Sir Rhys's death in the DWB, the latest he could have worked there: an inference, labelled), and the 1531 confiscation is recorded as a holder, not a resident. Fixed in the Summary, Phase 4, the phase table, `findings.md`, `open-questions.md` and `build-log.md` |
| 4 | The `turret-s` row ends "Its function is contested: a latrine turret (S9)" | S9: the south turret is "a four-sided turret ... Inside it was a small room with a latrine"; S8: "the southern turret was constructed as part of the new gate arrangement". The watch-or-latrine contest is about the chamber block's turret (S9 "four-sided latrine turret" against S8 "equipped with a watch turret") | **Confirmed.** Check 2 had put the contest on both turrets | Clause deleted; the contest stays on `latrine-turret`, the chamber-block row, contested point 14 and `open-questions.md` |
| 5a | The listing (S2) says Edward I added "a gatehouse ... on S"; the tier rule did not use it, and "nothing stands to measure" ignores S9's loop holes | S2 text: "partly remodelled by King Edward I with a gatehouse added on S and a rectanuglar tower on N". S9: "only the lateral loop holes and the door's bar hole remain from the inner gate" | **Confirmed.** | **Decision on S2:** it was counted here as an independent *document* (a 1966 designation text, not derived from the 1999 guide; **check 4: the cached report gives only the 1966 designation date, its description is undated, so its independence from the guide is not known**) but it is Cadw's own and does not say which southern gatehouse, so it is cited as **unspecific support** on `gate-inner`, `gatehouse-inner` and the barbican and does not lift any one-source label; applied the same way to the hall, where it supports existence but not the 13 x 6m size. `gatehouse-inner`'s "nothing stands to measure" now says what S9 says remains, that it is not measured here and gives no size for the towers |
| 5b | Outer ward walls: "documented" on banks | S9: the outer bailey is "without any significant visible stonework fragments"; the banks on the terrain model show the line of an enclosure, not a wall | **Confirmed.** | The rows now read "line documented (plan plus banks); the stone wall one source: Cadw" in the parts table and the plan rows (`outer-ward-wall`, `outer-ward-lower`) |

## Suggestions (all done)

| Suggestion | Verdict | Where |
|---|---|---|
| The hall's 13 x 6m tier says "documented (size)" but is single-source | **Confirmed**; labelled "one source: S9, Cadw's guide" | Plan row and parts row for `dinefwr/hall` |
| "Every one of today's ten kits cites `fort:S1`" | **Wrong, confirmed from `src/content/kits.ts`**: seven cite `fort:S1` (the two post towers, turf courses, ledged leaf, timber frame, shingle and thatch roofs); `tower-boarding`, `post-and-board-breastwork` and `plank-deck` cite only `fort:S16` (Jay Lane); `fort:S14` and `fort:S15` are Trawscoed, another Roman fort, not the vicus (**wrong, check 4: `fort:S14` is the geophysical survey round the Trawscoed and Llanio forts, which is vicus evidence; only `fort:S15` is the Wikipedia Trawscoed page**). The conclusion (Roman evidence, none medieval) stands | The kits paragraph in the note, `findings.md`, `build-log.md`, a pointer in check 2 |
| 1213: "a strong tower" is Cadw's gloss; add the conditional surrender | **Confirmed** against the Rolls Series: "they delivered three hostages, and gave up the castle, unless they should receive support by the evening of next day, under an agreement to have their clothes and their arms, with the safety of their limbs" | Summary (heading and text), Phase 2, `findings.md` |
| The summerhouse phase header should say `gatehouse-inner` has closed | Done | Phase `dinefwr-summerhouse` header |
| Record the gatehouse fit's control-point pixels and image size, and the reader's two-point result | Done: image 1300 x 1013; keep hole (1071.4, 269.7) and north-west tower hole (916.7, 59.0) against (18.5, -7.0) and (-8.5, 23.0); the first fit's three corner pixels were **not recorded** and cannot be recovered, so the two-point fit is the reproducible one | The S11 source line and the Summary |
| Renn's "200 ft" may be height above the valley floor | Added as an **alternative reading, an inference**: about 77m (about 250ft) above the 23m floodplain, nearer his figure than 330ft but not 200ft. Renn's page was not re-read in this pass | The ridge bullet |
| Blender build list: a content test for a "one source" note on Cadw-only documented parts | Added as build-list point 7 (`Provenance` `documented` has an optional `note` shown by `basisOf`) | The build list |

## What this check did not do

- Re-read Renn p. 140 or the Moore pages; the "200 ft" alternative reading is the reader's, not checked against the page.
- Fit the 1230-50, 1250-70, 1330 or 1750 panels to the survey (only their keep-to-north-west-tower distances were measured).
- Read the Cadw guidebook, the HER's grey literature or the King's Works; every "one source: Cadw" label stays.
- Settle whether S2 is independent of the guide: the rule above is a choice, made consistent, not a finding.
