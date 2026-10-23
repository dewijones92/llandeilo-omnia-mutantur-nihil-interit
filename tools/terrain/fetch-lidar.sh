#!/usr/bin/env bash
# Downloads the Welsh Government 1m LiDAR DTM tiles that cover every detail region, from DataMapWales.
# The regions come from tools/terrain/lidar-areas.json, so there is one place to change them.
# Raw tiles go to $DATA/lidar/raw (never into git). Re-running skips tiles already complete.
set -euo pipefail

DATA="${DATA:-$HOME/code/data/llandeilo}"
HERE="$(cd "$(dirname "$0")" && pwd)"
AREAS="$HERE/lidar-areas.json"
RAW="$DATA/lidar/raw"
CATALOGUE="$DATA/lidar/catalogue.json"
WFS="https://datamap.gov.wales/geoserver/ows"
LAYER="geonode:welsh_government_lidar_tile_catalogue_2020_2023"
mkdir -p "$RAW"
PARTS="$(mktemp -d)"
trap 'rm -rf "$PARTS"' EXIT

# One catalogue query per region; the answers are merged into one catalogue.json, each tile once.
while read -r ID XMIN YMIN XMAX YMAX; do
  echo "dewidebug lidar region $ID E ${XMIN}-${XMAX} N ${YMIN}-${YMAX}"
  curl -fsS -m 120 -G "$WFS" \
    --data-urlencode "service=WFS" --data-urlencode "version=2.0.0" --data-urlencode "request=GetFeature" \
    --data-urlencode "typeNames=$LAYER" --data-urlencode "outputFormat=application/json" \
    --data-urlencode "cql_filter=BBOX(geom,${XMIN},${YMIN},${XMAX},${YMAX},'EPSG:27700')" \
    -o "$PARTS/$ID.json"
done < <(python3 -I - "$AREAS" <<'PY'
import json, sys
for r in json.load(open(sys.argv[1]))["regions"]:
    print(r["id"], r["eMin"], r["nMin"], r["eMax"], r["nMax"])
PY
)

python3 -I - "$AREAS" "$PARTS" "$CATALOGUE" > "$DATA/lidar/links.txt" <<'PY'
import json, sys
from pathlib import Path
regions = json.load(open(sys.argv[1]))["regions"]
parts = Path(sys.argv[2])
features, links = {}, {}
for r in regions:
    for f in json.load(open(parts / f"{r['id']}.json"))["features"]:
        xs = [p[0] for p in f["geometry"]["coordinates"][0]]
        ys = [p[1] for p in f["geometry"]["coordinates"][0]]
        # The BBOX filter also returns tiles that merely touch the region's edge; skip those.
        if min(xs) >= r["eMax"] - 1 or max(xs) <= r["eMin"] + 1 or min(ys) >= r["nMax"] - 1 or max(ys) <= r["nMin"] + 1:
            continue
        grid = f["properties"]["british_gr"]
        features[grid] = f
        links[grid] = f["properties"]["dtm_link"]
json.dump({"type": "FeatureCollection", "features": [features[g] for g in sorted(features)]}, open(sys.argv[3], "w"))
for grid in sorted(links):
    print(grid, links[grid])
PY
echo "dewidebug lidar catalogue lists $(wc -l < "$DATA/lidar/links.txt") tiles over every region"

n=0
while read -r grid link; do
  n=$((n + 1))
  file="$RAW/$(basename "$link")"
  want=$(curl -fsSI -m 30 "https://$link" | tr -d '\r' | awk 'tolower($1)=="content-length:"{print $2}')
  have=$(stat -c%s "$file" 2>/dev/null || echo 0)
  if [ "$have" = "$want" ]; then
    echo "dewidebug lidar $n $grid already complete ($have bytes)"
    continue
  fi
  curl -fsS -m 600 -C - -o "$file" "https://$link"
  echo "dewidebug lidar $n $grid downloaded $(stat -c%s "$file") of $want bytes"
done < "$DATA/lidar/links.txt"

echo "dewidebug lidar done: $(find "$RAW" -name '*.tif' | wc -l) tiles, $(du -sh "$RAW" | cut -f1)"
