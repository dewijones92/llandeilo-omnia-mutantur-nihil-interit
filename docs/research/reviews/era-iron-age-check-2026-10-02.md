---
title: Independent check of era-iron-age.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: The Iron Age (c. 800 BC to AD 75) around Llandeilo

Reviewed note: [`../era-iron-age.md`](../era-iron-age.md) (status: draft, updated 2026-09-26).
Repo state: `main` at `97cfad9`, level with `origin/main` after `git fetch`. Line numbers for
`src/content/` refer to the **working tree on 2026-10-02**, which had uncommitted edits by another
session, so each correction below also quotes the text it targets.

## Method

- Every cited URL that resolves was downloaded and read as raw text (curl, HTML stripped, or
  `pdftotext` for PDFs), then searched for the exact wording. Nothing was judged from a summary.
- The primary report the note could not reach was read in full: Gwilym Hughes, *The Llandeilo Roman
  Forts: Archaeological Investigations 2003-2007* (Cambria Archaeology report 2006/38, December
  2007), https://heneb.org.uk/wp-content/uploads/2025/09/llandeiloromanforts2003-2007.pdf. It is
  already in the repo as `classes:S19`.
- Grid references were checked against Coflein for every site the app places.
- Independent sources used where the cited ones failed or were missing:
  - Coflein NPRN 402271 (Roman fort complex, Dinefwr Park), https://coflein.gov.uk/en/site/402271/
  - Coflein NPRN 303896 (Y Fan hillfort, i.e. Fan Camp), https://coflein.gov.uk/en/site/303896/
  - Coflein NPRN 303981 (Grongaer hillfort), https://coflein.gov.uk/en/site/303981/
  - Coflein NPRN 84030 (Carreg Cennen castle cave), https://coflein.gov.uk/en/site/84030/
  - Coflein NPRN 103970 (Carreg Cennen Castle), https://coflein.gov.uk/en/site/103970/
  - H. Mytum and J. Meek, "Experimental archaeology and roundhouse excavated signatures: the
    investigation of two reconstructed Iron Age buildings at Castell Henllys, Wales", *Archaeological
    and Anthropological Sciences* (2020), doi:10.1007/s12520-020-01028-y,
    https://livrepository.liverpool.ac.uk/3077192/1/Mytum-Meek2020_Article_ExperimentalArchaeologyAndRoun.pdf
  - "Castell Henllys Iron Age Fort", Historic UK,
    https://www.historic-uk.com/HistoryMagazine/DestinationsUK/Castell-Henllys-Iron-Age-Fort/
  - Cambridge Archaeology Field Group, "Querns and quern stones" (March 2019),
    https://www.cafg.net/docs/articles/querns%20and%20quern%20stones.pdf
  - roman-britain.co.uk, "Carmarthen (Moridunum) Roman Fort" (already `language:S29`),
    https://www.roman-britain.co.uk/places/moridunum/
- **Could not be read:** S38 (Study.com, HTTP 403 to curl and WebFetch), S39 (History.com redirects
  to the UK channel homepage from here), S44 (Wiley, HTTP 403), S22 (the Wikipedia article "Merlin's
  Hill" does not exist). S45, S23 and S49 were not re-tried; no app content uses them. S17 and S8
  give no fetchable URL.
- Six WebSearch calls were used.

## Summary

92 claims checked: **46 confirmed, 27 partly, 11 not supported by the cited source, 8
contradicted.** The site descriptions are mostly sound, the Coflein grid references for Garn Goch
and the larger Roman fort match the app exactly, and the note's honesty about gaps holds up. But
several citations point at the wrong source, and some claims the app relies on rest on sources that
do not say them:

1. **The Roman forts discrepancy is resolved, and the app is out of date.** The primary report gives
   Fort 1 as 240m x 160m inside its inner ditches (3.84ha, later 3.85ha, about 9.5 acres), "perhaps
   soon after AD 74" though "an earlier date cannot be ruled out", and Fort 2 as about 140m x 110m
   (1.54ha). The site was abandoned by about AD 140. Coflein 402271 gives 3.7ha, "constructed during
   the AD 70s", a garrison "of more than a thousand", and a possible end for the first fort between
   78 and 83. So **"8 or 12 acres" and "the 50s or the 70s"** are no longer an even contest: the 12
   acres and AD 57/58 are roman-britain.co.uk's own speculation (it measured the square as 8 acres
   and extrapolated). And **"both were abandoned in the early 2nd century"** is wrong for the first
   fort.
2. **Y Gaer Fach's "unfinished" quote is not in Coflein (S2).** It is word for word in the Bannau
   Brycheiniog NPA page (S4). The app cites S2 for it in a feature and a conversation.
3. **The "Roman rebuild" claim is misdescribed.** S6 (llandeilo.org) says Garn Goch "was probably
   rebuilt and strengthened to meet any threat" from the Romans, by the people who held it, not
   rebuilt by the Romans. S10 says the same ("strengthened to meet the Roman threat").
4. **S7 is the Cadw schedule entry, and the note attributes S4's numbers to it.** Cadw (CM037) says
   "about 11ha", "roughly 680m north-east to south-west by 130-190m", and "at least eight additional
   narrow 'postern' gates". The "11.2ha" and "at least 6 separate entrances" are BBNPA's (S4); the
   "pairs of large upright stones, which may have supported wooden gates" are Britain Express's (S10).
5. **The 16.6ha vs 11.2ha question is answered by Coflein itself**: "enclosing 16.6 hectares (the
   main hillfort plus its annexe)". Coflein's Y Gaer Fach record calls the main fort "the titanic
   11ha hillfort".
6. **Castell Henllys's 6m and 10m houses are real, but not in S30 or S31.** Mytum and Meek (2020)
   confirm a 6m house and a 10m double-ring house, and the 10m house's **doorway faced south-west**,
   against the app's "usually one door facing east or south-east", which has no source read.
7. **Spelt "from about 500 BC" has no source.** Cadw (S27) names only barley and wheat. Caseldine
   (S29) supports emmer and spelt as the main wheats in Wales, with spelt replacing emmer as the main
   crop in south-west Wales by the late Iron Age.
8. **"No Iron Age textile survives anywhere in Wales"** is in neither S35 nor S36, and one search
   found nothing either way. The app states it as fact.
9. **Coin claims go beyond S40.** The museum says "Welsh tribes did not mint their own coins but
   sometimes coins of their neighbours in England are found in Wales". It does not name the Demetae
   or say anything about whether coins were used.
10. **Grid references:** Garn Goch (both forts) and the larger Roman fort match Coflein to 0m. **Fan
    Camp is about 120m off and Grongar Hill about 110m off** their Coflein points. **Allt y Ferin's
    grid reference in the note is wrong** (SN 522 280; Coflein gives SN 52210 23280).

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

