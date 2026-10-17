---
title: Map data
kind: guide
status: current
updated: 2026-10-16
---

# Map data

Almost everything drawn from real geography comes from Ordnance Survey OpenData under the Open
Government Licence v3.0: "Contains OS data © Crown copyright and database right 2026". The close-up
terrain is Welsh Government LiDAR, credited as "Contains Welsh Government data" (see
[`lidar.md`](lidar.md) for what each source says about its licence).

| Output (`public/data/`) | Built from | Script |
|---|---|---|
| `terrain.bin`, `terrain.json` | OS Terrain 50 (ASCII grid, tiles SN40–SN73), clipped to a 34km square at 50m | `tools/terrain/build-terrain.sh` |
| `lidar/lidar.bin`, `lidar/lidar.json` | Welsh Government 1m LiDAR DTM (DataMapWales), resampled to 500m tiles of vertex heights, 2m for the town, the Roman forts and Dinefwr Castle and 10m for the 5km by 4km region round them. Described in [`lidar.md`](lidar.md) | `tools/terrain/fetch-lidar.sh`, `tools/terrain/build-lidar.py` |
| `lidar-<e>-<n>.glb` (a GitHub release asset, **not in the repo**) and `generated/terrain-tiles.ts` | The 2m LiDAR tiles above, exported at the full 2m as glTF for download (the app's Downloads tab links to the latest release), in real metres with each tile's British National Grid origin and the LiDAR credit inside; the manifest (sizes, hashes) is committed. Described in [`lidar.md`](lidar.md) | `npm run terrain-glb -- <outdir>` (`tools/terrain/export-glb.ts`) |
| `rivers.json` | OS Open Rivers, clipped and simplified | `tools/terrain/build-terrain.sh` |
| `buildings.bin` | OS Open Map Local tile SN, building footprints as minimum rectangles (33,316) | `tools/geo/build-osdata.py` |
| `railways.json` | OS Open Map Local railway track, chained into continuous lines | `tools/geo/build-osdata.py` |
| `roads.json` | OS Open Map Local roads: A and B roads, plus minor roads near the town | `tools/geo/build-osdata.py` |
| `woodland.bin` | OS Open Map Local woodland, rasterised at 50m | `tools/geo/build-osdata.py` |

The disc is centred on Llandeilo at E 262900, N 222500 with a radius of 16,093m (ten miles).

## Rebuilding

The raw downloads are not committed. Fetch them into `~/code/data/llandeilo/` (or set `DATA`):

- OS Terrain 50, ASCII Grid (GB): `https://api.os.uk/downloads/v1/products/Terrain50/downloads?area=GB&format=ASCII+Grid+and+GML+%28Grid%29&redirect`
- OS Open Rivers, GeoPackage (GB): `https://api.os.uk/downloads/v1/products/OpenRivers/downloads?area=GB&format=GeoPackage&redirect`, unzipped
- OS Open Map Local, Shapefile (SN): `https://api.os.uk/downloads/v1/products/OpenMapLocal/downloads?area=SN&format=ESRI%C2%AE+Shapefile&redirect`, unzipped to `oml/`

Then run `tools/terrain/build-terrain.sh` and `python3 tools/geo/build-osdata.py`. They need GDAL
(`gdal-bin` and the Python bindings).

The LiDAR tiles are rebuilt with `tools/terrain/fetch-lidar.sh` and `python3 tools/terrain/build-lidar.py`
(GDAL's command-line tools and numpy; no key or account). The raw 1m downloads go to
`~/code/data/llandeilo/lidar/raw/` and are never committed. Details, the exact download, the tile list
and how to add an area are in [`lidar.md`](lidar.md).

## Planned

- A historical railway alignment for the closed 1864 line to Carmarthen.
