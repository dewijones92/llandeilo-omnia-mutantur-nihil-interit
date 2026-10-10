---
title: The Dinefwr Roman forts and their civilian settlement (vicus), for a detailed reconstruction
kind: research
status: draft
updated: 2026-10-10
---

# The Dinefwr Roman forts and their vicus, for a detailed reconstruction

Research for GitHub issue 3 (a detailed, modular 3D reconstruction of the Roman fort at Llandeilo, to
sit on the LiDAR terrain). Agreed by Dewi on 2026-10-09, prioritised; choices here are made by Claude
under the proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)). **Built the same day** from this
note and its check ([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md), `src/content/forts.ts`);
the choices the build made are in the ADR and the build log. Written on 2026-10-09 from sources fetched that day; the brief is in
[`briefs/roman-forts-and-vicus.md`](briefs/roman-forts-and-vicus.md). **Independently checked on
2026-10-09** ([review](reviews/roman-forts-and-vicus-check-2026-10-09.md): 98 claims, 72 confirmed, 17 partly,
2 not supported, 7 contradicted); the corrections are applied below, each marked *Corrected 2026-10-09
(independent check)*. The archaeology held; the errors were in the derived placement and in what the first
pass missed by not reaching Archwilio and llandeilo.org. WebSearch was used 14 times, and
WebFetch or direct downloads for everything else; Coflein records were read in full.

It extends [`roman-arrival.md`](roman-arrival.md) (the campaign, the road, the units, the kit) and the
forts entry in [`era-iron-age.md`](era-iron-age.md). It does not repeat their size and date discussion
except where this pass found something new. The primary report was **read in full again** (text, tables
and every figure) rather than relied on from the earlier summaries.

Everything below is labelled with the app's three tiers. **Documented** means evidence from this site
(survey or excavation) or a source that says it. **Reconstructed** means inferred from analogy, and
says from what. **Imagined** means invented to fill a gap (the ⓘ marker applies). Analogy sections
(comparanda) are never local evidence.

## Summary

- **There are two forts, one partly overlying the other, found by magnetometer survey (Stratascan,
  2003 and 2005) and sampled by excavation (Cambria Archaeology, 2005, 2006, 2007).** Fort 1 is
  240m by 160m inside its inner ditches (3.84ha, later 3.85ha); Fort 2 is about 140m by 110m (1.54ha)
  [S1]. The geophysics was **magnetometry** (fluxgate gradiometers), not ground radar; a Wikipedia
  article repeats the radar error [S1][S19a].
- **Dates.** Fort 1: "perhaps soon after AD 74", an earlier date "cannot be ruled out", pre-Flavian
  samian absent, so a Flavian foundation is "most likely" [S1]. Fort 2: **no direct date**. It is
  later, and probably stratigraphically after Fort 1 (a ditch of Fort 1 lies under levelling deposits
  read as preparation for Fort 2) [S1];
  Coflein puts it in a "garrison phase later in the Flavian period" [S2]. The Heneb HER says "possibly around
  82 AD" (PRN 47637) and "the construction of the later fort c.82AD" (PRN 47636), but those are 2013 summaries
  "based on Hughes" and Hughes 2007 gives no such figure, so show it as the HER's reading, still unproven [S23].
  *Corrected 2026-10-09 (independent check).* Its life runs "into the early
  part of the second century" [S2]; the report sees "a reduction in activity in the later Trajanic
  period and abandonment under Hadrian", the site abandoned "by AD 140" [S1]; the same paragraph adds that "it has been
  suggested that southwest Wales was bereft of troops by the mid-120s" (Davies 2000), which bears on how late
  Fort 2 is drawn. *Corrected 2026-10-09 (independent check).*
- **"Around AD 90-100" for the second fort is unsupported as a foundation date.** The commenter's
  Heneb PDF does not contain it (checked: its Roman text is four sentences and a caption, none giving it; the
  fourth names a possible villa at Llys Brychan near Bethlehem) [S4]. *Corrected 2026-10-09 (independent check).* No source
  read gives AD 90-100. The nearest items are weak: a 1993 fieldwalking assemblage whose samian "could
  have been discarded within c.AD 90-130", vicus-area samian of c. AD 90-110, and Coflein's "later in
  the Flavian period" (the Flavian dynasty ended in AD 96) [S1][S2]. Record it as **unsupported**,
  and show Fort 2 as "after Fort 1, date not fixed". **The likely origin is found:** llandeilo.org captions
  the same Ludlow painting "what the second fort may have looked like around 100AD (Drawing: Cambria
  Archaeology)", so the commenter's date is very probably a date for the **scene in the picture**, not a
  foundation date [S24]. *Corrected 2026-10-09 (independent check).*
- **Gates.** Evidenced: Fort 1 has gateways in its south-east and south-west sides, and a six-post
  gate tower is inferred at the south-west gate from four excavated post-pits. Fort 2 has **three of
  four** entrances identified (front, left, right); the rear gate is **not demonstrated**: the outer
  defences are unbroken there and only the inner ditch has a gap [S1]. Do not draw four gates on Fort 2
  as documented, and do not assume gate counts for Fort 1.
- **Defences.** Both forts: "timber and earth defences and timber internal buildings", with "no
  evidence ... that any of the buildings had been replaced in stone" [S1]. Fort 1: **three ditches** on
  its south-east side and **two** on its south-west (a possible third 55m out), a four-post interval
  tower on its north-east rampart; the inner ditch was V-shaped, 1.7m wide and 1.1m deep, but the outer
  ditch only 1.0m by 0.5m. Fort 2: at least three ditches on its south-east side with a "parrot's beak"
  gate arrangement [S1]. **No palisade, no stone wall and no rampart dimensions are evidenced**: the
  rampart was turf (inferred from the ditch fill) and its height is analogy [S1].
- **The vicus is real but thinly known.** Roadside activity north-east of Fort 2 where two roads
  converge; excavation (Trenches 4 and 5) found small timber buildings, a hearth, drainage and amphora
  pits, dated c. AD 70 to 135 [S1]. **How it was laid out is not established.** The survey plot shows
  scattered, uneven anomalies, not a gridded town. The commenter's "more shambolic" reading is a fair
  description of the plot and nothing in the evidence supports the tidy rows of the Ludlow drawing
  (below) [S1][S4].
- **The "survey the commenter means" is the Stratascan magnetometer survey, not anything in the linked PDF**
  [S1][S4]. It is most likely the 2003 plot from Cambria's Summer 2003 newsletter that llandeilo.org shows
  beside the Ludlow drawing, an earlier and partial view of the same survey that the Hughes report's Fig 2
  shows in full [S24]. I found no separate vicus-only survey. *Corrected 2026-10-09 (independent check).*
- **The "bathhouse" is probably not one.** The survey's rectangular building 30m by 18m with an apsidal
  room, north-west of the forts, produced brick the excavator calls "more likely to be post-medieval".
  A single possible box tile (hypocaust) in Trench 2 means a Roman bathhouse "somewhere in the vicinity
  ... cannot be excluded" [S1]. Heneb's project page still lists "a possible bathhouse" [S3].
