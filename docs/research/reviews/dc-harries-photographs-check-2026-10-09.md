---
title: Independent check of dc-harries-photographs.md
kind: review
status: current
updated: 2026-10-09
---

# Independent check: D. C. Harries's photographs of Llandeilo

Reviewed: [`../dc-harries-photographs.md`](../dc-harries-photographs.md) (status: draft, updated
2026-10-09) and `src/content/photographs.ts`, on branch `worktree-agent-a95ce605775f93837` at
`03e2908` (3 commits ahead of `origin/main` at `c57d832`, 0 behind). Line numbers below are for
`photographs.ts` at `03e2908`. Each correction quotes the text it targets.

## Method

- **All 31 PCW item pages** were downloaded with curl and read as raw text (title, description,
  owner, creator, licence, upload date, tags), plus collection 2287136 (all 40 item ids), tag 251856
  (both pages, 34 items) and tag 8118. The nine non-Harries items in the collection and the three
  "man and horse" items were read too.
- **Every image was looked at**: the 31 files in `public/photos/harries/`, and the full-size PCW
  originals (2,087 to 3,087 px) where a detail needed zooming (posters, signs, nameboards,
  inscriptions, the note on 2282111).
- Biography: NLW collection page (S1), Wikipedia raw wikitext (S2), NLW Archives record (S3), NLW
  exhibition page (S6), Wikidata Q19829075, and a search of NLW Archives and Manuscripts for
  "D C Harries", which turned up a second fonds (see Found).
- Placement: Coflein records 43102, 411976, 80442 (as cited) and also 6334 (Salem) and 6328
  (Capel Newydd); Cadw listings 11080 and 11062 read directly on British Listed Buildings (the note
  read S10 only through a search summary). **The NLS 25-inch tiles were stitched afresh** at zoom 17
  and 18, overlaid with 100 m grid crosses computed with GDAL (EPSG:27700 to 4326), and every one of
  the 28 placed points was drawn on the map and looked at. The NLS county sheet list was read for
  the date of the sheet covering the town.
- Dating evidence found in the images was checked against sources: Wikipedia (as a lead) for
  *Shoulder Arms*, the Tariff Reform League and cloche hats; Grace's Guide and a Business History
  Conference abstract for Russian Oil Products; Welsh Newspapers Online for the Tariff Reform poster;
  Project Gutenberg (ebook 1108) for the arch quotation.
- Leads S15 to S18 were opened, and the NLW-owned station photographs (S17) were looked at.
- **Not done**: crowd.library.wales still presents a certificate for `nlw.digtest.co.uk`, so it was
  not browsed. Archives Hub answered 403. The NLS WFS sheet index did not answer. The OSM and OS
  Open Map Local coordinates were not re-extracted; they were checked against the 1905 map,
  Coflein and Cadw instead. The R. Iestyn Hughes book (1996) and the 1940 obituary were not read.

## Summary

**Captions, credits and catalogue data: all correct.** 31 of 31 titles and descriptions match the
PCW pages exactly; every page gives owner Cyngor Tref Llandeilo Fawr Town Council, creator
D C Harries, the Creative Archive Licence and upload date 1 September 2025. Collection 2287136 has
40 items, tag 251856 has 34, tag 8118 is "carmarthenshire" (768 results).

**Placements: 24 of 28 confirmed, 1 wrong, 3 partly.** Against the 25-inch map, Coflein and Cadw,
24 placed points sit where the caption says, within their stated accuracy; the butter factory, the
market hall and the studio are partly (a missed lead, an unsettled site, a point that can be
tightened). The 14 / 14 split of *documented* and *reconstructed* is honest for 27 of the 28. The
three unplaced items are rightly unplaced. The exception is the Post Office.

**Dates: the weak point.** The captions' "c." dates are the uploader's, as the note says, but
several images carry evidence that contradicts them, and the note's own "looked at" pass did not
read it:

