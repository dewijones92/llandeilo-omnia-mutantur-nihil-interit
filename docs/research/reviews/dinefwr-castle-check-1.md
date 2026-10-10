---
title: Check 1 of dinefwr-castle.md
kind: review
status: current
updated: 2026-10-10
---

# Check 1: Dinefwr Castle, phase by phase, for a Blender model

Reviewed note: [`../dinefwr-castle.md`](../dinefwr-castle.md) (status: draft, 2026-10-10). Repo state: the worktree
branch `worktree-wf_1b05b839-3c0-2`, with `main` merged in at `bb02d08` (the Blender pipeline and the forts as Blender
models) before the note was written.

**This check is not independent.** It was written by the same agent that wrote the note, on the same day, because no
second agent could be started from inside the workflow that commissioned it. It is a second reading of each claim
against the downloaded sources, with every quotation tested by a script, not the fresh pass by another reader that the
todo path's step 3 asks for. That pass is still owed before the castle is built.

## Method

- Every source was downloaded into a scratch folder and read as text: HTML stripped of tags (Coflein, the listing,
  the HER records, Gatehouse, castlewales.com, medievalheritage.eu, the DWB, Cadw and National Trust pages); the Rolls
  Series Brut as the Internet Archive's full text; Moore 1994 and Renn 1961 as page images from Welsh Journals (IIIF),
  OCR'd with tesseract and checked against the images where a word mattered (Moore p. 216 was read from the image in
  full).
- **Every quotation in the note was tested by a script** against those texts, whitespace-insensitive: 51 quotations
  from the web sources and 14 from Moore, all found (OCR spellings such as "rool" for roof and "fla stones" for flat
  stones were checked against the page images).
- The measurements were re-run from the raw rasters: the keep's and the north-west tower's centres fitted again, the
  keep profiled in half-metre rings, the wall-tops sampled along each wall, the ditches profiled at four northings and
  two eastings, and the plan's five-point fit recomputed (residuals 0.6-1.1m).
- "Second source" below means a source that does not copy the first. Where both go back to the Cadw guidebook (Coflein,
  castlewales.com and medievalheritage.eu all do), the verdict says **one source, two routes**.

## Claims checked

