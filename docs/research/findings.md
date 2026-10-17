---
title: Research findings and decisions
kind: research
status: current
updated: 2026-10-17
---

# Research findings and decisions

The outcomes of the research, in one place: what we found, what it changed, and what we decided
because of it. The detail and sources are in each note; this is the summary a new reader needs.

## Method decisions

| Decision | Why |
|---|---|
| One research agent per era or topic, each with a written brief (kept in `briefs/`) | Parallel, repeatable, auditable |
| Sources, not memory; Wikipedia only as a lead | The project's first law |
| Every claim marked cross-checked or single-source | Makes weak claims visible |
| Contradictions recorded side by side, never silently resolved | Several turned out to matter |
| Citations are typed keys extracted from the notes (`medieval:S27`) | A citation to a missing source fails the build |
| Independent Opus review of every content claim against the notes | It found real errors (below) |
| Place sites from Coflein or Cadw grid references, not a note's approximate lat/lon | The Roman forts were 0.9km out |

## Headline findings

- **Earliest people**: no dated Palaeolithic or Mesolithic site inside the ten miles. The earliest
  attributed monument, the Garn Goch long cairn, is Neolithic by shape only, and that is contested:
  Coflein says Neolithic by appearance, Cadw's schedule "probably ... Bronze Age" (both typological;
  added 2026-10-02, [ironage:S7], timeline S10). The ice began to retreat
  about 18,000 years ago, and people are believed to have been back in Wales by about 14,500 years
  ago, though the source does not say whether that is calendar or radiocarbon years (corrected
  2026-10-02). ([timeline](timeline-and-earliest-occupation.md))
- **Garn Goch** is one of the largest hillforts in Wales; **no excavation of it is recorded**, only
  survey; its purpose is openly unresolved. A local story that its people "rebuilt and strengthened"
  it against Rome in AD 47–78 is single-source and not used (corrected 2026-10-02: it is not a Roman
  rebuild). ([iron age](era-iron-age.md))
- **The Dinefwr Roman forts** (two, one after the other) were identified in 2003 and excavated in
  2005. The primary report gives the first as 3.84–3.85ha, probably soon after AD 74, and the second
  as 1.54ha; the site was abandoned by about AD 140 (2026-10-02; the old size and date dispute is
  closed). ([iron age](era-iron-age.md))
