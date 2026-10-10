---
title: Dinefwr Castle (Castell Dinefwr), phase by phase, for a Blender model
kind: research
status: draft
updated: 2026-10-10
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
([check 1](reviews/dinefwr-castle-check-1.md)); that check is not independent in the sense the todo path asks for, so
a check by another agent is still owed before building.

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
[S18], the paintings and engraving [S16][S22][S23], Renn [S17], the listing [S2] and the HER [S3].

## Summary

- **Placement.** Coflein gives SN 61150 21731 [S1]; the Cadw listing E 261149 N 221730 [S2]; the HER SN 61149 21730
  [S3]. The keep's centre, fitted on the LiDAR surface model, is at **E 261168.5 N 221724.0** (to about half a metre),
  so Coflein's point lies inside the inner ward, about 18m west of the keep [S24]. The app's point (261155, 221729) is
  5m from Coflein's.
- **The Cadw plan fits the ground.** The period plan after Rees and Caple [S10], fitted to five points on the LiDAR
  (keep, north-west tower, west angle, south-west turret, south-east angle), fits to within 1.1m at every point with a
  rotation of 1.8 degrees, but at **8.58 pixels a metre, not the 8.15 its scale bar gives**: by the ground, the
  drawing's bar is about 5% long. Sizes below use the ground's scale and say so [S10][S24].
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
  order: the pentagonal curtain and the keep first; the north-west tower and an inner gatehouse next; under the Crown
  in the 1280s the chamber block, a new gate in the south curtain with a long walled approach (the barbican) and the
  south turret; about 1326-30 the hall; and in the 17th/18th century the summerhouse on the keep, a grand stair and
  cross walls.
- **Nothing on the plans is Tudor.** The listing ("Late C15 additions by Sir Rhys ap Thomas") [S2], the HER [S3] and
  medievalheritage ("carried out its rebuilding") [S9] give Sir Rhys ap Thomas works at the castle; the Cadw guide says
  "There are no records of work at Dinefwr for the remainder of the Middle Ages" and that the old site was abandoned
  from the 15th century for Newton [S8]. The DWB's "extensive alterations to the castle, building the gate-house and
  inserting windows" are at **Carew**, not Dinefwr [S21]. **Contested; a Tudor phase has no part to draw.**
- **The summerhouse on the keep existed, roofed, long before the HER's date.** Two oil paintings of the castle show the
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
- **By 1213 there were walls and a strong tower.** The Brut: young Rhys set engines and ladders against the walls and
  took "the castle altogether, save one tower", where the garrison held out [S18]; the Cadw guide: "By the time of the
  siege of 1213, there were certainly walls and a tower strong enough to withstand siege engines" [S8]. What they
  looked like is not known.
- **What the walls are built of is not stated by any source read.** The keep's lower part is "courses of flat stones",
  its top storey "mixed flat and rectangular stones" (Ray Caple's examination for Cadw in the 1990s, via Moore) [S16].
  The bedrock under the castle is the Llandeilo Flags Formation (sandstone, limestone and mudstone) [S25]. That the
  stone came from it is an inference. No source read says whether the walls were rendered or limewashed at Dinefwr;
  Renn says the related Brecon-region keeps were "built of local rubble reasonably coursed and plastered over" [S17],
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

The castle lies **outside** the app's LiDAR detail areas (Llandeilo town and the Roman forts,
`tools/terrain/lidar-areas.json`), so today it stands on the region's 10m LiDAR context grid (ADR 0049), too coarse for
ditches 20-30m wide. A Dinefwr detail area would bring the ditches and the ridge in at 2m from the same data.

## The site

