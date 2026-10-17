---
title: Pont Llandeilo (Llandeilo Bridge), the old bridge and the 1848 arch, for a Blender model
kind: research
status: draft
updated: 2026-10-17
---

# Pont Llandeilo, the old bridge and the 1848 arch, for a Blender model

Research for a scripted, true-size Blender model of the crossing of the Tywi at Llandeilo: the stone bridge of many
arches that stood here from the 16th century or earlier, its breaking in the 1790s, whatever carried the road from about
1800 to 1848, the building of the single arch in 1843-48, and that arch today. Written by Claude on 2026-10-17 from
sources fetched that day, for a workflow whose brief is in [`briefs/llandeilo-bridge.md`](briefs/llandeilo-bridge.md).
That brief says Dewi decided (2026-10-16/17) that landmarks are scripted Blender models at true size and height, like
the Roman forts ([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)),
each with its own 2m LiDAR area and textured with sourced or labelled-analogy surfaces; no decision-log entry saying so
was found in this worktree, so the attribution is the brief's. The choices in "Plan for the Blender model" are Claude's,
under the proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), and none
is Dewi's. **Not yet checked** by anyone but its writer.

It extends the bridge sections of [`era-victorian.md`](era-victorian.md) (S21, S22, the cost contradiction),
[`building-models.md`](building-models.md) (the 2026-10-02 bridge table, S34-S37) and [`event-effects.md`](event-effects.md)
(the building diary, S1-S6), and does not repeat their history of the Rebecca years or the cost except where it bears on
what was built.

**How it was done.** Coflein's two records (the new bridge and the old), both Cadw listings (the bridge is listed twice,
once in each community), Lynn Hughes's history and Jervoise's 1936 entry (both transcribed on llandeilo.org), Thomas
Jenkins's diary (transcribed there from the 1986 edition), the site's bridge gallery and its captions, Museum Wales's
record of Turner's watercolour and two National Library of Wales prints of about 1824 (public domain, Wikimedia Commons)
were read or viewed directly. The bridge was **measured** on the Welsh Government LiDAR of 2020-22: the 1m surface
model (DSM) of tiles SN6221 and SN6222 was downloaded for this note [S15], and the 1m terrain model (DTM) of the same tiles
already held for the app ([`../data/lidar.md`](../data/lidar.md)) was read beside it. *The Buildings of Wales:
Carmarthenshire and Ceredigion* (2006) and Cragg's *Civil Engineering Heritage: Wales and West Central England* (1986) were
**not** obtained (Google Books served no text); what they say reaches this note only through Wikipedia [S14], a lead.
WebSearch was used 5 times.

Everything is labelled with the app's three tiers: **documented** (a source says it, or the survey measures it),
**reconstructed** (inferred, and the note says from what), **imagined** (invented to fill a gap).

**Which sources are one source.** The two Cadw listings [S3][S4] are one source (Cadw) in two texts, and listing 20900
names its own sources: W. Samuel 1888, Jervoise, and "information from Thomas Lloyd Esq." (Thomas Lloyd is also the
first author of *The Buildings of Wales* [S14]). Coflein's bridge record [S1] quotes and cites Lynn Hughes (2004) [S5] for
its cost, stone and quotation, so on those points Coflein and Hughes are one chain; Coflein's span, width and arch shape
carry no citation. Hughes [S5] quotes Jervoise [S6] for 1577 and Bowen, and Jervoise quotes Lambarde: the 1577 bridge is
**one chain** (as `models` check 1 found, 2026-10-02). Jenkins's diary [S7][S8][S9] is a primary record independent of
all of them (Hughes quotes it, which does not make Hughes a second source for what Jenkins says). The llandeilo.org gallery
captions [S10] are the site's own and unsigned. The paintings and prints are independent of the texts, though not
necessarily of each other (see the prints). The survey [S15] is independent of everything. As in
[`dinefwr-castle.md`](dinefwr-castle.md), a part resting on one source family is marked **documented (one source: …)**,
so its ⓘ says so; plain **documented** needs a second independent strand.

## Summary

