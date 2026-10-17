---
title: Check 1 of llandeilo-bridge.md
kind: review
status: current
updated: 2026-10-17
---

# Check 1: Pont Llandeilo, the old bridge and the 1848 arch, for a Blender model

Reviewed note: [`../llandeilo-bridge.md`](../llandeilo-bridge.md) (status: draft, commit `c436851` on the worktree branch
`worktree-wf_68d5ea17-755-11`, with `main` already merged at `ec86387`, so nothing to merge).

**How this check was made.** An independent reader (a second pass that did not write the note) read the note against the
sources and sent nine findings (4 IMPORTANT, 5 SUGGESTION, no CRITICAL). This file is the second step: the findings were
**treated as hypotheses**, each tested again against the source or the survey before anything in the note changed. The
verdicts below are the result. The reader's findings are not independent of this file's verdicts in one respect: the same
agent that edited the note applied the fixes, so the fix itself still wants a glance from a third reader (see "What is
still owed").

## Method

- Every source the findings touch was fetched again on 2026-10-17 into a scratch folder and read as text: the five llandeilo.org
  pages (Hughes, Jervoise, Jenkins's diary in both transcriptions, the gallery, *The Good Old Days*), both Cadw listings,
  both Coflein records and Wikipedia's raw wikitext.
- **Nicholson and Rees** were read as the Internet Archive's full-text OCR (`cambriantravelle01nich`,
  `beautiesofenglan18brit`, plus the 1808 first edition `cambriantravell00nichgoog`), the passages found by search and read in
  context, the page or column found from the OCR's running heads, and the title pages and the Internet Archive's metadata read
  for edition and date.
- **The causeway was re-measured** on the two 1m surface-model tiles, downloaded again (SHA-256 of both equal to S15's, so
  the same data) and read beside the 1m terrain model the app already holds: a row-by-row profile across the road along the
  axis, a footprint of everything standing 2.5m or more above the terrain, and a tracked centre line south of the bend,
  checked against a hillshade made at 4 pixels to the metre.
- **Quotations.** The quotations that this check added or changed (31 strings) were tested by a script against the fetched
  texts, whitespace-insensitive. 25 matched directly; the other 6 differ only by tag-stripping or OCR spacing ("4 th",
  "reduced ;", a column break) and were each confirmed by reading the cleaned text. An attempt to test every quotation in the
  whole note mis-paired its quotation marks and was abandoned, so **the note's older quotations were not re-tested** here.
- Calendar days were computed, not remembered.

## The findings, one by one

| # | Finding | Verdict | What was done |
|---|---|---|---|
| 1 | S16 gives the "four narrow stone arches" to Bryn Thomas, against `victorian:S66` | **Confirmed** | llandeilo.org's page reads "Below are some of facts as given by Gwilym Teilo in Llandeilo Past and Present in 1858." and, directly under it, "In 1750 the Tywi Bridge consisted of four narrow stone arches." The note had it wrong and cast doubt on a citation that was right. S16 is retitled (id kept), the parenthesis against S66 is gone, Summary, Phase 1, contested point 2 and the Gaps now name Teilo 1858 |
| 1a | The same finding's point that Teilo and Samuel 1888 may be one work | **Plausible, not shown** | Cadw's source line reads "W. Samuel, Llandeilo Past and Present, 1888, p 8"; this repo already holds a Samuel, *Llandilo, present and past* (Carmarthen, 1868), from another note. Three titles, three dates, two authors: not established to be one work. Written as a Gap, not as a finding |
| 2 | Nicholson and Rees are misdated and misnamed (they come through Hughes and Jervoise), and the approaches passage in Rees is missing | **Confirmed**, with one limit | See below. S22 (Nicholson) and S23 (Rees) are added through the pipeline; the Summary, Phases 3 and 4, contested points 4, 5 and 9, the Gaps, findings.md and open-questions.md are corrected. **Limit:** the reader said the 1808 first edition "does not appear to have" the sentence. Its OCR is too garbled to say either way (the Hoare passage on the inn is there, the bridge sentence is not found, which proves nothing), so the note says exactly that |
| 3 | Dates resting on Hughes alone are tiered "documented" without the "(one source: …)" label | **Confirmed** | Checked each: 4 July 1843 (Hughes only; the diary's first entry on the works is a pump on 27 September 1843); the keystone, 25 November 1847 (Hughes only; the diary has no entry, and the "final keystone" sentence on llandeilo.org's diary page is commentary that repeats Hughes word for word); the flood of 10 February 1798 (Hughes only; Jervoise has only "evidently only a ferry"); the old bridge taken down from April 1848 (Hughes; the diary's 23 October 1846 gives Haycock "the materials of the old bridge", which shows the plan, not the date); the approaches done by 19 October 1848 (Hughes). Labelled in the Summary, Phase 2, the Phase 5 table, the plan's phase and part tables, and the rule paragraph. No second source was found (the Carmarthen Journal and quarter sessions were not searched), so none is claimed |
| 4 | The south causeway is not on the straight axis beyond about s = -80, but the plan draws it there | **Confirmed, and measured** | See below |
| 5 | The gloss says "down the hill", not "downstream", and the candidate sits at exactly 250 ft | **Confirmed** | The text reads "further down the hill". 76.2m is 250 ft to within a third of a metre, so the candidate was found where it was looked for; the bank change itself is real (reproduces on the DTM). The gloss's last words ("extremely narrow with no room for a pedestrian to pass a carriage") do echo Rees's sentence, which is a hypothesis that an editor wrote it from Rees, not a finding. "Probably" is now "possibly", the heading and Summary say so, and the plan keeps the candidate as reconstructed |
| 6 | Placement checks only the new arch against the app, not the old bridge's 25m line | **Confirmed from the code** | `OLD_BRIDGE_LINE = 25`, axis 72.4: the app's old bridge runs from about E 262709 N 221932 to E 262741 N 222033, 25m downstream (t = -27 to -25 in the survey frame) and parallel; the candidate abutment is at t = -76. Added to the Placement table and the frame paragraph |
| 7 | Small date conflicts: the railway drowning and the crane | **Confirmed** | 6 August 1846 was a **Thursday** (computed; 6 August was a Sunday in 1843 and 1848); the boy's remains were found on 10 October "after two months", which suits early August 1846, so the day or the date is wrong. Hughes has the cranes on 25 August, the diary "Aug 21 Erected a derrick crane". Both added to Phase 5 and to contested point 9 |
| 8 | Parts of Hughes and the plaque bear on the model and are missing | **Confirmed in each part**, with additions | The Cennen-gorge stone (Hughes: Jenkins's testing engine was for stone "quarried from volcanic rock at the Cennen gorge, Ffairfach", plus Cilyrychen "black marble"): added to Materials and contested point 8 (its geology not checked). The hump-back and the raised approach ("an incongruous, hump-backed edifice"; Haycock raised the highway up Bridge Street for about £200; Wikipedia says the height "essentially reduced the gradient"): added to the Summary and the road row, with the inference that today's profile is the one after those works. Lewys Glyn Cothi's complaint of about 1470, the basis of Hughes's "after 1485": added to contested point 1, **with a limit the reader did not give: the complaint names the Towy and Llangathen, not Llandeilo**. The gallery's "one of the stone supports" against Hughes's two: added to contested point 3. The plaque's 1779 relief: added as a Gap (the photograph was not looked at again; the note had transcribed the caption and the reader saw it too) |

### Finding 2 in detail

- **Nicholson.** The book is George Nicholson (1760-1825), *The Cambrian Traveller's Guide*, **second edition**, "corrected and
  considerably enlarged", preface signed Stourport, October 1813 (title page and Internet Archive metadata). The article
  LLANDEILO FAWR, cols. 737-738, reads "The Bridge over the Towey consists of 3 very light and elegant arches, built by David
  Edwards of Beaupre in Glamorganshire." Hughes calls it "Emilius Nicholson ... *The Cambrian Tourist's Guide* ... fifth
  impression in 1814". Hughes's argument is about an engraving he says accompanies it and resembles Llandeilo Rwnws bridge; the
  scan read has no view of Llandeilo that was looked for, so that argument concerns an illustration in a book not identified
  here and does not touch the guide's text, which is a printed witness of 1813 or earlier.
- **Rees.** Thomas Rees (1777-1864), *The Beauties of England and Wales*, vol. XVIII, *South Wales*, London 1815 (title page).
  On Llandeilo Fawr (p. 313 in the OCR's page run), citing the returns of 1811: "The river is crossed here by a substantial stone
  bridge of modern erection, but built with a shameful disregard to public convenience. Owing to a miserable parsimony it has
  been made so narrow that a carriage cannot be passed upon it, either on foot or on horseback, without some danger.", then
  "Considerable attention has been paid of late years ... The access to the bridge has been widened, and its steepness much
  reduced; and the wretched hovels which used to line its sides have been removed, one side being thrown open to the river, and
  the other built with comfortable houses." Hughes's "published in 1813" and Jervoise's "c. 1819" are both wrong for the
  volume (written after 1811, dated 1815). The reader was right that Hughes quotes the narrowness sentence without "of modern
  erection"; Jervoise has the clause.
- **What it changes.** The three-arch strand now has two witnesses read at first hand (Nicholson's text, Rees's words) where it
  had them at second hand, and Rees's "of modern erection" can also mean a restoration, so the note calls the strand strong,
  not decisive. The recommendation to Dewi (three arches) is unchanged and is still his call.

### Finding 4 in detail

- **What reproduces.** Along the 16.3-degree axis from Coflein's point every figure the note gives: crest spacing 9.25-9.5m over
  the arch; road 35.72, 36.08 and 36.36m OD at s = -22, 0 and +22; 34.20 at -60 and 33.24 at -80; the north-bank change at
  E 262682 N 222019 on the DTM; the side bulges at about s = ±25.
- **What does not.** The midpoint between the crests drifts east of the axis from s ≈ -76 (0.9m at -78, 1.6m at -82); the east
  crest is lost from about -82; the road's centre is at E 262736 at N 221900 (8.5m east of the axis) and E 262747 at N 221850
  (about 31m east of it). The footprint of everything 2.5m or more above the terrain is a strip 13-14m wide that turns from
  south-south-west to south-south-east and runs to N 221832; the road is still 1.8m above the floodplain at N 221814. The
  hillshade (`refs/llandeilo-bridge/lidar-dsm-hillshade-causeway.png`) shows the curve plainly and the walls continuing to
  about N 221770, close to the Ffairfach road. So the reader's description was right and the note's "run on unbroken south" was not.
- **What the reader's figure leaves open, and this check could not close.** The causeway's width on the bend: the crest maxima
  there are 13m apart across a row (against 9.6m over the arch) and rise 1.2-1.7m above the road (against 1.1m), which means
  they probably include hedge, bank or trees. The note says so and keeps 9.6m as an estimate.
- **Hughes's lead.** "Morgan ... had moved the southern parapet site without consultation, altering the agreed line of the
  structure" is quoted in the note as a possible reason, marked unconfirmed (it does not say from where to where, and the bend
  may be a later road line).
- **A coincidence recorded, not used.** The app's south end (s = -81.3), Cadw's length if the north abutment ends at s = +30
  (about -81), and the start of the bend (-76 to -82) fall in one place. Nothing here shows they are related.

## Things found that the reader did not raise

- **Hughes's numbering of the fallen spans is internally inconsistent.** His text has Turner showing "two" down ("Numbers 2 and 3
  from the right bank") and "five solid, standing arches", but his own Turner caption says "one of the central stone spandrels
  ... is shown missing"; his Rooker has "another" swept away, making three, but numbers them 3, 4 and 5, which does not contain 2
  and 3. The note now says the order is documented and the count is not.
- **Cadw's "Llandeilo Past and Present, 1888"** may be Samuel's 1868 *Llandilo, present and past* in a later edition (above, 1a).
- **Wikipedia's wording checked.** It does say the new bridge "replaced a previous three-arched bridge", gives "143 ft (43m)" for
  the span and "rising 35 ft (10.5m)" for the rise; the note's contested point 6 now says 10.5m beside its 10.7m conversion of 35 ft.

## What is still owed

- A reading of *The Buildings of Wales* p. 250 and Cragg pp. 77-78, still not obtained (Wikipedia is the only route); the
  three-arch case leans on them as a modern strand.
- Samuel (1868 and whatever 1888 is), the quarter sessions papers and Williams's drawings: the places where the answers to the
  1800-48 form, the springing level and the ring depth are likely to be.
- A look, on the ground or in a photograph, at the north bank at E 262683 N 222019, and a look at the causeway's width where it
  bends.
- The fixes themselves, as applied here, by someone who did not apply them.
