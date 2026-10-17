---
title: Check 2 of dryslwyn.md
kind: review
status: current
updated: 2026-10-17
---

# Check 2: Dryslwyn Castle, the independent pass

Reviewed note: [`../dryslwyn.md`](../dryslwyn.md) at commit `c612e7e` (branch `worktree-wf_68d5ea17-755-2`, main
already merged at `ec86387`). This is the independent check the todo path asks for: a reader who did not write the note
re-fetched the sources and re-measured, and [check 1](dryslwyn-check-1.md) was the author's own. It did **not** read Caple's
2007 monograph or the Cadw guide itself either, so the note's biggest gap stands.

## Method

The Cadw scheduling report and listing, both HER records, Gatehouse, both castlewales pages, medievalheritage.eu, Coflein
and Cadw's visitor page were fetched and about 60 quotations sampled; the chronicles (*Annales Cambriae* p. 86 and
p. 109, Trivet p. 315, Wykes) were re-read; the BGS service was queried; the plans were re-measured; the LiDAR tiles'
hashes and the keep, façade and chapel heights were re-run. The findings below were then **verified again by the
person applying them** against freshly downloaded copies of the scheduling report, the listing, castlewales, medievalheritage
and Gatehouse (2026-10-17), not taken on the reviewer's word.

## Findings and verdicts

| # | Severity | Finding | Verdict | What was done |
|---|---|---|---|---|
| 1 | IMPORTANT | Contested point 6 (one or two storeys added to the hall) misreads the scheduling report | **Right.** The report says "Originally single storey with a basement, it was remodelled in the 1280s to accommodate two upper storeys": two upper storeys in total, so one added. That agrees with the monograph's "an extra storey" [S20], medievalheritage's "an additional floor with a flat ceiling was created" [S10] and Caple's section [S15] | Phase 3 text, parts table, the plan's `dryslwyn/hall` (raised) row and the open-questions row corrected; contested point 6 struck through and kept as a visible withdrawal so its number still means something |
| 2 | IMPORTANT | The first kitchen's material is contested between sources and the plan picked timber silently | **Right.** The Cadw guide has "a small stone building, probably a kitchen, with a hearth"; medievalheritage has "a small, initially wooden, then stone kitchen". Both go back to Caple | New contested point 15 and an open question; the parts table gives both readings; the plan models the kitchen in stone (the guide's reading) with the other in the ⓘ |
| 3 | SUGGESTION | "The outer ward is before the siege in every source read" overstates medievalheritage | **Right.** It says the lower ward was built "At the end of the 13th century" and that after the capture Alan Plucknet made "the necessary repairs and expansion" | Reworded to "every source that dates it", with medievalheritage's undated wording and the Plucknet expansion stated |
| 4 | SUGGESTION | Contested point 10 credits medievalheritage with a walling-up claim | **Right.** It says the castle "almost certainly fell into disuse" about 1409, "perhaps as a result of deliberate destruction by Glyndŵr's retreating forces", and says nothing of walling up | Contested point 10, Phase 5 and the open-questions row reworded |
| 5 | SUGGESTION | Gaps omit Gatehouse's sources, one of which could date the ruin | **Right.** Gatehouse lists the Survey of 1609 (TNA SP 14/49/82), Close Rolls (Edward II, 1318-23) vol. 3 p. 542, Ellis's *Original Letters* ser. 2 vol. 1 p. 20, Rickard 2002 pp. 126-7, and a Google Books copy of RCAHMW 1917 (id 7gAABQpMpAYC, p. 155) | Added to the note's Gaps and to open-questions.md |
| 6 | SUGGESTION | The 1283 boundary and the limestone tier carry more certainty than their sources give | **Right on both.** 1283 rests on the monograph's "1283-87" alone, the listing only saying "perhaps after the war of 1282-3". The listing's exterior description is an inspector's account of the walls but its sources include Rees and Caple, and the BGS bedrock shows what the hill is made of, not the walls | "c. 1283" throughout the phase table; the limestone label now names the listing as the source, as Caple's family, with quarrying on the hill [S10] and the bedrock as agreeing evidence only |
| 7 | SUGGESTION | The listing's "second hall" is read as the great chamber without saying so; a first-phase internal wall is missing | **Right on both.** The listing says "a second hall at right angles to the original" and "Maredudd's mid C13 hall at right angles on its E side"; the Cadw guide says "a new hall". medievalheritage describes "a section of straight wall ... southwest of the tower, likely separating the northern representative and residential section from the southern economic part" | Phase 2 now marks the identification as the note's own; a `dryslwyn/cross-wall` part is added with its position and length unknown (to be read from the plan at build, or omitted) |
| 8 | SUGGESTION | No change needed; confirmations | **Accepted as stated.** Anchor, distances, quotations, the chronicles, BGS, image licences, the plan's scale and the keep's fit, LiDAR hashes and heights, and that no existing source row was removed or renumbered all matched | None. The castle's extent re-measures at 114 x 98m against the note's about 112 x 97m (see below) |

## Left as it is

- Nothing renumbered: no source was added, so `node tools/research/extract-sources.mjs` yields the same
  `dryslwyn:S1`-`S28`.
- The reviewer's 114 x 98m extent was not adopted, and not reconciled either: the reviewer re-measured the coloured walls at
  the same 7.5 px/m and 3 degrees and got 114 x 98m, the note says about 112 x 97m. The 1-2m gap is inside the stated
  ±1-5m fit error, so the note's figure stays, but which measurement is nearer is not settled and a build should take the
  extent from the part coordinates, not from this headline figure.

## Still not checked

- Caple's monograph, the Cadw guide, Webster 1987, Caple 1990 and 2008, the interim notes, the King's Works, RCAHMW 1917 and
  the 1609 survey (not obtained).
- The three phase panels' own fits and the borough plan against the terrain.
- The cross wall's position.