- **Anchor.** Coflein gives both the new bridge (NPRN 43102) and the old one (NPRN 23978) the same reference,
  **SN 62757 22001** [S1][S2]; Cadw's two listings give E 262759 N 222009 (11040) and E 262754 N 221989 (20900) [S4][S3].
  The **centre of the 1848 arch, measured on the LiDAR, is E 262757.1 N 222001.0 (±2m)**, at Coflein's point to within a
  metre [S15]. Use Coflein's point as the feature's `at` (the forts' rule); the measured centre confirms it. Coflein's
  point for the *old* bridge is the new bridge's, not a survey of the old one.
- **The 1848 bridge, measured.** Its axis runs at **16.3 degrees east of grid north** (±0.5, fitted to 107 rows of the
  parapets) [S15]. The parapet crests are **9.6m apart** across the axis (±1m), which fits Coflein's "26ft wide" (7.9m)
  as the road between the parapets [S1][S15] (an inference: the parapets' thickness is not measured). The road over the
  arch is **35.7m OD at the south springing, 36.1m at the crown and 36.3m at the north springing**: it climbs northward
  across the arch (about 1.4%) and on up Bridge Street (37.1m 46m north of the centre), and falls south along the Ffairfach
  causeway (34.2m 60m south, 33.2m 80m south). The parapet tops stand **about 1.1m above the road** (37.1-37.3m OD over
  the arch). The floodplain beside the south causeway is 25.5-26.0m OD; the survey's water surface below the bridge is
  23.8-23.9m, but that is the DTM's interpolation across water, not a measured level [S15].
- **The arch.** One arch of **44.2m (145 ft)**: Jenkins drew "the elliptic line for the new bridge, full size, Span 145ft.
  Raise 38ft." on 20 February 1846 [S9][S7]; Cadw 44.2m [S3] and "145 ft" [S4]; Coflein "a single 145ft span" [S1]; the
  1948-49 plaque "of 145 feet span" [S17]. Documented, cross-checked (Jenkins is independent of Cadw). **Its rise is
  contested**: 38 ft, 11.58m (Jenkins's drawn line, 1846) [S9]; 12.65m with "a total height of 14.3m" (Cadw 20900) [S3];
  "rising 35 ft (10.5m) above" the river (Cragg 1986, via Wikipedia, not read) [S14]. **Its shape is contested in words**:
  "elliptic" (Jenkins) [S9], "elliptical headed" (Coflein) [S1], "depressed" (Cadw 11040) [S4], "segmental" (Jervoise) [S6];
  photographs show it springing steeply from its abutments [S19][S20], which fits Jenkins's ellipse better than a segment
  (an observation). The arch's centre and its springing piers are found on the LiDAR (see Placement).
- **Measured arithmetic, an inference.** If Cadw's 14.3m "total height" runs from the springing to the parapet top, the
  springing is at about 22.9m OD (37.2 - 14.3), about a metre below today's water. A rise of 11.58m from there puts the
  crown's soffit at about 34.5m OD, 1.6m below the road; Cadw's 12.65m puts it at 35.5m, 0.6m below the road, too thin for
  the stone ring of a 44m arch to fit (the ring's depth is not recorded). Cragg's 35 ft above the river gives about 34.6m.
  So **Jenkins's 11.58m rise, Cadw's 14.3m total height and Cragg's figure agree with the surveyed deck; Cadw's 12.65m rise
  does not**, unless it is measured from a lower springing or to the extrados. Not resolved; kept contested.
- **The flood arch and the piers.** Cadw: "Large flanking buttress piers rise through parapet. Similar buttress piers
  flank a segment-headed flood arch through the S abutment and also occur singly on the Ffairfach abutment" [S3]. On the
  surface model the bridge's sides bulge by about 1m at **25.5m either side of the arch's centre** (the springing piers)
  and at about **58-66m south** of it (the flood arch's piers, so the flood arch is at about 61.5m south, ±5m) [S15]; the
  1998 aerial photograph shows "its single flood-release void (far left) on the Ffairfach (south) side" about one span's
  length beyond the main arch [S10]. Its size is not recorded: from the 1928 photograph of the bus on its parapet
  [S10] the opening is about as tall as it is wide, about 6m by 6m (an estimate, see the parts).
- **The old bridge stood by 1577, and had seven arches before 1730** (Hughes) [S5]: "According to Lambarde, there had been a
  stone bridge at Llandilo in 1577" (Jervoise) [S6]; "a handsome stone Bridge" in Bowen's road book of the early 1700s [S6];
  "Before 1730, only two major stone bridges spanned the Towy ... another at Llandeilo of seven arches" [S5]; Cadw: "to
  replace a 7-arch bridge whose abutment can be seen on the N bank just downstream" [S3]. 1577 is one chain (Lambarde via
  Jervoise via Hughes). Who built it and when are **not known**: Hughes calls Sir Rhys ap Thomas, after 1485, "a fair
  assumption" [S5]; the gallery's "built in the early 1500s ... probably by ... Sir Rhys ap Thomas" is the same site's
  inference [S10]; Coflein: "possibly of medieval origins" [S2]. Bryn Thomas's extracts say "In 1750 the Tywi Bridge
  consisted of four narrow stone arches" [S16] (contested, already open).
- **It broke in the 1790s.** Turner's watercolour (Museum Wales, c. 1796) [S11] shows a stone bridge of round arches with
  cutwaters, one span replaced by a timber trestle and footway; Hughes reads it as two spans down "[Numbers 2 and 3 from
  the right bank]" in 1795, and Rooker's painting (1796, shown 1797) as three spans down, "[3, 4 and 5 from the right bank]",
  with "a more robust and elongated gantry repair" [S5]. On **10 February 1798** "the largest flood ever remembered ...
  carried away the temporary wooden bridge" and Lord Dynevor authorised a ferry [S5]; Jervoise: "At the end of the eighteenth
  century there was evidently only a ferry" [S6]. *The Buildings of Wales* (via Wikipedia) has the seven-arch bridge
  "collapsed in 1795" [S14]; the gallery has a flood that "swept away the entire bridge" in 1798 [S10]. The order is
  documented (two spans by 1795, three by 1796-97, the timber by 1798); how much stone fell in 1798 is **contested**.
- **What stood from about 1800 to 1848 is contested, and matters for the model.** (a) **The seven arches, restored**: Hughes,
  from L. G. Wood's etching of 1812 ("the bridge's seven arches are standing firm") and a reading of Rees [S5]; Cadw's
  "replace a 7-arch bridge" [S3]; the 1948-49 plaque "TO REPLACE THE OLD SEVEN ARCH BRIDGE" [S17]. (b) **A new bridge of
  three arches**: *The Buildings of Wales* p. 250 ("a previous three-arched bridge", via Wikipedia) [S14]; Nicholson's
  *Cambrian Tourist's Guide* (1814), "three very light and elegant arches, built by David Edwards of Beaupre" (as Hughes quotes
  it, calling it a confusion with Llandeilo Rwnws bridge) [S5]; the gallery's drawing captioned "1816 by Frenchman George
  Orleans Delamotte", three river arches and "two arches (voids) on the Ffairfach (south) bank ... for flood release" [S10];
  two National Library of Wales prints of about 1824, "Llandilo Bridge", each showing three arches [S12][S13]; and Rees's
  words as Jervoise quotes them, "a substantial stone one **of modern erection**" (Hughes quotes the rest of the sentence and
  leaves out that opening clause) [S6][S5]. Wood's etching, as reproduced on the site, is too small to count arches in [S5]. The prints
  and Nicholson's engraving share one composition, so they are one strand, not three; the Delamotte attribution is the
  gallery's alone (a search found no museum record of it). **Kept contested; Claude's recommendation is in "For the owner's
  decision".**
- **The old bridge's line is downstream, and probably about 76m (250 ft) downstream.** Cadw: "just downstream" [S3][S4];
  Hughes: "Pits were dug upstream of the old bridge" for the new foundations [S5]; in October 1846 a man swept off the
  new centring "got up by a rope over the parapet of the old bridge" [S9]; and the transcription of Jenkins's entry for 8
  March 1840 carries an editor's gloss, "(This bridge was about 250 feet further down the hill from the present one but
  was extremely narrow ...)" [S8] (whose gloss, the 1986 editor's or the website's, is not known). On the LiDAR the north
  bank changes at **E 262683 N 222019** from an open low terrace (west) to a walled bank under the lane (east), 76m from the
  new arch's centre [S15]: a **candidate** for the surviving north abutment, consistent with all three, not confirmed.
- **Its height and width.** On 8 March 1840 a phaeton went "over the parapet of the bridge ... The height of the fall is
  about 35 ft." (Jenkins) [S8], so the old parapet stood about 10.7m above where it landed (water or bed, not said). It was
  narrow: "so narrow that a carriage cannot be passed upon it, either on foot or on horse back without some danger" (Rees,
  c. 1819, via Jervoise) [S6]; "not even wide enough for a horse and cart" (*The Buildings of Wales*, via Wikipedia) [S14].
  No dimension of any arch, pier or the deck is recorded in any source read.
- **The building, 1843-48** (documented, mostly from Jenkins's diary [S7][S8][S9] with Hughes [S5]): work began 4 July 1843
  (Hughes); pumps and a pile engine 27 ft high (Jenkins); the south abutment on "4 inch oak planking on 12 inch square
  bearing beams" (2 December 1844) and the foundation stone on 3 December 1844 at 3.15 pm (Jenkins; Hughes has 1845); the
  north abutment "on rock to 5 tiers, and the southern one on piles to 6 tiers" (Hughes); the elliptic line drawn 20
  February 1846; the centring begun 8 May 1846 and fitted from 3 September; "the temporary railway used to carry stone over
  the river for the bridge" (6 August 1846); a derrick crane (21 August); the flood of 22 October 1846 (Hughes has 1845);
  the keystone at 3 pm on 25 November 1847 (Hughes); the centring lowered 27 January 1848 and carried off by the flood on 30
  January (Jenkins); the old bridge taken down from April 1848 for material (Hughes); "the bridge is now with the approaches
  completed" at the Michaelmas sessions, 19 October 1848 (Hughes). The east parapet reads "Erected 1848" [S3].
- **Materials.** Cadw 20900: "Rubble stone to abutments, tooled limestone buttresses, copings and other dressings, freestone
  (possibly sandstone) rusticated voussoirs to arch and to facing above with incised channelling, also channelled stonework
  to arch underside"; a "bull-nosed broad stringcourse under rounded grey limestone parapet" over the arch; elsewhere a
  plain stringcourse and "parapet of rubble with limestone ridged coping"; piers with "pyramidal caps in tooled limestone"
  [S3]. Cadw 11040: "Coursed squared rubble masonry", "stepped freestone voussoirs", "Freestone parapet over string course
  with domed capstones on bridge" [S4]. Hughes (and Coflein, quoting him): "The arch of the bridge is constructed with this
  carboniferous limestone [Cilyrychen, Llandybie, 'Black Marble'], while the less important sections are of the Llandeilo
  series, and the rest of the work, in particular the approaches and the northern flood wall, near Moreb, are likely to
  have been salvaged from the ancient bridge" [S5][S1]. **The voussoirs' stone and the main parapet's are contested** (Cadw
  freestone, possibly sandstone, against Hughes's limestone arch; Cadw's two texts disagree on the parapet).

## Placement

| Point | Grid reference | Source | Note |
|---|---|---|---|
| Coflein, the new bridge (NPRN 43102) | SN 62757 22001 = E 262757, N 222001 | [S1] | Use as the feature's `at` |
| Coflein, the old bridge (NPRN 23978) | SN 62757 22001 | [S2] | The same point: not a survey of the old bridge |
| Cadw listing 11040 (Llandeilo community) | E 262759, N 222009 | [S4] | 8m north of Coflein's |
| Cadw listing 20900 (Dyffryn Cennen community) | E 262754, N 221989 | [S3] | 12m south of Coflein's; each listing's point lies in its own community's half |
| The 1848 arch's centre | E 262757.1, N 222001.0 (±2m) | [S15] | Midway between the springing piers on the DSM |
| The axis | 16.3 degrees east of grid north (±0.5) | [S15] | Fitted to the midpoints of the parapet crests, N 221935-222046, residual 0.32m |
| South springing pier | about E 262750.0, N 221976.5 | [S15] | Bulge of the sides, ±1.5m |
| North springing pier | about E 262764.3, N 222025.5 | [S15] | Bulge of the sides, ±1.5m |
| The flood arch | about E 262740, N 221942 (±5m along the axis) | [S15][S10] | Bulges at 58-66m south; the 1998 aerial |
| Candidate old north abutment | about E 262683, N 222019 (±5m) | [S15], fits [S3][S5][S8] | Where the walled north bank ends westward; unconfirmed |

**Plan frame for the model** (proposed): metres along the axis (`s`, north-north-east positive) and across it (`t`,
east-south-east, the upstream side, positive), origin at Coflein's point, true size and true height. The arch's centre is
at s = 0 (±2), the springing piers at s = ±25.5 (±1.5), the flood arch at s = -61.5 (±5). The app's current plan
(`LLANDEILO_BRIDGE` in `src/content/buildings.ts`) runs from -81.3 to +29.3 along an axis rotated 72.4 degrees, which by
`rotate()` in `src/domain/plan.ts` points 17.6 degrees east of north, and puts the main arch's centre at `at: 55.3` from
the south end, that is at s = -26: **26m south of where the survey puts it**, and the flood arch at s = -65.3, near the
survey's -61.5. Checked here in the code only, not on screen; the build should confirm it.

**The bridge's length.** Cadw: "a total length of 110.64m including very long abutment on the Ffairfach side and short NW
and longer rising NE abutments on the Llandeilo side" [S3]. Where those ends are on the ground is not marked by anything the
survey shows: the parapets run on unbroken south along the causeway towards Ffairfach and north up Bridge Street [S15].
With the arch centred at s = 0 and the north abutment ending where the west side opens to the riverside lane (s ≈ +46) or to
the steps (s ≈ +30), the listed length puts the south end at about s = -65 or -81; the app's -81.3 to +29.3 is one reading
(an inference). Both listings' names include "causeway(s)" [S3][S4], so the model draws the causeways too, to where the
parapets meet Ffairfach (about N 221800 on the OS 25-inch map [S18]; not measured here).

## The site

- **The river and the floodplain.** The Tywi flows west here. At the bridge the channel between points 1m above the
  survey's water is 46-49m wide north to south, about 50m along the bridge's axis; 80m downstream it is 50-53m [S15]. The
  south bank is open floodplain at 25.5-26.0m OD; the north bank rises under the lane to Moreb and the foot of Bridge
  Street (29-33m OD within 15m of the water) [S15].
- **The DTM removes the bridge and the causeway.** Along the axis the terrain model reads the floodplain (25.5-26.9m)
  under the south causeway, the water under the arch, and the hillside under the north abutment up to about s = +45, where
  it meets Bridge Street [S15]. So the model must build the causeway and the abutments from the floodplain up; the terrain
  will not carry them.
- **What sits round it.** Bridge Farm below the south-west end (Coflein 54161, `victorian:S43`); the houses of Bridge
  Street above the north end; the riverside lane west to Moreb; "steps down to river to W along lower end of Bridge Street,
  Llandeilo, and down to Bridge Farm, Ffairfach on E" [S3]. These are neighbours, not parts of the bridge.
- **Before any bridge.** No source read records a ford or ferry here before the stone bridge. Hughes's suggestion of a
  Roman crossing "at Bridge Farm" rests on a "recently-identified and newly-drawn line of the Via Julia" he does not cite,
  and he says "Physical evidence for this original crossing ... has long disappeared" [S5]: a lead, not drawn.

## Phase 1: the stone bridge of seven arches (by 1577 to 1795)

- **Documented.** Standing by 1577 (one chain: Lambarde, Jervoise, Hughes) [S6][S5]; "a handsome stone Bridge" in Bowen's
  *Britannia Depicta*, early 18th century [S6]; seven arches before 1730 [S5], in Cadw [S3] and on the plaque [S17].
  Gwilym Teilo's or Bryn Thomas's "four narrow stone arches" in 1750 [S16] contradicts the seven (open).
- **Form, from the pictures.** The gallery's view "by Nicholas Pocock around 1789", "taken downstream on the Ffairfach
  (south) bank" [S10], shows a long row of slightly pointed arches (six or seven visible) on piers with cutwaters, a
  parapet, and the church tower and houses above (the attribution and date are the site's; not checked). Turner's watercolour [S11] shows
  rounded arches, a broken pier and a rough parapet. Neither gives a measurement; the arches' spans, the piers and the deck
  are **unknown**. Hughes: "the medieval bridge was as long and low as in the bronze is shown as short and tall" [S5]
  ("long and low", his reading of the paintings).
- **Builder and date.** Not known; Sir Rhys ap Thomas after 1485 is Hughes's "fair assumption" [S5]. **Contested; the
  model starts the phase at 1577**, the first record, with the ⓘ saying it was built earlier, date unknown.
- **For the model**: seven arches, cutwaters, parapet, a narrow deck, on the old line (reconstructed, the candidate line);
  every size estimated, and the ⓘ says so.

## Phase 2: broken, with timber in the gaps (1795 to 10 February 1798)

- Turner (c. 1796 by Museum Wales [S11], 1795 in Hughes [S5]): two spans down "[Numbers 2 and 3 from the right bank]",
  bridged with timber; Hughes: "two saplings - or split timbers - offer up meek support from the river bed ... crudely
  anchored with posts and rip-rap boulders" [S5]. The painting viewed shows a timber trestle on posts and a footway with a
  handrail across the gap [S11].
- Rooker (1796, exhibited 1797; Hughes credits it to the National Library of Wales): "Four arches out of seven stand and three of the
  central spans are down [3, 4 and 5 from the right bank]", "a more robust and elongated gantry repair. Two pairs of sawn-timber
  support-struts" [S5]. The gallery's copy, viewed, shows the timber bridge with braced trestles between standing stone
  arches [S10].
- A French traveller of 1795 (Maudet de Penhouet, as Hughes identifies him) called it "the frightful bridge" and said they
  were debating "relative to its size" before rebuilding [S5].
- 10 February 1798: the flood "carried away the temporary wooden bridge" [S5].
- **For the model**: the Phase 1 bridge with spans 2-3 (from 1795) and then 3-5 (from 1796) replaced by timber trestles
  and a deck: which spans fell is Hughes's reading of the paintings (one source for the numbering); the timber's form is
  reconstructed from the two paintings. The right bank is the north bank (the river flows west), so "from the right bank"
  counts from Llandeilo (an inference from the direction of flow).

## Phase 3: no bridge, a ferry (1798 to a date not known)

- "Lord Dynevor, within a day or so, authorised the operation of a ferry for the transportation of coal, sheep and calves",
  and the "much-complained-of gang-planking was re-asserted" (Hughes) [S5]; "evidently only a ferry, for which the charges
  were a half penny per person or per horse-load" (Jervoise) [S6]. What of the stone stood is **contested** (see Phase 2 and
  the next phase).
- **The end is not known.** The earliest picture of a standing bridge after 1798 is Wood's etching of 1812 [S5]; Nicholson
  describes a bridge in 1814 [S5]; Rees "of modern erection" in the *Beauties of England and Wales* (1813 in Hughes, "c. 1819"
  in Jervoise) [S5][S6]. **For the model**: 1798 to c. 1805 (an estimate, before 1812), the stumps of the old bridge and a
  ferry boat; the ⓘ says the length of the gap is not known.

## Phase 4: the bridge of 1800s to 1848 (contested form)

- Two readings, each documented and contested (see Summary): **seven arches restored** [S5][S3][S17], or **a new bridge of
  three river arches and two flood arches on the Ffairfach side** [S14][S5 (Nicholson)][S10][S12][S13][S6 (Rees)].
- **Common to both.** Narrow [S6][S14]; its parapet about 35 ft above where the phaeton fell in 1840 [S8]; "in a dangerous
  state, owing to the insecurity of its foundations" at the July sessions of 1840 [S5]; in 1846 "damaged by the late flood and
  cracked through", Jenkins and William Williams buying 1,000 ft of beech "for making a coffer-dam around the damaged pier"
  (11 November 1846) [S9]; Hughes: "A hole, 7 foot deep, had appeared under the north-east pier", "the road sagged
  significantly" [S5]. Its materials went to Haycock with the contract in October 1846 [S9], and it was taken down from April
  1848, "the cost of demolition was reckoned at £685" [S5]. **The north abutment was left** [S3].
- **For the model**: one plan per reading would be two models; see "For the owner's decision".

## Phase 5: building the new bridge (1843 to 1848)

| When | What was there | Source |
|---|---|---|
| From 4 July 1843 | Coffer dams to divert the river; pits "upstream of the old bridge" | [S5] |
| 1843-44 | Hand pumps 15 ft long and a horse pump (Jenkins's); a pile engine 27 ft high, ram 1,000 lb | [S9][S8] |
| 2-3 Dec 1844 | South abutment on oak planking over 12-inch bearing beams; the foundation stone (Jenkins: 3 December 1844, 3.15 pm; Hughes: 3 December 1845, 3 pm) | [S8][S5] |
| 20 Feb 1846 | The arch's elliptic line drawn full size, span 145 ft, rise 38 ft | [S9] |
| May-Sept 1846 | The centring: templates of 1-inch boards "for every piece of timber to be used in each couple", framing from 8 May, fitted up from 3 September; 800 ft and 29 baulks of timber, ash for wedges | [S9] |
| Summer 1846 | "the temporary railway used to carry stone over the river for the bridge" (a boy of seven drowned from it, 6 August); a derrick crane, 21 August | [S9] |
| 22 Oct 1846 | Flood: "Part of the centre carried off", five men on it (Hughes dates this 1845) | [S9][S7][S5] |
| 25 Nov 1847 | The keystone, 3 pm | [S5] |
| 27 and 30 Jan 1848 | Centring lowered; then "carried off by the flood and thrown down in a mass" | [S7][S9] |
| By 19 Oct 1848 | Approaches completed; the old bridge taken down from April 1848 | [S5] |

Hughes's year for the foundation stone and the first flood is one year off Jenkins's both times (1845 for 1844, 1845 for
1846); Jenkins's entries sit in dated diary runs, and Wikipedia's "in 1846, Edward Haycock took over" [S14] agrees with the
diary's 23 October 1846 transfer [S9]. Kept contested (already open for the foundation stone in
[`event-effects.md`](event-effects.md)), with Jenkins's dates used.

**For the model** (optional phase): the old bridge standing downstream; the two abutments rising; from summer 1846 the
centring (a timber frame whose form is reconstructed, since only its parts and dates are recorded), a crane and a light
railway over the river; the arch closed from 25 November 1847; the centring gone from 30 January 1848. The app already
has the 30 January 1848 flood as the bridge's key-date moment (`event-effects.md`).

## Phase 6: the single arch (1848 to today)

### The parts, as recorded

| Part | What the sources say | Measured here | Tier |
|---|---|---|---|
| Main arch | One arch, 145 ft, 44.2m [S1][S3][S4][S9][S17]; rise 38 ft [S9], 12.65m [S3], 35 ft above the river [S14]; elliptic [S9][S1], depressed [S4], segmental [S6] | Centre s = 0 ±2 [S15] | Span documented, cross-checked; rise and curve **contested** |
| Voussoirs | "freestone (possibly sandstone) rusticated voussoirs to arch and to facing above with incised channelling" [S3]; "stepped freestone voussoirs" [S4]; "lengthy and finished with ashlar" (Cragg, via [S14]) | Depth not measurable from above | Documented (one source: Cadw), stone contested with Hughes's limestone [S5] |
| Arch soffit | "channelled stonework to arch underside" [S3] | - | Documented (one source: Cadw) |
| Springing piers | "Large flanking buttress piers rise through parapet"; "the piers to the centre arch are broader and with rebated angles"; "pyramidal caps in tooled limestone" [S3]; "2 order buttresses at springing points rise through parapet" [S4] | Sides bulge about 1m at s = ±25.5, over about 3m along the axis [S15] | Documented (one source: Cadw; the survey finds them) |
| String course | Main arch: "bull-nosed broad stringcourse"; elsewhere "plain"; "broken forward over piers" [S3]; "Freestone parapet over string course" [S4] | - | Documented (one source: Cadw) |
| Parapet | Over the arch "rounded grey limestone parapet" [S3] or "Freestone parapet ... with domed capstones" [S4]; elsewhere "rubble with limestone ridged coping" [S3], "rubble parapet over string course with ridged parapet to causeways" [S4] | 1.1m above the road over the arch; crests 9.6m apart (±1) [S15] | Documented; the main parapet's stone **contested within Cadw** |
| Road | "Twin carriageway" [S4]; "26ft wide" [S1] | 35.7 / 36.1 / 36.3m OD at s = -22 / 0 / +22; 37.1 at +46; 34.2 at -60; 33.2 at -80 [S15] | Documented (width: Coflein, and the survey agrees) |
| Flood arch | "segment-headed flood arch through the S abutment", flanked by buttress piers; "Flood arch is tall with similar detail to main arch" [S3]; "Further depressed flood arch through approach causeway from Ffairfach, flanked by buttresses" [S4] | Piers at about s = -58 and -66; so about s = -61.5 ±5 [S15]; about 6 x 6m (estimate from the 1928 photograph [S10], see the plan) | Place and form documented (one source: Cadw; the survey and the 1998 aerial [S10] agree); size estimated |
| South (Ffairfach) abutment and causeway | "very long abutment on the Ffairfach side" [S3]; "Further buttresses along long approach causeway from Ffairfach" [S4]; piers "singly on the Ffairfach abutment" [S3]; southern foundations "on piles to 6 tiers" [S5] | Parapets continue to Ffairfach; road 33.2-35.7m OD over a floodplain of 25.5-26.0m [S15] | Documented (one source: Cadw; the survey) |
| North abutments | "short NW and longer rising NE abutments" [S3]; "buttresses ... up Bridge Street" [S4]; northern foundations "on rock to 5 tiers" [S5] | The west side opens at s ≈ +30 (steps) and from s ≈ +46 (the lane) [S15] | Documented (one source: Cadw) |
| Revetment and steps | "revetment wall with steps down to river to W along lower end of Bridge Street" [S4]; steps "down to Bridge Farm, Ffairfach on E" [S3] | West bulge at s ≈ +12 to +17 [S15] | Documented (one source: Cadw) |
| Inscriptions | "On the E parapet is inscribed 'Erected 1848'. On the W the blank panel is said to have had the name of Haycock as architect, erased by local demand. Later inscription: 'Pont Llandeilo cymer hon le hen bont saith bwa'. C20 bronze plaque" [S3]; plaque "to W parapet" [S4]; the plaque reads "OLD BRIDGE LLANDILO 1779 ... PRESENTED BY B.T. THOMAS, ESQ. ... 1948-49" [S17] | - | Documented (the plaque photographed; the rest one source: Cadw) |

### Later changes

- A bus "crashed through the parapet just above the flood-release void" (the gallery's caption, 1928) [S10]; D. C.
  Harries's photographs of it are dated c. 1928 by People's Collection Wales (`harries:` note, items 2282141, 2282156,
  2282171); Bryn Thomas gives "Nov 12" without a year in the copy read [S16]. The parapet was rebuilt; when and how is not
  recorded in any source read.
- The bronze plaque, 1948-49 [S17]; the Welsh inscription, date not given [S3].
- Street lamps and modern road furniture (photographs [S19][S20]); not modelled.

## Materials, as far as recorded

- **Limestone**: "tooled limestone buttresses, copings and other dressings", "rounded grey limestone parapet",
  "pyramidal caps in tooled limestone" [S3]; Hughes: Haycock "obliged to abandon" the faulty quarries near the town "and
  bring in the Black Marble from six miles distant [Cilyrychen, Llandebie]", "carboniferous limestone" for the arch
  [S5][S1]. That Cilyrychen is a Carboniferous limestone quarry was not checked against BGS here.
- **Freestone**: "freestone (possibly sandstone) rusticated voussoirs" [S3]; "stepped freestone voussoirs" [S4].
- **Rubble**: "Rubble stone to abutments" [S3]; "Coursed squared rubble masonry" [S4]; "the less important sections are
  of the Llandeilo series" and the approaches and northern flood wall "likely ... salvaged from the ancient bridge" (Hughes,
  "likely") [S5]. Bryn Thomas: stone "for the buttresses" from "a quarry about 50 yards from the signal box at the side of
  the railway and immediately below Rock Villa" [S16] (against Hughes's Cilyrychen for the arch, already open as
  `victorian` contested).
