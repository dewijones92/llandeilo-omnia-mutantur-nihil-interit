---
title: Carreg Cennen Castle (Castell Carreg Cennen), phase by phase, for a Blender model
kind: research
status: draft
updated: 2026-10-17
---

# Carreg Cennen Castle, phase by phase, for a Blender model

Research for a true-size scripted Blender model of Castell Carreg Cennen, above the Afon Cennen near Trap (the Cadw
listing spells the locality Trapp), in the community of Dyffryn Cennen. Dewi's decisions of 2026-10-16/17: landmarks
are scripted Blender models at true size and height, as the Roman forts are
([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md),
[ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md),
[ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)), each on its own 2m LiDAR area and textured
with sourced or labelled-analogy surfaces. The method follows [`dinefwr-castle.md`](dinefwr-castle.md). Written by
Claude on 2026-10-17 from sources fetched that day; the brief is in [`briefs/carreg-cennen.md`](briefs/carreg-cennen.md).
The choices in "Plan for the Blender model" are Claude's, under the proactive mandate
([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), and none is Dewi's. A re-reading of
every documented claim against the downloaded sources, by the same agent, is
[check 1](reviews/carreg-cennen-check-1.md); it is **not** the independent check. The independent check (a second
reader, fresh downloads) is [check 2](reviews/carreg-cennen-check-2.md); its three important findings and four
suggestions were verified against the sources and fixed on 2026-10-17, so the fixes themselves still want a reader who
did not make them.

It extends the Carreg Cennen sections of [`era-medieval-to-1282.md`](era-medieval-to-1282.md) (history to 1287),
[`building-models.md`](building-models.md) (the first measured outline, 2026-10-02: `models:S25`-`S27`),
[`timeline-and-earliest-occupation.md`](timeline-and-earliest-occupation.md) and
[`event-effects.md`](event-effects.md) (1403 and 1462), and does not repeat their history except where it bears on
what was built.

**How it was done.** Coflein, the Cadw listing and scheduling reports, the Heneb HER, Cadw's own page, Gatehouse,
medievalheritage.eu, castlewales.com and Wikipedia (a lead only) were read as text. Four articles were read from page
images on Welsh Journals (National Library of Wales), OCR'd here with tesseract and checked against the images where a
word mattered: Archdeacon John Williams's history (1857) [S14], Harry Longueville Jones's architectural account with
its plan (1858) [S13], the Ministry of Works note on the 1950 clearance [S15], and D. J. Cathcart King's account of the
1985 visit [S16]. The Brut (Rolls Series) [S17] and Morris's *Welsh Wars of Edward I* (1901) [S18] were read as the
Internet Archive's full texts. The Cadw guidebook (J. M. Lewis, 1960, 1990, 2006) was **not** obtained; its text
reaches this note through Coflein and the HER (both summarise the 2006 edition [S1][S4]), the listing (which cites the
guide and Lewis 1990 [S2]), medievalheritage.eu (which lists Lewis 1990 [S7]) and Wikipedia (which cites Lewis 2006
[S12]). The plan was **measured** against a fresh survey: the Welsh Government LiDAR surface and terrain models of
2022 (1m, OGL) were downloaded for the four tiles round the castle [S20] and the Cadw plan [S8] fitted to them.
WebSearch was used twice.

**The tiers.** Everything is labelled with the app's three tiers. **Documented**: a source says it, or the survey
measures it. **Reconstructed**: inferred, and the note says from what. **Imagined**: invented to fill a gap. As at
Dinefwr, most of the modern descriptions are **one source, the Cadw guidebook, by several routes**: Coflein [S1] and the
HER [S4] copy each other and the guide; the listing [S2] and the schedule [S3] are Cadw documents that draw on the
guide; medievalheritage.eu [S7], castlewales.com [S11] and Wikipedia [S12] draw on it or on Davis and Kenyon, who are
not read here. Any two of those agreeing is one source, not two. The independent strands are the survey [S20]; the 1858
architectural account and plan, made before the Victorian restoration [S13]; the 1857 history [S14]; the Ministry of
Works note of 1950 [S15]; King's 1985 description [S16]; the Brut [S17]; Morris's pay-roll history [S18]; the Bucks'
engraving of 1740 [S19]; and the geological map [S21]. A part that rests on the Cadw family alone is marked
**documented (one source: Cadw)**; a part is plain **documented** only where an independent strand agrees.

**Reading the Cadw plan's key.** The plan's "Uncertain" is an outline with no fill [S8]. Checked on the image
(check 2): it draws as uncertain the outer ward's south-east corner tower (a dashed outline beyond the red Period 3
wall, where the north-west and north-east corner towers are solid red), the oven by the gatehouse (an outlined room
and circle), the lime kiln (line and outline, no period colour) and the building against the south curtain. A part drawn
that way is not given the documented tier for its form or date here, even where the Cadw texts name it. The plan also
colours some masonry blue, "Modern" (see Phase 3).

## Summary

- **Placement.** Coflein gives SN 66789 19075 [S1]; the listing E 266814 N 219093 [S2]; the schedule E 266813 N 219100
  [S3]; the HER SN6681419093 [S4], the listing's point. Coflein's point lies **inside the inner ward**, about 3-4m from
  the middle of its floor; the listing's and the schedule's points are 31m and 35m north-east of it, by the north-east
  tower and the barbican's ditch. The app's point (266801, 219083) is 14m from Coflein's, on the east range [S20].
- **The Cadw plan fits the ground.** The period plan after J. M. Lewis and Cadw [S8], fitted to the LiDAR surface
  model's walls by a search over position, rotation and scale (every third dark pixel of the plan's inner ward, 14,688,
  scored against the surface model's local relief), sits at a rotation of **10.5 degrees** (the drawing's "up" points 10.5 degrees west of
  grid north, and its north arrow a further 4.5 degrees west) and at **9.22 pixels a metre, against the 8.88-8.93 of its
  metre bar and the 9.02-9.05 of its foot bar** (30m = 266 pixels; 100ft = 275-276 pixels): the plan as reproduced is drawn
  about 3-4% larger than its metre bar says, as Dinefwr's plan was about 5% larger. Residuals at four survey control
  points are 0.1-1.5m, and 2.9m at the rounded south-west corner [S8][S20]. The outer ward, the barbican and the
  inner ward all land on banks and walls in the survey (see Placement). Sizes below use the ground's scale and say so.
- **One castle of about 1287-1321, in three close periods (Cadw), or a Welsh core (older readings): contested.**
  Coflein: "it is probable that construction of the castle took place between 1287 and 1321" and "Although built in
  one operation the towers are all of different shapes" [S1]; the schedule: "it is during this time nearly all the
  present stone structure was built, obliterating any traces of earlier works" [S3]. The Cadw plan colours three
  periods, all "Late Thirteenth - Early Fourteenth Century": the inner ward first, then the barbican and middle gate
  tower, then the outer ward [S8]; the listing has the inner ward "built first, then shortly after followed the
  Barbican in front of the gatehouse and flight of steps up from the E, and shortly after that the Outer Ward" [S2].
  Against that: Longueville Jones (1858) thought "the curtains may have been erected, and perhaps the two round towers"
  by the mid-13th century, with the gate towers and every dated detail "of the very end of the thirteenth century, or
  commencement of the fourteenth" [S13]; Morris (1901) took the "four-square" inner ward as Welsh, with "one circular
  tower at an angle, also an extra ward" added by "English hands" [S18]; Wikipedia, citing Lewis 2006, says "The south
  curtain wall may have retained masonry from the earlier Welsh castle" [S12]. **Kept contested**; the plan below
  follows Cadw for the standing castle and shows the Welsh castle as form unknown.
- **The Welsh castle had walls and was burnt in spring 1282 (date and captor contested).** The Brut's 1248 entry is the
  first record [S17]. In 1277 £285 was "issued for the repair of the fortifications of both Dynevor and Caercynan"; in
  1282 Morris has Dafydd ap Gruffudd, with Gruffudd and Llywelyn ap Rhys Fychan, lords of Is Cennen, capture
  "Llandovery and Caercynan on March 26" (p. 154) and, on p. 165, has the castle "seized and destroyed, at least
  partially, by David early in April" (his name for Dafydd). Cadw's listing has it "captured by the forces of Llywelyn
  ap Gruffudd in 1282" [S2] and the schedule "recovered briefly in 1282 by Prince Llywelyn ap Gruffudd" [S3];
  medievalheritage.eu "temporarily taken over by Gruffudd and Llywelyn, the sons of Rhys Fychan" [S7]. In June
  "Caercynan, or the ruins of the castle, was occupied by fifty foot and some workmen, as if the intention were to rebuild" (Morris, from the Exchequer pay-rolls) [S18]. Its form is
  not known. The Ministry of Works thought the rock-cut ditch north of the inner ward "may well have been the main
  defence of the original native stronghold" [S15].
- **Measured today** (surface model, metres above Ordnance Datum) [S20]: the inner ward floor is **264.8-265.0m**; the
  gatehouse towers stand to **275.8-276.4m** (about 11m above the floor, the highest masonry); the chapel tower to
  274.6m; the south curtain to 272.0-274.1m (7-9m above the floor inside, 10-15m above the cliff edge outside); the north
  curtain to 273-274m; the east range to 272-274m; the north-east tower to 272-274m; the north-west tower's rim to about
  270m (5m above the floor, 10-11m above the ground outside); the west curtain to 272.8m at its south end and 268.6m in
  the middle; the middle gate tower to 268.8m. The rock-cut ditch bottoms at 257.4-257.9m OD (about 7m below the ward
  floor); the outer ward's walls are reduced to footings and banks under 2m high on ground falling from about 258m to
  247.5m. These are **today's** heights, after the slighting of 1462, the Earls Cawdor's restoration and the 1950s
  clearance. The south curtain is said to stand to its full height [S2][S11].
- **The cliff.** The south curtain stands on the lip of a limestone precipice: from the wall foot (about 259-263m) the
  ground drops to about 225m within 16m south, then falls on a wooded slope to the Afon Cennen at about 133m OD, some
  220m south [S20]. Sources give "a precipice of nearly 100 feet" (1858) [S13], "a sheer fall of some 300 feet"
  (Morris) [S18], "about 85 meters high" (medievalheritage.eu) [S7] and a crag "90m above the valley" (the schedule)
  [S3]. The survey's 30-40m precipice and 132m from the ward to the river show each is a rough figure for a different
  height.
- **What it is built of.** "Castle, rubble stone with some ashlar dressings" (the listing) [S2]. The crag is the Dowlais
  Limestone Formation (Carboniferous) [S21]; that the rubble is that limestone is an inference (Wikipedia's infobox
  says "local Carboniferous Limestone", uncited [S12]), as is Longueville Jones's guess that the rock "broken" in
  levelling and scarping went "towards the building of the walls" [S13]. The mortar seemed "less cohesive and more
  crumbling than the well known Norman mortar" in 1857 [S14]. No source read says whether walls were rendered or
  limewashed, or what any roof was covered with.
