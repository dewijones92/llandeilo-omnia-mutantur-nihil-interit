---
title: St Teilo's church (Eglwys Teilo Sant), Llandeilo, phase by phase, for a Blender model
kind: research
status: draft
updated: 2026-10-17
---

# St Teilo's church, Llandeilo, phase by phase, for a Blender model

Research for St Teilo's as a scripted Blender landmark at true size and true height
([ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md),
[ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md), and the forts' typed plan with a tier on every
part, [ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)), following
[`dinefwr-castle.md`](dinefwr-castle.md) in form. Written by Claude on 2026-10-17 from sources fetched that day; the brief
is in [`briefs/st-teilo.md`](briefs/st-teilo.md). The choices in "Plan for the Blender model" are Claude's, under the
proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)); none is Dewi's.
Re-read against the downloaded sources by the same agent the same day ([check 1](reviews/st-teilo-check-1.md), not
independent), then checked by an independent reader the same day ([check 2](reviews/st-teilo-check-2.md)), whose findings
are applied below; where a point was changed it says so.

It extends the church sections of [`era-medieval-to-1282.md`](era-medieval-to-1282.md) (the clas),
[`era-victorian.md`](era-victorian.md) (the rebuild) and [`building-models.md`](building-models.md) (the first outline,
2026-10-02), and does not repeat their history except where it bears on what was built. The Welsh form the app uses is **Eglwys
Teilo Sant**; **no source for the church's own Welsh name was found** (neither Cadw's Welsh listing nor Coflein's Welsh page
gives one, and `era-victorian.md` has "Eglwys San Teilo", while Welsh Wikipedia names the St Fagans church of the same saint
"Eglwys Sant Teilo"), so the form is unverified and stays a human Welsh check ([open
questions](open-questions.md)); the parish is **Llandeilo Fawr**, "Llandilo-Vawr"
and "Llandilo" in the 19th-century sources.

**How it was done.** Coflein, the Cadw listing and the Heneb HER (PRNs 888 and 912) were read directly. The fullest
fabric description, Neil Ludlow's entry for the Cadw-funded Welsh Historic Churches Project (Cambria Archaeology,
fieldwork 1998, report 2000), was found as a scanned PDF on the Welsh HER portal through the HER's project record and read
from its text layer (PDF pages 123-128) [S5]. The 1850 newspaper report of the reopening [S7], Lewis's *Topographical
Dictionary* (1849 edition, British History Online [S8]; the 1844 wording via GENUKI [S9]), the Dictionary of Welsh
Biography on Teilo [S12] and the Scott family's gazetteer [S10] were read directly. The **Lambeth Palace Library ICBS file
3533** (the Incorporated Church Building Society's plans, 1844-51) was found but **not read**: the image server asks for a
login [S11]. The **1837 tithe map**, on which Ludlow's reading of the pre-1848 plan rests, was **not viewed**. The church
was **measured** on the Welsh Government LiDAR surface and terrain models of 2020-22 (1m, OGL), tile SN6222 [S14], and
checked against three openly licensed photographs [S17][S18][S19]. WebSearch was used 5 times.

Everything is labelled with the app's three tiers. **Documented**: a source says it, or the survey measures it.
**Reconstructed**: inferred, and the note says from what. **Imagined**: invented to fill a gap.

**The sources are fewer than they look, and the tier rule says so.** Coflein's description [S1] is a compilation: its
tower and exterior text is the Cadw listing's [S2] almost word for word ("squared, coursed rubble with dressed quoins and a
splayed base below the stringcourse", "two-light cusped Perpendicular window with returned label", "three large clock
faces"), and its history (the 1845 roofless aisle, the quarry that caved in, the vault under the aisle's east bay, the
tower "similar to the contemporary tower at St Tybie's Church, Llandybie") is Ludlow's [S5]. The HER's summary of the
church [S3] is signed "NDL 2003", Neil D. Ludlow. So for the fabric there are **two strands**: the listing (Cadw, from
information "supplied by Mr P Howell") and Ludlow's survey, each reaching the reader by two or three routes. Coflein and
the HER count as their parents, never as a second source. Independent of both are the LiDAR survey [S14], the
photographs [S17]-[S19], the 1850 newspaper [S7], Lewis [S8][S9], the Scott gazetteer [S10] and the local-history page
[S6], whose own sources are not stated. A part resting on one strand alone is marked **documented (one source: Cadw
listing)** or **documented (one source: Ludlow)**, as the Dinefwr note does for Cadw, so the ⓘ can say "one source".

## Summary

- **Placement.** Coflein gives SN 62930 22236 [S1]; the Cadw listing E 262930 N 222236 [S2]; the HER SN 6293022236
  [S3] (one point, three records); Ludlow SN 6293 2225 at 10m [S5]. The app's point is the same. On the LiDAR the
  point lies **inside the nave, about 2.2m north of its ridge line and near the middle of its length** [S14].
- **The axis.** The nave's ridge holds one line, to within half a metre over 30m, at **19.3 degrees north of grid east
  (a bearing of 070.7 degrees)**, the angle the app already uses (taken from the OS footprint [S15]) [S14].
- **The tower is measured: about 8.0m (east-west) by 7.5m (north-south) above its batter, parapet top 74.5-74.6m OD,
  18.7m above the churchyard west of it (55.8m OD); the roof inside the parapet at 73.2-73.3m OD (17.4m); the stair
  turret to 76.2-76.4m OD (about 20.5m)**, each to about ±0.5m in plan and ±0.3m in height [S14]. No source read gives
  any of these numbers.
- **The stair turret is at the north-east angle**, rising above the tower: Cadw's "Stair turret to NE angle rises above
  tower" [S2] (Coflein copying it [S1]) is borne out by the survey, which puts the turret's high block at the **east** end
  of the north face, projecting about 2m north of it [S14]. Ludlow's "projects from the western half of the north wall"
  [S5] is **contradicted by the survey** (perhaps a slip: his Llandingat entry in the same report puts that tower's turret
  in "the eastern half of the north wall").
- **The tower's date is contested**: "C15 W tower" (Cadw listing [S2]; Coflein's "fifteenth century west tower" repeats
  it [S1]) against "later 16th century ... similar to the contemporary tower at Llandybie" (Ludlow [S5]), which the HER
  [S3] and Coflein [S1] give as "c.1600" / "around 1600"; "late medieval" (local history [S6]). The "Coflein gives both"
  of earlier notes is Coflein printing its two parents side by side.
- **So is its parapet**: "C19 crenellated battlements with gargoyle waterspouts" (Cadw listing [S2], Coflein [S1])
  against "The crenellated parapet ... lies on a string-course, all from the later 16th century; rainwater chutes moulded
  as gargoyles ... similar to those at Llandybie" (Ludlow [S5]). The tower's top between c. 1600 and 1848 rests on which
  is right.
- **The church that stood until 1848 is said to have had today's plan** (a reconstruction, not a measurement: see below). Ludlow, from the 1837 tithe map and an undated town plan: "the
  pre-1848 church to have been of the same dimensions, and to possess the same ground plan, is its successor, comprising a
  nave, north aisle and west tower, with a large south transept (and vestry?) on the site of the present transept, vestry
  and organ/heating chamber" [S5]; the local-history page: "The rebuilders of 1848 chose to use the existing medieval
  foundations, so that the ground plan of the present church reproduces that of the medieval building" [S6]. Two
  sources, neither giving a measurement and neither saying when each part was built; Ludlow's maps show the plan of
  **1837**, after the tower and after a transept of unknown date, not the plan of c. 1400, nobody in this work has seen
  them, and the local page states no sources (so its independence from Ludlow is unknown). Ludlow's own text also shows
  the 1850 plan was not identical to the old one (one south gable, the organ chamber of 1903, a vestry he queries). A map
  of that kind cannot fix a wall to half a metre. So the medieval and tower-phase outlines below are **reconstructed from
  today's measured outline**, and only the statement that the 1837 plan matched is documented (two secondary sources).
  The medieval church was "of double
  nave" (Cadw listing [S2]); "consisting only of 2 aisles" (Lewis 1833, via Ludlow [S5]); "a large heavy building" (Lewis
  1844 [S9]).
- **Today's church is measured** [S14]: nave and chancel under one roof about 37.3m by 11.0m, ridge 69.2m OD (13.4m above
  the west churchyard); north aisle about 31.5m by 8.1m, ridge 66.8m OD (11.0m), stopping about 6m short of the chancel's
  east end ("Chancel advanced one bay" [S2]); a north porch; on the south, two gables side by side (ridges 65.3-65.7m OD,
  about 9.5-9.9m) and a lean-to vestry. Ludlow dates the west gable's transept to 1848-51 and the east gable's organ chamber
  to 1903 [S5], so the 1850 church had **one** south gable.
