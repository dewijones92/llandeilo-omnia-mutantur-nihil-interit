---
title: Independent check of era-medieval-to-1282.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: Medieval Llandeilo and the Tywi valley, to 1282-83

Reviewed note: [`../era-medieval-to-1282.md`](../era-medieval-to-1282.md) (status: draft, updated 2026-09-26).
Repo state: `main` at `ca50331`, level with `origin/main`. Line numbers for `src/content/` refer to
the **working tree on 2026-10-02**, which had uncommitted edits in progress by another session
(events.ts changed while this check ran), so each correction below also quotes the text it targets.

## Method

- Every cited URL in the note was downloaded and read as raw text (curl, then a keyword-in-context
  search), not through a summarising fetch, so wording could be checked exactly.
- Four sources the note could not read now resolve. S1's `archeology.php` is now
  `https://www.llandeilo.org/archeology.html` (a Cambria Archaeology heritage audit extract, 2004), and
  the St Teilo claims are on `https://www.llandeilo.org/ch_st-teilos.html`. Coflein NPRN 425 (S11)
  now returns Dinefwr, not Penrhyn. GENUKI (S39) and Gerald's *Description of Wales* (via Project
  Gutenberg ebook 1092, Hoare's translation) were read directly.
- **S52 (fandom) could not be read** (Cloudflare challenge, then HTTP 402). Its claims are all
  duplicated in S28, which was read.
- **S34 (FamilySearch)** was not re-tried: it is a genealogy profile and no app content uses it.
- Grid references for every placed site were checked against Coflein.
- Independent sources used where the cited ones failed: Coflein NPRNs 100867, 92750, 100682, 103970;
  David Willis, *Old and Middle Welsh* (davidwillis.net, citing Jenkins and Owen 1983/84); Wikipedia
  *Earl of Stafford* and *Edmund Stafford, 1st Baron Stafford*; Medieval Realms, *The tragedy of Rhys
  ap Maredudd*; Wikipedia *Dinefwr Castle*. Five WebSearch calls were used.

## Summary

127 claims checked: **91 confirmed, 22 partly, 6 not supported by the cited source,
8 contradicted.** The note is broadly sound on dates, people and the castles' descriptions, but it
has real errors, several of which have reached the app:

1. **The 1282 "agreed" story is not agreed.** Clare did not capture and sack Carreg Cennen: S28 says
   he "occupied the bare walls of Carreg Cennen and Llandovery, recently burnt out by the Welsh", and
   S29 says his only achievement was "to re-occupy the castle". Only S27 (Wikipedia) says he
   captured and sacked it. The ambushed column was a detachment returning from a plundering raid, and
   Clare's army was mostly Welsh levies (S28). The app says "returning from sacking Carreg Cennen" in
   two places.
