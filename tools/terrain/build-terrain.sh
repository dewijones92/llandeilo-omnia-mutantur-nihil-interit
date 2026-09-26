#!/usr/bin/env bash
set -euo pipefail

DATA="${DATA:-$HOME/code/data/llandeilo}"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/data"
CENTRE_E=262900
CENTRE_N=222500
HALF=17000
CELL=50

XMIN=$((CENTRE_E - HALF)); XMAX=$((CENTRE_E + HALF))
YMIN=$((CENTRE_N - HALF)); YMAX=$((CENTRE_N + HALF))
SIZE=$(((XMAX - XMIN) / CELL))

echo "dewidebug terrain bbox E ${XMIN}-${XMAX} N ${YMIN}-${YMAX} size=${SIZE}x${SIZE} cell=${CELL}m"

WORK="$DATA/work"
mkdir -p "$WORK/asc" "$OUT"

for e in 4 5 6 7; do
  for n in 0 1 2 3; do
    tile="sn${e}${n}"
    unzip -o -q -j "$DATA/terrain50.zip" "data/sn/${tile}_OST50GRID_*.zip" -d "$WORK"
    unzip -o -q -j "$WORK/${tile}"_OST50GRID_*.zip "*.asc" -d "$WORK/asc"
  done
done
echo "dewidebug terrain tiles extracted: $(ls "$WORK/asc" | wc -l)"

gdalbuildvrt -q -a_srs EPSG:27700 "$WORK/terrain.vrt" "$WORK"/asc/*.asc
gdalwarp -q -overwrite -te "$XMIN" "$YMIN" "$XMAX" "$YMAX" -tr "$CELL" "$CELL" -r bilinear \
  -ot Float32 "$WORK/terrain.vrt" "$WORK/terrain.tif"

gdal_translate -q -of ENVI -ot UInt16 -scale 0 6553.5 0 65535 "$WORK/terrain.tif" "$WORK/terrain.envi"
cp "$WORK/terrain.envi" "$OUT/terrain.bin"

read -r HMIN HMAX < <(gdalinfo -stats "$WORK/terrain.tif" | awk -F= '/STATISTICS_MINIMUM/{mn=$2}/STATISTICS_MAXIMUM/{mx=$2}END{print mn, mx}')
cat > "$OUT/terrain.json" <<JSON
{
  "crs": "EPSG:27700",
  "originEasting": $XMIN,
  "originNorthing": $YMAX,
  "cellSize": $CELL,
  "width": $SIZE,
  "height": $SIZE,
  "centreEasting": $CENTRE_E,
  "centreNorthing": $CENTRE_N,
  "heightScale": 0.1,
  "minHeight": $HMIN,
  "maxHeight": $HMAX,
  "encoding": "uint16 little-endian, decimetres, row-major from the north-west corner",
  "source": "Contains OS data © Crown copyright and database right 2026 (OS Terrain 50, Open Government Licence v3.0)"
}
JSON

rm -f "$WORK/rivers.geojson"
ogr2ogr -f GeoJSON -spat "$XMIN" "$YMIN" "$XMAX" "$YMAX" -clipsrc spat_extent \
  -select watercourse_name,watercourse_name_alternative,form -simplify 20 -lco COORDINATE_PRECISION=0 \
  "$WORK/rivers.geojson" "$DATA/Data/oprvrs_gb.gpkg" watercourse_link
cp "$WORK/rivers.geojson" "$OUT/rivers.json"

echo "dewidebug terrain done: $(stat -c%s "$OUT/terrain.bin") bytes, heights ${HMIN}-${HMAX} m, rivers $(stat -c%s "$OUT/rivers.json") bytes"
