---
title: Independent check of hunter-gatherers.md
kind: review
status: current
updated: 2026-10-09
---

# Independent check: Hunter-gatherers from the ice to the first farmers

Reviewed note: [`../hunter-gatherers.md`](../hunter-gatherers.md) (status: draft, updated 2026-10-02).
Repo state: `main` at `ac914c6`, equal to `origin/main` after a `git fetch` on 2026-10-09 (0 ahead, 0
behind), so the note, `events.ts`, `almanac.ts` and `lamplight.ts` read here are the current pushed ones.
Each correction quotes or locates the text it targets.

## Method

- Every source that could be fetched was downloaded with curl and read as text (keyword in context), not
  through a summarising fetch. Read in full or searched by phrase: twelve HER records (S1, S2,
  S5, S6, S8, S10-S16) and the Garn-wen landscape record (S3), Coflein (S9, S17, S29, S32), llangadog.com
  (S4), the four Heneb "lost landscapes" pages (S20-S23), the Museum Wales blog (S24), the
  Bristol news item (S28), the caveburial gazetteer (S31), the Current Archaeology pieces (S33, S34), the
  Reading thesis page (S35), Sachers (S37), the Poulton society page (S42), the three Wikipedia pages
  (S38, S39, S43) and the Nature Ecology & Evolution paper (S25, full text).
- Read from PDF text layers: Schulting 2020 (S30, all of it that the note uses, including Tables 3 and 4),
  the Little Hoyle report (S27, 17.9MB; keyword in context for every claim the note draws from it) and the
  Howick preliminary report (S36).