- **The old bridge**: stone [S6][S2], "(and timber)" (Coflein, perhaps the 1790s repairs) [S2]; nothing on its stone. The
  pictures show grey-brown rubble [S10][S11].
- **What the photographs show today** [S19][S20][S21]: grey channelled ashlar facing over the arch, darker grey soffit
  courses, a pale coped parapet. These are references for textures, not evidence of 1848.

## Images

Reference copies in [`refs/llandeilo-bridge/`](refs/llandeilo-bridge/) are public domain or made here from open data;
the llandeilo.org images and the Turner (Museum Wales) are linked, not copied.

| Item | What it shows | Credit and licence | Copied |
|---|---|---|---|
| `landilo-bridge-south-wales-c1824.jpg` | "Llandilo Bridge, South Wales": three arches, houses on the left bank, cattle | National Library of Wales, c. 1824, via Wikimedia Commons; public domain [S12] | Yes |
| `llandilo-bridge-vale-of-towy-1824.jpg` | "Llandilo Bridge, Vale of Fowey [sic], Sh. Wales", 1824: the same composition | As above [S13] | Yes |
| `lidar-dsm-hillshade-bridge.png` | Hillshade of the 1m DSM, E 262680-262830, N 221870-222090, 4 pixels a metre | Made here from Welsh Government LiDAR (SN6221, SN6222; OGL v3) [S15] | Yes |
| Turner, "Llandilo Bridge and Dynevor Castle", NMW A 1738 | The broken bridge with a timber trestle, the castle above | Amgueddfa Cymru – Museum Wales [S11] | No |
| llandeilo.org gallery: "Pocock c. 1789", Turner, Rooker 1796, "Delamotte 1816", Nicholson 1840, aerial 1998, bus 1928 | As captioned | llandeilo.org (Terry Norman and Andy Mabbutt) [S10] | No |
| Centenary plaque | Seven-arch relief "OLD BRIDGE LLANDILO 1779" and the inscription | Jaggery, Geograph 2479213, CC BY-SA 2.0 [S17] | No |
| Photographs of the arch | The flood arch and main arch from the south-west field; under the arch; the arch from the north bank | Geograph 2479206 (Jaggery, CC BY-SA 2.0), Ken Day (CC BY-SA 4.0), Geograph 472194 (Alan Bowring, CC BY-SA 2.0) [S19][S20][S21] | No |

