---
title: Independent check of building-models.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: measured models of the important buildings

Reviewed note: [`../building-models.md`](../building-models.md) (status: draft, written 2026-10-02).
Repo state: `main` at `97cfad9`.

## Method

- Every cited web page (S1 to S3, S6, S7, S9 to S22, S25, S26, S28 to S30, S32 to S36) was downloaded
  with curl and read as raw text, so wording could be checked exactly. The two Wikipedia leads (S8, S37)
  were read as wikitext (`action=raw`).
- All seven plan images (S4, S5, S13, S14, S23, S24, S27) were downloaded and looked at, then measured
  with a short Python script: a scale bar's end ticks were found as dark-pixel runs, and walls were read
  as runs of dark or coloured pixels along straight row or column profiles, with gridded enlargements to
  pick corners. Scales found: S4 0.250-0.254 m/px (15m bar 59px, 50ft bar 61px); S13 0.130-0.132 m/px
  (15m bar 114px, 50ft bar 117px); S14 0.0816 m/px (10m bar 122.5px, 30ft bar 112px); S23
  0.122-0.123 m/px (30m bar 244px, 100ft bar 250px); S24 0.216-0.217 m/px; S27 0.110-0.112 m/px (30m
  bar 267px, 100ft bar 276px). S5 has no bar; it was scaled from the keep (taken as 12.2m from S4),
  giving 0.133 m/px.
- S31 (OS OpenMap Local) was re-measured from the local shapefile with ogr2ogr and a minimum-rectangle
  fit.
- No WebSearch was used. Grid-reference offsets were recomputed against `src/content/places.ts` and
  `features.ts`.
- Verdicts: **confirmed** (the source says it, or my re-measure agrees within the note's stated
  tolerance), **partly** (some of it, or my figure differs beyond the tolerance, or the note's wording
  goes further than the source), **not supported**, **contradicted**.

## Summary

- **The note is accurate on every quotation checked.** No quote was misattributed or misworded, and every
  grid reference and offset is right.
- **The four layout questions it was asked hold up**: Dryslwyn's three wards and their order, Talley's
  four-bay nave with a south aisle only and its north wall on the arcade line, Carreg Cennen's gatehouse
  in the north curtain with the barbican running east then south, and the north and east tower walls at
  Talley.
- **Two date points are less settled than the note says.** At Dryslwyn, Coflein's own summary [S1] says
  "In the later thirteenth century two further walled courts were added", which disagrees with the
  plan's "Mid-Thirteenth Century" for the middle ward; the note quotes S1 only for "twice expanded before
  1287". And the "Welsh, before 1287" outer ward rests on S1 and S6 only: S3 gives no builder and says
  that after 1287 Alan Plucknet "made the necessary repairs and expansion of the castle".
- **The bridge's 1577 date is one chain of evidence, not two.** Hughes [S35] quotes Jervoise [S36], who
  quotes Lambarde. Jervoise also says that at the end of the 18th century "there was evidently only a
  ferry". The "three-arched bridge" in Wikipedia [S37] comes from Lloyd, Orbach and Scourfield, *The
  Buildings of Wales* (2006) p. 250, a reputable source the note should name instead of "Wikipedia".
- **Re-measurements mostly agree within 5%.** The ones that differ enough to matter for a model: the
  Dryslwyn keep's walls (about 3.2m, interior about 5.7m, not 2.8m and 6.4m); the Talley tower
  footprint (about 12-12.5m, not 11.5-12m) and the built nave (about 23-24m, not 22m); the Dinefwr keep's
  position (in the south-east angle, close to both the south and east curtains) and its inner ward's
  width (about 34-38m, not 40m); the Dinefwr north-west tower (8.2m on the plan, not 7.3m); and the
  Carreg Cennen north-east tower (about 9.5 x 9.5m, not 10.8 x 9.1m).

Counts over the 74 rows below: **57 confirmed, 17 partly, 0 not supported, 0 contradicted.**