- **The ridge.** The castle is "upon a high wooded ridge above the meandering Tywi" [S1]; "the castle of Dynevor is
  situated on the summit of a lofty hill above the river Towy" (Gerald of Wales, 1188, as Moore translates) [S16];
  Renn: "on a protruding bluff 200 ft.a.s.l." [S17]. The ward floor is at about 100m OD, the floodplain below the
  south slope at about 23m OD [S24]. "The high, steep slopes of the hill provided protection, primarily from the
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
- **1213 (documented, two sources).** Walls and one tower held against engines and ladders [S18][S8]; Llandeilo was
  burned the same year [S18].
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
  Gryg" [S8]. Renn links Dinefwr's roll-moulded string course with Skenfrith, Bronllys and Tretower [S17]. The HER:
  "the stone keep as we see it now may date from a rebuilding after Llywelyn forced Rhys Grug to dismantle the castle"
  [S3]. The listing: "first built by the Welsh princes in C13" [S2]. Moore: "The present belief is that the keep was
  built in the thirteenth century, and the curtain walls later, as in other Welsh native castles" [S16], which differs
  from the phase plans' single phase. Rhys Gryg died in 1233 (Cadw guide [S8]; medievalheritage [S9]) or 1234 (DWB:
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
| Keep (great round tower) | "some 12m across ... now a two storey stump crowned by the remains of the seventeenth century summerhouse" [S1]; "13.5 meters and walls 2.6 meters thick, located on the south-eastern part of the courtyard"; "a widened (buttressed) bottom part, with the width change emphasized by a roll moulding"; entrance at first floor, ground floor reached through the floor above, "three slits on the first floor and small windows in the upper parts, flanked by side seats" [S9]; "a halfround string-course above a deep battered base, through which an entrance has been cut ... it has a modern lintel. The window loops have wide pointed embrasures, and the first floor is carried on a set-back of the walls" [S17]; three symmetrical window openings, one opposite the entrance passage [S17] | Centre (18.5, -7.0) in the plan frame; 13.6m over the drawn wall, 14.5m over the outer line, walls about 2.9m, inside about 7.7m [S10]; floor inside 100.9m OD; wall-walk ring 110.4m, out to about 14.6m across; top storey's wall to 113.6m [S24] | Size documented, contested (12, 13.5 or 13.6-14m); battered base and string course documented (two sources); medieval height unknown |
| Keep's ground-floor door | Cut through the base, "may be an original feature" [S17]; "only in the fourteenth century the portal on the ground floor was pierced" [S9]; "may also date from" 1326 [S8] | - | Contested (original or 14th century) |
| North-west tower | "a smaller round tower at the northern angle" [S1]; "about 7 meters in diameter", no fireplace or latrine, courtyard side rebuilt straight [S9]; "a circular tower to NW" [S2] | Centre (-8.5, 23.0); 7.9m over the drawn wall (8.4m over its outer line), walls 2.1m, inside 3.7m; top about 111.2m OD (max 113.0); inside surface 103.3m [S10][S24] | Documented; diameter contested 7 against 7.9m |
| Chamber block | A quadrangular block on the north side, "partially extended beyond the perimeter of the wall", "a basement with two upper floors", small Gothic windows, "a passage to the adjacent, four-sided latrine turret", floors on stone corbels, fireplaces, north windows with seats [S9]; "fine towered lodgings along the north-east curtain" [S1]; "equipped with a watch turret" [S8] | North-east face 14.6m, from (9.0, 19.4) to (21.5, 11.9); depth about 8.5m; today 107.8-113.2m OD [S10][S24] | Documented; storey heights unknown |
| Hall | "13 meters long and 6 meters wide", on the upper floor over a store, external stairs, fireplace, latrine on the west [S9]; "a rectangular hall facing N" [S2] | Between the north-west tower and the chamber block on the north curtain, which it overlies [S10] | Documented (size single-source); roof unknown |
| Inner gate | Moved west into the south curtain in the later 13th century; "only the lateral loop holes and the door's bar hole remain" [S9] | At (4.4, -17.5) [S10] | Documented |
| South turret | Four-sided, "protruding in front of the perimeter", a small room with a latrine above the ground floor [S9]; built with the new gate "seems likely" [S8] | About 4 x 4m at the south-west angle [S10] | Documented (size measured, low) |
| Barbican (foregate) | "a lower walled barbican" [S1]; an "elongated gate neck (passage) along the southern curtain", ending at an entrance before the ditch, "probably closed by a portcullis and a door", wall-walks on both sides [S9] | Outer wall from (-5.3, -19.2) to (11.6, -24.3) and (31.3, -31.3); Middle Gate at (22.2, -28.3), drawn about 6 x 3m [S10] | Line documented; portcullis reconstructed |
| Original gate | "an ordinary portal in the wall, located on the south-east side, in close proximity to the keep"; "Around 1250-1270, it was reinforced with a gatehouse, atypically placed entirely on the inside" [S9] | Gap in the south-east curtain on the 1230-50 and 1250-70 plans [S11] | Documented (Cadw guide) |
| Outer ward (upper) | "a slightly higher northern part and a lower southern part, in the eastern part of which the gatehouse was placed" [S9]; walls "survive only in short lengths" (`models:S22`) | Inside about 36 x 31m, from (38.6, -13.0) to (74.7, -11.8) and (57.9, 4.0) to (58.9, -27.5); a north wall piece (48.0, 3.7) to (68.5, 0.2); platform about 98.5m OD, about 1.3m below the inner ward [S10][S24] | Outline documented; walls' height unknown |
| Outer ward (lower) and outer gate | Lower outer ward with its walls; the outer gate on its east side [S10]; "Outer Gate" [S10] | Walls (39.3, -33.9), (57.9, -52.0), (76.7, -56.1), (77.2, -33.9); outer gate at (78.8, -31.3) [S10]; the terrain model shows the south-east corner at about (80, -55) [S24] | Documented |
| Bailey buildings | "two large and three small buildings were erected in the bailey" in the 1280s [S8][S9] | - | Number documented (one source by two routes); form imagined |
| The town | "The upper town, thought to have been sited on the castle ridge, was first recorded in 1281" [S1]; "Old Town (site of?)" north and east of the castle [S10] | - | Place reconstructed |