- **The rebuild.** The body was "demolished in 1848 and rebuilding began immediately" (Ludlow, citing Jenkins's diary
  [S5]); "the old steeple - one of the most antiquated structures in the Principality, was allowed to remain intact,
  while the entire body of the Church was rebuilt by public subscription, at an expense of about four thousand pounds";
  architect "Mr. Scott, of London", clerk of works "Mr. John Harries"; reopened on Thursday 10 October 1850 (The Welshman,
  11 October 1850 [S7]). Completion is given as 1850 [S6], 1851 [S5][S10] and "1848-9" (Lewis, 1849 [S8]).
- **Who designed it is contested**: Scott after a competition (Cadw listing [S2], Coflein [S1]); Scott "called in" after
  the 1844 competition "collapsed" (the Scott gazetteer [S10]); "designed by Edward Davies, an architect from Bath, and
  built under the supervision of George Gilbert Scott" (local history [S6]). The 1850 report names only Scott [S7].
- **The clas church left nothing that can be drawn.** A church of Teilo's here is documented from the 9th century (the
  gospel-book marginalia, via the DWB [S12] and the local-history page [S6]); the HER calls the site "possibly a monastic
  clas church from the first" and "a bishopric by the 8th century" [S4]. Its form, size, material and place within the
  churchyard are unknown; no excavation is recorded. Two carved cross-heads of the 9th-11th centuries (dates differ
  [S1][S3][S6]) are the only fabric of the early church, and they are not part of a building.
- **When the church was first built in stone is not known.** The only date read is the local-history page's "The pre-1848
  building was a late medieval structure of c.1400" [S6], one source with no reference.

## Placement

| Point | Grid reference | Source | Note |
|---|---|---|---|
| Coflein NPRN 100867 | SN 62930 22236 = E 262930, N 222236 | [S1] | Use as the feature's `at` (the forts' and Dinefwr's rule) |
| Cadw listing 11097 | E 262930, N 222236 | [S2] | The same point |
| HER PRN 888 (the church) | SN 6293022236 | [S3] | The same point |
| HER PRN 912 (churchyard, clas) | SN 6293 2223 (the HER prints NGR SN62932223, 10m) | [S4] | Agrees with Coflein's point within its 10m precision |
| Ludlow 1998-2000 | SN 6293 2225 (10m) | [S5] | |
| Tower centre (measured) | E 262911.8, N 222227.3 (about a metre) | [S14] | Plan frame (-20.0, -2.25) |
| OS OpenMap Local footprint centroid | E 262927.4, N 222237.6 | [S15] | A generalised outline that leaves out the south gables |
| Churchyard at the tower's foot | 55.8m OD (west and south), falling to 54.8m east of the chancel | [S14] | Terrain-model medians of 17-33 cells |

**Plan frame for the model** (proposed): metres from Coflein's point, **x along the church's axis (bearing 070.7, 19.3
degrees anticlockwise of grid east) and y to its left (bearing 340.7)**, true size, true height. That is the frame the
app's plans already use with `angle: 19.3` (`rotate` in `src/domain/plan.ts` turns plan x into (cos 19.3, sin 19.3) east
and north). So E = 262930 + 0.9438x - 0.3305y and N = 222236 + 0.3305x + 0.9438y. Every coordinate in "Plan for the
Blender model" is in this frame, measured on the surface model's 1m cells [S14], to about **±0.5m** at an edge.

**LiDAR detail.** The church is already inside the `llandeilo` detail area (`tools/terrain/lidar-areas.json`: centred on
this very point, 1.5km square, 2m data), so the churchyard is drawn at 2m today. A landmark area of its own is proposed
under "Plan for the Blender model".

## The site

- **The churchyard.** "situated within a large, curvilinear churchyard ... encircled on all sides by roads, and bisected
  by the A483" (Coflein [S1]); "Set in a large raised churchyard alongside the road" (Cadw [S2]); "The large, suboval
  churchyard probably overlies the major Roman Road between Loughor and Llandovery" (HER [S4]); "about three and a half
  acres ... oval shape ... typical of an ancient llan", the road through it "laid out as a turnpike in the late eighteenth
  century" (local history [S6]); "a new road has been constructed through the churchyard, instead of the old one, which
  was so steep in this part of its course as to be almost impassable for carriages" (Lewis, 1849 [S8]). So the road that
  splits the churchyard today is **not** there before the late 18th century (two sources, the date one source). The
  churchyard's outline was not measured here.
- **The holy well.** A spring in the churchyard, "covered over and culverted" to a vaulted well-chamber in the wall at road
  level (Coflein [S1], Ludlow [S5], HER PRN 27003 and 11688 as listed beside the church [S3]); "a pure spring in the
  churchyard, at which St. Teilo used to baptize Christian converts in ancient times" (Lewis, 1849 [S8], tradition);
  near the church's east end and covered in the mid-19th century (local history [S6]).
- **The ground.** The churchyard is at 55.7-56.0m OD round the west end and the north side and falls to about 54.8m east
  of the chancel and 53.5m at its south-east edge [S14]. Ludlow notes "a regular earthwork platform below, or around, the
  west tower" and that 10% of the church lies below ground level [S5].
- **The bedrock** under the church is the Llandeilo Flags Formation, "Sandstone, limestone and argillaceous rocks",
  Ordovician, on the BGS 1:50,000 map [S16].

## Phase 1: the clas church (from the 6th century by tradition; documented by the 9th)

- **What is recorded.** Teilo "was still venerated in South Wales as the founder of a monastery which was almost certainly
  Llan-deilo-fawr" in the 9th century, from the margins of the gospel book now at Lichfield; his fuller Life is three
  centuries later and partisan (DWB [S12]). The book was given "to the altar of St.Teilo" about 820 by Gelhi, and "there
  was a bishop at Llandeilo Fawr in the ninth century" (local history [S6]); "It was a bishopric by the 8th century ... By
  the 11th century it lost episcopal status" (HER [S4]). These dates and readings are already set out, with their
  contradictions, in [`era-medieval-to-1282.md`](era-medieval-to-1282.md).
- **The fabric.** Two carved cross-heads are in the church: "tenth-eleventh century" (Coflein [S1]), "9th to 11th
  century?" (HER [S3]), "c.900AD" (local history [S6]); one found beneath the chancel (or north aisle) in the 1850s
  restoration [S1][S5]. A Latin-inscribed stone stood in the churchyard in 1697 and was lost by 1893 [S1][S5]; the HER dates
  it to the 5th-6th century [S3]. **Contested detail**: which PRN is which (the HER has the inscribed stone as 889 and the
  crosses as 890-891 [S3]; Ludlow has the crosses as 889-890 and the stone as 891 [S5]).
- **The church's form: unknown.** No source read describes it, and none records an excavation that found it. The app
  draws a small thatched timber church on the line of today's (`clas-church`); that is **imagined** (form) on a
  documented existence, although its ⓘ today is labelled reconstructed (see "What the app gets wrong today").
- **A 13th-century church with Teilo's tomb.** "as late as the thirteenth century, visitors to Llandeilo, including King
  Edward I, were shown Teilo's tomb in the church here" (local history [S6], one source, unreferenced).
- **Status.** A parish church after the conquest, in the deanery of Stradtowy; "It was appropriated to the
  Premonstratensian Abbey at Talley by Rhys Grug ... in c.1215" and in 1239 the abbey was ordered to pay 10 marks a year for
  "Llanteylanvair" and "Llanegantvair" (Ludlow, citing Price 1879 [S5]; Coflein repeats it [S1]).

## Phase 2: the double-naved medieval church (c. 1400 on one reading; start unknown)

- **Its form.** "Medieval church of double nave and C15 W tower; of which tower remains" (Cadw listing [S2]); "The
  original church was of the double aisle plan" (HER [S3], Ludlow's strand); "consisting only of 2 aisles, and
  undistinguished by any peculiar architectural features" (Lewis 1833 as quoted by Ludlow [S5]); "a large heavy building"
  (Lewis 1844 [S9]). A double nave is two naves of similar standing side by side under two roofs; here the north one is
  called "north aisle" by every later source.
- **Its plan.** The same as today's (Ludlow from the 1837 tithe map and a town plan [S5]; the local-history page on the
  reused foundations [S6]). So the medieval nave (with its chancel, "out of repair" in 1685 [S5]) and north nave stood on
  the lines measured below, and a "large south transept (and vestry?)" stood where today's south gables and vestry are
  [S5]. **When the transept was built is not known**; neither the listing nor Lewis mentions it.