- **Nothing between 1462 and the 19th century but decay.** Cadw: "After its capture by Sir Roger Vaughan in 1462 a force
  of 500 men took four laborious months to dismantle the castle with picks and crowbars" [S6]. The Bucks' engraving of
  1740 shows a roofless ruin on its rock [S19]. In 1858 the west curtain was "now almost destroyed", the interior "much
  blocked up with rubbish", and the owner's recent repairs had put "some new walling ... to the east of the main gateway,
  where it was not wanted" [S13]; Cadw now says "no one is quite sure where the earl's handiwork begins and ends" [S6].

## Placement

| Point | Grid reference | Source | Note |
|---|---|---|---|
| Coflein (the site) | SN 66789 19075 = E 266789, N 219075 | [S1] | Use as the feature's `at` (the forts' rule: a documented reference, not a derived point). On the inner ward floor, about 3-4m from its middle |
| Cadw listing 20923 | E 266814, N 219093 | [S2] | 31m north-east of Coflein's, by the north-east tower |
| Cadw scheduled monument CM001 | E 266813, N 219100 | [S3] | 35m north-east of Coflein's, by the barbican's ditch |
| HER PRN 3998 | SN6681419093 | [S4] | The listing's point |
| Gatehouse | SN66801908 (10m precision) | [S5] | |
| The app's `CARREG_CENNEN_CASTLE` | (266801, 219083) | `src/content/features.ts` | 14m from Coflein's; on the east range |
| North-west tower centre | E 266772.2, N 219090.5 (about a metre) | [S20] | Fitted as the ring of highest surface heights (rim about 270m OD, inside 4.5m) |
| Chapel tower, north-east outer corner | E 266813.8, N 219085.8 | [S20] | The plan's corner lands 0.1m away |
| South-east outer corner | E 266812.8, N 219063.3 | [S20] | The plan's lands 1.5m away |
| The inner ward floor | 264.8-265.0m OD | [S20] | Terrain and surface models, a 9 x 9m box at frame (-4, 0) |

**Plan frame for the model** (proposed): metres east (x) and north (y) of Coflein's point, true size, true height, grid
north. The castle's own axes run about 10.5 degrees anticlockwise of grid north (its west curtain bears about 350
degrees on the survey, and the plan's fit gives 10.5), so walls that are square to each other on the plan are drawn
turned 10.5 degrees in this frame; the fit, not the drawing's north arrow, is used. Every coordinate in "Plan for the
Blender model" is in this frame: the north-west tower's centre straight from the survey, every other point from the
plan [S8] fitted to the survey [S20]. They carry about **±1.5m** at the inner ward and **±3m** in the outer ward and at
the rounded south-west corner.

