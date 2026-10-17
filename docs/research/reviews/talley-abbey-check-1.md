---
title: Check 1 of talley-abbey.md
kind: review
status: current
updated: 2026-10-17
---

# Check 1: Talley Abbey, phase by phase, for a Blender model

Reviewed note: [`../talley-abbey.md`](../talley-abbey.md) (status: draft, 2026-10-17). Repo state: the worktree branch
`worktree-wf_68d5ea17-755-10`, with `main` merged (already up to date at `ec86387`, the same commit as `origin/main`)
before the note was written.

**This check is not independent.** It was written by the same agent that wrote the note, on the same day, inside the
workflow that commissioned it. It is a second reading of each claim against the downloaded sources, with every quotation
tested by a script, not the fresh pass by another reader that the todo path asks for. That pass is still owed before the
abbey is built.

## Method

- Every web source was downloaded into a scratch folder and read as text (HTML stripped of tags); the DAT report as
  `pdftotext`; O'Neil 1941 as page images from Welsh Journals (IIIF, served at 894 x 1200), OCR'd with tesseract; Williams
  1897 and Long Price 1879 as the Internet Archive's OCR text.
- **Every quotation in the note was tested by a script** against those texts (case, punctuation, quote style and OCR
  line-break hyphens normalised; a quotation with "..." must have each piece in the same source). 176 of 187 were found as
  written. The other eleven were checked by eye: six run across a page break of O'Neil's article, where the OCR puts a
  running head between the pieces (the watershed sentence, the iron crooks, the piers "inadvertently carried up too
  high"), or are OCR errors in the source text ("ina highly dangerous", "Aportionof", "theabbey", "a.p. 1200" for "A.D.
  1200", "roof-creasing" split by a line break); two were read on the page image itself: "*llwch* = lake" (p. 69, OCR
  "/wch") and "1½ carucates" (p. 71, OCR "1}"); one is a section title, not a quotation. Four quotations failed at first
  and were corrected in the note before this check was written: "This reversal of fortune may well be reflected in the
  piers" (was "the reversal of fortune"), the conglomerate passage (a plate reference had been dropped without an
  ellipsis), medievalheritage's "rather massive form ... suggests" (was "suggest"), and "pure white and soft plaster" (was
  "a pure ...").
- **The measurements were re-run** from the raw rasters and the stitched plan: the plan's bars (feet: 0 to 90ft, 26.39
  px/ft, 86.6 px/m; metres: 0 to 20m, 87.1 px/m, its 10-20m half across the page fold); the fit repeated without the
  tower and with a different sample of plan pixels (rotation -4.0 degrees both times, scale 0.99 and 1.005, every church
  point within 0.8m between the two); wall heights sampled along each wall of the fitted plan; the floor sampled at
  twelve points.
