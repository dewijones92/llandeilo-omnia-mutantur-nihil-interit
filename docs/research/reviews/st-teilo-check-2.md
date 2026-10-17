---
title: Check 2 of st-teilo.md
kind: review
status: current
updated: 2026-10-17
---

# Check 2: St Teilo's church, phase by phase, for a Blender model

Reviewed note: [`../st-teilo.md`](../st-teilo.md) (status: draft). This is the **independent** check the todo path asks
for: a reader who had not written the note opened the sources, and its findings were then each verified against the
source by the agent that applied them, since a reviewer's findings are hypotheses until checked. [Check 1](st-teilo-check-1.md) was the author's own re-read and is not
independent. This file is named check 2 rather than overwriting check 1, which already holds that record.

Repo state: branch `worktree-wf_68d5ea17-755-3`, level with `main` (`/usr/bin/git merge main`: already up to date).

## What was re-done before accepting a verdict

- **Hughes's bridge history** (llandeilo.org/bge_history.html) re-fetched and read around the quarry entry.
- **HER PRN 912** re-fetched: its map reference, its summary.
- **The llandeilo.org St Teilo page** re-fetched: its dates for Talley and for Teilo.
- **Ludlow's PDF** re-downloaded (SHA-256 begins e738a698, matching the note); `pdftotext` page by page for the running
  heads and for the vault and quarry passages.
- **The LiDAR** re-measured: the DSM of SN6222 (SHA-256 begins 7c162d1e) and the repository's DTM, in the note's plan
  frame (E = 262930 + 0.9438x - 0.3305y, N = 222236 + 0.3305x + 0.9438y), for the porch, the vestry and the vault.
- **Not re-done**: the other quotations and the tower and nave measurements the reviewer says hold (Coflein, the Cadw
  listing, the HER's PRN 888, the DWB, *The Welshman*, Lewis, the Scott gazetteer, the photographs' licences). Their
  verdicts below are the reviewer's, not re-verified. The tower check in this pass was one cell median (parapet 74.56m
  OD against the note's 74.5-74.6m), which agrees.

## Findings and verdicts

