---
title: Independent check of railway-later.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: the later railway at Llandeilo, 1873 to today

Reviewed note: [`../railway-later.md`](../railway-later.md) (status: draft, written 2026-10-02, untracked
in the working tree). Repo state: `main` at `ca50331`, level with `origin/main`.

## Method

- Every cited web page was downloaded with curl and read as raw text (keyword in context), not through a
  summarising fetch, so wording could be checked exactly. Wikipedia pages were read as their current
  wikitext (`action=raw`). That covers S1 to S21, S33 to S53. The two PDFs (S7, S8) were converted with
  `pdftotext` and searched.
- Wikimedia Commons file pages S22 to S31 were read through the Commons API. S32's page could not be read:
  Commons returned HTTP 429 (rate limit) on that call, so S32 is **not checked** here.
- Photographs looked at for this check: the two 1959 Llandilo photographs on S2, and S28, S29 and S30. S31
  was not viewed; its Commons categories were read instead.
- WebSearch was used twice (shared budget), plus two WebFetch calls on pages those searches found. One of
  those is a forum thread and is used only as a lead.
- Verdicts: **confirmed** (the source says it), **partly** (says some of it, or the note's wording goes
  further), **not supported** (the cited source does not say it), **contradicted** (a source says otherwise).

## Summary

- The note is careful and mostly right. Its dated photograph table, the shed records, the Glanrhyd report
  and the ownership dates all check out against the cited pages.
- **One measurable error**: "Llandeilo Junction ... about 29 miles south" is wrong. 29 miles 24 chains is
  the distance from the junction to **Llandovery** [S18]. Llandeilo is about 18 to 19 miles from it
  (S1: Llandeilo "19¼ miles from Llanelli"; S2: "the 18 mile Llanelli to Llandeilo route").
- **One false cross-check**: S2 (Terry Norman's Ammanford site) and S3 (llandeilo.org) are not independent.
  llandeilo.org says "The website is a collaborative venture by local historian Terry Norman", and its 1959
  caption and Carmarthen-line paragraph repeat S2 almost word for word. So "9645 ... [S2][S3]" and the
  platform evidence are one author, not two.
- **A missed source on platforms**: S10, already cited, says "In its heyday, the station had four
  platforms". The note says "four" came only from an unciteable search summary.
- **The post-1964 unit length is disputed by a source the note cites**: S52 says the post-1964 service was
  "just four trains each way between Shrewsbury and Llanelli. These were formed of two-car diesel rail
  cars", against S1's "Swindon cross-country sets" (three-car Class 120s).
- **"Never GWR" is an inference, not a finding.** No source read says it. S10 says GWR ran "just a few
  trains between Llanelli and Llandovery", which pass through Llandeilo. The narrower claim (the
  Shrewsbury to Swansea through trains were LNWR, then LMS) is well supported.
- **LNWR carriage colours are weaker than the table shows.** S47 mentions "LNWR coach plum and off-white"
  only as a 1948 BR trial livery; "carmine lake" lower panels come from a forum summary the note admits it
  did not read.

## Claims checked

Counts: **55 confirmed, 15 partly, 2 not supported, 4 contradicted** (76 rows).

