---
title: Independent check of event-effects.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: effects per key event

Reviewed note: [`../event-effects.md`](../event-effects.md) (status: draft, written 2026-10-02, untracked
in the working tree). Repo state: `main` at `ca50331`, level with `origin/main`.

## Method

- Every cited web page was downloaded with curl and read as raw text (keyword in context), not through
  a summarising fetch, so wording could be checked exactly. That covers S1 to S10, S12, S16, S16a, S17,
  S17b and S19, plus Cadw's Dryslwyn page (medieval:S21), the llandeilo.org Rebecca page
  (victorian:S9), Coflein NPRN 401580 (deeptime:S12), and the two Wikipedia pages behind deeptime:S1
  and S8.
- The four Internet Archive texts (S11 Hingeston, S13 Brut, S14 Annales Cestrienses, S15 Annales
  Monastici vol. 4) and the Annales Cambriae (classes:S2) were downloaded as full OCR text and the
  passages read in Latin, French and translation. S18 (Liber Landavensis) likewise.
- Weekdays were computed: Julian calendar for 1282, 1287 and 1403, Gregorian after 1752.
- Extra sources used: Coflein NPRN 100867 (St Teilo's); Exeter Cathedral, "Peter Bell"; Wikipedia
  wikitext of *Tom Tower*, *Great Tom* and *Carreg Cennen Castle*. Three WebSearch calls were used.
- **Not re-checked**: S20 (National Archives record; the page returned HTTP 202, a bot challenge, to
  both curl and WebFetch); S21 (genealogy summary for Nicholas de Stafford); victorian:S4 (Rees 2011;
  the PDF URL still returns 404); medieval:S52; the Welsh Newspapers Online search for a bridge
  opening; and the "None" rows, whose sources (timeline:*) state no effect and were not reopened.

## Summary

69 claims judged: **53 confirmed, 14 partly, 2 not supported, 0 contradicted**, plus 6 items not
re-checked (listed above). The note is careful and its quotations are accurate: every quoted line from
the newspapers, diaries, Hingeston, the Brut, the Chester annal, the Annales Cambriae, the Cadw texts
and the Liber Landavensis was found word for word. Its errors are of interpretation, not transcription:

1. **1403 (`glyndwr`)**: the burning of Llandeilo is not tied to the night of 3 July. It is reported
   "lately" in Waterton's letter, which Hingeston dates "13 (?) July". The French says Owain *left* 300
   rebels round the siege of Llandovery castle and was himself lodged at Llandeilo; the 300 were not
   round Dinefwr. Griffiths's account, quoted on S12, says "the towns of Llandovery and Newton had been
   burned", where the letter says "Landylo et Newtoun". The note copies Griffiths's wording without
   flagging the difference. The flood's river is not named.
2. **Carreg Cennen in 1403**: Wikipedia's "failed to take the castle" carries no citation and has a
   hidden editor's comment, "contradicts Lewis (2006)". Coflein's statement that Glyndŵr took it is
   sourced to Lewis 2006. The contradiction stands, but it is weaker on the "held" side than the note
   says.
3. **1282 (`battle-1282`)**: "bursting out of the hiding places of the woods and the marshes" is a
   stock phrase in the Oseney annals, used almost word for word for the 1257 defeat at Cymerau. The
   plunder detail is Oseney's alone. Neither text places the fight in South Wales. "Cross-checked" is
   too strong for the topography.
4. **Bridge**: the recorded "contradiction" with Hughes is not one. Hughes's "three days later" follows
   his account of the struggle to strike the centring, not the keystone, and the diary's interval from
   lowering (27 January) to flood (30 January) is exactly three days. S5 dates the flood to 30 January.
5. **Rebecca**: only the Welshman pins the night to Monday to Tuesday. The Merlin's OCR reads
   "Sw°nday", which begins with S. Samuel's 1868 passage describes Rebecca's raids round Llandeilo in
   general, not the Walk Gate.
6. **Mesolithic smoke** is about 20 km east of the map centre, outside the 16.1 km circle, not "at the
   eastern edge".

## Table

| Claim | Event id | Verdict | Evidence |
|---|---|---|---|
| Younger Dryas: cooling of 2 to 6 degrees "in Britain", tundra, permafrost | `younger-dryas` | Partly | Wikipedia *Younger Dryas*: "Strong cooling of around 2–6 °C ... had also taken place in Europe. Icefields and glaciers formed in upland areas of Great Britain, while many lowland areas developed permafrost, implying a cooling of −5 °C". The 2 to 6 figure is for Europe; Britain's is about 5 degrees. Tundra is not stated for Britain |
| Small glaciers in "the high north-facing cwms of the Black Mountain" | `younger-dryas` | Partly | Wikipedia *Geology of Brecon Beacons National Park*: "several cirque moraines ... thought to date from the Loch Lomond Stadial between 12,900 and 11,500 years ago. These include the features around Llyn y Fan Fach and Llyn Cwm Llwch". Llyn y Fan Fach is on the Black Mountain; "north-facing" is not in the source, and the end date is 11,500, not 11,700 |
| Heath and birch deliberately burned at Waun Fignen Felen | `mesolithic-burning` | Confirmed | Coflein NPRN 401580: "Later in the Mesolithic, from the eighth millennium BP, local heathland and open birch woodland were burnt, to encourage large game" |
| The fires are "at the eastern edge" of the map | `mesolithic-burning` | Partly | Coflein grid ref SN 82500 17840 is 20.1 km from the map centre (`src/domain/geo.ts`, 262900 222500); the circle is 16.1 km. `events.ts` already says "just beyond the eastern edge". Smoke must be on the horizon, outside the circle |
| Teilo's bell "more famous than great ... sounded every hour, without any one moving it" | `st-teilo` | Confirmed | S18, Life of St Teilo, p. 342-343, word for word, gift received at his consecration as bishop |
| Bells in 12th-century Llandaff ritual ("sounding bells", "inverted bells") | `st-teilo` | Confirmed | S18: "the holy cross preceding with sounding bells"; "crosses laid on the ground, and inverted bells". Rees's own note (citing Spelman) says the writer projected 12th-century practice back, "the use of bells were not known in the British Churches" |
| St Teilo's tower dated c. 1600 | `st-teilo` | Partly | Coflein NPRN 100867 says both "fifteenth century west tower" and "The tower is thought to date to around 1600". The note gives only c. 1600 |
| The 1850 reopening report mentions no bells | `church-rebuilt` | Confirmed | S10: no "bell" in the reopening article (the only hits on the page are other columns) |
| Bells pealed for the first train, 20 January 1857 | `railway` | Confirmed | S7: "the booming of cannon, the merry pealing of bells, and the inspiriting strains of music" |
| Brut gives no date or season for Rhys ap Tewdwr's death, filed 1091 | `rhys-ap-tewdwr` | Confirmed | S13 p. 55: "1091 ... Rhys, son of Tewdwr, king of South Wales, was killed by the French, who inhabited Brecheiniog" |
| "Its next entry says ... the French devastated Gower, Cydweli, and the Vale of Tywi" | `rhys-ap-tewdwr` | Partly | Quote exact, but it is the 1093 entry, two entries on; the 1092 entry (William Rufus in Normandy, Britons demolish castles) comes between |
| "A little before the calends of May" belongs to Cadwgan's raid | `rhys-ap-tewdwr` | Confirmed | S13: "Cadwgan, son of Bleddyn, despoiled Dyved on the second day of May", variant "a little before the calends of May. C. D. E." |
| The Rolls Series Brut ends in spring 1282 | `battle-1282` | Confirmed | S13 last entry: "1282 ... the feast of St. Mary of the equinox ... possessed themselves of the town and castle of Aberystwyth" |
| llandeilo.org says Talley's great bell went to Exeter as "Great Tom" | `talley` | Confirmed | S19: "At the Dissolution of the Monasteries in 1533 the great bell of the Abbey had been taken away to Exeter Cathedral where, as 'Great Tom', it still rings curfew" (the Abbey is Talley in the preceding sentence) |
| The curfew Great Tom is at Christ Church, Oxford, from Osney Abbey | `talley` | Confirmed | Wikipedia *Tom Tower* wikitext: "moved from the 12th-century Osney Abbey after the dissolution of the monasteries" (cites GCNA). Exeter Cathedral's own page: its great bell is "Peter", "re-cast in the late 17th century, to replace one given by Bishop Peter Courtenay in the 1480s". S20 itself could not be opened |
| No bell is recorded at Talley | `talley` | Confirmed | Nothing in S19 or the other sources read; the one claim fails |
| William de Valence junior killed in Ystrad Tywi, 16 June | `battle-1282` | Confirmed | Annales Cambriae: "interfectus fuit Willelmus de Valenciis junior haeres Penbrochiae in Estratewy XVI Kalendas Julii" (16 June 1282, a Tuesday, Julian) |
| Chester annal: "in quadam angusta via in Suth Walia", undated; 16 June is the king at Newton | `battle-1282` | Confirmed | S14: "occisus est Willelmus de Valence ... in quadam angusta via in Suth Walia"; "die Sanctorum Sirici et Julite fixit tentoriam apud Neuton inter Cestriam et Hawerdin" |
| Wykes/Oseney: plunderers ambushed "de latibulis silvarum et paludibus erumpentes" | `battle-1282` | Partly | Oseney (filed 1281): "praedis capiendis operam dabant, et ecce Wallenses de latibulis silvarum et paludibus erumpentes". Wykes: "minus caute progredientibus et ab exercitu regio se nimium elongantibus ... de latibulis sylvarum et paludum inopinate egrediens"; Wykes has no plunder. Oseney uses the same phrase for 1257: "a Wallensium multitudine qui de latibulis silvarum et paludibus inopinate prosiluerunt". Neither text says South Wales |
| "Cross-checked across two independent chronicle traditions" (ambush from woods and marsh, narrow way) | `battle-1282` | Not supported | Woods and marsh are in one tradition (Wykes/Oseney, related), narrow way in the other (Chester). Only the death of Valence's son and heavy losses appear in both |
| No weather or time of day recorded for 1282 | `battle-1282` | Confirmed | None in S13 to S15 or Annales Cambriae |
| Dryslwyn besieged "about the gule of August", taken by undermining, Montchensy crushed under the wall | `dryslwyn-siege` | Confirmed | Annales Cambriae 1287: "castrum ipsius Resi de Deresloyn obsederunt circa gulam Augusti, et tandem muros subfodiendo castrum ceperunt, in qua subfossione oppressus est sub muro dominus Willelmus de Montthenesy baro cum aliis pluribus" |
| Cadw guidebook: dates, 11,000 men, £14 trebuchet, quarrymen and carters, wall collapse, 5 September, 16-inch balls | `dryslwyn-siege` | Confirmed | S16a, every detail word for word, including "the collapse of a wall, crushing to death a group of nobles who were inspecting the work" and "over one hundred arrowheads" |
| Cadw page: "lasted two weeks", "brought down a large section of the walls" | `dryslwyn-siege` | Confirmed | medieval:S21, word for word |
| Gatehouse: "three-week siege" | `dryslwyn-siege` | Confirmed | S16: "after a three-week siege the castle was taken by Earl Edmund of Cornwall" |
| A wall fell, not a tunnel | `dryslwyn-siege` | Confirmed | Both primary and guidebook say a wall fell on the men; `events.ts` line 251 says "A tunnel collapse" |
| The "earl of Stafford" is Nicholas de Stafford, died 1 August 1287 | `dryslwyn-siege` | Not re-checked | S21 is a search summary; not opened |
| Dinefwr besieged from "Monday last" by Rhys ap Gruffudd, Henry Dwnn and others | `glyndwr` | Confirmed | S11 letter LVI: "this Wednesday morning ... were on Monday last treasonably rising in the plain country ... and have laid siege to the said Castle with a great force of rebels". Monday 2, Tuesday 3, Wednesday 4 July 1403 (Julian) |
| Glyndŵr at Llandovery on Tuesday; 300 rebels "lying round the siege of the same Castle, and at night were lodged at Llandeilo" | `glyndwr` | Partly | Translation quoted correctly, but the French reads "le Mardy fuist a Llamendevery ... et CCC de les rebelles ad lesse gisantz entour la sege de mesme le Chastiell et le noet fuist loggez a Landeilo": the castle is Llandovery's, and the singular verbs make Owain the one who left the 300 there and lodged at Llandeilo. Griffiths (S12): "Glyndwr and 300 rebels had surprised Llandovery's garrison ... and that night they lodged at Llandeilo" |
| Rebels "lately burned the towns of Llandeilo and Newtown", "impeded by an inundation" | `glyndwr` | Confirmed | S11 letter LX, French "burez les villes de Landylo et Newtoun ... distourbez par un cretyn de ewe"; Hingeston dates the letter "13 (?) July, 1403" and calls it "the burning of Llandeilo and Newtown" |
| The flood was on the Tywi | `glyndwr` | Partly | No river is named; the flood stopped the rebels entering Iskennen and Kidwelly. The Tywi is a likely reading, so reconstructed |
| Scudamore at Carreg Cennen, 5 July; Glyndŵr lay at Dryslwyn; safe-conduct refused | `glyndwr` | Confirmed | S11 preface: "lie lay to nyjt ... yn the Castel of Drosselan ... he wold none graunte me"; "written at the Castel of Carreckennen the V. day of Juil" |
| Griffiths "gives the same story from the same letters" | `glyndwr` | Partly | S12 quoting Griffiths: "the towns of Llandovery and Newton had been burned by the rebels", against the letter's Llandeilo and Newtown; yet the same text ends "Llandeilo Fawr and Newton, largely destroyed in July 1403". Griffiths also: "Dinefwr castle does not seem to have fallen" |
| Coflein: "In 1403 Carreg Cennen was taken by Owain Glyndwr" | `glyndwr` | Confirmed | S17, word for word; the record's stated source is "Lewis, J.M. 2006. Carreg Cennen Castle" |
| Wikipedia, citing Lewis 2006: the besiegers "failed to take the castle" | `glyndwr` | Partly | Wikipedia wikitext: "failed to take the castle.<!-- contradicts Lewis (2006) -->"; the Lewis citation sits after the later sentence on £500 of repairs. The claim is uncited and flagged by an editor |
| Cadw: 500 men, four months, picks and crowbars, after capture by Sir Roger Vaughan in 1462 | `carreg-cennen-slighted` | Confirmed | S17b, word for word. Wikipedia instead has surrender forced by Mortimer's Cross, 1461 (citing Morgan 2008), and 500 men (citing Lewis 2006) |
| Coflein: "rendered unusable in 1462 by Yorkists" | `carreg-cennen-slighted` | Confirmed | S17, word for word |
| No months recorded for the slighting | `carreg-cennen-slighted` | Confirmed | None in S17, S17b or Wikipedia |
| Welshman: "On Tuesday morning ... about 60, disguised and armed ... in about 20 minutes", gatekeeper's alarm, Halkett, hatchet | `rebecca` | Confirmed | S8, word for word |
| Rhydyffynon gate the same night; Penygarn toll-house burnt Tuesday night | `rebecca` | Confirmed | S8: "Rhydyffynon gate, three miles from Llandilo, suffered a similar fate on the same night. On Tuesday night the Penygarn Gate, on the main road, was destroyed, and the toll-house burnt" |
| Merlin: "completed in about a quarter of an hour", 4th Dragoons "in total ignorance" | `rebecca` | Confirmed | S9 OCR: "the whole was completed in about a quar er ... a foop of the 4th Dragoons, who were sta,'on^ were in total ignorance of all that was going forward" |
| The night was Monday 7 to Tuesday 8 August "(newspapers)", the Merlin's night agreeing | `rebecca` | Partly | Welshman (Friday 11 August) "Tuesday morning" = 8 August. Merlin OCR "Sw°nday night" begins with S and could be Sunday 6 August; it does not confirm Monday |
| Jenkins: "Aug 9 The Walk Gate and house was taken down ..." | `rebecca` | Confirmed | S1, 1843 section, word for word |
| Samuel's "clap of thunder" passage as an account of the Walk Gate | `rebecca` | Partly | victorian:S9 introduces it as "an account of the affect Rebecca had on Llandeilo"; it describes the raids in general, not this gate |
| Women's clothing documented for Rebecca generally, not for this gate | `rebecca` | Confirmed | victorian:S9: "made by men dressed in women's clothing and wigs with faces blackened"; S8 and S9 say only "disguised" |
| The "two men captured" belong to the Plain Dealings gate near Narberth | `rebecca` | Confirmed | S9 OCR: "Plamdealuss, near Narbeth ... supported by a troop of yeomanry, two of the men were captured", immediately before the Walk Gate heading. S8 has the yeomanry "capturing the whole of them" (seven carters) |
| Troops: two dragoons by the gate, troop at headquarters; Jenkins's billets; Cawdor Arms HQ | `rebecca` | Confirmed | S8 as quoted; S1 "soldiers billeted at The White Hart and Walk"; victorian:S9 Samuel "the Cawdor Arms Hotel was the head-quarter of a troop" |
| Dynevor estate ricks burned 30 August and 8 September 1843 | `rebecca` | Not re-checked | victorian:S4 PDF returns 404 |
| 22 October 1846: high flood, five men on the centring, two carried to Cilsan | `bridge` | Confirmed | S2 and S5, word for word |
| 27 January 1848 centring lowered; 30 January, Sunday, 9 pm, "carried off by the flood and thrown down in a mass" | `bridge` | Confirmed | S2, word for word; 30 January 1848 was a Sunday |
| The effect: the flood "tearing the centring away from under the new arch" | `bridge` | Partly | The centring had been "lowered from under the arch" three days before; the arch was standing. The flood carried off a struck frame, "baulks and all" (S6) |
| Keystone, 3 pm, 25 November 1847 | `bridge` | Confirmed | S6 and S5: "The final keystone had been lowered in position at 3 pm on 25th November 1847" |
| Hughes contradicts the diary, putting the flood in late November 1847 | `bridge` | Not supported | S6: after the keystone, "work on removing the form-work was begun", saws and fire failed, then "Three days later ... another Towy deluge"; no date given. 27 to 30 January is three days, and S5 ties the flood to 30 January 1848 |
| Churchyard quarry collapse, 18 April 1848, one man killed | `bridge` | Confirmed | S6 quoting Jenkins; Coflein NPRN 100867 independently: "The quarry reportedly caved in, killing one of the workers" (no date) |
| Haycock's report at the Michaelmas sessions, 19 October 1848 | `bridge` | Confirmed | S6: "At the Michaelmas (19th Oct) quarter sessions ... 'the bridge is now with the approaches completed'" |
| Foundation stone 3 December 1844 (diary) vs 1845 (Hughes); beef and ale at different occasions | `bridge` | Confirmed | S1 1844: "Dec 3 The foundation stone was laid this evening at 3:15 p.m. 4 lbs of beef ..."; S6: "At 3 pm on December 3, 1845"; "On the signing of the contract, the forty workmen engaged were awarded 4 lbs of beef" |
| Reopening "yesterday", Thursday 10 October 1850: shops closed, no revelry, gentry and clergy pouring in | `church-rebuilt` | Confirmed | S10, The Welshman 11 October 1850 (a Friday), word for word |
| Steeple kept, body rebuilt for about £4,000, 920 seats, nearly 2,000 present | `church-rebuilt` | Confirmed | S10: "the old steeple ... was allowed to remain intact ... at an expense of about four thousand pounds"; "accommodate 920"; "The congregation numbered nearly 2,000" |
| Services at 11, 2.30 (English and Welsh, ending 4.30) and 6 | `church-rebuilt` | Confirmed | S10: "The morning service commenced at 11 o'clock"; Bishop "for more than an hour"; "half-past two ... in English, and in the vernacular of the Principality"; "not having terminated until half-past 4"; "the six o'clock service" |
| Railway: "Tuesday last", wind and rain, sleet, then sun on hills "slightly capped with snow", rainbow, leafless trees, swollen streams | `railway` | Confirmed | S7, word for word (OCR "slu-htly", "swoollen") |
| Thirteen crowded carriages, two engines wreathed with laurel, left Llanelli 12.30, Dafen band | `railway` | Confirmed | S7, word for word |
| Oddfellows procession, holiday crowds, "only two arches", Castle Hotel arch, "Welcome Hutchins" banner | `railway` | Confirmed | S7, word for word; the banner is quoted in a speech |
| Déjeuner in the Town Hall under the Welsh banner; ball until early next morning | `railway` | Confirmed | S7: "The dejeuner a la fourchette was provided in the Town Hall"; "Heddwch a Llwyddiant i Wlad fy Ngenedigaeth"; "until an early hour next morning". Jenkins (S4) calls the room the Shire Hall; same building not verified |
| Jenkins, 15 January 1857, tables for 156 at the Shire Hall | `railway` | Confirmed | S4, word for word |
| Candidate: 1213, Rhys Gryg burns Llandeilo; Dinefwr besieged with engines, ladders, archers, crossbowmen, miners, horsemen | (candidate) | Confirmed | S13 1213 entry, p. 277, word for word |
| Candidate: 1316 burning, single secondary source | (candidate) | Confirmed | S12: "The town and castle were badly damaged by fire again during a Welsh revolt by Llywelyn Bren in 1316"; no source given on the page |
| Candidate: 10 February 1798 flood | (candidate) | Confirmed | S6, word for word |
| Candidate: 18 February 1843 storm and frost | (candidate) | Confirmed | S1, word for word |
| Candidate: 5 February 1853, mountains under 10 inches of snow | (candidate) | Partly | S3: "Went at dusk to Baylie, Cellan, the mountains covered with snow to a depth of 10"". Seen on a trip to Cellan, not stated to be at Llandeilo |
| Candidates: 6 to 7 December 1858; 10 March 1863; 13 February 1868; 30 October 1868; 1 August 1870 | (candidate) | Confirmed | S4: "Dynevor Castle took fire at 8 p.m."; "Let off worth of £15.16.0 of fireworks on the 'Castle' field 8 p.m."; "Seven bonfires, firing of cannon, fireworks"; "10:30 while at supper felt shock of earthquake ... the pheasants and fowls were screaming"; "Terrific thunderstorm. The electric fluid struck the east chimney at Bellevue House" |
| "Every 'Llandilo' report used here is Llandeilo Fawr" | (method) | Confirmed | S8 "mail road from Carmarthen to Llandilo", Rhydyffynon three miles off; S9 headline "Llandilofawr"; S7 Castle Hotel and Cawdor Arms; S10 "Llandilo-fawr", Dynevor family |

Counts, one per row (some rows bundle several closely related claims): 53 confirmed, 14 partly,
2 not supported, 0 contradicted. Not re-checked: 6 items (S20, S21, victorian:S4, medieval:S52, the
bridge-opening search, the "None" rows), two of which have rows above.

The "not supportable" rows: nothing read for this check adds an effect to any of them, with one
exception the note already records: the Brut's undated devastation of the Vale of Tywi after Rhys ap
Tewdwr's death (filed 1093). The 1091 entry also says that "about the calends of July, the French came
into Dyved and Ceredigion", which is not this valley.

## Corrections the note needs

Changing what the app would show:

1. **`glyndwr`**: do not set the burning at the night of 3 July. The night of 3 July is when Owain
   lodged at Llandeilo; the burning is reported "lately" in a letter Hingeston dates c. 13 July, so it
   falls in the first half of July. Rewrite the lodging line from the French: Owain left 300 rebels round
   Llandovery castle and was lodged at Llandeilo himself. The camp round Dinefwr rests on the Faireford
   report of Monday 2 July (Rhys ap Gruffudd, Henry Dwnn and others), not on the 300. Label the flood
   "an inundation" (river not named; a Tywi flood is reconstructed).
2. **`glyndwr`, Carreg Cennen**: record that Wikipedia's "failed to take" is uncited and editor-flagged
   as contradicting Lewis 2006, and that Coflein's "taken" cites Lewis 2006. Keep the point contested,
   but `events.ts` "The castles held" is weaker than the note implies for Carreg Cennen (Griffiths
   supports it for Dinefwr). Also record that no letter read describes a siege *of* Carreg Cennen in
   early July, though the event is titled so.
3. **`glyndwr`, sources**: add the Griffiths discrepancy side by side: "the towns of Llandovery and
   Newton had been burned" (S12) against "burez les villes de Landylo et Newtoun" (S11).
4. **`battle-1282`**: change "documented, cross-checked" for woods, marsh and narrow way to
   single-tradition per detail; note that "de latibulis silvarum et paludibus" is the Oseney
   chronicler's stock phrase (also used for 1257), so a wooded, marshy ambush ground is reconstructed,
   not documented topography; the plunder detail is Oseney's only.
5. **`bridge`**: delete the contradiction with Hughes, or recast it as "Hughes gives no date; his three
   days match the diary's 27 to 30 January". In the effect, the arch stands and the flood sweeps off the
   already-struck timber frame, not centring still under load.
6. **`rebecca`**: the night is Monday to Tuesday on the Welshman's evidence only; the Merlin may say
   Sunday. Present Samuel's passage as a general description of Rebecca round Llandeilo, so the "quick,
   quiet scene" is reconstructed by analogy for this gate.
7. **`mesolithic-burning`**: the smoke is about 4 km outside the circle (20.1 km from the centre), so it
   should be distant, on the eastern horizon.
8. **`younger-dryas`**: Britain's figure is about 5 degrees with upland glaciers and lowland permafrost;
   the named Black Mountain cirque is Llyn y Fan Fach; drop "north-facing" or source it.

Not changing what the app shows:

9. **`rhys-ap-tewdwr`**: "its next entry" should be "the entry two years on (filed 1093)".
10. **Bells**: Coflein gives the tower as both 15th-century and c. 1600; record both. Add Exeter
    Cathedral's own statement that its great bell is "Peter" as further evidence against the Talley
    claim.
11. **`carreg-cennen-slighted`**: record Wikipedia's 1461 surrender after Mortimer's Cross (Morgan 2008)
    beside Cadw's 1462 capture by Sir Roger Vaughan.
12. **Candidates**: the 5 February 1853 snow was seen near Cellan, not stated to be at Llandeilo.
13. **Railway**: the Welshman says Town Hall and Jenkins says Shire Hall for the breakfast; note it.