**What the survey shows of the plan** (the fitted plan drawn over the surface model's local relief): the inner ward's
curtains, gatehouse, towers and range stand as walls; the barbican is a raised walled ramp 33-34m long running east
from the middle gate tower and falling about 4.5m; the outer ward's north wall shows as a low bank exactly on the
plan's line, rising to its north-west and north-east corners, its east wall as a bank and a break at the outer gate,
and its south wall as a bank running east-north-east from the inner ward's south-east corner to the cliff. A modern
fence or track has not been mistaken for these: they follow the plan's breaks, corners and the cross wall [S8][S20].

The castle lies **outside** the app's LiDAR region (E 260000-265000, `tools/terrain/lidar-areas.json`): today it
stands on OS Terrain 50 alone, far too coarse for a 7m-deep ditch 3m wide at its base or a 35m precipice 16m across.
See "A 2m LiDAR area" below.

## The site

- **The crag.** "Carreg Cennen consists of a strongly walled and towered square court about 28-33m across resting on a
  precipice to the south" [S1]. "The S and W sides rise sheer from the cliff" [S2]. Longueville Jones: "From the east,
  the summit of the hill is approached by a steep ascent"; "On the north and west sides the natural escarpment of the
  ground has been sharpened by art; while, on the south side, there is a precipice of nearly 100 feet in depth" [S13].
  Morris: it "sat four-square amid the outcrop of rock, yet not occupying the whole of the top of the crag" [S18].
- **The geology.** The castle stands on the Dowlais Limestone Formation, "Limestone", Carboniferous (Holkerian
  Substage, Visean), Pembroke Limestone Group, on the BGS 1:50,000 map (sheet 230, Ammanford) [S21]. Wikipedia's lead
  (citing Pillay 1977, not read) has the outcrop an isolated block of Carboniferous Limestone between two faults of the
  Carreg Cennen Disturbance, in Old Red Sandstone country [S12]; Williams (1857) calls the rock "a huge fragment of
  limestone, reposing on the surface of the red sandstone in complete isolation" [S14]. The geology belongs to the
  deep-time note (`deeptime:S6`).
- **The ditch.** Between the barbican and the north curtain "is a rock-cut ditch with a maximum depth of more than 20
  ft., which may well have been the main defence of the original native stronghold" (Ministry of Works, 1950) [S15].
  medievalheritage.eu: "a ditch was carved in the rock, closed from the east by a transverse wall"; it was lined with
  clay and held rainwater [S7]; castlewales.com calls it "The castle's primary water container" [S11]. **Measured
  today** [S20]: the ditch bottoms at 257.4-257.9m OD from about E 266791 to E 266815 (frame x 2 to 26, y 24-31; the
  floor is 258.4-258.7m west of x 0 and 258.9-259.0m beyond x 28; re-sampled in check 2), about 2-3m wide at
  the base on the terrain model, 7m below the ward floor and about 6m below the barbican's top. "More than 20 ft" (6.1m)
  agrees.
- **The cave.** A vaulted passage runs from the inner ward's south-east corner down along the cliff to a natural cave;
  "The mouth of the cave is fitted out as a dovecot" [S1]; "The passage of descent, as long as it keeps in the face of
  the precipice, is loop-holed for light, not for defence" (1858) [S13]; it runs "for more than 46 meters" inside [S7].
  The cave's prehistoric finds are in [`hunter-gatherers.md`](hunter-gatherers.md) (`hunters:S8`, `hunters:S9`).
- **An Iron Age hillfort?** Cadw: "The first stronghold on Carreg Cennen's limestone crag might well have been an Iron
  Age hillfort" [S6]. Longueville Jones found "not the slightest indication of any such work now discoverable" [S13].
  **Contested**, and outside this model (no form is known; see `ironage:S52`).

## Phase 1: the Welsh castle (later 12th century? to 1282)

- **What is recorded.** The first record is the Brut's entry for 1248: "Rhys the Little, son of Rhys Mechyll, obtained
  the castle of Carreg Cennen back again, which his mother had deceitfully given into the possession of the French,
  from hatred towards her son" [S17]. Williams (1857) quotes another version of the chronicle "under the year A.D.
  1254": Rhys Vychan "got the castle of Careg Cynnen, which his mother, of mere hatred conceived against him, had
  delivered to the English" [S14]. The listing: "The first written record in 1248 says that Rhys Fychan had obtained
  the castle back from the English, he was driven out in 1257 by his uncle Maredudd ap Rhys, and he in turn lost it to
  Edward I in 1277" [S2]. Wikipedia and medievalheritage.eu have Rhys taking it **before** the English took possession
  [S12][S7] (the medieval note's reading, `medieval:S25`). **Contested** (year and whether the English held it).
- **Who built it.** Cadw: "The earliest castle was probably the work of a Welsh prince – the Lord Rhys, ruler of south
  Wales" [S6]; medievalheritage.eu: "built in the second half of the 12th century on the initiative of" Rhys ap Gruffudd
  [S7]. Both are one source (Cadw's guide), and both hedge it. The historic landscape record quoted by Gatehouse: the
  llys "appears to have been fortified prior to the construction of the present castle later in that century, possibly
  under the Prince of Deheubarth Rhys ap Gruffydd" [S5]. **The start date is an estimate.**
- **1277 and 1282.** In 1277 Payn de Chaworth "occupied the castle of Caercynan" and £285 was "immediately issued for
  the repair of the fortifications of both Dynevor and Caercynan" [S18]. In 1282 Morris gives two dates for the same loss: Dafydd ap
  Gruffudd, with Gruffudd and Llywelyn, sons of Rhys Fychan and lords of Is Cennen, "captured Llan- dovery and Caercynan
  on March 26" (p. 154), and the castle "had been seized and destroyed, at least partially, by David early in April"
  (p. 165; "David" is Morris's name for Dafydd). **The captor differs by source**: Cadw's listing, "captured by the
  forces of Llywelyn ap Gruffudd in 1282" [S2]; the schedule, "recovered briefly in 1282 by Prince Llywelyn ap
  Gruffudd" [S3]; medievalheritage.eu, "temporarily taken over by Gruffudd and Llywelyn, the sons of Rhys Fychan" [S7].
  The two readings of who (the prince or the sons of Rhys Fychan, who held Is Cennen) may be one event told two ways,
  but no source read says so. On the June expedition "Caercynan, or the ruins of the castle, was occupied
  by fifty foot and some workmen, as if the intention were to rebuild for permanent occupation" [S18]; the medieval
  note has Clare occupying "the bare walls of Carreg Cennen and Llandovery, recently burnt out by the Welsh"
  (`medieval:S28`). So the Welsh castle had walls worth repairing in 1277 and was a burnt ruin by June 1282; the
  **loss itself is dated spring 1282 (26 March or early April), and who took it is contested** (point 15).
- **Form.** Not known. The readings that would put Welsh masonry in the standing castle are listed in the Summary
  (Longueville Jones, Morris, Lewis via Wikipedia) and are contested by Cadw's "obliterating any traces of earlier
  works" [S3]. The one feature any source ties to the native castle is the rock-cut ditch, "may well have been" [S15].
  Longueville Jones read the east curtain behind the hall, "doubled in thickness on the outer side", as the place where
  "if anywhere, we may find traces of the earliest work of the castle" [S13].
- **For the model**: the crag, the ditch (reconstructed) and an imagined wall on the inner ward's line with an imagined
  hall; then, from spring 1282, the same burnt and roofless. See the plan.

## Phase 2: Giffard's castle (c. 1287 to the early 14th century, three periods)

### Who built it, and when (contested)

- **The grant.** Edward I granted the castle to John Giffard in 1283 [S2][S3][S12] (the schedule: "granted to the king’s supporter John Giffard ... in 1283"; the listing says only "rebuilt after 1283"); Cadw: "Carreg Cennen was Giffard's
  reward from a grateful English king", and the builder was "most likely John Giffard" [S6]. The listing: "rebuilt after
  1283 by John Giffard of Brimpsfield, Glos., and his son John. The elder Giffard held it until 1299, except that the
  crown took it over 1287-9 during the rising of Rhys ap Maredudd" and "It seems likely that most of the building
  happened after 1287 and before 1321, but documentary accounts are not available" [S2]. medievalheritage.eu: "Probably
  began after 1284, because the castle was not visited by King Edward I during the then tour of Wales" [S7]. Rhys ap
  Maredudd's capture of the castle in June 1287 is in `medieval:S30`/`S31`.
- **The end.** John Giffard II was executed after the rising of 1321-22: Coflein's sentence is garbled ("it remained with
  them until 1299 when John Giffard II was executed for his part in the baronial rising against Hugh Despenser in
  1321") [S1]; the listing separates the two (the elder died holding it in 1299; John II "was executed for his part in
  the baronial rising ... in 1321") [S2]; medievalheritage.eu has the family hold it "until 1322" [S7]. The building
  window is therefore **c. 1283/1287 to c. 1321**; within it, no part has a recorded date.
- **Three periods.** The plan's key: Period 1 black, Period 2 dark red, Period 3 red, all "Late Thirteenth - Early
  Fourteenth Century", with "Modern" in blue and "Uncertain" as outlines [S8]. Period 1 is the whole inner ward (curtains,
  gatehouse, north-west, north-east and chapel towers, the east range); Period 2 the middle gate tower and the barbican;
  Period 3 the outer ward, including its west wall from the north-west corner down to the gatehouse [S8]. Wikipedia
  (Lewis 2006): "similarities in construction suggest these phases were completed within a short timespan" [S12].
  medievalheritage.eu puts the outer ward "at the latest, third stage of the castle expansion, probably at the beginning
  of the 14th century" [S7]. **The split dates below (c. 1300, c. 1310) are Claude's estimates** inside the window.
- **Date from the details.** Longueville Jones dated the gate towers and every arch, window and moulding "of the very end
  of the thirteenth century, or commencement of the fourteenth" ("of the Caernarvon character"), the King's Chamber's
  windows "identical in detail with windows in Caernarvon Castle" [S13]. Independent of Cadw, and agreeing with its
  window for those parts.

### The parts, as recorded

- **The inner ward.** "Square inner ward with N gatehouse, round NW tower, rounded NE tower and chapel tower in centre of
  E side" [S2]. "It will be perceived by the plan that it forms almost a square inclosure, 87 feet by 80 feet, facing
  with its main entrance to the north" (1858) [S13]: 26.5 by 24.4m clear, as his plan marks them (87ft north-south, 80ft
  from the west curtain to the east range). medievalheritage.eu: "approximately 32 x 28 meters" [S7]; Coflein "about
  28-33m across" [S1]. **Measured on the fitted plan**: clear 24.7m from the west curtain to the range's front and 23-27m
  north to south, which agrees with 1858 to a metre; about 36m east-west over the curtains and 31-40m north-south over
  the walls (the south curtain is not square to the others) [S8][S20].
- **The curtains.** "Thicker walls, up to 2.8 meters wide, were created on the most endangered sides: the eastern and
  northern ones, while the western and southern curtains were slightly thinner" [S7]. As drawn at the ground's scale:
  west about 1.8m, south about 1.7m, north about 2.7m, east 2.7-3.3m behind the range [S8]; Longueville Jones: "the
  curtain has been doubled in thickness on the outer side" behind the hall [S13], and "The walls are thin, not
  peculiarly well built" [S13]. The parapets: "The parapet of the curtain is supported within and without by a string
  of plain corbels, of the true South Welsh type ... they have no machicolations" (1858) [S13]; "all the wall curtains
  and towers were topped with a parapet with battlement, mounted on the corbels protruding from the face of the walls"
  (medievalheritage.eu, "Probably") [S7]. The west curtain's wall-walk "had to be installed on a wooden porch" [S7]. The
  south curtain "held latrines and two windows" [S11]; "two latrines and two larger openings of unknown purpose" [S7].
  The listing: "Curtain walls to W and S, that to W badly ruined, the S preseved [sic] to full height" [S2].
- **The south-west corner (contested).** The listing: "Curved SW corner, not a proper tower" [S2]; medievalheritage.eu:
  "In the south-west corner, the defensive wall received a slight rounding, which filled the edge of the rock and
  prevented the need to build a tower there" [S7]; the Cadw plan draws a rounded corner [S8]. Longueville Jones (1858):
  "At the south-west corner of the castle is the more perfect of the two round towers that strengthened the south and
  west fronts; but the entrance to it is blocked up with rubbish", and his plan draws a round tower there as at the
  north-west [S13]. The schedule has the south-west and south-east corners "lightly defended, by a
  curving projection and a corner turret respectively" [S3]. The survey shows a solid corner about 3-4m across standing to 274.1m OD, the highest point of the
  south curtain, with **no round tower projecting** beyond the two wall faces [S20]. Kept contested; the model follows
  the plan and the survey.
- **The gatehouse.** "A great twin towered gatehouse on the north side" [S1]; "double-towered with spurred bases to
  half-octagonal towers and of 3 storeys" [S2]; "two three-story towers flanking the passage between them, both in the
  shape of elongated halves of octagons" [S7]. 1858: "The grand entrance was between two octagonal towers, with spur
  buttresses and crossed loopholes, but no windows on their outer sides", and "Two sets of portcullis grooves are still
  visible" [S13]. King (1985): the gatehouse "has a pit under the entry and a third pair of pits at the principal gate
  which is defended with doors and a portcullis at each end of the passage" [S16]. medievalheritage.eu adds a corbel
  "which originally could support the protruding machicolation in front of the gate", a fireplace and latrines, and "a
  cylindrical staircase located in the turret at the inner courtyard" [S7]. Bread ovens stood at the gatehouse's
  western corner and two cisterns behind it [S7][S3][S11]. **As drawn at the ground's scale**: each tower about 5.1-5.4m
  across, the pair 13.6m wide and 12.5m deep, projecting about 4m north of the curtain; the passage about 3m [S8]. Today
  the towers stand to 275.8-276.4m OD, about 11m above the ward floor and 17m above the ditch [S20].
- **The north-west tower.** "The north-west tower was the only tower in Carreg Cennen to have a cylindrical form, about 8
  meters in diameter"; "three cross-shaped arrowslits", one "in the 15th century was transformed into a round one,
  adapted for muskets"; "Above there were at least one, and probably two floors, accessible only from the level of the
  defensive walls" [S7]. "The NW tower had an upper floor possibly only accessible from a wall-gallery" [S2]. **Measured**:
  7.5m across on the plan at the ground's scale, wall about 1.5m, inside about 4.5m [S8]; on the survey the rim is
  about 9.5-10m across (a 1m surface model widens it) round an inside of 4-4.5m, centre E 266772.2 N 219090.5, rim at
  about 270m OD [S20]. Diameter: 7.5m (plan), about 8m (text), up to 10m (survey, overstated): **8m, ±0.5m**.
- **The north-east tower.** "The north-east tower, having sides of approximately 9 meters, was the largest defensive
  structure in the castle, extended almost entirely outside the defensive perimeter"; "Its corners were cut, and in the
  lower parts reinforced with spurs"; a vaulted ground floor with "a fireplace and a latrine" [S7]. The listing calls it
  "rounded" [S2] and the schedule "square" [S3]; the plan draws an octagon with long north, south, east and west sides
  and cut corners [S8]. **As drawn**: about 9.0 by 9.2m [S8]. Shape kept contested (polygonal on the plan).
- **The chapel tower.** "From the hall a mural stair led up to the chapel at second floor level, within the square E
  tower" [S2]. 1858: "The chapel was placed in the upper story of a square tower, adjoining the hall, and projecting from
  the midst of the eastern curtain; in it the foundation of the altar, and the remains of the piscina in the south
  wall, are visible" [S13]. The schedule puts it "projecting from the west wall" [S3], a slip against every other
  source and the survey. **As drawn**: about 5.4 by 5.7m, projecting about 5.4m; on the survey its outer face stands
  4.5m out from the curtain's [S8][S20]. Today 274.6m OD, 9.6m above the ward and 16m above the outer ward [S20].
- **The east range.** "E side had main rooms, storage in ground floor, kitchen, hall and solar above" [S2]; "The hall
  entered by an external stone stair is centrally placed; to the north is the kitchen with large stone fireplaces, to the
  south the owner's private apartments which show evidence of alteration, possibly during the tenure of John of Gaunt in
  1369" [S3]. 1858: "the kitchen, with its oven passing partly under the hall"; "No portion of the hall, except the
  cellar underneath, now remains" [S13]. medievalheritage.eu: a "stone, massive pillar supporting the ceiling of the
  basement" in the middle of the hall [S7]. **As drawn**: about 30m long and 7.8m wide inside, from the north-east tower
  to the south curtain [S8].
- **The King's Chamber** (the solar at the south-east corner). 1858: "the remains of two mullioned and transomed
  square-headed windows of two lights each, with the heads of the lights forming square trefoils of the true Edwardan
  character", and "a doorway, with a pointed arch for its head, plainly chamfered" [S13]; Wikipedia (Lewis 2006): a
  fireplace and "traceried windows, one facing into the courtyard, the other outwards" [S12]. medievalheritage.eu: "the
  buttress passed into a small watchtower, which existence is confirmed by the records of 1369 ('the tower above the
  king's chamber')" [S7] (one source; the 1369 record itself not read). The schedule's "corner turret" at the south-east [S3]
  and medievalheritage.eu's architecture section, "the south-east corner with a small four-sided tower" [S7], name the
  same corner block, which the 1858 account calls "the south-east tower" (the engraving of its doorway head) [S13]: all
  Cadw-family or 1858, none giving a size or a height.
- **The barbican and middle gate tower** (Period 2). "The Barbican approach is by a series of steps with drawbridges to
  the square tower with drawbridge over the ditch to the gatehouse" [S2]. King (1985): "a long stepped ramp with pits for
  a drawbridge and its counterpoise between solid round turrets, a second pair of pits in front of a gate in the flank of
  a square tower in front of the gatehouse" [S16]. Ministry of Works (1950): "the approach from the outer to the main
  gate of the Inner Ward is carried on an inclined (originally stepped) path crossing two pairs of drawbridge pits and
  turning at right-angles in front of the entrance" [S15]. medievalheritage.eu: "three drawbridges: two on the ramp and
  one in front of the main gatehouse"; the eastern gate tower "quite small, with rounded corners and closed with a
  portcullis"; the middle gate tower "had at least two floors" and "a basement located below, probably was a prison
  mentioned in 1369" [S7]; the schedule: "a tower containing a basement, referred to as a prison in 1369" [S3]. **As
  drawn and measured**: the middle gate tower about 7.0 by 8.1m, centred at frame (-2.4, 31.4); the ramp about 34m long,
  its passage about 3.8m between walls about 1.1m thick; the round-fronted turret about 3.8m; the ramp's top falls from
  265.1m OD at the west to 260.6m at the east end [S8][S20]. King's "solid round turrets" (a pair) and
  medievalheritage.eu's "eastern gate tower" (one, with a portcullis) may describe the same thing differently: **not
  resolved**.
- **The outer ward** (Period 3). "The outer court had small round towers at its corners and a small gatehouse" [S1];
  "a curtain wall defended by small drum towers at the angles and gate" [S3]; "about 60 x 60 meters", "a wall
  thickness of about 1.7 meters"; the gate "flanked by two, small, half-round towers"; "A short section of the wall
  running out of the gate tower divided the outer ward into the northern and southern parts, another part divided the
  northern part of the courtyard" [S7]. "The Outer Ward defences are much reduced, a lime-kiln survives in the E part"
  [S2]. **As drawn**: about 60m east-west by 60m north-south, walls about 1.4m, corner towers about 3.3-3.5m [S8]; on
  the survey the walls are banks under 2m high on the plan's lines [S20]. Longueville Jones did not recognise it in
  1858: "These outworks, which were of very inconsiderable strength, are now almost destroyed" [S13].
- **The outer ward's buildings.** "The inner buildings of the outer ward was probably made of wooden or half-timbered:
  stables, forge, storerooms" [S7]; the schedule: it "will have enclosed buildings such as stables and the smithy, all
  that is visible today is the remains of a lime kin [sic] with the quarry ditch used to provide raw material, outside the
  curtain wall to the north east are the turf covered remains of a rectangular building of unknown purpose" [S3].
  **Form and place unknown**; both sources hedge.

### Later medieval work (no new plan)

- **1369.** "Accounts of repairs in 1369 suggest that it was then very neglected" [S2]; the alterations to the private
  apartments "possibly during the tenure of John of Gaunt in 1369" [S3]. Not read directly.
- **1403** (contested; `event-effects.md`). Coflein: "In 1403 Carreg Cennen was taken by Owain Glyndwr" [S1]; the
  listing: the walls "were said to have been `completely destroyed'" [S2]; medievalheritage.eu: "a several-month siege
  led to surrender of the castle" with repairs recorded "from 1414-1421" [S7]; Wikipedia: Glyndŵr "failed to take the
  castle" (uncited) and "more than £500" spent "between 1414 and 1421" [S12]. What was damaged is not recorded, so the
  model has no 1403 state; the ⓘ says so.
- **c. 1454-55.** "In the years 1454-1455, of his initiative were carried the necessary repairs and some modernizations
  at the castle, including the introduction of loop holes adapted to the use of hand firearms" (Gruffudd ap Nicolas)
  [S7]; Wikipedia: the gun port in the north-west tower "was likely added at this time" [S12]. One source; the north-west
  tower's round gunport is the one part this adds.

### Materials, as far as recorded

- "Castle, rubble stone with some ashlar dressings" [S2]; "Constructed of rubble stone with ashlar dressings" (Gatehouse's
  summary of the listing) [S5]. Which stone the dressings are is not stated.
- The crag is limestone [S21][S13][S14]; Wikipedia's infobox "local Carboniferous Limestone" is uncited [S12]. The
  rubble being the crag's limestone is an **inference**, likely but unread in any primary description.
- Mortar: "less cohesive and more crumbling than the well known Norman mortar" (1857) [S14]; the lime kiln in the outer
  ward made mortar (medievalheritage.eu's reading) [S7].
- Render, limewash and roofs: **not stated** by any source read. C. Jones-Jenkins's cutaways for Cadw (as reproduced by
  medievalheritage.eu) draw pale walls and low-pitched grey-blue roofs on the gate towers [S9]; that is an artist's
  reconstruction, a reference, not evidence.

## Phase 3: the slighted ruin (1462 to today)

- **1461-62 (contested).** Cadw: capture "by Sir Roger Vaughan in 1462" and 500 men for four months with picks and
  crowbars [S6]; medievalheritage.eu: the Lancastrian garrison decided "to surrender to York forces", an army "under the
  command of Richard Herbert and Roger Vaughan" was sent, and "Using of about five hundred men for four months, work was
  done on its destruction" [S7]; Wikipedia: Mortimer's Cross (1461) "forced Gruffudd's sons to surrender the castle"
  [S12]; Coflein: "rendered unusable in 1462 by Yorkists" [S1]; the historic landscape record: "finally destroyed during
  the Wars of the Roses in 1461" [S5]. Which walls were pulled down is not recorded.
- **After 1462.** Buck (1740): "By the Gift of King Henry 7th it came to Sr Rice ap Thomas ... whose Grandson Rice
  Griffith having forfeited it, it was granted to Richard Vaughan Earl of Carbery" [S19]; Williams (1857): "After the
  accession of Henry VII., the castle was given to Sir Rice ap Thomas", and "It is not probable that Sir Rice used Carreg
  Cennen as a stronghold" [S14]. The engraving shows a roofless ruin, walls broken to uneven heights [S19]. Turner drew
  it in 1798 (Wikipedia, citing Morgan 2008) [S12]; not checked.
- **The 1850s** (1858) [S13]: the interior blocked with rubbish; the south-east corner needing "extensive under-pinning";
  the owner's repairs misplaced. **Restoration**: "Earl Cawdor (1817-98) undertook extensive conservation works in the
  C19, restoring several of the wall walks and repairing many of the openings" [S2]; Cadw: "heavily restoring it" [S6].
  The repairs Longueville Jones saw were already "lately ordered" by "the noble owner" in 1857-58 [S13]; whether he was
  the earl the listing dates is not stated by either.
- **Guardianship and clearance.** Into the guardianship of the Office of Works in 1932 (`timeline:S37`); in 1950 "The
  barbican has now been completely cleared of debris", and the north-west tower, "the western Gate Tower, and ... the
  curtain wall between them" treated [S15].
- **For the model**: one ruin from 1462 to today at the surveyed heights. The surveyed ruin includes the Victorian and
  20th-century work, which cannot be separated (Cadw's own words, above), and the ⓘ says so.

## Images and drawings

| Image | What it shows | Status for the app |
|---|---|---|
| Cadw plan after J. M. Lewis, as reproduced by medievalheritage.eu [S8] | Periods 1-3, modern and uncertain work, first- and second-floor plans of the east range, metre and foot bars | Crown copyright; viewed and measured, **not copied** |
| H. Longueville Jones's plan, 1858 [S13] | The inner ward and the barbican's west end before the restoration, with the 87ft and 80ft dimensions | 1858, out of copyright; viewed. Could be credited and shown |
| "Head of doorway, S.E. Tower", engraving, 1858 [S13] | A doorway head in the King's Chamber block | As above |
| Samuel and Nathaniel Buck, "The South-West View of Caerkenin-Castle", 1740 [S19] | The ruin on its rock | Public domain (National Library of Wales via Wikimedia Commons); usable |
| C. Jones-Jenkins, cutaways of the gatehouse and foregate and of the east range, for Cadw, as reproduced by medievalheritage.eu [S9] | Gatehouse storeys, roofs, parapets on corbels, the barbican's pits | An artist's reconstruction; viewed, not copied |
| A painting captioned "reconstruction of the castle from the 14th century from the north-east according to A.Sorrell" on medievalheritage.eu (uploaded June 2026) | A tall many-towered castle | **Not used**: it shows towers no plan has, and does not look like Sorrell's published style; its attribution is not verified |
| The LiDAR surface model [S20] | Today's walls and banks | OGL; a hillshade could be made for the docs, as for Dinefwr |

## Contested points (kept contested)

1. **How much of the inner ward is Welsh.** None, "obliterating any traces of earlier works" (schedule) [S3], "built in
   one operation" (Coflein) [S1]; the south curtain "may have retained masonry" (Lewis 2006 via Wikipedia) [S12]; the
   curtains and the two round towers possibly mid-13th century (Longueville Jones) [S13]; the whole "four-square" core,
   with the English adding one round tower and the outer ward (Morris) [S18].
2. **When Giffard's work began.** After 1283 (listing) [S2], after 1284 (medievalheritage.eu) [S7], 1287 (Coflein) [S1];
   the crown held the castle 1287-89 [S2].
3. **The 1248 entry.** 1248 (Rolls Series) [S17] or 1254 (the version Williams quotes) [S14]; Rhys "obtained ... back
   again" what had been given "into the possession of the French" [S17] and "back from the English" [S2], or took it
   "before the English took possession of it" [S12][S7].
4. **1403**: taken (Coflein, the listing, medievalheritage.eu) or not (Wikipedia, uncited). Already open in
   `open-questions.md`.
5. **1461 or 1462**, and surrender or capture [S1][S5][S6][S7][S12].
6. **The south-west corner**: a round tower (1858) [S13] or a curved corner (the listing, medievalheritage.eu, the Cadw
   plan) [S2][S7][S8]; the survey shows no projecting tower today [S20].
7. **The north-east tower's shape**: polygonal (medievalheritage.eu, the plan), "rounded" (listing), "square" (schedule).
8. **The gatehouse towers**: half-octagonal (listing, medievalheritage.eu, the plan) or "octagonal" (1858).
9. **The barbican's turrets**: a pair of "solid round turrets" with pits between (King) [S16] or a small eastern gate
   tower with rounded corners and a portcullis (medievalheritage.eu) [S7].
10. **The inner ward's size**: "28-33m across" [S1], "32 x 28 meters" [S7], 87 by 80 feet clear [S13]; the survey and the
    fitted plan agree with 1858.
11. **The north-west tower's diameter**: about 8m (text), 7.5m (plan at the ground's scale), up to 10m on the survey.
12. **The height of the crag**: "nearly 100 feet" [S13], "some 300 feet" [S18], "about 85 meters" [S7], "90m above the
    valley" [S3]; measured 30-40m of precipice and 132m from the ward to the river [S20].
13. **The 19th-century restorer**: the listing names "Earl Cawdor (1817-98)" [S2], Wikipedia "The second Earl Cawdor"
    [S12]; repairs were already under way in 1857-58 under an owner Longueville Jones does not name [S13].
14. **The RCAHMW inventory number**: no. 256 (Gatehouse) [S5] or "Carms. Inv., No. 156" (King) [S16]. The inventory was
    not read.

15. **The capture of 1282**: 26 March (Morris p. 154) or "early in April" (Morris p. 165) [S18]; by Dafydd ap Gruffudd
    with the sons of Rhys Fychan (Morris, medievalheritage.eu) [S18][S7] or by "the forces of Llywelyn ap Gruffudd"
    (the listing and the schedule) [S2][S3].
16. **The translation behind the 1248 reading**: Gatehouse calls Williams ab Ithel's Rolls Series Brut "a flawed
    translation" and names T. Jones, 1952 (Peniarth 20 version) as the best [S5]; the "obtained ... back again" reading
    [S17] and its "drachefyn" (Welsh text, p. 335) rest on the flawed one. Jones 1952 was not read.

## Gaps

- **T. Jones, *Brut y Twysogion* (1952, Peniarth 20)**, the translation Gatehouse recommends over the Rolls Series [S5].
- **The Cadw guidebook** (J. M. Lewis, 1960, 1990, 2006) was not obtained; most of the phasing reaches this note through
  it at second hand.
- **Not read**: Colvin and others, *The History of the King's Works* vol. 2 (1963) p. 602; the 1369 repair accounts and
  the 1414-21 accounts; RCAHMW's 1917 Carmarthenshire inventory (no. 256 or 156); Remfry and Ruckley 2010 and Remfry
  2012 (*Archaeology in Wales* 51, pp. 107-110), which Gatehouse lists; Davis 2000, 2007, 2021; Kenyon 2010; Salter 1996;
  *Archaeologia Cambrensis* 1851, 1855, 1893, 1920 and 1949-51 items the HER lists; Pillay 1977 on the geology;
  Sorrell's published reconstruction (1973). The heights and roofs are most likely in the King's Works and the
  accounts.
- **Medieval heights**: of every tower and curtain, except the south curtain said to stand to full height [S2][S11]
  (and whose wall-walk the Victorian work may have restored [S2]). Floor levels and the gatehouse's three storeys'
  heights.
- **Materials**: which stone the ashlar dressings are; render or limewash; every roof covering.
- **The Welsh castle's form**, and whether any of its masonry stands.
- **The outer ward's buildings**: form, number and place; the rectangular building outside the north-east wall.
- **The pre-restoration ruin's heights** (1462 to the 1850s): only the 1740 engraving and the 1858 account describe it.
- **The barbican's turrets** (one or two) and the place of its transverse wall.
- **Which masonry the plan's "Modern" blue means in the field**: the plan marks a few stretches (Phase 3), but the
  Cadw guide's own caveat that no one is quite sure where the earl's work begins and ends [S6] still holds for the rest.

## For the owner's decision

- **Scale.** The castle is a `landscape` plan today, drawn 2.6 times larger (`src/content/buildings.ts`). Dewi has
  decided landmarks are true size (2026-10-16/17); this note supplies the frame, the fit and the heights for it.
- **Render.** Bare limestone rubble, as the only stone a source describes, or rendered (no source). Claude's
  recommendation: bare stone, the ⓘ saying render is possible and not attested.
- **The Welsh castle.** Draw its walls on the inner ward's line (imagined, with Morris's and Longueville Jones's
  readings in the ⓘ) or show only the crag, the ditch and an imagined fence. Claude's recommendation: an imagined wall
  on the inner line, since 1277's "repair of the fortifications" and 1282's "bare walls" say there were walls.
- **The 1282 ruin.** Show 1282 to c. 1287 as its own state (the Welsh castle burnt) or fold it into the Welsh phase with
  the date in the ⓘ. Claude's recommendation: its own short state, since it is documented and costs only `condition:
  'ruin'` on the same parts.
- **The ruin before restoration.** One ruin, 1462 to today, at the surveyed heights, or a second, lower ruin before the
  1850s. Claude's recommendation: one ruin; no source gives the heights a second one would need.

## Plan for the Blender model

Proposed by Claude under the proactive mandate (ADR 0027). It follows the forts and Dinefwr: one feature per phase,
every part with an id, a name, its own provenance and its kits; ground parts (the crag, the cliff, the ditch, the ward
floor) stay procedural on the terrain (ADR 0053, point 5). Coordinates are metres east and north of Coflein's point
(E 266789, N 219075), true size, grid north; vertices from the fitted plan carry ±1.5m (inner ward) and ±3m (outer ward).
"Ward" means the inner ward's floor, 265.0m OD [S20]. **Every number not marked "measured", "as drawn" or quoted is an
estimate and is marked so.** "As drawn" means read off the Cadw plan at the ground's scale (9.22 pixels a metre), which
carries about ±0.5m on a single dimension.

An id names one physical part for good, so the same id appears in every phase that has that part; if the tests want
ids unique across features, the phase goes in front, as the forts' `fort1/` and `fort2/` do.

**Phases and dates (proposed):**

| Feature id (proposed) | Years | Basis |
|---|---|---|
| `carreg-cennen-welsh` | c. 1175 to spring 1282 (26 March or early April: Morris gives both) | A Welsh castle, probably the Lord Rhys's (Cadw, hedged) [S6][S7]; first record 1248 [S17]; repaired 1277 [S18]. **The start is an estimate** (the app's 1175 is kept); **the end date and the captor are contested** (point 15) |
| `carreg-cennen-burnt` | spring 1282 to c. 1287 | Captured 26 March (p. 154) and "seized and destroyed, at least partially" "early in April" (p. 165) [S18]; "the ruins of the castle" occupied in June [S18]. Can fold into the Welsh phase (owner's decision) |
| `carreg-cennen-inner` | c. 1287 to c. 1300 | Period 1: the inner ward and gatehouse [S8][S2]; the window 1283/1287-1321 [S1][S2][S7]; **both ends estimates** |
| `carreg-cennen-barbican` | c. 1300 to c. 1310 | Period 2: the middle gate tower and barbican, "shortly after" [S2][S8]; **dates estimates** |
| `carreg-cennen-castle` | c. 1310 to 1462 | Period 3: the outer ward, "probably at the beginning of the 14th century" [S7][S8]; the gunport from c. 1455 [S7]; slighted 1462 (or 1461) [S6][S1] |
| `carreg-cennen-ruin` | 1462 to now | Slighted; today's surveyed heights, which include the 19th-century restoration and the 1950 clearance [S2][S6][S15][S20] |

The dates join with no gap: c. 1175, 1282, c. 1287, c. 1300, c. 1310, 1462, now. The app has 1175, 1287, 1300, 1462; the
new boundaries are spring 1282 and c. 1310. Every boundary but 1282 and 1462 is an estimate, and the ⓘ says so; the 1282 boundary carries its uncertainty (26 March or early April, and the captor) in the ⓘ.

**Phase `carreg-cennen-welsh` (form unknown throughout).**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `cennen/ditch-north` | ditch (ground edit) | Today's: base 257.4-257.9m OD from about frame x 2 to 26 at y 24-31 (the floor is 258.4-258.7m west of x 0; re-sampled in check 2), 2-3m wide at the base, 7m below the ward (measured); closed at the east by a transverse wall (see `barbican-crosswall`) | reconstructed ("may well have been the main defence of the original native stronghold" [S15]) | S15, S7, S20 | none | limestone rock (procedural) |
| `cennen/wall-welsh` | wall, closed, on the later inner ward's curtain line (`curtain-*` below) | Height **unknown** (estimate 5m), thickness **unknown** (estimate 1.5m) | imagined (form); that there were walls is documented (1277 repairs, 1282 "bare walls") | S18, `medieval:S28`, S13 | `limestone-rubble` (new) | limestone rubble (inference) |
| `cennen/gate-welsh` | gap in the north wall at the later gate's place, frame (0, 19) | **Unknown** (estimate 3m) | imagined (the north is the one side not on a cliff [S13]) | S13 | `ledged-leaf` (existing, Roman: analogy) | timber |
| `cennen/hall-welsh` | hall along the east wall | **Unknown** (estimate 16 x 7m, 5m to the eaves) | imagined (Longueville Jones's "earliest work" behind the later hall [S13] places it, no more) | S13 | `thatch-roof` or `shingle-roof` (existing, Roman: analogy) | timber, roof |

**The existing kits are Roman**, as the Dinefwr note found: every kit in `src/content/kits.ts` rests on Roman-period
evidence or analogy. Reused on a medieval castle each would show Roman evidence under a medieval label, so each reuse
needs a medieval kit with its own basis, or an analogy text saying the numbers are a Roman guess borrowed for want of a
medieval one.

**Phase `carreg-cennen-burnt`** (spring 1282 to c. 1287): the same parts as `carreg-cennen-welsh` with `condition:
'ruin'` and no roofs; "the ruins of the castle" with "fifty foot and some workmen" [S18]. Tier: documented (the state);
the form imagined, as above. Optional (owner's decision).

**Phase `carreg-cennen-inner`** (Period 1; the Welsh parts gone).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `cennen/curtain-west` | wall, (-16.7, 11.3) to (-12.6, -11.1) | 1.8m as drawn (1.9m measured in `building-models.md`); height: today 7.8m above the ward at its south end, 3.6m in the middle (ruined) (measured); medieval **unknown** (estimate 8m, as the south curtain); wall-walk on a timber gallery ("Probably") | documented (line: the plan fits the survey; date one source: Cadw); height imagined | S8, S20, S2, S7, S13 | `limestone-rubble`; `corbelled-parapet` (new kit: corbels inside and out [S13][S7]); `cross-loop` (new kit) | limestone rubble |
| `cennen/corner-sw` | rounded corner mass, about (-11.5, -12.2) | 3-4m across, today to 274.1m OD, 9.1m above the ward (measured) | documented (survey; "Curved SW corner" [S2], "a curving projection" [S3]); a round tower here (1858 [S13]) is **contested** and not drawn | S2, S3, S7, S8, S20, S13 | `limestone-rubble`, `corbelled-parapet` | limestone rubble |
| `cennen/curtain-south` | wall, (-11.5, -12.2), (1.1, -11.4), (12.7, -11.4), (22.8, -12.9) | 1.7m as drawn; **today 7.0-7.4m above the ward inside, 10-15m above the cliff edge outside (measured), said to be full height** [S2][S11]; two latrines and two openings [S7][S11] | documented (line and height: survey, listing, castlewales; the wall-walk possibly restored [S2]) | S2, S11, S7, S8, S20 | `limestone-rubble`, `corbelled-parapet`, `latrine-chute` (new) | limestone rubble |
| `cennen/curtain-east` | wall, (22.8, -12.9) to (17.1, 17.5) | 2.7-3.3m as drawn, "doubled in thickness on the outer side" behind the hall [S13]; today 7.4m above the ward (measured) | documented (survey and 1858) | S8, S13, S20, S7 | `limestone-rubble`, `corbelled-parapet` | limestone rubble |
| `cennen/curtain-north` | wall, (-14.7, 17.0) to (-7.2, 18.3), and (6.1, 20.8) to (14.9, 22.4) | About 2.7m as drawn ("up to 2.8 meters" [S7]); today 8-9m above the ward (measured) | documented | S7, S8, S20 | `limestone-rubble`, `corbelled-parapet`, `cross-loop` | limestone rubble |
| `cennen/tower-nw` | tower, round, at (-16.75, 15.5) (survey) | **8m** (7.5m as drawn, about 8m in text, up to 10m on the survey: contested), wall about 1.5m, inside about 4.5m (measured); today's rim about 270m OD, 5m above the ward, 10-11m above the ground outside; ground floor and "at least one, and probably two floors" [S7]; medieval height **unknown** (estimate 12m) | documented | S7, S2, S8, S20, S13 | `limestone-rubble`, `corbelled-parapet`, `cross-loop` (three, documented [S7][S11]) | limestone rubble |
| `cennen/gatehouse` | two half-octagonal towers with spurred bases, centres (-4.4, 18.3) and (3.7, 19.8), passage between from (-1.4, 25.2) to (0.9, 12.9) | Each tower about 5.1-5.4m across, the pair 13.6m wide and 12.5m deep, projecting about 4m north of the curtain, passage about 3m (as drawn); three storeys [S2][S7]; today 10.8-11.4m above the ward (measured, the castle's highest masonry); medieval height **unknown** (estimate 14m: three storeys and a parapet) | documented (form: 1858, King, Cadw; the half-octagon one source: Cadw, contested with 1858's "octagonal") | S2, S7, S8, S13, S16, S20, S1 | `limestone-rubble`, `corbelled-parapet`, `cross-loop`, `portcullis` (new; two, documented [S13][S16]), `ledged-leaf` (doors at each end [S16]; Roman: analogy), `drawbridge-pit` (new; documented [S16][S7]), `spiral-stair-turret` (new; one source [S7]) | limestone rubble, ashlar dressings (stone unknown), timber |
| `cennen/tower-ne` | tower, polygonal (cut corners, spurred), centre (19.4, 22.7) | About 9.0 x 9.2m as drawn ("approximately 9 meters" [S7]); vaulted ground floor [S2][S7]; today 272-274m OD, 7-9m above the ward (measured); medieval height **unknown** (estimate 12m) | documented (place and size: survey and Cadw); shape one source (Cadw), **contested** ("rounded" [S2], "square" [S3]) | S7, S2, S3, S8, S20 | `limestone-rubble`, `corbelled-parapet` | limestone rubble |
| `cennen/tower-chapel` | tower, square, centre (22.7, 7.4) | About 5.4 x 5.7m as drawn, projecting 4.5m (survey) to 5.4m (plan); chapel at second-floor level, nothing below the hall's height inside [S2][S7][S13]; today 274.6m OD, 9.6m above the ward, 16m above the outer ward (measured); medieval height **unknown** (estimate 12m) | documented (survey, 1858, listing) | S2, S7, S13, S8, S20 | `limestone-rubble`, `corbelled-parapet`, `cross-loop` ("arrowslit in the Chapel Tower" [S7]) | limestone rubble |
| `cennen/range-east` | hall range against the east curtain, ward-side wall from (8.5, 15.9) to (13.9, -13.4) | About 30m long, 7.8m wide inside (as drawn); basements below, kitchen, hall and solar above [S2][S3]; a central stone pillar in the hall's basement [S7]; today 7-9m above the ward (measured); roof **unknown** (estimate a gable behind the parapet) | documented (layout: 1858, listing, schedule, plan) | S2, S3, S7, S13, S8, S20 | `limestone-rubble`; `stone-stair` (new: the external stair to the hall [S3]); hall `roof: 'gable'` (existing plan value; covering unknown: analogy) | limestone rubble, roof (unknown) |
| `cennen/kings-chamber` | the range's south end, centre about (17.1, -7.3) | Part of `range-east`; two two-light, square-headed windows with trefoiled heads, one to the ward, one south [S13][S12]; fireplace [S12] | documented (1858 and Lewis via Wikipedia) | S13, S12 | `trefoil-window` (new; documented, the 1858 engraving shows a doorway head) | limestone rubble, ashlar dressings |
| `cennen/turret-se` | small tower over the King's Chamber's buttress | **Unknown** (estimate 3 x 3m, 3m above the parapet) | documented (existence of a corner turret: one source, Cadw, by the schedule's "corner turret" [S3] and medievalheritage.eu's "small four-sided tower" [S7]; the 1858 "south-east tower" [S13] names the block, not a size); the small watchtower over it, one source: medievalheritage.eu's reading of a 1369 record [S7] | S3, S7, S13 | `limestone-rubble`, `corbelled-parapet` | limestone rubble |
| `cennen/oven` | round oven at the gatehouse's west inner corner | About 2m as drawn; the plan draws it, with its chamber, as an outline ("Uncertain") | documented (existence; one source: Cadw, since the plan, medievalheritage.eu and castlewales are one family; the 1858 "kitchen oven" is another oven [S13]); its medieval date **reconstructed** (medievalheritage.eu's "originally" [S7]) | S8, S7, S11 | none | limestone rubble |
| `cennen/cisterns` | two stone-lined tanks behind the gatehouse | **Unknown** (estimate 2 x 2m each, 1m deep) | documented (schedule, castlewales; one source: Cadw) | S3, S11, S7 | none | limestone rubble, water |
| `cennen/cave-passage` | vaulted passage from the south-east postern east along the cliff to the cave, (22.8, -12.9) to about (48.2, -1.0) | About 28m long (as drawn, estimate); loops for light; dovecote holes at the cave mouth | documented (1858, Coflein, listing); its date **unknown** (drawn with Period 1, an estimate) | S13, S1, S2, S7 | `limestone-rubble`, `dovecote` (new; documented) | limestone rubble |
| `cennen/building-south` | building against the south curtain (the plan's "uncertain" outline) | About 11 x 5m as drawn | **not drawn**: "of unknown purpose and uncertain date" [S7]; "purpose is unclear" [S11] | S7, S8, S11 | - | - |

**Phase `carreg-cennen-barbican`** (as `carreg-cennen-inner`, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `cennen/gate-middle` | tower, square, centre (-2.4, 31.4) | About 7.0 x 8.1m as drawn; a basement (the 1369 "prison") and at least two floors [S7][S3]; a gate in its flank [S16]; today 268.8m OD, 3.8m above the ward and 11m above the ditch (measured); height **unknown** (estimate 10m above the ditch) | documented (King, schedule, plan, survey) | S7, S3, S16, S8, S20 | `limestone-rubble`, `corbelled-parapet`, `portcullis` [S7], `drawbridge-pit` (the bridge over the ditch to the gatehouse [S2]) | limestone rubble, timber |
| `cennen/barbican` | walled stepped ramp, north wall (-6.6, 34.3) to (34.0, 40.0), turning south to (35.0, 31.7), with steps down into the outer ward | Passage about 3.8m, walls about 1.1m (as drawn); the ramp falls from 265.1m OD to 260.6m (measured); wall height **unknown** (estimate 2.5m above the ramp); two pairs of drawbridge pits on the ramp [S15][S16][S7] | documented (1950, King, listing, plan, survey) | S15, S16, S2, S7, S8, S20 | `limestone-rubble`, `drawbridge-pit`, `stone-steps` (new) | limestone rubble, timber |
| `cennen/barbican-turret` | round-fronted turret on the ramp, at (22.6, 37.1) | About 3.8m (as drawn) | documented (place: plan); form **contested** (one turret with a portcullis [S7] or a pair of solid round turrets [S16]) | S7, S16, S8 | `limestone-rubble`, `portcullis` | limestone rubble |
| `cennen/barbican-crosswall` | wall across the ditch's east end | **Unknown** place and size (estimate near frame x 27, y 24 to 31, where the survey's floor rises from 257.7m to 259.0m at x 28; the earlier estimate of x 21 was inside the ditch's flat base) | documented (existence; one source: medievalheritage.eu [S7]) | S7 | `limestone-rubble` | limestone rubble |

**Phase `carreg-cennen-castle`** (as `carreg-cennen-barbican`, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `cennen/outer-wall` | wall, (-4.5, 24.6), (-9.8, 53.4), (50.0, 67.2), (54.5, 42.7); gate; (55.2, 38.7), (58.2, 5.9), (25.2, -10.5) | About 1.4m as drawn, "about 1.7 meters" [S7]; height **unknown** (estimate 5m); today banks under 2m (measured) | documented (line: plan and survey banks; one source, Cadw, for the stone wall and its date); height imagined | S8, S20, S7, S1, S3 | `limestone-rubble`; wall `top: 'battlements'` (existing plan value; crenellation not attested: analogy) | limestone rubble |
| `cennen/outer-tower-nw`, `-ne` | towers, round, at (-9.8, 53.4), (50.0, 67.2) | About 3.3-3.5m as drawn; height **unknown** (estimate 6m) | documented (one source: Cadw [S1][S3][S8]; solid red on the plan) | S1, S3, S8 | `limestone-rubble` | limestone rubble |
| `cennen/outer-tower-se` | tower, round, at (58.2, 5.9) | About 3.3-3.5m as drawn; height **unknown** (estimate 6m) | **reconstructed**: Coflein and the schedule give corner towers in general (one source: Cadw [S1][S3]) but the plan draws this one as a dashed outline beyond the red wall, "Uncertain" [S8] | S1, S3, S8 | `limestone-rubble` | limestone rubble |
| `cennen/outer-gate` | gate between two small half-round towers in the east wall, at about (54.8, 40.7) | Gap about 2.2m as drawn; towers about 3m | documented (one source: Cadw [S7][S3][S8]; Coflein's "small gatehouse" [S1]) | S7, S3, S1, S8 | `ledged-leaf` (Roman: analogy) | limestone rubble, timber |
| `cennen/outer-crosswalls` | walls, (36.9, 39.6) to (54.5, 40.7), and (20.0, 58.9) to (21.6, 50.6) | As the outer wall | documented (one source: medievalheritage.eu and the plan) | S7, S8 | `limestone-rubble` | limestone rubble |
| `cennen/lime-kiln` | kiln with its quarry ditch, at about (43.4, 10.3) | About 5m across as drawn | existence documented (one source: Cadw, "a lime-kiln survives in the E part" [S2], the schedule, medievalheritage.eu's mortar reading [S7]); its form and place **reconstructed**, since the plan draws it as line and outline with no period colour ("Uncertain") [S8]; its medieval date is an **inference** (it supplied mortar [S7]), and no source dates it, so it is the first part to drop from the medieval phase if the owner prefers the ruin only | S2, S3, S8, S7 | none (a new `lime-kiln` kit, or a ground edit) | limestone, lime |
| `cennen/outer-buildings` | stables, a forge, stores | **Unknown** number, size and place (estimate 3 halls of 12 x 6m in the north part) | imagined ("probably" [S7], "will have" [S3]) | S7, S3 | `timber-frame`, `thatch-roof` (existing, Roman: analogy) | timber, daub, thatch |
| `cennen/gunport` | the north-west tower's ground-floor loop made round, from c. 1455 | Size **unknown** | documented (existence: castlewales, medievalheritage.eu; date one source [S7]) | S7, S11, S12 | `gunport` (new) | limestone rubble |

**Phase `carreg-cennen-ruin`** (1462 to now): every stone part above, at **today's surveyed heights** [S20], roofless, the
outer ward walls as banks, the passage and cave as now. Heights for the ruin, above the ward's 265.0m OD unless stated:
gatehouse 10.8-11.4m; chapel tower 9.6m; south curtain 7.0-7.4m (the south-west corner 9.1m); north curtain 8-9m; east
range 7-9m; north-east tower 7-9m; east curtain 7.4m; the King's Chamber 8.7m; west curtain 7.8m at its south end and
3.6m in the middle; north-west tower about 5m (rim 270m OD); middle gate tower 3.8m (268.8m OD); the barbican ramp at
265.1-260.6m OD; the outer ward's walls under 2m above their own ground [S20]. Tier: documented (survey); which parts
are medieval and which Victorian is not known [S6], and the ⓘ says so. **Not none, though**: the Cadw plan colours some
masonry blue, "Modern" [S8], read on the image in check 2: a short stretch of the south curtain at its east end, beside
the east range's south end (plan pixels about 715-745, 795-830); a piece of the range's west wall (about 730-745,
730-745); and several lengths on the first- and second-floor insets (the kitchen's east wall, the King's Chamber's
south-west corner, the second-floor stair block). The 1858 account puts the owner's "new walling ... to the east of the
main gateway" [S13]. The medieval phases leave those stretches out; the ruin shows them, labelled modern. The 1740 engraving [S19] and the 1858 account
[S13] are in the ⓘ for the years before the restoration.

**Kits proposed (new).** `limestone-rubble` (a wall surface kit; Dinefwr proposes `coursed-rubble` for its flaggy
sandstone, so one kit with two stone textures would keep it DRY); `corbelled-parapet` (documented: corbels inside and
out, no machicolation [S13][S7]); `cross-loop` (documented [S13][S7][S11]); `portcullis` and `drawbridge-pit`
(documented [S13][S16][S7]; Dinefwr also needs `portcullis`); `trefoil-window` (documented [S13]); `stone-stair` and
`stone-steps` (documented [S3][S2]); `spiral-stair-turret` (one source [S7]); `latrine-chute`; `dovecote`;
`gunport`. Sizes for loops, corbels and windows are not given by any source read: analogy from the photographs, said so.

**Textures.** Limestone rubble (pale grey; an inference from the crag [S21], to be photographed or matched to an openly
licensed photograph of the castle, labelled); ashlar dressings (stone **unknown**: labelled analogy); timber (doors,
bridges, galleries); roofs (covering **unknown**: labelled analogy); the outer ward's grass and the crag's bare rock
(procedural).

## A 2m LiDAR area

Proposed area for `tools/terrain/lidar-areas.json` (not changed here; docs only):

```json
{ "id": "carreg-cennen", "name": "Castell Carreg Cennen", "centre": { "e": 266789, "n": 219075 }, "halfSize": 500 }
```

- **Covers** E 266289-267289, N 218575-219575: the crag, the castle, the outer ward, the cliff and the Afon Cennen's
  floor below it (the river at about 133m OD, 220m south), and the approach slopes to the north and east [S20].
- **2m tiles of 500m**: 9, E 266000-267500 by N 218500-220000.
- **Source tiles** (1km, DTM, all dated 13 January 2022 in both the catalogue and their file names, so none of the
  date disagreements `docs/data/lidar.md` lists for the town): SN6618, SN6619, SN6718, SN6719 [S20]. Downloaded
  2026-10-17 to `~/code/data/llandeilo/lidar/carreg-cennen/` (outside the repository and outside `raw/`, so
  `build-lidar.py --verify` is not disturbed), with their DSMs for measuring.
- **The region must grow.** An area must sit 300m inside the region (the blend margin), so the region would become E
  260000-268000 by N 218000-224500: 208 tiles of 500m against today's 80, and about 56 source tiles of 1km against 25
  (the fetch takes every tile in the region). By the manifest's sizes (126KB a 2m tile, 5KB a 10m one) `lidar.bin` would
  grow from 2.95MB to about 4.7MB, an estimate. A `halfSize` of 400 keeps the castle, the cliff and the river (6 tiles
  at 2m) and needs E 267500 rather than 268000.
- **For the owner** (a code question, not research): Dryslwyn (E 255390) lies 4.6km west of the region, so one bounding
  region round every castle grows fast; several regions, or a context ring per area, would be cheaper but changes
  `build-lidar.py` and `src/domain/lidar.ts`.
- **The mesh.** The ditch is 2-3m wide at its base and the precipice drops 30-40m in 16m; the app's mesh stops at 4m
  (ADR 0049), which will round both. The 2m data holds them.

## What this means for the current plans (for the owner)

Observations against `src/content/`, not changes made.

- `carreg-cennen-giffard`'s ⓘ says the outer ward held "half-timbered stables, a forge, stores and a lime kiln" as
  fact; the sources say "probably" [S7] and "will have" [S3]. The lime kiln is the one documented building.
- `carreg-cennen-inner`'s ⓘ calls the gatehouse towers "half-octagonal" without the 1858 "octagonal", and the north-east
  tower "polygonal" without the listing's "rounded" and the schedule's "square"; both are kept contested here.
- `CARREG_CENNEN_CASTLE` (266801, 219083) is 14m from Coflein's point; the forts' rule is Coflein's.
- The landscape plan draws the outer ward on the "gentler north and east slopes", which the survey confirms, but at 2.6
  times the size; the true-size outer ward is 60 by 60m.

## Sources

- [S1] Coflein (RCAHMW), "Carreg Cennen Castle", NPRN 103970, SN6678919075 (RCAHMW, 11 March 2008, from Lewis, J.M.
  2006, *Carreg Cennen Castle*, Cadw). https://coflein.gov.uk/en/site/103970/ — "it is probable that construction of
  the castle took place between 1287 and 1321"; Giffards from 1283 (with the garbled 1299/1321 sentence); "In 1403
  Carreg Cennen was taken by Owain Glyndwr"; "rendered unusable in 1462 by Yorkists"; "a strongly walled and towered
  square court about 28-33m across resting on a precipice to the south"; "Although built in one operation the towers
  are all of different shapes; circular, polygonal and square"; twin-towered gatehouse on the north; outer court with
  small round corner towers and "a small gatehouse"; the passage to the cave, "fitted out as a dovecot". Read directly.
  Same record as `models:S25` and `medieval:S56`.
- [S2] Cadw, Listed Buildings Full Report 20923, "Carreg Cennen Castle", Grade I, designated 24 November 1998, Dyffryn
  Cennen, locality Trapp, E 266814 N 219093.
  https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=20923 — "rebuilt after 1283 by
  John Giffard of Brimpsfield"; "captured by the forces of Llywelyn ap Gruffudd in 1282"; crown 1287-9; "most of the building happened after 1287 and before 1321, but documentary
  accounts are not available"; 1369 neglect; the 1248 record "obtained the castle back from the English"; 1403 walls
  "`completely destroyed'"; "Earl Cawdor (1817-98) ... restoring several of the wall walks"; "rubble stone with some
  ashlar dressings"; the building order; the gatehouse "double-towered with spurred bases to half-octagonal towers and of
  3 storeys"; "rounded NE tower"; the chapel at second floor level "within the square E tower"; "Curved SW corner, not a
  proper tower"; S curtain "preseved to full height"; sources include *Archaeologia Cambrensis* 1857, 1858 and 1950 and
  Lewis 1990. Read directly.
- [S3] Cadw, Scheduled Monuments Full Report CM001, "Castell Carreg Cennen", E 266813 N 219100.
  https://cadwpublic-api.azurewebsites.net/reports/sam/FullReport?lang=en&id=3300 — crag "90m above the valley";
  "recovered briefly in 1282 by Prince Llywelyn ap Gruffudd" and "granted to the king’s supporter John Giffard ... in
  1283"; the south-west and south-east corners "lightly defended, by a curving projection and a corner turret
  respectively"; Giffard and son until 1321, "nearly all the present stone structure was built, obliterating any traces of earlier
  works"; outer ward with "small drum towers at the angles and gate", the lime kiln and quarry ditch, a turf-covered
  rectangular building outside to the north-east; the barbican's ramp, two gates and pits; a basement "referred to as a
  prison in 1369"; "square north east corner" tower; the hall "entered by an external stone stair"; two cisterns; the
  chapel tower "projecting from the west wall" (a slip); the postern, passage and dovecot. Read directly.
- [S4] Heneb Historic Environment Record (Archwilio), PRN 3998, "Carreg Cennen Castle", SN6681419093.
  https://archwilio.org.uk/arch/query/page.php?watprn=DAT3998&dbname=dat&tbname=core — Coflein's text ("JS from J. M.
  Lewis 2006") and the listing's ("based on Cadw Listed building Data 1998"); four iron cannon balls found c. 1851;
  bibliography (Arch. Camb. 1851-1951, RCAHM 1917, Remfry 2012, MOW guide 1960). Read directly. A copy of S1 and S2,
  not a third source.
- [S5] Gatehouse Gazetteer, "Carreg Cennen Castle", record 192 (updated 2 July 2017).
  https://www.gatehouse-gazetteer.info/Welshsites/192.html — SN66801908; "Caer Cynan; Karekenyl"; quotes Coflein, the
  listing and Dyfed Archaeological Trust's historic landscape text (the llys "appears to have been fortified prior to
  the construction of the present castle ... possibly under" the Lord Rhys; "finally destroyed during the Wars of the
  Roses in 1461"); CM001, listing 20923, HER 3998; bibliography (King's Works vol. 2 p. 602; RCAHMW 1917 no. 256; Remfry
  2010 and 2012; Davis; Kenyon; Brut 1248, 1256). Read directly.
