---
title: Effects per key event - what the scene can honestly show and hear
kind: research
status: draft
updated: 2026-10-02
---

Independently checked 2026-10-02 (see [reviews/event-effects-check-2026-10-02.md](reviews/event-effects-check-2026-10-02.md)); corrections applied.

# Effects per key event

Research for the "Sound and effects per event" idea in
[`docs/design/timeline-experience.md`](../design/timeline-experience.md) (section 3): for each key
date in `src/content/events.ts`, what the scene could honestly show or play at that moment, the
season and time of day where a source gives them, and how strong the evidence is. Written
2026-10-02 from sources fetched that day. The brief is in
[`briefs/event-effects.md`](briefs/event-effects.md).

**Tiers used below.** *Documented*: a source read here records the thing itself (a flood, a peal of
bells, a gate pulled down at night). *Reconstructed*: the thing is not recorded for this moment, but
it is inferred by analogy from something that is (say what). *Not supportable*: nothing read supports
an effect, so the app should show nothing beyond the ordinary era scene. Citations of the form
[victorian:S9] point into the other research notes; bare [S1] points into this note's own list.

## Summary

- **Six events have documented, local, moment-specific effects**: the 1287 siege of Dryslwyn
  (siege engine, undermining, a wall falling on the besiegers, late summer); Glyndŵr in July 1403
  (Llandeilo and Newton burned "lately" by about 13 July, an inundation on an unnamed river, Owain
  lodged in the town on the night of 3 July; *Corrected 2026-10-02 (independent check)*: the burning is not tied to that night, and the
  river is not named); the Walk
  Gate in August 1843 (a night attack by about 60 disguised men, over in 15 to 20 minutes); the
  bridge (the Tywi in winter flood carrying off the already-lowered timber centring, 9 pm, 30
  January 1848; *Corrected 2026-10-02 (independent check)*: the arch was standing); the
  church reopening (Thursday 10 October 1850: shops shut, streets quiet, nearly 2,000 in church);
  and the railway (Tuesday 20 January 1857: rain and sleet, then sun on snow-capped hills, cannon,
  bells, bands, flags, a procession).
- **Two more have documented but thin effects**: the 1282 ambush (mid June; one chronicle
  tradition has the English attacked "from the hiding places of the woods and the marshes" while
  busy with plunder, the other "in a certain narrow way"; *Corrected 2026-10-02 (independent check)*: single-tradition per detail, and the
  woods-and-marsh phrase is a stock phrase, so the topography is reconstructed) and the 1462 slighting of Carreg Cennen (500 men, picks and crowbars, four months).
- **The prehistoric events can carry documented climate and landscape** (Younger Dryas cold and
  cirque glaciers; heath fires at Waun Fignen Felen), but no moment-specific effect.
- **Everything else should show nothing special.** Founding a church or castle, a charter, an Act,
  a sale or a survey leaves no recorded sound or sight. Building work can be *reconstructed* by
  analogy where the app wants it.
- **Bells.** The first bells actually heard ringing at Llandeilo in anything read here are the
  "merry pealing of bells" that greeted the first train in January 1857 [S7]. No bell is recorded
  for St Teilo's or Talley in the Middle Ages in any source read. Teilo's miraculous bell is a
  12th-century legend [S18]. A local claim that Talley's great bell became Exeter's "Great Tom" [S19]
  does not survive a check: the curfew bell called Great Tom is at Christ Church, Oxford, and came from
  Osney Abbey [S20].
- **Corrections found in passing** (for whoever owns those files): the "two men
  captured with yeomanry assistance" in `era-victorian.md`'s Walk Gate row belong to a different gate
  near Narberth in the same newspaper column [S9] (applied to `era-victorian.md` on 2026-10-02); two
  newspapers put the Walk Gate attack on the night of 7 to 8 August 1843, not 9 August [S8][S9] (that
  note now records both dates; *Corrected 2026-10-02 (independent check)*: only the Welshman pins it to Monday to Tuesday, the Merlin may say
  Sunday); the 1287 "tunnel collapse" in
  `events.ts` is, in the sources, a wall that fell on men inspecting the undermining [S16a][medieval:S23];
  and Coflein says Glyndŵr *took* Carreg Cennen in 1403 [S17], where `events.ts` says "the castles held".

## The table

Season and hour are only given where a source supports them. "Unknown" means the sources read are
silent, not that the app must leave them unset; it may keep its defaults.

