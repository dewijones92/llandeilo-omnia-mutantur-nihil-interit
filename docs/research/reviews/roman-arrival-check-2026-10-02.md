---
title: Independent check of roman-arrival.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: The Roman army arrives in the Tywi valley, c. AD 74

Reviewed note: [`../roman-arrival.md`](../roman-arrival.md) (status: draft, written 2026-10-02, untracked
in the working tree). Repo state: `main` at `43d86ea`; no `git fetch` was run, because this check was
not allowed to change repository state. App content that already overlaps the note:
`src/content/events.ts:112` (the forts event) and `src/content/features.ts:219` (Fort 1). Neither is
contradicted by this check.

## Method

- Every load-bearing source was downloaded fresh into a separate scratch folder and read as raw text
  (curl, then a keyword-in-context search), not through a summarising fetch, so wording could be
  checked exactly. That covered all 27 Coflein records the note cites, the Heneb PDF of Hughes's
  excavation report (S1, via pdftotext), the Latin Library texts of *Agricola* and *Annals* XII and
  XIV, the Perseus English of *Agricola* 17, 18 and 20, all seven Josephus sections (Whiston), both
  Vegetius books, Ptolemy and Dahm on Lacus Curtius, six Wikipedia articles (raw wikitext), four
  roman-britain.co.uk pages, People's Collection Wales, Cadw, Current Archaeology and Current World
  Archaeology.
- **S54 (APS *Physics*)** sits behind a Cloudflare challenge for curl, so it was read with WebFetch,
  which returned quotations. The book's year (2017) did not appear in what came back.
- Grid references for every placed site were checked against the Coflein record's own grid
  reference, and distances were recomputed from the map centre in `src/domain/geo.ts`
  (E 262900, N 222500) and from Fort 1.
- Independent sources the note did not use: Coflein NPRN 100866 (Garn Goch) and **NPRN 303908
  (Pumsaint fort)**; **Heneb, Historic Landscape Character Area 212 Llandovery**; **Roman Inscriptions
  of Britain, RIB 2262**; **Codrington, *Roman Roads in Britain* (1903), ch. 10, on Lacus Curtius**;
  the Oxford *Companion to British History* entries for Frontinus and Agricola (A. S. Esmonde
  Cleary, via encyclopedia.com); roman-britain.co.uk, *Dynevor Park (Llandeilo) Roman Fort*. Six
  WebSearch calls were used.