- **Detailed pass on the Dinefwr forts and their vicus (2026-10-09):** three of Fort 2's four gates are
  evidenced (the rear one is not), both forts were timber and earth with no stone, the survey was
  Stratascan's magnetometry (not ground radar), the second fort's "around AD 90-100" has no source, the
  vicus plot is irregular and thinly known, and the survey's "bathhouse" is probably post-medieval brick.
  The forts' absolute position needs registering on the LiDAR. *Corrected 2026-10-09 (independent check)*: the
  Heneb HER gives each fort a grid reference (Fort 1 SN 6218 2245, Fort 2 SN 6217 2253), the report's Fig 1 and
  Coflein agree (the first pass's "about 50m east" was a measurement error), the "AD 90-100" is probably the
  caption date of the Ludlow painting on llandeilo.org, and Roman tile was found in the fort and vicus.
  ([roman forts](roman-forts-and-vicus.md))
- **Built 2026-10-09 ([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)),
  and the placeholders corrected:** the app's two forts had been boxes at the wrong place and angle (the larger
  fort on the smaller's centre, the smaller 28m east and 29m south of it, both at about 7 degrees against the
  figures' 48 to 53, with tiled roofs and a limewashed headquarters, at 2.6 times life size). They are now
  Fort 1 about E 262206 N 222470 and Fort 2 about E 262190 N 222538 (within 40m and 30m of the HER's points, Fort 2
  within 5m of Coflein's), drawn in true size, timber and earth only, each part marked documented,
  reconstructed or imagined. Fort 1 is shown from AD 74 and gone by 83, Fort 2 from 83 (the HER's
  "possibly around 82" stays in the ⓘ as unproven; a Fort 1 ditch lies under Fort 2's levelling, so they were not
  together) to 125 and gone by 140. The settlement is drawn from 83 to 135; its pottery from about AD 70 shows
  earlier activity, not drawn as streets. Fort 1's measured ditch profiles (1.7m by 1.1m, 1.0m by 0.5m) are the
  south-west side's, from Trench 1; the south-east side's are drawn like them and marked not measured. Registration on the LiDAR is still open.
- **What the forts' surfaces were, for the textured models (2026-10-10)** ([fort surfaces](fort-surfaces.md)). Turf blocks
  measured in Roman fort ramparts are 0.03 to 0.15m high (Vindolanda 0.06 to 0.08m, Strageath's Flavian rampart 0.03
  to 0.08m) and Vegetius gives half a Roman foot, about 0.15m: the turf kit's 0.3m courses, a guess, were twice the
  largest, and are now 0.15m. Turves were often laid grass side down (Croy and Balmuildy Road on the Antonine Wall,
  Vindolanda), not at Laurieston consistently either way, so the bank's faces are drawn as soil and only its walk as
  grass, which is imagined (whether the top was grassed is not known). Oak is an analogy for the timber (Vindolanda's oak timbers; Pliny on oak shingles); daub was found
  at the site, but its make-up and finish are reconstructed, and it is drawn bare (no limewash); what roofed the forts and the settlement stays imagined. Every texture is a
  modern photograph standing in for the look, and says so in its ⓘ.
- **The Llandeilo Gospels' "Surexit" note** is called "the earliest surviving document in the Welsh
  language", recorded at Llandeilo; the Cadfan Stone at Tywyn may be older as a text, and the note's
  exact date is debated. ([language](language-by-class.md))
- **The Battle of Llandeilo Fawr, 1282** is real: 16 or 17 June (sources differ). **No source read so
  far names the Welsh leader**: two secondary analyses say the primary chronicles do not, and Brut y
  Tywysogion has not yet been read directly. Wikipedia's claim that Rhys ap Maredudd led it
  contradicts his own biography. No evidence of a separate "1116 battle" was found.
  ([medieval](era-medieval-to-1282.md))
- **Carreg Cennen as it stands** is probably mostly English work of 1287–1321, not the Lord Rhys's.
- **The Rebecca Riots reached Llandeilo**: the Walk Gate was destroyed in August 1843, and lime
  tolls ran to about 30% of the cost of the lime. "Llandilo" in 1840s newspapers can also mean a
  Glamorgan parish. ([victorian](era-victorian.md))
- **Welsh costume** was everyday wear into the mid-19th century and was revived from the 1880s as
  a symbol. Lady Llanover did not invent it.
- **Welsh speakers in Llandeilo**: the ward was 55.1% (2001), 50.3% (2011) and about 45% (2021); the
  community (the town) was 53.5% (2001) and 48.7% (2011). Corrected 2026-10-02: the ward figures had
  been called the town's. ([language](language-by-class.md))
- **The Great Western took over the Llanelly line on 1 January 1873**, not 1889 (the companies merged
  in 1889). The app's trains now change in 1873. ([railway](railway-locomotives.md))
- **Deep time**: Llandeilo gave its name to an Ordovician stage (now obsolete; Murchison's "Llandeilo
  flags", per Lyell 1871) and the Llandeilo Flags Formation (BGS). The first written record of a
  trilobite was a find probably made near Dinefwr, in a letter of **1698** (corrected 2026-10-02 from
  1688). **1166 is the last written mention of a wolf in Wales**, not the date wolves died out, which
  was probably the 13th or 14th century (corrected 2026-10-02). ([deep time](deep-time-and-natural-history.md))
- **Besides the wars already on the timeline (1282, 1287, 1403), two invasions are recorded inside the
  ten miles**: 1213, when Rhys Gryg burned Llandeilo and
  Dinefwr was besieged, and 1257, when Bauzan's army camped at Llandeilo (one chronicle) and was
  destroyed at Cymerau, its site contested. No Viking raid, no Norman castle of 1093–1116 and no Civil
  War fighting is recorded inside the area. Both are key dates since 2026-10-03.
  ([invasions](invasions-and-raids.md))
- **Distant shocks recorded here are the 1849 cholera** (one partly illegible report) **and the 1918
  influenza** (four papers); the others (the Black Death, 1816, potato blight and more) are recorded only for the county or the
  region, or not in Wales at all. Both are in the app since 2026-10-03, the 1849 one as a card only. The Victorian note had said
  no local cholera case was found; that, and the almanac line built on it, are corrected.
  ([ripples](ripples-from-afar.md))

## Dinefwr Castle for a Blender model (2026-10-10)

From [`dinefwr-castle.md`](dinefwr-castle.md), a draft, checked by the same agent the same day
([check 1](reviews/dinefwr-castle-check-1.md)) and then independently by a second Opus
([check 2](reviews/dinefwr-castle-check-2.md), whose six important findings were each verified against the sources and fixed), and a third time on 2026-10-16 ([check 3](reviews/dinefwr-castle-check-3.md): five important findings and a set of suggestions, each verified or re-measured, and fixed), and a fourth time the same day ([check 4](reviews/dinefwr-castle-check-4.md): two important findings, one of them check 3's own fix, and a set of suggestions). Written by Claude for the Blender model Dewi chose next (decision log, 2026-10-10).

- **The Cadw plan fits the 2020-22 LiDAR to about a metre**, once its scale is taken from the ground: fitted to five
  points it is 8.58 pixels a metre against its own bar's 8.15, so the plan as reproduced is drawn about 5% larger than its
  bar says and lengths read off the bar are about 5% too big (the cause, in the drawing, its bar or the reproduction, is
  not known; the 1280 panel of Cadw's phase plans fits within 2% of its own bar, but that plan's panels are drawn at different scales, keep to north-west tower 6.5 to 7.3 pixels a metre, so each needs its own fit before anything is measured off it). The keep's centre is E 261168.5 N 221724.0, about 20m east-south-east of Coflein's reference, which lies
  inside the inner ward. ([dinefwr:S10],
  [dinefwr:S24])
- **The keep is about 13.6-14m across**, not Coflein's "some 12m"; medievalheritage's 13.5m is the nearest text. It stays
  contested in the app.
- **Today's standing heights are measured**: the keep's top storey to 113.6m OD and its wall-walk to 110.4m over a ward
  floor of about 99.8m; the curtains 5-7m above the ward inside and up to 15m above the slope outside. No source gives
  any medieval height.
- **The summerhouse on the keep was roofed by 1740 at the latest** (the Bucks' engraving), and two oil paintings show it
  with a conical roof and pennant, dated c. 1660-70 by Moore (1994) and c. 1710-30 by the National Trust. The HER's "late
  18th to early 19th century" for its building is contradicted; the roofs burned before 1804 (Malkin). The app shows the
  summerhouse from 1660 to today as one phase; the roofed stage ended about 1800.
- **The "1151 first record" is a manuscript variant**: the Rolls Series Brut has the brothers repair "the castle of
  Dinweileir", with Dinevwr only in manuscripts C and E, and it says repaired, not built. Kept contested.
- **No Tudor works can be placed**: the listing and medievalheritage date Sir Rhys ap Thomas's works to the end of the 15th century, the HER says only "in Tudor times" and that he "soon abandoned" the castle for Newton, and none gives 1525 (his death year in the DWB; an earlier draft of the note had put it in as the end of the residence); the abandonment is therefore c. 1500 within a range of c. 1485-1525, an inference, and medievalheritage's 1531 confiscation says who held the castle, not who lived there; the Cadw guide
  records repairs and a rebuilt south wall after the 1403 siege and then "no records of work ... for the remainder of the Middle
  Ages", and the DWB's gatehouse and windows by Sir Rhys are at Carew.
- **A Cadw-plan feature was missing, and the siege of 1213 was misread.** Cadw's 1280 phase plan draws the inner
  gate flanked by two hollow square towers inside the south curtain (gone by 1750, under the grand stair); the note now
  has them as `dinefwr/gatehouse-inner`, reconstructed (one source, hedged "perhaps" by medievalheritage), about 4.9-5.1m square each, placed by fitting that panel to the survey (about ±2m, on its own scale); Cadw draws a gap of 8-9 clear pixels between them, about 1.2-1.4m, and its other plan draws the inner gate as a break in the curtain of the same width, so both plans show a gate of about 1.4m (1.2-1.5m) and the model follows them (an earlier "departure" setting the towers 3.0m apart rested on reading one plan as a hairline and is withdrawn: [check 4](reviews/dinefwr-castle-check-4.md)). And in 1213 the Brut has the walls scaled and the castle taken "save one
  tower", whose garrison agreed before the afternoon to surrender, unless relieved by the next evening ("unless they should receive support by the evening of next day": a conditional surrender, with three hostages): it was not "held against engines and ladders", and "strong tower" is Cadw's gloss, not the Brut's.
- **Plan rows marked documented now say when they rest on Cadw alone** ("documented (one source: Cadw)"), because
  Coflein, castlewales.com and medievalheritage.eu are one source in three forms; and no source read says the outer
  bailey has any standing wall (medievalheritage: "without any significant visible stonework fragments"), so the ruin phase
  draws none.
- **The ten kits are all Roman evidence or analogy**: seven cite the Llandeilo fort survey (`fort:S1`), three only Jay Lane in Herefordshire (`fort:S16`), and two also Trawscoed and Llanio (a Wikipedia page, a lead, for the turf courses; the geophysical survey round both forts, which is the vicus evidence, for the thatch roof). An earlier line saying all ten cite `fort:S1` was wrong.
- **No source read names the stone, mortar, render or any roof covering.** The keep is "courses of flat stones" (Ray
  Caple, via Moore) on the Llandeilo Flags Formation (BGS); render is an analogy from Renn's Brecon keeps only.
- **What the app's model gets wrong today** (for the build, not changed here): the outline (`DINEFWR_INNER_CORNERS`, a
  2026-09-28 guess) against the measured one; the stone castle from 1220 against a keep of c. 1230-50; one summerhouse
  phase to today; a 12m keep; the plan drawn at 2.6 times, which the forts gave up for true size; and the ⓘ's "still a residence under Sir
  Rhys ap Thomas (d. 1525)", which states one side of a contested point (the Cadw guide has the site abandoned from the 15th
  century; the DWB's works by Sir Rhys are at Carew) as fact, together with a castle that runs to 1600 and a ruin from
  1600, where the note proposes a contested end in the 15th century and a decay phase to the 1660s.

## Carreg Cennen Castle for a Blender model (2026-10-17)

From [`carreg-cennen.md`](carreg-cennen.md), a draft, checked by the same agent the same day
([check 1](reviews/carreg-cennen-check-1.md)) and then independently ([check 2](reviews/carreg-cennen-check-2.md),
2026-10-17): its three important findings (the 1282 capture, the plan's "Uncertain" parts, the superseded figures in
`building-models.md`) and its cheap suggestions were verified and fixed; the fixes still want a reader who did not make them.

- **The Cadw plan fits the 2022 LiDAR to about 1.5m** at a rotation of 10.5 degrees from grid north and 9.22 pixels a
  metre, about 3-4% larger than its own metre bar says (Dinefwr's was about 5%). The outer ward, barbican and inner ward
  all land on the survey's walls and banks. ([cennen:S8], [cennen:S20])
- **Cadw's plan marks some parts "Uncertain" (an outline) and some masonry "Modern" (blue)**: the south-east outer-ward
  tower, the oven, the lime kiln and the building against the south curtain are outlines, so they are not drawn as
  documented medieval parts; a few stretches of the south curtain and east range are modern. (Check 2, read on the image.)
- **Coflein's reference lies on the inner ward floor**; the app's point is 14m off, on the east range. Use Coflein's.
- **Today's heights are measured**: ward floor 264.8-265.0m OD; gatehouse towers to about 11m above it (the highest
  masonry), the chapel tower 9.6m, the south curtain 7-7.4m inside and 10-15m above the cliff edge (the listing says it
  stands to full height), the north-west tower's rim about 5m; the rock-cut ditch bottoms about 7m below the ward. The
  precipice is 30-40m and the Afon Cennen about 132m below the ward; the texts' "100 feet", "300 feet", "85 meters" and
  "90m" are rough figures for different heights.
- **An independent 1858 account and plan, made before the Victorian restoration**, agrees with the fitted plan on the
  inner ward's clear size (87 by 80 feet) and dates every surviving detail to about 1300; but it also draws a round
  tower at the south-west corner, which the listing, Cadw's plan and the survey (no projecting tower) contradict. Kept
  contested.
- **How much is Welsh is contested**: Cadw says the Giffards' work of about 1287-1321 obliterated the earlier castle;
  Longueville Jones (1858), Morris (1901) and Lewis (2006, via Wikipedia) each allow some Welsh masonry. The Welsh castle
  had walls (repaired in 1277) and was lost in spring 1282; its form is unknown. **The date and the captor are
  contested**: Morris has Dafydd ap Gruffudd with the sons of Rhys Fychan capture it on 26 March (p. 154) and, on p. 165,
  have it "seized and destroyed, at least partially" "early in April"; Cadw's listing and schedule say Llywelyn ap
  Gruffudd's forces.
- **The building stone is not named by any source read**: "rubble stone with some ashlar dressings" on Dowlais
  Limestone (BGS); limestone rubble is an inference. No render or roof covering is recorded.
- **A 2m LiDAR area is proposed** (Coflein's point, half-size 500m, nine 2m tiles from SN6618, SN6619, SN6718, SN6719);
  it needs the LiDAR region widened to E 268000 and N 218000, which is a decision for the owner.
- **What the app gets wrong today** (not changed here): the outer ward's "half-timbered stables, a forge, stores" stated
  as fact where the sources say "probably"; one barbican-and-outer-ward phase from 1300 where Cadw has two periods; no
  burnt state for 1282-87; the plan at 2.6 times.

## Conversations by class (2026-09-28)

From [`conversations-by-class.md`](conversations-by-class.md), a draft. An independent verification
pass on 2026-09-28 confirmed most claims against their sources and corrected 13 (inexact quotes, an
overstatement, two misattributions, two unsupported "cross-checked" labels); the note stays a draft:

- **Carreg Cennen was in Welsh hands in June 1282**, taken on 26 March by Dafydd ap Gruffudd and the
  lords of Is Cennen. The English army occupied the ruins around mid-June and left about fifty foot
  and some workmen. The attested English garrison was at **Dinefwr**, about 35 lances of Somerset and
  Devon knights under Alan Plukenet after the battle. The army itself was mostly Welsh levies.
- **Giffard's grant of Carreg Cennen dates from 1283** (secondary sources; Morris has him in full
  possession in 1284). But he had held Llandovery since 1277, so English-held land nearby did exist
  in June 1282 (corrected by the verification pass). Newton, the English borough beside Dinefwr, is
  first mentioned in 1297.
- **The primary annal gives 16 June 1282** ("XVI Kalendas Julii"); Morris's 17 June looks like a
  counting slip. Since 2026-10-02 the app says "16 June 1282 by the Welsh annals (some histories say
  17 June)".
- **Talley's first canons came from St-Jean, Amiens.** Gerald of Wales mentions its "canons and
  brothers" and servants, writing after 1200 (corrected from "c. 1193–1205"); nothing says where the
  brothers came from or what they spoke.
- **Real 1282 grievances from this valley survive** in Archbishop Peckham's register: English soldiers
  stabling horses in Llangadog church, the burning of Llandingad and Llanwrda churches, and Welsh
  lords denied Welsh law. They are the best grounding yet for what people here were angry about.
- **The Roman forts report was read**: Fort 1 is 3.85ha, probably soon after AD 74; the unit is unknown.
- Attested lines to quote now exist for every key date except the Iron Age, and Carmarthenshire
  dialect features are sourced, from 20th-century recordings only.

## Corrections the review forced

See [`open-questions.md`](open-questions.md) for the full list. The most important:

- Pollen-zone dates in the deep-time note are **uncalibrated**; the Younger Dryas is c. 10,900–9,700 BC
  in calendar years, not 8,800–8,300 BC.
- 12,500 BC is the Late Upper Palaeolithic, not the Mesolithic.
- 12,500 BC also falls inside the **Late Glacial (Bølling–Allerød) interstadial**, a milder spell
  of c. 14,690–12,890 BP, about 12,700–10,900 BC (now deep-time S48). At Llanilid in south Wales its
  early part was the warmest, July about 20°C with juniper scrub, before cooling steps from about
  11,150 BC (Walker et al. 2003, deep-time S47). On 2026-10-02 the 12,500 BC environment keyframe was
  moved off the old uncalibrated "coldest tundra" reading to match, and the climate keys made milder
  at 12,500 BC and colder by 11,000 BC. (A review of 2026-09-28 first caught the coldest-point error in
  the climate keys.)
- St Teilo's west tower is contested: 15th century (Cadw listing, models:S29; Coflein, models:S28) or about 1600 (Coflein, the same record); the app draws it from c. 1600, with the text giving both. *Corrected 2026-10-02*: this line said it dates from about 1600,
  as if settled.
- Longhouse evidence is later and from mid Wales; the medieval ones in the app are marked imagined.
- **The app rang church bells no source records** (corrected 2026-10-03). The environment keys gave
  bells at AD 800, 1250, 1600 and 1850, but the first bells heard at Llandeilo in any source read are
  the peal for the first train on 20 January 1857 (effects:S7, which does not say whose bells), and no
  medieval bell is recorded for St Teilo's or Talley ([event-effects](event-effects.md),
  [soundscapes](soundscapes.md)). The same pass found a train bed on the 1850 key and a market at
  1250, before the fair said to date from 1291. All three are gone. *Corrected again 2026-10-03 (the
  second-Opus review)*: the first fix still let every bed fade in from silence across the gap before
  the key that names it, so bells and the train were heard from 1851 and labelled documented, the
  market from about 1276, chant from the 2nd century and motor traffic from the 1850s. Sound now has
  its own dated tracks and never fades in from silence, so no bed is heard before the date of the
  point that names it; and the Tywi, drovers and Ffairfach smithy beds, which rested only on
  encyclopedia pages, are reconstructed, not documented
  ([ADR 0028](../adr/0028-ambient-beds-carry-provenance.md)).
- The Llandeilo gas works were **being built in 1864**, not c. 1860: two 1864 newspapers against one
  Wikipedia page ([light-after-dark](light-after-dark.md), 2026-10-03). The same research dates gas
  street lamps to no later than 1876 (the first lighting is not found; that bound is single-source),
  electric street light to September 1902, and the national blackout to 1 September 1939 (IWM and a
  home-front history site); the app's night light now follows these keys, each with how sure its
  date is, and draws street lamps only in the town north of the Tywi ([ADR 0030](../adr/0030-night-light-as-dated-content-keys.md)).
- **The light research's independent check (2026-10-03)** confirmed the newspaper core (31 of 46
  claims confirmed, 13 partly, 2 contradicted) and corrected the app: the gas works were *begun* in
  1864 (completion not found); the dim-out began on **17 September 1944** (Hansard written answer)
  and let homes use ordinary curtains, so "blackout curtains stayed" was wrong; "by 8 May 1945 the
  blackout was over everywhere" was wrong too (most restrictions had gone by 2 May; some coastal areas
  kept them into peacetime); the Deheubarth law-book's manuscripts are not dated by any source read,
  so the court's candle-bearer is now "in the Middle Ages", not "by about 1200"; and Gilbert White's
  "go to bed by daylight" is for the long summer days only. Before 7800 BC the app now says nothing
  of how the night was lit ([ADR 0032](../adr/0032-night-light-before-the-first-key-and-period-dates.md)).
  New finds: from October 1902 the town lamps were lit from half an hour after sunset till 11 o'clock
  all year, 16 new lamp posts were ordered in April 1902, and one corner (Trallwm to Station Road) was
  unlit in December 1902 ([light-after-dark](light-after-dark.md)).
- **The music and hunter-gatherer independent checks (2026-10-09)** ([music](reviews/music-through-time-check-2026-10-09.md),
  [hunters](reviews/hunter-gatherers-check-2026-10-09.md)). Music, 91 claims: 69 confirmed, 15 partly, 3 not
  supported, 4 contradicted. The household bard, not the chief of song, sings to the queen (Dimetian Code);
  ballad singers at fairs are 18th-century, not Tudor; Llandilo's choral society (1856), brass band (1865)
  and volunteer band (1881) are far earlier than the "1890s to 1910s" the first search listed; Carmarthen's
  National Eisteddfod was 1911, not 1914; the Talley Marian anthem, the "blind harper at an inn" and
  Lewys Glyn Cothi "at Pumsaint" had no source behind them. S3's preface does date the Dimetian Code's base
  manuscript (to the close of the 13th or early 14th century), which corrects the lamplight basis and
  the 2026-10-03 light check's own correction. Two recordings (Handel 1953, Thomas L. Thomas 1944) are public
  domain only outside the US; no music ships yet. Hunter-gatherers, 70 claims: 47 confirmed, 20 partly, 2 not
  supported, 1 contradicted, and every IntCal20 calibration reproduced. Ogof Garreg Hir is on the
  Castlemartin Cliffs, not Caldey, and its bones are undated; the Poulton elk's "17 lesions" and "late
  winter" are the superseded reading (the 2013 reanalysis: hunted unsuccessfully, many lesions excavation
  damage); the Younger Dryas shows "no dated people", not "no people"; the Carreg Cennen cave's bones and tooth
  are queried in the HER ("Inhumation?", "Ornament?"). The app's Waun Fignen Felen burning moves from 6000 BC
  to about 7000 BC ("about 9,000 years ago"), with an ⓘ saying the date is our IntCal20 calibration of "ca.
  8000 years BP", which we assume (no source says) is in radiocarbon years; the almanac fire runs about 7000
  to 4500 BC. Both notes stay drafts.
  *Review of those corrections, 2026-10-09*: the US term for a 1944 recording is 100 years, to the end of
  2044 (Music Modernization Act; secondary sources), not 95 years to 2039; the burning event cites one
  Coflein key, not two; and the sibling notes `soundscapes.md` and `deep-time-and-natural-history.md` now
  carry the c. 7000 BC date and point at the hunters note.