- Abstract pages only (all the note itself claims for them): S7 (Cambridge page; its bibliography was
  searched and does cite Allen 1938), S18 (Crossref), S19 (Crossref, and again via the Beacons National
  Park Authority's two-page copy), S26 (Glasgow Enlighten), S40 (Cambridge extract), S41 (Nature).
- **Every "my calibration" figure was recomputed.** I downloaded the IntCal20 curve (S44,
  https://intcal.org/curves/intcal20.14c, header "Reimer et al. 2020") and ran my own 95% highest-density
  calibration (a Gaussian likelihood on the curve, sigma combined in quadrature). Results are in the
  first table below.
- **Not done**: the Archwilio box query behind "no microlith in the ten miles" and the three restricted
  records (DAT1755, DAT7521, DAT109211) were not re-run or opened. The 16-WebSearch count was not
  checkable. The deep-time note's extinction dates (the last column of the animals table) and
  `timeline:S1`, `timeline:S3` and `deeptime:S12` were not re-fetched; they have their own checks. The
  full text of Smith and Cloutman 1988 (S19) could not be obtained: the Royal Society page answers curl
  with HTTP 403 and the only other copy found is the abstract.
- One WebSearch was used (to look for the Waun Fignen Felen date table). It found nothing new beyond the
  Beacons copy of the abstract.

## Summary

71 claims listed, **70 checked: 47 confirmed, 20 partly, 2 not supported by the cited source, 1
contradicted**; one (the Archwilio "no microlith" query) was not re-run. The note has 21 corrections below and
the app has 2 content entries to change (plus 1 optional).

**The question asked, answered: are the Waun Fignen Felen dates given as calibrated calendar dates?**
Yes, in the note's own text and in its sums. Smith and Cloutman give "ca. 8000 years BP" (the clearing),
"until ca. 5500 years BP" (heath) and "ca. 5000-5500 years BP" (elm decline); Coflein gives "mid-tenth
millennium BP" (first visits) and "eighth millennium BP" (burning). The note converts them, and my own
IntCal20 run reproduces its numbers (calendar column, first table below). What is **not** established is
the premise that these BP figures are radiocarbon years. No fetched source says so in as many words. The
abstract says "pollen analysis and radiocarbon dating", and I think the premise is almost certainly right,
but the note presents the deep-time elm-decline range as the evidence that settles it, and that evidence
is weaker than the note says (correction 14). The assumed plus-or-minus 100 is the note's own, not the
paper's. And **the app has not yet taken the correction**: `events.ts` `mesolithic-burning` still reads
"from about 8,000 years ago" at 6000 BC and `almanac.ts` `mesolithic-fire` still spans 6000 to 4000 BC.

Findings that change the app or the note, most important first:

1. **The app still carries the uncalibrated Waun Fignen Felen date** (above). The note is right that the
   calendar start is about 7000 BC (7200 to 6600 BC), so the text should say about 9,000 years ago.
2. **"At Ogof Garreg Hir (Caldey)" is wrong.** S30 puts it on the Castlemartin Cliffs, South
   Pembrokeshire (SR 9428 9387). Caldey is Ogof-yr-Ychen. And the cave's animal bones (red deer, roe
   deer, wolf, pig, hare, fox, bird) cannot be assigned to the Mesolithic: "Any stratification has been
   destroyed by storm-wave action", the only date from the cave is an Early Neolithic ulna, and Jacobi's
   Mesolithic attribution is for the flint blade alone.
3. **The Poulton elk's "17 lesions" and "late winter" are the superseded reading.** The same page (S42)
   goes on to say the 2013 reanalysis concluded the "two hunting episodes" scenario "could not be
   sustained", that "many of the lesions on the skeleton were consistent with excavation damage", and
   that the animal was 3.5 to 4.5, not 5 or 6. The elk matters to the animals table and to any hunting
   scene.
4. **The Younger Dryas scene row says "no people", the source says "no dated people".** S25: "Although
   this may be the result of taphonomy and preservation issues". The note keeps that caveat nowhere.
5. **The Carreg Cennen cave row is firmer than the HER.** The HER types the bones "Inhumation?" and the
   tooth "Ornament?" (queried), calls the finds "drilled horse incisors" in its narrative and "Perforated
   horse tooth" (singular) in its table, and a 2018 visit saw "fragments of bone, possibly human".
6. **Worm's Head: three dates were quoted, five exist.** Table 4 of S30 also has 9920 +/- 160 BP
   (OxA-13131, 10100 to 8860 cal BC) and 8800 +/- 80 BP (OxA-4024). The quoted "c. 8700 to 8000 BC" is
   only the three re-measured ones.
7. **The Star Carr dog quotation is not in the cited page.** "Among the first animals to be domesticated"
   does not occur in the S40 extract, which says something different.
8. **The Holmegaard "conflict" may be a units mismatch.** "About 8,000 BP" on one Wikipedia page, if it
   is a radiocarbon age, calibrates to about 7000 BC (7240 to 6640 BC on my run), which is the other
   Wikipedia page's "c. 7000 BC". The note converts it as 6000 BC. Sachers's 6500 BC is then the outlier.

**Licences.** The note lists **no audio, music, image or other media asset**, so there are no recording
licences to check. Its only reuse-terms question is for the **data**: see "Found along the way" (Heneb's
written-permission and acknowledgement terms).

## Dating check: calibration recomputed

My run against IntCal20, 95% highest-density range (outer limits of the ranges), compared with the note.

| Date | Source | Note says | My IntCal20 run | Match |
|---|---|---|---|---|
| 8000 +/- 100 BP (clearing, assumed error) | S19 "ca. 8000 years BP" | c. 7200 to 6600 BC | 7181 to 6640 BC (a 1-year sliver at 7240) | yes |
| 5500 +/- 100 BP (heath ends, assumed error) | S19 "until ca. 5500 years BP" | c. 4550 to 4050 BC | 4541 to 4054 BC | yes |
| 9500 +/- 100 BP (first visits, assumed error) | S17 "mid-tenth millennium BP" | c. 9200 to 8550 BC | 9215 to 8567 BC | yes |
| 5000 +/- 100 BP (elm decline, assumed error) | S19 "ca. 5000-5500 years BP" | not computed | 4033 to 3540 BC | n/a |
| 8597 +/- 54 BP | S30 UBA-32282 | 7736 to 7536 cal BC (Schulting 7735 to 7541) | 7735 to 7537 cal BC | yes, to within 5 years at one end (not "exactly") |
| 9294 +/- 49, 9255 +/- 45, 9030 +/- 45 BP | S30 Table 4 | c. 8700 to 8000 BC | 8698 to 8014 BC for the three together; 9030 alone 8303 to 8014 (S30: 8310 to 8000) | yes, but see claim 40 |
| 12,310 +/- 50 BP | S25 OxA-17726 | 12,860 to 12,130 BC | 12,862 to 12,134 BC | yes |
| 11,050 +/- 90 BP | S25 OxA-X-2185-26 | 13,100 to 12,770 cal BP | 13,102 to 12,769 cal BP | yes |
| Godwin zone boundaries (9650, 7450, 4950 BP at +/-50) | deeptime:S10 | 9250-8850, 6400-6250, 3950-3650 cal BC | 9246-8830, 6420-6230, 3930-3639 cal BC | yes |

The arithmetic is sound. The remaining question is the premise, and the evidence for it is in claim 1.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.
"Used in src/" says whether app content cites the claim (only `lamplight.ts:69` cites a `hunters:` key).

### Dating and method

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 1 | Waun Fignen Felen's BP dates are radiocarbon years (the note's "strong inference"), settling the deep-time check's open question | events.ts:54, almanac.ts:55 (indirectly) | P | S19 abstract: "investigated by means of pollen analysis and radiocarbon dating". No source says the quoted BP figures are uncalibrated. The note's argument (elm decline "ca. 5000-5500 years BP" against the deep-time note's "c. 4300 to 3250 BCE") does not discriminate: 5000 to 5500 radiocarbon years is 4541 to 3540 BC and 5000 to 5500 calendar years is 3550 to 3050 BC, and both overlap that broad Wikipedia range (deeptime:S11). Stronger argument, see correction 14. The conclusion is very probably right |
| 2 | Coflein's "eighth millennium BP" "draws on" Smith and Cloutman and so is probably radiocarbon too | events.ts:54 | P | S17 lists Smith & Cloutman among its three sources, so it probably does. But "eighth millennium BP" is a millennium-wide span (7999 to 7000 BP: about 7050 to 5760 BC if radiocarbon, from my runs of 8000 and 7000 +/- 50), not the point date "ca. 8000 BP" that gives 7200 to 6600 BC. The note's re-date rests on S19, not on Coflein's phrase |
| 3 | Ogof-yr-Ychen 8597 +/- 54 BP calibrates to 7735 to 7541 cal BC (Schulting) and the note's script reproduces it | | C | S30: "UBA-32282: 8597 +/- 54 BP, 7735-7541 cal BC". Mine 7735 to 7537 |
| 4 | "The marine diet means the true age is somewhat younger" | | P | Sound reasoning, but not in S30, which gives no marine-corrected range here (its range equals plain IntCal20, so it is uncorrected). Mark it the note's inference |
| 5 | The deep-time Godwin/Iversen dates are uncalibrated and convert to the three ranges | events.ts / almanac.ts `wildwood` | C | Recomputed, first table. The conversion is a scheme, not measurements, as the note says |
| 6 | Dated calendar evidence for people lands at c. 12,500 BC, supporting `people-return` | events.ts:25 | C | S25: Kendrick's bone "~14,500 cal. bp" (12,310 +/- 50); S28: Cathole "at least 14,505 years" (+/- 560); S24: "around 15,000 years ago". The event summary's "about 14,500 years ago" matches |

### Evidence inside and near the ten miles

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 7 | Love Lodge Farm: 453 struck lithics, mostly flint, some chert, "Mesolithic period onwards", Mesolithic pieces all unstratified or residual; found 2012 to 2014 ahead of Ysgol Bro Dinefwr | | C | S1 (PRN 109220), verbatim; events 2012 and 2014; NGR SN6229221507, 1.2km from the centre (my calculation) |
| 8 | Llandeilo northern bypass: two flint flakes, fieldwalking 1994, prehistoric, about 1.7km | | C | S13 (PRN 14760) |
| 9 | Carreg Cennen cave: bones of two adults and a child (Coflein) or 2 adults and 2 children (HER), a perforated horse tooth in stalagmite, found 1907 by Cantrill, three human teeth in 1980, NMW 31.384, 5.2km | | C | S8, S9. Both counts exist, as the note says (open question 2) |
| 10 | "Conventionally dated to the Upper Palaeolithic" (Coflein) against Campbell's "perhaps 8000 or more years ago" (HER); the HER's wording is internally inconsistent | | C | S9; S8: "considered them to be of this period; perhaps 8000 or more years ago" |
| 11 | The Carreg Cennen bones and tooth "have never been radiocarbon dated" | | P | Neither record gives a date, and S8 quotes Davies (1995) that the deposit is "ready for excavation when, without doubt, further dateable objects would be discovered". The claim is an inference from silence in two short records |
| 12 | Scene: "People placing the dead in the cave; a pierced horse tooth worn as an ornament" | | P | S8 types the bones "Inhumation?" and the tooth "Ornament?"; its 2018 visit saw "fragments of bone, possibly human". It calls the find "drilled horse incisors" in the narrative and "Perforated horse tooth" in the table. The scene is firmer than the record |
| 13 | Pant-y-llyn: "Twelve skeletons were said to have been found together with the bones of elk and wild boar" in 1813; bear molar 1985; "Undated, but probably prehistoric?"; doubted in 1893 | | C | S10 verbatim; 6.2km |
| 14 | Dinas: a "Spotted hyena" tooth, Palaeolithic findspot, parent record restricted | | P | S11 says only "Hyena tooth from site PRN 7521", Palaeolithic findspot. "Spotted" is the note's addition |
| 15 | Crug-glas: "A flaked flint hand axe recovered during ditch digging in 1968", private ownership, "no more details" | | C | S2 verbatim; S3 "a palaeolithic findspot"; S4 "a flint hand axe from the Paleolithic era (250,000BC - 10,000BC)" |
| 16 | "A hand axe is a Lower or Middle Palaeolithic tool type" | | P | Not in S2-S4 (S4 gives the whole Palaeolithic span). The note's own knowledge, unsourced |
| 17 | Carn Goch: a worked flint flake picked up by Edward Laws in 1872 | | C | S15 |
| 18 | Glyneiddian, Nantgaredig: a large flint scatter "of Mesolithic date" (PRN 1755, restricted); one implement "Aurignacian? or late Palaeolithic", one "B.A.?" | | C | S5, S6. S5 does not itself say the scatter is Mesolithic; S6 does |
| 19 | Wainwright 1963 cites Allen (1938), "A Stone Age Flint Chipping Site in the Vale of Towy, Llanegwad Parish"; probably the same site | | C | S7 bibliography: Allen, E. E., 1938, vol. 28, pp. 92-4. "Probably the same site" is stated as unconfirmed, fairly |
| 20 | Afon Tywi drift: four worked flints, 1924-5, "lost?" | | C | S14 |
| 21 | Llyn y Fan Fach: two flint flakes and a stone core at low water in the late 1970s, "believed to have been left by Mesolithic hunters"; "just outside" at about 16.6km | | C | S12. 16.6km from the square's centre, 16.2km from its south-west corner, against a 16.1km radius, so "just outside" holds either way |
| 22 | Banc Wernwgan to Foel Fraith: "the removal of natural woodland - which reached altitudes of 800 m - from the Mesolithic period onwards" | | C | S16 verbatim; the area's grid point is 10.0km out |
| 23 | Distances to the other records | | P | All reproduce, except that one convention is not used throughout: Crug-glas "about 6.7km" is the centre of its 1km square (6.1km from the south-west corner), Carn Goch "about 6.3km" is the south-west corner (6.9km from the centre) |
| 24 | "Not found in the ten miles: a microlith" | | not checked | The Archwilio query was not re-run |

### Phase 1 and 2: the Late Glacial and the Younger Dryas

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 25 | Llanilid: July temperature about 20 C early on, then two steps down, the second around 13,100 cal BP cutting juniper then birch; warming "may have begun earlier" than in Greenland, perhaps before 14,500 cal BP | | C | S26 abstract; "before 14,500, possibly up to 15,000 cal BP" is in S27 (Walker et al. 2003, p. 511). 13,100 cal BP is 11,150 BC (correct) |
| 26 | Much of the Cambrian Mountains ice-free by about 15,000 years ago | | C | S27: "much of the Cambrian Mountains ice free by about 15,000 BP (Glasser, et al. 2018)" |
| 27 | Gough's Cave 15,070 to 14,850 start and 14,960 to 14,610 cal BP end; diet "primarily on terrestrial herbivores, specifically red deer and bovids but also horses"; skull cups | | C | S25 verbatim |
| 28 | Kendrick's: cut-marked bovine bone "~14,500 cal. bp"; decorated horse jaw "~12,900 cal. bp"; beads of brown bear, aurochs and red deer teeth; at least four people (three adults, a child); sampled person 13,770 to 13,390 cal BP with a marine/freshwater correction and the paper's own caution | | C | S25 verbatim, including "modelled dates should be treated with some caution" |
| 29 | Kendrick's horse jaw: "~12,900 cal. bp" (S25) against "some 13,500 years ago" (S21) | | C | Both quotations exist. The disagreement is real |
| 30 | Cathole: engraving "probably a stylised reindeer", 15 x 11cm, under flowstone; minimum ages 14,505 +/- 560 and 12,572 +/- 600; "calendar years" because uranium-series | | P | S28, S29 confirm the figures and "latest possible date was c.12,500-14,500 years ago". "Calendar years" is the note's reading of "years BP" in a press release; reasonable, not stated |
| 31 | Hoyle's Mouth: about 300 artefacts, one cut-marked brown bear phalanx at 13,934 cal BP | | C | S27 (HM1751, OxA-33908) |
| 32 | Little Hoyle: "one Creswellian convex-backed point", "a casual loss" | | P | S27: "one convex-backed point", "likely to be a casual loss ... contemporary with the much more extensive Late Glacial occupation at Hoyle's Mouth", and it is "remarkably similar" to Gough's Cave pieces. "Creswellian" is the note's gloss (S27 uses the word only for an older pen-knife blade), and David (2007) says it is "hard to make a case for Upper Palaeolithic occupation of the cave based on this one tool" |
| 33 | Paviland and Nanna's Cave: Late Upper Palaeolithic artefacts and Late Glacial bones | | C | S27 |
| 34 | Two ancestries and two ways of life (Gough's: Magdalenian ancestry, terrestrial diet, cannibalism; Kendrick's: Villabruna ancestry, marine or freshwater food, burial) | | C | S25 |
| 35 | Tenby-cave fauna: reindeer, brown bear, wolf, fox, arctic hare, lemmings; Priory Farm "glacial and post-glacial fauna (cattle, horse, reindeer)" | | C | S27 (Unit IV, "cf. Equus ferus", "cf. Lepus timidus"); S30 |
| 36 | Poulton elk: skeleton "around 13,500 years ago" in the Allerod, barbed bone points, "at least 17 lesions", "died in late winter" | | P | S42 gives all of it, then says the 2013 reanalysis found the "two hunting episodes" scenario "could not be sustained", "many of the lesions ... were consistent with excavation damage", age 3.5 to 4.5, "hunted, unsuccessfully" (Pettitt et al. 2017). The note quotes the superseded half |
| 37 | Poulton "13,500 years ago": calendar or radiocarbon not stated (open question 12) | | C | True of S42's wording. It can be settled: S42 ties it to the Allerod, and S25 puts the Younger Dryas at about 12,900 to 11,700 (calendar) so the Allerod lies before 12,900 cal BP. 13,500 is a calendar-scale figure |
| 38 | Creswellian "13,000 and 11,800 BP" (basis not stated); prey mainly horse or red deer, with arctic hare, reindeer, wild cattle and others; Britain "at times unoccupied" in the Younger Dryas | | C | S43 verbatim (a lead only, as the note says) |
| 39 | Younger Dryas at Llanilid "between ca 12,600 and 11,400 cal yr BP", July 10 to 11 C, "a scrub tundra with Betula, Salix and a range of open-habitat taxa"; the app's 10,900 to 9,700 BC is a little earlier | | C | S26. 12,600 to 11,400 cal BP is 10,650 to 9,450 BC |
| 40 | Worm's Head: "9294 +/- 49, 9255 +/- 45, 9030 +/- 45 BP", c. 8700 to 8000 BC, terrestrial diet, Early Mesolithic adults and a child, sea about 20km away | | P | All three dates are in S30 Table 4 and the diet and the distance ("20 km or more") are right. But the same table has 9920 +/- 160 BP (OxA-13131, scapula, 10100 to 8860 cal BC, "the very beginning of the Holocene") and 8800 +/- 80 BP (OxA-4024). The range for "the dated humans" is about 10,100 to 8000 BC |
| 41 | "No radiocarbon determinations documenting human presence in the British Isles during the Younger Dryas"; reindeer "once again became the dominant fauna in the cave sites of southwest Britain" | | C | S25 verbatim |
| 42 | Scene row: the Younger Dryas as "Reindeer in a cold scrub tundra, no people" | | P | The same sentence in S25 continues "Although this may be the result of taphonomy and preservation issues, if a gap in human presence is real ...". "No dated people" is supported; "no people" is not |
| 43 | Lemmings and cold voles "persisted until the Holocene warming, then died out in Britain" | | P | S27: both lemmings "thought to have disappeared" at the start of the Holocene (c. 11,700 BP) and the two voles "believed to have become extinct prior to 9000 BP"; collared lemming persisted in southern Ireland to c. 10,000 14C BP. The sources are not specific to Britain |
| 44 | Stellmoor (Wikipedia, a lead): pine arrows with foreshafts, flint points, grooved at the base for a bowstring; Sachers: nocked shafts "none older than approximately 10,000 BC" | | C | S38 ("15-20 centimetre ... foreshaft", "shallow grooves on the base"); S37 |

### Phase 3 and 4: the Mesolithic

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 45 | Holocene at Llanilid from "ca 11,400 cal yr BP" (9,450 BC), "an abrupt temperature rise of the order of 9 C", "rapid expansion of Betula woodland" | | C | S26 |
| 46 | Museum Wales: "Juniper was the first tree to return ... " and the red deer, roe deer, wild cattle and pigs quotations; "likely that parts of the woodland in upland Wales was deliberately cleared"; "Fish is believed to have been important"; the seasonal round "is the museum's hypothesis" | | C | S24, all verbatim |
| 47 | Waun Fignen Felen: scatters of both phases around a lake basin at 485m; "probably first visited around the mid-tenth millennium BP"; visits "probably brief, though frequent", a "persistent place"; beach flint 29km, Greensand chert 80km, mudstone beads 100km; hazelnuts; burning "to encourage large game" | events.ts:54 | C | S17, S18 verbatim. 20.1km from the centre |
| 48 | Waun Fignen Felen clearing "at ca. 8000 years BP", heath "until ca. 5500 years BP", alder "possibly taking advantage of environmental damage caused by Mesolithic man" | events.ts:54, almanac.ts:55 | C | S19 abstract (Crossref and Beacons copy), verbatim. The calendar conversions are checked above |
| 49 | Nab Head: "seasonal campsite at which stone beads were made", 39,863 flaked pieces, 143 microliths, 114 scrapers, 692 beads of beach shale, the "phallus, amulet or figurine" | | C | S24, S32 |
| 50 | Nab Head "first inhabited around 8600BC" (S24) and "around 10,500 years ago" (S20), "cross-checked" | | P | Both quoted correctly and they agree with each other. But neither says calendar or radiocarbon, and both go back to David (2007) (S32 gives no date), so this is one derivation, not two. The calendar status is not established |
| 51 | Burry Holms: microliths and tiny saws, then an inland hill above the Severn plain; "of similar age" to Trwyn Du | | P | S24 confirms the finds and the hill. "Another campsite of similar age" follows the Nab Head paragraph (c. 8600 BC); Trwyn Du appears only in a photo caption. The note's antecedent is a guess |
| 52 | Ogof-yr-Ychen: at least four people (3 adults, 1 juvenile), "a marked contribution from marine resources", a list of radiocarbon dates | | C | S30 Table 3 and text; S31. S31's date list also holds 8760 (OxA-10616, redated 8465), 7020 and 4819 BP, which the note leaves out |
| 53 | Caves used for burial "in the earlier Mesolithic and in the Neolithic, separated by an intervening gap of nearly two millennia" | | C | S30 abstract |
| 54 | "At Ogof Garreg Hir (Caldey) later Mesolithic tools came with red deer, roe deer, wolf, pig, hare, fox and bird" | | X | S30: Ogof Garreg Hir is "one of a group of cave sites along the Castlemartin Cliffs of South Pembrokeshire" (SR 9428 9387), not Caldey. The fauna is listed with the finds but "Any stratification has been destroyed by storm-wave action"; only the flint blade is attributed to the later Mesolithic (Jacobi); the ulna dated Early Neolithic (3961 to 3718 cal BC) |
| 55 | Star Carr: "perhaps the oldest known Mesolithic house in the British Isles", about 11,000 years ago, 3.5m wide on a ring of posts, with "a boat paddle, beads, arrowheads and antler headdresses"; no houses known in Wales | lamplight.ts:69 (S20) | C | S20 verbatim |
| 56 | A Preboreal dog at Star Carr, and "the dog 'among the first animals to be domesticated'" | | NS | S40 gives the title ("a Preboreal domestic dog ... from Star Carr") and an extract that begins "The acquisition of domestic animals was an epoch-making event"; the quoted words are not in it. The title alone supports the dog. It is a 1961 paper |
| 57 | Howick: round structure "averaging 6m in diameter", sunken floor "up to 0.5m", three constructional phases, 21 AMS dates, primary construction "c. 7800 BC (Cal.)", burnt bone of wild pig, fox, birds and "either domestic dog or wolf" from the hearths, "hazelnut and acorn shell" | lamplight.ts:69 (S36) | C | S36 verbatim. One small slip: hazelnut and acorn shell are from "all of these contexts" (post holes, slots, pits, hearths), not specifically the hearths. A 2003 preliminary report with more dates awaited |
| 58 | The Howick claims as used by the app: huts with hearths "by 7800 BC", "like one at Howick", no house this old known in Wales | lamplight.ts:54-70 | C | S36 (hearths, c. 7800 BC Cal.); S20 ("no examples of houses known in Wales") |
| 59 | Goldcliff: Mesolithic activity from c. 5800 BC to Site J at c. 4800 BC; red deer, roe deer, boar, aurochs, otter, wolf, birds; eels; wooden objects; hearths "laid with heat-fractured stones"; first Mesolithic fish traps in Britain, "five radiocarbon dates placed them in 5310-4912 BC" | | C | S33, S34. The fish-trap range is given as "BC" after "radiocarbon dates"; S34's "7,000-year-old" agrees with it, so calendar is likely but not stated |
| 60 | Goldcliff tracks: deer, aurochs, "a probable dog or wolf", cranes on silts "laid down at the height of summer"; the earliest footprints "some 7,500 years ago"; "regular burning of woodland and areas of reed", deliberate or not "still open to debate" | | C | S33, S23 |
| 61 | Footprint thesis: 856 tracks 2001 to 2017, 342 human, 270 bird (46% common crane); nine trails plus twelve from Scales (2006) | | C | S35 |
| 62 | "29% of the human trails were made by children, some perhaps aged four or under, walking to a fishing area" | | P | S35: "29% of the footprint-track trails were made by children" (6 of 21), and "Site N was used as a 'pathway' by children and possibly adult females to walk to a fishing area". The fishing-area reading is for Site N only |
| 63 | Submerged forests: "auroch, red deer and brown bear from Whitesands and pig from Lydstep"; Uskmouth man "accustomed to walking without shoes", about 6,250 years ago | | C | S22, S24 |
| 64 | Heneb places later Mesolithic seasonal hunting sites in the uplands at Llyn Brenig; the Nab Head is "the earliest dated Mesolithic site in Wales" | | C | S20 |
| 65 | "Much land now under the Bristol Channel and Cardigan Bay was still dry, and the sea rose through the period [S20][S22]" | | P | S20 gives rising seas and the inundation of "vast areas of low lying land"; S22 is about Cantre'r Gwaelod and submerged forests. Neither names the Bristol Channel. S21 and S24 do support the Severn plain |
| 66 | Holmegaard bows: elm, about 152cm, "circa 6,500 BC" (Sachers) | | C | S37 |
| 67 | "c. 7000 BC" (Wikipedia "Holmegaard bow") and "about 8,000 BP" ("History of archery"), "which is c. 6000 BC" | | P | Quotations are right (S39, S38). The conversion treats 8,000 BP as calendar. If it is radiocarbon, 8000 +/- 100 BP is 7240 to 6640 BC (my run), the same as S39's c. 7000 BC. Open question 4 may be a units mismatch |
| 68 | Farming "around 6,000 years ago" and "a sharp shift towards the dominance of terrestrial foods in coastal locations at the start of the Neolithic" | | C | S24; S30 |

### The scene table and the animals table

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 69 | "A camp on the river terrace at Ffairfach" | | NS | S1 names no landform. It records a scatter in a field walked and dug ahead of a school. The row's last column says the camp is imagined; "river terrace" is an unsourced addition to the "here" tier |
| 70 | Fishing and gathering rows: Goldcliff 5310 to 4912 BC; "no Mesolithic fishing is known on the Tywi; salmon and sewin not attested" | | C | S33; absence claims are labelled as gaps, which is right |
| 71 | Animals table, Wales rows (red deer, roe, aurochs, boar, bear, wolf, fox, hare, otter, crane, eel, lemmings) | | P | Every Welsh citation checks except the Garreg Hir cave rows: the roe deer, wolf and pig cells cite Garreg Hir, whose bones are undated (claim 54), and the elk row's "(England)" Poulton entry carries the superseded lesion detail (claim 36) |

## Corrections for the note

1. **Phase 4, "Other Welsh evidence"**: replace "At Ogof Garreg Hir (Caldey) later Mesolithic tools came with
   red deer, roe deer, wolf, pig, hare, fox and bird [S30]" with "At Ogof Garreg Hir, Castlemartin
   Cliffs, South Pembrokeshire, a flint blade is attributed to the later Mesolithic (post-8500 BP, Jacobi)
   and the cave holds red deer, roe deer, wolf, pig, hare, fox and bird bones, but storm waves destroyed
   its stratigraphy, so the bones are undated; its one dated human bone is Early Neolithic [S30]". In the
   animals table drop Garreg Hir as the evidence for later-Mesolithic roe deer and wolf (Goldcliff
   remains for both) and for pig (Goldcliff and Lydstep remain).
2. **Late Glacial, "What was hunted" (Poulton elk)**: after "died 'around 13,500 years ago'" replace "and 17
   lesions" with "hunted, unsuccessfully, according to the 2013-17 reanalysis (shot in the hind feet, age
   3.5 to 4.5; the older 'two hunting episodes' reading and many of the lesions are now put down to
   excavation damage) [S42]". Source S42's entry should say it carries both readings.
3. **Summary and the scene table, Younger Dryas**: "no people" becomes "no dated people"; add S25's caveat
   "this may be the result of taphonomy and preservation issues". The same wording in "What a scene can
   show" ("that absence is itself the scene") should be reworded to a scene that shows reindeer and no
   people being shown, labelled imagined where no source says the valley was empty.
4. **Carreg Cennen row and the Evidence table**: "People placing the dead in the cave; a pierced horse
   tooth worn as an ornament" becomes "Bones, possibly human, and a perforated (drilled) horse tooth in
   the stalagmite: the HER queries both as 'Inhumation?' and 'Ornament?'". Note the HER's "drilled horse
   incisors" (plural) against its "Perforated horse tooth" (singular). Change "never radiocarbon dated" to
   "no radiocarbon date is recorded in the HER or Coflein".
5. **Phase 3, Worm's Head row**: add 9920 +/- 160 BP (OxA-13131, scapula, 10100 to 8860 cal BC) and
   8800 +/- 80 BP (OxA-4024, ulna, as published; the withdrawn 9450 +/- 50 BP was on the same bone) and
   say the three-date range (c. 8700 to 8000 BC) is for the re-measured ones only. Table 4 also lists the
   two Mewslade-labelled mandibles (9077 and 9235 BP), whose provenance S30 says may be Worm's Head.
6. **Open question 4 (Holmegaard)**: add "if 'about 8,000 BP' is a radiocarbon age it is c. 7000 BC (7240
   to 6640 BC), which is the other Wikipedia page's date; only Sachers's 6500 BC then differs", and drop
   "(which is c. 6000 BC)", or mark it as true only if the age is calendar.