- **The north chapel.** "The north chapel 'ought to be repaired' in 1678 ... when part of the roof and gutter were also out
  of repair" (Ludlow, citing the churchwardens' presentments [S5]). The east bay of today's north aisle "is traditionally
  known as the 'Dynevor Chapel' and is said to lie over a medieval undercroft (Cadw, 1991, 34) but the 'undercroft' is more
  likely to be an 18th century burial vault" [S5]; the listing's "(vaulted undercroft said to survive)" [S2] is written
  after "of which tower remains", so which part it means is unclear. **Contested.**
- **Its date.** "The pre-1848 building was a late medieval structure of c.1400" (local history [S6]); nothing else read
  dates the body. The app draws it from 1300 with no source for that year.
- **Heights, windows, roofs, materials: unknown.** Nothing of the body survives above ground [S5][S6].
- **Its last years.** "In 1705 the church was 'in repair excepting some breaches in ye glass of ye windows'"; "The north
  aisle is left unshaded on the tithe map (NLW, Llandeilo Fawr, 1837) suggesting that it may have been roofless"; in 1845
  "in a state of dilapidation and inferior construction in many respects" (Ludlow, citing the RCAHM inventory of 1917
  [S5]). The roofless aisle is Ludlow's inference from map shading, and "may".

## Phase 3: the west tower (later 16th century, or the 15th: contested) to 1848

- **What survives.** "The 3-storeyed west tower represents the only surviving pre-19th century fabric" [S5]; "the old
  steeple ... was allowed to remain intact" in 1848 [S7]. So today's tower, measured, is the tower of this phase, except
  where its parts are dated to 1848-51 or later (the contested parapet and west door, the clock faces).
- **Its date.** "C15" (Cadw listing [S2]) against "later 16th century", "of late Perpendicular character similar to the
  contemporary tower at Llandybie" (Ludlow [S5]), given as "c.1600" by the HER (NDL 2003 [S3]) and "around 1600" by Coflein
  [S1]; "late medieval" [S6]. **Contested; two readings, one source each.** The app shows the tower from 1600; the medieval
  note's check left open "whether to show St Teilo's tower from the 1400s" for Dewi.
- **Its form, as recorded.** Four stages (Cadw [S2]) or three storeys (Ludlow [S5]; a stage is not a storey, so the two
  may count the same tower differently). "squared, coursed rubble dressed quoins. Splayed base below stringcourse" [S2];
  "roughly squared and coursed rubble, with Old Red Sandstone dressings and quoins. The tower has the external batter up to a
  string-course typical of the region; the latter is in roll-moulded Old Red Sandstone and has been extensively restored"
  [S5]. Second stage: a two-light window in the north wall, "cusped" (Cadw [S2]) or "uncusped ... with 4-centred heads and
  sunk spandrels in a square surround and label" (Ludlow [S5]). Belfry stage: two-light openings with cusped heads in
  square surrounds on all four faces [S2][S5]. "3 large clock faces to 3rd stage" [S2]. Stair turret with "slit like vice
  windows" [S2], "lit by both slit-lights and small, square single lights" [S5]. "The side walls are blind" at ground
  level [S5]. "Defensive medieval W tower" [S2].
- **The west door.** "C19 pointed door cut to W side" (Cadw [S2]) against "The west door occupies a later 16th century
  cut-out in the batter, but was rebuilt in 1848-51" (Ludlow [S5]). **Contested**: whether the tower had a west door
  before 1848.
- **The top.** See the Summary: battlements of the 19th century (Cadw) or of the later 16th (Ludlow). **Contested.** The
  turret rising above the parapet is recorded by both [S2][S5] and stands today [S14].
- **A clock and bells.** "A clock was present in the tower by 1868 at least ... when it was already 'decrepit with old
  age'"; "The bells were cracked in 1868"; "A bell, of unknown date, is suspended from an iron bracket on the tower north
  wall" (Ludlow, citing Samuel 1868 [S5]). When clock faces were first on the tower is not known.
- **The tower roof** "was not seen" by Ludlow [S5]; the survey shows a surface 1.2-1.4m below the parapet top over the
  whole interior, which may be a flat roof or a low-pitched one hidden by the parapet [S14].

## Phase 4: the rebuilding (1848 to 10 October 1850)

- **The collapse is one event, with one witness.** "In 1848 the body of the church was demolished, and rebuilding began,
  with stone excavated from a quarry within the churchyard. The quarry reportedly caved in, killing one of the workers"
  (Coflein [S1]); Ludlow: "a quarry was apparently excavated within the churchyard itself, but caved in killing one of the
  workers (ibid.)", the source being Thomas Jenkins's diary (Jenkins 1912, 31) [S5]. The diary entry for 18 April, as Lynn
  Hughes quotes it, reads: "Quarry opened up in the churchyard, gave way and buried five men. Four saved, but one, after
  remaining buried for two hours, taken out a corpse ... Now the quarry will have to be abandoned without procuring any
  stones worth using from it" [S20]. So **five men buried, four saved and one dead is a single account, not two**: the
  "one worker killed" of Coflein and Ludlow is the same death. (An earlier draft of this note, and the open-questions
  list, set the two counts against each other; that was an error, corrected 2026-10-17 on the independent check.) Hughes
  gives no year for the entry; it stands after January 1848 in his narrative, and `event-effects.md` dates it 18 April 1848.
  **What is contested is the stone**: Coflein says the rebuilding began "with stone excavated from a quarry within the
  churchyard"; Ludlow says only that a quarry "was apparently excavated"; Jenkins, the only primary witness, says the
  quarry was to be abandoned without stone "worth using", and Hughes sets it among the bridge approaches' shortage of
  in-fill [S20]. Whether any of the church's stone came from the churchyard is therefore **not established**.
- The project "was only enunciated three years ago"; "The entirety of the work has been performed by admeasurement, in
  preference to contract"; "the Church Building Society granted a vote of £220"; a gift, whose sum the OCR garbles, from the Dynevor
  family (The Welshman [S7]). The ICBS grant is the file at Lambeth [S11].
- For about two years the tower stood alone beside the works (documented that the body was demolished and the tower kept
  [S1][S5][S7]; what the site looked like, imagined).

## Phase 5: Scott's church (1850 to the 1900s)

- **The plan** (the survey [S14], the parts named by the listing and Ludlow [S2][S5]): "a 7-bayed chancel/nave,
  without structural division" [S5] ("seven-bayed nave and chancel" [S1]) ("6 bay double nave with chancel to that on S" [S2]), "a 6-bayed north aisle, the
  east bay of which lies over a vault", "a north porch", "a single-bayed vestry south of the east bay" [S5], and a south
  transept ("single-bayed" [S5]; "Twin gabled S transept with outshot vestry" [S2], see the next phase).
- **Style and fittings.** "Decorated style" [S1][S2]; "the style being that of ... decorated English" [S7]; "three-light
  decorated windows to the six-buttressed bay on the north side ... similar four and five light windows to the west and
  east ends ... large six-light east windows" [S1][S2]; "stepped buttresses throughout, cross-buttressed at the corners
  ... an external chamfered grey limestone offset runs around the base" [S5]; "The slate roofs are steeply pitched, with
  raking gable parapets on kneelers" [S1][S2]; porch "in the second bay from west, with a pointed doorway and nookshafts"
  [S1][S2]. Inside: octagonal arcade piers, plain arches [S1][S2][S5].
- **Materials.** "Snecked rubble masonry ashlar dressings" (Cadw [S2]); "snecked local limestone and Old Red Sandstone
  rubble, with grey limestone ashlar quoins ... neo-gothic, with grey limestone dressings" (Ludlow [S5]); "constructed of
  hard grey limestone" (the Scott gazetteer [S10]); **The stone's source** is not known: Coflein says it came from the
  churchyard quarry [S1], which Jenkins's own entry does not support (see Phase 4).
  The bedrock under the churchyard is the Llandeilo Flags Formation [S16], but no source names a rock for the church from it.
  The Old Red Sandstone does not outcrop under the church on the BGS map [S16]; where it came from is not
  known.
- **Size and seats.** room for 920 ("It wi)l accom- modate 920 individual,," in the OCR [S7]); "to seat around 700" [S10]; "seating some 700 people"
  [S6]. Cost "about four thousand pounds" [S7] or "£4,723" [S10]. **Both differ**; neither matters to the model.
- **Heights.** The roof timbers are "from 1848-51 and 1903" [S5], so today's roof heights are this phase's [S14].
- **The organ** was at the west end, with a singing gallery, until 1905 [S6]; interior only.

## Phase 6: the organ chamber (1903 or 1905) to today