- **How Llandeilo's homes were lit in 1902 is not recorded**, but by October 1902 "so many of the
  tradespeople of the town are having the light installed" (Carmarthen Journal, 10 October 1902,
  light:S31, re-read 2026-10-03), and the council sold electricity by the meter. The app draws homes
  with flame light at the 1902 key and says that is a guess. *Corrected 2026-10-03*: this file said
  the independent check found "no source puts electric light in a Llandeilo home in 1902"; the check
  rated the old "mixed" claim "partly" and asked for no change. The change came from the second-Opus
  review, and a first rewording ("homes kept to gas, oil and candles") went past the sources too.
- **The dim-out of 17 September 1944 left out listed areas**, mostly coastal (Hansard written answer,
  28 September 1944; a Scarborough history). No source read names them, so whether inland Llandeilo
  was one is not known; the app says so.
- **The soundscapes check (2026-10-03)** found no licence problems (all 92 recordings as stated) but
  claims that went further than their sources: the 1857 engines are not recorded (only "two engines"),
  the meltwater river and the first farmers' species are assumptions, and the golden eagle bones are
  older than the Late Ice Age. A fair at Llandeilo is now documented from 1290-91 and a Saturday
  market by 1326 (the *Gazetteer of Markets and Fairs to 1516*); when the market bed should start is
  left for Dewi ([soundscapes](soundscapes.md)). *2026-10-03*: Dewi decided it starts in the Middle
  Ages, so it now starts with the fair granted on 20 May 1290; the same gazetteer also calls Llandeilo a
  "Market town c. 1600", citing Everitt, which now carries the 1600 point.
