---
title: Check 1 of st-teilo.md
kind: review
status: current
updated: 2026-10-17
---

# Check 1: St Teilo's church, phase by phase, for a Blender model

Reviewed note: [`../st-teilo.md`](../st-teilo.md) (status: draft, 2026-10-17). Repo state: the worktree branch
`worktree-wf_68d5ea17-755-3` at `ec86387`, which is `main` (the merge of `main` found nothing to bring in).

**This check is not independent.** It was written by the same agent that wrote the note, on the same day, inside the
workflow that commissioned the note. It is a second reading of each claim against the downloaded sources, with every
quotation tested by a script and the measurements re-run by a second method, not the fresh pass by another reader that
the todo path asks for. That pass is still owed before the church is built.

## Method

- Every source was downloaded into a scratch folder and read as text: HTML stripped of tags (Coflein, the listing, the
  HER's PRNs 888 and 912 and its project record DAT57045, the local-history page, the Scott gazetteer, the DWB, GENUKI,
  British History Online's Lewis, the Welsh Newspapers page); Ludlow's churches report as the PDF's text layer
  (`pdftotext -layout`), with the first page of the entry (PDF p. 123) checked against its page image; Wikipedia as raw
  wikitext.
- **Every quotation in the note was tested by a script** against those texts, ignoring whitespace and punctuation: 108
  quotations followed by a citation. Fourteen were flagged. Ten were the script pairing a quotation with a later citation
  in the same sentence (each read by eye and found in the source it is attributed to). Four were real, and are fixed in
  the note:
  1. "seven-bayed nave and chancel, without structural division" was given to Ludlow; it joins Coflein's words to
     Ludlow's. Now Ludlow's own "a 7-bayed chancel/nave, without structural division", with Coflein's wording beside it.
  2. Ludlow's "between vestry and south transept" read "between the vestry and the south transept". Corrected.
  3. and 4. *The Welshman*'s "It will accommodate 920 individuals" and "the old steeple" are the OCR cleaned up ("It wi)l
     accom- modate 920 individual,,", "the old stee- Ide"). The note now gives the OCR for the first and says in the
     source entry that its quotations are cleaned OCR.
- **The measurements were re-run** from the raw rasters by a second method: the tower's centre as the centroid of the
  surface cells between 71 and 75.5m OD (56 cells) is plan (-19.66, -2.33), E 262912.2 N 222227.3, against (-20.0, -2.25)
  from the edges, 0.35m apart; the turret's cells above 75.5m OD (12) centre on (-17.5, 1.9), at the north-east angle, as
  the edges gave. The axis was checked by the nave's ridge, which stays at y -2.0 ±0.5 from x -12 to 18.
- **The photograph scaling** (batter, clock face, belfry) was checked by reading the tower's breadth off the same
  photograph: 8.2m against the surveyed 8.0m.

## Claims and their second source

| Claim | Sources | Independent second source? | Verdict |
|---|---|---|---|
| The anchor SN 62930 22236 | Coflein, listing, HER | One point in three records (not independent of each other); Ludlow's SN 6293 2225 agrees at its 10m precision; the survey puts the point inside the nave | Holds |
| Axis 19.3 degrees | OS footprint, survey | Yes: two measurements | Holds |
| Tower 8.0 x 7.5m, parapet 18.7m, roof 17.4m, turret 20.5m | Survey only | No text gives any dimension | Measured, single instrument; labelled measured |
| Turret at the north-east angle | Listing (Coflein copies it); survey | Yes: listing and survey; Ludlow contradicts | Holds; Ludlow's "western half" recorded as contradicted |
| Tower date | Listing (C15); Ludlow (later C16; HER and Coflein repeat) | No: one source per reading | Contested, as the note says |
| Parapet date | Listing (C19); Ludlow (later C16) | No: one per reading | Contested |
| Pre-1848 plan as today's | Ludlow (maps); local history (foundations) | Yes, two, both secondary and unmeasured | Documented, with the caveat in the note |
| Double nave | Listing; Lewis 1833 (via Ludlow); HER (Ludlow's strand) | Yes: listing and Lewis | Holds |
| South transept by 1837 | Ludlow only | No | Labelled one source: Ludlow |
| Body demolished 1848, tower kept | Ludlow (Jenkins's diary), Coflein (Ludlow's strand), *The Welshman* | Yes: the newspaper | Holds |
| Reopened 10 October 1850 | *The Welshman* | The local page's "completed in 1850" agrees on the year | Holds; completion 1850/1851 kept contested |
| Architect | Newspaper, Lewis 1849, listing, gazetteer, Ludlow say Scott; local page says Davies under Scott | Scott: yes, many; Davies: one | Contested, as the note says |
| Organ chamber 1903 or 1905 | Ludlow (faculty 1903); listing and local page (1905) | Yes for 1905; 1903 has the faculty | Contested |
| Organ chamber is the east south gable | Ludlow's order "between the vestry and the south transept"; survey's two gables | Ludlow plus the survey's geometry | Holds, labelled one source for the dating of each gable |
| Vestry on the south | Ludlow, listing | Yes | Holds; the app's vestry on the north is wrong |
| Materials of the 1848-51 body | Listing, Ludlow, gazetteer | Yes | Holds |
| Tower rubble and Old Red Sandstone dressings | Ludlow; listing ("dressed quoins"); photograph | Yes: Ludlow and the photograph's colour | Holds |
| Slate roofs | Listing, Ludlow, photograph | Yes | Holds |
| The road through the churchyard is late 18th-century | Local history (date), Lewis 1849 (a new road) | The road's newness: two; the date: one | As the note says |
| Clas documented by the 9th century | DWB, local history, HER | Yes | Holds |
| c. 1400 for the medieval body | Local history only | No | Labelled one source |
| Edward I shown Teilo's tomb | Local history only | No | Labelled one source |
| Bedrock | BGS | One source, authoritative | Holds |

## What this check did not do

- It did not view the 1837 tithe map or the Lambeth ICBS file, so the strongest claim about the pre-1848 church, that its
  plan was today's, still rests on two secondary sources reading things neither this note nor its check has seen.
- It did not confirm that the Welsh HER PDF is the report the HER's project record names; the identification is by the
  order of the links.
- It did not re-read `effects:S6` (the quarry collapse's five men). **Correction (2026-10-17, from [check 2](st-teilo-check-2.md))**: that omission hid an error. The collapse is one event (Jenkins's diary: five buried, four saved, one dead), not two conflicting counts, and the diary says the quarry gave no usable stone.