### Materials, as far as recorded

- **Stone.** Lower keep "Courses of flat stones", top storey "mixed flat and rectangular stones" [S16]. Bedrock
  Llandeilo Flags Formation [S25]. No source read names the building stone or any dressed stone at Dinefwr; the
  Llandeilo Flags are "thinly laminated sandstones" (`deeptime:S1`), which fits "flat stones" (an inference).
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

- **For.** "Late C15 additions by Sir Rhys ap Thomas" [S2]; "In Tudor times, it was modified by Sir Rhys ap Thomas, but
  he soon abandoned the castle in favour of a new mansion at Newton House" [S3]; "At the end of the fifteenth century,
  the castle was in the possession of Sir Rhys ap Thomas, who carried out its rebuilding" [S9]. The lordship was leased to
  Gruffudd ap Nicolas in 1440 [S21].
- **Against.** "There are no records of work at Dinefwr for the remainder of the Middle Ages, and it appears that from
  the 15th century the old site was abandoned in favour of the more convenient situation of the first Newton house" [S8];
  Coflein: "It was still maintained in the earlier fifteenth century, but may have been replaced by Newton House ... as
  early as the later part of the century" [S1]. The DWB's alterations by Sir Rhys are at Carew [S21]. The Cadw plans
  assign nothing to the 15th or 16th century [S10][S11].
- **For the model**: the 1330 castle unchanged, with an ⓘ giving both readings. A Tudor change that cannot be placed is
  not drawn.

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
- **The square tower.** "a smaller rectangular tower adjacent ... roofed" with a pyramidal roof and a chimney "overlooking
  the entrance to the castle" [S16]; "The southern turret was also equipped with a roof and a tiled floor" (Cadw guide)
  [S8]. Whether the painted tower is the south turret is not said by either source (its place in the south-west view, to
  the right of the keep, does not obviously fit the turret at the south-west angle; an observation, not a finding).
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
  stair was put in the north-west tower in 2002 [S6]. The castle is owned by the National Trust [S26] and looked after by Cadw, which lists it among its sites [S26]
  ("Cadw, who maintain the site", Wikipedia [S29]); the HER lists a proposed Cadw guardianship boundary of 1988 [S3].

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
   Gryg's (Cadw guide), a rebuild after the 1220 dismantling (HER), the keep first and the curtain later (Moore)
   [S11][S8][S3][S16]; Rhys Gryg's death 1233 or 1234 [S8][S20].