- "The organ/heating chamber was added in 1903 to the designs of the architect David Jenkins of Llandeilo (NLW,
  SD/F/256)" [S5]; "Restored 1905 by David Jenkins of Llandeilo" (Cadw [S2]); "a new organ chamber was constructed in
  1905" [S6]. **1903 is the faculty's date and 1905 the work's in two sources; either may be the building's.** The survey
  shows the organ chamber as the east one of the two south gables, between the transept and the vestry, as Ludlow places
  it [S5][S14]. The vestry's octagonal chimney "is from 1930" [S5].
- "In 1979 the north aisle was divided off to create a hall area" [S6]; interior only.

## Images and drawings

| What | Where | Licence | Used for |
|---|---|---|---|
| The tower's south face, 2014, Ken Day [S17] | Wikimedia Commons | CC BY-SA 4.0 | The batter, the purple Old Red Sandstone quoins and dressings against grey-brown rubble, the clock face, the belfry opening, the string course with spouts, the merlons; proportions checked against the survey |
| The tower from the road, 2011, Jaggery [S18] | Geograph via Commons | CC BY-SA 2.0 | The turret rising above the parapet with its own crenellations; the slate roof |
| The tower and the west end, 2020, Darren Wyn Rees [S19] | Wikimedia Commons | CC BY-SA 4.0 | Clock faces on two faces; the west gable's tracery window |
| LiDAR surface model with the measured outlines | [`refs/st-teilo/lidar-dsm-with-measured-plan.png`](refs/st-teilo/lidar-dsm-with-measured-plan.png), made for this note from [S14] | OGL v3 (the data) | The plan in "Plan for the Blender model" |
| ICBS 3533, ground plan, 1844-51 | Lambeth Palace Library [S11] | Not read (login) | Would show the 1848 design and perhaps the old church |
| Tithe map, Llandeilo Fawr, 1837 | National Library of Wales | Not viewed | The pre-1848 outline, Ludlow's evidence |

No drawing of the church before 1848 was found.

**Read off the photograph [S17]** (an estimate: perspective, and gravestones hide the foot): scaled by the surveyed
18.7m, the tower's visible batter rises about 1.8m to its string course, the clock face is about 2.4m across with its
centre about 11m up, the belfry openings' centre about 15m up and the upper string course about 16.5m up; the tower's
breadth comes out at about 8.2m against the surveyed 8.0m, which supports the scaling. Each to about ±1m.

## What the app gets wrong today

Observations against `src/content/features.ts` and `src/content/buildings.ts` (2026-10-17), for the build; nothing is
changed here.

- **The vestry is on the wrong side.** `SCOTT_CHURCH`'s last hall, 5 x 4.5m at (15.5, 6), stands north of the chancel,
  beyond the north aisle's east end, where the survey shows open ground [S14]; the vestry is "south of the east bay" [S5]
  ("outshot vestry" off the south transept [S2]), at x 14-20, y -7.8 to -11.3 [S14].
- **The tower is about 3.8m out**: at (-17.35, 0.5) and 7.5m square, 18m high, against the measured (-20.0, -2.25), 8.0 x
  7.5m, parapet 18.7m; the stair turret, which rises to 20.5m, is not drawn [S14].
- **The naves are the wrong shape.** `DOUBLE_NAVE` draws two equal halls, 31 x 8m, centred at y 0.5 and 8.5; the surveyed
  nave is 37.3 x 11.0m centred at y -2.3, the aisle 31.5 x 8.1m centred at y 7.25, and the pre-1848 plan was the same [S5][S6][S14].
  Scott's nave (27 x 8.5m), chancel (8 x 7m) and aisle (24 x 5.5m) are likewise smaller than the measured ones.
- **Dates.** `medieval-church` starts in 1300, which no source gives (the only date read is c. 1400 [S6]); `scott-church`
  starts in 1848, when the old body was pulled down, not when the new one opened (10 October 1850 [S7]).
- **Tiers and text.** `clas-church` is labelled reconstructed, but its form, size and material are imagined (only its
  existence is documented). `tower-church`'s ⓘ says the battlements are 19th-century, which is Cadw's reading only (Ludlow
  dates the parapet to the later 16th century [S5]); `medieval-church` says the naves' size "is not recorded", while two
  secondary sources say the plan was today's [S5][S6] (the outline is a reconstruction from today's, see the Summary); `scott-church`'s "the west tower of about 1600" gives one of two readings.
- **The setting** is `map` (true in plan, heights exaggerated as the hills are, and the only setting that hides the modern OS buildings under it); the forts' rule would make it `true`, which then needs the town's modern church footprint hidden some other way.

## Contested points (kept contested)

1. **The tower's date**: 15th century (Cadw listing [S2], Coflein copying [S1]) or later 16th century (Ludlow [S5]), c.
   1600 (HER [S3], Coflein [S1], both Ludlow's strand); "late medieval" [S6].
2. **The tower's parapet**: 19th-century battlements [S2][S1] or later 16th-century parapet and gargoyles [S5].
3. **The stair turret's place**: at the north-east angle [S2][S1], borne out by the survey [S14], or the western half of the
   north wall [S5].
4. **The west door**: cut in the 19th century [S2] or a 16th-century cut-out rebuilt in 1848-51 [S5].
5. **The undercroft**: a medieval undercroft (Cadw 1991, via [S5]; "said to survive" [S2]) or an 18th-century burial vault
   (Ludlow [S5]).
6. **Who designed the 1848-51 church**: Scott after a competition [S1][S2], Scott called in after it collapsed [S10],
   or Edward Davies of Bath under Scott's supervision [S6]; the ICBS record is said to query Scott ("G. G. Scott?"), known only from a search engine's summary of a record not read [S11].
7. **When it was finished**: reopened 10 October 1850 [S7]; "completed in 1850" [S6]; "completed in 1851" [S5][S10];
   "rebuilt in 1848-9" [S8].
8. **Seats and cost**: 920 seats and about £4,000 [S7] or about 700 seats and £4,723 [S10][S6].
9. **The organ chamber**: 1903 [S5] or 1905 [S2][S6].
10. **Whether the church was built of the churchyard quarry's stone**: Coflein says the rebuilding began "with stone
    excavated from a quarry within the churchyard" [S1]; Ludlow says only that a quarry "was apparently excavated" and caved
    in [S5]; Jenkins's diary entry says the quarry was to be abandoned "without procuring any stones worth using from it"
    and Hughes ties it to the bridge approaches' in-fill [S20]. (The collapse itself is not contested: one event, five
    buried, four saved, one dead; see Phase 4.)
11. **Stages or storeys**: four stages [S2] or three storeys [S5].
12. **The earlier "rebuilt in the early eighteenth century"** (Wikipedia [S13]) has no source and no support in any record
    read; Ludlow's 1705 presentment ("in repair") argues against a rebuild then. Kept as a lead's error, not a reading.
13. **The early stones' PRNs and dates** (see Phase 1).
14. **When the Teilo community's lands went to Talley**: "in the twelfth century" (the local page [S6]) or appropriated
    c. 1215 (Ludlow, citing Price 1879 [S5]; Coflein [S1]).
15. **When Teilo settled here**: "in the course of" the sixth century, "probably towards its close" (the local page [S6],
    which also quotes an encyclopedia entry with his death "probably in or before 560"); a "6th century entry in the Book
    of Llandaff" (HER PRN 912 [S4]); c. 550 is the app's. Nothing read fixes it; the DWB's "the true story ... has long
    since perished" [S12] is the caution.

## Gaps