7. **Source S40 and Phase 3 "Analogy: shelters and dogs"**: remove the quotation "among the first animals
   to be domesticated" (not in the page). Say instead "the title of S40 reports a Preboreal domestic dog
   at Star Carr (Degerbol 1961); the paper's text was not read".
8. **Phase 1, Little Hoyle row**: "one Creswellian convex-backed point" becomes "one Upper Palaeolithic
   convex-backed point, very like Gough's Cave pieces; S27 calls it a probable casual loss and quotes David
   (2007) that one tool is not a case for Upper Palaeolithic use of the cave".
9. **Evidence table, Dinas**: "Spotted hyena" becomes "hyena" (S11 does not name the species), or cite the
   species to S27 as a comparison only.
10. **Phase 4, Goldcliff footprints and the family scene row**: "29% of the human trails were made by
    children, some perhaps aged four or under, walking to a fishing area" becomes "29% of the 21 identified
    trails (6) were made by children, some perhaps four or younger; the thesis reads Site N as a path used
    by children and possibly adult females to reach a fishing area [S35]".
11. **Scene table, "A camp on the river terrace at Ffairfach"**: drop "river terrace" (S1 gives no
    landform) or move it to the imagined column.
12. **Phase 3, Nab Head row**: change "cross-checked" to "single-source in effect (both pages follow David
    2007); calendar or radiocarbon not stated" and keep both date wordings.
