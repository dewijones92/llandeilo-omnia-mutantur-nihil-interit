---
title: Independent check of era-victorian.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: Late Georgian to Victorian Llandeilo (c. 1830-1901)

Reviewed note: [`../era-victorian.md`](../era-victorian.md) (status: draft, updated 2026-09-26).
Repo state: `main` at `97cfad9`, level with `origin/main`. Line numbers for `src/content/` refer to
the **working tree on 2026-10-02**, which had uncommitted edits by another session, so each
correction below also quotes the text it targets.

**Out of scope:** the Walk Gate date and the "two men captured" (another agent is correcting that row
today; the event-effects check covers it).

## Method

- Every cited URL that still resolves was downloaded and read as raw text (curl, then a
  keyword-in-context search), not through a summarising fetch. Wikipedia pages were read as raw
  wikitext (`action=raw`), following redirects to their new titles.
- **S4 (Rees 2011) now returns 404** at bahs.org.uk. It was read in full from the Wayback Machine copy
  of 12 December 2025 (`web.archive.org/web/20251212062831/https://bahs.org.uk/AGHR/ARTICLES/59_1_3_Rees.pdf`,
  served gzipped).
- Coflein records were read for every placed site and chapel (NPRNs 411976, 43102, 100867, 40661,
  17603, 17391, 17068, 32666, 96507, 6334, 6329, 6328, 6331, 6349, 6382, 6505, 6507, 17589, 108,
  96635, 54161). Cadw full reports were read for listings 20900 (bridge), 11098 (Plas Dinefwr) and
  9384 (Paxton's Tower).
- Independent sources used where the cited ones failed or were silent: llandeilo.org pages
  `concise_history.html`, `good_old_days.html`, `pl_town-walk.html`, `bge_history.html`,
  `trevor_rice.html`; Vision of Britain `place/263` (Bartholomew 1887); Wikipedia "St Teilo's
  Church, Llandeilo", "Dinefwr Castle", "Newton House, Llandeilo", "History of cholera", "National
  Botanic Garden of Wales"; Welsh Newspapers Online pages for S6, S7, S10, S13 and the three addendum
  articles; the 1847 Blue Books full text on Internet Archive.
- **Not opened:** S8 and S14 (aggregated search results, no stable URL), S15 (catalogue), S26 and S42
  (British Listed Buildings; the Cadw report for the same listing 11098 was read instead), S48, the
  1868 National Gazetteer transcription, Colyer parts 2 and 3 (S60), and the Wayback copy of the
  county population cube. The "no cholera case found" claim is a negative and was not re-searched.
- No WebSearch was used.

## Summary

126 claims checked: **80 confirmed, 30 partly, 4 not supported by the cited source,
12 contradicted.** The note's dates, dimensions, chapels and people are mostly sound, and its
strongest primary sources (the Times dispatch in S7, the Blue Books, Coflein and Cadw) say what it
says they say. But it under-reads its own sources in several places, and five errors reach the app:

1. **The dragoons' arrival is dated.** The Thomas Jenkins diary (S16) reads "July 9 A detachment of
   the 4th Light Dragoons arrived here". The app says when they arrived "is not known". Samuel (S9)
   also says the dragoons were followed by a foot regiment, the 41st, "for about one year"; the app's
   "dragoons were billeted in the town for nearly two years" merges the two.
2. **The 1858 count is not in S30.** The Heneb Tywi Time Line (S30) has no "290 houses" or "73 shops".
   The count is on llandeilo.org (`concise_history.html`, "According to a survey"; `good_old_days.html`,
   "as given by Gwilym Teilo in Llandeilo Past and Present in 1858"). The railway event cites S30 for it.
3. **The Great Western took over in 1873, not 1889.** S29: "the GWR took over the LR&DC's original
   lines from 1 January 1873"; 1889 is the formal amalgamation. The Llanelly train runs to 1888 in the app.
4. **Newton House before the 1850s is described in the note's own source.** S25 (Coflein): "A three
   storey house set above vaulted cellars, it had a symmetrical seven-bay facade with a central
   entrance, and an engraving of 1773 shows small corner turrets and battlements." The app says its
   form "is not in our research" and that the turrets' form "is not described".
5. **The earlier Golden Grove stood elsewhere.** S35: Wyatville's house was built "700 yards to the
   south-west above the original". The app draws the earlier mansions on the same spot as today's.

The note also misses or misreads things that matter for later content:

- **A wage figure exists in S7.** The same Times dispatch: "The wages of labourers in this district
  employed by gentlemen farmers are 7s. a week. Small farmers give 8d. or 9d. a day and food, and
  without food 10d. to 1s." The note says no such figure was found "despite a dedicated search".
- **A town population for 1841 exists in GENUKI's Lewis transcription:** "containing 5471
  inhabitants, of which number, 1313 are in the town and liberties of Llandilo-Vawr". The note calls
  1,533 (1887) "the only solid Victorian-era figure recovered for the town itself".
- **The "Welsh stick" passage is from Llandyrnog, Denbighshire**, and is a piece of wood "suspended
  by a string round a boy's neck". The note says the round-the-neck device does not appear and the
  passage is probably Pembrokeshire. Neither holds; it is still not a Carmarthenshire case.
- **Lime did not get dearer.** S59 gives lime at 3d a hundredweight in 1823 and 5s a ton by 1878.
  Twenty hundredweight at 3d is 5s, so the price was the same, and these are prices of lime (and
  coal), not carting prices.
- **The Cilyrychen kilns were Penson's own works**, on quarries he leased from Lord Dynevor in April
  1856 (S24, S27), built August 1856 to June 1858. The note says "for Lord Dynevor" in four places.
- **The Porthyrhyd details in the "27 August" row come from a paper of 12 August** (S10), so they
  describe an earlier demolition; 27 August was the second (S13: "the house had been once before
  destroyed").
- **The mock grave is single-source**, not "cross-checked (three independent write-ups)". It is not
  in Rees (S4); Wikipedia (S11) cites llandeilo.org, which quotes Matthew Cragoe in the ODNB (2004).
- **Renumbering errors**: S20 (Treachery of the Blue Books) and S12 (Baron Dynevor) are cited for
  chapel dates and denominations they do not contain. The chapel dates are timeline:S20 (llandeilo.org).

Grid references: Llandeilo Bridge, St Teilo's, Newton House, Golden Grove (current house),
Aberglasney and Paxton's Tower in the app all match Coflein or Cadw to within 15m.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

### Claims the app uses

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Llandeilo lime farmers cross three trusts; tolls 30% of the cost of the lime | Timeline 11 Aug 1843; Money | events.ts:365 `rebecca`; conversations.ts:237; almanac.ts:253 `victorian-money` | C | S7 (Times reporter, "LLANDILO, WEDNESDAY, AUGUST 2"): "three trusts adjoining to and in the town-the Main Trust ... the Llandebie Trust, and the Three Com- mon's Trust"; "The cost of these tolls is 30 per cent. on the cost of the lime for six-miles". https://newspapers.library.wales/view/4345884/4345888/28/ |
| 2 | Crops burned on the Dynevor estate, 30 August and 8 September 1843 | Timeline | events.ts:365 | C | S4 (Wayback copy) p. 48: "Not even the powerful Dynevor family could escape the wrath of Rebecca, as on 30 August and 8 September, wheat mows on the estate were set ablaze" |
| 3 | Dragoons billeted in the town for nearly two years | Timeline; Rebecca section | events.ts:365 | P | S9 (Samuel, 1868): the Cawdor Arms "was the head-quarter of a troop of ... fourth regiment of light dragoons"; then "recourse was had to the foot; and the present vicarage became the barracks of a portion of the 41st regiment for about one year. Llandilo thus for nearly two years was a military station". Troops for two years, not dragoons. https://www.llandeilo.org/dp_rebecca.html |
| 4 | Dragoons at the Cawdor Arms | Places; Rebecca section | conversations.ts:223, 237 | C | S9 as above; S16: "These troops were quartered at the Cawdor Arms Hotel". https://www.llandeilo.org/tj_caves.html |
| 5 | When the dragoons arrived is not known | (app only) | conversations.ts:237 | X | S16, Jenkins diary for 1843: "July 9 A detachment of the 4th Light Dragoons arrived here having been sent for owing to people breaking down the turnpike gates in the neighbourhood" |
| 6 | Single arch of 44.2m, largest in Wales when built | Places (bridge) | events.ts:379; places.ts:113 | C | S21 Cadw 20900: "When built it was the third largest single arch bridge in Britain and the largest in Wales"; "a single graceful broad arch of 44.2m span" |
| 7 | Replaced a seven-arch bridge whose abutment is on the N bank downstream | Places (bridge) | events.ts:379; features.ts:597, 609 | C | S21: "to replace a 7-arch bridge whose abutment can be seen on the N bank just downstream" |
| 8 | Designed by William Williams, completed by Edward Haycock | Places; People | events.ts:379 | C | S21: "Designed in 1843 by William Williams of Llandeilo, the county surveyor ... completed by Edward Haycock of Shrewsbury". S22 says Williams "supervised" and the work was "begun by Morgan Morgan and Thomas Jenkins" |
| 9 | Rise 12.65m, height 14.3m, length 110.64m, flood arch through S abutment | Places (bridge) | features.ts:629 | C | S21: "rising 12.65m to a total height of 14.3m and a total length of 110.64m"; "a segment-headed flood arch through the S abutment" |
| 10 | Bridge width not recorded (app: "its width ... approximate") | (app only) | features.ts:629 | P | S22 Coflein 43102: "It is stone built with an elliptical headed arch and is 26ft wide" |
| 11 | Bridge at SN6275722001 | Places (bridge) | places.ts:111; features.ts:79 (262757, 222001) | C | S22: "Grid Reference SN6275722001". Cadw gives 262754, 221989 |
| 12 | Body of the church demolished 1848, rebuilt 1848-51 by Scott, west tower kept | Timeline; Places | events.ts:393; features.ts:280 | C | S23 Coflein 100867: "In 1848 the body of the church was demolished"; "largely rebuilt in the Decorated style in 1848-51 by G.G. Scott following a competition" |
| 13 | Cross-head found under the chancel during the work; another by 1893 | (via timeline:S25) | events.ts:393 | C | S23: "One was discovered beneath the chancel during the 1850s restoration, and the other had been discovered by 1893" |
| 14 | Scott's plan: nave and chancel, S transept, N aisle, N porch, vestry | Places | features.ts:289 | C | S23: "seven-bayed nave and chancel, south transept, six-bayed north aisle ... north porch, vestry ... and transeptal organ chamber" |
| 15 | The pre-1848 tower was battlemented | (app only) | features.ts:272 `tower-church` | P | S23: "a stringcourse below the nineteenth century crenellated battlements with gargoyle waterspouts". The battlements are 19th-century; the pre-1848 top is not described |
| 16 | Coflein gives the tower as both 15th century and about 1600 | Places | features.ts:272 | C | S23: "double nave and fifteenth century west tower"; "The tower is thought to date to around 1600" |
| 17 | One source says the church was rebuilt in the early 18th century | Open questions 2 | features.ts:272 | C | Wikipedia "St Teilo's Church, Llandeilo" (not the Llandeilo page): "was rebuilt in the early eighteenth century" |
| 18 | St Teilo's at SN6293022236 | Places | features.ts:73 (262930, 222236) | C | S23: "Grid Reference SN6293022236" |
| 19 | Llanelly Railway to Llandeilo, January 1857 | Railways | events.ts:407; almanac.ts:265; conversations.ts:285 | C | S29: "opened ceremonially to Llandilo on 20 January 1857 ... and to the public on 24 January". S29's station list gives Llandilo "opened 26 January 1857" |
| 20 | Vale of Towy line to Llandovery, 1 April 1858 | Railways | events.ts:407; almanac.ts:265 | C | S29: "It opened its line to passengers on 1 April 1858"; S31 the same |
| 21 | 1858: a church, four chapels, 11 streets, 73 shops, 23 public houses, 290 houses, cited to S30 | Timeline 1858; Places; Homes; Population | events.ts:407, 413; features.ts:655 | NS | S30 (Tywi Time Line PDF) has none of these figures. llandeilo.org `good_old_days.html`: "as given by Gwilym Teilo in Llandeilo Past and Present in 1858 ... a little town of 290 houses; 11 streets; 73 shops; 23 public houses; 4 chapels; and a church"; `concise_history.html`: "According to a survey". timeline:S20 (llandeilo.org) therefore supports it |
| 22 | The same count cited to timeline:S55 | (timeline note) | features.ts:659 `victorian-town` | NS | Wikipedia "Llandeilo railway station" (timeline:S55) has no such figures |
| 23 | The Carmarthen line opened in 1864 | Railways | features.ts:714 | P | S36: the branch "reached Abergwili Junction in 1864"; S29: passenger stations on the line "opened 1 June 1865", with Baughan giving 14 November 1864 or 1865 in different books |
| 24 | The Llanelly company ran the line until the Great Western took over in 1889 | Railways | features.ts:722-727 `train-llanelly`; :735-740 `train-later` | X | S29: "the GWR took over the LR&DC's original lines from 1 January 1873"; "fully absorbed by that company on 1 July 1889". Also S28: after 1868 "the LNWR became the main passenger operator" |
| 25 | Before 1857 Llandeilo was reached by road only | Almanac (Travel) | almanac.ts:265 | P | Broadly right, but S29: "a service between Swansea and Llandilo from May 1850, consisting of omnibuses at each end and railway transit from Pontardulais and Duffryn" (ended August 1853) |
| 26 | Drovers up the Tywi valley to Llandovery; last large Welsh cattle drove 1870 | Landscape and farming | almanac.ts:236 `drovers` | C | S50: "Herds from south west Wales travelled towards Hereford and Gloucester up the Tywi Valley to Llandovery"; S37: "The last recorded large-scale cattle drove across Wales was in 1870" |
| 27 | Hat and shawl everyday to mid-century, revived from the 1880s as national costume | Clothing | almanac.ts:245 | C | Wikipedia "Traditional Welsh costume" (S38/S55 redirect): "went out of common use by the middle of the 19th century"; "From the 1880s ... selected elements of it became adopted as a National Costume" |
| 28 | Chapels of the three big Nonconformist denominations in and around the town | Religion | almanac.ts:270 | C | Coflein 6334 "Salem Welsh Calvinistic Methodist Chapel"; 6329 "Horeb Welsh Independent Chapel"; 6331 "Ebeneser Welsh Baptist Church ... built in 1829". The Baptist record is not among the entry's citations |
| 29 | Newton House re-fronted in Gothic "to look more medieval" than the house underneath | Almanac (Homes) | almanac.ts:281 | P | S25: "the exterior was encased in stonework of a Victorian Gothic style"; Cadw 11098: "Victorian Gothic recasing". Neither source states the motive, and it was a recasing, not only a new front |
| 30 | Town population about 1,533 in 1887 | Population | almanac.ts:298 | C | Vision of Britain place/263, Bartholomew 1887: "Llandilo .-- market town ... pop. 1533". Lewis gives 1,313 for the town and liberties (row 105) |
| 31 | Some Welsh schools used the Welsh Not; no Llandeilo case; its extent is debated | Language by class | conversations.ts:285 | C | S49: the Perl y Plant account of a Carmarthenshire school in the 1860s; "Academic texts have often given little evidence for the Welsh Not's use" (Johnes 2024). No Llandeilo case on the page |
| 32 | Penson's Gothic recasing, 1856-57: diagonal turrets with machicolations and battlements, large porch, quatrefoil parapet, Gothic stone verandah, grey shale with pale sandstone dressings | Places; Homes | features.ts:534 | C | Cadw 11098: "Victorian Gothic recasing with diagonal turrets ... by RK Penson, architect of Oswestry, l856-7"; "Snecked, grey-shale facings with pale sandstone dressings with redstone patterning"; "elaborate 2 storey venetian Gothic stone verandah". S25 the same |
| 33 | The Gothic house unchanged from 1856 to today | (app only) | features.ts:527-536 `newton-house-gothic` | P | Cadw 11098: "Billiard room added l896; subsequent alterations include removal of steep turret roofs in l934". From 1856 to 1934 the turrets had steep roofs |
| 34 | Newton House of 1660-70: "its size and form ... are not in our research" | (app only) | features.ts:506 `newton-house` | X | S25 (cited by the feature): "A three storey house set above vaulted cellars, it had a symmetrical seven-bay facade with a central entrance" |
| 35 | Turrets and battlements added 1760-80, single source, form not described | (timeline note) | features.ts:520 `newton-house-turrets` | P | S25: "an engraving of 1773 shows small corner turrets and battlements" (a second source, with form) |
| 36 | Newton House at 261432, 222534 | Places | features.ts:78 | C | Coflein 17603 SN6143222531; Cadw 261432, 222529 |
| 37 | Summerhouse on Dinefwr's tower, 1660, burned in the 18th century, cited to victorian:S25 | Places (Newton House) | features.ts:350 `dinefwr-summerhouse` | NS | S25 and Cadw 11098 say nothing about the castle summerhouse. The 1660 story is in Wikipedia "Dinefwr Castle" with "citation needed" |
| 38 | Golden Grove by Wyatville, 1827-34, Llangyndeyrn limestone ("black marble"), service wing | Places (Golden Grove) | features.ts:557 | C | S35: "begun 1827, completed 1834"; "constructed of Llangyndeyrn limestone, traditionally called 'black marble'". Coflein 17391: designed "around 1825", "service wing in 1828, the main block in 1830" |
| 39 | Golden Grove at 259711, 219855 | Places | features.ts:554 | C | Coflein 17391 SN5972019860 (about 10m) |
| 40 | The earlier Golden Grove mansions stood on the same spot as today's | (app only) | features.ts:569 `golden-grove-earlier` | X | S35: the present house was built "700 yards to the south-west above the original" |
| 41 | Aberglasney at 258145, 222133 | Places | features.ts:543 | C | Coflein 17068 SN5814022130 |
| 42 | Paxton's Tower triangular, corner turrets, hexagonal top | Places (Paxton's Tower) | features.ts:588 | C | Cadw 9384: "a triangular tower crowned by a smaller hexagonal lookout. At the corners of the triangular tower are tall round turrets" |
| 43 | Paxton's Tower 36 feet high | Places | features.ts:588 | P | Single source: S45 "The tower is 36 feet high" (citing Jones). Neither Cadw 9384 nor Coflein 32666 gives a height; Coflein describes three storeys plus a lantern |
| 44 | Paxton's Tower c.1806-09, Paxton, memorial to Nelson, above Llanarthne | Places | events.ts:347 | C | Cadw 9384: "built shortly after 1805 for the owner of Middleton Hall, Sir William Paxton"; "commemorates Nelson's victories"; "1km SE of Llanarthney village". Cadw also records a rival story (the lost 1802 election) |
| 45 | Paxton's Tower at 254094, 219151 | Places | features.ts:584 | C | Cadw 9384: 254097, 219150 |
| 46 | Llandeilo, a market town on a bluff above the Tywi | Places | places.ts:20 | C | Bartholomew 1887: "Llandilo occupies a picturesque situation on the precipitous side of a hill rising from the N. bank of the river" |
| 47 | Georgian town and historic countryside cite victorian:S39 | (app only) | features.ts:642, 687 | NS | S39 (Wikipedia "Llandeilo") has neither the 1858 count nor anything on older farm sites |

### Claims in the note only

| # | Claim | Where in note | Verdict | Evidence |
|---|---|---|---|---|
| 48 | Provisions Market, 1838, Joseph Gulston, built by William Harries possibly to Haycock's design, neo-Tudor, red sandstone doorway | Timeline 1838; Places | C | S1 Coflein 411976, word for word. Pevsner (quoted there) has Thomas Gulston moving it |
| 49 | Poor House at Ffairfach c.1839 | Timeline; Places (Ffairfach) | C | S2: "The Union Poor House was built about 1839" (against S58's 1837-38, which the note flags) |
| 50 | Union formed 14 December 1836; workhouse 1837-38, George Wilkinson, £2,243, 120 inmates; 1831 Union population 15,614; poor rate 1834-36 £5,653, 7s 3d a head | Homes; Money | C | S58 workhouses.org.uk, each figure word for word |
| 51 | First Rebecca gate at Efailwen, 13 May 1839 | Timeline | P | S3: "destroyed the toll-gates at Yr Efail Wen in two attacks in Carmarthenshire in 1839"; no day or month |
| 52 | June 1842 attack at Llandilo-rwnws near Nantgaredig | Timeline | C | S5: "They returned in June 1842 with an attack on the gate at Llandilo Rwnws near Nantgaredig" |
| 53 | Rents rose at least 100% 1793-1843 (Jones's "conservative estimate") | Timeline; Money | C | S4 p. 44 note 44, word for word |
| 54 | Llanfihangel gate on the Llandeilo mail road destroyed, "10 July 1843" | Timeline | P | S6 is datelined "Carmarthen, Monday, July 10th, 1843" and begins "On Friday afternoon last", that is 7 July. Gate "situate on the mail road to Llandilo immediately under Golden Grove, the seat of Earl Cawdor" |
| 55 | S7 is The Welshman's own report; the second gate's name is uncertain | Timeline; Rebecca section | P | S7 reprints a dispatch "[From the Times Reporter.]" dated Llandilo, 2 August. It names the gates: "Gurreyfach, one mile from the town on the Llandovery side; Ffairfach, close to the town on the other side; and Rhydyffynnon, near the kilns" |
| 56 | "A single six-mile round trip" to the kilns | Rebecca section; Money | X | S7: "going to the lime-kilns for lime, a distance of only six miles" |
| 57 | Rev. Mr Pugh returned half his tithe; David Pugh, chairman of quarter sessions, returned 20% of rents | Timeline; Rebecca section | C | Same page, in the Penlan farmers' union report, not the Llandilo dispatch; and repeated in the addendum's Glamorgan Gazette of 12 Aug 1843 |
| 58 | No local wage figure found | Money; Open questions 9 | X | S7: "The wages of labourers in this district employed by gentlemen farmers are 7s. a week. Small farmers give 8d. or 9d. a day and food, and without food 10d. to 1s." Also "A load for a small pony cart ... costs at the pit mouth 1s. 8d., and to bring this quantity to Llandilo costs 9d." |
| 59 | Porthyrhyd, night of 27 August 1843: 300-400 people, landlady made to serve beer, shots, apology letter, cited to S10 | Timeline | X | S10 is the Monmouthshire Merlin of 12 August 1843, so it describes an earlier attack ("between 300 and 400", "Mrs. Powell, the landlady", "a letter of apology"). The 27 August demolition is in S13: "the house had been once before destroyed" |
| 60 | Six named men arrested for the Porthyrhyd demolition | Timeline; People | C | S13: "Henry Thomas, Thomas Harries, John Jones, junior, Thomas Jones, William Jones, and Seth Morgan, all of Porthrhyd or its neighbourhood, were apprehended". The deponents place them near Llanddarog |
| 61 | Mock grave by Dinefwr for Rice-Trevor, to be filled by 10 October 1843; cross-checked by three write-ups | Timeline; People | P | Not in S4. S11 cites llandeilo.org `trevor_rice.html`; llandeilo.org `dp_rebecca.html` quotes "Mathew Cragoe, DNB, 2004": "they audaciously dug a grave within sight of Dinefwr Castle ... by 10 October". One origin |
| 62 | Rice-Trevor MP for Carmarthenshire 1820-52 | People | P | S11: 1820 to 1831, stood down, re-elected 1832, served to 1852 |
| 63 | Rice-Trevor Vice-Lieutenant; father Lord Lieutenant 1804-52 | People; Society | P | llandeilo.org and S11: vice-lieutenant. S4 calls him "The Lord Lieutenant of Carmarthenshire, and son of Lord Dynevor" on p. 41 and "Vice Lieutenant" elsewhere |
| 64 | Rice-Trevor brought in troops and police; "a barracks had to be built at Carmarthen" | People | P | S11: "so many troops and police that a barracks had to be built to accommodate them". No place given |
| 65 | Abadam at Porthyrhyd 22 August 1843 "armed to the teeth"; hayricks of about 60 tons, over £200 | People | C | S4: "On 22 August 1843, Abadam was present at a meeting in Porthyrhyd, attended by about 150"; "armed to the teeth"; "about sixty tons of hay, worth upwards of £200" |
| 66 | William Chambers's farm and cottages burned, spring 1845 | Timeline; People | C | S4: "later had one of his farms and its cottages set alight during the spring of 1845" |
| 67 | 4th Light Dragoons at the Cawdor Arms "/George Inn"; 41st in the old vicarage; nearly two years | Timeline; Rebecca section | P | S9 and S16 as rows 3-5. The George Inn appears only as the venue of an 1813 toll auction |
| 68 | The 1844 Act halved the lime toll ("Lord Cawdor's Act") | Timeline | P | S3: "reduced the hated toll on lime movement by half". The name "Lord Cawdor's Act" is not in S3 |
| 69 | Royal Commission named 7 October 1843: Frankland Lewis, Clive, Cripps, Rickards; trials to Cardiff before Parke, Gurney and Cresswell | Addendum | C | Welshman 13 Oct 1843, word for word |
| 70 | A Llangadog man "the seventh person ... committed at Llandovery within the last fortnight" | Addendum | C | Cambrian 21 Oct 1843, word for word (the OCR does not render "Danygarn") |
| 71 | Penlan meeting between Llangadog and Llandeilo, rules on intoxication and swearing | Addendum | C | Glamorgan Gazette 12 Aug 1843: "Penlan, a small village in the hills ... between Llangadock and Llandilo"; rule 5 on members "intoxicated", rule 6 on "cursing, swearing" |
| 72 | Lingen at the Llandilo Union Workhouse School, 31 October: 18 boys, 15 girls, all but half a dozen illegitimate; schoolmaster also porter, barber and layer-out | Timeline; People | C | S17: "I visited this school on the 31st of October. It contained ... IS [18] boys and 15 girls, of whom all, excepting some half dozen ... were illegitimate"; "porter, barber, and layer-out of the dead" |
| 73 | Zerubbabel Davies kept school in Llandilofawr parish, at Cross Inn and elsewhere | People | C | S17: "I have kept school in the parish of Llandilofawr ; at Cross Inn, Llandebie ; at, Llanelly" |
| 74 | The "Welsh stick" is passed between pupils, not hung round the neck; probably Pembrokeshire | Language by class; Open questions 7 | X | S17 (p. 452): "a school at Llandyrnog, county of Denbigh ... a piece of wood, suspended by a string round a boy's neck, and on the wood were the words, 'Welsh stick.'" Wikipedia "Welsh Not" quotes the same passage as Llandyrnog |
| 75 | Commissioners found children "dirty, ignorant, lazy, and immoral" "in the commissioners' own words" | Society and class | P | S20: the report was "characterising them as dirty, ignorant, lazy, and immoral", citing the Welsh Academy Encyclopaedia. A summary, not a quotation |
| 76 | Bridge cost: £6,000 estimate and £22,000 (Cadw) against "over £12,000" (Coflein) | Places; Money; Open questions 1 | C | S21 and S22 as quoted. £22,000 is also in Bartholomew 1887 and in Gwilym Teilo 1858 (llandeilo.org `good_old_days.html`). llandeilo.org `bge_history.html`: tenders "varied from £12,000 to below ten", and Morgan Morgan's "cut-price tender of £6,000" was accepted |
| 77 | Arch stone from Cilyrychen after nearer quarries proved defective | Places (bridge) | C | S22: "their defects forced Haycock to acquire stones from Cilyrychen". S2 says the stone came from a quarry beside the later Ffairfach signal box; the note gives both without flagging it |
| 78 | Old bridge: seven arches | Places (bridge) | P | Cadw and llandeilo.org `bge_history.html` (a stone bridge "in 1577", seven arches drawn by Turner and Rooker in the 1790s). But Gwilym Teilo 1858 via `good_old_days.html`: "In 1750 the Tywi Bridge consisted of four narrow stone arches" |
| 79 | St Teilo's details: competition, quarry in the churchyard, four-stage tower, 15th-century font from St Tyfei's | Places | C | S23 as quoted; the quarry "reportedly caved in, killing one of the workers"; "In 1845 the north aisle may have been roofless" |
| 80 | Cilyrychen kilns built April 1856 to June 1858 | Timeline | P | S24: "who leased the quarries from Lord Dynevor in April 1856"; "built between August 1856 and June 1858" |
| 81 | The kilns were built "for Lord Dynevor", "both commissioned by/for Lord Dynevor" | Summary; Timeline; People; Landscape | X | S24: designed by Penson "who leased the quarries from Lord Dynevor"; S27: Penson "built house for himself close to his limeworks at Llandybie" |
| 82 | Kilns: £3,460 19s 1d; first kiln lit 18 May 1857; nine kilns 50 ft high, 20 tons a day by 1900 | Timeline | C | S24, word for word |
| 83 | Penson 1815-85, county surveyor for Carmarthenshire and Cardiganshire, diocesan architect for St Davids c.1850 | People | C | S27 (now "Richard Kyrke Penson"): "appointed county surveyor for Cardiganshire and Carmarthenshire in 1850"; "diocesan architect for St Davids around 1850" |
| 84 | Llanelly Railway Act 4 August 1853; contract 1 March 1855; Vale of Towy Act 10 July 1854; 11.25 miles; five wooden viaducts; four intermediate stations | Railways | C | S29 and S31: royal assent 4 August 1853; "On 1 March 1855 a contract was let"; "five wooden viaducts over the Towy"; "an 11.25 mile-long extension" |
| 85 | GWR absorption, 1 July 1889 | Timeline; Railways | C | S29, word for word. The note omits the 1873 lease (row 24) |
| 86 | First Llandeilo bank at 1 Bank Terrace, 1842; Black Ox Bank 1799 | Timeline; Money | C | S30: "The first bank in Llandeilo was at no.1 Bank Terrace and opened in 1842" |
| 87 | Woollen mills, tanneries, saw mills | Summary; Landscape | C | Bartholomew 1887 (row 30). S30 also names them for the early 19th century (Hughes 2006) |
| 88 | Two railways reached Ffairfach: Llanelli Dock line 1856, LNWR 1865 | Places (Ffairfach) | P | S2 says so, but the line opened in January 1857 (row 19) and the Carmarthen line was built by the Llanelly company, 1864-65 (row 23). The note repeats S2 without flagging the clash |
| 89 | British School 1858; gas works c.1860; Torbay Inn and blacksmith; fairs 5 May and 22 November | Places (Ffairfach) | C | S2, each item |
| 90 | Cymanfa ganu launched 1859 at Bethania, Aberdare, by Rev. Evan Lewis | Religion | C | S32, word for word |
| 91 | Tabernacl rebuilt 1839 or 1840: "Coflein and Wikipedia both ... say 1840" | Religion addendum | X | Coflein 6349: "built in 1817 and rebuilt in 1839"; the 1851 census return (GENUKI): "Erected in 1817, re-erected in 1839". Only S2 says 1840 |
| 92 | Present Tabernacl 1860 by Thomas Thomas of Landore | Timeline; Religion | C | Coflein 6349: "an 1860 rebuild, by architect Thomas Thomas of Landore" |
| 93 | Thomas Thomas born 1817 near Ffairfach, "first national architect", "unchallenged master" in the 1860s, at least 119 chapels | People | C | S33, each phrase |
| 94 | Salem 1874 by Richard Owens, site in use since 1788; Horeb c.1809, rebuilt 1849; Capel Newydd 1901-02 by Henry Herbert | Religion | C | Coflein 6334, 6329, 6328, word for word |
| 95 | Ebenezer 1829, rebuilt 1850-77 by George Morgan; Llandybie Gosen 1829, 1873, 1902, 1912; Llangadog Gosen and Providence | Religion addendum | C | Coflein 6331, 6382, 6507, 6505 |
| 96 | Siloh, Penybanc: 1848 in lieu of 1820, against 1830 | Religion addendum | C | GENUKI census calendar: "Built in 1848 in Lew of Building 1820"; book title "Canmlwyddiant Siloh, Penybanc, Llandeilo, 1830-1930" |
| 97 | Shire Hall 1802, streetfront 1901, market hall below, quarter sessions above | Places | C | Coflein 96635, word for word |
| 98 | Bridge Farmhouse, C18-C19, rendered, slate, below W side of the causeway | Homes | C | Coflein 54161, word for word |
| 99 | Aberglasney let out mid-Victorian; Gardeners' Chronicle 1860; 1902 return; 1908 refusal to let | Places | C | S34, each point |
| 100 | Golden Grove arboretum laid out in the 1860s | Timeline | C | S35: "an arboretum, laid out in the 1860s" |
| 101 | Lord Lieutenancy 1852-61 unknown | Society; Open questions 5 | P | S44 (2nd Earl's page): predecessor as Lord Lieutenant was "The 1st Lord Cawdor" (the 1st Earl). When he took office is not on the page |
| 102 | Barons Dynevor 4th to 7th, dates and successions | Timeline; People | C | S12 list, each date |
| 103 | Black Ox Bank "founded by the drover David Jones"; to Lloyds 1909 | Landscape; People | P | S37: "David Jones, a farmer's son, came into contact with the drovers whilst employed at the King's Head"; S51: "a wealthy cattle drover". 1909 confirmed |
| 104 | "Two independent sources agree" on the Tywi valley droving route | Landscape | P | Only S50 states it; S37 does not mention the Tywi |
| 105 | Population "1,533 ... the only solid Victorian-era figure recovered for the town itself" | Summary; Almanac; Population | X | GENUKI, Lewis's Topographical Dictionary: "containing 5471 inhabitants, of which number, 1313 are in the town and liberties of Llandilo-Vawr" (5,471 is the 1841 parish figure). llandeilo.org `pl_town-walk.html`: mid-19th century "Population, about 1300" |
| 106 | Parish series 1801-1851, 1881, 1891; 1861 and 1871 not shown | Population | P | S61 confirms each figure. Its 1881 row also gives "10 years earlier" as 5,507, so 1871 is available |
| 107 | Lewis's 5,471 and the 1851 split 4,565 + 1,193 = 5,758 | Population | C | GENUKI: "4565" and "1193" for the two sub-districts |
| 108 | Bartholomew 1887: corn and flour, woollen cloth mills, timber and saw mills, tanneries | Timeline 1887 | C | Vision of Britain place/263, word for word |
| 109 | 1894 Act splits the parish into the urban district and Llandeilo Fawr Rural | Timeline; Population | C | S39. S39 adds that a local government district called Llandilo was formed in 1858-59 |
| 110 | 1560: 620 households, perhaps 2,790 people | Population | C | S39, word for word |
| 111 | Carmarthen 9,526 in 1841 | Population | C | S56, word for word |
| 112 | Welsh hat: late 1700s, popular in the 1830s, over 380 survive; Llanover unlikely to have influenced more than friends and servants; Vosper's Salem 1908, one hat shared | Clothing | C | S38 "Welsh hat", each point |
| 113 | Costume: betgwn common in Ceredigion and Carmarthenshire; 1807 "sky blue" cloth; trousers from 1807; Llanover influence "greatly exaggerated" after a 1963 article; 1881 Swansea; Chicago 1893 | Clothing | C | "Traditional Welsh costume" (S38/S55), each point |
| 114 | Welsh Not: Perl y Plant, 1900, a Carmarthenshire school in the 1860s | Language by class | C | S49, word for word |
| 115 | Paxton's Tower designed by S. P. Cockerell, cited to S45 | Places | P | S45 says only that Cockerell designed Middleton Hall. Cadw 9384: "The architect was Samuel Pepys Cockerell" |
| 116 | Paxton's Tower: first-floor banqueting room, second-floor hexagonal prospect room | Places | P | S45 says so. Coflein 32666: "the hexagonal banquetting room"; Cadw: "The transition from triangular to hexagonal plan within the main upper room" |
| 117 | Middleton Hall: Edward Hamlin Adams, then Edward Abadam from 1842 | Places | C | S47 now redirects to "National Botanic Garden of Wales": "In 1842 the estate passed into the hands of his eccentric son Edward" |
| 118 | Cholera totals 1832, 1848-49, 1853-54, 1866; Ystalyfera 1866, 119 deaths | Health | C | S54 (now "History of cholera"), each figure |
| 119 | Cross Hands Colliery opened 1869 by Norton & Co, 859 at its 1923 peak; Ammanford Colliery c.1900 to 1976 | Landscape | C | S53 "Cross Hands"; Coflein 108: "Anthracite drift mine, dating from about 1900; closed in 1976" |
| 120 | Nant Wallter, c.1770, from Taliaris, moved to St Fagans 1993; Coflein gives classification only | Landscape | P | S52 confirms the dates. Coflein 17589 does describe it: "Thatched cottage with lower barn" |
| 121 | Lime "3d per hundredweight in 1823, rising to 5s per ton by 1878", as carting prices | Landscape; Money | X | S59: "The price of coal and lime in 1823 was 3d a hundred-weight"; "The price of lime by 1878 was 5s a ton". At 20 hundredweight to the ton these are the same price, and they are prices of lime, not of carting |
| 122 | 50 to 100 carts at Cilyrychen or Pistyll, farmers from Cardiganshire and Pembroke, arriving before dawn to save tolls | Landscape; Sounds | C | S59, word for word ("during the middle of the last century") |
| 123 | Pistyll by Strick and Richards for their Brynamman ironworks; closed 1901; limewash entries 1734-5 and 1751 | Landscape; Homes | C | S59, each point |
| 124 | John Johnes of Dolau Cothi: cattle dealers "practically learn the value of education" | Landscape; Language | C | S60 part 1, word for word. The drover-licence fees (12d, 8d) are not in part 1; parts 2 and 3 were not opened |
| 125 | Herbert M. Vaughan's "own verdict" on his class: "aliens in birth, in religion, in politics and in language" | Society and class | P | S57: Vaughan "lamented that, branded as 'aliens in birth ...' the Welsh gentry are ruled out". He reports a label others gave them |
| 126 | Rev. Henry Richard's 1868 formulation | Society and class | C | S57: "The Rev. Henry Richard's stirring 1868 speech to the electors of Merthyr and Aberdare" |

Counts: C 80, P 30, NS 4, X 12 (126 rows).

## Corrections needed in the note

1. **Summary, Population, Almanac (Population):** drop "the only solid Victorian-era figure"; add
   Lewis's "1313 ... in the town and liberties" (with the 1841 parish total of 5,471) and
   llandeilo.org's mid-century "about 1300". Add 1871 = 5,507 from the S61 table.
2. **The 1858 count** (Summary, Timeline 1858, Places, Homes, Population): re-cite from S30 to
   llandeilo.org `concise_history.html` and `good_old_days.html` (which attributes it to "Gwilym
   Teilo", *Llandeilo Past and Present*, 1858). Add both pages to the source list. The book's author
   and year are not settled: Cadw cites "W. Samuel, Llandeilo Past and Present, 1888" and S9 cites
   Samuel 1868, so record the bibliography as uncertain.
3. **S7 framing:** it is the Times reporter's Llandilo dispatch of Wednesday 2 August 1843, reprinted
   in *The Welshman* on 11 August. Name the second gate (Gurreyfach, one mile on the Llandovery side).
   Replace "six-mile round trip" with "six miles to the kilns". The Pugh tithe and rent returns come
   from the Penlan meeting report on the same page.
4. **Money and Open questions 9:** add the S7 wages (7s a week; 8d-9d a day with food; 10d-1s
   without) and coal (1s 8d a pony-cart load at the pit, 9d in tolls to Llandilo). Remove "no wage
   figure located".
5. **Lime prices (Landscape, Money):** 3d a hundredweight (1823) and 5s a ton (1878) are the same
   price, and are prices of lime and coal, not carting prices.
6. **Cilyrychen (Summary, Timeline, People, Landscape):** built August 1856 to June 1858 on quarries
   Penson leased from Lord Dynevor in April 1856; they were Penson's works, not "for Lord Dynevor".
7. **Porthyrhyd:** split the "27 August" row. S10 (12 August) describes an earlier demolition by
   300-400 people; S13 describes the second, on 27 August.
8. **Llanfihangel gate:** destroyed on Friday 7 July 1843 (S6 is dated Monday 10 July).
9. **Mock grave:** single-source (Cragoe, ODNB 2004, quoted on llandeilo.org); not in S4.
10. **Garrison:** the 4th Light Dragoons arrived on 9 July 1843 (S16); the 41st Foot followed "for
    about one year" (S9). Drop the George Inn.
11. **Rice-Trevor:** MP 1820-31 and 1832-52; "barracks at Carmarthen" has no place in S11; record that
    S4 calls him both Lord Lieutenant and Vice Lieutenant.
12. **Welsh stick (Language by class, Open questions 7):** the passage is from Llandyrnog,
    Denbighshire, and the stick hangs round the neck. Close question 7.
13. **"Dirty, ignorant, lazy, and immoral"** is Wikipedia's summary, not the commissioners' words.
14. **Tabernacl:** Coflein and the 1851 return say 1839; only S2 says 1840.
15. **Renumbering:** in Timeline 1848 and Religion, replace S20 and S12 with the right sources
    (timeline:S20 for chapel dates; Coflein records for denominations).
16. **Ffairfach (S2):** flag the 1856 railway date and the "LNWR 1865" line against S29 and S36, and
    the Ffairfach quarry against Coflein's Cilyrychen stone for the bridge.
17. **Bridge:** add Coflein's 26 ft width and "begun by Morgan Morgan and Thomas Jenkins"; note the
    1846 flood (Cadw); add Bartholomew and Gwilym Teilo for £22,000, and the tender range of
    £6,000-£12,000 (llandeilo.org) as the likely origin of "over £12,000". Add, as a contradiction, Gwilym
    Teilo's "four narrow stone arches" in 1750 against the seven arches in Cadw and the 1790s paintings.
18. **Newton House:** add Coflein's 1660-70 description (three storeys over cellars, seven bays,
    central entrance), the 1773 engraving, the 1896 billiard room and the removal of steep turret roofs
    in 1934. The 1660 summerhouse comes from an uncited Wikipedia sentence, not S25 or S26.
19. **Golden Grove:** today's house is 700 yards south-west of the earlier one (S35); design about
    1825 (Coflein 17391). S35 and S44 do not agree on who received the estate in 1804 (S35 names John
    Frederick Campbell; S44 lists his father as 1st Baron Cawdor, 1753-1821); record it as unresolved.
20. **Lord Lieutenancy (Open questions 5):** S44 names the 1st Earl Cawdor as the 2nd Earl's
    predecessor; only his start date is open.
21. **Paxton's Tower:** cite Cadw 9384 for Cockerell; the hexagonal room is the main upper
    (banqueting) room with a lookout above; mark the 36 ft height single-source.
22. **Drovers:** only S50 gives the Tywi route; S37 calls David Jones "a farmer's son", S51 "a wealthy
    cattle drover".
23. **Smaller points:** Efailwen's 13 May is not in S3; "Lord Cawdor's Act" is not in S3; Vaughan
    reports the "aliens" label rather than endorsing it; Nant Wallter is "Thatched cottage with lower
    barn" in Coflein.

## Corrections needed in app content

1. **src/content/conversations.ts:237-238 (`three-tollgates` provenance)**
   - Current (en): "dragoons were billeted at the Cawdor Arms during the unrest (exactly when they
     arrived is not known)."
   - Corrected (en): "dragoons were billeted at the Cawdor Arms from July 1843 (a Llandeilo diarist
     records a detachment arriving on 9 July)."
   - Current (cy): "lletywyd dragwniaid yn y Cawdor Arms yn ystod yr helynt (ni wyddys pryd yn union
     y cyrhaeddon nhw)."
   - Corrected (cy): "lletywyd dragwniaid yn y Cawdor Arms o fis Gorffennaf 1843 (mae dyddiadurwr o
     Landeilo yn cofnodi mintai'n cyrraedd ar 9 Gorffennaf)."
   - Source: victorian:S16.
2. **src/content/events.ts:365-366 (`rebecca` summary)**
   - Current (en): "and dragoons were billeted in the town for nearly two years."
   - Corrected (en): "and troops were stationed in the town for nearly two years: dragoons from July
     1843, then infantry."
   - Current (cy): "a lletywyd dragwniaid yn y dref am bron i ddwy flynedd."
   - Corrected (cy): "a bu milwyr yn y dref am bron i ddwy flynedd: dragwniaid o fis Gorffennaf 1843,
     ac yna milwyr traed."
   - Source: victorian:S9, victorian:S16.
3. **src/content/events.ts:413 (`railway` provenance)**
   - Current: `documented('timeline:S55', 'victorian:S29', 'victorian:S31', 'victorian:S30', 'timeline:S20')`.
   - Corrected: drop `victorian:S30`, which does not contain the 1858 count (timeline:S20 does).
     Text unchanged.
4. **src/content/features.ts:722-727 (`train-llanelly`) and :735-740 (`train-later`)**
   - Current: `to: ad(1888)`; (en) "The company ran the line until the Great Western took it over in
     1889."; (cy) "Y cwmni oedd yn rhedeg y lein nes i'r Great Western ei chymryd drosodd yn 1889."
   - Corrected: `to: ad(1872)`; (en) "The company worked the line until the Great Western took it over
     on lease on 1 January 1873; it was absorbed in 1889."; (cy) "Y cwmni oedd yn gweithio'r lein nes
     i'r Great Western ei chymryd ar brydles ar 1 Ionawr 1873; llyncwyd y cwmni yn 1889."
   - `train-later`: `from: ad(1873)`; (en) "after the Great Western took over in 1873"; (cy) "ar ôl i'r
     Great Western gymryd drosodd yn 1873".
   - Source: victorian:S29 (also railway:S11 per the railway-later check, row 30). Which company's
     trains to show from 1873 (GWR locals or LNWR through trains) is the owner's call.
5. **src/content/features.ts:506-507 (`newton-house`)**
   - Current (en): "Its size and form before the later changes are not in our research, so it is drawn
     as a plain three-storey house with a hipped roof".
   - Corrected (en): "Coflein describes a three-storey house over vaulted cellars, with a symmetrical
     seven-bay front and a central entrance; its size and roof are approximate".
   - Current (cy): "Nid yw ei faint na'i ffurf cyn y newidiadau diweddarach yn ein hymchwil, felly fe'i
     darlunnir fel tŷ tri llawr plaen â tho ar oledd ar bob ochr".
   - Corrected (cy): "Mae Coflein yn disgrifio tŷ tri llawr uwchben selerydd cromennog, â ffrynt
     cymesur o saith bae a mynedfa ganolog; bras yw ei faint a'i do".
   - Keep the closing clause about the OS outline. Source: victorian:S25. Check the model has seven bays.
6. **src/content/features.ts:520-522 (`newton-house-turrets`)**
   - Current (en): "Turrets and battlements were added in 1760–80 (a single source). Their form is not
     described, so the square corner turrets are a guess".
   - Corrected (en): "Turrets and battlements were added in 1760–80; an engraving of 1773 shows small
     corner turrets and battlements. Their exact form is a guess".
   - Current (cy): "Ychwanegwyd tyredau a bylchfuriau yn 1760–80 (un ffynhonnell). Ni ddisgrifir eu
     ffurf, felly dyfalu yw'r tyredau sgwâr ar y corneli".
   - Corrected (cy): "Ychwanegwyd tyredau a bylchfuriau yn 1760–80; mae engrafiad o 1773 yn dangos
     tyredau bach ar y corneli a bylchfuriau. Dyfalu yw eu hunion ffurf".
   - Add `victorian:S25` to the citations.
7. **src/content/features.ts:569-576 (`golden-grove-earlier`)**
   - Current: `at: { e: 259711, n: 219855 }` (the same point as today's house).
   - Corrected: move it about 640m (700 yards) north-east of today's house, once the exact site is
     found on the OS or a Coflein record; until then add to the text (en) "The earlier house stood about
     700 yards north-east of today's; its exact site is not yet placed." (cy) "Safai'r tŷ cynharach tua
     700 llath i'r gogledd-ddwyrain o'r un presennol; nid yw ei union safle wedi'i leoli eto."
   - Source: victorian:S35.
8. **src/content/features.ts:272-273 (`tower-church`)**
   - Current (en): "the battlemented tower that still stands."
   - Corrected (en): "the tower that still stands (its battlements are 19th-century, so its top before
     1848 is not known)."
   - Current (cy): "y tŵr â bylchfuriau sy'n dal i sefyll."
   - Corrected (cy): "y tŵr sy'n dal i sefyll (o'r 19eg ganrif y daw ei fylchfuriau, felly ni wyddys
     sut olwg oedd ar ei ben cyn 1848)."
   - Source: victorian:S23. Whether the 1600-1848 model keeps battlements is the owner's call.