- **The pre-1848 plan at first hand**: the 1837 tithe map and the undated town plan (Ludlow's evidence [S5]) were not
  viewed; the ICBS file 3533 at Lambeth [S11] (login) was not read; the church's competition drawings ("Drawings survive
  in the church" [S2]) were not seen. Any of them may show the old church's outline, and the ICBS file perhaps its
  sections.
- **Any medieval height**, window, door, roof covering or wall finish of the body; when it was first built in stone; what
  the clas church was like.
- **When the south transept was first built**, and whether the medieval church had a separate chancel.
- **The tower's date and its parapet's date**: a reading of the RCAHMW 1917 inventory (no. on p. 91, cited by Ludlow),
  Samuel 1868, Davies 1858 and Glynne's notes (if he visited before 1848) might settle the parapet.
- **The tower's roof**: flat or pitched.
- **The churchyard's outline** was not measured (the LiDAR and the OS map would give it).
- **The church's Welsh name** has no source (see the opening); a human Welsh check is parked.
- **The clas enclosure**: whether the oval churchyard is the early llan's line [S4][S6] is an inference in both.
- **Seats, cost and architect** (the newspaper's figures against the gazetteer's), which the ICBS file would settle.
- **Not read**: Ludlow's other reports (1997-8, Dinefwr churches; 2004, Early Medieval Ecclesiastical Sites gazetteer),
  scanned without a text layer [S3]; Soulsby and Jones 1977 (*Historic Towns: Dinefwr*); Evans 1910 ("Llandilo-fawr",
  *Trans. Carms. Antiq. Soc.* 5); Edwards, *Corpus of Early Medieval Inscribed Stones* vol. 2; Westwood 1859; the Llandeilo
  WI churchyard survey of 1981-82.

## For the owner's decision

- **Phase boundaries.** The app's clas church runs to 1300 and the medieval church from 1300, with no source for 1300.
  The only dated reading is c. 1400 [S6], and it dates **the building pulled down in 1848**, not the end of an earlier
  church or of timber building. The church was a parish church by 1200 and appropriated to Talley c. 1215 (Ludlow [S5];
  the local page [S6] says "in the twelfth century"), and the HER has it losing episcopal status by the 11th century
  [S4], so "clas" does not fit it after c. 1215. Moving the boundary to c. 1400 would keep an imagined small thatched
  timber church labelled "the clas church" on screen for another century of the app's v1 medieval slice. Three options:
  (a) keep 1300, the ⓘ saying no source gives it; (b) move to c. 1400 and relabel the earlier phase "St Teilo's before the
  double-naved church (form unknown)", dropping "clas" from it; (c) add a middle phase, "parish church, form unknown"
  (c. 1215 or 1300 to c. 1400), imagined, between the clas church and the double nave. Claude's recommendation: (b), the
  cheapest honest option, with the ⓘ saying the date is one unreferenced source for the last pre-1848 building and that
  the start of stone building is not known; (c) is the more accurate map and costs a feature.
- **The tower's start.** Keep c. 1600 (the HER's and Coflein's wording of Ludlow's "later 16th century") or show it from
  the 15th century (the listing). Claude's recommendation: keep c. 1600, the ⓘ giving both readings, because Ludlow's is
  the only reading made from a survey of the fabric. This is the decision the medieval check already left for Dewi.
- **The tower's top, c. 1600-1848.** Draw the battlements (Ludlow) or a plain top (Cadw's 19th-century battlements, the
  earlier top unknown). Claude's recommendation: battlements, as the fabric survey dates them, with the ⓘ saying Cadw dates
  them to the 19th century.
- **The south transept before 1848.** Its date is unknown and the 1837 maps are its first evidence. Claude's
  recommendation: draw it in the tower phase (to 1848) and not in the medieval phase, with the ⓘ saying so.
- **A rebuilding phase, 1848-1850** (the tower alone while the body went up). Claude's recommendation: yes, short and
  plain (the tower and low walls), since the dates are documented and it shows the one moment the tower stood on its own.

## Plan for the Blender model