- "Second source" below means a source that does not copy the first. Where both go back to the Office of Works clearance
  (O'Neil, the Cadw guide and the texts that cite it), the verdict says **one source**.

## Claims checked

| # | Claim in the note | First source | Second source | Verdict |
|---|---|---|---|---|
| 1 | Coflein's reference is SN 63281 32772 | Coflein [S1] | Monastic Wales repeats it [S8]; listing E 263267 N 232772 [S4]; HER SN63273277 [S5] | Confirmed (the listing is 14m west; the others within 10m) |
| 2 | The plan fits the ground at its own scale, rotated 4.0 degrees | The fit [S15][S21] | A second fit without the tower; the fitted east piers on the surveyed east wall's crest | Confirmed (survey) |
| 3 | The planned church was about 72m long outside, 68.8m inside | The plan [S15] | Williams's 226.3ft inside [S16]; 235ft (UK Southwest) [S20] | Confirmed; the HER's "240ft" and the listing's "73m" are a little more and stay as texts |
| 4 | The finished church was about 49.6m outside, four bays of nave and south aisle | O'Neil [S14][S15] | Williams's "abandoned the work when but a very small portion of it was completed" [S16]; UK Southwest's 162ft [S20] | Confirmed for the shortening (two strands); the four-bay count is O'Neil's and the Cadw line's |
| 5 | Bays 5.68m, arcades 9.95m apart, crossing piers 9.9m apart | The plan [S15] | Williams: nave and aisles 62.6ft (19.1m) inside, the plan 19.0m | Confirmed for the width; the bay length rests on the plan |
| 6 | The tower stands to 24.2-24.5m today | The LiDAR [S21] | Cadw listing "24m" [S4] | Confirmed (survey); Coflein's 26m and Williams's 95ft stay contested |
| 7 | The floor falls 0.7m from the west end to the crossing; the western south aisle 0.34m higher | The LiDAR [S21] | O'Neil's 2ft and 12-14in [S14] | Confirmed (two strands) |
| 8 | Founded 1184-89 | Coflein [S1]; listing [S4] | Monastic Wales "two sources" [S8] | Confirmed as a range; the year stays contested |
| 9 | Building begun shortly before 1200, resumed by 1208 | O'Neil [S14] | Williams's break in the pier's moulding [S16] supports a change of campaign, not the dates | One source for the dates |
| 10 | The cross-wall and the north blocking walls are medieval | O'Neil [S14] | none (Williams saw a "thinner wall" between the north piers, date not given) | One source |
| 11 | One bay of the north aisle was built | O'Neil [S14] | Williams says to the second pier [S16] | **Contested**, kept so |
| 12 | Interior plastered and painted, stained glass, glazed tiles | Williams [S16] | O'Neil's plaster layers [S14]; Coflein's painted plaster [S1]; medievalheritage [S9] | Confirmed |
| 13 | Ashlar only at certain quoins; rubble elsewhere; conglomerate at the uppermost opening | O'Neil [S14] | Williams: freestone at the north-east pier and the presbytery's east quoins, "local stone" otherwise [S16] | Confirmed for ashlar and rubble; conglomerate one source |
| 14 | A parish church 1536-1772; its extent contested | Coflein [S1]; O'Neil [S14] | Coflein St Michael's (150ft in 1710) [S2]; Lewis 1833 via Long Price [S17]; Griffiths via the HER [S5] | Confirmed that it was used; extent **contested** |
| 15 | 150ft is the shortened church's inside length | Coflein St Michael's [S2] | The plan: 46.7m (153ft) from the cross-wall's east face to the east wall's inner face [S15] | An inference from two sources; marked as such |
| 16 | Abandoned 1772, with St Michael's built from its stone | O'Neil [S14]; Coflein St Michael's [S2] | Long Price quoting Lewis [S17] | Confirmed; 1772-3 and 1773 also given |
| 17 | A large fall in 1845 | O'Neil [S14] | medievalheritage [S9] (from the Cadw guide) | One source |
| 18 | In 1933 only the tower's north and east walls and part of the north transept stood high | O'Neil [S14] | The HER "Only the north and east sides of the tower now stand" [S5]; Monastic Wales [S8] | Confirmed (the HER and Monastic Wales are later, consistent) |
| 19 | Guardianship 1933, consolidation 1933-38 | O'Neil [S14] | The listing [S4]; Coflein [S1] | Confirmed |
| 20 | The 15th-century burning, 1410 or 1427 | Monastic Wales [S8] | medievalheritage [S9]; UK Southwest [S20] | **Contested**, kept so |
| 21 | Bedrock Yr Allt Formation under glacial deposits | BGS [S22] | O'Neil's "slatey clay", "orange clay" and gravel [S14] fit, but do not name it | One source (the map) |
| 22 | The motte between the lakes faces the abbey across the Upper Lake | Coflein 303898 [S3] | The LiDAR shows the mound on the isthmus [S21] | Confirmed (place) |

## What this check does not cover

- The independence of the "Cadw line" texts from O'Neil is a judgement from their wording and citations; the Cadw guide
  itself was not read.
- The Welsh Journals viewer URL for O'Neil (`.../4739323/114/`) was not shown to open at p. 69; the IIIF manifest and
  image ids in the source entry were used for the reading.
- The plates were viewed only as a contact sheet; their captions were read from the OCR.
- The lake outlines and the fit are by the agent's own scripts; another reader should re-run them.