### Garn Goch

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Names Y Gaer Fawr, Y Gaer Fach; Y Garn Goch means "the red cairn" | Sites (Garn Goch) | places.ts:94-95 | C | S3: "The name means the 'red cairn'". S1 and S2 use both fort names |
| 2 | Llwyndu Camp lies further west | Sites | none | C | S1: "Llwyndu Camp hillfort a further 600m west of Y Gaer Fach" |
| 3 | About 4 miles E of Llandeilo, about 3 miles SW of Llangadog; 51.902N, 3.905W | Sites | none | C | S3 ("three miles southwest of Llangadog and four miles east of Llandeilo"; 51.902, -3.905); S7 51.9024, -3.9054. From the grid references it is 6.5km (4.1 miles) from St Teilo's |
| 4 | Y Gaer Fawr SN6912024320 (NPRN 100866); Y Gaer Fach SN6854624271 (NPRN 100872), about 180m west | Sites | features.ts:72 `GARN_GOCH`, :138; places.ts:96 | C | S1, S2 verbatim; app points (269120, 224320) and (268546, 224271) are 0m off. S1: "some 180m to the west". S7 (Cadw) wrongly says Y Gaer Fach is "a short distance to the east" |
| 5 | Y Gaer Fawr is 720m NE-SW by up to 230m at the SW end | Sites | features.ts:96-97, 118-119; events.ts:98 | C | S1: "720m from end to end, northeast to southwest, and 230m across at its widest point in the southwestern part". Against: S7 (Cadw) "roughly 680m north-east to south-west by 130-190m". The note does not record this |
| 6 | Hill at about 236m elevation | Sites | none | P | Not in Coflein. S6: "Elevation: 236 m (773 ft)" |
| 7 | Ramparts once stone-faced, about 10m high and 5m thick | Sites | events.ts:98 | C | S4: "once stood as stone-faced ramparts 10m high and 5m thick". Single source; S9 has only "local word of mouth" of about 30 feet |
| 8 | About 1,700m of main rampart plus about 700m around a northern annexe | Sites | none | C | S1 verbatim |
| 9 | Coflein describes "an elaborate gateway passage" in the SW rampart | Sites | none | P | Not verbatim. S1: "a walled and slab-lined gateway passage ... further elaborated by surviving sections of stepped drystone walling" |
| 10 | At least 8 entrances: two main gates and 6 recorded posterns | Sites; Open questions | none | C | S1: "at least eight entrances ... two prehistoric main gates ... six recorded postern gates". S7 (Cadw) says "at least eight additional narrow 'postern' gates" besides the main entrances |
| 11 | Cadw-derived text (S7) gives "at least 6" entrances, which "may have supported wooden gates", marked by pairs of upright stones | Sites; Open questions | none | X | S7 says at least eight posterns. "At least 6 separate entrances" is S4; "pairs of large upright stones, which may have supported wooden gates" is S10 |
| 12 | Y Gaer Fach is about 168m E-W by 115m, single east-facing entrance onto a walled trackway | Sites | features.ts:137 | C | S2 verbatim; S7 agrees and adds "a second rampart overlaps and runs parallel" on the west side |
| 13 | Coflein (S2): Y Gaer Fach "survives in a ruinous state and appears incomplete ... perhaps abandoned part way through a programme of rebuilding" | Sites; Scene ideas | features.ts:139-142 (label, cites S2); conversations.ts:73-75 (cites S2) | NS | Not in S2, which is two sentences long. It is S4 verbatim: "survives in a ruinous state and appears to be incomplete, perhaps abandoned part way through a programme of rebuilding that was never completed". S10: "seems to have remained unfinished" |
| 14 | Interior: central pond and boggy area, rock outcrops, at least one rock-cut roundhouse platform | Sites | features.ts:153 | C | S1. S1 also says the interior "is largely empty of clearly identifiable prehistoric domestic buildings"; S7 gives the platform as "about 14m in diameter" |
| 15 | Several Bronze Age burial mounds inside the fort (Coflein) | Sites | none | NS | Not in S1. S7 has one large cairn inside and, outside on the SE slope, a "Bronze Age cairn reported to have held a cist with traces of a cremation" |
| 16 | A stone long cairn, about 55m, on the summit; Neolithic by appearance only | Sites | none | P | S1: "Its appearance suggests a Neolithic date but no megalithic structures ... are currently visible". Unrecorded contradiction: S7 (Cadw) says it "probably dates to the Bronze Age (c. 2300 - 800 BC)", 55m x 20m x 3m |
| 17 | Possible standing stone identified in 2009 | Sites | none | C | S1: "identified by Toby Driver in September 2009" |
| 18 | Medieval farmstead: house and a 30m barn | Sites | none | C | S1. S7 gives the two buildings as 25m x 9m and 14m x 8m, "a medieval house and fold" |
| 19 | Cadw/tourism give 11.2ha (also 11.7ha) and 1.5ha | Sites; Open questions | none | P | 11.2ha is S4 and S10, not Cadw. S7 (Cadw): "about 11ha". 11.7ha is S6. 1.5ha: S2, S4, S7 |
| 20 | Coflein's 16.6ha is probably fort plus annexe, not a contradiction | Sites; Open questions | none | C | S1 says so outright: "enclosing 16.6 hectares (the main hillfort plus its annexe)". S2 calls the main fort "the titanic 11ha hillfort" |
| 21 | 16.6ha "surpassed only by Deer Park (22ha) and Penycloddiau (20.5ha) in Wales" | Sites | places.ts:98 ("one of the largest") | P | S1: "only surpassed in enclosed size in south Wales by the 22 hectare Deer Park ... the larger 20.5 hectare Penycloddiau hillfort lies in northeast Wales". "One of the largest hillforts in Wales" is verbatim S1 |
| 22 | Coflein: "a Late Bronze Age or Iron Age date is most likely ... but it may incorporate earlier monuments" | Sites | events.ts:94; features.ts:106-107 | C | S1 verbatim |
| 23 | Cadw: "probably dating to the Iron Age period (c. 800 BC - AD 74)" | Sites | events.ts:94 | C | S7 verbatim |
| 24 | llandeilo.org claims the main camp was "rebuilt by the Romans between AD 47-78" | Sites; Open questions | none | X | S6: "Date of construction of main camp in its present form: between AD 47-78" and "Garn Goch was probably rebuilt and strengthened to meet any threat" from the Romans. Natives rebuilt it against Rome. S10: "strengthened to meet the Roman threat". Still single-family, uncorroborated |
| 25 | Survey only: Hogg's photogrammetric survey (Archaeologia Cambrensis 123, 1974, 43-53); 2019 drone model by Mark Walters for BBNPA | Sites | events.ts:98 | C | S1 verbatim |
| 26 | Y Gaer Fach: 2014 watching brief by Archaeology Wales | Sites | none | C | S2: "Report No: 1284, produced by Archaeology Wales Ltd. in 2014" |
| 27 | Garn Goch has never been excavated | Sites; Almanac | events.ts:98; features.ts:108 | P | No excavation is recorded in S1, S2, S4 or S7, and S1 says timber buildings "may only be discovered through detailed excavation". But S1 lists antiquarian accounts (Laws 1893; Evans 1909-10, Trans. Carms. Antiq. Soc. V) that were not read, so "never" is an inference from absence |
| 28 | BBNPA: purpose "defensive refuges, permanent trade centres, religious sites, or multifunctional settlements. No definitive answer is provided." | Sites | none | P | Substance confirmed; the quote is not S4's wording. S4: "nobody is sure of the exact the purpose", then asks whether they were defensive, "permanently occupied towns and centres of trade, or centres of religion and ritual" |
| 29 | garngoch.org: about 5,700 years old, Neolithic, "the stone lines were never walls", religious purpose | Sites; Open questions | none | C | S5: "linear cairns, and were never walls ... assembled from about 5,700 years ago ... for religious, not military, purposes" |
| 30 | Garn Goch sits on the Demetae/Silures boundary (inference) | Sites; Scene ideas | none | C | S6 ("dominates the boundary between the Dematae and Silures"); S10. Neither cites evidence; reconstructed is right |
| 31 | A tourism source says "several hundred people" lived at Y Gaer Fawr | Sites | none | NS | Not found in S4, S6, S7, S9 or S10 |
| 32 | Geology: Ffairfach Grit sandstone (Early Ordovician); Abergwili and Llandeilo Flags on lower slopes; glacial till; Fforest Fawr Geopark | Sites; Landscape | places.ts:98 ("sandstone ridge", cites S1, S2) | P | All in S3. Not in S4, although the sources list says S4 gives "geology context", and not in S1 or S2, which the app cites |

