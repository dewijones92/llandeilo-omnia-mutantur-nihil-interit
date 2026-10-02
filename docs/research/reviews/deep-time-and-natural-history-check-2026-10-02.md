---
title: Independent check of deep-time-and-natural-history.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: Deep Time and Natural History of the Llandeilo Radius

Reviewed note: [`../deep-time-and-natural-history.md`](../deep-time-and-natural-history.md) (status: draft,
updated 2026-09-26). Repo state: `main` at `5aa8465`, level with `origin/main`. Line numbers for `src/content/`
refer to the **working tree on 2026-10-02**, which had uncommitted edits by another session in `almanac.ts`,
`climate.ts` and `events.ts`, so each correction below also quotes the text it targets.

## Method

- Every cited Wikipedia page was downloaded as plain text through the MediaWiki API (and as raw wikitext where
  the content sits in a table or a maintenance template, which plain-text extracts drop: S10, S31, S35), then
  searched by keyword so wording could be checked exactly. Several pages have changed since the note was
  written on 2026-09-26; the verdicts are against the pages as read on 2026-10-02.
- Coflein NPRN 401580 (S12) and the BGS Lexicon entries LLDO and LLDC (S24, S25) were read directly. The old
  Coflein URL now redirects to `https://coflein.gov.uk/en/sites/401580`.
- Distances are from the app's own map centre (`src/domain/geo.ts`: E 262900, N 222500, radius 16,093m).
  Lake positions were converted from their Wikipedia coordinates to OS grid with `cs2cs`.
- Independent sources used where the cited ones failed or disagreed: Wikipedia *Wolves in Great Britain*;
  Daily Post (North Wales Live), "Hunting the truth about an animal that once terrorised large parts of Wales",
  7 April 2024; Amgueddfa Cymru blog, Lucy McCobb, "Trilobites in Wales", 27 August 2024; BTO BirdFacts, Red
  Kite; Aberystwyth University news, March 2015 (Welsh red kite genetics); Rhandirmwyn community site, Red Kite
  page; Charles Lyell, *The Student's Elements of Geology* (1871), ch. 26, Project Gutenberg ebook 3772;
  Wikipedia *Llyn y Fan Fach* and *Llyn y Fan Fawr*; Nature's record for Moore (1973) via its DOI. Four
  WebSearch calls were used.
- Not done: Moore (1973) was not read (paywalled; only its title was confirmed). Walker et al. 2003 (Llanilid),
  used by the timeline check for the Late Glacial keyframes, was not re-read here.

## Summary

74 claims checked: **39 confirmed, 22 partly, 6 not supported by the cited source, 7 contradicted.** The
geology and the Holocene climate phases are sound. The errors cluster in exactly the facts the app shows:

1. **Wolves did not "die out in Wales in 1166".** 1166 is the date of the *last written mention*: a "mad wolf"
   said to have killed 22 people, which historians think exaggerated. The same source says wolves probably died
   out in Wales in the 13th or 14th century, and *Wolves in Great Britain* says they were still numerous in the
   heavily wooded Welsh borders, with Edward I ordering their extermination there. Its "England 1390" is also
   contradicted: that article says wolves are generally thought to have died out in England under Henry VII
   (1485-1509). S31's own reference for the row is a paper on the *Irish* wolf. The app shows the 1166 claim.
2. **Lhuyd's trilobite letter is 1698, not 1688.** S17 says 1688, published 1689 in a book it also says came
   out in 1699, so it contradicts itself. S18 says the letter was written in 1698 and published in 1699, and
   Amgueddfa Cymru's curator says 1698. The note's own Summary says 1698 while its body says 1688. The app
   shows 1688.
3. **"Two pairs of red kites in the 1930s" is no longer in S38**, nor is "about 1,000 pairs in Wales by 2009".
   The BTO says fewer than ten breeding pairs by the 1930s and 1940s, in a small area of mid Wales;
   Aberystwyth University says that in the 1930s only a single nest was known in Wales. The figure in the app
   is unsupported, and the sources differ on the low point.
4. **The Black Mountain may not have been buried.** S7's 2,000-2,500m ice surface is an inference made over
   the Irish Sea, and the same page warns the surface over the mountains "might have been around 800 m lower".
   S1 says "the highest peaks protruded above the ice as nunataks" and that most of the (eastern) Black
   Mountains stayed unglaciated. The note records neither, and the app's "only a few thousand years before" is
   wrong: 12,500 BC is about 14,450 years ago, about 7,500-10,000 years after the maximum (S1: c. 22,000; S7:
   "some time after 24,000").
5. **Llyn y Fan Fach and Llyn y Fan Fawr are not said to be moraine-dammed, or Younger Dryas, by S26 or S27.**
   Only S1 dates cirque moraines to the Loch Lomond Stadial, and it names the features around Llyn y Fan Fach
   (not Fan Fawr), saying the lakes "occupy glacially excavated rock hollows or cirques". Both lakes lie just
   outside the ten-mile circle (10.8 and 12.6 miles from the centre).
6. **Waun Fignen Felen is 12.5 miles from the centre**, about 4km beyond the circle, not "right at the eastern
   edge". The app's "just beyond the eastern edge of this map" is fair. Coflein does not mention pollen or
   charcoal, which the app says.
7. **Calibration.** The pollen-zone table is transcribed correctly but its dates are uncalibrated radiocarbon
   years (S10 says so), and the note presents them as BC calendar dates without warning. The app's wildwood
   entry (5500-3000 BC) uses them as calendar dates. The climate keys are already in calendar years, but the
   interstadial's 12,700-10,900 BC appears in neither of the sources cited for it. The 12,500 BC environment
   keyframe was dealt with by the timeline check (verdict: contradicted). Waun Fignen Felen's "eighth millennium
   BP" is not stated to be calendar or radiocarbon.
