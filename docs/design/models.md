---
title: Realistic models of important buildings
kind: design
status: partly built
updated: 2026-10-10
---

# Realistic models for the important buildings, through time

Raised by Dewi, 2026-09-28. **Option A (accurate low-poly) is built** for the phases below. **Option B is chosen**
for the Blender models (Dewi, 2026-10-10: "Get proper textures", ADR 0052). How plans are written is in [`../content/authoring.md`](../content/authoring.md).

**Built for the Roman forts (2026-10-10):** the pipeline for scripted Blender models of these landmarks
([`blender-models.md`](blender-models.md), [ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)).
Fort 1, Fort 2 and the settlement are drawn from their models above Low graphics; the castles, churches,
abbey, bridge, town and trains are next, in the note's order.

## The idea

The important places (castles, the abbey, the church, the forts, the bridge, Newton House) get
**realistic, accurate models**, one per phase, so each changes as it really did: built, extended,
besieged, slighted, ruined, restored.

## ⚠️ This changes an agreed decision

CLAUDE.md records **"Clean low-poly"** as the agreed look (Dewi chose it over "rich stylised" and
"high-poly now"). Realistic landmarks would change that, so it needs a decision:

| Option | What it looks like | Cost |
|---|---|---|
| A. Accurate low-poly | Same clean style, but modelled from the real plans: right towers, wards, gatehouses, heights | Moderate; keeps the look consistent |
| B. Realistic landmarks in a low-poly world | Detailed, textured hero buildings on the stylised valley | High; risk of a style clash |
| C. Realistic everywhere | Change the whole look | Very high; phones and bundle size suffer |

## Phases to model (from the research)

| Place | Phases |
|---|---|
| Dinefwr Castle | the castle first recorded in 1151, and the Lord Rhys's "castle in the new style" begun after 1171-72 · 13th/14th-century stone castle with the great round tower · Tudor residence · ruin with the summerhouse on the tower |
| Carreg Cennen | Welsh castle (form unknown, so labelled reconstructed) · Giffard's rebuild 1287–1321 with the twin-towered gatehouse · slighted ruin after 1462 |
| Dryslwyn | Three-ward castle of the 1220s · 1287 siege damage · ruin |
| Talley Abbey | Unfinished cruciform church and cloister · the ruin with its two surviving tower walls |
| St Teilo's | Clas church (form unknown) · medieval church · c. 1600 west tower · George Gilbert Scott's rebuild 1848–51 |
| Roman forts | The larger fort · the smaller fort · buried and forgotten · found 2003 |
| Garn Goch | Stone ramparts in use · rubble banks today |
| Newton House | 1660 house · turrets from 1760–80 · Gothic recasing 1856–57 |
| Llandeilo Bridge | The seven-arched bridge · the 1848 single arch (44.2m span) |

## How models could be made

- **Blender, scripted** (installed): build each phase from the documented plans and dimensions in
  the research, export glTF, compress with gltf-transform.
- **Photogrammetry scans**: some castles have CC-BY scans on Sketchfab; usable only with a licence
  that allows it, recorded in the asset manifest, and only for "today" (a scan shows the ruin).
- **Paid asset packs or AI 3D generators**: possible, but a licence and accuracy question each time.
- Every model is *reconstructed* for any phase that does not survive, and its ⓘ says what it is
  based on (a plan, a description, an analogy).

## Questions

- 💭 Option A, B or C?
- 💭 Which place first? Dinefwr or Carreg Cennen have the richest records.
- 💭 How far does "realistic" go: textured stone, or accurate shape in the current flat colours? ✅ Answered
  2026-10-10: "Get proper textures" (option B for the Blender models, [ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md),
  amended).

## Built (2026-09-28): what each model rests on

Every plan is in `src/content/buildings.ts`, in true metres. "From the research" means the dimension
or feature is in the named note; everything else in the plan is a labelled reconstruction.

