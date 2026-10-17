---
title: Check 1 of talley-abbey.md
kind: review
status: current
updated: 2026-10-17
---

# Check 1: Talley Abbey, phase by phase, for a Blender model

**Two parts.** Part A is the author's own check, written first; four of its verdicts were wrong and are marked below, not
quietly changed. Part B is the independent reader's ten findings, each checked against the sources again and the fixes
recorded (2026-10-17).

## Part A: the author's own check

Reviewed note: [`../talley-abbey.md`](../talley-abbey.md) (status: draft, 2026-10-17). Repo state: the worktree branch
`worktree-wf_68d5ea17-755-10`, with `main` merged (already up to date at `ec86387`, the same commit as `origin/main`)
before the note was written.

**Part A is not independent.** It was written by the same agent that wrote the note, on the same day, inside the
workflow that commissioned it. It is a second reading of each claim against the downloaded sources, with every quotation
tested by a script, not the fresh pass by another reader that the todo path asks for. That pass is Part B.

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
| 4 | The finished church was about 49.6m outside, four bays of nave and south aisle | O'Neil [S14][S15] | Williams's "abandoned the work when but a very small portion of it was completed" [S16]; UK Southwest's 162ft [S20] | **Wrong as first written** (see B1): Williams's sentence is about the first builders, not the western bays. The shortening and four-bay count are one source (O'Neil/Cadw, with Long Price) |
| 5 | Bays 5.68m, arcades 9.95m apart, crossing piers 9.9m apart | The plan [S15] | Williams: nave and aisles 62.6ft (19.1m) inside, the plan 19.0m | Confirmed for the width; the bay length rests on the plan. **Corrected** (see B6): regular bays 5.65m, not 5.68m |
| 6 | The tower stands to 24.2-24.5m today | The LiDAR [S21] | Cadw listing "24m" [S4] | Confirmed (survey); **corrected** (B7): 23.8-24.5m, mostly 24.0m. Williams's 95ft is explained in B2, not "not known" |
| 7 | The floor falls 0.7m from the west end to the crossing; the western south aisle 0.34m higher | The LiDAR [S21] | O'Neil's 2ft and 12-14in [S14] | Confirmed (two strands) |
| 8 | Founded 1184-89 | Coflein [S1]; listing [S4] | Monastic Wales "two sources" [S8] | Confirmed as a range; the year stays contested |
| 9 | Building begun shortly before 1200, resumed by 1208 | O'Neil [S14] | Williams's break in the pier's moulding [S16] supports a change of campaign, not the dates | One source for the dates |
| 10 | The cross-wall and the north blocking walls are medieval | O'Neil [S14] | none (Williams saw a "thinner wall" between the north piers, date not given) | One source |
| 11 | One bay of the north aisle was built | O'Neil [S14] | Williams says to the second pier [S16]; Long Price's letter agrees with Williams | **Contested**, kept so |
| 12 | Interior plastered and painted, stained glass, glazed tiles | Williams [S16] | O'Neil's plaster layers [S14]; Coflein's painted plaster [S1]; medievalheritage [S9] | Confirmed |
| 13 | Ashlar only at certain quoins; rubble elsewhere; conglomerate at the uppermost opening | O'Neil [S14] | Williams: freestone at the north-east pier and the presbytery's east quoins, "local stone" otherwise [S16] | Confirmed for ashlar and rubble; conglomerate one source |
| 14 | A parish church 1536-1772; its extent contested | Coflein [S1]; O'Neil [S14] | Coflein St Michael's (150ft in 1710) [S2]; Lewis 1833 via Long Price [S17]; Griffiths via the HER [S5] | Confirmed that it was used; extent **contested** |
| 15 | 150ft is the shortened church's inside length | Coflein St Michael's [S2] | The plan: 46.7m (153ft) from the cross-wall's east face to the east wall's inner face [S15] | An inference from two sources; marked as such. **Corrected** (B8): 153ft is close to 150ft, not equal |
| 16 | Abandoned 1772, with St Michael's built from its stone | O'Neil [S14]; Coflein St Michael's [S2] | Long Price quoting Lewis [S17] | Confirmed; 1772-3 and 1773 also given |
| 17 | A large fall in 1845 | O'Neil [S14] | medievalheritage [S9] (from the Cadw guide) | One source |
| 18 | In 1933 only the tower's north and east walls and part of the north transept stood high | O'Neil [S14] | The HER "Only the north and east sides of the tower now stand" [S5]; Monastic Wales [S8] | Confirmed (the HER and Monastic Wales are later, consistent) |
| 19 | Guardianship 1933, consolidation 1933-38 | O'Neil [S14] | The listing [S4]; Coflein [S1] | Confirmed |
| 20 | The 15th-century burning, 1410 or 1427 | Monastic Wales [S8] | medievalheritage [S9]; UK Southwest [S20] | **Contested**, kept so |
| 21 | Bedrock Yr Allt Formation under glacial deposits | BGS [S22] | O'Neil's "slatey clay", "orange clay" and gravel [S14] fit, but do not name it | One source (the map) |
| 22 | The motte between the lakes faces the abbey across the Upper Lake | Coflein 303898 [S3] | The LiDAR shows the mound on the isthmus [S21] | Confirmed (place) |

## What Part A does not cover

- The independence of the "Cadw line" texts from O'Neil is a judgement from their wording and citations; the Cadw guide
  itself was not read.
- The Welsh Journals viewer URL for O'Neil (`.../4739323/114/`) was not shown to open at p. 69; the IIIF manifest and
  image ids in the source entry were used for the reading.
- The plates were viewed only as a contact sheet; their captions were read from the OCR.
- The lake outlines and the fit are by the agent's own scripts; another reader should re-run them.

## Part B: the independent check (a second reader), 2026-10-17

Ten findings, five IMPORTANT and five SUGGESTION. Each was checked against the source named, not taken on trust: Williams
1897 from the Internet Archive's full text (pp. 229-247) and its page images (the plan, Plates 1, 2 and 4, measured at
their own 50ft bars, each with a figure of about 6ft in the drawing as a check on the scale); O'Neil's Fig. 1 re-measured
from the stitched full-resolution plan; the 2022 DSM and DTM re-sampled; medievalheritage.eu and UK Southwest re-read.
Quotations added in this pass were tested against the source texts (all found except one split by a page break in the
OCR, the saddle-back sentence on pp. 240-241, and one OCR error already noted in Part A).

