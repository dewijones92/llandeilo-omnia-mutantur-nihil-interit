---
title: Talley Abbey (Abaty Talyllychau), phase by phase, for a Blender model
kind: research
status: draft
updated: 2026-10-17
---

# Talley Abbey (Abaty Talyllychau), phase by phase, for a Blender model

Research for Talley Abbey as a scripted Blender landmark at true size and height, like the Roman forts
([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)) and following the
pipeline of [ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md) and
[ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md), each landmark with its own 2m LiDAR area and
sourced or labelled-analogy textures (Dewi's decisions of 2026-10-16/17, as given in the brief). Written by Claude on
2026-10-17 from sources fetched that day; the brief is in [`briefs/talley-abbey.md`](briefs/talley-abbey.md). The
choices in "Plan for the Blender model" are Claude's, under the proactive mandate
([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), and none is Dewi's. Checked once by
the same agent ([check 1](reviews/talley-abbey-check-1.md)), which is **not** the independent check the todo path asks
for; that is still owed.

It extends the Talley sections of [`era-medieval-to-1282.md`](era-medieval-to-1282.md) (history) and
[`building-models.md`](building-models.md) (the first plan, measured on 2026-10-02 from two Cadw-derived drawings), and
replaces the second's dimensions where they differ, saying so.

**How it was done.** The key source turned out to be the excavation report of the Office of Works, B. H. St J. O'Neil,
"Talley Abbey, Carmarthenshire", *Archaeologia Cambrensis* 96 (1941), read from the page images on Welsh Journals (National
Library of Wales), OCR'd here and checked against the images [S14]. Its fold-out **Fig. 1**, the official plan made when
the ruins were cleared and consolidated in 1933-38, with scale bars in feet and metres and the phases shaded, was
downloaded at full resolution (6642 x 4875 pixels) and **fitted to the Welsh Government LiDAR** of 2022 (1m, OGL) [S15][S21].
The earlier excavation by Stephen Williams (1892-94), published in 1897, was read as the Internet Archive's full text
[S16], and gives an independent set of measurements. Coflein, the Cadw listing, the Heneb HER, the Dyfed Archaeological
Trust's 2012 report for Cadw, Monastic Wales, Cadw's visitor pages, medievalheritage.eu, castlewales.com and UK Southwest
were read directly. The Cadw guidebook (Robinson and Platt, *Strata Florida Abbey, Talley Abbey*) was **not** obtained.
WebSearch was used once.

Everything is labelled with the app's three tiers. **Documented**: a source says it, or the survey measures it.
**Reconstructed**: inferred, and the note says from what. **Imagined**: invented to fill a gap.

**The tier rule applied to the parts** (the Dinefwr note's rule, adapted). Most modern texts on Talley descend from one
line of work: the Office of Works clearance of 1933-38, published by O'Neil [S14][S15], which the Cadw guide and Cadw's
plans follow, and from which the listing (citing the guide) [S4], Coflein (citing the guide) [S1], the HER and the 2012
DAT report ("based upon CADW descriptive text 1986") [S5][S6], medievalheritage.eu (citing Platt and Robinson) [S9] and,
probably, castlewales.com and UK Southwest [S19][S20] take their architecture. These count as **one source** for any
reading of the fabric (what is early, what was never built, what is post-medieval), and a part resting on them alone is
marked **documented (one source: O'Neil/Cadw)**. The independent strands are: **Williams's excavation** of 1892-94 [S16],
made forty years earlier with its own measurements and its own (sometimes different) readings; **the LiDAR** [S21], which
measures what stands and where; **Long Price** (1879, quoting Lewis's *Topographical Dictionary* of 1833) [S17] and John
Thomas's photograph of about 1885 [S18] for the ruin before excavation; **Monastic Wales** [S8] for the documented history
(it gives its own sources per event); and **Coflein's St Michael's record** [S2] and the HER's citation of Griffiths 1976
[S5] for the church's use after 1536. A part is plain **documented** only where one of these supports it.

## Summary

- **Placement.** Coflein gives **SN 63281 32772** (E 263281, N 232772) [S1]; Monastic Wales repeats it [S8]. The Cadw
  listing gives **E 263267, N 232772**, 14m west [S4]; the HER **SN63273277** (10m precision) [S5][S6]. On the fitted plan
  Coflein's point lies **inside the crossing, in its south-east quarter**, about 2m west of the line of the tower's
  standing east wall and 8.5m south of the line of its standing north wall; the crossing's centre is at **E 263278.3, N
  232775.7** (±1m), 4.6m north-west of Coflein's point [S15][S21]. The app's point is Coflein's already.
- **The 1941 plan fits the ground to about a metre, at its own scale.** O'Neil's Fig. 1, fitted to the 2022 surface
  model by correlating its walls with the walls the survey sees, needs a rotation of **4.0 degrees clockwise** and a
  scale **within 1%** of its own bars (two fits, with and without the tower: 87.7 and 86.4 pixels a metre against the bars'
  86.6 (feet) and 87.1 (metres)); the two fits agree to within 0.8m everywhere on the church [S15][S21]. The fitted crossing
  piers fall on the standing tower: the plan's north-east and south-east piers at E 263283.6 and 263282.8, the surveyed
  east wall's crest at E 263282.5-263284.5. So the plan's dimensions can be read off its bar, and **the church axis runs
  at a bearing of 94.0 degrees (±0.5)** on the grid, not due east as the app draws it; the plan draws the axis square to
  its north arrow, and whether the arrow is true or magnetic north, and how much of the 4 degrees is the arrow's own
  error, is not known (grid and true north differ by about 1.6 degrees here) [S15][S21].
- **The church as planned was about 72m long outside; as finished, about 49.6m.** Off the 1941 plan: west front to the
  presbytery's east face **71.9m** outside (bar; 71.2-72.3m on the two fits); inside, **68.8m**, which is Williams's
  "226.3" ft (69.0m) inside [S16]; "240ft long" (73.2m) in the HER and DAT text [S5][S6]; "73m" in the listing and
  medievalheritage [S4][S9]; "235 feet" (71.6m) in UK Southwest [S20]. The finished church ran from the medieval cross-wall
  at the fourth pier west of the crossing to the east end: **49.6m** outside (bar), against "162 feet" (49.4m) in UK
  Southwest [S20] [S14][S15]. **Four bays of nave and south aisle were built; the four western bays stayed at footing
  level**: O'Neil's conclusion from the 1933-38 excavation [S14], which the Cadw line follows [S4][S9]; Williams, forty years
  earlier, had already concluded that "the original builders abandoned the work when but a very small portion of it was
  completed" and wrote of "the uncompleted portions of the church" [S16]. How much of the north aisle was built is
  contested between them (see Contested points).
- **The bays are 5.68m** centre to centre (eight of them, 45.4m from the west respond to the crossing pier), the arcade
  centre lines **9.95m** apart, the crossing piers **9.9m** apart both ways [S15]. These replace building-models.md's 5.6m,
  9.7m and 9.6m, which were read off smaller Cadw-derived drawings (±5%).
- **The tower stands to about 24.5m today, not 26m.** On the surface model the crest of the tower's east wall is at
  **136.4-136.8m OD** over a crossing floor at **112.25m OD**: **24.2-24.5m** [S21]. The north wall steps down westward from
  the same top at the north-east corner to about 127.7m (about 15.5m) [S21]. The texts: "24m" (Cadw listing) [S4]; "half of
  a shattered 26m high tower" (Coflein) [S1]; "over 25m" (Monastic Wales) [S8]; "up to 85 feet" (25.9m, UK Southwest)
  [S20]; "26-meter" today and "originally approximately 29 meters" (medievalheritage) [S9]; and O'Neil: "The eastern wall of
  the tower still stands almost to its full height ... the measurement given by Stephen Williams is 95 ft" (29.0m) [S14].
  The survey agrees with the listing. **Contested** (why Williams's figure is 4.5m more is not known).
- **The floor is measured and agrees with the excavator.** The turf, which O'Neil says "everywhere now indicates the
  original floor as accurately as it could be determined", falls on the LiDAR from 112.95m OD at the west end of the
  planned nave to 112.25m at the crossing, 0.7m; O'Neil: "the total drop from the bed of the threshold of the door to the
  level at the crossing being two feet" (0.61m). The western south aisle stands 0.34m above the nave beside it (113.29m
  against 112.95m); O'Neil: "12 to 14 inches above the adjoining part of the church" [S14][S21].
- **What stands today was measured**: besides the tower, part of the north transept's west wall to about 14m above the
  floor; every other wall 1.4-2.6m above the ground beside it, the cloister's front wall 0.2-0.3m [S21]. UK Southwest's
  "only around five feet tall or less" (1.5m) [S20] fits. These are the walls as consolidated in 1933-38 [S14].
- **Phases (proposed).** The large church laid out and its east end begun in the late 12th century (founded 1184-89,
  contested; building "may have begun shortly before 1200", O'Neil); interrupted by the dispute with Whitland and resumed
  "by or before 1208"; **finished small** in the early 13th century; a parish church from 1536 to 1772; abandoned and
  quarried for St Michael's church, with "a large fall occurring in 1845"; cleared and consolidated by the Office of Works
  from 1933. See "Phases" and the plan.
- **How much of the church served the parish after 1536 is contested**, and the app today draws one side. The Cadw line
  says "the choir and presbytery" [S1][S4][S5][S8]; O'Neil says "at first the whole of the monastic presbytery was
  utilised. Subsequently a smaller chancel was built within it" [S14]; but Coflein's St Michael's record has the church
  "150ft in length in 1710" [S2], which is the **whole shortened church** (its inside length is 46.7m, 153ft, on the 1941
  plan [S15]), the HER cites Griffiths (1976) for early 18th-century visitations suggesting it "remained in use, and
  more-or-less entire, until 1772" [S5], Lewis (1833, via Long Price) has it "much out of repair, and half a ruin" and
  given up as "too large" [S17], and O'Neil himself found post-Suppression rebuilding in the **nave's** doorways [S14].
- **Materials, as recorded.** Walls of "the normal uncoursed or roughly coursed rubble"; the south wall's core "set in
  slatey clay which has little lime", lime mortar "only in the faces" [S14]; medieval mortar "hard and white with much
  small and whole river grit" [S14]; ashlar ("freestone") only for the quoins of one crossing pier, one nave pier, the
  buttress by the west door and the presbytery's east end [S14][S16]; the uppermost opening in the tower's east wall with
  "round head and jambs ... of conglomerate" [S14]; interior "plastered throughout and decorated in colour" (Williams), with
  the plaster layers O'Neil describes [S16][S14]; "a red plastered face" on the battered base of the sacristy outside
  [S14]; floor tiles "plain red, buff, and blue glazed" [S16]. The bedrock under the site is the Yr Allt Formation, silty
  mudstone (Ordovician), under hummocky glacial diamicton and gravel [S22]; that the rubble is local is Williams's
  reading ("the local stone") [S16], and that it is this formation's is an inference.

## Placement and the measured frame

| Point | Grid reference | Source | Note |
|---|---|---|---|
| Coflein (the site) | SN 63281 32772 = E 263281, N 232772 | [S1] | The feature's `at` (the forts' rule: a documented reference); inside the crossing |
| Monastic Wales | SN6328132772 | [S8] | Coflein's |
| Cadw listing 15767 | E 263267, N 232772 | [S4] | 14m west of Coflein, in the nave by the first pier west of the crossing |
| HER PRN 1897 | SN63273277 | [S5][S6] | 10m precision |
| Crossing centre | E 263278.3, N 232775.7 (±1m) | [S15][S21] | The mean of the four crossing piers on the fitted plan; floor 112.25m OD |
| Tower east wall crest | E 263282.5-263284.5, N 232770.5-232781.5; top 136.4-136.8m OD | [S21] | Surface-model cells more than 15m above the ground |
| Talley Mound (motte), for the setting | SN 63130 33373 | [S3] | "face across the Upper Lake to the ruins of Talley Abbey, 0.5km to the south" |

**The fit** ([S15] to [S21]). The plan's wall pixels (the black and hatched walls, with the legend, bars, title and north
arrow masked out) were mapped to grid metres and scored against a mask of the surface model's walls (cells standing 0.25m
or more above a 9m median of the surface, and lower than 4.5m above the terrain model, plus the tower), searching rotation,
scale and position. Best fit: rotation -4.0 degrees, scale 0.99 (87.7 px/m); with the tower left out, -4.0 degrees and
1.005 (86.4 px/m). The plan's own bars measure 86.6 px/m (feet, 0 to 90ft) and 87.1 px/m (metres, 0 to 20m; the 10-20m
half crosses the page fold); the bar's 86.8 is used for every dimension below. The tower's walls, which the plan does not
draw above the piers, are the check: the fitted east piers' centres lie on the surveyed east wall's crest. **Positions
below carry about ±1m, dimensions about ±1.5%.** Where Williams gives a figure, it is set beside the plan's.

**Model frame (proposed).** Metres along the church axis (u, east-south-east, bearing 94.0 degrees) and across it (v, to
the left of the axis, north-north-east), with the origin at **Coflein's point**; in the plan model this is `angle: -4`
(a plan's `angle` turns its local frame anticlockwise onto grid north, `src/domain/plan.ts`). In this frame the crossing
centre is at **(-3.0, 3.5)**. The heights are metres above the crossing floor, 112.25m OD.

## The site

- **Between two drainages.** "Talley, situated in a narrow valley on the watershed of two small streams, one flowing into
  the Cothi, northwards, and the other southwards into the Towy" (Williams) [S16]; "Although the Abbey is actually on a
  watershed, its proximity to the lakes is in accordance with a common monastic practice" (O'Neil) [S14]. The name:
  "Talyllychau (from an obsolete Welsh word *llwch* = lake) ... is so named from its situation at the head of two lakes,
  which drain northward to the Afon Cothi" [S14]; Cadw in Welsh: "dau lyn Talyllychau" [S7].
- **The ground** falls gently eastward: 113.5m OD north of the nave, 112.95m at the west end of the planned nave, 112.25m
  in the crossing and presbytery, 111.0m in the churchyard east of the presbytery [S21]. medievalheritage: "On the western
  side of the abbey the land rose sharply" [S9]; the LiDAR shows the valley side rising west of the road [S21].
- **The lakes.** On the 2022 terrain model the southern lake (Coflein's "Upper Lake" [S3]) lies about E 263100-263400,
  N 232900-233250, its south end about 130m north of the abbey; the northern lake about E 263000-263200, N
  233450-233700; the motte stands on the isthmus between them [S3][S21] (lake outlines read off the flat water surface,
  approximate).
- **Neighbours today.** St Michael's church (1772-3) stands just north of the abbey, "within the northern section of the
  abbey precinct" [S2]; the farm buildings of Plas lie to the south, over the cloister's south side and the conventual
  buildings [S14][S5].
- **The precinct** is not traced: the DAT report says the inner precincts of sites "such as Talley Abbey" are "suggested by
  aerial photographs or old maps" [S6]. Nothing is drawn for it.

## Phases

### Before the abbey (not part of the model)

O'Neil records "a tradition that the house was founded by Rhys ap Tewdwr ... whilst some Welsh genealogies include the
name of an abbess of Talley", and rejects it: "There can, however, be little doubt that the abbey ... was founded for
Premonstratensian Canons by Rhys ap Gruffydd (the Lord Rhys)" [S14]. Coflein's motte between the lakes "has no known
history" and "it is likely that the castle fell out of use with the foundation of the Abbey in 1184-9" (Coflein's
inference) [S3]. Williams's theory that Cistercians began the church in "1160 to 1170" is, in his own words, "purely
conjectural" [S16], and nothing later supports it.

### Phase 1: the large church laid out, and the east end begun (founded 1184-89, to c. 1208)

- **Founding.** "Founded for Premonstrtaensian or White Cannons in 1184-9" (Coflein) [S1]; "Established 1184-1189"
  (listing) [S4]; "between 1184 and 1189" (Monastic Wales, two sources) [S8]; "in the 1180s" (Cadw) [S7]; "around 1185" (UK
  Southwest) [S20]. A dependency of St Jean at Amiens (Monastic Wales [S8]; O'Neil: "it is likely that the true parent house
  was St. Jean at Amiens", the evidence "conflicting" [S14]). The year stays contested (open questions: 1184, 1185 or 1189).
- **The first works.** O'Neil: "building may have begun shortly before 1200, but that it was then interrupted for a term of
  years, to be resumed by or before 1208, when the monks had returned to the abbey" (the canons expelled in the Whitland
  dispute, by Gerald's account; "The Premonstratensians had certainly returned to their home by 1208, when King John granted
  them 1½ carucates of land", "the earliest mention of Talley as far as is known") [S14]. The plan shows in solid black "the
  larger layout, of which at least the foundations were laid a few years before A.D. 1200" [S14][S15].
- **What stood by c. 1208 is not known.** O'Neil's evidence for an early start is the east end's: the transept chapels'
  solid dividing walls (the earlier Premonstratensian practice, after Clapham), and details "in full agreement with a date
  late in the twelfth century for the beginning", and "This reversal of fortune may well be reflected in the piers of the
  crossing. Only one of these has moulded quoins of ashlar, and there this embellishment extends only as far as the springers
  of the arch. Above this point the masonry is entirely of rubble" [S14]. Williams, independently, saw the same break: the
  north-east pier's "plain three-quarter round moulding" for "some 15 ft. or 20 ft. from the base" (4.6-6.1m), and above
  it "plain rubble masonry, which has been plastered"; his reading was that the first builders built "some portion of the
  eastern end of the church, including part of the tower" [S16]. So by c. 1208 the crossing piers stood at least to their
  springing, and the east end was begun: **documented that a first campaign laid out the large plan; its standing extent
  reconstructed** (one source for the foundation date: O'Neil/Cadw; the break in the pier: O'Neil and Williams).

### Phase 2: the abbey finished small (c. 1208 to 1536)

- **The shortened church.** "A very much smaller church was actually built than had been intended. It comprised only four
  bays of the nave and southern aisle" (O'Neil) [S14]; "straitened circumstances reduced the nave to a relatively modest
  size when the church was completed, probably in the earlier thirteenth century" (Coflein) [S1]; "completed in the early
  13th century" (medievalheritage) [S9]. O'Neil's proof that the closing walls are medieval, not post-Suppression: the
  cross-wall across nave and aisle at the fourth pier west of the crossing and the blocking walls between the eastern piers
  of the north arcade share the church's mortar and its first plaster, and the lower threshold of the door through the
  cross-wall "lies precisely on the line of this sloping floor of the nave" [S14]. "The wall across the nave is twice as
  wide as the others (4ft. 6 in. and 2 ft. 3 in.) and has a pronounced batter" [S14].
- **The plan of the finished church** (dimensions in the plan section): a square-ended presbytery without aisles, with a
  sacristy and an ante-room on its south; north and south transepts, each with three square-ended chapels on the east; a
  tower over the crossing on four piers; a nave of four bays with an aisle on the south only, its north side closed by a
  wall in the arcade; one bay of the north aisle, built as a room off the north transept; a west front formed by the
  cross-wall, with a door [S14][S15].
- **Doors.** In the cross-wall a door whose "iron crooks, pieces of which remain" show two periods [S14]; the eastern door
  from the south aisle to the cloister, "well preserved up to a height of over 3 ft., and has external jambs of ashlar,
  chamfered and stopped" [S14]; a middle door to the cloister (its first jambs replaced after 1536) [S14]; the north
  transept "entered from the north through a splayed doorway with chamfered jambs" [S14], Williams's "north door, with
  plain chamfered external jambs, nearly 4 ft. wide in the clear" [S16].
- **Stairs and passages.** "A narrow mural stair, which follows the line of the arch up from the north-western pier over
  the crown of the arch and down to the north-eastern pier", joining "a flight of original stairs in the east wall"; the
  east wall "contains a mural passage which ... proceeds upwards all the way to the south-eastern pier" [S14]; the base of
  a stair at the north transept's northern chapel [S14]; Williams's staircase "leading up in the thickness of the wall to
  a passage over the chapels to the tower, of which seven steps are still in situ" [S16]; possibly a night stair in the
  south transept's south-west corner (O'Neil: "if they are the base of a flight of stairs, can only be the remains of the
  night stair") [S14].
- **Openings in the tower's east wall, from the top** (O'Neil): "The uppermost opening ... Its round head and jambs are of
  conglomerate ... Below this opening the roof-creasing of the original presbytery roof is well preserved, and below that is a
  high and narrow opening with a flat head. Yet lower is the rectangular opening, which lights the mural stair over the
  eastern arch" [S14]. "The beam-holes for the ceiling of the roof are visible high up in this wall" [S14]. UK Southwest:
  "three openings, two below the roof level of the presbytery and a window above" [S20].
- **The presbytery's east end**: "three tall, pointed-arch windows set between external pilaster strips or buttresses"
  (medievalheritage) [S9]; Williams: "the jambs of the east window of the presbytery" had "a similar moulding carried round
  its external angles" [S16]; O'Neil found "no traces ... of an altar or altar steps, nor were there any signs even of the
  splays of the eastern lancets" in 1935-36 [S14]. Three lancets: documented (one source: O'Neil/Cadw via medievalheritage),
  an east window of some form: Williams.
- **Vaults.** Each transept chapel had a pointed barrel vault [S9]; "A portion of the stone vault over the northernmost
  chapel" of the south transept "still remains" (O'Neil) [S14]; "a fragment of the plain barrel vaulting" (Williams) [S16];
  "the springing of their former barrel vaults visible on the choir walls" (listing) [S4]. Whether the presbytery was vaulted
  is not known: medievalheritage says the buttresses' "rather massive form ... suggests that the chancel may have been covered with a stone vault,
  or at least that it was initially planned" [S9]. The tower had "the ceiling of the roof" on beams [S14].
- **Changes within the phase.** The southern chapel of the north transept "was lengthened and adorned with an east window;
  at the same time a stair was built in its northern wall", "unlikely to be much later than the completion of the church"
  [S14]. The walls between the transept chapels were "either not completed or some time after completion were breached",
  their ends "roughly faced with rubble quoins" (O'Neil, who reads it as the 13th-century change to open arches) [S14].
- **The cloister and ranges.** A small cloister matching the small church: "a complete northern side of an outer cloister
  wall was found and much of the corresponding eastern and western sides", and "the western door was intended for use with
  a larger cloister, of which only the one wall-face has been discovered" [S14]. Its south side "like parts of the eastern
  and western sides and any conventual buildings which existed, now lies under the adjacent farmyard" [S14]. East range:
  "some traces" and "the beginning of a wall further east, apparently bonded into the transept wall" [S14][S5]; south range:
  "probably lies somewhere beneath the farm buildings to the south" [S5]; west: "no buildings appear to have been completed
  on the west, which was closed off by a plain wall" (HER and DAT, from Cadw's 1986 text) [S5][S6], against "it is not
  known whether this wing was even finished" (medievalheritage) [S9] and "a small fragment of its west range" (UK
  Southwest) [S20]; O'Neil found only "a short length of the back wall", which "may never have been completed" [S14].
  **The ranges' form is not known**; the usual order (chapter house and dormitory east, refectory south) is an analogy
  [S9][S5].
- **Inside.** "The interior walls were plastered, covered with polychromes, and at least some of the windows were glazed with
  stained glass. The floors were partially made of decorative tiles" [S9]; Williams: "fragments of stained glass", walls
  "plastered throughout and decorated in colour", tiles "plain red, buff, and blue glazed", "two specimens ... of somewhat
  rude incised tiles" [S16]; Coflein: "The excavations recovered painted plaster fragments" [S1].
- **Events without a known fabric change.** 1271, Rhys Fychan buried at Talley; c. 1277 "targeted by Edward I"; 1278 in
  royal custody "on account of its poverty" (O'Neil: "taken into the king's hands by reason of its impoverishment through
  the war") [S8][S14]; c. 1380 royal custody again; 1410: "By 1410 it had been 'despoiled, burned and almost destroyed' by
  the English and Welsh armies" (Monastic Wales) [S8], "devastated, looted and burned by the English army" in the Glyndŵr
  rising (medievalheritage) [S9], "an English-led attack in 1427 which resulted in destruction of many of the buildings"
  (UK Southwest) [S20] (**contested**: 1410 or 1427, and by whom); 1535 net income £136 [S8][S14]; 1536 dissolved
  [S1][S4][S8]. No source read says what was rebuilt after the burning.

### Phase 3: the parish church (1536 to 1772)

- "The church continued in use to serve the needs of the parish, and it seems that at first the whole of the monastic
  presbytery was utilised. Subsequently a smaller chancel was built within it" (O'Neil) [S14]. "The choir and presbystery
  were retained to serve as a parish church after 1536 and were not completely forsaken until 1772-3" (Coflein) [S1]; the
  same in the HER, the listing and Monastic Wales [S5][S4][S8]. But: "noted to be 150ft in length in 1710" (Coflein, St
  Michael's) [S2]; "Early 18th century archdeacon's visitations suggest that the abbey church remained in use, and
  more-or-less entire, until 1772 (Griffiths 1976, 321)" (HER) [S5]; "The ancient Abbey Church, though much out of repair,
  and half a ruin, was used for divine service till the year 1772. Being found too large ..." (Lewis 1833, quoted by Long
  Price) [S17]; Williams: "the Abbey church, or some part of it" [S16]. **Contested.**
- **What the fabric shows of it** (O'Neil): post-Suppression walls "built with a distinctive fine, hard, grey mortar with
  quartz grit", removed in 1933-38 except the middle cloister door's later jambs [S14]; a later, higher threshold in the
  cross-wall door, with three steps down into the nave that Williams recorded and that "must be connected with ... the
  post-Suppression rearrangement of the church" [S14][S16]; the floor of the shortened church "east of the cross-wall was
  lowered to make it level" at some later time [S14]; a "known wall of the post-Suppression church under the northern arch
  of the tower" [S14]; blocking walls of that date across the arch into the north-aisle bay, which "show that the bay was
  not included in the church of that time" [S14]; a post-Suppression opening between the presbytery and the nearest north
  transept chapel [S14]; a "pure white and soft plaster" outer layer of that date on the tower and the nave's walls [S14].
  So the nave was in use and altered after 1536, which supports the 150ft of 1710 over "choir and presbytery".
- **The tower in this phase**: no source read says whether it stood whole. O'Neil suggests the tower's collapse may be
  connected with the slanting south-east nave pier, but gives no date [S14].
- **1772.** "In 1772 the site was deserted and a new church ... was erected to the north. It is probable that much of the
  old material was reused in 1772" (O'Neil) [S14]; "rebuilt within the northern section of the abbey precinct, constructed
  from stone recovered from the demolished abbey church", box pews "dating to 1773" (Coflein, St Michael's) [S2]; "until
  1773, the presbytery and choir were used as a parish church. Thereafter it became a quarry" (listing) [S4]; Lewis via Long
  Price: "taken down, and some of the stones and timber employed to build the present church" [S17]; the HER lists a
  "'great bell' sold to Exeter Cathedral in 1772" [S5], as does Long Price [S17]. The year is 1772 or 1772-3.

### Phase 4: the quarried ruin (1772 to 1933)

- "The remaining buildings on the older site were left to decay and gradual collapse, a large fall occurring in 1845"
  (O'Neil) [S14]; "the large collapse of part of the walls of the former abbey church in 1845" (medievalheritage) [S9]
  (one source: O'Neil/Cadw).
- **The tower.** In 1879: "the one surviving wall of the great central tower, still retaining its original height" (Long
  Price) [S17]; about 1885, John Thomas's photograph shows the tower, ivy-covered, as a tall fragment with a stepped top,
  and St Michael's beyond [S18]; in 1897, "a mass of the tower has recently fallen" (Williams) [S16]; in 1933 "the only
  medieval walls still standing to any considerable height above the ground level ... were the northern and eastern walls
  of the tower and part of the north transept", "in a highly dangerous condition" [S14]. How the tower stood between 1772
  and 1879 is not known, and whether one wall or two stood in 1879 is **contested** (Long Price's "one surviving wall"
  against two in 1933; a second wall may simply have been the north wall's lower part, an inference).
- **Buried and built over.** Williams: the ruins "generally are covered with from about 6 ft. to 8 ft. of débris" [S16];
  the north transept's walls stood "from 5 ft. to 8 ft. in height ... covered up with the fallen débris" [S16]. In the nave
  stood "a disused and half-empty mausoleum of the Drummond family" and "a small tomb enclosure of Col. Lewis Price Jones",
  "clearly much above the original floor level" [S14], with the post-Suppression walls; the plan marks them 1, 2 and 3
  [S15]. The churchyard covered the church; the farm, the conventual buildings [S16].
- **Williams's excavation, 1892-94**, under D. Long Price of Talley House [S16][S14]; "The ruins are shown as partially
  cleared on the OS County series 2nd edition (Carmarthen. XXV.8 1906)" [S1][S5].

### Phase 5: the consolidated ruin (1933 to now)

- "In 1933 they were transferred by the Representative Body of the Church in Wales to the guardianship of the
  Commissioners of H.M. Works, who have carried out work of consolidation and have excavated the remains of the church"
  [S14]; "further clearance and consolidation followed from 1933 when the remains were taken into state care" [S1]. The
  work ran 1933-38 ("as found in 1933-38") [S14].
- What it did, which the model's today must show: the post-Suppression walls removed; the mausoleum taken down "to the
  original level of the church" and the older Drummond tomb reduced; a "reinforced concrete beam ... inserted, 1 ft. below
  this stair" in the tower's north wall, the missing voussoirs of its south face replaced; the north transept's west wall
  "restored in facework at its top to form a buttress for the northern wall of the tower"; "the wall-tops were made
  waterproof and the wall-faces repointed with lime mortar"; two north-arcade piers "inadvertently carried up too high
  during consolidation. As excavated they were about 2 ft. lower" [S14]. Today: in the care of Cadw, open free [S7][S9].

## Images and drawings

| Image | What it shows | Use |
|---|---|---|
| O'Neil 1941, Fig. 1, the official plan (Office of Works; Crown copyright, reproduced in *Arch. Camb.*) [S15] | The church and the found part of the cloister, phased "Late 12th Century", "Early 13th Century", "Post Reformation"; bars in feet and metres | Measured and fitted; the basis of the plan below. Not copied |
| O'Neil 1941, Plates I-VIII [S14] | The tower and nave before and after preservation, the cross-wall, the transept chapels, the cloister's west wall, the night stair, the west door | Viewed (contact sheet); for the ruin phases |
| Williams 1897, plan and section [S16] | His excavation plan (which O'Neil corrects in places) | Not legible in the OCR'd text; not used |
| John Thomas, "The church and ruined abbey, Talyllychau", glass negative, c. 1885, NLW, public domain [S18] | The tower before excavation, ivy-covered, with St Michael's | Viewed; for `talley-quarried` |
| T. Ball, cutaway reconstruction from the east, as reproduced by medievalheritage.eu [S12] | Presbytery, crossing and transepts roofed, the tower with a low roof inside its walls | An artist's reconstruction, viewed. Not evidence |
| C. Jones-Jenkins, reconstruction with the unbuilt church outlined, as reproduced by medievalheritage.eu [S13] | The shortened church and cloister, the tower one stage above the roofs with a hipped roof | An artist's reconstruction, viewed. Not evidence |
| medievalheritage.eu, plans after Burton and Stöber, and after Platt, Robinson and Cadw [S10][S11] | The same church at smaller scale | Measured in building-models.md (2026-10-02); superseded here by the 1941 plan at full size |

## Contested points (kept contested)

| Point | Readings | Sources |
|---|---|---|
| Founding year | 1184, 1185, 1189 (1184-9, "1180s", "around 1185") | [S1][S4][S7][S8][S20] |
| What became of the western bays' masonry | Never built above footings (O'Neil: most of the north wall and half the west wall absent, the western south aisle never levelled, the walls nowhere more than 4ft 6in above the interior [S14]; Williams: work abandoned "when but a very small portion of it was completed" [S16]) vs UK Southwest's "the remainder having been removed soon after the Dissolution" [S20], which may mean the robbing of what stood. The model follows O'Neil and Williams | [S14][S16][S20] |
| How much of the north aisle was built | One bay (O'Neil, from "a prolonged search") vs to "nearly opposite the second pier ... west of the tower" (Williams) | [S14][S16] |
| What served the parish, 1536-1772 | Choir and presbytery (Cadw line); the presbytery, later a smaller chancel within it (O'Neil); the whole shortened church, "150ft in length in 1710" (Coflein St Michael's), "more-or-less entire" (Griffiths via the HER), "half a ruin" and "too large" (Lewis 1833) | [S1][S2][S4][S5][S14][S17] |
| The tower's height | 24.2-24.5m measured today [S21]; 24m (listing); 26m (Coflein, medievalheritage); over 25m (Monastic Wales); 85ft (UK Southwest); 95ft, Williams's measurement as O'Neil reports it; "originally approximately 29 meters" (medievalheritage) | [S1][S4][S8][S9][S14][S20][S21] |
| Western towers | "an aisled nave of eight bays with at least one western tower" (O'Neil, from a thick unbonded wall in the south aisle "begun in anticipation of the erection of a western tower, but there is no other evidence") vs "probably two western towers" (HER and DAT, Cadw 1986 text) | [S14][S5][S6] |
| A west range | Closed by a plain wall, no buildings (HER/DAT); not known whether finished (medievalheritage); "a small fragment" (UK Southwest); a short length of back wall that "may never have been completed" (O'Neil) | [S5][S6][S9][S14][S20] |
| The burning of the 15th century | 1410, "despoiled, burned and almost destroyed" by English and Welsh armies (Monastic Wales); by the English army in Glyndŵr's rising (medievalheritage); "an English-led attack in 1427" (UK Southwest) | [S8][S9][S20] |
| When the church was abandoned | 1772 (O'Neil, Long Price, Coflein St Michael's), 1772-3 (Coflein), 1773 (listing) | [S1][S2][S4][S14][S17] |
| The tower in 1879 | "the one surviving wall" (Long Price) vs north and east walls standing in 1933 (O'Neil) | [S17][S14] |
| What the church measured | Total 71.9m outside on the plan; "240ft" (73.2m, HER/DAT); 73m (listing, medievalheritage); 235ft (UK Southwest); 226.3ft inside (Williams), which the plan's 68.8m inside matches. Williams's tower "29 ft." inside "perfectly square" vs 7.4m (24.4ft) between the piers' faces on the plan, and 9.9m (32.6ft) between their centres: his figure is likely between the tower's walls above the arches, an inference | [S5][S4][S9][S15][S16][S20] |

## Gaps

- **Every height of the standing abbey** except the tower's: no source read gives the walls' or the roofs' heights. The
  presbytery roof's creasing survives on the tower's east wall [S14] and could be measured from photographs or a
  terrestrial survey; the transept roofs' creasing likewise ("the roof-creasing above the arch into the bay") [S14]. The
  north transept's west wall to about 14m [S21] is a lower bound for that wall.
- **The tower's original height and roof.** It stands to about 24.5m, "almost to its full height" [S7][S14]; whether it had
  a parapet, how it was roofed, and Williams's 95ft are open.
- **The ranges** (east, south, west): form, size and height; under the farmyard [S14].
- **The cloister's south side and its north-south length** (medievalheritage's "23×23 meters" [S9] gives a square; the
  found walls run at least 11m south of the front wall's north side [S15]).
- **The post-Suppression church's form**: which parts were roofed, the "smaller chancel" [S14], the "double-gabled roof"
  St Michael's is thought to have had [S2] (that is the new church's).
- **Roof covering** in any phase: not recorded (analogy needed). **Glass, tiles and paint**: recorded as types only.
- **Not read**: the Cadw guide (Robinson and Platt, 1992/1998/2007); Burton and Stöber 2015; *The Buildings of Wales*
  (2006); Owen's history (Arch. Camb. 1893-94); J. B. Smith and O'Neil's Ministry guide (1967); Griffiths 1976 (*NLW
  Journal*) on the visitations; Williams's plan (an image in the 1897 volume); RCAHMW's 1917 Carmarthenshire inventory; the
  OS 1:2500 (1888, 1906) sheets XXV.4 and XXV.8.

## For the owner's decision

- **Phase 1.** Draw the first works (c. 1185 to c. 1208) as their own phase, with the large church's footings laid out and
  the east end rising to an imagined height, or fold them into the abbey. Claude's recommendation: keep it, because the
  laid-out footings of the never-finished church are the story of the place and are documented; the rising walls are
  marked reconstructed.
- **The parish church.** Draw the whole shortened church in use from 1536 to 1772 (Coflein's 150ft of 1710, the
  visitations, Lewis, O'Neil's post-Suppression nave doors), or only the presbytery and crossing as the app does today.
  Claude's recommendation: the whole shortened church, "half a ruin" (the transept chapels unroofed is an inference), with
  the ⓘ giving both readings.
- **The axis.** Turn the church 4 degrees to its measured bearing (94 degrees), which the true-size model needs anyway.

## Plan for the Blender model

Proposed by Claude under the proactive mandate (ADR 0027), following the forts and the Dinefwr note: one feature per
phase, every part with an id, a name, its own provenance and its kits; ground parts stay procedural on the LiDAR terrain
(ADR 0053, point 5). Coordinates are **(u, v)** metres in the model frame above (origin Coflein's point, `angle: -4`), true
size; heights in metres above the crossing floor (112.25m OD). **Every number not marked "measured" or quoted is an
estimate and is marked so.** "Plan" means O'Neil's Fig. 1 read at its bar (86.8 px/m), "LiDAR" the 2022 survey [S21].

An id names one physical part for good, so the same id appears in every phase that has it (the tower is `talley/tower`
throughout).

**Phases and dates (proposed):**

| Feature id (proposed) | Years | Basis |
|---|---|---|
| `talley-first-works` | c. 1185 (1184-89) to c. 1208 | Founded 1184-89 [S1][S4][S8]; building "shortly before 1200", interrupted, resumed "by or before 1208" [S14]. Replaces the start of today's `talley-abbey` (1185) |
| `talley-abbey` | c. 1208 to 1536 | The shortened church completed "in the earlier thirteenth century" [S1][S14]; dissolved 1536 [S1][S8]. The start is O'Neil's latest date for the resumption, an estimate for the boundary |
| `talley-parish-church` | 1536 to 1772 | [S1][S2][S5][S14][S17]; replaces today's `talley-parish-church` and `talley-abandoned` (both 1536-1773). Extent contested |
| `talley-quarried` | 1772 to 1933 | Abandoned for St Michael's [S2][S14]; the 1845 fall [S14]; the 1892-94 excavation [S16]. Replaces today's `talley-ruin` before 1933 |
| `talley-ruin` | 1933 to now | Guardianship and consolidation [S14][S1]; today's heights [S21] |

The dates join with no gap: c. 1185, c. 1208, 1536, 1772, 1933, now.

**Dimensions common to every phase** (the plan, fitted; documented by the plan [S15], cross-checked by Williams's
measurements [S16] where given and by the LiDAR's wall lines [S21]):

| Element | Measured (model frame or size) | Cross-check |
|---|---|---|
| Crossing piers (centres) | (-7.8, 8.5), (2.0, 8.5), (-8.0, -1.5), (2.0, -1.5); 9.9m apart; each cruciform, about 2.3-2.8m across | The tower's surveyed east and north walls stand on the east and north pier lines [S21]; Williams: tower "29 ft." (8.8m) inside, "perfectly square" [S16] |
| Arcade centre lines | v 8.5 (north), v -1.5 (south): 9.95m apart; axis v 3.5 | Williams: nave and aisles "62.6" ft (19.1m) inside; the plan 19.0m between the aisle walls' inner faces |
| Bays | 5.68m; south arcade pier centres at u -13.9, -19.5, -25.1, -30.8 (the four built bays, the last under the cross-wall), -36.4, -42.1, -47.8, and the west respond at -53.5; north arcade on the same u (±0.3m) | Williams: "eight" bays [S16]; O'Neil: "oblong piers of rubble masonry" [S14] |
| West front of the planned church | outer face u -54.1, wall about 1.6m; south-west angle (-54.1, -7.4) | Williams found "the base of the massive buttress of the south-west angle of the west front" [S16] |
| Finished west front (the cross-wall) | u -31.8 to -30.4 (1.35m; O'Neil 4ft 6in, 1.37m), from v 9.2 to -7.4 | O'Neil's measurement [S14]; the LiDAR's ridge at E 263249.5-263250.9 [S21] |
| South aisle wall | outer face v -7.4, about 1.3m | LiDAR wall line [S21] |
| North side of the built nave | blocking walls in the north arcade from u -31.8 to -14.4, about 0.7-0.9m (O'Neil 2ft 3in, 0.69m) | [S14][S21] |
| North-aisle bay | u -14.4 to -8.6, v 9.2 to 14.3 outside; its north wall about 2.0m ("very thick") | One bay (O'Neil) vs two (Williams): contested |
| Planned north aisle wall | outer face v 14.3, about 1.4m (dashed on the plan, "not found") | Footings only at its east end (O'Neil "about 30 feet") |
| Transepts | west walls' outer face u -8.6 (about 1.5m); north end outer v 21.9, south end outer v -15.0: **36.9m** end to end; chapel range's east face u 8.4 (north), 8.7 (south) | Williams: transept inside "36 ft. 9 ins." north of the tower, "29 ft." wide, total "112.3" ft (34.2m) inside, against the plan's 33.8m inside; building-models.md had 36.3m |
| Transept chapels | three a side; inside about 4m wide and 3.4m deep; the north transept's southern chapel lengthened east | [S14][S9][S15] |
| Presbytery | outer faces v 9.2 and -2.4 (11.6m), inside 8.7m; east face u 17.9, wall about 1.6m; inside about 13.2m from the crossing piers' east faces to the east wall | Williams: "44 ft. 9 ins. long by 29 ft. wide" (13.6 x 8.8m) inside [S16] |
| Sacristy and ante-room | sacristy u 10.8 to 16.4, v -2.4 to -7.7 outside, walls about 0.8-0.9m; the ante-room between the south chapel range and the sacristy | [S14][S15] |
| Cloister front (garth) wall | outer corners (-29.1, -9.9) and (-11.0, -9.9): 18.1m east-west, about 0.6m; its sides found to v -21.0 | O'Neil [S14]; medievalheritage's "23×23 meters" is the cloister to its back walls |
| Cloister walks and back walls | walks about 2.5m; west back wall inner face u -31.7 (about 1.1m); east side the transept's west wall, u -8.6: 23.1m between back walls | "23×23 meters" [S9]; "74 foot wide" (22.6m) [S20] |
| The larger cloister's wall-face | u -37.8 | O'Neil [S14] |
| Floor | 0 at the crossing (112.25m OD), rising westward to +0.7m at the west front (measured [S21]; O'Neil 2ft [S14]); the western south aisle +0.34m above the nave (O'Neil 12-14in) | Measured and stated |

**Phase `talley-first-works`** (the plan's black, as built so far; form above ground unknown).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `talley/footings-nave` | walls, low | The planned nave's arcade pier bases and the outer walls' footings as on the plan's black: west front's south half, south aisle wall, the eight bays' piers; 0.5-1m high (estimate) | documented (layout: the plan; one source: O'Neil/Cadw for its date) | S14, S15 | `coursed-rubble` (new kit, shared with Dinefwr) | rubble (local stone, analogy) |
| `talley/east-end-rising` | walls of the presbytery and transepts, unfinished | Footprint as the common table; height **unknown** (estimate 3-6m, a building site) | reconstructed (O'Neil: the east end's details "late in the twelfth century"; Williams: "some portion of the eastern end") | S14, S16 | `coursed-rubble`; `scaffold` (new kit, imagined: putlog holes are recorded on the tower [S14]) | rubble |
| `talley/crossing-piers` | four cruciform piers | As the common table; to the springing, 4.6-6.1m (Williams's 15-20ft moulding, as an estimate of the springing) | documented (the break at the springers: O'Neil and Williams) | S14, S16 | `ashlar-quoins` (new kit: the north-east pier's angle shafts and chamfered plinth, documented) | rubble, freestone quoins |

**Phase `talley-abbey`** (the shortened church, roofed; the western bays as footings).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `talley/nave` | hall | u -31.8 to -8.6, v 9.2 to -1.5 (the nave's span between the north blocking walls and the south arcade); height **unknown** (estimate 11m to the eaves) | documented (plan; the shortening: one source: O'Neil/Cadw); height imagined | S14, S15, S1 | `coursed-rubble`; hall `roof: 'gable'` (existing plan value) | rubble; interior lime plaster with colour (documented, S16) |
| `talley/south-aisle` | hall, lean-to | u -31.8 to -8.6, v -1.5 to -7.4; height **unknown** (estimate 6m) | documented (plan); height imagined | S14, S15, S16 | `coursed-rubble` | rubble |
| `talley/arcade-south` | four arches on oblong rubble piers | Bays 5.68m; the east pier with "a chamfered plinth and moulded quoins of ashlar" | documented | S14, S15 | `pointed-arch` (new kit: "simple pointed arches of rough rubble masonry" [S16]) | rubble, plaster |
| `talley/cross-wall` | wall, the west front | 1.37m, battered, with a door; height **unknown** (to the nave's gable, estimate) | documented (one source: O'Neil/Cadw) | S14, S15 | `coursed-rubble`; `door` (the crooks are documented) | rubble |
| `talley/north-blocking` | wall in the north arcade | 0.69m; height to the arches (estimate) | documented (one source: O'Neil/Cadw) | S14 | `coursed-rubble` | rubble, plaster |
| `talley/north-aisle-bay` | small hall off the north transept | As the common table; height **unknown** (estimate 6m) | documented (one bay, O'Neil); contested (Williams two) | S14, S16 | `coursed-rubble` | rubble |
| `talley/tower` | tower, square, over the crossing | Over the piers about 12.3 x 12.6m; walls over the arches about 1.1m (Williams's 29ft inside, an inference); **today 24.2-24.5m** to the crest (measured); original height **unknown**, at least 24.5m ("almost to its full height"; estimate 25m to the wall-head) | documented (form, place, today's height); top imagined | S14, S16, S21, S1, S4 | `mural-stair` (new kit: the passages and stairs, documented); `pointed-arch` (the crossing arches "turned entirely in rubble"); tower `top` **unknown** (the reconstructions' low roof is an analogy: `top: 'pyramid'` or `'plain'`) | rubble; conglomerate for the uppermost opening (documented); roof covering unknown |
| `talley/transept-n`, `talley/transept-s` | halls, north-south | As the common table; height **unknown** (estimate as the nave) | documented (plan) | S14, S15, S16 | `coursed-rubble`; `door` (the north door, about 1.2m clear, documented [S16]) | rubble |
| `talley/chapels-n`, `talley/chapels-s` | three vaulted chapels a side | As the common table; pointed barrel vaults (documented); the north transept's southern chapel longer, with an east window and a stair (documented); the dividing walls breached (documented, date reconstructed) | documented | S14, S9, S16, S4 | `barrel-vault` (new kit, documented); `altar` (the altars and the "wings" of one are documented) | rubble, tile floor (documented types) |
| `talley/presbytery` | hall | As the common table; height **unknown** (estimate 10m to the eaves; the roof's creasing on the tower would measure it) | documented (plan); height imagined | S14, S15, S16 | `coursed-rubble`; `lancet-window` (new kit: three tall pointed east lancets, one source: O'Neil/Cadw, with Williams's moulded jambs); `pilaster-buttress` | rubble, freestone quoins at the east end (S16) |
| `talley/sacristy` | small hall with an ante-room | As the common table; battered base with "a red plastered face" outside | documented | S14, S15 | `coursed-rubble` | rubble; red plaster on the base (documented) |
| `talley/cloister` | the garth wall with open walks | Front wall about 0.6m; walks 2.5m; south side **unknown** (estimate square, "23×23 meters"); arcade form **unknown** | documented (north side and the sides found); the south side reconstructed | S14, S15, S9 | `cloister-arcade` (new kit, analogy) | rubble, timber (analogy) |
| `talley/range-e` | range south of the south transept | Width and height **unknown** (estimate 8m wide, two storeys, chapter house below and dormitory above, by the order's usual plan) | reconstructed (traces, S14; use by analogy, S9) | S14, S5, S9 | `coursed-rubble`; hall `roof: 'gable'` | rubble |
| `talley/range-s` | refectory range | **Unknown** (under the farm; estimate 8m wide) | imagined (form); its existence presumed (S5) | S5, S9 | as above | as above |
| `talley/cloister-west` | plain wall on the west, no range | The west back wall (u -31.7) carried as a wall (estimate 3m) | documented (one source: O'Neil/Cadw); contested (a west range) | S14, S5, S6 | `coursed-rubble` | rubble |
| `talley/footings-west` | the four unbuilt western bays | As `talley/footings-nave`, west of the cross-wall; pier bases, the south aisle wall to 3ft, the thick wall for a western tower to 20in | documented (O'Neil's excavation; Williams's "uncompleted portions") | S14, S15, S16 | `coursed-rubble` | rubble, turf |

**Phase `talley-parish-church`** (the shortened church in use, "half a ruin").

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `talley/nave`, `talley/presbytery`, `talley/tower` | as `talley-abbey`, roofed | The 1710 length, 150ft, is the shortened church inside (46.7m on the plan) | documented that the church was 150ft (S2) and in use; which parts were roofed **contested** | S2, S5, S14, S17 | as `talley-abbey` | as `talley-abbey`; later plaster, white (documented, S14) |
| `talley/chancel-later` | a smaller chancel inside the presbytery | **Unknown** size | documented that it was built (one source: O'Neil) | S14 | `coursed-rubble` | rubble |
| `talley/cloister`, `talley/range-e`, `talley/range-s` | ruin | Unroofed and robbed (estimate) | imagined (stages) | S14 | ruin support (pipeline) | rubble |
| `talley/north-aisle-bay` | blocked off | A blocking wall across its arch | documented (one source: O'Neil) | S14 | `coursed-rubble` | rubble |

**Phase `talley-quarried`** (1772-1933).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `talley/tower` (ruin) | the north and east walls and part of the north transept | Today's heights (measured) as the end state; the 1845 fall and the 1890s fall are documented, their extent **unknown**; ivy (S18) | documented (1933 state, S14; the photograph, S18) | S14, S16, S17, S18, S21 | ruin support | rubble, ivy (documented, S18) |
| everything else | low walls under debris | Buried "6 ft. to 8 ft." deep in places (S16); shown as low banks | documented (S16) | S16, S14 | none (terrain) | turf |
| `talley/tombs` | the Drummond mausoleum, the older Drummond tomb and the Price Jones enclosure in the nave | **Unknown** size; above the old floor | documented (S14, S15's numbers 1-3) | S14, S15 | none | stone (analogy) |

**Phase `talley-ruin`** (1933 to now): every wall at today's measured height [S21], from the fitted plan: the tower's east
wall to 24.2-24.5m and its north wall from 24.5m at the north-east corner down to about 15.5m at its west end; the north
transept's west wall to about 14m at most; the presbytery's walls about 2.4-2.6m; the transepts' 1.7-2.2m; the nave's
blocking wall and the cross-wall 1.5-1.7m; the south aisle wall 1.4m (0.7m in the western bays); the west front's south half
1.4m; the sacristy 0.7m; the cloister's front wall 0.2-0.3m (heights above the lowest ground within 3m of the wall,
medians along each wall). The post-Suppression walls and the tombs are gone [S14].

**What the Blender build will need.**

1. **Per-part plans** in place of today's `TALLEY`, `TALLEY_PARISH` and `TALLEY_ABANDONED` in `src/content/buildings.ts`
   (a `landscape` plan drawn due east, with the 2026-10-02 dimensions): `true` setting, `angle: -4`, origin on Coflein's
   point, every part with its own provenance.
2. **The phase change.** Today's features (`talley-abbey` 1185-1536, `talley-parish-church` and `talley-abandoned`
   1536-1773, `talley-ruin` 1773-now) would become the five above; the parish phase's extent and the 1772/1773 end are
   contested and the ⓘ says so.
3. **New kits** (none of today's ten is medieval; see the Dinefwr note): `coursed-rubble` (shared), `ashlar-quoins`,
   `pointed-arch`, `barrel-vault`, `lancet-window`, `pilaster-buttress`, `mural-stair`, `altar`, `door` (if the Dinefwr
   build has not made one), `cloister-arcade` (analogy) and `scaffold` (imagined).
4. **Ruin support and prisms** in the build sheet, as for Dinefwr (ADR 0053 refuses ruins today); three of the five phases
   show ruin.
5. **Textures**: rubble (local stone, analogy until a source names it), freestone quoins, conglomerate dressings,
   interior lime plaster with colour, the sacristy's red plaster, glazed tiles (red, buff, blue), ivy for 1772-1933, and an
   unknown roof covering (labelled analogy).
6. **Ground**: a LiDAR detail area (below), so the sloping floor, the churchyard and the lakes come from the survey.

**The LiDAR area proposed.** Talley lies about 8km north of the present LiDAR region (E 260000-265000, N
220500-224500, `tools/terrain/lidar-areas.json`), so it has no LiDAR at all today, only OS Terrain 50. The 1km source tiles
needed are **SN6232, SN6233, SN6332 and SN6333** (the 2020-22 survey, all dated 15 March 2022 in the catalogue and the file
names, delivery 28: `wg_del_28_262232_20220315dtm.tif`, `..._262233_...`, `..._263232_...`, `..._263233_...`), downloaded
for this note to measure the site [S21]. Two options:

| Option | Centre | halfSize | 500m tiles at 2m | Covers |
|---|---|---|---|---|
| A, the abbey | Coflein's point, E 263281 N 232772 | 400 | 9 (E 262500-264000 x N 232000-233500) | The abbey, the village, St Michael's, the farm and the south end of the southern lake |
| B, the abbey and its lakes (recommended) | E 263200, N 233050 | 700 | 12 (E 262500-264000 x N 232000-234000) | Also both lakes and the motte on the isthmus between them (Coflein's "pairing of castle and Abbey across the Upper Lake") [S3] |

Both use the same four source tiles. Either needs the build to take a second region (or a region per landmark), because
the build keeps one region box with a 300m blend margin round every area (`docs/data/lidar.md`); widening the one box to
reach Talley would add a strip some 5km by 9km of 10m context tiles. That is for the build to decide.

## Sources

- [S1] Coflein (RCAHMW), "Talley Abbey; Abbey of The Blessed Virgin and St John The Baptist, Talley", NPRN 92750, SN 63281 32772 (sources: Cadw guide, revised 3rd edition 2007; Suggett 2021; RCAHMW 2022). https://coflein.gov.uk/en/site/92750/ — "half of a shattered 26m high tower and the footings of the church"; "founded ... in 1184-9"; "straitened circumstances reduced the nave to a relatively modest size when the church was completed, probably in the earlier thirteenth century"; choir and presbytery a parish church after 1536, "not completely forsaken until 1772-3"; partially cleared by the OS 2nd edition (1906); consolidation "from 1933"; painted plaster; the panel painting of Elijah. Same record as `models:S10` and `medieval:S54`. Read directly 2026-10-17.
- [S2] Coflein (RCAHMW), "St Michael's Church, Talley", NPRN 101870 (N. Vousden, 2013). https://coflein.gov.uk/en/site/101870/ — "The original church comprised the abbey church itself, and was noted to be 150ft in length in 1710"; rebuilt in 1772 "within the northern section of the abbey precinct, constructed from stone recovered from the demolished abbey church"; box pews of 1773; restored 1863 and 1876. Same record as `models:S11`. Read directly.
- [S3] Coflein (RCAHMW), "Talley Mound - Castle Earthworks", NPRN 303898, SN 63130 33373 (John Wiles, 2008). https://coflein.gov.uk/en/site/303898/ — motte and bailey on the isthmus between the lakes, facing "across the Upper Lake to the ruins of Talley Abbey, 0.5km to the south"; "no known history"; likely out of use "with the foundation of the Abbey in 1184-9". Read directly.
- [S4] Cadw, Listed Buildings Full Report 15767, "Ruin of Talley Abbey", Grade II, designated 8 July 1966, E 263267 N 232772 (source: Robinson and Platt, Cadw 1992). https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=15767 — "Established 1184-1189"; "In royal hands from 1278"; "until 1773, the presbytery and choir were used as a parish church. Thereafter it became a quarry"; guardianship 1933; "a 73m long Latin cross with aisles"; "The N and E walls of the crossing tower stand to a height of 24m"; mural passages, transept chapels with barrel-vault springing, sacristy, plain crossing arches, the moulded south-east nave pier; scheduled monument Cm013. Read directly.
- [S5] Heneb Historic Environment Record (Archwilio), PRN 1897, "St Mary and St John the Baptist; Talley Abbey; Tal-y-llychan", SN63273277 (F. Murphy 2012, "based upon CADW descriptive text 1986"). https://archwilio.org.uk/arch/query/page.php?watprn=DAT1897&dbname=dat&tbname=core — "a church 240ft long with a tower over the crossing and probably two western towers"; the nave "only four bays long, rather than eight"; "Only the north and east sides of the tower now stand"; east range traces, south range under the farm, the west "closed off by a plain wall"; "Early 18th century archdeacon's visitations suggest that the abbey church remained in use, and more-or-less entire, until 1772 (Griffiths 1976, 321)"; artefacts (the "great bell" sold to Exeter in 1772, tiles, glass, a cresset); bibliography. Derived from information held by the Heneb HER Charitable Trust copyright. Read directly.
- [S6] F. Murphy and M. Page, *Later Medieval and Early Post-Medieval Threat Related Assessment Work 2012: Monasteries*, Dyfed Archaeological Trust report 2012/12 for Cadw (project 102639), via Coflein. https://coflein.gov.uk/media/85/443/dat21_05.pdf — Talley's entry (the HER's text), status: listed building 15767, guardianship, scheduled CM013, NGR SN63273277; inner precincts of sites "such as Talley Abbey" are "suggested by aerial photographs or old maps". Read (pdftotext).
- [S7] Cadw, "Talley Abbey" and "Abaty Talyllychau" (visitor pages, English and Welsh). https://cadw.gov.wales/visit/places-to-visit/talley-abbey — "founded in the 1180s"; "The church tower, standing almost to its full height"; "never fully completed"; "beside Talley's twin lakes"; Welsh page https://cadw.llyw.cymru/ymweld/lleoedd-i-ymweld/abaty-talyllychau — "Tŵr yr eglwys, sy'n sefyll bron i'w lawn uchder"; "dau lyn Talyllychau". Same English page as `models:S20` and `medieval:S17`. Read directly.
- [S8] Monastic Wales, "Talley (Abbey)", site 51. https://monasticwales.org/site/51 — "the north and east walls of the tower which extend over 25m in height"; dependency of Amiens, St Jean; events with sources: foundation 1184x1189, 1271 Rhys Fychan's burial, c. 1277 "targeted by Edward I", 1278 royal custody "on account of its poverty", c. 1380 custody, "By 1410 it had been 'despoiled, burned and almost destroyed' by the English and Welsh armies", 1430, the 1497 visitation, c. 1535 £136, 1536 dissolution; bibliography (O'Neil 1941, Williams 1897, Robinson and Platt 1998, Smith and O'Neil 1967). Same page as `models:S15`. Read directly.
- [S9] medievalheritage.eu, "Talley – Premonstratensian Abbey" (bibliography: Burton and Stöber 2015; Lloyd, Orbach and Scourfield 2006; Platt and Robinson 1998; Salter 2012). https://medievalheritage.eu/en/main-page/heritage/wales/talley-abbey/ — the setting; the planned 73m eight-bay church; the shortened church "completed in the early 13th century"; plastered, polychrome walls, stained glass, tiles; the tower "originally approximately 29 meters high"; three tall pointed east windows; six barrel-vaulted chapels; the lengthened chapel; the "23×23 meters" cloister and the ranges by analogy; "large collapse of part of the walls ... in 1845"; today "two walls of 26-meter high tower". Secondary. Same page as `models:S12`. Read directly.
- [S10] medievalheritage.eu, plan of Talley Abbey church "according to J. Burton and K. Stöber based on Cadw". https://medievalheritage.eu/wp-content/uploads/2018/06/Talley-Abbey-plan-02.jpg — measured in building-models.md (`models:S13`); viewed again. Not copied.
- [S11] medievalheritage.eu, plan of Talley Abbey church "according to C. Platt, D. Robinson and Cadw". https://medievalheritage.eu/wp-content/uploads/2019/10/Talley-Abbey-plan-11.jpg — `models:S14`; viewed again. Not copied.
- [S12] T. Ball, cutaway reconstruction of the abbey church from the east, as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Talley-Abbey-rekonstrukcja-11.jpg — presbytery, crossing, transepts and chapels roofed, cloister arcades; an artist's reconstruction, viewed. Not copied.
- [S13] C. Jones-Jenkins, "reconstruction of the monastery with an outline of the part of the church planned but not built", as reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2026/07/Talley-Abbey-rekonstrukcja-22.jpg — the shortened church and ranges, the tower one stage above the roofs; an artist's reconstruction, viewed. Not copied.
- [S14] B. H. St J. O'Neil, "Talley Abbey, Carmarthenshire", *Archaeologia Cambrensis* 96 (1941), pp. 69-91, with Plates I-VIII, Welsh Journals (National Library of Wales). https://journals.library.wales/view/4718179/4739323/114/ (p. 69 is image 114 of the volume's IIIF manifest, https://iiif.llyfrgell.cymru/manifests/2.0/4739323/manifest.json) — the Office of Works report on the clearance and consolidation of 1933-38: history (Lord Rhys's foundation, the Whitland dispute, return by 1208, 1278, 1381, 1430, the Valor's £136 9s. 7d.; "at first the whole of the monastic presbytery was utilised. Subsequently a smaller chancel was built within it"; 1772; "a large fall occurring in 1845"; 1933); the plan "an aisled nave of eight bays with at least one western tower"; the cross-wall and blocking walls proved medieval; "It comprised only four bays of the nave and southern aisle"; the three doors to the cloister and the two cloisters; the floor's two-foot slope and the raised south aisle; one bay of the north aisle; the lengthened chapel and the breached chapel walls; the date argument; the description (tower, mural stairs, openings, conglomerate, beam-holes, presbytery, sacristy with "a red plastered face", transepts, night stair, cloister); the repairs; the cresset. Read from the page images (OCR checked against the images), 2026-10-17.
- [S15] O'Neil 1941 [S14], Fig. 1, "Talley Abbey, Carmarthenshire", the official plan (Ministry of Works and Buildings; "Crown property, the copyright being reserved", reproduced by permission), fold-out before p. 69, IIIF image 4739437 (6642 x 4875 pixels). https://iiif.llyfrgell.cymru/iiif/4739437/full/1200,/0/default.jpg — phases "Late 12th Century", "Early 13th Century", "Post Reformation", post-Reformation vaults 1-3 in the nave; bars of 100ft and 20m (86.6 and 87.1 px/m measured). Stitched at full resolution from IIIF tiles, measured by pixel profiles, and fitted to S21 on 2026-10-17 by Claude (rotation -4.0 degrees, scale within 1% of the bars; two fits agree to 0.8m). Not copied.
- [S16] Stephen W. Williams, "Excavations at Talley Abbey", *Archaeologia Cambrensis*, 5th series, 14 (1897), pp. 229-247, Internet Archive full text (sim_archaeologia-cambrensis_1897-07_14_55). https://archive.org/details/sim_archaeologia-cambrensis_1897-07_14_55 — the 1892-94 excavation: the north transept walls "from 5 ft. to 8 ft. in height" under debris, inside "36 ft. 9 ins." by "29 ft."; the north door "nearly 4 ft. wide"; the stair with "seven steps"; tiles "plain red, buff, and blue glazed"; the north-east pier's moulding "for a height of some 15 ft. or 20 ft."; above, "plain rubble masonry, which has been plastered"; presbytery "44 ft. 9 ins. long by 29 ft. wide"; tower "29 ft." inside, "perfectly square"; the north arcade traced 75ft, piers "about 6 ft." high; debris "6 ft. to 8 ft."; the table (Talley 226.3ft total, 62.6 breadth, 112.3 transepts); "a mass of the tower has recently fallen"; Williams's conjecture of an earlier Cistercian start, "purely conjectural"; the north aisle to "nearly opposite the second pier". Read as OCR text.
- [S17] D. Long Price, "Talley Abbey", *Archaeologia Cambrensis*, 4th series, 10 (1879), pp. 161-187, Internet Archive full text (sim_archaeologia-cambrensis_1879-07_10_39). https://archive.org/details/sim_archaeologia-cambrensis_1879-07_10_39 — "the one surviving wall of the great central tower, still retaining its original height"; quoting Lewis's *Topographical Dictionary of Wales* (1833): "The ancient Abbey Church, though much out of repair, and half a ruin, was used for divine service till the year 1772. Being found too large ... it was then taken down, and some of the stones and timber employed to build the present church"; the great bell sold to Exeter. Read as OCR text.
- [S18] John Thomas, "[The church and ruined abbey, Talyllychau]", glass negative, c. 1885, National Library of Wales (NLW3363347), via Wikimedia Commons, public domain. https://commons.wikimedia.org/wiki/File:The_church_and_ruined_abbey,_Talyllychau_NLW3363347.jpg — the tower before excavation, ivy-covered, with St Michael's. Viewed.
- [S19] castlewales.com (Jeffrey L. Thomas), "Talley Abbey", photographs 2002. http://www.castlewales.com/talley.html — "only the eastern four bays of the nave and south aisle were actually built higher than foundation level, and of the planned north aisle, only the easternmost bay was built as a small room accessible from the north transept"; "Upper passages that ran through the walls can be seen near the top". Same page as `models:S17`. Read directly.
- [S20] UK Southwest, "Talley Abbey, Carmarthenshire, Wales". https://www.uksouthwest.net/carmarthenshire/talley-abbey/ — "planned to be a large structure, 235 feet in length"; "the finished church was 162 feet long, including a four-bay nave with only one aisle, to the south"; "74 foot wide cloister"; "only around five feet tall or less"; the tower's east wall and the north transept's walls "up to 85 feet"; "an English-led attack in 1427". Secondary, no references. Same page as `models:S16`. Read directly.
- [S21] Welsh Government LiDAR, 2020-22 national survey, 1m DSM and DTM, tiles SN6332, SN6232, SN6233 and SN6333 (`wg_del_28_263232_20220315dsm.tif`, `...dtm.tif` and the others), dated 15 March 2022, DataMapWales; Open Government Licence v3 (see [`../data/lidar.md`](../data/lidar.md)). https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dsm/wg_del_28_263232_20220315dsm.tif — measured 2026-10-17 by Claude: the tower's crest and the floor, wall-top heights along the fitted plan, the floor's slope, the lakes; the plan S15 fitted by correlation (rotation -4.0 degrees, two fits within 0.8m).
- [S22] British Geological Survey, DiGMapGB-50 (v9.25, released 31 March 2025), bedrock and superficial deposits, GetFeatureInfo at the abbey. https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer — bedrock "Yr Allt Formation-Silty mudstone", Ordovician (Ashgill), "deep seas"; superficial "Hummocky (Moundy) Glacial Deposits, Devensian-Diamicton and gravel". Read 2026-10-17.