2. **Talley's church was not left as an east end on footings.** It was completed in a shorter form
   in the early 13th century; only the western four bays of the nave and the south aisle stayed near
   foundation level (S19, the note's own source, and Coflein 92750). Coflein also gives the
   dissolution as 1536 and says the choir served as the parish church until 1772-3.
3. **Rhys ap Maredudd is the son, not the grandson, of Maredudd ap Rhys Gryg** (S30, S31). The note's
   October 1283 "quitclaim of Dryslwyn" is contradicted by S31 and S22, which both have him keeping
   Dryslwyn until 1287; the castle quitclaimed is most probably Dinefwr. The "1289 vs 1291" capture
   contradiction is mis-attributed: S30 says 1291, and S31 gives no capture year.
4. **Carreg Cennen's Chapel Tower is mid-way along the east curtain, not at the south-east corner**
   (S26), and the north-east tower is polygonal with cut corners, not square.
5. **"Bishop-abbot" has no source.** S1 says Llandeilo was the centre of a bishopric by the 8th
   century and had a bishop in the 9th; neither S1 page nor S2 uses "bishop-abbot".
6. **The Gerald oats quote is real, but not in the sources cited for it.** Gerald's own text
   confirms it and adds that the Welsh ate "flesh in larger proportions than bread".
7. **The Surexit date has a specialist answer.** Jenkins and Owen date it 830-50 (per Willis), which
   supports the app's c. 830. The early-8th-century date in S8 and language:S4 is the outlier and
   should be recorded as such, not as an equal reading.
8. **"Earl of Stafford" (Dryslwyn, 1287) is an anachronism** carried over from the Cadw guide via S23.
   The man killed was Nicholas de Stafford; the barony dates from 1299 and the earldom from 1351.
9. **Grid references:** Dinefwr, Carreg Cennen, Dryslwyn and St Teilo's all match Coflein to within
   15m. **Talley is about 85m off** the Coflein point. The note's own approximate lat/lon values are
   400-700m out (Dinefwr, Carreg Cennen), which confirms the standing rule to place sites from
   Coflein grid references.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Llandeilo Fawr was centre of a bishopric by the 8th century, mother church of a large area of NE Carmarthenshire | Timeline; Places (clas) | almanac.ts:161 `clas` | C | S1 archeology.html: "By the 8th century Llandeilo Fawr was the centre of a bishopric and probably the mother church of a large area in what is now northeastern Carmarthenshire" |
| 2 | By the early 9th century the seat of a "Bishop-Abbot" | Places (clas); Religion | almanac.ts:165 | NS | Neither S1 page nor S2 uses "bishop-abbot". S1 ch_st-teilos.html: "there was a bishop at Llandeilo Fawr in the ninth century" |
| 3 | Llandeilo sited "on or near a Roman road", good east-west communications | Places; Landscape; Almanac | almanac.ts:214 `medieval-travel` | C | S1 ch_st-teilos.html (not the archaeology page the note cites): "its site on or near a Roman road gave it good communications to east and west" |
| 4 | A clas was a single church within a llan enclosure, run by clergy under an abbot | Places; Religion | features.ts:234 `clas-church` | C | S2 (single building flagged "verification needed" by Wikipedia itself); S1 archeology.html confirms the llan enclosure and oval churchyard |
| 5 | Wendy Davies counts perhaps 150-200 clasau | Places | none | P | S2: Davies identified 36 clasau in the Llandaff charters (about 50 in total there); 150-200 is Wikipedia's own extrapolation ("This would suggest...") |
| 6 | Llandeilo is a named clas example | Places; Religion | features.ts:234 | C | S2 list: "Llandeilo, established by St Teilo" |
| 7 | St Teilo traditionally founded the community in the 6th century, travelled Wales and Brittany, buried at Llandeilo; Llandaff disputes the burial | Timeline; People | none directly | C | S1 ch_st-teilos.html (Brittany, burial, Edward I shown the tomb); S3 (Llandaff dispute) |
| 8 | St Teilo's Church rebuilt early 18th century and "again to completion in 1850" | Places | features.ts:262 `tower-church` | P | S3 gives only "rebuilt in the early eighteenth century". 1850 is from S1 ch_st-teilos.html. Coflein 100867 describes only the 1848 demolition and 1848-51 Scott rebuild |
| 9 | Tower date unverified | Places; Open questions | features.ts:248, 262 (tower c.1600) | X | Coflein 100867 contradicts itself: "a double nave and fifteenth century west tower", then "The tower is thought to date to around 1600". S1 ch_st-teilos.html: "the tower is late medieval". The app shows only c.1600 |
| 10 | St Teilo's grid reference | (none in note) | features.ts:73 `LLANDEILO_CHURCH` | C | Coflein 100867 SN 62930 22236, identical to the app |
| 11 | 8th-century Insular gospel book, also called St Chad / Llandeilo / St Teilo Gospels | Places (gospels) | events.ts:140 `surexit` | C | S6; S7 |
| 12 | Peter Lord dates it c.730 | Timeline; Places | none | C | S6 and S7: "dates the book at 730"; S6 gives a style range of 698-800 |
| 13 | Gelli bought it "for the price of a good horse" and gave it to St Teilo's church | Timeline; Places | none | C | S7 verbatim. S6: "his best horse", bought from Cingal |
| 14 | The gift was recorded on the last page of Matthew's Gospel | Places | none | C | S7: "on the final page of St Matthew's Gospel" |
| 15 | "Nine or so" marginal entries added over the 9th century | Places | none | X | S6: "eight marginal inscriptions"; Willis: "one of eight additional entries". The nine in S6 are dry-point glosses (Anglo-Saxon names) |
| 16 | Surexit records a land dispute between Gelli's family and Tutfwlch; earliest connected Welsh text | Places; Language | events.ts:140 | C | S6, S7, S8 (S8 names the parties as Tudfwlch and Elgu son of Gelli; land of Telych) |
| 17 | Surexit memorandum is mid-9th century | Language; Timeline | events.ts:140 (c.830) | C | S6 marginalia section ("dated to the mid-9th century"); S7 ("mid 9th century"); Willis: "Jenkins and Owen date the text to the period 830-50". Against: S8 and language:S4 (early 8th, possibly copying a 6th/7th-century text); S1 ("end of the 8th century"). Record the split |
| 18 | The book is damaged: binding torn off, most of Luke and all of John missing | Places | none | C | S7 (Luke from 3:9 onwards) |
| 19 | At Lichfield by the late 10th century; how it left Wales is unknown | Timeline; Open questions | events.ts:140 | C | S6 (Wynsige, bishop c.963-75); S7. S1 ch_st-teilos.html offers "a likely guess" of tribute to a Saxon king, as speculation |
| 20 | Rhys ap Tewdwr ruled 1078-93 and submitted to William I in 1081 | Timeline; People | none | P | S46: reign 1078-93 confirmed; the 1081 homage is "it seems likely he came to an arrangement" |
| 21 | Rhys ap Tewdwr killed near Brecon 1093 by Bernard de Neufmarché's forces | Timeline; People | none | C | S46; S47 (Easter week 1093; "some sources state 1094") |
| 22 | Rhys ap Gruffudd fought at Llansteffan in 1146 aged c.14 | Timeline | none | P | S15 "age of fourteen"; S14 "a youth of 13" |
| 23 | A castle is first recorded at Dinefwr in 1151, built by Maredudd and Rhys | Timeline; Places | places.ts Dinefwr `namedFrom: ad(1151)`; events.ts:167 | C | S12 (Dyfed HER 882): "first mentioned at Dinefwr in 1151 when it is recorded as having been built by two brothers Maredudd and Rhys" |
| 24 | Rhys sole ruler of Deheubarth from 1155 | Timeline; People | none | C | S14; S15 |
| 25 | 1158: Henry II reduces Rhys to Cantref Mawr | Timeline | none | C | S14; S15. S15 also records an 1163 invasion in which Rhys was stripped of all his lands and imprisoned, which the note omits |
| 26 | 1165: Henry's campaign fails in bad weather | Timeline | none | C | S15: "Torrential rain forced Henry's army to retreat" |
| 27 | 1171: Rhys recognised as "justice of Deheubarth" | Timeline; People | none | P | S14: "created justice of South Wales"; S15: 1171 "Justiciar of South Wales", and in 1172 "justice on his behalf in all Deheubarth" |
| 28 | Rhys built "a castle in the new style" at Dinefwr | Timeline; Places; People | events.ts:167 `dinefwr-castle`; features.ts:296 | P | S14 confirms the phrase, but places it after the 1171-72 settlement ("At Dinefwr ... a castle in the new style was begun"). The app attaches it to 1163, "after regaining Cantref Mawr" |
| 29 | Cardigan was the earliest recorded native-built stone castle in Wales | Timeline; People | none | C | S15. S14 says only "another fortress of the same kind" |
| 30 | Christmas 1176 gathering at Cardigan, announced a year ahead, usually called the first eisteddfod | Timeline | none | C | S16, citing Brut y Tywysogion ("throughout Wales, England, Scotland, Ireland and the other islands") |
| 31 | Talley founded in the 1180s (often c.1184-85) | Timeline; Places | events.ts:181 (1185); features.ts:448; places.ts:78 | C | S17 "1180s"; S18 "in or about 1185"; S19 and Coflein 92750 "1184-89" |
| 32 | Talley the only Premonstratensian house in Wales | Places | events.ts:181; places.ts:78 | C | S17: "the first and only abbey in Wales for the Premonstratensians" |
| 33 | Talley was "his special and unique foundation" | Places; People | none | C | S14 verbatim |
| 34 | 1194: Rhys imprisoned by his sons Maelgwn and Hywel at Nevern | Timeline | none | C | S15 |
| 35 | Rhys died 28 April 1197, buried at St Davids | Timeline; People | none | C | S14; S15 |
| 36 | Rhys patron of Whitland and Strata Florida; founded Llanllŷr nunnery | People; Religion | none | C | S14; S15 ("Llanllyr was a Cistercian nunnery") |
| 37 | Rhys adopted "Norman ways in dress and domestic manners" | Homes; Clothing | none | C | S14 verbatim |
| 38 | Llywelyn ap Iorwerth forced Rhys Gryg to dismantle Dinefwr; the keep may be a rebuild | Timeline; Places | none | C | S12 (Dyfed HER 882). Single source |
| 39 | Dinefwr's visible remains date from the 13th and earlier 14th century | Places | features.ts:310 | C | S11 and S12 verbatim. The app says "early 13th and 14th centuries"; the source says "thirteenth and earlier fourteenth" |
| 40 | Dinefwr layout: two ditch-cut enclosures, high inner curtain, lower walled barbican, great round tower c.12m, smaller north tower, towered lodgings on the NE curtain | Places | features.ts:310 | C | S11 (Coflein 425, now read directly) |
| 41 | Dinefwr summerhouse: 17th/18th or 18th/19th century | Places | features.ts:338 | C | Recorded as disputed, rightly: S11 "seventeenth century"; S12 listing "C17(?)/C18"; S12 HER "late 18th to early 19th century". S13 says nothing about it |
| 42 | Dinefwr a Tudor residence under Sir Rhys ap Thomas | Places | features.ts:310 | C | S12 (HER and listing). Not in S13, which the note also cites |
| 43 | Great tower now a two-storey stump | Places | features.ts:324 cites S13 | P | Confirmed by S11 and S12; S13, which the app cites here, does not say it |
| 44 | Dinefwr grid reference | Places (lat/lon) | features.ts:74; places.ts | C | Coflein 425 SN 61150 21731 against app (261155, 221729): 5m. The note's 51.881, -4.016 is about 490m from Gatehouse's 51.87683, -4.01842 |
| 45 | Cadw: Dinefwr "fell into English control in 1287" | Timeline; Places; Open questions | events.ts:209 `english-1277` | C | S9 verbatim. S12 HER: "From 1276 onwards, the castle was largely kept in English hands"; S31: surrendered 1277. This supports reading 1287 as the end of a brief Welsh recapture, as the app already does |
| 46 | Dryslwyn built in the 1220s, probably by Rhys Gryg for his son Maredudd | Timeline; Places | events.ts:195; features.ts:420 | P | S22: "probably ... in the 1220s ... perhaps Rhys Gryg", possibly as legacies "for his two sons" (Maredudd is not named). S21: "Founded in the 13th century". Coflein 100682: "second quarter of the thirteenth century" |
| 47 | Dryslwyn the only native Welsh castle with three wards; inner ward round tower with flared base, hall, kitchen, possible prison, garderobe, remodelled gatehouse | Places | features.ts:420; places.ts:66; events.ts:195 | C | S22. But Coflein 100682: "In the later thirteenth century two further walled courts were added", so the three wards are not 1220s work |
| 48 | Dryslwyn's end of use | (not in note) | features.ts:420 (end 1430, "not in our research") | C | Coflein 100682: "decommissioned in the early fifteenth century" |
| 49 | Dryslwyn grid reference | Places (lat/lon) | features.ts:76; places.ts:66 | C | Coflein 100682 SN 55387 20288 against app (255390, 220294): 7m |
| 50 | 1287 siege: c.4,000 from Carmarthen on 9 August, joined by c.6,700 on 15 August, over 11,000 | Places (Dryslwyn) | events.ts:246 | C | S23 verbatim. S21 "11,000" |
| 51 | Siege ran 16 July to 5 September | Timeline | none | P | S23: writs went out on 16 July; the siege began "on or just after the 15 August". S21: "two weeks"; S22: "a three-week siege" |
| 52 | Trebuchet cost £14; 20 quarrymen and 24 carters | Places | events.ts:246 | C | S23 verbatim |
| 53 | Mine collapse killed "the Earl of Stafford", Sir William de Monte Caniso and Sir John de Bonvillars | Timeline; Places | events.ts:246 ("several English nobles") | P | S23 has the names and the wording "earl of Stafford". There was no Earl of Stafford until 1351 (Wikipedia *Earl of Stafford*); the man was Nicholas de Stafford, whose son Edmund became the first Baron Stafford in 1299 (Wikipedia *Edmund Stafford, 1st Baron Stafford*) |
| 54 | Dryslwyn fell by 5 September 1287; Rhys's wife and son captured | Places | events.ts:246 ("fell on 5 September") | P | S23 "captured by 5 September"; S31 "taken c. 5 September". The wife and son are in S23, not S21 or S22 as cited |
| 55 | Excavated siege finds: 2 stone balls over 16 inches, 100+ arrowheads, mail, spearhead | Places | none | C | S23 |
| 56 | Chris Caple excavated 1980-1995 | Places | none | C | S22 (Caple 2007) |
| 57 | 1248: Matilda de Braose handed Carreg Cennen to the English and Rhys Fychan recaptured it | Timeline; Places | places.ts Carreg Cennen `namedFrom: ad(1248)` | P | S25: she "granted the castle to the Norman English to spite her son, but before the English took possession of it Rhys captured the castle". He took it before the English held it, so not a recapture |
| 58 | 1277: local Welsh lords sided with Edward and Carreg Cennen passed to the English | Timeline; Places | events.ts:209 | C | S25. S26 adds that it was captured by Payn de Chaworth's army. Not in S24, which the note also cites |
| 59 | 1282: rebels seized Carreg Cennen; back in English hands by 1283 | Timeline; Places | features.ts:355 | C | S25. Not in S24 |
| 60 | Earliest castle probably built by the Lord Rhys; nothing survives above ground | Places | features.ts:355 | C | S24: "probably the work of ... the Lord Rhys"; S25: "subsumed by later English work" |
| 61 | 1283: Edward granted Carreg Cennen to John Giffard, commander at Cilmeri; Giffard and his son built it in three close phases | Places; People | features.ts:372, 389; events.ts:260 | C | S25 verbatim. S24: Giffard "fought for Edward I in the battle of Irfon Bridge". Coflein 103970: owned by the Giffards from 1283, built 1287-1321 |
| 62 | Carreg Cennen geology: Carboniferous limestone "trapped within two faults" in Old Red Sandstone country | Places; Landscape | none | C | S25 verbatim |
| 63 | Prehistoric human remains in the cave; possibly an Iron Age hillfort | Places | none | C | S25; S24; Coflein 103970 |
| 64 | Upper ward c.32 x 28m; outer ward c.60 x 60m; curtains up to 2.8m on east and north; outer walls c.1.7m, probably early 14th century | Places | features.ts:372, 389 | C | S26 |
| 65 | Cylindrical NW tower 8m across, cruciform arrowslits | Places | features.ts:372 | C | S26 |
| 66 | A four-sided "Chapel Tower" at the south-east | Places | features.ts:372 "the south-east Chapel Tower" | X | S26: the SE corner has "a small four-sided tower", and "In the middle of the eastern curtain a smaller four-sided tower was erected in which the chapel was placed" |
| 67 | NE tower c.9 x 9m with fireplace, latrine and garrison quarters | Places | features.ts:372 "about 9m square" | P | S26: "having sides of approximately 9 meters", "Its corners were cut" (it is polygonal elsewhere in S26), with a fireplace and latrine, "used for residential purposes". "Garrison quarters" is not in S26 |
| 68 | Twin octagonal-towered gatehouse with double drawbridges, portcullis, machicolations | Places | features.ts:372 "two octagonal towers" | P | S26: towers "in the shape of elongated halves of octagons"; "three drawbridges"; two portcullises; a corbel that "could support" a machicolation |
| 69 | Outer ward held stables, forge, stores, lime kiln and bread ovens | Places | features.ts:389 | P | S26 confirms stables, forge, storerooms and lime kiln in the outer ward. The bread ovens were in the upper-ward courtyard, by the gatehouse |
| 70 | Vaulted passage over 46m to a cave with a spring, used as a dovecote | Places | none | C | S26; Coflein 103970 |
| 71 | 1462: slighted by about 500 men over four months | (S24 entry) | features.ts:406 | C | S24 verbatim |
| 72 | Carreg Cennen grid reference | Places (lat/lon) | features.ts:75; places.ts | C | Coflein 103970 SN 66789 19075 against app (266801, 219083): 14m. The note's 51.849, -3.941 is about 700m from Wikipedia's 51.8544, -3.9354 |
| 73 | Talley planned as a 73m, eight-bay aisled cruciform church with transepts, rectangular chancel and crossing tower | Places | events.ts:181; features.ts:448 | C | S19 verbatim |
| 74 | Only the eastern end (chancel, transepts, tower) was ever finished; the nave stops at footings | Places; Scene ideas | events.ts:181; features.ts:448 | X | S19: "The church, in a more modest (shorter) form, was completed in the early 13th century"; "The western four bays of the central nave and the southern aisle reached a height not much higher than the foundations". Coflein 92750: "straitened circumstances reduced the nave to a relatively modest size when the church was completed". S17 says only that the church "was never fully completed" |
| 75 | Crossing tower c.29m on four massive pillars; two walls survive to c.26m | Places | features.ts:448, 462 | C | S19; Coflein 92750 ("half of a shattered 26m high tower") |
| 76 | Six transept chapels with pointed barrel vaults; chancel with three tall pointed windows | Places | features.ts:448 | C | S19 |
| 77 | Polychrome plaster, some stained glass, decorative floor tiles | Places | none | C | S19; Coflein 92750 (painted plaster from the excavations) |
| 78 | Cloister c.23 x 23m with standard ranges | Places | features.ts:448 | C | S19 |
| 79 | Talley "never enjoyed the wealth and success" of the Cistercian houses | Places | none | C | S17 verbatim. Coflein 92750 adds that it later "achieved a quiet prosperity" |
| 80 | After the dissolution villagers quarried the ruins for stone | Places | features.ts:462 | P | S18 confirms. But Coflein 92750: "The choir and presbytery were retained to serve as a parish church after 1536 and were not completely forsaken until 1772-3" |
| 81 | Talley's dissolution date | (not in note) | features.ts:448 ("the exact year is not in our research"), `to: ad(1537)` | C | Coflein 92750: "disolved in 1536" |
| 82 | Talyllychau means "head of the lakes", from two lakes north of the site | Places | places.ts:78 | C | S18 (Lewis 1844); S19 |
| 83 | Talley grid reference | Places (lat/lon) | features.ts:77; places.ts:78 | P | Coflein 92750 SN 63281 32772 against app (263199, 232800): about 85m. Coflein's point is the tower |
| 84 | Premonstratensians founded 1120 by Norbert of Xanten at Prémontré; "White Canons"; in England c.1143 | Places | none | C | S20 |
| 85 | Canons regular also did pastoral work in parishes | Places | none | NS | Not found in S20 as read. Coflein 92750 does say Talley drew income from "the canons' spiritualities" |
| 86 | Cantref Mawr: seven commotes, bounded by the Tywi, Teifi and Gwili, dense scrub, "secure refuge" | Places; Landscape | none | C | S38 verbatim |
| 87 | Maenordeilo was a commote of Cantref Mawr | Places | none | C | S39, now read directly: "Mallaen, Caeo, Maenor Deilo, Cetheiniog, Widigada, Mabelfyw, and Mabudrud" |
| 88 | Maenordeilo stayed in the lordship of Cantref Mawr until Carmarthenshire was created in 1284 | Places | none | NS | Not in S39 as read |
| 89 | Carmarthen and Cardigan were crown honours under a Justiciar of South Wales from 1240 | Places | none | C | S36 |
| 90 | Cyfraith Hywel preserved in over 40 manuscripts from the mid-13th century | Society | none | P | S41: "The earliest surviving manuscripts ... are in Latin, date from the early 13th century". No count of 40 found |
| 91 | Five classes: rulers; free Welsh; unfree; foreigners; slaves | Society | none | C | S41 |
| 92 | Bonheddig = "one having a pedigree"; breyr = Latin optimas | Society | none | C | S42. S42 adds that breyr "is never used in the North Welsh books", so it is a southern term |
| 93 | Taeogion lived in their own trefi, owed food-renders and service, could gain freedom by a church being built or by becoming a court officer | Society | none | C | S42: "A taeog became a free man if a church were built with the king's consent on his taeogtrev, or if the king raised him to be one of his twenty-four officers, or if he became a tonsured clerk" |
| 94 | Alltudion could not testify until three generations (north), possibly nine elsewhere | Society | none | C | S41 |
| 95 | Women: divorce after a third infidelity; half the common property after seven years; amobr, cowyll, agweddi, argyfrau | Society | none | C | S41. Amobr was due "on the loss of her virginity, whether on marriage or otherwise", not only on marriage |
| 96 | Cyfran: equal partition among sons, illegitimate included, youngest divides | Society; Scene ideas | none | C | S41 (illegitimate sons "provided they had been acknowledged by the father") |
| 97 | 24 court officers, 16 royal and 8 of the queen, captain of the household troop first, then the household priest ... bakeress, laundress | Society | none | C | S41 (Iorwerth redaction). S41 also says the Blegywryd redaction "is associated with Deheubarth", which is the more relevant text for Llandeilo |
| 98 | The bardd teulu was one of the 24 officers | Society; Bards | none | NS | Not in S41; the note flags it as needing a source |
| 99 | Last recorded Welsh-law case: Carmarthenshire, 1540 | Society | none | C | S41 verbatim |
| 100 | After 1284 English criminal law; arbitration and modified partible inheritance kept | Society | none | C | S36 |
| 101 | Two pennies: legal (cyfreith) and curt (cwta), the curt a third less | Money; Almanac | almanac.ts:193 `medieval-money` | C | S37 (infobox: "ceiniog cyfreith & ceiniog cwta"); S42: "The latter was a third less than the former" |
| 102 | 240 legal pence equal Charlemagne's pound | Money | none | P | S42 states it only conditionally: "If, as Dr. Seebohm thinks probable ... then 240 legal pence would equal the pound of the nova moneta of Charlemagne" |
| 103 | Gerald: the population lives almost entirely on oats and the produce of their herds (milk, cheese, butter) | Food; Almanac | almanac.ts:179 `medieval-food`, cites S44 and S41 | NS | Not in S44 or S41. Gerald's own text confirms it (Description, Book I ch. 8, Hoare trans., Gutenberg 1092): "Almost all the people live upon the produce of their herds, with oats, milk, cheese, and butter; eating flesh in larger proportions than bread" |
| 104 | Diet of "beer, bread, meat and dairy, with few vegetables beyond cabbages and leeks" | Food | none | NS | Not in S41 (only a "Leek soup" navigation link). Source unknown |
| 105 | Gerald's Description finished 1193/94 | Clothing | none | C | S44 |
| 106 | S44 gives no clothing detail | Clothing | none | C | Confirmed absent. Gerald's text itself (Gutenberg 1092): "at all seasons they defend themselves from the cold only by a thin cloak and tunic"; the bed is covered with "a coarse kind of cloth ... called brychan" |
| 107 | Gerald praises Welsh instrumental music and part-singing | Sounds | none | C | S44 |
| 108 | Llys Rhosyr is the only systematically excavated pre-conquest Welsh princely court; c.137 x 91m; 1332 sandstorm | Homes | none | P | S51 confirms the size and the sandstorm, but says "the only royal court of Gwynedd whose site has so far been excavated" |
| 109 | Middle Welsh "reasonably intelligible to a modern-day Welsh speaker" | Language | conversations.ts language note | C | S49 verbatim |
| 110 | Marcher lords kept their own chanceries | Language | none | C | S48 |
| 111 | Battle date: 17 June (Wikipedia) or 16 June | 1282 battle; Open questions | events.ts:225 | C | S27 "17 June"; S28 "16 June"; S29: Annales Cambriae, Valence "killed in Ystrad Tywi on 16 June". The app's current wording follows the Welsh annal |
| 112 | Agreed: Clare's force "captured and sacked Carreg Cennen" | 1282 battle; Timeline; People | events.ts:230; conversations.ts:181 | X | S28: Clare "occupied the bare walls of Carreg Cennen and Llandovery, recently burnt out by the Welsh"; S29: "His only achievement of note was to re-occupy the castle at Carreg Cennen". Only S27 says "captured ... sacked" |
| 113 | A detachment under William de Valence the younger went raiding or moving plunder and was ambushed | 1282 battle | events.ts:230 | C | S28 ("a raiding party led by William Valence junior"); S29 (Wykes: men "giving attention to taking plunders") |
| 114 | William de Valence the younger and Richard de Argentein killed | 1282 battle | events.ts:230 | C | S28; S29 (Oseney, Wykes). Not in S27 |
| 115 | Chronicle line "hardly any men escaped by flight, but most were cruelly killed" | 1282 battle | none | C | S29 (Wykes, in translation) |
| 116 | Five English chronicles: Trivet, Oseney, Wykes, Rishanger, Chester | 1282 battle | none | C | S28; S29 gives all five texts plus the Welsh Annales Cambriae |
| 117 | 6 July 1282: Clare removed, replaced by William de Valence the elder | Timeline; 1282 battle | events.ts:230 ("weeks later") | C | S28 verbatim. S27 gives no date |
| 118 | Wikipedia names Rhys ap Maredudd as Welsh commander | 1282 battle | events.ts:230; conversations.ts:181 | C | S27 verbatim. Contradicted by S30, S31, and by Trivet and Rishanger (in S29), who say the prince devastated the lands of Rhys son of Maredudd, "who had stayed with the king against the prince" |
| 119 | No primary chronicle names a Welsh commander | 1282 battle; Open questions | events.ts:230; conversations.ts:181 | C | S29 prints all six chronicle passages and none names one; S28 agrees. Note: the app's wording "No source we have read names the Welsh leader" is literally untrue, because S27 does |
| 120 | English force c.1,600 infantry and 100 cavalry (S27) vs c.8,000 Welsh infantry and 200 cavalry with only a few English miners (S52) | 1282 battle; Open questions | events.ts:230 ("an English force") | P | Both figures confirmed, but the 8,000 is in S28 (read), not only S52. S28: "The only Englishmen present were a tiny band of miners from the Forest of Dean". So calling the force "English" needs qualifying |
| 121 | "Great victory for the Welsh, despite the English technically winning" | 1282 battle | none | C | S27 verbatim |
| 122 | Rhys Wyndod, Rhys Ieuanc and the sons of Maredudd ab Owain supported the revolt in the south in spring 1282 | Timeline; People; 1282 battle | none | P | S33 puts them with Dafydd at Dolwyddelan, in Snowdonia, from January 1283. S28 separately suggests Gruffudd and Cynan ap Maredudd (the sons of Maredudd ab Owain) "may" have led the Welsh at Llandeilo: a better-sourced lead than Rhys Wyndod |
| 123 | Rhys ap Maredudd was the grandson of Maredudd ap Rhys Gryg | People | none | X | S31: "the son of Maredudd, son of Rhys Gryg"; S30: "succeeded his father in 1271" (Maredudd ap Rhys Gryg died 1271) |
| 124 | 1277: Rhys ap Maredudd surrendered Dinefwr and kept Dryslwyn; in 1282 he helped Edward (Llanbadarn, Ceredigion) | People | none | C | S31 verbatim |
| 125 | October 1283: Edward forced Rhys to quitclaim Dryslwyn | Timeline; People | none | X | S31: "allowed to retain Dryslwyn"; S22: "He was allowed by the English to keep his castle" until 1287. S30 says only "forced Rhys to quitclaim the castle", after a sentence about Dinefwr; S31 does not mention a quitclaim. Most probably Dinefwr; needs Griffiths (1966) |
| 126 | Rhys's revolt of 8 June 1287 took Dinefwr and Carreg Cennen; Newcastle Emlyn fell in January 1288; "dominus de Estretewy"; feud with the Giffards | People; Timeline | none | C | S30; S31 (Newcastle Emlyn "20 January 1288"; S30: a "ten-day siege") |
| 127 | Rhys captured 1289 (S30) or 1291 (S31) | Timeline; People; Open questions | none | X | Mis-attributed. S30: "eventually captured in 1291". S31 gives no capture year: "in flight in 1289", and its sources line cites Brut y Tywysogion (Peniarth 20) under 1290 for his betrayal in the woods of Mallaen. Executed at York in 1292 (S30: 2 June 1292) |

Count: C 91, P 22, NS 6, X 8 (127 claims).

## Corrections needed in the note

1. **Summary, Timeline (1282 row), People (Clare), 1282 battle "What is agreed":** replace "captured
   and sacked Carreg Cennen" with: Clare re-occupied Carreg Cennen, which the Welsh had recently burnt
   (S28, S29). Only S27 says he captured and sacked it; record that as a contradiction.
2. **1282 battle:** add that Clare's army was mostly Welsh levies (about 8,000 infantry) and that this
   figure is in S28, which was read, not only in S52. Add the Annales Cambriae's 16 June (via S29) as
   the primary Welsh date. Add that Trivet and Rishanger (in S29) put Rhys ap Maredudd on the king's
   side. Add S28's suggestion that Gruffudd and Cynan ap Maredudd may have led the Welsh.
3. **Timeline (1282 spring row) and People (Rhys Wyndod):** S33 puts Rhys Wyndod, Rhys Ieuanc and the
   sons of Maredudd ab Owain with Dafydd in Snowdonia from January 1283, not in the south in spring
   1282.
4. **People (Rhys ap Maredudd):** "grandson of Maredudd ap Rhys Gryg" becomes "son of Maredudd ap Rhys
   Gryg (d.1271)" (S30, S31).
5. **Timeline (1283 October row) and People:** remove "quitclaim Dryslwyn". S31 and S22 have him
   keeping Dryslwyn until 1287. Record that S30's quitclaim most probably refers to Dinefwr, pending
   Griffiths, *The revolt of Rhys ap Maredudd* (Welsh History Review 3:2, 1966). Drop S31 from the
   "withheld Dinefwr" and "quitclaim" citations: it supports neither.
6. **Timeline (capture row), Places (Dryslwyn), People, Open questions:** S30 says 1291. S31 says
   only that he was in flight in 1289, citing Brut y Tywysogion (Peniarth 20) under 1290 for his
   betrayal. Restate the open question as "1290 or 1291", not "1289 or 1291".
7. **Places (Talley) and Scene idea 5:** replace "only the eastern end was ever finished; the west end
   of the nave stops at footings" with: the church was completed in a shorter form in the early 13th
   century, and only the western four bays of the nave and the south aisle rose little above the
   foundations (S19; Coflein 92750). Add from Coflein 92750: founded 1184-89; dissolved 1536; the
   choir and presbytery served as the parish church until 1772-3; endowed with much of the wealth of
   the old Llandeilo Fawr clas; appropriated St Teilo's around 1215.
8. **Places (Carreg Cennen, 3D details):** the Chapel Tower stands mid-way along the east curtain, and
   the SE corner tower is a separate small four-sided tower. The NE tower is polygonal with cut
   corners, about 9m a side. The gatehouse towers are half-octagons. There are three drawbridges, not
   two. The bread ovens are in the upper ward by the gatehouse, not the outer ward (all S26).
9. **Places (Carreg Cennen, 1248):** Rhys Fychan took the castle before the English took possession
   (S25), so "recaptured" should become "seized it first".
10. **Places (Dryslwyn) and Timeline:** "Earl of Stafford" becomes "Nicholas de Stafford" (no earldom
    until 1351). The siege began on or just after 15 August; 16 July was the date of the writs (S23).
    The fall was "by 5 September", and the wife-and-son capture comes from S23, not S21 or S22. Add
    from Coflein 100682: founded in the second quarter of the 13th century; the two outer courts were
    added in the later 13th century; decommissioned in the early 15th century. The note's "for his son
    Maredudd" is not in S22, which says "for his two sons".
11. **Places (clas), Religion, Almanac:** remove "Bishop-Abbot". S1 supports "centre of a bishopric by
    the 8th century" and "a bishop in the 9th century". Change the Davies figure to "36 clasau
    identified in the Llandaff charters; Wikipedia extrapolates 150-200".
12. **Gospels:** "Nine or so marginal entries" becomes "eight" (S6; Willis). Add Jenkins and Owen's
    date of 830-50 for the Surexit (via Willis) as the specialist reading. Record the early-8th-century
    claim (S8, language:S4) and the end-of-8th claim (S1) as minority readings.
13. **St Teilo's Church:** the tower date is now a sourced contradiction, not "unverified". Coflein
    100867 says both "fifteenth century" and "around 1600", and S1's church page says "late medieval".
    1850 comes from S1's church page, not S3. Coflein 100867 also answers the Religion follow-up: the
    church "may originally have been a possession of the bishops of Llandaff, but had passed to St
    Davids by the twelfth century".
14. **Rhys ap Gruffudd:** note that S14 gives his age in 1146 as 13 and his title as "justice of South
    Wales". Add S15's 1163 invasion and imprisonment. Note that DWB places the "castle in the new style"
    after the 1171-72 settlement.
15. **Dinefwr:** the Tudor residence, the summerhouse and the two-storey stump are in S11 and S12, not
    S13; drop S13 from those claims. Add S12's HER line "From 1276 onwards, the castle was largely kept
    in English hands" to the 1287 open question, which it largely resolves.
16. **Society:** "over 40 manuscripts from the mid-13th century" becomes "the earliest surviving
    manuscripts are in Latin and early 13th century" (S41). Note that the Blegywryd redaction is the one
    associated with Deheubarth. Amobr was due on loss of virginity, not only marriage. Mark the
    Charlemagne-pound equivalence as Seebohm's conjecture.
17. **Food and Clothing:** cite Gerald directly (*The Description of Wales*, Book I ch. 8, Hoare
    trans., Project Gutenberg ebook 1092) for the oats quote, adding "eating flesh in larger
    proportions than bread". Cite it too for "a thin cloak and tunic" at all seasons and the brychan as
    bed covering; this partly closes the clothing follow-up. The "cabbages and leeks" line has no
    source found.
18. **Homes:** Llys Rhosyr is "the only royal court of Gwynedd whose site has so far been excavated"
    (S51), not the only Welsh one.
19. **Rhys ap Tewdwr:** the 1081 homage is "seems likely" in S46.
20. **Places (Talley):** "canons also did pastoral work" was not found in S20.
21. **Places (Cantref Mawr):** "until the county ... was created in 1284" is not in S39.
22. **Sources list:** update S1 to `https://www.llandeilo.org/archeology.html` and
    `https://www.llandeilo.org/ch_st-teilos.html` (both read 2026-10-02). Mark S11 as read directly
    (Coflein 425 now resolves correctly) and S39 as read directly. Add Coflein 92750, 100682, 103970
    and 100867, Willis, and Gerald (Gutenberg 1092) as new sources. Replace the note's approximate
    lat/lon values with the Coflein grid references below.

| Site | Coflein NPRN | Grid reference | App point | Offset |
|---|---|---|---|---|
| St Teilo's Church | 100867 | SN 62930 22236 | (262930, 222236) | 0m |
| Dinefwr Castle | 425 | SN 61150 21731 | (261155, 221729) | 5m |
| Carreg Cennen Castle | 103970 | SN 66789 19075 | (266801, 219083) | 14m |
| Dryslwyn Castle | 100682 | SN 55387 20288 | (255390, 220294) | 7m |
| Talley Abbey | 92750 | SN 63281 32772 | (263199, 232800) | about 85m |

## Corrections needed in app content

Line numbers are against the working tree on 2026-10-02 (uncommitted edits present); the quoted
text is the anchor. Welsh strings need the same change.

1. **src/content/events.ts:230-231 (`battle-1282`)**
   - Current: "Welsh fighters ambushed an English force returning from sacking Carreg Cennen."
   - Corrected: "Welsh fighters ambushed part of the Earl of Gloucester's army, mostly Welsh levies,
     as it returned from a plundering raid after re-occupying Carreg Cennen."
   - Current: "No source we have read names the Welsh leader."
   - Corrected: "No chronicle names the Welsh leader."
   - Source: S28, S29. (S27 names Rhys ap Maredudd, so the current wording is untrue.) Add
     `medieval:S29` to the provenance.
2. **src/content/conversations.ts:181-182 (`news-of-the-ambush` provenance)**
   - Current: "In June 1282 an English force returning from sacking Carreg Cennen was ambushed near
     Llandeilo ... No source we have read names the Welsh leader."
   - Corrected: "In June 1282 part of the Earl of Gloucester's army, returning from a plundering raid
     after it re-occupied Carreg Cennen, was ambushed near Llandeilo ... No chronicle names the Welsh
     leader."
   - Source: S28, S29.
   - Line 157, "Only the smoke over Carreg Cennen", can stay as imagined: S28 says the Welsh had
     recently burnt it.
3. **src/content/events.ts:186-187 (`talley`)**
   - Current: "Its builders planned a great church 73m long, but only the eastern end was ever
     finished."
   - Corrected: "Its builders planned a great church 73m long, but finished it in a shorter form; the
     western half of the nave never rose much above its footings."
   - Source: S19; Coflein 92750.
4. **src/content/features.ts:456-457 (`talley-abbey`)**
   - Current: "Only the east end was finished; the nave stops at its footings, and whether any of its
     bays stood is not in our research. ... It was dissolved in the 1530s; the exact year is not in
     our research."
   - Corrected: "The church was completed in a shorter form in the early 13th century: the eastern
     bays of the nave stood, while the western four bays and the south aisle rose little above their
     footings. ... It was dissolved in 1536."
   - Also line 452: `to: ad(1537)` becomes `ad(1536)`.
   - Source: S19; Coflein 92750. The model plan (TALLEY) may need eastern nave bays added; that is a
     renderer change for the owner.
5. **src/content/features.ts:462-473 (`talley-ruin`)**
   - Current: from `ad(1537)`, "much of the rest was quarried to build the village".
   - Corrected: start at 1536, and add that the choir and presbytery stayed in use as the parish church
     until 1772-3, when St Michael's was built.
   - Source: Coflein 92750. Whether to model a roofed choir from 1536 to 1773 is the owner's call.
6. **src/content/features.ts:383-384 (`carreg-cennen-inner`)**
   - Current: "a north-east tower about 9m square, the south-east Chapel Tower and a gatehouse between
     two octagonal towers".
   - Corrected: "a polygonal north-east tower about 9m across, a small square tower at the south-east
     corner, a chapel tower in the middle of the east curtain, and a gatehouse between two
     half-octagonal towers".
   - Source: S26.
7. **src/content/almanac.ts:165-166 (`clas`)**
   - Current: "by the early 9th century the seat of a bishop-abbot (one source)".
   - Corrected: "the centre of a bishopric by the 8th century, with a bishop recorded in the 9th (one
     source)".
   - Source: S1 (archeology.html, ch_st-teilos.html).