| Model | Phases built | From the research | Reconstructed (and said so in its ⓘ) |
|---|---|---|---|
| Carreg Cennen | Welsh castle 1175–1287 · Giffard's inner ward and gatehouse 1287–1300 · with barbican and outer ward 1300–1462 · slighted ruin 1462– | Upper ward c.32×28m; outer ward c.60×60m; curtains 2.8m (E/N), thinner S/W; NW round tower 8m; NE tower c.9×9m; SE Chapel Tower; gatehouse between two octagonal towers; residential range; outer ward walls c.1.7m with half-timbered stables, forge, lime kiln; building order (medieval S24–S26, timeline S36/S37) | The Welsh castle's form (nothing survives); heights; which wall holds the gatehouse; the barbican's route; which walls stand in the ruin |
| Dinefwr | the first castle 1151–1220, held by Maredudd and Rhys, where the Lord Rhys began "a castle in the new style" after 1171-72 (corrected 2026-10-02: no source gives 1163) · stone castle 1220–1600 · ruin 1600– · summerhouse on the stump 1660– | Two enclosures cut off by rock-cut ditches; high inner curtain; lower walled barbican; great round tower c.12m across; smaller round tower at the north angle; towered lodgings on the NE curtain; two-storey stump with a summerhouse (medieval S9–S13, timeline S26/S27) | Enclosure sizes and shapes; the great tower's position; the Rhys phase's form; the summerhouse's form and date (sources disagree) |
| Dryslwyn | first ward 1225–1250 · with the middle ward 1250–1280 · three wards 1280–1430 · ruin 1430– (rebuilt 2026-10-02) | Inner ward with a 12m round keep on its east side by the gate and the hall on the south; middle ward (about 55×30m measured, 70×30m in the text) and great chamber, mid-13th century; outer ward running north-north-east to a gatehouse over a ditch, apartment block and chapel tower, late 13th century, all before 1287 (models S1, S3–S6) | Ward outlines on the ridge from the OS terrain; heights; the exact phase dates; the middle ward's builder (contested); the overall size (the measured 119×107m does not fit the ward sizes, which add up to about 102×132m; drawn from the wards) |
| Talley Abbey | church and cloister 1185–1536 · parish church in the east end, with the rest abandoned, 1536–1773 · ruin 1773– (rebuilt 2026-10-02) | Finished about 49m long of a planned 73m: four-bay nave, south aisle only, north wall on the arcade line, western bays as footings; crossing tower about 12m square, 29m high, its north and east walls standing to 26m; transepts 36m end to end with three chapels each; presbytery 11.7m wide; cloister 23m; the tower on Coflein's grid reference (models S10–S17) | The ranges' widths and heights; how much served the parish (Coflein's 150ft of 1710); the church's exact axis |
| St Teilo's | clas church 550–1300 · double-naved church 1300–1600 · with west tower 1600–1848 · Scott's church 1848– | Double nave; c.1600 west tower (four stages, battlements); Scott's nave, chancel, south transept, north aisle, porch, vestry (victorian S23); outline and axis from the OS footprint | The clas church (timber, form unknown); the naves' size; heights |
| Llandeilo Bridge | seven-arched bridge 1700–1848 · single arch 1848– · old abutment 1848– | One elliptical arch, span 44.2m, rise 12.65m, 14.3m high, 110.64m long, flood arch in the south abutment; seven-arch predecessor with an abutment on the north bank downstream (victorian S21/S22, timeline S54); line from the OS road | Width; the flood arch's size; the old bridge's arches, date and exact line |
| Newton House | 1660 house · turrets 1770–1856 · Penson's Gothic recasing 1856– | 1660 build; turrets and battlements 1760–80; diagonal corner turrets with machicolations and battlements, large porch, parapet, west verandah, grey shale with pale sandstone dressings (victorian S25–S27, timeline S46) | Size and storeys; the 1660 form; the 1770s turrets' form; the porch's side |
| Golden Grove, Aberglasney, Paxton's Tower | as before | Golden Grove's Llangyndeyrn "black marble" and service wing; Paxton's triangular plan, corner turrets, 36ft, hexagonal top room; Aberglasney's OS outline | Most proportions |

Still to do from the phase list above: Garn Goch keeps its earlier builder.

### The Roman forts and their settlement (built 2026-10-09, [ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md))

Four features, all plans in `src/content/forts.ts`, in true size and height (the `true` setting). Each part
has an id, a name and its own tier, and is listed on the key date's card.

| Feature | Dates | Parts | Documented | Reconstructed (analogy, said on each part) |
|---|---|---|---|---|
| Fort 1, the larger | AD 74 (never before 70) to 78, gone by 83 | 66 | Inner ditches round 240m by 160m; two ditches south-west, measured by Trench 1 (V-shaped, 1.7m by 1.1m inner, 1.0m by 0.5m outer), three south-east by survey (profiles drawn like the south-west's, not measured there); gateways south-east and south-west, a six-post tower at the south-west; a four-post interval tower near the eastern corner | Turf rampart (inferred from ditch fill; 3m, 4m base, 1.7m breastwork), corner towers, the other gate towers and walkways, the interior (principia, praetorium, granaries, 16 barracks), the roads; roofs and gate leaves imagined |
| Fort 2, the smaller | AD 83 (the HER's "possibly around 82" is in the ⓘ, unproven) to 125, gone by 140 | 83 | Inner ditches round 140m by 110m; three or more ditches south-east with the outer two joined at the right gate; front, left and right gates; the survey's via principalis and via praetoria | Rampart, towers, interior (six barracks), the rear gate (drawn smaller, unroofed, "not demonstrated"), the other three sides' ditches |
| Fort 1's ditches, backfilled | with Fort 2 | 15 | the backfill of the inner ditch | the pale line itself; the excavator suggests some stretches stayed open as an annex, which is not drawn |
| The settlement (vicus) | AD 83 to 135, fading out by 140 (the pottery's c. AD 70 to 90 is earlier activity, not drawn as streets) | 18 | Two roads from Fort 2's front gate | 16 timber houses, small and irregular, each imagined (the survey shows no street grid) |

Not drawn, because the note marks each "perhaps" or contested: the annex (noted on the backfilled ditches' ⓘ only), the practice camps, the possible
bathhouse, Fort 1's kiln, its north-east and north-west gates (not found) and third possible ditch, the vicus's
funnel ditches and enclosure, the cremations. No stone, tile or limewash. Credit: "Neil Ludlow, for Cambria
Archaeology" (reference, not evidence) and the Hughes report in each ⓘ. Screenshots: [`../images/roman-forts/`](../images/roman-forts/).

**Levels of detail** ([ADR 0047](../adr/0047-detailed-monuments-have-a-far-and-a-near-mesh.md)): a far mesh
(rampart, ditches, gate towers, roads) beyond 2.3km and a near one inside 2km. **Editing**: a part is a data entry
(`fort1/gate-sw/tower-left`); gates are separate parts (towers, walkway, passage, two leaves) so a leaf can
become its own object; since 2026-10-10 (ADR 0053) each leaf of the Blender model is its own mesh on its hinge. **Not done**: the issue's Blender project (Dewi
chose the in-app build on 2026-10-09; on 2026-10-10 he chose scripted Blender models for every landmark, [ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md), built for the forts on 2026-10-10 by [ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)), animation, interiors to walk, characters, and registration on the LiDAR terrain.

## Research gaps hit while modelling

- ~~No plan dimensions for **Dinefwr's** enclosures, or which side the great tower stands on.~~ Closed by
  `research/building-models.md` (2026-10-02, the side) and `research/dinefwr-castle.md` (2026-10-10: the Cadw plan
  fitted to the LiDAR, measured sizes and standing heights, and a part-by-part plan per phase). *Corrected 2026-10-10:
  this line had stayed open after the 2026-10-02 note answered half of it.* Still open there: any medieval height, the
  materials and roofs.
- ~~No ward sizes for **Dryslwyn**, nor when the middle and outer wards were added.~~ Closed by
  `research/building-models.md` (2026-10-02).
- **Carreg Cennen**: which wall holds the gatehouse, and the barbican's route.
- ~~**Talley**: its widths, and whether any nave bays were built.~~ Closed by `research/building-models.md`.
- **St Teilo's**: the tower's height and the medieval naves' size.
- **Newton House**: its size, storeys and the 1660 and 1770s forms.
- **Llandeilo Bridge**: its width. The old bridge's arch sizes and line.
- Coflein plans (Dinefwr NPRN 425 and the others) and Cadw guidebooks would close most of these.
- **Landmark scale meets real neighbours.** Drawn 2.6× larger and now on Coflein's point, Talley's
  ruin overlaps today's OS buildings beside it (St Michael's church and the farm). They are real, so
  they are not hidden; the overlap is the cost of the landmark scale (seen 2026-10-02).