## Claim by claim

### Dryslwyn

| # | Claim in the note | Verdict | Evidence |
|---|---|---|---|
| 1 | Founded second quarter of the 13th century; "twice expanded before, in 1287, it was captured" [S1] | Confirmed | S1: "founded by a local Welsh prince in the second quarter of the thirteenth century. It was twice expanded before, in 1287, it was captured" (https://coflein.gov.uk/en/site/100682) |
| 2 | Inner ward by Rhys Gryg in the 1220s, "a round keep with adjacent gateway, and a sub-triangular ward containing a great hall" [S6] | Confirmed | S6 (Cadw listing via Gatehouse, https://gatehouse-gazetteer.info/Welshsites/217.html), exact words |
| 3 | Middle ward: Maredudd ap Rhys after 1233 [S6]; Phase 2 "Mid-Thirteenth Century" on the plans [S4][S5]; S3 says Rhys ap Maredudd "in the mid-thirteenth century". Marked "Date cross-checked" | Partly | All three quotes are right (S6: "passed to Maredudd ap Rhys in 1233, who built a second hall ... and added a second ward on the NE side, now known as the middle ward"). But S1's second paragraph says "In the later thirteenth century two further walled courts were added on the north-east slopes", and S9 says in one place "Middle and outer wards: Added by Rhys ap Maredudd during 1280s expansion" (while also saying Maredudd added "the northern ward"). The date is not uncontested |
| 4 | Outer ward: Rhys ap Maredudd after 1271, "perhaps after the war of 1282-3" [S6]; "Cross-checked: Welsh, before 1287" | Partly | S6 quote exact. S1 supports before 1287. S3 says only "At the end of the 13th century, another north-eastern ward (lower castle) was built", no builder, and also says that after the capture Alan Plucknet "made the necessary repairs and expansion of the castle" (https://medievalheritage.eu/en/main-page/heritage/wales/dryslwyn-castle/). So S3 does not support "before 1287" |
| 5 | Apartment block, chapel tower, rebuilt gate by Rhys ap Maredudd; chapel block stood by 1287 (siege tradition) | Confirmed | S6: "an apartment block and chapel were added and the gatehouse was rebuilt"; S7: "Tradition records that they brought down a large section near the projecting chapel block" (https://www.castlewales.com/dryslwn2.html) |
| 6 | Middle-gate thickening "probably created after the siege of 1287" [S3] | Confirmed | S3, exact words. On S5 the thickening north of the Middle Gate is coloured "Late Thirteenth Century" |
| 7 | Walled borough contested: charter 1281 [S2]; "A walled borough was now added" after 1287 [S1]; "in the 1280s on the initiative of Rhys ap Maredudd or by the English after conquering it in 1287" [S3] | Confirmed | All three quotes exact |
| 8 | Decommissioned early 15th century; slighted after 1403-09 | Confirmed | S1 "decommissioned in the early fifteenth century"; S9 "retaken by Henry IV in 1409 ... gatehouses blocked, stones removed, and buildings set alight" |
| 9 | Long axis SW to NE; whole castle about 119m E-W by 107m N-S (measured) | Confirmed | My re-measure on S4's late-13th-century plan: bounding box 462 x 415 px = 116 x 105m |
| 10 | Keep outer diameter about 12m (11.8-12.3m on all three phase plans) | Confirmed | My profiles on S4: 49, 48 and 48 px across the three phases = 12.2-12.4m; S3 "approximately 12 meters" |
| 11 | Keep walls about 2.8m, interior about 6.4m (measured) | Partly | My profiles: walls 12-13 px = 3.0-3.3m, interior 21-23 px = 5.3-5.8m on S4; on S5 the ring is 92 px with a 42 px interior (ratio 0.45). So walls about 3.2m, interior about 5.7m. S3 says walls "up to 3 meters" |
| 12 | Keep on the east side of the inner ward, on the east curtain south of the gatehouse | Confirmed | S3 "on the eastern side, projecting only about one-third of its circumference"; S6 "Attached on the S side of the gatehouse, and E side of the curtain wall, is the round tower" |
| 13 | Inner ward an irregular pentagon; north wall about 39m, south 33m, west 21m; phase-1 footprint about 40 x 40m | Confirmed | Within the note's ±10%: my corner-to-corner readings on S4 phase I give north about 36-38m, west about 20m, south about 33m along its bends, footprint 164 x 154 px = 41 x 39m |
| 14 | Inner gate at the north-east corner, a barred doorway on steps, given a foregate with a portcullis in the mid-13th century | Confirmed | S3: "The gate was located in the northeastern corner"; "After the extension, an unroofed foregate with a portcullis and a door was added" |
| 15 | Postern in the south wall | Confirmed | S3, and labelled "Postern Gate" on S5 |
| 16 | Great hall on the south side over a basement with a hearth pillar; great chamber at right angles on its east, mid-13th century | Confirmed | S3, S6; both labelled on S5 |
| 17 | Two-storey apartment block outside the original south curtain on the south-west | Confirmed | S6: "On the W side is the battered wall ... of a former 2-storey apartment block, built outside the line of the original curtain wall"; S5 shows it in late-13th-century red along the south-west; S3 calls it the southern wing |
| 18 | Square chapel tower projecting at the south-east corner, chapel upstairs with three lancets | Confirmed | S3 "In the southeast corner ... a quadrangle projecting beyond the perimeter"; S6 "remains of 3 lancet windows" |
| 19 | Middle ward "approximately 70 x 30 meters" [S3]; measured about 55 x 30m [S5]; entrance in the east wall | Partly | Quote and east gate confirmed (S3; "Middle Gate" on S5's east wall). My re-measure on S5, scaled from the keep: about 51-53m long by up to about 34m wide, so nearer 52 x 34 than 55 x 30 |
| 20 | Outer ward about 60m by 30m, wall 1.8m, ditch on the north | Confirmed | S3 "1.8-meter-thick stone defensive wall, preceded by a ditch from the north". My re-measure on S5: about 58m long, 31-34m wide |
| 21 | Outer gatehouse at the north end, timber bridge, two portcullises and two doors; steps to a wall walk | Confirmed | S3, S6; labelled "Gatehouse" at the north end on S5 |
| 22 | Borough: ditch 5m by 2.5m, west gatehouse; 34 burgages inside and 14 in "Briggestrete"; houses 10-11m by 4.6m | Confirmed | S2 and S3, exact figures |
| 23 | Ruin today: inner curtain "no more than 1m high"; "mostly reduced to footings" | Confirmed | S6 and S1, exact words |
| 24 | Coflein's borough grid SN 55420 30370 is suspect | Confirmed | That is the figure on the S2 page; it lies 10km north of the castle |

### Talley Abbey

| # | Claim in the note | Verdict | Evidence |
|---|---|---|---|
| 25 | Planned church 72.7m measured [S13], 73m [S12], 235ft [S16]; S14's bar gives about 77m | Partly | Confirmed for S13: my profile, planned west end (x=37) to east face (x=593) = 556 px = 72.4-73.2m. S14 re-measured at 920 px = 75.1m, not 77m |
| 26 | Finished length 48.8m measured (49.6m to the buttresses); 162ft = 49.4m [S16] | Confirmed | My re-measure on S13: west front outer face (x=211) to east wall face (x=593) = 382 px = 49.8-50.3m; on S14 51.3m. S16: "the finished church was 162 feet long, including a four-bay nave with only one aisle, to the south" |
| 27 | Only the eastern four bays of the nave and south aisle were built above foundation level; one bay of the north aisle as a small room off the north transept | Confirmed | S17 exact (http://www.castlewales.com/talley.html); S12 and S18 agree |
| 28 | The finished nave's north wall stands on the north arcade line; a plain west front closes the fourth bay | Confirmed | Viewed on both plans: on S13 the early-13th-century hatched wall runs along the north arcade with the piers embedded in it, and the hatched west front crosses nave and south aisle; S14 shows the same in dark red |
| 29 | Arcade centre lines 9.7m apart; clear nave about 8.3m | Partly | My re-measure on S13: arcade centres at y=151 and 227 = 76 px = 9.9-10.0m; clear width 66 px = 8.7m |
| 30 | Bays about 5.6m; four built bays, about 22.4m from the west front to the crossing piers | Partly | Bays: pier centres 43.5, 42.8, 44.4 and 45.5 px apart = mean 5.75m, so confirmed. But the built nave is 176 px = 23.1m from the west pier to the crossing pier centres, and 180 px = 23.7m from the west front's outer face to the crossing piers' west faces, not 22.4m |
| 31 | South aisle: clear about 3.8m, wall about 1.4m, arcade centre to outer face 5.9m | Partly | My re-measure: clear 31 px = 4.1m, wall about 9 px = 1.15m, arcade centre to outer face 45.5 px = 6.0m |
| 32 | North side: a solid wall about 1.5m on the arcade line, no aisle | Confirmed | S13 wall 145.5-156 px = 1.4m; S16 "with only one aisle, to the south" |
| 33 | Planned width about 21.5m outside; built nave plus south aisle about 16.5m | Confirmed | My re-measure: 166.5 px = 21.9m and 127 px = 16.7m |
| 34 | Crossing piers about 9.6m apart; piers about 2.2m; tower footprint about 11.5-12m | Partly | My re-measure on S13: pier centres 75-76 px = 9.9-10.0m each way; solid piers 16 px = 2.1m (2.6m with their shafts); outer extent over the piers 91.5 px = 12.0m east-west and 95 px = 12.5m north-south. So about 12-12.5m |
| 35 | Tower originally about 29m [S12] | Confirmed | S12 "originally approximately 29 meters high" |
| 36 | Standing: north and east walls of the tower, about 26m | Confirmed | S10 "half of a shattered 26m high tower"; S15 "the north and east walls of the tower which extend over 25m in height" (https://monasticwales.org/site/51); S16 "the east wall of the central tower, and the south and east walls of the north transept" (the north transept's south side is the tower's north arch, so this agrees); S12 and S19 "two walls"; S20 "standing almost to its full height" |
| 37 | Transepts about 36.3m end to end; three chapels per arm with pointed barrel vaults; enlarged southern chapel of the north transept | Confirmed | My re-measure 283 px = 36.9-37.2m on S13 (38.2m on S14). Chapels: S12, S16. Chapel sizes (4 x 3.4m) not re-measured |
| 38 | Presbytery square-ended, about 11.7m outside, 8.5m clear, 15.8m long; three east windows; sacristy on the south | Confirmed | My re-measure: 86 px = 11.3m outside, 67 px = 8.8m clear, 119.5 px = 15.7m from the east crossing piers to the east face; S12 text |
| 39 | Cloister overall about 22.8m, garth wall about 17.7m; 23 x 23m [S12]; 74ft [S16] | Confirmed | My re-measure: garth 138 px = 18.2m; to the transept and west-range walls about 178 px = 23.4m; S14's garth 18.6m |
| 40 | Ranges: east range and refectory assumed; west wing "not known whether ... even finished" | Confirmed | S12 exact |
| 41 | After 1536: choir and presbytery a parish church until 1772-3 [S10]; S11 "noted to be 150ft in length in 1710"; the contradiction | Confirmed | S10 and S11 exact (https://coflein.gov.uk/en/site/101870). The arithmetic stands: 150ft = 45.7m, close to my 50m finished church, far from the eastern arm |
| 42 | Post-Dissolution platform at the nave's north-east, blocking in the south aisle wall | Confirmed | Both shown on S13 and S14 as post-Dissolution; S16 quote exact |
| 43 | St Michael's 1772-3 from abbey stone; 1845 collapse; clearance before 1906 and from 1933 | Confirmed | S10, S11, S12 |

### Dinefwr

| # | Claim in the note | Verdict | Evidence |
|---|---|---|---|
| 44 | Two enclosures, rock-hewn ditches about 15m wide; outer ward in higher north and lower south parts | Confirmed | S21; S22 "reaching about 15 meters"; S23 labels |
| 45 | Inner ward a pentagon, courtyard "approximately 50 x 28 meters" [S22]; measured about 56m on a bearing of about 140° by about 40m; sides 31/33/30/33/17m | Partly | Text confirmed. My re-measure on S23: NW tower to SE corner 468 px = 57.3m on a bearing of 141°; sides NW 17.8m, W 32.3m, S 35m, E 26.5m, NE 34.5m. But the width across the axis is only 281-308 px = 34-38m, not 40m |
| 46 | Curtain 1.8m | Confirmed | S22 "walls 1.8 meters thick" |
| 47 | Great tower on the east side, just inside the east curtain [S23]; "south-eastern part of the courtyard" [S22] | Partly | Both sources right, but on S23 the keep's centre is about 9m west and 8m north of the south-east corner, and its south face is about 2m from the south curtain: it sits in the south-east angle, not midway along the east side. The original gate was "on the south-east side, in close proximity to the keep" [S22] |
| 48 | Keep 12m [S21], 13.5m with walls 2.6m [S22], about 14m measured with walls about 3m | Confirmed | My re-measure: dark ring 116-118 px = 14.3-14.4m (15.2m to the thin outer line), walls 26 px = 3.2m. Still contested between texts and plan, as the note says |
| 49 | Keep now a two-storey stump with the summerhouse | Confirmed | S21 exact |
| 50 | North-west tower about 7m [S22] (measured about 7.3m); its courtyard side rebuilt flat | Partly | Text confirmed. My re-measure on S23: 67 px = 8.2m across (interior about 3.9m). Its ratio to the keep (0.57) gives 6.9-7.7m if the keep is 12-13.5m as the texts say. The note also omits its date: S22 "probably at the beginning of the second half of the 13th century", and S23 colours it Phase 2 (sampled RGB 54,0,2 against the legend's 40,0,0) |
| 51 | Hall 13 x 6m (early 14th century) and late-13th-century chamber block on the north-east curtain | Confirmed | S22: hall "13 meters long and 6 meters wide", "probably already in the first half of the fourteenth century"; chamber block after the English capture, late 13th century |
| 52 | Gate history: original south-east gate; inner gatehouse 1250-70; later gate moved to the south curtain by the south-west turret, reached by a walled passage from a Middle Gate | Confirmed | S22 "Around 1250-1270, it was reinforced with a gatehouse"; "The gate portal was moved further west to the longer curtain"; S23 labels Inner Gate, Turret and Middle Gate |
| 53 | Outer ward: "two large and three small buildings" in 1282 | Confirmed | S22 exact. Size not re-measured |
| 54 | Old town sites marked "site of?"; upper town first recorded 1281 | Confirmed | S23 labels; S21 exact |
| 55 | S24's scale bar would make the keep 21m | Confirmed | My re-measure: 40m bar 184 px, keep 99 px = 21.5m |

### Carreg Cennen

| # | Claim in the note | Verdict | Evidence |
|---|---|---|---|
| 56 | Inner ward clear about 33 x 26m, outside about 38 x 31m; "about 28-33m across" [S25]; "32 x 28 meters" [S26] | Confirmed | My re-measure on S27: outside 342 x 279 px = 38.0 x 31.0m, clear 298 x 239 px = 33.1 x 26.5m |
| 57 | Curtains: north and east about 2.8m, west 1.9m, south 1.8m | Confirmed | My re-measure: north 2.8m, east 2.9m, west 1.9-2.2m, south 1.7m. S26 "up to 2.8 meters ... the eastern and northern ones" |
| 58 | Gatehouse in the north curtain, a little west of its middle; twin half-octagonal three-storey towers | Partly | North curtain and form confirmed (S25 "a great twin towered gatehouse on the north side"; S26 "two three-story towers ... elongated halves of octagons"). But the passage (x about 655) sits at the middle of the clear width (x 500-798, midpoint 649), within about 1m, not west of it |
| 59 | North-west tower round, about 8m (8.4m measured) | Confirmed | S26 "about 8 meters"; my re-measure 69 px = 7.7m |
| 60 | North-east tower polygonal, "sides of approximately 9 meters"; 10.8 x 9.1m measured | Partly | Text confirmed. My re-measure: 86 x 86 px = 9.5 x 9.5m, not 10.8 x 9.1 |
| 61 | Chapel tower mid east curtain; small square south-east tower; "the tower above the king's chamber" (1369) | Confirmed | S26 exact |
| 62 | Barbican route: gatehouse, pit, Middle Gate Tower at the barbican's north-west corner, ramp east about 40m over two pits past a round-fronted tower, then south down steps into the eastern outer ward; three drawbridges; rock-cut ditch | Confirmed | Plan S27 shows exactly this (pits by the gate, Middle Gate Tower, Barbican, two pairs of pits, the round-ended tower, steps turning south). S26: "a stone ramp led eastwards, and then after passing another gate tower once again turned, this time to the south"; "three drawbridges". Length: Middle Gate Tower's west face to the turn 375 px = 41.6m; the ramp east of that tower about 33m |
| - | Outer ward about 63-65 x 62m, walls about 1.7m, round corner towers, east gate with half-round towers, one cross wall, lime kiln | Confirmed | My re-measure 570 x 545 px = 63 x 60.5m. Note misses S26's second short wall that "divided the northern part of the courtyard", also drawn on S27 off the north wall |
| - | Dates: probably 1287-1321, "built in one operation"; three periods, outer ward last | Confirmed | S25 exact; S26 dates the outer ward "probably at the beginning of the 14th century" |

### St Teilo's, Newton House, Llandeilo Bridge, grid references

| # | Claim in the note | Verdict | Evidence |
|---|---|---|---|
| - | St Teilo's tower form, date contested (C15 / around 1600 / late medieval), double nave, reused medieval foundations, architect contested | Confirmed | S28, S29, S30 exact ("The rebuilders of 1848 chose to use the existing medieval foundations"; "designed by Edward Davies, an architect from Bath") |
| - | St Teilo's OS footprint about 42 x 21m on a bearing of about 70° | Confirmed | My minimum-rectangle fit of `SN_Building.shp`: 42.2 x 21.4m, long side 71° |
| - | Newton House 1660-70; 1532 survey; seven-bay facade; 1773 engraving; 1856-7 recasing with five windows | Confirmed | S32, S33 exact |
| - | Newton House: "the turrets wore steep roofs from 1857 to 1934" | Partly | S33 says only "subsequent alterations include removal of steep turret roofs in l934". When the steep roofs were put on is not stated; 1857 is an inference |
| - | 1848 bridge: one depressed arch, 145ft [S34] / 143ft [S37]; twin carriageway; foundation stone 3 December 1844; centring lost 22 October 1846 | Confirmed | S34, S36, S37 exact |
| - | "There had been a stone bridge at Llandilo in 1577" [S36][S35], marked High | Partly | Quote exact, but S35 is quoting S36, which is quoting Lambarde: one chain of evidence, not a cross-check. S36 also says "At the end of the eighteenth century there was evidently only a ferry". Linking the 1577 bridge to the seven arches is Hughes's inference ("a fair assumption" that Rhys ap Thomas built it after 1485) |
| - | Seven arches before 1730; Turner 1795 two spans down; Rooker 1796-7 three down; temporary wooden bridge lost 10 February 1798, ferry | Confirmed | S35: "another at Llandeilo of seven arches"; Turner "editing out the five solid, standing arches"; Rooker "Four arches out of seven stand and three of the central spans are down"; "February 10th, 1798 ... carried away the temporary wooden bridge" |
| - | After 1798 contested: Hughes's restored seven arches (1812 etching) against Wikipedia's "three-arched bridge" | Partly | Both confirmed, but Wikipedia's sentence is sourced to Lloyd, Orbach and Scourfield, *The Buildings of Wales: Carmarthenshire and Ceredigion* (2006) p. 250, which also says the seven-arch bridge "collapsed in 1795". The contest is Hughes against the Buildings of Wales, a stronger source than the note implies (not read here) |
| - | 1840 phaeton fell 35ft from the parapet | Confirmed | S35 "falling 35 feet" |
| - | All grid references and app offsets | Confirmed | Coflein pages give SN5538720288, SN6328132772, SN6115021731, SN6678919075, SN6293022236, SN6143222531, SN5542030370; Cadw gives 262930/222236, 261432/222529, 262759/222009. Recomputed offsets: 6.7m, 86.6m, 5.4m, 14.4m, 0m, 3-5m, 8.2m |

Rows marked "-" are unnumbered but counted in the totals (74 rows in all).

## Corrections the note needs

1. **Dryslwyn middle ward date.** Add S1's "In the later thirteenth century two further walled courts were
   added" and S9's "Middle and outer wards: Added by Rhys ap Maredudd during 1280s expansion" as dissent,
   and change "Date cross-checked" to "mid-13th century on the Cadw plan and listing; Coflein summary says
   later 13th".
2. **Dryslwyn outer ward.** "Cross-checked: Welsh, before 1287" should cite S1 and S6 only, and note that S3
   names no builder and records Plucknet's post-1287 "repairs and expansion".
3. **Dryslwyn keep.** Walls about 3.2m and interior about 5.7m (re-measured on S4 and S5), not 2.8m and 6.4m.
4. **Dryslwyn middle ward size.** About 52 x 34m measured, not 55 x 30m.
5. **Talley nave.** Built nave about 23-24m from the west front to the crossing, bays about 5.75m, arcade
   centres about 10m, clear nave about 8.7m, south aisle clear about 4.1m with a wall of about 1.2m.
6. **Talley tower footprint.** About 12m east-west by 12.5m north-south over the piers, crossing pier
   centres about 10m each way. The "11.5-12m" range is slightly low.
7. **Talley S14 planned length.** About 75m on its bar, not 77m.
8. **Dinefwr keep position.** Place it in the south-east angle: centre about 9m west and 8m north of the
   south-east corner, its south face about 2m from the south curtain, its east face on the east curtain.
9. **Dinefwr inner ward width.** About 34-38m across, not 40m.
10. **Dinefwr north-west tower.** 8.2m on the plan (7m in the text); give the range 7-8m, and add its date
    (second half of the 13th century, Phase 2 on S23), so the phased model does not show it from the start.
11. **Carreg Cennen.** North-east tower about 9.5 x 9.5m; gatehouse at the middle of the north curtain;
    add the second cross wall in the northern outer ward.
12. **Llandeilo Bridge.** Downgrade "standing by 1577" from High to Medium (one chain: Lambarde via
    Jervoise via Hughes), add Jervoise's late-18th-century ferry remark, and cite *The Buildings of Wales*
    p. 250 for the three-arch bridge rather than Wikipedia.
13. **Newton House.** "Steep turret roofs until 1934" is sourced; "from 1857" is an inference and should be
    labelled so.

A useful fact the note missed: Wikipedia, citing Cragg, *Civil Engineering Heritage: Wales and West Central
England* (1986) pp. 77-78, says the 1848 arch rises 35ft (10.5m) above the river. Not checked against
Cragg.