9. **src/content/features.ts:588-589 (`paxtons-tower`)**
   - Current (en): "Triangular in plan with corner turrets, 36 feet high, with a hexagonal prospect room
     at the top."
   - Corrected (en): "Triangular in plan with round corner turrets, crowned by a smaller hexagonal
     lookout. One source gives its height as 36 feet."
   - Current (cy): "Trionglog ei gynllun â thyredau ar y corneli, 36 troedfedd o uchder, gydag ystafell
     olygfa chweonglog ar y brig."
   - Corrected (cy): "Trionglog ei gynllun â thyredau crwn ar y corneli, a gwylfa chweonglog lai ar ei
     ben. Mae un ffynhonnell yn rhoi ei uchder fel 36 troedfedd."
   - Source: victorian:S45; Cadw listing 9384 (add to the note first).
10. **src/content/features.ts:629-630 (`bridge`)**
    - Current (en): "its width and the flood arch’s size are approximate."
    - Corrected (en): "it is 26 feet (7.9m) wide (Coflein); the flood arch’s size is approximate."
    - Current (cy): "bras yw ei lled a maint y bwa llifogydd."
    - Corrected (cy): "mae'n 26 troedfedd (7.9m) o led (Coflein); bras yw maint y bwa llifogydd."
    - Source: victorian:S22.