- **Steam passenger trains ended on 13 June 1964** (railway-later), so the steam sound now ends then,
  and a reconstructed diesel-unit sound runs to today. **The Vale of Towy line north-east of the
  station opened on 1 April 1858** (era-victorian), so it is drawn from then, not from 1857
  ([ADR 0033](../adr/0033-railway-drawn-in-dated-sections.md); *corrected 2026-10-03*: until
  [ADR 0034](../adr/0034-exact-dates-draw-nothing-outside-them.md) it was still drawn from about 1849.7,
  because every feature faded in before its date). The drawn train is now a steam placeholder until
  13 June 1964 and a diesel unit after it, so picture and sound agree.
- **Track south of Llandeilo is older than 1857.** The Llanelly Railway ran from Pontarddulais to
  Cwmamman (Garnant) from 10 April 1840 and on to Gwaun-cae-Gurwen from 6 May 1841; Duffryn, today's
  Ammanford station, was its terminus towards Llandeilo until the line was extended north in January
  1857 (victorian:S29, S70). Whether Duffryn opened in 1840 or May 1841 is contested (S29 against
  S70, S71). The app draws Duffryn to Llandeilo from 1857 (exact), the older lines from April 1840
  (reconstructed), and the undated short lines near Pontyberem and Cross Hands not at all
  ([ADR 0034](../adr/0034-exact-dates-draw-nothing-outside-them.md)). *Corrected 2026-10-03 (third
  review)*: the 1840 lines were still drawn from about 1831, because only documented features could
  carry exact dates and the rest faded in over the years before them; they now carry exact dates as
  reconstructed features ([ADR 0035](../adr/0035-exact-dates-are-about-dates-not-clues.md)), so
  nothing of them is drawn before 10 April 1840. And they stop at Garnant: **east of Garnant today's
  track is the Great Western's line of 4 November 1907**, built to avoid the 1841 line's incline (1 in
  4.9) on a different course (victorian:S29, and a 1957 *Railway Magazine* article, victorian:S74). It
  is drawn from November 1907, with no track east of Garnant from 1840 to 1907. Coflein's "Ammanford
  Railway Station" (victorian:S73) is the branch's Cross Inn station of 10 April 1840. *Corrected
  2026-10-03 (fourth review)*: this said "from 1841 to 1907", but the first half mile east of Garnant,
  to Cwmamman, opened on 10 April 1840. The 1907 section also drew the colliery track past
  Gwaun-cae-Gurwen's level crossing, which no source dates; it now ends where the 1907 line joined the
  old course, placed 1 mile 22 chains (S74's length) along today's track from Garnant, and the track
  beyond is not drawn. Pantyffynnon to Duffryn stays exact from April 1840, though contested, because
  its ⓘ names both dates ([ADR 0035](../adr/0035-exact-dates-are-about-dates-not-clues.md)). The
  opening days are now placed exactly (`onDay`), so 10 April 1840 and 4 November 1907 are no longer a
  day or two early, nor 1 April 1858 a day late. **S74 and S29 disagree** on when the old line was cut
  back to become the Cawdor branch (1907 against 1933), when the 1926 railmotor service ended (June
  against 1 or 4 May) and how many halts it had, and S29 cites S74 for the dates they share, so those
  are not two independent sources (victorian:S74's annotation).
- **The undated western lines are identified, and drawn as educated guesses** (2026-10-03, by Dewi's
  decision; the dates are Claude's). The line near Pontyberem is the Burry Port and Gwendraeth Valley
  Railway's top end, to a goods yard at Rhyd-y-cerig below Cwm-mawr (the six-inch map of 1905,
  victorian:S82). Its sources disagree on the date: 1869 or 1870 (histories via Wikipedia, S77) against
  June 1886 (the same page, a canal history, S90, and Coflein, S78). A tramroad was on the towpath above
  the Hirwaun Isaf incline by 1865 (S77), and the **25-inch map surveyed in 1878–79 (S81) draws the
  railway from about the incline's head**, but not below it. So 1886 is read as the line past the
  incline, drawn across June 1886, and the rest from c. 1870, never before the opening of 23 June 1869.
  Its last coal train ran on 29 March 1996 (S77, S88). The track past the 1907 line's join at
  Gwaun-cae-Gurwen is a colliery line: the six-inch map surveyed in **1877 draws a Great Western branch
  along it to Gwaun-cae-Gurwen Pit** (S83), the 1896 map runs it on to the Old Pit (S84), sunk about
  1837 (S85, S86, S87, which disagree on who sank it), so it is drawn from 6 May 1841, when the railway
  reached Gwaun-cae-Gurwen, as the probable course of the 1841 line. The "Cross Hands" stub is 35m of
  narrow-gauge track (Ordnance Survey's own classing, S89) in farmland at Upper Tumble, not the
  standard-gauge Mountain branch; no source names it, and the six-inch maps of 1905 and of 1913 with
  additions in 1948 show no track there (S91, S92), so it is drawn `imagined` from c. 1950. Historic maps
  were read through the National Library of Scotland's georeferenced mosaic and IIIF images, a method
  worth reusing for any "when was this track laid?" question. *Corrected 2026-10-03 (review of the
  estimates)*: this entry said the 1878–79 map draws the railway along the whole stretch, which it
  does not, and left the stub undrawn.

- **The motto** on the Begin card, *omnia mutantur, nihil interit*, is Ovid, *Metamorphoses* XV,
  in Pythagoras's speech. Checked 2026-10-03 in two online texts, both of which number it line 165:
  The Latin Library (https://www.thelatinlibrary.com/ovid/ovid.met15.shtml) and Latin Wikisource
  (https://la.wikisource.org/wiki/Metamorphoses_(Ovidius)/Liber_XV). Both are transcriptions of
  unnamed editions, not a critical edition. The card names only the book, so a numbering difference
  between editions cannot make it wrong. *Corrected 2026-10-03*: the first build-log entry said the
  Latin Library numbers it 164; it numbers it 165. The English ("everything changes, nothing
  perishes") is the project's own rendering, and the Welsh ("Mae popeth yn newid, does dim byd yn
  darfod", and "Ofydd" for Ovid) is Claude's, awaiting the parked human Welsh check.

- **The Roman fort's garrison is an estimate, not a count** (corrected 2026-10-03, second-Opus review
  of the cutscene branch). The Roman forts' summary and the first cutscene said the fort "held more
  than a thousand" men. Coflein (roman:S2) says it "would have housed a garrison of more than a
  thousand, drawn from several different units"; the excavator (roman:S1) says its size suggests "at
  the very least an *ala quingenaria* ... or a *cohors milliaria*", a lower minimum. Both now say it was
  big enough for perhaps a thousand men or more, with both sources in the ⓘ.

- **Jay Lane (fort:S16) does not describe a boarded stage or an open frame under the towers** (corrected
  2026-10-10, second-Opus review of the Blender models). The first Blender build's tower kits said "the
  boarded stage and the open frame follow timber towers on posts at Jay Lane", and gave a 0.3m post size to
  the interval towers on the same footing. The page, read again directly, gives post layouts (gatehouses on
  two rows of five posts with a tower at each end, a corner tower "assumed" to be six-post, four-post interval towers), plan sizes and "the same scantling"
  for the interval towers' posts, and says nothing about platforms, stages, boarding or roofs; for the
  gatehouses it says "a tower 9.5ft square overall would have provided a guard-room at ground level",
  which points the other way. The kits now credit S16 only with the layouts and sizes; the stage, the boards
  and a walled ground storey are a separate imagined kit (`tower-boarding`), and the interval tower's posts
  are drawn at the same 0.4m as the gate posts, an analogy the ⓘ says so about.

- **Jay Lane (fort:S16) contradicts itself on its turf** (found 2026-10-10, second-Opus re-review of the Blender
  models; the page was re-read directly). Its opening summary says "Excavations revealed earth ramparts revetted
  with turf", but its excavation section says "No trace of a rampart bank was found, nor were there any postholes
  for a timber-framed rampart or palisade" and that the rampart "must have been provided with a turf revetment",
  a suggestion backed by the character of the ditch filling. So the revetment is a suggestion, and the turf-courses
  kit no longer says it is "recorded". Dinefwr's own turf rampart is a separate inference, from the clay fill of
  Fort 1's inner ditch (fort:S1), and the kit cites S1 for it. The page also gives the corner tower as
  "assumed" to have had six posts (four found), and no height or roof for any tower; the gate and interval
  towers' ⓘ now credit it with post layout and plan size only.

## Decisions the research drove

| Decision | Based on |
|---|---|
| The 1282 scene shows villagers hearing news, not a staged battle with named Welsh leaders | No source read so far names the leader |
| Brittonic is voiced as modern Welsh and labelled so | No connected Brittonic sentence reconstruction was found; only fragments and place-name elements |
| Latin read in Church style, with an ⓘ on Roman lines | No Latin TTS voice; Church style fits medieval clergy ([voices](../content/voices.md)) |
| Garn Goch's interior is marked reconstructed; farmsteads imagined | No excavation recorded |
| Forest cover per era follows the pollen zones, blended to today's OS woodland from the 1850s | No local Tywi pollen core |
| Towns use today's OS building footprints nearest the church; the Victorian town is sized to the documented 1858 count, the Georgian town is a guess below it | 1858 count documented; which buildings stood is not |

## Gaps worth a second pass

The one list is [`open-questions.md`](open-questions.md).