5. **The keep's diameter**: 12m [S1], 13.5m [S9], 13.6m over the drawn wall at the ground's scale and about 14m over the
   surface model's top [S10][S24].
6. **The north-west tower's diameter**: about 7m [S9] against 7.9m measured [S10][S24].
7. **The curtain's thickness**: 1.8m [S9] against 1.4-1.6m as drawn at the ground's scale [S10][S24].
8. **The ditches' width**: about 15m [S9] against 22-30m lip to lip today [S24].
9. **The keep's ground-floor door**: an original feature (possible, Renn) or 14th-century [S17][S9][S8].
10. **A Tudor phase**: Sir Rhys ap Thomas's additions [S2][S3][S9] against no record of work and abandonment from the
    15th century [S8][S1].
11. **The summerhouse's date**: c. 1660-70 (paintings, Moore), later 17th century (Coflein, Cadw guide), c. 1710-30
    (National Trust's date for the paintings), C17(?)/C18 (listing), late 18th to early 19th century (HER, against the
    1740 engraving) [S16][S1][S8][S22][S2][S3][S23].
12. **Whether the top storey is post-medieval or a medieval stepped storey**, and so whether the keep was once taller
    [S16].
13. **When the castle fell to English control**: largely English from 1276 (HER [S3]), against "eventually fell into
    English control in 1287" (Cadw [S26]); already open in [`open-questions.md`](open-questions.md).

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
- **Heights in the Middle Ages**: of the keep (two storeys lost, or none), the curtains, the towers, the chamber block and
  the hall; floor levels; window sizes and positions.
- **Materials**: the building stone, any dressed stone, mortar, render or limewash, and every roof covering (medieval and
  17th-century).
- **The battered base and string course's heights** on the keep; the batter's angle.
- **Phases 1 and 2**: any form at all.
- **The 1280s bailey buildings**: form and place.
- **The upper town's** site and extent; whether "Old Town (site of?)" is the 1281 town.
- **The east curtain**, drawn only as "assumed".
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
  phase. Claude's recommendation: fold it in, with both dates in the ⓘ, since neither has a known form.

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
| `dinefwr-welsh-stone` | c. 1230 to c. 1280 | Keep and curtain 1230-50, north-west tower and inner gatehouse 1250-70 [S11]. Could be split at 1250 |
| `dinefwr-crown` | c. 1280 to c. 1326 | The 1280s works [S8][S11] |
| `dinefwr-castle` | c. 1326 to c. 1600 | Hall and later works [S8][S11]; still maintained in the earlier 15th century [S1]; the Tudor phase is contested and adds no part |
| `dinefwr-summerhouse` | c. 1660 to c. 1795 | Roofed top storey and turret, paintings to the fire [S16][S22][S23][S8]; both ends contested |
| `dinefwr-ruin` | c. 1795 to now | Roofless; today's heights [S24] |

