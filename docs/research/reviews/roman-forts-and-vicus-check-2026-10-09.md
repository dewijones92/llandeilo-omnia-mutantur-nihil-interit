---
title: Independent check of roman-forts-and-vicus.md
kind: review
status: current
updated: 2026-10-09
---

# Independent check: The Dinefwr Roman forts and their vicus

Reviewed note: [`../roman-forts-and-vicus.md`](../roman-forts-and-vicus.md) (status: draft, updated
2026-10-09), written for GitHub issue 3 (a detailed reconstruction of the forts and their civilian
settlement). Repo state: branch `worktree-agent-aa610c2899cbb5555` at `3a59cc4`, one commit (the note
itself) ahead of `origin/main` at `c57d832` and none behind, checked with `git fetch` on 2026-10-09.
`src/content/features.ts` and `src/world/structures.ts` are the same as on `origin/main`.

## Method

- Every cited source I could reach was downloaded fresh into a scratch folder and read as raw text
  (curl, then pdftotext or tag-stripping and keyword-in-context reading), not through a summarising
  fetch, so wording could be checked exactly.
- **S1 (Hughes 2007) was read in full**: all 68 pages through pdftotext, including the trench
  descriptions, the pottery, glass, small-finds and plant-remains reports, the preliminary discussion,
  the references and Appendix 4 (brick and tile). Figs 1, 2 and the Ludlow drawing were looked at in
  the repo's reference copies, and Fig 1 was **measured again independently** (see Placement).
- Coflein records read directly: NPRN 402271 (S2), 419158 (S7), 422436 (S9), 92468 (S10), 95708
  (S11), 92153 (S12), 92890 (S13), 17603 (S20), plus **425** (Dinefwr Castle, the second anchor),
  **114230** (St Tyfei's church) and **266170** (the park record that Coflein's fort text cites as
  the fort complex). Archive record 6170068 (S5). Heneb's project page (S3), the *Tywi Time Line* PDF
  (S4; pdftotext, pdfinfo and pdfimages), the Trawscoed and Llanio survey PDF (S14), Jay Lane (S16),
  People's Collection Wales (S21).
- Wikipedia (leads only), as raw wikitext through `action=raw`: the Carmarthenshire scheduled
  monuments list (S6), Trawscoed fort (S15), "Roman fort" (S18, which now **redirects to "Castra"**),
  Auxilia (S19), Dinefwr Park National Nature Reserve (S19a).
- **Sources the note did not have**:
  - **Archwilio (the Heneb HER), which the note says was unreachable.** The record pages answer at
    `https://archwilio.org.uk/arch/query/page.php?watprn=DAT<PRN>&dbname=dat&tbname=core`. Read:
    PRN 47636 (Fort 1), 47637 (Fort 2), 47638 (the north-east road), 47646-47650 (finds), 869 and 886
    (coin hoards), 7367 (Llandyfeisant temple), 47835 and 48198 (the 2003 survey and its assessment),
    50045. After about a dozen calls the site answered "error code: 1015" (rate limit), so PRN 972
    and 94533-94535 were not read.
  - **llandeilo.org, "Llandeilo's Roman Fort"**: the `.php` address the note tried is a 404, but the
    page is live at https://llandeilo.org/roman_settlement.html. Its two images were downloaded
    (AVIF, converted with ffmpeg) and viewed.
  - **Dyfed Archaeological Trust, "Llandeilo Fort Dig Diary" (2005)**, the page Wikipedia cites,
    read from the Wayback Machine copy of 2 February 2021:
    http://web.archive.org/web/20210202144706/http://www.dyfedarchaeology.org.uk/digllandeilofort.htm
- One WebSearch was used (for the *Britannia* "Roman Britain in 2005" entry; not found). The 2006
  Cambria newsletter linked from llandeilo.org (`cambria.org.uk/llandeilofortnewsletter7.06.pdf`)
  is a 404 and has no Wayback copy.
- **Not done**: the Cadw scheduling record CM367 itself, the Stratascan reports and the *Britannia*
  entry (none found online). The Pen y Gaer paper (S22) was confirmed to exist as an abstract page
  only.

## Summary

98 claims checked: **72 confirmed, 17 partly, 2 not supported by the cited source, 7 contradicted.**

The archaeology in the note is accurate. Its quotations from Hughes and Coflein are verbatim, the
trench measurements are right, and the hedging on dates, gates and the bathhouse matches the report.
The errors are concentrated where the build will lean hardest, **placement**, and in what the note
missed by not reaching Archwilio and llandeilo.org:

