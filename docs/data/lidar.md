---
title: Close-up terrain from Welsh Government LiDAR
kind: guide
status: current
updated: 2026-10-23
---

# Close-up terrain from Welsh Government LiDAR

The data behind the detailed ground at Llandeilo town, the Roman forts in Dinefwr Park, since
2026-10-16 the Dinefwr Castle hill, and since 2026-10-23 the crag of Carreg Cennen and the hill of Dryslwyn,
each of those two in a detail region of its own ([below](#several-regions-carreg-cennen-and-dryslwyn-2026-10-23);
[GitHub issue 2](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/2),
[issue 4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4),
[ADR 0049](../adr/0049-lidar-terrain-tiles-blended-into-terrain-50.md)). Written by Claude under the
proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
2026-10-09; the licence and accuracy statements were read from the sources named, on that date.

## What it is

| | |
|---|---|
| Product | The Welsh Government LiDAR **DTM** (digital terrain model: bare earth, buildings and most vegetation removed), 1m, from the 2020-22 national survey. The DataMapWales layer is "Welsh Government LiDAR tile catalogue 2020-2023" |
| Publisher | Welsh Government (Geography & Technology), through [DataMapWales](https://datamap.gov.wales/) |
| Resolution | 1m, one GeoTIFF per 1km tile (1000 x 1000 cells), Float32, DEFLATE, about 2MB each |
| Coordinate system | EPSG:27700, OSGB36 / British National Grid, read from every file with `gdalinfo`. Pixels are areas (`AREA_OR_POINT=Area`); the origin is the tile's north-west corner |
| Vertical datum | **Not stated** by any DataMapWales page or file. Against OS Terrain 50 (heights above Ordnance Datum Newlyn) over the whole region it reads 0.19m low on average (absolute mean 0.59m, 95% within 1.7m, 7,296 points), which is what 1m LiDAR averaged against 50m cells should give if both use Ordnance Datum. `tests/lidar.test.ts` keeps a looser version of that check |
| Vertical accuracy | **Not stated** on the DataMapWales pages. (The Environment Agency's England LiDAR states +/-15cm RMSE; that is another programme and is not assumed here) |
| Gaps | None in any region: 100% valid, no nodata cells (checked by the build for all three regions on 2026-10-23). The DTM still holds some things a bare-earth model should not: tree clumps show as low rings in a hillshade of Dinefwr Park, and walls and bridges as ridges |

## Licence and credit, as stated

Three places say something, and they differ. Dewi's instruction (2026-10-09) is to ignore licence
problems and credit the source, so this is recorded rather than resolved.

1. **The files.** The GeoTIFFs carry no licence, copyright or attribution tag (`gdalinfo` shows only
   the projection, `AREA_OR_POINT=Area`, DEFLATE and the nodata value).
2. **The tile catalogue's own metadata** (`datamap.gov.wales/layers/geonode:welsh_government_lidar_tile_catalogue_2020_2023`,
   published 27 September 2024): licence **not specified**, copyright "Not applicable", no credit, a link
   to a "Usage Policy" that was not followed. Contact `data@gov.wales`.
3. **The metadata of the "LiDAR Data download" page** (`datamap.gov.wales/maps/6969/metadata_detail`,
   published 23 September 2024): **Open Government Licence for Public Sector Information, version 3**;
   copyright and credit not stated. It adds one limitation: the data "was not created specifically for
   flood modelling", so it may need cleaning before use for that, which does not touch a diorama.

The credit the app shows is written once, by `build-lidar.py`, into `public/data/lidar/lidar.json`
(`source.credit`) and, from the same string, into `src/content/generated/lidar-credit.ts`, which
`src/content/assets.ts` imports for the About page (so the 20.7KB manifest is not bundled into the app to read
one sentence; `tests/lidar.test.ts` checks the two agree): *Contains Welsh
Government data (LiDAR 1m DTM from the 2020-22 national survey, these tiles dated 01/12/2021 to
22/02/2022 in their file names), via DataMapWales. Licence stated on the DataMapWales download page:
Open Government Licence v3.0.* The catalogue's own silence is noted beside it in `assets.ts`. Nothing is
"all rights reserved", so ADR 0026 holds. The download page's copyright field reads "None".

## Exactly how it was downloaded

`tools/terrain/fetch-lidar.sh` (run 2026-10-09), with no account or key:

1. Read the region from `tools/terrain/lidar-areas.json` (E 260000 to 265000, N 220500 to 224500). *Since
   2026-10-23 the file lists several regions, and the script asks the catalogue once for each and merges the
   answers into one `catalogue.json` and one `links.txt`, each tile once; see
   [Several regions](#several-regions-carreg-cennen-and-dryslwyn-2026-10-23) for that run.*
2. Ask the catalogue's WFS for the 1km tiles that touch it:
   `https://datamap.gov.wales/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=geonode:welsh_government_lidar_tile_catalogue_2020_2023&outputFormat=application/json&cql_filter=BBOX(geom,260000,220500,265000,224500,'EPSG:27700')`.
   Each feature has `british_gr` (the tile, e.g. `SN6222`, whose south-west corner is E 262000 N 222000),
   `dtm_link`, `dsm_link`, `delivery` and `date`. The catalogue holds 22,473 tiles for Wales.
3. Download each `dtm_link` over HTTPS from the Azure blob store the catalogue names,
   `https://dmwproductionblob.blob.core.windows.net/lidar-zips/2020-22/dtm/wg_del_<delivery>_<tile>_<date>dtm.tif`,
   resuming a partial file, skipping one whose size matches the server's `Content-Length`.
4. Result: 25 files, 48MB, in `~/code/data/llandeilo/lidar/raw/` (outside the repository, never
   committed; `*.tif` is in `.gitignore` as a second guard). `build-lidar.py` records the name, size and
   SHA-256 of each in `public/data/lidar/lidar.json`, and `python3 tools/terrain/build-lidar.py --verify`
   checks the raw files against them (it fails on a changed file, a missing one, or a stray `.tif`). The
   build reads the file list from `links.txt`, not from a glob, so a raster left over from a wider region is
   never built or credited.

The catalogue's `date` column and the date in the file name disagree for 16 of the 25 tiles (checked
2026-10-10 from `surveyDate` and `fileDate` in the manifest, which keeps both). Ten differ by one day, the
file name a day before the catalogue (SN6023, SN6024, SN6123, SN6124, SN6223, SN6224, SN6323, SN6324,
SN6423, SN6424: file 1 December 2021, catalogue 2 December), which fits flights just after midnight, not
checked against the catalogue's start times. SN6421 differs by one day the other way (catalogue 12 January
2022, file 13 January). Five differ by weeks: SN6022, SN6122, SN6222 and SN6322 (catalogue 13 January 2022,
file 22 February) and SN6422 (catalogue 2 December 2021, file 12 January). (An earlier version of this
note said five.) The file names date the tiles December 2021 to February 2022; the catalogue's dates run
from 2 December 2021 to 13 January 2022. Which is the flight date is not known, so the credit says
"dated ... in their file names".

## The tiles

| Tile | File | Flown (catalogue) | Bytes | SHA-256 (first 16) |
|---|---|---|---|---|
| SN6020 | `wg_del_26_260220_20220113dtm.tif` | 13-01-2022 | 1,935,484 | `d9fca8e10eeefee6` |
| SN6021 | `wg_del_26_260221_20220113dtm.tif` | 13-01-2022 | 1,539,760 | `6b3492b1222fc317` |
| SN6022 | `wg_del_26_260222_20220222dtm.tif` | 13-01-2022 | 1,957,890 | `5b922d007de49f88` |
| SN6023 | `wg_del_18_260223_20211201dtm.tif` | 02-12-2021 | 1,972,073 | `d48feebbb002a0de` |
| SN6024 | `wg_del_18_260224_20211201dtm.tif` | 02-12-2021 | 2,201,209 | `61d61d789752c09e` |
| SN6120 | `wg_del_26_261220_20220113dtm.tif` | 13-01-2022 | 2,070,472 | `5d28b51cc1e646ec` |
| SN6121 | `wg_del_26_261221_20220113dtm.tif` | 13-01-2022 | 1,716,486 | `86eabc79b4f7a4fe` |
| SN6122 | `wg_del_26_261222_20220222dtm.tif` | 13-01-2022 | 2,101,230 | `bd0b11feaedf1a90` |
| SN6123 | `wg_del_18_261223_20211201dtm.tif` | 02-12-2021 | 1,920,190 | `cd2ef70d2812c124` |
| SN6124 | `wg_del_18_261224_20211201dtm.tif` | 02-12-2021 | 2,268,703 | `da2fdf0b4f439d09` |
| SN6220 | `wg_del_26_262220_20220113dtm.tif` | 13-01-2022 | 2,201,035 | `32a1bf558d02053d` |
| SN6221 | `wg_del_26_262221_20220113dtm.tif` | 13-01-2022 | 1,614,740 | `814325972f1741cb` |
| SN6222 | `wg_del_26_262222_20220222dtm.tif` | 13-01-2022 | 1,964,338 | `974051baa32ea64e` |
| SN6223 | `wg_del_18_262223_20211201dtm.tif` | 02-12-2021 | 1,956,957 | `871812e055dd9c5d` |
| SN6224 | `wg_del_18_262224_20211201dtm.tif` | 02-12-2021 | 2,289,527 | `5a4eeb5b971d9d8f` |
| SN6320 | `wg_del_21_263220_20220113dtm.tif` | 13-01-2022 | 2,389,424 | `1463b8d606e8709f` |
| SN6321 | `wg_del_26_263221_20220113dtm.tif` | 13-01-2022 | 1,944,677 | `74b3e42ba13f45c5` |
| SN6322 | `wg_del_26_263222_20220222dtm.tif` | 13-01-2022 | 1,841,507 | `3714fdacc2945cb3` |
| SN6323 | `wg_del_18_263223_20211201dtm.tif` | 02-12-2021 | 1,701,304 | `daa6948ffb84377a` |
| SN6324 | `wg_del_18_263224_20211201dtm.tif` | 02-12-2021 | 2,074,011 | `4170a02789cdcb55` |
| SN6420 | `wg_del_21_264220_20220113dtm.tif` | 13-01-2022 | 2,359,013 | `3c0b505ed8e14952` |
| SN6421 | `wg_del_21_264221_20220113dtm.tif` | 12-01-2022 | 2,346,608 | `a7e15b127cb3d7c8` |
| SN6422 | `wg_del_20_264222_20220112dtm.tif` | 02-12-2021 | 2,291,325 | `f00d025707132620` |
| SN6423 | `wg_del_18_264223_20211201dtm.tif` | 02-12-2021 | 1,462,248 | `af0f368edc4c2efd` |
| SN6424 | `wg_del_18_264224_20211201dtm.tif` | 02-12-2021 | 1,680,417 | `c76649d0b9020b51` |

The full hashes are in `public/data/lidar/lidar.json` (`source.tiles`).

## The areas and the region

`tools/terrain/lidar-areas.json` is the one place that says where detail goes; the manifest copies it.

| Area | Centre (OS grid) | Square | Tiles at 2m | Why there |
|---|---|---|---|---|
| `llandeilo` | E 262930, N 222236 | 1.5km (E 262180 to 263680, N 221486 to 222986) | 16 | The `llandeilo` place's own reference |
| `roman-forts` | E 262187, N 222534 | 1km (E 261687 to 262687, N 222034 to 223034) | 9 | The `roman-forts` place, whose reference is Coflein's |
| `dinefwr-castle` | E 261150, N 221731 | 1km (E 260650 to 261650, N 221231 to 222231) | 9 | Coflein's grid reference for Dinefwr Castle (NPRN 425, SN 61150 21731), added 2026-10-16 ([issue 4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4); below) |

These three are the areas of the first region, `llandeilo-dinefwr`; the two castles added on 2026-10-23 have
regions of their own ([below](#several-regions-carreg-cennen-and-dryslwyn-2026-10-23)).

The areas overlap (the town and the forts share 4 tiles, the forts and the castle 1: tile E 261500 N 222000),
so the 29 tiles of 500m that touch any of them are kept at 2m (3.65MB; 8 of them are the castle's, new on
2026-10-16). The **region** round them, E 260000 to 265000 and N 220500 to 224500 (5km by 4km, 80 tiles
of 500m), is kept at 10m for the other 51 tiles (0.27MB). A test (`tests/lidar.test.ts`) fails if a
place's reference is not inside its area, if the castle area's centre is not its own midpoint or is not the one
castle point the `dinefwr` place and the four castle features use (`DINEFWR_CASTLE_AT`), or does not hold the keep
and 300m each way round it, or if an area comes within the 300m blend margin of the region's edge.

### The castle area (2026-10-16)

Agreed with Dewi on 2026-10-16 (issue 4, decision log); the placing and size below are Claude's,
under the proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)).

- **Centre: Coflein's grid reference**, SN 61150 21731 (NPRN 425, [S21] in
  [`building-models.md`](../research/building-models.md)) = E 261150 N 221731. The Cadw listing (E 261149 N 221730)
  and the HER (SN 61149 21730) put it within 1.5m, so three records agree ([S1] to [S3] in the
  [Dinefwr research](../research/dinefwr-castle.md#placement), which recommends it as the feature's `at`). The
  `dinefwr` place and the four castle features were at E 261155 N 221729, 5.4m from it (`building-models.md` recorded
  that offset as 5m). **Dewi decided on 2026-10-16 to "Move the place to Coflein's"**, so the place's `at`, the
  castle features' `at` and this area's centre are now one fact, `DINEFWR_CASTLE_AT` in `src/content/places.ts`
  (the area's centre is the same numbers in `lidar-areas.json`, which Python reads, and a test holds them equal).
  The castle's flights and its model moved 5.4m with it. The other two areas are centred exactly on their place's
  `at`, and so is this one. The same research puts the keep's centre at E 261168.5 N 221724, 18.5m east and 7m south of Coflein's reference, fitted
  on the LiDAR surface model [S24]; the keep is inside the area by a wide margin. Centring the area on the keep instead was
  considered and is **not** done: Dewi's one-castle-point decision above makes Coflein's reference the centre, and a
  keep-centred area would split the area from the place and the model. The keep's fitted centre stays a research
  figure, not a placement.
- **Half-size 500m (a 1km square).** What it has to hold: the castle on its crag, its rock-cut ditches
  (Coflein: two enclosures and rock-hewn ditches) and the ground round it. A hillshade of the 1m data made for
  this note (not committed) shows (read by eye) the crag's foot 100 to 130m south of the castle and a ridge running north-east
  from it for more than 600m; 500m each way covers the crag, the escarpment and the first part of the ridge. The
  path up the hill to the barbican is not sourced in this repository, so the size does not rest on it. Tiles are 500m, so a
  half-size of 400m would touch the same nine tiles; 350m would touch six, leaving out the column east of
  E 261500. 500m was chosen to cover the ridge end and to match the forts' area, not measured against a need.
- **Source tiles: none new.** The region did not change, so all 25 of the 1km GeoTIFFs were already on disk;
  `fetch-lidar.sh` was re-run on 2026-10-16 and reported all 25 "already complete" (48MB in total), and
  `build-lidar.py --verify` matched every file's hash to the manifest. Nothing was downloaded.
- **Result:** 8 more tiles at 2m (each 126,002 bytes against 5,202 at 10m), `lidar.bin` from 2,952,960 to
  3,919,360 bytes (+966,400; gzipped 1,915,502 to 2,480,657, +565,155), `lidar.json` unchanged in size at 21KB.
  The other 72 tiles are byte for byte what they were (compared by offset, tile by tile); the only change to
  one is its manifest `areas` list (tile E 261500 N 222000 now lists both areas).
- **Checked against Terrain 50:** the tile-by-tile test (mean gap under 2m) passes for the new tiles, and a
  throwaway script on 2026-10-16 found a transposed tile would be caught in 65 of the 80 tiles (60 of 80 was
  the figure for the earlier 21 tiles in this note; the 65 is a new measurement, not a re-run of the old).

## Several regions: Carreg Cennen and Dryslwyn (2026-10-23)

Dewi decided on 2026-10-17 that each landmark built in Blender gets its own 2m LiDAR area ("Yes, per landmark").
Carreg Cennen lies south-east of the first region and Dryslwyn 4.6km west of it. Growing the one region to hold
both would have made it E 254500 to 268500 by N 218000 to 224500, about 364 tiles of 500m (the castle notes'
estimate for Carreg Cennen alone was 208), almost all of them context nobody flies into. So the terrain now takes
**several separate detail regions**, each a rectangle of tiles cut into the coarse terrain on its own, with its own
300m blend from its own rim. That design and every choice below are Claude's, under the proactive mandate
([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md);
[ADR 0049, amended 2026-10-23](../adr/0049-lidar-terrain-tiles-blended-into-terrain-50.md#amendment-2026-10-23-several-regions-carreg-cennen-and-dryslwyn)).

| Region | Bounds | Tiles of 500m | At 2m | At 10m | Bytes in `lidar.bin` | Source 1km rasters |
|---|---|---|---|---|---|---|
| `llandeilo-dinefwr` | E 260000 to 265000, N 220500 to 224500 | 80 | 29 | 51 | 3,919,360 | 25 (unchanged) |
| `carreg-cennen` | E 265500 to 268500, N 218000 to 221000 | 36 | 9 | 27 | 1,274,472 | 12 (SN6518 to SN6820) |
| `dryslwyn` | E 254500 to 256500, N 219500 to 221500 | 16 | 4 | 12 | 566,432 | 9 (SN5419 to SN5621) |

| Area | Centre (OS grid) | Square | Tiles at 2m | Why there |
|---|---|---|---|---|
| `carreg-cennen-castle` | E 266789, N 219075 | 1km (E 266289 to 267289, N 218575 to 219575) | 9 | Coflein's grid reference for Carreg Cennen Castle, SN 66789 19075 (NPRN 103970, [S1] in [`carreg-cennen.md`](../research/carreg-cennen.md#placement)), which the note recommends as the feature's `at` |
| `dryslwyn-castle` | E 255387, N 220288 | 500m (E 255137 to 255637, N 220038 to 220538) | 4 | Coflein's grid reference for Dryslwyn Castle, SN 55387 20288 (NPRN 100682, [S1] in [`dryslwyn.md`](../research/dryslwyn.md#placement)), the note's anchor |

- **Centres: Coflein's references, not the places'.** The places in `src/content/places.ts` (and the castle features
  in `features.ts`) are 14.4m from Coflein's point at Carreg Cennen (E 266801 N 219083) and 6.7m from it at Dryslwyn
  (E 255390 N 220294); both notes say so. They are **not moved** here: for Dinefwr, moving the place was Dewi's
  decision (2026-10-16), so this is left for him. A test holds each place within 20m of its area's centre. The Dryslwyn
  note proposed centring its area on E 255450 N 220375, 107m north-east of Coflein's point, to take in the borough as
  well; centring on Coflein's point instead takes the same four 2m tiles, so nothing is lost.
- **Half-sizes, from the notes and measured on the 1m DTM** (2026-10-23, a throwaway script, not committed). Carreg
  Cennen, 500m (the note's proposal): the ground steeper than 30 degrees that joins the crag reaches 222m west, 322m
  east, 140m south and 84m north of Coflein's point (steeper than 40 degrees: 98m west to 272m east, 58m south to
  66m north); the Afon Cennen's floor is at 131.3m OD 254m due south, the ward 264.9m. 500m holds the cliff, the
  river floor with 246m to spare and the approach slopes to the north and east, the note's reasons. A half-size of
  400 would take 6 tiles at 2m and leave out the approach from the north. Dryslwyn, 250m (the note's proposal): the
  hill above 30m OD that joins the castle runs 98m west to 218m east and 59m south to 231m north of Coflein's point
  (at 25m OD it merges with higher ground to the north-east, so it has no edge of its own there), and the ground 250m
  out in all four directions is floodplain at 16 to 19m OD. The 2m tiles reach further than the area in every
  direction anyway (E 255000 to 256000, N 220000 to 221000). `tests/lidar.test.ts` holds those measured points inside
  the areas.
- **Regions: the areas' 2m tiles with a ring of 10m tiles round them, on a whole kilometre.** An area must sit 300m
  inside its region (the blend), the region's edges must be whole tiles, and its sides whole multiples of the 40m rim
  spacing, so a region is a whole number of kilometres across. Dryslwyn's 2m tiles with one tile round them are
  E 254500 to 256500, N 219500 to 221500 (the note's proposed context region). Carreg Cennen's with one tile round
  them would be E 265500 to 268000, 2.5km, which the rim spacing does not divide; widening west to E 265000 would make
  it touch the first region along E 265000, so it widens east, to E 268500, and north to N 221000. Regions must be a
  tile (500m) apart, which the manifest checks: Carreg Cennen's west edge (E 265500) is 500m from the first region's
  east edge (E 265000) where the two overlap in northing (N 220500 to 221000).
- **Downloaded 2026-10-23** by `tools/terrain/fetch-lidar.sh`, in one run, no account or key: 46 tiles listed, the
  first region's 25 "already complete", 21 new (43,355,542 bytes, 90MB in `raw/` in all). The catalogue dates every
  new tile 13-01-2022 and so do the file names, so the credit (whose date range comes from the file names) is
  unchanged, and with it every glb. The Dryslwyn hashes match those its research note recorded on 2026-10-17. The
  files the research downloaded for measuring (`lidar/carreg-cennen/`, `lidar/dryslwyn/`) are not used. Before the
  run the old `links.txt` and `catalogue.json` were kept as `links-before-regions.txt` and
  `catalogue-before-regions.json` beside them. **A clone that has not taken this change** still reads `links.txt`
  as one region's list: its `build-lidar.py --verify` now fails (46 listed, 25 in its manifest), and a rebuild there
  would credit 46 rasters.

| Tile | File | Flown (catalogue) | Bytes | SHA-256 (first 16) |
|---|---|---|---|---|
| SN6518 | `wg_del_21_265218_20220113dtm.tif` | 13-01-2022 | 2,185,686 | `c7567611a7d6d3ac` |
| SN6519 | `wg_del_21_265219_20220113dtm.tif` | 13-01-2022 | 2,118,581 | `3d7ed1a1ef078ff5` |
| SN6520 | `wg_del_21_265220_20220113dtm.tif` | 13-01-2022 | 2,279,060 | `d6f25b524b89c327` |
| SN6618 | `wg_del_21_266218_20220113dtm.tif` | 13-01-2022 | 2,381,431 | `9ab4a69b9185d525` |
| SN6619 | `wg_del_21_266219_20220113dtm.tif` | 13-01-2022 | 2,395,015 | `39efd72ef2b2efdb` |
| SN6620 | `wg_del_21_266220_20220113dtm.tif` | 13-01-2022 | 2,208,590 | `bff60b0f5d4e4513` |
| SN6718 | `wg_del_21_267218_20220113dtm.tif` | 13-01-2022 | 2,491,021 | `c8ddba2938713034` |
| SN6719 | `wg_del_21_267219_20220113dtm.tif` | 13-01-2022 | 2,445,955 | `659ac7d4f3389807` |
| SN6720 | `wg_del_21_267220_20220113dtm.tif` | 13-01-2022 | 2,082,050 | `40055c81b0c8e3dd` |
| SN6818 | `wg_del_21_268218_20220113dtm.tif` | 13-01-2022 | 2,403,139 | `42de92e4e10d5a5c` |
| SN6819 | `wg_del_21_268219_20220113dtm.tif` | 13-01-2022 | 2,364,910 | `4fe08e10a4ab3b00` |
| SN6820 | `wg_del_21_268220_20220113dtm.tif` | 13-01-2022 | 2,316,303 | `8c5abc7d6843cbc7` |
| SN5419 | `wg_del_26_254219_20220113dtm.tif` | 13-01-2022 | 1,890,188 | `8e1f6d33effa089e` |
| SN5420 | `wg_del_26_254220_20220113dtm.tif` | 13-01-2022 | 1,303,174 | `f1334c9f19372b5d` |
| SN5421 | `wg_del_26_254221_20220113dtm.tif` | 13-01-2022 | 1,824,924 | `4976e41ca2cab656` |
| SN5519 | `wg_del_26_255219_20220113dtm.tif` | 13-01-2022 | 1,656,050 | `95d082c63516465b` |
| SN5520 | `wg_del_26_255220_20220113dtm.tif` | 13-01-2022 | 1,570,888 | `493a0423ce8561c5` |
| SN5521 | `wg_del_26_255221_20220113dtm.tif` | 13-01-2022 | 2,035,407 | `e9989ce0b58b1b9f` |
| SN5619 | `wg_del_26_256219_20220113dtm.tif` | 13-01-2022 | 1,839,828 | `a17340452be63c84` |
| SN5620 | `wg_del_26_256220_20220113dtm.tif` | 13-01-2022 | 1,531,026 | `cb803cc76a046a13` |
| SN5621 | `wg_del_26_256221_20220113dtm.tif` | 13-01-2022 | 2,032,316 | `e9d6fe636a0b5fe8` |

- **Built** by `build-lidar.py`, region after region in the order `lidar-areas.json` lists them, so the first region's
  80 tiles keep their offsets and bytes: the old `lidar.bin` is the new one's first 3,919,360 bytes, byte for byte, and
  its 80 manifest rows are unchanged. Each region is averaged from **the rasters that reach inside it** only. A first
  build that warped every region from one mosaic of all 46 rasters changed 51 samples on the east rim column of two
  10m tiles of the first region (E 264500 N 220500 and N 221000) by up to 40cm, because SN6520, east of E 265000, now
  filled the half of each rim cell that had had no data. Choosing each region's own rasters, as `fetch-lidar.sh`
  chooses them for it, keeps the rim as it was.
- **Result:** 132 tiles (42 at 2m, 90 at 10m), `lidar.bin` 3,919,360 to 5,760,264 bytes (+1,840,904; `gzip -9`
  2,480,664 to 3,797,430), `lidar.json` 21,156 to 36,046 bytes. `build-lidar.py --verify` matched all 46 rasters.
- **Against Terrain 50:** the tile-by-tile test (mean gap under 2m) and the region-wide one (mean under 1.5m, signed
  under 0.6m) pass in all three regions.
- **Release assets:** the 13 new 2m tiles become glbs too (`lidar-266000-218500.glb` to `lidar-267000-219500.glb`
  and `lidar-255000-220000.glb` to `lidar-255500-220500.glb`), 42 in all, 63,390,112 bytes; the 29 released before
  are byte for byte the same (every name, size and sha256 in `terrain-tiles.ts` unchanged). The glbs' scene origin
  is no longer "the region's south-west corner" but a fixed `sceneOrigin` in `lidar-areas.json` (E 260000 N 220500,
  the first region's corner), so a region added later never moves a tile already released.

**What it looks like** (2026-10-23, on the GPU through WSL, 1600x900, High, summer noon, `?place=<castle>&radius=<r>`;
before is main's build at 111f594 with the castles on Terrain 50, after is this one). In 1000, before either castle,
Carreg Cennen's crag shows as a rock face above a sharp break of slope where Terrain 50 had a smooth hill, and Dryslwyn
as a rounded, abrupt hill out of the flat floodplain where Terrain 50 had a few large facets. At 2km the difference is
slight, and the 10m cover blocks make the fields inside each region stair-stepped, as in the first region. In 2020 the
castles, still the landscape-scale plans drawn 2.6 times larger than life, stand on deep plinths: the seating rule stands
each level at the highest ground under its footprint, which on the sharper crag is higher (on the todo list; the true-size
models agreed on 2026-10-17 replace them).

| | Before | After |
|---|---|---|
| Carreg Cennen, 250m, in 1000 (no castle yet) | ![](../images/lidar/before-carreg-cennen-1000-r25.jpg) | ![](../images/lidar/after-carreg-cennen-1000-r25.jpg) |
| Carreg Cennen, 600m, in 1000 | ![](../images/lidar/before-carreg-cennen-1000-r60.jpg) | ![](../images/lidar/after-carreg-cennen-1000-r60.jpg) |
| Carreg Cennen, 250m, in 2020 | ![](../images/lidar/before-carreg-cennen-2020-r25.jpg) | ![](../images/lidar/after-carreg-cennen-2020-r25.jpg) |
| Carreg Cennen, 2km, in 2020 | ![](../images/lidar/before-carreg-cennen-2020-r200.jpg) | ![](../images/lidar/after-carreg-cennen-2020-r200.jpg) |
| Dryslwyn, 250m, in 1000 (no castle yet) | ![](../images/lidar/before-dryslwyn-1000-r25.jpg) | ![](../images/lidar/after-dryslwyn-1000-r25.jpg) |
| Dryslwyn, 600m, in 1000 | ![](../images/lidar/before-dryslwyn-1000-r60.jpg) | ![](../images/lidar/after-dryslwyn-1000-r60.jpg) |
| Dryslwyn, 250m, in 2020 | ![](../images/lidar/before-dryslwyn-2020-r25.jpg) | ![](../images/lidar/after-dryslwyn-2020-r25.jpg) |
| Dryslwyn, 2km, in 2020 | ![](../images/lidar/before-dryslwyn-2020-r200.jpg) | ![](../images/lidar/after-dryslwyn-2020-r200.jpg) |

## What the build makes (`tools/terrain/build-lidar.py`)

1. `gdalbuildvrt` joins the 25 files; `gdalwarp -r average` makes one 2m raster of the region with each
   output pixel centred on a vertex (a 2m cell is the mean of four 1m cells).
2. For each 500m tile it writes a square of **vertex** heights, (500/step + 1) per side, `uint16`
   little-endian **centimetres**, row by row from the north-west corner, so neighbouring tiles share
   their edge vertices exactly. 2m tiles are 251 x 251 (126KB); 10m tiles are 51 x 51 (5KB). The 10m
   values are samples of the same 2m raster, so where the two resolutions meet they agree. All 80 tiles
   go one after another into one file, `public/data/lidar/lidar.bin` (3.92MB since the castle area; 2.95MB before), because a page load of
   81 separate requests failed twice under load in the end-to-end tests ("Failed to fetch"); each tile's
   byte offset is in the manifest, so a later version can fetch one tile with an HTTP range request.
3. `public/data/lidar/lidar.json` lists the region, areas, every tile (position, step, offset, byte
   count, lowest and highest height) and every source raster, with the credit.

The two files are 3.9MB together (3.0MB before the castle area). They are committed; the downloads are not.

Same frame as the existing terrain: the world is OS grid metres, with the centre at E 262900 N 222500
and 10m to a world unit (`src/domain/geo.ts`). OS Terrain 50 is read as cell-centred samples (`sampleHeight`'s half-cell offset);
the LiDAR tiles are vertex samples, which the same function reads once a tile's origin is moved half a
step. No data is shifted. `tests/lidar.test.ts` compares every tile with Terrain 50 and fails if a tile is
transposed or shifted (seen red with one tile transposed), except one whose ground is nearly symmetric:
transposing is detectable in 65 of the 80 tiles (60 of 80 before the castle area; re-measured 2026-10-16).

## What it looks like

Before (Terrain 50 alone) and after (the LiDAR tiles), on the GPU through WSL, 1920x1080, High, summer noon.
They are in `docs/images/lidar/`.

| | Before | After |
|---|---|---|
| Llandeilo, 2020, 600m from the camera | ![](../images/lidar/before-llandeilo-2020.jpg) | ![](../images/lidar/after-llandeilo-2020.jpg) |
| The Roman forts' field, 2020, 300m | ![](../images/lidar/before-forts-2020.jpg) | ![](../images/lidar/after-forts-2020.jpg) |
| Llandeilo, 1282 (woodland from the era's environment) | ![](../images/lidar/before-llandeilo-1282.jpg) | ![](../images/lidar/after-llandeilo-1282.jpg) |
| The overview: no seam at the edge of the region | ![](../images/lidar/before-overview-2020.jpg) | ![](../images/lidar/after-overview-2020.jpg) |

The forts' field is flat pasture in 2020: the forts are not visible in the ground, and at a 4m mesh the
faint banks of Dinefwr Park do not show either. A hillshade of the 1m data over the park (below, 600m
square, E 261900 N 222250 at the south-west corner, made with `gdaldem hillshade -z 3` for this note) shows what
the LiDAR holds there: field boundaries, tracks, ridge and furrow, ponds, and tree clumps that the
"bare earth" model still carries.

![A hillshade of the 1m LiDAR over part of Dinefwr Park](../images/lidar/dinefwr-park-hillshade.jpg)

**Dinefwr Castle hill, 2026-10-16.** Before (the hill at 10m, as on main at 097c8cf) and after (the castle area
at 2m, drawn at a 4m mesh near the camera), the same camera on `?place=dinefwr&year=2020`, on the GPU
through WSL, 1600x900, High. The radius is in world units (10m each), so 12 is 120m from the castle, 25 is
250m, 60 is 600m and 200 is 2km. At 600m and 2km the difference is slight: a sharper, more broken face to the
crag on the east side at 600m, and none that can be pointed to at 2km, where 77 of the 80 tiles are drawn at 20m
and the rest at 10m. It shows at 250m and 120m.

| | Before | After |
|---|---|---|
| 120m from the castle | ![](../images/lidar/before-castle-2020-r12.jpg) | ![](../images/lidar/after-castle-2020-r12.jpg) |
| 250m | ![](../images/lidar/before-castle-2020-r25.jpg) | ![](../images/lidar/after-castle-2020-r25.jpg) |
| 600m | ![](../images/lidar/before-castle-2020-r60.jpg) | ![](../images/lidar/after-castle-2020-r60.jpg) |
| 2km | ![](../images/lidar/before-castle-2020-r200.jpg) | ![](../images/lidar/after-castle-2020-r200.jpg) |
| 2km, 1282 | ![](../images/lidar/before-castle-1282-r200.jpg) | ![](../images/lidar/after-castle-1282-r200.jpg) |

**What the finer ground shows, and one thing it exposes.** The facets on the crag and the slopes round it are
4m instead of 10m, so the escarpment reads as a broken rock face rather than a few
large planes. It also shows that the castle's model stands on a flat floor at one height while the ground
under its yard is not flat. Sampled from the 2m tiles (2026-10-16), the ward is flat at about 99.7 to 100.2m OD,
and the ground rises to about 101.0 to 101.6m from 18 to 24m east of Coflein's point (12m south to 6m north of it),
which is where the Dinefwr research fits the keep's centre (18.5m east, 7m south [S24]). So the "knoll" is
probably the real keep's ground, seen through a model drawn at landmark scale (2.6 times larger than life): the
model's yard is far bigger than the real ward, so the keep's ground ends up inside it. It showed before as a single
pyramid at 10m; at 4m its shape is more irregular. That it lies under the model's yard has not been measured against
the model's own plan. It is how the model is seated on the ground (the issue 3 comment about buildings sinking on a
slope is the same family), not a fault of the terrain, and it has been left as it is; it is on the todo list.

## Rebuilding and expanding

```bash
tools/terrain/fetch-lidar.sh          # downloads the tiles for the region (needs curl and python3)
python3 tools/terrain/build-lidar.py  # needs GDAL's command-line tools and numpy
python3 tools/terrain/build-lidar.py --verify   # checks the raw tiles against the manifest; builds nothing
```

- **A new area** (issue 2 asks to "Document how the model can be expanded later without rebuilding the initial terrain."; done once, for the castle, on
  2026-10-16, with no change to the renderer or the reader): add an entry to
  `areas` of a region in `lidar-areas.json` (since 2026-10-23 the areas sit inside their region's entry under
  `regions`; this line used to say "widen `region`", a key that no longer exists), widening that region if the area
  falls outside it (edges are multiples of 500), or giving the area a region of its own (next bullet). Run both scripts. Tiles already built are rewritten byte for byte from the same sources; the
  renderer, the manifest reader and the tests need no change. Keep every area 300m (the blend margin)
  inside the region.
- **A new region** (done twice, for Carreg Cennen and Dryslwyn, on 2026-10-23): add an entry to `regions` in
  `lidar-areas.json`, **after** the others, with its bounds and its areas. Its edges must be whole 500m tiles, its
  sides whole kilometres (the 40m rim spacing must divide them), every area 300m inside it, and it must be a tile
  (500m) from every other region; the manifest reader refuses anything else. Run both scripts: only the new rasters
  download, and every earlier tile keeps its bytes and offset. Then `npm run terrain-glb -- build/terrain-glb`, and
  release in the same pass. Talley Abbey (about 8km north) and St Teilo's are the next candidates their notes name.
- **A finer mesh** is a change to the level-of-detail steps in `src/domain/lidar.ts`; the 2m data is
  already there for it (see ADR 0049 for why the mesh stops at 4m).
- **Later periods' changes** (a rampart, a ditch, a lost road, a re-cut river) are ground edits laid over
  this base ground at runtime, never written into these tiles ([ADR 0049](../adr/0049-lidar-terrain-tiles-blended-into-terrain-50.md)).

## An editable Blender model

```bash
blender -b -P tools/terrain/export-blender.py -- roman-forts out/roman-forts.blend      # 2m
blender -b -P tools/terrain/export-blender.py -- llandeilo   out/llandeilo.blend 4      # 4m
```

Blender 4.0.2 headless, from the committed tiles. One mesh object per 500m tile
(`terrain_262000_222500_2m`), under an empty named for the area. Axes are the OS grid's (X east, Y
north, Z up), in metres at full scale and with no exaggeration, with the empty's custom properties
`os_origin_e` and `os_origin_n` giving the grid reference of Blender's origin, plus the CRS, the credit
and the datum note. Tile edges share vertices. The Roman forts at 2m are 9 objects, 567,009 vertices and
a 39MB `.blend` (not committed). Checked by reopening the file: the vertex nearest E 262186 N 222534 is
76.83m, and GDAL reads 76.81m at that point of the 1m source. The original 1m elevation data is the
downloaded GeoTIFFs, kept outside the repository and checksummed in the manifest.

## Downloadable glb tiles

```bash
npm run terrain-glb -- build/terrain-glb       # after rebuilt LiDAR tiles or a changed area: the 2m release-asset tiles (42 since 2026-10-23), lidar-<easting>-<northing>.glb; rewrites src/content/generated/terrain-tiles.ts (ADR 0058)
node tools/terrain/verify-release.mjs build/terrain-glb   # before a release: every tile's name, size and sha256 against that manifest; exits non-zero on a mismatch
npm run downloads                               # after npm run models, a rebuilt train or rebuilt LiDAR tiles: stamps credit, licence and placement (ground y from the LiDAR) into the model glbs
```

`tools/terrain/export-glb.ts` writes each 2m tile (29 of the 80 until 2026-10-23: the town, the Roman forts and
Dinefwr Castle; 42 of the 132 since, with Carreg Cennen and Dryslwyn) to `<outdir>/lidar-<easting>-<northing>.glb`. They are **release assets, not repo files**: attach
them to each GitHub release (`gh release create ... <outdir>/*.glb`, see
[`releases.md`](../process/releases.md)), and the app's Downloads tab links to
`https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/releases/latest/download/lidar-<e>-<n>.glb`
([ADR 0058](../adr/0058-the-worlds-assets-download-as-glb-with-their-credit-inside.md), Dewi: "2m, as a
release asset"). It reads `lidar.json` and `lidar.bin` through the app's own `parseManifest` and `tileData`,
keeps every stored sample (2m; `--step 4` would keep every second one), and cuts each cell into the two
triangles the app cuts it into. The heights are the stored ones, unblended: none of the app's easing into
Terrain 50 at the region's rim, river channels or period ground edits. The build is deterministic.

- **The manifest:** the tool also writes `src/content/generated/terrain-tiles.ts` (commit it): each tile's
  asset name, grid origin, areas, size in bytes, triangles, heights and **sha256**. The app's list shows the
  sizes from it, a test rebuilds the tiles and checks every byte count and hash, and a downloaded asset can
  be checked against it (`node tools/terrain/verify-release.mjs <outdir>` does, and exits non-zero on a
  mismatch, a missing tile or a stray one). Pass `--no-manifest` to build files without rewriting it. **A change
  that rewrites the manifest must be released in the same pass** (`releases.md`), or the app's
  `/releases/latest/download/` links go 404 or serve stale tiles.
- **Axes and units:** glTF's, in metres: x east, y up (height as the LiDAR gives it), z minus the northing. A
  tile's vertices run from x = 0 to 500 and z = -500 to 0, so its south-west corner is its own origin.
- **Where each tile sits:** the node's translation is the tile's offset from the scene origin (`sceneOrigin` in
  `lidar-areas.json`, E 260000 N 220500, the first region's south-west corner, fixed since 2026-10-23 so that a new
  region moves no released tile), so all the tiles opened together land in place; neighbours share their edge vertices
  exactly. The tile's own British National Grid origin is in the node's extras (`tileOriginBng`, EPSG:27700,
  with `tileOriginMeaning`), the scene origin in the scene's (`sceneOriginBng`, `crs`, `axes`), and the list
  shows it as "262000 E, 222000 N".
- **Credit and licence:** in the file's `asset.copyright` (the exact LiDAR credit above, then a line on the
  export) and `asset.extras` (`licence`, `licenceUrl` for the Open Government Licence v3.0's own page,
  `sourceUrl`, the project and its URL), and repeated in the first scene's extras (`credit`, `licence`,
  `licenceUrl`, `sourceUrl`), all taken from `src/content/assets.ts`.
- **Size:** 1,509,268 to 1,509,304 bytes a tile at 2m (125,000 triangles, uint16 indices, no normals), 43,769,296 for the
  29 (22.0MB as a gzipped tar); 63,390,112 for the 42 since 2026-10-23. The first version committed 21 tiles at 4m (380,536 bytes each, 8.0MB); it was
  replaced by the release assets on Dewi's decision.
- **Where a model stands:** each landmark glb's `placement` gives its anchor's grid reference and its
  place in this scene, with y the ground at the anchor read from the same stored samples (bilinear, from
  the finest tile that holds it): 76.1m (Fort 1), 76.77m (Fort 2), 72.32m (the vicus).
- **Only today's ground.** The tiles say nothing of earlier periods.
