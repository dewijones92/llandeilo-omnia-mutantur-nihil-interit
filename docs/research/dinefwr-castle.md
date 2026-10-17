---
title: Dinefwr Castle (Castell Dinefwr), phase by phase, for a Blender model
kind: research
status: draft
updated: 2026-10-16
---

# Dinefwr Castle, phase by phase, for a Blender model

Research for the next Blender landmark. Dewi chose Dinefwr Castle as the model after the Roman forts
(decision log, 2026-10-10); the pipeline is [ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md)
and [ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md), and the forts' typed plan with a tier on
every part ([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)) is
the model to follow. Written by Claude on 2026-10-10 from sources fetched that day; the brief is in
[`briefs/dinefwr-castle.md`](briefs/dinefwr-castle.md). The choices in "Plan for the Blender model" are Claude's, under
the proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), and none is
Dewi's. Checked on the same day against a second source per claim, by the same agent
([check 1](reviews/dinefwr-castle-check-1.md)); that check is not independent in the sense the todo path asks for. A
second-Opus review of 2026-10-10 found five important problems and several smaller ones, each verified against the sources or the code and fixed here (listed at the end of
check 1). The independent check of every documented claim by a second Opus followed on 2026-10-10
([check 2](reviews/dinefwr-castle-check-2.md)): six important findings and a list of suggestions, each verified against
the source (fetched again) and fixed here, with the verdicts recorded in that file. A third independent read followed
on 2026-10-16 ([check 3](reviews/dinefwr-castle-check-3.md)): five important findings and a set of suggestions, each
verified against the source or re-measured, and fixed here. A fourth followed the same day
([check 4](reviews/dinefwr-castle-check-4.md)): it found that check 3's fix to the inner gate was itself wrong (both Cadw
plans draw the gate about 1.4m (1.2-1.5m) wide, so the 3.0m "departure" is withdrawn), re-measured from the pixels, with fixes
to the tier columns and a set of smaller points.

It extends the Dinefwr sections of [`era-medieval-to-1282.md`](era-medieval-to-1282.md) (history to 1287) and
[`building-models.md`](building-models.md) (the first measured outline, 2026-10-02), and does not repeat their political
history except where it bears on what was built.

**How it was done.** Coflein, the Cadw listing, the Heneb HER and the Gatehouse gazetteer were read directly. The Cadw
guidebook (Rees and Caple) was **not** obtained; its text reaches this note through Coflein (which summarises the 2007
edition [S1]), castlewales.com (which reproduces the 1999 edition's history at length [S8]) and medievalheritage.eu
(which draws on it and reproduces its plans [S9][S10][S11]). Two articles were read from page images on Welsh Journals
(National Library of Wales), OCR'd here and checked against the images: Moore 1994 on the seventeenth-century paintings
[S16], and Renn 1961 on the round keeps [S17]. The Brut was read in the 1860 Rolls Series translation [S18]. The
plans were **measured** against a fresh survey: the Welsh Government LiDAR surface model of 2020-22 (1m, OGL) was
downloaded for this tile [S24] and the Cadw plan fitted to it. WebSearch was used 7 times.

Everything is labelled with the app's three tiers. **Documented**: a source says it, or the survey measures it.
**Reconstructed**: inferred, and the note says from what. **Imagined**: invented to fill a gap. **Many "documented"
claims trace to one source, the Cadw guidebook, by two or three routes**; those are marked "Cadw guide", and any two of S1, S8 and S9
agreeing is one source, not two. The independent strands are the survey [S24], the chronicle
[S18], the paintings and engraving [S16][S22][S23], Renn [S17] and the HER [S3]; the listing [S2] is a separate Cadw document, but whether it is independent of the
guide is **not known** (see the tier rule below).

**The tier rule applied to the parts** (check 2, finding 6). The repo's law asks two independent sources for a
documented claim, and the schema allows `documented` on one reputable source. This note applies both: a part that rests
on the Cadw guide's text and plans alone (S1, S8, S9, S10 and S11 are one source in five forms) is marked **documented
(one source: Cadw)**, which keeps the schema's tier but says in the label that the cross-check is not met, so the ⓘ must
say "one source" and these parts are the first to re-check when the guidebook or the HER's grey literature (Crane 2002
on the south turret, Murphy and Ramsey 2001 on the south curtain) is read. A part is **reconstructed** where nothing
stands and Cadw itself hedges ("perhaps", "may have been") or draws a dashed "assumed" line. A part is plain
**documented** only where a second, independent strand supports it: the LiDAR where fabric stands [S24], the HER or
Renn where they do not copy Cadw, or the paintings (the listing's independence is not known; see the next paragraph).

**The listing [S2] and the guide.** The cached Cadw report gives only a designation date (8 July 1966); its description is
undated, so whether it predates or draws on the 1999 guide is **not known**, and its "a gatehouse ... on S" reading may
share an upstream source with the guide (a lead, unverified). It is cited as unspecific support and lifts no
one-source label.

## Summary

- **Placement.** Coflein gives SN 61150 21731 [S1]; the Cadw listing E 261149 N 221730 [S2]; the HER SN 61149 21730
  [S3]. The keep's centre, fitted on the LiDAR surface model, is at **E 261168.5 N 221724.0** (to about half a metre),
  so Coflein's point lies inside the inner ward, about 20m west-north-west of the keep (19.8m: the keep is 18.5m east and
  7.0m south of it) [S24]. The app's point was (261155, 221729), 5m from Coflein's; since 2026-10-16 it is Coflein's own, E 261150 N 221731 (Dewi's decision, decision log).
- **The Cadw plan fits the ground.** The period plan after Rees and Caple [S10], fitted to five points on the LiDAR
  (keep, north-west tower, west angle, south-west turret, south-east angle), fits to within 1.1m at every point with a
  rotation of 1.8 degrees, but at **8.58 pixels a metre, not the 8.15 its scale bar gives**: the plan as reproduced is
  drawn about 5% larger than its bar says, so lengths read off the bar are about 5% too big (the 30m bar runs 244
  pixels, 8.13-8.15 px/m, its 20m tick agreeing; the 100ft bar reads 8.20 px/m, so the two bars agree with each other).
  Whether the fault is in Cadw's drawing, its bar, or this reproduction (possibly a photographed page) is **not known**.
  Sizes below use the ground's scale and say so [S10][S24]. The **1280 panel** of the phase plans [S11] (image 1300 x
  1013 pixels) was fitted the same way (the keep and north-west tower centres from the survey, three corners from the
  S10 fit): residuals 0.4-1.0m, **6.52 pixels a metre against the 20m bar's 6.63** (2%, inside the error of reading
  points off a picture) and a rotation of 4.2 degrees; a second, two-point fit on the hole centres of the keep (pixel
  1071.4, 269.7) and the north-west tower (916.7, 59.0) gives 6.48 px/m and 5.7 degrees (check 3). **That fit is the
  1280 panel's alone.** S11's panels are drawn at different scales: the keep-to-north-west-tower distance (survey
  40.36m) is 274 pixels on the 1250-70 panel (6.78 px/m), 261 on the 1280 (6.48), 296 on the 1330 (7.33) and 292 on the
  1750 (7.24), against one shared 20m bar of about 130-133 pixels (6.5-6.65 px/m). So the 1250-70 and 1280 panels are
  within about 4% of the bar, while the 1330 and 1750 panels are 10-12% over it and about 13% larger than the 1280 one
  (the keep's hole is likewise about 53-54 pixels wide on those two panels and 46-50 on the others, which points to
  scale, not to a moved tower). **Every panel needs its own fit to the survey before anything is measured off it**; only
  the 1280 panel
  has been fitted. Why the plans differ from their bars, and from each other, is **not known** [S11][S24].
- **The keep is about 13.6m across** over its drawn wall (14.5m over a fainter outer line, probably the battered
  base), with walls about 2.9m and an inside about 7.7m [S10][S24]; on the surface model the wall-walk ring reaches 14.6m
  across, which a 1m grid can overstate by up to a metre [S24].
  Coflein says "some 12m across" [S1]; medievalheritage "13.5 meters and walls 2.6 meters thick" [S9]. **Contested;
  the survey favours 13.5-14m.**
- **Heights survive and were measured.** On the surface model the inner ward's floor is 99.7-100.0m OD; the keep's top
  storey stands to 113.6m and the wall-walk ring round it to 110.4m; the keep's floor inside is 100.9m. The north-west
  tower stands to about 111.2m, the curtains to 104.5-107m (rising to 110m by the keep), the chamber block to
  107.8-113.2m. So today's keep is about 13.8m above the ward, the curtains 5-7m above it inside and 7-15m above the
  falling ground outside [S24]. These are **today's** heights, after Cadw's consolidation and the estate's rebuilding
  [S8]; how high anything stood in the Middle Ages is not known.
- **Phases are dated by the Cadw plans.** Five phase plans (1230-50, 1250-70, 1280, 1330, 1750) [S11] and a period plan
  (early/mid 13th century in two phases, late 13th/early 14th, medieval of uncertain date, 17th/18th) [S10] give the
  order: the pentagonal curtain and the keep first; the north-west tower and the south-east gate's gatehouse (`gate-se`), inside the original gate, next;
  under the Crown in the 1280s the chamber block, a new gate in the south curtain with a long walled approach (the
  barbican), the south turret and (reconstructed, one source) an inner gatehouse of two square towers, gone by 1750; about 1326-30 the hall; and in the 17th/18th century the summerhouse on the keep, a grand stair and
  cross walls.
- **Nothing on the plans is Tudor.** The listing ("Late C15 additions by Sir Rhys ap Thomas") [S2] and medievalheritage
  ("At the end of the fifteenth century ... carried out its rebuilding") [S9] date Sir Rhys ap Thomas's works to the end
  of the 15th century. The HER says only "In Tudor times, it was modified by Sir Rhys ap Thomas, but he soon abandoned
  the castle in favour of a new mansion at Newton House" [S3]: "Tudor times" (from 1485), no closer. None gives an end
  date, and 1525 is only his death, from the DWB [S21]; medievalheritage adds that in 1531 his grandson "was executed
  for treason, and the castle was confiscated by the Crown, though later the family could get it back" [S9], which says
  who held it, not that anyone lived there. The Cadw guide says
  "There are no records of work at Dinefwr for the remainder of the Middle Ages" and that the old site was abandoned
  from the 15th century for Newton [S8] (Newton House, now Plas Dinefwr [S2]; the borough is Y Drenewydd, "Newtown or
  Drenewydd" [S1]). The DWB's "extensive alterations to the castle, building the gate-house and
  inserting windows" are at **Carew**, not Dinefwr [S21]. **Contested; a Tudor phase has no part to draw**, so the model
  has the castle to a contested date, about 1450 (c. 1500 on the Tudor reading, within a range of c. 1485-1525 on the
  HER: "Tudor times" from 1485, to Sir Rhys's death in 1525 as the latest he could have worked there, an inference; then
  "soon abandoned"), and then a decay phase to the 1660s (see the plan).
- **The summerhouse on the keep existed, roofed, long before the HER's date.** Two oil paintings of the castle (and a third, of Newton House, with the castle far behind it) show the
  keep with a stepped-in, paler top storey, a ring of narrow windows and a conical roof with a finial and pennant, and
  a square tower with a pyramidal roof [S16][S22]. Moore dates them c. 1660-70 (Harris c. 1670) [S16]; the National
  Trust, which owns them, c. 1710-30 [S22]. The Bucks' engraving of **1740** shows the conical roof [S23][S16]. A room
  in one of the towers was used for parties "till within these few years, when the interior was destroyed by fire"
  (Malkin, 1804, quoted by Moore) [S16]; the Cadw guide: "By the late 18th century, however, both roofs had been
  destroyed by fire" [S8]. The HER's "During the late 18th to early 19th century ... a summerhouse was built on top of
  the keep" [S3] is contradicted by the 1740 engraving. **Its date stays contested in the app (c. 1660 or c. 1700-30
  at the latest, the roofed stage ending by about 1800).**