1. **The derived fort positions are about 45m too far east and 50m too far north.** Measured again
   from Fig 1 with the same two anchors (Coflein's Dinefwr Castle and Newton House points, which
   reproduce the figure's own scale bar to 2m over 850m), **Fort 2's centre falls at about E 262190,
   N 222538, within 5m of Coflein's point** (SN 62187 22534), and Fort 1's at about E 262206,
   N 222470. The note's "the figures put the forts about 50m east of that point" is therefore wrong:
   there is no conflict between the figure and Coflein. Its relative offset and orientation are right.
2. **There are documented grid references for each fort.** The note says no source gives them.
   The Heneb HER does: **PRN 47636, Fort 1, SN 6218 2245** and **PRN 47637, Fort 2, SN 6217 2253**,
   plus PRN 47638, the road leaving the front gate, SN 6225 2260. They sit within about 30m of my
   derived centres and 60 to 70m from the note's. The community-website numbers the note told the
   builder not to use (47636, 47637) are the right ones.
3. **The likely source of "around AD 90-100" is found.** llandeilo.org captions the same Neil Ludlow
   painting "of what the second fort may have looked like around 100AD (Drawing: Cambria
   Archaeology)", beside the 2003 geophysics plot from Cambria's Summer 2003 newsletter. So the
   commenter's date is a date for the **scene in the picture**, not a foundation date, and their
   "useful geophysical survey" is very probably that plot. The note's "I could not find the drawing
   credited anywhere else, nor any note of which phase it shows" is contradicted.
4. **The HER gives Fort 2 a date the note does not mention**: "possibly around 82 AD" (PRN 47637)
   and "the construction of the later fort c.82AD" (PRN 47636), in summaries "M. Page 2013 based on
   Hughes". Hughes 2007 gives no such date, so it reads as Coflein's 78-83 inference restated, not new
   evidence. It must be shown as an HER reading, still unproven. It does not support AD 90-100 either.
5. **The two coin hoards are no longer "unresolved".** HER PRN 869 is the hoard of silver denarii,
   "some of Domitian (AD81-96)", in a pot, "300 yards west of Llandyfeisant church" (the late 1st
   century one, the same find as Coflein 419158). PRN 886 is a separate find of six bronze coins of
   Gallienus to Claudius Gothicus (mid to late 3rd century). Coflein's "later Roman" heading for
   419158 is the error.
6. **Roman tile was found; the note says the brick and tile were "mostly post-medieval kiln
   waste".** Appendix 4 says that of Trench 6 (the kiln) only. Contexts 2001 and 4001, in the fort
   and the vicus, produced Roman tile, "harder fired ... a harder red fabric", plus the possible box
   tile. That is the only local building-material evidence beyond daub, so it matters for roofs.