### Roman forts, Dinefwr Park

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 33 | Found in 2003 by "ground radar/magnetometer" survey | Sites (Roman forts); Summary | events.ts:449 (`roman-forts-found`, "geophysical survey") | P | Hughes 2007: magnetometry by Stratascan, February-March 2003; S14: "magnetometer survey". "Ground radar" is only S15 (Wikipedia). The app's "geophysical" is right |
| 34 | Found where fieldwalking and metal-detecting had already turned up Roman finds | (not in note) | events.ts:449 | C | Coflein 402271: "an area that had previously surrended Roman material during fieldwalking and metal detecting"; Hughes 2007 (1993 walkover; 2000 detector finds). Heather James predicted the fort's position in 1993 |
| 35 | Excavated by Cambria Archaeology, June-July 2005; Channel 4 *Big Roman Dig*, live 2-3 July 2005 | Sites | events.ts:449 | C | Hughes 2007: "three weeks in June and July 2005"; "live broadcasts during the weekend of the 2nd and 3rd July 2005" |
| 36 | Rees (via Discover Carmarthenshire and Wikipedia): larger fort about 8 acres, up to 2,000 men, late 1st century; smaller about 3.5 acres with a vicus near its NE entrance; both abandoned early 2nd century | Sites | features.ts:214 ("8 ... acres") | P | All in S15 (Wikipedia citing Rees pp. 27-8). S13 (Discover Carmarthenshire) gives none of these figures, only "during the 70s AD ... a military fort" |
| 37 | roman-britain.co.uk: "Dynevor A" about 12 acres (4.85ha), trivallate, up to about 3,000 men, possibly under Veranius, AD 57/58 | Sites; Open questions | features.ts:214 ("12 acres"); events.ts:112 ("the 50s") | P | S14 says all this, but as its own speculation: it measured the square as "about 8 acres (c. 3.23 ha)" and reached 12 acres by "assuming ... the standard Roman military ratio of 3:2". Veranius is "possible"; "three thousand" is a capacity estimate |
| 38 | "Dynevor B" about 150m x 100m, 3.75 acres (1.54ha), possibly Agricolan, c. AD 77/78 | Sites | features.ts:221, 228 | C | S14 verbatim ("c.150 x 100m ... c. 1.54 ha"; "It is possible ... Agricola ... c. A.D. 77/78") |
| 39 | Size and date are an unresolved discrepancy pending the primary report | Sites; Open questions | features.ts:214; events.ts:112 | X | Resolved. Hughes 2007: Fort 1 internal "240m x 160m (3.84 hectares)", later "3.85 hectares", "one of the largest forts in Wales", probably "an early Flavian phase of campaigning (perhaps soon after AD 74) ... However, an earlier date for Fort 1 cannot be ruled out"; Fort 2 "c 140m x 110m (1.54 hectares)"; "abandonment by AD140". Coflein 402271: 3.7ha, "constructed during the AD 70s, though an earlier date cannot be ruled out"; later fort 1.5ha |
| 40 | Perhaps a thousand soldiers or more | (not in note) | events.ts:112 | C | Coflein 402271: "a garrison of more than a thousand, drawn from several different units". Hughes 2007: "at the very least an ala quingenaria ... or a cohors milliaria ... and perhaps even a larger legionary detachment" |
| 41 | Both forts abandoned in the early 2nd century | Sites (via S15) | events.ts:112 | X | True only of the second. Coflein 402271: "a date of between 78 and 83 for the abandonment of the early site"; "The second fort appears to have been in use until the early part of the second century". Hughes 2007: the first fort's end "remains speculative"; whole site abandoned "by AD140" |
| 42 | Larger fort drawn 230m x 200m | (not in note) | features.ts:207 | X | Hughes 2007: 240m x 160m internal. 230 x 200 is 4.6ha against a measured 3.84ha |
| 43 | Smaller fort "about 150m by 100m ... (Coflein)" | (not in note) | features.ts:221, 228 | P | Coflein 402271 gives only "an internal area of 1.5 hectares". 150 x 100 is S14; Hughes 2007 measured "c 140m x 110m" |
| 44 | Larger fort's position | (not in note) | features.ts:208; places.ts:45 | C | Coflein 402271 SN6218722534; app (262187, 222534), 0m |
| 45 | Vicus by the forts | Sites | conversations.ts:121 | C | Hughes 2007 (trench 4 targeted "the area of the vicus"); S14 "probably an associated civilian roadside settlement or vicus"; S15 "near its north east entrance" |
| 46 | Lost milestone RIB 2262 to Tacitus, AD 275/6; coins and amphora/olive-oil evidence | Sites | none | C | S14 verbatim. Hughes 2007: "recorded in 1697 ... now lost" |
| 47 | Wikipedia: "no archaeological remains have been dated" to any pre-medieval fortification on the castle rock | Sites; Open questions | none | P | S11's sentence is about a 9th-century castle: "Tradition relates that a castle was first constructed on this site by Rhodri the Great, but no archaeological remains have been dated from this period". It says nothing about prehistory |
| 48 | Coflein's Dinefwr Park record mentions no hillfort, only a speculative Roman temple under the church | Sites | none | C | S12 (266170): "built on, or near, the possible site of a Roman temple". Coflein 402271 is firmer: "A Roman building, identified as a temple, has been identified in the churchyard of St Tyfei's Church" |
| 49 | Discover Carmarthenshire asserts an Iron Age hillfort in the park, with no detail | Sites; Open questions | none | C | S13: "There is evidence of a prehistoric Iron Age hillfort within Dinefwr Park" (twice), no location or citation |
| 50 | A fort at Carmarthen (Moridunum) around AD 75 | Summary; Almanac | almanac.ts:156 (cites S14, language:S29) | P | Not in S14 or S15. `language:S29` (roman-britain.co.uk, Moridunum) puts it in the network built under "Julius Frontinus, Governor A.D. 74-77", which supports "around AD 75" |