- **The first record is a variant reading.** The HER: "A castle is first mentioned at Dinefwr in 1151 when it is
  recorded as having been built by two brothers Maredudd and Rhys ap Gruffydd" [S3]. In the Rolls Series Brut the
  entry (under 1150, the edition's year) says the brothers "repaired the castle of Dinweileir", with **Dinevwr** only as
  the reading of manuscripts C and E [S18]; Gatehouse notes that Dinefwr "is not the same as Dinweiler mentioned
  several times in the chronicles" [S7]. So the 1151 record rests on two manuscripts' reading, and it says *repaired*,
  not *built*. **Contested.**
- **By 1213 there were walls and a tower.** The Brut: young Rhys set engines and ladders against the walls and
  took "the castle altogether, save one tower", where the garrison held out until, before the afternoon, it agreed to surrender, unless relieved by the next evening: it "delivered
  three hostages, and gave up the castle, unless they should receive support by the evening of next day", on terms for
  their clothes, arms and the safety of their limbs [S18] (a conditional surrender: it lapsed if relief came by the next
  evening); the Cadw guide reads the same entry as "By the time of the
  siege of 1213, there were certainly walls and a tower strong enough to withstand siege engines" [S8] (Cadw's reading
  of the Brut, not a second source; "strong" is Cadw's gloss, since the Brut says only that the garrison defended itself
  with missiles and agreed before the afternoon to surrender). What they looked like is not known.
- **What the walls are built of is not stated by any source read.** The keep's lower part is "courses of flat stones",
  its top storey "mixed flat and rectangular stones" (Ray Caple's examination for Cadw in the 1990s, via Moore) [S16].
  The bedrock under the castle is the Llandeilo Flags Formation (sandstone, limestone and mudstone) [S25]. That the
  stone came from it is an inference. No source read says whether the walls were rendered or limewashed at Dinefwr;
  Renn says the related Brecon-region keeps on mottes (not Dynevor) were "built of local rubble reasonably coursed and plastered over" (p. 132) [S17],
  an analogy, not a statement about Dinefwr.

## Placement

| Point | Grid reference | Source | Note |
|---|---|---|---|
| Coflein (the site) | SN 61150 21731 = E 261150, N 221731 | [S1] | Use as the feature's `at` (the forts' rule: a documented reference, not a derived point) |
| Cadw listing 11117 | E 261149, N 221730 | [S2] | Within 1.5m of Coflein |
| HER PRN 882 | SN 6114921730 | [S3] | Same point as the listing |
| HER PRN 881 (the possible motte) | SN 61152173 | [S4] | 10m precision |
| Keep centre | E 261168.5, N 221724.0 (half a metre) | [S24] | Fitted as the ring of highest surface heights; inside 100.9m OD |
| North-west tower centre | E 261141.5, N 221754.0 (about a metre) | [S24] | Fitted the same way |
| The castle's ward floor | 99.7-100.0m OD | [S24] | Terrain model median, 660 cells |

**Plan frame for the model** (proposed): metres east (x) and north (y) of Coflein's point, true size, true height,
grid north (the plan drawing's north is 1.8 degrees off grid north once fitted, so the fit, not the drawing's arrow, is
used). All the coordinates in "Plan for the Blender model" are in this frame: the keep's and the north-west tower's
centres straight from the survey, every other point from the period plan [S10] fitted to the survey [S24]. They carry
about **±1m** at the five control points and **±3m** elsewhere (the outer ward and the lower
ward's wall agree with the terrain model's banks to about 5m).