7. **Two citations point at the wrong evidence.** The provenance table cites Trenches 9 and 10 for
   the forts' ditch profiles, but those trenches cut the north-west enclosure (the possible second
   practice camp), not a fort. And the Llanio quotation ("rectangular wooden buildings arranged with
   their short axes towards the road. Each contained a hearth") follows the sentence on Cefn Caer,
   Pennal, in S14, so it most likely describes Pennal, not Llanio.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

### Sizes, dates and sequence

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Two forts, one partly over the other, found by Stratascan magnetometry (2003, 2005) and sampled by Cambria in 2005, 2006, 2007 | C | S1 introduction: "The geophysical survey was undertaken in two stages by Stratascan, in February and March 2003 and between May and July 2005 ... Two smaller pieces of fieldwork were undertaken in July 2006 and March 2007" |
| 2 | Fort 1 240m by 160m inside the inner ditches, 3.84ha, later 3.85ha | C | S1: "The internal dimensions (ie the area lying within the inner ditches) are 240m x 160m (3.84 hectares)"; discussion: "(3.85 hectares)" |
| 3 | Fort 2 about 140m by 110m, 1.54ha | C | S1: "overall internal dimensions of c 140m x 110m (1.54 hectares)" |
| 4 | Coflein 3.7ha and 1.5ha | C | S2: "The earlier is larger (3.7ha)"; "an internal area of 1.5 hectares" |
| 5 | Magnetometry, dual FM256 fluxgate gradiometers, 0.25m by 1m, Geoplot 3, 19.78ha; not ground radar | C | S1 methodology, word for word. S19a: "discovered during a ground radar survey". The likely root of the radar error is llandeilo.org quoting the 2003 newsletter: "A geophysical survey produces a radar-like picture" |
| 6 | Fort 1 "perhaps soon after AD 74", earlier "cannot be ruled out", Flavian foundation "most likely", pre-Flavian forms absent, very early Flavian possible on the 29:37 ratio | C | S1 discussion and Webster's pottery report, word for word |
| 7 | Fort 1's end at AD 78-83 is speculative | C | S1: "Of course, whether or not this was the scenario at Llandeilo remains speculative"; S2: "the military context in Britain may suggest a date of between 78 and 83" |
| 8 | Fort 2 later, a Fort 1 ditch under levelling for Fort 2 (Trench 2) | C | S1 Trench 2: ditch 2047 "is one of the defensive ditches of the earlier of the two forts (Fort 1). The overlying deposits of silty-clay (2022 and 1012) possibly represent levelling deposits" |
| 9 | Fort 2 has "no direct date" | P | True of S1 and S2 (S2: "There is no direct evidence of when it superceded the earlier fort"). But HER PRN 47637: "possibly around 82 AD"; PRN 47636: "the construction of the later fort c.82AD". Both are 2013 summaries "based on Hughes", and Hughes gives no such figure |
| 10 | Fort 2 in a "garrison phase later in the Flavian period", in use "until the early part of the second century" | C | S2, word for word |
| 11 | Reduction in the later Trajanic period, abandonment under Hadrian, "by AD 140" | C | S1 (Webster): "a reduction in activity in the later Trajanic period and abandonment under Hadrian"; discussion: "abandonment by AD140". Not in the note: the same paragraph adds "it has been suggested that southwest Wales was bereft of troops by the mid-120s (Davies 2000, 24)" |
| 12 | "AD 90-100" is not in the Tywi Time Line PDF | C | S4 text has no "90" in the Roman section; no geophysics, no vicus |
| 13 | The drawing is not credited anywhere else and no source says which phase it shows | X | llandeilo.org/roman_settlement.html: "Painting by Neil Ludlow of what the second fort may have looked like around 100AD (Drawing: Cambria Archaeology)". The image there is the same 400 by 468 picture |
| 14 | 1993 samian "could have been discarded within c.AD 90-130"; vicus ploughsoil samian c. AD 90-110 | C | S1: "All could have been discarded within the period c.A.D.90-130"; Trench 4/5: "South Gaulish Samian (dated c AD 90-110)" |
| 15 | Vicus activity c. AD 70-135, from samian of 70-90, 70-110, 100-120, 115-135, and one 2nd-century BB1 flanged bowl | C | S1 Trench 4/5 dating summary and "a general date range for this activity from c AD 70 to AD 135". llandeilo.org gives "from 75 AD to 120 AD" (unsourced; the report governs) |

### Gates

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 16 | Fort 1 gateways in its south-east and south-west sides | C | S1: "Gateways can be identified in both of these sides" |
| 17 | Four post-pits up to 1.2m square, 0.7-0.8m deep, timbers up to 0.4m, "probably" a six-post gate tower | C | S1 Trench 1, word for word |
| 18 | The inner ditch's square butt-end is "where the gate causeway was" | P | S1 gives the square butt-end and the gateway; the causeway is the note's inference, a fair one |
| 19 | Fort 1's gate count is not established (two evidenced) | C | S1 names only the south-east and south-west gateways |
| 20 | Fort 2: three of four entrances; no break in the outer defences at the rear, a break in the inner ditch, "Possibly ... a bridge" | C | S1, word for word |
| 21 | Rear gate at the highest point, front gate on a lower knoll | C | S1: "The assumed location of the porta decumana corresponds with the highest point of the fort and a second slightly lower knoll corresponds with the location of the porta praetoria" |

### Defences

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 22 | Timber and earth defences, timber buildings, nothing replaced in stone | C | S1 discussion, word for word. HER 47636 and 47637 repeat it |
| 23 | Fort 1: three ditches south-east, two south-west, a possible third 55m out | C | S1 |
| 24 | "At least three and possibly four ditches" at the **north-east** corner | P | S1: phase 1 "identified the **eastern** corner of the multivallate defences of Fort 1 ... at least three and possibly four ditches" |
| 25 | Inner ditch V-shaped, 1.7m by 1.1m; outer 1.0m by 0.5m with a rounded butt-end, "too slight" unless cut from higher | C | S1 Trench 1 |
| 26 | Turf rampart, inferred from the clay backfill; no bank survives | C | S1: "presumably represents the deliberate backfilling of the ditch with the turf rampart" |
| 27 | A four-post structure, "probably an interval tower", on the north-east inner rampart near the eastern corner | C | S1 |
| 28 | A kiln or large hearth dug into the south-east inner rampart; further responses behind the south-west rampart, not excavated | C | S1 survey results and small-finds ("possible industrial sites dug into the ramparts of Fort 1, but these were not excavated") |
| 29 | Fort 2: at least three ditches south-east; outer two joined at the right gate ("parrot's beak"); the legio II Adiutrix link questioned; wider berm between the second and third | C | S1, word for word |
| 30 | No palisade, stone wall or rampart dimensions evidenced | C | True of S1. Caution: DAT's 2005 dig-diary page, written before excavation, says "A timber palisade would have run along the top of the inner rampart" and "The four entrances into the fort would have been flanked by massive timber gatehouses". That is reconstruction in the conditional and must not be cited as evidence |

### Interiors and building materials

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 31 | Fort 2: via principalis and front of the via praetoria confident, intervallum road in part, a possible via quintana | C | S1 |
| 32 | Principia predicted near the centre; two square post-pits, "possibly" a colonnade fronting it | C | S1. The pits are "At the southern end of the Trench", the principia predicted at its "southeastern end" |
| 33 | A weakly responding area: parade ground, or 18th-century tree-clump disturbance | C | S1 |
| 34 | Trench 2 gullies 4m apart, a road up to 3.5m wide | C | S1 |
| 35 | Eastern-corner buildings of two phases (Fort 1 or outside Fort 2); pit-like lines in the southern corner | C | S1 |
| 36 | Trench 3: at least four phases; Phase 1 "possibly a barrack block associated with Fort 1"; later phases in an annex | C | S1 |
| 37 | An annex using Fort 1's defences | C | S1: "part of the northern and eastern defences of Fort 1 continued to be used as an annex". HER 48198 (Stratascan 2003): "a Roman Fort with an associated annexe ... whether it was part of an earlier fort ... or whether it relates to a fortified victus [sic]" |
| 38 | Wattle and daub, no stone | C | S1 small finds: "primarily derived from the destruction of wattle and daub buildings" |
| 39 | Gap 7: the 2005 tile and brick are "described as mostly post-medieval kiln waste" | NS | Appendix 4 says that of area 6 (Trench 6) only: "area 6 produced little which was not likely to be brick". The fort and vicus contexts 2001 and 4001 produced Roman tile, "generally harder fired ... The result was a harder red fabric" |
| 40 | Cremated bone in three pits in Fort 2, reuse by the vicus after the soldiers left | C | S1 Trench 2 (pits 2003, 2005, 2024) and discussion; "must await further examination of the burnt bone" |
| 41 | Fort 2 "perhaps a cohors quingenaria peditata", an inference from area | C | S1 (spelled "peditiata") |
| 42 | The garrison is known only from size-based guesses | P | Also S2: Fort 1 "would have housed a garrison of more than a thousand, drawn from several different units"; S1: Fort 1 "at the very least an ala quingenaria ... or a cohors milliaria ... and perhaps even a larger legionary detachment", and the barley in its ditch "consistent with" a cavalry or large unit. All are inference, and the note should list them |
| 43 | Oxfordshire mortaria (c. AD 180-300) suggest 3rd-century activity; the excavation "is silent" | C | S1 (Webster) |
| 44 | No direct evidence of the vicus lasting into the later 2nd century | C | S2, word for word |

### The survey and the vicus

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 45 | Stratascan, two stages; a susceptibility pass over about 27ha south of Home Farm; 19.78ha by magnetometry | C | S1 |
| 46 | Commissioned by the National Trust, funded by the HLF and WEFO; "surrended Roman material"; Heather James's 1993 prediction "extraordinarily accurate" | C | S1 and S2, word for word |
| 47 | Three weeks in June and July 2005; Nikki Cook assistant director; *Big Roman Dig* on 2 and 3 July 2005 | C | S1 introduction and acknowledgements |
| 48 | "Suggestive of a small settlement or vicus" north-east of Fort 2 where the roads converge | C | S1, word for word |
| 49 | The road branches about 60m out; the northern branch fades after a further 60m; the southern branch's ditches turn away at right angles about 220m out | C | S1, word for word |
| 50 | Trench 7: "two smaller ditches beside it were post-medieval" | P | S1: only 7007 held post-medieval pottery ("suggests that this is not Roman in date"); 7008 held "the base of a red ware vessel possibly a flagon and a sherd from an amphora (Dr. 20)" |
| 51 | The plot "under-represents complexity" (used to support "shambolic") | P | S1 says the two ditches "perhaps are an indication that the survey is an under-representation", then immediately dates one of them post-medieval. A weak support |
| 52 | A road from Fort 2's south-east gate across Fort 1, with roadside development; hints of a road north-west towards Carmarthen | C | S1. HER 48198: "Roads can be seen to exit southeastwards and northeastwards from the fort both with development on either side" |
| 53 | A linear feature defining two sides of a small enclosure south-east of the vicus; pits east of Fort 1 partly hidden by a service trench | C | S1 |
| 54 | Trench 4/5: ditch 2.7m by 1.1m, recut 1.5m by 0.6m, "perhaps a practice camp"; gullies to 0.2m, an amphora-packed pit, ditch 4009 1.2m by 0.6m, a hearth 1.5m across | C | S1 Trench 4/5 |
| 55 | A second enclosure north-west of the forts | C | S1 Trenches 9 and 10: ditch 3m wide, 1.5m deep, "possibly a practice camp", one hearth inside |
| 56 | Provenance table: "Ditch counts and profiles ... magnetometry plus Trenches 1, 2 and 9/10" | NS | Trenches 9 and 10 cut the north-west enclosure, not a fort. The fort ditch profiles come from Trenches 1 and 2 (and Test Area 6) |
| 57 | The survey the commenter means is "almost certainly" the Hughes report's Fig 2 | P | llandeilo.org shows the 2003 survey plot ("Geophysics map from the Cambria Archaeology newsletter, No 2, Summer 2003") next to the same Ludlow painting dated "around 100AD". That page fits the commenter's description better |
| 58 | No separate vicus-only survey; the Stratascan interpretation figures are not online | C | None found. HER 48198 describes the same Stratascan 2003 survey |

### The bathhouse and other sites

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 59 | A building at least 30m by 18m with an apse north-west of the forts; its brick "more likely to be post-medieval"; one possible box tile, so a bathhouse nearby "cannot be excluded"; Heneb still lists "a possible bathhouse" | C | S1 survey, Trench 6, discussion, Appendix 4 (box tile in context 2001, Trench 2 ploughsoil); S3 |
| 60 | A Roman building "identified as a temple" at St Tyfei's, about 310m south | C | S2, and Coflein 114230 (SN 62192 22216): foundations noted about 1770, "An altar was recorded, but is now lost" with "a cornucopia & augural staff". Not in the note: HER PRN 7367 says "reported finds of tesserae during work in the churchyard have been made in the latter part of the 20th century" and calls it "either a villa or a temple" |
| 61 | Which coin hoard is which is "unresolved" | X | HER PRN 869: "Roman coin hoard and pottery vessel ... found in 1800 300 yards west of Llandyfeisant church ... silver denarii some of Domitian (AD81-96)". PRN 886: "6 Bronze Coin Gallienus, Victorinus, Tetricus, Claudius Gothicus (mid-late 3rd.c.)". The Fenton hoard is 869 |
| 62 | Seven silver denarii (three Republican, one Augustan, three of AD 69-96) found by a detectorist in 2000 | P | That is S1. HER PRN 47648 says **four** denarii: "One is of Augustus ... and the other three are first century AD including one and possibly two of Vespasian", found at SN618225, SN620226, SN621224 and SN623227. Keep both counts, contested |
| 63 | North Heronry Dam, a possible villa, 2008, about 1.3km west | C | S9: "Strong evidence for a substantial Roman building was revealed, but its exact location could not be pinpointed"; SN 60880 22740 is 1.31km west of the Coflein point |

### The Tywi Time Line and the Ludlow drawing

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 64 | Eight A3 pages, created in 2011 | C | pdfinfo: 8 pages, A3, created 20 April 2011 |
| 65 | The Roman section "reads, in full" three sentences (also "two sentences and a caption") | P | There is a fourth sentence: "Roman finds have been discovered throughout the Tywi valley but, with the possible exception of Llys Brychan near Bethlehem, no extensive Roman villas have been unearthed" |
| 66 | The caption "Reconstruction of Llandeilo Roman Fort by Neil Ludlow"; no AD 90-100, no geophysics, no vicus text | C | S4 text |
| 67 | The drawing: towered gates, several ditches as terraces, barracks in ranks, an annex lower left, a fainter earlier rectangle upper left, a vicus along converging roads to the right | C | Viewed. The towers are visible at the gates and corners; at 400 by 468 pixels not every gate can be told apart |
| 68 | Heneb's NLHF-funded digital outputs are CC BY 4.0; whether that covers the PDF is not confirmed | C | S3: "licensed for use by others under the Creative Commons 'Attribution 4.0 International (CC-BY4.0) licence" |

### Comparanda (analogy)

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 69 | Caersws 188m by 177m, 3.2ha, "very early Flavian (c. AD 70)", annex, vicus with streets, timber buildings and a possible temenos, bathhouse to the south | C | S10, word for word |
| 70 | Castell Collen about 182m by 114m, later 128m by 114m, from the 70s, "stone revetted and ditched banks", extramural bathhouse | C | S11 |
| 71 | "Caerau (Treflys, between Llandovery and Castell Collen)", about 170m by 115m, from about 75, a courtyard building in the north-east corner | P | S12 confirms all except "Treflys", which is not in the record (it says the fort is "sited halfway between the forts at Llandovery and Castell Collen"; the CPAT report title on the page says Beulah) |
| 72 | Carmarthen, from about AD 75 to at least 100, "a second phase fort which was reduced in size" | C | S13, word for word |
| 73 | Trawscoed: six barrack blocks, a possible veranda, gate-tower post-holes, a possible mansio; 165m by 125m; a clay-and-turf rampart 4.1m wide | C | S14: "Six blocks of barracks", "could indicate the presence of a veranda", "post holes of timbers supporting guard towers", "could represent a mansio". The size and rampart are from S15 only (Wikipedia, citing Johnston 2002); S14's 160m by 120m is the survey area |
| 74 | At Llanio, "several phases of rectangular wooden buildings arranged with their short axes towards the road", each with a hearth | P | In S14 the sentence follows "Almost identical results were obtained from Cefn Caer, Pennal (Hopewell 2005). Subsequent trial trenching revealed ...". It most likely describes Pennal. Still a Welsh vicus analogy, but name the right fort |
| 75 | "Most of the sites produced evidence for the presence of vici in the form of ribbon development along at least one of the roads" (Gwynedd and Cumbria surveys) | C | S14, word for word |
| 76 | Jay Lane: gate towers on two rows of five posts, 9.5ft square; a six-post corner tower 15ft by 8ft; four-post interval towers 8-10ft; double V ditch 2m by 1m, 1.5m berm; rampart "no more than 10ft (3m)" to the walk, 15½ft with breastwork; "No internal buildings were excavated"; dated AD 47-61 | C | S16, word for word. Worth adding: the corner tower "is assumed to have been a six-post structure" from four posts found, the same inference as at Dinefwr's gate; the 15½ft is 4.7m; Jay Lane's gate post-pits were 2-3ft across, much smaller than Dinefwr's 1.2m |
| 77 | A standard plan; barracks "about 30 to 100m by 7 to 15m" in eight-man contubernia, usually with a veranda | P | S18 now redirects to "Castra". Its barracks paragraph is about legionary fortresses ("Each cohort comprised six barrack blocks", the "elite first cohort", tribunes' houses): "measuring 30-100 x 7-15m, and divided into contubernia (usually 10-13 in number)". "Eight-man" is not in it. As an auxiliary-fort analogy, prefer Trawscoed |
| 78 | Auxiliary establishment strengths (cohors quingenaria 6 x 80 = 480, etc.), "somewhat less" in reality | C | S19 table and text |

### Placement

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 79 | Coflein SN 62187 22534 | C | S2 |
| 80 | "SN620 225" is the Hughes "Fig 1 caption" | P | It is in the introduction's text: "(Fig. 1, SN620 225)" |
| 81 | Cadw SN622224, CM367, via Wikipedia | C | S6. Its footnote's DAT number (27637) is wrong: Archwilio PRN 27637 is "Llwynyfran ... Spoil Heap" |
| 82 | RCAHMW AP_2005_1285: "The excavation trench at SN 6217 2256, with dig tents, viewed from the west", 11 July 2005, Toby Driver, Creative Archive Licence | C | S21 |
| 83 | Coin findspot SN 61948 22295, villa SN 60880 22740, Newton House SN 61432 22531, Dinefwr Castle SN 61150 21731 | C | S7, S9, S20, Coflein 425 |
| 84 | "No source read gives separate grid references for Fort 1, Fort 2, the gates, the vicus" | X | HER PRN 47636 (Fort 1) NGR SN62182245; PRN 47637 (Fort 2) NGR SN62172253; PRN 47638 (road from the front gate) SN62252260 |
| 85 | Scale check: castle to Newton House "261m east and 786m north against 277m and 802m by grid reference" | P | By grid reference the difference is **282m east, 800m north**. My reading of Fig 1 gives 284m and 799m |
| 86 | Fort 1 centre about E 262249, N 222517 | X | My reading: about **E 262206, N 222470** (both anchors agree to 2m). HER 47636: E 262180, N 222450 |
| 87 | Fort 2 centre about E 262231, N 222590 | X | My reading: about **E 262190, N 222538**. HER 47637: E 262170, N 222530. Coflein: E 262187, N 222534 |
| 88 | Fort 2's centre about 18m west and 73m north of Fort 1's | C | Mine: 16m west, 69m north. HER: 10m west, 80m north |
| 89 | Both long axes about 48 to 53 degrees east of north | C | Mine: Fort 1 about 48 degrees, Fort 2 about 50 to 53. HER 47835: the later fort is over "an earlier, larger fort with a slightly different alignment" |
| 90 | The Fig 1 outlines are the "outer edge of the ditches": Fort 1 about 260m by 170m, Fort 2 about 135m by 155-165m | P | Mine: Fort 1 about 250m by 168m, Fort 2 about 150m (north-east to south-west) by 130m. These are only about 10m larger than the internal sizes, so the lines are the inner circuit, not the outer ditches. On Fig 2 Fort 1's three south-east ditches span very roughly 15m (my reading, low confidence) |
| 91 | The vicus about 108m east and 82m north of Fort 2's centre | C | Mine: 109m east, 84m north |
| 92 | "The figures put the forts about 50m east" of Coflein's point; the Coflein, Cadw and 2005-trench references all sit 40 to 60m west of the derived centres | X | Fort 2's centre lies within 5m of Coflein's point. The trench reference (SN 6217 2256) is about 20m west and 20m north of Fort 2's centre, where Trench 2 lies on Fig 2. Cadw's 6-figure SN622224 is a 100m square and cannot discriminate |
| 93 | The placeholders: `roman-fort-a` at Coflein's point, `roman-fort-b` 28m east and 29m south, angle 0.12 (7 degrees) against about 50 | P | The numbers are right (`features.ts:254-269`). But in `romanFort` (`structures.ts:175-178`) a positive angle turns the long axis **west** of north, so the gap is about 55 to 60 degrees. And Coflein's point is Fort 2's centre, so `roman-fort-a` (the larger fort) is sitting on the smaller one |
| 94 | Sight lines down the "Twyi" to Carmarthen and up to Llandovery; the castle hill to the south-west; Penlan Fawr to the south-east | C | S1, word for word |

### Gaps the note lists

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 95 | Archwilio is "not reachable here (dynamic pages)" | X | Record pages answer at `archwilio.org.uk/arch/query/page.php?watprn=DAT<PRN>&dbname=dat&tbname=core` (rate limited after about a dozen calls) |
| 96 | llandeilo.org returned 404 | P | `roman_settlement.php` is a 404; `roman_settlement.html` is live, with "3.9 hectares", "about AD 74", the geophysics plot and the Ludlow painting |
| 97 | The *Britannia* 2005 entry was not found | C | Not found by this check either |
| 98 | Hughes, *Carmarthenshire Antiquary* 39 (2003) 144-7 and 41 (2005) 168-74 | C | Listed by S2. S1's own reference list has only the 2005 paper; HER cites the 2003 work as "A Roman Fort at Dinefwr Park, ACA unpublished report" |

## Corrections for the note

Each is find (quoted from the note) and replace. Sources new to the note get new keys.

1. **Exact placement, derived geometry table and "What this means for the build".**
   - Find: "Fort 1 centre | about **E 262249, N 222517**" and "Fort 2 centre | about **E 262231, N
     222590**". Replace with Fort 1 about E 262206, N 222470 and Fort 2 about E 262190, N 222538
     (re-measured 2026-10-09 against the same anchors), and add the HER points as documented rows:
     Fort 1 PRN 47636 SN 6218 2245, Fort 2 PRN 47637 SN 6217 2253, road PRN 47638 SN 6225 2260.
   - Find: "the figures put the forts **about 50m east** of SN 62187 22534" (Summary) and "Fig 1
     against Coflein's point | the figures put the forts **about 50m east**". Replace: Fig 1 puts Fort
     2's centre within about 5m of Coflein's point; the HER, Coflein, the 2005 trench photograph and
     Fig 1 agree to within about 30m.
   - Find: "The Coflein point, the Cadw reference and the 2005 trench reference all sit **40 to 60m
     west** of my derived centres ... **Do not place from my derived numbers alone.**" Replace with:
     place from the HER and Coflein references, take shape and orientation from Fig 1 and Fig 2, then
     register on the LiDAR.
   - Find: "No source read gives separate grid references for Fort 1, Fort 2". Replace: the HER
     gives one for each fort and for the north-east road; none for the gates, vicus or bathhouse.
   - Find: "261m east and 786m north against 277m and 802m". Replace: "284m east and 799m north
     against 282m and 800m".
   - Find: "outer edge of the ditches" (twice). Replace: the line drawn is close to the inner
     circuit, only about 10m outside the internal sizes; the ditch bands lie outside it. Fort 2's
     outline reads about 150m by 130m.
   - Find: "angle 0.12) disagree with this ... (about 0.12 radians is 7 degrees; the figure reads
     about 50 degrees)". Add: in `romanFort` a positive angle turns the axis west of north, so the
     gap is about 55 to 60 degrees, and `roman-fort-a` (the larger fort) sits on Fort 2's centre.
2. **Fort 2's date** (Summary, provenance table "Fort 2 start date", contradictions table). Add the HER
   reading "possibly around 82 AD" (PRN 47637; "c.82AD" in PRN 47636), labelled as a 2013 HER summary
   that Hughes 2007 does not itself state. Keep "date not fixed" as the app's position.
3. **AD 90-100 and the drawing** (Summary, "The Neil Ludlow drawing", Gaps 1 and 10). Find: "I could
   not find the drawing credited anywhere else, nor any note of which phase it shows" and "the file
   says nothing of the sort". Add: llandeilo.org captions it "what the second fort may have looked
   like around 100AD (Drawing: Cambria Archaeology)". The commenter's date is very likely this
   caption, a date for the scene and not a foundation date. Credit: "Neil Ludlow, for Cambria
   Archaeology".
4. **The survey the commenter means.** Find: "almost certainly the Stratascan magnetometer survey, as
   published in the Hughes report's Fig 2". Replace: most likely the 2003 plot from Cambria's Summer
   2003 newsletter as shown on llandeilo.org beside the drawing, an earlier and partial view of the
   same Stratascan survey that Fig 2 shows in full.
5. **Coin hoards.** Find: "Which is which is **unresolved**." Replace: the Domitian denarii hoard is
   HER PRN 869 (late 1st century, "300 yards west of Llandyfeisant church"); PRN 886 is six bronze
   coins of the mid to late 3rd century. Coflein's "later Roman" heading for 419158 is the error.
6. **The 2000 denarii.** Find: "Seven silver denarii (three Republican, one Augustan, three of AD
   69-96)". Add: HER PRN 47648 records four (one Augustus, three 1st century including one or two of
   Vespasian) with four findspot references; the counts disagree and both stay.