### Priority 1: what a modeller needs

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | LNWR engines black from 1873, "blackberry black" | Confirmed | S43: "in 1873 black was adopted as the standard livery. This finish has been described as 'blackberry black'". S44 (LNWR Society): "The black livery introduced in 1873 was known as 'Blackberry Black'". Two sources. |
| 2 | LNWR coaches "plum (carmine lake) lower, white upper" [S47] | Partly | S47 says only "Corridor coaching stock was originally trialled in London & North Western Railway coach plum and off-white (nicknamed Plum and Spilt Milk)", in a section on BR in 1948. "Carmine lake" and which colour sat lower or upper are not in S47. Single, indirect source. |
| 3 | LNWR "Prince of Wales" 4-6-2 tanks (1910–16) used Shrewsbury to Swansea Victoria | Confirmed | S51: "from an early date also used on passenger services between Shrewsbury and Swansea (Victoria) over the steeply-graded Central Wales line"; "47 ... between 1910 and 1916". Single source, not Llandeilo-specific. |
| 4 | GWR engines dark holly green, then Brunswick green; frames brown or red, then black; brass plates; copper caps | Confirmed | S45: "dark holly green but this was changed to middle chrome or Brunswick green for most of its existence ... chocolate brown or Indian red frames ... changed in the twentieth century to black ... chimneys often had copper rims or 'caps'". Single source (cites Lewis, HMRS 2009). |
| 5 | GWR coaches plain brown or red 1908–22 | Confirmed | S45: "plain brown or red until 1864 and from 1908 to 1922". Single source. |
| 6 | GWR wagons dark grey from about 1904 | Confirmed | S45: "The familiar dark grey livery was introduced about 1904." |
| 7 | 1923–47 engines at Swansea Victoria shed: Black Fives, Fowler and Stanier 2-6-4T, 8Fs, LNWR 0-8-0s; December 1945 allocation 38 | Confirmed | S4: "Allocation December 1945 (38) ... cl 4MT 2-6-4T (St) LMS 7 ... cl 7F 0-8-0 G2a LNWR 5 cl 8F 2-8-0 LMS 14 cl 7F 0-8-4T LNWR 4". Black Fives in the 1946 lists carry Shrewsbury (4A) codes. One compilation. |
| 8 | 1946 photograph of 770, 2320, 8325 at Paxton Street | Confirmed | S4: "17th September 1946, with Webb 2F 0-6-2T 'coal tank' 770, LMS Fowler 2-6-4T 2320 and Stanier 8F 2-8-0 8325. Photo: Ben Brooksbank". |
| 9 | LMS coaches crimson lake | Confirmed | S46: "adopted the 'crimson lake' livery for coaching stock". S47: 1956 maroon "similar to crimson lake". |
| 10 | Black Fives black; Jubilees crimson | Confirmed | S48: "known as the 'Black Staniers' from their black livery ... Jubilee Class, which were painted crimson". |
| 11 | 1923–47 GWR local engines: 57xx panniers likely, by analogy | Partly | Labelled "low" in the note, correctly. S5 shows 57xx panniers at Llanelly in 1938 (e.g. "57xx 0-6-0PT ... 9788"), but nothing places one on a Llandeilo train before 1948. |
| 12 | 1948–64 through engines: 45190 (1959), 42307 and 42388 (1958) | Confirmed | S2 captions: "locomotive 45190 heads the 12 noon from Shrewsbury travelling to Swansea ... 29th August 1959"; "former LMS locomotive 42307 with the 10:48 to Swansea ... 29th July 1958"; "no 42388, the 2:50 from Shrewsbury ... 25th July 1958". S4 lists 45190 under "cl 5MT 4-6-0" (84G) and 42307, 42388 under "cl 4MT 2-6-4T (F)" (87K). |
| 13 | 45283 at Tirydail, 25 July 1958 | Confirmed | S2: "former LMS 45283 ... with the 3:32 to Swansea, 12 noon from Shrewsbury ... (Photo below taken 25th July 1958.)" S4 lists 45283 (84G) under cl 5MT in 1954. |
| 14 | BR Standard 5s "monopolised nearly all through-passenger workings" by 1961 | Confirmed | S1 verbatim. S4 has 73018 and 73025 (84G) at Swansea Victoria in 1954. |
| 15 | BR steam black "often with a thin red, cream and grey trim" | Partly | S47 says this of "most British Railways steam locomotives". For tank engines S49 says "unlined black soon became the standard for tank locomotives" (some 5700s early in BR green). The panniers on the local trains should be unlined black. |
| 16 | BR coaches crimson and cream from 1949, all-over crimson non-corridor, maroon from 1956 | Confirmed | S47: "crimson ... and cream for corridor coaches, with all-over crimson being used for local, non-corridor stock"; "From 1956, maroon (similar to crimson lake) was adopted". |
| 17 | Local and Carmarthen engines 3641, 9645, 9788 | Confirmed | S2: 3641 "(Photo taken 25th July 1958)"; 9645 "waits to depart at 3:25 for Carmarthen. (Photo taken 29th August 1959)"; 9788 "heads the 5:53 to Llandovery. (Photo taken 25th July 1960)". S49 number series 3600–3699, 9600–9682, 9700–9799 are 5700 class. |
| 18 | 7439 was a 7400 class, not a 57xx | Confirmed | S6: "An 0-6-0, 57xx Pannier tank ... A class of 50 locos, 7439 was the last to be withdrawn". S50: "The [last] members of the GWR 6400 Class and the GWR 7400 Class were No. 6419 and No. 7439". S4 lists 7439 under "74xx 0-6-0PT". |
| 19 | 7439 from Llanelly shed in 1962 | Confirmed | S6: "withdrawn from 87F, Llanelly Shed in April 1965". S5 lists 7439 at 87F in the 1960s. |
| 20 | Carmarthen train in the bay, 1959: three or four bogie coaches behind a pannier | Confirmed (observed) | Checked by viewing the S2 photograph: four vehicles visible in the bay, engine at the far end beside a water column. A reading of a picture, not a documented count. |
| 21 | 1964–c.1986: Swindon cross-country sets (Class 120, three cars) | Contradicted (length) | S1: "Swindon cross-country sets took over all passenger workings". S52: "just four trains each way between Shrewsbury and Llanelli. These were formed of two-car diesel rail cars, although by 1970 the service was increased to five trains". S34 confirms Class 120 were three-car. |
| 22 | DMUs green, then Rail Blue (1965) with yellow ends, blue and grey from about 1980 | Confirmed | S47 (rendered page): "Multiple units were also generally green, although this tended to be a lighter and bluer shade"; "Non-corridor coaching stock and other multiple units received all-over Rail Blue until about 1980". S47 also says "From 1974, some diesel multiple unit sets, after being refurbished, were painted white with a wide blue band", a livery the note omits. |
| 23 | 1987: Class 108, two cars, leading car 52037 | Confirmed | S8: "The leading car was a Class 108 driving motor second No. 52037 ... built in 1960, was 17.70m long and weighed 28.5 tonnes"; trailing car "a driving motor brake second". |
| 24 | The report does not state the 1987 livery | Confirmed | No livery or colour of the unit found in the S8 text. |
| 25 | c.1991–2021: Class 153 and Class 150 | Partly | Class 153 confirmed (S27 caption: "The Class 153 DMU is northbound from Llanelli", 1994; S29, 2015). Class 150 rests on S12, which carries "citation needed"; S36 (Class 150) does not mention the Heart of Wales line at all. |
| 26 | 153312 at Llandeilo, 9 August 2015: yellow front, turquoise-green sides, Arriva Trains Wales | Confirmed (observed) | S29: "The 2M39 1528 Swansea to Shrewsbury arrives at Llandeilo", dated 2015-08-09; category "British Rail Class 153s of Arriva Trains Wales". Photograph viewed: yellow cab end, dark green sides. |
| 27 | Today: Class 153s, two cars on all Heart of Wales services | Confirmed | S39 (3 June 2024): "retaining some of the Class 153 units long-term for use on the Heart of Wales Line ... semi-permanently coupled with a standard carriage to provide two-carriage trains on all Heart of Wales" services. S41: "the Class 153s which operate on the Heart of Wales Line". |
| 28 | TfW grey and red livery | Confirmed | S38 (13 July 2022): "rebranded into TfW's grey and red livery"; the 26 units "currently operate on the Heart of Wales Line" among other routes. S30 viewed: pale grey body, dark window band, red line at the roof; a second, blue unit with a yellow front. |

