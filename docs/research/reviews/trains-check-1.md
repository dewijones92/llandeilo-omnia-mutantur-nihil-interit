---
title: Check 1 of trains.md (part 1 same agent, part 2 independent)
kind: review
status: current
updated: 2026-10-17
---

# Check 1: the trains through Llandeilo

Two parts, one file: **part 1** is the writer's own re-read (below, not independent); **part 2** is the independent check of
2026-10-17 and what was done about it (after part 1's "Not checked" list). The independent reviewer's own list of what it
confirmed is recorded in part 2, where a second file (check 2) would otherwise have held it.

Reviewed note: [`../trains.md`](../trains.md) (status: draft, 2026-10-17). Written by the agent that wrote the note, the
same day, by re-reading the downloaded sources; **not independent**, and the todo path still owes an independent check
by a second Opus.

## Method

Each key claim was re-read against the file or page it cites: the Glanrhyd report's text layer (`railwaylater:S8`,
paragraphs 4-7), Porterbrook's brochure text (S5, pp. 16-17), the Science Museum Group record (S1, read through a
fetch), the wikitext of the Black Five, Fowler 2-6-4T, 57xx, 6400, Prince of Wales tank, Class 101/102, 108, 120, 153
and Mark 1 pages (leads), the HMRS pages (S8, S9), the Middleton Press page (S10), railcar.co.uk's feature and record
(S6, S7, both through a summarising fetch, so their quotations are the fetch's and should be re-read as raw HTML by the
independent check), the four photographs, and the LiDAR samples (re-run once).

## Claims checked

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Car 52037: Class 108 DMS, built 1960, 17.70m, 28.5 tonnes, full-width cab, two-car DMU, 05.27 Swansea-Shrewsbury | Confirmed | Report para. 4-5: "a Class 108 driving motor second No. 52037 ... built in 1960, was 17.70m long and weighed 28.5 tonnes" |
| 2 | Class 153: 23.21m, 2.70m, 3.77m; "23 metre body"; four single-leaf swing-plug doors | Confirmed | Brochure p. 16-17 text layer |
| 3 | Black Five: 63 ft 8 in over buffers, 8 ft 8 in wide, 1,829 mm wheels, 72 tons 2 cwt | Confirmed (through a fetch) | S1, as quoted by the fetch; the raw page did not return JSON to curl |
| 4 | 45190 at Llandilo 29 Aug 1959 on the 12 noon from Shrewsbury | Confirmed | Terry Norman's page text, re-fetched: "locomotive 45190 heads the 12 noon from Shrewsbury travelling to Swansea. ... (Photo taken 29th August 1959.)" |
| 5 | 45190 built by Armstrong Whitworth 1935, domeless, boilers swapped | Partly | The lead's batch table: "5125–5224 ... 1935 ... Armstrong Whitworth ... Domeless"; text: boilers "fitted indiscriminately to any of the first 225 engines". A lead only |
| 6 | Fowler 2-6-4T dimensions | Confirmed (as the lead says) | Infobox: 1927–1934, 125, 5 ft 9 in, 3 ft 3½ in, 38.5 ft, 47 ft 2¾ in, 86.25 LT |
| 7 | Prince of Wales tanks on Shrewsbury-Swansea "from an early date"; replaced from 1935 by Fowler and Stanier 2-6-4Ts | Confirmed (as the lead says) | Wikitext, History and LMS service sections; no inline reference |
| 8 | HMRS LMS rule 1923-27 / 1928 | Confirmed | S9 as fetched |
| 9 | Maroon 1956 vs 1957 | Confirmed as a contradiction | `railwaylater:S47` (1956, per that note); S8 "LINED MAROON LIVERY (1957-64 ...)" |
| 10 | Class 120 at Llandeilo 1977, 1978, 1980; 101 1982-84; 108 late 1980s and c. 1990 | Confirmed (through a fetch) | S6's captions as returned by the fetch |
| 11 | The two c. 1900 postcards are one photograph, the engine black on one and green on the other | Confirmed | Both full images looked at side by side |
| 12 | Track bearing N 14° E; platforms 1.0-1.2m above a 29.9m OD bed, about 100m long, centred near (263345, 222555) | Confirmed (re-measured) | `gdallocationinfo` on tile SN6322 every 10m along OS's loop at ±5m and ±8m; cross-sections at three northings |
| 13 | The app's `LLANDEILO_STATION` is 28m west of the track | Confirmed | OS track between (263286, 222329) and (263300, 222387) gives E 263294 at N 222361 |
| 14 | The Llanelly line was standard ("narrow") gauge | Confirmed | `railway:S5` quoting Neele (1904): "This Llanelly group of lines, all narrow gauge"; and the 1852 crossing, where the SWR "had no wish to acquire a narrow gauge ... mineral branch line" |