7. **Tile.** Gap 7, find: "The 2005 tile and brick (appendix 4) are described as mostly
   post-medieval kiln waste". Replace: Trench 6's brick is probably post-medieval kiln waste; the fort
   and vicus contexts (2001, 4001) produced harder-fired Roman tile of a distinct fabric, type not
   identified, plus a possible box tile. Roof material is still unknown, but tile was present.
8. **Ditch-profile sources.** Provenance table, find: "magnetometry plus Trenches 1, 2 and 9/10".
   Replace: "magnetometry plus Trenches 1 and 2 (and Test Area 6)".
9. **Trench 7.** Find: "two smaller ditches beside it were post-medieval". Replace: one of the two
   held post-medieval pottery; the other held a possible flagon base and a Dressel 20 sherd.
10. **Llanio.** Find: "at Llanio, ribbon development along a road, with 'several phases of rectangular
    wooden buildings arranged with their short axes towards the road', each with a hearth". Replace
    "at Llanio" with "at Cefn Caer, Pennal (as S14 reports it, beside the Llanio survey)".
11. **Fort 1 ditches.** Table row "Ditches, north-east corner": change to "eastern corner".
12. **Garrison.** Provenance table "Garrison unit | unknown | size-based guesses only": add Coflein's
    "more than a thousand, drawn from several different units" and Hughes's "at the very least an ala
    quingenaria ... or a cohors milliaria" for Fort 1, all inference.
