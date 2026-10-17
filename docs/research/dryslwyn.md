---
title: Dryslwyn Castle (Castell Dryslwyn), phase by phase, for a Blender model
kind: research
status: draft
updated: 2026-10-17
---

# Dryslwyn Castle, phase by phase, for a Blender model

Research for a true-size scripted Blender model of Castell Dryslwyn, following Dewi's decisions of 2026-10-16/17 that
landmarks are scripted Blender models at true size and height, like the Roman forts
([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md),
[ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md),
[ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)), each with its own 2m LiDAR area and textured
with sourced or labelled-analogy surfaces. The note follows the shape of [`dinefwr-castle.md`](dinefwr-castle.md).
Written by Claude on 2026-10-17 from sources fetched that day; the brief is in
[`briefs/dryslwyn.md`](briefs/dryslwyn.md). The choices in "Plan for the Blender model" are Claude's, under the proactive
mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), and none is Dewi's. A check
by the same agent ([check 1](reviews/dryslwyn-check-1.md)) re-read every quotation against the downloaded texts; **the
independent check the todo path asks for has not been done.**

It extends the Dryslwyn sections of [`era-medieval-to-1282.md`](era-medieval-to-1282.md) (the 1287 siege, the lords)
and [`building-models.md`](building-models.md) (the first measured outline, 2026-10-02), and corrects the latter where
the fit to the ground disagrees with it.

**How it was done.** Coflein (castle and borough), the Cadw listing and the Cadw scheduling report, the Heneb HER
(two records), the Gatehouse gazetteer, castlewales.com (two pages reproducing the 1999 Cadw guide), medievalheritage.eu
(text, two Cadw plans, Chris Caple's plan of the castle and town, three of his reconstruction sections and four
artists' reconstructions) and Cadw's visitor page were read directly. **Caple's excavation report** (*Excavations at
Dryslwyn Castle 1980-95*, Society for Medieval Archaeology Monograph 26, 2007) was **not** obtained; its publisher's
abstract and table of contents were read [S20]. Three chronicles were read as the Internet Archive's full texts: the
*Annales Cambriae* (Rolls Series, 1860) [S21], Nicholas Trivet's annals [S22] and the Wykes chronicle in *Annales
Monastici* vol. 4 [S23]. The Welsh Government LiDAR (2020-22, 1m DSM and DTM) was downloaded for the hill and the Cadw
period plan fitted to it [S24]. Two pre-excavation views (an aquatint of about 1795 and an engraving of 1872) were found
on Wikimedia Commons [S27][S28]. WebSearch was used 3 times.

**One source in many forms.** Almost everything known of the castle's form comes from **one excavation, Chris Caple's
of 1980-95**, and reaches this note through texts he wrote or that summarise him: the monograph's abstract [S20]; the
Cadw guide by Sian Rees and Chris Caple (1999, revised 2007), reproduced by castlewales.com [S8][S9] and summarised by
Coflein [S1] (whose text the HER copies [S5]); the Cadw listing, whose only sources are Davies 1993, Pettifer 2000 and
"Rees, Sian and Caple, Chris, Dinefwr Castle and Dryslwyn Castle, 1999" [S3]; medievalheritage.eu, whose bibliography
opens with Caple 2007 and Caple and Rees 2007 [S10]; and every plan and section read [S11]-[S16]. The scheduling report
[S4] cites nothing; its detail (the slate roof, the cinquefoil window, the "King's Hall") is the excavation's, so it is
counted in the same family. **A part that rests only on that family is marked "documented (one source: Caple)"**, the
rule `dinefwr-castle.md` uses for Cadw: the schema's tier is kept, and the label says the two-source cross-check is not
met. The **independent strands** are the LiDAR survey [S24], where fabric stands; the chronicles [S21][S22][S23], for
1245-46 and 1287; the two pre-excavation views [S27][S28], for the ruin; the BGS map for the bedrock [S25]; and the HER's
motte record [S6], which does not copy Caple.

## Summary

- **Placement.** Coflein gives SN 55387 20288 [S1], on the inner ward (the fitted plan puts it inside the east end of the
  great hall). The other references are on other parts of the hill and are not the castle's centre: the listing's
  E 255403 N 220365 [S3] lies about 79m north, where Caple's plan draws the settlement [S13]; the scheduling report's
  E 255436 N 220365 [S4] about 91m north-east, just west of the outer ward, perhaps the centre of the scheduled area; the HER and Gatehouse
  give SN 55402035 [S5][S7], a 10m-precision reference about 63m north. The app's point (255390, 220294) is 6.7m from
  Coflein's. **Anchor: Coflein's SN 55387 20288 (E 255387, N 220288).**
- **The keep's centre is surveyed** at E 255404.0 N 220297.5 (to about a metre: a circle fitted to the wall-top cells gives E 255404.8 N 220297.8), from the ring of its standing wall on the
  surface model; it is 17.0m east and 9.5m north of Coflein's point [S24].