## Not checked

- The raw HTML of S1, S6 and S7 (read through a summarising fetch only).
- Any second source for the Fowler tank's, the pannier's, the Class 101's and the Class 120's dimensions.
- Organ (2009) and Denman (2012) themselves.

---

# Part 2: the independent check, 2026-10-17

By a second reviewer who re-read the sources directly (raw HTML for railcar.co.uk, the Glanrhyd report, the Porterbrook
brochure, Coflein, the HMRS pages), looked at the photographs, and re-measured the LiDAR. Each finding was then
re-verified by the fixer against the source before anything was changed. All 13 findings stood; one needed a nuance.

| # | Severity | Finding | Verdict | Verified how | What was done |
|---|---|---|---|---|---|
| 1 | CRITICAL | Class 120s at Llandeilo were two-car pairs, not three-car units | **Confirmed, with a nuance** | railcar.co.uk's feature as raw HTML: "pairs of class 120 'Cross Country' motor coaches"; C603 at Llandeilo 7 Jan 1977 "presumably 50724 + 50673"; C601 "2-car" at Knighton; "power twins ... mostly class 120" in the early 1980s. But a **three-car** set did stand at Llandeilo: C611 in 1980 (50662, 59260, 50669 [sic]) on railcar.co.uk's record of 59260. So two cars was normal, three happened | Summary row, Phase 5 text, contested row, open-questions row, findings.md and the 120 plan row rewritten; plan says two cars with a three-car variant |
| 2 | IMPORTANT | The 1980 Llandeilo caption "50662, 59260 & 50669" is not on S6 | **Confirmed** | grep of S6's raw HTML: 0 hits for 50669; the caption is on https://railcar.co.uk/data/vehicle/59260 ("Date: 1980 Set number: c611 ... Peter Shoesmith"). S6's own text gives C611 as "50699, 59260 and 50662" at Shrewsbury, and the 59260 record lists 50699 in the set elsewhere, so 50669 is probably a typo (kept as a contested row, not corrected silently) | New source `trains:S14`; the sighting re-cited; S6's description corrected |
| 3 | IMPORTANT | BR steam phase draws only a Black Five to 1964, against `railwaylater:S1`'s Standard 5s | **Confirmed** | `railway-later.md` lines 229-232: Black Fives replaced by Standard 5s "from 1960 onwards", "monopolised" by 1961 (S1), and 73018 and 73025 at Swansea Victoria in 1954 (S4) | Phase split: `train-br-steam` 1948-c. 1960, new `train-br-standard5` c. 1960-13 June 1964, new `br/standard-5` plan row (no dimensions found: a gap), contested row for the start (1954 or 1960) |
| 4 | IMPORTANT | LNWR trains before 1873 dropped; caveat lost from `railway-locomotives.md` | **Confirmed** | `railway-locomotives.md` lines 112-114 and `railway-later.md` lines 69-70, as quoted | Phase 1 bullet, summary parenthesis, contested row, open-questions row. `train-llanelly` still ends 31 Dec 1872 (the company's own lines passed to the GWR); the caveat goes in its ⓘ |
| 5 | IMPORTANT | Owner of the c. 1900 and 1914-18 trains given as LNWR though the GWR also ran here | **Confirmed** | `railway-later.md` Summary: the GWR ran "just a few trains" north (S10); the postcards and the Harries print show no owner | Tier and texture columns say "owner not identifiable"; ids keep the `lnwr` names with the assumption recorded beside them; contested row; gap |
| 6 | IMPORTANT | Livery tiers inflated (Wikipedia-only called documented or cross-checked) | **Confirmed** | `railwaylater:S46` and `S47`, `S49` and `S48` are all Wikipedia pages; `S44` (LNWR Society) and HMRS `S8`, `S9` are single non-Wikipedia sources. A search for a second, non-Wikipedia source for LMS carriage lake found only a retailer's notes (not used) | LMS carriage crimson lake and BR unlined black tanks and lined black steam: reconstructed (from leads). LNWR black, LMS engine rule, BR carriage crimson and cream, TfW: documented (one source). Summary, Phases 2-4, plan tables, findings.md updated |
| 7 | SUGGESTION | "About 1.1km of line on each side" is wrong to the north | **Confirmed** | Area centre (262930, 222236), half-size 750, so N 222986; 444m along N 14 E from the platform centre; the tile E 263000, N 223000 is step 10 in `lidar.json` | 1.1km south, 0.45km north; a 2m tile at E 263000-263500, N 223000-223500 suggested |
| 8 | SUGGESTION | App point to Coflein is 231m, not 240m | **Confirmed** | hypot(74, 219) = 231.2 | Fixed in trains.md, findings.md and the open-questions row (with a dated note that 240m was inherited) |
| 9 | SUGGESTION | S11 says "view south" against the body's "probably north" | **Confirmed** | The town's houses on the hill to the left means looking north; Terry Norman's 1959 captions from that end say "Looking north" | S11 now "probably north", corrected-note in the source line |
| 10 | SUGGESTION | Black Five length said to "agree with the class page" | **Confirmed** | `railwaylater:S48`: 63 ft 7¾ in or 63 ft 11¾ in, no width | Reworded: documented (one source), the lead within 4 in on length and silent on width |
| 11 | SUGGESTION | "a flood at Llandeilo" is not verbatim | **Confirmed** | The 52037 record's raw text reads "Llandelio flood" | Quoted as "Llandelio flood" [sic] |
| 12 | SUGGESTION | 1914-18 carriages called "bogie" though the print hides the running gear | **Confirmed** | The photograph (crowd and platform) | Shape "bogie or six-wheeled: not visible"; bogie marked imagined |
| 13 | SUGGESTION | Welsh place names only in English | **Confirmed** | CLAUDE.md "Welsh place names first" | A names paragraph: Abertawe, Caerfyrddin, Rhydaman, Llanymddyfri, Tref-y-clawdd, Amwythig; Rhydaman at first use; Builth Road's Welsh form not checked (said so) |

## What the independent check confirmed (its own record)

Re-read directly on 2026-10-17. Coflein NPRN 80442: grid reference SN6334022580, with the 1993 captions "Main station
building on West side", "Signal box on E platform" and "Weighhouse on East side of station". Glanrhyd report: "05.27 ...
two car DMU"; "52037 ... built in 1960, was 17.70m long and weighed 28.5 tonnes". Porterbrook brochure: 23.21m, 2.70m,
3.77m, ATW 3 vehicles, BSI couplers, 75mph, January 2014. HMRS S8 and S9 quotes verbatim. Middleton Press blurb verbatim
(ISBN 9781906008468). Terry Norman: 9645 in the bay at 3:25 to Carmarthen and 45190 on the 12 noon from Shrewsbury, both 29
Aug 1959. The Wikipedia leads (Fowler 2-6-4T, Prince of Wales tank, 101/102, 108, 120, Black Five, 57xx, 153) match the
note. LiDAR re-measured on tile SN6322 with gdallocationinfo: bed 29.9m OD; east platform 30.9-31.0m from N about 222500
to 222610; west platform 31.1m, so 1.0-1.2m high and about 100-110m long. Hillshade scale and markers right (0.5m per
pixel). `sources.ts` regenerated in a scratch copy was byte-identical, no existing id changed. Science Museum Group's S1
figures confirmed from the raw record.

## What the fixer re-checked

Pages re-fetched as raw HTML on 2026-10-17: railcar.co.uk's Heart of Wales feature (S6), the vehicle records of 52037 (S7)
and 59260 (new S14). Numbers recomputed: the 231m and 444m / 1,102m distances; tile steps from `lidar.json`. Still not read:
Organ (2009), Denman (2012), the 1905 25-inch map, and any measured drawing for the Black Five's height or a Standard 5.