13. **Tywi Time Line.** Find: "Its Roman section reads, in full:" and "its Roman text is two sentences
    and a caption". Add the Llys Brychan sentence.
14. **Abandonment.** Add Hughes's "southwest Wales was bereft of troops by the mid-120s (Davies 2000,
    24)" beside "by AD 140", since it bears on how late Fort 2 is drawn.
15. **Comparanda.** Caerau: drop "Treflys". Trawscoed: mark 165m by 125m and the 4.1m rampart as
    S15 (Wikipedia, citing Johnston 2002), not S14. S18: say the page now redirects to "Castra" and
    that its barrack sizes are for legionary fortresses; drop "eight-man".
16. **Gaps 2 and 6.** Archwilio is reachable (URL above), and llandeilo.org's page is at
    `roman_settlement.html`. The community PRNs 47636 and 47637 are correct.
17. **St Tyfei's.** Add HER 7367's late-20th-century tesserae reports and Coflein 114230's lost altar.
18. **Sources.** Add: Heneb HER PRNs 47636, 47637, 47638, 47648, 869, 886, 7367, 47835, 48198;
    llandeilo.org, "Llandeilo's Roman Fort"; Dyfed Archaeological Trust, "Llandeilo Fort Dig Diary"
    (2005, Wayback copy), marked as pre-excavation reconstruction. Then run
    `node tools/research/extract-sources.mjs`.