13. **"How dates are given", Ogof-yr-Ychen**: "reproduces a published calibration exactly" becomes "to
    within 5 years" (7735 to 7537 against 7735 to 7541). Mark "the true age is somewhat younger" as the
    note's reasoning; S30's range is plain IntCal20 with no marine correction.
14. **"How dates are given", Waun Fignen Felen**: keep the conclusion and the sums, and replace the
    argument. Evidence that is actually in hand: (a) the abstract says "pollen analysis and radiocarbon
    dating"; (b) it dates "the classical elm decline of the Atlantic-Sub-boreal transition" to "ca.
    5000-5500 years BP", and that transition is the conventional 3000 BC (about 5000 BP) pollen-zone
    boundary, which the note itself treats as uncalibrated in the next bullet. State that the
    deep-time elm range (4300 to 3250 BCE, a Wikipedia range) overlaps both readings and does not decide
    it, that no fetched source states the scale, that the ±100 is assumed, and that the lab dates in
    Smith and Cloutman's tables, or in Barton and others (1995), would settle it. (b) rests on the
    standard meaning of the zone name, which the note's own pollen-zone bullet already relies on.
15. **Same bullet, Coflein**: say that "eighth millennium BP" spans 7999 to 7000 BP (about 7050 to 5760 BC
    if radiocarbon) and that the 7200 to 6600 BC re-date rests on S19's "ca. 8000 years BP" alone.