- [S6] Cadw, "Carreg Cennen" (More about Carreg Cennen). https://cadw.gov.wales/more-about-carreg-cennen — "might well
  have been an Iron Age hillfort"; the earliest castle "probably the work of a Welsh prince – the Lord Rhys"; "most
  likely John Giffard"; "'castle within a castle' layout"; capture "by Sir Roger Vaughan in 1462" and 500 men for four
  months; the Earl of Cawdor "heavily restoring it", "no one is quite sure where the earl's handiwork begins and ends".
  Read directly. Same page as `medieval:S24` and `effects:S17b`.
- [S7] medievalheritage.eu, "Carreg Cennen – castle" (bibliography: Davis 2021; Kenyon 2010; Lewis 1990; Lindsay 1998;
  Salter 1996). https://medievalheritage.eu/en/main-page/heritage/wales/carreg-cennen-castle/ — history (1248; Payn de
  Chaworth 1277; "Probably began after 1284"; Giffards "until 1322"; 1403 surrender and 1414-1421 repairs; 1454-1455
  repairs and gunports; 1462 and 500 men; 1282 "temporarily taken over by Gruffudd and Llywelyn, the sons of Rhys
  Fychan"); architecture (ward "approximately 32 x 28 meters"; walls "up to 2.8 meters"
  east and north; the towers; the parapets on corbels, "Probably"; the south-west rounding; the east range and pillar;
  the King's Chamber and "the tower above the king's chamber" of 1369; the gatehouse; the barbican and "three
  drawbridges"; the ditch "carved in the rock"; the outer ward "about 60 x 60 meters", walls "about 1.7 meters"; the
  passage "for more than 46 meters"); current state. Secondary. Read directly. Same page as `models:S26`.