- Britannica's Frontinus entry returned HTTP 403 and was not read. llandeilo.org's
  `roman_settlement.php` is now a "Page not found" page; a search snippet from it ("late 70s AD ...
  up to 2000 men") could not be checked and is not used.

## Summary

71 claims checked: **61 confirmed, 8 partly, 1 not supported by any cited source, 1 contradicted.**
The note is careful and accurate. Its quotations from Hughes, Coflein, Tacitus, Josephus and Vegetius
are verbatim, and every grid reference and distance reproduces. The problems are about what it left
out more than what it got wrong:

1. **An earlier Roman arrival is more likely than the note allows.** Heneb's Llandovery landscape
   description says plainly: "The Romans established a fort at Llanfair-ar-y-bryn (Alabum) in the
   north of the present town, probably in the AD 50s". The note treats the 50s start as a lead from
   Wikipedia only. With Hughes's "an earlier date for Fort 1 cannot be ruled out", a framing of
   "the Roman army arrives c. AD 74" as the *first* arrival is contested and must say so.
2. **Frontinus's start date is 73/4, not 74.** The Oxford *Companion* gives "Governor of Britain
   (73/4–77)", as does Wikipedia's succession box. The governor caption should read "c. 73/74 to 77
   (or 78)".
3. **Agricola's arrival has a third reading.** The Oxford *Companion* says he was consul in 77 "and
   probably arrived in Britain as governor late in that year", which sits awkwardly with Tacitus's
   "about midsummer". "77 or 78" stays contested.
4. **Pumsaint was abandoned in the 120s, not about 140.** Coflein NPRN 303908 (the fort record the
   note did not fetch) says the fort began "in the mid AD 70s", was reduced around AD 100, and was
   abandoned "in the AD 120s". That confirms the c. 75 start and contradicts S39's "manned until
   about 140".
5. **"Via Julia" is now sourced as a forgery's name.** Codrington: "On this hint the author of the
   spurious Itinerary of Richard of Cirencester gave the name Via Julia ... The only authority for
   this name is the reference above mentioned" (a 13th-century poem by Necham). The note's "do not use
   it in-world" stands, and is now backed by a source rather than search snippets.
6. **The barley evidence does not point to cavalry in particular.** Hughes says it is "consistent with
   the view that the fort held at least an *ala quingenaria* (cavalry unit) or a *cohors milliaria*
   (a large infantry or mixed unit)".
7. Smaller points: the lost milestone is not quite the only local inscription; the move "from Usk to
   Caerleon" is inference; the possible practice camp alternative is "the later designed landscape",
   not specifically 18th-century; and "Sarn Helen's name is medieval or later" has no source.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.
"Used in src/" names app content that already rests on the claim.

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Tacitus gives Frontinus one sentence: "subdued by his arms the powerful and warlike tribe of the Silures" (*validamque et pugnacem Silurum gentem armis subegit*) | Summary; Campaign | none | C | S3 Latin and S4 English verbatim. [Latin Library](https://www.thelatinlibrary.com/tacitus/tac.agri.shtml), [Perseus Ag. 17](http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0081%3Achapter%3D17) |
| 2 | Dahm calls it "the only solid evidence for the achievements of Frontinus' tenure" | Campaign | none | C | S10 verbatim; Dahm adds "we can therefore postulate much more activity than Tacitus describes". [Lacus Curtius](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/MKDahm**/body.html) |
| 3 | *Agricola* 18: arrived "about midsummer" (*media iam aestate*), Ordovices destroyed "nearly the whole of a squadron of allied cavalry", attacked "though summer was past" (*quamquam transvecta aestas*) with "a force of veterans and a small body of auxiliaries"; most advisers wanted to wait | Campaign; Season | none | C | S3 and S5 verbatim ("most advisers thought it best simply to watch all weak points"). [Perseus Ag. 18](http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0081%3Achapter%3D18) |
| 4 | *Agricola* 20: "when summer came" (*ubi aestas advenit*), he chose camp sites and explored estuaries and forests himself | Season | none | C | S3, S6 verbatim. [Perseus Ag. 20](http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0081%3Achapter%3D20) |
| 5 | *Annals* XII.39: *Silurum gens non atrocitate, non clementia mutabatur*, held down by legionary camps | Campaign | none | C | S7 verbatim ("castrisque legionum premenda foret"). [Latin Library](https://www.thelatinlibrary.com/tacitus/tac.ann12.shtml) |
| 6 | *Annals* XIV.29: Veranius "(AD 57)" ravaged the Silures with modest raids | Campaign | none | P | Latin confirmed (*modicis excursibus Silu[r]as populatus*), but the passage is under the year AD 61 and gives no date for Veranius's governorship. The "AD 57" needs its own source. [Latin Library](https://www.thelatinlibrary.com/tacitus/tac.ann14.shtml) |
| 7 | Tacitus never names the Demetae in *Agricola*, *Annals* XII or XIV | Summary; Campaign | none | C | Text search of all three: "Demet" absent; "Silur" present. Wikipedia *Demetae* says the same. [Wikipedia](https://en.wikipedia.org/wiki/Demetae) |
| 8 | Ptolemy: "more toward the west are the Demetae, whose towns are: Luentinum ... Maridunum" | Campaign; Local people | none | C | S9 verbatim. [Lacus Curtius](https://penelope.uchicago.edu/Thayer/E/Gazetteer/Periods/Roman/_Texts/Ptolemy/2/2*.html) |
| 9 | Cerialis left in 74; a diploma of 21 May 74 shows him consul again | Governors | none | C | S12 verbatim, citing Gallivan. Still a single-source lead. [Wikipedia](https://en.wikipedia.org/wiki/Quintus_Petillius_Cerialis) |
| 10 | Frontinus governor "probably from 74 to 78" and "AD 74-77/78" (Dahm, citing Birley); Wikipedia c. 74 to c. 78 citing Birley | Governors; cutscene table | none | P | Both Dahm phrasings confirmed, but no Birley citation is visible at the "74 to 78" sentence. Wikipedia's infobox says c. 74 to c. 78, but its succession box says "73/4-77". Independent: Oxford *Companion*, "Governor of Britain (73/4–77)". [encyclopedia.com](https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/frontinus-sextus-iulius) |
| 11 | Agricola arrived 77 or 78: contested | Governors; Open questions | none | C | S13: "Arriving in midsummer of 77" in the text, "78–85" in the succession box. S31: "only succeeding in AD 77". Independent: Oxford *Companion*, "Governor of Britain 77–83 ... served as a consul in the year 77 and probably arrived in Britain as governor late in that year". [encyclopedia.com](https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/agricola-gnaeus-iulius) |
| 12 | Jones and Mattingly (via Dahm): Frontinus campaigned against "the Silures, Demetae, Ordovices and Deceangli" | Inference | none | C | S10 verbatim. Correctly labelled a modern reconstruction |
| 13 | roman-britain.co.uk: Carmarthen part of "a network established during the rapid conquest of north central and west Wales by Julius Frontinus, Governor A.D. 74–77" | Inference | none | C | S35 verbatim. [roman-britain.co.uk](https://www.roman-britain.co.uk/places/moridunum/) |
| 14 | Hughes: Jarrett's suggestion "that southwest Wales was almost exempt from military occupation" is refuted; the three forts "within a days march of each other, must have provided an effective control over the surrounding population" | Summary; Inference | none | C | S1 verbatim (Jarrett 1969, 8). [Heneb PDF](https://heneb.org.uk/wp-content/uploads/2025/09/llandeiloromanforts2003-2007.pdf) |
| 15 | Cadw on Dolaucothi: "was this the reason they came here in the first place?" | Inference | none | C | S32 verbatim. [Cadw](https://cadw.gov.wales/learn/sites-through-centuries/roman-wales) |
| 16 | Fort 1 "perhaps soon after AD 74", "an earlier date ... cannot be ruled out"; Coflein "during the AD 70s, though an earlier date cannot be ruled out" | Summary; cutscene table | events.ts:112; features.ts:219 | C | S1: "an early Flavian phase of campaigning (perhaps soon after AD 74) when such large forts were favoured (Davies 2000, 15). However, an earlier date for Fort 1 cannot be ruled out." S2: "It is assumed to have been constructed during the AD 70s, though an earlier date cannot be ruled out". [Coflein 402271](https://coflein.gov.uk/en/site/402271/) |
| 17 | No dendrochronology or radiocarbon date; dating rests on a small samian and coin sample | Summary; Season | none | C | Neither term occurs in S1; S1: "the size of the sample is very small" |
| 18 | Fort 1 240 x 160m inside the inner ditches (3.84ha), later "confirmed (3.85 hectares)"; Coflein 3.7ha | Route; Force | features.ts:219 | C | S1 and S2 verbatim. S1 also: "one of the largest forts in Wales" |
| 19 | Fort 1's front (*praetentura*) probably faced north-east | Route; cutscene table | none | C | S1: "It seems probable that the front of the fort (the praetentura) is located to the northeast." "Towards Llandovery" is the note's own gloss, fairly labelled |
| 20 | Garrison: "at the very least an *ala quingenaria* ... or a *cohors milliaria* ... and perhaps even a larger legionary detachment"; Coflein "more than a thousand, drawn from several different units" | Summary; Force | events.ts:112 | C | S1 and S2 verbatim |
| 21 | Barley in Fort 1's ditch is "consistent with" cavalry | Force; cutscene table | none | P | S1: "consistent with the view that the fort held at least an ala quingenaria (cavalry unit) or a cohors milliaria (a large infantry or mixed unit)". It does not single out cavalry |
| 22 | No weapons, armour or harness among the 2003-2007 finds | Force | none | C | No hits for weapon, armour, harness, spear, sword or helmet in S1; the copper-alloy finds are a possible brooch fragment, a decorative strip and two coins |
| 23 | The "parrot's beak" ditch at Fort 2 was linked with *legio II Adiutrix*; Hughes says Llandeilo "must now call this association into question" | Force | none | C | S1 verbatim (Jeff Davies pers. comm.) |
| 24 | Early fort perhaps given up between 78 and 83 | Route table (S2) | features.ts:219 | C | S2: "the military context in Britain may suggest a date of between 78 and 83 for the abandonment of the early site" |
| 25 | "Pre-Flavian forms are absent"; a very early Flavian foundation "might seem possible" in a larger sample | Season | none | C | S1 verbatim (samian report) |
| 26 | Three Republican denarii (c. 100 to 31 BC) and one Augustan from Home Farm, among seven | Local people | none | C | S1: "seven silver denerii ... three Republican coins (c 100BC to c 31BC), one coin dating to the reign of Augustus (27 BC to AD14) and three late 1st century AD coins (AD69- AD96)". Reported in 2000, before the excavation |
| 27 | Malvern jars: "undoubtedly an Iron Age" tradition, imported "along routes through central Wales", perhaps a container "for some commodity - perhaps salt?" | Route; Local people | none | C | S1 verbatim. S1 adds the ware "is absent from Neronian Usk although appearing in forts of Flavian foundation", which supports a Flavian date |
| 28 | The forts' effect on "the local agricultural economy" is an open question | Local people | none | C | S1 verbatim (plant-remains assessment) |
| 29 | Ditched enclosure NE of the forts might be "a practice camp" or part of the 18th-century park | Camps | none | P | S1: "perhaps a practice camp" or "did it form part of the later designed landscape?" "18th-century" is not in the source |
| 30 | Road found "to the northeast of Cwmifor in the area of Down Farm", may "underlie the course of the current A40 as it approaches Rhosmaen", and "to the west of Llandeilo between Broadoak and Llanegwad" | Tywi road | none | C | S1 verbatim (citing James and James 1984) |
| 31 | "The obvious place for a Roman fort that were frequently spaced a day's march apart" | Spacing | none | C | S1 verbatim; Hughes is reporting the pre-2003 expectation, citing James 2000 |
| 32 | Fort 1 19.4km from Llandovery and 20.9km from Carmarthen, about 13 and 14 Roman miles | Spacing | none | C | Recomputed from the Coflein grid references: 19.4km (13.1 RM) and 20.9km (14.1 RM) |
| 33 | Vegetius I.9: 20 Roman miles in five summer hours at the military step; I.19 loads up to 60 pounds | Spacing | none | C | S52: *Militari ergo gradu XX milia passuum horis quinque dumtaxat aestiuis*; *Pondus ... usque ad LX libras*. [Latin Library](https://www.thelatinlibrary.com/vegetius1.html) |
| 34 | Llandovery fort: "thought to be that of Alabum, established in the 70s AD during the Flavian advance"; four roads meet; 180 x 140m; abandoned about AD 130; SN 76978 35145; 18.9km from centre | Route table | none | C | S14 verbatim; grid "SN7697835145". [Coflein 92853](https://coflein.gov.uk/en/site/92853/) |
| 35 | Llandovery's start date: Coflein's 70s, single-source; the 50s start only a Wikipedia lead | Route; Open questions | none | P | Heneb HLCA 212: "The Romans established a fort at Llanfair-ar-y-bryn (Alabum) in the north of the present town, probably in the AD 50s". A regional-trust source now states the earlier date, so the start is **contested** (Coflein 70s vs Heneb probably 50s), not a lead. [Heneb](https://heneb.org.uk/hcla/towy-valley/212-llandovery/) |
| 36 | Alabum is known only from the Ravenna Cosmography, between Bremia and Cicucium; identified in 1949 from the order of places | Route | none | C | S15 verbatim; S16 ("In 1949 the Llandovery site was identified as a good fit"; "from the arrangement of the named places along the Roman road network") |
| 37 | Wikipedia cites DAT HER 4072 for "a possible earlier (50s AD) beginning" | Route | none | C | S16 verbatim. The HER record itself was not reached; see row 35 for Heneb's own statement |
| 38 | Carmarthen fort "occupied from about 75 AD to at least 100 AD ... commanding the lowest river crossing of the Towy"; SN 41450 20040 | Route table | none | C | S33 verbatim; grid "SN4145020040"; cross-checked with S35 ("believed to date from about AD 75"). [Coflein 92890](https://coflein.gov.uk/en/site/92890/) |
| 39 | Moridunum "thought to be the civitas capital of the Demetae"; the name means "sea fort" | Route; Local people | none | C | S34 verbatim; S35 ("lit. 'sea fort'"); S58 (*Moridunum Demetarum*) |
| 40 | Pumsaint and Dolaucothi "occupied, or in use, in the later 1st to the earlier second century AD"; S39 "established c. A.D. 75 and manned until about 140" | Route table | none | X | S36 confirmed. But Coflein's fort record NPRN 303908 (not fetched by the note): the site "began as an auxiliary fort in the mid AD 70s and ... this was reduced in size around AD 100 before eventual abandonment in the AD 120s". The c. 75 start is now cross-checked; S39's "about 140" is contradicted. [Coflein 303908](https://coflein.gov.uk/en/site/303908/) |
| 41 | Brecon Gaer: "a unit of cavalry, some 500 strong, in the late first and earlier second century"; SO 00340 29660 | Route table | none | C | S40 verbatim; grid confirmed |
| 42 | Usk: fortress of the 50s AD, "a legion of 5,000", "twenty years later both legion and frontier had moved on"; SO 37840 00520 | Route table | none | C | S41 verbatim; grid confirmed |
| 43 | "The legion moved from Usk to Caerleon about AD 75" | Which way | none | P | S41 does not name the legion or say where it went; S42 says only that Caerleon was "established in about 75 AD as the base for the Second Augustan Legion". The move is inference |
| 44 | Caerleon "established in about 75 AD as the base for the Second Augustan Legion"; Cadw "dates from AD 75"; ST 33950 90600 | Route table | none | C | S42 and S32 verbatim; grid confirmed |
| 45 | Tywi road NPRN 400971: Llandovery to Carmarthen, part of Margary 623; sources Margary 1957, Jones 1972, James and James 1984 | Tywi road | none | C | S17 verbatim (also James 1991). It spells it "Twyi" |
| 46 | The ten road segments: lengths, line grid refs, evidence, and distances from centre | Tywi road table | none | C | All ten Coflein records match (S18-S27). Distances reproduce from each record's own grid reference. 86918's "SN7253205" is printed so; 86914 is "thought to be part of" the road; 86920 is "just outside" (16.4km > 16.09km) |
| 47 | Llandeilo parchmark NPRN 423995, SN 62700 22900: "suggesting survival of Roman road agger entering Llandeilo", 22 July 2013 | Tywi road table | none | C | S18 verbatim |
| 48 | Inside the forts a road heads NE out of Fort 2, and roadside ditches link with the road towards Carmarthen | Tywi road | none | C | S1 verbatim: "a road heading northeast out of the front entrance of Fort 2"; it "links up with the observed sections of the Roman road heading westwards towards Carmarthen" |
| 49 | The road's construction date is not known | Tywi road | none | C | No source read gives one; Coflein gives no date |
| 50 | "Via Julia" has no Roman authority; do not use it in-world | Names | none | C | Independent: Codrington (1903): "On this hint the author of the spurious Itinerary of Richard of Cirencester gave the name Via Julia ... The only authority for this name is the reference above mentioned" (Necham's poem, 1215-25). Coflein 421757 also says the road is only "sometimes referred to as the Via Julia". [Lacus Curtius](https://penelope.uchicago.edu/Thayer/E/Gazetteer/Periods/Roman/Topics/Engineering/roads/Britain/_Texts/CODROM/10*.html) |
| 51 | Dahm repeats the Via Julia name | Names | none | C | S10: Frontinus "began the via Julia which can still be seen" |
| 52 | Coflein uses "Sarn Helen" for the road north from Llandovery; NPRN 402902 raised embankment c. 8.5m wide | Names | none | C | S38 and S37 verbatim |
| 53 | Sarn Helen's name "is medieval or later" | Names | none | NS | No source is cited and none read gives the name's date |
| 54 | Y Pigwn (SN 82750 31200): "Two superimposed Roman temporary camps ... It can be assumed that they mark the passage of two Roman armies at the time of the conquest of the area in the 70s AD ... both facing towards the south-west"; 15ha and 9.8ha, larger earlier, claviculae | Which way | none | C | S29 verbatim; grid confirmed. Coflein's own text gives the road record as "NPRN 304405", apparently a typo for 304504 (S28) |
| 55 | People's Collection: the Y Pigwn camps "represent different campaigns by the Roman army in southern Wales in the first century AD" | Which way | none | C | S31 verbatim (it gives the later camp as 10ha) |
| 56 | Arosfa Garreg (SN 80180 26295): 17.8ha temporary camp "of the type constructed by armies whilst on campaign"; bank 2m wide, 0.5m high; claviculae; no date or route | Which way; Camps | none | C | S30 verbatim; 17.7km from centre recomputed |
| 57 | No marching or practice camp is recorded inside the 10 miles | Camps | none | P | Consistent with everything read (roman-britain.co.uk's nearest sites are around Llandovery), but the "Coflein searches" behind it are not citable to S30 and could not be repeated |
| 58 | Cwmargenau (SN 71610 34550), 27 x 33m, possible fortlet, possibly medieval or later | Camps | none | C | S43 verbatim ("shape, size and position" vs a local tradition of buildings) |
| 59 | The only local Roman inscription is the lost milestone of the emperor Tacitus (RIB 2262), AD 275-276, seen by Lhwyd in 1697 | Force | none | P | RIB 2262 confirms "Seen in 1697 reused as the cornerstone of a small farm-house near Dynevor", date "a.d. 275-6", now lost, original position unknown. But S44 records a second inscribed stone (of Postumus), found on Trecastle Hill in 1769 and later kept "at Newton near Llandilo". [RIB 2262](https://romaninscriptionsofbritain.org/inscriptions/2262) |
| 60 | Josephus III.6.2: Vespasian's order of march in thirteen stages | Column | none | C | S45 verbatim, every stage in order. The year (AD 67) is not in the passage but is standard for the Galilee campaign |
| 61 | Josephus III.5.1-2: they wall the camp before fighting; levelled, "four-square by measure", towers, four gates, streets, commanders' tents in the middle and the general's at the very middle; a trench "four cubits" deep "if occasion require" | Marching camp | none | C | S46 and S47 verbatim |
| 62 | Josephus III.5.3: each company is brought wood, corn and water and they eat together; "sleeping, and watching, and rising are notified beforehand by the sound of trumpets" | Marching camp; Sounds | none | C | S48 verbatim |
| 63 | Josephus III.5.4: three trumpet calls (strike tents; load mules and fire the camp; march); the crier asks thrice "in their own tongue"; "We are ready", right hands raised | Sounds; cutscene table | none | C | S49 verbatim. The crier stands "at the general's right hand" |
| 64 | Josephus III.5.5: "they all march without noise"; foot have breastplates, head-pieces, spear and long buckler, saw, basket, pick-axe, axe, thong, hook, three days' food; swords on each side, left one longer; horsemen's long sword, pole, shield, three or more darts | Kit; Sounds | none | C | S50 verbatim. The note's caution about the two swords is fair: the right-hand one is "not longer than a span" |
| 65 | Josephus VI.1.8: "shoes all full of thick and sharp nails as had every one of the other soldiers"; the fall made "a very great noise, which was made by his armor" | Sounds | none | C | S51 verbatim |
| 66 | Vegetius II.22: tuba for battle, retreat and work; cornu when the standards move; both in battle; the *classicum* played by *bucinatores* on the cornu as the commander's call | Sounds | none | C | S53 verbatim. Vegetius ties the classicum to *imperium*, sounded "imperatore praesente" or at an execution, so "commander's call" is a fair gloss. [Latin Library](https://www.thelatinlibrary.com/vegetius2.html) |
| 67 | Pompeii cornua (Naples), 90-100 dB at 5m, one six-note harmonic series, many notes "not in harmony", poor for melody, nearest modern instrument the flugelhorn; Vendries and IRCAM | Sounds | none | C | S54 via WebFetch, all quoted. The book's 2017 date was not in what came back. [APS](https://physics.aps.org/articles/v13/32) |
| 68 | Plate cuirass "part of the standard equipment of Roman legionaries from the 1st to the 3rd century AD"; near-complete example from Kalkriese (AD 9); best pieces from Corbridge and Newstead, 2nd century | Kit | none | C | S55 verbatim. [CWA](https://www.world-archaeology.com/world/europe/germany/uncovering-kalkriese/) |
| 69 | Legionaries' pila, short swords and long curved shields vs auxiliaries' "smaller, flat ovals" and "simple spears"; "no formal uniform other than the belt"; mail shirt from Arbeia; hobnailed sandal | Kit | none | C | S56 verbatim. The Arbeia mail was "probably worn by a member of the 5th cohort of Gauls", an auxiliary. [Current Archaeology](https://archaeology.co.uk/articles/features/legion.htm) |
| 70 | Wikipedia: Trajan's Column reliefs safest read as "impressions"; plate armour at auxiliary sites; citing Bishop 2002 | Kit | none | C | S57 verbatim; the reference is Bishop, *Lorica Segmentata* I (2002) |
| 71 | Marching camps in Wales: "around thirty", "a single season's campaign", "1.3ha up to almost 20 ha", square with rounded corners, single ditch and rampart, eight men to a tent | Marching camp | none | C | S31 verbatim. [People's Collection](https://www.peoplescollection.wales/content/roman-army-campaign) |

Also checked and confirmed without a table row: Garn Goch is at SN 69120 24320 (Coflein 100866) and
7.2km from Fort 1; Llys Brychan's finds "suggested occupation in the 3rd-4th centuries AD" (S60);
Ptolemy's *Luentinum* is linked to Pumsaint only by later scholarship (S39), as the note says.

## Not in the note: a lead

roman-britain.co.uk's own page on the Dinefwr forts argues that the large fort was "possibly ...
established during the tenure of governor Quintus Veranius, who administrated Britain during A.D.
57/58", and calls a Frontinus foundation "less likely in the author's opinion". It is an enthusiast
site, and it places Veranius's campaign in "south-west Wales" where Tacitus names only the Silures, so
it carries little weight. But together with Heneb on Llandovery (row 35) and Hughes's "an earlier date
for Fort 1 cannot be ruled out", it means a pre-Flavian arrival is a live reading, not a footnote.
[roman-britain.co.uk](https://www.roman-britain.co.uk/places/llandeilo/)

## Corrections needed

In `roman-arrival.md`, by priority. Items 1-3 change what the cutscene would say.

1. **Date caption and framing (rows 16, 35).** Keep "c. AD 74 to 77, perhaps soon after 74; an
   earlier date is not ruled out", but do not present the scene as the *first* Roman arrival in the
   valley without an ⓘ. Add: "Heneb dates the Llandovery fort to probably the AD 50s, so Roman soldiers
   may already have been in the upper valley." Move the Llandovery start from "lead only" to
   **contested** (Coflein 70s vs Heneb probably 50s) in the route table and Open questions.
2. **Governor caption (row 10).** "Julius Frontinus (governor c. 73/74 to 77, or 78)". Add the Oxford
   *Companion* (73/4–77) as the independent source; the "cross-checked, but both rest on Birley" label
   should become cross-checked with a non-Birley source.
3. **Cavalry (row 21).** In the cutscene table: barley is consistent with "a cavalry unit or a large
   infantry or mixed unit", so show horsemen as possible, not implied by the evidence.
4. **Agricola (row 11).** Add the Oxford *Companion* reading (consul in 77, "probably arrived ... late
   in that year") beside Tacitus's "about midsummer"; keep "77 or 78".
5. **Pumsaint (row 40).** Add Coflein NPRN 303908 as a source: fort from the mid-70s, reduced c. 100,
   abandoned in the 120s. Mark S39's "until about 140" as contradicted.
6. **Via Julia (row 50).** Replace "search results ... point to 18th-century antiquaries" with
   Codrington's statement that the name comes from the spurious *Richard of Cirencester* itinerary,
   and close that Open question.
7. **Sarn Helen (row 53).** Source "medieval or later" or delete it.
8. **Milestone (row 59).** "The only Roman inscription seen at Llandeilo is the lost milestone of the
   emperor Tacitus (RIB 2262)"; note the second, Postumus stone came from Trecastle Hill.
9. **Usk to Caerleon (row 43)** is inference; label it so.
10. **Practice camp (row 29).** "Or part of the later designed landscape", not "the 18th-century park".
11. **Veranius (row 6).** Source the AD 57-58 governorship separately; *Annals* XIV.29 is the annal
    for AD 61.
12. **Y Pigwn (row 54).** Note that Coflein's own text gives the road as "NPRN 304405", an apparent
    typo for 304504.

No change is needed to `src/content/events.ts:112` or `src/content/features.ts:219` from this check:
both already say an earlier date for Fort 1 cannot be ruled out.