## Found along the way

- **The placeholder forts in the app are wrong on three counts, beyond the angle.** `roman-fort-b`
  runs from AD 83 to 125, but the documented bracket ends "by AD 140" (with troops gone from the
  south-west perhaps by the mid-120s), so 125 is defensible only as the earlier reading and should
  say so. The placeholder roofs are `TILE` and the central building `LIMEWASH`: neither is evidenced
  at Dinefwr. And `landmarkScale` 2.6 draws the forts 2.6 times life size, so a 240m fort covers
  about 620m; a "detailed reconstruction on the LiDAR" needs a decision on true scale.
- **The DAT 2005 dig diary is a trap for the builder.** It describes Fort 2 with a palisade, four
  "massive timber gatehouses", "about 150m long by 100m wide" and "a grid pattern of roads ...
  barracks, granaries", all in the conditional and all written before excavation. Wikipedia cites
  it. The 2007 report supersedes it.
- **The community page overstates one find.** It shows "A complete funeral urn, dated to the early
  second century AD"; S1 says the complete Malvernian vessel "did not contain any substantial
  quantities of cremated bone", and the small-finds report that its fill "was found to be devoid of
  finds".
- **Coflein 402271 cites NPRN 266170 as the fort complex.** 266170 is the park and gardens record.
- **Hughes's Trench 4 objective** mentions "the road approaching the northeast entrance to Fort 1";
  everywhere else that road leads to Fort 2. A slip, worth knowing if the sentence is quoted.
- **A possible stone roof tile.** The small-finds report says, garbled, "The miscelaneous stone from
  Trench 2 has been used for roofing tiles, but this cannot be inferred from the recovered fragment."
  A lead for Gap 7, not evidence.
- **Llys Brychan near Bethlehem**, named in the Tywi Time Line as the one possible extensive villa in
  the valley, is inside the ten-mile circle and is not in any research note found by this check.
- **The 1993 note "Field 'E', SE Annex"** in Webster's fieldwalking list uses "Annex" as a field or
  area label, which may help locate the annex if the fieldwalking archive is found.

## Not confirmed

- The Cadw CM367 scheduling record and boundary, the Stratascan 2003 and Heard 2005 reports, the
  *Britannia* 2005 entry and the 2006 Cambria newsletter were not found online.
- HER PRNs 972, 94533-94535 and the 2005 excavation event record (PRN 54934) were not read
  (rate-limited).
- My Fig 1 positions rest on picking the castle and Newton House points on the figure by eye; the
  two agree to 2m with each other and with the scale bar, and land within about 30m of the HER
  points, but the HER's own centre convention is not stated.