- **Placement is better documented than the first pass said, but still needs the LiDAR.** Coflein gives
  one point for the complex (SN 62187 22534), and the Heneb HER gives one for each fort: **Fort 1 PRN 47636,
  SN 6218 2245; Fort 2 PRN 47637, SN 6217 2253**, plus the north-east road (PRN 47638, SN 6225 2260) [S2][S23].
  Fig 1, re-measured with the same two anchors, puts Fort 2's centre within about 5m of Coflein's point, so
  the figure and Coflein agree (see [Exact placement](#exact-placement)). Shape and orientation come from
  Figs 1 and 2; register on the LiDAR before building. *Corrected 2026-10-09 (independent check).*

## What a reconstruction can show

| Element | What to show | Tier | Sources |
|---|---|---|---|
| Two forts, Fort 2 on the northern part of Fort 1 | Both outlines in the same place, with Fort 1's ditches visible as a levelled or backfilled earlier outline under Fort 2 | documented | S1, S2 |
| Fort 1 size | 240m by 160m inside the inner ditches, 3.84-3.85ha, long axis along the ridge, north-east to south-west | documented | S1 |
| Fort 2 size | About 140m by 110m inside, 1.54ha | documented | S1, S2 (1.5ha) |
| Dates | Fort 1 "perhaps soon after AD 74, earlier not ruled out"; Fort 2 later, undated; vicus c. AD 70 to 135 | documented as ranges | S1, S2 |
| Order | Fort 1 first, Fort 2 second (a Fort 1 ditch lies under what the excavator reads as levelling for Fort 2, Trench 2; also the survey plot) | documented (excavator's reading, "seems likely") | S1 |
| Fort 1 defences | Multi-ditch circuit: 3 ditches south-east, 2 south-west; V-shaped ditches; turf rampart behind | documented (ditch counts, profiles); reconstructed (rampart height, breastwork) | S1; S16 |
| Fort 1 gates | Gateways in the south-east and south-west sides; a six-post timber tower at the south-west gate | documented (gateways; posts); reconstructed (tower height, form) | S1 |
| Fort 1 interval tower | A four-post tower on the north-east rampart near the eastern corner | documented (survey anomaly, "probably") | S1 |
| Fort 2 defences | At least three ditches on the south-east side; a "parrot's beak" at the right gate | documented | S1 |
| Fort 2 gates | Front (north-east), left (north-west), right (south-east) gates; **rear gate unproven** | documented (three); unknown (fourth) | S1 |
| Fort 2 internal roads | Via principalis, front part of via praetoria, intervallum road, a possible via quintana | documented (survey), reconstructed (the rest) | S1 |
| Fort 2 headquarters | Principia near the centre between via principalis and via quintana | reconstructed (predicted; a colonnade of square post-pits probably seen in Trench 2) | S1; S18 |
| Fort 2 parade or practice area | An empty zone behind the headquarters | reconstructed (weak magnetic response only; could be later disturbance) | S1 |
| Fort 1 interior | A barrack block (Phase 1 gullies, Trench 3); a kiln or large hearth in the south-east rampart; a rectangular building in the southern corner | documented (anomalies); reconstructed (function) | S1 |
| All buildings | Timber frames, wattle and daub walls | documented (daub with wattle impressions; no stone) | S1 |
| Roofs and cladding | Not evidenced locally; thatch, shingle or turf are unknowns. Harder-fired Roman tile of a distinct fabric was found in fort and vicus contexts (2001, 4001) and one possible box tile, so tile on some building is possible but unproven. *Corrected 2026-10-09 (independent check).* | imagined (roof material); documented (tile fragments) | S1; see [Gaps](#gaps-and-open-questions) |
| Vicus | Timber buildings alongside converging roads north-east of Fort 2, irregular rather than gridded | documented (roads, buildings, hearth); reconstructed (building form, plot layout) | S1; S10, S14 |
| Roadside ditches that "funnel" the approach | Two substantial ditches turning away at right angles about 220m out | documented | S1 |
| Practice camp enclosures | A ditched enclosure north-east of the forts and a second north-west, interiors nearly empty | reconstructed (excavator's "perhaps a practice camp") | S1 |
| Annex | A defended annex beside Fort 2, using retained Fort 1 ditches, with timber buildings | reconstructed (excavator's suggestion; Trench 3 phases) | S1 |
| Bathhouse | **Do not show as a fact.** If shown, label as "possible, location unknown" | contested | S1, S3 |
| Burials | Cremation pits in Fort 2's interior after the soldiers left | documented (cremated bone in three pits; "possibly"), reconstructed (reuse for burial) | S1 |
| People, dress, kit, voices | None evidenced at the forts | imagined (ⓘ); see [`roman-arrival.md`](roman-arrival.md) for the army | none |

## Fort 1, the larger and earlier fort

**Plan and size.** The magnetometer plot shows the multivallate defences of a large fort. Phase 1
(2003) found its eastern corner; phase 2 (2005) found its southern and western extent. "The internal
dimensions (ie the area lying within the inner ditches) are 240m x 160m (3.84 hectares)" [S1]. The
report later says "3.85 hectares" and compares it with Llanfor (3.6ha) and Caersws I (3.8ha) [S1]. Coflein
gives 3.7ha, an unreconciled difference of 0.1 to 0.15ha that is probably measuring convention
(inside the ditch or inside the rampart) [S2].

**Orientation.** "The orientation and internal layout of Fort 1 cannot be determined with any
certainty from the geophysical survey results alone. It seems probable that the front of the fort (the
praetentura) is located to the northeast" [S1]. It sits on "an elevated saddle with its ramparts running
along the crest of the flanking ridges" [S2]. Its long axis follows the ridge, about 48 degrees
east of north on my reading of Fig 1 (see placement) [S1].

**Defences.**

| Feature | Evidence | Source |
|---|---|---|
| Ditches, south-east side | three | S1 |
| Ditches, south-west side | two, plus "a third possible defensive ditch ... approximately 55m to the southwest" | S1 |
| Ditches, eastern corner | "at least three and possibly four ditches and associated ramparts" (phase 1 reading; the report says "eastern", not north-east) | S1 |
| Inner ditch (Trench 1) | V-shaped, up to 1.7m wide and 1.1m deep, square butt-end where the gate causeway was | S1 |
| Outer ditch (Trench 1) | V-shaped, up to 1.0m wide and 0.5m deep, rounded butt-end; "surprisingly shallow ... too slight to have provided an effective defence" unless cut from a higher level | S1 |
| Rampart | **Turf**: the thick clay fill of the inner ditch "presumably represents the deliberate backfilling of the ditch with the turf rampart when the fort was decommissioned". No rampart bank survives | S1 |
| Interval tower | a four-post structure "probably an interval tower" on the north-east inner rampart near the eastern corner | S1 |
| Kiln or large hearth | a thermoremnant anomaly dug into the rear of the inner rampart on the south-east side; further "industrial" responses behind the south-west rampart (not excavated) | S1 |
| Palisade, wall, stone | **not evidenced** | S1 |

**Gates.** "Gateways can be identified in both of these sides" (south-east and south-west) [S1].
Trench 1 cut the north side of the south-west gateway: four square post-pits "up to 1.2m square and
between 0.7 and 0.8m deep", with post-pipes suggesting timbers up to 0.4m across; "probably belong to a
large 6-post gateway tower with the remaining two pits lying outside of the excavated area" [S1]. The
amphora base in a shallow pit beside the entrance was suggested (Jeff Davies) to have served as a
urinal [S1]. **The north-east and north-west gates of Fort 1 were not identified** (Fort 2 overlies
much of that end), so Fort 1's gate count is **not established**: two are evidenced.

**Interior.** Only fragments. A group of anomalies in the eastern corner suggests "several substantial
buildings apparently of at least two phases", which either belong to Fort 1 or to a development
outside Fort 2; lines of pit-like anomalies in the southern corner suggest "a rectangular building or
buildings" (possibly post-holes). Trench 3 found gullies read as the foundations of rectangular timber
buildings in at least four phases; the earliest (Phase 1) "possibly a barrack block associated with
Fort 1" [S1]. The report's Fig 7 shows the four phases. Fort 1's internal plan (barracks, principia,
granaries) is **not known**; everything beyond this is analogy.

**Garrison.** Not known; every figure is inference from area. Coflein: Fort 1 "would have housed a garrison of
more than a thousand, drawn from several different units" [S2]. Hughes: "at the very least an ala quingenaria
... or a cohors milliaria ... and perhaps even a larger legionary detachment", and the barley in its ditch is
"consistent with" a cavalry or large unit [S1]. *Corrected 2026-10-09 (independent check).*

**Date.** See Summary. The 2005 pottery report is the evidence: "On present evidence, a Flavian
foundation is most likely. Certainly pre-Flavian forms are absent", and were the proportions of
decorated forms 29 to 37 "to be maintained in a much larger sample, a foundation date in the very early
Flavian period might seem possible" [S1]. The excavator adds that Fort 1 "more likely ... dates to an
early Flavian phase of campaigning (perhaps soon after AD 74) when such large forts were favoured"
(Davies 2000); "However, an earlier date for Fort 1 cannot be ruled out". On its end: "Possibly the
abandonment of the earlier fort was related to the demands of campaigning in northern Britain and
elsewhere in the period AD 78-83 ... Of course, whether or not this was the scenario at Llandeilo
remains speculative" [S1]. Coflein repeats the 78 to 83 idea only as what "the military context in
Britain **may** suggest" [S2]. The evidence is thin: "the size of the sample is very small, especially
from the area of Trench 1 (the gateway to Fort 1)" [S1].

## Fort 2, the smaller and later fort

**Plan and size.** "The alignment and internal arrangement of Fort 2 is much clearer ... overall
internal dimensions of c 140m x 110m (1.54 hectares)". Only its southern corner was fully covered, but
elements of all four sides were recorded [S1]. Coflein: "multivallate defences and an internal area of
1.5 hectares ... focussed on the summit of the northern ridge" [S2].

**Orientation and gates.** The front (praetentura) is north-east, "certainly the case with Fort 2". The
report names the gates:

| Gate | Where | Evidence |
|---|---|---|
| Porta praetoria (front) | north-east | "can be clearly identified" [S1] |
| Porta principalis sinistra (left) | north-west | "can be clearly identified" [S1] |
| Porta principalis dextra (right) | south-east | outer two ditches "joined at the entrance"; the "parrot's beak" [S1] |
| Porta decumana (rear) | south-west | **no break** in the outer defences; "a break is apparent in the inner ditch". "Possibly the outer ditches were crossed by a bridge" [S1] |

So **three gates are evidenced, the fourth is not**. The assumed rear-gate position corresponds to the
highest point of the fort and the front gate to a slightly lower knoll; "the remaining area ... is laid
out on more level ground along the top of a low ridge" [S1].

**Defences.** The south-east side has "at least three ditches", a slightly wider berm between the second
and third, especially north-east of the entrance; the north-east and north-west sides are less clearly
defined [S1]. The "parrot's beak" (outer ditches joined at a gate) was once linked with *legio II
Adiutrix*, but "the apparent presence of this feature at Llandeilo and elsewhere must now call this
association into question" [S1]. Construction was "timber and earth", as for Fort 1 [S1].

**Roads and interior.** "The via principalis and the front part of the via praetoria" are confident;
the intervallum road (via sagularis) is visible in part; a second transverse road "can just about be
identified (possibly the via quintana)" [S1]. The principia is predicted "near to the centre of the
fort between the via principalis and the via quintana". The one area with weak responses between that
and the rear gate "may have been used as a parade or practice area", or "may have been disturbed when
the nearby tree clump was established in the mid to late 18th century" [S1]. Numerous rectilinear
anomalies exist, some strong ones possibly structures of fired clay [S1].

Trench 2 (20m by 6m) found a possible internal road (two shallow parallel drainage gullies 4m apart,
stone-filled, implying a road surface up to 3.5m wide, since ploughed away) and two square post-pits
up to 0.7m wide in the south-east end, "possibly ... a colonnade fronting onto the Principia" [S1].
The rest of the trench held later, complex layers.

**Date and fate.** See Summary (including the HER's "possibly around 82 AD", an unproven 2013 reading [S23]).
Fort 2 was a "longer-lived" establishment (stronger magnetic readings)
"possibly dating to the 'garrison phase' of the Flavian conquest period"; the smaller size "suggests
that it held a smaller unit, perhaps a cohors quingenaria peditata (a small infantry unit)" [S1]. That
is an inference from area and the report names no unit.

**After the soldiers.** "Of particular interest was the evidence for the reuse of the interior of
Fort 2 by the inhabitants of the vicus after the departure of the soldiers"; three pits held cremated
bone, "suggesting a reuse of the area for burial" (the burnt bone had not yet been examined) [S1].
Later mortaria (Oxfordshire ware, c. AD 180-300) from fieldwalking suggest "some sort of activity
probably in the first half of the 3rd century" nearby; the 2005 excavation "is silent" on it [S1].
Coflein adds that "there is no direct evidence of the vicus at the fort lasting into the second half of
the second century" [S2]. Hughes also notes that "it has been suggested that southwest Wales was bereft of
troops by the mid-120s" (Davies 2000, 24), so the late end of Fort 2 is a bracket, not a date [S1]. *Corrected 2026-10-09 (independent check).*

## The vicus and the geophysical survey

### Which survey, by whom

- **Stratascan** (a geophysics contractor) carried out the magnetometer survey **in two stages**:
  February to March 2003 (phase 1, after a magnetic susceptibility reconnaissance of the whole survey
  block, about 27 hectares south of Home Farm) and May to July 2005 (phase 2, extending to the whole of
  Fort 1 and clarifying the vicus and "possible bathhouse"). In all, 19.78 hectares were surveyed by
  magnetometry, readings every 0.25m along transects 1m apart with dual FM256 fluxgate gradiometers,
  processed in Geoplot 3 [S1].
- Cited as **Stratascan 2003** and **Heard 2005** (H. Heard, "Dinefwr Roman Fort II, Llandeilo,
  Carmarthenshire", unpublished report) [S1]. I did not find either online; their interpretation
  figures (e.g. "Stratascan 2003, Figure 18", the detailed interpretation of Fort 2) are **not
  available** to me, only the grey-scale plot (Fig 2) and the report's narrative [S1].
- **It was commissioned by the National Trust** (through Cambria Archaeology) as part of the
  Dinefwr Park landscape restoration, funded by the Heritage Lottery Fund and the Wales European
  Funding Office [S1][S3]. It was found "in an area that had previously surrended Roman material during
  fieldwalking and metal detecting", with Heather James's 1993 predicted fort position "extraordinarily
  accurate" [S1][S2].
- The excavation that tested it was Cambria Archaeology's three weeks in June and July 2005 (report
  by Gwilym Hughes; Nikki Cook assistant site director), part of it broadcast in Channel 4's *Big Roman
  Dig* on 2 and 3 July 2005, plus small fieldwork in July 2006 and March 2007 [S1].

### What the survey shows of the vicus

- "The activity either side of the Roads to the northeast of Fort 2, especially in the area where they
  converge near the northeastern entrance of the fort, is suggestive of a small settlement or vicus"
  [S1]. "Small" is the report's word.
- **Roads.** A road runs north-east from Fort 2's front gate and "appears to branch into two
  approximately 60m from the entrance", or shows two phases. The northern branch meets the gate at
  right angles and fades after about 60m further; the southern branch approaches at a slight angle and
  is flanked by two substantial roadside ditches that "turn away from each other at right angles
  approximately 220m from the fort entrance, creating a funnel-like entrance" [S1]. Trench 7 tested one
  such ditch: it was far bigger than a roadside drain. Of two smaller ditches beside it, one (7007) held
  post-medieval pottery and "suggests that this is not Roman in date"; the other (7008) held the base of a red
  ware vessel "possibly a flagon" and a Dressel 20 amphora sherd [S1]. *Corrected 2026-10-09 (independent check).*
- A road leaves Fort 2's south-east gate across the former north-eastern part of Fort 1, with "evidence
  for roadside development" probably tied to the later fort [S1]. There are "just hints of roadside
  ditches" beyond the north-west gate, and the road "ultimately extends ... [to] link up with the
  observed sections of the Roman road heading westwards towards Carmarthen" [S1].
- To the south-east of the vicus activity, "a substantial linear feature apparently defining two sides
  of a small enclosure"; to the east of Fort 1, "substantial pit-like and linear anomalies, of
  uncertain origin", partly obscured by a modern service trench [S1].

### What excavation found (Trenches 4 and 5, 2005)

- A V-shaped ditch up to 2.7m wide and 1.1m deep, recut (1.5m by 0.6m), read as the side of a
  rectilinear enclosure with an almost empty interior, "perhaps a practice camp immediately outside the
  fort" [S1].
- To the north-west of it, "a complex of linear features ... that probably relate to small timber
  buildings associated with the fort vicus": narrow gullies (up to 0.2m wide), small pits (one packed
  with large amphora sherds), a second V-shaped ditch (1.2m by 0.6m) that may drain the south side of a
  road into Fort 2, and "a shallow bowl-shaped hollow ... filled with red-brown, burnt clay and
  charcoal" with "the appearance of a domestic hearth" [S1].
- **Date**: "a general date range for this activity from c AD 70 to AD 135", from South Gaulish samian
  c. AD 70-90 in the ditch, c. AD 70-110 in the second ditch, and Central Gaulish pieces of c. AD 100-120
  and c. AD 115-135 in a gully and the ploughsoil; one BB1 flanged bowl of the 2nd century [S1].
  Nothing here fixes a start; I infer that the c. AD 70 end could be Fort 1 era, but the report does not
  say so [S1].
- Trench 4/5 is the largest dated pottery group on the site [S1].

### Is it "shambolic"?

The commenter reads the survey as "more shambolic" than Neil Ludlow's drawing. **What the evidence
supports:**

- The plot shows roads converging, activity "either side", irregular pit-like and linear anomalies and
  one enclosure, **not** a regular street grid or terraced plots [S1].
- Excavation found "small timber buildings" with narrow foundations and a hearth, drains, pits and
  amphorae: consistent with ordinary, irregular roadside building [S1].
- Welsh comparanda point the same way: at Cefn Caer, Pennal (as S14 reports it, beside the Llanio survey),
  ribbon development along a road, with "several phases of rectangular wooden buildings arranged with their
  short axes towards the road", each with a hearth [S14]. *Corrected 2026-10-09 (independent check).* in the Welsh and Cumbrian surveys that report cites, "most of the sites produced
  evidence for the presence of vici in the form of ribbon development along at least one of the roads
  leading from the fort" [S14]. Caersws is the exception: "a developed series of streets, timber buildings" and a
  possible temple precinct [S10].
- **But**: the Dinefwr vicus was only sampled (two small trenches), the plot may under-represent
  complexity (the report's own wording, tied to Trench 7, where one of the two ditches then proved
  post-medieval, so weak support) [S1], and the **individual buildings, their shapes, the number of plots and their
  orientation are not known**. "Shambolic" is a reasonable reading of an under-resolved plot, **not a
  finding**. Show the vicus as irregular, ribbon-like and uncertain; the tidy, aligned rows of the
  Ludlow drawing are an **artist's reconstruction** (below) and are at best one possibility.

### Is anything else outside the forts?

- A Roman building "identified as a temple" is recorded in the churchyard of St Tyfei's, Llandyfeisant
  (NPRN 114230), below the ridge, about 310m south of the Coflein point [S2]; the earlier note
  ([`era-iron-age.md`](era-iron-age.md)) records it as speculative and unsubstantiated, and the report
  mentions only an antiquarian "possible Roman structure" there (PRN 7367) [S1]. Coflein 114230 (SN 62192
  22216) adds foundations noted about 1770 and an altar "recorded, but now lost" with "a cornucopia & augural
  staff"; HER PRN 7367 adds "reported finds of tesserae during work in the churchyard ... in the latter part
  of the 20th century" and calls it "either a villa or a temple" [S2][S23]. *Corrected 2026-10-09 (independent check).*
- A coin hoard found c. 1800 about 150m south-west of the complex. Coflein's heading calls it "later
  Roman", yet the account it quotes (Fenton, c. 1800) describes silver denarii, "some of Domitian (AD
  81-96)", in a pot [S7]; the report lists two hoards, a possible mid to late 3rd century one (PRN 886)
  and a possible late 1st century one (PRN 869) [S1]. **Resolved by the HER:** PRN 869 is the hoard of
  silver denarii, "some of Domitian (AD81-96)", in a pot, found in 1800 "300 yards west of Llandyfeisant
  church" (the same find as Coflein 419158); PRN 886 is a separate find of six bronze coins of Gallienus to
  Claudius Gothicus (mid to late 3rd century). Coflein's "later Roman" heading for 419158 is the error [S23].
  *Corrected 2026-10-09 (independent check).*
- Seven silver denarii (three Republican, one Augustan, three of AD 69-96) were found by a metal
  detectorist near Home Farm in 2000 [S1]. HER PRN 47648 records **four** denarii (one of Augustus, three of
  the 1st century AD including one and possibly two of Vespasian) with four findspots (SN618225, SN620226,
  SN621224, SN623227); the counts disagree and both stay [S23]. *Corrected 2026-10-09 (independent check).*
- Dyfed Archaeological Trust found "strong evidence for a substantial Roman building" near the North
  Heronry Dam, 2008 (a **possible villa**, NPRN 422436, SN 60880 22740), exact place unknown [S9]. It is
  c. 1.3km west of the forts and is not part of the vicus.

## The Neil Ludlow drawing

The commenter's PDF is Heneb's "Tywi Time Line" (eight A3 pages, created 2011) [S4]. Its Roman section
reads, in full (*Corrected 2026-10-09 (independent check)*: the note quoted three sentences; there is a
fourth, below): "It is generally accepted that the Roman conquest of west Wales occurred as part of the
Flavian campaigns of AD74 and 75. The military presence was virtually withdrawn around AD120 (Davies,
2000). Roads were constructed to enable the rapid deployment of military troops and supplies between
established forts and two large forts, one partly overlying the other, were built at Dinefwr Park." The fourth: "Roman finds have
been discovered throughout the Tywi valley but, with the possible exception of Llys Brychan near Bethlehem,
no extensive Roman villas have been unearthed" (Llys Brychan is inside the ten-mile circle and is not in any
other research note) [S4]. The only other thing on that page is the caption **"Reconstruction of Llandeilo Roman Fort by Neil
Ludlow"** (no date, no medium, no licence, no source plan) [S4].

**What the PDF does not contain**: no "AD 90-100", no geophysical survey, no vicus text. The "useful
geophysical survey" the commenter mentions is not in the file (I read all text and extracted every
image from all eight pages: a Neolithic tomb, a barrow, Garn Goch, the Ludlow drawing, the castle and
other photographs).

**What the drawing shows** (I viewed it at the 400 by 468 pixel resolution in the PDF; reference copy in
`refs/roman-forts/`):

- A rectangular fort with rounded corners and **four timber gates, each with a tower**, plus corner and
  interval towers, behind **several concentric ditches** drawn as even terraces.
- Inside: **long, pitched-roof barrack blocks** in close ranks, with larger buildings among them, under
  dark-grey roofs whose material cannot be identified at this size.
- At the lower left, a **second ditched enclosure used as an annex**, containing long sheds and open
  yards, and at the upper left a **fainter earlier rectangle** of ditches in the landscape.
- To the right, **roads converging** and a **ribbon of small timber buildings and yards** along them,
  fairly regularly aligned (the vicus), with a small enclosure beside the road.
- The drawing's compass orientation is not stated, so I did not try to match it to Fig 1.

**Compare against the evidence**:

| Drawing | Evidence | Verdict |
|---|---|---|
| Four towered gates on the later fort | three of four entrances evidenced; the rear unproven; towers only inferred (a six-post tower at Fort 1) | artistic completion, not evidence |
| Even multi-ditch rings | ditch counts vary by side: 2 to 3 evidenced (Fort 1), at least 3 (Fort 2, south-east side only) | simplified |
| Barracks in neat ranks | no barracks ground plan recovered at Fort 2; Fort 1 Phase 1 gullies in one trench | analogy |
| Retained annex with buildings | the excavator's suggestion, supported by Trench 3 phases | plausible, not proven |
| Tidy vicus rows | irregular plot; two small trenches | **optimistic** (see above) |

It is a **reference, not a source**. The Time Line gives it no date. **llandeilo.org captions the same
picture** "Painting by Neil Ludlow of what the second fort may have looked like around 100AD (Drawing: Cambria
Archaeology)", beside the 2003 geophysics plot [S24]. So it is the second fort, and "around AD 90-100" is the
caption's date for the scene, not a foundation date and not a finding. (*Corrected 2026-10-09 (independent
check)*: the first pass said it could not find the drawing credited anywhere else, nor which phase it shows.)
The Time Line itself says nothing of the sort. Dewi has said to ignore licence problems and credit the
person, so it may be used as a visual reference with the credit "Neil Ludlow, for Cambria Archaeology, in
Heneb's Tywi Time Line (2011)". That does not make it evidence.