### Other sites

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 51 | Fan Camp: SN674314, summit between Afon Dulais and Afon Tywi; scheduled 7 June 1955, CM170; probably Iron Age (c. 800 BC - AD 74); steep east side; 3.4m scarp with traces of an inner bank; in-turned entrance; two lesser banks north and south | Sites (Fan Camp) | features.ts:159-169 | C | S19 verbatim. Now cross-checked: Coflein 303896 (as "Y Fan"), "Univallate contour fort, resting on a scarp to the E ... 'splayed antenna' frontage ... enclosing further areas to the N and S" |
| 52 | Fan Camp is about 4 miles from Llandeilo | Sites | none | X | Coflein SN6751031450 is 10.3km (6.4 miles) from St Teilo's |
| 53 | Fan Camp's position, two rings, 170m x 120m | (not in note) | features.ts:161-162 | P | App (267400, 231400) is about 120m from Coflein 303896 (267510, 231450). Coflein says univallate, with outworks; no source gives a size, but the provenance is "documented" |
| 54 | Fan Camp: no excavation reported; classed Iron Age by form | Sites | features.ts:166-167 | C | Neither S19 nor Coflein 303896 records any excavation; both give period only |
| 55 | Tir Mawr: SN72102676; circular, bivallate, internal diameter about 50m; west-facing slope, stream to the south; ploughed out | Sites (Tir Mawr) | none | C | S20 verbatim ("Sources say that it is a circular, bivallate enclosure with an internal space of about 50 metres"). Single source |
| 56 | Allt y Ferin grid ref SN 522 280 (NPRN 303983) | Sites (Allt y Ferin) | none | X | Coflein 303983: SN5221023280 (SN 522 232), about 4.8km south of the note's point. It is 10.8km (6.7 miles) from St Teilo's |
| 57 | Motte built into an earlier "prehistoric" promontory enclosure; bailey about 52m NE-SW; scarps above steep slopes | Sites | none | P | Coflein 303983 says "an earlier promontory enclosure", never "prehistoric"; "subrectangular enclosure some 52m north-east to south-west". Coflein spells it "Allt y Fern" |
| 58 | The motte has a narrow ditch and a 2m counterscarp bank | Sites | none | NS | Coflein 303983: motte "27-8m in diameter & rising 6.0m to an 9.0-10m diameter summit, ditched about on all sides"; no counterscarp |
| 59 | Grongar Hill's name is from "gron gaer", circular fort | Sites (Grongar) | features.ts:177, 180 | C | S18 Wikipedia: "in Welsh gron gaer (circular fort)" |
| 60 | HLCA: a possible round barrow and a possible second hillfort; otherwise a "thin HER mention" | Sites | features.ts:180 ("a thin record") | P | S18 HLCA confirms both, but also calls Grongaer "its large Iron Age hillfort, which may have been the centre of a large territory covering all of Area 192 and beyond" |
| 61 | No size, dating or excavation detail found for Grongar | Sites | features.ts:175-180 | P | Superseded: Coflein 303981, "An irregular enclosure, c.110m NNW-SSE by 140-90m, defined by a single rampart, with traces of a ditch ... entrance to the SE & NE", at SN5734021600. App (257300, 221500) is about 110m off |
| 62 | Carreg Cennen cave: two adults and a child and a perforated horse tooth in stalagmite (c. 1907); four mid-4th-century Roman coins and a spindle whorl below the cave mouth (mid-19th century) | Sites (Carreg Cennen) | none | P | The current S16 (Wikipedia) no longer gives these details. Coflein 84030 confirms every one, and adds that the human remains "are conventionally dated to the Upper Palaeolithic" |
| 63 | Quote: "if there was an Iron Age hillfort at the site, all trace of it has been obliterated" | Sites | none | NS | Not in the current S16, which says "The site may have also been an Iron Age hillfort", citing a reference not checked |
| 64 | Dryslwyn: "no evidence has been found to support this theory" | Sites (Dryslwyn) | none | NS | S17 names no source or URL, so it cannot be checked |
| 65 | Merlin's Hill: about 300m x 180m, c. 400 BC | Sites (outside radius) | none | NS | S22: the Wikipedia article "Merlin's Hill" does not exist; the "associated visitor-attraction sources" are not named |

