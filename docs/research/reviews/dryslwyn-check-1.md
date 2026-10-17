---
title: Check 1 of dryslwyn.md
kind: review
status: current
updated: 2026-10-17
---

# Check 1: Dryslwyn Castle, phase by phase, for a Blender model

Reviewed note: [`../dryslwyn.md`](../dryslwyn.md) (status: draft, 2026-10-17). Repo state: the worktree branch
`worktree-wf_68d5ea17-755-2`, with `main` merged in (already up to date at `ec86387`) before the note was written.

**This check is not independent.** It was written by the same agent that wrote the note, on the same day, inside a
workflow that commissioned one agent. It is a second reading of each claim against the downloaded sources, with every
quotation tested by a script, not the fresh pass by another reader that the todo path asks for. That pass is still
owed before the castle is built.

**Update, 2026-10-17:** the independent pass is [check 2](dryslwyn-check-2.md). It found that this check let two
errors through (claim 12's neighbour, the hall's added storeys, which the note wrongly called contested, and the first
kitchen's material, which it wrongly left uncontested), and that the note over-claimed on a few labels. The note is
corrected.

## Method

- Every web source was downloaded and read as text (HTML stripped of tags): Coflein's two records, the Cadw listing and
  scheduling reports, the two HER records, Gatehouse, the two castlewales.com pages, medievalheritage.eu, Cadw's visitor
  page and the Routledge page carrying the monograph's abstract. The three chronicles were read as the Internet Archive's
  OCR full texts and searched for every spelling of the castle's name (Deresloyn, Druselan, Dyryslwyn).
- **Every double-quoted string in the note was tested by a script** against those texts, whitespace- and
  quote-mark-insensitive: 328 found. Of the rest, the labels read off images (the plans' legends, the sections' notes,
  the aquatint's title), the BGS answer (read from the service's reply, not saved) and the note's own labels were checked
  by eye; the Latin of Trivet and Wykes is quoted with the OCR's misreadings corrected, and the note says so. Two
  misquotations were found and fixed: "possibly by his successors" had lost "by", and a listing quotation ran on into a
  garbled apostrophe and was cut to "perhaps after the war of 1282-3".
- The measurements were re-run from the raw rasters: the keep's centre by a least-squares circle through the wall-top
  cells (E 255404.8 N 220297.8, against the note's E 255404.0 N 220297.5 read off the heights; the note's "half a metre"
  was too tight and now says "about a metre"); the plan's fit as a grid search (scale 6.6-8.0 px/m, rotation -8 to +8
  degrees, offsets ±3m); the hill's extent from the terrain model.
- "Second source" below means a source that does not copy the first. Where both go back to Caple's excavation (the Cadw
  guide, Coflein, the listing, the scheduling report, medievalheritage.eu, the plans and sections all do), the verdict
  says **one source (Caple), two routes**.

## Claims checked