| Photo | Caption | Evidence in the image | Verdict |
|---|---|---|---|
| 2281901 | c. 1910 | A cinema poster "CHARLES CHAPLIN in SHOULDER ARMS", "MON. TUES.", "TO-NIGHT"; the film was released 20 October 1918. The women wear cloche hats (popular about 1922 to 1933) | **X** |
| 2281916 | c. 1900 | Posters for "TARIFF REFORM" public meetings with "Mr Henry Longstaff"; the Tariff Reform League was formed in 1903, and Longstaff is reported as secretary of the South Wales Tariff Reform Federation in 1908 to 1910 | **X** (not before 1903) |
| 2281931 | c. 1920 | An "R.O.P. MOTOR SPIRIT" sign; Russian Oil Products was set up in July 1924 (or 1925) | **X** (not before 1924) |
| 2282261 | c. 1900 | A woman in a knee-length drop-waist dress with bobbed hair, a man in wide trousers | doubtful: late 1920s |
| 2282336 | c. 1900 | Many cloche hats in the crowd | doubtful: 1920s |
| 2282111 | c. 1918 | NLW holds the same photograph, dated 1914-1918 (PCW 408896) | **P** |
| 2282411 | c. 1900 | The 1897 Post Office stands on the right | **P** (not before 1897) |

**Five more findings that change the note:**

1. **The "1890s map" is the 1905 revision.** The NLS sheet covering the town, Carmarthenshire
   XXXIII.16, was revised in 1905 and published in 1906 (NLS county list; Coflein's copy is
   "CM.XXXIII.16 - 25' Second Edition", "1906"). The tiles show the Drill Hall, the Intermediate
   School and an Electric Power Station. "1890s map" appears 12 times in the note, 8 times in
   `photographs.ts` and once in open-questions.
2. **The Post Office is placed on the wrong side of the street.** The 1905 map labels "P.O." on the
   west side of Rhosmaen Street, at the south-west corner of a lane, about 262968, 222446. The
   building was dated 1897, so in 1905 it was that building. Photo 2282186 shows a corner building,
   and photo 2282411 shows the same banded-brick corner building across the street from the
   "D. C. HARRIES" sign. The point used (263010, 222470) is today's post office, about 50 m away on
   the east side.
3. **NLW does hold an online copy of one of the 31.** PCW 408896, owned by the NLW, "Civilians waiting
   for a Troop Train to Arrive at Llandeilo Railway Station 1914-1918", creator "Unknown", is the same
   photograph as 2282111: same flag, same dog, same girls. 408900 is the same occasion a moment
   apart. The note lists both as "not Harries" from their titles only. So the attribution is
   disputed: PCW credits Harries for its copy, the NLW says creator unknown.
4. **The NLW has a second Harries fonds.** "D C Harries : Vintage Prints", GB 0210 DCHARRIESPRINTS,
   [ca.1910-ca.1950], 469 photographs in eleven boxes "arranged by subject", "possibly unsold stock",
   with allied material "Llyfrau ffoto 797, 944, 945, 1360, 2078-2098, 2230-3, 2238-2241, 2410" (likely
   the bound volumes of prints that S1 describes). The note says the NLW catalogue has "one file
   only" and that no catalogue record of the volumes was found.
5. **Wikipedia is not independent of the NLW.** Its only inline citation for 1888, 1940 and "aged 75"
   is the NLW collection page itself (an archived llgc.org.uk copy). Kelly's Directory (1891) and the
   *Carmarthen Journal* obituary are listed under "Further reading", not cited. So all three
   biography sources are NLW-derived.

