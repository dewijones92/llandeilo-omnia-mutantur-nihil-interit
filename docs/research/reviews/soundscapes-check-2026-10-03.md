---
title: Independent check of soundscapes.md
kind: review
status: current
updated: 2026-10-03
---

# Independent check: Soundscapes, what the valley sounded like

Reviewed note: [`../soundscapes.md`](../soundscapes.md) (status: draft, updated 2026-10-02).
Repo state: `main` at `d40eec0`, 15 commits ahead of `origin/main` (unpushed local work). The working
tree had uncommitted edits by another session (`lamplight.ts`, `generated/sources.ts`,
`light-after-dark.md`); `src/content/ambience.ts` and the note were unchanged, so line numbers below
are for `ambience.ts` at `d40eec0`. Each correction also quotes the text it targets.

## Method

- Every source was downloaded with curl and read as raw text (keyword in context), not through a
  summarising fetch, so wording could be checked exactly. Gerald was read in the Project Gutenberg
  texts (ebooks 1092 and 1148), Dafydd ap Gwilym in the edition's own English translation frames,
  Pritchard (S1) from the PDF's text layer, *The Welshman* (effects:S7) from the National Library of
  Wales OCR text.
- The BBC licence page (S12) is a script-built page: WebFetch was refused, so it was rendered in
  headless Chromium 136 and its text read.