### Priority 2: dated events

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 29 | 1871: Swansea and Carmarthen Railways Company; New Lines worked by the LNWR from 1 July 1871 | Confirmed | S11: "incorporated on 16 June 1871 ... The New Lines were worked by the LNWR from 1 July 1871." Single source. |
| 30 | GWR took over the Llanelly's original lines from 1 January 1873 | Confirmed | S11: "the GWR took over the LR&DC's original lines from 1 January 1873". S1: "leased to another railway giant, GWR, in 1873". |
| 31 | 1873: LNWR acquired the Swansea line; Carmarthen company renamed CW&CJR | Confirmed | S11: "acquired the Swansea line in 1873"; "By the Central Wales and Carmarthen Junction Railway Act 1873 ... it changed its name". |
| 32 | LNWR stopped working local traffic from 1 April 1880 | Confirmed | S11 verbatim; S14: "not stopping from 1 April to 1 June 1880. This was due to a dispute with the London North Western Railway". |
| 33 | Vale of Towy vested jointly in GWR and LNWR, 28 July 1884 | Confirmed | S11: "in 1884 that was converted to full joint ownership ... London and North Western Railway Act 1884 ... of 28 July 1884". Note: S11 and S53 show it was already **leased jointly** before 1884 (S53: 1868 Act for a lease "jointly with the Llanelly Railway and Dock Company"). |
| 34 | Llanelly fully absorbed by the GWR on 1 July 1889 (Act of 24 June 1889) | Confirmed | S11: "fully absorbed by that company on 1 July 1889"; royal assent 24 June 1889. S1: "completely absorbed by the Great Western Railway in 1889". |
| 35 | Carmarthen line sold to the LNWR from 1 July 1891 for £137,500 | Confirmed | S11: "sold its line to the LNWR for £137,500 cash, from 1 July 1891"; vested by an Act "of 21 July 1891". Single source. |
| 36 | Neele's account of the split and the "debatable ground about ¾ mile" | Confirmed | S11 blockquote: "running powers being exercised over the intervening distance to Llandilo"; "a piece of debatable ground about 3/4 mi with disputed powers". |
| 37 | 1913: GWR doubled Pontardulais–Llanelly, widened Llandilo Junction | Confirmed | S11: "In 1913 the GWR undertook improvements to the line between Pontardulais and Llanelly, providing double track, and widening the connection at Llandilo Junction". |
| 38 | 1923: most of the route LMS, GWR kept Llandeilo–Pontarddulais | Confirmed | S1: "most of the Heart of Wales route became vested in the care of the ... LMS, though GWR retained control of the line between Llandeilo and Pontarddulais". |
| 39 | 1924: GWR Llandeilo–Lampeter scheme abandoned | Confirmed | S1: "a new branch from Llandeilo to Lampeter was abandoned in 1924". Single source. |
| 40 | Glanrhyd station closed 20 July 1931, reopened 19 December 1938, closed 7 March 1955 | Confirmed | S17 infobox. Single source. |
| 41 | 1941 bombing of Swansea Victoria | Confirmed | S1: "in 1941 ... LMS and GWR property suffered the most serious damage with the town's Victoria Station the principal target". |
| 42 | 1 January 1948: Western Region [S1][S12][S52] | Partly | S1 and S52 say it ("came under the control of the Western Region"). S12 does not mention the Western Region. |
| 43 | 18 August 1958: Brynaman passengers withdrawn | Confirmed | S1 and S11 both give 18 August 1958. |
| 44 | Closure proposal: Western Region 1962 [S1] versus Beeching 1963 [S12] | Partly | Correctly recorded, but S52 (already cited) also says "an attempt to close the whole line in 1962", siding with S1. S13: Victoria "listed in the ... Beeching Report". |
| 45 | Carmarthen branch closed 9 September 1963 (one source 6 September) | Confirmed | S1, S11, S14 and S15 ("closed to both passengers and goods traffic on 9 September 1963"), Brooksbank S22–S25 ("closed 9/9/63"). S16: "6 September 1963". S14, S15 and S16 all cite the same book (Quick 2002), so the dissent is inside one source. 6 September 1963 was a Friday, 9 September a Monday: possibly last trains versus official closure, not verified. |
| 46 | Derwydd Road closed to passengers 3 May 1964 (S2: 1963) | Confirmed | S26: "closed to passengers 3/5/64, to goods 14/3/66". S2: "a Halt at Derwydd Road, which was closed down in 1963". 3 May 1964 was a Sunday. |
| 47 | Last steam passenger trains Llanelli–Llandeilo, 13 June 1964 | Confirmed | S2: "The last two steam-drawn trains were the 7.35 a.m. bound for Llandeilo and another at 5 p.m." Single source. |
| 48 | Summary: "Steam ended on the line in June 1964" | Partly | Only passenger steam (S2). S4 lists steam at Llandovery on 5 August 1964 (8Fs 48444, 48328, 48471 and BR 4MT 2-6-4T 80134). S11 says "Steam operation on the Llanelly network ceased in 1963", a contradiction the note does not record. |
| 49 | Pontarddulais–Swansea Victoria closed 15 June 1964 (Brooksbank: 27/6/64) | Confirmed | S11: "closed to passengers on 15 June 1964". S27: "closed 27/6/64". S2 also says 13 June 1964 was the day "Swansea (Victoria) station ... was also closed", which fits 15 June as the official date. |
| 50 | 10 August 1964: through freight north of Llandovery withdrawn; Llandovery shed closed | Confirmed | S1: "withdrawn on 10 August 1964"; S11: "On 10 August 1964 the Central Wales line closed to through goods traffic"; S4: "Llandovery shed closed on 10th August 1964". |
| 51 | Local freight ended 1968 | Contradicted | S11: "to local freight in 1968". S52: "a limited pick-up goods service, which lingered until 1970". |
| 52 | 1967 proposal; marginal constituencies cross-checked | Partly | S1: "a number of marginal constituencies"; S12: "six"; S52: "five". The count is contested. £370,000 and 180,000 passengers confirmed in S1, single source. |
| 53 | Light railway order since 1972 | Confirmed | S12 verbatim. Single source. |
| 54 | HOWLTA formed 1980 | Confirmed | S52: "1980 also saw the formation of the Heart of Wales Line Travellers' Association". Single source. |
| 55 | Signalling: NSTR 1986 [S12]; investment 1985 [S52]; electric key token by 1987 [S8] | Confirmed | S12: "The signalling was modernised in 1986"; S52: "In 1985, over half a million pounds was invested"; S8: "passing loops at Pantyffynon, Llandeilo, Llandovery, Llanwrtyd and Llandrindod Wells ... by an electric key token". |
| 56 | Glanrhyd: 19 October 1987, 05.27 Swansea–Shrewsbury, two-car Class 108, four dead, reopened 30 October 1988 on a single-span steel bridge | Confirmed | S8: "the 05.27 Swansea to Shrewsbury"; "three passengers ... and the driver of the train ... were drowned"; "A single span steel girder bridge on new foundations was erected and the line re-opened to rail services on 30 October 1988". S9: "4 fatalities". S12, S33, S3 agree. |
| 57 | Ten people on the train | Confirmed | S8: "Of the ten persons travelling on the train three passengers and three members of British Railways' staff were able to escape". |
| 58 | Light engine found flood water above the rails just outside Llandeilo; "a supervisor" parked on the platform | Partly | S8 confirms the light engine (Relief Driver Rossiter, "driving the locomotive back to Pantyffynon"; water "running above the level of the rails"). The man who parked "actually on the platform at Llandeilo station" was Mr A Scott, "the 'On-call' operating manager", not a supervisor. |
| 59 | Operators: Wales and West 1996; Arriva Trains Wales December 2003; KeolisAmey 14 October 2018; TfW 7 February 2021 | Confirmed | S52: "taken over by Wales and the West Railway" (1996). S36: ATW "December 2003", "KeolisAmey Wales on 14 October 2018", "Transport for Wales on 7 February 2021". S37: TfW "commenced operation ... on 7 February 2021". S36 also gives Wales & Borders from 2001. |
| 60 | One platform 2008 to spring 2010; second reinstated May 2010 | Confirmed | S10: "between 2008 and the spring of 2010 only one platform was in use ... The second (southbound) platform was reinstated in May 2010". S18 says the same of Llandovery's loop. |
| 61 | TfW bought eight 153s in June 2021; first Active Travel 153 on 19 February 2025 | Confirmed | S35: "In June 2021, the new state-owned Transport for Wales Rail purchased eight outright for continued use on the Heart of Wales line"; "On 19 February 2025, the first of the Active Travel Class 153/5s entered service". The note also cites S37 for the eight 153s; S37 does not say it. |
| 62 | Service today: five a day plus extras [S19][S20] "(undated)"; six to Shrewsbury, five to Swansea [S12] | Partly | S19 and S20 are dated: both cite "GB eNRT December 2025 Edition, Table 130". S10 (also December 2025): "five through trains a day in each direction ... One additional through service each way was reinstated in December 2025". S37's table gives 4 trains a day Shrewsbury to Swansea. S40 (27 November 2025): the new midday service "will be the fifth on the line". |
| 63 | Today: token from platform equipment under the Pantyffynnon signaller, whose 1892 GWR box still works with semaphores | Partly | Crew-operated token under Pantyffynnon confirmed by S18 and S12. The 1892 box and semaphores come from S3's 1996 guide ("where the GWR box built in 1892 is still working"); its 2026 status was not checked. |