Counts: **104 claims checked: 72 confirmed, 15 partly, 1 not supported by the cited source, 12
contradicted (3 dates and 6 "shows" descriptions by the images themselves, the Post Office
placement, and 2 claims about the NLW's holdings), 2 doubtful (dress points to another decade), 2
with nothing independent to check.**

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted,
**D** doubtful, **—** nothing independent found (the caption stands as the only evidence).

### Biography and the collection

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Business "in about 1888"; "died in 1940 aged 75" | C | S1, word for word |
| 2 | Wikipedia gives the same, "citing Kelly's Directory (1891) and his obituary" | P | S2 cites only the archived NLW page (`llgc.org.uk/collections/learn-more/photographs/dc-harris/`); Kelly's and the obituary are under "Further reading". Not independent of S1 |
| 3 | "Documented (three sources, two of them independent of each other)" | NS | S1, S3 and S6 are NLW pages and S2 cites the NLW page. None is independent |
| 4 | NLW catalogue dates 1865 to 1940 | C | S3: "D C Harries (1865-1940)". Wikidata Q19829075 gives 1866, imported with no reference |
| 5 | The "C" invented to tell him from namesakes; he was David Harries | C | S2; S6: "the 'C' was fictional to distinguish him from others with the same name locally" |
| 6 | Studios in Llandeilo and Ammanford, "later also Llandovery" | P | S1: "Later he opened studios in Ammanford and Llandovery", so both came later |
| 7 | 48 Rhosmaen Street and Quay Street, Ammanford; "D C Harries, Rhosmaen Street, Llandilo" | C | S6; S3 |
| 8 | Farm machinery, Ammanford mining, Llandybie limestone, Glanbran (dismantled 1930), the bus accident | C | S1, each item. S2 says limestone "mines" |
| 9 | The accident is photos 2282141, 2282156 and 2282171 | P | S1 names "the Llandeilo – Ammanford bus" but no photos. The bus in 2282141 and 2282156 is lettered "AMMAN[FORD]", which supports it; the note does not give that evidence |
| 10 | Bequeathed 1976 by Hugh Newton Harries | C | S1 |
| 11 | 2,500 negatives in volumes of about 100 prints on open shelves | C | S1: "100 or so prints in each" |
| 12 | "No shelfmarks"; no catalogue record for the volumes | P | True of S1. But NLW Archives "D C Harries : Vintage Prints" lists "Llyfrau ffoto" numbers as allied material |
| 13 | Military portraits: "about 930 negatives catalogued, 200 digitised" | P | S3: "930+ glass negatives", 816 digital objects listed. S1: about 800 portraits "digitised by the Library ... browse a selection of 200". 200 is the gallery, not the number digitised |
| 14 | NLW Archives and Manuscripts: "one file only" | X | A second fonds exists: GB 0210 DCHARRIESPRINTS, 469 photographs, [ca.1910-ca.1950] |
| 15 | S3 dates [c1890-c1947] | C | S3. Its scope also includes WW2 portraits (US 28th Division, 1943-44), so the studio worked on after his death in 1940 |
| 16 | crowd.library.wales gave a certificate error | C | Certificate subject `CN=nlw.digtest.co.uk`, re-tested 2026-10-09 |
| 17 | No NLW online image of a Llandeilo street, building or the station | X | PCW 408896 (NLW-owned) is the same photograph as 2282111. Commons "Mounted soldiers on a street (3891150)", from NLW's Harries portraits, is a street view (place not identified) |
| 18 | PCW collection 2287136: 40 items, Hengwrt, 1 September 2025 | C | Collection page: 40 ids; every item "Item uploaded: 1/9/2025" |
| 19 | Tag 251856: 34 items; tag 8118 is "carmarthenshire" | C | 34 results; 8118 shows 768 results |
| 20 | Three more tagged items (a man and horses, c. 1910) not views of the town | C | 2281796, 2281811, 2281826. They have a different owner (a private individual), so they are not in the Town Council collection |
| 21 | Every item page: non-commercial download, Creative Archive Licence, creator D C Harries | C | 31 of 31 |
| 22 | Start-date disagreement: "from the early twentieth century" [S6] | C | S6: "from the beginning of the twentieth century" |
| 23 | Coflein's "D.K. Harries collection" | C | Coflein archive 6194830, word for word |
| 24 | Downloads about 2,100 to 3,100 px, cropped to the print | P | Originals are 2,087 to 3,087 px. **Four published files still show the cream mount**: 2281931 and 2281961 all round, 2282186 (wide mount), 2281916 a strip at the foot |

### Captions, credits and catalogue fields (all 31)

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 25-55 | Title, credit, `catalogueId`, `catalogueUrl` and creator for each of the 31 items | C (31) | Each PCW page read; titles match, with "A photograph of" dropped in the note's table |
| 56 | 2281961: "possibly taken by D C Harries" | C | Description: "Photograph possibly taken by D C Harries" |
| 57 | 2281901's title omits Harries | C | Title has no "by"; Creator field and tag name him |
| 58 | 2282096 is not the station: wagons lettered "PARK AND BLAINA COLLIERIES, PANTYFFYNNON BEST ANTHRACITE COAL" and a screening plant being built | C | Image: wagon sides read "PARK AND BLAINA COLLIERIES / PANTYFFYNNON / BEST ANTHRACITE COAL"; roof trusses unfinished |

### Dates

| # | Photo | Data (`from`-`to`) | Verdict | Evidence |
|---|---|---|---|---|
| 59 | 2281901 | 1905-1915 | X | Poster "CHARLES CHAPLIN in SHOULDER ARMS"; released 20 October 1918 (Wikipedia, citing *Variety* 27 December 1918). Cloche hats on the women, "especially popular from about 1922 to 1933" (Wikipedia, a lead). Not before late 1918, probably 1920s |
| 60 | 2281916 | 1895-1905 | X | Posters "PUBLIC MEETING / TARIFF REFORM / MR HENRY LONGSTAFF / MR R J RICHARDS"; also "Llandilo Parish Church Organ Recital", "Taliaris grazing land to be let". Tariff Reform League "formed in 1903". *Weekly Mail*, 21 May 1910: Longstaff "the secretary of the South Wales Tariff Reform Federation" leaving that post; *Carmarthen Journal*, 15 May 1908, p. 7: a Tariff Reform meeting at Llandilo on 20 May with "Mr. Harry Longstaff" (other speaker named differently, so not shown to be this poster). Horse chestnut in flower: May. So 1903 to about 1910 |
| 61 | 2281931 | 1915-1925 | X | "R.O.P. MOTOR SPIRIT" and "Mobiloil" signs, Shell globe pumps, a painted centre line. ROP: "from its establishment in July 1924" (BHC abstract); "1925 Company established" (Grace's Guide). Not before 1924 |
| 62 | 2282261 | 1895-1905 | D | Woman in a knee-length drop-waist dress with bobbed hair; a man in wide-legged trousers; PRHA signs. Dress points to the mid to late 1920s |
| 63 | 2282336 | 1895-1905 | D | Women in cloche hats throughout the crowd (as row 59) |
| 64 | 2282111 | 1916-1920 | P | NLW's copy of the same image (PCW 408896) is dated "1914-1918" and titled "waiting for a Troop Train". The print's note reads "(WORLD WAR ONE)". The range should end in 1918 and start in 1914 |
| 65 | 2282411 | 1895-1905 | P | The banded-brick Post Office of 1897 stands on the right, so not before 1897 |
| 66 | 2282186 | 1905-1915 | C | Building inscribed "LLANDILO POST OFFICE" and "1897" in this photo itself as well as on S15 |
| 67 | 2282246 | 1910-1920 | C | Capel Newydd "built between 1901 and 1902" (Coflein 6328), so not before 1902 |
| 68 | 2282081 | 1905-1915 | C | Porch inscribed "WELSH CALVINISTIC METHODIST 1874"; Coflein 6334: "The present incarnation of Salem Chapel dates to 1874" |
| 69 | 2282141-2282171 | 1926-1930 | — | Nothing found to date the accident |
| 70 | The other 20 | as captioned | — | No datable detail found; the caption is the only evidence, as the note says |

### Placements

| # | Photo | Verdict | Evidence |
|---|---|---|---|
| 71 | 2281901, 2282066 (church) | C | Point falls on the church in the graveyard on the 1905 map |
| 72 | 2281916 | C | Foot of Rhosmaen Street at the churchyard corner; gravestones visible under the tree in the photo |
| 73 | 2281931 | C | On the junction of Rhosmaen Street, New Road and Crescent Road (map "B.M. 188.6") |
| 74 | 2281961 | C | On New Road opposite the chapel |
| 75 | 2282081 | C | Coflein 6334: SN 62918 22563, 5 m from the point; map "Meth. Chapel (Calv.)" |
| 76 | 2282111, 2282126 | C | Coflein 80442 confirmed (SN6334022580); point on "Station" on the map |
| 77 | 2282141-2282171 | C | Coflein 43102 confirmed (SN6275722001), on "Llandilo Bridge". The photos show a small arch in an approach, not the 145 ft span, so ±60 m is about right |
| 78 | Bridge "north side" | P | Not shown in the note. Coflein mentions "the approaches and the northern flood wall, near Moreb", and 2282171 shows buildings under the approach, which fits the north end, but nothing read says which end |
| 79 | **2282186 Post Office** | X | See Summary item 2: the 1905 map's "P.O." is at about 262968, 222446, a south-west corner plot, matching the corner in 2282186 and the building opposite the Harries sign in 2282411. The point is today's post office, about 50 m east-north-east |
| 80 | 2282201, 2282216 | C | Mid Bridge Street; ±100 m honest |
| 81 | 2282231 | C | Top of Crescent Road; a terrace with bay windows behind fits. "Not confirmed" is honest |
| 82 | 2282246 | C | Capel Newydd at Coflein SN 63147 22423 (1 m from OSM). The 1905 map labels the building at the "Civic Hall" point **"Drill Hall"** |
| 83 | 2282261 | C | Map "White Hart (P.H.)" on the Carmarthen road, as stated |
| 84 | 2282276, 2282441 | C | Cadw 11080: easting 262922, northing 222364, read directly |
| 85 | 2282291 | C | Cadw 11062: 262773, 222288, read directly |
| 86 | 2282306 | C | Map "Victoria Inn" about 40 m south-west of the point; ±60 m honest |
| 87 | 2282321 | P | Coflein 300568, the CWS creamery, Heol Cennen, Ffairfach, SN 62877 21121, "first shown on the 1906 edition" of the 25-inch map, is a lead the note missed, 430 m south of the point. Its description (three storeys, brick extension) does not obviously match the photo, so it is not shown to be the same building |
| 88 | 2282336 | P | Coflein 411976 confirmed (SN6276022450); the 1905 map has a building there with "Market" lettered beside it. Coflein's quote from Pevsner puts the move from King Street early in the Victorian period, which weakens the note's worry about c. 1900; the date is undated, so "not settled" can stay |
| 89 | 2282351 | C | Map "STATION ROAD" north of Railway Terrace; the point sits on it |
| 90 | 2282366, 2282396 | C | Rhosmaen Street and King Street, ±150 m and ±80 m honest |
| 91 | 2282411 | P | Inside ±100 m, but the photo fixes it better: the sign is across the street from the 1897 Post Office. If the camera looks south (the far end shows trees, as the churchyard would), the studio is on the east side opposite the map's P.O., about 262985, 222450 |
| 92 | 2282426 | C | Foot of Rhosmaen Street, by the "196" spot height |
| 93 | 3 unplaced | C | 2282051 names no farm; 2282096 is miscaptioned; 2282381 is "possibly Llandeilo" |
| 94 | `LLANDEILO_STATION` (263266, 222361) is not the station | C | On the map the point is by an "S.P." beside the line south of the town; the station buildings are at Coflein's point |

### What each photograph shows

| # | Photo | Verdict | Evidence |
|---|---|---|---|
| 95 | 2282066: "with a lychgate" | X | Iron gates between capped piers with a lamp on an overthrow; no roofed lychgate |
| 96 | 2282081: "Gothic windows and a pointed porch" | X | Round-arched lancets and a gabled porch; Coflein: "Romanesque style ... narrow round arched lancets", "a shallow gabled porch" |
| 97 | 2282111: "a coach board reads LLANDILO"; note "only partly legible" | X | The LLANDILO board is the station nameboard on the platform (as in 2282126, "LLANDILO / JUNCTION FOR / CARMARTHEN BRANCH"). The note reads "(WORLD WAR ONE)" |
| 98 | 2282186: "fretted gables" | X | The gables are chequered brick; there are no fretted bargeboards |
| 99 | 2282246: "a stone chapel gable and a larger chapel behind it, a line of mounted men" | X | The near building is a rendered hall with an inscribed pediment (the 1905 map's Drill Hall, today's Civic Hall); the men are mounted soldiers in uniform, with an officer facing them. Capel Newydd is behind |
| 100 | 2282291: "A three-storey rendered building" | X | Cadw 11062: "Wide 2 storey and attic 5 bay"; three gabled dormers; two children at the door |
| 101 | 2282426: the quotation | P | The arch reads "IF THEIR SAND WERE PEARL" ("sand", not "sands"). Gutenberg 1108: "As twenty Seas, if all their sand were pearle", *Two Gentlemen of Verona*, confirmed. The left shield is a monogram that may not be a plain "A" |
| 102 | 2281901, 2281916, 2281931, 2282141, 2282381, 2282411 | P | Accurate as far as they go, but each leaves out the detail that dates or identifies it (rows 59-61, 9, 103, 65) |
| 103 | 2282381: no clue to the place | P | A painted "HARRIES" sign on a stone gable in the background, and a Ford Model T-type car with a registration plate too blurred to read. A lead to the place (perhaps Ammanford, where he had a studio); not placed |
| 104 | The other 18 | C | Each matches the image (minor: 2282321 has four people, a donkey and milk churns; 2282366's beast is not shown to be a bull) |

## Corrections for the note

1. **Summary, "Dates are the uploader's captions"**: add "and five of them are contradicted by
   what the images show: 2281901 (a *Shoulder Arms* poster, not before late 1918), 2281916 (Tariff
   Reform posters, not before 1903), 2281931 (an R.O.P. petrol sign, not before 1924), and probably
   2282261 and 2282336 (1920s dress)."
2. **"Who he was"**: replace "Documented (three sources, two of them independent of each other)"
   with "Documented by the NLW (S1, S3, S6); Wikipedia (S2) cites the NLW page and lists Kelly's
   Directory (1891) and the obituary only as further reading". Replace "citing *Kelly's Directory*
   (1891) and his obituary" accordingly. "Llandeilo and Ammanford, later also Llandovery" becomes
   "Llandeilo, and later Ammanford and Llandovery [S1]". Add to the disagreements table: birth year
   1865 (S3) vs 1866 (Wikidata, unsourced).
3. **"Where the collection is"**: "NLW Archives and Manuscripts, one file only" becomes two
   records, adding "D C Harries : Vintage Prints, GB 0210 DCHARRIESPRINTS, [ca.1910-ca.1950], 469
   photographs in eleven boxes arranged by subject, possibly unsold stock; allied materials Llyfrau
   ffoto 797, 944, 945, 1360, 2078-2098, 2230-3, 2238-2241, 2410 [S19]". "(about 930 negatives
   catalogued, 200 digitised)" becomes "(930+ negatives catalogued, about 800 digitised, a selection
   of 200 shown online)". Add that S3's scope includes 1943-44 portraits, so the studio carried on
   after 1940 and a "D C Harries" print is not necessarily his own work.
4. **Summary, "None of the 31 is an NLW catalogue item" / Gaps**: add that PCW 408896 (NLW, creator
   "Unknown", 1914-1918) is the same photograph as 2282111, and 408900 the same occasion; the
   attribution to Harries is PCW's, and the NLW does not make it. Move 408896 and 408900 out of
   "other photographers".
5. **Every "1890s map" (12 places)**: "the OS 25-inch map revised 1905 (Carmarthenshire XXXIII.16,
   published 1906)". S14 can keep "1892 to 1914" for the series, adding the sheet's date.
6. **The table and "Captions that do not hold up"**: apply the date and "shows" corrections below;
   add the Post Office placement correction.
7. **"What was found"**: "cropped to the print" add "except 2281916, 2281931, 2281961 and 2282186,
   which keep some of the mount".
8. **Gaps and leads**: add Coflein 300568 (CWS creamery, Ffairfach, first on the 1906 map) as a lead
   for the butter factory; the "HARRIES" sign in 2282381; and that 2282246's hall is the 1905 map's
   Drill Hall, so the mounted men are probably a military parade.
9. **Privacy**: the note names the private owner of the Williams postcards ("in the collection of
   ..."). The repo is public and the project rule is no personal data; say "a private collection".
10. **Sources**: S10, replace "Read via search result and page summary" with "Read directly
    2026-10-09". Add:
    - [S19] National Library of Wales Archives and Manuscripts, "D C Harries : Vintage Prints",
      GB 0210 DCHARRIESPRINTS - https://archives.library.wales/index.php/d-c-harries-vintage-prints -
      [ca.1910-ca.1950]; 469 photographs in eleven boxes; possibly unsold stock; Llyfrau ffoto as
      allied material. Primary catalogue.
    - [S20] Coflein (RCAHMW), "Salem Welsh Calvinistic Methodist Chapel, New Road, Llandeilo",
      NPRN 6334 - https://coflein.gov.uk/en/site/6334/ - SN6291822563; dates to 1874, Romanesque.
    - [S21] Coflein (RCAHMW), "Capel Newydd Welsh Independent Chapel, Crescent Road", NPRN 6328 -
      https://coflein.gov.uk/en/site/6328/ - SN6314722423; built 1901 to 1902.
    - [S22] National Library of Scotland, OS 25 inch county list, Carmarthenshire -
      https://maps.nls.uk/os/25inch-england-and-wales/county/carmarthenshire - XXXIII.16 "Revised:
      1905, Published: 1906".
    - [S23] Dating evidence: *Shoulder Arms* (Wikipedia, released 20 October 1918); Tariff Reform
      League (Wikipedia, formed 1903); *Weekly Mail* 21 May 1910 p. 4 and *Carmarthen Journal* 15 May
      1908 p. 7 (Welsh Newspapers Online, https://newspapers.library.wales/view/3763549/3763556/57/);
      Russian Oil Products (Grace's Guide, https://www.gracesguide.co.uk/Russian_Oil_Products;
      Business History Conference, https://thebhc.org/node/96651); cloche hats (Wikipedia, a lead).

## Corrections for app content

All in `src/content/photographs.ts` at `03e2908`. Each stays `status: 'ok'` unless stated.

1. **2281901 (lines 42-44, 50)**. `dated: 'c. 1910'` becomes `'after 1918 (caption c. 1910)'`,
   `from: 1918`, `to: 1930`. Add to `shows`: "A cinema poster on the right reads 'Charles Chaplin in
   Shoulder Arms' (a film of October 1918); the women wear cloche hats." The upper bound is a
   judgement from the hats; say so in the text.
2. **2281916 (lines 67-69, 75)**. `dated` becomes `'c. 1903-10 (caption c. 1900)'`, `from: 1903`,
   `to: 1910`. Add to `shows`: "Posters by the shop advertise Tariff Reform meetings with Henry
   Longstaff, a parish-church organ recital and Taliaris grazing to let; the horse chestnut is in
   flower."
3. **2281931 (lines 92-94, 100)**. `dated` becomes `'after 1924 (caption c. 1920)'`, `from: 1924`,
   `to: 1935`. Add to `shows`: "A COUNTY GARAGE sign and an R.O.P. Motor Spirit sign (Russian Oil
   Products, from 1924)."
4. **2282111 (lines 230-232, 238)**. `from: 1914`, `to: 1918`, `dated: '1914-1918'`. `shows`: Find
   "a coach board reads LLANDILO; a handwritten note at the foot of the print is only partly
   legible." Replace with "the station nameboard reads LLANDILO; a later note on the print reads
   '(World War One)'. The NLW holds the same photograph, creator unknown, as civilians waiting for a
   troop train." The credit stays Harries (PCW's attribution), and the disagreement goes in the note.
5. **2282186 (lines 358, 364-367)**. `at: { e: 262968, n: 222446 }`, `accuracyM: 25`,
   `basis: 'documented'`, note: "The 1905-revised 25-inch map labels 'P.O.' at the south-west corner
   of Rhosmaen Street and a lane; the building is inscribed 1897 and is a corner building, and 2282411
   shows it across the street from Harries's sign. Today's post office (263006,222471) is on the
   other side." `shows`: "fretted gables" becomes "chequered brick gables", and add "inscribed
   LLANDILO POST OFFICE and 1897".
6. **2282411 (lines 710-712, 724-727)**. `from: 1897`. Optional, after a look by eye at the camera
   direction: `at: { e: 262985, n: 222450 }`, `accuracyM: 40`, note adding "across the street from
   the 1897 Post Office, which stands on the right". Add the Post Office to `shows`.
7. **2282246 (line 456)**. `shows`: Find "A road with a stone chapel gable and a larger chapel behind
   it, a line of mounted men and horses along the left-hand kerb." Replace with "Mounted soldiers in
   uniform drawn up along the kerb, an officer facing them, in front of a rendered hall with an
   inscribed pediment (the Drill Hall on the 1905 map, today's Civic Hall), with Capel Newydd's Gothic
   front behind."
8. **2282066 (line 169)**. "with a lychgate and graveyard wall" becomes "with the churchyard gates,
   a lamp over them, and the graveyard wall".
9. **2282081 (line 192)**. "a stone chapel with Gothic windows and a pointed porch" becomes "a stone
   chapel with round-arched windows and a gabled porch inscribed 'Welsh Calvinistic Methodist 1874'".
10. **2282291 (line 529)**. "A three-storey rendered building" becomes "A two-storey rendered
    building with attic dormers"; "a child" becomes "two children".
11. **2282261 and 2282336 (lines 472-474, 594-596)**: these are judgements from dress, so **for
    Dewi**: either keep the captions' c. 1900 and add to `shows` "the clothes look like the 1920s",
    or widen to `from: 1895, to: 1930` with that reason. Not changed by a source.
12. **2282141 (line 286)**: add "The bus is lettered AMMANFORD." (This is what ties it to S1's
    Llandeilo to Ammanford bus.)
13. **2282426 (line 741 onwards)**: "if their sands were pearl" becomes "if their sand were pearl".
14. **Every `note` that says "1890s map"** (lines 109, 271, 367, 489, 562, 587, 611, 636): "the
    1905-revised 25-inch map".
15. **Files**: re-crop 2281916, 2281931, 2281961 and 2282186 to the print.

## Found along the way

- **The station crowd is probably a send-off.** NLW's two prints (408896, 408900) show soldiers
  boarding and civilians with a Union flag, in summer clothes. Its titles say "Troop Train"; the year
  is not given. A send-off of the Territorials in August 1914 would fit, but nothing read says so.
- **The Penlan Park opening, 1908**: four photographs in the same Town Council collection
  (2281991 to 2282036), creator "Unknown". Not Harries by PCW's record, but dated, and within the
  ten miles.
- **An NLW military portraits note** (S3) records a Territorial camp "between Bridge and Lovelock
  farms, Ffairfach in the summer of 1913", a dated local event for the events layer.
- **A Commons street view from the NLW's Harries negatives**: "Mounted soldiers on a street
  (3891150)", c. 1916, public domain, with a hotel sign on the left. If it is Llandeilo, it is a free
  NLW-sourced image; not identified here.
- **A map of the placed points drawn on the 1905 sheet** would be a useful asset for the photo layer;
  the stitching recipe used here (NLS tiles at zoom 18, GDAL for the grid) works for the whole town
  but not south of about N 221500, where zoom 17 and 18 tiles 404.