| # | Finding | Verdict | Evidence found | What changed |
|---|---|---|---|---|
| B1 | IMPORTANT: Williams's "abandoned the work when but a very small portion of it was completed" is misread as support for "western bays never built" | **Right.** The sentence (p. 234) is about "the original builders" giving up an ornamental freestone design; "their successors adopted a more economical ... type of architecture". On the western bays he writes (p. 239) "It is quite impossible to say whether or no the Premonstratensian church ever extended beyond the cross-wall ... may be merely the foundations and partially built walls of the first builders"; (p. 240) the canons "possibly completed it from east to west, with the exception of part of the north aisle", shortened as at Strata Marcella; (p. 246) "I think it is probable that they completed the church in the first instance, all except a portion of the north aisle", later left to decay. The never-built reading is O'Neil/Cadw and Long Price (his letter, quoted on p. 246). Also found, not in the finding: Williams dates the cross-wall and the north blocking wall to the parish church after the Dissolution ("probably", p. 239), against O'Neil's early 13th century | The Summary bullet, the contested rows (western bays rewritten; a new row, when the church was shortened), `talley/footings-west`, `talley/cross-wall`, `talley/north-blocking`, Part A claim 4, findings.md, open-questions.md |
| B2 | IMPORTANT: Williams's 95ft is explained in the source; the tower's top is documented | **Right, with a caveat the finding did not have.** p. 241: saddle-back roof, ridge east to west, "from floor line to apex was about 95 ft."; "To the underside of the corbel course is about 78 ft."; a lancet below it, the sharp-pitched water table, a later flatter one. 78ft is 23.8m, which matches the LiDAR crest. **But** his own Plates 1, 2 and 4 draw the east wall's stepped gable head at 87.2, 87.4 and 88.3ft against their bars (26.6, 26.6 and 26.9m), 7-8ft below the 95ft. So the apex is contested between his text and his plates, not simply "documented at 29m". The drawn head is a broken one, and the 2022 crest is about 2m lower than it | Summary tower bullet, contested row, gaps, `talley/tower` (form documented, one source; apex contested; the plan's `TowerTop` has no saddle-back value) |
| B3 | IMPORTANT: Williams's own evidence for the post-1536 church is left out | **Right.** p. 241 as quoted in the finding (the nave's east wall blocking the tower's eastern arch, a segmental window, "the small chancel ... built inside the walls of the presbytery", "probably of the seventeenth century"); his plan labels "Chancel of Parish Church" and draws it as later walls from the tower's east arch, about 7.4m east-west outside by about 6m north-south at the plan's bar. Also p. 239: the cross-wall "probably defines the west wall of the Parish Church after the Dissolution", the first parish church extending "right through the tower to the original east wall of the presbytery", possibly with the south transept | Phase 3 bullet, the summary parish bullet, the contested row, `talley/chancel-later` (documented by O'Neil and Williams) and a new part `talley/parish-nave-east-wall`; the owner's-decision note |
| B4 | IMPORTANT: the plan's north arrow is not square to the church | **Right.** On the stitched Fig. 1 the arrow's shaft runs 3.0 degrees off vertical by two points (x 6233 at y 2900 to x 6285.5 at y 3900) and 3.2 degrees by a fit through every sampled point; the south aisle wall's edge runs 0.15 degrees (y 2528 at x 1000 to 2536 at x 4000). So the plan's own arrow gives an axis near 93 degrees, against the LiDAR fit's 94.0 | Summary axis bullet; findings.md |
| B5 | IMPORTANT: Williams's plan and plates are legible and carry heights | **Right.** The plan (leaf 51 of the Internet Archive scan, 14 October 1894) has a 0-50ft bar, dimension figures that match his table (44.9, 29.0, 4.10, 62.6) and a legend; Plates 1, 2 and 4 (W. H. Ashford del., 1894) have 50ft bars. Read at them: presbytery roof ridge about 63ft (19.2m), pitch about 48 degrees (±3); later flatter roof about 50ft (15.4m) at about 34 degrees; small chancel's roof about 27ft; the pointed crossing arch's crown in Plate 2 about 38.6ft (11.8m). The clerestory and the wall passage (p. 241, p. 243, "probably") and the tower's south wall rebuilt "from the springing of the eastern arch of the tower upwards" (pp. 241-242; his 1248 earthquake is conjecture) are in the text. Limits: ivy hides parts of Plate 4, the roof lines are drawn, not surveyed (±1m, ±3 degrees); Plates 3 and 5 to 7 were not measured | Images row, Summary (a new bullet), `talley/presbytery`, `talley/nave` (ridge by Williams's assumption), `talley/tower`, gaps, S16 |
| B6 | SUGGESTION: the regular bay is 5.65m | **Right.** The seven south-arcade pier centres on the plan are at 845.5, 1339.5, 1830.5, 2316.5, 2814, 3295 and 3786.5px: six intervals of 494, 491, 486, 497.5, 481 and 491.5px, mean 490.1px = 5.65m at 86.8px/m (the note's own table has 5.6-5.7m). Crossing pier to first pier about 5.9m | The Summary bay bullet, the dimension table, `talley/arcade-south` |
| B7 | SUGGESTION: the crest is quoted from its highest cells | **Right.** DSM cells along the east wall: 136.0-136.3m for most, 136.6-136.8m at the north-east corner; floor 112.26m. So 23.8-24.5m | Summary, placement table, phase 5, tables |
| B8 | SUGGESTION: "150ft equals" 46.7m overstates | **Right.** 46.7m is 153ft inside, 49.6m (163ft) outside; the crossing and presbytery alone are about 26m | "close to" in the Summary and findings |
| B9 | SUGGESTION: UK Southwest's 1427 may be a conflation | **Plausible, kept as an inference.** medievalheritage.eu: the abbey was burned "at the beginning of the 15th century", and "in 1427, one of the canons from Talley, Mathew ap Llywelyn Ddu, was hunted for treason charges"; UK Southwest has no references. The point stays contested | The contested row, open-questions.md, S9 |
| B10 | SUGGESTION: some one-source parts are in Williams too; one first-works part is O'Neil's dating | **Right.** The cross-wall and its 6ft door with three steps (pp. 239-240) and the thinner wall in the north arcade (p. 232, traced to the fourth pier, p. 238) are in both; their medieval date is O'Neil's alone. The crossing piers' place in the first campaign is O'Neil's inference; Williams dated the moulding to the middle of the 12th century. Williams's moulded pier is the north-east one on pp. 231, 233, 241 and in Plate 2's title and the north-west one on pp. 231 and 234; the plate is followed | `talley/cross-wall`, `talley/north-blocking`, `talley/crossing-piers`, Phase 1 text |

**Consequences for the phases.** None of the ten changes a phase date. B1 adds a contested point about when the church
was shortened, which does not move the proposed boundary (c. 1208) but the ⓘ should carry Williams's alternative.

## What the two parts do not cover

- **The fixes in Part B have not been read by another reader.** A fix is a new claim: the plate readings (B2, B5), the
  chancel's size, the eaves height (derived) and the contested rows are mine, and each is only as good as a drawing read
  at its bar.
- The independence of the "Cadw line" texts from O'Neil is a judgement from their wording and citations; the Cadw guide
  itself was not read.
- Williams's Plates 3 and 5 to 7 were not measured; O'Neil's plates were viewed only as a contact sheet.
- The lake outlines and the fit are by the agent's own scripts; another reader should re-run them.