- **Every recording in the licence tables was checked**: all 57 Freesound pages (licence link,
  duration and the recordist's description) and all 35 Commons files through the MediaWiki API
  (`LicenseShortName`, duration, "Audio files by" categories). The British Library category (S13)
  was recounted file by file through the API.
- App-cited keys from other notes were read where the claim depends on them: deeptime:S8, S10, S33,
  S40, S44, S45; effects:S7; railwaylater:S2, S3. railway:S1, victorian:S2, S37, S41, S65 and
  medieval:S1, S23 were already checked by their own reviews (2026-10-02) and are referred to, not
  re-fetched.
- One WebSearch was used (the 1291 fair). It led to a primary-derived source the note did not have:
  the *Gazetteer of Markets and Fairs to 1516: Wales* (Centre for Metropolitan History, updates to the
  printed gazetteer of 2003, page last updated 16 March 2007),
  https://archives.history.ac.uk/gazetteer/wales.html, which cites the Calendar of Charter Rolls.
- **Not done**: Dove's Guide (S18) now shows a "press button to continue" page written to stop bots,
  so it was not bypassed. xeno-canto still answers with a proof-of-work check. The note's "112 files,
  98 CC BY-SA" Commons sample was not re-run. ironage:S49, used by two app beds, has **no URL** in
  the generated source table and could not be checked (see Found).

## Summary

77 claims checked: **57 confirmed, 17 partly, 3 not supported by the cited source, 0 contradicted.**

**No licence problems.** All 92 recording pages exist, and every licence is exactly as the note
states: 57 of 57 on Freesound, 35 of 35 on Commons. Lengths match to within a second. The British
Library set is exactly 202 files, 105 CC BY 4.0 and 97 CC BY-SA 4.0. Two small slips in the credits:
the Blackbird file is in "Audio files by Lawrence Shove" but the note credits only "BL", and
MichiJung's red kite was recorded "during my volunteer work at a wildlife rescue and raptor
center", so it is probably a captive bird.

The research is mostly accurate, and the Gerald and Dafydd quotes are exact. The problems are
claims that go further than their sources:

1. **The 1857 engines are not recorded.** "The engines’ type is recorded" (app) is not supported:
   *The Welshman* says only "two engines", and the railway note itself says the two engines new in
   1857 are unnamed. railway:S1 describes *Victoria*, which was laid up for repair from June to
   December 1857.
2. **The 1291 fair is real, but it was not St Teilo's.** Edward I granted the Bishop of St Davids a
   fair at Llandeilo on 20 May 1290 and again on 20 September 1291, held around the feast of St
   Barnabas (11 June); a Saturday market is recorded by 1326. The app says no source confirms 1291;
   one now does. The note calls it "Documented, single-source" with no source key.
3. **The meltwater river has no source.** deeptime:S8 (Younger Dryas) mentions meltwater only in
   North America and says nothing of rivers in Wales.
4. **"Cattle, sheep and pigs" are not named by deeptime:S33.** It says domesticated animals arrived by
   boat around 4000 BC; it never mentions sheep or pigs.
5. **The golden eagle bones are older than the Late Ice Age.** Cathole is dated to about 20,000 years
   ago; the Late Ice Age bed covers 12,500 to 9,500 BC.
6. **Port Eynon does not show "woodland" birds.** Pritchard says the species are ones "a birdwatcher
   might expect to see on the Gower today", a coastal place, and includes great bustard.
7. **The 57xx class is not in railwaylater:S2 or S3**, which give only engine numbers; the class comes
   from the number series (railwaylater:S49).
8. **The crane lead (S19) does not say what the note says.** The Wikipedia page has no 1542 or 1550:
   it says cranes are "generally believed" to have bred in medieval Britain, with an Act of 1533
   protecting their eggs.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

### Claims cited by src/content/ambience.ts

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 1 | Black grouse, golden eagle and chough "known from Late Ice Age bones in Welsh caves, none inside the 10 miles" | ambience.ts:46 `ICE_AGE_BIRDS` | P | S1: black grouse at Little Hoyle "probably from the late Devensian or early Mesolithic"; chough "at Late Glacial sites at Goats' Hole (Paviland) and Cat's Hole". Golden eagle at Cathole "dated to the later Devensian period about 20,000 years ago"; Coygan Cave undated. https://birdsin.wales/wp-content/uploads/2022/05/pg-15-25-The-prehistoric-and-historic-bird-fauna.pdf |
| 2 | "Woodland birds much like today’s, as the 43 species among the bones at Port Eynon on Gower show" | ambience.ts:55 `WILDWOOD_BIRDS` | P | S1: "43 species were identified in deposits thought to date from between 9,000 and 6,000 years ago ... Many of these were species which a birdwatcher might expect to see on the Gower today, but there were others, such as Great Bustard". Nothing says woodland |
| 3 | "Cranes were common on the wetlands" | ambience.ts:55 | C | S1: Goldcliff East, Severn estuary, c. 7,000 years ago, "46% of the bird footprints were those of Common Crane ... suggesting that this must have been a common bird in the area" |
| 4 | Medieval Welsh poetry's skylark | ambience.ts:64 `MEDIEVAL_BIRDS` | C | S5 (poem 44): "world's early-riser", "April's gatekeeper". https://dafyddapgwilym.net/AnaServer?dafydd+92175+compareSimpleEng.anv+edEl=91886&localEl=92175&titleEl=91874 |
| 5 | Thrush | ambience.ts:64 | C | S9: "Every May ... a cock-thrush (a fair gift which excels any organ)"; S1: Song Thrush among the four birds most mentioned (Williams 2014) |
| 6 | Cuckoo | ambience.ts:64 | C | S1 (most-mentioned four). The cuckoo poem itself (S8) is not in the bed's sources |
| 7 | The owl at night | ambience.ts:64 | C | S4: "From then until the break of day ... 'hoo-di-hoo'"; "it incites the dogs of the night" |
| 8 | Crane and bittern in law | ambience.ts:64 | C | S1: bittern "one of the 'three notable birds' in falconry"; crane "In some versions of the Welsh laws" |
| 9 | Corncrake common in Pembrokeshire in 1603, still numerous in 1894 | ambience.ts:73 `FARMLAND_BIRDS` | C | S10: "Formerly a common and widespread breeding summer visitor to Pembrokeshire, as noted by George Owen in 1603 and Murray Mathew in 1894"; Mathew: "numerous in most parts of the county". https://pembsavifauna.co.uk/category/corncrake/ |
| 10 | Red kite "fewer than ten pairs in mid Wales by the 1930s" | ambience.ts:82 `MODERN_BIRDS` | C | deeptime:S44 (BTO): "fewer than ten breeding pairs remained by the 1930s and 1940s, concentrated into a small area of mid Wales". deeptime:S45 gives a lower figure: "only a single nest was known in Wales" in the 1930s. https://www.bto.org/learn/about-birds/birdfacts/red-kite |
| 11 | Red kite "common again" | ambience.ts:82 | C | BTO page: UK breeding population +2613% (1995 to 2024); deeptime:S40 (River Tywi): "Red kites and buzzards are numerous" |
| 12 | Wind stronger in open cold phases, softer under woodland | ambience.ts:19 `WIND` | C | As a reconstruction basis: deeptime:S8 "Icefields and glaciers formed in upland areas of Great Britain, while many lowland areas developed permafrost"; deeptime:S10 zones "Tundra", "Birch forest", "Mixed oak forest" (dates uncalibrated). Wind itself is inference, as labelled |
| 13 | "A loud, braided meltwater river in the cold of the Late Ice Age" | ambience.ts:28 `MELTWATER` | NS | deeptime:S8 mentions meltwater only for Lake Agassiz and the Mackenzie River; no braided river, nothing on Wales. https://en.wikipedia.org/wiki/Younger_Dryas |
| 14 | The Tywi "on its wide floodplain since the ice melted" | ambience.ts:37 `TYWI` | P | deeptime:S40 has oxbow lakes, flooding and sewin, but no floodplain width or post-glacial history. The app already says "The cited page is a lead"; no change needed |
| 15 | Woodland sound follows how wooded the valley was | ambience.ts:91 `WOODLAND` | C | deeptime:S10 zone table (forest phases), with its warning that the dates are uncalibrated |
| 16 | "Cattle, sheep and pigs came to Britain with the first farmers around 4000 BC" | ambience.ts:100 `FIRST_FARMERS` | P | deeptime:S33: "Around 4000 BC, migrants began arriving"; "domesticated animals and plants had to be carried by boat". "Sheep": 0 mentions; "cattle" once, in the elm-decline paragraph. https://en.wikipedia.org/wiki/Neolithic_British_Isles |
| 17 | Herds and dairy everywhere (Gerald) | ambience.ts:118 `GERALD_HERDS` | C | S3: "Almost all the people live upon the produce of their herds, with oats, milk, cheese, and butter". https://www.gutenberg.org/cache/epub/1092/pg1092.txt |
| 18 | Ploughing with teams of four oxen | ambience.ts:118 | C | S3: "They seldom yoke less than four oxen to their ploughs; the driver walks before, but backwards" |
| 19 | "as Gerald of Wales described the whole country in 1188" | ambience.ts:118 | P | 1188 is the journey (S2 introduction: "In 1188 he accompanied Archbishop Baldwin through Wales"). The *Description* was written after it; the edition read does not date it |
| 20 | Bells pealed for the first train on 20 January 1857 | ambience.ts:199 `FIRST_PEAL` | C | effects:S7, *The Welshman*, Friday 23 January 1857, p. 4: "Tuesday last" (20 January); "the booming of cannon, the merry pealing of bells, and the inspiriting strains of music". https://newspapers.library.wales/view/4349273/4349277/16/ |
| 21 | The report does not say whose bells | ambience.ts:208 `BELLS_SINCE` | C | effects:S7 names no church or tower |
| 22 | The railway reached Llandeilo on 20 January 1857 | ambience.ts:217 `FIRST_TRAIN` | C | effects:S7, as above |
| 23 | "The engines’ type is recorded" | ambience.ts:217 | NS | effects:S7: "propelled by two engines, wreathed with laurel", no names or type. railway-locomotives.md: "two new engines were delivered in 1857 (not named)"; railway:S1 is about *Victoria*, repaired June to December 1857 (railway-locomotives check, 2026-10-02) |
| 24 | Steam trains photographed on these trains, 1958 to 1960 | ambience.ts:226 `GWR_TANKS` | C | railwaylater:S2: 3641 at Llandybie (25 July 1958), 9645 for Carmarthen (29 August 1959), 9788 at Ffairfach (25 July 1960). http://www.terrynorm.ic24.net/photo%20railways%20llandeilo.htm |
| 25 | "Great Western pannier tanks among them" | ambience.ts:226 | P | Neither railwaylater:S2 nor S3 says "pannier" or "57xx". The class comes from the number series, railwaylater:S49 (and S5 for 9788), as railway-later.md lines 206-207 say |
| 26 | "Both pages are by one local historian" | ambience.ts:226 | C | railwaylater:S3: "a collaborative venture by local historian Terry Norman"; S2 is Terry Norman's site. https://llandeilo.org/pl_heart.html |
| 27 | St Teilo’s Fair "is said to date from 1291, which no source read here confirms" | ambience.ts:181 `FAIRS` | P | Now answered in part. Gazetteer, Llandeilo: "F (Charter) vf+3, Barnabas (11 Jun); gr 20 May 1290, by K Edw I to Thomas, bp of St David’s (CChR, 1257–1300, p. 343). Fair granted again ... on 20 Sept 1291 (CChR, 1257–1300, p. 405). In 1326, the bp of St David’s was holding a three day fair on the feast of Barnabas"; "M (Prescriptive: borough) Sat; recorded 1326". It does not name a St Teilo's Fair or the churchyard |

### Other claims in the note

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 28 | Part-singing, "as many different parts and voices as there are performers"; "the children, even from their infancy" | Summary; Middle Ages | none | C | S3, word for word |
| 29 | Harp in every house; "the harp, the pipe, and the crwth" | Summary; Middle Ages | none | C | S3: "each house has its young women and harps allotted to this purpose" (for guests); "They make use of three instruments, the harp, the pipe, and the crwth or crowd" |
| 30 | Ploughing in March and April for oats, in summer, in winter for wheat | Middle Ages; Season | none | C | S3: "in the months of March and April only the soil is once ploughed for oats, and again in the summer a third time, and in winter for wheat" |
| 31 | Alarm trumpet; the farmer "rushes ... from his plough" | Middle Ages | none | C | S3, word for word |
| 32 | Coracles carried to and from the rivers | Middle Ages | none | C | S3: "going to and from the rivers, carry these boats on their shoulders" |
| 33 | Clergy and laity revered "portable bells" | Early Middle Ages | none | C | S2: "Both the laity and clergy in Ireland, Scotland, and Wales held in such great veneration portable bells". https://www.gutenberg.org/cache/epub/1148/pg1148.txt |
| 34 | Gerald passed through Carmarthen and names Dinefwr and the Tywi | Summary | none | C | S2, chapter X: "the noble river Tywy ... the castle of Dinevor, built on a lofty summit above the Tywy" |
| 35 | Beavers on the Teifi only, so none on the Tywi by 1188 | Middle Ages | none | C | S2: the Teifi is "the only river in Wales, or even in England, which has beavers". The Tywi part is a fair inference |
| 36 | Minstrel and singer "on the fiddle", Coed Grono, an earlier incident | Middle Ages | none | C | S2: "a short time after the death of king Henry I ... preceded only by a minstrel and a singer, one accompanying the other on the fiddle" |
| 37 | The nightingale exchange | Middle Ages | none | C | S2: "the nightingale was never heard in this country ... never came into Wales"; S1 places it near Bangor |
| 38 | Owl: "'hoo-di-hoo'", "incites the dogs of the night", head in "a big hollow tree" by day | Middle Ages; Night | none | C | S4, lines 20, 22, 37-38, word for word. https://dafyddapgwilym.net/AnaServer?dafydd+124824+compareSimpleEng.anv+edEl=124592&localEl=124824&titleEl=124580 |
| 39 | The owl is a tawny owl | Middle Ages | ambience.ts:64 (as "the owl") | P | The poem names no species; "hoo-di-hoo" and "endless double call" fit a tawny owl, but that is inference. The app's wording ("the owl") is right |
| 40 | Skylark "from dawn to dusk" | Time of day | none | C | S5 line 25: "Teacher of praise from dawn to dusk" |
| 41 | Cuckoo "the leaves' clock", "sacring-bell of the sturdy thicket" | Summary | none | C | S8, lines 3-4 |
| 42 | Cock-thrush "Every May", "excels any organ" | Middle Ages | none | C | S9, lines 1 and 5 |
| 43 | Rattlebag: "a bell's sound of small stones and gravel" | Middle Ages | none | C | S6 line 28 |
| 44 | Clock: two ropes, wheel, weights, hammer; a phantom mill "grinding by night in a monastery cloister" | Middle Ages | none | C | S7 lines 24-26, 33-34 |
| 45 | The clock is in a "town house" | Middle Ages | none | P | S7 greets "the lovely town by Rhiw Rheon" where the girl lives, but the clock is "in the side of the wall" where the poet sleeps; the poem does not say that is in the town |
| 46 | Cranes found into the Norman period | Summary | none | C | S1: "one early Norman era record of remains at Hen Domen" |
| 47 | White-tailed eagles probably as common as golden eagles | Summary | none | C | S1: "may have been at least as common as the Golden Eagle in Wales at one time" |
| 48 | No proof capercaillie bred | Summary | none | C | S1, word for word |
| 49 | Nightingale may never have been common | Summary; Open questions | none | C | S1: "may never have been a common bird in most of Wales" |
| 50 | Black grouse in a 14th-century poem, place not given | Middle Ages | none | C | S1: *Y Ceiliog Du*, "usually attributed to Dafydd ap Gwilym"; "The location is not mentioned" |
| 51 | Chough, Late Glacial, Paviland and Cat's Hole | Late Ice Age | none | C | S1, word for word |
| 52 | Bewick's swan (Cat's Hole) and geese on migration in the Late Ice Age | Late Ice Age | none | P | S1 dates the swan only to "the Devensian period" (12,000 to 115,000 years ago); the geese at Little Hoyle are "about 22,800 years ago". Neither is shown to fall in 12,500 to 9,500 BC |
| 53 | Ptarmigan and snowy owl recorded near Wales, not in it | Late Ice Age | none | C | S1, word for word |
| 54 | White stork footprints at Goldcliff; white-tailed eagle at Port Eynon and Little Hoyle; great bustard at Port Eynon | Middle Stone Age | none | C | S1, each item |
| 55 | Crane bones at Caldicot, Bronze Age | Bronze Age | none | C | S1 ("Caldicott, Gwent") |
| 56 | Black stork, butchered bone "c. 945 BC" | Bronze Age | none | P | S1: "dated by carbon fourteen to about 2,945 years ago". Subtracting 2,000 is not a conversion; give "about 2,945 years ago (roughly 1000 to 900 BC)" |
| 57 | Cranes and white-tailed eagles at Caerleon; skull opened "a method mentioned in Roman cookery manuals" | Roman Wales | none | C | S1, word for word |
| 58 | Ravens and eagles over battlefields; *Canu Heledd* c. 800 to 900, Powys | Early Middle Ages | none | C | S1: "dating to around 800‐900 (Rowland 1990)", "on the eastern borders of Powys" |
| 59 | Peregrine, goshawk; red kite as scavenger; buzzard "presumably fairly common" | Middle Ages | none | C | S1, word for word |
| 60 | Corncrake "common and widespread" (George Owen, 1603), as a quote | Tudors and Stuarts | none | P | The words are the county authors' summary ("Formerly a common and widespread breeding summer visitor ... as noted by George Owen in 1603"), not Owen's own |
| 61 | Corncrake "numerous in most parts of the county", arriving mid April (1894) | Victorian; Season | none | C | S10: "The Corn-Crake is numerous in most parts of the county, where it arrives about the middle of April" |
| 62 | Decline from about 1916; last Skokholm breeding 1930; hints to 1973 | Modern; Sources | none | C | S10: "a decline in numbers was first noted in about 1916"; "last confirmed breeding said to have occurred in 1930"; "at Pembroke in 1973" |
| 63 | Cranes gone as British breeders by the mid 16th century (1542, 1550) | Tudors and Stuarts; S19 | none | NS | S19 now has no 1542 or 1550: "generally believed to have been a breeding bird in Britain in the Middle Ages"; an Act of 1533 "made the taking of cranes' eggs an offence". https://en.wikipedia.org/wiki/Cranes_of_Great_Britain |
| 64 | St Teilo's Fair in the churchyard, "Documented, single-source (charter of 1291 ...)" | Middle Ages | ambience.ts:181 | P | No source key given, and era-victorian.md gives none either. The Gazetteer confirms grants of 1290 and 1291, but for a fair on St Barnabas's day; it does not name St Teilo or the churchyard (row 27) |
| 65 | The 1857 engines were Hackworth-type six-coupled engines | Summary; Victorian | ambience.ts:217 | P | The company's early engines were (railway:S1, S2), but which two drew the train is not recorded (row 23) |
| 66 | 57xx pannier tanks 3641, 9645, 9788, cited to railwaylater:S2, S3 | Summary; Modern | ambience.ts:226 | P | Numbers and trains confirmed; the class is not in S2 or S3 (row 25) |
| 67 | xeno-canto licences BY-NC-ND, then BY-NC-SA and BY-SA | Summary; Not found | none | C | S11: "CC-BY-ND-NC ... nowadays one can also choose CC-BY-NC-SA ... and CC-BY-SA". https://ceur-ws.org/Vol-1391/166-CR.pdf |
| 68 | BBC RemArc: non-commercial only, no uploading, take-down "at any time, without notice" | Summary; Not found | none | C | S12 (rendered): "For non-commercial, personal or research purposes"; "Sharing our content. For example, no uploading to social media sites. Sharing links is OK."; "at any time, without notice" |
| 69 | British Library set: 202 files, 105 CC BY 4.0, 97 CC BY-SA 4.0 | Summary; S13 | none | C | Recounted through the Commons API, 2026-10-03: 202; 105 and 97 |
| 70 | Calon Lân: Sain, CC BY-SA 3.0, VRTS confirmed, uploaded by Jason.nlw | Church table; S14 | none | C | API: uploader Jason.nlw (22 May 2017); `{{cc-by-sa-3.0|Sain (Recordiau) Cyf.}}`; PermissionTicket 2017050910011681 |
| 71 | Freesound: no results for llandeilo, carmarthenshire, towy, brecon beacons | Summary; S15 | none | C | Re-run without licence filters: all four return "No results... Please try another search" |
| 72 | xeno-canto blocks scripts; API v2 "no longer available" | How the search ran; S16 | none | C | Explore page: "Verifying visitor request..."; API: "Xeno-canto API v2 is no longer available. Visit https://xeno-canto.org/explore/api for API v3 documentation." |
| 73 | Commons has a Category:Xeno-canto | Not found; S17 | none | C | API: 7,643 files. The share-alike proportion was not re-checked |
| 74 | Dove's Guide: HTTP 429 on every attempt | How the search ran; S18 | none | P | True on 2026-10-02 as recorded; on 2026-10-03 it returned HTTP 200 with a "Press button to continue" page aimed at bots. Still unread |
| 75 | Freesound licences, all 57 rows | Licensed recordings | none | C | Each page's licence link matches the note: 29 CC0, 18 CC BY 4.0, 1 CC BY 3.0, 9 CC BY-NC 4.0 |
| 76 | Commons licences, all 35 rows | Licensed recordings | none | C | `LicenseShortName` matches every row: CC BY-SA 4.0, CC BY 4.0, CC0, public domain, CC BY-SA 3.0 as stated |
| 77 | Recordists, places and lengths in the tables | Licensed recordings | none | P | All lengths match within a second and the places match the pages, with two slips: Blackbird (W1CDR0001425 BD22) is in "Audio files by Lawrence Shove" but credited "BL" only; MichiJung's red kite was recorded at "a wildlife rescue and raptor center" (probably captive), not a wild bird |

