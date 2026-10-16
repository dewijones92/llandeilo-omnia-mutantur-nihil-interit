---
title: Check 4 of dinefwr-castle.md
kind: review
status: current
updated: 2026-10-16
---

# Check 4: Dinefwr Castle, a fourth independent read

Reviewed note: [`../dinefwr-castle.md`](../dinefwr-castle.md) (status: draft), at commit 69f28ac, after
[check 1](dinefwr-castle-check-1.md), [check 2](dinefwr-castle-check-2.md) and [check 3](dinefwr-castle-check-3.md).

A fourth reader, who had not made the earlier fixes, reported two important findings and a list of suggestions. The
first finding says check 3's own fix was wrong. Each point was **re-measured or re-read before it was fixed**: S10
(1300 x 1157 pixels) and S11 (1300 x 1013) were read pixel by pixel, the fort kits' citations from `src/content/kits.ts`,
and the Roman-forts note's source list. The fixes were made by a Claude agent from the findings, so they still want a
reader who did not make them. The verdicts say what was found, not what the reader said.

## Important findings

| # | Finding | Verified against | Verdict | Fix |
|---|---|---|---|---|
| 1 | The inner gate is drawn about 1.3-1.5m wide by both Cadw plans; "S10 draws a hairline gap", "nothing says the passage was that narrow", "too close for a gate" and "inside the fit's ±2m" are wrong | **S10** on the row y 730: the red curtain fill stops at x 397 and resumes at 411, 13 pixels between the fills (10 fully white), 1.2-1.5m at the ground's 8.58 px/m (1.3-1.6m at the bars' 8.2). S10 draws no gatehouse towers (they are lost; it is a period plan). **S11**, 1280 panel, clear white pixels between the two towers' outlines on rows y 306, 309, 312, 315 and 318: 8, 8, 9, 9, 8, so 1.2-1.4m at 6.48 px/m. Towers measured on the same rows: 32-33 pixels edge to edge (4.9-5.1m), clear hole 12-13 pixels (1.9-2.0m), tower centres 41 pixels (6.3m) apart. **S9**: "only the lateral loop holes and the door's bar hole remain from the inner gate", a door with a bar, so a door-width opening | **Confirmed.** The reader's S10 profile (x 398-410) and S11 profile (8-9 clear pixels) reproduce. Two points the reader did not make: (a) the note's "gap of about 1.0m" was the 6.1m centre spacing minus a 5.1m tower width, which carries both figures' errors; the clear pixels are 1.2-1.4m. (b) Whether the outline strokes (2-3 pixels each) are drawn inside the walls or centred on their faces is not known, so the gap could be up to about 1.9m; the note says so | **Decision (Claude, under the proactive mandate, [ADR 0027](../../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)): follow the drawings.** The towers sit on the **two-point refit's centres, (2.0, -15.3) and (8.1, -15.3)** (rotation 5.7 degrees), not the first fit's: that refit's control pixels are recorded and it can be redone, where the first fit's three corner pixels were not recorded; the two differ by 0.3m. `gate-inner` is a door of **about 1.4m (1.2-1.5m)**, "one source: Cadw". The 3.0m "departure", the 0.35 / 8.45 centres and the 3m passage estimate are gone from the parts table, the plan row, the build list, contested point 15, `findings.md` and `open-questions.md`; check 3's finding 2 now says the fix was withdrawn. The tower size (5.1m outside, 2.6m inside) is not reproduced by a direct read (4.9-5.1m, 1.9-2.0m), so it is now "about ±0.5m", not re-fitted. A Gaps item records that S9's loop holes and bar hole may give the real width |
| 2 | The tier columns of `gate-inner` and `gatehouse-inner` do not say what is Cadw's and what is the fit's | The rows as they stood: "documented (one source: Cadw)" and "reconstructed (one source: Cadw for the towers' form and place)". The place of the towers is not Cadw's measurement: it comes from fitting S11's 1280 panel to the LiDAR, which fixes nothing of the lost towers | **Confirmed** | Both rows now say it. `gate-inner`: existence, form and the 1280s date one source (Cadw); place the fit's (S10 on the LiDAR, residual up to 1.1m); width read off both plans here, stated by no text. `gatehouse-inner`: existence, form and gap Cadw's; place and spacing the fit's (±2m, on the 1280 panel's own scale). New build-list point 8: the `gatehouse-inner` provenance note must state that its spacing comes from the 1280 panel's fit, and `gate-inner`'s says the same of its place and width (the research-gaps point is now 9) |

## Suggestions (all done)

| Suggestion | Verdict | Where |
|---|---|---|
| Check 3 called S2 "a 1966 designation text, not derived from the 1999 guide" | **Confirmed wrong as a claim.** The cached report gives only the designation date, 8 July 1966; its description is undated, so its independence from the guide is **not known**. Its "gatehouse ... on S" reading may share an upstream source with the guide (a lead, unverified) | A new paragraph after the tier rule, the independent-strands sentence (the listing is no longer listed as an independent strand), and check 3's finding 5a |
| Build-list point 7 says S9, S10 and S11 are one source "in three forms" | **Confirmed**; the same note says five forms (S1, S8, S9, S10, S11) | Point 7 |
| The 1250-70 "inner gatehouse" inside the south-east gate is confused with `gatehouse-inner` | **Confirmed**: two different buildings carried the same name | Phase table, Summary and `building-models.md` now say "the south-east gate's gatehouse (`gate-se`)" |
| S2 missing from the barbican's Sources column | **Confirmed**: the Tier column cites it | The `dinefwr/barbican` row |
| `fort:S14` is "another Roman fort, not the vicus" | **Wrong, confirmed**: `fort:S14` is Gwynedd Archaeological Trust's geophysical survey round the Trawscoed and Llanio forts, vicus evidence (`roman-forts-and-vicus.md` S14). In `src/content/kits.ts` the **thatch roof** cites it (with `fort:S1`) and the **turf courses** cite `fort:S15`, Wikipedia's Trawscoed page, a lead | The kits paragraph in the note, `findings.md`, check 3's suggestions table. The conclusion (every kit is Roman evidence or analogy) stands |
| 1213 wording | Reworded as the reader asked: the garrison "agreed before the afternoon to surrender, unless relieved by the next evening", with the Brut's own words quoted after it | The Summary, Phase 2, `findings.md` |

## What this check did not do

- Look at photographs of the inner gate's loop holes and bar hole, or at the LiDAR there, which might give the real
  width (now in Gaps).
- Settle whether the outlines on S10 and S11 are drawn inside or centred on the wall faces, so the gate's width is a
  range, 1.2-1.5m on the clear pixels and up to about 1.9m on the other reading.
- Fit the 1230-50, 1250-70, 1330 or 1750 panels, or re-fit the 1280 panel for the towers' size.
- Read the Cadw guidebook, the HER's grey literature or the King's Works; every "one source: Cadw" label stays.
- Establish whether S2's description predates the guide.