16. **Evidence table distances**: use one convention for four-figure references (square centre or
    south-west corner) and say which. Crug-glas and Carn Goch differ by 0.6km between them depending on
    the choice. "Just outside" for Llyn y Fan Fach holds under both.
17. **Phase 3 "Environment"**: change "[S20][S22]" for the Bristol Channel and Cardigan Bay sentence to
    cite S24 and S21 for the Severn plain, or soften it.
18. **Phase 3, Burry Holms row**: "of similar age to Trwyn Du" becomes "described as of similar age to the
    Nab Head (c. 8600 BC) in the preceding paragraph, though the antecedent is not explicit [S24]".
19. **Open question 12 (Poulton 13,500 years)**: answer it: S42 ties the figure to the Allerod and S25 puts
    the later Younger Dryas at about 12,900 to 11,700, so 13,500 is calendar-scale.
20. **Sources**: S31, add "7020 and 4819 BP (the Neolithic dates) and the withdrawn 8760 BP, redated 8465".
    S42, add "2013 reanalysis: 3.5 to 4.5 years old, one hunting episode, many lesions excavation damage".
    S36, add "2003 preliminary report; more dates awaited". S33, say its "BC" range follows "radiocarbon
    dates" without saying calibrated.
21. **Status**: the note stays `draft`; once corrections 1 to 3 and 14 are in, mark it checked in
    `docs/research/README.md` (the row still says "not yet checked").

