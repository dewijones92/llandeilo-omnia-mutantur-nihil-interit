---
title: Check 1 of carreg-cennen.md
kind: review
status: current
updated: 2026-10-17
---

# Check 1: Carreg Cennen Castle, phase by phase, for a Blender model

Reviewed note: [`../carreg-cennen.md`](../carreg-cennen.md) (status: draft, 2026-10-17). Repo state: the worktree
branch `worktree-wf_68d5ea17-755-1`, with `main` merged in (already up to date at `ec86387`) before the note was written.

**This check is not independent.** It was written by the same agent that wrote the note, on the same day, because no
second agent could be started from inside the workflow that commissioned it. It is a second reading of each claim
against the downloaded sources, with every quotation tested by a script, not the fresh pass by another reader that the
todo path's step 3 asks for. That pass is still owed before the castle is built.

## Method

- Every source was downloaded into a scratch folder and read as text: HTML stripped of tags (Coflein, the listing, the
  schedule, the HER, Gatehouse, Cadw's page, medievalheritage.eu, castlewales.com); Wikipedia as raw wikitext; the Rolls
  Series Brut and Morris as the Internet Archive's full texts; the four *Archaeologia Cambrensis* items as page images from
  Welsh Journals (IIIF), OCR'd with tesseract and read against the images where a word mattered (the 1858 plan, p. 12,
  was read from the image).
- **Every quotation in the note was tested by a script** against those texts (case, punctuation, hyphenation and
  whitespace ignored; "..." and "[sic]" split a quotation into parts that must each be found): 327 quoted strings, 303
  found. The 24 not found are: section titles and the note's own phrases (6); quotations from `src/content` and from
  `medieval:S28` (3); captions read off images, the Buck engraving's and the 1858 doorway engraving's (6); and passages
  that cross a page break, a plate or a footnote in the OCR (the 1858 "square inclosure" sentence, the 1950 "approach"
  sentence, Morris's "Caercynan, or the ruins", the Brut's 1248 entry with its footnote marks "ahis mother'"), each read
  on the page and confirmed (9).
- The measurements were checked against the raw rasters, not re-run as a whole: the plan fit's residuals computed at
  four control points read independently off the survey (the fit itself was run once, a coarse then a fine search),
  the fitted plan drawn over the survey and looked at, the wall-tops sampled in boxes, the ditch profiled at three
  eastings, the south-west corner and the east side printed cell by cell, and the cliff profiled at E 266790.
- "Second source" below means a source that does not copy the first. Coflein and the HER copy each other and the Cadw
  guide; the listing and the schedule are Cadw documents citing the guide; medievalheritage.eu, castlewales.com and
  Wikipedia draw on it. Where both go back to the guide the verdict says **one source, several routes**.

## Claims checked