- [S8] medievalheritage.eu, "plan of the Carreg Cennen Castle according to J.M. Lewis and Cadw" (Periods 1-3 "Late
  Thirteenth - Early Fourteenth Century", Modern, Uncertain; Gatehouse, Middle Gate Tower, Barbican, Pits, North-West,
  North-East and Chapel Towers, Domestic Buildings, Hall Over, Oven, Outer Ward, Outer Gate, Lime-kiln, Cave; first- and
  second-floor plans of the east range; 30m and 100ft bars).
  https://medievalheritage.eu/wp-content/uploads/2019/10/Carreg-Cennen-plan-11.jpg — image 1300 x 1010 pixels; metre bar
  0 at x 98.0 and 30m at x 364.25 (8.88 px/m; the 5m and 25m ticks give 8.93), foot bar 100ft at x 373.75 (9.05 px/m);
  north arrow tip (542, 241), base (550, 343). Fitted 2026-10-17 to the survey [S20] by maximising the surface model's
  local relief (DSM minus a 13m box mean) under every third dark pixel of the plan's inner ward (14,688 pixels in x 440-900, y 440-870),
  pivot pixel (660, 650): **E 266792.0 N 219080.0, rotation 10.5 degrees anticlockwise, 0.1085 m a pixel (9.22 px/m)**;
  residuals: north-west tower centre (489, 515) 1.3m, chapel tower north-east corner (868, 635) 0.1m, south-east corner
  (818, 850) 1.5m, south-west corner (486, 790) 2.9m. Cadw, Crown copyright; not copied. Same image as `models:S27`.