| # | Claim in the note | First source | Second source | Verdict |
|---|---|---|---|---|
| 1 | Coflein's reference is SN 61150 21731 | Coflein [S1] | Gatehouse quotes it as SN61152173 [S7]; listing E 261149 N 221730 [S2]; HER SN6114921730 [S3] | Confirmed (four records within 1.5m) |
| 2 | The keep's centre is E 261168.5 N 221724.0 | LiDAR DSM ring fit [S24] | The plan's keep, fitted with four other points, lands 1.1m away [S10] | Confirmed (survey) |
| 3 | The north-west tower's centre is E 261141.5 N 221754.0 | LiDAR fit [S24] | The fitted plan puts it 0.7m away [S10] | Confirmed |
| 4 | The plan's bar is about 5% long against the ground | Fit of S10 to S24 (8.58 against 8.15 px/m) | The keep-to-tower distance alone gives 8.6 px/m | Confirmed (two measures of one fit; no published statement) |
| 5 | Keep "some 12m across" | Coflein [S1] | Gatehouse carries the same text [S7] | Quotation confirmed; the size itself is contradicted by S9, S10 and S24 |
| 6 | Keep "13.5 meters and walls 2.6 meters thick" | medievalheritage [S9] | No second text gives 13.5m | Single source (text); measured 13.6m [S10][S24] agrees |
| 7 | Keep 13.6m over the drawn wall, walls 2.9m, inside 7.7m | Plan at the ground's scale [S10] | DSM: wall-walk ring out to 14.6m, which a 1m maximum grid widens [S24] | Confirmed within the survey's resolution |
| 8 | Keep: battered base with a roll-moulded (half-round) string course | Renn 1961 [S17] | medievalheritage, after the Cadw guide [S9] | Confirmed (independent) |
| 9 | Keep: first-floor entrance; ground floor reached from above; three slits on the first floor | medievalheritage [S9] | Renn: three symmetrical window openings, one opposite the entrance passage (said of Dynevor and Lyonshall) [S17] | Partly: the three openings confirmed; the entrance level single-source |
| 10 | Keep's ground-floor door: possibly original, or 14th century | Renn [S17] | medievalheritage [S9]; Cadw guide "may" 1326 [S8] | Confirmed as contested |
| 11 | Keep "now a two storey stump" with the summerhouse's remains | Coflein [S1] | Renn: "a relatively modern 'folly' on top" [S17]; Moore's plate 8 and text [S16] | Confirmed |
| 12 | Keep floor 100.9m OD; wall-walk 110.4m; top storey to 113.6m | DSM and DTM [S24] | Re-run in half-metre rings: same values | Confirmed (one survey, measured twice) |
| 13 | Inner ward floor 99.7-100.0m OD | DTM median [S24] | Five spot samples 99.7-100.0 | Confirmed |
| 14 | Curtain wall-tops 104.5-107m, 110m by the keep; north 106.1m | DSM along five lines [S24] | The DSM image shows flat, continuous wall-tops on those lines | Confirmed (survey); today's heights only |
| 15 | Curtain 1.8m thick | medievalheritage [S9] | Plan as drawn, 1.4-1.6m at the ground's scale [S10] | Contradicted by the measure; kept contested |
| 16 | Courtyard "approximately 50 x 28 meters" | medievalheritage [S9] | Measured outside the walls about 48m east-west and 45m north-south [S10][S24] | Not confirmed: the measure is of a different thing (outside, not the courtyard); the note quotes the text and gives the measure separately |
| 17 | North-west tower about 7m | medievalheritage [S9] | Plan 7.9m at the ground's scale [S10]; DSM top about 9m before the grid's widening [S24] | Contradicted; kept contested |
| 18 | "a smaller round tower at the northern angle" | Coflein [S1] | Listing "a circular tower to NW" [S2]; plan [S10] | Confirmed (the angle is the north-west one) |
| 19 | Chamber block projecting beyond the curtain, basement and two floors, latrine turret | medievalheritage [S9] | Cadw guide via castlewales: "projected beyond the line of the northern curtain wall, and was equipped with a watch turret" [S8] | One source, two routes (Cadw guide) |
| 20 | "fine towered lodgings along the north-east curtain" | Coflein [S1] | Listing: "a rectangular tower on N" [S2] | Confirmed in substance |
| 21 | Hall 13 x 6m, first floor over a store | medievalheritage [S9] | None for the size; the hall's place on the plans [S10][S11] and in the Cadw guide [S8] | Size single-source |
| 22 | The phase order: curtain and keep 1230-50; north-west tower 1250-70; chamber block 1280; hall 1330; summerhouse, stair and cross walls 1750 | Cadw phase plans [S11] | Cadw period plan [S10]; Cadw guide's narrative [S8] | One source (Rees and Caple) in three forms; consistent with itself |
| 23 | The keep group "conventionally dated to around the 1230s" | Cadw guide [S8] | Renn links the roll-moulded string course with Skenfrith, Bronllys and Tretower, and dates the group 1185-1245 [S17] | Confirmed (independent, and Renn's range is wider) |
| 24 | Rhys Gryg died 1233 (Cadw guide) or 1234 (DWB) | castlewales [S8]; medievalheritage [S9] | DWB "died 1234" [S20] | Confirmed as contested |
| 25 | 1280s repairs to "the tower, bridge, hall and 'little tower'", a new gate, ditches cleaned and extended round the town, five buildings in the bailey | Cadw guide via castlewales [S8] | medievalheritage gives the buildings "in 1282" [S9] | One source, two routes; the King's Works (the guide's source) not read |
| 26 | Listing: "partly remodelled by King Edward I with a gatehouse added on S and a rectanuglar tower on N. Late C15 additions by Sir Rhys ap Thomas" | Listing 11117 [S2] | Gatehouse quotes the same text [S7] | Quotation confirmed |
| 27 | 1326, Hakelut's custody; keep near collapse 1343 and 1353; south passage wall rebuilt after 1403 | Cadw guide via castlewales [S8] | medievalheritage: Hakelut from 1310, 1326 to the Crown [S9] | Partly (Hakelut confirmed; the 1343, 1353 and post-1403 items single-route) |
| 28 | "There are no records of work at Dinefwr for the remainder of the Middle Ages" | Cadw guide via castlewales [S8] | Coflein: maintained in the earlier 15th century, possibly replaced by Newton later in it [S1] | Consistent; the opposite view in S2, S3, S9 kept as contested |
| 29 | The DWB's Sir Rhys ap Thomas alterations are at Carew | DWB [S21] | The sentence follows "His later years he spent at Carew castle" in the same article | Confirmed (read in context) |
| 30 | The 1151 record: "built" (HER) against "repaired the castle of Dinweileir", Dinevwr in C and E (Brut) | HER [S3] | Brut 1860 [S18]; Gatehouse "not the same as Dinweiler" [S7] | Confirmed as contested |
| 31 | 1162: Rhys "took possession of Cantrev Mawr and the castle of Dinevwr" | Brut [S18] | Gatehouse lists the Brut from 1163 [S7]; medievalheritage "1165" [S9] | Confirmed as contested (three years) |
| 32 | 1213: the castle taken "save one tower" after engines and ladders | Brut [S18] | Cadw guide: "walls and a tower strong enough to withstand siege engines" [S8] | Confirmed (independent: chronicle and guidebook) |
| 33 | "At Dinefwr, the ancient capital, a castle in the new style was begun" | DWB [S19] | Coflein: "founded in the later twelfth century by ... the Lord Rhys" [S1] | Confirmed |
| 34 | The 1220 dismantling | Cadw guide [S8] | HER "early 13th century" [S3]; medievalheritage [S9] | Confirmed (HER independent; year 1220 from the guide) |
| 35 | Possible motte (HER 881) against "nothing ... to argue for or against" | HER [S4] | Cadw guide [S8]; Gatehouse "certain Timber Castle" [S7] | Confirmed as contested |
| 36 | Two oil paintings of the castle show the keep with a conical roof, pennant and stepped-in top storey, and a square tower with a pyramidal roof | Moore [S16] | The paintings themselves, viewed [S22] | Confirmed |
| 37 | Paintings c. 1660-70 (Moore; Harris c. 1670) against c. 1710-30 (National Trust) | Moore [S16] | NT data via Wikidata and Commons [S22] | Confirmed as contested. The NT and Art UK pages refused automated reads, so the NT date was read at one remove |
| 38 | The Bucks' 1740 engraving shows the conical roof | Moore's plate 7 [S16] | The engraving, viewed (its caption ends "Publish'd according to Act of Parliament April ... 1740"; the day is too small to read in this copy) [S23] | Confirmed |
| 39 | The top storey: a thin wall on the inner face, an outer wall-walk with "a low, level parapet", six large windows today | Moore [S16] | DSM: top storey's wall at 113.6m, walk at 110.4m in a ring outside it [S24] | Confirmed in form; the thickness reading was corrected by this check (see below) |
| 40 | "The top storey is generally agreed to be post-medieval (Apted 1980, 22)"; or an *étage en retrait* | Moore [S16] | Renn: "a relatively modern 'folly' on top" [S17]; Coflein: summerhouse replaced the top [S1] | Confirmed as contested |
| 41 | The summerhouse: later 17th century (Coflein, Cadw guide) against late 18th to early 19th century (HER) | Coflein [S1]; castlewales [S8] | HER [S3]; listing "C17(?)/C18" [S2]; engraving 1740 [S23] | Confirmed as contested; the 1740 engraving rules out the HER's building date |
| 42 | The fire: Malkin 1804 "within these few years"; "By the late 18th century ... both roofs had been destroyed by fire" | Moore quoting Malkin [S16] | Cadw guide via castlewales [S8] | Confirmed (independent) |
| 43 | The south turret roofed with a tiled floor | Cadw guide via castlewales [S8] | Moore: a rectangular tower roofed, with a chimney [S16] | Partly: a roofed square tower confirmed; that it is the south turret single-source |
| 44 | Courses of flat stones below, mixed flat and rectangular above (Ray Caple) | Moore [S16], read from the page image | None | Single source |
| 45 | Bedrock: Llandeilo Flags Formation | BGS 50k [S25] | `deeptime:S1` names the formation in the Llandeilo area | Confirmed |
| 46 | Renn's Brecon keeps "built of local rubble reasonably coursed and plastered over" | Renn p. 132 [S17] | None | Single source, and about the group, not Dinefwr; the note says so |
| 47 | 2000: a 12m length of the south curtain dismantled and rebuilt | HER 42675 [S5] | HER 49626 and 49627 (separate event records) [S5] | Confirmed (one recorder, three records) |
| 48 | 2002: a new stair in the north-west tower | HER 49736 [S6] | None read | Single source |
| 49 | Dyfed Wildlife Trust bought Castle Woods with the ruins in 1979 | Moore [S16] | None read | Single source |
| 50 | The ditches 22-30m lip to lip and 5-7m deep today; the north ditch based at about 89m | DTM profiles [S24] | Re-run at four northings and two eastings | Confirmed (survey); against "about 15 meters" [S9] |
| 51 | The castle is owned by the National Trust | Cadw [S26] | NT "History of Dinefwr" does not say; Moore says the ruins were bought by the Dyfed Wildlife Trust in 1979 [S16] | Single source for today's owner; the 1979 purchase means ownership has changed at least once |
| 52 | Cadw maintains the site | Wikipedia (lead) [S29] | Cadw lists it among its places to visit [S26]; HER "Proposed Guardianship boundary" (1988) [S3] | Confirmed in substance |
| 53 | Gerald of Wales: "on the summit of a lofty hill above the river Towy" | Moore's translation [S16] | Coflein "a high wooded ridge" [S1] | Confirmed in substance |