## Contested points (kept contested)

1. **When the old bridge was built**: by 1577 (one chain) [S6][S5]; after 1485 by Sir Rhys ap Thomas ("a fair assumption")
   [S5]; "possibly of medieval origins" [S2].
2. **Its arches in 1750**: seven [S5][S3] against "four narrow stone arches" [S16] (already open).
3. **What the floods of 1795-98 took**: two spans (1795) and three (1796-97), then the timber (1798) [S5]; "collapsed in
   1795" [S14]; "swept away the entire bridge" in 1798 [S10].
4. **What stood from about 1800 to 1848**: the seven arches restored [S5][S3][S17] against a new bridge of three arches
   (with two flood arches) [S14][S5 (Nicholson)][S10][S12][S13][S6 (Rees, "of modern erection")].
5. **When the gap of 1798 ended**: not recorded; by 1812 (Wood) [S5].
6. **The 1848 arch's rise**: 11.58m (38 ft, Jenkins's line) [S9], 12.65m (Cadw) [S3], about 10.7m above the river (Cragg,
   via Wikipedia) [S14]; the survey favours the first and third (Summary).
7. **Its curve**: elliptic [S9][S1] against depressed [S4] and segmental [S6].
8. **The arch stone and the main parapet's**: freestone, possibly sandstone (Cadw) [S3][S4] against Carboniferous limestone
   (Hughes, Coflein) [S5][S1]; the main parapet rounded grey limestone [S3] or freestone with domed capstones [S4].
