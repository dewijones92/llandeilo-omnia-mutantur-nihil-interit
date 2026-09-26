---
title: Map data
kind: guide
status: current
updated: 2026-09-26
---

# Map data

Everything drawn from real geography comes from Ordnance Survey OpenData under the Open Government
Licence v3.0: "Contains OS data © Crown copyright and database right 2026".

| Output (`public/data/`) | Built from | Script |
|---|---|---|
| `terrain.bin`, `terrain.json` | OS Terrain 50 (ASCII grid, tiles SN40–SN73), clipped to a 34km square at 50m | `tools/terrain/build-terrain.sh` |
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

## Planned

- Welsh Government LiDAR (1–2m, OGL) for close-up terrain at the places you fly into.
- A historical railway alignment for the closed 1864 line to Carmarthen.
