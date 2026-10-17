---
title: Check 2 of carreg-cennen.md
kind: review
status: current
updated: 2026-10-17
---

# Check 2: Carreg Cennen Castle, phase by phase, for a Blender model

Reviewed note: [`../carreg-cennen.md`](../carreg-cennen.md) (status: draft, 2026-10-17), after
[check 1](carreg-cennen-check-1.md), which was written by the note's own author and is not independent.

**This is the independent check the todo path's step 3 asks for.** A second reader checked the note against sources
downloaded afresh (not the researcher's files) and reported three important findings, five suggestions and a list of
what held. Each was then **verified again against the source, fetched afresh by the agent that fixed them** (Morris's
*Welsh Wars* full text, the Cadw listing and schedule, medievalheritage.eu, castlewales.com, Gatehouse, the Rolls Series
Brut, the Cadw plan image zoomed, and the LiDAR terrain model re-sampled), before being fixed. The verdicts say what was
found, not what was reported. The fixes were made by a Claude agent working from the findings, so the fixes themselves
still want a reader who did not make them.

The file is named check 2 (not check 1, as the commissioning text said) because check 1 is the author's own self-check
and is kept as written.

## Important findings

| # | Finding | Verified against | Verdict | Fix |
|---|---|---|---|---|
| 1 | The 1282 capture is given one date ("April 1282") and one captor, but the sources disagree on both, and the note does not record it as contested | Morris p. 154: "David rushed off to rouse the South Welsh. In conjunction with Gruffudd and Llewelyn, sons of Rhys Vychan and lords of Isgenen, he captured Llan- dovery and Caercynan on March 26"; p. 165: "Caercynan, which had been seized and destroyed, at least partially, by David early in April". Cadw listing: "captured by the forces of Llywelyn ap Gruffudd in 1282"; schedule: "recovered briefly in 1282 by Prince Llywelyn ap Gruffudd"; medievalheritage.eu: "temporarily taken over by Gruffudd and Llywelyn, the sons of Rhys Fychan" | **Confirmed.** The note's own source contradicts itself on the date, the sources differ on the captor, and "David" (Morris's name for Dafydd ap Gruffudd) broke the Welsh-names-first rule. The note's "April 1282" boundary was a choice of one of Morris's two dates | The boundary is now "spring 1282 (26 March or early April; Morris gives both)" in the Summary, Phase 1, the phase table, the dates line, the burnt phase and S18; the captor is given by source; a new contested point 15 and an open-questions row; Dafydd ap Gruffudd named in full |
| 2 | Parts the Cadw plan marks "Uncertain" are given the documented tier in dated medieval phases | The plan image zoomed: the outer ward's south-east corner tower is a dashed outline beyond the red wall (north-west and north-east are solid red); the oven and its chamber are outlined, not filled; the lime kiln is line and outline with no period colour; the key's "Uncertain" is an outline with no fill. The kiln's and oven's support is the listing, the schedule, the plan, medievalheritage.eu and castlewales.com, which are one family (Cadw); the 1858 "kitchen oven" is another oven | **Confirmed** | `outer-tower-se` split from the other two and made **reconstructed**; `oven` documented (existence; one source: Cadw) with its medieval date reconstructed; `lime-kiln` existence documented (one source: Cadw), form and place reconstructed, date an inference and flagged as the first to drop; a "Reading the Cadw plan's key" paragraph |
| 3 | The new figures supersede `building-models.md`'s Carreg Cennen dimensions, but that note is not marked | `building-models.md` still gave the north-west tower about 8.4m, the north-east tower 10.8 by 9.1m, the outer ward 63-65 by 62m and the barbican ramp about 40m, mostly rated "High"; the new note's ground-scale fit gives 7.5m (8m, ±0.5), 9.0 by 9.2m, about 60 by 60m and about 34m | **Confirmed** | A dated "Corrected 2026-10-17" paragraph under the table, listing each superseded figure, and the confidence cells of the five rows lowered |

## Suggestions