## Corrections for the note

1. **Late Ice Age table**: golden eagle row, add "Cathole dated to about 20,000 years ago, before this
   period; Coygan undated". Bewick's swan row: "Devensian, not dated more closely"; geese at Little
   Hoyle are "about 22,800 years ago", so drop "geese on migration" from this era or mark it earlier.
2. **Middle Stone Age table, first row**: replace "Woodland song birds much like today's" with "Birds
   much like today's"; Port Eynon is a coastal cave and its list includes great bustard [S1].
3. **Bronze Age table**: "c. 945 BC" becomes "about 2,945 years ago (roughly 1000 to 900 BC)" [S1].
4. **Middle Ages table, owl row**: tier "Documented (14th-century poem, Ceredigion); species inferred
   as tawny owl from the call". Clock row: "Documented (14th-century poem)", dropping "a town".
5. **Middle Ages table, fair row**, and the period intro "St Teilo's Fair (authorised 1291)": replace
   with "A fair granted by Edward I to the Bishop of St Davids on 20 May 1290 and again on 20 September
   1291, held on the vigil, feast and three days after St Barnabas (11 June); a Saturday market by
   1326; Llandeilo a borough by 1326 with fourteen burgesses. Documented [S20]. Whether this is the
   later 'St Teilo's Fair' in the churchyard is not known." Add to Spatial mixing and Open questions
   that Dinefwr had its own market and fair by mandate of 4 December 1280 (fair at the Nativity of the
   Virgin, 8 September), and Newtown a fair of 18 October from 1363 [S20].