| # | Claim in the note | First source | Second source | Verdict |
|---|---|---|---|---|
| 1 | Coflein's reference is SN 66789 19075 | Coflein [S1] | Wikipedia's SN66841911 and Gatehouse's SN66801908 are within 50m; listing and schedule 31-35m NE [S2][S3][S5] | Confirmed (Coflein's is used; the others are other points on the site) |
| 2 | Coflein's point is on the inner ward floor | Fit of the plan [S8] | Survey: ward floor at 264.8-265.0m OD round it [S20] | Confirmed |
| 3 | The plan fits at 10.5 degrees and 9.22 px/m, 3-4% over its metre bar | Fit [S8][S20] | Residuals 0.1-1.5m at three controls, 2.9m at the rounded corner; the metre bar read two ways (0-30m 8.88, 5-25m 8.93 px/m) | Confirmed (survey); the fit not re-run |
| 4 | Inner ward about 24.7 by 23-27m clear | Fitted plan [S8] | 1858: "87 feet by 80 feet" [S13] | Confirmed (two independent strands) |
| 5 | Built c. 1287-1321 | Coflein [S1] | Listing: "most of the building happened after 1287 and before 1321" [S2] | One source, several routes (Cadw); 1858's dating of the details [S13] agrees for the gatehouse and windows only |
| 6 | Three periods: inner ward, barbican, outer ward | Plan key [S8] | Listing [S2]; medievalheritage.eu [S7] | One source, several routes (Cadw) |
| 7 | Welsh masonry in the standing castle is contested | Schedule "obliterating" [S3] | 1858 [S13], Morris [S18], Lewis via Wikipedia [S12] | Confirmed contested (independent strands on each side) |
| 8 | 1248 is the first record; the wording is contested | Brut, Rolls Series [S17] | Listing [S2]; 1857's "1254" version [S14]; Wikipedia [S12] | Confirmed (the year and the reading both kept contested) |
| 9 | 1277 repairs (£285 with Dinefwr) | Morris [S18] | None read (Morris cites the rolls) | **Single source**, a primary-based history; kept as documented-by-Morris |
| 10 | 1282: seized and partly destroyed, ruins occupied in June | Morris [S18] | `medieval:S28` ("bare walls ... recently burnt out") | Confirmed |
| 11 | The ditch may be the native defence; more than 20ft deep | Ministry of Works 1950 [S15] | Survey: 7m below the ward [S20] (depth only) | Depth confirmed; "native" one source, hedged ("may well") |
| 12 | South curtain at full height, today 7.0-7.4m above the ward | Listing [S2] | castlewales.com [S11]; survey [S20] | Confirmed (height measured; "full height" one source in two routes, and the listing says wall-walks were restored) |
| 13 | South-west corner: tower or curved corner | 1858 [S13] | Listing, medievalheritage.eu, plan [S2][S7][S8]; survey [S20] | Confirmed contested; the survey shows no projecting tower today |
| 14 | Gatehouse: two half-octagonal towers, three storeys | Listing [S2] | medievalheritage.eu [S7] (one source); 1858 "octagonal" [S13]; King [S16] (form of the defences) | Twin towers confirmed (independent); half-octagon one source, contested with 1858 |
| 15 | Two portcullises at the gatehouse | 1858 "Two sets of portcullis grooves" [S13] | King "a portcullis at each end" [S16] | Confirmed |
| 16 | Gatehouse today 10.8-11.4m above the ward | Survey [S20] | Wikipedia: the gatehouse "the tallest part" (lead) [S12] | Confirmed (survey) |
| 17 | North-west tower about 8m | medievalheritage.eu [S7] | Plan 7.5m [S8]; survey up to 10m (overstated) [S20] | Confirmed within ±0.5m |
| 18 | North-east tower about 9m, polygonal | medievalheritage.eu [S7] | Plan 9.0 by 9.2m [S8] (same source family); survey place [S20]; listing "rounded", schedule "square" | Size confirmed (survey place, Cadw size); shape one source, contested |
| 19 | Chapel at second floor in the square tower mid east curtain | Listing [S2] | 1858 "upper story of a square tower ... projecting from the midst of the eastern curtain" [S13] | Confirmed (the schedule's "west wall" is a slip) |
| 20 | East range: kitchen, hall, solar over basements; external stair | Listing, schedule [S2][S3] | 1858 (kitchen oven, hall cellar) [S13] | Confirmed (the stair one source: Cadw) |
| 21 | King's Chamber's two-light trefoiled windows | 1858 [S13] | Wikipedia (Lewis 2006): "traceried windows" [S12] | Confirmed |
| 22 | Barbican: stepped ramp, two pairs of pits on it | Ministry of Works 1950 [S15] | King 1985 [S16]; listing [S2] | Confirmed (independent) |
| 23 | Middle gate tower with a basement "prison" of 1369 | Schedule [S3] | medievalheritage.eu [S7] | One source, several routes; the tower itself confirmed by King [S16] and the survey |
| 24 | Outer ward about 60 by 60m with corner towers and an east gate | medievalheritage.eu [S7] | Plan and survey banks [S8][S20]; Coflein, schedule [S1][S3] | Size and line confirmed (survey); towers one source (Cadw) |
| 25 | Outer ward buildings | medievalheritage.eu "probably" [S7] | Schedule "will have" [S3] | Form and place unknown; imagined in the plan |
| 26 | 1462 slighting by 500 men in four months | Cadw [S6] | medievalheritage.eu [S7] | One source, several routes (Cadw); year contested (1461 [S5][S12]) |
| 27 | 1403 taken or not | Coflein, listing [S1][S2] | Wikipedia uncited [S12] | Contested, as already recorded |
| 28 | Rubble with ashlar dressings | Listing [S2] | Gatehouse (copy of the listing) [S5] | One source; the stone an inference from BGS [S21] |
| 29 | The crag is Dowlais Limestone | BGS [S21] | Williams 1857 "limestone" [S14]; 1858 "carboniferous limestone" [S13] | Confirmed |
| 30 | Cliff 30-40m, river about 133m OD | Survey [S20] | Sources' rough figures (100ft, 300ft, 85m, 90m) | Measured; the texts are rough and disagree |
| 31 | Victorian restoration already begun by 1857-58 | 1858 [S13] | Listing's "Earl Cawdor (1817-98)" [S2] | Both read; who ordered the 1850s repairs not named |
| 32 | 1950 clearance of the barbican | Ministry of Works [S15] | None | Single source (primary) |

## What the check changed in the note

- The listing's and schedule's distances from Coflein's point were 31-34m; recomputed as 31m and 35m.
- The fit's wording said "wall pixels"; it scored every third dark pixel of the plan's inner ward (labels and hachures
  included), so the wording was corrected.
- One quotation of medievalheritage.eu ran two phrases together across a parenthesis; it is now two quotations.

## Still owed

- The independent check by a second reader (the todo path's step 3): done, as [check 2](carreg-cennen-check-2.md), 2026-10-17.
- A source for any medieval height other than the south curtain's, and for any roof or render.