### People, homes, landscape, farming, clothing, trade, beliefs, language

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 66 | Ptolemy names the Demetae and two towns, Moridunum (Carmarthen) and Luentinum (Dolaucothi); the name survives in Dyfed and the Dyfedeg dialect | People & society | almanac.ts:139 | C | S24 verbatim |
| 67 | Etymology tied to *defaid* (sheep) or *defod* | People & society | none | C | S24: "defaid (sheep) as well as the Ancient Brythonic word defod (wealth, property or riches)". The note glosses defod as "custom/wealth" |
| 68 | Formalised as the *civitas Demetarum* from c. AD 75 | People & society | none | P | S25 suggests the tribe was run from Carmarthen as "Moridunum Demetarum"; no date of AD 75 is given there |
| 69 | Hillforts and farmsteads; the enclosed farmstead is the dominant type; regional variation | People & society | features.ts:82 (`FARMSTEAD_BASIS`, cites S27, S28) | P | S28: the late Iron Age record "predominantly comprises the settlements of small farming communities", and the coastal west is "predominantly occupied by small defended homesteads". S27 does not say which type was commonest. The app's "commonest kind ... in Wales" is broader than S28's west |
| 70 | Cadw: "a growing ... preoccupation with defence"; "a successful mixed subsistence economy"; warrior aristocracies with decorated weapons, jewellery, feasting equipment | People & society | none | C | S27 verbatim |
| 71 | Cadw names Montgomeryshire, Pembrokeshire and Gwynedd as almost as densely settled as today; Carmarthenshire not named | People & society | none | C | S27 verbatim |
| 72 | No population estimate found | People & society; Almanac | almanac.ts:147 (cites S28) | C | No figure in S27 or S28. S28 says only that hillforts imply "a much higher population density" in the Marches. As a gap it holds; "No estimate exists" is stronger than the evidence |
| 73 | Roundhouses: conical thatched roof; walls of wattle-and-daub, turf or drystone | Homes | almanac.ts:114 (cites S30, S31) | C | S27: "The roundhouses had conical thatched roofs and there were various methods of wall construction, including wattle-and-daub, turf and drystone". Wales-specific, but S27 is not cited there |
| 74 | Commonly a single door facing east or south-east | Homes; Almanac | almanac.ts:114 | NS | No source is cited and none read says it. Counter-example: Mytum and Meek 2020, Castell Henllys 10m house, "The doorway faced southwest" |
| 75 | Castell Henllys: Roundhouse One 10m with an inner post-ring; Two 6m; Three about the size of One without one | Homes; Almanac | almanac.ts:114 | NS | Not in S30 or S31. Confirmed by Historic UK and by Mytum and Meek 2020 (a 6m house; a 10m double-ring house, "the only roundhouse of this double ring form within the late prehistoric settlement"). Mytum and Meek add that the Chieftain's house "has been built to dimensions not quite commensurate with the evidence" |
| 76 | Castell Henllys roundhouses stand on their original post-holes, the only UK site to do this | Homes | features.ts:153 | C | S31: "the only site in Britain where this has been done"; S30a: "placed into the original post holes" |
| 77 | Castell Henllys run by Dyfed Archaeological Trust and the National Park; built from 1981 | Homes | none | P | Mytum and Meek 2020: excavation began in 1981 under owner Hugh Foster; the first reconstruction was 1982. The site is owned by Pembrokeshire Coast National Park; the Trust is not named as operator in S30 or S31 |
| 78 | One rebuild used about 90 hazel bushes and 34 oak trees | Homes | none | C | Correct, but the source is S29 (Caseldine, citing Bennett 2001), not S30: "Around 90 hazel bushes ... around 34 oak trees", plus "two thousand bundles of water reed" |
| 79 | Bryn Eryr is near Llansadwrn on Anglesey; excavated 1985-87 by Gwynedd Archaeological Trust; rammed-clay walls 1.8m thick, a first; built by over 1,000 volunteers with Heritage Lottery funding | Homes | none | C | S32, S33, S34 |
| 80 | Pollen: Castell Henllys "a largely open woodland landscape with grazing"; Great Castle Head "mainly open pastoral"; Pwll-y-hywaid earlier clearance then "marked expansion"; Wales-wide trend to more open land | Landscape | almanac.ts:70-73 (deep-time source) | C | S29 verbatim |
| 81 | Crops: barley; emmer and spelt (spelt introduced c. 500 BC, dominant in the Middle Iron Age); beans, peas, flax | Farming; Almanac | almanac.ts:80 (cites S27); conversations.ts:73 | P | S27: "Barley and wheat were grown, alongside ... beans, peas and flax". S29: "The main crops in Wales ... were emmer and spelt wheats and barley", and in south-west Wales "spelt had replaced emmer as the main crop ... at least by the late Iron Age". The c. 500 BC date has no source read |
| 82 | Cattle and sheep principal stock, plus pigs, dogs, small horses, domestic fowl; all smaller than modern breeds | Farming | almanac.ts:80; conversations.ts:73 | C | S27 verbatim. "Smaller than their modern equivalents" is not in S27 |
| 83 | Saddle querns, then rotary querns from c. 400 BC | Farming; Tools; Almanac | almanac.ts:89-95 (cites S38, S39); conversations.ts:73 | P | S38 and S39 could not be read. Independent: Cambridge Archaeology Field Group 2019, "Saddle querns remained the main method ... up until c.400BC when it was often superseded, but not entirely replaced, by the more efficient ... rotary quern", "probably introduced from Spain". General Britain only |
| 84 | Grain kept in pits and on two- and four-post structures in small defended farmsteads (Cadw) | Farming | none | C | S27: "grain storage pits, working hollows and two- and four-post settings (indicating anything from drying racks to raised granaries)" |
| 85 | Food baked in simple domed ovens inside the roundhouse | Farming | none | NS | Only from the unreadable aggregators (S38, S39) |
| 86 | Wool in natural black, brown, grey, white, plus red and blue, sometimes checked; "cross-checked" across S35 and S36 | Clothing; Almanac | almanac.ts:101 | P | S35 verbatim. S36 does not mention red, blue or checks, so the colours are single-source |
| 87 | Dyer's weed (*Reseda luteola*) the commonest yellow dye, by chemical analysis in Scandinavia and Britain | Clothing | none | C | S36 verbatim |
| 88 | Triangular fired-clay loom weights, stone on earlier sites | Clothing | none | C | S37 verbatim |
| 89 | No Iron Age textile has survived anywhere in Wales | Clothing; Almanac | almanac.ts:101 | NS | Not in S35 or S36. One search (2026-10-02) found nothing either way |
| 90 | Welsh tribes, the Demetae included, did not mint coins; west Wales did not use coined money | Tools & trade; Almanac | almanac.ts:139; conversations.ts:121 | P | S40: "Welsh tribes did not mint their own coins but sometimes coins of their neighbours in England are found in Wales". It names no tribe and says nothing about use |
| 91 | A PAS-derived summary records only 4 Roman-period objects for all of Carmarthenshire | Tools & trade; Open questions | none | X | No source is named. Hughes 2007 records seven silver denarii and other coins from Home Farm reported "under the Portable Antiquities Scheme" in 2000, and fourteen metal-detector finds from the 2005 work |
| 92 | Druids: the image comes from Tacitus; Amgueddfa Cymru says this is a Roman account, archaeologically unverified in Wales. Llyn Cerrig Bach: chariots, weapons, tools, slave chains, decorated metalwork, 300 BC to AD 100; the Cerrig-y-Drudion bowl as a crown | Beliefs; Almanac | almanac.ts:127 | P | S43 confirms the Llyn Cerrig Bach list and dates, the bowl, and the Tacitus quotation. But it names other classical writers too ("A number of sources describe the druids as performing human sacrifice"; Pliny on mistletoe), says the Anglesey association rests on Tacitus, and says only that "archaeology rarely provides certain answers". So "most of what is said about druids comes from Tacitus" overstates it |

Also checked, outside the numbered count because the note makes them in passing:

- **Ystrad Tywi** as the region's name "in this period": not supported. S48 first places it "at the start
  of the 8th century" as part of Dyfed; nothing ties the name to the Iron Age.
- **"Llandeilo" is from St Teilo, 6th century:** confirmed (S47).
- **The Demetae did not resist Rome:** partly. S6: "There is some evidence that the Dematae were
  willing to submit"; S10: "the Demetae may have". Neither gives the evidence.
- **Burial (S44, S45):** not re-read (Wiley 403; S45 not tried). No app content uses them.

Count: C 46, P 27, NS 11, X 8 (92 claims).

## Corrections needed in the note

1. **Y Gaer Fach "unfinished":** cite S4 (BBNPA), not S2. Keep the wording "appears to be
   incomplete, perhaps abandoned part way through a programme of rebuilding", which is hedged in the
   source.
2. **S7 is the Cadw scheduling text (CM037, scheduled 7 August 1933).** Move "11.2ha" and "at least
   6 entrances" to S4, and "pairs of large upright stones, which may have supported wooden gates" to
   S10. Record what S7 actually says: about 11ha; 680m by 130-190m; at least eight postern gates; a
   14m hut platform; a medieval house (25m x 9m) and fold (14m x 8m); a second rampart on Y Gaer
   Fach's west side; enclosures and roundhouses on the SE slope "which may be farmsteads of
   prehistoric date". Note that S7's "to the east" for Y Gaer Fach is wrong by the grid references.
3. **Area:** close the 16.6ha vs 11.2ha question. Coflein says 16.6ha is "the main hillfort plus its
   annexe" and calls the main fort 11ha. The length now has a real contradiction instead: 720m by up
   to 230m (Coflein) against 680m by 130-190m (Cadw).