6. **Tudors and Stuarts table**: corncrake row, quote marks off "common and widespread" or attribute
   it to the county avifauna's authors [S10]. Crane row: "Bred in medieval Britain; an Act of 1533
   protected their eggs. Not dated here" [S19], and drop 1542 and 1550 from the S19 entry.
7. **Summary and Victorian table, the 1857 engines**: "The company's early engines were Hackworth
   six-coupled engines [railway:S1][railway:S2]; which two engines drew the first train is not
   recorded, and two new engines of 1857 are unnamed."
8. **Summary and Modern table, the panniers**: cite the class to [railwaylater:S49] (number series)
   and [railwaylater:S5] (9788 at Llanelly shed), keeping S2 and S3 for the photographs.
9. **Open questions, St Teilo's Fair**: partly answered by item 5; what remains is when and why the
   Barnabas fair became St Teilo's Fair, and whether it was ever held in the churchyard.
10. **Sources**: S18, add "2026-10-03: a 'press button to continue' bot page instead of 429". S16, add
    that the v2 message points to API v3. Add:
    - [S20] *Gazetteer of Markets and Fairs to 1516: Wales*, Centre for Metropolitan History (updates
      to the printed gazetteer of 2003; page last updated 16 March 2007) -
      https://archives.history.ac.uk/gazetteer/wales.html - read 2026-10-03: Llandeilo and Dinefwr
      entries, citing the Calendar of Charter Rolls 1257-1300 pp. 343 and 405, the Calendar of Patent
      Rolls, and R. A. Griffiths, "A tale of two towns: Llandeilo Fawr and Dinefwr in the Middle Ages"
      (1994). Secondary, a scholarly gazetteer built on the printed calendars.