## What the check changed in the note

- **The top storey's wall thickness** (claim 39). The first draft read the surface model's 113.6m band (3.3m to 5.6m from
  the centre) as a 2.3m wall and said it did not agree with Moore's "one third of the thickness". A surface model keeps
  the highest return in each 1m cell, so it widens every wall-top by up to half a metre on each side; the same widening
  makes the keep's wall at the walk about 4m against the plan's 2.9m. Allowing for it, the top storey's wall is about
  1.3-2.3m and Moore's figure (about 1m) is near the thin end. The note now says so, and the plan table's estimate of the
  top storey's size follows the survey.
- **The keep's and north-west tower's coordinates** in the plan tables now come straight from the survey fit, not the
  plan fit (they differed by up to 1.1m).
- **The ground the castle stands on today** is the region's 10m LiDAR context grid, not "coarser context ground" left
  vague (ADR 0049; `tools/terrain/lidar-areas.json`).
- **"Three of the six phases are ruins"** was wrong: two are.
- **The north ditch's line** in the plan tables was a guess; it is now the measured base at two points, with the ends
  marked as estimates.
- **A timber hall's id** clashed with the later stone hall's (`dinefwr/hall`); renamed `dinefwr/hall-timber`.
- **"In Cadw's care"** was stated without a source; it now rests on Cadw's own listing of the site, Wikipedia (a lead) and
  the HER's 1988 guardianship boundary.

## Not checked

- The Cadw guidebook itself, the King's Works, Kenyon, Davis, *The Buildings of Wales*, the 1917 inventory and the
  Cambria Archaeology reports (none read; the note's Gaps list them).
- The National Trust's own record for the paintings (blocked); its date reached this check through Wikidata.
- Whether the Benjamin Brecknell Turner photograph on Wikimedia Commons labelled "Dinefwr Castle, c. 1855" shows
  Dinefwr: it was looked at and not used, since its gateway and carved panels do not obviously match any part of the
  plans.

## For the next checker

Read the Cadw guidebook if it can be found (the National Library of Wales holds it); re-measure the plan fit with
control points picked independently on the surface model; and look again at claims 6, 16, 19, 21, 25, 44 and 46-49,
which rest on one source or one source by two routes.