**Phase `dinefwr-rhys` (form unknown throughout).**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/ditch-inner` | ditch | On the line of today's east ditch, base at about x 34-37 from y 14 to -16 (measured), continued to about y -25 (estimate); width and depth today's (22-30m, 5-7m) | reconstructed (Cadw guide: the layout "probably first adopted at this time") | S8, S24 | none | earth, rock (procedural) |
| `dinefwr/ditch-north` | ditch | Along the north side: base at about (-10, 34) and (5, 33), about 89m OD (measured); its ends follow the plan's hachures (estimate) | reconstructed | S8, S24 | none | as above |
| `dinefwr/curtain-inner` | wall, closed | The later pentagon's line (see `dinefwr-welsh-stone`); height **unknown** (estimate 5m), thickness **unknown** (estimate 1.5m) | reconstructed ("more probably, a masonry defensive wall") | S8 | `coursed-rubble` (new) | flaggy rubble (analogy) |
| `dinefwr/fence-outer` | wall | The outer ward's line; height **unknown** (estimate 3m) | imagined (wooden or masonry not known) | S8 | `post-and-board-breastwork` (existing) | timber |
| `dinefwr/tower-1213` | tower | Place and form **unknown**; one tower held out in 1213. Estimate: square, 7m, 10m high, at the keep's place | documented that it existed; form imagined | S18, S8 | none | flaggy rubble (analogy) |
| `dinefwr/hall-timber` | hall | **Unknown** (estimate 14 x 7m, 5m to the eaves) | imagined | S8 | `thatch-roof` or `shingle-roof` (existing, analogy) | timber, thatch or shingle |

**Phase `dinefwr-welsh-stone`.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/curtain` | wall, path NW tower (-8.5, 23.0), W angle (-20.5, 8.8), SW angle (-7.0, -16.9), S angle (24.2, -18.3), SE end (27.2, -14.7) | Thickness 1.8m (text) or 1.4-1.6m (measured), **contested**; height **unknown** (today 5-7m above the ward inside; estimate 7m) | outline documented (measured); height imagined | S10, S11, S24, S9 | `coursed-rubble`, `crenellation` (new, analogy), `wall-walk` (new) | flaggy rubble |
| `dinefwr/curtain-east` | wall, SE end (27.2, -14.7) to chamber block E corner (21.5, 11.9) | As the curtain | reconstructed (Cadw's "assumed walls") | S11 | as above | as above |
| `dinefwr/curtain-north` | wall, (-4.6, 27.4) to (9.0, 19.4) and on to (21.5, 11.9) | As the curtain | documented (line); height imagined | S10, S11 | as above | as above |
| `dinefwr/keep` | tower, round, at (18.5, -7.0) | 13.6m over the wall (measured; 12 or 13.5m in texts, **contested**), walls 2.9m, inside 7.7m; floor 100.9m OD; medieval height **unknown** (today about 9.5m from the inside floor to the wall-walk; estimate a further 0-6m, **contested**: Moore) | documented (place, plan); height imagined | S1, S9, S10, S17, S24, S16 | `battered-base-string` (new, documented), `loop-window` (new, documented as three slits), `crenellation`, `conical-roof` (new, reconstructed from the reconstructions) | flaggy rubble; roof covering (unknown: analogy) |
| `dinefwr/gate-se` | gap in the curtain by the keep, then a gatehouse inside it (1250-70) | Gap about 3m (estimate); gatehouse **unknown** in size (estimate 6 x 5m, 7m high) | documented (place); form reconstructed | S9, S11 | `ledged-leaf` (existing, analogy) | flaggy rubble, timber |
| `dinefwr/tower-nw` | tower, round, at (-8.5, 23.0) | 7.9m (measured) or about 7m (text), walls 2.1m, inside 3.7m; today's top about 11.4m above the ward; medieval height **unknown** (estimate 11m). From 1250 | documented | S1, S9, S10, S11, S24 | `coursed-rubble`, `crenellation` | flaggy rubble |
| `dinefwr/outer-ward-wall` | wall, the upper outer ward's line, about (38.6, 4.0) round to (74.7, -27.5) | Height and thickness **unknown** (estimate 4m, 1.5m); only short lengths survive | documented (line); height imagined | S10, S9 | `coursed-rubble` | flaggy rubble |
| `dinefwr/buildings` | halls in the ward | **Unknown**; Cadw's plans mark two possible buildings with "?" | imagined | S11, S9 | `shingle-roof` or `thatch-roof` (analogy) | timber, roof |

**Phase `dinefwr-crown`** (as `dinefwr-welsh-stone`, plus these; `gate-se` closes).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/chamber-block` | hall (or prism), north-east face (9.0, 19.4) to (21.5, 11.9), projecting outside the curtain | 14.6 x about 8.5m (measured); basement and two floors; height **unknown** (today to 8-13m above the ward; estimate 12m) | documented | S9, S8, S1, S10, S24 | `coursed-rubble`, `loop-window`, `parapet-roof` or `gable` (unknown: analogy) | flaggy rubble, roof |
| `dinefwr/latrine-turret` | tower, square, on the chamber block | **Unknown** in size (estimate 3m) | documented (existence) | S9, S8 | `coursed-rubble` | flaggy rubble |
| `dinefwr/gate-inner` | gate in the south curtain at (4.4, -17.5) | Passage **unknown** (estimate 3m) | documented | S9, S10 | `ledged-leaf` (analogy) | timber |
| `dinefwr/turret-s` | tower, square, at the south-west angle, about (-7, -17) | About 4 x 4m (measured, low); height **unknown** (estimate 9m) | documented | S9, S8, S10 | `coursed-rubble`, `crenellation` | flaggy rubble |
| `dinefwr/barbican` | wall, (-5.3, -19.2), (11.6, -24.3), (31.3, -31.3), with wall-walks | Height **unknown** (estimate 4m); thickness about 1.2m (estimate) | documented (line) | S1, S9, S10 | `coursed-rubble`, `crenellation`, `wall-walk` | flaggy rubble |
| `dinefwr/gate-middle` | small gatehouse at (22.2, -28.3) | About 6 x 3m (measured, low); height **unknown** | documented (place); portcullis reconstructed | S9, S10 | `portcullis` (new, reconstructed), `ledged-leaf` | flaggy rubble, timber |
| `dinefwr/outer-ward-lower` | wall, (39.3, -33.9), (57.9, -52.0), (76.7, -56.1), (77.2, -33.9) | Height **unknown** (estimate 3m) | documented (line) | S10, S24 | `coursed-rubble` | flaggy rubble |
| `dinefwr/gate-outer` | gate at (78.8, -31.3) | **Unknown** | documented (place) | S10, S9 | `ledged-leaf` | timber |
| `dinefwr/bailey-buildings` | 5 halls in the outer ward, 2 large and 3 small | Number documented; size and place **unknown** (estimate 14 x 7m and 8 x 5m) | imagined (form) | S8, S9 | `timber-frame`, `thatch-roof` or `shingle-roof` (existing, analogy) | timber, daub, roof |

**Phase `dinefwr-castle`** (as `dinefwr-crown`, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/hall` | hall on the north curtain between the north-west tower and the chamber block | 13 x 6m (text; single source), first floor over a store; height **unknown** (estimate 9m); roof **unknown** | documented (size) | S9, S2, S10 | `coursed-rubble`, `gable` roof, `stone-stair` (new, external stair, "probably") | flaggy rubble, roof covering (analogy) |
| `dinefwr/west-building` | hall along the west curtain | **Unknown** in size (the plans' "?" building) | documented that it existed [S8]; form imagined | S8, S11 | as above | as above |
| `dinefwr/keep-door` | opening in the keep's base | **Unknown** size | documented, date contested | S17, S9, S8 | none | - |

**Phase `dinefwr-summerhouse`** (the Phase 3 castle in ruin, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dinefwr/keep` (ruin) | tower, round, stump | 13.6m; to the wall-walk at 110.4m OD (about 9.5m above its floor) (measured) | documented | S1, S24, S16 | `battered-base-string`, `parapet` (new: "a low, level parapet") | flaggy rubble |
| `dinefwr/keep-top` | tower, round, on the inner face of the keep | Inside about 7m, outside 10-11m, wall 1.3-2.3m (measured, allowing for the surface model's widening; Moore's "one third of the thickness", about 1m); top at 113.6m OD, about 3.2m above the walk (measured); six windows (today) or twelve narrow ones (paintings), **contested** | documented | S16, S24, S22 | `window-ring` (new, documented), `conical-roof` with `finial` (new, documented in paintings and the engraving) | pale render or limewash (reconstructed: "coloured differently" [S16], pale in the paintings [S22]); roof covering **unknown** (grey) |
| `dinefwr/turret-s` (roofed) | as Phase 3, roofed | Pyramidal roof; tiled floor | documented | S8, S16 | `pyramid-roof` (new) | roof covering unknown |
| `dinefwr/stair-grand` | stair in the ward | About 3 x 13m (measured from the plan, low), at about (5-8, -5 to -18) | documented | S10, S11 | `stone-stair` | stone |
| `dinefwr/cross-walls` | walls linking the keep to the curtains | As on the 1750 plan | documented | S10, S11 | `coursed-rubble` | flaggy rubble |
| `dinefwr/tower-nw` (ruin) | tower, split from the top | Standing height **unknown** in the 17th century | documented (split) | S16 | `coursed-rubble` | flaggy rubble |
| ranges in decay | ruin of hall and chamber block | **Unknown** standing heights | documented (decay) | S16 | ruin support (pipeline) | flaggy rubble, ivy (optional) |

**Phase `dinefwr-ruin`.** Every wall at today's measured height: curtains 104.5-107m OD (110m by the keep), north-west
tower about 111.2m, chamber block 107.8-113.2m, keep walk 110.4m and top storey 113.6m, roofless [S24]; the outer ward's
walls in short lengths [S9]. Before about 1961 the keep was ivy-covered [S17]; the south curtain's 12m rebuilt in 2000
[S5].

**What the Blender build will need.**

1. **Per-part plans.** Dinefwr's plans in `src/content/buildings.ts` carry one provenance per feature; each part needs an
   id, a name and its own provenance, as the forts' do, and the plan's outline has to move to the measured one (the
   current `DINEFWR_INNER_CORNERS` is the 2026-09-28 guess).
2. **Ruins in the build sheet.** ADR 0053 lists ruins as not built ("it refuses them"); two of the six phases are
   ruins, the last with a measured height for every wall.
3. **New kits**, each with its own provenance: `coursed-rubble` (courses of flat stones, documented on the keep [S16];
   course height unknown, to measure from photographs), `battered-base-string` (documented [S9][S17]; heights unknown),
   `loop-window` (documented [S9][S17]), `crenellation` (merlon and crenel sizes unknown: analogy; crenellated curtain in
   the paintings [S16]), `wall-walk` and `parapet`, `conical-roof` with `finial` (documented for the 17th-18th century
   [S16][S22][S23], reconstructed for the Middle Ages), `pyramid-roof`, `window-ring`, `stone-stair`, `portcullis`.
4. **Textures**: flaggy coursed rubble (the local Llandeilo Flags: reconstructed), a pale render or limewash for the
   summerhouse storey (reconstructed), a roof covering for each roofed phase (unknown: labelled analogy), timber, and
   the existing thatch and shingle for the imagined buildings. Each texture an asset in the manifest (ADR 0052's
   amendment).
5. **Ground**: a LiDAR detail area for the castle, so the ditches and the ridge come from the survey.
6. **The `at`** moves to Coflein's point; the 5m difference is inside the model's error, but the rule is the forts'.
7. **The research gaps** above, especially the King's Works accounts (roofs) and the Cadw guidebook (heights), would turn
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
- [S10] medievalheritage.eu, "plan of the castle with time stratification according to C.Caple, S.Rees" (Early/Mid-Thirteenth Century Phase 1 and Phase 2, Late Thirteenth/Early Fourteenth Century, Medieval (Uncertain Date), Seventeenth/Eighteenth Century; North-West Tower, Hall, Chamber Block, Keep, Inner Gate, Turret, Middle Gate, Outer Gate, Outer Ward Upper and Lower, Ditch, Old Town (site of?)); 30m and 100ft scale bars. https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-plan-12.jpg — measured 2026-10-10 and fitted to S24 (bar 8.15 px/m; ground 8.58 px/m). Same image as `models:S23`. Cadw, Crown copyright; not copied.
- [S11] medievalheritage.eu, "plan of the castle expansion stages according to C.Caple, S.Rees" (1230-50, 1250-70, 1280, 1330, 1750; new, existing and assumed walls; 20m and 60ft bars). https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-plan-11.jpg — viewed and measured. Cadw, Crown copyright; not copied.
- [S12] medievalheritage.eu, "plan of the castle from the 14th century according to J.Kenyon". https://medievalheritage.eu/wp-content/uploads/2018/05/Dinefwr-plan-01.jpg — viewed for shape; its scale bar is inconsistent (`models:S24`). Not copied.
- [S13] Chris Jones-Jenkins, reconstruction of Dinefwr Castle in the 14th century from the west, for Cadw, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-rekonstrukcja-22.jpg — keep with a conical roof inside its battlements, ranges, outer ward and town; walls painted pale. An artist's reconstruction, viewed. Not copied.
- [S14] Chris Jones-Jenkins, cutaway reconstruction of the north range in the 14th century, for Cadw, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Dinefwr-rekonstrukcja-23.jpg — hall and chamber block, roof trusses, floors, stairs. Viewed. Not copied.
- [S15] Paul R. Davis, reconstruction of the castle from the south-east, line drawing, as reproduced by medievalheritage.eu (book not stated). https://medievalheritage.eu/wp-content/uploads/2019/08/Dinefwr-rekonstrukcja-11.jpg — keep with a conical roof within its parapet, curtain with battlements, ranges, the foregate. Viewed. Not copied.
- [S16] Donald Moore, "Dynevor Castle and Newton House: some seventeenth-century pictures", *Archaeologia Cambrensis* 143 (1994, published 1996), 204-35, Welsh Journals (National Library of Wales). https://journals.library.wales/view/4718179/4751353/213 — read from the page images (OCR checked against the images) for pp. 204-31: Gerald's description; Castle Woods and the ruins bought by the Dyfed Wildlife Trust in 1979; four oil paintings, two of the castle, c. 1660-70 (Harris c. 1670), keep with conical roof and pennant, top storey stepped in and coloured differently, six narrow windows, a roofed rectangular tower with a chimney; the north-west tower split, hall and chamber in decay; Buck 1740; the top storey's thin wall and outer wall-walk with "a low, level parapet", six large windows today; Ray Caple's examination for Cadw ("Courses of flat stones ... mixed flat and rectangular stones"); post-medieval (Apted 1980) or an *étage en retrait*; Malkin 1804 and Hughes 1823 on the fire; Dineley 1684. Read.
- [S17] D. F. Renn, "The round keeps of the Brecon region", *Archaeologia Cambrensis* 110 (1961), pp. 129-43, Welsh Journals. https://journals.library.wales/view/4718179/4743652/153 — p. 140: "OLD DYNEVOR, LLANDYFEISANT (611217) ... a halfround string-course above a deep battered base, through which an entrance has been cut. The latter may be an original feature, although it has a modern lintel. The window loops have wide pointed embrasures, and the first floor is carried on a set-back of the walls ... a relatively modern 'folly' on top, and the curtain wall runs close to the tower"; p. 132: Dynevor among "stumps on low platforms" with "three symmetrical window openings"; the group (not Dynevor) "built of local rubble reasonably coursed and plastered over"; p. 139: the roll-moulded string course "links Skenfrith with Bronllys, Dynevor, and Tretower"; the ivy. Read from page images (OCR).
- [S18] *Brut y Tywysogion, or the Chronicle of the Princes*, ed. and trans. John Williams ab Ithel (Rolls Series, London, 1860), Internet Archive. https://archive.org/details/brutytywysogiono00cara — 1150: Maredudd and Rhys "repaired the castle of Dinweileir" (note: "Dinevwr, C. E."); 1162: Rhys "took possession of Cantrev Mawr and the castle of Dinevwr"; 1195, 1198, 1204, 1208; 1213: young Rhys "placed engines and inventions for attacking the castle, and placed ladders against the walls ... and thus did he possess himself of the castle altogether, save one tower"; 1256 and 1271. Full text searched and read in context.
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