| # | Finding | Verdict | What was done |
|---|---|---|---|
| 1 | IMPORTANT: the quarry collapse presented as two conflicting counts; Jenkins says the quarry gave no usable stone | **Confirmed.** Hughes quotes the diary: "gave way and buried five men. Four saved, but one, after remaining buried for two hours, taken out a corpse ... Now the quarry will have to be abandoned without procuring any stones worth using from it". Ludlow's "killing one of the workers" cites Jenkins too (1912, 31), so five buried and one dead is one account. Ludlow says only that a quarry "was apparently excavated"; only Coflein says the rebuilding used its stone. One nuance: Hughes gives no year for the entry (it follows his January 1848 events), and `event-effects.md` dates it 18 April 1848 | Contested point 10 rewritten as the stone's source; Phase 4 and Phase 5 materials corrected (no Llandeilo Flags inference); new source S20 (Hughes); the open-questions row and `findings.md` corrected; check 1's "did not re-read effects:S6" annotated |
| 2 | IMPORTANT: the medieval outline tiered "documented" to half a metre | **Confirmed.** The evidence is the 1837 tithe map (not seen) and an undated plan, read by Ludlow, plus a page that cites nothing; the 1837 plan post-dates the tower and a transept of unknown date, and Ludlow's own text (one south gable in 1850, the organ chamber 1903, "(and vestry?)") shows the 1850 plan was not the old one | Medieval and tower-phase outlines are now **reconstructed from today's measured outline**; only "the 1837 plan matched" stays documented; Summary, Phase 2, the table and `models.md` ("Closed" is now "Part closed") reworded |
| 3 | IMPORTANT: the c. 1400 boundary stretches "the clas church" and an imagined thatched hall to 1400 | **Confirmed.** The page's "c.1400" dates "the pre-1848 building"; the church was a parish church after the conquest and appropriated to Talley c. 1215 (Ludlow), and the HER has it losing episcopal status by the 11th century | The decision now names the trade-off and gives three options (keep 1300 with an honest ⓘ; move to c. 1400 and relabel the earlier phase; add a middle "parish church, form unknown" phase), recommending the relabel; the phases table says c. 1400 only if the owner takes that option |
| 4 | SUGGESTION: Ludlow's entry is PDF pages 123-128 | **Confirmed.** `pdftotext`: the running head is "St Teilo, Llandeilo Fawr" on pp. 123-128 and "St Dingat, Llandingat" from p. 129 | Fixed in both places |
| 5 | SUGGESTION: the HER PRN 912 reference is 10m, so "6m south" is false precision | **Confirmed.** The page prints "NGR : SN62932223" | The table gives SN 6293 2223 (10m), agreeing with Coflein within its precision |
| 6 | SUGGESTION: the tower-phase transept omits Ludlow's "(and vestry?)"; the vault projection is not modelled | **Confirmed.** Ludlow: "a large south transept (and vestry?) on the site of the present transept, vestry and organ/heating chamber"; and the vault "projects beyond the aisle east wall where it is coped back to form a lean-to up to the sill level of the wall". The surface model shows a low mass there: 1-2m above the ground at x 14.0-16.0, y about 4.5-10.5, falling eastward | Added `teilo/vestry-old` (optional, queried) to the tower phase and `teilo/vault-projection` to the Scott phases |
| 7 | SUGGESTION: the vestry "top" is a mid-slope median; the porch is deeper and its height measurable | **Confirmed, with small differences from the reviewer's figures.** Vestry: the surface falls from about 61.4m OD at the nave's wall (y -8) to 58.7m at y -11 (the reviewer had 61.7 at the wall; mine is the median across x 14.5-19.5), so "about 60.5m" was mid-slope. Porch: the wall is at y about 11.2 and the roof ends at y about 14.4, so it projects about 3.1m; the width is about 5.0m (x -12.3 to -7.2), eaves 3.1-3.4m and ridge 5.0-5.3m above the ground, low confidence (trees) | Both rows corrected, the corrections named in the cells; the S14 entry updated |
| 8 | SUGGESTION: the Welsh name has no source; `era-victorian.md` differs | **Confirmed.** I did not re-check Cadw's or Coflein's Welsh pages myself. Welsh Wikipedia has a third form, "Eglwys Sant Teilo", for the St Fagans church of the same saint, which is no source for Llandeilo's | The opening says the form is the app's and unverified, with the three forms; a row in `open-questions.md`; the app and `era-victorian.md` are not changed |
| 9 | SUGGESTION: two llandeilo.org contradictions not recorded | **Confirmed.** The page says the Teilo lands passed to Talley "in the twelfth century" and puts Teilo's settling in the sixth century "probably towards its close", and quotes an encyclopedia with his death "probably in or before 560"; the HER has a "6th century entry in the Book of Llandaff" | Contested points 14 and 15 |
| 10 | SUGGESTION: "c. 1830-1848" has no source; the ICBS "queries Scott" rests on an unread record | **Confirmed.** The roofless aisle is Ludlow's "suggesting that it may have been roofless" from the 1837 map's lack of shading; nothing gives c. 1830; S11 is marked "not read" | The sub-phase reads "by 1837 ... (no source gives c. 1830)"; contested point 6 says the ICBS query is from a search engine's summary |
| 11 | SUGGESTION: the older open-questions tower row still says "the same record" | **Confirmed.** | Corrected with a dated note, pointing to the full row |
| 12 | Checked and holding (no fix needed) | **Not re-verified here**; taken from the reviewer, apart from the tower parapet cell above, the Ludlow SHA and the DSM and DTM hashes | None |

## What this check did not do

- It did not see the 1837 tithe map, the undated town plan, the Lambeth ICBS file or the competition drawings; the claim
  that the old church had today's plan is now labelled for what it is (a reconstruction) but still rests on Ludlow's
  reading of them.
- It did not re-verify the quotations and measurements the reviewer reported as holding, other than those listed above.
- It does not settle whether the church was built of the churchyard quarry's stone; it records that the evidence
  conflicts.