## Typical comparanda (analogy, not local evidence)

These are for filling gaps and for labelling reconstruction, not for stating what stood at Dinefwr.

| Fort | What it shows | Source |
|---|---|---|
| **Caersws** (Powys), 3.2ha, 188m by 177m, "very early Flavian (c. AD 70)" then Trajanic and Hadrianic phases | A comparably early large Flavian fort; later annex and a large vicus with streets, timber buildings and a possible temple; the bathhouse lay outside to the south. Hughes compared Fort 1 (3.85ha) with "Caersws I at 3.8 hectares"; Coflein now gives 3.2ha, a size difference to note | S10, S1 |
| **Castell Collen** (Llandrindod Wells), c. 182m by 114m, later cut to about 128m by 114m | Occupied from the 70s; "stone revetted and ditched banks" (as rebuilt); an extramural bathhouse | S11 |
| **Caerau (between Llandovery and Castell Collen; the first pass wrongly added "Treflys", which S12 does not say)**, c. 170m by 115m, from c. 75 | An auxiliary fort with rounded corners; a **courtyard building in the north-east corner** (the front); extramural settlement on the north-west; a possible practice work, marching camps nearby | S12 |
| **Carmarthen** (Moridunum), occupied from about AD 75 to at least 100 | A **second-phase fort reduced in size** from the first, as at Dinefwr and (per the earlier note) Pumsaint | S13 |
| **Trawscoed** (Ceredigion), 165m by 125m (2.1ha; the size and the rampart come from S15 only, S14's 160m by 120m is its survey area) | Geophysics: **six blocks of barracks** in the northern quadrant, a veranda possible (a row of post-holes), "post holes of timbers supporting guard towers" beside the gate, a possible mansio near the gate. Wikipedia (a lead) adds a "clay-and-turf" rampart about 4.1m wide with a clay-and-turf revetment | S14, S15 |
| **Jay Lane, Herefordshire** (an earth fort, pre-Flavian, not Wales), c. 2ha | Excavated **gatehouses (three or four) on two rows of five posts, with a tower about 2.9m (9.5ft) square at each end**, a **corner tower assumed to be six-post** (four posts found) about 4.6m by 2.4m, **four-post interval towers** about 2.4 to 3m square, a **double V-shaped ditch** 2m wide and 1m deep with a 1.5m berm, the rampart "no more than 10ft (3m)" to the walk and "about 15.5ft" with breastwork (those are **estimates**, no rampart bank survives) | S16 |
| **Jay Lane: what its page does not say** (checked 2026-10-10, second-Opus review of the Blender models) | It gives post layouts, plan sizes and "the posts were of the same scantling (cross-section)" for the interval towers, with no post size. It says **nothing about platforms, stages, boarding, roofs or an open frame**. For the gatehouses its excavator writes that "a tower 9.5ft square overall would have provided a guard-room at ground level": an assumption about the ground storey, and the opposite of an open frame below. The first Blender build credited S16 with a boarded stage and an open lower frame; both are now Claude's guess (`tower-boarding`, imagined), and the ground storey is drawn walled in to follow the one reading we have. | S16 |
| **Jay Lane: its turf, and its contradiction** (checked 2026-10-10, second-Opus re-review) | The page contradicts itself. Summary: "Excavations revealed earth ramparts revetted with turf". Excavation section: "No trace of a rampart bank was found, nor were there any postholes for a timber-framed rampart or palisade", and the rampart "must have been provided with a turf revetment", a suggestion backed by the ditch fill. We treat the revetment as a suggestion and do not pick between the two; the turf-courses kit says so. The corner tower is "assumed" to have had six posts (four found). Dinefwr's own turf rampart is a separate inference from Fort 1's ditch fill [S1]. Read directly; the text above is quoted from the page. | S16; S1 |

**General fort plan.** A typical auxiliary fort had a central headquarters (principia) facing the front
gate, the commander's house (praetorium) beside it, granaries (horrea) and workshops (fabrica) near
it, and the rest filled with barracks, stables and stores in the front (praetentura) and rear
(retentura); gates at the four sides, the front called the porta praetoria; roads called the via
principalis (across, between the side gates), via praetoria (from the front gate) and via sagularis
around the inside of the rampart [S18]. **S18 gives barracks "measuring 30-100 x 7-15m, and divided into contubernia", but that paragraph is about
legionary fortresses (the page now redirects to "Castra"); "eight-man" is not in it.** For an auxiliary fort
prefer Trawscoed's six barrack blocks and possible veranda [S14]. *Corrected 2026-10-09 (independent check).* A
*cohors quingenaria* had 6 centuries of 80 men (480), an *ala quingenaria* 16 turmae of 30 or 32 (480
or 512), a *cohors milliaria* 10 centuries of 80 (800), all "establishment" figures from the second
century (the real strengths were "somewhat less") [S19]. **Applying these to Dinefwr is
reconstruction**: if Fort 2 held a small infantry unit, as the report suggests, the expected barrack
count would be about six, but no barrack at Dinefwr has been recovered and the report names no unit
[S1][S19]. Wikipedia pages are leads: the second-source check for barrack size is Trawscoed (S14),
and I did not find a Welsh excavation report open online with barrack plans.

**Construction.** Flavian forts in Wales were built of earth and turf with a ditched perimeter and
timber gates, towers and breastworks, with timber barracks, granaries and headquarters [S10][S11][S16].
Stone replacement happens at some sites in the early 2nd century (for example Castell Collen's
rebuilt stone-revetted defences); **at Dinefwr nothing was replaced in stone** [S1][S11]. A reconstruction
that shows stone at Dinefwr (walls, stone principia or granaries) has no local evidence.

## Exact placement

CLAUDE.md rule: **place sites from Coflein or Cadw grid references, never approximate lat/lon.** The
sources give very few usable references for this site, so this section is honest about what is
documented and what is derived.

### Documented references

| Item | Reference | Source | Note |
|---|---|---|---|
| Roman Fort Complex, Dynevor Park | **SN 62187 22534** = E 262187, N 222534 | Coflein NPRN 402271 [S2] | A single point for the whole complex, 6-figure plus; centre convention not stated |
| Same complex, report's own | SN620 225 | Hughes report, introduction text "(Fig. 1, SN620 225)" [S1] | 6-figure, +/- 100m; not a point of the forts. Corrected 2026-10-09 (independent check): it is in the text, not a figure caption |
| **Fort 1** (PRN 47636) | **SN 6218 2245** = E 262180, N 222450 | Heneb HER (Archwilio) [S23] | The first documented reference for either fort. A 2013 summary "based on Hughes"; the HER's centre convention is not stated. *Corrected 2026-10-09 (independent check).* |
| **Fort 2** (PRN 47637) | **SN 6217 2253** = E 262170, N 222530 | Heneb HER (Archwilio) [S23] | Within about 20m of Coflein's point. *Corrected 2026-10-09 (independent check).* |
| Road leaving the front gate, north-east (PRN 47638) | SN 6225 2260 | Heneb HER (Archwilio) [S23] | *Corrected 2026-10-09 (independent check).* |
| Same complex, Cadw | SN622224 | Wikipedia list of Cadw scheduled monuments, CM367 [S6] | Secondary source for Cadw's entry; the Cadw record itself was not retrieved. CM367 is also named in a Coflein archive record [S5] |
| 2005 excavation (a trench, "with dig tents") | SN 6217 2256 | RCAHMW aerial photograph AP_2005_1285 caption [S21] | Probably Trench 2 (inside Fort 2); the caption does not say which |
| Roman coin findspot | SN 61948 22295 | Coflein NPRN 419158 [S7] | "Some 150m south-west of the Roman Fort Complex" |
| St Tyfei's Church (Llandyfeisant) | SN 6218 2222 (Coflein text) | per earlier note [S2][S7] | Possible Roman building, thin evidence |
| North Heronry Dam, possible villa | SN 60880 22740 | Coflein NPRN 422436 [S9] | Exact building location "could not be pinpointed" |
| Newton House (a fixed point for georeferencing) | SN 61432 22531 | Coflein NPRN 17603 [S20] | not Roman |
| Dinefwr Castle (the other anchor) | SN 61150 21731 | [`building-models.md`](building-models.md) S21 | not Roman |

**The HER gives one reference for each fort and for the north-east road (above); no source read gives
one for the gates, the vicus or the bathhouse.** Coflein has one record for the complex. *Corrected 2026-10-09 (independent check).* (The first
pass said no source gave separate references, and that Archwilio was unreachable; its record pages answer at
`archwilio.org.uk/arch/query/page.php?watprn=DAT<PRN>&dbname=dat&tbname=core`, though the site rate-limits
after about a dozen calls. The community-site numbers 47636 and 47637 that the first pass told the builder
not to use are the correct ones.)

### Derived geometry (from the report's figures; not documented grid references)

I georeferenced the report's Fig 1 (the location map, OS-based, 500m scale bar, north up) to the two
fixed points above, by pixel measurement. The scale checks out: the castle-to-Newton House distance
read off the figure was 284m east and 799m north against 282m and 800m by grid reference (re-measured by the
independent check; the first pass read 261m and 786m against 277m and 802m, which was wrong on both sides, and
its fort centres were about 45m too far east and 50m too far north). The figure agrees with the map and with
its own scale bar to within about 2m. **Treat the derived positions as approximate to plus or minus 30m in
absolute terms** (the outlines are drawn loosely and the anchor points were picked by eye), and **plus or
minus 10m relative to one another** (same figure). *Corrected 2026-10-09 (independent check).*

| Item | Derived | How |
|---|---|---|
| Fort 1 centre | about **E 262206, N 222470** (HER: E 262180, N 222450) | Fig 1 dashed outline, re-measured 2026-10-09. *Corrected 2026-10-09 (independent check).* |
| Fort 2 centre | about **E 262190, N 222538** (HER: E 262170, N 222530; Coflein: E 262187, N 222534) | Fig 1 solid outline, re-measured 2026-10-09. *Corrected 2026-10-09 (independent check).* |
| Offset, Fort 2 centre from Fort 1 centre | about **16m west, 69m north** (HER: 10m west, 80m north) | same figure, relative |
| Long axis, both forts | about **48 to 53 degrees** east of north (north-east to south-west) | outline sides |
| Fort 1, drawn outline | about 250m by 168m | only about 10m larger than the 240m by 160m inside, so the line is the **inner circuit**, not the outer ditches, which lie outside it. *Corrected 2026-10-09 (independent check).* |
| Fort 2, drawn outline | about 150m (north-east to south-west) by 130m | likewise about 10m outside the internal size (140m by 110m), loose and not a clean rectangle. *Corrected 2026-10-09 (independent check).* |
| Vicus (dotted area) | about 109m east, 84m north of Fort 2's centre, spread north-east of its front gate | Fig 1 hatched area |
| Fig 1 against Coflein's point | Fig 1 puts Fort 2's centre **within about 5m** of SN 62187 22534; the HER, Coflein, the 2005 trench photograph (SN 6217 2256, about 20m west and 20m north of Fort 2's centre, where Trench 2 lies on Fig 2) and Fig 1 agree to within about 30m | derived centres compared. Cadw's six-figure SN622224 is a 100m square and cannot discriminate. *Corrected 2026-10-09 (independent check).* |

**What this means for the build.**

- *Corrected 2026-10-09 (independent check).* The first pass said the Coflein point, the Cadw reference and
  the trench reference sat 40 to 60m west of the derived centres and that the figures put the forts about
  50m east of Coflein's point. That was a measurement error; there is no conflict. **Place from the HER and
  Coflein references, take shape and orientation from Figs 1 and 2, then register on the LiDAR**, using the
  report's Fig 2 plot as the overlay. The forts were found
  by geophysics rather than as visible earthworks, so how much of them shows on the LiDAR is unknown.
- **The orientation and the relative offset are the useful findings**: both forts' long axes run
  north-east to south-west along the ridge, and Fort 2 lies on the northern part of Fort 1 (centres about
  70m apart), with Fort 1 extending south-west beyond it. The existing placeholder features
  (`roman-fort-a` at Coflein's point, `roman-fort-b` at about 28m east and 29m south of it, both at
  angle 0.12) disagree with this on the relative offset (Fort 2 should be **north** of Fort 1's centre,
  not south-east) and on the orientation (about 0.12 radians is 7 degrees; the figure reads about 50
  degrees). That is a **correction for the builder** to confirm, not a finished result. *Corrected
  2026-10-09 (independent check):* in `romanFort` (`src/world/structures.ts`) a positive angle turns the long
  axis **west** of north, so the real gap is about 55 to 60 degrees, not 43; and Coflein's point is Fort 2's
  centre, so `roman-fort-a` (the larger fort) sits on the smaller fort's centre.
- The report's Fig 2 magnetometer plot is reproduced in `refs/roman-forts/` as the overlay, at the
  same scale as Fig 1 (the 200m scale bar is on the figure); the Stratascan interpretation figure is not
  available.
- **The terrain agrees with the plan** per the report: Fort 2's rear gate sits at "the highest point of
  the fort" and its front gate on a lower knoll; "excellent sight lines to the west down the Twyi
  valley towards Carmarthen and to the northeast up the Twyi valley towards Llandovery"; the view to the
  south-west "is dominated by the hill on which the later medieval castle stands" and the south-east
  view is restricted by Penlan Fawr [S1]. The LiDAR should show the saddle and the two knolls; use those
  to register.

## Provenance table (per element)

| Element | Tier | Basis | Sources |
|---|---|---|---|
| Two forts exist, Fort 2 partly over Fort 1 | documented | survey plus a sealed Fort 1 ditch in Trench 2 | S1, S2, S3 |
| Fort 1 outline, 240m by 160m inside | documented | magnetometry: the eastern corner, then the southern and western extents; its north-western end is overlain by Fort 2 and not described separately | S1 |
| Fort 1 date, soon after 74 | documented (as a range, hedged) | pottery; no scientific date | S1, S2 |
| Fort 1 abandonment at 78-83 | **speculative**, not documented | "may suggest" and "remains speculative" | S1, S2 |
| Fort 2 outline, 140m by 110m inside | documented | magnetometry of all four sides | S1, S2 |
| Fort 2 start date | **unknown** | "no direct evidence"; AD 90-100 unsupported (probably the caption date of the Ludlow scene); the HER's "possibly around 82 AD" is an unproven 2013 summary. *Corrected 2026-10-09 (independent check).* | S1, S2, S23, S24 |
| Fort 2 end, by AD 140 | documented (as a bracket) | samian predominance, little BB1 | S1 |
| Turf rampart | reconstructed | inferred from ditch fill; no bank survives | S1 |
| Rampart height, breastwork, wall-walk | imagined/reconstructed | analogy (Jay Lane estimates) | S16 |
| Ditch counts and profiles | documented | magnetometry plus Trenches 1 and 2 (and Test Area 6); Trenches 9 and 10 cut the north-west enclosure, not a fort. *Corrected 2026-10-09 (independent check).* | S1 |
| Fort 1 gates: two evidenced | documented | survey | S1 |
| Fort 1 six-post gate tower | documented (posts) / reconstructed (form) | four post-pits, 1.2m square | S1; S16 |
| Fort 1 interval tower | documented ("probably") | four-post anomaly | S1 |
| Fort 2 gates: three evidenced, rear not | documented / unknown | survey | S1 |
| Gate tower height and shape | imagined/reconstructed | analogy; S16 gives post layouts and sizes only, not a stage, boarding or any height (corrected 2026-10-10) | S16 |
| Timber and daub buildings, no stone | documented | excavation; daub with wattle impressions | S1 |
| Fort 2 principia location | reconstructed | predicted by the excavator; weak local support | S1 |
| Barracks (number, size, layout) | reconstructed | analogy; one Fort 1 barrack-like foundation | S1, S14, S18 |
| Granaries, workshop, praetorium, stables | reconstructed | typical plan; no local evidence | S18 |
| Roads inside Fort 2 | documented / reconstructed | survey, one gully pair | S1 |
| Roof, door, window, shutter, hinge details | imagined | none local | none |
| Vicus extent and roads | documented (roads, activity) | survey and trenches | S1 |
| Vicus building form and plan | reconstructed / imagined | analogy (Cefn Caer, Pennal ribbon development) | S14 |
| Annex using Fort 1 ditches | reconstructed | excavator's suggestion | S1 |
| Practice camp enclosures | reconstructed | "perhaps"; near-empty interiors | S1 |
| Bathhouse | **contested** | survey anomaly vs post-medieval brick; one possible box tile | S1, S3 |
| Garrison unit | unknown | size-based guesses only: Coflein's "more than a thousand, drawn from several different units" and Hughes's "at the very least an ala quingenaria ... or a cohors milliaria" for Fort 1; a cohors quingenaria peditata for Fort 2. *Corrected 2026-10-09 (independent check).* | S1, S2 |

## Contradictions, kept contested

| Point | Reading A | Reading B | Status |
|---|---|---|---|
| Fort 1 area | 3.84 to 3.85ha (Hughes) | 3.7ha (Coflein); "3.9ha" (a community page repeating the 2003 newsletter, not fetched); about 8 acres or 3.2ha (Rees via Wikipedia); 12 acres (roman-britain.co.uk speculation, see the earlier note) | The primary report governs; others are older or secondary |
| Fort 2 area | 1.54ha (Hughes) | 1.5ha (Coflein); 3.5 acres or 1.4ha (Rees via Wikipedia) | Agree within rounding |
| Fort 1 start | perhaps soon after 74, earlier not excluded (Hughes) | "AD 70s, earlier cannot be ruled out" (Coflein); "about 74" (community page); Veranius AD 57/58 (roman-britain.co.uk, speculative) | Hughes; the early end stays open |
| Fort 1 end | 78 to 83 (Coflein, "may suggest"; Hughes "speculative") | not given | Contested |
| Fort 2 start | not dated (Hughes, Coflein); "possibly around 82 AD" (HER PRN 47637, a 2013 summary "based on Hughes") | "around AD 90-100" (commenter; llandeilo.org's caption for the Ludlow scene) | AD 90-100 unsupported as a foundation date; the HER reading unproven. *Corrected 2026-10-09 (independent check).* |
| Coin hoards | PRN 869: silver denarii "some of Domitian", found 1800 west of Llandyfeisant church (late 1st century) | PRN 886: six bronze coins, mid to late 3rd century; Coflein's "later Roman" heading for 419158 | Resolved: Coflein's heading is the error. *Corrected 2026-10-09 (independent check).* |
| 2000 metal-detector denarii | seven (Hughes) | four (HER PRN 47648, with findspots) | Both kept. *Corrected 2026-10-09 (independent check).* |
| Fort 2 end | "by AD 140"; reduced in the later Trajanic period (Hughes) | "early part of the second century" (Coflein) | Both, as a range |
| Survey method | magnetometer (Hughes) | "ground radar" (Wikipedia; also in search snippets of a community page) | Hughes |
| "Bathhouse" | possible building 30m by 18m with an apse (the survey) | post-medieval brick, a kiln (excavation, Trench 6) | Contested; do not draw as fact |
| Fort 1 front orientation | "probably north-east" | no other | Single-source, hedged |
| Annex position | the excavator suggests part of Fort 1's northern and eastern defences continued as an annex to Fort 2 | the Ludlow drawing shows an annex on one side of the fort; its compass orientation is not stated, so no comparison was made | Check against the plot before building |

## Images (reference copies, outside the built app)

Stored in [`refs/roman-forts/`](refs/roman-forts/); `docs/` is not served by the app. Dewi's instruction:
ignore licence problems, credit the person. Credits:

| File | What | Credit |
|---|---|---|
| `ludlow-reconstruction-tywi-timeline.png` | Aerial reconstruction of the later fort, annex, roads and vicus, 400 by 468 px, as embedded in the PDF | Neil Ludlow, "Reconstruction of Llandeilo Roman Fort" (llandeilo.org: "Drawing: Cambria Archaeology" [S24]), in Heneb (Dyfed Archaeological Trust), *Tywi Time Line*, 2011 [S4]. Heneb states its NLHF-funded digital outputs are CC BY 4.0, but whether that covers this PDF or drawing is **not confirmed** [S3] |
| `hughes-2007-fig1-location.jpg` | Location map with the outlines of Fort 1 and Fort 2 and the vicus area, 500m scale | Gwilym Hughes, Cambria Archaeology (Dyfed Archaeological Trust) for the National Trust, 2007, Fig 1; illustrations by Hubert Wilson; contains Ordnance Survey data, Crown copyright 2004 [S1] |
| `hughes-2007-fig2-geophysics-and-trenches.jpg` | Magnetometer plot with trench positions, 200m scale | Geophysics by Stratascan; Hughes 2007, Fig 2 [S1] |
| `hughes-2007-fig7-trench3-phasing.jpg` | Trench 3 plan and four suggested phases | Hughes 2007, Fig 7; illustration by Hubert Wilson [S1] |

Not downloaded: the RCAHMW aerial photographs of the 2005 dig (Toby Driver, Crown copyright RCAHMW 2005,
Creative Archive Licence, non-commercial) [S21], which show the tents rather than the buried plan.

## Gaps and open questions

1. **The second fort's date.** Nothing read supports "AD 90-100" as a foundation date (it is probably
   llandeilo.org's caption date for the Ludlow scene [S24]); the HER's "possibly around 82 AD" is an unproven
   2013 summary [S23]. The next step is the primary
   excavation reports: Hughes, *Carmarthenshire Antiquary* 39 (2003) 144-7 and 41 (2005) 168-74, and
   the Stratascan reports (2003; Heard 2005) [S1][S2]. Not found online. A fuller pottery report may
   narrow it.
2. **Archwilio (the regional HER, Heneb).** *Corrected 2026-10-09 (independent check):* it is reachable
   (URL under [Exact placement](#exact-placement)), and the community numbers are right: PRN 47636 is Fort 1,
   47637 Fort 2, 47638 the north-east road, 47646-47650 the finds [S23]. It rate-limits after about a dozen
   calls, so PRNs 972, 94533-94535 and the 2005 excavation event record (PRN 54934) were not read.
3. **Britannia ("Roman Britain in 2005", *Britannia* 37, 2006).** Searched; the Dinefwr entry was not
   found and the Cambridge pages are paywalled. Burnham and Davies (*Britannia* 52, 2021, on Pen y Gaer's
   vici) was read as an abstract only [S22]. The Dinefwr entry may add dates.
4. **The Cadw scheduling entry (CM367)** itself and its scheduled area: the entry was not retrieved,
   only its reference [S5][S6]. The scheduled boundary would help placement.
5. **The Stratascan interpretation plots** (Stratascan 2003 Fig 18, Heard 2005). Not online. They
   would give Fort 2's building anomalies and the vicus anomalies at a usable scale. **Ask Heneb or
   the National Trust** for them.
6. **Local community page.** *Corrected 2026-10-09 (independent check):* `llandeilo.org` ("Llandeilo's Roman
   Fort", quoting Cambria's 2003 newsletter) is live at `roman_settlement.html` (the `.php` address is the
   dead one). It gives 3.9ha, "about AD 74", vicus activity "from 75 AD to 120 AD" (unsourced; the report
   governs), the Ludlow caption and the 2003 plot [S24]. It also overstates one find ("a complete funeral
   urn"; the report says the vessel held no substantial cremated bone).
7. **Nothing on roofs and fittings.** No local evidence for roof material, windows, doors or shutters.
   Only daub with wattle (burnt) and brick or tile fragments. *Corrected 2026-10-09 (independent check):*
   Trench 6's brick is probably post-medieval kiln waste, but the fort and vicus contexts (2001, 4001)
   produced harder-fired Roman tile of a distinct fabric, type not identified, plus a possible box tile in
   Trench 2 ploughsoil (a hypocaust building nearby cannot be excluded). Roof material is still unknown, but
   tile was present. A garbled small-finds line suggests some Trench 2 stone may have been used for roofing,
   which "cannot be inferred from the recovered fragment": a lead, not evidence.
8. **The orientation and offset need checking on LiDAR** (see placement). The existing placeholder
   fort placements (offset and angle) disagree with the figures, by about 55 to 60 degrees of angle.
9. **For Dewi:** how detailed should *unsourced* interiors be? Everything inside Fort 1, and Fort 2
   beyond its roads and predicted principia, is analogy. A detailed reconstruction must therefore mark
   almost every building as reconstructed or imagined (ⓘ). That fits the project's law, but it is a
   visible choice about the look.
10. **The commenter's claims, checked.** "A geophysical survey ... showing the civilian town" is real
    (Stratascan, in the Hughes report) but is not in the linked PDF; "the second fort of around AD
    90-100" has no source as a foundation date and is probably llandeilo.org's caption for the drawing
    (*Corrected 2026-10-09 (independent check)*); the drawing is real and credited as above; "more shambolic" is a fair
    reading of an under-resolved plot, not a finding.

## Further points from the independent check

Added 2026-10-09 from the [check](reviews/roman-forts-and-vicus-check-2026-10-09.md); none changes a verdict
above, but the builder should know them.

- **The placeholder forts in the app are wrong on more than the angle.** `roman-fort-b` runs from AD 83 to
  125, but the documented bracket ends "by AD 140" (with troops gone from the south-west perhaps by the
  mid-120s), so 125 is defensible only as the earlier reading and should say so. The placeholder roofs are
  `TILE` and the central building `LIMEWASH`, neither evidenced at Dinefwr. And `landmarkScale` 2.6 draws
  the forts 2.6 times life size, so a 240m fort covers about 620m: a "detailed reconstruction on the LiDAR"
  needs a decision on true scale.
- **The Dyfed Archaeological Trust 2005 dig diary is a trap.** Written before excavation (Wayback copy of the
  "Llandeilo Fort Dig Diary", cited by Wikipedia), it describes Fort 2 with a palisade, four "massive timber
  gatehouses", "about 150m long by 100m wide" and "a grid pattern of roads ... barracks, granaries", all in
  the conditional. Treat it as reconstruction, never evidence; the 2007 report supersedes it [S25].
- **Fort 1's and Fort 2's alignments differ slightly** (HER 47835: the later fort over "an earlier, larger fort
  with a slightly different alignment"); both long axes are still about 48 to 53 degrees east of north.
- **Coflein 402271 cites NPRN 266170 as the fort complex**, but 266170 is the park and gardens record.
- **Hughes's Trench 4 objective** mentions "the road approaching the northeast entrance to Fort 1";
  everywhere else that road leads to Fort 2. A slip, worth knowing if the sentence is quoted.
- **The 1993 fieldwalking list uses "Field 'E', SE Annex"** as a field label, which may help locate the annex
  if the fieldwalking archive is found.
- **The Cadw record's DAT number** in the Wikipedia list (27637) is wrong: Archwilio PRN 27637 is an unrelated
  spoil heap.

## Sources

- [S1] Gwilym Hughes, *The Llandeilo Roman Forts: Archaeological Investigations 2003-2007* (Cambria Archaeology report 2006/38, December 2007), PDF on Heneb. https://heneb.org.uk/wp-content/uploads/2025/09/llandeiloromanforts2003-2007.pdf : read in full with pdftotext and every figure viewed. The geophysical survey (Stratascan 2003; Heard 2005), Fort 1 and Fort 2 sizes, ditches, gateways, roads, vicus, Trenches 1-10, pottery (Webster), glass (Williams), plant remains (Caseldine and Griffiths), the preliminary discussion, brick and tile (appendix 4). Same report as roman:S1 and classes:S19.
- [S2] Coflein (RCAHMW), "Roman Fort Complex, Dynevor Park, Llandeilo", NPRN 402271. https://coflein.gov.uk/en/site/402271/ : the 3.7ha and 1.5ha, the 70s, "78 and 83", "garrison phase", "no direct evidence of the vicus ... second half of the second century", grid SN 62187 22534, sources Hughes 2003 and 2005. Same record as roman:S2. Read directly.
- [S3] Heneb, "Llandeilo Roman Forts" project page. https://heneb.org.uk/project/llandeilo-roman-forts/ : "two superimposed Roman forts, along with roads, a vicus ... and a possible bathhouse"; 2003 to 2007 National Trust project; the excavation image and the report PDF link; NLHF digital outputs "CC BY 4.0". Read directly.
- [S4] Heneb (Dyfed Archaeological Trust), "Tywi Time Line" (eight A3 pages, PDF created April 2011), the file the issue commenter linked. https://heneb.org.uk/archive/dyfed/tywi/tywitimeline.pdf : the Roman section (four sentences, the fourth naming a possible villa at Llys Brychan; corrected 2026-10-09 by the independent check) and the caption "Reconstruction of Llandeilo Roman Fort by Neil Ludlow"; contains no geophysical survey and no AD 90-100. Text read with pdftotext; all page images extracted and viewed.
- [S5] Coflein (RCAHMW), archive record 6170068, "CM367 - Cadw Scheduling Records". https://coflein.gov.uk/en/archive/6170068 : a file of Cadw scheduling notices for "Dinefwr Park Roman Forts (CM367)", c. 2006. Read directly.
- [S6] Wikipedia, "List of Roman-to-modern scheduled monuments in Carmarthenshire". https://en.wikipedia.org/wiki/List_of_Roman-to-modern_scheduled_monuments_in_Carmarthenshire : Dinefwr Park Roman Forts, CM367, grid SN622224, "Two superimposed Roman forts ... both from the 70s and 80s AD". A lead only; the Cadw record was not read.
- [S7] Coflein (RCAHMW), "Roman Coins, Findspot, Dynevor Park", NPRN 419158. https://coflein.gov.uk/en/site/419158/ : grid SN 61948 22295; "some 150m south-west of the Roman Fort Complex"; Fenton's account of denarii "some of Domitian". Read directly.
- [S9] Coflein (RCAHMW), "North Heronry Dam, Dinefwr Park, Possible Roman Villa", NPRN 422436. https://coflein.gov.uk/en/site/422436/ : "Strong evidence for a substantial Roman building ... its exact location could not be pinpointed"; grid SN 60880 22740. Read directly.
- [S10] Coflein (RCAHMW), "Caersws Roman Fort", NPRN 92468. https://coflein.gov.uk/en/site/92468/ : 188m by 177m, 3.2ha, "very early Flavian (c. AD 70)", annex, a vicus with "a developed series of streets, timber buildings" and a possible temenos, bathhouse to the south. Read directly.
- [S11] Coflein (RCAHMW), "Castell Collen Roman Fort", NPRN 95708. https://coflein.gov.uk/en/site/95708/ : from the 70s; about 182m by 114m, later 128m by 114m; "stone revetted and ditched banks"; extramural bathhouse. Read directly.
- [S12] Coflein (RCAHMW), "Caerau Roman Military Settlement; Caerau Roman Fort", NPRN 92153. https://coflein.gov.uk/en/site/92153/ : about 170m by 115m, from about 75; a courtyard building in the north-east corner shown by geophysics; extramural settlement. Read directly.
- [S13] Coflein (RCAHMW), "Carmarthen Roman Military Settlement", NPRN 92890. https://coflein.gov.uk/en/site/92890/ : occupied from about AD 75 to at least 100; "a second phase fort which was reduced in size". Read directly. A different record from roman:S33.
- [S14] Gwynedd Archaeological Trust for Cambria Archaeology, *Roman Fort Environs: Geophysical Survey at Trawscoed and Llanio Roman Forts* (report 623, G1827). https://heneb.org.uk/wp-content/uploads/2025/09/llaniotrawscoedgeophys.pdf : vici as "ribbon development along at least one of the roads"; six barrack blocks and gate-tower post-holes at Trawscoed; rectangular wooden buildings with short axes to the road (most likely at Cefn Caer, Pennal, not Llanio; corrected 2026-10-09 by the independent check). Downloaded and read with pdftotext.
- [S15] Wikipedia, "Trawscoed fort". https://en.wikipedia.org/wiki/Trawscoed_fort : 165m by 125m; "clay-and-turf" rampart about 4.1m wide; rebuilt at least three times; around 2,000 people in fort and vicus at its height (a secondary estimate). A lead only.
- [S16] Herefordshire Through Time, "Jay Lane Fort" (HER 578). https://htt.herefordshire.gov.uk/herefordshires-past/the-romano-british-period/herefordshires-roman-sites/major-roman-sites/jay-lane-fort : earth rampart (its summary says turf-revetted; its excavation section says no bank or palisade postholes were found and the turf is a suggestion: see the Jay Lane turf row), double V-shaped ditch, gatehouses on two rows of five posts with a tower at each end, a corner tower assumed to be six-post, four-post interval towers; "No internal buildings were excavated". Date given as AD 47-61 (pre-Flavian, so only for the form of timber gates and towers, not the date). Read directly.
- [S18] Wikipedia, "Roman fort" (now redirects to "Castra"; its barrack sizes are for legionary fortresses, checked 2026-10-09). https://en.wikipedia.org/wiki/Roman_fort : the standard plan (gates, roads, principia, praetorium, horrea, fabrica, barracks about 30-100m by 7-15m in contubernia). A lead only; the first 100,000 characters were read.
- [S19] Wikipedia, "Auxilia". https://en.wikipedia.org/wiki/Auxilia : establishment strengths of the cohors and ala quingenaria and milliaria (a second-century table; the real strengths "somewhat less"). A lead only.
- [S19a] Wikipedia, "Dinefwr Park National Nature Reserve". https://en.wikipedia.org/wiki/Dinefwr_Park_National_Nature_Reserve : repeats "ground radar" for the 2003 survey, eight acres and 3.5 acres, "up to 2000 men", a vicus "near its north east entrance" (from Rees, *Carmarthenshire*). A lead; contradicted by S1 on method.
- [S20] Coflein (RCAHMW), "Newton House; Dynevor Castle; Plas Dinefwr, Llandeilo", NPRN 17603. https://coflein.gov.uk/en/site/17603/ : grid SN 61432 22531; used only as a fixed point to georeference the report's Fig 1.
- [S21] People's Collection Wales, "Dinefwr Park Roman Forts, Llandeilo" (RCAHMW aerial photograph AP_2005_1285, Toby Driver, 11 July 2005). https://www.peoplescollection.wales/items/405712 : "excavation trench at SN 6217 2256 with dig tents, viewed from the west"; Crown copyright RCAHMW 2005; Creative Archive Licence (non-commercial). Read directly.
- [S22] Barry C. Burnham and Jeffrey L. Davies, "Forts, Vici and Related Extramural Activity in Wales and the Marches: Recent Discoveries at the Roman Fort of Pen y Gaer (Powys) and their Wider Implications", *Britannia* 52 (2021), 67-95. https://www.cambridge.org/core/journals/britannia/article/abs/forts-vici-and-related-extramural-activity-in-wales-and-the-marches-recent-discoveries-at-the-roman-fort-of-pen-y-gaer-powys-and-their-wider-implications/17A306685384F5A6FCEA33238DD6ECAD : abstract only (no full text); named as the next read for how Welsh vici were laid out.
- [S23] Heneb, Historic Environment Record (Archwilio), records PRN 47636 (Fort 1, SN 6218 2245), 47637 (Fort 2, SN 6217 2253), 47638 (the north-east road, SN 6225 2260), 47646-47650 (finds, including 47648, the 2000 denarii), 869 (the Domitian denarii hoard) and 886 (six 3rd-century bronze coins), 7367 (Llandyfeisant temple or villa), 47835 and 48198 (the 2003 survey and its assessment), 50045. https://archwilio.org.uk/arch/query/page.php?watprn=DAT47637&dbname=dat&tbname=core (replace the number for each record; rate-limited after about a dozen calls). Fort summaries are by M. Page, 2013, "based on Hughes"; they give Fort 2 "possibly around 82 AD". Read by the independent check, 2026-10-09.
- [S24] llandeilo.org, "Llandeilo's Roman Fort". https://llandeilo.org/roman_settlement.html (the `.php` address is dead) : captions the Ludlow painting "what the second fort may have looked like around 100AD (Drawing: Cambria Archaeology)" beside the 2003 geophysics plot (Cambria Archaeology newsletter No 2, Summer 2003); 3.9 hectares, "about AD 74", vicus "from 75 AD to 120 AD" (unsourced; the report governs). A community page, a lead only. Read by the independent check, 2026-10-09.
- [S25] Dyfed Archaeological Trust, "Llandeilo Fort Dig Diary" (2005), Wayback copy of 2 February 2021. http://web.archive.org/web/20210202144706/http://www.dyfedarchaeology.org.uk/digllandeilofort.htm : written before the excavation; a palisade, four timber gatehouses and a grid of roads "would have" existed. Reconstruction in the conditional, never evidence; superseded by the 2007 report [S1]. Read by the independent check, 2026-10-09.