- **The Cadw period plan fits the ground** [S11][S24]: pinned at the keep, it matches the standing walls (the apartment
  block's façade, the chapel tower, the east curtain, the keep) best at **7.5 plan pixels a metre and 3 degrees
  clockwise** (a search over scale, rotation and offset scoring the overlap of drawn walls with raised surface-model
  cells; the score is flat between 7.4 and 7.7). Cadw's phase plans [S12] carry the only scale bar, 3.93-4.0 px/m,
  and the keep is 50.5 px across on them against 93 on the period plan, which transfers as 7.29 px/m: **the fitted
  scale is about 3% larger**, as at Dinefwr (5%), cause unknown. The fit's error is about ±1m in the inner ward, ±2-3m in
  the middle ward and ±4-5m at the outer gatehouse; the outer ward's east wall lands about 4m east of the scarp the
  terrain model shows there [S24].
- **The castle's size on the ground** is about **112m east to west by 97m north to south** (fitted), not the 119 x 107m
  measured at the bar's scale in `building-models.md` (`models:S4`), and the ward sizes now add up: the middle ward is
  about 52m long and up to 25m wide (medievalheritage's text says "approximately 70 x 30 meters" [S10]), the outer ward
  about 55 x 30m.
- **The keep is about 12m across at its base**: medievalheritage's "approximately 12 meters" [S10]; the period plan 12.4m
  at the fitted scale, the phase plans 12.7-12.9m at their bar [S11][S12]; Caple's section 11m on its dimension line and
  about 12.1m between the toes of its flared base, with a body above the flare about 9m across and an inside about 5.1m
  [S14]; the standing ring on the surface model about 12m, with a hollow of 4-5m [S24]. Its walls are "some 3m thick" at
  the base [S4] ("up to 3 meters" [S10]), about 1.9m above the flare on Caple's section [S14]. **Its full height is
  reconstructed only**: Caple draws 16m, with a basement of 3.2m and storeys of 3.5, 3.5 and 4.5m under a low roof
  inside the parapet [S14]. Today it stands to 74.6m OD round a floor at 72.3m [S24].
- **Phases (all dates from the excavation's family unless said):** founded "in the late 1220s by Rhys Gryg for his son
  Maredudd ap Rhys" [S20] (the listing: Rhys Gryg "in the 1220s" [S3]; Coflein: "in the second quarter of the thirteenth
  century" by "a local Welsh prince" [S1]); a second (middle) ward "in the mid 13th century" [S20][S8][S12]; "greatly
  expanded in the period 1283-87 by Rhys ap Maredudd", who built the outer ward and gatehouse, raised the great hall and
  great chamber by a storey and added apartments and a chapel [S20]; besieged and taken in 1287 [S20][S21][S22][S23];
  garrisoned and repaired by the Crown "Throughout the 14th century" [S20]; surrendered to Owain Glyndŵr in 1403 [S20][S3];
  "During the early to mid 15th century the castle was deliberately walled up to deny its use to a potential enemy and
  it was subsequently looted and demolished" [S20]. The monograph's chapter titles give the periods: "Welsh Lordship
  Period (1197–1287)" and "English Garrison Period (1287–1455)" [S20].
- **It was white.** "By the late 13th century, the castle had a white rendered and lime-washed appearance, creating a
  very dramatic and highly visible symbol of lordship" [S20]; the hall's roof "was made of slate" [S4], and the excavation
  recovered "nails, sheet lead, slates" [S20]; the walls are "limestone rubble" [S3], the limestone "extracted from the
  hill, some of which was melted to obtain mortar", with "Imported red sandstone" for "architectural details" [S10]; the
  bedrock is the Mydrim Limestone Formation [S25]. This is the first landmark for which a source states render and
  limewash; at Dinefwr no source does.
- **The first record is 1245 or 1246**, in one manuscript of the *Annales Cambriae*: the seneschal of Carmarthen
  "obsedit castrum de Deresloyn", before the Kalends of December, printed in the 1860 edition as manuscript C's text in a
  note under 1246 [S21]; Gatehouse lists the chronicle's entry under 1245 [S7], the Cadw guide gives 1246 ("the first
  reliable documentary reference" [S8]) and medievalheritage "1245 or 1246" [S10]. Which year is not settled here.
- **The 1287 siege is documented outside the excavation**: the *Annales Cambriae* have the English besiege "castrum
  ipsius Resi de Deresloyn" "circa gulam Augusti" (about 1 August) and take it by undermining the walls, William de
  Monchensy being crushed "sub muro" [S21]; Trivet has Earl Edmund besiege "castrum de Druselan" and mine its walls, and
  William de Monte Canisio with many knights and squires crushed by their fall [S22]; Wykes has the mine's props give way
  under English knights inspecting it, with Monchensy among the dead, at a castle one manuscript names as Dryslwyn (the OCR reads "Dyrysliryn") [S23].
  **When the siege began is contested** (about 1 August, *Annales Cambriae* [S21]; "on or just after the 15 August", the
  Cadw guide [S9]), and so is its length ("two weeks", Cadw's visitor page [S26]; "three-week", the listing [S3]); it had
  fallen "by 5 September" [S9]. Where the wall fell is tradition only: "near the projecting chapel block" [S9].
- **Today's standing heights were measured** [S24]: the apartment block's south façade to 74.1m OD and the chapel tower
  to 74.9m OD, each 12-14m above the slope at its foot (60-62m); the east curtain by the latrine to 73.9m; the keep's ring
  to 74.6m; the hall's excavated undercroft floor at 65.2m; the highest ground, a bedrock outcrop east of the keep, 73.0m; the floodplain
  below the hill 16.8m. The rest "is mostly reduced to footings" [S1]; the inner curtain "survives at no more than 1m
  high" [S3].
- **The ruin before the excavation** had two tall fragments on the summit: an aquatint of about 1795 [S27] and an
  engraving of 1872 [S28] show them, agreeing with the Cadw guide's demolition "apart from two prominent sections on the
  south side" [S8].
- **Whether anything stood on the hill before the castle is contested**: the scheduling report says the castle "has
  been built over an earlier Iron Age hillfort" [S4]; the HER has a second record at the castle's reference typed
  "Medieval - Motte" [S6]; Coflein says "Roman material recovered from the hill hints at the existence of an earlier
  settlement" [S2]; the Cadw guide says "suggestions that prehistoric fortifications possibly underlie the medieval
  castles are not borne out by any evidence" [S8]. Nothing is drawn for it.

## Placement

| Point | Grid reference | Source | Note |
|---|---|---|---|
| Coflein (the castle) | SN 55387 20288 = E 255387, N 220288 | [S1] | **The feature's `at`**: on the inner ward, inside the east end of the great hall as fitted |
| Cadw listing 10934 | E 255403, N 220365 | [S3] | 79m north of Coflein's, where Caple's plan draws the settlement [S13], not on the castle |
| Cadw scheduled monument CM030 | E 255436, N 220365 | [S4] | 91m north-east, just west of the outer ward's west wall; perhaps the scheduled area's centre (an inference) |
| HER PRN 699 and 4319; Gatehouse 217 | SN 55402035 (10m) | [S5][S6][S7] | 63m north |
| Coflein's borough (NPRN 109584) | SN 55420 30370 | [S2] | 10km north of the hill; probably a slip for N 220370 (`models:S2`, unchanged) |
| Keep centre | E 255404.0, N 220297.5 (to about a metre) | [S24] | The ring of the standing wall on the surface model, read off the heights; a least-squares circle through the wall-top cells above 73.5m gives E 255404.8 N 220297.8 (radius 4.5m, the middle of the wall top), the hollow's centroid E 255404.5 N 220298.6 |
| Highest ground | E 255422.5, N 220303.5, 73.0m OD | [S24] | About 19m east of the keep, on the bedrock the period plan hatches between the inner gate and the middle ward's south-east wall [S11]; medievalheritage's "rocky elevation, originally slightly higher, but reduced during the English occupation" [S10] may be it (an inference) |
| The great hall's undercroft floor | 65.2m OD | [S24] | Flat, excavated, about 7m below the ground at the keep |
| Floodplain south of the hill | 16.8m OD (median) | [S24] | |

**Plan frame for the model** (proposed): metres east (x) and north (y) of Coflein's point, true size, true height, grid
north. The plan drawing's north arrow is 3 degrees off grid north once fitted; the fit, not the arrow, is used. Every
coordinate in "Plan for the Blender model" is in this frame: the keep's centre from the survey, everything else from
the period plan [S11] fitted to the survey [S24] at 7.5 px/m and -3 degrees, pinned at the keep.

The castle lies **outside the app's LiDAR region** (E 260000-265000, N 220500-224500, `tools/terrain/lidar-areas.json`),
4.6km west of it and about 210m south of its southern edge, so today it stands on OS Terrain 50 alone. See the LiDAR area proposed
under "Plan for the Blender model".

## The site

- **The hill.** "The shattered ruins of a medieval castle crown the ultimate summit of a dramatically isolated and abrupt
  hill rising from the Tywi floodplain" [S1]. Measured [S24]: the hill rises from the floodplain at about 17m OD to
  73.0m, about 56m; above 30m OD it is roughly 300m east to west and 250m north to south (about E 255300-255600,
  N 220250-220500), with the castle on its southern summit and the borough on the lower northern one. The castle "occupied the southern, rocky promontory of the
  hill, where high, steep slopes descending to the river protected the castle from the south", and "the only more
  convenient approach was from the gently sloping northeastern part of the hill" [S10]; the three wards "stretched along
  the eastern and southern edge of the hill while the rest of the hilltop was occupied by a settlement" [S20].
- **The bedrock** is the Mydrim Limestone Formation, "Limestone", Ordovician (Caradoc), on the BGS 1:50,000 map (sheet
  230, Ammanford) [S25]. The listing calls the walls "limestone rubble" [S3]; that the stone came from the hill is
  medievalheritage's statement ("building material in the form of limestone was extracted from the hill" [S10]), and the
  bedrock agrees.
- **The borough.** "the borough received its charter in 1281" (Coflein [S2]); the scheduling report: "In 1281 a charter
  was granted allowing a four-day fair at Dryslwyn around St Bartholomew’s Day" [S4]; 34 burgages within the walls and
  14 in "Briggestrete" by the mid-14th century, "abandoned by the seventeenth century", "enclosed by strong ramparts and a
  stone wall, now buried in the earthworks that girdle the summit. There were two gates" [S2]; "The town walls probably
  stood up to 2.1m high. The town ditch was over 5m wide and 2.5m deep" [S4]; houses "10-11 meters long and 4.6 meters
  wide" [S10]. Caple's plan draws the town ditch round the north of the summit and the town wall inside it [S13]; on the
  terrain model the ditch is visible as a curving scarp round the north side at about N 220400-220430 [S24]. Whether the
  town wall was Welsh (1280s) or English (after 1287) is contested (`models:S1`, `models:S3`; [S1], [S10]). The borough is
  outside this note's model; it is a candidate feature of its own.
- **Before the castle (contested).** See the Summary: an Iron Age hillfort under it [S4], a motte [S6], Roman material
  [S2], against "not borne out by any evidence" [S8]. The HER's motte record gives no description; its sources are air
  photographs (1955, 1978-79) and the RCAHMW's 1917 inventory [S6], which was not read.

## Phase 1: Rhys Gryg's castle (late 1220s to the mid-13th century)

- **Date and builder (contested).** "founded in the late 1220s by Rhys Gryg for his son Maredudd ap Rhys, the first Lord
  of Dryslwyn" [S20]; "Rhys Grug built Dryslwyn Castle ... in the 1220s" [S3]; "founded by a local Welsh prince in the
  second quarter of the thirteenth century" [S1]; "probably raised during the second quarter of the 13th century" [S8];
  "around the beginning of the second quarter of the 13th century by Rhys Gryg ... or possibly by his successors" [S10].
  The excavation's own dating is the late 1220s; the builder is Rhys Gryg in the excavation's family and "possibly by his
  successors" in medievalheritage. First recorded 1245 or 1246 [S21][S8][S10].
- **What it was.** "The first castle was a simple round tower and polygonal walled enclosure, within which were
  constructed a kitchen, prison and wood-framed, clay-floored great chamber beside a great hall" [S20]; "a round keep
  with adjacent gateway, and a sub-triangular ward containing a great hall and other buildings" [S3]; "a simple gateway
  entrance on the north-east side", "open ground and bedrock to the north, and a small cluster of wooden buildings to the
  east", a kitchen south of the hall, a prison "In the north-west corner, between the great hall and the curtain wall"
  [S8].
- **The curtain.** An irregular pentagon on the hilltop [S10][S11][S12]: "The defensive wall was battered" and "A
  wall-walk hidden behind the parapet, likely functioned in the crown" [S10]; a postern in the south wall "accessible via
  a few steps carved into the floor of the courtyard" [S10]. Fitted outline under the plan. Height not stated; Caple's
  section of the hall draws the south curtain about 9.5m above the ground outside it [S15].
- **The keep.** On the east side, "projecting only about one-third of its circumference from the adjacent curtain
  walls" [S10]; "the original keep that occupies the highest ground. It was originally entered at first floor level from
  external steps built above a broad NW buttress" [S3]; "Originally, the tower contained at least three storeys, with
  wooden stairs leading to the first floor from the northwest" and "Access to the lower storey was originally through
  an opening in the floor of the upper storey" [S10]; "access into the tower would have been by way of an internal
  ladder down from the first floor" [S4]. Size and heights in the Summary and the parts table.
- **The gate.** "This was a straight and narrow passage typical of Welsh castles, preventing entry on horseback" [S10],
  at the north-east corner beside the keep [S3][S8][S10]; at first "an ordinary doorway in the wall, closed by a bar and
  flanked by a keep", reached by stone steps [S10].
- **The great hall.** First-floor hall over a basement: "The great hall was located on the first floor, above the ground
  floor, whose massive pillar supported the fireplace above and the wooden ceiling" [S10]; "The original great hall
  survives at basement level and has a segmental-headed doorway in the N wall, with former narrow window to its L, and in
  the centre the stone foundation of the hall fireplace" [S3]. Caple's section draws it about 9.8m wide outside, its
  undercroft about 2.5m high, the hall above about 3.5m to the eaves, and a steep roof about 4.8m high [S15].
- **The great chamber (timber).** "wood-framed, clay-floored" [S20]; "a quadrangular building with a clay floor and
  half-timbered walls" to the south-east of the hall [S10]. Rebuilt in stone in the mid-13th century [S20].

## Phase 2: the middle ward (mid-13th century)

- **Date and builder (contested).** "In the mid 13th century a second ward was added and the great chamber rebuilt in
  stone" [S20]; "Mid-Thirteenth Century: Phase 2" [S11][S12]; Maredudd ap Rhys, who held the castle from 1233, "built a
  second hall at right angles to the original, and added a second ward on the NE side" [S3]; medievalheritage: "In the
  mid-thirteenth century, Rhys ap Maredudd expanded the outer bailey on the north-eastern side (later the middle ward)"
  [S10], though in its own history Rhys ap Maredudd inherits only in 1271 [S10]; Coflein: "In the later thirteenth
  century two further walled courts were added" [S1], putting the middle ward with the outer. **Contested: mid- or later
  13th century, and Maredudd or Rhys.**
- **The ward.** "virtually doubling the overall size of the stronghold" [S8]; "an irregular shape, close to a pentagon,
  measuring approximately 70 x 30 meters, made of short, straight sections of wall" [S10]; fitted, about 52m east to west
  [S11][S24]. Its gate: "a regular portal opened in the eastern wall" [S10], the "Middle Gate" of the plan [S11]. Inside,
  "a large hall built up against the western defences of the ward itself" (excavated) [S4]; "an oblong building in the
  western part of the courtyard" [S10].
- **The great chamber in stone**, east of the hall at right angles [S3][S20]: "Initially, it had one floor, then two in
  the later 13th century" [S10].
- **The inner gate's foregate (date contested).** "After the extension, an unroofed foregate with a portcullis and a
  door was added" [S10] (mid-13th century); the listing has the gatehouse "rebuilt" by Rhys ap Maredudd after 1271 [S3];
  the period plan colours the gate's works late 13th century [S11].

## Phase 3: Rhys ap Maredudd's castle (1283-87)

- **Date.** "This castle was greatly expanded in the period 1283-87 by Rhys ap Maredudd" [S20]; "perhaps after the war of
  1282-3" [S3]; "almost certainly Rhys ap Maredudd who further enlarged and improved
  the castle in the 1280s" [S8]; "Late Thirteenth Century" [S11][S12]. The excavation's dates are the narrowest; the outer
  ward is before the siege in every source read (Coflein's "twice expanded before, in 1287" [S1]).
- **What was built** [S20]: "an Outer Ward and gatehouse. He also rebuilt much of the Inner Ward, adding an extra storey
  to the great hall and great chamber, apartments and a chapel." The Cadw guide: "substantial walls were raised
  overlooking the Tywi; the hall (later described as ‘the King’s Hall’) was remodelled; a series of apartments was built
  adjoining the hall, with a projecting chapel tower at the eastern end; and there was a newly mortared courtyard at the
  centre of the complex" [S8]. The scheduling report has the hall "remodelled in the 1280s to accommodate two upper
  storeys" [S4], where the monograph says "an extra storey" [S20]: **one or two storeys added, contested**; Caple's later
  section draws one (undercroft, hall, apartments) [S15].
- **The apartment block**: "a former 2-storey apartment block, built outside the line of the original curtain wall",
  its battered wall with "2 pointed windows in the lower storey and the jamb and embrasure of a third, while in the upper
  storey a single similar opening survives" [S3]; "large windows pierced in the thickened southern wall and flanked by
  side stone benches set in recesses" [S10]; the south curtain "thickened and raised" [S10].
- **The chapel tower**: "a quadrangle projecting beyond the perimeter of the walls, on a platform that had previously
  housed the entrance to the postern", "Its upper-story walls were pierced with three narrow, pointed windows" [S10];
  "The chapel was at first-floor level where there are the remains of 3 lancet windows" [S3]. Caple's elevation of its
  south wall (from inside) draws three identical lancets "projected from surviving splay of reveals" and a "probable
  floor level" near 70m OD on its scale [S16].
- **The east curtain and latrine**: "on the E side part of the curtain wall was remodelled in the late C13, and
  incorporates a garderobe reached up stone steps and with 2 shafts" [S3].
- **The outer ward and gatehouse**: "fortified with a 1.8-meter-thick stone defensive wall, preceded by a ditch from the
  north. The entrance led through a four-sided gatehouse from the north. It had only two floor, with the lower gate
  passage accessible on a timber bridge (perhaps a drawbridge) over the ditch. The passage itself was secured by two
  portcullises and two doors" [S10]; "The outer ward would have contained the stables, stores and halls/houses providing
  accommodation for soldiers and officials" [S4]; "A large building stood out from the west of the outer ward, but its
  purpose remains unknown" [S10]; "In the outer ward masonry of the NE gatehouse includes stone steps to a former wall
  walk" [S3].

## The siege of 1287

Already in the app as `dryslwyn-siege` (`timeline:S35`, `medieval:S22`, `medieval:S23`). What it adds for the model:

- **Mining is documented three times outside the excavation**: the *Annales Cambriae* ("muros subfodiendo"; Monchensy
  "oppressus est sub muro") [S21], Trivet (the walls undermined, their fall crushing Monte Canisio "aliique milites
  plurimi et scutiferi") [S22] and Wykes (the mine's props "nimis tamen debilibus", the earth falling on the English who
  had gone in to inspect it) [S23]. So the fall is the mine's collapse with the wall above it; **where** it was is
  "Tradition" only: "near the projecting chapel block" [S9].
- **The trebuchet** "cost £14", worked by "20 quarrymen and 24 carters" [S9]; "Two substantial stone balls, over 16
  inches" were excavated [S9]; the monograph: "damage inflicted by a trebuchet and mining of the walls" [S20].
- **Dates (contested).** Begun about 1 August ("circa gulam Augusti" [S21]) or on or just after 15 August [S9]; lasting
  "two weeks" [S26] or three weeks [S3][S8]; fallen "by 5 September" [S9] (medievalheritage: "The castle garrison
  surrendered on September 5, 1287" [S10]).
- **Repairs**: "repairs were carried out shortly afterwards" [S9]; "Dryslwyn was handed over to Alan Plucknet, who made
  the necessary repairs and expansion of the castle" [S10].

## Phase 4: the Crown's castle (1287 to the early 15th century)

- "Throughout the 14th century the English Crown garrisoned and repaired the castle, supervised by an appointed
  constable, before it was surrendered to Owain Glyn Dwr in 1403" [S20]; "there was very little new building" [S8]; "Repairs
  were carried out around 1338-1339, and again after 1343" [S10]; the hall "referred to in the 14th century as the ‘King’s
  Hall’" [S4].
- **Parts that belong here**: the middle gate's "significant thickening of the wall, probably created after the siege of
  1287" [S10]; the keep's ground-floor door, "A doorway with segmental stone head, opening to the undercroft, is a later
  insertion" [S3], "Later, probably in the 14th century, a new portal was made to the ground floor directly from the
  courtyard level" [S10]; "relics of a small fourteenth-century half-timbered building" on the platform by the inner gate
  [S10]; "traces of basement houses from the end of the 13th and the beginning of the 14th century" in the middle ward
  [S10].
- **1403 and after (contested).** Surrendered to Glyndŵr in 1403 [S20][S3][S10]; "remained in rebel hands for some 3
  years" [S3]; the constable surrendered it "in 1403", and "Rhys ap Gruffudd, who surrendered to the king in 1409" [S10].

## Phase 5: walled up, looted, burnt and demolished (15th century, contested)

- **Walled up.** "During the early to mid 15th century the castle was deliberately walled up to deny its use to a
  potential enemy and it was subsequently looted and demolished" [S20]; "The castle was very deliberately decommissioned
  in the early 15th century. The passage through the outer, or main gatehouse was walled up, and access into the basement
  of the round tower was also blocked. The site was then looted, with hinges taken from the main doors, and even the
  stone treads removed from steps" [S8]; Coflein: "decommissioned in the early fifteenth century and decayed thereafter"
  [S1].
- **By whom (contested).** "very probably carried out by the English forces that retook the castle following its
  surrender to Owain Glyndwr in 1403" [S8]; "almost certainly fell into disuse at that time, perhaps as a result of
  deliberate destruction by Glyndŵr’s retreating forces" [S10]; the listing: "probably largely demolished to prevent its
  future use by hostile forces" [S3].
- **Burnt, then demolished (undated).** "At a later date, the castle was deliberately put to the torch, with very
  extensive archaeological evidence to show that all the major buildings were burnt to the ground. Demolition of the
  upstanding walls followed, apart from two prominent sections on the south side" [S8]. No source read dates the fire or
  the demolition; the monograph's garrison period ends in **1455** [S20], which is the excavator's period boundary, not a
  stated date for either. medievalheritage: "it was recorded in official grants until the early 16th century" [S10],
  which says it was still held, not lived in.

## Phase 6: the ruin (to 1980) and the excavated ruin (1980 to today)

- **Before the excavation.** The aquatint "Drysllwyn Castle with Gronger Hill" (drawn by James Baker, engraved by J.
  Bluck, about 1795, National Library of Wales) shows the bare hill above the Tywi with two tall ruined masses on its
  summit [S27]; the engraving in Thomas Nicholas's *Annals and antiquities* (1872), p. 280, shows the same, with lower
  fragments beside them [S28]. "Fortunately, Dryslwyn was not excavated in the 19th century, or even in the first half
  of the 20th century, so the ruined parts of the castle have survived underground" [S10].
- **The excavation**, 1980-95, by Chris Caple (and Peter Webster at first) [S7][S20]; the HER lists it as event DAT89307,
  "Dryslwyn Castle (year : 1980-95)" [S5]. "It has recently been excavated and the remains are consolidated for public
  display" [S1].
- **Today.** "Otherwise the castle is mostly reduced to footings" [S1]; "Only the south-west corner with the south wall
  has survived from the castle, in which remains of windows and fragments of a four-sided tower, originally housing the
  chapel, are visible. The remaining buildings show only the foundations reaching in the highest places up to a few
  meters" [S10]; "Of the middle and outer walls there is only a small amount of masonry visible, mainly associated with
  the middle and outer gates" [S3]. Standing heights measured in the Summary [S24]. Cadw looks after it; entry is free
  [S26].

## The parts, as recorded

Coordinates are in the plan frame (metres east and north of Coflein's point). "Fit" means the period plan [S11]
fitted to the survey [S24]; "measured" means the survey itself.

| Part | What the sources say | Measured or fitted here | Tier |
|---|---|---|---|
| Keep | Above; about 12m [S10]; walls some 3m at the base [S4]; battered/flared base [S10][S14]; at least three storeys [S10]; first-floor door, external timber stair over a NW buttress [S3][S10] | Centre (17.0, 9.5) measured; base about 12m (12.4 fit, 12.1 Caple's section, about 12 on the surface model); inside 5.1-5.5m (section, plan), the surface model's hollow 4-5m; above the flare about 9m across (section only); top of the standing ring 74.6m OD, inside floor 72.3m, ground round it 70.4-72.2m [S11][S14][S24] | Place and base size documented (survey and plan); the 9m upper body, 16m height, storey heights and roof **reconstructed (one source: Caple's section)** |
| Inner curtain (Phase 1) | Polygonal, battered, with a wall-walk "likely" [S10]; "no more than 1m high" today [S3] | Outer face: NW angle (-15.8, 14.8), north wall to the gate at (20.9, 23.1); from the keep's south-west side (11.2, 12.0) down the east side by (13.4, 3.9) to (9.6, -11.0); south wall from about (2.1, -13.3) (the postern lies between) to the SW angle (-19.9, -3.1). Drawn about 1.5m thick on the west, about 2m on the north [S11] | Outline documented (one source: Caple; the survey shows standing wall only on the east and south); height reconstructed (Caple's section, about 9.5m on the south) |
| Inner gate | NE corner beside the keep; first a barred door, then a foregate with portcullis [S10]; "steps to a wall walk", "the portcullis slot remains visible and the passage is cobbled" [S3] | Between the north wall's end (20.9, 23.1) and the keep; the late works round it at (24.1, 23.9) and the stair building from (26.3, 20.6) to (27.2, 11.8) [S11] | Place documented (one source: Caple); the foregate's date contested |
| Postern | South wall, steps cut in the courtyard floor [S10]; later under the chapel [S3][S10] | In the south wall between (2.1, -13.3) and (10.0, -11.0) [S11] | Documented (one source: Caple) |
| Great hall | First floor over an undercroft with a central hearth pillar [S3][S10]; raised by one storey [S20] or two [S4] in the 1280s; slate roof, cinquefoil-cusped window in the north wall [S4] | Outer corners NW (-16.3, 10.6), NE (5.0, 3.0), SE (1.3, -5.1), SW (-17.1, 2.5): about 22.6 x 8.9m, the long axis 22 degrees south of east [S11]; a cross wall near the west end at (-13.1, 7.1)-(-15.7, 1.0) [S11]; undercroft floor 65.2m OD [S24]; Caple's sections: about 9.5-9.8m wide, eaves about 5.9m above the undercroft floor at first and 7.3m after the 1280s [S15] | Plan documented (one source: Caple); the floor is measured; heights reconstructed (one source: Caple's sections) |
| Prison | "In the north-west corner, between the great hall and the curtain wall" [S8]; floor "sunk down below the courtyard level" [S4] | About (-18.1, 14.5) to (-14.3, 9.3) [S11] | Documented (one source: Caple) |
| Kitchen | A small stone building south of the hall [S8]; "initially wooden, then stone" [S10] | About (-7.0, -4.8) to (0.3, -10.5) [S11] | Documented (one source: Caple) |
| Great chamber | Timber, then stone (mid-13th c.), one storey, then two (later 13th c.) [S20][S10] | NW (4.1, 4.4), NE (12.5, 3.5), SE (9.5, -11.0), SW (2.4, -11.6): about 15 x 8.5m [S11] | Documented (one source: Caple); heights reconstructed |
| Apartment block | Two storeys, outside the old curtain, battered façade with a return at its west end [S3]; windows with seats [S10] | South face from the west end (-22.9, -6.1) by (-12.0, -10.7) to (0.4, -15.9); west return to (-23.0, -2.9); north side about (-22.3, -2.3) to (0.8, -8.8); façade drawn about 2.5m thick [S11]; standing to 74.1m OD over 60-62m outside [S24] | Documented (stands: survey [S24] and the 1795 and 1872 views [S27][S28]); the 1280s date one source: Caple |
| Chapel tower | Projecting at the SE, chapel at first floor, three lancets [S3][S10][S16] | SW (4.3, -17.3), SE (13.5, -15.0), NE (12.7, -10.1), NW (3.4, -13.2): about 9.5 x 4-6m [S11]; standing to 74.9m OD [S24] | Documented (stands, survey); form one source: Caple |
| East curtain and latrine | Remodelled late 13th c., garderobe with 2 shafts [S3] | The late wall from about (18.3, 4.1) south to the chapel; the latrine near (18.1, 0.1) [S11]; standing to 73.9m OD [S24] | Documented (stands, survey) |
| Middle ward | Mid-13th c. (contested) [S20][S3][S1]; "approximately 70 x 30 meters" [S10] | Outer face: W angle (9.2, 44.2), N apex (26.4, 47.9), NE corner (60.7, 38.8), east wall with the Middle Gate between (60.5, 32.5) and (60.4, 30.5), SE corner (60.2, 26.8), the south-east wall to the keep's east side at (28.4, 8.4); the west wall from the W angle to the gate at (18.1, 23.7). Walls drawn about 2-2.3m thick [S11] | Line documented (one source: Caple; "only a small amount of masonry visible" [S3]); size contested (52m long fitted, against 70m in a text) |
| Middle ward hall | "a large hall built up against the western defences" [S4] | About (12.8, 42.4) to (26.6, 26.3) [S11] | Documented (one source: Caple); height unknown |
| Middle gate | A plain portal in the east wall, thickened to the north "probably created after the siege of 1287" [S10] | Gap (60.5, 32.5)-(60.4, 30.5), about 2m; the thickening to about (61.3, 38.8) [S11] | Documented (one source: Caple) |
| Outer ward | 1.8m wall, ditch on the north [S10]; stables, stores, halls [S4]; a large building on the west [S10]; "a thick, angled wall protecting the northern corner of the middle ward" [S4] | Outer face: from the middle ward's north wall at (50.2, 43.3) by (54.7, 59.1) and (64.3, 76.3) to the gatehouse (76.1-81.5, 78-80); east wall from about (89.1, 77.9) by (86.0, 50.8) and (74.4, 34.1) to the middle ward's SE corner; west range about (60.5, 61.2)-(63.3, 46.7); the thick angled wall about (63.4, 39.3) [S11]. East wall drawn about 1.9m, west wall 2.5-3.3m [S11]; a platform with an east scarp at about x 80-83 on the terrain model [S24] | Line documented (one source: Caple), the terrain's platform agreeing to about 4m; stone wall one source: Caple |
| Outer gatehouse | Four-sided, two floors, two portcullises and two doors, timber bridge over the ditch, vaulted passage, stair [S10]; steps to a wall walk survive [S3]; its passage walled up in the 15th century [S8] | About (81.5, 80.3) to (86.7, 71.5), about 5.5 x 8.5m [S11], ±4-5m | Documented (one source: Caple); height reconstructed (two floors) |

### Materials, as far as recorded

- **Stone.** "A ruined castle of limestone rubble walls" [S3]; limestone "extracted from the hill, some of which was
  melted to obtain mortar for the walls. Imported red sandstone was also used for architectural details" [S10]; bedrock
  Mydrim Limestone [S25]. Caple's elevation draws the chapel tower's wall as coursed rubble of flat stones with "flush
  faced stonework" low down [S16]. The red sandstone's source is not stated.
- **Render and limewash.** "By the late 13th century, the castle had a white rendered and lime-washed appearance" [S20].
  One source (Caple), but a direct statement, not an analogy. Both artists' reconstructions paint the walls white
  [S18][S19], which is the artists' reading of the same evidence. Whether the first castle (1220s) was rendered is not
  stated; the monograph says "By the late 13th century".
- **Roofs.** The hall's "roof was made of slate" [S4]; "nails, sheet lead, slates" recovered [S20]. Which other roofs
  were slate, and where the lead was, is not stated. The reconstructions draw grey slate on every roof [S18][S19], Davis
  grey roofs too [S17].
- **Windows and interiors.** "a fine window with cinquefoil cusps" in the hall's north wall [S4]; "reconstruction of
  red sandstone windows from the north wall of the great hall" (a caption on medievalheritage, the drawing not viewed)
  [S10]; "the lord's and guest apartments had decorative wall paintings and glazed windows" [S20].
- **Timber.** "charred beams still in situ" [S20]; the first great chamber "wood-framed" [S20]; floors and roof trusses in
  Caple's sections [S15] (reconstructed).

## Images and drawings

Reference copies are in [`refs/dryslwyn/`](refs/dryslwyn/) (`docs/` is not served by the app). Only public-domain and
open material is copied; the Cadw and Caple plans and drawings are **not** (Cadw's are Crown copyright, Caple's are his
and his publisher's, and none is part of the GitHub issues for which Dewi waived licence checks), and are linked instead.

| Item | What it shows | Credit and licence | Copied |
|---|---|---|---|
| Period plan [S11] | The castle in three date bands with labels; no scale bar | After Rees, Caple and Cadw, reproduced by medievalheritage.eu. Crown copyright | No: measured and fitted, linked |
| Phase plans [S12] | Early/mid, mid and late 13th century; 15m and 50ft bars | As above | No |
| Plan of castle and town [S13] | The castle, the town wall, ditch, roadways and house platforms; 80m bar | After Chris Caple, via medievalheritage.eu | No |
| Keep reconstruction [S14] | Section with storey heights, 11m and 16m dimensions, the flare; sketch with a conical roof | After Chris Caple, via medievalheritage.eu | No |
| Hall sections [S15] | The hall, undercroft and kitchen, early and late 13th century; 5m bars | After Chris Caple | No |
| East wing and chapel [S16] | Longitudinal section; elevation of the chapel tower's south wall with an OD scale; 3m bar | After Chris Caple | No |
| Reconstructions [S17][S18][S19] | Davis's two phases from the north-east (an early timber outer enclosure); Jones-Jenkins's first castle and the south range cut away | Paul R. Davis; Chris Jones-Jenkins for Cadw | No |
| `baker-bluck-c1795-with-grongar-hill.jpg` | The hill from across the Tywi, two ruined masses on top | James Baker (drawer), J. Bluck (engraver), about 1795, National Library of Wales, via Wikimedia Commons; public domain [S27] | Yes |
| `nicholas-1872-dryslwyn.jpg` | The hill with ruined fragments on its summit | Thomas Nicholas, *Annals and antiquities of the counties and county families of Wales* (1872), p. 280, Internet Archive Book Images via Wikimedia Commons; no known restrictions [S28] | Yes |
| `lidar-dsm-with-fitted-plan.png` | The surface model with the fitted plan's coordinates drawn over it | Made here from Welsh Government LiDAR (tiles SN5520, SN5519; OGL v3) [S24] and this note's coordinates, not the plan image | Yes |

## Contested points (kept contested)

1. **The founding date and builder**: the late 1220s by Rhys Gryg for Maredudd (excavation [S20]; listing "1220s"
   [S3]), the second quarter of the 13th century (Coflein [S1]; Cadw guide "probably" [S8]), or Rhys Gryg "or possibly by
   his successors" [S10].
2. **The first record**: 1245 (Gatehouse's list [S7]) or 1246 (the Cadw guide [S8]; the 1860 edition prints manuscript
   C's note under 1246 [S21]); medievalheritage "1245 or 1246" [S10].
3. **The middle ward**: mid-13th century (excavation, Cadw plans, listing) or "later thirteenth century" (Coflein); built
   by Maredudd ap Rhys (listing) or Rhys ap Maredudd (medievalheritage, inconsistently with its own history)
   [S20][S11][S3][S1][S10].
4. **The middle ward's size**: about 70 x 30m (text [S10]) against about 52m long and up to 25m wide, fitted [S11][S24].
5. **The inner gate's foregate**: mid-13th century [S10] or rebuilt after 1271 [S3] (the plan colours its works late 13th
   century [S11]).
6. **How many storeys the 1280s added to the hall**: one [S20][S15] or two [S4].
7. **The keep's form above the base**: about 9m across above a flared base on Caple's section [S14], against plans and
   texts that give only the base (about 12m) [S10][S11]; its height is reconstructed only (16m [S14]).
8. **The siege's start and length**: about 1 August [S21] or from 15 August [S9]; two weeks [S26] or three [S3][S8].
9. **Where the mined wall fell**: by the chapel block, on "Tradition" only [S9].
10. **Who walled the castle up, and when**: the English after retaking it, after 1403 (Cadw guide [S8]), Glyndŵr's
    retreating forces, about 1409 (medievalheritage [S10]), "the early to mid 15th century" (excavation [S20]), "the
    early fifteenth century" (Coflein [S1]).
11. **When it was burnt and demolished**: not dated by any source read [S8][S20].
12. **What was on the hill before**: an Iron Age hillfort [S4], a motte [S6], a settlement with Roman material [S2], or no
    evidence of any earlier fortification [S8].
13. **The borough wall**: Welsh in the 1280s or English after 1287 ([S1], [S10]; already in `building-models.md`).
14. **The early castle's outer enclosure**: Davis draws a timber palisade and gate round a large outer ward in the first
    phase [S17]; Jones-Jenkins draws the first castle with none [S18]; no text read mentions one.

## Gaps

- **Caple's monograph** (2007, 370 pages) was not read beyond its abstract and contents [S20]. It holds the measured
  plans, the sections and the evidence for every height, the roofs, the render and the phase dates. It is the one source
  that would turn most "reconstructed" rows here into documented ones, and would show which of the Cadw-family claims are
  Caple's evidence and which are the guide's readings.
- **Not read**: the Cadw guide itself (Rees and Caple 1999, 2007); Webster 1987 in *Castles in Wales and the Marches*;
  Caple 1990 in *Château Gaillard* 14; Caple 2008 in *Current Archaeology* 223; the interim notes in *Archaeology in
  Wales* 20-23 and *Medieval Archaeology* 25-29 (the Archaeology Data Service refused automated reads); Colvin and others,
  *The History of the King's Works* (1963), pp. 641-2 (the Crown's repairs); RCAHMW's 1917 Carmarthenshire inventory,
  p. 155-6, no. 452 (the pre-excavation description, and the source of the HER's motte record); Kenyon 2010, pp. 71-3;
  Davis 2007, 2011, 2021.
- **Heights**: no source read gives a medieval height for any curtain, the middle or outer ward walls, the gatehouses or
  the chapel tower; the keep's and the hall's are Caple's reconstructions only.
- **The outer gatehouse's plan** in detail (the passage's line through it) and the gate's place against the ditch.
- **The borough**: the town wall's line and gates, read off Caple's plan [S13], which was overlaid on the terrain model
  but not fitted (it drew a little small at its bar's scale); the borough is not part of this model.
- **Which roofs were slate**, where the sheet lead was, and the colour of the red sandstone.
- **The date of the fire and the demolition.**
- **The motte record's basis** (HER 4319 has no description; RCAHMW 1917 and the air photographs are its sources).
- **Phase-by-phase panels**: only the period plan [S11] has been fitted; the three phase panels [S12] were measured
  only for the keep (and their bar), not fitted.

## For the owner's decision

- **Scale.** Today the castle is a `landscape` plan drawn 2.6 times larger at a guessed 40 degrees. Claude's
  recommendation, under the proactive mandate: true size and height, from the fitted plan, as the forts and (proposed)
  Dinefwr. The castle is then about 112 x 97m on a 56m hill.
- **White.** The excavation says the castle was rendered and limewashed white by the late 13th century [S20]. Claude's
  recommendation: draw every standing phase from 1283 white (documented, one source: Caple), the first two phases bare
  limestone rubble with the ⓘ saying render is possible and not stated for them, and the ruins bare grey limestone.
- **Phases.** Seven features are proposed below where the app has four. The two that are new to the app are
  `dryslwyn-crown` (the post-1287 parts) and `dryslwyn-walled-up` (the decommissioned castle before its burning); either
  could be folded into its neighbour, at the cost of drawing the 14th-century door and the middle gate's thickening
  before they were built, or the blocked gates after they were.
- **The LiDAR region.** The castle is outside the one LiDAR region; a second region (or a much larger one) is a change
  to the build, proposed below.

## Plan for the Blender model

Proposed by Claude under the proactive mandate (ADR 0027). It follows the forts and `dinefwr-castle.md`: one feature per
phase, every part with an id, a name, its own provenance and its kits; ground parts (the hill, the ditches) stay
procedural on the terrain (ADR 0053, point 5). Coordinates are metres east and north of Coflein's point (E 255387,
N 220288), true size, grid north. **Every number not marked "measured", "fitted" or quoted is an estimate and is marked
so.** Heights are above the ground at the part's foot unless an OD height is given; the hill falls about 7m across the
inner ward alone (72m at the keep, 65m in the hall's undercroft), so the build must fit each part to the drawn ground,
as the forts' glTF is (ADR 0053).

An id names one physical part for good, so the same id appears in every phase that has that part (the keep is
`dryslwyn/keep` throughout).

**Phases and dates (proposed):**

| Feature id (proposed) | Years | Basis |
|---|---|---|
| `dryslwyn-first` | c. 1225 to c. 1250 | "the late 1220s" [S20], "the 1220s" [S3], "the second quarter" [S1][S8]: c. 1225 is the app's existing date, an estimate inside the range; first recorded 1245-46 [S21]. Ends at the middle ward, "mid 13th century" [S20] |
| `dryslwyn-two-wards` | c. 1250 to 1283 | The middle ward and the stone great chamber, "mid 13th century" [S20][S11]; contested against Coflein's "later thirteenth century" [S1]. Ends at the excavation's 1283 [S20] |
| `dryslwyn-castle` | 1283 to 1287 | "the period 1283-87" [S20]; the listing's "perhaps after the war of 1282-3" [S3]. Ends at the siege (fallen by 5 September 1287 [S9]) |
| `dryslwyn-crown` | 1287 to c. 1410 | The Crown's garrison castle with its post-siege parts [S20][S10]; surrendered 1403 [S20]; the end is the walling-up, contested between after 1403 [S8], about 1409 [S10] and "the early to mid 15th century" [S20]; c. 1410 is an estimate |
| `dryslwyn-walled-up` | c. 1410 to c. 1455 | Gates and the keep's basement blocked, looted [S8][S20]; then burnt and demolished at an undated "later date" [S8]. **c. 1455 is an estimate**: the end of the monograph's garrison period [S20], not a date any source gives for the fire |
| `dryslwyn-ruin` | c. 1455 to 1980 | Demolished but for "two prominent sections on the south side" [S8], as the 1795 and 1872 views show [S27][S28]; the rest buried under turf [S10] |
| `dryslwyn-excavated` | 1980 to now | Excavated 1980-95 and consolidated [S20][S1]: today's footings and standing walls at their measured heights [S24] |

The dates join with no gap: c. 1225, c. 1250, 1283, 1287, c. 1410, c. 1455, 1980, now. Every boundary except 1287 and
1980 is contested or estimated, and the ⓘ says so. The existing events (`dryslwyn` at c. 1225 and `dryslwyn-siege` in
1287) keep their dates.

**Phase `dryslwyn-first`.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dryslwyn/curtain-inner` | wall, outer-face path NW angle (-15.8, 14.8), north to the gate (20.9, 23.1); then from the keep's south-west (11.2, 12.0) by (13.4, 3.9) to (9.6, -11.0), along the south wall by (2.1, -13.3) (the postern a gap of about 2m, estimate) to the SW angle (-19.9, -3.1) and back to the NW angle | Thickness about 1.5-2m (fitted, drawn); battered; height **unknown** (Caple's section about 9.5m above the outside on the south [S15]; estimate 8m above the ward inside); the keep closes the east side between (11.2, 12.0) and the gate | outline documented (one source: Caple; standing only on the south and east today [S24]); height reconstructed (Caple's section) | S10, S11, S12, S15, S24 | `coursed-rubble` (new kit, as proposed for Dinefwr, limestone here); wall `top: 'battlements'` (existing plan value; merlons unknown: analogy; the reconstructions draw them [S18]) | limestone rubble (documented: listing [S3]; bedrock [S25]) |
| `dryslwyn/keep` | tower, round, at (17.0, 9.5) | Base 12.0m across (measured and fitted), battered/flared to about 3m up, then about 9m across (Caple's section only); inside 5.1m; height 16m (Caple's section; basement 3.2, storeys 3.5, 3.5, 4.5m); first-floor door 2.5m high on the north-west | place and base documented (survey); upper diameter, height and storeys **reconstructed (one source: Caple)** | S3, S4, S10, S14, S24 | tower `batter: true` (existing); `top: 'battlements'` with a low cone inside (existing `cone`; Caple's sketch draws a conical roof [S14]: reconstructed); `timber-stair` (new kit: external stair on the NW buttress, documented [S3][S10]) | limestone rubble; roof covering **unknown** (slate is documented only for the hall: analogy) |
| `dryslwyn/keep-buttress` | prism on the keep's north-west | **Unknown** size (estimate 3 x 3m, 3m high) | documented (existence: "a broad NW buttress" [S3]; one source: Caple); size imagined | S3, S10 | `coursed-rubble` | limestone rubble |
| `dryslwyn/gate-inner` | gap in the NE corner between the north wall's end and the keep | Width **unknown** ("straight and narrow ... preventing entry on horseback" [S10]; estimate 1.5m); a barred door reached by steps | documented (one source: Caple) | S3, S8, S10, S11 | `ledged-leaf` (existing; Roman: needs a medieval kit or analogy text) | timber |
| `dryslwyn/hall` | hall, corners NW (-16.3, 10.6), NE (5.0, 3.0), SE (1.3, -5.1), SW (-17.1, 2.5); long axis 22 degrees south of east | 22.6 x 8.9m (fitted); undercroft floor 65.2m OD (measured); undercroft 2.5m, hall 3.5m to the eaves, roof about 4.8m (Caple's section); central hearth pillar; segmental-headed door in the north wall | plan documented (one source: Caple; the floor measured); heights reconstructed (one source: Caple) | S3, S4, S10, S11, S15, S24 | hall `roof: 'gable'` (existing); `hearth-pillar` (new kit: documented [S3][S10]) | limestone rubble; slate (documented for the hall's roof [S4], one source: Caple, but whether from its first roof or the 1280s one is not stated) |
| `dryslwyn/prison` | prism, (-18.1, 14.5) to (-14.3, 9.3) | Floor below the courtyard [S4]; height **unknown** (estimate 3m) | documented (one source: Caple) | S4, S8, S11 | `coursed-rubble` | limestone rubble |
| `dryslwyn/kitchen` | hall, (-7.0, -4.8) to (0.3, -10.5) | About 7 x 5m (fitted, low); lean-to against the south curtain in Caple's section [S15]; "initially wooden" [S10] | documented (one source: Caple); form reconstructed | S8, S10, S11, S15 | `timber-frame` (existing: Roman, needs analogy text) | timber, roof **unknown** |
| `dryslwyn/chamber-timber` | hall, about (4.1, 4.4), (12.5, 3.5), (9.5, -11.0), (2.4, -11.6) | About 15 x 8.5m (the later stone chamber's footprint, fitted; the timber one's own size is **unknown**); one storey; clay floor | documented (existence and materials: "wood-framed, clay-floored" [S20]; one source: Caple); size estimated | S10, S20 | `timber-frame` (as above) | timber, daub (existing surface; Roman source: analogy) |
| `dryslwyn/buildings-east` | small timber buildings east of the hall | **Unknown** ("a small cluster of wooden buildings to the east" [S8]) | documented that they existed (one source: Caple); form imagined | S8 | `timber-frame`, `thatch-roof` or `shingle-roof` (existing, Roman: analogy) | timber, roof |

**Phase `dryslwyn-two-wards`** (as `dryslwyn-first`, with `dryslwyn/chamber-timber` replaced and these added).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dryslwyn/chamber` | hall, NW (4.1, 4.4), NE (12.5, 3.5), SE (9.5, -11.0), SW (2.4, -11.6) | About 15 x 8.5m (fitted); one storey (to 1283); height **unknown** (estimate 6m) | documented (one source: Caple) | S3, S10, S11, S20 | hall `roof: 'gable'` | limestone rubble, slate (analogy from the hall) |
| `dryslwyn/curtain-middle` | wall, outer face: from the gate's north wall at (18.1, 23.7) to the W angle (9.2, 44.2), N apex (26.4, 47.9), NE corner (60.7, 38.8), down the east wall (gap for `gate-middle`) to the SE corner (60.2, 26.8), then south-west to the keep's east side at (28.4, 8.4) | Drawn 2-2.3m thick (fitted, high for a curtain: may include the outline's strokes); height **unknown** (estimate 5m above the ground inside); ±2-3m | documented (line; one source: Caple; a little masonry visible near the gates [S3]); height imagined | S3, S10, S11, S24 | `coursed-rubble`; wall `top: 'battlements'` | limestone rubble |
| `dryslwyn/gate-middle` | gap in the east wall, (60.5, 32.5)-(60.4, 30.5) | About 2m (fitted, low); "a regular portal" [S10] | documented (one source: Caple) | S10, S11 | `ledged-leaf` (analogy) | timber |
| `dryslwyn/hall-middle` | hall against the middle ward's west wall, about (12.8, 42.4) to (26.6, 26.3) | About 20m long (fitted, low; its width to read off the plan at build); height **unknown** (estimate 6m) | documented (one source: Caple, excavated [S4]); height imagined | S4, S10, S11 | hall `roof: 'gable'` | limestone rubble, roof **unknown** |
| `dryslwyn/foregate` | the unroofed foregate with a portcullis before the inner gate | **Unknown** size (estimate 4 x 3m, walls 5m); date contested (mid-13th c. [S10] or after 1271 [S3]); if the later date is taken it moves to `dryslwyn-castle` | documented (one source: Caple); date contested | S3, S10, S11 | `portcullis` (new kit: the slot is documented [S3]) | limestone rubble, timber |

**Phase `dryslwyn-castle`** (as `dryslwyn-two-wards`, plus these, and the hall and chamber raised).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dryslwyn/hall` (raised) | as before | Eaves about 7.3m above the undercroft floor, ridge about 11.6m (Caple's later section); **one or two added storeys, contested** [S20][S4] | documented (that it was raised, one source: Caple); heights reconstructed | S4, S15, S20 | hall `roof: 'gable'`; `cinquefoil-window` (new kit: documented [S4]) | **white render and limewash** (documented, one source: Caple [S20]); slate |
| `dryslwyn/chamber` (raised) | as before | Two storeys [S10][S20]; height **unknown** (estimate 9m) | documented (one source: Caple) | S10, S20 | as before | white render; slate (analogy) |
| `dryslwyn/apartments` | hall (or prism) between the hall and the south curtain: south face (-22.9, -6.1), (-12.0, -10.7), (0.4, -15.9); west return to (-23.0, -2.9); north side about (-22.3, -2.3) to (0.8, -8.8) | Two storeys [S3]; the south façade (the thickened south curtain) drawn about 2.5m thick; its top today 74.1m OD over 60-62m outside (measured: a façade of 12-14m on the slope), roofed in two parallel gables in Caple's section [S15]; medieval height **unknown** above today's (estimate: today's top plus a parapet of 1.5m) | documented (stands: survey and two views [S24][S27][S28]; form one source: Caple) | S3, S10, S11, S15, S24 | `coursed-rubble`; hall `roof: 'gable'`; `pointed-window` (new kit: "2 pointed windows in the lower storey" [S3]) | white render (one source: Caple); slate (analogy) |
| `dryslwyn/chapel-tower` | prism, SW (4.3, -17.3), SE (13.5, -15.0), NE (12.7, -10.1), NW (3.4, -13.2) | About 9.5 x 4-6m (fitted); chapel floor about 70m OD (Caple's elevation [S16]); top today 74.9m OD (measured); three lancets at the upper floor; the postern below | documented (stands: survey; form one source: Caple) | S3, S10, S11, S16, S24 | `coursed-rubble`; prism `top: 'battlements'` (analogy: the reconstructions); `lancet` (new kit: three identical lancets, documented [S3][S16]) | white render (one source: Caple); red sandstone dressings (documented that red sandstone was used for details [S10]; on the lancets an inference) |
| `dryslwyn/curtain-east` | wall, the late east curtain from about (18.3, 4.1) south to the chapel's NE corner (12.7, -10.1) | Drawn 1.3-3m (fitted); standing to 73.9m OD (measured); `latrine` at about (18.1, 0.1) with two shafts [S3] | documented (stands: survey; date one source: Caple) | S3, S10, S11, S24 | `coursed-rubble`; `garderobe` (new kit, documented [S3][S10]) | white render |
| `dryslwyn/gate-inner-works` | the late gate building and stair east of the keep, (24.1, 23.9) and (26.3, 20.6)-(27.2, 11.8) | **Unknown** heights; steps to the wall-walk [S3] | documented (one source: Caple) | S3, S10, S11 | `stone-stair` (new kit) | limestone rubble, white render |
| `dryslwyn/curtain-outer` | wall, outer face: from (50.2, 43.3) by (54.7, 59.1), (64.3, 76.3) to the gatehouse (76.1, 78.0); from the gatehouse's east side (89.1, 77.9) by (86.0, 50.8) and (74.4, 34.1) to the middle ward's SE corner (60.2, 26.8) | 1.8m thick ("1.8-meter-thick" [S10]; the east wall drawn about 1.9m, fitted); the west side drawn 2.5-3.3m with ranges against it; height **unknown** (estimate 5m); ±4-5m | documented (line; one source: Caple; the terrain's platform agrees to about 4m [S24]); height imagined | S4, S10, S11, S24 | `coursed-rubble`; wall `top: 'battlements'` | white render (one source: Caple), limestone |
| `dryslwyn/gatehouse-outer` | prism (or square tower) at the north end, about (81.5, 80.3) to (86.7, 71.5) | About 5.5 x 8.5m (fitted, low); two floors; two portcullises and two doors; a vaulted passage; height **unknown** (estimate 8m) | documented (one source: Caple); height imagined | S3, S8, S10, S11 | `portcullis` (x2), `ledged-leaf` (analogy), `timber-bridge` over the ditch (new kit: "perhaps a drawbridge" [S10]: reconstructed) | white render, limestone, timber |
| `dryslwyn/ditch-north` | ditch north of the outer gate | Width and depth **unknown** for the castle's ditch (the town ditch is "over 5m wide and 2.5m deep" [S4]); its line from the terrain model at build | documented (existence, one source: Caple [S10]); size imagined | S10, S24 | none (procedural) | earth (procedural) |
| `dryslwyn/outer-buildings` | ranges against the outer ward's walls: the west range about (60.5, 61.2) to (63.3, 46.7) and the "large building" on the west | Sizes from the plan (fitted, low); heights **unknown** (estimate 5m); "stables, stores and halls/houses" [S4] | documented that they existed (one source: Caple); form imagined | S4, S10, S11 | hall `roof: 'gable'`; `timber-frame` (analogy) | limestone, roof **unknown** |
| `dryslwyn/wall-angled` | the "thick, angled wall protecting the northern corner of the middle ward", about (61.3, 38.8)-(63.4, 39.3) | Drawn about 3-4m thick (fitted, low) | documented (one source: Caple; "traces ... visible" [S4]) | S4, S11 | `coursed-rubble` | limestone, white render |

**Phase `dryslwyn-crown`** (as `dryslwyn-castle`, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dryslwyn/gate-middle-thickening` | prism north of the middle gate, to about (61.3, 38.8) | Size from the plan (fitted, low); "In the crown of this thickening there could be a defensive platform" [S10] | documented (one source: Caple; "probably created after the siege of 1287" [S10]) | S10, S11 | `coursed-rubble` | limestone, white render |
| `dryslwyn/keep-door` | opening in the keep's base to the undercroft | **Unknown** size; segmental head [S3]; "probably in the 14th century" [S10] | documented (one source: Caple); date an estimate | S3, S10 | none | - |
| `dryslwyn/guardhouse` | small half-timbered building on the platform by the inner gate | **Unknown** (estimate 4 x 3m) | documented (one source: Caple) | S10 | `timber-frame` (analogy) | timber, daub |

**Phase `dryslwyn-walled-up`** (as `dryslwyn-crown`, plus these; roofs still on until the fire).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `dryslwyn/gatehouse-outer-blocking` | wall across the outer gatehouse's passage | The passage's width **unknown** | documented (one source: Caple [S8][S20]) | S8, S20 | `coursed-rubble` | limestone |
| `dryslwyn/keep-door-blocking` | wall in the keep's undercroft door | As the door | documented (one source: Caple [S8]) | S8 | `coursed-rubble` | limestone |

**Phase `dryslwyn-ruin`** (c. 1455 to 1980): only the two southern sections drawn standing: `dryslwyn/apartments` (the
south façade with its west return) and `dryslwyn/chapel-tower`, at today's measured tops (74.1m and 74.9m OD) [S24]
[S27][S28] (whether they stood higher before 1980 is **not known**: the views show them tall, without a scale); the keep,
curtains and the rest as low turfed mounds on their lines (imagined form: "survived underground" [S10]); limestone bare,
render lost (an inference: no source says when the render went).

**Phase `dryslwyn-excavated`** (1980 to now): every excavated wall as consolidated footings, from a few courses to "a few
meters" [S10]; the inner curtain to 1m [S3]; the keep's ring to 74.6m OD round a floor of 72.3m; the hall's undercroft
floor at 65.2m; the apartment façade, chapel tower and east curtain at their measured tops; the middle and outer wards as
low walls near their gates and banks elsewhere [S3][S24]. All bare limestone.

**The LiDAR area (proposed).**

| Field | Value |
|---|---|
| id | `dryslwyn` |
| name | Dryslwyn Castle and its hill |
| centre | E 255450, N 220375 (Coflein's point, 107m south-west of it, lies inside the area) |
| halfSize | 250 (a 500m square, E 255200-255700, N 220125-220625: the summit ridge with the castle and the borough, and the slopes to the floodplain on the south and west) |
| 2m output tiles (500m, by south-west corner) | (255000, 220000), (255500, 220000), (255000, 220500), (255500, 220500): 4 tiles |
| Source 1km tiles (DTM, 2020-22, delivery 26, dated 13-01-2022) | The 2m area lies wholly in **SN5520** (`wg_del_26_255220_20220113dtm.tif`). With the 300m blend margin (E 254900-256000, N 219825-220925) also **SN5419, SN5420, SN5519**; a context region of E 254500-256500, N 219500-221500 (2km square, 16 tiles of 500m, 12 of them at 10m) adds **SN5421, SN5521, SN5619, SN5620, SN5621** |
| Region | The app has **one** region (E 260000-265000, N 220500-224500) and Dryslwyn is 4.6km west of it and about 210m south of its southern edge. Either `lidar-areas.json` grows a list of regions (proposed: a second rectangle E 254500-256500, N 219500-221500), or the one region grows to E 254500-265000, N 219500-224500, about 2.6 times its area in 10m tiles. A build decision |

Tiles fetched for this note (in `~/code/data/llandeilo/lidar/dryslwyn/`, not committed): DTM SN5419, SN5420, SN5519,
SN5520, SN5521, SN5620; DSM SN5519, SN5520. SHA-256 (first 16): DTM SN5520 `493a0423ce8561c5`, SN5519 `95d082c63516465b`,
SN5420 `f1334c9f19372b5d`, SN5419 `8e1f6d33effa089e`, SN5521 `e9989ce0b58b1b9f`, SN5620 `cb803cc76a046a13`; DSM SN5520
`66f1d6be6334939b`, SN5519 `38d7a41ebeb3d92b`.

**What the Blender build will need.**

1. **Per-part plans.** `DRYSLWYN_INNER`, `DRYSLWYN_MIDDLE` and `DRYSLWYN_OUTER` in `src/content/buildings.ts` are the
   2026-10-02 shapes at landscape scale and 40 degrees; each part needs an id, a name and its own provenance, at the
   fitted coordinates above.
2. **Fitting to steep ground.** The castle sits on a summit that falls about 7m across the inner ward and 12-14m below
   the south façade; walls need their base fitted to the drawn ground along their length (the forts' fitting, ADR 0053),
   and the hall's undercroft floor is cut 5-7m below the ground at the keep.
3. **Ruins and prisms.** Three of the seven phases are ruins (`walled-up` after its fire, `ruin`, `excavated`), and the
   chapel tower and the apartment block are prisms; ADR 0053's build sheet refuses both today, as `dinefwr-castle.md`
   also found.
4. **New kits.** `coursed-rubble` (limestone here; course heights to measure from Caple's elevation [S16] or
   photographs), `timber-stair` (the keep's), `hearth-pillar`, `portcullis`, `lancet`, `pointed-window`,
   `cinquefoil-window`, `garderobe`, `stone-stair`, `timber-bridge`. The existing ten kits are Roman (see
   `dinefwr-castle.md`); `ledged-leaf`, `timber-frame` and the roof kits reused here need medieval kits or analogy text.
5. **Surfaces.** White render and limewash (documented, one source: Caple [S20]) from 1283; limestone rubble (documented
   [S3][S25]); slate (documented for the hall [S4][S20], analogy elsewhere); red sandstone dressings (documented that it
   was used [S10]); timber; daub (analogy). Each an asset with its source, as ADR 0055 requires.
6. **The one-source label.** As for Dinefwr, a content test should require a "one source: Caple" note on every part this
   note labels so (S1, S3, S4, S5, S8-S16 and S20 are one excavation in many forms).
7. **The `at`** moves to Coflein's point (6.7m from today's).
8. **The LiDAR area** above, and the region change it needs.
9. **The research gaps** above, above all Caple's monograph, would turn most reconstructed heights into documented ones.

## Sources

- [S1] Coflein (RCAHMW), "Dryslwyn Castle, Dryslwyn", NPRN 100682, SN 55387 20288 (John Wiles, 6 December 2007, "Source: Rees & Caple CADW Guide to Dinefwr Castle & Dryslwyn Castle, revised edition (2007)"). https://coflein.gov.uk/en/site/100682/ — "The shattered ruins of a medieval castle crown the ultimate summit of a dramatically isolated and abrupt hill rising from the Tywi floodplain"; "founded by a local Welsh prince in the second quarter of the thirteenth century"; "twice expanded before, in 1287"; "A walled borough was now added"; "decommissioned in the early fifteenth century and decayed thereafter"; "recently been excavated and the remains are consolidated for public display"; "a great round tower and a princely mansion set in a strongly walled court"; "In the later thirteenth century two further walled courts were added on the north-east slopes"; "the outer facade of the great appartments"; "mostly reduced to footings". Same record as `models:S1` and `medieval:S55`. Read directly 2026-10-17.
- [S2] Coflein (RCAHMW), "Dryslwyn Medieval Borough", NPRN 109584, given as SN 55420 30370 (John Wiles, 6 December 2007, from the same guide). https://coflein.gov.uk/en/site/109584/ — "Roman material recovered from the hill hints at the existence of an earlier settlement"; charter 1281; 34 burgages within the walls and 14 in "Briggestrete" by the mid-14th century; "abandoned by the seventeenth century"; "strong ramparts and a stone wall, now buried in the earthworks that girdle the summit"; "two gates". Same record as `models:S2`. Read directly 2026-10-17.
- [S3] Cadw, Listed Buildings Full Report 10934, "Dryslwyn Castle", Grade I, designated 8 July 1966, E 255403 N 220365; sources Davies 1993, Pettifer 2000, Rees and Caple 1999. https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=10934 — Rhys Grug "in the 1220s"; "a round keep with adjacent gateway, and a sub-triangular ward"; Maredudd ap Rhys from 1233, "a second hall at right angles" and "a second ward on the NE side"; Rhys ap Maredudd after 1271, "perhaps after the war of 1282-3", apartment block, chapel, gatehouse rebuilt, outer ward; "a three-week siege"; 1403, "some 3 years" in rebel hands, "probably largely demolished"; "limestone rubble walls"; the inner curtain "no more than 1m high"; the garderobe "with 2 shafts"; the NE gatehouse's portcullis slot and cobbled passage; the keep's first-floor entrance "from external steps built above a broad NW buttress" and the "later insertion" of the undercroft door; the chapel's "3 lancet windows" and postern; the apartment block's "battered wall, with return at the W end", its pointed windows; the great hall's basement, door and fireplace foundation; "The outline of a small prison"; little masonry in the middle and outer wards. Read directly 2026-10-17.
- [S4] Cadw, Scheduled Monuments Full Report CM030, "Castell Dryslwyn", E 255436 N 220365. https://cadwpublic-api.azurewebsites.net/reports/sam/FullReport?lang=en&id=445 — "built over an earlier Iron Age hillfort"; three wards; "the stables, stores and halls/houses"; "a thick, angled wall protecting the northern corner of the middle ward"; the middle ward's "large hall built up against the western defences"; the gatehouse with portcullis; the keep's walls "some 3m thick" at the base and "an internal ladder down from the first floor"; the prison's sunken floor; the great hall, "the ‘King’s Hall’", "remodelled in the 1280s to accommodate two upper storeys", "the roof was made of slate", "a fine window with cinquefoil cusps"; the 1281 fair charter; "The town walls probably stood up to 2.1m high. The town ditch was over 5m wide and 2.5m deep". No sources listed. Read directly 2026-10-17.
- [S5] Heneb Historic Environment Record (Archwilio), PRN 699, "Medieval - Castle", SN55402035. https://archwilio.org.uk/arch/query/page.php?watprn=DAT699&dbname=dat&tbname=core — summary copied from Coflein (from the 2007 guide); sources including Caple's interim reports 1989-96, Webster 1980-87, RCAHM 1917, Hogg and King 1967; events including "Dryslwyn Castle (year : 1980-95)" (DAT89307); related record 4319. Derived from information held by the Heneb HER Charitable Trust copyright. Read directly 2026-10-17.
- [S6] Heneb HER (Archwilio), PRN 4319, "Medieval - Motte", SN55402035. https://archwilio.org.uk/arch/query/page.php?watprn=DAT4319&dbname=dat&tbname=core — no description; sources air photographs (Meridian Airmaps 1955; T. A. James 1978-79), OS 1968, RCAHM 1917, J. K. St Joseph; a field observation of 1968. Read directly 2026-10-17.
- [S7] Gatehouse Gazetteer, "Dryslwyn Castle", record 217. https://gatehouse-gazetteer.info/Welshsites/217.html — SN55402035; "a certain Masonry Castle"; quotes Coflein and the listing; Cadw scheduled monument CM030, listed building 10934, HER 699 and 4319; a full bibliography (Caple 2007; Webster 1987; Caple 1990; Colvin and others 1963 pp. 641-2; RCAHMW 1917 pp. 155-6 no. 452) and primary sources (Annales Cambriae 1245 and 1287; Trivet p. 315; the Wykes chronicle pp. 310-1). Same record as `models:S6`. Read directly 2026-10-17.
- [S8] castlewales.com (Jeffrey L. Thomas), "Dryslwyn Castle", text by Sian E. Rees and Chris Caple, "The Cadw guidebook for Dinefwr and Dryslwyn castles (1999)", photographs 2002. https://www.castlewales.com/dryslwyn.html — prehistoric fortification "not borne out by any evidence"; "in 1246, ... the first reliable documentary reference"; "probably raised during the second quarter of the 13th century"; the first castle's gate, hall, kitchen, prison and "a small cluster of wooden buildings"; the middle ward "In the mid 13th century", "virtually doubling" the castle; "almost certainly Rhys ap Maredudd who further enlarged and improved the castle in the 1280s"; the hall, apartments, chapel tower and "newly mortared courtyard"; "The castle fell after three weeks"; "very little new building"; "very deliberately decommissioned in the early 15th century", the outer gatehouse "walled up", the keep's basement "blocked", hinges and treads taken; "very probably carried out by the English forces that retook the castle following its surrender to Owain Glyndwr in 1403"; "At a later date, the castle was deliberately put to the torch ... Demolition of the upstanding walls followed, apart from two prominent sections on the south side." Read directly 2026-10-17.
- [S9] castlewales.com (Jeffrey L. Thomas), "The 1287 Siege of Dryslwyn Castle", "From the official Cadw Guidebook for Dryslwyn Castle". https://www.castlewales.com/dryslwn2.html — writs 16 July; Earl Edmund from Carmarthen 9 August with about 4,000; 6,700 more on 15 August; the siege "on or just after the 15 August"; the trebuchet "cost £14", "20 quarrymen and 24 carters"; "Tradition records that they brought down a large section near the projecting chapel block"; "captured by 5 September"; "repairs were carried out shortly afterwards"; "Two substantial stone balls, over 16 inches". Same page as `medieval:S23` and `models:S7`. Read directly 2026-10-17.
- [S10] medievalheritage.eu, "Dryslwyn – castle" (bibliography: Caple 2007; Caple and Rees 2007; Davis 2011, 2021; Kenyon 2010; Lindsay 1998; Lloyd, Orbach and Scourfield 2006; Salter 1996). https://medievalheritage.eu/en/main-page/heritage/wales/dryslwyn-castle/ — history ("around the beginning of the second quarter of the 13th century by Rhys Gryg ... or possibly by his successors"; "In 1245 or 1246, Dryslwyn was first clearly recorded"; surrender "on September 5, 1287"; Alan Plucknet's repairs; repairs 1338-39 and after 1343; 1403 and 1409; "recorded in official grants until the early 16th century"); architecture (the limestone quarried on the hill and burnt for mortar, "Imported red sandstone"; the pentagonal battered curtain and wall-walk; the narrow gate; the postern; the keep "approximately 12 meters", walls "up to 3 meters", "at least three storeys", its 14th-century ground-floor portal; the hall over a pillared ground floor and its 1280s rebuilding; the foregate with portcullis; the great chamber, one floor then two; the thickened south wall, apartments and chapel; the middle ward "approximately 70 x 30 meters", its east gate and the thickening "probably created after the siege of 1287"; the outer ward's "1.8-meter-thick" wall, ditch and two-floor gatehouse with "two portcullises and two doors"; the town ditch "5 meters wide and about 2.5 meters deep", houses "10-11 meters long and 4.6 meters wide"; the state today). Secondary. Same page as `models:S3`. Read directly 2026-10-17.
- [S11] medievalheritage.eu, "castle plan according to S.Rees, C.Caple and Cadw" (period plan: "Early/Mid-Thirteenth Century: Phase 1", "Mid-Thirteenth Century: Phase 2", "Late Thirteenth Century"; Round Tower, Inner, Middle and Outer Wards, Gateway, Middle Gate, Gatehouse, Great Hall, Great Chamber, Apartment Block, Kitchen, Prison, Postern Gate, Latrine, Chapel). https://medievalheritage.eu/wp-content/uploads/2019/10/Dryslwyn-plan-12.jpg — no scale bar; image 1300 x 1064 pixels; the keep 93 pixels across over its outer edge (hole 40), centre pixel (514.5, 656.5); fitted 2026-10-17 to S24 at 7.5 px/m (best 7.4-7.7) and 3 degrees clockwise, pinned at the surveyed keep centre (search over scale, rotation and offset maximising the overlap of drawn walls with surface-model cells more than 1.2m above the terrain model). Same image as `models:S5`. Cadw, Crown copyright; not copied.
- [S12] medievalheritage.eu, "plan of the castle expansion according to S.Rees, C.Caple and Cadw" (three phase panels; 15m and 50ft bars). https://medievalheritage.eu/wp-content/uploads/2019/10/Dryslwyn-plan-11.jpg — the 15m bar's ticks 59 pixels apart (3.93 px/m), the 50ft bar 61 (4.00 px/m); the keep 50-51 pixels across on the Phase I panel (12.7m at the bar) and 51-52 on the others. Same image as `models:S4`. Cadw, Crown copyright; not copied.
- [S13] medievalheritage.eu, "plan of the castle and town from the 14th century according to C. Caple" (excavated and projected walls, ditch, roadways, bedrock, the settlement "A"; 80m bar). https://medievalheritage.eu/wp-content/uploads/2026/06/Dryslwyn-plan-05.jpg — bar 289 pixels for 80m (3.61 px/m); overlaid on S24 at that scale, not fitted. Not copied.
- [S14] medievalheritage.eu, "reconstruction of the keep, the entrance to the tower and the cross-section according to C. Caple". https://medievalheritage.eu/wp-content/uploads/2026/06/Dryslwyn-rekonstrukcja-07.jpg — section with "11m" (353.5 pixels, so 32.1 px/m) and "16m" (496.5 pixels, 15.5m at that scale), storey heights 3.2, 3.5, 3.5 and 4.5m, a 2.5m first-floor door, a 0.9m mark at the flare's foot; measured here: the body above the flare about 288 pixels (9.0m), the inside about 164 (5.1m), the flare's toes about 390 apart (12.1m); an elevation of the first-floor entrance with a timber stair, the flare's "Tumble fragment" and "in situ" masonry; a sketch with a conical roof. Viewed and measured. Not copied.
- [S15] medievalheritage.eu, "cross-section of the buildings in the southern part of the inner ward from the beginning and from the end of the 13th century according to C. Caple". https://medievalheritage.eu/wp-content/uploads/2026/06/Dryslwyn-rekonstrukcja-08.jpg — two sections with 5m bars (30.4 and 31 px/m): the great hall about 9.8m wide over walls, undercroft about 2.5m, eaves about 5.9m and ridge about 10.7m above the undercroft floor, the kitchen a lean-to against a south curtain about 9.5m high; later, the hall with apartments above (eaves about 7.3m, ridge about 11.6m), the south range in two storeys under twin gables, its façade about 12.6m above the slope. Viewed and measured. Not copied.
- [S16] medievalheritage.eu, "longitudinal section through the eastern wing and the tower with the chapel, northern elevation of the southern tower wall according to C. Caple". https://medievalheritage.eu/wp-content/uploads/2026/06/Dryslwyn-rekonstrukcja-09.jpg — the elevation's OD scale 65m to 75m, a "probable floor level" near 70m OD, three lancets "projected from surviving splay of reveals, all three identical", "flush faced stonework", a "probable garderobe chute"; a 3m bar that does not agree with the OD scale in this reproduction, so no length was read off it. Viewed. Not copied.
- [S17] Paul R. Davis, reconstruction of the castle in the first half of the 13th century and the mid-13th century, from the north-east, as reproduced by medievalheritage.eu ("reconstruction of the castle from the beginning of the 13th century and from the mid-13th century according to P.R.Davis"). https://medievalheritage.eu/wp-content/uploads/2022/02/Dryslwyn-rekonstrukcja-33.jpg — the first phase with a timber palisade, gate and timber buildings round a large outer enclosure; the second with the middle ward in stone; the keep with a conical roof inside its parapet; grey roofs. An artist's reconstruction, viewed. Not copied.
- [S18] Chris Jones-Jenkins, reconstruction of the castle in the first half of the 13th century, for Cadw, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Dryslwyn-rekonstrukcja-22.jpg — the walled pentagon, white; the keep crenellated with a conical roof inside; the hall and timber-framed great chamber under slate-grey roofs; no outer enclosure. Viewed. Not copied.
- [S19] Chris Jones-Jenkins, cutaway of the buildings in the southern part of the inner ward at the beginning of the 14th century, for Cadw, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Dryslwyn-rekonstrukcja-25.jpg — white walls, crenellated, slate roofs, timber floors. Viewed. Not copied.
- [S20] Chris Caple, *Excavations at Dryslwyn Castle 1980-95* (Society for Medieval Archaeology Monograph 26, 2007; Routledge, 370 pages), the publisher's abstract and table of contents. https://www.routledge.com/Excavations-at-Dryslwyn-Castle-1980-95/Caple/p/book/9781905981885 — "founded in the late 1220s by Rhys Gryg for his son Maredudd ap Rhys"; "a simple round tower and polygonal walled enclosure, within which were constructed a kitchen, prison and wood-framed, clay-floored great chamber beside a great hall"; "In the mid 13th century a second ward was added and the great chamber rebuilt in stone"; "greatly expanded in the period 1283-87 by Rhys ap Maredudd ... who built an Outer Ward and gatehouse ... adding an extra storey to the great hall and great chamber, apartments and a chapel"; the settlement "defended by a wall and substantial ditch with access through a gatehouse"; 1287 "a trebuchet and mining of the walls"; the 14th-century garrison; 1403; "During the early to mid 15th century the castle was deliberately walled up ... and it was subsequently looted and demolished"; "a white rendered and lime-washed appearance"; "decorative wall paintings and glazed windows"; "charred beams still in situ, the sizes, shapes and distribution of nails, sheet lead, slates and postholes"; chapters "Welsh Lordship Period (1197–1287)" and "English Garrison Period (1287–1455)". The monograph itself not read. Read 2026-10-17.
- [S21] *Annales Cambriæ*, ed. John Williams ab Ithel (Rolls Series 20, London, 1860), Internet Archive. https://archive.org/details/annalescambri20will — under 1246, a note giving manuscript C's text: the seneschal of Carmarthen "obsedit castrum de Deresloyn", before the Kalends of December (the day not legible in the OCR) (p. 86; index: "Dyryslwyn (Deresloyn), the seneschal of Caermarthen, besieges the castle of, 86"); under 1287, Rhys ap Maredudd's rising and the English who "castrum ipsius Resi de Deresloyn obsederunt circa gulam Augusti, et tandem muros subfodiendo castrum ceperunt", William de Monchensy "oppressus est sub muro" with many others (p. 109). Full text searched and read in context (OCR).
- [S22] Nicholas Trivet, *Annales sex regum Angliae*, ed. Thomas Hog (English Historical Society, London, 1845), p. 315, Internet Archive. https://archive.org/details/fnicholaitriveti00trivuoft — Earl Edmund of Cornwall leads an army against Rhys; besieging "castrum de Druselan, quod erat Resi" and having its walls undermined, William de Monte Canisio and "aliique milites plurimi et scutiferi" are crushed by their fall. Read in context; the quotations are the OCR's words with its misreadings corrected ("llesi", "roiUtCii phirirai").
- [S23] "Chronicon vulgo dictum Chronicon Thomae Wykes", in *Annales Monastici* vol. 4, ed. H. R. Luard (Rolls Series 36, London, 1869), pp. 309-11, Internet Archive. https://archive.org/details/annalesmonastic00unkngoog — Rhys's rising under 1287; at a second castle (a footnote gives manuscript I's reading, OCR "Dyrysliryn", Dryslwyn's name), the English undermine the wall, its props "nimis tamen debilibus" (OCR "debilibua"), and the earth falls on those who had gone in to inspect the mine, killing William de Monchensy and many others. Read in context (OCR).
- [S24] Welsh Government LiDAR, 2020-22 national survey, 1m DSM and DTM, tiles SN5520 and SN5519 (and DTM SN5419, SN5420, SN5521, SN5620) (`wg_del_26_<tile>_20220113dtm.tif`, `...dsm.tif`, catalogue date 13-01-2022, delivery 26), DataMapWales; Open Government Licence v3 (see [`../data/lidar.md`](../data/lidar.md)). https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dsm/wg_del_26_255220_20220113dsm.tif — measured 2026-10-17 by Claude: the keep's centre (the standing ring), standing tops, floor and ground heights, the hill's extent; the period plan S11 fitted.
- [S25] British Geological Survey, DiGMapGB-50 bedrock (v9.25, released 31 March 2025; sheet 230, Ammanford), GetFeatureInfo at the castle. https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer — "Mydrim Limestone Formation-Limestone", Caradoc Series, Ordovician, "shallow carbonate seas". Read 2026-10-17.
- [S26] Cadw, "Castell Dryslwyn" (visitor page). https://cadw.gov.wales/visit/places-to-visit/castell-dryslwyn — "Founded in the 13th century on an isolated hill"; "11,000 English troops"; "The conflict lasted two weeks as siege engines and sappers ... chipped away at the fortress’s defences"; free entry. Same page as `medieval:S21`. Read directly 2026-10-17.
- [S27] James Baker (drawer) and J. Bluck (engraver), "Drysllwyn Castle with Gronger Hill", aquatint, about 1795, National Library of Wales, via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Drysllwyn_Castle_with_Gronger_Hill.jpeg — public domain; viewed: the bare hill from across the Tywi, two tall ruined masses on the summit.
- [S28] Thomas Nicholas, *Annals and antiquities of the counties and county families of Wales* (London, 1872), p. 280, "Dryslwyn Castle", Internet Archive Book Images via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Image_from_page_280_of_%22Annals_and_antiquities_of_the_counties_and_county_families_of_Wales%22_(1872)_%E2%80%93_Dryslwyn_Castle.jpg — no known copyright restrictions; viewed: the hill with ruined fragments on its summit, cottages below.