| Event id | Proposed effect | Season, time of day | Tier | Sources |
|---|---|---|---|---|
| `people-return` | None for the moment. Late-glacial landscape only (open, cold, sparse) | Unknown | Not supportable (as an effect) | [timeline:S1] |
| `younger-dryas` | Cold (about 5 degrees colder in Britain): snow cover, small cirque glaciers in the high cwms of the Black Mountain (Llyn y Fan Fach), lowland permafrost. Wind and drifting snow on a given day are reconstructed (*Corrected 2026-10-02 (independent check)*: 2 to 6 degrees is Europe's figure; "north-facing" and tundra dropped as unsourced) | Winter look is a fair default; no day is recorded | Documented (climate); reconstructed (weather) | [deeptime:S1][deeptime:S8] |
| `mesolithic-burning` | Smoke from heath and birch fires at Waun Fignen Felen, distant on the eastern horizon, about 4 km outside the circle (*Corrected 2026-10-02 (independent check)*: 20.1 km from the map centre, not "at the eastern edge") | Unknown | Documented (the burning); reconstructed (how the smoke looked) | [deeptime:S12] |
| `garn-goch-cairn` | None | Unknown | Not supportable | [timeline:S4][timeline:S5] |
| `bronze-cairns` | None | Unknown | Not supportable | [timeline:S7] |
| `garn-goch-fort` | Hearth smoke from roundhouses (already built) | Unknown | Reconstructed (from roundhouse archaeology elsewhere; Garn Goch is unexcavated) | [ironage:S1][timeline:S10] |
| `roman-forts` | None special. A garrison's smoke and noise would be reconstructed only | Unknown | Not supportable (as an event effect) | [timeline:S15] |
| `st-teilo` | At most a handbell, labelled as legend: the 12th-century Life gives Teilo a bell that "sounded every hour, without any one moving it" | Unknown | Reconstructed (legend, written 600 years later) | [S18][timeline:S19] |
| `surexit` | None | Unknown | Not supportable | [medieval:S6] |
| `rhys-ap-tewdwr` | None at Llandeilo (he died near Brecon). The Brut's entry two years on (filed 1093; *Corrected 2026-10-02 (independent check)*: not "the next entry") says the French devastated the Vale of Tywi; burned farms would be a documented-but-undated aftermath | Unknown; the Brut gives no date for his death | Not supportable (moment); documented, single-source (aftermath) | [S13][timeline:S28] |
| `dinefwr-castle` | Building work (masons, timber scaffold) if wanted | Unknown | Reconstructed (the building is documented, not how it sounded) | [timeline:S34] |
| `talley` | Building work; plainchant. No bell is recorded | Unknown | Reconstructed (from the canons' documented presence) | [medieval:S17][S19][S20] |
| `dryslwyn` | Building work, as above | Unknown | Reconstructed | [medieval:S21][medieval:S22] |
| `english-1277` | None | Unknown | Not supportable | [timeline:S26][timeline:S37] |
| `battle-1282` | Restrained distant fighting: men breaking out of cover onto a narrow road, horses, shouting, a rout. No dust: no weather is recorded | Summer (16 June by the Welsh annals); time of day unknown | Documented, cross-checked: an ambush with heavy losses and Valence's son killed. Single-tradition per detail: the narrow way (Chester), plunder (Oseney only), woods and marshes (Wykes/Oseney, a stock phrase, so the ground is reconstructed); reconstructed (the sound). *Corrected 2026-10-02 (independent check)*: was "documented" for every detail | [S14][S15][classes:S2][medieval:S28] |
| `dryslwyn-siege` | Trebuchet throwing stone shot (balls over 16 inches found), undermining at the walls, a section of wall falling, arrows | Late summer: from about 1 August (Welsh annals) or 15 August (Cadw guidebook) to 5 September 1287; time unknown | Documented, cross-checked (machine, mining, collapse) | [S16a][medieval:S21][medieval:S23][classes:S2] |
| `carreg-cennen-giffard` | Building work | Unknown | Reconstructed | [timeline:S37] |
| `glyndwr` | Llandeilo and Newton burning (smoke over the town), some time in the first half of July; an inundation (river not named; a Tywi flood is reconstructed); a rebel host besieging Dinefwr from Monday 2 July; Owain lodged in Llandeilo on the night of Tuesday 3 July. *Corrected 2026-10-02 (independent check)*: the burning is not tied to that night, and the 300 rebels were left round Llandovery castle, not Dinefwr | Summer, early July 1403; night of Tuesday 3 July for the lodging only | Documented (letters written that month) | [S11][S12] |
| `carreg-cennen-slighted` | Men with picks and crowbars, falling masonry, dust | Unknown (months not recorded) | Documented, single-organisation (Cadw; Wikipedia cites Lewis 2006 for the 500 men). Cadw has capture by Sir Roger Vaughan in 1462; Wikipedia has surrender forced by Mortimer's Cross, 1461 (citing Morgan 2008) (*Corrected 2026-10-02 (independent check)*: added) | [S17b][timeline:S36][timeline:S37] |
| `bosworth` | None locally | Summer (22 August 1485), but the event is elsewhere | Not supportable | [timeline:S44] |
| `acts-of-union` | None | Unknown | Not supportable | [timeline:S42] |
| `newton-house` | Building work if wanted | Unknown | Reconstructed | [timeline:S45] |
| `paxtons-tower` | Building work if wanted | Unknown | Reconstructed | [timeline:S52] |
| `rebecca` | Night. A band of about 60 disguised, armed men at the Walk Gate; axes and bars; gate and toll-house down in 15 to 20 minutes; the keeper running to an inn; dragoons riding out too late to ruins. No fire at this gate. Ricks burning on the Dynevor estate later the same month | Summer; night of Monday 7 to Tuesday 8 August 1843 (the Welshman; the Merlin's OCR may read Sunday) or 9 August (diary) (*Corrected 2026-10-02 (independent check)*: only the Welshman pins Monday to Tuesday) | Documented, cross-checked (night, numbers, speed, dragoons); not supportable (torches, flames at this gate); the quick, quiet scene is reconstructed by analogy from Samuel's general description | [S8][S9][S1][victorian:S9][victorian:S4] |
| `bridge` | The Tywi in flood at night sweeping off the bridge's already-struck wooden centring, the new arch standing. Earlier floods took part of it with five men aboard (October 1846) | Winter; 9 pm, Sunday 30 January 1848 | Documented, single-source for the day (Jenkins's diary), dated 30 January by S5 too. *Corrected 2026-10-02 (independent check)*: not contradicted by Hughes, who gives no date; his "three days later" matches the diary's 27 to 30 January | [S2][S5][S6] |
| `church-rebuilt` | A quiet, crowded town on a holy day: shops shut, no revelry, gentry and clergy arriving, nearly 2,000 in church; services at 11, 2.30 and 6, in English and Welsh. No bells reported | Autumn; Thursday 10 October 1850, all day | Documented, single-source (one newspaper) | [S10][victorian:S23] |
| `railway` | Heavy rain then sleet, clearing to sunshine as the train arrives; hills lightly snow-capped, rainbows, swollen streams, bare trees. Two engines wreathed in laurel, 13 crowded carriages. Cheers, cannon, pealing bells, bands, banners, a procession in sashes, two arches, crowds in holiday clothes. A ball until the small hours | Winter; Tuesday 20 January 1857, early afternoon arrival (the train left Llanelli at 12.30) | Documented (newspaper); the date and the public breakfast cross-checked with Jenkins's diary | [S7][S4][victorian:S29] |
| `guardianship` | None | Unknown | Not supportable | [timeline:S37] |
| `national-trust` | None | Unknown | Not supportable | [timeline:S45] |
| `roman-forts-found` | None | Unknown | Not supportable | [timeline:S15] |

## Detail per event

### Prehistory: `people-return`, `younger-dryas`, `mesolithic-burning`, `garn-goch-cairn`, `bronze-cairns`, `garn-goch-fort`

Written from the existing notes, without new search. The deep-time note documents the Younger
Dryas (Loch Lomond Stadial, about 12,900 to 11,700 years ago) as a cooling, with small glaciers
reforming only in the high cwms [deeptime:S1][deeptime:S8]. *Corrected 2026-10-02 (independent check)*: the 2 to 6 degrees is the
source's figure for Europe; for Great Britain it has "Icefields and glaciers formed in upland
areas ... while many lowland areas developed permafrost, implying a cooling of −5 °C"; tundra is
not stated for Britain. The named cirque moraines include "the features around Llyn y Fan Fach",
on the Black Mountain, dated "between 12,900 and 11,500 years ago"; "north-facing" is not in the
source and is dropped. That supports a cold, snowy look for the whole span; a particular
blizzard is weather, and weather on any one day is reconstructed. At Waun Fignen Felen,
"dated palaeoecological evidence" shows heath and birchwood being burned in the Mesolithic
[deeptime:S12]. The fires are documented; their season and the look of the smoke are not.
*Corrected 2026-10-02 (independent check)*: the site (Coflein SN 82500 17840) is 20.1 km from the map centre, about 4 km outside the
16.1 km circle, so the smoke belongs distant on the eastern horizon, not "at the eastern edge". The
cairns are undated and unexcavated [timeline:S4][timeline:S5][timeline:S7]: there is no event to
show. Garn Goch is unexcavated too, so roundhouse hearth smoke there rests on analogy with
excavated roundhouses elsewhere [ironage:S1].

### `roman-forts` and `roman-forts-found`

The forts are known from geophysics, fieldwalking and a 2005 evaluation [timeline:S15]. Nothing
read records an event that could be seen or heard. Show the forts, not an effect.

### `st-teilo` and bells at St Teilo's

The Book of Llandaff's Life of St Teilo (12th century, edited and translated 1840) says that in
Jerusalem Teilo was given "a Bell that was more famous than great ... it exceeded every organ in
sweetness of sound; it condemned the perjured, it healed the sick, and ... it sounded every hour,
without any one moving it, until being prevented by the sin of men" [S18]. The Dictionary of Welsh
Biography treats this Life as unreliable legend [timeline:S19]. The same book describes bells in
12th-century Llandaff ritual ("the holy cross preceding with sounding bells"; cursing with "inverted
bells") [S18], which is evidence for Llandaff then, not Llandeilo in the 6th century. **Tier:
reconstructed, shown as legend.**

When St Teilo's tower first had bells is not recorded in anything read. The tower is dated c. 1600
[victorian:S23]; *Corrected 2026-10-02 (independent check)*: the same Coflein record also calls it a "fifteenth century west tower", so the
date is contested (15th century or c. 1600) [medieval:S57]. The first bells heard at Llandeilo in a source read here are those that pealed for
the first train on 20 January 1857 [S7]. The 1850 reopening report mentions no bells [S10].

### `surexit`, `rhys-ap-tewdwr`, `english-1277`

Nothing visible or audible is recorded for the writing of the Surexit memorandum. Rhys ap Tewdwr died
near Brecon, outside the circle. The 1860 Rolls Series Brut (its years run behind; it files his death
under 1091) gives no day or season for his death. Its entry two years on (filed 1093, after the 1092
entry on William Rufus in Normandy) says: "The ensuing year, the French devastated Gower, Cydweli,
and the Vale of Tywi" [S13] (*Corrected 2026-10-02 (independent check)*: the note said "its next entry"). That is a documented, if undated, aftermath
in this valley, **single-source**, and worth a note rather than an effect. (A manuscript variant on
the same page, "a little before the calends of May", belongs to Cadwgan's raid on Dyfed, not to
Rhys's death.) For 1277 no source read describes anything seen or heard locally. The Rolls Series
Brut ends in spring 1282, before the battle [S13].

### `dinefwr-castle`, `talley`, `dryslwyn`, `carreg-cennen-giffard`, `newton-house`, `paxtons-tower`

These are building events. The buildings are documented; the sound of building is not. If the app
wants masons and scaffolding, label them reconstructed. For Talley, plainchant follows from the
canons' documented presence [medieval:S17] but is still reconstructed. **No bell at Talley is
recorded** in anything read. A local-history page says that "at the Dissolution of the Monasteries in
1533 the great bell of the Abbey had been taken away to Exeter Cathedral where, as 'Great Tom', it
still rings curfew" [S19]. The curfew bell known as Great Tom is at Christ Church, Oxford, and "was
removed from Osney Abbey in 1546" (National Archives catalogue title, seen as a search result only)
[S20]; Wikipedia's *Tom Tower* agrees it was "moved from the 12th-century Osney Abbey after the
dissolution of the monasteries" [S23]. Exeter Cathedral's own page says its great bell is "Peter",
"re-cast in the late 17th century, to replace one given by Bishop Peter Courtenay in the 1480s"
[S22] (*Corrected 2026-10-02 (independent check)*: added as further evidence against the Talley claim). The Talley claim looks garbled and
is **not supportable** without a better source.

### `battle-1282`

What the primary chronicles read here actually say:

- **Annales Cambriae**: William de Valence the younger, heir of Pembroke, was killed "in Estratewy
  XVI Kalendas Julii", that is in Ystrad Tywi on 16 June [classes:S2], confirmed in the same text
  fetched for this note.
- **Annales Cestrienses** (Chester): "In the same year William de Valence ... was slain, and many
  others with him, in a certain narrow pass in South Wales" ("in quadam angusta via in Suth Walia"),
  with **no date**. The only 16 June in its 1282 entry is the day Edward I "pitched his tent at
  Newton, between Chester and Hawarden" [S14]. A summary that cites the Chester annal for a 16 June
  battle [medieval:S52] may be conflating the two; the date itself still stands on Annales Cambriae.
- **Wykes and the Oseney annals** (two closely related texts): some of the king's men, "having gone
  too far, were busy taking plunder, and behold the Welsh, bursting out of the hiding places of the
  woods and the marshes" ("de latibulis silvarum et paludibus erumpentes"), attacked the English, who
  were very few by comparison. William de Valence's son and Richard de Argentein were killed, "the
  rest barely escaping by flight, many however being inhumanly killed" [S15]. Neither text names
  Llandeilo in this passage.

So: **documented, cross-checked** across two chronicle traditions (Chester; Wykes/Oseney) only that
William de Valence's son was killed with heavy losses. *Corrected 2026-10-02 (independent check)*: the note called the whole picture
cross-checked; each detail is single-tradition. The narrow way is Chester's alone; woods and marsh
are Wykes/Oseney's (two related texts); the plunder is Oseney's alone (Wykes has none). "De latibulis
silvarum et paludibus" is also the Oseney chronicler's stock phrase: he uses it almost word for word
for the 1257 defeat at Cymerau ("qui de latibulis silvarum et paludibus inopinate prosiluerunt"), so
a wooded, marshy ambush ground is **reconstructed**, not documented topography. Neither Wykes nor
Oseney places the fight in South Wales. Season: **summer, mid June**. Time of day and weather: **not recorded** in
anything read, so "dust on the road" in the design table is unsupported and should go. The sound
(shouts, horses, a rout heard from a distance) is reconstructed, and the design's "kept restrained"
fits the evidence.

### `dryslwyn-siege`

- **Annales Cambriae, 1287**: the English "besieged the castle of Rhys at Dryslwyn about the gule of
  August" (1 August), "and at last took the castle by undermining the walls, in which undermining the
  lord William de Montchensy, baron, was crushed under the wall with many others" [classes:S2],
  checked against the same text for this note.
- **Cadw guidebook text** (via castlewales.com): writs sent 16 July; Earl Edmund left Carmarthen 9
  August with about 4,000 men, joined about 15 August by 6,700 more; a trebuchet "constructed with
  timber, hides, rope, and lead, cost £14"; "20 quarrymen and 24 carters were employed to shape and
  move the large stone balls"; besiegers "attempting to undermine the castle walls", and "tradition
  records that they brought down a large section near the projecting chapel block"; "the mining was
  marred by the collapse of a wall, crushing to death a group of nobles who were inspecting the work,
  including the earl of Stafford, Sir William de Monte Caniso, and Sir John de Bonvillars"; captured
  by 5 September. Excavation found two stone balls "over 16 inches", smaller thrown stones, mail
  links, arrowheads, slingshots and a spearhead [S16a][medieval:S23].
- **Cadw's own page**: the siege "lasted two weeks as siege engines and sappers ... chipped away at
  the fortress's defences. The attackers eventually brought down a large section of the walls" [medieval:S21].
- **Gatehouse Gazetteer**: "after a three-week siege the castle was taken" [S16].

**Tier: documented, cross-checked** for the siege engine (Cadw guidebook, Cadw page, excavated shot),
the undermining and the wall falling on the besiegers (Annales Cambriae and the Cadw guidebook,
independent). Season: **late summer**, from about 1 or 15 August to 5 September. Time of day:
**unknown**.

**Contradictions, side by side.** Start: "about the gule of August" (Annales Cambriae) or "on or just
after 15 August" (Cadw guidebook). Length: "two weeks" (Cadw page), "three-week" (Gatehouse), or
about three weeks from 15 August to 5 September (guidebook). The victim: the guidebook's "earl of
Stafford" is Nicholas de Stafford, whom a search summary of genealogy pages says died "1 August
1287" while "inspecting a mine" [S21]; the Annales Cambriae names only William de Montchensy. The
earldom of Stafford was later (1351, per the same search summary), so "earl" is probably the
guidebook's slip; unverified here (the medieval note's independent check of 2026-10-02 confirms the
1351 earldom from Wikipedia [medieval:S59][medieval:S60]; S21 itself was not re-checked). And `events.ts` says "a tunnel collapse": both primary and guidebook
say a **wall** fell on men at the mine. The effect should show a wall section coming down, not a
tunnel caving in.

### `glyndwr`

Letters written that week, printed with translations in Hingeston's *Royal and Historical Letters*
(1860) [S11]:

- **John Faireford, receiver of Brecon, Wednesday [4 July 1403]**: Jenkin Havard, warden of Dinefwr,
  reports that Rhys ap Gruffudd, Henry Dwnn and others "were on Monday last treasonably rising in the
  plain country ... and have laid siege to the said Castle [Dinefwr] with a great force of rebels".
  Men at Llandovery report that Glyndŵr "was at Llandovery on Tuesday", and "three hundred of the
  rebels were at their ease, lying round the siege of the same Castle, and at night were lodged at
  Llandeilo". *Corrected 2026-10-02 (independent check)*: the French ("le Mardy fuist a Llamendevery ... et CCC de les rebelles ad lesse
  gisantz entour la sege de mesme le Chastiell et le noet fuist loggez a Landeilo") has singular
  verbs: Owain was at Llandovery on Tuesday, **left** 300 rebels round the siege of Llandovery
  castle, and was himself lodged at Llandeilo that night. The 300 were not round Dinefwr; the siege
  of Dinefwr rests on Havard's report of Monday 2 July (Rhys ap Gruffudd, Henry Dwnn and others).
  Griffiths reads it as "Glyndwr and 300 rebels had surprised Llandovery's garrison ... and that night
  they lodged at Llandeilo" [S12].
- **Hugh de Waterton to the king**: the bearer of a letter from Llandovery reported "that your rebels
  in those parts have lately burned the towns of Llandeilo and Newtown, and have made a great
  destruction in those parts ... as far as your Lordships of Iskennen and Kidwelly, ... and were about
  to have entry to destroy your said Lordships, but that they were impeded by an inundation" ("un
  cretyn de ewe", a flood). Hingeston dates this letter "13 (?) July, 1403" [S11], so the burning
  was reported "lately" by about 13 July; *Corrected 2026-10-02 (independent check)*: it is not tied to the night of 3 July. No river is
  named; the flood stopped the rebels entering Iskennen and Kidwelly.
- **John Scudamore**, writing "at the Castel of Carreckennen, the V. day of Juil": Glyndŵr lay the
  night before at Dryslwyn, and refused Scudamore a safe-conduct to send away his wife and her mother
  (quoted in the editor's preface).

Ralph Griffiths's history, quoted on a local-history site, tells the story from the same letters:
Glyndŵr appeared on 2 July, "the towns of Llandovery and Newton had been burned by the rebels",
"only severe flooding was temporarily hindering their progress", the besiegers numbered "about 8,240
spears", the towns of Llandeilo Fawr and Newton were "largely destroyed in July 1403", and "Dinefwr
castle does not seem to have fallen" [S12]. **Discrepancy, side by side** (*Corrected 2026-10-02 (independent check)*: added): Griffiths has
"the towns of Llandovery and Newton had been burned" [S12]; Waterton's letter has "burez les villes
de Landylo et Newtoun" (Llandeilo and Newtown) [S11]. Griffiths's own closing line names Llandeilo
Fawr, so both readings are in S12.

**Tier: documented**, from contemporary letters; the burning of Llandeilo is in one letter reporting
a messenger's word, with Griffiths as the secondary reading (not independent of the letters). Season:
**summer, first half of July**, and an inundation (river not named; a Tywi flood is
**reconstructed**). Time of day: Owain lodged at Llandeilo **at night** on Tuesday 3 July; the
burning has no recorded night or day. The proposed effect is smoke from a burning town, a swollen
river, and a host's camp fires round Dinefwr (*Corrected 2026-10-02 (independent check)*: the burning is no longer set at the night of 3
July, and the river is labelled reconstructed). Note that the strongest local evidence is about **Dinefwr and
Llandeilo**, while the event is filed under Carreg Cennen.

**Contradiction: did Carreg Cennen fall?** Coflein: "In 1403 Carreg Cennen was taken by Owain
Glyndwr", and the record's stated source is Lewis, J.M. 2006, *Carreg Cennen Castle* [S17]. Wikipedia:
the besiegers, "although inflicting severe damage to the walls, failed to take the castle"
[timeline:S37]. *Corrected 2026-10-02 (independent check)*: that Wikipedia sentence carries **no citation** (the Lewis 2006 citation sits
after the later sentence on £500 of repairs) and has a hidden editor's comment, "contradicts Lewis
(2006)". The point stays contested, but the "held" side is weaker than the note said. Scudamore was
still writing from inside it on 5 July [S11]. `events.ts` says "The castles held", which takes one
side silently; Griffiths supports "held" for Dinefwr only [S12]. No letter read describes a siege
**of** Carreg Cennen in early July, though the event is titled so.

### `carreg-cennen-slighted`

Cadw: "After its capture by Sir Roger Vaughan in 1462 a force of 500 men took four laborious months to
dismantle the castle with picks and crowbars" [S17b]. Wikipedia gives the 500 men, citing Lewis 2006
[timeline:S37]. **Side by side** (*Corrected 2026-10-02 (independent check)*: added): Cadw has capture by Sir Roger Vaughan in 1462 [S17b];
Wikipedia instead has the surrender forced after Mortimer's Cross, 1461, citing Morgan 2008
[timeline:S37]. Coflein says only that it "was rendered unusable in 1462 by Yorkists" [S17]. **Tier:
documented**, effectively single-source for the tools and duration. Months and season: **not
recorded**.

### `bosworth`, `acts-of-union`, `guardianship`, `national-trust`

Bosworth was fought on 22 August 1485 [timeline:S44], far away. The others are legal or
administrative acts. **Not supportable.**

### `rebecca`

Three accounts of the Walk Gate, two of them that week, and one general description (*Corrected 2026-10-02 (independent check)*):

- **The Welshman, Friday 11 August 1843**: "On Tuesday morning the Llandilo Walk Gate and toll-house,
  situated on the mail road from Carmarthen to Llandilo, were demolished by the Rebeccaites, although
  they are not more than 100 yards from Llandilo, where a troop of Dragoons is stationed. The party of
  the Rebeccaites consisted of about 60, disguised and armed, and the house and gate were destroyed in
  about 20 minutes. The gate keeper made his escape, and gave the alarm at a public house where two
  dragoons were billeted. Information was at once conveyed to head-quarters, when Capt. Halkett and his
  men rode to the spot; they found nothing there but the ruins of the gate and toll-house. A
  carpenter's hatchet was left behind ... Rhydyffynon gate, three miles from Llandilo, suffered a
  similar fate on the same night" [S8]. The same column reports the Penygarn toll-house **burnt** "on
  Tuesday night", elsewhere on the main road.
- **Monmouthshire Merlin, Saturday 12 August 1843**, "Destruction of the Walk Gate at Llandilofawr":
  on "[Mon or Sun]day night" (the OCR is unclear) the gate "within a very short [distance] of Llandilo"
  was demolished and the toll-house destroyed; "the whole was completed in about a quarter of an hour",
  while "a troop of the 4th Dragoons, who were stationed [nearby,] were in total ignorance of all that
  was going forward" [S9].
- **Thomas Jenkins's diary, Llandeilo**: "Aug 9 The Walk Gate and house was taken down to the ground by
  the Rebeccaites with soldiers billeted at The White Hart and Walk on both sides, so much for soldier
  vigilance" [S1].
- **William Samuel, *Llandeilo Present and Past* (1868)**, quoted on llandeilo.org, on Rebecca's
  raids round Llandeilo in general (not this gate): Rebecca came
  "suddenly, rapidly, and no more seen than a clap of thunder, and infinitely less audible. Before the
  trumpeter could rouse to horse ... the deed was done, and behold, all around was still as night"
  [victorian:S9].

**Tier: documented, cross-checked**: night, about 60 disguised and armed men, a gate and toll-house
pulled down in 15 to 20 minutes, dragoons close by and too late. Season: **summer, August**. Time:
**night**, very likely the small hours of Tuesday 8 August on the Welshman's "Tuesday morning";
Jenkins dates it 9 August. *Corrected 2026-10-02 (independent check)*: only the Welshman pins it to Monday to Tuesday. The Merlin's OCR
reads "Sw°nday", which begins with S and could be Sunday 6 August, so it does not confirm Monday. **Not supportable for this gate**: torches,
flames, a burning toll-house, or men in women's clothes. "Disguised" is all the local reports say;
women's clothing is documented for Rebecca generally (llandeilo.org summarising the literature)
[victorian:S9], so a Rebecca in a gown is reconstructed for Llandeilo. Samuel's passage describes
Rebecca's raids round Llandeilo in general, not the Walk Gate (*Corrected 2026-10-02 (independent check)*: the note presented it as an
account of this gate), so the quick, quiet scene, with the dragoons' trumpet as the loudest sound,
is **reconstructed by analogy** for this gate.
Fire **is** documented on the Dynevor estate: wheat mows and corn stacks burned on 30 August and 8
September 1843 [victorian:S4] (times of day not checked: the Rees PDF URL returned 404 on 2026-10-02).

**Where the troops were.** The Welshman: two dragoons billeted at a public house by the gate, the
troop at "head-quarters" in the town [S8]. Jenkins: "soldiers billeted at The White Hart and Walk on
both sides" [S1]. The llandeilo.org gloss on the diary and Samuel put the troop's headquarters at the
Cawdor Arms [victorian:S9][victorian:S16]. These are compatible: a troop in town, small billets by the
road.

**Correction to `era-victorian.md`.** Its Walk Gate row says "two men captured with yeomanry
assistance". In the Merlin column read here, the capture of two men by special constables and
yeomanry belongs to the Plain Dealings gate near Narberth, reported just before the Walk Gate item
[S9]. The Welshman also has the Plain Dealings carters captured by yeomanry [S8]. No capture at the
Walk Gate is reported: the Welshman says the dragoons "found nothing there but the ruins".

### `bridge`

From Thomas Jenkins's diary (he built the pumps and the timber centring) and Lynn Hughes's history of
the bridge, both on llandeilo.org:

- **22 October 1846**: "Very high flood. Part of the centre carried off. There were five men on it at
  the time and they were precipitated with the falling timbers into the flood." Two were pulled out at
  once, one climbed a rope over the old bridge's parapet, and two rode the timbers to Cilsan. The flood
  also cracked the old bridge [S2][S5][S6].
- **25 November 1847, 3 pm**: "The final keystone was lowered in position" (Hughes) [S6].
- **27 January 1848**: "The centering was lowered from under the arch of the new bridge today" [S2].
- **30 January 1848**: "Sunday. 9 p.m. The centre was carried off by the flood and thrown down in a
  mass" [S2]. (30 January 1848 was indeed a Sunday.)
- **18 April 1848**: a quarry opened in the churchyard for fill "gave way and buried five men. Four
  saved, but one, after remaining buried for two hours, taken out a corpse" (Jenkins, quoted by
  Hughes) [S6].
- **19 October 1848**: Haycock told the Michaelmas quarter sessions "the bridge is now with the
  approaches completed" [S6].

**No opening ceremony was found**: a Welsh Newspapers Online search of 1847 to 1849 turned up a row
over the bridge's cost, not a celebration. **Tier: documented, single-source** for the flood of 30
January 1848 (one diary). Season: **winter**; time **9 pm**. The strongest effect is the Tywi in winter
flood at night sweeping off the timber centring, which had been "lowered from under the arch" three
days before, "baulks and all" [S2][S6]; the new arch stands (*Corrected 2026-10-02 (independent check)*: the note had the flood "tearing the
centring away from under the new arch", as if it were still under load).

**Not a contradiction** (*Corrected 2026-10-02 (independent check)*: the note recorded one). Hughes's "three days later" follows his
account of the struggle to strike the centring after the keystone (saws and fire failed), not the
keystone itself, and he gives no date [S6]. Jenkins's diary puts the lowering on 27 January and the
flood on 30 January 1848, exactly three days [S2], and S5 also dates the flood to 30 January. The
diary is the primary source and its weekday checks out. Separately, the foundation stone: Jenkins, under 1844, "Dec 3 The foundation stone was
laid this evening at 3:15 p.m. 4 lbs of beef and 1 pint of ale and ½ oz of tobacco given to each
workman to the number of 40" [S1]; Hughes has "3 pm on December 3, 1845", and puts the beef, beer and
tobacco at the signing of the contract instead [S6].

### `church-rebuilt`

The Welshman, 11 October 1850, "Re-opening of Llandilo Church" took place "yesterday" (Thursday 10
October 1850): "Throughout the entire day, all the shops in the town were closed, and business was
completely suspended ... No trading or revelry was observed in the streets"; gentry and clergy "commenced
pouring into the town" early; "the old steeple ... was allowed to remain intact, while the entire body
of the Church was rebuilt" for about £4,000; seats for 920; "the congregation numbered nearly 2,000".
Morning service at 11 with the Bishop of St Davids preaching in English for over an hour; afternoon
service at 2.30 with sermons in English and "in the vernacular of the Principality", ending at 4.30;
an evening service at 6 [S10]. **No bells are mentioned.** **Tier: documented, single-source.** Season:
**autumn**; time: **all day**. Effect: a crowded but hushed town, carriages arriving, shops shuttered,
singing from the church. The singing itself is reconstructed (services are documented, hymns not
described).

**Date note.** `events.ts` gives 1848 to 1851, following Coflein's "1848–51 rebuild" [victorian:S23].
The church reopened for worship on 10 October 1850 [S10]; any work after that is not described here.

### `railway`

The Welshman, 23 January 1857, "Opening of the railway to Llandilo", about 9,000 words [S7]. The
celebration was on "Tuesday last" (20 January 1857). What it says:

- **Weather.** "Unfortunately the early part of the day was most unpropitious", with "wind and rain";
  at Llanelli "a murky atmosphere and drenching rain spoiled the attempt to put on the baubles of
  festivity". On the way "a shower of sleet, following close upon the heavy rain of the morning"
  hid the valley. Then, "for some time before the train reached its destination the clouds had
  dispersed and the sun shone brightly, lending peculiar beauty to the hills slightly capped with snow
  and fringed with rainbow hues, while the leafless trees and swollen streams in the valley wore a
  fairy aspect".
- **The train.** "Thirteen carriages on the new line were uncomfortably crowded"; "at half-past 12
  o'clock the train, propelled by two engines, wreathed with laurel, left Llanelly, the Band of the
  Dafen Tin Works playing a quick march". Stations were decorated; "lusty cheers from groups of
  peasants scattered here and there".
- **Arrival.** "The arrival of the train at Llandilo was greeted with the cheers of the multitude, the
  booming of cannon, the merry pealing of bells, and the inspiriting strains of music." A procession of
  the "Ap Tewdur" lodge of Odd Fellows "with sashes, knots, and other mystic insignia preceded by
  inscribed banners and a band of music", then directors, visitors, gentlemen and tradesmen. "The road
  from the station and the streets ... were crowded with people in holyday attire. There were only two
  arches and no decorations whatever": a plain one at the station, and an "artistic" one from the
  Castle Hotel across the street inscribed "Prosperity to the Llandilo Railway, and Long Life to Mr.
  Hutchings and Family". A banner over a street read "Welcome Hutchins".
- **After.** A déjeuner in the Town Hall (Jenkins calls the room the Shire Hall [S4]; whether they
  are the same building is not verified, *Corrected 2026-10-02 (independent check)*) under a banner reading "Heddwch a Llwyddiant i Wlad fy
  Ngenedigaeth", catered by the Cawdor Arms; then "a Public Ball ... at the Cawdor Arms Assembly Room
  ... dancing kept up with enthusiasm until an early hour next morning" to a quadrille band.

Thomas Jenkins, 15 January 1857: "Put up tables at the Shire Hall sufficient to dine 156 persons, in
readiness for the Public Breakfast which is to take place on opening the Llandeilo extension railway"
[S4]. **Tier: documented.** The date and the public breakfast are **cross-checked** (newspaper and
diary, independent); the weather, cannon, bells and procession are **single-source** (the Welshman).
Season: **winter**; time: **early afternoon** arrival (the train left Llanelli at 12.30; the arrival
hour is not given). Evening: lit ball until the small hours. The ceremonial opening date (20 January)
and the public opening (24 January) are in [victorian:S29].

For [`railway-locomotives.md`](railway-locomotives.md): this is the first source read that says how
the opening train was made up (two engines, thirteen carriages), though it still does not name the
engines.

## Other dated moments found (candidates, not in `events.ts`)

Recorded here so the app could bind weather or effects to them later. None is agreed work.

| When | What | Source | Tier |
|---|---|---|---|
| 1213 | Rhys Gryg burned Llandeilo and left; young Rhys besieged Dinefwr with "engines and inventions", ladders against the walls, "archers, and crossbowmen, and miners, and horsemen" | [S13] | Documented, single-source (Brut) |
| 1316 | Llandeilo burned during Llywelyn Bren's revolt, and the townsfolk were later spared a tax | [S12] | Single secondary source |
| 10 February 1798 | "The largest flood ever remembered by the oldest inhabitant of the town" carried away the temporary wooden bridge | [S6] | Single secondary source |
| 18 February 1843 | "Very stormy with hard frost, the wind un-roofed part of my workshop" | [S1] | Diary |
| 5 February 1853 | "The mountains covered with snow to a depth of 10 inches", seen on a trip at dusk to Cellan, not stated to be at Llandeilo (*Corrected 2026-10-02 (independent check)*) | [S3] | Diary |
| 6 to 7 December 1858 | Lord Dynevor's homecoming: town illuminated, Militia Band, fireworks, an arch at the park gate; next evening "Dynevor Castle [Newton House] took fire at 8 p.m." | [S4] | Diary |
| 10 March 1863 | £15 16s of fireworks on the Castle field at 8 pm for the Prince of Wales's wedding | [S4] | Diary |
| 13 February 1868 | Viscount Emlyn's coming of age: "Seven bonfires, firing of cannon, fireworks" | [S4] | Diary |
| 30 October 1868 | An earthquake felt at supper, 10.30 pm; pheasants and fowls screaming at Glanbrydan | [S4] | Diary |
| 1 August 1870 | "Terrific thunderstorm"; lightning struck Bellevue House | [S4] | Diary |

## Pitfalls met

- **A fetch tool's summary misdated a diary entry.** WebFetch's summary put the flood that swept the
  centring with five men aboard in October 1848; the raw page shows it under 1846. Diary dates were
  re-read from the downloaded page for every entry used.
- **The llandeilo.org diary pages mix the editor's glosses with Jenkins's words** (for example, the
  sentence about the Cawdor Arms and the 41st Regiment sits inside the 9 July 1843 entry). Only the
  plainly first-person lines are quoted as Jenkins.
- **Welsh Newspapers Online's search page fails ("Internal Server Error") for some parameter
  spellings.** `search?query=...&range[min]=YYYY&range[max]=YYYY` works; `alt=full` did not.
- **Every "Llandilo" report used here is Llandeilo Fawr**: the Walk Gate is on "the mail road from
  Carmarthen to Llandilo" with Rhydyffynnon three miles off [S8]; the railway report names the Castle
  Hotel and the Cawdor Arms [S7]; the church report names the Dynevor family and the vicar of Llandilo
  [S10].

## Open questions

- **When did St Teilo's first hang bells, and how many?** The c. 1600 tower and the 1857 peal are the
  only anchors. A church guide, a terrier, or the bell inscriptions (bells often carry a founder and a
  date) would settle it.
- **Talley's bell.** Did Talley have one, and where did it go at the Dissolution? The Exeter "Great
  Tom" claim needs its source.
- **The Walk Gate date**: night of 7 to 8 August (the Welshman; *Corrected 2026-10-02 (independent check)*: not "two newspapers", the
  Merlin may say Sunday 6 to 7 August) or 9 August (diary as transcribed)? A look at the Merlin page
  image would settle "Sunday" or "Monday".
- **Weather in June 1282 and August 1287.** No chronicle read gives any. The Annales Cambriae records a
  great murrain of sheep around 1281 [classes:S2], not checked here.
- **1403**: did Carreg Cennen fall (Coflein, citing Lewis 2006) or hold (Wikipedia, uncited and
  editor-flagged as contradicting Lewis 2006; *Corrected 2026-10-02 (independent check)*)? Lewis 2006 was not read.
- **1403**: which river flooded? The letter says only "an inundation"; the Tywi is a likely reading.
- **1403**: Griffiths's "Llandovery and Newton" against the letter's "Llandeilo and Newtown"
  [S11][S12]: a misprint, or a reading of another letter?
- **The 1462 slighting**: which months? The Cadw text gives none.
- **Rhydyffynnon gate** was destroyed the same night as the Walk Gate [S8]; it is inside the circle and
  could join the Rebecca scene if the map has it.
- **The railway arrival time** on 20 January 1857, and which two engines hauled the train.
- **The Dynevor estate rick-burnings**: times of day, from Rees (2011) or the *Carmarthen Journal* of 1
  September 1843 and *The Welshman* of 15 September 1843 that Rees cites [victorian:S4].
- **The foundation stone of the bridge**: 3 December 1844 (diary) or 1845 (Hughes).
- **Breakfast room for the railway opening**: the Welshman's Town Hall and Jenkins's Shire Hall
  [S7][S4]: the same building?

## Sources

- [S1] Thomas Jenkins of Llandeilo, diary 1840-1845, as transcribed on llandeilo.org (Terry Norman and Andy Mabbutt), "Caves, Castles, Rebecca Riots, Leeches and Scarlet Fever", from *The Diary of Thomas Jenkins of Llandeilo*, ed. D. C. Jenkins (Dragon Books, Bala, 1986) - https://llandeilo.org/tj_caves.html - downloaded and read in full: 18 February 1843 storm and frost; 9 July 1843 dragoons arrive (with an editor's gloss on the Cawdor Arms and the 41st); 9 August 1843 "The Walk Gate and house was taken down to the ground by the Rebeccaites with soldiers billeted at The White Hart and Walk on both sides"; 3 December 1844, the bridge foundation stone laid at 3.15 pm. Same page as victorian:S16.
- [S2] Thomas Jenkins's diary 1846-1850, llandeilo.org, "Crickets, Premonitions, Birth, Death and Romance" - https://llandeilo.org/tj_crickets.html - downloaded and read: 20 February 1846 drew the arch line, span 145 ft, rise 38 ft; 22 October 1846 high flood carries off part of the centre with five men on it; 11 November 1846 old bridge cracked; 27 January 1848 centring lowered; 30 January 1848, Sunday, 9 pm, "The centre was carried off by the flood and thrown down in a mass"; 1850 snow, hail and rain.
- [S3] Thomas Jenkins's diary 1851-1856, llandeilo.org, "Deathbed Scene, Mistresses and Coffins" - https://llandeilo.org/tj_deathbed.html - downloaded and read: 1 January 1853 three months of rain; 5 February 1853 mountains under 10 inches of snow; 1 December 1853 Jenkins takes a share in the Llandeilo and Cross Inn railway.
- [S4] Thomas Jenkins's diary 1857-1870, llandeilo.org, "Fireworks, Arson, Accidents, and Death" - https://llandeilo.org/tj_fireworks.html - downloaded and read: 15 January 1857 tables for 156 at the Shire Hall for the railway's Public Breakfast; December 1858 homecoming, illuminations and the fire at Dynevor Castle; fireworks 1863 and 1868; earthquake 30 October 1868; Glanrhyd derailment 1868; thunderstorm 1 August 1870.
- [S5] llandeilo.org, "Thomas Jenkins and the bridge" - https://llandeilo.org/bge_jenkins.html - downloaded and read: Jenkins's role (pumps, timber centring) with the diary's bridge entries; repeats the keystone time of 3 pm, 25 November 1847.
- [S6] Lynn Hughes, "Pons Asinorum" (from a work in progress, *Towy: The Biography of a River*), llandeilo.org - https://llandeilo.org/bge_history.html - downloaded and read: the 10 February 1798 flood; work from 4 July 1843; foundation stone "3 pm on December 3, 1845"; the October 1846 flood; keystone 3 pm, 25 November 1847, centring carried off "three days later"; churchyard quarry collapse, 18 April 1848; completion reported 19 October 1848. Secondary, no footnotes.
- [S7] The Welshman, 23 January 1857, p. 4, "Opening of the railway to Llandilo" - https://newspapers.library.wales/view/4349273/4349277/16/ - read in full from the OCR text: 20 January 1857, rain and sleet then sun on snow-capped hills, two engines wreathed with laurel, thirteen carriages, cannon, bells, bands, Oddfellows procession, two arches, déjeuner in the Town Hall under a Welsh banner, ball at the Cawdor Arms. Primary.
- [S8] The Welshman, 11 August 1843, "Carmarthenshire" column - https://newspapers.library.wales/view/4345884/4345886/19/ - read from the OCR text: "On Tuesday morning the Llandilo Walk Gate and toll-house ... were demolished by the Rebeccaites ... about 60, disguised and armed ... in about 20 minutes"; the gatekeeper's alarm, Capt. Halkett's dragoons, the hatchet, Rhydyffynnon gate the same night; Penygarn toll-house burnt; the Plain Dealings carters near Narberth captured by yeomanry. Primary.
- [S9] Monmouthshire Merlin, 12 August 1843, "Destruction of the Walk Gate at Llandilofawr" - https://newspapers.library.wales/view/3393998/3394001/24/ - read from the (poor) OCR text: "[Mon or Sun]day night", the whole "completed in about a quarter of an hour", the 4th Dragoons nearby "in total ignorance"; immediately before it, the Plain Dealings gate near Narberth, where "two of the men were captured". Same page as victorian:S10. Primary.
- [S10] The Welshman, 11 October 1850, "Re-opening of Llandilo Church" - https://newspapers.library.wales/view/4347234/4347236/12/ - read from the OCR text: reopening on 10 October 1850; shops closed, no revelry; old steeple kept, body rebuilt for about £4,000; 920 seats; nearly 2,000 present; services at 11, 2.30 (English and Welsh) and 6; no bells mentioned. Primary.
- [S11] F. C. Hingeston (ed.), *Royal and Historical Letters during the Reign of Henry the Fourth*, vol. 1 (Rolls Series, 1860), letters LVI (John Faireford, 4 July 1403) and LX (Hugh de Waterton), and the preface quoting John Scudamore at Carreg Cennen, 5 July 1403 - https://archive.org/details/royalhistoricall01hing - full text searched and read (French originals with the editor's translations): Dinefwr besieged from Monday; Glyndŵr at Llandovery on Tuesday; 300 rebels lodged at Llandeilo at night; the towns of Llandeilo and Newtown burned; the rebels "impeded by an inundation". Primary, in translation.
- [S12] llandeilo.org, "When they burnt Llandeilo to the ground" - https://llandeilo.org/h_burning.html - downloaded and read: quotes Ralph A. Griffiths, "A Tale of Two Towns: Llandeilo Fawr and Dinefwr in the Middle Ages", in *Sir Gâr: Studies in Carmarthenshire History* (1991), pp. 218-219, on July 1403 (flooding, 8,240 spears, the towns "largely destroyed"), and D. Helen Allday, *Insurrection in Wales* (1981), p. 92; also the 1213 and 1316 burnings (the 1316 one unsourced on the page).
- [S13] *Brut y Tywysogion, or The Chronicle of the Princes*, ed. and trans. John Williams ab Ithel (Rolls Series, 1860) - https://archive.org/details/brutytywysogiono00cara - full text searched: Rhys ap Tewdwr's death filed under 1091, no date; "the French devastated Gower, Cydweli, and the Vale of Tywi" the following year; 1213, Rhys Gryg burns Llandeilo and young Rhys besieges Dinefwr with engines, ladders, archers, crossbowmen and miners; the text ends in spring 1282. Primary, in translation.
- [S14] *Annales Cestrienses, or Chronicle of the Abbey of S. Werburg at Chester*, ed. and trans. R. C. Christie (Record Society of Lancashire and Cheshire, vol. 14) - https://archive.org/details/recordsociety14recouoft - full text searched, 1282 entry read: William de Valence the younger "slain, and many others with him, in a certain narrow pass in South Wales" ("in quadam angusta via"), undated; 16 June is the king's camp at Newton near Chester. Primary, in translation.
- [S15] H. R. Luard (ed.), *Annales Monastici*, vol. 4 (Rolls Series), the Oseney annals and the Chronicle of Thomas Wykes for 1282 - https://archive.org/details/annalesmonastici04luar - full text searched, 1282 passages read in Latin: plunderers ambushed by Welsh "de latibulis silvarum et paludibus erumpentes"; William de Valence's son and Richard de Argentein killed, the rest "per fugam vix evadentibus". Primary; the two texts are closely related, not independent.
- [S16] Gatehouse Gazetteer, "Dryslwyn Castle" - https://gatehouse-gazetteer.info/Welshsites/217.html - read: "after a three-week siege the castle was taken by Earl Edmund of Cornwall"; bibliography cites Annales Cambriae 1287 and Wykes.
- [S16a] castlewales.com, "The 1287 Siege of Dryslwyn Castle", text from the official Cadw guidebook - https://www.castlewales.com/dryslwn2.html - re-read in full 2026-10-02: dates, numbers, the £14 trebuchet of "timber, hides, rope, and lead", quarrymen and carters, undermining, "the collapse of a wall, crushing to death a group of nobles who were inspecting the work", capture by 5 September, excavated shot and arrowheads. Same page as medieval:S23.
- [S17] Coflein (RCAHMW), "Carreg Cennen Castle", NPRN 103970 - https://coflein.gov.uk/en/sites/103970 - read via a fetch summary: construction 1287-1321; "In 1403 Carreg Cennen was taken by Owain Glyndwr"; "rendered unusable in 1462 by Yorkists".
- [S17b] Cadw, "More about Carreg Cennen" - https://cadw.gov.wales/more-about-carreg-cennen - read via a fetch summary: "After its capture by Sir Roger Vaughan in 1462 a force of 500 men took four laborious months to dismantle the castle with picks and crowbars"; nothing on 1403. Same page as medieval:S24.
- [S18] W. J. Rees (ed. and trans.), *The Liber Landavensis, Llyfr Teilo* (1840), Life of St Teilo - https://archive.org/details/liberlandavensi00reesgoog - full text searched: Teilo's bell, "more famous than great ... it sounded every hour, without any one moving it"; bells in Llandaff ritual ("sounding bells", "inverted bells"). A 12th-century text; legend.
- [S19] llandeilo.org, "Concise history" - https://llandeilo.org/concise_history.html - downloaded and read: "At the Dissolution of the Monasteries in 1533 the great bell of the Abbey had been taken away to Exeter Cathedral where, as 'Great Tom', it still rings curfew." Unsourced; contradicted by S20, S22 and S23.
- [S20] The National Archives, Discovery catalogue record titled "The 7 ton bell known as 'Great Tom', housed in Tom Tower and rung 101 times every night ... The bell was removed from Osney Abbey in 1546" - https://discovery.nationalarchives.gov.uk/details/r/f75a993a-39b3-4d90-ae07-23d00172af44 - seen as a search-result title only, not opened; the same search returned Christ Church's own bells page (not opened).
- [S21] Search-engine summary of genealogy pages for Nicholas de Stafford (WikiTree "Stafford-406" and similar) - https://www.wikitree.com/wiki/Stafford-406 - summary only, not opened: died "1 August 1287", "killed whilst inspecting a mine" at Dryslwyn; earldom of Stafford created later for Ralph Stafford. Weak.
- [S22] Exeter Cathedral, "Peter Bell & Dog Whippers" - https://www.exeter-cathedral.org.uk/interpretation/peter-bell/ - read by the independent check of 2026-10-02: the cathedral's great bell is "Peter", "re-cast in the late 17th century, to replace one given by Bishop Peter Courtenay in the 1480s". Further evidence against the Talley "Great Tom" claim.
- [S23] Wikipedia, "Tom Tower" - https://en.wikipedia.org/wiki/Tom_Tower - read as wikitext by the independent check of 2026-10-02: Great Tom was "moved from the 12th-century Osney Abbey after the dissolution of the monasteries" (citing GCNA).