- [S9] C. Jones-Jenkins, cutaway reconstructions of the gatehouse and foregate and of the east range, for Cadw, as
  reproduced by medievalheritage.eu. https://medievalheritage.eu/wp-content/uploads/2019/10/Carreg-Cennen-rekonstrukcja-23.jpg
  — the gate towers in storeys with low grey-blue roofs inside crenellated parapets on corbel tables, the pits and
  bridges, walls drawn pale. An artist's reconstruction, viewed. Not copied.
- [S10] medievalheritage.eu, painting captioned "reconstruction of the castle from the 14th century from the north-east
  according to A.Sorrell" (uploaded June 2026).
  https://medievalheritage.eu/wp-content/uploads/2026/06/Carreg-Cennen-rekonstrukcja-01.jpg — viewed: a tall,
  many-towered castle with towers no plan has. Its attribution is not verified and it is **not used** (see Images).
- [S11] castlewales.com, "Carreg Cennen Castle", text by Lise Hull (1995), photographs by Jeffrey L. Thomas (2002).
  https://www.castlewales.com/carreg.html — the barbican's bridges over pits; "The castle's primary water container was
  the clay-lined ditch just outside the gatehouse"; ovens and two cisterns; "The plain south curtain, with portions of
  the wall-walk still intact, rises to its original height. ... The wall held latrines and two windows"; "Foundations of
  a rectangular structure are visible along the south wall"; the north-west tower's gunport; the 1960s deed error.
  Secondary. Read directly.