11. **Licence tables**: Blackbird author "BL; Lawrence Shove". MichiJung red kite: "close calls of a
    bird at a raptor rescue centre, probably captive". Woodpecker: the Commons description spells it
    "Yarmer Wood"; the note's "Yarner" is the real wood.

## Corrections for app content

All in `src/content/ambience.ts` at `d40eec0`. Each keeps its tier (`reconstructed` or `documented`).

1. **`ICE_AGE_BIRDS` (line 46), `basis`.** Find: "A few open-country birds: black grouse, golden eagle
   and chough are known from Late Ice Age bones in Welsh caves, none inside the 10 miles."
   - EN: "A few open-country birds: black grouse, golden eagle and chough are known from Ice Age bones
     in Welsh caves (the golden eagle's from about 20,000 years ago, well before this period), none
     inside the 10 miles."
   - CY: "Ychydig o adar tir agored: mae'r rugiar ddu, yr eryr euraid a'r frân goesgoch yn hysbys o
     esgyrn Oes yr Iâ mewn ogofâu yng Nghymru (esgyrn yr eryr euraid o tua 20,000 o flynyddoedd yn ôl,
     ymhell cyn y cyfnod hwn), ond dim un o fewn y 10 milltir."
   - Source: `sound:S1`.
2. **`WILDWOOD_BIRDS` (line 55), `basis`.** Find: "Woodland birds much like today’s, as the 43 species
   among the bones at Port Eynon on Gower show; cranes were common on the wetlands."
   - EN: "Birds much like today’s: most of the 43 species among the Middle Stone Age bones at Port
     Eynon on Gower are ones a birdwatcher might expect there now. Cranes were common on the Severn
     estuary wetlands."
   - CY: "Adar tebyg iawn i rai heddiw: mae'r rhan fwyaf o'r 43 rhywogaeth ymhlith esgyrn Oes Ganol y
     Cerrig ym Mhorth Einon ar Benrhyn Gŵyr yn rhai y gallai gwyliwr adar ddisgwyl eu gweld yno heddiw.
     Roedd garanod yn gyffredin ar wlyptiroedd aber Hafren."
   - Source: `sound:S1`.
3. **`MELTWATER` (line 28), `basis`.** Find: "A loud, braided meltwater river in the cold of the Late Ice
   Age."
   - EN: "A loud meltwater river in the cold of the Late Ice Age, inferred from the glaciers and frozen
     ground of the last cold snap in Britain. The cited page does not describe any river here."
   - CY: "Afon ddŵr tawdd swnllyd yn oerfel diwedd Oes yr Iâ, wedi'i chasglu o rewlifoedd a thir
     rhewedig y cyfnod oer olaf ym Mhrydain. Nid yw'r dudalen a nodir yn disgrifio unrhyw afon yma."
   - Source: `deeptime:S8` (unchanged).
4. **`FIRST_FARMERS` (line 100), `basis`.** Find: "Cattle, sheep and pigs came to Britain with the
   first farmers around 4000 BC."
   - EN: "Farm animals came to Britain by boat with the first farmers around 4000 BC. The cited page
     does not say which; cattle, sheep and pigs are assumed."
   - CY: "Daeth anifeiliaid fferm i Brydain mewn cychod gyda'r ffermwyr cyntaf tua 4000 CC. Nid yw'r
     dudalen a nodir yn dweud pa rai; tybir mai gwartheg, defaid a moch oedden nhw."
   - Source: `deeptime:S33` (unchanged); a source naming the species would let the wording go back.
5. **`GERALD_HERDS` (line 118), `basis`.** Find: "as Gerald of Wales described the whole country in
   1188."
   - EN: "Herds and dairy everywhere, and ploughing with teams of four oxen, as Gerald of Wales
     described the whole country after his journey of 1188. Not recorded for this valley."
   - CY: "Gyrroedd a llaeth ym mhobman, ac aredig â gwedd o bedwar ych, fel y disgrifiodd Gerallt
     Gymro'r wlad gyfan ar ôl ei daith yn 1188. Heb ei gofnodi ar gyfer y dyffryn hwn."
   - Sources: `sound:S3`, `sound:S2`.
6. **`FIRST_TRAIN` (line 217), `note`.** Find: "The railway reached Llandeilo on 20 January 1857. The
   engines’ type is recorded; their sound is reconstructed."
   - EN: "The railway reached Llandeilo on 20 January 1857, the train drawn by two engines. Which
     engines they were is not recorded; their sound is reconstructed."
   - CY: "Cyrhaeddodd y rheilffordd Landeilo ar 20 Ionawr 1857, a dwy injan yn tynnu'r trên. Ni
     chofnodwyd pa injans oedden nhw; ail-grëwyd eu sŵn."
   - Source: `effects:S7`; `railway:S1` can stay as the company's engine type, or be dropped.
7. **`GWR_TANKS` (line 226), `basis` and `sources`.** Find: "Great Western pannier tanks among them.
   Both pages are by one local historian."
   - EN: "Steam trains of the mid 20th century, as photographed on these trains in 1958 to 1960: among
     them engines whose numbers place them in the Great Western 57xx pannier-tank class. Both
     photograph pages are by one local historian."
   - CY: "Trenau stêm canol yr 20fed ganrif, fel y tynnwyd eu lluniau ar y trenau hyn yn 1958 i 1960:
     yn eu plith injans y mae eu rhifau'n eu gosod yn nosbarth tanciau pannier 57xx y Great Western.
     Mae'r ddwy dudalen luniau gan yr un hanesydd lleol."
   - Sources: add `railwaylater:S49` to `railwaylater:S2`, `railwaylater:S3`.
8. **`FAIRS` (line 181), `basis` and `sources`.** Find: "St Teilo’s Fair in the churchyard is said to
   date from 1291, which no source read here confirms."
   - EN: "Fairs and markets in a small market town. Edward I granted the Bishop of St Davids a fair here
     in 1290 and again in 1291, held around St Barnabas’s day (11 June), and a Saturday market is
     recorded by 1326. When this became St Teilo’s Fair in the churchyard is not known."
   - CY: "Ffeiriau a marchnadoedd mewn tref farchnad fechan. Rhoddodd Edward I ffair yma i Esgob
     Tyddewi yn 1290 ac eto yn 1291, a gynhelid o gwmpas gŵyl Sant Barnabas (11 Mehefin), ac mae
     marchnad ddydd Sadwrn wedi'i chofnodi erbyn 1326. Ni wyddys pryd y daeth hon yn Ffair Teilo yn y
     fynwent."
   - Source: new `sound:S20` (needs the note's S20 entry and `node tools/research/extract-sources.mjs`).
   - **For Dewi**: the market bed starts at AD 1600, but a market and fair are now documented from
     1290 to 1326 (and at Dinefwr from 1280). Starting it in the medieval era would be a content
     decision, not a correction.
9. **Optional, `MEDIEVAL_BIRDS` (line 64), `sources`**: add `sound:S8` (Dafydd's cuckoo poem), since
   the basis names the cuckoo. No text change.

## Found along the way

- **ironage:S49 has no URL.** `src/content/generated/` lists it with `"url": ""`; the Iron Age note
  describes it as a worldhistoryedu.com summary "used only for ambient/sound reconstruction ideas", and
  the Iron Age check did not re-try it. `FARMSTEAD` and `FARM_SMITH` cite it as their only source.
  Either find the page or replace it with a citable source on Iron Age farmsteads.
- **The 1290 to 1326 Gazetteer entries** also date Llandeilo as a borough of the Bishop of St Davids
  by 1326 ("one of the smallest and least profitable ... with only fourteen burgesses") and record
  that "In 1403, Glyndwr burnt much of Llandeilo". Both are useful to the medieval and events notes;
  check them against Griffiths (1994) before use.
