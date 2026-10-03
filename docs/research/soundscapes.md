---
title: Soundscapes - what the valley sounded like, era by era, and where to get the sounds
kind: research
status: draft
updated: 2026-10-03
---

# Soundscapes: what the valley sounded like, and how to get the sounds

Research for the agreed immersive-sound work ("each point in time sounds ... a really immersive
experience"; [`docs/design/sound-and-assets.md`](../design/sound-and-assets.md)). For each era on the
slider (`src/content/timeline.ts`) and each setting: what made sound here, how strong the evidence is,
real recordings we may legally use, what to synthesise instead, and what to place on the map. Written
2026-10-02 from sources fetched that day. The brief is in [`briefs/soundscapes.md`](briefs/soundscapes.md).

Independently checked 2026-10-03 (see [reviews/soundscapes-check-2026-10-03.md](reviews/soundscapes-check-2026-10-03.md)); corrections applied.

**Tiers.** *Documented*: a source read here records the sound or its source (the animal, the
instrument, the work) for this place or, where marked, for Wales or the region. *Reconstructed*:
inferred from habitat, archaeology or analogy (say what from). *Unknown*: nothing read settles it.
Sound itself almost never survives, so "documented" here nearly always means the *source* of the
sound is documented and the sound is what that thing sounds like.

**Licences.** Since [ADR 0026](../adr/0026-open-licences-including-nc.md) (2026-10-02) any open
licence is allowed: CC0, CC BY, CC BY-SA, CC BY-NC, CC BY-NC-SA, public domain and OGL. Nothing "all
rights reserved". This note also leaves out **ND** (no-derivatives) licences, because trimming,
looping and filtering a recording is an adaptation; that is a judgement for Dewi to confirm.

Citations of the form [deeptime:S12] point into the other research notes; bare [S1] points into this
note's own list. Recording links are in the tables, not the Sources list.

## Summary

- **Hardly any sound is recorded for this place before the railway.** The documented local sounds
  are event sounds already in [`event-effects.md`](event-effects.md): the night attack on the Walk
  Gate (1843), the church reopening services (1850), and the cannon, "merry pealing of bells" and
  bands for the first train (20 January 1857) [effects:S8][effects:S10][effects:S7]. The 1857 peal is
  still the first bell heard at Llandeilo in any source read.
- **Gerald of Wales (1188) is the best early source for the whole of Wales**: everyday part-singing
  ("you will hear as many different parts and voices as there are performers"), the harp in every
  house, "the harp, the pipe, and the crwth", ox-ploughing with "four oxen" and a driver walking
  backwards, an alarm trumpet calling the farmer from his plough, coracles, reverence for portable
  bells, and beavers only on the Teifi [S2][S3]. He passed through Carmarthen and names Dinefwr [S2].
- **Dafydd ap Gwilym (fl. 1320 to 1370, from Ceredigion) is the best source for what a 14th-century
  Welshman heard**: the owl's "'hoo-di-hoo'" all night that "incites the dogs of the night"; the
  skylark; the cuckoo as the thicket's "sacring-bell"; the cock-thrush; a shepherd's rattle-bag of
  stones; a weight-driven clock with "its hammer"; a mill "grinding by night" [S4][S5][S6][S7][S8][S9].
  Regional, not local.
- **Wildlife is the richest layer and the best sourced.** Pritchard (2020) gathers Welsh bird
  records from bones, poems and place-names: cranes were common (46% of the bird footprints at
  Goldcliff, c. 5000 BC) and are found into the Norman period; white-tailed eagles were probably as
  common as golden eagles; bittern and crane were the falconer's "notable birds"; black grouse is
  described in a 14th-century poem; there is no proof capercaillie ever bred; the nightingale may
  never have been common [S1]. Almost nothing in it is from inside the 10 miles.
- **The best single source of licensed wildlife sound is the British Library set on Wikimedia
  Commons** (202 files: 105 CC BY 4.0, 97 CC BY-SA 4.0, each with a stated site, many by Lawrence
  Shove) [S13]. It has most of the valley's likely birds and mammals, some recorded in Wales.
- **Freesound covers weather, farm, craft, bells and trains well**, including a GWR 57xx pannier
  tank, the class that worked Llandeilo's local trains in 1958 to 1960: the photographs give engine
  numbers [railwaylater:S2][railwaylater:S3], and the class follows from the number series
  [railwaylater:S49] (9788 at Llanelly shed [railwaylater:S5]) (*Corrected 2026-10-03 (independent check)*: the class was cited to S2
  and S3, which give only numbers).
  Nothing on Freesound is tagged Llandeilo, Carmarthenshire, Towy or Brecon Beacons (searched
  2026-10-02) [S15].
- **No recording exists of anything like the 1857 engines.** The company's early engines were
  Hackworth six-coupled engines [railway:S1][railway:S2]; which two engines drew the first train is not
  recorded, and two new engines of 1857 are unnamed (*Corrected 2026-10-03 (independent check)*: the note implied the engines'
  type was recorded). It should be synthesised, or a later engine used and labelled.
- **xeno-canto could not be read** by any automated route, and by its own description offers only
  BY-NC-ND, BY-NC-SA and BY-SA [S11]. **BBC Sound Effects is excluded**: a bespoke RemArc licence that
  forbids re-uploading and lets the BBC withdraw content at any time [S12].

## How the search ran

Four WebSearch calls were used. Freesound was searched with `curl` through its public search pages,
filtered by licence (CC0, then Attribution, then Attribution NonCommercial), and each candidate's
own page read for title, licence, duration and description, so the licence in the tables is the one
the page shows. A search page of about 31 KB is Freesound's genuine "No results" page, checked
by reading it. Wikimedia Commons was read through the MediaWiki API (licence from each file's
`LicenseShortName`, recordist from its "Audio files by" category); it rate-limits bursts, so some
searches were repeated. xeno-canto returned a proof-of-work bot check to `curl`, WebFetch and headless
Chromium alike, and its API v2 now answers "no longer available" [S16]. Dove's Guide returned HTTP 429
on every attempt [S18].

## Sound layers that run through every era

| Layer | What it is | Tier | Sources |
|---|---|---|---|
| The Tywi | A large river on a wide floodplain, with salmon and sewin runs and otters today | Documented (river, fish, otter today) | [deeptime:S40] |
| Weather | Wind, rain, thunder; colder, snowier phases in the Late Ice Age, Younger Dryas and Little Ice Age | Documented (climate phases); reconstructed (any given day) | [deeptime:S8][deeptime:S16] |
| Height | Wind and open-country birds on Mynydd Du, Garn Goch and the ridges; woodland and river birds in the valley | Reconstructed (habitat) | [S1] |
| Fire | Hearths in every dwelling; heath burning by Mesolithic hunters at Waun Fignen Felen | Documented (burning) | [deeptime:S12] |

## Late Ice Age (12,500 to 9,501 BC)

Open, cold country: tundra and moor, little tree cover, meltwater rivers. The deep-time note has the
milder interstadial, then the Younger Dryas cold snap [deeptime:S8][deeptime:S10]. Whether people
were in the 10 miles is not settled (see the timeline note).

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Strong wind, little else; snow in the cold phases | Open country, uplands | Reconstructed (climate) | [deeptime:S8] |
| A loud, braided meltwater river | River | Reconstructed | [deeptime:S8] |
| Reindeer (extinct in Britain c. 9000 BC) | Open country | Reconstructed (Britain-wide) | [deeptime:S31] |
| Black grouse (bones, Little Hoyle, Pembrokeshire, late Devensian or early Mesolithic) | Moor | Documented (Wales, not local) | [S1] |
| Golden eagle (bones at Cathole, Gower, and Coygan Cave, Carmarthenshire): Cathole dated to about 20,000 years ago, before this period; Coygan undated (*Corrected 2026-10-03 (independent check)*) | Crags | Documented (region) | [S1] |
| Chough (Late Glacial bones, Paviland and Cat's Hole) | Crags, caves | Documented (Gower) | [S1] |
| Bewick's swan (Devensian, not dated more closely, Cat's Hole). Geese at Little Hoyle are about 22,800 years ago, earlier than this period, so they are dropped here (*Corrected 2026-10-03 (independent check)*) | Wetland | Documented (Gower) | [S1] |
| Ptarmigan, snowy owl | Uplands | Unknown: recorded near Wales, not in it | [S1] |
| Wolf howl | Anywhere | Reconstructed (Britain-wide presence) | [deeptime:S31] |

## Middle Stone Age (9,500 to 4,001 BC)

Birch and pine, then hazel, then closed oak wildwood [deeptime:S10]. Hunter-gatherers burned heath and
birch at Waun Fignen Felen from about 8000 years ago [deeptime:S12].

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Birds much like today's: Port Eynon's 43 species were mostly ones "a birdwatcher might expect to see on the Gower today"; Port Eynon is a coastal cave and its list includes great bustard (*Corrected 2026-10-03 (independent check)*: was "Woodland song birds") | Woodland | Reconstructed (from Gower bones) | [S1] |
| Cranes calling, common: 46% of bird footprints at Goldcliff, c. 7000 years ago | Wetland, floodplain | Documented (Wales, Severn estuary) | [S1] |
| White stork (footprints, Goldcliff); white-tailed eagle (Port Eynon, Little Hoyle); great bustard (Port Eynon) | Wetland, river, open ground | Documented (Wales, not local) | [S1] |
| Red deer, wild boar, aurochs, elk (to c. 3600 BC), brown bear, wolf, beaver | Woodland, river | Reconstructed (Britain-wide dates) | [deeptime:S31][deeptime:S34] |
| Crackle and roar of heath burning | Upland at Waun Fignen Felen | Documented (the burning) | [deeptime:S12] |
| Flint knapping, voices | Camps | Reconstructed; only where the timeline note places people | |

## New Stone Age (4,000 to 2,301 BC)

The first farmers: cattle, sheep and pigs arrive in Britain by boat around 4000 BC [deeptime:S33];
clearance and the elm decline [deeptime:S11].

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Cattle, sheep, pigs; dogs | Clearings, farmsteads | Reconstructed (Britain-wide) | [deeptime:S33] |
| Stone axe on timber, clearance fires | Woodland edge | Reconstructed | [deeptime:S11] |
| The wildwood birds and mammals above, thinning | Woodland | Reconstructed | [S1] |

## Bronze Age (2,300 to 801 BC)

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Crane (bones, Caldicot, Gwent) | Wetland | Documented (Wales) | [S1] |
| Black stork (butchered bone about 2,945 years ago, roughly 1000 to 900 BC, Denbighshire; *Corrected 2026-10-03 (independent check)*: was "c. 945 BC") | Wetland | Documented (Wales, rare) | [S1] |
| Aurochs gone by c. 1000 BC | | Reconstructed (Britain-wide) | [deeptime:S31][deeptime:S32] |
| Horses | | Unknown: when horses were adopted is an open question in the deep-time note | |

## Iron Age (800 BC to AD 73)

Hillforts and farmsteads (Garn Goch and others in the Iron Age note). Its sound section is
reconstruction by analogy, which this note keeps [ironage:S49].

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Cattle, sheep, dogs, a full farmyard | Farmstead, hillfort | Reconstructed | [ironage:S49] |
| Grinding grain: saddle querns, then rotary querns from c. 400 BC | Farmstead | Documented (Britain-wide); reconstructed (here) | [ironage:S55] |
| Smithing, weaving comb against a loom, thatching | Farmstead | Reconstructed | [ironage:S49] |
| Streams below the forts | River | Documented (the streams) | [ironage:S49] |
| Woodland and open-country birds, cranes, wolves | Everywhere | Reconstructed | [S1][deeptime:S31] |

## Roman Wales (AD 74 to 409)

Two superimposed forts at Dinefwr, garrisoned in the late first century [timeline:S15][timeline:S8].

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| A garrison: drill, smithing, carts, voices in Latin | The forts | Reconstructed; no sound of these forts is recorded (event-effects note, `roman-forts`) | [timeline:S15] |
| Cranes and white-tailed eagles: bones at Caerleon; a crane skull opened "a method mentioned in Roman cookery manuals" | Wetland, river | Documented (Wales, not local) | [S1] |
| Farms, cattle, sheep as before | Farmstead | Reconstructed | |

## Early Middle Ages (410 to 1092)

The clas of St Teilo at Llandeilo (timeline note). Brown bear gone from Britain c. 500, lynx c. 700
(Britain-wide) [deeptime:S31].

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| A small iron handbell: Welsh clergy and laity revered "portable bells" (Gerald, 1188); Teilo's own bell is a 12th-century legend | Church | Documented (Wales, later); legend for Teilo | [S2][effects:S18] |
| Chant | Church | Reconstructed | |
| Ravens and eagles over battlefields: the earliest bird references in Welsh poetry; *Canu Heledd* (c. 800 to 900) | Battle | Documented (literature, Powys) | [S1] |
| Wolves | Woodland, upland | Documented (Wales: last written mention 1166) | [deeptime:S42] |
| Cattle as wealth, sheep | Farmstead | Reconstructed | |

## Middle Ages (1093 to 1484)

Dinefwr and Dryslwyn castles, Talley Abbey (from the 1180s), St Teilo's church and the borough,
a fair granted by Edward I to the Bishop of St Davids in 1290 and 1291 (*Corrected 2026-10-03 (independent check)*: was "St Teilo's
Fair (authorised 1291)").

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Part-singing, in many parts, "the children, even from their infancy" | Hall, house, church | Documented (Wales, 1188) | [S3] |
| Harp in every house; harp, pipe and crwth; court music at Dinefwr | Hall, castle | Documented (Wales, 1188); reconstructed (Dinefwr) | [S3][medieval:S44] |
| Ox-plough teams of four, the driver walking backwards; ploughing in March and April for oats, in summer, and in winter for wheat | Fields | Documented (Wales, 1188) | [S3] |
| Herds, "oats, milk, cheese, and butter": cattle and dairy everywhere | Farmstead | Documented (Wales, 1188) | [S3] |
| An alarm trumpet; the farmer "rushes ... from his plough" | Anywhere, wartime | Documented (Wales, 1188) | [S3] |
| Coracles carried to and from the rivers | River | Documented (Wales, 1188) | [S3] |
| A minstrel and a singer "on the fiddle" going before a lord (Coed Grono, near Abergavenny; an earlier incident Gerald retells) | Road | Documented (Wales, single instance) | [S2] |
| Tawny owl all night, "'hoo-di-hoo'", setting off "the dogs of the night"; "it doesn't shift its head from a big hollow tree" by day | Woodland, farmstead at night | Documented (14th-century poem, Ceredigion); species inferred as tawny owl from the call (*Corrected 2026-10-03 (independent check)*) | [S4] |
| Skylark in April; cock-thrush in May; cuckoo, "sacring-bell of the sturdy thicket" | Fields, woods | Documented (14th-century poems) | [S5][S9][S8] |
| A shepherd's rattle-bag of stones, "a bell's sound of small stones and gravel" | Pasture | Documented (14th-century poem) | [S6] |
| A weight-driven clock, "its two ropes and its wheel, and its weights ... and its hammer" | Town house | Documented (14th-century poem) (*Corrected 2026-10-03 (independent check)*: "a town" dropped) | [S7] |
| A mill "grinding by night in a monastery cloister" (simile) | Mill, abbey | Documented (14th-century poem) | [S7] |
| Plainchant at Talley; no bell is recorded there | Abbey | Reconstructed (event-effects note, `talley`) | [medieval:S17] |
| Bells at St Teilo's | Church | Unknown (no medieval bell is recorded; event-effects note) | [S18] |
| Falconry quarry: crane and bittern among the "three notable birds"; peregrine, goshawk | Wetland, open country | Documented (Welsh law texts, poetry) | [S1] |
| Red kite as a scavenger; buzzard "presumably fairly common" | Sky | Documented (poetry); reconstructed (buzzard) | [S1] |
| Black grouse, described in *Y Ceiliog Du* | Moor | Documented (14th-century poem, place not given) | [S1] |
| Beavers on the Teifi only, so none on the Tywi by 1188 | River | Documented (Gerald) | [S2] |
| Nightingale: Gerald's party were told it "did not visit Wales" (1188); Dafydd describes one singing | Woodland | Contested | [S1][S2] |
| Wolves dying out (probably 13th or 14th century); wild boar to c. 1400 (Britain) | Woodland | Documented (Wales, single-source); reconstructed | [deeptime:S42][deeptime:S31] |
| Siege of Dryslwyn, 1287: siege engine, mining, the wall's collapse | Castle | Documented (see the event-effects note) | [medieval:S23] |
| Castle building: masonry, lime kilns, timber | Castle | Documented (the work); reconstructed (sound) | [medieval:S23] |
| A fair granted by Edward I to the Bishop of St Davids on 20 May 1290 and again on 20 September 1291, held on the vigil, feast and three days after St Barnabas (11 June); a Saturday market by 1326; Llandeilo a borough by 1326 with fourteen burgesses. Whether this is the later "St Teilo's Fair" in the churchyard is not known (*Corrected 2026-10-03 (independent check)*: was "St Teilo's Fair in the churchyard ... charter of 1291", with no source key) | Town | Documented | [S20] |

## Tudors and Stuarts (1485 to 1713)

Little was researched for this period in any note. The church tower is 15th century or c. 1600,
contested [medieval:S57].

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Corncrake common and widespread in Pembrokeshire, in the county avifauna's words, citing George Owen, 1603 (*Corrected 2026-10-03 (independent check)*: the quote marks were not Owen's) | Hay meadows | Documented (neighbouring county) | [S10] |
| Beavers gone from Britain (16th century) | River | Documented (Britain) | [deeptime:S34] |
| Cranes bred in medieval Britain; an Act of 1533 protected their eggs. Not dated here (*Corrected 2026-10-03 (independent check)*: was "gone as British breeders by the mid 16th century", which S19 does not say) | Wetland | Unknown here: a lead only | [S19] |
| Church bells | Church | Unknown (first ringing recorded is 1857) | [effects:S7] |
| Fairs, markets, farms as before | Town, farm | Reconstructed | |

## Georgian (1714 to 1836)

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Drovers' herds of "three or four hundred animals", with dogs, up the Tywi to Llandovery and England | Road | Documented (region; the Tywi route single-source) | [victorian:S37][victorian:S50] |
| Fallow deer in Dinefwr park (landscaped from 1775), the buck's autumn groan; White Park cattle | Deer park | Documented (park); reconstructed (sound) | [deeptime:S37] |
| Ffairfach: a corn mill, the Torbay Inn "which doubled as a blacksmith's", fairs on 5 May and a cattle fair on 22 November (early 1800s) | Village | Documented, single-source | [victorian:S2] |
| Market in the Shire Hall's open ground floor (built 1802) | Town | Documented | [victorian:S41] |
| Coaches and carts on the mail road; toll gates | Road | Documented (the mail road, the gates) | [victorian:S6][victorian:S7] |
| Chapel congregations from 1808 (Soar); hymns not recorded | Chapel | Documented (chapels); reconstructed (singing) | [timeline:S20] |
| Farmland birds: rooks and crows at their rookeries, lapwing and curlew on wet pasture | Farmland, floodplain | Reconstructed (habitat; no local record read) | |

## Victorian (1837 to 1901)

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| Walk Gate attack, August 1843: about 60 disguised men at night, axes and bars, over in about 20 minutes; dragoons ride out too late | Road, night | Documented | [effects:S8] |
| Lime carts through three toll bars to the kilns six miles off | Road | Documented | [victorian:S7] |
| Church reopening, Thursday 10 October 1850: shops shut, nearly 2,000 in church, services in English and Welsh; no bells mentioned | Church, town | Documented, single-source | [effects:S10] |
| First train, 20 January 1857: two engines, 13 carriages, cannon, "the merry pealing of bells", bands | Railway, town | Documented | [effects:S7] |
| The engines: the company's early engines were Hackworth six-coupled engines (the 1841 *Victoria*: 4 ft wheels, 18 tons, laid up for repair from June to December 1857); which two engines drew the first train is not recorded, and two new engines of 1857 are unnamed (*Corrected 2026-10-03 (independent check)*) | Railway | Documented (the company's type); reconstructed (sound) | [railway:S1][railway:S2] |
| A town of "a church, four chapels, 11 streets, 73 shops, 23 public houses" (1858) | Town street | Documented, single-source | [victorian:S65] |
| Cilyrychen lime kilns, Llandybïe, first kiln lit 18 May 1857 | Industry | Documented (the kilns); reconstructed (sound) | [victorian:S24][victorian:S27] |
| Gas works at Ffairfach, c. 1860 | Village | Documented, single-source | [victorian:S2] |
| Last large cattle drove across Wales, 1870 | Road | Documented, single-source | [victorian:S37] |
| Corncrake "numerous in most parts of the county", arriving mid April (Pembrokeshire, 1894) | Hay meadows | Documented (neighbouring county) | [S10] |
| Cymanfa ganu begins at Aberdare in 1859, not here | Chapel | Documented elsewhere (the Victorian note's 1859 row); do not place locally | |

## Modern (1902 to today)

| Sound | Setting | Tier | Sources |
|---|---|---|---|
| GWR 57xx pannier tanks 3641, 9645 and 9788 on local and Carmarthen trains, 1958 to 1960 (the numbers from the photographs; the class from the number series, *Corrected 2026-10-03 (independent check)*) | Railway | Documented | [railwaylater:S2][railwaylater:S3][railwaylater:S49][railwaylater:S5] |
| Diesel units: Class 120 three-car or two-car railcars from 1964; Class 108 at Glanrhyd, 19 October 1987 | Railway | Documented | [railwaylater:S1][railwaylater:S8] |
| Class 153 single cars today (Transport for Wales) | Railway | Documented | [railwaylater:S35] |
| Corncrake decline from about 1916, last Pembrokeshire breeding hints by 1973 | Hay meadows | Documented (neighbouring county) | [S10] |
| Red kite: fewer than ten pairs in mid Wales by the 1930s, now common and fed at Llanddeusant | Sky | Documented | [deeptime:S44][deeptime:S45][deeptime:S38] |
| Tractors, silage, motor traffic through the town | Farm, road | Reconstructed (road history not researched) | |
| Beavers back in Wales since 2021, at Cors Dyfi only | River | Documented (not the Tywi) | [deeptime:S34] |

## Time of day and season

- **Dawn and dusk**: the dawn chorus is the obvious bed; the birds in it depend on habitat and era
  (above). Dafydd's skylark is "world's early-riser" and sings "from dawn to dusk" [S5].
- **Night**: tawny owl from dark to "the break of day", and dogs answering it [S4]; barn owl
  screams; nightjar on heath in summer (reconstructed by habitat); the river louder by contrast.
- **Spring**: skylark, called "April's gatekeeper" [S5]; cuckoo; cock-thrush "every May" [S9];
  corncrake from mid April in the hay meadows into the 20th century [S10]; lambing (reconstructed).
- **Summer**: haymaking (scythes, later mowing machines), corncrake calling at night in the hay.
- **Ploughing**: March and April, summer, and winter, per Gerald [S3].
- **Fixed dates**: Ffairfach fairs on 5 May and 22 November [victorian:S2]; the medieval fair around
  St Barnabas (11 June) from 1290 [S20]; Dinefwr's fair at the Nativity of the Virgin (8 September)
  from 1280, and Newtown's of 18 October from 1363 [S20]; St Teilo's Fair (its date not found).
- **Winter**: quieter woods, rooks and crows, geese passing (reconstructed); snow lies longer in the
  cold phases (the atmosphere system already has a chill value per period).

## Licensed recordings

Licence exactly as the page shows it, read 2026-10-02. "BL" means the British Library's set on
Commons [S13]: its pages credit "the British Library", and the recordist is given where the file has
an "Audio files by" category. None was downloaded. CC0 and public domain need no credit but the
manifest still records them.

### Water and weather

| Sound | Recording | Author | Licence | Length | Why it fits |
|---|---|---|---|---|---|
| River | [large stream.mp3](https://freesound.org/people/nickjb/sounds/688079/) | nickjb | Creative Commons 0 | 2:51 | "fast flowing water recorded in mid Wales" |
| River | [Stream Ambience](https://freesound.org/people/jamespeacock4616/sounds/536175/) | jamespeacock4616 | Creative Commons 0 | 1:31 | North Wales, 3 m from the river |
| Stream | [Welsh Stream 01](https://freesound.org/people/harveyjnz/sounds/361641/) | harveyjnz | Attribution 4.0 | 0:37 | Dolgellau |
| Stream | [Stream_Wales_1.wav](https://freesound.org/people/innov8ting/sounds/627939/) | innov8ting | Attribution NonCommercial 4.0 | 9:37 | A cascade near Rhos, Wales; long, loopable |
| Rain | [Rain (1).ogg](https://commons.wikimedia.org/wiki/File:Rain_(1).ogg) | ezwa | Public domain | 0:45 | Plain rain, no traffic |
| Rain | [Soft rain in the countryside](https://freesound.org/people/EduFigueres/sounds/688896/) | EduFigueres | Creative Commons 0 | 1:29 | Countryside, place not given |
| Rain on a farmhouse | [Pölzau, 18th century farmer house ...](https://freesound.org/people/Yulathh/sounds/767873/) | Yulathh | Attribution 4.0 | 5:39 | Light to steady rain and thunder at an old farmhouse (Styria) |
| Thunder | [Distant Thunder](https://freesound.org/people/richwise/sounds/361401/) | richwise | Creative Commons 0 | 7:07 | Southampton, UK |
| Wind | [240102 welsh wind](https://freesound.org/people/nataliapaultroni/sounds/742292/) | nataliapaultroni | Attribution NonCommercial 4.0 | 0:13 | Welsh wind; short, layer under the procedural wind |

### Birds and wild animals

| Sound | Recording | Author | Licence | Length | Why it fits |
|---|---|---|---|---|---|
| Dawn chorus | [Henllys Woods 22-06-2026 Dawn Chorus](https://freesound.org/people/Noisyjones/sounds/856634/) | Noisyjones | Creative Commons 0 | 41:26 | Welsh deciduous wood (Anglesey); occasional jets to edit out |
| Dawn chorus | [Dawn chorus.wav](https://freesound.org/people/Synge101/sounds/611453/) | Synge101 | Creative Commons 0 | 1:36 | Wicklow, Ireland |
| Rooks | [Rooks in the morning](https://freesound.org/people/jamielynchpost/sounds/759148/) | jamielynchpost | Attribution 4.0 | 1:21 | A rookery, Oxfordshire |
| Rooks | [rooks_coquetdale](https://freesound.org/people/Northumberland_Sound_Archive/sounds/783377/) | Northumberland_Sound_Archive | Attribution NonCommercial 4.0 | 4:33 | A rookery at Felton, with magpies |
| Curlew | [Eurasian Curlew (W1CDR0001389 BD26)](https://commons.wikimedia.org/wiki/File:Eurasian_Curlew_(Numenius_arquata)_(W1CDR0001389_BD26).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 3:34 | Skomer, Pembrokeshire |
| Curlew | [Garden birdsong with Curlew.wav](https://freesound.org/people/mossie55/sounds/475971/) | mossie55 | Creative Commons 0 | 2:47 | Northern England, curlew in the distance over farmland |
| Skylark | [Eurasian Skylark (W1CDR0001421 BD2)](https://commons.wikimedia.org/wiki/File:Eurasian_Skylark_(Alauda_arvensis)_(W1CDR0001421_BD2).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:48 | Skokholm, Pembrokeshire |
| Skylark | [Skylark, Cardiff Sea Wall](https://freesound.org/people/odilonmarcenaro/sounds/851227/) | odilonmarcenaro | Creative Commons 0 | 1:11 | South Wales, April 2026 |
| Cuckoo | [Common Cuckoo (W1CDR0001463 BD1)](https://commons.wikimedia.org/wiki/File:Common_Cuckoo_(Cuculus_canorus)_(W1CDR0001463_BD1).ogg) | BL; Aubrey John Williams | CC BY-SA 4.0 | 0:40 | Surrey |
| Cuckoo in a wood | [UK Deciduous Wood in early Spring with Cuckoo](https://freesound.org/people/chris_dagorne/sounds/425315/) | chris_dagorne | Creative Commons 0 | 3:42 | New Forest; a whole spring woodland bed |
| Tawny owl | [Tawny Owl (W1CDR0001519 BD8)](https://commons.wikimedia.org/wiki/File:Tawny_Owl_(Strix_aluco)_(W1CDR0001519_BD8).ogg) | BL | CC BY-SA 4.0 | 1:02 | Hoots, Gloucestershire; Dafydd's "hoo-di-hoo" |
| Tawny owls | [Tawny owls.wav](https://freesound.org/people/straget/sounds/432092/) | straget | Attribution 4.0 | 3:50 | A pair at night |
| Barn owl | [Barn Owl (W TYTO ALBA R1 C16)](https://commons.wikimedia.org/wiki/File:Barn_Owl_(Tyto_alba)_(W_TYTO_ALBA_R1_C16).ogg) | BL | CC BY 4.0 | 0:12 | Screams, Cardiganshire |
| Red kite | [Red kite and magpie](https://freesound.org/people/farandjoun/sounds/830292/) | farandjoun | Creative Commons 0 | 1:05 | Wild kite calling, place not given |
| Red kite | [Birds of Prey: Red Kite, soft social calls](https://freesound.org/people/MichiJung/sounds/865812/) | MichiJung | Attribution 4.0 | 0:17 | Close calls of a bird at a raptor rescue centre, probably captive (*Corrected 2026-10-03 (independent check)*) |
| Crane | [Grus grus.ogg](https://commons.wikimedia.org/wiki/File:Grus_grus.ogg) | Волков Владислав Петрович | CC0 | 0:15 | A flock of 22 calling in flight, Russia, April 2011 |
| Cranes, distant | [20080302.distance.10.flac](https://freesound.org/people/dobroide/sounds/49225/) | dobroide | Attribution 4.0 | 1:30 | Cranes and lapwings over marsh (Doñana) |
| Corncrake | [Crex crex.ogg](https://commons.wikimedia.org/wiki/File:Crex_crex.ogg) | Hannu | Public domain | 0:30 | Several calling on a meadow (Estonia), at night |
| Corncrake | [A Corncrake (Crex crex) In The Bushes ...](https://freesound.org/people/newlocknew/sounds/746333/) | newlocknew | Attribution NonCommercial 4.0 | 4:19 | Meadow with crickets; distant road to cut |
| Dipper | [European Dipper (W1CDR0001383 BD8)](https://commons.wikimedia.org/wiki/File:European_Dipper_(Cinclus_cinclus)_(W1CDR0001383_BD8).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:13 | River song, Teign valley |
| Heron | [Grey Heron (W ARDEA CINEREA R1 C19)](https://commons.wikimedia.org/wiki/File:Grey_Heron_(Ardea_cinerea)_(W_ARDEA_CINEREA_R1_C19).ogg) | BL; Howard Phelps | CC BY-SA 4.0 | 1:58 | Nest sounds, lake edge |
| Raven | [Common Raven (W1CDR0001449 BD6)](https://commons.wikimedia.org/wiki/File:Common_Raven_(Corvus_corax)_(W1CDR0001449_BD6).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 1:43 | The battlefield bird of early poetry |
| Golden eagle | [Golden Eagle (W1CDR0001387 BD6)](https://commons.wikimedia.org/wiki/File:Golden_Eagle_(Aquila_chrysaetos)_(W1CDR0001387_BD6).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:25 | Ice Age to medieval crags |
| Black grouse | [Black Grouse (W1CDR0001396 BD3)](https://commons.wikimedia.org/wiki/File:Black_Grouse_(Tetrao_tetrix)_(W1CDR0001396_BD3).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 1:19 | Lekking males on moorland |
| Bittern | [Eurasian Bittern (W BOTAURUS STELLARIS R1 C1)](https://commons.wikimedia.org/wiki/File:Eurasian_Bittern_(Botaurus_stellaris)_(W_BOTAURUS_STELLARIS_R1_C1).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 1:21 | Booming in reeds; medieval falconer's quarry |
| Woodpecker drumming | [Great Spotted Woodpecker (W1CDR0001405 BD15)](https://commons.wikimedia.org/wiki/File:Great_Spotted_Woodpecker_(Picoides_major)_(W1CDR0001405_BD15).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:32 | Oak wood (Yarner, Devon; the Commons description spells it "Yarmer Wood", *Corrected 2026-10-03 (independent check)*) |
| Pied flycatcher | [Pied Flycatcher (W1CDR0001423 BD1)](https://commons.wikimedia.org/wiki/File:Pied_Flycatcher_(Ficedula_hypoleuca)_(W1CDR0001423_BD1).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:49 | Western oak-wood bird (reconstructed for the valley) |
| Blackbird | [Common Blackbird (W1CDR0001425 BD22)](https://commons.wikimedia.org/wiki/File:Common_Blackbird_(Turdus_merula)_(W1CDR0001425_BD22).ogg) | BL; Lawrence Shove (*Corrected 2026-10-03 (independent check)*) | CC BY-SA 4.0 | 1:03 | One of the four birds most named in 14th-century poetry |
| Robin | [European Robin (W1CDR0001425 BD16)](https://commons.wikimedia.org/wiki/File:European_Robin_(Erithacus_rubecula)_(W1CDR0001425_BD16).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 2:57 | Year-round song |
| Wren | [Eurasian Wren (W1CDR0001461 BD5)](https://commons.wikimedia.org/wiki/File:Eurasian_Wren_(Troglodytes_troglodytes)_(W1CDR0001461_BD5).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 1:03 | Woodland edge |
| Mistle thrush | [Mistle Thrush (W1CDR0000636 BD11)](https://commons.wikimedia.org/wiki/File:Mistle_Thrush_(Turdus_viscivorus)_(W1CDR0000636_BD11).ogg) | BL; Richard Ranft | CC BY 4.0 | 0:57 | Winter and spring song |
| Lapwing | [Northern Lapwing (W1CDR0001471 BD4)](https://commons.wikimedia.org/wiki/File:Northern_Lapwing_(Vanellus_vanellus)_(W1CDR0001471_BD4).ogg) | BL | CC BY-SA 4.0 | 0:35 | Wet pasture |
| Snipe | [Common Snipe (W GALLINAGO GALLINAGO R3 C5)](https://commons.wikimedia.org/wiki/File:Common_Snipe_(Gallinago_gallinago)_(W_GALLINAGO_GALLINAGO_R3_C5).ogg) | BL | CC BY 4.0 | 0:27 | Wet meadows, bogs |
| Yellowhammer | [Yellowhammer (W1CDR0001422 BD1)](https://commons.wikimedia.org/wiki/File:Yellowhammer_(Emberiza_citrinella)_(W1CDR0001422_BD1).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:57 | Hedges and farmland |
| House martin | [Common House Martin (W DELICHON URBICA R3 C3)](https://commons.wikimedia.org/wiki/File:Common_House_Martin_(Delichon_urbica)_(W_DELICHON_URBICA_R3_C3).ogg) | BL | CC BY 4.0 | 0:32 | Eaves in town and farm, Cardiganshire |
| Starlings | [Common Starling (W1CDR0001431 BD8)](https://commons.wikimedia.org/wiki/File:Common_Starling_(Sturnus_vulgaris)_(W1CDR0001431_BD8).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:40 | Town roofs |
| Nightjar | [European Nightjar (W1CDR0001526 BD23)](https://commons.wikimedia.org/wiki/File:European_Nightjar_(Caprimulgus_europaeus)_(W1CDR0001526_BD23).ogg) | BL | CC BY-SA 4.0 | 0:51 | Summer nights on heath |
| Toad | [Common Toad (W BUFO BUFO R3 C2)](https://commons.wikimedia.org/wiki/File:Common_Toad_(Bufo_bufo)_(W_BUFO_BUFO_R3_C2).ogg) | BL | CC BY 4.0 | 0:54 | Radnor, Wales; spring ponds |
| Red deer | [Red Deer (W1CDR0001424 BD3)](https://commons.wikimedia.org/wiki/File:Red_Deer_(Cervus_elaphus)_(W1CDR0001424_BD3).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:48 | Autumn roaring, wildwood eras |
| Fallow deer | [Fallow Deer (W1CDR0001444 BD17)](https://commons.wikimedia.org/wiki/File:Fallow_Deer_(Dama_dama)_(W1CDR0001444_BD17).ogg) | BL; Lawrence Shove | CC BY-SA 4.0 | 0:25 | Buck groaning; Dinefwr deer park from 1775 |
| Fox | [Red Fox (W1CDR0001529 BD12)](https://commons.wikimedia.org/wiki/File:Red_Fox_(Vulpes_vulpes)_(W1CDR0001529_BD12).ogg) | BL | CC BY-SA 4.0 | 0:43 | Night barks |
| Wolf | [Cooper Creek ... solitary wolf howl very clear.wav](https://freesound.org/people/betchkal/sounds/500646/) | betchkal | Creative Commons 0 | 0:55 | A wild wolf (Wrangell-St Elias, Alaska); most "wolf" files are dogs or people |

### Farm, craft and work

| Sound | Recording | Author | Licence | Length | Why it fits |
|---|---|---|---|---|---|
| Cattle | [Cow moo #8](https://freesound.org/people/spurioustransients/sounds/513565/) | spurioustransients | Creative Commons 0 | 0:11 | A field in Pembrokeshire |
| Cattle at a fair | [Cows mooing in a stockyard in St Joseph, Missouri](https://freesound.org/people/felix.blume/sounds/213915/) | felix.blume | Creative Commons 0 | 5:01 | Hundreds of cattle waiting for sale; a cattle fair bed (traffic to check) |
| Farm, Wales | [General Farm Ambience 03 (Ceredigion)](https://freesound.org/people/TicAshfield/sounds/245673/) | TicAshfield | Creative Commons 0 | 0:07 | Short; Ceredigion |
| Sheep | [flock of sheep](https://freesound.org/people/eguaus/sounds/244552/) | eguaus | Creative Commons 0 | 1:13 | A moving flock, binaural |
| Sheep | [Corner of a sheep field in summer.ogg](https://commons.wikimedia.org/wiki/File:Corner_of_a_sheep_field_in_summer.ogg) | earthcalling | Public domain | 0:28 | A field in summer |
| Lambs | [Lambs.wav](https://freesound.org/people/Benboncan/sounds/71754/) | Benboncan | Attribution 4.0 | 0:52 | Spring; edited for aircraft |
| Pigs | [pigs.wav](https://freesound.org/people/bruno.auzet/sounds/692838/) | bruno.auzet | Creative Commons 0 | 1:50 | Two pigs outdoors, birds behind |
| Hens | [Chickens in the coop, morning](https://freesound.org/people/fthgurdy/sounds/536693/) | fthgurdy | Creative Commons 0 | 0:51 | Morning farmyard |
| Horse and cart | [horse with old cart.wav](https://freesound.org/people/bruno.auzet/sounds/538438/) | bruno.auzet | Creative Commons 0 | 0:33 | Hooves, wheels, creaking |
| Horse-drawn vehicle on a road | [Amish Buggy.mp3](https://freesound.org/people/5ound5murf23/sounds/523443/) | 5ound5murf23 | Creative Commons 0 | 1:08 | Passing on a hard road |
| Horses on a road | [Passing horses.wav](https://freesound.org/people/BeeProductive/sounds/389410/) | BeeProductive | Creative Commons 0 | 0:32 | Country road; cars to edit out |
| Rotary quern | [quern1.aif](https://freesound.org/people/neilg/sounds/18797/) | neilg | Attribution 4.0 | 0:30 | A rotary quern grinding bere-meal; Iron Age onward |
| Flails | [Threshing in the drying barn with flails](https://freesound.org/people/YleArkisto/sounds/253096/) | YleArkisto | Attribution 4.0 | 1:26 | Two men threshing on a barn floor, analogue tape, Finland, 20 October 1975 |
| Scythe | [mowing with a scythe](https://freesound.org/people/blukotek/sounds/251660/) | blukotek | Creative Commons 0 | 0:30 | Haymaking |
| Blacksmith | [By ther blacksmith-002.wav](https://freesound.org/people/Emmaproductions/sounds/254370/) | Emmaproductions | Creative Commons 0 | 1:19 | Hammer and anvil |
| Blacksmith | [Avoncroft Blacksmith (1).wav](https://freesound.org/people/phonoflora/sounds/201183/) | phonoflora | Attribution 4.0 | 0:15 | Heavy blows on a hot bar (an electric fan behind) |
| Stonemason | [Stonemason](https://freesound.org/people/achats57/sounds/812116/) | achats57 | Creative Commons 0 | 0:50 | "Someone shaping stone in a rural area of Wales"; castle and church building |
| Axe | [Chopping a tree trunk with an Axe. OWI.wav](https://freesound.org/people/JesterWhoo/sounds/706978/) | JesterWhoo | Creative Commons 0 | 0:16 | Timber work, clearance |
| Hearth fire | [Fire - Crackling, Spitting, Roaring](https://freesound.org/people/jamesdrake89/sounds/636178/) | jamesdrake89 | Creative Commons 0 | 4:21 | An inglenook fire |
| Tractor, distant | [UK Farmland at dawn in the Spring](https://freesound.org/people/richwise/sounds/565321/) | richwise | Creative Commons 0 | 5:51 | Birdsong with distant farm work |
| Tractor ploughing | [ploughing that field.wav](https://freesound.org/people/inchadney/sounds/60133/) | inchadney | Attribution 4.0 | 4:42 | Autumn ploughing |
| Dog | [NoisyDog.wav](https://freesound.org/people/acclivity/sounds/33849/) | acclivity | Attribution NonCommercial 4.0 | 0:13 | A farm dog in Wales |

### Church, chapel and music

| Sound | Recording | Author | Licence | Length | Why it fits |
|---|---|---|---|---|---|
| Change ringing, distant | [Bell ringing and birdsong](https://freesound.org/people/odilonmarcenaro/sounds/275188/) | odilonmarcenaro | Attribution 4.0 | 2:57 | A parish ring over fields (Crediton, Devon); best fit for 1857 onward |
| Change ringing, in the tower | [Parish church belfry (1).wav](https://freesound.org/people/phonoflora/sounds/201173/) | phonoflora | Attribution 4.0 | 1:16 | Ringing chamber, changes called |
| A small ring | [FiveBellChanges.wav](https://freesound.org/people/acclivity/sounds/22908/) | acclivity | Attribution NonCommercial 4.0 | 0:31 | Five bells, Alfriston; St Teilo's count is unknown |
| A single bell | [bec low bell solo.wav](https://freesound.org/people/HMTSCCSound/sounds/554655/) | HMTSCCSound | Creative Commons 0 | 0:32 | One bell rung once, long tail; a tolling or service bell |
| Bells and birds | [Sound of church bells and birds.oga](https://commons.wikimedia.org/wiki/File:Sound_of_church_bells_and_birds.oga) | lezer | Public domain | 1:43 | A bed |
| Plainchant | [Binaural catholic gregorian chant mass liturgy](https://freesound.org/people/Suso_Ramallo/sounds/320530/) | Suso_Ramallo | Attribution 4.0 | 10:26 | Monks at Mass, Burgos; Talley's canons (reconstructed) |
| Plainchant | [Veni.sancte.spiritus.ogg](https://commons.wikimedia.org/wiki/File:Veni.sancte.spiritus.ogg) | Membeth | Public domain | 2:37 | The Pentecost sequence |
| Welsh hymn | [Calon Lan - Llanelli Male Voice Choir.ogg](https://commons.wikimedia.org/wiki/File:Calon_Lan_-_Llanelli_Male_Voice_Choir.ogg) | Sain (uploaded by the National Library of Wales Wikimedian) | CC BY-SA 3.0 | 0:29 | A Carmarthenshire choir; 30-second excerpt with confirmed permission [S14]; a 20th-century style, not an 1850s congregation |

### Railway, road and crowd

| Sound | Recording | Author | Licence | Length | Why it fits |
|---|---|---|---|---|---|
| GWR 57xx pannier tank | [At Buckfastleigh on a showery afternoon](https://freesound.org/people/konakaboom/sounds/245353/) | konakaboom | Attribution NonCommercial 4.0 | 2:04 | 5786, a 57xx 0-6-0PT, runs round and departs: the class on Llandeilo's 1958 to 1960 trains |
| GWR pannier tank | [GWR Pannier tank at Bledlow](https://freesound.org/people/konakaboom/sounds/276586/) | konakaboom | Attribution NonCommercial 4.0 | 3:52 | 1369 (a smaller pannier) on a rural branch, whistling for foot crossings |
| BR tank engine | [BR Standard Class 4 2-6-4T Steam Engine Departing ...](https://freesound.org/people/lwalker101/sounds/321180/) | lwalker101 | Attribution 4.0 | 1:31 | A 1950s BR tank from a halt |
| Small steam engine, Wales | [steam locomotive leaves porthmadog station](https://freesound.org/people/crosbychris/sounds/213081/) | crosbychris | Attribution 4.0 | 1:34 | Ffestiniog, recorded on board; narrow gauge, engine not named |
| Steam arrival | [Steam train arriving at station](https://freesound.org/people/richwise/sounds/871187/) | richwise | Creative Commons 0 | 1:53 | Havenstreet, Isle of Wight, starting by a stream; engine not named |
| Steam whistle | [WWS SteamWhistle.ogg](https://commons.wikimedia.org/wiki/File:WWS_SteamWhistle.ogg) | Work With Sounds / Konrad Gutkowski | CC BY 4.0 | 0:11 | A 1918 Prussian P8; a whistle only |
| Diesel unit | [Diesel Train Pass by](https://freesound.org/people/kwahmah_02/sounds/277011/) | kwahmah_02 | Attribution 3.0 | 0:20 | A Northern "Pacer": not a class on this line, a stand-in only |
| Market crowd | [Ambience - Birmingham open market](https://freesound.org/people/Dan_AudioFile/sounds/575929/) | Dan_AudioFile | Attribution 4.0 | 1:47 | Stallholders calling; modern English, so filter or keep distant |
| Market crowd | [Walking through bustling open market (Liège)](https://freesound.org/people/Valerie-Vivegnis/sounds/861331/) | Valerie-Vivegnis | Attribution 4.0 | 19:13 | A long open-air market walk; French, so keep distant |
| Village road today | [Side of the road. Kids playing. Middle of North Wales](https://freesound.org/people/suckmadeck/sounds/687000/) | suckmadeck | Attribution NonCommercial 4.0 | 3:56 | A Welsh village roadside |
| Village street today | [ATMO SMALL VILLAGE STREET FIELDS CARS BIRDS.wav](https://freesound.org/people/Malte007/sounds/641875/) | Malte007 | Creative Commons 0 | 0:57 | Cars and birds |

### Not found, or not usable

- **No recording of an 1840s to 1860s British engine.** None was found under any licence.
- **No Class 153 or 108 recording**, and no Welsh-language market crowd.
- **xeno-canto**: unreadable by script; its licences are BY-NC-ND (excluded here), BY-NC-SA and BY-SA
  [S11]. Worth a manual browse by a person for Welsh curlew, rook and corncrake recordings. Commons
  mirrors some xeno-canto files (those with an "XC" number in the name), almost all CC BY-SA [S17].
- **BBC Sound Effects (RemArc)**: excluded. It allows "non-commercial, personal or research purposes"
  but "Sharing our content ... no uploading", lets the BBC take content down "at any time, without
  notice", and is not an open licence [S12].
- **Commons is mostly share-alike for birds**: of 112 audio files from the first ten Commons searches
  (eight of them bird species), 98 were CC BY-SA. Fine under ADR 0026; the credits must say so.

## Synthesise instead

The present engine (`src/audio/ambience.ts`) already builds wind, river, forest, traffic and market
beds from filtered noise and voices for birds, livestock, forge, bells, chant and train. Keep
procedural sound where a recording would be wrong, missing or a poor loop:

- **Church bells.** Additive synthesis already works and can be made truthful: a bell has a hum note
  an octave below, a prime, a minor-third "tierce", a fifth and the nominal an octave above, each
  decaying at its own rate. Tune one per bell and ring rounds or call changes with ringer timing
  jitter. Use it until St Teilo's bells (number, weights, dates) are known.
- **Early iron handbell.** A riveted iron bell is dull and clanky: a few inharmonic partials with
  fast decay and some noise.
- **The 1857 engine.** Exhaust chuffs as filtered noise bursts, four per wheel turn, their rate tied
  to the train's speed on the map, plus steam hiss, wheel beats at rail joints and a simple whistle.
  Label it reconstructed.
- **Crowds in the right language.** Build walla from edge-tts voices the project already uses: many
  short Welsh (and, by period, English, Latin or French) phrases, pitched and delayed, low-passed into
  a murmur. Better than a modern recording in the wrong language, and it carries the ⓘ label.
- **Insects, fire crackle, footsteps, cart wheels on stone, quern rumble.** Cheap and loop-free with
  noise, impulses and filters.
- **Distant traffic and the river's far roar.** Filtered noise is indistinguishable at distance; keep
  recordings for when the camera is close.

Recordings are better for animals and birds, rain close up, flails and blacksmiths, and real steam
engines of the 20th century.

## Spatial mixing

Beds play everywhere and follow the era, season, clock and height; point sources sit on the map
(Web Audio `PannerNode`, distance-based gain, a little extra reverb for distance).

| Kind | Sound | Where |
|---|---|---|
| Bed | Wind (more on high ground), rain, birds by habitat, insects, distant farm | Whole scene, weighted by the camera's height and the land cover under it |
| Line source | The Tywi and its tributaries | Several emitters along the river line, the nearest few active |
| Line source | Roads (mail road and turnpikes, later the main roads) | Along the road line, by era |
| Point | Dinefwr's own market and fair, by mandate of 4 December 1280 (fair at the Nativity of the Virgin, 8 September); Newtown's fair of 18 October from 1363 [S20] (*Corrected 2026-10-03 (independent check)*: added) | Dinefwr and Newtown |
| Moving source | Trains from 1857 | Following the train along the line, louder near Llandeilo and Ffairfach stations |
| Point | St Teilo's bells (from 1857 at the latest), service and chant | The church tower |
| Point | Talley: chant | The abbey |
| Point | Dinefwr: court music, later the park's deer and cattle | The castle, then the park |
| Point | Dryslwyn, 1287: the siege | The castle |
| Point | The Ffairfach smithy at the Torbay Inn, the corn mill, the gas works | Ffairfach |
| Point | Market and fairs | The Shire Hall and market hall; the churchyard (St Teilo's Fair); Ffairfach |
| Point | Lime kilns and quarry | Cilyrychen, Llandybïe |
| Scattered points | Farmsteads (livestock, dogs, hens), rookeries | Farm and tree clusters |
| Point | Hillfort life | Garn Goch and the other forts, Iron Age only |

## Open questions

- **St Teilo's bells**: how many, when cast and by whom. Dove's Guide returned HTTP 429 to every
  request [S18]; try again by hand, or a church guide.
- **St Teilo's Fair**: partly answered (*Corrected 2026-10-03 (independent check)*): a fair around St Barnabas was granted in 1290 and
  1291, and a Saturday market is recorded by 1326 [S20]. What remains: when and why the Barnabas fair
  became St Teilo's Fair, whether it was ever held in the churchyard, and what was sold or heard.
  Dinefwr had its own market and fair from 1280 [S20].
- **Cranes in the Tywi valley**: are there *garan* place-names near Llandeilo, and do they mean crane
  or heron [S1]? The Melville Richards place-name archive would answer it.
- **Corncrake in Carmarthenshire**: the only county history read is Pembrokeshire's [S10].
- **Nightingale**: contested between Gerald and Dafydd [S1]; leave it out of local beds.
- **Road traffic history** (coaches, the main roads through the town, when motor traffic grew) was
  not researched.
- **Licences**: ND is left out here pending Dewi's view; NC items need review if a donation link goes
  live (ADR 0026).
- **xeno-canto** could not be searched; a person could.

## Sources

- [S1] Rhion Pritchard, "The prehistoric and historic bird fauna of Wales: evidence from archaeology, literature and place names", *Birds in Wales* 17:1 (2020), pp. 15 to 25 - https://birdsin.wales/wp-content/uploads/2022/05/pg-15-25-The-prehistoric-and-historic-bird-fauna.pdf - read in full: Port Eynon (43 species), poetry (ravens and eagles; thrush, blackbird, cuckoo, nightingale most named), Welsh laws (crane and bittern as "notable birds"), species notes for black grouse, capercaillie, crane (Goldcliff 46%, Caldicot, Caerleon, Hen Domen), black and white storks, bittern, golden and white-tailed eagles, nightingale (Gerald's 1188 anecdote). Peer-reviewed society journal; cites Yalden and Albarella (2009).
- [S2] Giraldus Cambrensis, *The Itinerary of Archbishop Baldwin through Wales* (trans. R. C. Hoare; J. M. Dent 1912 edition), Project Gutenberg ebook 1148 - https://www.gutenberg.org/cache/epub/1148/pg1148.txt - read: portable bells revered in Wales, the Tywi, Carmarthen and Dinefwr, beavers only on the Teifi, a minstrel and singer "on the fiddle", the nightingale exchange. Primary (in translation).
- [S3] Giraldus Cambrensis, *The Description of Wales*, Project Gutenberg ebook 1092 - https://www.gutenberg.org/cache/epub/1092/pg1092.txt - read: harps in every house; "the harp, the pipe, and the crwth"; part-singing; ploughing with four oxen and a backward-walking driver, ploughing seasons; herds, oats, milk, cheese and butter; the alarm trumpet; coracles. Primary (in translation).
- [S4] Dafydd ap Gwilym, "Y Dylluan" (The Owl), poem 61, *Gwaith Dafydd ap Gwilym* (Swansea University edition), English translation - https://dafyddapgwilym.net/AnaServer?dafydd+124824+compareSimpleEng.anv+edEl=124592&localEl=124824&titleEl=124580 - read in full, Welsh text and translation ("'Hw ddy hw'", line 20; "incites the dogs of the night"). Primary.
- [S5] Dafydd ap Gwilym, "Yr Ehedydd" (The Skylark), poem 44, same edition - https://dafyddapgwilym.net/AnaServer?dafydd+92175+compareSimpleEng.anv+edEl=91886&localEl=92175&titleEl=91874 - read: "world's early-riser", "April's gatekeeper", "from dawn to dusk". Primary.
- [S6] Dafydd ap Gwilym, "Y Rhugl Groen" (The Rattlebag), poem 62, same edition - https://dafyddapgwilym.net/AnaServer?dafydd+126367+compareSimpleEng.anv+edEl=126170&localEl=126367&titleEl=126158 - read: a shepherd's rattle-bag, "a bell's sound of small stones and gravel". Primary.
- [S7] Dafydd ap Gwilym, "Y Cloc" (The Clock), poem 64, same edition - https://dafyddapgwilym.net/AnaServer?dafydd+129758+compareSimpleEng.anv+edEl=129513&localEl=129758&titleEl=129501 - read: ropes, wheel, weights and hammer; "a phantom mill grinding by night in a monastery cloister". Primary.
- [S8] Dafydd ap Gwilym, "Y Gog" (The Cuckoo), poem 164, same edition - https://dafyddapgwilym.net/AnaServer?dafydd+289124+compareSimpleEng.anv+edEl=288733&localEl=289124&titleEl=288721 - read: "the leaves' clock", "sacring-bell of the sturdy thicket". Primary.
- [S9] Dafydd ap Gwilym, "Y Ceiliog Bronfraith" (The Cock-thrush), poem 49, same edition - https://dafyddapgwilym.net/AnaServer?dafydd+100977+compareSimpleEng.anv+edEl=100730&localEl=100977&titleEl=100718 - read: "Every May ... a powerful songster", "excels any organ". Primary.
- [S10] Pembrokeshire Avifauna, "Corncrake" - https://pembsavifauna.co.uk/category/corncrake/ - read: George Owen (1603) and Murray Mathew (1894, "numerous in most parts of the county", arriving mid April); decline "first noted in about 1916" (Lockley et al. 1949); last breeding on Skokholm 1930, hints to 1973. Secondary, county avifauna.
- [S11] Willem-Pier Vellinga and Robert Planqué, "The Xeno-canto collection and its relation to sound recognition and classification", CLEF 2015 working notes, CEUR-WS vol. 1391 - https://ceur-ws.org/Vol-1391/166-CR.pdf - read: licences "CC-BY-ND-NC", and "nowadays one can also choose CC-BY-NC-SA ... and CC-BY-SA". By the xeno-canto Foundation; 2015, so later options are not covered.
- [S12] BBC Sound Effects, "Licensing" (The BBC's Content Licence for RemArc) - https://sound-effects.bbcrewind.co.uk/licensing - read in headless Chromium: permission "For non-commercial, personal or research purposes"; "Sharing our content. For example, no uploading"; take-down "at any time, without notice"; commercial licensing through Pro Sound Effects.
- [S13] Wikimedia Commons, "Category:Wildlife Sounds in the British Library" - https://commons.wikimedia.org/wiki/Category:Wildlife_Sounds_in_the_British_Library - listed through the API: 202 files, 105 CC BY 4.0 and 97 CC BY-SA 4.0, "provided by the British Library from its digital collections", VRTS permission confirmed.
- [S14] Wikimedia Commons, "File:Calon Lan - Llanelli Male Voice Choir.ogg" - https://commons.wikimedia.org/wiki/File:Calon_Lan_-_Llanelli_Male_Voice_Choir.ogg - read through the API: credit Sain, CC BY-SA 3.0, "Items with VRTS permission confirmed", uploaded by Jason.nlw.
- [S15] Freesound searches of 2026-10-02, for example https://freesound.org/search/?q=llandeilo - "No results" for llandeilo, carmarthenshire, towy and brecon beacons under the licence filters used; each candidate's licence read from its own page.
- [S16] xeno-canto, explore page and API v2 - https://xeno-canto.org/explore - returned a proof-of-work bot check to curl, WebFetch and headless Chromium; https://xeno-canto.org/api/2/recordings answers "Xeno-canto API v2 is no longer available", and the message points to API v3 (*Corrected 2026-10-03 (independent check)*).
- [S17] Wikimedia Commons, "Category:Xeno-canto" - https://commons.wikimedia.org/wiki/Category:Xeno-canto - seen as a search result; the Commons search results for xeno-canto files read here were CC BY-SA.
- [S18] Dove's Guide for Church Bell Ringers, tower search for Llandeilo - https://dove.cccbr.org.uk/towers?place=Llandeilo - HTTP 429 on every attempt, 2026-10-02; 2026-10-03: a "press button to continue" bot page instead of 429 (*Corrected 2026-10-03 (independent check)*). Not read.
- [S19] Wikipedia, "Cranes of Great Britain" - https://en.wikipedia.org/wiki/Cranes_of_Great_Britain - cranes are "generally believed" to have bred in medieval Britain; an Act of 1533 protected their eggs. A lead. (*Corrected 2026-10-03 (independent check)*: the entry gave 1542 and 1550, which the page does not have.)
- [S20] *Gazetteer of Markets and Fairs to 1516: Wales*, Centre for Metropolitan History (updates to the printed gazetteer of 2003; page last updated 16 March 2007) - https://archives.history.ac.uk/gazetteer/wales.html - read 2026-10-03: Llandeilo and Dinefwr entries, citing the Calendar of Charter Rolls 1257-1300 pp. 343 and 405, the Calendar of Patent Rolls, and R. A. Griffiths, "A tale of two towns: Llandeilo Fawr and Dinefwr in the Middle Ages" (1994). Secondary, a scholarly gazetteer built on the printed calendars. Found by the 2026-10-03 independent check.