| # | Claim in the note | First source | Second source | Verdict |
|---|---|---|---|---|
| 1 | Coflein's reference is SN 55387 20288 | Coflein [S1] | `models:S1` and `medieval:S55` read the same record on 2026-10-02 | Confirmed (same record, read three times) |
| 2 | The listing, scheduling and HER references are 63-91m north of Coflein's and not on the castle | Listing E 255403 N 220365 [S3]; scheduling E 255436 N 220365 [S4]; HER SN55402035 [S5] | The fitted plan [S11][S24] | Confirmed (arithmetic: 78.6, 91.3 and 63.3m) |
| 3 | The keep's centre is E 255404.0 N 220297.5 | DSM heights [S24] | A circle fitted to the wall-top cells gives E 255404.8 N 220297.8 | Confirmed to about a metre (corrected from half a metre) |
| 4 | The period plan fits at 7.5 px/m and 3 degrees clockwise | Grid search [S11][S24] | The phase plans' bar transferred by the keep's width gives 7.29 px/m [S12] | Confirmed; the 3% difference is stated, its cause unknown |
| 5 | The keep is about 12m at its base | medievalheritage "approximately 12 meters" [S10] | The survey's ring (about 12m) [S24]; the plans 12.4-12.9m [S11][S12] | Confirmed (survey independent) |
| 6 | Above the flare the keep is about 9m across, 16m high | Caple's section [S14] | None | One source (Caple), and a reconstruction: labelled so |
| 7 | Founded "in the late 1220s by Rhys Gryg for his son Maredudd ap Rhys" | Monograph abstract [S20] | Listing "in the 1220s" [S3] (cites the 1999 guide) | One source (Caple), two routes; contested against Coflein's "second quarter" and medievalheritage's "possibly by his successors": kept contested |
| 8 | First record 1245 or 1246 | *Annales Cambriae*, manuscript C's note printed under 1246 [S21] | Cadw guide 1246 [S8]; Gatehouse lists 1245 [S7] | Confirmed that the record exists; the year kept contested. The draft said the note was "placed in the preceding year by manuscript C"; that misread a neighbouring footnote and was removed |
| 9 | Middle ward mid-13th century | Monograph [S20] | Cadw guide [S8]; plans [S11][S12] | One source (Caple), several routes; contested against Coflein's "later thirteenth century" [S1] |
| 10 | Expanded 1283-87 by Rhys ap Maredudd | Monograph [S20] | Listing "perhaps after the war of 1282-3" [S3] | One source (Caple), two routes |
| 11 | "a white rendered and lime-washed appearance" by the late 13th century | Monograph [S20] | None read (the reconstructions paint it white [S18][S19], the same evidence) | One source (Caple): labelled so |
| 12 | The hall's roof was slate | Scheduling report [S4] | Monograph: "nails, sheet lead, slates" [S20] | One source (Caple), two routes |
| 13 | Limestone rubble walls | Listing [S3] | BGS: Mydrim Limestone bedrock [S25]; medievalheritage [S10] | Confirmed for the bedrock (independent); that the stone came from the hill is medievalheritage's statement |
| 14 | The 1287 siege used mining, and a fall killed William de Monchensy | *Annales Cambriae* [S21] | Trivet [S22]; Wykes [S23] | Confirmed (three chronicles) |
| 15 | The siege began about 1 August | *Annales Cambriae* "circa gulam Augusti" [S21] | None; the Cadw guide says 15 August [S9] | Contested, kept so |
| 16 | The wall fell "near the projecting chapel block" | Cadw guide, as "Tradition" [S9] | None | Labelled tradition |
| 17 | Walled up "early to mid 15th century" | Monograph [S20] | Cadw guide "early 15th century" [S8]; Coflein [S1] | One source (Caple), several routes; who did it contested against medievalheritage [S10] |
| 18 | Two standing sections on the south before the excavation | Cadw guide [S8] | The c. 1795 aquatint [S27] and the 1872 engraving [S28] | Confirmed (independent views) |
| 19 | Today's standing tops 74.1m (apartments), 74.9m (chapel), 74.6m (keep) OD | DSM [S24] | The DTM 12-14m lower at the façade's foot; Caple's elevation's OD scale tops the chapel wall near 75m [S16] | Confirmed (survey) |
| 20 | An Iron Age hillfort under the castle | Scheduling report [S4] | None; the Cadw guide denies any evidence [S8] | Contested, kept so |
| 21 | The castle is outside the app's LiDAR region | `tools/terrain/lidar-areas.json` | Arithmetic: E 255387 against the region's E 260000; N 220288 against its N 220500 | Confirmed (corrected in the draft from "170m" to "about 210m" south) |
| 22 | The proposed 2m area lies inside tile SN5520 | The area E 255200-255700, N 220125-220625 | The tile E 255000-256000, N 220000-221000 (catalogue [S24]) | Confirmed |

## Corrections made in the note during this check

- The keep's centre's precision ("half a metre" to "about a metre").
- The first record's placement in manuscript C (removed: the footnote read was another entry's).
- The hill's extent above 30m OD (the first draft took in a neighbouring hill to the east; now about 300 x 250m).
- The highest ground: it is a bedrock outcrop about 19m east of the keep that the plan hatches, not the inner gate's
  buildings.
- The listing's and scheduling report's points: "in the borough's area" and "inside the outer ward" became "where Caple's
  plan draws the settlement" and "just west of the outer ward".
- The LiDAR area's centre is 107m from Coflein's point, not 72m; the castle is about 210m, not 170m, south of the
  region's edge; a grown region would be about 2.6, not 2.5, times the present one.
- The middle ward is about 52m long and up to 25m wide (the draft said 52 x 30m); the outer ward about 55 x 30m.
- Two misquotations (see Method).

## Not checked

- Caple's monograph itself, the Cadw guide, the King's Works, RCAHMW 1917 and the interim reports (not obtained).
- The phase panels' own fits [S12].
- The borough's plan [S13] against the terrain (overlaid at its bar's scale only).
