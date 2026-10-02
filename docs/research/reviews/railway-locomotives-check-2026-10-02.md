---
title: Independent check of railway-locomotives.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: the Llanelly Railway's locomotives around 1857

Reviewed note: [`../railway-locomotives.md`](../railway-locomotives.md) (status: draft, updated 2026-09-28).
Repo state: `main` at `5aa8465`, level with `origin/main`. The working tree had uncommitted edits by
another session; line numbers for `src/content/` refer to the **working tree on 2026-10-02**, and each
correction quotes the text it targets.

## Method

- **S1** (the Board of Trade PDF) is a scan with no text layer. It was downloaded, rendered at 300 dpi,
  read with OCR, and the key lines were checked against the page image by eye. The image shows
  "14½-inch cylinders" (OCR dropped the ½).
- **S2, S3, S4, S5** and the Denman listing (S6) were downloaded with curl and read as raw text (keyword
  in context), not through a summarising fetch. Wikipedia pages were read as wikitext (`action=raw`).
- New sources used: Amgueddfa Cymru Collections Online item 38.17/3 (*Victor*, photograph) at
  `https://museum.wales/collections/online/object/129d97ea-b31d-36d8-a9c7-4a038c5b6843/Llanelly-Railway--Dock-Company-locomotive-photograph/`;
  Wikipedia *Fossick & Hackworth* (citing RCTS, *Locomotives of the GWR* part 3, p. C47, and Reed 1956);
  Wikipedia *Locomotives of the Great Western Railway*; Wikipedia *Llandeilo railway station*.
- Six WebSearch calls were used (shared budget). Three of them looked for the 1858 Beyer, Peacock engines
  and found nothing. One search summary said Victor was "bought by the Great Western Railway in December
  1872"; the pages themselves say the Carmarthen and Cardigan Railway bought it, so the summary was wrong.
- App content checked: every `railway:S<n>` citation in `src/content/*.ts` (only `features.ts:795`), the
  asset record in `src/content/assets.ts:53-60`, the train features in `features.ts:785-810`, and the
  Blender script `tools/models/llanelly-train.py`.
- Verdicts: **confirmed** (the source says it), **partly** (says some of it, or the note goes further),
  **not supported** (the cited source does not say it), **contradicted** (a source says otherwise).

## Summary

- **S1 is read accurately.** Every quoted figure and phrase for the engine Victoria matches the scan,
  and the Blender model's dimensions follow it (4ft wheels, 8ft 6in wheelbase, 12ft by 4ft 3in boiler,
  central dome, fire and chimney at the tender end, driver at the other end).