9. **The foundation stone and the first flood**: 1844 and 1846 (Jenkins) against 1845 and 1845 (Hughes) [S8][S9][S5].
10. **The span in feet**: 145 ft [S1][S4][S9][S17] against 143 ft (Wikipedia, citing the listing) [S14]; the listing read
    says 145.
11. **The cost** (not for the model): already open in [`open-questions.md`](open-questions.md); Wikipedia adds £23,000
    from *The Buildings of Wales* [S14].

## Gaps

- **The old bridge's line, arches and width.** Nothing measured; the candidate abutment (E 262683 N 222019) is a reading of
  the LiDAR. The Llandeilo Fawr tithe map (1840s, National Library of Wales, "Places of Wales"), whose tiles are served
  only through a third party's map key and were not fetched, and a site visit or photograph of the north bank, would test
  it. The OS 25-inch map read [S18] marks no old bridge.
- **The 1800-1848 bridge's form** (contested point 4): *The Buildings of Wales* p. 250 and its source; the Delamotte drawing's
  holder; the Llandeilo Fawr vestry and quarter sessions records Hughes says would show the restoration [S5]; Samuel 1888
  (Cadw's source).
- **The 1848 bridge's drawings**: Williams's and Haycock's drawings and the quarter sessions papers (Carmarthenshire
  Archives) would give the ring depth, the springing level, the flood arch, the piers and the parapet. Not searched.
- **Cragg 1986, pp. 77-78**, and **Jervoise's** other pages: not read beyond the transcription.
- **The springing level** and the ring's depth (only inferred).
- **The flood arch's size** (only estimated from a photograph).
- **The causeways' ends**, and where Cadw's 110.64m starts and stops.
- **The repair of the parapet** after the c. 1928 bus crash.
- **Who wrote the "250 feet" gloss** in the Jenkins transcription.
- **Whether a ford or ferry preceded the stone bridge.**

## For the owner's decision

- **Phase 4's form.** Claude's recommendation, under the proactive mandate: draw **three river arches and two small flood
  arches on the Ffairfach side** for c. 1805 to 1848, reconstructed, with the ⓘ giving the seven-arch reading; because the
  three-arch reading has three independent strands written or drawn at the time (Rees's "of modern erection" via Jervoise,
  Nicholson's text and the print family, the Delamotte drawing as captioned) and a scholarly modern one (*The Buildings of
  Wales*), while the restored seven arches rest on Hughes's reading of a small etching and on later statements (Cadw, the
  1948 plaque). The app today draws seven arches from 1700 to 1848 (`old-bridge`).
- **Phase 5.** Whether to model the building years (1843-48), with the centring, crane and railway, or keep only the
  existing flood moment of 30 January 1848. Claude's recommendation: yes, as its own feature, since the diary dates it
  month by month and the moment already exists.
- **The broken bridge.** Whether to draw 1795-98 as its own phase (Turner's and Rooker's states) or fold it into Phase 1.
  Claude's recommendation: its own phase, since two dated paintings show it.

## Plan for the Blender model

Proposed by Claude under the proactive mandate (ADR 0027). It follows the forts and Dinefwr: one feature per phase, every
part with an id, a name, its own provenance and its kits; the river, banks and floodplain stay procedural on the terrain
(ADR 0053, point 5). Coordinates are in the plan frame above (`s` along the axis from Coflein's point, north-north-east
positive; `t` across it, upstream positive), true size and true height in metres OD. **Every number not marked
"measured" or quoted is an estimate and is marked so.** An id names one physical part for good (`bridge/arch` in every
phase that has it); the old bridge's parts are `old-bridge/…`.

**Phases and dates (proposed):**

| Feature id (proposed) | Years | Basis |
|---|---|---|
| `old-bridge` | 1577 to 1795 | Standing by 1577 (one chain) [S6]; seven arches before 1730 [S5][S3]; breaks by 1795 [S5][S11]. Replaces the app's `old-bridge` from 1700, a placeholder |
| `old-bridge-broken` | 1795 to 1798 (10 February) | Turner and Rooker [S11][S5]; the timber carried away 10 February 1798 [S5] |
| `ferry` | 1798 to c. 1805 | The ferry [S5][S6]; the end an estimate, before Wood's 1812 etching [S5] |
| `old-bridge-later` | c. 1805 to 1848 | Contested form (Phase 4); taken down from April 1848 [S5] |
| `bridge-works` | 1843 to 1848 (30 January) | Jenkins's diary and Hughes [S7][S8][S9][S5]; overlaps `old-bridge-later`, which stands downstream throughout |
| `bridge` | 1848 to now | "Erected 1848" [S3]; approaches completed by 19 October 1848 [S5] |
| `old-bridge-abutment` | 1848 to now | Cadw [S3]; at the candidate place (reconstructed) |

The dates join with no gap: 1577, 1795, 1798, c. 1805, 1848, now, with `bridge-works` beside `old-bridge-later` from 1843.
Every boundary but 1798 and 1848 is approximate, and the ⓘ says so.

**The existing kits are Roman.** All ten in `src/content/kits.ts` rest on Roman-fort evidence or analogy (see
[`dinefwr-castle.md`](dinefwr-castle.md)); a timber kit reused for the 1790s repair or the 1846 centring would show Roman
evidence under an 18th- or 19th-century label, so each reuse needs a new kit or analogy text.