Proposed by Claude under the proactive mandate (ADR 0027). It follows the forts and Dinefwr: one feature per phase,
every part with an id, a name, its own provenance and its kits; the ground (the churchyard, the well, the road) stays
procedural on the terrain (ADR 0053, point 5). Coordinates are in the plan frame above (x along the axis, y to its left,
metres from Coflein's point). **Every number not marked "measured" or quoted is an estimate and is marked so.** Heights
are above the churchyard at the tower's foot, 55.8m OD [S14]; the ground falls about a metre to the east end, which the
fit to the terrain takes up. An id names one physical part for good, so the tower is `teilo/tower` in every phase.

**Phases and dates (proposed):**

| Feature id | Years | Basis |
|---|---|---|
| `clas-church` (existing) | c. 550 (tradition) to c. 1400 if the owner takes option (b) (1300 today) | Teilo's community by tradition; documented by the 9th century [S12][S6][S4]; form unknown |
| `medieval-church` (existing) | c. 1400 to c. 1600 | The double nave [S2][S5]; "c.1400" one source [S6]; ends at the tower's contested date |
| `tower-church` (existing) | c. 1600 (15th century on the listing's reading) to 1848 | The tower [S2][S5][S1]; the transept by 1837 [S5] |
| `church-rebuilding` (new) | 1848 to 10 October 1850 | Demolition 1848 [S5][S1]; reopening [S7] |
| `scott-church` (existing) | 1850 to c. 1905 (1903 on Ludlow's date) | [S7][S2][S5] |
| `scott-church-organ` (new) | c. 1905 (1903) to now | The organ chamber [S5][S2][S6] |

The dates join with no gap: c. 550, c. 1400, c. 1600, 1848, 1850, c. 1905, now. Every boundary but 1848 and 1850 is
contested or approximate, and the ⓘ says so. (Today's `scott-church` runs from 1848, through the rebuilding.)

**Phase `clas-church`.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `teilo/clas-church` | hall, on the line of today's nave | **Unknown** (estimate 12 x 6m, 3.5m to the eaves, as the app draws it today); place **unknown** (estimate: the nave's centre, (0, -2.3)) | imagined (form, size, material and place); documented that a church of Teilo's stood here by the 9th century | S12, S6, S4 | `timber-frame`, `thatch-roof` (existing; Roman evidence, so a medieval analogy text is needed, as for Dinefwr) | timber, thatch (existing surfaces, analogy) |

**Phase `medieval-church`.** The outlines are today's measured ones, **reconstructed** from two secondary sources that
the plan was the same [S5][S6] (see the Summary); the heights are imagined.

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `teilo/nave` | hall, x -17.3 to 20.0, y -7.8 to 3.2 (centre (1.35, -2.3), 37.3 x 11.0m) | Outline measured on today's church; height **unknown** (estimate: walls 6m, gable roof at today's pitch, about 50 degrees) | reconstructed (the outline is today's, measured [S14], on Ludlow's reading of the 1837 maps and the local page's reused foundations: two secondary sources, [S5][S6]; not a measurement of the medieval walls); height and form imagined | S5, S6, S2, S14 | `coursed-rubble` (new; Dinefwr's note proposes the same kit, so one kit for both) | rubble (analogy: the tower's), roof covering **unknown** (analogy) |
| `teilo/aisle-n` | hall, x -17.5 to 14.0, y 3.2 to 11.3 (centre (-1.75, 7.25), 31.5 x 8.1m) | As the nave; height **unknown** (estimate: walls 5m) | as `teilo/nave` | S5, S6, S2, S14 | as above | as above |
| `teilo/chancel-end` | none: the chancel is the nave's east end, which runs about 6m past the north aisle; whether it had its own roof or arch before 1848 is **unknown** | - | - | S5, S2 | - | - |

**Phase `tower-church`** (as `medieval-church`, plus these).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `teilo/tower` | tower, square, centre (-20.0, -2.25), x -24.0 to -16.0, y -6.0 to 1.5 | **8.0 x 7.5m** above the batter (measured); roof 17.4m, parapet top **18.7m** (measured); batter to a string course about 1.8m up (photograph, ±1m); its east 1.3m is engaged in the nave's west end (measured: the nave's west wall at x -17.3) | documented (survives: S2, S5, S7; measured S14); date contested | S2, S5, S7, S14, S17 | tower `batter: true`, `top: 'battlements'` (existing plan values; the battlements' date contested: draw them per the owner's decision); `string-course` (new; shared with Dinefwr: roll-moulded, Old Red Sandstone [S5]); `two-light-opening` (new: the belfry openings on all four faces [S2][S5], the north window of the second stage); `gargoyle` (new: spouts on the north, south and west faces [S5]) | tower rubble (sourced: S17, this tower), Old Red Sandstone dressings and quoins (sourced: S17) |
| `teilo/turret` | tower, square, at the tower's north-east angle, x -19.5 to -16.0, y 1.5 to 3.5 | About 3.5 x 2.0m projecting from the north face (measured; how much of it is inside the tower's wall is not known); top **20.5m** (measured), above the parapet by about 1.8m | documented (place: Cadw listing and the survey, against Ludlow's west half [S5]; height measured) | S2, S5, S14, S18 | tower `top: 'battlements'`; `loop-window` (new; shared with Dinefwr: the slit lights [S2][S5]) | as the tower |
| `teilo/tower-door-w` | opening in the tower's west face | **Unknown** size | contested: a 16th-century cut-out [S5] or a 19th-century door [S2]; draw per the owner's decision | S2, S5 | `ledged-leaf` (existing; Roman analogy, needs medieval text) | timber |
| `teilo/transept-s` | hall, the south gables' site, x 0.3 to 14.0, y -7.8 to -13.3 (estimate: one roof over both of today's gables' footprint, since Ludlow calls it "large") | Outline from today's (measured); whether it was one gable or two, and its height, **unknown** (estimate: walls 5m) | documented (existence by 1837 and site: one source: Ludlow, from the maps); form imagined | S5, S14 | `coursed-rubble` | as the nave |
| `teilo/vestry-old` (optional, queried) | lean-to or hall on the vestry's site, x 14.0 to 20.0, y -7.8 to -11.3 | Outline today's (measured); size and form **unknown** | reconstructed; documented (one source: Ludlow, queried "(and vestry?)") that something stood there by 1837 | S5, S14 | `coursed-rubble` | as the nave |
| `teilo/aisle-n` (late) | as the medieval phase, roof possibly off by 1837 | - | reconstructed (Ludlow's "may have been roofless", from the aisle's lack of shading on the 1837 tithe map [S5]); an optional sub-phase "by 1837" to 1848 (no source gives c. 1830) | S5 | - | - |

**Phase `church-rebuilding`.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `teilo/tower` | as `tower-church`, standing alone | as above | documented | S7, S5, S1 | as above | as above |
| `teilo/works` | low walls on the 1850 outline | Height **unknown** (estimate 2m, rising) | imagined (stages); documented that the body was rebuilt on the old lines [S5][S6] | S5, S6, S7 | `coursed-rubble` | Victorian rubble (sourced) |

**Phase `scott-church`.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `teilo/tower` | as `tower-church` | as above, with today's battlements | documented | S2, S5, S14 | as above; `clock-face` (new: three faces on the third stage [S2], about 2.4m across, centre about 11m up, from the photograph [S17]; a clock by 1868 [S5], the faces' date unknown) | as above |
| `teilo/turret` | as above | as above | documented | S2, S14 | as above | as above |
| `teilo/nave` | hall, x -17.3 to 20.0, y -7.8 to 3.2 | **37.3 x 11.0m** (measured); eaves about 6.9m (measured on the south: 62.7m OD), ridge **13.4m** (measured: 69.2m OD); seven bays [S5] | documented | S1, S2, S5, S14 | hall `roof: 'gable'` with gable parapets (a `gable-parapet` kit, new: "raking gable parapets on kneelers" [S2]); `buttress` (new: stepped, cross-buttressed at the corners [S5]); `tracery-window` (new: three-light on the sides; four-light at the west end and five-light at the east end of the north range, six-light in the chancel's east wall [S2][S5]); `base-offset` (the chamfered plinth [S5], a trim kit) | Victorian snecked rubble (sourced: S17, S19), grey limestone dressings (sourced: S5, S17), slate (sourced: S2, S5; photograph S18) |
| `teilo/aisle-n` | hall, x -17.5 to 14.0, y 3.2 to 11.3 | **31.5 x 8.1m** (measured); eaves about 5.8m, ridge **11.0m** (measured: 66.8m OD); six bays [S5] | documented | S1, S2, S5, S14 | as the nave | as the nave |
| `teilo/porch-n` | hall, gable to the north, x about -12.3 to -7.2, y 11.2 to about 14.4 | About **5.0 x 3.1m** (measured, low confidence: trees stand close); eaves about **3.1-3.4m** and ridge about **5.0-5.3m** above the ground (measured on the surface model, low confidence, the ridge running north-south over x about -9.7; the first draft had 4.7 x 2.2m and "height unknown", corrected on the independent check) | documented (place: second bay from the west [S1][S2], measured); size measured | S1, S2, S14 | `tracery-window` not needed; doorway with nookshafts [S2] (a `pointed-doorway` kit, new) | as the nave |
| `teilo/transept-s` | hall, gable to the south, x 0.3 to 7.2, y -7.8 to -12.3 | **6.9 x 4.5m** projecting (measured); ridge about **9.5-9.9m** (measured: 65.3-65.7m OD) | documented (one gable in 1850: one source: Ludlow, which gable is which; the gable measured) | S5, S2, S14 | as the nave | as the nave |
| `teilo/vestry` | lean-to, x 14.0 to 20.0, y -7.8 to -11.3 | **6.0 x 3.5m** (measured); the lean-to falls from about **61.4m OD (6.4m above the ground) at the nave's wall to about 58.7m OD (3.8m) at its outer side** (measured; the first draft gave a mid-slope median, "top about 4.7m", corrected on the independent check) | documented | S2, S5, S14 | `roof: 'lean-to'` has **no plan value yet** (a hall with a gable will not do; the build adds one, or uses a prism) | as the nave |
| `teilo/vault-projection` | low coped lean-to against the aisle's east wall, x 14.0 to about 16.0, y about 4.5 to 10.5 | Rising about **1-2m** above the ground and falling eastward (measured, low confidence: 1m cells) | documented (one source: Ludlow: the vault "projects beyond the aisle east wall where it is coped back to form a lean-to up to the sill level of the wall"; the survey shows a low mass there); whether it is a medieval undercroft or an 18th-century vault is contested | S5, S14 | `coursed-rubble` | as the nave |

**Phase `scott-church-organ`** (as `scott-church`, plus this).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `teilo/organ-chamber` | hall, gable to the south, x 7.2 to 14.0, y -7.8 to -13.3 | **6.8 x 5.5m** projecting (measured); ridge about **9.5-9.9m** (measured: 65.3-65.7m OD) | documented (date contested 1903/1905; place one source: Ludlow's "between the vestry and the south transept", which the survey fits) | S5, S2, S6, S14 | as the nave | as the nave |
| `teilo/chimney-vestry` | small octagonal chimney | **Unknown** size; from 1930 [S5] | documented (one source: Ludlow); optional | S5 | none | as the nave |

**What the Blender build will need.**

1. **Per-part plans.** St Teilo's plans in `src/content/buildings.ts` (`CLAS_CHURCH`, `MEDIEVAL_CHURCH`, `TOWER_CHURCH`,
   `SCOTT_CHURCH`) carry one provenance per feature; each part needs an id, a name and its own provenance, and the
   outlines and heights move to the measured ones above.
2. **A `true` setting.** The church plans are `map` today; true size and true height, as the forts and (proposed)
   Dinefwr. Only `map` hides the modern OS building under a plan (`src/domain/plan.ts`), so a `true` church must hide
   the town's own footprint of the church [S15] another way, or the two draw on top of each other.
3. **New kits**, each claiming its own evidence: `string-course`, `loop-window` and `coursed-rubble` (shared with the
   Dinefwr note, so one kit each, not two), `two-light-opening`, `gargoyle`, `clock-face`, `tracery-window`, `buttress`,
   `gable-parapet`, `pointed-doorway`, `base-offset`. The existing ten kits are Roman ([`dinefwr-castle.md`](dinefwr-castle.md),
   "The existing kits are Roman"), so `timber-frame`, `thatch-roof` and `ledged-leaf` on the clas church and the tower door
   need a medieval analogy text or a kit of their own.
4. **A lean-to roof** for the vestry: `hall.roof` has `'none'`, `'gable'`, `'hip'`, `'parapet'` and `'battlements'`, no
   lean-to.
5. **Textures**, each an asset in the manifest: the tower's rubble and its purple Old Red Sandstone dressings, and the
   Victorian snecked rubble, grey limestone dressings and slate, all from openly licensed photographs of this church
   [S17][S18][S19] (sourced, not analogy); the medieval body's walls and roofs, unknown, labelled analogy.
6. **Ground.** A LiDAR landmark area for the church (below).
7. **The `at`** stays at Coflein's point, as now.
8. **A content test for the one-source labels**, as Dinefwr's note proposes: a "one source" note on every part this note
   labels so, so the ⓘ never presents Coflein and the HER as a cross-check of their parents.

**The LiDAR area proposed.** A landmark area `st-teilo` in `tools/terrain/lidar-areas.json`: centre E 262930 N 222236
(Coflein's point), `halfSize` 150 (a 300m square, E 262780-263080, N 222086-222386), which holds the churchyard and the
streets round it. It touches **two 500m tiles, (E 262500, N 222000) and (E 263000, N 222000)**, from the 1km source tiles
**SN6222 and SN6322**; both 500m tiles are already built at 2m inside the `llandeilo` area, so the new area adds no bytes
today and keeps the church's detail if the town's area is ever changed. It is far inside the region (more than 1.5km from
every edge, against the 300m blend margin). For the model's own measurements the surface model of SN6222 (the DSM) is
needed as well [S14]; it is not in the repository and need not be.

## Sources

- [S1] Coflein (RCAHMW), "St Teilo's Church Llandeilo", NPRN 100867, SN 6293022236, Type CHURCH (description "RCAHMW, 10 February 2009"). https://coflein.gov.uk/en/site/100867/ — large curvilinear churchyard, roads round it, bisected by the A483; Lichfield gospels; Deanery of Stradtowy; Llandaff then St Davids; appropriated by Talley c. 1215; two "tenth-eleventh century" cross-heads, one found beneath the chancel in the 1850s; a Latin-inscribed stone in 1697, lost by 1893; 15th-century font from Llandyfeisant; the culverted spring and vaulted well-chamber; "The medieval church comprised a double nave and fifteenth century west tower. In 1845 the north aisle may have been roofless. In 1848 the body of the church was demolished ... with stone excavated from a quarry within the churchyard. The quarry reportedly caved in, killing one of the workers"; "seven-bayed nave and chancel, south transept, six-bayed north aisle (whose east bay lies above a vault), north porch, vestry ... and transeptal organ chamber"; "The tower is thought to date to around 1600 and is similar to the contemporary tower at St Tybie's Church, Llandybie"; "largely rebuilt in the Decorated style in 1848-51 by G.G. Scott following a competition"; the tower description as in S2. Its exterior text follows S2 and its history S5. Same record as `victorian:S23`, `models:S28` and `medieval:S57`. Read directly 2026-10-17.
- [S2] Cadw, Listed Buildings Full Report 11097, "Parish Church of St Teilo", Grade II, designated 14 March 1966, E 262930 N 222236, "Information supplied by Mr P Howell". https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=11097 — "Set in a large raised churchyard"; "Medieval church on celtic site largely rebuilt in Decorated style 1848-51 by G G Scott following a competition. (Drawings survive in the church). Restored 1905 by David Jenkins of Llandeilo. Medieval church of double nave and C15 W tower; of which tower remains (vaulted undercroft said to survive)"; "6 bay double nave with chancel to that on S. Twin gabled S transept with outshot vestry. Defensive medieval W tower. 4 stage W tower; squared, coursed rubble dressed quoins. Splayed base below stringcourse. C19 pointed door cut to W side. 2 light cusped Perp window with returned label to N on 2nd stage. 3 large clock faces to 3rd stage. Two light cusped Perp windows to bell stage openings on each face. Stringcourse below C19 crenellated battlements with gargoyle waterspouts. Stair turret to NE angle rises above tower, slit like vice windows"; "Snecked rubble masonry ashlar dressings"; "Steeply pitched slate roofs, raking gable parapets on kneelers. Chancel advanced one bay"; octagonal arcade piers. Same report as `models:S29`. Read directly 2026-10-17.
- [S3] Heneb Historic Environment Record (Archwilio), PRN 888, "St Teilo's Llandeilo Fawr", SN6293022236, Medieval and post-medieval church, Listed Building II. https://archwilio.org.uk/arch/query/page.php?watprn=DAT888&dbname=dat&tbname=core — "Medieval parish church, large, comprising a west tower from c.1600. The rest is later ... from 1848-51. The organ chamber over heating chamber, is from 1903" (NDL 2003); "The church retains 15% pre-19th century core fabric"; "The original church was of the double aisle plan. Restored 1848-50"; artefacts: two cross-heads "9th to 11th century?", PRNs 890 and 891; an inscribed stone "5th-6th century, PRN 889, lost"; sources include Ludlow 1998 "Llandeilo Fawr, St Teilo", the Cadw churches project archive, RCAHM 1917, Lewis 1833, Soulsby and Jones 1977, and the 1981-82 WI churchyard survey; the map search beside it lists the well (PRNs 27003, 11688) and the churchyard (912). Derived from information held by the Heneb HER Charitable Trust copyright. Read directly 2026-10-17.
- [S4] Heneb HER (Archwilio), PRN 912, "St Teilo's Church Llandeilo Fawr", Early Medieval churchyard, clas, monastery. https://archwilio.org.uk/arch/query/page.php?watprn=DAT912&dbname=dat&tbname=core — "Early medieval A site"; "possibly a monastic clas church from the first. It was a bishopric by the 8th century"; may have superseded Cynwyl Gaeo as mother church in the 8th century; "By the 11th century it lost episcopal status, which may suggest a change of monastic site - to Talley Abbey?"; one Group I and two Group III early medieval stones, "+/- in situ"; "The large, suboval churchyard probably overlies the major Roman Road between Loughor and Llandovery, and lies 700m east of the Roman fort"; the holy well; "nuclear to a possible pre-/post-Conquest Welsh 'bond' settlement" (NDL 2003). Derived from information held by the Heneb HER Charitable Trust copyright. Read directly 2026-10-17.
- [S5] N. Ludlow, Welsh Historic Churches Project, Carmarthenshire churches, entry "St Teilo, Llandeilo Fawr, Carmarthenshire (Dinefwr)" (Cambria Archaeology / Dyfed Archaeological Trust for Cadw; fieldwork 1998; Dyfed PRN 888, RB No. 3437, NGR SN 6293 2225), scanned PDF of 387 pages on the Welsh HER portal, the entry on PDF pages 123-128 (the running head reads "St Teilo, Llandeilo Fawr" on them and "St Dingat, Llandingat" from p. 129). http://www.walesher1974.org/her/app/php/herumd.php?group=DAT&level=3&docid=301363822 — reached from the HER's project record DAT57045 (https://archwilio.org.uk/her/chi3/report/page.php?watprn=DAT57045), whose sources list "Welsh Historic Churches Project Carmarthenshire Churches 1998 - 2000 (© DAT)"; the identification of this PDF with that title is by the order of the links, not by a title page (the scan has none). Text layer read 2026-10-17 (SHA-256 of the PDF e738a698...). Says: "Medieval church; 15% pre-19th century core fabric"; "Phase 1 - West tower, later C16. Phase 2 - Chancel, nave, north aisle, south transept, north porch, vestry, 1848-51. Phase 3 - Organ/heating chamber, 1903"; "Mainly snecked local limestone and ORS rubble construction"; "earthwork platform around/below 15% of church; burial vaults beneath 20% of church; 10% of church beneath ground level"; the present church "7-bayed chancel/nave, without structural division ... 6-bayed north aisle ... north porch ... single-bayed vestry south of the east bay ... transeptal organ chamber, over a heating chamber, between the vestry and the south transept"; the Dynevor Chapel "said to lie over a medieval undercroft (Cadw, 1991, 34) but the 'undercroft' is more likely to be an 18th century burial vault"; the tower "from the later 16th century, is of late Perpendicular character similar to the contemporary tower at Llandybie ... comprises 3 storeys ... roughly squared and coursed rubble, with Old Red Sandstone dressings and quoins ... the external batter up to a string-course ... roll-moulded Old Red Sandstone ... A square spiral stair turret projects from the western half of the north wall ... The west door occupies a later 16th century cut-out in the batter, but was rebuilt in 1848-51 ... The crenellated parapet, which occupies a higher level over the stair-turret, lies on a string-course, all from the later 16th century; rainwater chutes moulded as gargoyles"; "Two maps (NLW, Llandeilo Fawr, Tithe Map, 1837 and NLW, Plan of the Town of Llandeilo ..., n.d.) show the pre-1848 church to have been of the same dimensions, and to possess the same ground plan, is its successor, comprising a nave, north aisle and west tower, with a large south transept (and vestry?)"; the 1678, 1685 and 1705 presentments; Lewis 1833 "large heavy building, consisting only of 2 aisles"; the tithe map's unshaded aisle; 1845 "dilapidation" (RCAHM 1917, 91); demolition 1848 (Jenkins 1912), Scott, completed 1851 (Samuel 1868); the organ chamber 1903 (NLW SD/F/256); a clock by 1868, "decrepit with old age"; the bells cracked 1868; the chimney 1930; appropriation to Talley c. 1215 and 1239. Read from the text layer, checked against the page image of p. 123.
- [S6] Llandeilo History (llandeilo.org, Terry Norman and Andy Mabbutt), "St Teilo's Church" ("From: www.llandeilofawr.org.uk"). https://www.llandeilo.org/ch_st-teilos.html — "The church building which you see today was completed in 1850; the tower is late medieval"; Teilo's tomb shown to visitors "including King Edward I" in the 13th century; the gospel book given "to the altar of St.Teilo" c. 820; "there was a bishop at Llandeilo Fawr in the ninth century"; "The pre-1848 building was a late medieval structure of c.1400. The tower is the only surviving feature of that building above ground. The rebuilders of 1848 chose to use the existing medieval foundations, so that the ground plan of the present church reproduces that of the medieval building. The present building was designed by Edward Davies, an architect from Bath, and built under the supervision of George Gilbert Scott"; seating some 700 in 1850; the organ at the west end with a singing gallery before 1905 and "a new organ chamber was constructed in 1905"; the north aisle made a hall in 1979; the cross-heads "c.900AD"; the churchyard "about three and a half acres", oval, the turnpike through it "in the late eighteenth century"; the well near the east end, covered in the mid-19th century. Local history, unreferenced. Same page as `models:S30`. Read directly 2026-10-17.
- [S7] *The Welshman*, 11 October 1850, "Re-opening of Llandilo Church", Welsh Newspapers Online (National Library of Wales). https://newspapers.library.wales/view/4347234/4347236/12/ — "the old steeple - one of the most antiquated structures in the Principality, was allowed to remain intact, while the entire body of the Church was rebuilt by public subscription, at an expense of about four thousand pounds. The Architect, Mr. Scott, of London, and the Clerk of the Works, Mr. John Harries"; "the project ... was only enunciated three years ago"; the Dynevor family's contribution (figure garbled in the OCR); "the Church Building Society granted a vote of £220"; "performed by admeasurement, in preference to contract"; "the style being that of ... decorated English"; seats for 920 (the OCR reads "It wi)l accom- modate 920 individual,,"); services from 11 o'clock. The quotations here are the OCR with its broken hyphenation and misread letters cleaned (for example "stee- Ide" as "steeple"). Primary. Same report as `effects:S10`. Read from the OCR text 2026-10-17.
- [S8] Samuel Lewis, *A Topographical Dictionary of Wales* (London, 1849), "Llandilo-Vawr", British History Online. https://www.british-history.ac.uk/topographical-dict/wales/pp524-536 — "a new road has been constructed through the churchyard, instead of the old one, which was so steep ... as to be almost impassable for carriages"; "a pure spring in the churchyard, at which St. Teilo used to baptize Christian converts in ancient times"; "The church, dedicated to St. Teilo, and situated nearly in the centre of the town, was rebuilt in 1848-9, on the same site, from the designs of Mr. Scott". Contemporary gazetteer. Read directly 2026-10-17.
- [S9] GENUKI, "Llandilo Fawr, Carmarthenshire", quoting Lewis's *Topographical Dictionary of Wales* (1844). https://www.genuki.org.uk/big/wal/CMN/LlandeiloFawr — "The church, dedicated to St. Teilo, and situated nearly in the centre of the town, is a large heavy building . . ." (GENUKI's ellipsis; the 1833 wording "consisting only of 2 aisles, and undistinguished by any peculiar architectural features" is from Ludlow's quotation [S5]). Read directly 2026-10-17.
- [S10] Robert Hoare (research by Ian Toplis), "St Teilo's, Llandilo", GilbertScott.org. https://gilbertscott.org/buildings/st-teilos-llandilo — "A competition was held for architects to submit their plans for the rebuilding of the old church in 1844. However, the competition collapsed and Sir George Gilbert Scott was called in"; "a simple Decorated style, costing £4,723, to seat around 700 and constructed of hard grey limestone"; fittings; "His clerk of works was John Harries, a local surveyor, and the work was completed by 1851"; links to the ICBS images 03533 and 03533a on churchplansonline.org (a site no longer serving them). Secondary, by Scott's descendant. Read directly 2026-10-17.
- [S11] Lambeth Palace Library, Incorporated Church Building Society file ICBS 3533, Llandilo, Carmarthenshire, ground plan, 1844-1851, creators "G. G. Scott?" and John Harries, images LPLIBLPL~34~34~84367~113585 and ~123258~118079. https://images.lambethpalacelibrary.org.uk/luna/servlet/detail/LPLIBLPL~34~34~84367~113585 — **not read**: known only from a search engine's summary of the record; the image server returned a verification page and then a login page (2026-10-17).
- [S12] Dictionary of Welsh Biography, "TEILO (sometimes called ELIUD), a Celtic saint of the 6th century" (E. G. Bowen). https://biography.wales/article/s-TEIL-SAN-0500.html — "the true story of his career and actions has long since perished"; the gospel book's margins show "that in the 9th century ... he was still venerated in South Wales as the founder of a monastery which was almost certainly Llan-deilo-fawr"; the *Liber Landavensis* Life about three hundred years later, transferring the monastery's tradition and property to Llandaff. Same entry as `timeline:S19`. Read directly 2026-10-17.
- [S13] Wikipedia, "St Teilo's Church, Llandeilo". https://en.wikipedia.org/wiki/St_Teilo%27s_Church,_Llandeilo — lead only: "The fabric of the building has medieval origins but stands on a much older site and was rebuilt in the early eighteenth century" (no source for it; its references are a dead llandeilo.org page, britishlistedbuildings and Coflein); listed 14 March 1966. Read as raw wikitext 2026-10-17.
- [S14] Welsh Government LiDAR, 2020-22 national survey, 1m DSM and DTM, tile SN6222 (`wg_del_26_262222_20220222dsm.tif`, 1,680,133 bytes, SHA-256 7c162d1e...; `wg_del_26_262222_20220222dtm.tif`, the repository's manifest copy, SHA-256 974051ba...), DataMapWales; Open Government Licence v3 (see [`../data/lidar.md`](../data/lidar.md)). https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dsm/wg_del_26_262222_20220222dsm.tif — measured 2026-10-17 by Claude in the plan frame: outlines where the surface stands more than 2.5m above the terrain model, the tower shaft where it stands more than 15m above it and the turret more than 19.5m; ridge lines by the highest cell across each section; heights as medians of 11-112 cells (the porch and vestry were re-measured on the independent check, 2026-10-17, from the same DSM, SHA-256 7c162d1e, and the repository's DTM). Tower parapet 74.42-74.59m OD (median, p90), tower roof 73.20-73.26, turret 76.13-76.39, nave ridge 69.1-69.4, aisle ridge 66.25-66.85, south gables 65.3-65.7, vestry 58.7 at its outer side to 61.4 at the wall, porch ridge about 61.1 (5.0-5.3m above ground 56.0); ground 55.82 (W) and 55.83 (S) of the tower, 54.79 (E of the chancel).
- [S15] Ordnance Survey, OS OpenMap Local, tile SN, `Building` layer (Open Government Licence; local copy in ~/code/data/llandeilo/oml, downloaded 2026-09-26). https://api.os.uk/downloads/v1/products/OpenMapLocal/downloads?area=SN&format=ESRI%C2%AE+Shapefile&redirect — feature 128412: 831m², minimum rectangle 42.2 x 21.4m with a side at 19.3 degrees from grid east, centroid E 262927.4 N 222237.6; it leaves out the south gables and vestry and does not separate the tower. Same data as `models:S31`. Read locally with GDAL's Python bindings 2026-10-17.
- [S16] British Geological Survey, DiGMapGB-50 bedrock (v9.25, released 31 March 2025), WMS GetFeatureInfo at E 262930 N 222236. https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer — "Llandeilo Flags Formation - Sandstone, limestone and argillaceous rocks", Ordovician (Abereiddian), "shallow seas". Read 2026-10-17.
- [S17] Ken Day, "Llandeilo Parish Church, St Teilo's. Tower, south face", 7 August 2014, Wikimedia Commons, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Llandeilo_Parish_Church,_St_Teilo%27s._Tower,_south_face.jpg — viewed (1280px): battered base to a string course, purple-red sandstone quoins and dressings against grey-brown coursed rubble, a clock face, a two-light belfry opening, an upper string course with projecting spouts, crenellations; the nave's west gable with a tracery window and the aisle beyond.
- [S18] Jaggery, "Tower, St Teilo's church, Llandeilo", 26 June 2011, geograph.org.uk 3270292 via Wikimedia Commons, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Tower,_St_Teilo%27s_church,_Llandeilo_-_geograph.org.uk_-_3270292.jpg — viewed: the stair turret rising above the tower's parapet with its own crenellations, a clock face, the nave's slate roof.
- [S19] Darren Wyn Rees, "St Teilo's Church, Llandeilo", 21 August 2020, Wikimedia Commons, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:St_Teilo%27s_Church,_Llandeilo.jpg — viewed: clock faces on two faces of the tower, the west gable's tracery window, the raised churchyard behind its wall.
- [S20] Lynn Hughes, "Pons Asinorum" (Carmarthenshire Life, November 2004; from a work in progress, *Towy: The Biography of a River*), on llandeilo.org. https://llandeilo.org/bge_history.html — the building of the new Llandeilo bridge, 1845-48, quoting Thomas Jenkins's diary: "Quarry opened up in the churchyard, gave way and buried five men. Four saved, but one, after remaining buried for two hours, taken out a corpse. Great carelessness on someone's part. Now the quarry will have to be abandoned without procuring any stones worth using from it"; it introduces the entry (dated "April 18th", no year given; it follows the January 1848 events in his narrative) as an accident that did not help "the scarcity of in-fill material" for the bridge approaches. Same page as `effects:S6`. Read directly 2026-10-17 (re-read on the independent check). Secondary, quoting a primary diary (Jenkins's diary is in *Trans. Carmarthenshire Antiquarian Society* 8, 1912, which Ludlow cites).