- **One error has reached the app.** The Llanelly company did not run the line until 1889. The Great
  Western took over the Llanelly's original lines, Llanelli to Llandeilo included, **from 1 January 1873**,
  and the companies only amalgamated in 1889. Three independent sources say so: S2 ("leased to ... GWR, in
  1873"), S5 ("took over the LR&DC's original lines from 1 January 1873") and the S3 comment ("taken over
  by the Great Western Railway on 1st January 1873 (but not amalgamated until 1st July 1889)"). The GWR
  renumbered the 21 Llanelly engines it acquired "in 1873" as 894 to 914 (Wikipedia, *Locomotives of the
  GWR*), which fits Napoleon III becoming 894. So `train-llanelly` (1857-1888) and `train-later`
  (from 1889) are dated 16 years wrong.
- **S2 is not Terry Norman's own work.** Its page head reads "HEART OF WALES RAILWAY LINE A Brief History
  Rob Gittins and Dorian Spencer Davies Gomer Press, 1985 Pages 2-14". This agrees with the railway-later
  check.
- **The three loose ends:**
  1. **Victoria's weight stays unresolved, but one explanation fails.** S1 says 18 tons; S2 says "a full
     working weight of 14 tons". As S2 calls 14 the working weight, 18 cannot be explained as an empty
     weight. The new boiler plate S1 records (12½ cwt in 1851, 10 cwt in 1857, plus a new main tube and 18
     stays) comes to roughly a ton, not four. S1 is the inspector's figure for this very engine; S2 is a
     1985 popular history giving one figure for two engines. Use 18 tons and keep 14 recorded.
  2. **Victor (1864) is now confirmed, by two sources.** Museum Wales 38.17/3: "Black and white photograph
     of 0-6-0 locomotive, VICTOR. Seen here at Swindon after withdrawal in 1882", associated with the
     Llanelly Railway & Dock Company. Wikipedia *Fossick & Hackworth*, citing RCTS: "The Llanelly Railway
     took delivery of *Victor*, a 0-6-0 long boilered tender engine in 1864 (Wks No 176)", sold to the
     Carmarthen and Cardigan Railway in December 1872, not taken into GWR stock, scrapped September 1889.
     So it was built by the same Stockton firm as Victoria.
  3. **The 1858 Beyer, Peacock 0-4-2s remain single-source** (S2, Gittins and Spencer Davies). Three
     searches found no works list, number or second account.
- **Smaller points the note should fix**: S2 dates Victoria and Albert to 1839, against S1's "delivered in
  1841"; Victoria did not explode "while bringing" the ballast train but later, standing beside the
  passenger platform; the open-carriage remark in S2 is dated (1841); S5's fleet figures are referenced to
  Denman, not unsourced; and the builder was Thomas Hackworth's firm, while *Sans Pareil* was his brother
  Timothy's design.

## Claims checked

Counts: **27 confirmed, 7 partly, 0 not supported, 4 contradicted** (38 rows).

### Priority 1: what the app relies on

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | App (`features.ts:793`): the engine follows "the one Llanelly Railway engine described in detail, a six-coupled Hackworth engine of 1841 (Board of Trade report, 1858)" | Confirmed | S1: "a six-wheeled coupled engine ... constructed by the Messrs. Hackworth, of Stockton, and delivered in 1841". No other Llanelly engine of the period is described in detail in anything read. |
| 2 | App: "Which engine hauled Llandeilo's trains is not known" | Confirmed | No source read names the engines of the 1857 trains. S2 says only that "two new engines were delivered" that year. |
| 3 | App: "The company ran the line until the Great Western took it over in 1889" | Contradicted | S2: "the lines were eventually leased to another railway giant, GWR, in 1873. The Llanelly Railway and Dock Company was eventually completely absorbed by the Great Western Railway in 1889." S5 (= victorian:S29): "the GWR took over the LR&DC's original lines from 1 January 1873". S3 comment: "taken over by the Great Western Railway on 1st January 1873 (but not amalgamated until 1st July 1889)". |
| 4 | App: `train-llanelly` runs 1857 to 1888 | Contradicted | As row 3. The Llanelly company's own trains end with 1872. |
| 5 | App: `train-later` "after the Great Western took over in 1889", from 1889 | Contradicted | As row 3. |
| 6 | App (`assets.ts:57`): model built "from the Board of Trade report of 1858", URL the railwaysarchive PDF | Confirmed | The URL serves S1, pp. 20-22 of the returns. |
| 7 | Model: 4ft wheels, 8ft 6in wheelbase, six coupled | Confirmed | S1: "The wheels were 4 feet in diameter, and 8 feet 6-inch base". Script: `WHEEL_R = 0.61`, `WHEELBASE = 2.59`, three axles. |
| 8 | Model: boiler 12ft long, 4ft 3in diameter, dome over the centre | Confirmed | S1: "12 feet long and 4 feet 3 inches diameter"; "A steam dome was placed over the centre of the boiler". Script: length 3.66 m, radius 0.65 m, dome at the boiler's mid-point. |
| 9 | Model: fire and chimney at one end (the tender end), driver at the other, cylinders at the driver's end | Confirmed | S1: "The furnace, smoke-box, and chimney being at one extremity"; the driver "rode at the leading end"; the fireman "was standing on the tender"; the combustion chamber was stayed to "the cylinder end of the boiler", which is the end away from the furnace. The script matches all four. |
| 10 | Model: outside cylinders | Partly | S2 only: "complete with outside cylinders". S1 gives bore and stroke but not their position. Correctly labelled single-source in the note. |
| 11 | Model: colours, cab, tender shape and carriages chosen, not recorded | Confirmed | Nothing read gives a livery or a carriage design for the Llanelly Railway in 1857. The app says "the colours, tender and carriages are guesses". |

### Priority 2: names, weights, builders and dates

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 12 | Victoria: six-coupled, 18 tons, 14½in by 16in cylinders | Confirmed | S1, checked on the page image: "weighing 18 tons. It had 14½-inch cylinders with 16-inch stroke". |
| 13 | Victoria built by Messrs Hackworth of Stockton, delivered 1841 | Confirmed | S1 verbatim. |
| 14 | Victoria and Albert were Hackworth six-coupled tender engines, 4ft wheels; builder, wheels and coupling cross-checked by S1 | Partly | S2: "two 060 tender engines 'Victoria' and 'Albert', designed and constructed by T. Hackworth and Company". The cross-check holds, but S2 also says "The first such trains ran that same year" (1839), against S1's 1841. Wikipedia S5: "Two locomotives were in use on the line from 1840" (ref. Denman). This date clash is not recorded in the note. |
| 15 | Weight: 18 tons (S1) against 14 tons (S2); "one figure may be empty weight" | Confirmed (as a contradiction) | Both figures are in their sources. But S2 says "a full working weight of 14 tons", so the empty-weight explanation would need 18 to be the lower figure, which it is not. Repairs in S1 add roughly a ton of plate, not four. No third source found. |
| 16 | Princess Royal (1842), Prince of Wales (1843, the company's own design), same wheel arrangement | Confirmed | S2: "A third engine 'Princess Royal' another 060 tender engine ... in 1842"; "a locomotive of their own design, the 'Prince of Wales', in 1843; another 0 60 tender engine with outside cylinders". Single source. |
| 17 | Two new engines delivered in 1857, not named | Confirmed | S2: "to Llandeilo ... in 1857 ... In the same year two new engines were delivered to the Llanelly Company". Single source. |
| 18 | 1858: two 0-4-2 tender engines, outside cylinders, by Beyer, Peacock of Manchester, also named Victoria and Albert | Confirmed (single source) | S2: "in 1858, took delivery of two 042 locomotives constructed by the Manchester workshops of Messrs Beyer, Peacock and Company; again tender engines with outside cylinders. The Llanelly Company named these new engines 'Victoria' and 'Albert'". Three searches found no second source, works numbers or drawings. |
| 19 | Napoleon III: 2-4-0 by Kitson & Co., 1868, later GWR 894 | Confirmed | S4: "2-4-0 locomotive 'Napoleon III' built by Kitson & Co. in 1868, seen as Great Western Railway no. 894". S3 says "built by Kitson & Co in 1868 as GWR no.894", which is loosely worded (the number dates from 1873). S3 and S4 are one museum and one photograph, so not independent. |
| 20 | S3 commenter: works no. 1510, May 1868, rebuilt 1892, withdrawn 1906 | Confirmed | S3 comment (Graham Davies, 26 November 2014): "built by Kitsons in May 1868 (Wks No 1510)"; "rebuilt at Wolverhampton GW Works in June 1892"; "Finally withdrawn in December 1906". A comment, not a catalogue entry. |
| 21 | "Victor", 0-6-0 of 1864, "no fetched page confirmed it" | Confirmed (now) | Museum Wales 38.17/3: "0-6-0 locomotive, VICTOR. Seen here at Swindon after withdrawal in 1882", associated with the Llanelly Railway & Dock Company. Wikipedia *Fossick & Hackworth* (ref. RCTS p. C47): delivered 1864, "Wks No 176", "long boilered tender engine", sold to the Carmarthen and Cardigan Railway in December 1872. Wikipedia *Locomotives of the GWR* lists it under that railway, "bought December 1872". |
| 22 | Opening: the train "reached Llandeilo in January 1857" | Confirmed | S5: "opened ceremonially to Llandilo on 20 January 1857 ... and to the public on 24 January" (refs MacDermot, Barrie); S2: "to Llandeilo ... in 1857". The exact day is contested inside S5: a footnote quotes Denman, "carried traffic from 1st January 1857, being formally opened on 21st January", and S5's station list gives "Llandilo; opened 26 January 1857". The note claims only the month, which is safe. |
| 23 | S1 is Yolland's report dated 9 June 1858, covering letter 15 June 1858, pp. 20-22 | Confirmed | Page heads 20 and 22; "Whitehall, June 9, 1858"; covering letter "June 15, 1858" signed by Douglas Galton. |
| 24 | Explosion on 29 January 1858 at Pantyffynnon, three killed | Confirmed | S1: "on the 29th January last at the Pantyffynnon station ... by which three persons were killed and 13 others were more or less seriously injured". The three dead were lads. |
| 25 | Liveries: none recorded for the period | Confirmed | No colour for any Llanelly engine or carriage of 1857-72 appears in S1 to S5 or the new sources. |

### Priority 3: everything else

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 26 | Boiler construction: main tube with grate one end, combustion chamber the other, 68 small tubes back to the smoke-box | Confirmed | S1: "an internal main tube ... 8½ feet long, and 2 feet in diameter; which tube carried the fire grate at one end, and had a combustion chamber ... at the other ... 68 small iron tubes, 2 inches exterior diameter". |
| 27 | Crew positions quotation | Confirmed | S1 verbatim, "From the peculiar construction of the engine, the driver ... rode at the leading end of the engine; and the fireman ... rode at the other." |
| 28 | Ran with a tender, which the fireman stood on | Confirmed | S1: "He was standing on the tender, and was blown on to the top of the tank of the tender". |
| 29 | "had been lying by two years and a half ... never powerful enough for the winter traffic" | Confirmed | S1 verbatim. |
| 30 | "By 1858 Victoria was worn out and used only for ballast trains" | Partly | S1: "of late mostly employed in ballasting" (not only); the covering letter blames "the worn-out condition of the boiler". S1 also says the engine was repaired June to December 1857 and was "in substantial repair when taken out of the workshops in December 1857". |
| 31 | "exploded while bringing six trucks of ballast from the Amman branch" | Partly | S1: it had brought the six trucks down, shunted them into a siding, stood about 10 minutes in another siding, and "was then shifted alongside of the passenger platform"; it exploded "about half-past five o'clock" while the driver was arranging to exchange it for a passenger engine. S2's "on the approach to Pantyffynnon station" is contradicted by S1. |
| 32 | The driver told the fireman "in Welsh, to turn the feed-cock" | Confirmed | S1 verbatim. |
| 33 | A new station was being built at Pantyffynnon in January 1858; passenger and ballast trains shared the line | Confirmed | S1: "some workmen were employed close by the engine in erecting a new station at this junction"; the driver asked to exchange "his engine for the one expected to bring in a passenger train". |
| 34 | Fleet: two engines in 1840, five by 1847 "(Wikipedia, unsourced there)" | Partly | The figures are in S5, but both carry `<ref name = denman/>` with "page needed". They are referenced to Denman (2012), not unsourced. |
| 35 | S2 is "Terry Norman (personal site)", secondary, no references given | Contradicted (authorship) | Page head: "HEART OF WALES RAILWAY LINE A Brief History Rob Gittins and Dorian Spencer Davies Gomer Press, 1985 Pages 2-14". It is a transcription of a 1985 book hosted on the site. No references, confirmed. |
| 36 | Early passengers rode "on open passenger carriages or converted goods wagons attached to goods trains" [S2], "without a date" | Partly | The quotation is right, but S2 dates it: "The first passengers were carried ... in 1841 ... These passengers were carried on open passenger carriages or converted goods wagons attached to goods trains. At this time however there were no stations". S5 agrees for 1841 (company letter of 14 October 1841, quoted in Denman) and adds that passenger trains appeared in Bradshaw in 1850. So it is not evidence for 1857. |
| 37 | Open question: Victoria and Albert as "Hackworth return-flue engines of the type of his *Sans Pareil*" | Partly | S1's description fits a return-flue boiler. But *Sans Pareil* was Timothy Hackworth's engine; the builder here was "T. Hackworth and Company" (S2), i.e. Fossick & Hackworth of Stockton, founded 1839 "by George Fossick and Thomas Hackworth (brother of Timothy Hackworth)" (Wikipedia *Fossick & Hackworth*). "His" points at the wrong brother. |
| 38 | S6: Denman (2012) has a chapter "The Locomotive Fleet" | Confirmed | Branchstow listing: contents include "The Locomotive Fleet"; "Publication Date – 2012", "184 Pages, 83 Illustrations". |

## Corrections the note needs

1. **S2's citation**: retitle as Rob Gittins and Dorian Spencer Davies, *Heart of Wales Railway Line: A Brief
   History* (Gomer Press, 1985), pp. 2-14, transcribed on Terry Norman's site (same URL). Update the
   generated source title by re-running `tools/research/extract-sources.mjs`.
2. **Add the 1873 takeover**, with S2, S3 (comment) and S5: the GWR took over the Llanelly company's original
   lines, Llanelli to Llandeilo included, from 1 January 1873, and acquired 21 engines, renumbered 894-914;
   amalgamation followed on 1 July 1889. State that the Llanelly company's own engines are relevant only to
   1857-1872.
3. **Victor**: replace "a search summary also mentioned ... no fetched page confirmed it" (Later engines
   bullet and S4's annotation) with the confirmed facts and the two new sources: 0-6-0 long-boilered tender
   engine, Fossick & Hackworth works no. 176, 1864; sold to the Carmarthen and Cardigan Railway December
   1872; photographed at Swindon after withdrawal in 1882 (Museum Wales); scrapped September 1889 (Wikipedia,
   citing Reed 1956). The 1882 and 1889 dates are withdrawal and scrapping, so not necessarily in conflict.
4. **Weight**: keep the contradiction, but delete "or one figure may be empty weight": S2 calls its 14 tons
   the full working weight. Say that S1's recorded repairs (about a ton of new plate) do not explain four
   tons either, and that the model uses S1's 18.
5. **Record the date clash**: S2 has Victoria and Albert running in 1839; S1 says Victoria was delivered in
   1841; S5 (ref. Denman) has two engines in use from 1840.
6. **The explosion**: change "exploded while bringing six trucks of ballast" to "exploded at Pantyffynnon
   about half-past five, standing beside the passenger platform after bringing down six trucks of ballast"
   [S1], and note that S2's "on the approach to Pantyffynnon station" is contradicted by S1.
7. **"used only for ballast trains"**: S1 says "mostly". Add that it was repaired June to December 1857, so it
   was out of service for half of Llandeilo's first year.
8. **S5's fleet figures** are referenced to Denman ("page needed"), not unsourced.
9. **Carriages**: S2's open-carriage remark is dated 1841. Move it out of the 1857 question, and add S5's
   1841 company letter and the 1850 Bradshaw passenger trains.
10. **Open question on *Sans Pareil***: name the brothers correctly: built by Thomas Hackworth's firm
    (Fossick & Hackworth, Stockton); *Sans Pareil* was Timothy Hackworth's.
11. **Add, as context for 1857-1872**: Fossick and Hackworth (as Ianson, Fossick and Hackworth) worked the
    line under contract from January 1850 to August 1853 (S5, ref. MacDermot); from 1867 the company bought
    six standard 0-6-0s with **inside** cylinders, delivered over two years (S2). So by the late 1860s a
    1841-pattern engine is less typical of what ran than in 1857.
12. **Lead, not checked here**: S5 says the LNWR gained running powers and a share of the Vale of Towy lease
    from about 1868, and S5's station page says the Central Wales Extension reached Llandovery that year.
    Some trains through Llandeilo before 1873 may therefore have been LNWR, not Llanelly. Worth a line in
    the note and a question in `open-questions.md`.

## Corrections for app content

All in `src/content/features.ts` (working tree, 2026-10-02). The two date changes must land together:
`tests/content.test.ts` requires the trains to cover every year of the railway without overlapping. The
e2e train test uses `?year=1860`, which stays inside the new range. Welsh wording is a proposal; a human
Welsh check is still parked.

| Location | Current | Corrected | Source key |
|---|---|---|---|
| `features.ts:790` (`train-llanelly`) | `to: ad(1888),` | `to: ad(1872),` | railway:S2, railway:S3, victorian:S29 |
| `features.ts:793` (en) | "The company ran the line until the Great Western took it over in 1889." | "The company worked the line until the Great Western took it over on 1 January 1873; the two companies merged fully in 1889." | railway:S2, railway:S3, victorian:S29 |
| `features.ts:794` (cy) | "Y cwmni oedd yn rhedeg y lein nes i'r Great Western ei chymryd drosodd yn 1889." | "Y cwmni oedd yn gweithio'r lein nes i'r Great Western ei chymryd drosodd ar 1 Ionawr 1873; unodd y ddau gwmni'n llwyr yn 1889." | as above |
| `features.ts:795` (sources) | `['railway:S1', 'railway:S2', 'victorian:S29']` | `['railway:S1', 'railway:S2', 'railway:S3', 'victorian:S29']` (S3 carries the dated 1873 and 1889 statement) | railway:S3 |
| `features.ts:802` (`train-later`) | `from: ad(1889),` | `from: ad(1873),` | railway:S2, victorian:S29 |
| `features.ts:806` (en) | "...that ran here after the Great Western took over in 1889 have not been researched yet." | "...that ran here after the Great Western took over in 1873 have not been researched yet." | railway:S2, victorian:S29 |
| `features.ts:807` (cy) | "...ar ôl i'r Great Western gymryd drosodd yn 1889." | "...ar ôl i'r Great Western gymryd drosodd yn 1873." | as above |

No change is needed to `assets.ts:53-60` or to the Blender script: both follow S1 correctly. The
`train-later` placeholder text may be superseded anyway once `railway-later.md` reaches the app; if so, its
start year must still be 1873.

## Not checked

- Denman (2012), the specialist account of the fleet, was not available; it is the best hope for the 1857
  engines, the 1858 Beyer, Peacock pair and any livery.
- RCTS *Locomotives of the GWR* part 3 (cited for Victor) was not read directly, only through Wikipedia.
- S1's enclosed boiler section and three photographs are not in the scan.