**Phase `bridge` (1848 to now).**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `bridge/arch` | bridge arch, semi-ellipse, centre s = 0 | Span 44.2m (documented); rise **11.58m** (Jenkins; contested with 12.65 and about 10.7); springing **about 22.9m OD** (estimate: Cadw's 14.3m total height down from the measured parapet top), so the crown soffit about 34.5m OD (estimate) | span documented (cross-checked); rise and curve contested; springing level estimated | S9, S3, S4, S1, S6, S14, S15 | `voussoir-ring` (new: rusticated, channelled, stepped; ring depth unknown, estimate 1.2m) | channelled freestone or limestone (contested), from photographs [S19][S20] |
| `bridge/spandrels` | walls over the arch to the string course, both faces | Faces at t = ±4.8 (estimate: half the measured 9.6m crest spacing), to the road less the string course | documented (one source: Cadw: "facing above with incised channelling") | S3, S15 | `channelled-ashlar` (new) | channelled ashlar |
| `bridge/piers-main` | four buttress piers, two each side at s = ±25.5, rising through the parapet | Project about 1m from the face, about 3m along the axis (measured, ±0.5m); caps to about 1m above the parapet (estimate); "broader and with rebated angles" | documented (one source: Cadw; place measured) | S3, S4, S15 | `buttress-pier` (new: rebated angles, pyramidal cap) | tooled limestone |
| `bridge/string-course` | moulding along both faces | Over the arch "bull-nosed broad", elsewhere plain, broken forward over the piers; height unknown (estimate 0.3m deep, at the road's level) | documented (one source: Cadw) | S3, S4 | `string-course` (new; a different profile from Dinefwr's roll moulding) | limestone |
| `bridge/parapet` | low wall along both sides, the whole length | 1.1m above the road (measured); thickness unknown (estimate 0.6m, which with the 9.6m crest spacing leaves about 8.4m of road, near Coflein's 7.9m); over the arch rounded (or domed capstones, contested), elsewhere ridged coping | documented (height measured; coping one source: Cadw, the main stretch's stone contested) | S3, S4, S1, S15 | `parapet-coping` (new: rounded, ridged, domed capstones) | grey limestone coping, rubble below |
| `bridge/deck` | road surface on the measured profile | Levels as measured (35.7 / 36.1 / 36.3 / 37.1 / 34.2 / 33.2m OD at s = -22 / 0 / +22 / +46 / -60 / -80); 26 ft between parapets | documented | S1, S4, S15 | none | 1848: road metal (analogy, not recorded); today: tarmac with markings (the photographs) |
| `bridge/flood-arch` | arch through the south abutment, segment-headed, centre s = -61.5 | Clear span about 6m, opening about 6m from the floodplain (25.8m OD) to the crown, so crown soffit about 31.8m OD (all estimates, from the 1928 photograph: the opening about as tall as wide, the piers about a third of its width, about 3.7m from the crown to the parapet top) | documented (place and form, one source: Cadw; place measured ±5m); size estimated | S3, S4, S15, S10 | `voussoir-ring`, `buttress-pier` | as the main arch |
| `bridge/abutment-south` | solid causeway from s = -22 to the south end, with single buttress piers | From the floodplain (25.5-26.0m) to the road; the south end at s = -81.3 (Cadw's length, an inference) and the causeway on to Ffairfach (not measured) | documented (one source: Cadw; the survey) | S3, S4, S15 | `buttress-pier`; `coursed-rubble` (shared with Dinefwr) | coursed squared rubble |
| `bridge/abutment-nw` | short wing wall at the north-west | From the springing pier to s ≈ +30 (estimate: where the west side opens) | documented (one source: Cadw) | S3, S15 | `coursed-rubble` | rubble |
| `bridge/abutment-ne` | longer rising wall up Bridge Street | To s ≈ +46 (estimate, where the lane leaves) | documented (one source: Cadw) | S3, S4, S15 | `coursed-rubble`, `buttress-pier` | rubble |
| `bridge/steps-west` | revetment with steps down to the river | West side, s ≈ +12 to +17 (measured bulge, low) | documented (one source: Cadw) | S4, S15 | `stone-stair` (shared with Dinefwr) | rubble, limestone |
| `bridge/inscription-east` | carved panel "Erected 1848" on the east parapet | Size and place on the parapet unknown | documented (one source: Cadw) | S3 | `inscription-panel` (new) | limestone |
| `bridge/panel-west` | blank panel on the west parapet | Unknown | documented (one source: Cadw); its story "is said" | S3 | `inscription-panel` | limestone |
| `bridge/plaque` | bronze plaque on the west parapet, from 1949 | About 0.6 x 0.6m (estimate from the photograph) | documented | S17, S4 | `bronze-plaque` (new, small; detail only) | bronze |

**Phase `bridge-works` (1843 to 30 January 1848).** The old bridge stands downstream (`old-bridge-later`) throughout.

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `bridge/abutment-south`, `bridge/abutment-nw`, `bridge/abutment-ne` | as Phase `bridge`, rising | Their heights through the years are **unknown** (estimate: abutments to the springing by mid-1846, when the centring went up) | documented that they were built (Jenkins, Hughes); stages imagined | S8, S9, S5 | as above | as above |
| `bridge/coffer-dams` | timber dams round the abutments' pits | Unknown | documented that they existed [S5]; form imagined | S5, S8 | `coffer-dam` (new) | timber |
| `bridge/centring` | timber frame under the arch, from summer 1846 to 30 January 1848 | The arch's span and rise; built of "couples" from templates, 29 baulks bought, ash wedges; form **unknown** (reconstructed: a trussed centring of the period, analogy) | documented that it existed and when; form reconstructed | S9, S5 | `centring` (new, with its own analogy source) | timber |
| `bridge/crane` | derrick crane on the works | Unknown | documented (21 August 1846); form imagined | S9 | `derrick-crane` (new) | timber, iron |
| `bridge/railway` | temporary railway carrying stone over the river | Unknown | documented that it existed (6 August 1846); form imagined | S9 | `tramway` (new) | timber, iron |
| `bridge/arch` | closed from 25 November 1847 | As Phase `bridge` | documented | S5 | as above | as above |

**Phase `old-bridge` (1577 to 1795) and `old-bridge-later` if seven arches are chosen.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `old-bridge/arches` | bridge with seven arches on piers with cutwaters, across the channel at the candidate line | Line across the river at E ≈ 262683 (candidate), the channel there about 52m north to south [S15]; arches about 6m, piers about 2m (estimates, to fill the channel); parapet about 10.7m above the water (from the 1840 fall; documented one source, for the later bridge) | seven arches documented; line reconstructed; every size estimated | S5, S3, S6, S8, S10, S11, S15, S17 | `cutwater` (new, from the paintings, reconstructed) | grey-brown rubble (analogy from the paintings) |
| `old-bridge/deck` | narrow road with parapets | About 3.5m between parapets (estimate: "so narrow that a carriage cannot be passed upon it ... without some danger" [S6]) | narrowness documented; width estimated | S6, S14 | `parapet-coping` (rough, analogy) | rubble |

**Phase `old-bridge-broken` (1795 to 1798).** As `old-bridge`, with spans 2-3 from the north bank replaced by a timber
trestle and footway (1795), then spans 3-5 by a longer braced gantry (from 1796).

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `old-bridge/timber-repair` | timber trestles and a deck with a handrail across the fallen spans | As the gap; posts on the river bed with rip-rap round them | reconstructed (Turner and Rooker; which spans, Hughes's reading) | S11, S5, S10 | `timber-trestle` (new, from the paintings) | timber |

**Phase `ferry` (1798 to c. 1805).** The stumps of the old bridge (how much stood is contested; estimate: the end arches
and the north abutment), a ferry boat at the crossing (imagined: its form is not recorded; analogy).

**Phase `old-bridge-later` if three arches are chosen.**

| id | Shape | Dimensions | Tier | Sources | Kits needed | Textures needed |
|---|---|---|---|---|---|---|
| `old-bridge/arches-3` | three river arches, two small flood arches at the south end | Arches about 14m each (estimate, three filling the 52m channel with two piers), flood arches about 5m (estimate); parapet about 10.7m above the water (Jenkins, 1840) | reconstructed (contested: the prints, Nicholson, Delamotte as captioned, *The Buildings of Wales*) | S12, S13, S10, S5, S14, S6, S8 | `cutwater` | rubble (analogy) |

**Phase `old-bridge-abutment` (1848 to now).** One masonry abutment on the north bank at the candidate place (about E 262683,
N 222019), about 4m wide and 4m high (estimates), overgrown; documented that it survives [S3], its place reconstructed.

**What the Blender build will need.**

1. **Bridge support in the build sheet.** ADR 0053 lists bridges among what the sheet refuses (with ruins and prisms); the
   plan model already carries a `bridge` part with `arches` of `at`, `span` and `rise`, and `archSoffit` draws a
   semi-ellipse (`src/domain/plan.ts`), which suits Jenkins's elliptic line. The build needs a bridge in the sheet, with
   the deck on a measured profile rather than one height, since the road climbs 0.6m across the arch and falls 3m along
   the south causeway.
2. **Move the arch.** The current plan's main arch is centred 26m south of the survey's (see Placement); the flood arch
   is near the right place. The `at` stays Coflein's point; the arch moves to s = 0.
3. **Per-part plans.** As the forts and Dinefwr: each part an id, a name and its own provenance, and a content test that
   requires a "one source: Cadw" note on every part marked so (S3 and S4 are one source in two texts).
4. **New kits**: `voussoir-ring`, `channelled-ashlar`, `buttress-pier`, `string-course`, `parapet-coping`,
   `inscription-panel`, `bronze-plaque`, and for the old bridge and the works `cutwater`, `timber-trestle`, `centring`,
   `coffer-dam`, `derrick-crane`, `tramway`; `coursed-rubble` and `stone-stair` are shared with Dinefwr's plan. Each
   carries its own measurements and provenance (ADR 0053, point 2), and none reuses a Roman kit without analogy text.
5. **Textures**: tooled grey limestone, channelled freestone (or limestone: contested), coursed squared rubble, the old
   bridge's rubble (analogy from the paintings), timber for the 1790s and 1840s, bronze. CC BY-SA photographs of the
   bridge [S19][S20][S21] are usable references under ADR 0026, each recorded in the asset manifest.
6. **Ground.** The DTM has no bridge or causeway in it, so the model's parts reach down to the floodplain and the river;
   the area below gives them 2m ground.
7. **A LiDAR detail area**, proposed below.

## The LiDAR area proposed

| | |
|---|---|
| id | `llandeilo-bridge` |
| name | Pont Llandeilo |
| centre | E 262757, N 222001 (Coflein's point, the arch's centre) |
| halfSize | 240 (E 262517-262997, N 221761-222241) |
| 500m tiles at 2m | two: SW corners E 262500 N 221500 and E 262500 N 222000 |
| 1km source tiles | SN6221 and SN6222, already in the region and the manifest; nothing new to download |

It covers the arch, both causeways to the edge of Ffairfach (N 221761), the north abutment and Bridge Street's foot, and the
candidate old abutment 76m downstream with 165m to spare west. Both tiles are already kept at 2m because the `llandeilo` area
(E 262180-263680, N 221486-222986) contains them, so the build is unchanged in size; the separate entry records the
landmark's own area, as the brief asks, and keeps it if the town's area ever shrinks. It sits more than 300m (the blend
margin) inside the region (E 260000-265000, N 220500-224500). The DSM tiles downloaded for measuring are not needed by the
app and were not added to the manifest: SN6221 `wg_del_26_262221_20220113dsm.tif`, SHA-256 `64fd30f16e3d16c6…`, and SN6222
`wg_del_26_262222_20220222dsm.tif`, `7c162d1ee3e7d447…` [S15].

## Sources

- [S1] Coflein (RCAHMW), "Llandeilo Bridge (New Bridge)", NPRN 43102, SN6275722001. https://coflein.gov.uk/en/site/43102/ — "crosses the Tywi River in a single 145ft span"; "constructed between 1843 and 1848, begun by Morgan Morgan and Thomas Jenkins, and completed by Edward Haycock. Its construction was supervised by William Williams"; "stone built with an elliptical headed arch and is 26ft wide"; replaced NPRN 23978; stone from Cilyrychen; quotes Lynn Hughes on the carboniferous limestone arch and the salvaged approaches; cost "exceeded £12,000"; George Eyre Evans's "the finest single-arch stone bridge in Wales"; cites Hughes, *Carmarthenshire Life*, November 2004. Same record as `victorian:S22` and `harries:S7`. Read directly 2026-10-17.
- [S2] Coflein (RCAHMW), "Llandeilo Bridge (Old Bridge)", NPRN 23978, SN6275722001, "Post Medieval, Medieval". https://coflein.gov.uk/en/site/23978/ — "New bridge (Nprn43102) replaced earlier stone (and timber) bridge, possibly of medieval origins." Read directly 2026-10-17.
- [S3] Cadw, Listed Buildings Full Report 20900, "Llandeilo Bridge (including causeways) (partly in Llandeilo community)", Grade II*, designated 14 March 1966, Dyffryn Cennen community, E 262754 N 221989. https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=20900 — designed 1843 by William Williams "to replace a 7-arch bridge whose abutment can be seen on the N bank just downstream"; first stone 1844; flood 1846; Morgan Morgan failed, Williams died, completed by Edward Haycock at £22,000 in 1848; "third largest single arch bridge in Britain and the largest in Wales"; "a single graceful broad arch of 44.2m span, rising 12.65m to a total height of 14.3m and a total length of 110.64m including very long abutment on the Ffairfach side and short NW and longer rising NE abutments"; the materials, piers, string courses, parapets, flood arch, steps and inscriptions as quoted; sources W. Samuel 1888 p. 8, Jervoise pp. 74-5, Thomas Lloyd. Same report as `victorian:S21`. Read directly 2026-10-17.
- [S4] Cadw, Listed Buildings Full Report 11040, "Llandeilo Bridge (including Causeway)", Grade II*, designated 14 March 1966, Llandeilo community, E 262759 N 222009. https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id=11040 — "A substantial road bridge of 1848 by W Williams of Llandeilo replacing an earlier bridge downstream"; £22,000 against £6,000; "Twin carriageway stone bridge. Single graceful 145 ft wide depressed arch with stepped freestone voussoirs. Coursed squared rubble masonry. 2 order buttresses at springing points rise through parapet"; buttresses along the causeway from Ffairfach and up Bridge Street; revetment and steps to the west; "Freestone parapet over string course with domed capstones on bridge"; the flood arch; the bronze plaque. Same report as `models:S34`. Read directly 2026-10-17.
- [S5] Lynn Hughes, "Llandeilo Bridge - History" (*Carmarthenshire Life*, November 2004; from his work in progress *Towy: The Biography of a River*), on llandeilo.org. https://llandeilo.org/bge_history.html — the medieval seven-arch bridge, "a fair assumption" of Sir Rhys ap Thomas after 1485; Lambarde's 1577 and Bowen via Jervoise; "Before 1730 ... another at Llandeilo of seven arches"; Turner 1795 (spans 2 and 3 down) and Rooker 1796-97 (3, 4 and 5 down), timber repairs; 10 February 1798 flood and ferry; Wood's 1812 etching; Rees (as "1813", without "of modern erection"); the 1840 accident; Nicholson's three arches called a confusion; work from 4 July 1843, pits upstream of the old bridge; foundation stone "3 pm on December 3, 1845"; the flood "22 October, 1845"; abutments on rock and on piles; the 1846 damage to the old bridge's north-east pier; the keystone 3 pm 25 November 1847; the old bridge dismantled from April 1848; the approaches completed by 19 October 1848; the Cilyrychen limestone arch. Secondary, no footnotes. Same page as `effects:S6`, `victorian:S69` and `models:S35`. Read directly 2026-10-17.
- [S6] E. Jervoise, *The Ancient Bridges of Wales and Western England* (Architectural Press, 1936), pp. 74-75, transcribed on llandeilo.org. https://llandeilo.org/bge_jervoise.html — "one segmental arch, bears the date 1848"; George Eyre Evans; Rees (c. 1819): "a substantial stone one of modern erection, but built with shameful disregard to public convenience ... so narrow that a carriage cannot be passed upon it, either on foot or on horse back without some danger"; Jenkins's foundation stone, 3 December 1844; the 1846 flood and "a rope over the parapet of the old bridge"; Bowen's "handsome stone Bridge"; "At the end of the eighteenth century there was evidently only a ferry"; "According to Lambarde, there had been a stone bridge at Llandilo in 1577". Same transcription as `models:S36`. Read directly 2026-10-17.
- [S7] Thomas Jenkins's diary, 1846-1850, transcribed on llandeilo.org (Terry Norman and Andy Mabbutt) from *The Diary of Thomas Jenkins of Llandeilo*, ed. D. C. Jenkins (1986), "Crickets, Premonitions, Birth, Death and Romance". https://llandeilo.org/tj_crickets.html — 20 February [1846] "Drew the elliptic line for the new bridge, full size, Span 145 ft, Raise 38 ft"; 22 October the flood and the centre; 11 November the old bridge "cracked through" and a coffer-dam round "the damaged pier"; 27 and 30 January [1848] the centring. Same page as `effects:S2`. Read directly 2026-10-17.
- [S8] Thomas Jenkins's diary, 1840-1845, transcribed on llandeilo.org, "Caves, Castles, Rebecca Riots, Leeches and Scarlet Fever". https://llandeilo.org/tj_caves.html — 8 March [1840]: the phaeton "over the parapet of the bridge ... The height of the fall is about 35 ft." with the gloss "(This bridge was about 250 feet further down the hill from the present one but was extremely narrow with no room for a pedestrian to pass a carriage.)"; 27 September, a pump for "the intended Llandeilo new bridge"; 2 December, "4'' of oak planking on 12'' square bearing beams for the south abutment"; 3 December [1844], "The foundation stone was laid this evening at 3:15 p.m." Same page as `effects:S1`. Read directly 2026-10-17.
- [S9] llandeilo.org, "Building of Llandeilo Bridge" (Jenkins's diary entries on the bridge, with commentary). https://llandeilo.org/bge_jenkins.html — pumps, the stone-testing machine, a pile engine 27 ft high with a 1,000 lb ram; the south abutment's planking; 3 December foundation stone; 20 February elliptic line; templates and the centring from 20 April and 8 May; 800 ft and 29 baulks of timber; ash for wedges; 6 August "the temporary railway used to carry stone over the river for the bridge"; 21 August a derrick crane; 3 September "Commenced fitting up the centering for the arch"; 22 October the flood; 23 October management to Haycock, who receives "£4,000 additional and the materials of the old bridge"; 11 November the old bridge's pier; 27 January the centring lowered; the keystone 25 November 1847 (commentary). Same page as `effects:S5`. Read directly 2026-10-17.
- [S10] llandeilo.org, "Llandeilo Bridge: Pictorial History, Gallery". https://llandeilo.org/bge_gallery.html — captions: the seven-arch bridge "built in the early 1500s ... probably ... Sir Rhys ap Thomas", "swept away" by a flood in 1798, a view "by Nicholas Pocock around 1789"; Turner 1795; Rooker 1796; a ferry and "a new three-arch bridge ... built in the early 1800s, as shown in this drawing of 1816 by Frenchman George Orleans Delamotte. The two arches (voids) on the Ffairfach (south) bank are for flood release"; Nicholson's engraving "the three arches in 1840"; a 1998 aerial view with "its single flood-release void (far left) on the Ffairfach (south) side"; D. C. Harries's 1928 photograph of a bus "crashed through the parapet just above the flood-release void". Images viewed, not copied; attributions unverified. Read directly 2026-10-17.
- [S11] Amgueddfa Cymru – Museum Wales, J. M. W. Turner, "Llandilo Bridge and Dynevor Castle", NMW A 1738, "1796 ca", watercolour with scratching out on paper, purchased 1938. https://museum.wales/collections/online/object/1b1acb03-dd2d-3ac6-b2b9-29add1d26b51 — record read directly 2026-10-17; the painting viewed as reproduced on llandeilo.org (`bge_history.html`): stone arches with cutwaters, a timber trestle and footway across the gap, the castle above.
- [S12] National Library of Wales, "Llandilo Bridge, South Wales", print, circa 1824, via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Landilo_Bridge,_South_Wales.jpeg — public domain; viewed: three arches, houses on a steep bank to the left, cattle in the river. Copied to `refs/llandeilo-bridge/`.
- [S13] National Library of Wales, "Llandilo Bridge, Vale of Fowey [sic], Sh. Wales", print, 1824, via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Llandilo_Bridge,_Vale_of_Fowey,.Sh.Wales.jpeg — public domain; viewed: the same composition as S12, three arches. Copied to `refs/llandeilo-bridge/`.
- [S14] Wikipedia, "Llandeilo Bridge". https://en.wikipedia.org/wiki/Llandeilo_Bridge — lead only: cites Lloyd, Orbach and Scourfield, *The Buildings of Wales: Carmarthenshire and Ceredigion* (2006), p. 250, for "a previous three-arched bridge ... that had, in turn, replaced the medieval seven-arch bridge which had collapsed in 1795", the old bridge "not even wide enough for a horse and cart", Haycock from 1846 and £23,000; and Cragg (ed.), *Civil Engineering Heritage: Wales and West Central England* (1986), pp. 77-78, for "rising 35 ft (10.5m) above it" and "chisel- or hammer-dressed masonry, while the voussoirs of the arch are lengthy and finished with ashlar"; "143 ft (43m)" citing the listing. Neither book read. Read as raw wikitext 2026-10-17.
- [S15] Welsh Government LiDAR, 2020-22 national survey, 1m DSM tiles SN6221 (`wg_del_26_262221_20220113dsm.tif`, SHA-256 64fd30f16e3d16c6e9477b9578a16d904225e2865b3a28534a5fe6fba3fab740) and SN6222 (`wg_del_26_262222_20220222dsm.tif`, SHA-256 7c162d1ee3e7d4476292a28f8090d3d612fe5593ab453052dc472dae4b8587e4), and the 1m DTM of the same tiles (see [`../data/lidar.md`](../data/lidar.md)), DataMapWales; Open Government Licence v3. https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dsm/wg_del_26_262222_20220222dsm.tif — measured 2026-10-17 by Claude: the axis fitted to the parapet crests, the crest spacing, road and parapet heights along the axis, the side bulges of the piers, the banks and the interpolated water, the north bank's change at E 262683.
- [S16] Bryn Thomas, *The Good Old Days*, extracts on llandeilo.org. https://llandeilo.org/good_old_days.html — "In 1750 the Tywi Bridge consisted of four narrow stone arches. These were swept away by tree trunks brought down by great floods and ice"; the bridge "built in 1848 at a cost of £22,000, by Mr. Morgan Morgan"; Thomas Thomas, "Master Mason on the bridge"; stone "for the buttresses" from "a quarry about 50 yards from the signal box"; the bus crash, "Nov 12". (`victorian:S66` attributes the 1750 sentence to Gwilym Teilo, 1858, via the same page; the page read names Bryn Thomas as the source of its extracts.) Read directly 2026-10-17.
- [S17] Centenary plaque on Llandeilo Bridge, photographed by Jaggery, 26 June 2011, Geograph 2479213, via Wikimedia Commons, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Centenary_plaque,_Llandeilo_Bridge_-_geograph.org.uk_-_2479213.jpg — read from the photograph: a relief of a seven-arched bridge, "OLD BRIDGE LLANDILO 1779", "THIS SINGLE ARCH BRIDGE OF 145 FEET SPAN WAS ERECTED IN 1848 TO REPLACE THE OLD SEVEN ARCH BRIDGE. ARCHITECT - W. WILLIAMS", "PRESENTED BY B.T. THOMAS, ESQ. ... 1948-49 TO COMMEMORATE THE CENTENARY OF THE ERECTION OF THE BRIDGE".
- [S18] Ordnance Survey 25-inch map, as tiled by the National Library of Scotland (edition not identified here). https://mapseries-tilesets.s3.amazonaws.com/25_inch/wales/18/128162/86732.png — viewed 2026-10-17: "Llandilo Bridge", the causeway to Bridge Farm and Ffairfach, "B.M. 120.8" at the north end, Moreb on the north bank; no old bridge or abutment marked.
- [S19] "Single-span arch, Llandeilo Bridge", photograph by Jaggery, 26 June 2011, Geograph 2479206, via Wikimedia Commons, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Single-span_arch,_Llandeilo_Bridge_-_geograph.org.uk_-_2479206.jpg — viewed: from the south-west field, the flood arch between its buttress piers and the main arch beyond, channelled masonry, the parapet.
- [S20] "Llandeilo, Carmarthenshire, bridge, the longest single span stone bridge in Wales", photograph by Ken Day, 28 July 2014, via Wikimedia Commons, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Llandeilo,_Carmarthenshire,_bridge,_the_longest_single_span_stone_bridge_in_Wales.jpg — viewed: under the arch from the river, the soffit's coursed stone, the springing at the water's edge on rock and rip-rap.
- [S21] "Pont Llandeilo", photograph by Alan Bowring, 20 June 2007, Geograph 472194, via Wikimedia Commons, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Pont_Llandeilo_-_geograph.org.uk_-_472194.jpg — viewed: the arch from the north bank, channelled spandrel, a springing pier, the riffle under the arch. (The 1928 photograph of the bus over the flood arch, D. C. Harries, People's Collection Wales 2282156, was viewed as reproduced on llandeilo.org [S10]; see [`dc-harries-photographs.md`](dc-harries-photographs.md).)
