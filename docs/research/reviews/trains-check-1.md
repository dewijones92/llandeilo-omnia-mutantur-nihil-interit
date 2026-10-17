---
title: Check 1 of trains.md (same agent)
kind: review
status: current
updated: 2026-10-17
---

# Check 1: the trains through Llandeilo

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