The castle was **outside** the app's LiDAR detail areas when this note was written, so it stood on the region's 10m
LiDAR context grid (ADR 0049), too coarse for ditches 20-30m wide. **Since 2026-10-16 it has its own 2m area**,
`dinefwr-castle` in `tools/terrain/lidar-areas.json` (1km square, centred on Coflein's point, E 261150 N 221731, which
the Cadw listing [S2] and the HER [S3] put within 1.5m); see [`../data/lidar.md`](../data/lidar.md#the-castle-area-2026-10-16)
and ADR 0049's amendment. The ditches and the ridge are in the terrain data at 2m, drawn at 4m near the camera; the ditches nearest the inner ward lie under the model, which is drawn at landmark scale.

## The site

- **The ridge.** The castle is "upon a high wooded ridge above the meandering Tywi" [S1]; "the castle of Dynevor is
  situated on the summit of a lofty hill above the river Towy" (Gerald of Wales, 1188, as Moore translates) [S16];
  Renn: "on a protruding bluff 200 ft.a.s.l." (p. 140, about 61m) [S17]. The ward floor is measured at about 100m OD (about
  330 ft) [S24], so Renn's figure is a rough one or from another datum. **An alternative reading** (an inference, not
  Renn's words: "a.s.l." is above sea level): if he meant the bluff's height above the valley floor, the ward is about
  77m (about 250ft) above the floodplain (about 23m OD, below), nearer his figure than 330ft but still not 200ft. Not
  resolved. The floodplain below the
  south slope is at about 23m OD [S24]. "The high, steep slopes of the hill provided protection, primarily from the
  south" [S9].
- **The ditches.** "Two enclosures defined by deep rock-hewn ditches cutting across the summit of the ridge" [S1]; "a
  rock-cut ditch" on "the three open sides" (Cadw guide) [S8]; "a wide ditch on the eastern side ... reaching about 15
  meters", and a ditch "of a similar width" between the outer and inner wards [S9]. **Measured today** on the terrain
  model [S24]: the ditch between the inner and outer wards bottoms at 92.8-94.2m OD, 22-30m across from lip to lip and
  5-7m deep; the north ditch bottoms at about 89.1m, cut 10-11m below the ward into the falling slope with a
  counterscarp only 1-1.5m high. The difference from "about 15 meters" may be lip-to-lip against base, or infill and
  slumping; not known.
- **The bedrock** is the Llandeilo Flags Formation, "Sandstone, limestone and argillaceous rocks", Ordovician, on the
  BGS 1:50,000 map (sheet 212, Llandovery) [S25].
- **A motte before the stone castle?** "A motte and bailey castle may have been built prior to the construction of the
  stone castle of Dinefwr" (HER PRN 881) [S4]; Gatehouse records it as "a certain Timber Castle" [S7]. The Cadw guide:
  "There is nothing in the surviving archaeological evidence to argue for or against there having been a fortification
  on the site before the time of the Lord Rhys" [S8]. **Contested.** No motte is drawn on any plan read.

## Phase 1: the castle of the first record (1151, or a variant reading)

- **What is recorded.** The HER's 1151 record of Maredudd and Rhys building a castle [S3] is the Brut's 1150/1151 entry,
  where the main text has the brothers repair "the castle of Dinweileir" and manuscripts C and E read "Dinevwr" [S18]
  (see Summary). In 1162, by the Rolls Series' years, "Rhys, son of Gruffudd, took possession of Cantrev Mawr and the
  castle of Dinevwr" [S18]; Gatehouse lists the Brut's Dinefwr entries from 1163 [S7], medievalheritage says Dinefwr was
  "captured by Rhys ap Gruffydd (Lord Rhys) in 1165" [S9]. Three years for one event: **contested** (editions number
  the Brut's years differently; not resolved here).
- **Form.** Not known. The HER: "Whether this refers to a wooden castle on a motte, PRN 881, or a stone castle is still
  not clear" [S3].
- **For the model**: this phase has no evidence for any structure. It can share Phase 2's drawing (ridge and ditches,
  a timber fence, labelled imagined) or be dropped as a separate phase; see the plan.

## Phase 2: the Lord Rhys's "castle in the new style" (after 1171-72 to the 1220s)

- **Documented.** DWB: "At Dinefwr, the ancient capital, a castle in the new style was begun" in the years after Rhys's
  settlement with Henry II [S19] (the medieval note's correction places it after 1171-72, `medieval:S14`). Coflein: "thought
  to have been founded in the later twelfth century by Rhys ap Gruffudd, the Lord Rhys" [S1].
- **Layout (reconstructed, Cadw guide).** "The present defensive layout was probably first adopted at this time. By the
  later 12th century, two enclosures stood side by side along the rock crag, defined on the three open sides by a
  rock-cut ditch. Buildings within the defences may have [been] of timber or stone, but their form remains unknown"
  [S8]. "There may have been an inner ringwork and an outer ward with two gates, and either a wooden or, more probably,
  a masonry defensive wall"; "Perhaps it was Rhys who constructed the first masonry wall at Dinefwr, possibly with a
  now lost stone tower" [S8].
- **1213 (documented: the chronicle).** The Brut: young Rhys "placed engines and inventions for attacking the castle;
  and placed ladders against the walls", and "possess[ed] himself of the castle altogether, save one tower", where the
  garrison defended itself "with missiles and other engines" until, before the afternoon, it agreed to surrender the castle,
  unless relieved by the next evening: it gave three hostages and gave up the castle "unless they should receive support by
  the evening of next day" (a conditional surrender, on terms for their clothes, arms and limbs) [S18]. So the walls were scaled and taken; only one tower held
  out, and not for long. The Cadw
  guide's "certainly walls and a tower strong enough to withstand siege engines" [S8] is its reading of that entry, not a
  second source. Llandeilo was burned the same year [S18].
- **The dismantling.** "Llywelyn forced Rhys Grug to dismantle the castle in the early 13th century" (HER) [S3]; "It may
  have been a section of this primary wall which Rhys Gryg dismantled to placate Prince Llywelyn in 1220" (Cadw guide)
  [S8]; "The castle was then partially demolished ... It is not known what scale the demolition has achieved" [S9].
- **For the model**: the ridge, the ditches on the line of the later ones (reconstructed, Cadw guide), a curtain of
  unknown form on the inner ward's line (reconstructed: "more probably, a masonry defensive wall" [S8]), one tower of
  unknown place and form (documented that there was one by 1213 [S18]; its form imagined), timber buildings (imagined).

## Phase 3: the stone castle (c. 1230 to the 15th century)

### Who built what, and when (contested)

- **The keep and the curtain.** The phase plans make the pentagonal curtain and the keep one phase, "1230-50" [S11];
  the period plan "Early/Mid-Thirteenth Century: Phase 1" [S10]. The Cadw guide: the keep "belongs to a group of
  similar structures, such as those at Bronllys, Skenfrith and Tretower (as well as Dryslwyn), most of which are
  conventionally dated to around the 1230s. At Dinefwr, the keep and adjacent Welsh gate may have been the work of Rhys
  Gryg" [S8]. Renn links Dinefwr's roll-moulded string course with Skenfrith, Bronllys and Tretower (p. 134) and dates the Brecon-region keeps as a group, "from Longtown to Tretower", to "the period 1185-1245", "Bronllys and Builth ... rather later" (p. 137) [S17]; Dynevor is not dated apart from the group, and a 1185 start would admit a keep of the Lord Rhys's time (d. 1197), before Rhys Gryg (an inference). The HER:
  "the stone keep as we see it now may date from a rebuilding after Llywelyn forced Rhys Grug to dismantle the castle"
  [S3]. The listing: "first built by the Welsh princes in C13" [S2]. Moore: "The present belief is that the keep was
  built in the thirteenth century, and the curtain walls later, as in other Welsh native castles" [S16], which differs
  from the phase plans' single phase. Rhys Gryg died in 1233 (Cadw guide [S8], which gives "d.1223" in another paragraph, a slip; medievalheritage [S9]; the Brut,
  "Rhys the Hoarse died at Llandeilo the Great" under the edition's 1233, after the siege of Carmarthen [S18]) or 1234 (DWB:
  mortally wounded at Carmarthen in 1234, died at Llandeilo Fawr [S20]); if the keep is later than that, it is his
  successor's (an inference). **Contested: builder and order.**
- **The north-west tower** is new in the 1250-70 plan [S11]; "In the Welsh period, probably at the beginning of the
  second half of the 13th century" [S9]; "the 'little tower' may refer to the north-west tower which seems to have been
  remodelled at this time" (the 1280s) [S8]. Its courtyard side "was then replaced by a straight wall" [S9].
- **The 1280s, under the Crown** (Cadw guide, via the King's Works): "repairs were carried out on the tower, bridge,
  hall and 'little tower'; a new gate was constructed, and the ditches were cleaned and extended around the town. Also,
  two large and three small buildings were erected in the bailey" [S8]; medievalheritage gives the buildings as "in 1282"
  [S9]. The chamber block on the north-east, projecting beyond the curtain, "might also have been during this phase" [S8];
  the phase plan puts it in 1280 [S11]. The listing has Edward I add "a gatehouse ... on S and a rectanuglar [sic] tower
  on N" [S2], which reads as the same two works (an inference). The new gate: "an extensive remodelling of the entrance
  passage, creating an inner gate and barbican"; "It seems likely that the southern turret was constructed as part of the
  new gate arrangement" [S8]. From 1276 the castle was "largely kept in English hands" [S3].
- **About 1326-30.** The hall alongside the chamber block, "again protruding beyond the curtain wall", a western building,
  the chamber block's windows remodelled, "may all date to the year 1326, when considerable sums were spent on the castle
  during the Hakelut's custody. The insertion of the ground-floor entrance in the keep may also date from this time" [S8];
  the phase plan's 1330 [S11]; medievalheritage "probably already in the first half of the fourteenth century" [S9].
- **Later medieval.** "In 1343 and 1353 ... the great keep was reported to be the verge of collapse"; after the
  Glyndŵr siege (1403) "it may have been this period that the crenellated south wall on the entrance passage was totally
  rebuilt to butt up against the south turret" [S8]. Coflein: "still maintained in the earlier fifteenth century" [S1].

### The parts, as recorded

| Part | What the sources say | Measured here | Tier |
|---|---|---|---|
| Inner ward (curtain) | "an angular curtain wall" [S2]; a pentagon, walls "1.8 meters thick", courtyard "approximately 50 x 28 meters" [S9]; "a high curtain wall" [S1] | Outer corners in the plan frame: north-west tower centre (-8.5, 23.0), west angle (-20.5, 8.8), south-west turret corner (-7.0, -16.9), south angle (24.2, -18.3), south-east end (27.2, -14.7). Drawn wall 1.4-1.6m thick at the ground's scale. Today's wall-tops: west 104.5-106m OD, south 105.3-107m rising to 110m beside the keep, north 106.1m [S10][S24] | Outline documented (plan + survey); thickness contested 1.4-1.8m; medieval height unknown |
| The lost east curtain | Dashed as "assumed walls" from the south-east end to the chamber block on the phase plans [S11]; "the lost northeastern corner of the perimeter wall" [S9] | Not visible on the terrain model; 17th/18th-century cross walls link the keep to the curtain there [S10] | Reconstructed (Cadw's assumed line) |
| Keep (great round tower) | "some 12m across ... now a two storey stump crowned by the remains of the seventeenth century summerhouse" [S1]; "13.5 meters and walls 2.6 meters thick, located on the south-eastern part of the courtyard"; "a widened (buttressed) bottom part, with the width change emphasized by a roll moulding"; entrance at first floor, ground floor reached through the floor above, "three slits on the first floor and small windows in the upper parts, flanked by side seats" [S9]; "a halfround string-course above a deep battered base, through which an entrance has been cut ... it has a modern lintel. The window loops have wide pointed embrasures, and the first floor is carried on a set-back of the walls" [S17]; three symmetrical window openings, one opposite the entrance passage [S17] | Centre (18.5, -7.0) in the plan frame; 13.6m over the drawn wall, 14.5m over the outer line, walls about 2.9m, inside about 7.7m [S10]; floor inside 100.9m OD; wall-walk ring 110.4m, out to about 14.6m across; top storey's wall to 113.6m [S24] | Size documented, contested (12, 13.5 or 13.6-14m); battered base and string course documented (two sources); medieval height unknown (medievalheritage: "not certain what height originally the keep was, maybe only the ground floor and the first and second floors, as in preserved similar constructions", an analogy [S9]) |
| Keep's ground-floor door | Cut through the base, "may be an original feature" [S17]; "only in the fourteenth century the portal on the ground floor was pierced" [S9]; "may also date from" 1326 [S8] | - | Contested (original or 14th century) |
| North-west tower | "a smaller round tower at the northern angle" [S1]; "about 7 meters in diameter", no fireplace or latrine, courtyard side rebuilt straight [S9]; "a circular tower to NW" [S2] | Centre (-8.5, 23.0); 7.9m over the drawn wall (8.4m over its outer line), walls 2.1m, inside 3.7m; top about 111.2m OD (max 113.0); inside surface 103.3m [S10][S24] | Documented; diameter contested 7 against 7.9m |
| Chamber block | A quadrangular block on the north side, "partially extended beyond the perimeter of the wall", "a basement with two upper floors", small Gothic windows, "a passage to the adjacent, four-sided latrine turret", floors on stone corbels, fireplaces, north windows with seats [S9]; "fine towered lodgings along the north-east curtain" [S1]; "equipped with a watch turret" [S8] | North-east face 14.6m, from (9.0, 19.4) to (21.5, 11.9); depth about 8.5m; today 107.8-113.2m OD [S10][S24] | Documented; storey heights unknown |
| South-west latrine bay | "At the south-western perimeter wall a latrine bay was placed with the entrance pierced in the wall thickness", first half of the 13th century [S9] | The plan shows a projection on the west curtain [S10]; not measured | Documented (one source: Cadw guide via S9); size and place from the plan, low |
| Hall | "13 meters long and 6 meters wide", on the upper floor over a store, external stairs, fireplace, latrine on the west [S9]; "a rectangular hall facing N" [S2] | Between the north-west tower and the chamber block on the north curtain, which it overlies [S10] | Documented (**existence one source: Cadw** (S9); the listing's "a rectangular hall facing N" [S2] agrees, its independence not known; the **13 x 6m size is one source: S9, i.e. Cadw's guide**, and not yet measured on the fitted plan, so whether it is an internal size is not known); roof unknown |
| Inner gate | Moved west into the south curtain in the later 13th century; "only the lateral loop holes and the door's bar hole remain" [S9] (a door with a bar, so an opening of door width); the listing has Edward I add "a gatehouse ... on S" [S2] (which gatehouse it does not say) | At (4.4, -17.5) on S10's own fit; **built at (5.1, -17.5)**, centred on the gatehouse gap (check 5). **Width about 1.4m (1.2-1.5m)**, read off both Cadw plans in check 4: S10 has no towers here and draws a plain break in the red curtain fill, which stops at pixel x 397 and resumes at 411 on the row y 730 (13 pixels between the fills, 10 fully white), 1.2-1.5m at the ground's 8.58 px/m; S11's 1280 panel draws 8-9 clear pixels between the two towers' outlines on every row from y 306 to 318 (8, 8, 9, 9, 8), 1.2-1.4m at that panel's 6.48 px/m, and up to about 1.9m if the outlines are centred on the wall faces rather than inside them. So **both plans draw a gate of about 1.4m (1.2-1.5m)** | **Existence and the 1280s date: one source (Cadw: S9, S10, S11)**; the listing's "gatehouse ... on S" [S2] is unspecific support and does not lift the label. **Place: the fit's**: x from S11's 1280 panel fitted to the LiDAR (±2m), the gap's centre; y on the curtain line (S10's fit puts the gate at -17.5, the curtain path gives -17.44 at x 5.1). **Form and width: Cadw's drawings**; no text states the width, and S9's surviving loop holes and bar hole may give the real one (Gaps) |
| Inner gatehouse (1280 to before 1750) | "perhaps a gatehouse was placed" on the inner side of the rebuilt south curtain; "a lost gatehouse from the late 13th century" under the grand stair [S9]; "creating an inner gate and barbican from the original gatehouse" "may have been" the 1280s work [S8]; drawn on the 1280 and 1330 plans, absent in 1750 [S11] | As drawn on the 1280 panel and fitted to the ground (that panel's own fit, S11 being at a different scale per panel; see the Summary): two hollow square towers, each about 4.9-5.1m outside (32-33 pixels edge to edge at 6.48 px/m) with a clear hole of 12-13 pixels (about 2.0m clear, up to about 2.6m measured across the hole's own outline strokes, the same inside-or-centred outline question as the gap), so the towers' size is good to about ±0.5m. **The pair is built from its gap (check 5):** the gap's centre read through the two-point refit of the 1280 panel falls at about (5.1, -15.3); towers 4.9m outside either side of a 1.4m gap put the centres at **(1.95, -15.3) and (8.25, -15.3)**, 6.3m apart, which is the panel's own outer-box spacing (41 pixels) where the hole-centre spacing is 39.8 pixels (6.1m: centre spacing minus width gives the gap only when both are read the same way). The refit's tower centres were (2.0, -15.3) and (8.1, -15.3) (rotation 5.7 degrees; chosen because its control pixels are recorded and it can be redone, where the first fit's three corner pixels were not recorded and its (1.7, -15.4), (7.8, -15.5) and 4.2 degrees cannot be; the two differ by 0.3m, inside the ±2m the placement is good to). The gap between the towers is **8-9 clear pixels, about 1.2-1.4m** (re-measured in check 4; the "about 1.0m" of check 3 was a sum of centre spacing and tower width, not the pixels), and S10, which draws no towers, shows the break in the curtain at the same width (inner gate row): **both Cadw plans draw a gate of about 1.4m (1.2-1.5m), and the model follows them**. Check 3's "departure" (towers 3.0m apart for a 3m passage) rested on reading S10 as "a hairline" and on a 3m estimate with no source, and is withdrawn [S11][S10][S24] | Reconstructed (one source: Cadw; S9 hedges it with "perhaps"). **Cadw's: the towers' existence, their form (two hollow squares flanking the gate) and the gap between them**, from S11's 1280 panel. **Cadw's drawing at the panel's fitted scale: form, gap and spacing; the fit's: only the place**, S11's 1280 panel fitted to the LiDAR (±2m); the survey fixes nothing of the towers, which are lost. The listing's "a gatehouse ... on S" [S2] supports a 1280s southern gatehouse without saying which or of what form; S9 says the inner gate's lateral loop holes and the door's bar hole remain, which are not measured here and give no size for the towers, so there is nothing of the towers to measure |
| South turret | Four-sided, "protruding in front of the perimeter", a small room with a latrine above the ground floor [S9]; built with the new gate "seems likely" [S8] | About 4 x 4m at the south-west angle [S10] | Documented (stands: the survey fits it as a control point [S24] and the HER names a 2002 report on it [S3]; the 1280s date and the form are one source: Cadw; size measured, low) |
| Barbican (foregate) | "a lower walled barbican" [S1]; an "elongated gate neck (passage) along the southern curtain", ending at an entrance before the ditch, "probably closed by a portcullis and a door", wall-walks on both sides [S9] | Outer wall from (-5.3, -19.2) to (11.6, -24.3) and (31.3, -31.3); Middle Gate at (22.2, -28.3), drawn about 6 x 3m [S10] | Line documented (one source: Cadw; S8 hedges the 1280s date with "may have been", and S10 shades the line "Medieval (Uncertain Date)" while S11 draws it new in 1280; the listing's 1280s "gatehouse ... on S" [S2] does not say whether it is this, the Middle Gate or the inner gatehouse); portcullis reconstructed |
| Original gate | "an ordinary portal in the wall, located on the south-east side, in close proximity to the keep"; "Around 1250-1270, it was reinforced with a gatehouse, atypically placed entirely on the inside" [S9] | Gap in the south-east curtain on the 1230-50 and 1250-70 plans [S11] | Documented (one source: Cadw) |
| Outer ward (upper) | "a slightly higher northern part and a lower southern part, in the eastern part of which the gatehouse was placed" [S9]; "To the east of the upper castle there was an outer ward wall, fortified with a wall and a dry moat (ditch)", but today the outer bailey is "covered with forest and without any significant visible stonework fragments" [S9] | Inside about 36 x 31m, from (38.6, -13.0) to (74.7, -11.8) and (57.9, 4.0) to (58.9, -27.5); a north wall piece (48.0, 3.7) to (68.5, 0.2); platform about 98.5m OD, about 1.3m below the inner ward [S10][S24] | Line documented (the plan, and the terrain model's banks agree to about 5m [S24]: the banks show where the enclosure ran, not that a stone wall stood); **the stone wall itself one source: Cadw** (S9 says there was one and S10 draws it, while S9 says no significant stonework is visible today); its height is unknown |
| Outer ward (lower) and outer gate | Lower outer ward with its walls; the outer gate on its east side [S10]; "Outer Gate" [S10] | Walls (39.3, -33.9), (57.9, -52.0), (76.7, -56.1), (77.2, -33.9); outer gate at (78.8, -31.3) [S10]; the terrain model shows the south-east corner at about (80, -55) [S24] | Line documented (the plan, and the terrain model's banks agree to about 5m [S24]: banks, not a wall); **the stone wall and the outer gate one source: Cadw** (S10 draws them; no stonework is said to be visible); S10 shades both "Medieval (Uncertain Date)", so which phase they belong to is an estimate |
| Bailey buildings | "two large and three small buildings were erected in the bailey" in the 1280s [S8][S9] | - | Number documented (one source by two routes); form imagined |
| The town | "The upper town, thought to have been sited on the castle ridge, was first recorded in 1281" [S1]; "Old Town (site of?)" north and east of the castle [S10] | - | Place reconstructed |

### Materials, as far as recorded

- **Stone.** Lower keep "Courses of flat stones", top storey "mixed flat and rectangular stones" [S16]. Bedrock
  Llandeilo Flags Formation [S25]. No source read names the building stone or any dressed stone at Dinefwr; the
  Llandeilo Flags are "thinly laminated sandstones" (a lead only: `deeptime:S1` is Wikipedia; BGS says "sandstone, limestone and
  argillaceous rocks" [S25]), which would fit "flat stones" (an inference).
- **Render or limewash.** No source for Dinefwr. Renn's Brecon-region keeps are "plastered over" [S17] (analogy). Cadw's
  reconstruction painting by Chris Jones-Jenkins shows the walls pale grey-white [S13]: the artist's reading, not
  evidence.
- **Roofs (medieval).** No source read records a covering. The reconstructions show the keep with a conical roof inside
  its parapet (Jones-Jenkins [S13]; Paul R. Davis [S15]) and pitched roofs on the ranges, drawn as stone tiles or slates
  in the cutaway [S14]: references, not evidence.
- **Floors and timber.** "Separated by wooden ceilings (set on stone corbels)" in the chamber block [S9]; the cutaway
  draws arch-braced roof trusses over the hall and chamber [S14] (the artist's reading).
- **Mortar.** Not recorded in any source read.

## Phase 4: the late-medieval and Tudor residence (contested)

- **For.** "Late C15 additions by Sir Rhys ap Thomas" [S2]; "At the end of the fifteenth century, the castle was in the
  possession of Sir Rhys ap Thomas, who carried out its rebuilding" [S9]; and the HER, undated: "In Tudor times, it was
  modified by Sir Rhys ap Thomas, but he soon abandoned the castle in favour of a new mansion at Newton House" [S3]. So
  the end of the 15th century is the listing's and medievalheritage's date; the HER says "Tudor times" (from 1485) and
  "soon abandoned"; none of the three gives 1525, which is his death in the DWB [S21]. medievalheritage adds that in
  1531 his grandson Rhys ap Gruffydd "was executed for treason, and the castle was confiscated by the Crown, though
  later the family could get it back" [S9]: the castle was still held then, which says nothing of whether it was lived
  in. The lordship was leased to
  Gruffudd ap Nicolas in 1440 [S21].
- **Against.** "There are no records of work at Dinefwr for the remainder of the Middle Ages, and it appears that from
  the 15th century the old site was abandoned in favour of the more convenient situation of the first Newton house" [S8];
  Coflein: "It was still maintained in the earlier fifteenth century, but may have been replaced by Newton House ... as
  early as the later part of the century" [S1]. The DWB's alterations by Sir Rhys are at Carew [S21]. The Cadw plans
  assign nothing to the 15th or 16th century [S10][S11].
- **For the model**: the castle stays the c. 1326-30 castle (plus the wall rebuilt after the 1403 siege) until a contested
  date in the 15th century, taken here as about 1450 (an estimate: after the post-1403 repairs [S8], inside Coflein's
  "earlier fifteenth century" [S1]), with the ⓘ giving both readings; then a **decay** phase to the 1660s paintings, an
  abandoned castle whose standing heights are imagined and whose end state is documented only by the paintings [S16].
  The Tudor reading (work by Sir Rhys ap Thomas, dated to the end of the 15th century by the listing and
  medievalheritage and to "Tudor times" by the HER, then "soon abandoned" for Newton [S2][S3][S9], which would end the
  castle somewhere in c. 1485-1525, taken as c. 1500: the range is the HER's "Tudor times" to his death in 1525 [S21],
  an inference, since no source dates the abandonment) is given in the ⓘ, not drawn: no part can be placed. This
  replaces the app's "castle to 1600, ruin from 1600" (`dinefwr-castle`, `dinefwr-ruin`): 1600 is
  a round number no source gives, and "still a residence under Sir Rhys ap Thomas" states one side of a contested point as
  fact.

## Phase 5: the ruin with the summerhouse on the keep (17th century to today)

- **The top storey.** "The top storey of the keep at Dynevor was shown stepped inwards in the paintings, and was coloured
  differently from the lower part"; "In each of the three paintings which showed the castle six narrow window apertures
  were visible"; "It was built by continuing the inner face of the keep upwards with a wall only one third of the
  thickness below. That allowed a circular wall-walk to be constructed on the outside, protected by a low, level
  parapet"; today "a total of six large window apertures" [S16]. Measured: the wall-walk ring at 110.4m OD and the top
  storey's wall to 113.6m, about 3.2m higher, the top storey's wall standing between about 3.3m and 5.6m from the keep's
  centre and the walk out to about 7.3m [S24]. A surface model keeps the highest return in each 1m cell, which widens a
  wall-top by up to about half a metre on each side; allowing for that, the top storey's wall is about 1.3-2.3m thick,
  about 7m across inside and 10-11m outside, and the keep's wall at the walk about 3m, the plan's figure. Moore's "one
  third of the thickness" (about 1m) is at the thin end of that range: near enough to agree. The top storey "is
  generally agreed to be post-medieval (Apted 1980, 22)", though Moore also argues it could be a medieval *étage en retrait*, in which case the keep never stood much
  higher [S16]; "Dynevor might well have lost two medieval storeys" is his other reading [S16]. **Contested.**
- **Its roof.** Conical, "flying a pennant" [S16]; the paintings show a grey roof with a ball finial and pennant [S22];
  the 1740 engraving a conical roof with a cross [S23]. Its covering is not known (grey in the paintings).
- **The square tower.** "a smaller rectangular tower adjacent" to the keep, "roofed", with a pyramidal roof (Moore's
  catalogue of painting 1) and a chimney, "the rectangular tower overlooking the entrance to the castle" [S16]; "The southern turret was also equipped with a roof and a tiled floor" (Cadw guide)
  [S8]. Whether the painted tower is the south turret is not said by either source. From the view's geometry (tentative: the
  painter's viewpoint is not known) the square tower stands directly to the right of the keep in the south-west painting,
  which from a south-west viewpoint is the keep's south-east side, where the Middle Gate (22.2, -28.3) and the curtain's
  south-east end lie; the south turret (-7, -17) and the inner gatehouse's towers lie to the keep's left. So the Middle Gate is a
  candidate alongside the south turret, and Moore's "overlooking the entrance" would fit either; an observation, not a
  finding.
- **Use.** "the castle became the focus for summer visits and picnics. The earthworks surrounding the castle were altered
  somewhat to allow easier access from the Newton House" [S8]; Moore suggests a banqueting house or hunting lodge [S16].
  The 1750 phase plan adds a grand stair and cross walls between the keep and the curtains, and a new lining inside the
  keep [S11][S10].
- **The rest in ruin.** In the paintings the north-west tower "was split from the top" and the hall and chamber "were in
  advanced decay" [S16].
- **The fire.** Malkin (1804): "A room in one of the towers was used for occasional parties till within these few years,
  when the interior was destroyed by fire"; Hughes (1823) likewise [S16]; "By the late 18th century, however, both roofs
  had been destroyed by fire and the castle was largely abandoned to nature" [S8]; "after the fire of the eighteenth
  century Dinefwr was eventually abandoned" [S9].
- **Dates of the summerhouse (contested).** Coflein: "By the later seventeenth century ... the top of the great tower was
  taken down and replaced by a summerhouse" [S1]; Cadw guide: "late 17th century" [S8]; Moore's paintings c. 1660-70
  [S16] (commissioned, he suggests, by Sir Edward Rice, d. 1663 or 1664); the National Trust's date for the same two
  paintings c. 1710-30 [S22]; Thomas Dineley's sketch of 1684 shows no conical roof (Moore: "this must be an omission")
  [S16]; the listing "C17(?)/C18 gazebo" [S2]; the HER "late 18th to early 19th century" [S3]; Wikipedia "1660" (citation
  needed) [S29]. The 1740 engraving fixes a roofed top storey by then [S23].
- **After the fire.** "During periodic repairs by the Dynevor Estate through to the 20th century, large areas of walling
  were rebuilt or refaced" [S8]; the HER: "the castle was deliberately converted in to a romantic ruin" in the late 18th
  to early 19th century [S3]; in 1961 Renn hoped "that the ivy will be stripped from Dynevor" [S17]. The Dyfed Wildlife
  Trust bought Castle Woods, "including the old castle ruins", in 1979 [S16]; "The castle ruins have now been consolidated
  for public view" [S1]; "the restored wall-walk" (castlewales, 2002 photographs) [S8]. In 2000 "a c 12m length of the
  south curtain wall was bulging and leaning to the south", and Cadw dismantled it to bedrock and rebuilt it [S5]; a new
  stair was put in the north-west tower in 2002 [S6]. **Ownership is stated two ways and not resolved**: Cadw's visitor page says "The castle, which is owned by the National
  Trust" [S26], while Moore (1994) says the Dyfed Wildlife Trust bought Castle Woods "including the old castle ruins" in
  1979 [S16]; a later transfer would reconcile them, but no source read says so. Cadw looks after the site and lists it
  among its sites [S26] ("Cadw, who maintain the site", Wikipedia [S29]); the HER lists a proposed Cadw guardianship
  boundary of 1988 [S3].

## Images and drawings

Reference copies are in [`refs/dinefwr-castle/`](refs/dinefwr-castle/) (`docs/` is not served by the app). Only
public-domain and open material is copied; the Cadw plans and drawings are **not** (Crown copyright, not part of the
GitHub issues for which Dewi waived licence checks) and are linked instead.

| Item | What it shows | Credit and licence | Copied |
|---|---|---|---|
| Period plan [S10] | The castle in five date bands, with labels; 30m and 100ft bars | After Sian Rees and Chris Caple, Cadw guidebook (2007), reproduced by medievalheritage.eu. Cadw, Crown copyright | No: measured, linked |
| Phase plans [S11] | 1230-50, 1250-70, 1280, 1330, 1750; 20m and 60ft bars | As above | No |
| Plan after Kenyon [S12] | 14th-century plan | After John Kenyon (2010), medievalheritage.eu; its scale bar disagrees with every text (`models:S24`) | No |
| Reconstruction from the west, 14th century [S13] | The whole castle with the keep's conical roof, town on the ridge behind | Chris Jones-Jenkins for Cadw, via medievalheritage.eu | No |
| Cutaway of the north range, 14th century [S14] | Hall, chamber block, roofs and floors | Chris Jones-Jenkins for Cadw, via medievalheritage.eu | No |
| Reconstruction from the south-east [S15] | Line drawing: the keep with a conical roof inside its battlements, the curtain, buildings, the outer ward | Paul R. Davis, via medievalheritage.eu (which of his books is not stated) | No |
| `painting-from-the-north-nt-869194.jpg` | The keep's roofed top storey with a pennant, the ruined ranges | British (Welsh) School, oil on canvas, National Trust 869194, dated c. 1710-30 by the NT, c. 1660-70 by Moore [S22][S16]. Public domain (Wikimedia Commons) | Yes |
| `painting-from-the-south-west-nt-869191.jpg` | The castle from across the Tywi, conical roof, square tower with a pyramidal roof | National Trust 869191, as above [S22] | Yes |
| `buck-1740-south-view.jpg` | "The South View of Denefawr-Castle", conical roof with a cross on the keep | Samuel and Nathaniel Buck, 1740, National Library of Wales, via Wikimedia Commons; public domain [S23] | Yes |
| `samuel-1868-plan.jpg` | "Plan of Dynevor Castle", numbered, no scale, its key not read | W. Samuel, *Llandilo, present and past* (Carmarthen, 1868), p. 25; British Library, Flickr Commons, no known copyright restrictions [S28] | Yes |
| `lidar-dsm-with-fitted-plan.png` | The surface model of the castle with the fitted plan's points over it | Made here from Welsh Government LiDAR (tile SN6121, OGL v3) [S24] and the plan's coordinates [S10] | Yes |

## Contested points (kept contested)

1. **The 1151 first record**: "built" (HER) against "repaired the castle of Dinweileir", with Dinevwr only in two
   manuscripts (Brut, 1860) [S3][S18][S7].
2. **When Rhys took Dinefwr**: 1162 (Brut, Rolls Series years), 1163 (Gatehouse's Brut list), 1165 (medievalheritage)
   [S18][S7][S9].
3. **A motte before the stone castle**: possible (HER 881; Gatehouse "certain Timber Castle") against "nothing ... to
   argue for or against" (Cadw guide) [S4][S7][S8].
4. **Who built the keep and the curtain, and in what order**: one phase, 1230-50 (Cadw plans), the keep "possibly" Rhys
   Gryg's (Cadw guide), a rebuild after the 1220 dismantling (HER), the keep first and the curtain later (Moore), and
   Renn's "1185-1245" for the Brecon-region group the keep belongs to by its string course, which does not exclude a
   Lord Rhys date (an inference) [S11][S8][S3][S16][S17]; Rhys Gryg's death 1233 or 1234 [S8][S20].
5. **The keep's diameter**: 12m [S1], 13.5m [S9], 13.6m over the drawn wall at the ground's scale and about 14m over the
   surface model's top [S10][S24].
6. **The north-west tower's diameter**: about 7m [S9] against 7.9m measured [S10][S24].
7. **The curtain's thickness**: 1.8m [S9] against 1.4-1.6m as drawn at the ground's scale [S10][S24].
8. **The ditches' width**: about 15m [S9] against 22-30m lip to lip today [S24].
9. **The keep's ground-floor door**: an original feature (possible, Renn) or 14th-century [S17][S9][S8].
10. **A Tudor phase**: Sir Rhys ap Thomas's additions, at the end of the 15th century (listing, medievalheritage) or in
    "Tudor times" (HER) [S2][S3][S9], against no record of work and abandonment from the
    15th century [S8][S1].
11. **The summerhouse's date**: c. 1660-70 (paintings, Moore), later 17th century (Coflein, Cadw guide), c. 1710-30
    (National Trust's date for the paintings), C17(?)/C18 (listing), late 18th to early 19th century (HER, against the
    1740 engraving) [S16][S1][S8][S22][S2][S3][S23].
12. **Whether the top storey is post-medieval or a medieval stepped storey**, and so whether the keep was once taller
    [S16].
13. **When the castle fell to English control**: largely English from 1276 (HER [S3]), against "eventually fell into
    English control in 1287" (Cadw [S26]); already open in [`open-questions.md`](open-questions.md).
14. **The chamber block's turret**: a latrine turret (medievalheritage [S9]) or a watch turret (the Cadw guide's 1999
    text [S8]).
15. **The 1280s inner gatehouse and the new gate**: "perhaps a gatehouse was placed" [S9] and Cadw's drawn pair of towers
    [S11], with a gap of 8-9 clear pixels (about 1.2-1.4m) on the 1280 panel, while S10 draws the inner gate as a plain
    break in the curtain of about 1.2-1.5m: both plans draw a gate of about 1.4m (1.2-1.5m), and the model follows them
    (`dinefwr/gate-inner`, `dinefwr/gatehouse-inner`; check 3's 3.0m "departure" is withdrawn); the new gate "may have been" a remodelling of the original gatehouse
    [S8] against the gate moved west into a
    rebuilt south curtain [S9].
16. **What happened in 1316**: "recorded to have been burnt" (Wikipedia, citing a Cadw page that does not say it [S29][S26])
    against "attacked ... but avoided significant damages" [S9].
17. **Who owns the castle today**: the National Trust [S26] or the Wildlife Trust that bought Castle Woods in 1979 [S16].

## Gaps

- **The Cadw guidebook** (Rees and Caple, 1999, revised 2007) was not obtained. Most of the phasing reaches this note
  through it at second hand.
- **Not read**: Kenyon 2010 (pp. 69-71); Davis 2000, 2007, 2021; *The Buildings of Wales: Carmarthenshire and
  Ceredigion* (Lloyd, Orbach and Scourfield, 2006); Colvin and others, *The History of the King's Works* (1963), pp. 641-4,
  which should hold the repair accounts (and so perhaps what roofs were covered with); RCAHMW's 1917 Carmarthenshire
  inventory (no. 317; HathiTrust and Google Books did not give text); Fisher 1925 and Jones Pierce 1948-9 in
  *Archaeologia Cambrensis*; Rees 1986; Lewis 1910-11, "Dynevor" documents; Apted (the estate guide); the Cadw scheduled
  monument record CM029 (the Cadw report service wants a numeric id that was not found).
- **Grey literature named by the HER and not read**: Murphy and Ramsey 2001 (south curtain, report 2001-29), Crane 2002
  (south turret, report 2002-18), Wilson and Crane 2003 (north-west tower), DAT 1997 elevation of the Great Hall's north
  and west faces, Manning 1997, Murphy 1995 [S3][S5][S6]. These are the nearest things to measured elevations.
- **Heights in the Middle Ages**: of the keep (two storeys lost on Moore's reading, or none on medievalheritage's "maybe only the ground floor and the first and second floors" [S9]), the curtains, the towers, the chamber block and
  the hall; floor levels; window sizes and positions.
- **Materials**: the building stone, any dressed stone, mortar, render or limewash, and every roof covering (medieval and
  17th-century).
- **The battered base and string course's heights** on the keep; the batter's angle.
- **Phases 1 and 2**: any form at all.
- **The 1280s bailey buildings**: form and place.
- **The upper town's** site and extent; whether "Old Town (site of?)" is the 1281 town.
- **The east curtain**, drawn only as "assumed".
- **The inner gate's real width.** Both Cadw plans draw about 1.4m (1.2-1.5m), but S9 says the gate's lateral loop holes and
  the door's bar hole survive, so photographs of them, or the LiDAR, may give the real width; neither has been looked at.
- **The 1230-50, 1250-70, 1330 and 1750 panels of S11** have not been fitted to the survey; each is at its own scale
  (Summary).
- **Who owns the castle today**: the National Trust (Cadw's page) or the Wildlife Trust that bought Castle Woods in 1979
  (Moore); and whether the castle's land was ever transferred.
- **What happened to Dinefwr in 1316** (Llywelyn Bren's rising): Wikipedia says it is "recorded to have been burnt",
  citing Cadw's page, which says nothing of it [S29][S26]; medievalheritage says it "was attacked ... but avoided
  significant damages" [S9]; see [`open-questions.md`](open-questions.md).
- **Which square tower** the paintings roof.
- **The 1868 plan's key** (the British Library's text file link no longer answers).

## For the owner's decision

- **Scale.** The castle is a `landscape` plan today, drawn 2.6 times larger. Its outline, the keep and today's heights
  are now measured, as the forts' were when they became `true` ([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)).
  Claude's recommendation, under the proactive mandate: `true` size and height, so the model is the measurement; the
  cost is a smaller castle in the overview.
- **Render.** Whether the walls are drawn as bare coursed stone (as today, and as the only stone the sources describe) or
  rendered (Renn's analogy, and Cadw's painted reconstruction). Claude's recommendation: bare stone, with the ⓘ saying
  render is possible and not attested.
- **Phase 1.** Draw 1151-c. 1172 as its own phase (ridge, ditches and an imagined fence) or fold it into the Lord Rhys's
  phase. Claude's recommendation: fold it in, with both dates in the ⓘ, since neither has a known form. If folded, the masonry
  parts (`dinefwr/curtain-inner`, `dinefwr/tower-1213`) must **start at c. 1171-72, not 1151**: their basis (the Cadw
  guide's "perhaps it was Rhys who constructed the first masonry wall" [S8], the DWB's "castle in the new style" [S19])
  is about the Lord Rhys's castle, so 1151 to c. 1171 shows only the ridge, the ditches and an imagined fence.

## Plan for the Blender model

Proposed by Claude under the proactive mandate (ADR 0027). It follows the forts: one feature per phase, every part with
an id, a name, its own provenance and its kits; ground parts (ditches, the rock face, the ward floor) stay procedural on
the terrain (ADR 0053, point 5). Coordinates are metres east and north of Coflein's point (E 261150, N 221731), true
size. **Every number not marked "measured" or quoted is an estimate and is marked so.** "Ward" means the inner ward's
floor, 99.8m OD [S24].

An id names one physical part for good, so the same id appears in every phase that has that part (the keep is
`dinefwr/keep` throughout); if the tests want ids unique across features, the phase goes in front, as the forts' `fort1/`
and `fort2/` do.

**Phases and dates (proposed):**

| Feature id (proposed) | Years | Basis |
|---|---|---|
| `dinefwr-rhys` | 1151 to c. 1230 | First record 1151 (contested); the new-style castle after 1171-72 [S19]; walls and a tower by 1213 [S18]; dismantling 1220 [S8]. Ends when the keep's phase begins |
| `dinefwr-welsh-stone` | c. 1230 to c. 1280 | Keep and curtain 1230-50, north-west tower and the south-east gate's gatehouse (`gate-se`) 1250-70 [S11]. Could be split at 1250 |
| `dinefwr-crown` | c. 1280 to c. 1326 | The 1280s works [S8][S11] |
| `dinefwr-castle` | c. 1326 to c. 1450 (c. 1500 on the Tudor reading, within c. 1485-1525) | Hall and later works [S8][S11]; the south wall rebuilt after the 1403 siege [S8]; still maintained in the earlier 15th century [S1]. **The end is contested and the date an estimate**: the Cadw guide has the site abandoned "from the 15th century" [S8]; Coflein has Newton replacing it "as early as the later part of the century" [S1]; the listing and medievalheritage date Sir Rhys ap Thomas's works to the end of the 15th century and the HER to "Tudor times", adding that he "soon abandoned" it [S2][S3][S9], which would end the phase in c. 1485-1525 (the HER's "Tudor times" to his death in 1525 [S21], an inference), c. 1500 as the estimate; no source gives an end date, and the 1531 confiscation [S9] says who held the castle, not who lived in it. The Tudor phase adds no part |
| `dinefwr-decay` | c. 1450 (c. 1500, within c. 1485-1525, on the Tudor reading) to c. 1660 | The abandoned castle, unroofed and shedding stone, ending as the paintings show it [S16]. Its start is the castle phase's contested end, c. 1450 to c. 1500 (range to 1525); its end is the paintings' date, c. 1660-70 [S16] or c. 1710-30 [S22], and the summerhouse phase begins at the earlier. Without it the timeline would show no castle for 1600-1660 (the app today covers those years with `dinefwr-ruin`) |
| `dinefwr-summerhouse` | c. 1660 to c. 1795 | Roofed top storey and turret, paintings to the fire [S16][S22][S23][S8]; both ends contested |
| `dinefwr-ruin` | c. 1795 to now | Roofless; today's heights [S24] |

The dates join with no gap: 1151, c. 1230, c. 1280, c. 1326, c. 1450 (or c. 1500), c. 1660, c. 1795, now. Every
boundary is contested or
approximate, and the ⓘ says so.

**Phase `dinefwr-rhys` (form unknown throughout).**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/ditch-inner` | ditch | On the line of today's east ditch, base at about x 34-37 from y 14 to -16 (measured), continued to about y -25 (estimate); width and depth today's (22-30m, 5-7m) | reconstructed (Cadw guide: the layout "probably first adopted at this time") | S8, S24 | none | earth, rock (procedural) |
| `dinefwr/ditch-north` | ditch | Along the north side: base at about (-10, 34) and (5, 33), about 89m OD (measured); its ends follow the plan's hachures (estimate) | reconstructed | S8, S24 | none | as above |
| `dinefwr/curtain-inner` | wall, closed | The later pentagon's line (see `dinefwr-welsh-stone`); height **unknown** (estimate 5m), thickness **unknown** (estimate 1.5m) | reconstructed ("more probably, a masonry defensive wall") | S8 | `coursed-rubble` (new) | flaggy rubble (analogy) |
| `dinefwr/fence-outer` | wall | The outer ward's line; height **unknown** (estimate 3m) | imagined (wooden or masonry not known) | S8 | `post-and-board-breastwork` (existing) | timber |
| `dinefwr/tower-1213` | tower | Place and form **unknown**; one tower held out in 1213 until the garrison surrendered on terms. Estimate: square, 7m, 10m high, at the keep's place | documented that it existed; form imagined | S18, S8 | none | flaggy rubble (analogy) |
| `dinefwr/hall-timber` | hall | **Unknown** (estimate 14 x 7m, 5m to the eaves) | imagined | S8 | `thatch-roof` or `shingle-roof` (existing, analogy) | timber, thatch or shingle |

**The existing kits are Roman.** Every one of today's ten kits in `src/content/kits.ts` rests on Roman-period evidence
or analogy, none medieval: seven cite the Llandeilo fort survey (`fort:S1`: the two post towers, the turf courses, the
ledged leaf, the timber frame, the shingle roof and the thatch roof) and three cite only Jay Lane, a Roman fort in
Herefordshire (`fort:S16`: the tower boarding, the post-and-board breastwork and the plank deck); the turf courses and
the thatch roof also cite Trawscoed and Llanio: the turf courses Wikipedia's Trawscoed page, a lead (`fort:S15`), and the
thatch roof the geophysical survey round both forts, which is the vicus evidence (`fort:S14`). Earlier versions
of this paragraph and check 2 said all ten cite `fort:S1`, with Jay Lane and the vicus as analogies; that was wrong
(corrected in [check 3](reviews/dinefwr-castle-check-3.md)), though the conclusion stands. The timber frame, the
shingle and thatch roofs and the ledged leaf are Fort 1's evidence or guesses; the breastwork is Jay Lane's. Reused
unchanged on a 12th- or 13th-century castle (`fence-outer`,
`hall-timber`, `buildings`, and the `ledged-leaf`, `timber-frame` and roof kits named in the later phases), each would show
**Roman evidence under a medieval label**. Each reuse therefore needs either a new kit with its own medieval basis, or
an analogy text in the kit's provenance saying the numbers are a Roman guess borrowed for want of a medieval one; the
Lord Rhys's castle has no form at all to draw them from.

**Phase `dinefwr-welsh-stone`.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/curtain` | wall, path NW tower (-8.5, 23.0), W angle (-20.5, 8.8), SW angle (-7.0, -16.9), S angle (24.2, -18.3), SE end (27.2, -14.7) | Thickness 1.8m (text) or 1.4-1.6m (measured), **contested**; height **unknown** (today 5-7m above the ward inside; estimate 7m) | outline documented (measured); height imagined | S10, S11, S24, S9 | `coursed-rubble` (new kit); wall `top: 'battlements'` (existing plan value; merlon and crenel sizes unknown, analogy; crenellated in the paintings [S16]); a wall-walk has no plan value yet | flaggy rubble |
| `dinefwr/curtain-east` | wall, SE end (27.2, -14.7) to chamber block E corner (21.5, 11.9) | As the curtain | reconstructed (Cadw's "assumed walls") | S11 | as above | as above |
| `dinefwr/curtain-north` | wall, (-4.6, 27.4) to (9.0, 19.4) and on to (21.5, 11.9) | As the curtain | documented (line; one source: Cadw for its date, and the surveyed north wall-top at 106.1m shows a wall stands there [S24]); height imagined | S10, S11 | as above | as above |
| `dinefwr/keep` | tower, round, at (18.5, -7.0) | 13.6m over the wall (measured; 12 or 13.5m in texts, **contested**), walls 2.9m, inside 7.7m; floor 100.9m OD; medieval height **unknown** (today about 9.5m from the inside floor to the wall-walk; estimate a further 0-6m, **contested**: medievalheritage's three floors, near today's height, by analogy [S9]; Moore's two lost storeys [S16]) | documented (place, plan); height imagined | S1, S9, S10, S17, S24, S16 | tower `batter: true` and `top: 'cone'` (existing plan values; the cone reconstructed from the reconstructions); `string-course` (new kit: the roll moulding, documented); `loop-window` (new kit: three slits, documented) | flaggy rubble; roof covering (unknown: analogy) |
| `dinefwr/gate-se` | gap in the curtain by the keep, then a gatehouse inside it (1250-70) | Gap about 3m (estimate); gatehouse **unknown** in size (estimate 6 x 5m, 7m high) | documented (place; one source: Cadw); form reconstructed | S9, S11 | `ledged-leaf` (existing, analogy) | flaggy rubble, timber |
| `dinefwr/tower-nw` | tower, round, at (-8.5, 23.0) | 7.9m (measured) or about 7m (text), walls 2.1m, inside 3.7m; today's top about 11.4m above the ward; medieval height **unknown** (estimate 11m). From 1250 | documented | S1, S9, S10, S11, S24 | `coursed-rubble`; tower `top: 'battlements'` (existing) | flaggy rubble |
| `dinefwr/latrine-sw` | latrine bay projecting from the west curtain | **Unknown** (estimate 3 x 2m); first half of the 13th century | documented (existence; one source: Cadw guide via S9) | S9, S10 | `coursed-rubble` | flaggy rubble |
| `dinefwr/outer-ward-wall` | wall, the upper outer ward's line, inside the box x 38.6 to 74.7, y 4.0 to -27.5 (the box's corners, not points on the wall; the vertices are to be read off S10 at build, the north piece (48.0, 3.7) to (68.5, 0.2) being measured) | Height and thickness **unknown** (estimate 4m, 1.5m); no significant stonework is visible today [S9] | documented (line: the plan and the terrain model's banks agree to about 5m [S24], which shows the line of the enclosure and not that a wall stood; **the stone wall itself one source: Cadw** (S9, S10), S9 saying no significant stonework is visible today; phase an estimate, S10 shading it "Medieval (Uncertain Date)"); height imagined | S10, S9 | `coursed-rubble` | flaggy rubble |
| `dinefwr/buildings` | halls in the ward | **Unknown**; Cadw's plans mark two possible buildings with "?" | imagined | S11, S9 | `shingle-roof` or `thatch-roof` (analogy) | timber, roof |

**Phase `dinefwr-crown`** (as `dinefwr-welsh-stone`, plus these; `gate-se` closes).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/chamber-block` | hall (or prism), north-east face (9.0, 19.4) to (21.5, 11.9), projecting outside the curtain | 14.6 x about 8.5m (measured); basement and two floors; height **unknown** (today to 8-13m above the ward; estimate 12m) | documented | S9, S8, S1, S10, S24 | `coursed-rubble`, `loop-window`; hall `roof: 'gable'` or `'parapet'` (existing plan values; unknown: analogy) | flaggy rubble, roof |
| `dinefwr/latrine-turret` | tower, square, on the chamber block | **Unknown** in size (estimate 3m) | documented (existence; one source: Cadw, which calls it a latrine turret [S9] or a watch turret [S8]: function **contested**) | S9, S8 | `coursed-rubble` | flaggy rubble |
| `dinefwr/gate-inner` | gate in the south curtain at **(5.1, -17.5)**, centred on the `gatehouse-inner` gap (S10 fitted on its own puts it at x 4.4; the 0.7m between the two fits is inside their errors, so the build uses one rule: the door is the gap) | Passage **about 1.4m (1.2-1.5m)** (both Cadw plans: the break in S10's curtain and the gap between S11's towers; no text states it); the door **is** the gap between the two towers | documented (**existence, form and the 1280s date: one source, Cadw** [S9][S10][S11]; **place: the fit's**: x from S11's 1280 panel fitted to the LiDAR (±2m), the gap's centre; y on the curtain line (S10's fit, -17.5; the curtain path gives -17.44 at x 5.1); **the 1.4m width: read off Cadw's two plans here**, not stated by any text; the listing's "gatehouse ... on S" [S2] is unspecific and does not lift it) | S9, S10, S11, S2 | `ledged-leaf` (analogy) | timber |
| `dinefwr/gatehouse-inner` | two hollow square towers flanking the inner gate, inside the south curtain; from 1280 (S11's first plan with them) to before 1750 | Each about 4.9-5.1m outside (32-33 pixels on the 1280 panel; clear hole about 2.0m; size good to about ±0.5m), towers **4.9m** outside, centres **(1.95, -15.3) and (8.25, -15.3)**, 6.3m apart (the panel's outer-box spacing), so the gap between them is **1.4m**, centred at x 5.1 where the two-point refit of the 1280 panel to the LiDAR (±2m) puts it, and the door `gate-inner` fills it; the refit's own tower centres, (2.0, -15.3) and (8.1, -15.3), differ by under 0.2m: **no departure from the plan**; the towers' south faces (y -17.75) bond about 1.1m into the curtain's thickness rather than standing clear of it, and the pair's axis runs 2 degrees off the curtain's (0.2m over the pair, inside the ±2m); height **unknown** (estimate 9m, as the south turret); lost at an unknown date between 1330 and 1750, so it ends at the start of `dinefwr-summerhouse` (c. 1660, an estimate) and always before `dinefwr/stair-grand`, which stands on its site [S9] | reconstructed (one source: Cadw; S9 hedges it with "perhaps"). **Cadw's: existence, form (two hollow squares flanking the gate) and the gap between them**, from S11's 1280 panel; **Cadw's drawing at the panel's fitted scale: their form, gap and spacing**; **the fit's: only their place**, that panel fitted to the LiDAR at about ±2m, the towers themselves being lost; the listing's "a gatehouse ... on S" [S2] is unspecific; only the inner gate's loop holes and bar hole are said to remain [S9], unmeasured | S11, S9, S8, S10, S2 | `coursed-rubble`; tower `top: 'battlements'` (existing; unknown: analogy); `loop-window` (S9: "the lateral loop holes ... remain"; one source) | flaggy rubble |
| `dinefwr/turret-s` | tower, square, at the south-west angle, about (-7, -17) | About 4 x 4m (measured, low); height **unknown** (estimate 9m) | documented (stands, fitted as a survey control point [S24]; the 1280s date and form one source: Cadw) | S9, S8, S10 | `coursed-rubble`; tower `top: 'battlements'` (existing; unknown: analogy) | flaggy rubble |
| `dinefwr/barbican` | wall, (-5.3, -19.2), (11.6, -24.3), (31.3, -31.3), with wall-walks | Height **unknown** (estimate 4m); thickness about 1.2m (estimate) | documented (line; one source: Cadw, with the 1280s date hedged by S8; the listing's "gatehouse ... on S" [S2] does not say whether it is this) | S1, S9, S10, S2 | `coursed-rubble`; wall `top: 'battlements'` (existing; the barbican wall is called crenellated only for its post-1403 rebuilding [S8], so crenellation in the 1280s is an **inference**); wall-walks have no plan value yet | flaggy rubble |
| `dinefwr/gate-middle` | small gatehouse at (22.2, -28.3) | About 6 x 3m (measured, low); height **unknown** | documented (place; one source: Cadw); portcullis reconstructed | S9, S10 | `portcullis` (new, reconstructed), `ledged-leaf` | flaggy rubble, timber |
| `dinefwr/outer-ward-lower` | wall, (39.3, -33.9), (57.9, -52.0), (76.7, -56.1), (77.2, -33.9) | Height **unknown** (estimate 3m) | documented (line: the plan, and the terrain model's banks to about 5m [S24], banks and not a wall; **the stone wall one source: Cadw** (S10); phase an estimate) | S10, S24 | `coursed-rubble` | flaggy rubble |
| `dinefwr/gate-outer` | gate at (78.8, -31.3) | **Unknown** | documented (place; one source: Cadw) | S10, S9 | `ledged-leaf` | timber |
| `dinefwr/bailey-buildings` | 5 halls in the outer ward, 2 large and 3 small | Number documented; size and place **unknown** (estimate 14 x 7m and 8 x 5m) | imagined (form) | S8, S9 | `timber-frame`, `thatch-roof` or `shingle-roof` (existing, analogy) | timber, daub, roof |

**Phase `dinefwr-castle`** (as `dinefwr-crown`, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/hall` | hall on the north curtain between the north-west tower and the chamber block | 13 x 6m (text; single source), first floor over a store; height **unknown** (estimate 9m); roof **unknown** | documented (**existence one source: Cadw** (S9), the listing [S2] agreeing, its independence not known; the 13 x 6m size is **one source: S9, Cadw's guide**) | S9, S2, S10 | `coursed-rubble`; hall `roof: 'gable'` (existing); `stone-stair` (new kit: external stair, "probably") | flaggy rubble, roof covering (analogy) |
| `dinefwr/west-building` | hall along the west curtain | **Unknown** in size (the plans' "?" building) | documented that it existed (one source: Cadw [S8]); form imagined | S8, S11 | as above | as above |
| `dinefwr/keep-door` | opening in the keep's base | **Unknown** size | documented, date contested | S17, S9, S8 | none | - |
| `dinefwr/barbican-wall-rebuilt` | the barbican's first stretch from the south turret, about (-5.3, -19.2) towards (11.6, -24.3) (extent estimated), replacing that part of `dinefwr/barbican` | "the crenellated south wall on the entrance passage was totally rebuilt to butt up against the south turret"; height **unknown** (estimate 4m) | reconstructed ("it may have been this period" [S8]); dated after 1403, so it joins in this phase, not the 1280s | S8 | `coursed-rubble`; wall `top: 'battlements'` (existing) | flaggy rubble |

**Phase `dinefwr-decay`** (every part of `dinefwr-castle` that stood, unroofed and weathering; nothing is added).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/keep` | tower, round | Stands: "in sound condition" in the 1660s paintings, though in 1343 and 1353 "reported to be the verge of collapse" (sic) [S8]; unroofed here until the summerhouse | documented (that it stands, S16); roof state and the loss of any storeys imagined | S16, S8 | as `dinefwr-castle` | flaggy rubble |
| `dinefwr/tower-nw` | tower, round | Split from the top by the 1660s paintings [S16]; how and when it split, and its height before, **unknown** | the end state documented (S16); the stages imagined | S16 | `coursed-rubble` | flaggy rubble |
| `dinefwr/hall`, `dinefwr/chamber-block` | hall, prism | "In advanced decay" by the 1660s [S16]; standing heights **unknown** (estimate: walls to the first floor, floors and roofs gone) | the end state documented (S16); the stages imagined | S16 | as `dinefwr-castle` | flaggy rubble, ivy (optional) |
| `dinefwr/curtain`, `dinefwr/barbican`, `dinefwr/gatehouse-inner` and the rest | walls | The paintings show "a curving curtain wall with crenellated rampart" on the south-west side [S16]; every other height **unknown** | documented for that wall (S16); the rest imagined | S16 | as `dinefwr-castle` | flaggy rubble |

**Phase `dinefwr-summerhouse`** (the `dinefwr-decay` castle, plus these; `dinefwr/gatehouse-inner` has closed, ending
where this phase begins).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/keep` (ruin) | tower, round, stump | 13.6m; to the wall-walk at 110.4m OD (about 9.5m above its floor) (measured) | documented | S1, S24, S16 | tower `batter: true` (existing), `string-course` (new kit); the walk's "low, level parapet" has no plan value yet (a wall or prism ring with `top: 'plain'` could carry it) | flaggy rubble |
| `dinefwr/keep-top` | tower, round, on the inner face of the keep | Inside about 7m, outside 10-11m, wall 1.3-2.3m (measured, allowing for the surface model's widening; Moore's "one third of the thickness", about 1m); top at 113.6m OD, about 3.2m above the walk (measured); six windows (today) or twelve narrow ones (paintings), **contested** | documented | S16, S24, S22 | `window-ring` (new kit, documented); tower `top: 'cone'` (existing) with a `finial` (new kit: ball and pennant in the paintings, a cross in the engraving, documented) | pale render or limewash (reconstructed: "coloured differently" [S16], pale in the paintings [S22]); roof covering **unknown** (grey) |
| `dinefwr/turret-s` (roofed) | as Phase 3, roofed | Roof and tiled floor: "The southern turret was also equipped with a roof and a tiled floor" [S8]. Form: a pyramidal roof and a chimney, from the painted "rectangular tower overlooking the entrance to the castle" ("adjacent" to the keep, "roofed" and "in sound condition") [S16][S22] | roofed and tiled floor **documented** (Cadw guide, one source); the pyramidal form **reconstructed** (the painted tower taken to be the south turret, an inference neither source makes, or tentatively the Middle Gate, from the view's geometry (see Phase 5); Moore puts the painted tower "overlooking the entrance"); chimney documented in the paintings only | S8, S16, S22 | `top: 'pyramid'` (existing plan value) | roof covering unknown |
| `dinefwr/stair-grand` | stair in the ward, partly on the site of the lost inner gatehouse [S9] (`dinefwr/gatehouse-inner` ends before it) | About 3 x 13m (measured from the plan, low), at about (5-8, -5 to -18) | documented (one source: Cadw) | S10, S11 | `stone-stair` | stone |
| `dinefwr/cross-walls` | walls linking the keep to the curtains | As on the 1750 plan | documented (one source: Cadw) | S10, S11 | `coursed-rubble` | flaggy rubble |
| `dinefwr/tower-nw` (ruin) | tower, split from the top | Standing height **unknown** in the 17th century | documented (split) | S16 | `coursed-rubble` | flaggy rubble |
| ranges in decay | ruin of hall and chamber block | **Unknown** standing heights | documented (decay) | S16 | ruin support (pipeline) | flaggy rubble, ivy (optional) |

**Phase `dinefwr-ruin`.** Every wall at today's measured height: curtains 104.5-107m OD (110m by the keep), north-west
tower about 111.2m, chamber block 107.8-113.2m, keep walk 110.4m and top storey 113.6m, roofless [S24]; the outer ward's
walls not drawn standing: S9 says the outer bailey has no "significant visible stonework fragments", so the outer wards show as
banks and ditches on the terrain model [S24], and whether any short length of wall stands is not known. Before about 1961 the keep was ivy-covered [S17]; the south curtain's 12m rebuilt in 2000
[S5].

**What the Blender build will need.**

1. **Per-part plans.** Dinefwr's plans in `src/content/buildings.ts` carry one provenance per feature; each part needs an
   id, a name and its own provenance, as the forts' do, and the plan's outline has to move to the measured one (the
   current `DINEFWR_INNER_CORNERS` is the 2026-09-28 guess).
2. **Ruins in the build sheet.** ADR 0053 lists ruins as not built ("it refuses them"); three of the seven phases show ruin
   (`dinefwr-decay`, `dinefwr-summerhouse` and `dinefwr-ruin`), the last with a measured height for every wall. The same
   line refuses **prisms**, and this castle uses them: the chamber block (a hall or a prism) and the prism ring a low
   parapet could be drawn with, so the build sheet needs prism support as well as ruin support.
3. **New kits, and what the plan model already carries.** The plan model has the shapes: a tower's `top` is `'plain'`,
   `'battlements'`, `'machicolated'`, `'cone'` or `'pyramid'`, a wall's and a prism's `top` is `'plain'` or `'battlements'`,
   a hall's `roof` is `'none'`, `'gable'`, `'hip'`, `'parapet'` or `'battlements'`, a tower has `batter`, and
   `proportions.ts` already sizes cone and pyramid roofs (`src/domain/plan.ts`, `src/domain/proportions.ts`). Those carry
   the keep's conical roof, the turret's pyramid, the crenellated curtains and the hall's gable, so none of them is a
   kit. A kit (ADR 0053, point 2) is detail that claims something, with its own measurements and provenance; today's
   ten are all timber, turf and thatch. The ones this castle needs: `coursed-rubble` (courses of flat stones, documented
   on the keep [S16]; course height unknown, to measure from photographs), `string-course` (the keep's roll moulding,
   documented [S9][S17]; heights unknown), `loop-window` (documented [S9][S17]), `window-ring` (the top storey's
   windows, documented [S16]), `finial` (documented in the paintings and
   the engraving [S22][S23]), `stone-stair` and `portcullis` (reconstructed). The ten kits already in the catalogue
   are all Roman (see "The existing kits are Roman" above), so reusing them here needs new kits or analogy text. There is **no `merlon-and-crenel` kit**:
   `top: 'battlements'` already carries the crenellations, and no merlon or crenel size is recorded for a kit to claim; if
   the build wants one it must come with a measurement, from the keep's photographs or the HER's elevations. **Not covered by the plan model**: a
   wall-walk and a low parapet ring (the keep's walk, the curtains'), which need either a plan value or a part of their
   own, and openings on towers (only halls have them); this is for the build to decide.
4. **Textures**: flaggy coursed rubble (the local Llandeilo Flags: reconstructed), a pale render or limewash for the
   summerhouse storey (reconstructed), a roof covering for each roofed phase (unknown: labelled analogy), timber, and
   the existing thatch and shingle for the imagined buildings. Each texture an asset in the manifest (ADR 0052's
   amendment).
5. **Ground**: a LiDAR detail area for the castle, so the ditches and the ridge come from the survey.
6. **The `at`** moves to Coflein's point; the 5m difference is inside the model's error, but the rule is the forts'.
7. **A content test for the one-source label.** `Provenance` `documented` has an optional `note` that the ⓘ shows
   (`basisOf`, `src/ui/provenance.ts`). A content test should require a "one source: Cadw" note on every part this note
   labels so (S1, S8, S9, S10 and S11 are one source in five forms), so the ⓘ never presents them as a cross-check.
8. **The `gatehouse-inner` provenance note states where its numbers come from.** The note on the part says that the
   towers' form, gap and spacing are Cadw's drawing read at the 1280 panel's fitted scale, and only their place comes
   from the fit of that panel to the LiDAR (±2m), so the ⓘ never presents a fitted place as Cadw's; `gate-inner` says
   the same of its place and its width. **One rule for the build: the pair is built from its gap** (gap centre at
   x 5.1, gap 1.4m, towers 4.9m, so centres at x 1.95 and 8.25), and the door is the gap.
9. **The research gaps** above, especially the King's Works accounts (roofs) and the Cadw guidebook (heights), would turn
   several "imagined" heights into documented ones.

## Sources

- [S1] Coflein (RCAHMW), "Dynefor Castle" (Castell Dinefwr), NPRN 425, SN 61150 21731 (RCAHMW, February 2011, from Rees and Caple, Cadw guide, revised edition 2007). https://coflein.gov.uk/en/site/425/ — founded "in the later twelfth century by Rhys ap Gruffudd, the Lord Rhys"; remains "from the thirteenth and earlier fourteenth century"; maintained in the earlier 15th century; Newton House may have replaced it "as early as the later part of the century"; "By the later seventeenth century ... the top of the great tower was taken down and replaced by a summerhouse"; consolidated; two enclosures and rock-hewn ditches, high curtain, lower walled barbican, great round tower "some 12m across", "two storey stump", towered lodgings on the north-east curtain, "a smaller round tower at the northern angle"; upper town 1281, Newton 1297. Same record as `medieval:S11` and `models:S21`. Read directly 2026-10-10.
- [S2] Cadw, Listed Buildings Full Report 11117, "Old Dynevor Castle", Grade I, designated 8 July 1966, E 261149 N 221730. https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=11117 — "first built by the Welsh princes in C13; partly remodelled by King Edward I with a gatehouse added on S and a rectanuglar tower on N. Late C15 additions by Sir Rhys ap Thomas"; "an angular curtain wall, incorporating a circular tower to NW and a large round tower at SE angle, now surmounted by a C17(?)/C18 gazebo"; "a rectangular hall facing N"; scheduled monument Cm29. Read directly.
- [S3] Heneb Historic Environment Record (Archwilio), PRN 882, "Dinevor Castle; Dinefwr Castle; Old Town", SN6114921730. https://archwilio.org.uk/arch/query/page.php?watprn=DAT882&dbname=dat&tbname=core — 1151 "built by two brothers Maredudd and Rhys ap Gruffydd"; wooden castle on a motte or stone not clear; the keep may be a rebuild after Llywelyn forced Rhys Gryg to dismantle it; "From 1276 onwards, the castle was largely kept in English hands"; repairs in the 13th and 14th centuries; 1403 siege resisted; modified by Sir Rhys ap Thomas, who soon abandoned it; "During the late 18th to early 19th century, the castle was deliberately converted in to a romantic ruin and a summerhouse was built on top of the keep"; source list including the grey literature named in Gaps. Derived from information held by the Heneb HER Charitable Trust copyright. Read directly.
- [S4] Heneb HER (Archwilio), PRN 881, "Dinevor Castle; Dinefwr Castle", motte, SN61152173. https://archwilio.org.uk/arch/query/page.php?watprn=DAT881&dbname=dat&tbname=core — "A motte and bailey castle may have been built prior to the construction of the stone castle of Dinefwr." Read directly.
- [S5] Heneb HER (Archwilio), PRN 42675, 49626 and 49627, "Dinefwr Castle South Curtain Wall". https://archwilio.org.uk/arch/query/page.php?watprn=DAT42675&dbname=dat&tbname=core — "a c 12m length of the south curtain wall was bulging and leaning to the south"; dismantled "down to foundation level and then rebuild"; February to May 2000; a trench "12.25m by 2.0m" inside; report by K. Murphy and R. Ramsey, Cambria Archaeology, 2001. Read directly.
- [S6] Heneb HER (Archwilio), PRN 49736, "Dinefwr Castle", building survey, SN61132174. https://archwilio.org.uk/arch/query/page.php?watprn=DAT49736&dbname=dat&tbname=core — standing building recording of the inner part of the north-west tower, May 2002, "prior to the insertion of a new stairway"; H. Wilson and P. Crane 2003. Read directly.
- [S7] Gatehouse Gazetteer, "Dinefwr Castle", record 216 (updated 20 April 2017). https://gatehouse-gazetteer.info/Welshsites/216.html — SN61152173; "a certain Timber Castle, and also as a certain Masonry Castle"; quotes Coflein, the listing and HER 881 and 882; CADW scheduled monument CM029, listed building 11117; bibliography (guidebooks, Kenyon 2010, Davis, Renn 1961, Moore 1994, the Brut entries 1163, 1195, 1198, 1204, 1208, 1213, 1216); "This is not the same as Dinweiler mentioned several times in the chronicles." Same record as `medieval:S12`. Read directly.
- [S8] castlewales.com (Jeffrey L. Thomas), "Dinefwr Castle", text from Sian E. Rees and Chris Caple, the Cadw guidebook for Dinefwr and Dryslwyn castles (1999), photographs 2002. https://castlewales.com/dinefwr.html — the Lord Rhys's castle "perhaps of a similar form to that which survives today"; the layout "probably first adopted at this time"; "By the time of the siege of 1213, there were certainly walls and a tower strong enough to withstand siege engines"; Rhys Gryg's 1220 dismantling; the keep "conventionally dated to around the 1230s", possibly Rhys Gryg's; the 1280s repairs and the "two large and three small buildings"; the chamber block, inner gate, barbican and south turret; the hall and 1326; 1343 and 1353; the south wall rebuilt after the Glyndŵr siege; "There are no records of work at Dinefwr for the remainder of the Middle Ages"; the late 17th-century summerhouse, the south turret's roof and tiled floor; "By the late 18th century, however, both roofs had been destroyed by fire"; estate repairs that "rebuilt or refaced" large areas; "the restored wall-walk". Read directly.
- [S9] medievalheritage.eu, "Dinefwr – castle" (bibliography: Caple and Rees 2007; Davis 2011, 2021; Kenyon 2010; Lindsay 1998; Lloyd, Orbach and Scourfield 2006; Salter 1996). https://medievalheritage.eu/en/main-page/heritage/wales/dinefwr-castle/ — history ("captured by Rhys ap Gruffydd (Lord Rhys) in 1165"; Rhys ap Thomas "carried out its rebuilding"; "after the fire of the eighteenth century"); architecture: ditches "about 15 meters", pentagon of walls "1.8 meters thick", courtyard "approximately 50 x 28 meters", keep "13.5 meters and walls 2.6 meters thick", battered base and roll moulding, first-floor entrance, ground-floor portal of the 14th century, three slits; south-east gate and the 1250-70 gatehouse inside; north-west tower "about 7 meters"; chamber block, latrine turret, floors on corbels; hall "13 meters long and 6 meters wide"; the later gate, south turret and foregate with wall-walks; outer ward; 17th-century changes. Secondary. Same page as `models:S22`. Read directly.
- [S10] medievalheritage.eu, "plan of the castle with time stratification according to C.Caple, S.Rees" (Early/Mid-Thirteenth Century Phase 1 and Phase 2, Late Thirteenth/Early Fourteenth Century, Medieval (Uncertain Date), Seventeenth/Eighteenth Century; North-West Tower, Hall, Chamber Block, Keep, Inner Gate, Turret, Middle Gate, Outer Gate, Outer Ward Upper and Lower, Ditch, Old Town (site of?)); 30m and 100ft scale bars. https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-plan-12.jpg — measured 2026-10-10 and fitted to S24 (30m bar 8.15 px/m, 100ft bar 8.20; the ground 8.58 px/m: the plan as reproduced is drawn about 5% larger than its bars say, cause unknown). Same image as `models:S23`. Cadw, Crown copyright; not copied.
- [S11] medievalheritage.eu, "plan of the castle expansion stages according to C.Caple, S.Rees" (1230-50, 1250-70, 1280,
  1330, 1750; new, existing and assumed walls; 20m and 60ft bars).
  https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-plan-11.jpg — viewed and measured; the **1280 panel
  only** (image 1300 x 1013 pixels) fitted 2026-10-10 to the survey [S24] by the same method as S10 (keep and north-west
  tower centres, three corners: residuals 0.4-1.0m, 6.52 px/m against its 20m bar's 6.63, rotation 4.2 degrees; the
  three corner pixels were not recorded), and its two inner-gate towers read off it; refitted 2026-10-16 (check 3) on
  two points, the hole centres of the keep (1071.4, 269.7) and the north-west tower (916.7, 59.0) in panel pixels
  against (18.5, -7.0) and (-8.5, 23.0) in the plan frame: 6.48 px/m, 5.7 degrees, tower hole centres (959.6, 312.4) and
  (999.2, 316.7) giving (2.0, -15.3) and (8.1, -15.3); the model builds from the gap (centres 1.95 and 8.25, check 5); the gap between the towers is 8-9 clear
  pixels (8, 8, 9, 9, 8 on rows y 306-318), 1.2-1.4m (check 4). **The panels are at different scales** (keep to north-west tower
  274, 261, 296 and 292 pixels on the 1250-70, 1280, 1330 and 1750 panels, 6.78, 6.48, 7.33 and 7.24 px/m; one 20m bar
  of about 130-133 pixels), so each needs its own fit before anything is measured off it. Cadw, Crown copyright; not
  copied.
- [S12] medievalheritage.eu, "plan of the castle from the 14th century according to J.Kenyon". https://medievalheritage.eu/wp-content/uploads/2018/05/Dinefwr-plan-01.jpg — viewed for shape; its scale bar is inconsistent (`models:S24`). Not copied.
- [S13] Chris Jones-Jenkins, reconstruction of Dinefwr Castle in the 14th century from the west, for Cadw, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-rekonstrukcja-22.jpg — keep with a conical roof inside its battlements, ranges, outer ward and town; walls painted pale. An artist's reconstruction, viewed. Not copied.
- [S14] Chris Jones-Jenkins, cutaway reconstruction of the north range in the 14th century, for Cadw, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-rekonstrukcja-23.jpg — hall and chamber block, roof trusses, floors, stairs. Viewed. Not copied.
- [S15] Paul R. Davis, reconstruction of the castle from the south-east, line drawing, as reproduced by medievalheritage.eu (book not stated). https://medievalheritage.eu/wp-content/uploads/2019/08/Dinefwr-rekonstrukcja-11.jpg — keep with a conical roof within its parapet, curtain with battlements, ranges, the foregate. Viewed. Not copied.
- [S16] Donald Moore, "Dynevor Castle and Newton House: some seventeenth-century pictures", *Archaeologia Cambrensis* 143 (1994, published 1996), 204-35, Welsh Journals (National Library of Wales). https://journals.library.wales/view/4718179/4751353/213 — read from the page images (OCR checked against the images) for pp. 204-31: Gerald's description; Castle Woods and the ruins bought by the Dyfed Wildlife Trust in 1979; four oil paintings, three of which show the medieval castle (two of it, one of Newton House with the castle behind, whose view confirms the split north-west tower), c. 1660-70 (Harris c. 1670), keep with conical roof and pennant, top storey stepped in and coloured differently, six narrow windows, a roofed rectangular tower with a chimney; the north-west tower split, hall and chamber in decay; Buck 1740; the top storey's thin wall and outer wall-walk with "a low, level parapet", six large windows today; Ray Caple's examination for Cadw ("Courses of flat stones ... mixed flat and rectangular stones"); post-medieval (Apted 1980) or an *étage en retrait*; Malkin 1804 and Hughes 1823 on the fire; Dineley 1684. Read.
- [S17] D. F. Renn, "The round keeps of the Brecon region", *Archaeologia Cambrensis* 110 (1961), pp. 129-43, Welsh Journals. https://journals.library.wales/view/4718179/4743652/153 — p. 140: "OLD DYNEVOR, LLANDYFEISANT (611217) ... a halfround string-course above a deep battered base, through which an entrance has been cut. The latter may be an original feature, although it has a modern lintel. The window loops have wide pointed embrasures, and the first floor is carried on a set-back of the walls ... a relatively modern 'folly' on top, and the curtain wall runs close to the tower"; p. 132: Dynevor among "stumps on low platforms" with "three symmetrical window openings"; the group (not Dynevor) "built of local rubble reasonably coursed and plastered over"; p. 134: the roll-moulded string course "links Skenfrith with Bronllys, Dynevor, and Tretower"; p. 137: "the period 1185-1245, from Longtown to Tretower" and "It is to be hoped that the ivy will be stripped from Dynevor"; p. 140: "a protruding bluff 200 ft.a.s.l." (page numbers checked again on the page images, 2026-10-10: the earlier draft cited p. 139 for the last two). Read from page images (OCR).
- [S18] *Brut y Tywysogion, or the Chronicle of the Princes*, ed. and trans. John Williams ab Ithel (Rolls Series, London, 1860), Internet Archive. https://archive.org/details/brutytywysogiono00cara — 1150: Maredudd and Rhys "repaired the castle of Dinweileir" (note: "Dinevwr, C. E."); 1162: Rhys "took possession of Cantrev Mawr and the castle of Dinevwr"; 1195, 1198, 1204, 1208; 1213: young Rhys "placed engines and inventions for attacking the castle; and placed ladders against the walls ... and thus did he possess himself of the castle altogether, save one tower"; 1256 and 1271. Full text searched and read in context.
- [S19] Dictionary of Welsh Biography, "RHYS ap GRUFFYDD (1132-1197)". https://biography.wales/article/s-RHYS-APG-1132.html — "At Dinefwr, the ancient capital, a castle in the new style was begun". Same as `medieval:S14`. Read directly.
- [S20] Dictionary of Welsh Biography, "RHYS GRYG ('Rhys the Hoarse,' died 1234)" (R. T. Jenkins, 1959). https://biography.wales/article/s-RHYS-GRY-1234 — mortally wounded attacking Carmarthen in 1234, "he died at Llandeilo-fawr". Read directly.
- [S21] Dictionary of Welsh Biography, "RHYS ap THOMAS, Sir (1449-1525)" (J. F. Rees). https://biography.wales/article/s-RHYS-APT-1449.html — Gruffudd ap Nicolas "in 1440 leased the lordship of Dinefwr"; the "extensive alterations to the castle, building the gate-house and inserting windows" are at Carew. Read directly.
- [S22] National Trust Collections 869191 and 869194, British (Welsh) School, "Dinefwr Castle, Llandeilo, from the South West" and "... from the North", oil on canvas, 83.8 x 124.5cm, dated "circa 1710 to circa 1730", via Wikimedia Commons and Wikidata (Q52155070, Q52155090; the NT and Art UK pages refused automated reads). https://commons.wikimedia.org/wiki/File:British_(Welsh)_School_-_Dinefwr_Castle,_Llandeilo,_from_the_North_-_869194_-_National_Trust.jpg — public domain; viewed: the keep's top storey pale with narrow windows, a grey conical roof with a ball finial and pennant, a square tower with a pyramidal roof, the ruined ranges.
- [S23] Samuel and Nathaniel Buck, "The South View of Denefawr-Castle, in the County of Caermarthen", engraving, 1740, National Library of Wales, via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:The_south_view_of_Denefawr-Castle,_in_the_county_of_Caermarthen.jpeg — public domain; viewed: conical roof with a cross on the keep, ruined walls, wooded hill.
- [S24] Welsh Government LiDAR, 2020-22 national survey, 1m DSM and DTM, tile SN6121 (`wg_del_26_261221_20220113dsm.tif`, `...dtm.tif`), DataMapWales; Open Government Licence v3 (see [`../data/lidar.md`](../data/lidar.md)). https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dsm/wg_del_26_261221_20220113dsm.tif — measured 2026-10-10 by Claude: keep and north-west tower centres fitted, wall-top, floor and ditch heights sampled, the plan S10 fitted by least squares to five points (residuals 0.6-1.1m).
- [S25] British Geological Survey, DiGMapGB-50 bedrock (v9.25, released 31 March 2025; sheet 212, Llandovery), GetFeatureInfo at the castle. https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer — "Llandeilo Flags Formation - Sandstone, limestone and argillaceous rocks", Ordovician, "shallow seas". Read 2026-10-10.
- [S26] Cadw, "Castell Dinefwr" (visitor page). https://cadw.gov.wales/visit/places-to-visit/castell-dinefwr — the Lord Rhys's possession; "Dinefwr eventually fell into English control in 1287"; "The castle, which is owned by the National Trust, is situated in the woodland of the Dinefwr estate". Same page as `medieval:S9`. Read directly.
- [S27] National Trust, "History of Dinefwr". https://www.nationaltrust.org.uk/visit/wales/dinefwr/history-of-dinefwr — the Lord Rhys "ruled from the now ruined Dinefwr Castle"; the Rhys family; nothing on the castle's fabric. Same page as `medieval:S13`. Read directly.
- [S28] W. Samuel, *Llandilo, present and past; an illustrated guide to the ancient castles and other antiquities of the neighbourhood* (Carmarthen, 1868), "Plan of Dynevor Castle", p. 25; British Library, Flickr Commons (no known copyright restrictions), via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Plan_of_Dynevor_(Dinfwr)_Castle_(11243263915).jpg — numbered plan without a scale; its key was not read (the British Library's text file link did not answer). Viewed.
- [S29] Wikipedia, "Dinefwr Castle". https://en.wikipedia.org/wiki/Dinefwr_Castle — lead only: Cadw uses the Welsh name only since 2024; "In 1660 Newton House was built nearby and the castle keep modified as a summer house ... it burned down in the 18th century" (citation needed). Read as raw wikitext.