### Priority 3: the through trains

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 64 | "The through trains were LNWR, then LMS, never Great Western" [S1][S11][S13] | Partly | Supported for the Shrewsbury–Swansea Victoria trains: S13 (Victoria owned by "the LNWR ... 1873 to 1922, the LMS ... 1923 to 1947 ... served by trains to and from Shrewsbury, Crewe, Liverpool, Manchester and York"), S1 (LNWR's "virtual control of the entire Heart of Wales route"), S11 (running powers). **No source says "never"**. S10: "the LNWR became the main passenger operator, with the Great Western running just a few trains between Llanelli and Llandovery", and those ran through Llandeilo. A forum post (railforums.co.uk, 2 January 2019, a lead only) says "The LMS trains went to Swansea Victoria and the GWR ones to Llanelli". |
| 65 | "GWR engines on local trains only" | Partly | Consistent with S10 and S1, but S10's GWR trains ran on to Llandovery, beyond the GWR's own section. Not stated in any source. |

### Priority 4: everything else

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 66 | "Llandeilo Junction" is near Llanelli, by Trostre | Partly | S12: "the West Wales lines at Llandeilo Junction ... east of Llanelli"; S18: "Llandeilo Junction, near Llanelli". The Trostre detail rests on S32, which could not be read (HTTP 429). |
| 67 | It is "about 29 miles south" of Llandeilo | Contradicted | S18: Llandovery is "29 mi 24 chain from Llandeilo Junction". S1: Llandeilo is "19¼ miles from Llanelli"; S2: "the 18 mile Llanelli to Llandeilo route"; S8 puts a mile post "18½" (OCR "1811") "just outside Llandeilo", counted from the Llanelli end. So about 18 to 19 miles. |
| 68 | Running-in board "LLANDILO JUNCTION FOR CARMARTHEN LINE" in 1959 | Confirmed (observed) | Visible in both S2 photographs. S10: "formerly Llandilo Junction for the Carmarthen Line". |
| 69 | S1 is a transcription of Gittins and Spencer Davies (Gomer, 1985), pp. 2–14 | Confirmed | S1 page head: "HEART OF WALES RAILWAY LINE A Brief History Rob Gittins and Dorian Spencer Davies Gomer Press, 1985 Pages 2-14". |
| 70 | Platforms: two [S2], three [S3], four "search summary only" | Contradicted | S10, cited by the note: "In its heyday, the station had four platforms" (unreferenced). S2 and S3 are the same author (S3: "a collaborative venture by local historian Terry Norman"), so two against three is one man's two wordings. The 1959 photographs show a bay plus two through faces. |
| 71 | 9645 photograph "[S2][S3]" as cross-checked | Not supported (as a cross-check) | Same photograph, same caption, same author on both sites. |
| 72 | 1959 buildings: gabled canopy, stone building with tall chimneys, lattice footbridge, lamp posts, water column | Confirmed (observed) | Seen in the two S2 photographs. Reconstruction from pictures, as the note says. |
| 73 | 1983: canopied building on one platform, small brick building and stone shelter on the other | Confirmed (observed) | Seen in S28. The DMU's yellow front is clear; the body colour cannot be judged. |
| 74 | Refreshment room; the "Refresh" demolished mid-1990s | Confirmed | S3: "a refreshment room and bar at the station and staff brought a tea urn onto the train and supplied footmuffs!" S2: "known as the 'Refresh', for a while, but this was demolished in the mid 1990s". Date single-source. |
| 75 | Carmarthen branch stations by Watson & Overend, 1865 [S7] | Not supported (as worded) | S7, entry 5836A, is about **Penclawdd**: "Built by the contractors Watson & Overend in 1865, there are distinct similarities between this and other stations and buildings erected by the same contractor on the Mid Wales and Llandilo-Carmarthen lines." It does not date the Carmarthen-line stations. |
| 76 | Llandovery sub-shed: GWR 56xx and 57xx in the 1938–49 entries "surprising at an LMS shed before 1948" | Partly | S4's columns run together as the note says. One of the three visits is "Wednesday 7 September 1949", after nationalisation, and the GWR numbers (8732, 5613, 7745) carry no shed code, so they may belong to 1949. Not proven. |

Also confirmed, without separate rows, against the cited text: the Swansea Victoria and Llandovery shed
details (S4: "opened: 1882 ... A brick-built 6TS dead-ended shed"; Llandovery "opened: 1901 ... A
brick-built 4TS dead-ended shed ... On the east side of the line, south of the station"); Llanelly
"inherited much of the allocation and duties of Swansea Victoria" and closed "on 14th September 1965"
(S5); the March 1959 allocation of 55 with 24 57xx and 7 Fowler tanks (S4; it also had 19 8Fs); the Class
3MT against "class '2'" contradiction; Ffairfach milk siding, Cilyrychen quarries, Llanwrda's "10,000
tons" in 1923 (S2, S3); the Carmarthen branch opening dates (S1, S14, S15); Tirydail's renamings (S2,
S11); the Ffairfach and Llandybïe request stops and Gwili signal boxes (S19, S20); Coflein NPRN 80442 at
"SN6334022580" with "No description" (S21); the Alan Road path (S42); "1750 horse-power diesels" (S2) and
"English Electric type '3' ... assisted by Brush Type '4's" (S1); Class 108 built at Derby 1958–61 with an
aluminium body (S33); Class 153 conversion "in 1991 and 1992" (S35). Those are within the counts above
only where they have a row.

## Corrections the note needs

Corrections that would change a model, a label or a date in the app are marked **(app)**.

1. **(app)** "Llandeilo Junction ... about 29 miles south" becomes "about 18 to 19 miles south". The 29
   miles 24 chains is Llandovery's distance [S18][S1][S2].
2. **(app)** Platforms: add S10's "four platforms", drop "search summary only", and say S2 and S3 are one
   author, so the count (two, three or four) is unresolved. A station model should follow the 1959
   photographs (a bay plus two through faces) and label the count as reconstructed.
3. **(app)** 1964 to c.1986 units: record S52's "two-car diesel rail cars" against S1's Swindon sets; the
   modeller row should not imply three cars by default. Also add the 1974 white-with-blue-band refurbished
   DMU livery from S47 as a possibility.
4. **(app)** LNWR carriages: remove "carmine lake" lower and white upper from the modeller table, or source
   it. S47 supports only "plum and off-white", indirectly. Confidence low, not medium.
5. **(app)** "Steam ended on the line in June 1964" becomes "steam passenger trains ended on 13 June 1964"
   [S2, single source]; steam freight and banking engines remained at Llandovery until 10 August 1964 [S4].
   Add S11's "Steam operation on the Llanelly network ceased in 1963" to the contradictions.
6. **(app)** The through-trains claim: keep "Shrewsbury to Swansea through trains were LNWR, then LMS", but
   drop "never Great Western" or mark it as inference. Add that the GWR ran "just a few trains between
   Llanelli and Llandovery" through Llandeilo [S10], so a GWR passenger train at Llandeilo heading north
   before 1948 is historically possible.
7. **(app)** Class 150 at Llandeilo rests on a "citation needed" line [S12]; S36 does not support it. Do not
   model a 150 here without another source.
8. **(app)** BR-era pannier tanks on the locals: unlined black [S49], not the lined BR black of S47.
9. **(app)** Local freight end: 1968 [S11] against "until 1970" [S52]. Add to the contradictions.
10. Marginal constituencies: S52 says five, S12 six. Add to the contradictions; it is not cross-checked.
11. Closure proposal: S52 also gives 1962, alongside S1.
12. Glanrhyd: the man who parked on the platform was Mr A Scott, on-call operating manager, not "a
    supervisor" (names may stay out of the note).
13. Service counts: S19 and S20 are dated December 2025, not undated; S10 is too. Add S37's "4" trains a
    day as a further variant.
14. Citations: S37 does not contain the "eight Class 153s kept for the Heart of Wales line" statement (it is
    S35); S12 does not mention the Western Region in 1948; S7 entry 5836A is about Penclawdd.
15. Vale of Towy: say it was leased jointly before 1884 (1868 Act, S53; S11), so joint working predates the
    1884 vesting.
16. Carmarthen closure: S14, S15 and S16 all cite Quick (2002), so the 6 versus 9 September dissent is
    inside one book; 9 September 1963 was a Monday, 6 September a Friday.
17. Add from S52 (already cited): in the early twentieth century "through carriages were available from
    Llangammarch to Manchester, Liverpool, York, Birmingham and London Euston". That bears on what a
    through train looked like, though it is regional and single-source.
18. Pantyffynnon's 1892 box and semaphores are from a 1996 guide [S3]; say so where the note presents them
    as "today".

## Not checked

- S32 (Commons, Llandilo Junction ballast spreader): HTTP 429 from Commons. The Trostre detail is
  unverified by this check.
- S31 photograph not viewed; only its Commons categories ("British Rail Class 153s in Transport for Wales
  livery", "British Rail Class 153s on the Heart of Wales Line") were read.
- Which GWR engines worked the Llandeilo locals before 1948: two searches found nothing beyond the sources
  already cited.