8. **src/content/almanac.ts:183-189 (`medieval-food`)**
   - Current: "Oats and dairy (milk, cheese and butter) are the core of the Welsh diet, according to
     Gerald of Wales", with provenance "known here through a summary that has not been re-read
     against his text" citing `medieval:S44`, `medieval:S41`.
   - Corrected: "The Welsh live on the produce of their herds, with oats, milk, cheese and butter,
     eating more meat than bread, according to Gerald of Wales, who toured in 1188."
   - Provenance: documented, citing a new note source for Gerald's *Description of Wales* (Book I
     ch. 8). Neither S44 nor S41 supports the claim.
9. **src/content/events.ts:251-252 (`dryslwyn-siege`)**
   - Current: "The castle fell on 5 September 1287."
   - Corrected: "The castle had fallen by 5 September 1287."
   - Source: S23 ("captured by 5 September"); S31 ("c. 5 September").
10. **src/content/features.ts:428 (`dryslwyn-castle`)**
    - Current: "their size, and when each was added, are not in our research ... when it fell out of
      use is not in our research yet".
    - Corrected: "the first castle was a round tower and hall in a walled court; the two outer wards
      were added in the later 13th century ... it was decommissioned in the early 15th century".
    - Source: Coflein 100682. Showing all three wards from 1225 is then wrong; splitting the feature at
      about 1270 is the owner's call.