11. **src/content/features.ts:714-715 (`railway`)**
    - Current: (en) "The 1864 line to Carmarthen"; (cy) "lein 1864 i Gaerfyrddin".
    - Corrected: (en) "The 1864–65 line to Carmarthen"; (cy) "lein 1864–65 i Gaerfyrddin".
    - Source: victorian:S29, victorian:S36.
12. **src/content/almanac.ts:281-282 (`victorian-homes`)**
    - Current (en): "Newton House is re-fronted in Gothic style in 1856–57, to look more medieval than
      the 17th-century house underneath."
    - Corrected (en): "Newton House is recased in Gothic stone in 1856–57; the 17th-century house
      survives inside."
    - Current (cy): "Mae wyneb Gothig yn cael ei roi ar Blas Dinefwr yn 1856–57, i edrych yn fwy
      canoloesol na'r tŷ o'r 17eg ganrif oddi tano."
    - Corrected (cy): "Mae Plas Dinefwr yn cael gwisg o garreg Othig yn 1856–57; mae'r tŷ o'r 17eg
      ganrif wedi goroesi y tu mewn."
    - Source: victorian:S25, victorian:S26.
13. **Citation-only fixes (no text change)**
    - features.ts:350 (`dinefwr-summerhouse`): drop `victorian:S25`; nothing in S25 supports it.
    - features.ts:642 (`georgian-town`): replace `victorian:S39` with `timeline:S20` (the 1858 count).
    - features.ts:659 (`victorian-town`): drop `timeline:S55`; keep `timeline:S20`.
    - features.ts:687 (`countryside-historic`): `victorian:S39` supports nothing in the text; either
      cite nothing (it is reconstructed) or find a source.
    - almanac.ts:275 (`victorian-religion`): add Coflein 6331 (Ebeneser Welsh Baptist) once it is a
      note source, so all three denominations are cited.

## For the owner's decision

- **Newton House's Gothic phase:** model the steep turret roofs from 1856 to 1934 and the 1896
  billiard room, or leave the model as it is today and say so in the text.
- **Tower-church battlements** before 1848, and whether to add the old bridge's earlier history (a
  stone bridge by 1577, per llandeilo.org's bridge history) by moving `old-bridge` back from 1700.
- **Two figures the app could now show, documented:** a labourer's wage in 1843 (7s a week; 8d-9d a
  day with food), and the town's population about 1841 (1,313 in the town and liberties).
- **Status of the note:** with the corrections above it could move from `draft`, but the Lingen,
  Rebecca and population sections should be re-read against their sources first, since the errors
  found here were in how the sources were read, not in the sources.