4. **Ranking:** "surpassed only ... in Wales" becomes "surpassed in south Wales only by Deer Park
   (22ha); Penycloddiau (20.5ha) in north-east Wales is also larger" (S1).
5. **Long cairn:** add the contradiction. Coflein: Neolithic by appearance. Cadw: "probably ... Bronze
   Age". Remove "several Bronze Age burial mounds" inside the fort (not in S1); S7 has one cist
   cairn outside, on the SE slope.
6. **The AD 47-78 claim:** S6 says the fort's own people "rebuilt and strengthened" it against Rome,
   not that the Romans rebuilt it. Restate it that way in Sites and Open questions. It stays
   single-source and uncorroborated.
7. **Elevation 236m** is from S6. **Geology** is from S3; drop "geology context" from S4's source
   line. **"Several hundred people"** was not found in any source read; remove it or name the source.
8. **Purpose:** replace the invented quotation with S4's own words ("nobody is sure of the exact the
   purpose of these defended settlements"), or mark it as a paraphrase.
9. **"Never excavated":** say "no excavation is recorded", and add that S1 lists antiquarian accounts
   (Laws, *Archaeologia Cambrensis* 5th ser. X, 1893; Evans, *Trans. Carms. Antiq. Soc.* V, 1909-10)
   that have not been read.
10. **Roman forts:** replace the size and date discrepancy with the primary report (`classes:S19`)
    and Coflein 402271 (`timeline:S15`): Fort 1 240m x 160m internal, 3.84-3.85ha (Coflein 3.7ha),
    probably soon after AD 74, earlier not ruled out, garrison of more than a thousand, perhaps given up
    in 78-83; Fort 2 about 140m x 110m, 1.54ha, in use into the early 2nd century; site abandoned by
    about AD 140. Mark S14's 12 acres and AD 57/58 as its author's speculation (its own measured
    figure is 8 acres). Say the 2003 survey was magnetometry, not radar. Attribute the 8-acre and
    2,000-men figures to S15 (Wikipedia citing Rees), not to S13.
11. **S11:** its "no archaeological remains have been dated" concerns Rhodri the Great's castle, not
    prehistory. Use it only for that, or drop it from the hillfort question.
12. **Fan Camp:** about 6.4 miles from Llandeilo, not 4. Add Coflein 303896 ("Univallate contour fort",
    SN6751031450) as the second source; the claim is now cross-checked.
13. **Allt y Ferin:** grid reference SN 52210 23280. Coflein says "earlier", not "prehistoric", and
    spells it Allt y Fern. Remove the 2m counterscarp, which is not in the record.
14. **Grongar Hill:** add Coflein 303981 (SN5734021600; about 110m by 90-140m; single rampart, ditch
    traces, SE and NE entrances), and the HLCA's "large Iron Age hillfort, which may have been the
    centre of a large territory".
15. **Carreg Cennen:** cite Coflein 84030 for the cave finds instead of Wikipedia, whose current text no
    longer has them or the "obliterated" quotation. Add Coflein's "conventionally dated to the Upper
    Palaeolithic"; this bears on findings.md's "no dated Palaeolithic ... site" (conventional, not
    scientific, dating, so the finding probably stands, but it should mention this).
16. **Dryslwyn (S17), Merlin's Hill (S22):** name real sources or mark the claims unsourced.
17. **Homes:** cite Mytum and Meek 2020 (and Historic UK) for the 6m and 10m houses; add that the 10m
    house's door faced south-west, and that the Chieftain's house is not true to the evidence. Give the
    east/south-east door pattern a source or label it unsourced. Move the hazel and oak figures to S29.
    Castell Henllys: excavated from 1981, first rebuild 1982, owned by Pembrokeshire Coast National
    Park.
18. **Farming:** cite S29 for emmer and spelt, and add that spelt had replaced emmer as the main crop in
    south-west Wales by the late Iron Age. Remove "spelt introduced c. 500 BC" and the domed ovens
    unless a readable source is found. Replace S38 and S39 (unreadable) with Cambridge Archaeology
    Field Group 2019 for the c. 400 BC rotary quern.
19. **Clothing:** the colours are single-source (S35), not cross-checked. "No Iron Age textile has
    survived anywhere in Wales" needs a source; until then write "none was found in the sources read".
20. **Coins:** S40 says "Welsh tribes", not the Demetae by name, and is silent on use. Remove "did not use
    coined money" or source it.
21. **PAS:** the "4 Roman-period objects" claim has no named source and conflicts with the PAS-reported
    denarii in Hughes 2007. Remove it or name the source.
22. **Druids:** S43 names several classical writers (Pliny among them) and grounds only the Anglesey
    link in Tacitus.
23. **Language:** Ystrad Tywi is attested from the 8th century (S48), not the Iron Age.
24. **Talley area (open question):** Cadw's list of monuments near Fan Camp (S19 page) names "Cwm-Bran
    Camp, Llansadwrn" and a "Roman Fortlet 300m south west of Gallt yr Adar Fawr, Llanwrda". Both are
    leads for the Talley question, not yet checked.
25. **Sources list:** add Coflein 402271, 303896, 303981, 84030; Mytum and Meek 2020; Historic UK;
    Cambridge Archaeology Field Group 2019; and point to `classes:S19` for Hughes 2007. Mark S22, S38,
    S39 and S44 as unreadable on 2026-10-02.

| Site | Coflein NPRN | Grid reference | App point | Offset |
|---|---|---|---|---|
| Y Gaer Fawr | 100866 | SN 69120 24320 | (269120, 224320) | 0m |
| Y Gaer Fach | 100872 | SN 68546 24271 | (268546, 224271) | 0m |
| Roman forts (larger fort) | 402271 | SN 62187 22534 | (262187, 222534) | 0m |
| Fan Camp (Y Fan) | 303896 | SN 67510 31450 | (267400, 231400) | about 120m |
| Grongaer, Grongar Hill | 303981 | SN 57340 21600 | (257300, 221500) | about 110m |
| Allt y Fern (Allt y Ferin) | 303983 | SN 52210 23280 | not placed | note's SN 522 280 is about 4.8km out |

## Corrections needed in app content

Line numbers are against the working tree on 2026-10-02; the quoted text is the anchor. The Welsh
line follows each English line. My Welsh should go through the parked human Welsh check.

1. **src/content/events.ts:112-113 (`roman-forts`)**
   - Current: "Two overlapping Roman forts stood in what is now Dinefwr Park, holding perhaps a thousand
     soldiers or more. Sources disagree on their sizes and whether the first dates from the 50s or the
     70s AD. Both were abandoned in the early 2nd century."
   - EN: "Two Roman forts, one after the other, stood in what is now Dinefwr Park. The first, about
     3.8ha, held more than a thousand soldiers and was probably built soon after AD 74, though an
     earlier date cannot be ruled out. The smaller second fort was in use into the early 2nd century,
     and the site was abandoned by about AD 140."
   - CY: "Safai dwy gaer Rufeinig, y naill ar ôl y llall, yn yr hyn sydd bellach yn Barc Dinefwr. Roedd
     y gyntaf, tua 3.8ha, yn dal mwy na mil o filwyr, ac mae'n debyg iddi gael ei chodi yn fuan ar ôl 74
     OC, er na ellir diystyru dyddiad cynharach. Roedd yr ail gaer, lai, yn cael ei defnyddio hyd
     ddechrau'r 2il ganrif, a gadawyd y safle erbyn tua 140 OC."
   - Source: `timeline:S15` (Coflein 402271), `classes:S19` (Hughes 2007). Add `classes:S19` to the
     provenance.
