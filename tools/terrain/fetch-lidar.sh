#!/usr/bin/env bash
# Downloads the Welsh Government 1m LiDAR DTM tiles that cover the detail region, from DataMapWales.
# The region comes from tools/terrain/lidar-areas.json, so there is one place to change it.
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

read -r XMIN YMIN XMAX YMAX < <(python3 -I - "$AREAS" <<'PY'
import json, sys
r = json.load(open(sys.argv[1]))["region"]
print(r["eMin"], r["nMin"], r["eMax"], r["nMax"])
PY
)
echo "dewidebug lidar region E ${XMIN}-${XMAX} N ${YMIN}-${YMAX}"

curl -fsS -m 120 -G "$WFS" \
  --data-urlencode "service=WFS" --data-urlencode "version=2.0.0" --data-urlencode "request=GetFeature" \
  --data-urlencode "typeNames=$LAYER" --data-urlencode "outputFormat=application/json" \
  --data-urlencode "cql_filter=BBOX(geom,${XMIN},${YMIN},${XMAX},${YMAX},'EPSG:27700')" \
  -o "$CATALOGUE"

python3 -I - "$CATALOGUE" "$XMIN" "$YMIN" "$XMAX" "$YMAX" > "$DATA/lidar/links.txt" <<'PY'
import json, sys
cat = json.load(open(sys.argv[1]))
x0, y0, x1, y1 = (float(v) for v in sys.argv[2:6])
for f in sorted(cat["features"], key=lambda f: f["properties"]["british_gr"]):
    xs = [p[0] for p in f["geometry"]["coordinates"][0]]
    ys = [p[1] for p in f["geometry"]["coordinates"][0]]
    # The BBOX filter also returns tiles that merely touch the region's edge; skip those.
    if min(xs) >= x1 - 1 or max(xs) <= x0 + 1 or min(ys) >= y1 - 1 or max(ys) <= y0 + 1:
        continue
    print(f["properties"]["british_gr"], f["properties"]["dtm_link"])
PY
echo "dewidebug lidar catalogue lists $(wc -l < "$DATA/lidar/links.txt") tiles"

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

echo "dewidebug lidar done: $(ls "$RAW" | wc -l) tiles, $(du -sh "$RAW" | cut -f1)"