## Corrections for app content

Only `lamplight.ts:69` cites a `hunters:` key. The other two entries are the ones the note itself says
need changing.

1. **`src/content/events.ts:54-67`, `mesolithic-burning`.** `when: range(bc(6000), bc(6000))` becomes about
   7000 BC (the calibrated range is 7200 to 6600 BC; 7000 is its middle). EN "from about 8,000 years ago"
   becomes "from about 9,000 years ago"; CY "o tua 8,000 o flynyddoedd yn ôl" becomes "o tua 9,000 o
   flynyddoedd yn ôl". Provenance `documented('deeptime:S12')` points to Coflein's "eighth millennium BP",
   which is not a calendar date: add `hunters:S19` (the "ca. 8000 years BP" figure) and `hunters:S17`. As
   the calendar date is our calibration of a figure whose scale is inferred (claim 1), the item should
   carry an ⓘ saying so (about 8000 radiocarbon years BP, calibrated by us with IntCal20, error assumed).
   Magnetic stays false.
2. **`src/content/almanac.ts:55-62`, `mesolithic-fire`.** `bc(6000)` to `bc(4000)` becomes about
   `bc(7000)` to `bc(4500)` (clearing 7200 to 6600 BC; heath maintained "until ca. 5500 years BP", 4550
   to 4050 BC). Add `hunters:S19` to the sources.