2. **src/content/features.ts:207, 210, 214-215 (`roman-fort-a`)**
   - Current: `width: 200, length: 230`; `to: ad(95)`; "Built in the AD 70s (Coflein); sources disagree on
     its size (8 or 12 acres) and founding date. When it gave way to the smaller fort is not known, so
     its end date here is approximate."
   - Corrected size: 240m by 160m internal (which axis is which in the renderer is for the owner).
     End date: Coflein suggests 78-83; `ad(83)` would follow it (owner's call).
   - EN: "Probably built soon after AD 74, though an earlier date cannot be ruled out: about 3.8ha
     inside its defences (240m by 160m), one of the largest forts in Wales. It may have been given up
     between AD 78 and 83, but that is not proven. The internal layout is a standard Roman plan."
   - CY: "Mae'n debyg iddi gael ei chodi yn fuan ar ôl 74 OC, er na ellir diystyru dyddiad cynharach:
     tua 3.8ha o fewn ei hamddiffynfeydd (240m wrth 160m), un o'r caerau mwyaf yng Nghymru. Efallai
     iddi gael ei gadael rhwng 78 ac 83 OC, ond nid yw hynny wedi'i brofi. Cynllun Rhufeinig safonol
     yw'r trefniant mewnol."
   - Source: `classes:S19`, `timeline:S15`.
3. **src/content/features.ts:221, 228-229 (`roman-fort-b`)**
   - Current: `width: 100, length: 150`; "About 150m by 100m, in use into the early 2nd century
     (Coflein)."
   - Corrected size: about 140m by 110m internal.
   - EN: "About 140m by 110m inside (1.54ha), in use into the early 2nd century; the site was abandoned
     by about AD 140. When it was built is disputed, so its start date here is approximate."
   - CY: "Tua 140m wrth 110m y tu mewn (1.54ha), yn cael ei defnyddio hyd ddechrau'r 2il ganrif;
     gadawyd y safle erbyn tua 140 OC. Mae dadl ynghylch pryd y'i codwyd, felly bras yw'r dyddiad
     dechrau yma."
   - Source: `classes:S19`, `timeline:S15`.
4. **src/content/almanac.ts:156-158 (`roman-forts-almanac`)**
   - Current: "A Roman fort is built at Carmarthen (Moridunum) around AD 75, and two more stand at
     Dinefwr."
   - EN: "A Roman fort is built at Carmarthen (Moridunum) around AD 75, and two follow one another at
     Dinefwr."
   - CY: "Codir caer Rufeinig yng Nghaerfyrddin (Moridunum) tua 75 OC, ac mae dwy yn dilyn ei gilydd yn
     Ninefwr."
   - Source: `language:S29` (Carmarthen), `timeline:S15` (Dinefwr). S14 supports neither date; replace it.
5. **src/content/features.ts:139-142 (`garn-goch-fach`)**
   - Current: label "Y Gaer Fach, left unfinished" / "Y Gaer Fach, heb ei gorffen"; provenance
     `documented(['ironage:S2'])`.
   - EN label: "Y Gaer Fach, apparently unfinished". CY label: "Y Gaer Fach, heb ei gorffen, mae'n
     debyg".
   - Provenance: `documented(['ironage:S2', 'ironage:S4'])`. S2 has the size; only S4 says unfinished.
6. **src/content/conversations.ts:73-75 (`spelt-harvest` provenance)**
   - Current: "Spelt and cattle were staples of Iron Age Wales, rotary querns were in use from about 400
     BC, and Y Gaer Fach next door was left unfinished part way through a rebuild." Cites S27, S38, S2.
   - EN: "Spelt and cattle were staples of Iron Age Wales, rotary querns were in use in Britain from
     about 400 BC, and Y Gaer Fach next door seems to have been left unfinished, perhaps part way
     through a rebuild. The people and their words are invented."
   - CY: "Roedd sbelt a gwartheg yn hanfodol yng Nghymru Oes yr Haearn, roedd breuanau cylchdro yn cael
     eu defnyddio ym Mhrydain o tua 400 CC, ac mae'n ymddangos i'r Gaer Fach drws nesaf gael ei gadael
     heb ei gorffen, efallai hanner ffordd drwy ei hailadeiladu. Mae'r bobl a'u geiriau wedi'u dyfeisio."
   - Sources: `ironage:S27` (cattle), `ironage:S29` (spelt), `ironage:S4` (Y Gaer Fach), and a new note
     source for the querns (Cambridge Archaeology Field Group 2019) in place of the unreadable S38.
7. **src/content/almanac.ts:80-85 (`iron-food`)**
   - Current: "Barley and wheat (emmer, and spelt from about 500 BC) are the staple grains ..." citing
     only S27.
   - EN: "Barley and wheat (emmer and spelt; by the late Iron Age spelt was the main wheat in south-west
     Wales) are the staple grains, with beans, peas and flax. Cattle and sheep are the main livestock."
   - CY: "Haidd a gwenith (emer a sbelt; erbyn diwedd Oes yr Haearn, sbelt oedd y prif wenith yn
     ne-orllewin Cymru) yw'r prif rawn, gyda ffa, pys a llin. Gwartheg a defaid yw'r prif dda byw."
   - Provenance: add `ironage:S29`.
8. **src/content/almanac.ts:93-95 (`iron-querns`)**
   - Text can stay. Replace `ironage:S38`, `ironage:S39` (unreadable) with a new note source for the
     Cambridge Archaeology Field Group 2019 paper.
9. **src/content/almanac.ts:101-102 (`iron-clothes`)**
   - Current: "No Iron Age textile survives anywhere in Wales." / "Does dim tecstil o Oes yr Haearn wedi
     goroesi yn unman yng Nghymru."
   - EN: "We found no record of an Iron Age textile surviving in Wales."
   - CY: "Ni ddaethon ni o hyd i gofnod o decstil o Oes yr Haearn wedi goroesi yng Nghymru."
   - Source: none supports the universal claim (S35, S36 checked).
10. **src/content/almanac.ts:114-120 (`iron-homes`)**
    - Current: "... and usually one door facing east or south-east. Castell Henllys gives real diameters
      of 6–10m." Cites S30, S31.
    - EN: "Roundhouses: a timber frame, walls of wattle-and-daub, turf or drystone, and a conical
      thatched roof. At Castell Henllys, rebuilt on excavated post-holes, houses measure 6m and 10m
      across, and the 10m house's door faced south-west."
    - CY: "Tai crwn: ffrâm bren, waliau o blethwaith a chlai, tywyrch neu gerrig sych, a tho gwellt crwn.
      Yng Nghastell Henllys, a ailgodwyd ar y tyllau pyst a gloddiwyd, mae'r tai yn 6m a 10m ar draws,
      ac roedd drws y tŷ 10m yn wynebu'r de-orllewin."
    - Sources: `ironage:S27` (walls, roof), `ironage:S31` (original post-holes), and a new note source
      for Mytum and Meek 2020 (sizes, door). Keeping an east/south-east door claim needs a source first.