11. **src/content/features.ts:324 (`dinefwr-ruin`) and :338 (`dinefwr-summerhouse`)**
    - Current: both cite `medieval:S13`.
    - Corrected: replace S13 with `medieval:S11`/`medieval:S12` (S13 says nothing about the stump or
      the summerhouse).
12. **src/content/features.ts:310 (`dinefwr-castle`)**
    - Current: "The masonry is of the early 13th and 14th centuries".
    - Corrected: "The masonry is of the 13th and earlier 14th centuries".
    - Source: S11, S12.
13. **src/content/features.ts:248, 262, 272 (`medieval-church`, `tower-church`)**
    - Current: the west tower is shown only from c.1600.
    - The same Coflein record (100867) also calls it a "fifteenth century west tower", and S1's church
      page says "late medieval". The ⓘ text should at least say sources differ (15th century or about
      1600). Whether to show a tower from the 1400s is the owner's call.
14. **src/content/features.ts:77 (`TALLEY_ABBEY`) and places.ts Talley `at`**
    - Current: (263199, 232800).
    - Corrected: Coflein 92750 gives SN 63281 32772, about 85m east-south-east. Check against the OS
      footprint before moving; Coflein's point is on the surviving tower.

## For the owner's decision

- **Dinefwr's "castle in the new style" date.** The app's `dinefwr-castle` event (events.ts:167) and
  `dinefwr-rhys` feature start at 1163, from the timeline note's archaeology. The quoted phrase is
  DWB's, and DWB places it after the 1171-72 settlement. Either keep 1163 for the archaeology and drop
  the quotation, or move the quotation to the 1170s.
- **Talley and Dryslwyn models:** whether to change the 3D plans (Talley nave bays; Talley choir in use
  to 1773; Dryslwyn's outer wards only from the later 13th century), or to change only the text.
- **St Teilo's tower:** 15th century or c.1600. Coflein contradicts itself, so this stays contested in
  the app per the project rule, but which date the model follows is a choice.
- **Surexit date:** keep c.830 (Jenkins and Owen, a specialist reading), or show 8th-9th century
  because S8 and language:S4 say early 8th. The app now says "9th century (the exact decade is
  debated)", which is defensible.
- **Status of the note:** with the corrections above applied it could move from `draft`, but the 1283
  quitclaim and the capture year still need Griffiths (1966) and a direct reading of Brut y
  Tywysogion.