- [S12] Wikipedia, "Carreg Cennen Castle" (raw wikitext, read 2026-10-17; cites Lewis 2006, Davis 2021, Morgan 2008).
  https://en.wikipedia.org/wiki/Carreg_Cennen_Castle — lead only: "The south curtain wall may have retained masonry from
  the earlier Welsh castle"; the three phases "within a short timespan"; Rhys took it "before the English took
  possession"; 1403 "failed to take the castle" (uncited) and "more than £500" in 1414-21; the gunport "likely added at
  this time"; "traceried windows"; infobox "local Carboniferous Limestone" (uncited); Cadw's Welsh-only name since 2024.
  Same page as `medieval:S25` and `timeline:S37`.
- [S13] H. Longueville Jones, "Castell Carreg Cennen. No. II. Architectural account", *Archaeologia Cambrensis* third
  series, vol. 4, no. 13 (January 1858), pp. 10-15, with "Plan of Castell Carreg Cennen" (p. 12) and an engraving, "Head
  of Doorway, S.E. Tower"; Welsh Journals (National Library of Wales).
  https://journals.library.wales/view/2919943/3014103/10 — read from the page images (OCR checked against the images):
  the escarpments "sharpened by art"; "a precipice of nearly 100 feet"; a small ditch and rampart on the eastern slope;
  no "primeval" work; the curtains and "perhaps the two round towers" possibly mid-13th century; the octagonal gate
  towers and all details "of the very end of the thirteenth century, or commencement of the fourteenth"; "The walls are
  thin, not peculiarly well built"; "87 feet by 80 feet"; the outworks "almost destroyed"; the gate's spur buttresses,
  crossed loopholes and "Two sets of portcullis grooves"; the kitchen oven; the doubled curtain behind the hall; the
  chapel's altar and piscina; the King's Chamber's trefoiled two-light windows; the cave passage "loop-holed for light";
  the round tower at the south-west corner; "it was all a Keep"; the parapet on corbels "within and without";
  the interior "much blocked up with rubbish"; the owner's recent repairs and "new walling ... to the east of the main
  gateway". Independent of the Cadw guide (written a century before it).