| # | Finding | Verified against | Verdict | Fix |
|---|---|---|---|---|
| 4 | `era-medieval-to-1282.md`'s "not a recapture" correction for 1248 is now contested but left as settled; Gatehouse calls the Rolls Series translation flawed | Rolls Series Brut p. 335: "obtained the castle of Carreg Cennen back again, which his mother had deceitfully given into the possession of the French"; Welsh text "y cauas Rys Vychan ab Rys Mechyll gastell Karrec Kennen drachefyn" ("drachefyn" = again, back). Gatehouse: "There is a flawed translation Williams ab Ithel, John, 1860, Brut Y Twysogion ... (Rolls Series)", the best being Jones 1952 (Peniarth 20) | **Confirmed** | A dated note on that row (and on the 1282-spring row) pointing here; contested point 16, S17 and the Gaps list record the warning and that Jones 1952 was not read |
| 5 | Citations missing for the south-east turret, the south-west corner and the 1283 grant | Schedule: "south west and south east corners of the curtain are lightly defended, by a curving projection and a corner turret respectively" and "granted to the king’s supporter John Giffard ... in 1283"; medievalheritage.eu: "the south-east corner with a small four-sided tower"; the listing says only "rebuilt after 1283" | **Confirmed** | S3 and the architecture sentence added to `turret-se` (one source: Cadw), the south-west corner and the 1283 grant; S3's entry extended |
| 6 | The ruin phase says Victorian work cannot be told apart, but the Cadw plan marks some as Modern | The plan image zoomed: blue at the south curtain's east end beside the east range, a piece of the range's west wall, and short lengths on the first- and second-floor insets (the kitchen's east wall, the King's Chamber's south-west corner, the second-floor stair block) | **Confirmed** (the stretches are read at plan-pixel precision, not measured on the ground) | The ruin phase lists them and says the medieval phases leave them out; a Gaps line keeps Cadw's caveat for the rest |
| 7 | The ditch's extent is stated two ways; two smaller points (the foot bar, the 1857 misprint range) | The terrain model re-sampled (minimum over y 24-31 at 2m steps in frame x): 258.4-258.7m west of x 0, 257.85 at x 2, 257.4-257.9 from x 2 to 26, 259.0 at x 28. So the base runs about x 2 to 26, not x 3 to 21 and not x -5 to 21. The foot bar could not be re-read here (the reviewer's 274.8 px, 9.02 px/m, is within a pixel or two of the note's 276, 9.05) | **Confirmed** for the ditch (the reviewer's x 5-25 is within a few metres of the re-sample); the foot bar and the misprint range are **taken from the check, not re-read** | One extent in both places (x 2 to 26, 257.4-257.9m); the crosswall estimate moved from x 21 to near x 27, where the floor rises; the foot bar given as 9.02-9.05; the misprint start given as p. 341 per this check |

## What the check confirmed (no defect)

Recorded from the reviewer's report; the agent that made the fixes re-confirmed only the items listed under the tables.

- Quotations attributed to Coflein, the listing, the schedule, the HER, Gatehouse, Cadw, medievalheritage.eu and
  castlewales.com are present in the live pages; Wikipedia's match the raw wikitext; the Brut's 1248 entry is on p. 335
  (re-confirmed above); Morris's 1277, 1282 and appendix quotations are present (p. 154 and p. 165 re-confirmed above);
  the *Archaeologia Cambrensis* passages match the reviewer's OCR of the page images.
- Coflein's SN6678919075 is confirmed; the listing's and schedule's points are 30.8m and 34.7m away; the app's point is
  14.4m away and falls inside the east range.
- The LiDAR heights match a fresh download of SN6619 (the SHA-256 hashes the same), the plan scale was re-measured
  (0-30m = 266.45 px; the best fit 9.22 px/m at 10.5 degrees), and the north-west tower's 69 px is 7.5m.
- The LiDAR region arithmetic (208 tiles against 80, about 4.7MB), BGS's Dowlais Limestone at the point and the Buck
  engraving's caption and date hold.
- No existing source id was renumbered (the `sources.ts` diff has 126 additions and 0 deletions; `cennen:S1-S21` are
  new), and the Welsh orthography is correct apart from the unnamed "David" (finding 1).

## Still owed

- A reader who did not make these fixes.
- The sources the note says it did not read (the Cadw guidebook, *King's Works* vol. 2, the 1369 and 1414-21 accounts,
  RCAHMW 1917, Remfry, and now T. Jones 1952).
- A source for any medieval height other than the south curtain's, and for any roof or render.