3. **`src/content/almanac.ts:63-75`, `wildwood`** (5500 to 3000 BC, already labelled uncalibrated). The
   conversion in the note is right (6400 to 6250 and 3950 to 3650 cal BC, recomputed), so the entry can
   be given the calendar range at the next pass, citing `deeptime:S10` and the note. Optional.
4. **`src/content/lamplight.ts:54-70` (the Howick hut).** No correction needed: "c. 7800 BC (Cal.)",
   hearths, the 6m round structure, and "no examples of houses known in Wales" are all in S36 and S20.
   For next time: S36 is a 2003 preliminary report, so a reader checking the date should be pointed at
   the final publication if one exists (not searched here).
5. **`src/content/events.ts:25-38`, `people-return`.** Supported by S25 and S28 (claim 6); it does not cite a
   `hunters:` key. The note suggests adding the undated finds (Carreg Cennen, Love Lodge). If that is
   done, use the wording from correction 4 above, not "people placing the dead".
6. **Any future Younger Dryas scene** (not in the app yet): say "no dated people", not "no people"
   (correction 3).

## Found along the way

- **Heneb's terms of use.** Every HER page carries: "All output resulting from the use of the data must
  acknowledge the source as follows: Derived from information held by the Heneb HER Charitable Trust
  copyright." and "If you wish to use information derived from material held by the Heneb HER Charitable
  Trust for publication in printed or multimedia form ... prior permission must be obtained in writing."
  The app is a public multimedia site and already cites HER records (`hunters:S1`, `S2`, `S5` and others,
  plus `archwilio.org.uk` elsewhere), and a search of `src/`, `docs/adr/` and `docs/process/` found no
  recorded permission or the acknowledgement wording. ADR 0026 covers asset licences, not data terms.
  Coflein's page footer says "Non-commercial Government Licence". Worth a decision from Dewi before more
  HER-derived content goes in, not for me to settle.
- **The Garn-wen landscape record and llangadog.com** (S3, S4) both mention a hand axe, and S4's gloss
  puts "Paleolithic" at 250,000 to 10,000 BC, so it could be anywhere in that range.
- **The source table is complete**: 44 `hunters:` entries in `generated/sources.ts`, S1 to S44, every one
  with a URL.
- **S21 and S29 disagree with each other on the Paviland burial**, as the note says: S29 gives 33,000 to
  34,000 years ago, S21 gives 29,000. Not a note error.