- [S14] John Williams, Archdeacon of Cardigan, "On Castell Carreg Cennen (Read at Llandeilo.)", *Archaeologia
  Cambrensis* third series, vol. 3, no. 12 (October 1857), pp. 335-49 (pp. 341-8 misprinted 441-8, per check 2); Welsh Journals.
  https://journals.library.wales/view/2919943/3013965/12 — read from the page images (OCR): the rock "a huge fragment of
  limestone, reposing on the surface of the red sandstone"; the chronicle "under the year A.D. 1254"; Skydmore and 1402-3;
  "After the accession of Henry VII., the castle was given to Sir Rice ap Thomas"; "It is not probable that Sir Rice used
  Carreg Cennen as a stronghold"; the cave, its stair and "square holes"; the mortar "less cohesive and more crumbling";
  Roman coins of the Constantine family found "close to the wall, not far from the iron gate which leads to the cave
  stair-case". History, not architecture.
- [S15] Ministry of Works, Ancient Monuments Branch, notes on monuments in guardianship, *Archaeologia Cambrensis* 101
  (1950-51), pp. 77-8; Welsh Journals. https://journals.library.wales/view/4718179/4741340/97 — "The barbican has now
  been completely cleared of debris"; the "inclined (originally stepped) path crossing two pairs of drawbridge pits";
  "a rock-cut ditch with a maximum depth of more than 20 ft., which may well have been the main defence of the original
  native stronghold"; the north-west tower, western gate tower and the curtain between treated. Read from the page
  images (OCR).
- [S16] "Annual Summer Meeting, 1985" (Thursday 22 August), *Archaeologia Cambrensis* 135 (1986), p. 229; Welsh
  Journals. https://journals.library.wales/view/4718179/4749469/256 — D. J. Cathcart King's account: "a fine example of
  English fortification of the later thirteenth century, though having its origin as a Welsh castle that changed hands
  several times before 1287"; the stepped ramp, three pairs of pits, the square tower's flank gate, "doors and a
  portcullis at each end of the passage"; "(Carms. Inv., No. 156; J. M. Lewis ... 1960)"; the grid reference printed
  "SN 688 191", a slip for SN 668 191. Read from the page image (OCR).
- [S17] *Brut y Tywysogion, or the Chronicle of the Princes*, ed. and trans. John Williams ab Ithel (Rolls Series,
  London, 1860), Internet Archive. https://archive.org/details/brutytywysogiono00cara — 1248 (p. 335): "Rhys the Little,
  son of Rhys Mechyll, obtained the castle of Carreg Cennen back again, which his mother had deceitfully given into the
  possession of the French, from hatred towards her son". Read as full text; the Welsh text's "drachefyn" (p. 335) is the "back again". Gatehouse [S5] calls this translation "flawed" and names T. Jones, 1952 (Peniarth 20) as the best; Jones was not read (contested point 16). Same edition as `dinefwr:S18`.
- [S18] John E. Morris, *The Welsh Wars of Edward I* (Oxford, 1901), Internet Archive.
  https://archive.org/details/welshwarsofedwar00morr — 1277: Pain de Chaworth "occupied the castle of Caercynan"; £285
  "for the repair of the fortifications of both Dynevor and Caercynan"; 1282: Dafydd ap Gruffudd with the sons of Rhys Fychan "captured Llan- dovery and Caercynan on March 26" (p. 154) and
  the castle "seized and destroyed, at least partially, by David early in April" (p. 165); "Caercynan, or the ruins of the castle, was occupied by fifty foot and some workmen"; later
  "Caercynan is not mentioned at all" in the peace establishment; appendix III: "Compact and small, it sat four-square",
  "English hands have added one circular tower at an angle, also an extra ward", "a sheer fall of some 300 feet". Read
  as full text. Same book as `classes:S1`.
- [S19] Samuel and Nathaniel Buck, "The South-West View of Caerkenin-Castle, in The County of Caermarthen", engraving,
  published 5 April 1740, National Library of Wales, via Wikimedia Commons.
  https://commons.wikimedia.org/wiki/File:The_south-west_view_of_Caerkenin-Castle,_in_The_county_of_Caermarthen.jpeg —
  public domain; viewed: a roofless ruin on its rock; the caption "THIS Castle is built on a Rock, and stands between the
  Hills about 4 Miles East of Llandilovawr. By the Gift of King Henry 7th it came to Sr Rice ap Thomas", the grandson's
  forfeiture and the grant to Richard Vaughan, Earl of Carbery.
- [S20] Welsh Government LiDAR, 2020-22 national survey, 1m DSM and DTM, tiles SN6618, SN6619, SN6718, SN6719
  (`wg_del_21_266218_20220113dsm.tif`, `..._266219_...`, `..._267218_...`, `..._267219_...`, with their `dtm`
  twins; catalogue date 13-01-2022 for all four), DataMapWales; Open Government Licence v3 (see
  [`../data/lidar.md`](../data/lidar.md)).
  https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dsm/wg_del_21_266219_20220113dsm.tif — downloaded
  and measured 2026-10-17 by Claude (SHA-256 first 16: DSM `6e3298661447bb4c`, `9eb62b763b90a75d`, `2a77c4aab7f2601a`,
  `39114bab27be61a6`; DTM `9ab4a69b9185d525`, `39efd72ef2b2efdb`, `c8ddba2938713034`, `659ac7d4f3389807`): ward floor
  264.8-265.0m OD; the wall-tops listed in the Summary and the ruin phase; the north-west tower ring centre E 266772.2 N
  219090.5; the ditch base 257.5-257.9m OD; the cliff from 259-263m at the wall foot to about 225m within 16m; the Afon
  Cennen's floor about 133m OD at N 218850; the highest point 276.4m OD at E 266781.5 N 219097.5 (the gatehouse).
- [S21] British Geological Survey, DiGMapGB-50 bedrock (v9.25, released 31 March 2025; sheet 230, Ammanford),
  GetFeatureInfo at E 266789 N 219075. https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer —
  "Dowlais Limestone Formation-Limestone", Holkerian Substage, Carboniferous, Pembroke Limestone Group, "shallow
  carbonate seas". Read 2026-10-17.