11. **src/content/almanac.ts:127-128 (`iron-belief`)**
    - Current: "Most of what is said about druids comes from Tacitus, a Roman writing about the attack
      on Anglesey. Real offerings of weapons and chariots were placed in the lake at Llyn Cerrig Bach."
    - EN: "What we hear of druids comes from Greek and Roman writers, and their link with Anglesey rests
      on Tacitus's account of the Roman attack. Real offerings of chariots, weapons and tools were thrown
      into the lake at Llyn Cerrig Bach between about 300 BC and AD 100."
    - CY: "Daw'r hyn a glywn am dderwyddon gan awduron Groegaidd a Rhufeinig, ac mae eu cysylltiad â Môn
      yn dibynnu ar hanes Tacitus am ymosodiad y Rhufeiniaid. Taflwyd offrymau go iawn o gerbydau rhyfel,
      arfau ac offer i'r llyn yn Llyn Cerrig Bach rhwng tua 300 CC a 100 OC."
    - Source: `ironage:S43`.
12. **src/content/almanac.ts:139-141 (`iron-money`)**
    - Current: "No coins: the Demetae, like other western British peoples, did not mint any."
    - EN: "No coins of their own: the tribes of Wales, the Demetae among them, minted none, though coins
      of tribes in what is now England are sometimes found in Wales."
    - CY: "Dim arian bath eu hunain: ni wnaeth llwythau Cymru, gan gynnwys y Demetae, fathu dim, er bod
      darnau arian llwythau yn yr hyn sydd bellach yn Lloegr i'w cael weithiau yng Nghymru."
    - Source: `ironage:S40`.
13. **src/content/almanac.ts:147-148 (`iron-population`)**
    - Current: "Nobody knows how many people lived here. No estimate exists for this area."
    - EN: "Nobody knows how many people lived here; we found no estimate for this area."
    - CY: "Does neb yn gwybod faint o bobl oedd yn byw yma; ni ddaethon ni o hyd i amcangyfrif ar gyfer
      yr ardal hon."
    - Source: a gap, as now (`ironage:S28`).
14. **src/content/events.ts:98-99 (`garn-goch-fort`)**
    - Current: "... It has been surveyed but never excavated, so who lived there, and how, is inference."
    - EN: "Y Gaer Fawr, 720m long with stone ramparts once about 10m high, is one of the largest hillforts
      in Wales. It has been surveyed, but no excavation is recorded, so who lived there, and how, is
      inference."
    - CY: "Mae'r Gaer Fawr, 720m o hyd gyda rhagfuriau cerrig a oedd unwaith tua 10m o uchder, yn un o'r
      bryngaerau mwyaf yng Nghymru. Mae wedi'i harolygu, ond does dim cloddio wedi'i gofnodi, felly mater
      o gasglu yw pwy oedd yn byw yno, a sut."
    - Source: `ironage:S1`, `ironage:S4` (the 10m height is S4 alone). Cadw (S7) gives the length as
      680m; consider "about 700m long", or keep 720m (Coflein) and note the difference in the ⓘ.
15. **src/content/features.ts:82-83 (`FARMSTEAD_BASIS`)**
    - Current: "Enclosed farmsteads were the commonest kind of Iron Age settlement in Wales."
    - EN: "Small enclosed farmsteads were the commonest kind of Iron Age settlement in west Wales. These
      spots are illustrative, not known sites."
    - CY: "Ffermydd bach caeedig oedd y math mwyaf cyffredin o anheddiad yn Oes yr Haearn yng ngorllewin
      Cymru. Mae'r mannau hyn yn enghreifftiau, nid safleoedd hysbys."
    - Source: `ironage:S28`.
16. **src/content/features.ts:161-168 (`fan-camp`)**
    - Current: `rings: 2`, `length: 170, width: 120`, `at: { e: 267400, n: 231400 }`; "Classified Iron Age
      by its form; never excavated."
    - Corrected: `at: { e: 267510, n: 231450 }` (Coflein 303896); `rings: 1` with the outer banks on the
      west if the renderer can show them (owner's call).
    - EN: "Classified Iron Age by its form; no excavation is recorded. A single rampart with outer banks
      on the west; its size here is a guess."
    - CY: "Wedi'i dosbarthu fel Oes yr Haearn yn ôl ei ffurf; does dim cloddio wedi'i gofnodi. Un
      rhagfur gyda chloddiau allanol ar y gorllewin; dyfaliad yw ei maint yma."
    - Source: `ironage:S19` and a new note source for Coflein 303896.
17. **src/content/features.ts:173-181 (`grongar`)**
    - Current: `length: 130, width: 110`, `at: { e: 257300, n: 221500 }`; "Known mainly from its name,
      Welsh for round fort, and a thin record. Size and date are guesses."
    - Corrected: `at: { e: 257340, n: 221600 }`; `length: 140, width: 110`.
    - EN: "Named from the Welsh for round fort: a single rampart about 110m by 90-140m (Coflein). Its date
      is a guess."
    - CY: "Wedi'i henwi o'r Gymraeg am gaer gron: un rhagfur tua 110m wrth 90-140m (Coflein). Dyfaliad yw
      ei dyddiad."
    - Source: `ironage:S18` and a new note source for Coflein 303981.
18. **src/content/places.ts:101 (`garn-goch`)**
    - Current: `cite('ironage:S1', 'ironage:S2')` for "on a sandstone ridge".
    - Corrected: `cite('ironage:S1', 'ironage:S2', 'ironage:S3')`. Neither Coflein record mentions
      sandstone; S3 does.

## For the owner's decision

- **Garn Goch's length:** 720m by 230m (Coflein) or 680m by 130-190m (Cadw). The model uses
  Coflein's figures as an oval, which encloses more than the 11ha either source gives.
- **The larger Roman fort's end date:** keep `ad(95)` or follow Coflein's 78-83.
- **The roundhouse door:** drop the east/south-east claim, or find a source (it is a common
  generalisation in British archaeology, but none was read here).
- **Garn Goch's `namedFrom: ad(1974)`** (places.ts:92): Coflein cites Laws (1893) and Evans (1909-10)
  on the site, so an older use of the name probably exists; their titles were not visible.
- **The nine roundhouses inside Y Gaer Fawr:** Coflein says the interior "is largely empty of clearly
  identifiable prehistoric domestic buildings", with one platform recorded. The feature is already
  marked reconstructed and says the number is unknown; whether nine reads as too many is a judgement.
- **Status of the note:** it should stay `draft` until corrections 1-25 are applied; the burial
  section (S44, S45) is still unchecked.