8. **Extinctions: none is attested inside the ten miles.** Wolf is Wales-level (and see 1). Bear, lynx, boar,
   elk, reindeer, aurochs and beaver are Britain-level only; several rows marked "cross-checked" rest on S31
   alone.
9. **The Murchison open question is answered.** Lyell (1871) says Murchison divided the Lower Silurian into the
   Caradoc Sandstone and a lower group "called, from a town in Carmarthenshire, the Llandeilo flags". The year is
   not given there.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Ice surface c. 2,000m over St George's Channel, 2,250m over Anglesey, 2,500m over Man; Welsh mountains "submerged" | Ice ages; Almanac facts; 3D art notes | almanac.ts:41 `ice-buried` | P | S7 (https://en.wikipedia.org/wiki/British-Irish_Ice_Sheet) has the figures as "most likely" and "it follows that", then: "the ice surface altitude over the mountains might have been around 800 m lower than predicted". S1: "the highest peaks protruded above the ice as nunataks". Sources disagree; the note records only S7 |
| 2 | The maximum was "only a few thousand years before" 12,500 BC | (app only) | almanac.ts:41 | X | 12,500 BC is c. 14,450 BP. S1 (https://en.wikipedia.org/wiki/Geology_of_Brecon_Beacons_National_Park): "around 22,000 years ago"; S7: "some time after 24,000 years ago". So 7,500-10,000 years before |
| 3 | Ice covered the majority of the park c. 22,000 years ago, "including the Fforest Fawr/Black Mountain massif" | Timeline; Ice ages | none | P | S1 has the majority, but adds "some areas remained unglaciated including the larger part of the Black Mountains" (the eastern range, not Y Mynydd Du) and nunataks. The note drops both exceptions |
| 4 | A Welsh ice cap centred on the Brecon Beacons "fed" the Irish Sea Glacier (Devensian) | Timeline; Ice ages | none | P | S7: the glacier's edge "was pushed southwards by ice coming from the Welsh ice cap on the Brecon Beacons", in its paragraph on the **Anglian** glaciation |
| 5 | LGM sea level c. 120m lower | Ice ages | none | C | S7: "sea-level at the LGM was around 120 m lower than it is today" |
| 6 | Younger Dryas c. 12,900-11,700 BP, c. 10,900-9,700 BC | Timeline; Climate phases | climate.ts:18; events.ts:40; almanac.ts:47-48 | C | S8 (https://en.wikipedia.org/wiki/Younger_Dryas): "from around 12,900 to 11,700 years Before Present (c. 10,900 – c. 9,700 BC)". S1 gives 12,900-11,500 for the Loch Lomond Stadial; the timeline check's Llanilid source dates it locally to c. 12,600-11,400 cal BP |
| 7 | Younger Dryas cooling of 2-6°C "in Britain" | Ice ages; Climate phases | climate.ts:18 | P | S8: "2–6 °C ... in Europe"; for Great Britain it says "Icefields and glaciers formed in upland areas ... many lowland areas developed permafrost, implying a cooling of −5 °C". The app's wording is fine |
| 8 | British Younger Dryas tundra "dominated by *Dryas octopetala*" | Ice ages; Climate phases | events.ts:40 ("Tundra returned") | P | S8: its fossils "are abundant in the European (particularly Scandinavian) sediments". Nothing Britain-specific. Tundra is S10 zone III |
| 9 | The Younger Dryas ended abruptly, warming in 50-60 years | Ice ages; Climate phases | climate.ts:27 | C | S8: "warming to previous levels took place over 50–60 years". The app's HOLOCENE_WARMING basis says the climate "warmed steadily", which undersells this (minor) |
| 10 | Loch Lomond Stadial cirque moraines in these mountains | Timeline; Ice ages | almanac.ts:50 | P | The source is S1, not the S26/S27 cited: "several cirque moraines which are thought to date from the Loch Lomond Stadial ... These include the features around Llyn y Fan Fach and Llyn Cwm Llwch" |
| 11 | Llyn y Fan Fach and Llyn y Fan Fawr are dammed by Younger Dryas moraines | Ice ages; Almanac facts | almanac.ts:50 | NS | S26 (https://en.wikipedia.org/wiki/Picws_Du) and S27 (https://en.wikipedia.org/wiki/Fan_Brycheiniog) call them glacial lakes and mention moraines below the cliffs, with no date and no damming. S1: the lakes "occupy glacially excavated rock hollows or cirques". Wikipedia *Llyn y Fan Fach* (a lead) does mention moraines "damming the Lake", undated. Both lakes are outside the circle: 17.3km and 20.2km from the centre |
| 12 | Cirques Pwll yr Henllyn and Pant y Bwlch on Picws Du's "north and northeast" faces, Younger Dryas, draining via the Sawdde to the Tywi | Ice ages | none | P | S26: "northwestern and northeast faces ... home to small glaciers during the ice ages"; the drainage is right; no Loch Lomond date |
| 13 | Picws Du's talus apron and debris flows, "the best examples of such flows in Britain" | Ice ages | none | C | S26, verbatim |
| 14 | Waun Fignen Felen: peat bog at 485m on a limestone plateau, SN8250017840; Berridge 1979-81, Smith and Cloutman 1988, Barton et al. 1995 | Vegetation | events.ts:53 | C | S12 (https://coflein.gov.uk/en/sites/401580): Grid Reference SN8250017840; "located at 485m ASL in a shallow depression on a limestone plateau"; all three works cited. Community Llywel, Powys |
| 15 | From the 8th millennium BP, heath and birch were burnt to manage game | Timeline; Vegetation; Almanac facts | almanac.ts:59; events.ts:53 | C | S12: "Later in the Mesolithic, from the eighth millennium BP, local heathland and open birch woodland were burnt, to encourage large game. The change to fire management played a role in the inception of peat." It does not say whether BP is calendar or radiocarbon. The app's "pollen and charcoal show" is not in S12, which says "dated palaeoecological evidence" |
| 16 | First visited around the mid-tenth millennium BP; hazelnuts; open ground perhaps kept open by grazing | Vegetation | none | C | S12, verbatim |
| 17 | Waun Fignen Felen is "right at the eastern edge of the radius", "at/just outside E280000" | Vegetation; Open questions | events.ts:53 | X | 20.1km (12.5 miles) from the centre, about 4km beyond the circle, whose eastern edge is near E 279000. The app's "just beyond the eastern edge of this map" is acceptable |
| 18 | Godwin's British pollen-zone scheme, zones Ia-VIII with the dates tabled | Timeline; Vegetation | almanac.ts:64-73; climate.ts:9 | P | Dates transcribed correctly from S10's table (https://en.wikipedia.org/wiki/Pollen_zone), but S10: "Dates, given in years BC, are best viewed as being based on uncalibrated C-14 dates", and the table is headed "European Pollen Zones", "based on the work of J. Iversen, published in 1954". The note gives no calibration warning anywhere |
| 19 | Mixed oak wildwood 5500-3000 BC, with the first farmers clearing in it | Vegetation | almanac.ts:64-73 `wildwood` | P | Zone VII in S10, uncalibrated. S10: "Larger discrepancies begin at the end of the Boreal", so the real calendar dates are earlier. The basis text does not say so |
| 20 | Late Glacial interstadial c. 12,700-10,900 BC, with park tundra and birch | (app only) | climate.ts:9-10 | P | Neither cited source gives these dates: S8 names the Bølling-Allerød without dates in the text read, and S10's zones Ib-II are uncalibrated. The dates match the Bølling-Allerød lead recorded in findings.md |
| 21 | Holocene Climatic Optimum c. 9,500-5,500 BP, peak c. 8,000 BP; no Welsh data | Climate phases | climate.ts:36 | C | S41 (https://en.wikipedia.org/wiki/Holocene_climatic_optimum): "roughly 9,500 to 5,500 years BP, with a thermal maximum around 8000 years BP"; "Northwestern Europe experienced warming". 7550-3550 BC is the right conversion |
| 22 | Medieval Warm Period c. 950-1250, "exceptionally warm" in western Europe "per Hubert Lamb's synthesis" | Timeline; Climate phases | climate.ts:45 | P | Dates confirmed (S15, https://en.wikipedia.org/wiki/Medieval_Warm_Period). "Exceptionally warm in western Europe, Iceland and Greenland" is the IPCC First Assessment Report (1990), not Lamb, whom S15 quotes on "a notably warm climate ... around 1000–1200 CE" |
| 23 | Little Ice Age, 16th-19th centuries | Timeline; Climate phases | climate.ts:54 | C | S16 (https://en.wikipedia.org/wiki/Little_Ice_Age), now read in full: "conventionally defined as extending from the 16th to the 19th centuries, but some experts prefer ... about 1300 to about 1850" |
| 24 | Wolves extinct in Wales in 1166 | Animals table; Almanac facts | almanac.ts:170-175 `wolves` | X | S31 row (https://en.wikipedia.org/wiki/List_of_British_Isles_species_extinct_in_the_Holocene) says "1166 in Wales", citing Hickey (2000) on the Irish wolf. Daily Post, 7 April 2024 (https://www.dailypost.co.uk/news/north-wales-news/hunting-truth-animal-once-terrorised-28930293): "The last reference to them was in 1166 when a 'mad wolf' was reported to have killed 22 people, an account that historians suspect is highly exaggerated" and "It's likely they died out in the 13th or 14th centuries". *Wolves in Great Britain* (https://en.wikipedia.org/wiki/Wolves_in_Great_Britain): wolves "especially numerous in the districts bordering Wales"; Edward I ordered extermination in the Marches counties; no 1166 date |
| 25 | Wolves extinct in England in 1390 | Animals table; Almanac facts | almanac.ts:174 ("more than two centuries before England") | X | *Wolves in Great Britain*: "generally thought to have become extinct in England during the reign of Henry VII (1485–1509), or at least very rare"; a Sherwood "wolf hunt land" tenure is recorded in 1433 |
| 26 | Lhuyd's letter to Lister in 1688, published 1689 | Geology; Almanac facts | almanac.ts:231-232 `trilobite` | X | S17 (https://en.wikipedia.org/wiki/Edward_Lhuyd) says 1688/1689, but also that the *Lithophylacii* was published in 1699. S18 (https://en.wikipedia.org/wiki/Ogygiocarella): "a letter written (1698) to Dr. Martin Lister and published (1699)". Amgueddfa Cymru (https://museum.wales/blog/2662/--Trilobites-in-Wales/): "His letters about his travels in 1698 included drawings of some trilobites he found near Llandeilo" |
| 27 | The find was probably made in the grounds of Dinefwr | Geology; Almanac facts | almanac.ts:231 | C | S18: "found by him near Llandeilo, probably on the grounds of Lord Dynefor's Castle". Amgueddfa Cymru: "near Llandeilo in Carmarthenshire". Dinefwr itself is single-source |
| 28 | He called it "the skeleton of some flat fish"; it is *Ogygiocarella debuchii* | Geology; Almanac facts | almanac.ts:231 | C | S17, S18 ("… Sceleton [sic] of some Flat-Fish …"), Amgueddfa Cymru |
| 29 | *Lithophylacii Britannici Ichnographia* (1699), the first fossil catalogue, funded by Newton | Geology | none | C | S17, verbatim |
| 30 | *Ogygiocarella* first occurs "in the Lower Llandeilian Stage as developed at Llandeilo" | Geology | almanac.ts:233 (cited) | C | S18, verbatim |
| 31 | Beaver extinct in Britain in the 16th century; last English reference 1526 | Animals table | almanac.ts:218-224 `beaver` | C | S34 (https://en.wikipedia.org/wiki/Eurasian_beaver), verbatim. Britain-level; no Welsh or local record in S34 |
| 32 | Beavers at Cors Dyfi since 2021 "on a trial basis"; free-living by 2024; Welsh Government backing, September 2024 | Animals table; Almanac facts | almanac.ts:334 `beavers-back` | P | S34: "a family of beavers has lived since 2021 in the Cors Dyfi nature reserve"; NRW 2024 and the September 2024 announcement confirmed. "Trial" is not in S34 |
| 33 | Red kite reduced to a handful of pairs in south Wales by the 20th century | Animals table; Almanac facts | almanac.ts:307 `red-kite` | C | S38 (https://en.wikipedia.org/wiki/Red_kite): "restricted to a handful of pairs in South Wales" |
| 34 | Down to two pairs in the 1930s | Animals table; Almanac facts | almanac.ts:307 | NS | Not in S38 as read. BTO (https://www.bto.org/learn/about-birds/birdfacts/red-kite): "fewer than ten breeding pairs remained by the 1930s and 1940s, concentrated into a small area of mid Wales". Aberystwyth University (https://www.aber.ac.uk/en/news/archive/2015/03/title-164261-en.html): "The lowest point was in the 1930s when only a single nest was known in Wales". The two disagree |
| 35 | About 1,000 pairs in Wales by 2009; recovery from 1989 | Animals table | none | NS | Neither is in S38; its 1989 is the first releases in Scotland and Buckinghamshire. BTO: the Welsh population "rose to 100 pairs by 1993"; Aberystwyth: "around 100 pairs by 1990" |
| 36 | Llanddeusant is a kite feeding and viewing site | Animals table; Almanac facts | almanac.ts:307 | C | S38: "a Red Kite Feeding Station at Llanddeusant in the Brecon Beacons, visited daily by over 50 birds". Whether it still operates was not checked |
| 37 | Voted "Wales's favourite bird" | Animals table | none | C | S38, attributed to the Welsh Kite Trust |
| 38 | The Tywi is thought to produce more double-figure sea trout than any other British river | Animals table; Almanac facts | almanac.ts:316 `sewin` | C | S40 (https://en.wikipedia.org/wiki/River_Tywi): "thought to produce more double-figure (10 lbs plus ...) sea trout than any other in Britain" |
| 39 | The Tywi is still fished from coracles, rounder and deeper for tidal water | Almanac facts | almanac.ts:316 | P | S41b (https://en.wikipedia.org/wiki/Coracle): "the Carmarthen coracle is rounder and deeper, because it is used in tidal waters on the Tywi". That is the tidal river at Carmarthen, not Llandeilo, where the entry sits |
| 40 | Eight coracle licences on the Tywi | Sources (S41b) | none | NS | Not found in S41b |
| 41 | Otters thriving; salmon run in summer and autumn; sewin enter in spring and early summer | Animals table | none | C | S40, verbatim |
| 42 | The Dynevor herd was one of four domesticated White Park herds left by 1946 | Animals table | conversations.ts:331 (cited) | C | S35 (https://en.wikipedia.org/wiki/White_Park_cattle), verbatim. S37: the deer park "contains notable herds of rare White Park cattle and fallow deer" |
| 43 | White Park cattle at Dinefwr "for over a thousand years", in the Laws of Hywel Dda; S35 flags its history as disputed | Summary; Animals table; Almanac facts | none | P | Only S36 (https://en.wikipedia.org/wiki/Dinefwr_Park_National_Nature_Reserve) has the thousand years and Hywel Dda, unsourced. S35's wikitext carries `{{disputed}}` and `{{original research}}` (January 2017): confirmed |
| 44 | Deer park landscaped from 1775; fallow deer | Animals table | none | C | S37 (https://en.wikipedia.org/wiki/Newton_House,_Llandeilo), verbatim |
| 45 | Abergwilli Formation, Ffairfach Grit (forming Y Garn Goch), Llandeilo Flags Formation, between Llandeilo and Llangadog | Geology; Almanac facts | none | C | S1, verbatim |
| 46 | Silurian Myddfai Steep Belt (Wenlock, Ludlow, Pridoli) | Timeline table (cites S2) | none | P | It is in S1, not S2 |
| 47 | Ordovician rocks run up the Vale of Towy, "intricately intermixed", intensely faulted and folded by the Caledonian Orogeny | Geology | none | C | S2 (https://en.wikipedia.org/wiki/Geology_of_Wales), verbatim |
| 48 | Old Red Sandstone formations; Plateau Beds and Grey Grits cap Pen y Fan and Corn Du; 419-358 Ma | Timeline; Geology | none | P | Formations and summits confirmed in S1. The 419-358 Ma range was not found in S4's current text |
| 49 | ORS colours from iron oxide but grey and green to red and purple; dunes, lakes, rivers, estuaries | Geology | none | C | S4 (https://en.wikipedia.org/wiki/Old_Red_Sandstone), verbatim |
| 50 | Carboniferous Limestone belt with karst and caves (Ogof Ffynnon Ddu); an outlier at Carreg Cennen | Geology | none | C | S1. Ogof Ffynnon Ddu is in the upper Swansea valley, well outside the circle |
| 51 | Coal rank rises to anthracite north and west of Neath | Geology | none | C | S5, verbatim |
| 52 | Carreg Cennen Disturbance, Pembrokeshire to Shropshire; the crag a limestone block between two faults; the Cennen follows the fault for over 4km; a cave with a spring and prehistoric human remains | Geology | none | C | S6 (https://en.wikipedia.org/wiki/Carreg_Cennen_Castle), verbatim |
| 53 | Old Red Sandstone erratics on limestone pavement | 3D art notes | none | C | S1: "those of Old Red Sandstone perched on various of the limestone pavements" |
| 54 | BGS LLDO "Llandeilo Rocks (undifferentiated)" obsolete, Abereiddian Stage to Caradoc Series, 468-449.75 Ma, chert/mudstone/wacke; successor LLDC | Geology; Almanac facts | none | P | Obsolete status, age range by stage and successor confirmed (https://webapps.bgs.ac.uk/lexicon/lexicon.cfm?pub=LLDO, ?pub=LLDC). The Ma figures and the lithology are not on either page today (lithology reads "[Obsolete: use LLDC]") |
| 55 | Threefold Arenig / Llandeilo ("mainly volcanic, with shale") / Caradoc scheme; Sedgwick coined Arenig in 1847 | Geology | none | NS | Cited to S9, which is *Periglaciation* and contains none of it. Lyell (1871) says Sedgwick "had described, in 1843, strata ... in the Arenig mountain", and calls the lowest unit "the Arenig or Lower Llandeilo formation" |
| 56 | Lapworth's 1879 Ordovician resolved the Cambrian/Silurian ("Highlands Controversy") dispute | Geology | none | P | S23 confirms the proposal but gives no year, and names the Highlands Controversy as a separate achievement |
| 57 | Open question: did Murchison name the Llandeilo unit? | Open questions | none | C | Lyell, *Student's Elements of Geology*, ch. 26 (https://www.gutenberg.org/files/3772/old/3772-h/files/ch26.html): "The Lower Silurian strata were originally divided by Sir R. Murchison into the upper group ... Caradoc Sandstone, and a lower one, called, from a town in Carmarthenshire, the Llandeilo flags." No year given |
| 58 | *Gravicalymene* from Birdshill Quarry near Llandeilo | Geology | none | C | S19: "Found only in the Birdshill Limestone (Pusgillian or lowest Cautleyan Stage) at Birdshill Quarry, near Llandeilo". That is Ashgill age, later than the Llandeilo stage |
| 59 | *Bumastus* is among the trilobites "recorded from the district" | Geology | none | X | S20 (https://en.wikipedia.org/wiki/Bumastus): "Dobrotivian age/stage (Llandeilo age) of China and France"; type species from the Wenlock of England. Nothing from Llandeilo |
| 60 | Darriwilian overlaps upper Arenig and Llanvirn; Sandbian 458.2-452.8 Ma | Geology | none | C | S21, S22, verbatim |
| 61 | John Cope found a small Precambrian/Cambrian outcrop in Carmarthenshire | Sources (S3) | none | C | S3, verbatim |
| 62 | Elm Decline 4300-3250 BCE, "millions" of elms; clearance by axes, ring-barking, burning; regrowth within centuries | Vegetation; Animals table | none | C | S11 (https://en.wikipedia.org/wiki/Neolithic_British_Isles), verbatim |
| 63 | Domesticated animals and plants "carried by boat" c. 4000 BC | Animals table | none | P | The boat sentence (Parker Pearson) has no date; S11 separately says "Around 4000 BC, migrants began arriving from Central Europe" |
| 64 | Moore (1973) linked blanket-bog spread in upland Wales to prehistoric land use | Vegetation; Climate | none | NS | S13 (*Blanket bog*) no longer mentions Moore. The paper exists: Nature's DOI record (https://doi.org/10.1038/241350a0) gives the title. Its content was not read |
| 65 | The Bronze Age climate turned much wetter, pushing people from hills to valleys | Timeline; Vegetation | none | P | S14, verbatim, but in its section on the Wessex culture of southern Britain, not Wales |
| 66 | Upland Bronze Age settlement read as a climate "warmer than currently" | Vegetation | none | C | S27, verbatim; S26 says "much warmer than today" |
| 67 | Cors Caron from 12,000 years ago; trees that died c. 3000 BC; *Sphagnum imbricatum* to the 18th century | Vegetation | none | C | S28, verbatim |
| 68 | Coygan Cave: bout coupé handaxes 64,000-38,000 BCE; Rolleston's "most perfect instance of a hyena den"; quarried away | Animals table | none | C | S29, verbatim |
| 69 | Paviland: mammoth tusk, "bones of elephants", ivory rods and rings; burial c. 34,000 years ago | Animals table | none | C | S30 (now *Red Lady of Paviland*), verbatim |
| 70 | Paviland's climate then "like present-day Siberia", summers c. 10°C | Animals table | none | X | S30 gives that as the view under the old dating, then: "The new dating, however, indicates he lived during a warmer period" |
| 71 | Reindeer c. 9000 BCE, elk c. 3600 BCE, bear c. 500 CE, lynx c. 700 or c. 1760, boar c. 1400, marked "cross-checked" | Animals table | none | P | Transcribed correctly from S31's table, Britain-wide only. Only S31 is cited for each, so "cross-checked" is not earned (aurochs is the exception, with S32) |
| 72 | Latest British aurochs fossil 3,245 BP | Animals table | none | C | S32, verbatim: "probably extinct by 3,000 years ago" |
| 73 | Pine marten: 2012 Newtown roadkill, first Welsh record since 1971; 20 animals from Scotland to mid Wales, autumn 2015 | Animals table | none | C | S39, verbatim. The planned 2016 release was not checked |
| 74 | Summary: "Lhuyd's 1698 discovery"; body: 1688 | Summary vs Geology | none | P | The note contradicts itself; the Summary has the better-supported year (see 26) |

## Corrections needed in the note

1. **Wolf rows and almanac fact:** 1166 is the last written mention in Wales (a probably exaggerated "mad wolf"
   killing 22 people), not an extinction date; extinction in Wales was probably in the 13th or 14th century
   (new source, Daily Post 2024, quoting Dr Juliette Wood of Cardiff University's folklore work for the
   context). England is "generally thought" to be under Henry VII, 1485-1509, not 1390 (*Wolves in Great
   Britain*, a lead). Record that S31's reference for the row is an Irish wolf paper. Keep the label
   single-source.
2. **Lhuyd:** change 1688/1689 to "a letter written in 1698, published in 1699" (S18, Amgueddfa Cymru), and
   record that S17 gives 1688/1689 and contradicts its own 1699 publication date. This also fixes the clash
   between the Summary and the body.
3. **Red kite row:** remove "2 pairs in the 1930s", "~1,000 pairs by 2009" and "recovery from 1989 onward".
   Replace with BTO ("fewer than ten breeding pairs ... by the 1930s and 1940s ... small area of mid Wales";
   100 pairs by 1993) and Aberystwyth University ("only a single nest was known in Wales" in the 1930s), noting
   that they disagree. A lead worth a follow-up: the Rhandirmwyn community site says the upper Tywi valley
   around Rhandirmwyn was for the early 20th century "the only place in Britain" the kite survived. Re-label
   the row single-source until the RSPB or Welsh Kite Trust is read.
4. **Ice ages:** add S1's exceptions (most of the eastern Black Mountains unglaciated; the highest peaks stood
   out as nunataks) beside S7's buried-mountains inference and its own "800 m lower" caveat, as a contradiction
   between sources. Move the "Welsh ice cap fed the Irish Sea Glacier" sentence to the Anglian, where S7 puts it.
5. **Lakes and cirques:** cite S1 for the Loch Lomond Stadial moraines and name only Llyn y Fan Fach; say S1
   describes the lakes as occupying glacially excavated hollows; drop "dammed" (or cite the *Llyn y Fan Fach*
   page as a lead, without a date). Record that both lakes lie just outside the circle. The Picws Du cirques are
   on its northwestern and northeast faces, undated in S26.
6. **Calibration warning:** above the pollen-zone table, quote S10: the dates are "best viewed as being based
   on uncalibrated C-14 dates", with larger discrepancies from the end of the Boreal. Call the table Iversen's
   European zones as S10 does. Say whether Coflein's "eighth millennium BP" is calendar or radiocarbon is not
   stated. Consider adding a calibrated Late Glacial source (the timeline check's Walker et al. 2003, Llanilid)
   and a Bølling-Allerød source, which climate.ts already relies on.
7. **Waun Fignen Felen:** 20.1km (12.5 miles) from the app's centre, about 4km outside the circle; delete
   "right at the eastern edge" and the E280000 framing (the edge is near E 279000).
8. **Paviland:** the "present-day Siberia" climate belongs to the old dating; S30 says the new dating
   indicates a warmer period.
9. **Geology:** move the Arenig/Llandeilo/Caradoc paragraph off S9; cite Lyell (1871) for Murchison naming the
   Llandeilo flags "from a town in Carmarthenshire" and for Sedgwick's 1843 Arenig work, and close that open
   question except for the year. Remove *Bumastus* from "trilobites recorded from the district". Note that
   *Gravicalymene* is Ashgill, not Llandeilo, age. Drop "1879" and the "Highlands Controversy" gloss, or source
   them. Drop the LLDO Ma figures and lithology, or source them. Cite S1 for the Myddfai Steep Belt.
10. **Smaller fixes:** "exceptionally warm" is the IPCC 1990 wording, not Lamb's (S15). S16 has now been read
    in full (alternative span about 1300-1850). S13 no longer cites Moore; cite the paper by DOI as unread.
    S14's wetter Bronze Age is southern Britain. Domestic animals: separate the dateless boat quote from S11's
    c. 4000 BC. The "thousand years / Hywel Dda" claim is S36 only. S41b does not give eight licences. S4's
    419-358 Ma was not found. S34 does not say "trial". Rows marked cross-checked on S31 alone become
    single-source.
11. **Extinction table, scale:** add a column or a note saying none of the extinctions is attested inside the
    ten miles; the wolf is Wales-level and the rest are Britain-level.
12. **Sources to add:** S42 Daily Post 2024 (wolves); S43 Amgueddfa Cymru, "Trilobites in Wales" (2024); S44 BTO
    BirdFacts, Red Kite; S45 Aberystwyth University news, March 2015; S46 Lyell, *Student's Elements of Geology*
    ch. 26. Leads, not yet sources: *Wolves in Great Britain*, *Llyn y Fan Fach*, the Rhandirmwyn red kite page.
    A local lead from S42: wolf paws kept at Island House, Laugharne, "apparently sourced from Dinefwr". Then
    run `node tools/research/extract-sources.mjs`.
13. **findings.md line 52** repeats both errors (1688; "wolves died out in Wales in 1166"); update it with the
    note.

## Corrections needed in app content

Each correction quotes the current text. New source keys (S42-S46) must first be added to the note and the
sources regenerated.

1. **`src/content/almanac.ts:170-176` (`wolves`).** Sources: deeptime:S42 (replacing deeptime:S31).
   - Current (en): "Wolves still roam Wales, but not for long: they are said to have died out in Wales in 1166, more than two centuries before England (one source)."
   - Corrected (en): "Wolves still roam Wales. The last written mention of one, in 1166, is a probably exaggerated tale of a “mad wolf” that killed 22 people; they probably died out here in the 13th or 14th century (one source)."
   - Current (cy): "Mae bleiddiaid yn dal i grwydro Cymru, ond nid am hir: dywedir iddyn nhw ddiflannu o Gymru yn 1166, dros ddwy ganrif cyn Lloegr (un ffynhonnell)."
   - Corrected (cy): "Mae bleiddiaid yn dal i grwydro Cymru. Y sôn ysgrifenedig olaf am un, yn 1166, yw stori wedi'i gorliwio, mae'n debyg, am “flaidd gwallgof” a laddodd 22 o bobl; mae'n debyg iddyn nhw ddiflannu o Gymru yn y 13eg neu'r 14eg ganrif (un ffynhonnell)."
   - Consequential: the range `ad(1100)`-`ad(1166)` ends at a mention, not an extinction; `ad(1300)` fits the
     source better. "Here" in the English means Wales; S42 is Wales-level, not local.
2. **`src/content/almanac.ts:227-234` (`trilobite`).** Sources: deeptime:S18, deeptime:S43 (replacing deeptime:S17).
   - Current (en): "In 1688 Edward Lhuyd records a find probably made in Dinefwr’s grounds: ..."
   - Corrected (en): "In 1698 Edward Lhuyd records a find probably made in Dinefwr’s grounds: ..." (rest unchanged)
   - Current (cy): "Yn 1688 mae Edward Lhuyd yn cofnodi darganfyddiad o dir Dinefwr, mae'n debyg: ..."
   - Corrected (cy): "Yn 1698 mae Edward Lhuyd yn cofnodi darganfyddiad o dir Dinefwr, mae'n debyg: ..." (rest unchanged)
   - The range `ad(1680)`-`ad(1700)` still holds.
3. **`src/content/almanac.ts:303-310` (`red-kite`).** Sources: deeptime:S44, deeptime:S45, deeptime:S38.
   - Current (en): "Red kites cling on in Britain only in mid and south Wales, down to just two pairs in the 1930s. They recover, and are fed today at Llanddeusant."
   - Corrected (en): "Red kites cling on in Britain only in a small area of mid Wales: fewer than ten breeding pairs by the 1930s, and one account says a single known nest. They recover, and are fed at Llanddeusant."
   - Current (cy): "Dim ond yng nghanolbarth a de Cymru y mae barcutiaid ar ôl ym Mhrydain, i lawr i ddau bâr yn y 1930au. Maen nhw'n adfer, ac yn cael eu bwydo heddiw yn Llanddeusant."
   - Corrected (cy): "Dim ond mewn ardal fach o ganolbarth Cymru y mae barcutiaid ar ôl ym Mhrydain: llai na deg pâr yn nythu erbyn y 1930au, ac mae un adroddiad yn sôn am un nyth hysbys yn unig. Maen nhw'n adfer, ac yn cael eu bwydo yn Llanddeusant."
   - "Today" is dropped because the feeding station's current operation was not checked.
4. **`src/content/almanac.ts:37-44` (`ice-buried`).** Sources: deeptime:S1, deeptime:S7.
   - Current (en): "Only a few thousand years before, the ice sheet’s surface stood about 2,000–2,500m up around the Irish Sea, so even the Black Mountain lay beneath it."
   - Corrected (en): "About 8,000 years before, at the height of the last ice age, ice covered most of these mountains. One reconstruction puts its surface 2,000–2,500m up around the Irish Sea, though the highest peaks may have stood out above it."
   - Current (cy): "Ychydig filoedd o flynyddoedd ynghynt, roedd wyneb y llen iâ tua 2,000–2,500m i fyny o gwmpas Môr Iwerddon, felly roedd hyd yn oed y Mynydd Du oddi tano."
   - Corrected (cy): "Tua 8,000 o flynyddoedd ynghynt, ar anterth yr oes iâ ddiwethaf, roedd iâ yn gorchuddio'r rhan fwyaf o'r mynyddoedd hyn. Mae un ail-greu yn rhoi ei wyneb 2,000–2,500m i fyny o gwmpas Môr Iwerddon, er efallai fod y copaon uchaf yn codi uwch ei ben."
5. **`src/content/almanac.ts:46-53` (`younger-dryas-lakes`).** Sources: deeptime:S1, deeptime:S26 (replacing deeptime:S27).
   - Current (en): "Small glaciers reform in the high hollows. Llyn y Fan Fach and Llyn y Fan Fawr are held back by the moraines they leave."
   - Corrected (en): "Small glaciers reform in the high hollows of the Black Mountain. The moraines they leave are thought to include those around Llyn y Fan Fach, just beyond the edge of this map."
   - Current (cy): "Mae rhewlifoedd bach yn ail-ffurfio yn y pantiau uchel. Mae Llyn y Fan Fach a Llyn y Fan Fawr yn cael eu dal gan y marianau maen nhw'n eu gadael."
   - Corrected (cy): "Mae rhewlifoedd bach yn ail-ffurfio ym mhantiau uchel y Mynydd Du. Credir bod y marianau maen nhw'n eu gadael yn cynnwys y rhai o gwmpas Llyn y Fan Fach, ychydig y tu hwnt i ymyl y map hwn."
6. **`src/content/events.ts:53-54` (`mesolithic-burning`).** Source: deeptime:S12 (unchanged).
   - Current (en): "... pollen and charcoal show Mesolithic people deliberately burning heath and birch to manage game, from about 8,000 years ago."
   - Corrected (en): "... dated environmental evidence shows Mesolithic people deliberately burning heath and open birch woodland to encourage large game, from about 8,000 years ago."
   - Current (cy): "... mae paill a golosg yn dangos pobl Oes Ganol y Cerrig yn llosgi rhos a bedw yn fwriadol i reoli helfilod, o tua 8,000 o flynyddoedd yn ôl."
   - Corrected (cy): "... mae tystiolaeth amgylcheddol wedi'i dyddio yn dangos pobl Oes Ganol y Cerrig yn llosgi rhos a choetir bedw agored yn fwriadol i ddenu helfilod mawr, o tua 8,000 o flynyddoedd yn ôl."
7. **`src/content/almanac.ts:55-62` (`mesolithic-fire`).** Source: deeptime:S12 (unchanged).
   - Current (en): "On the Black Mountain plateau, hunters burn heath and birch to keep ground open for game."
   - Corrected (en): "On the Black Mountain plateau, just east of this map, hunters burn heath and open birch woodland to draw large game."
   - Current (cy): "Ar lwyfandir y Mynydd Du, mae helwyr yn llosgi rhos a bedw i gadw tir agored i'r helfilod."
   - Corrected (cy): "Ar lwyfandir y Mynydd Du, ychydig i'r dwyrain o'r map hwn, mae helwyr yn llosgi rhos a choetir bedw agored i ddenu helfilod mawr."
8. **`src/content/almanac.ts:316-317` (`sewin`).** Sources: deeptime:S40, deeptime:S41b (unchanged).
   - Current (en): "The Tywi is reputed to produce more big sewin (sea trout) than any other British river, and is still fished from coracles."
   - Corrected (en): "The Tywi is reputed to produce more big sewin (sea trout) than any other British river, and its tidal reaches at Carmarthen are still fished from coracles."
   - Current (cy): "Dywedir bod y Tywi yn cynhyrchu mwy o sewin mawr nag unrhyw afon arall ym Mhrydain, ac mae'n dal i gael ei physgota o gyryglau."
   - Corrected (cy): "Dywedir bod y Tywi yn cynhyrchu mwy o sewin mawr nag unrhyw afon arall ym Mhrydain, ac mae ei rhan lanw yng Nghaerfyrddin yn dal i gael ei physgota o gyryglau."
9. **`src/content/almanac.ts:334-335` (`beavers-back`).** Source: deeptime:S34 (unchanged).
   - Current (en): "Beavers are back in Wales, on trial at Cors Dyfi since 2021."
   - Corrected (en): "Beavers are back in Wales: a family has lived at Cors Dyfi since 2021, and a few now live wild."
   - Current (cy): "Mae afancod yn ôl yng Nghymru, ar brawf yng Nghors Dyfi ers 2021."
   - Corrected (cy): "Mae afancod yn ôl yng Nghymru: mae teulu wedi byw yng Nghors Dyfi ers 2021, ac mae ychydig yn byw'n wyllt erbyn hyn."
10. **`src/content/almanac.ts:71-72` (`wildwood`, basis).** Source: deeptime:S10 (unchanged).
    - Current (en): "Pollen zones for Britain; no local pollen core has been studied for the Tywi valley itself."
    - Corrected (en): "European pollen zones, dated in uncalibrated radiocarbon years, so the true calendar dates are earlier; no local pollen core has been studied for the Tywi valley itself."
    - Current (cy): "Parthau paill Prydain; ni astudiwyd craidd paill lleol ar gyfer Dyffryn Tywi ei hun."
    - Corrected (cy): "Parthau paill Ewrop, wedi'u dyddio mewn blynyddoedd radiocarbon heb eu calibro, felly mae'r gwir ddyddiadau calendr yn gynharach; ni astudiwyd craidd paill lleol ar gyfer Dyffryn Tywi ei hun."
    - The range `bc(5500)`-`bc(3000)` stays until a calibrated source is added; it is not wrong enough to move on
      a guess.
11. **`src/content/climate.ts:6-13` (`INTERSTADIAL`).** No text change. Its 12,700-10,900 BC is not in deeptime:S8
    or deeptime:S10; add a Bølling-Allerød source to the note and cite it here. The timeline check also
    suggests the chill at `bc(12500)` (0.5) should be milder and at `bc(11000)` (0.55) colder; that is a
    tuning decision for whoever applies the keyframe fix.
12. **`src/content/climate.ts:27-28` (`HOLOCENE_WARMING`, optional).** Source: add deeptime:S8.
    - Current (en): "After c.9700 BC the climate warmed steadily and woodland closed in."
    - Corrected (en): "After c.9700 BC the climate warmed within decades, and woodland slowly closed in."
    - Current (cy): "Ar ôl tua 9700 CC cynhesodd yr hinsawdd yn gyson a chaeodd y coetir dros y tir."
    - Corrected (cy): "Ar ôl tua 9700 CC cynhesodd yr hinsawdd o fewn degawdau, a chaeodd y coetir yn araf dros y tir."

Confirmed and needing no change: `events.ts:35-46` (`younger-dryas`; adding deeptime:S10 for "Tundra returned"
would help), `almanac.ts:218-224` (`beaver`), the climate keys for the Younger Dryas, the Holocene optimum, the
Medieval Warm Period and the Little Ice Age, and `conversations.ts:331` (Dinefwr keeps White Park cattle).

## For the owner's decision

- **The red kite low point.** Sources say fewer than ten pairs (BTO) or a single known nest (Aberystwyth
  University). Correction 3 shows both; a reading of the RSPB or Welsh Kite Trust history could settle it.
- **Whether to show the upper Tywi kite refuge.** If a better source than the Rhandirmwyn community page
  confirms it, it is a genuine "this valley" story for the 1930s.
- **Places just outside the circle.** Waun Fignen Felen and both Fan lakes sit 0.8-2.5 miles beyond it. The
  app already says so for Waun Fignen Felen; corrections 5 and 7 do the same for the others.
