#!/usr/bin/env python3
import json, math, os, struct, subprocess, sys
from pathlib import Path
from osgeo import ogr

ogr.UseExceptions()

DATA = Path(os.environ.get('DATA', Path.home() / 'code/data/llandeilo'))
SHP = DATA / 'oml' / 'OS OpenMap Local (ESRI Shape File) SN' / 'data'
OUT = Path(__file__).resolve().parents[2] / 'public' / 'data'
CE, CN, R = 262900, 222500, 16093
XMIN, YMIN, XMAX, YMAX = CE - 17000, CN - 17000, CE + 17000, CN + 17000

def layer(name):
    ds = ogr.Open(str(SHP / f'SN_{name}.shp'))
    lyr = ds.GetLayer()
    lyr.SetSpatialFilterRect(XMIN, YMIN, XMAX, YMAX)
    return ds, lyr

def inside(e, n, margin=0):
    return math.hypot(e - CE, n - CN) <= R - margin

def min_rect(pts):
    best = None
    for i in range(len(pts)):
        (x1, y1), (x2, y2) = pts[i], pts[(i + 1) % len(pts)]
        a = math.atan2(y2 - y1, x2 - x1)
        c, s = math.cos(a), math.sin(a)
        us = [x * c + y * s for x, y in pts]
        vs = [-x * s + y * c for x, y in pts]
        w, d = max(us) - min(us), max(vs) - min(vs)
        if best is None or w * d < best[0]:
            cu, cv = (max(us) + min(us)) / 2, (max(vs) + min(vs)) / 2
            best = (w * d, cu * c - cv * s, cu * s + cv * c, w, d, a)
    return best

def buildings():
    ds, lyr = layer('Building')
    rows = []
    for f in lyr:
        g = f.GetGeometryRef()
        if g is None:
            continue
        ring = g.GetGeometryRef(0)
        pts = [(ring.GetX(i), ring.GetY(i)) for i in range(ring.GetPointCount() - 1)]
        if len(pts) < 3:
            continue
        _, cx, cy, w, d, a = min_rect(pts)
        if not inside(cx, cy, 30) or w * d < 12:
            continue
        rows.append((cx, cy, w, d, a))
    with open(OUT / 'buildings.bin', 'wb') as fh:
        for r in rows:
            fh.write(struct.pack('<5f', *r))
    print(f'dewidebug osdata buildings={len(rows)} bytes={len(rows) * 20}')
    return len(rows)

def lines(name, keep):
    ds, lyr = layer(name)
    out = []
    for f in lyr:
        if not keep(f):
            continue
        g = f.GetGeometryRef().Clone()
        g.FlattenTo2D()
        g = g.SimplifyPreserveTopology(4)
        pts = [[round(g.GetX(i)), round(g.GetY(i))] for i in range(g.GetPointCount())]
        pts = [p for p in pts if inside(p[0], p[1], 20)]
        if len(pts) >= 2:
            out.append({'kind': keep(f), 'points': pts})
    return out

def chain(lines, tol=3.0):
    pool = [l['points'][:] for l in lines]
    out = []
    while pool:
        cur = pool.pop()
        grown = True
        while grown:
            grown = False
            for i, other in enumerate(pool):
                if math.dist(cur[-1], other[0]) <= tol:
                    cur += other[1:]
                elif math.dist(cur[-1], other[-1]) <= tol:
                    cur += other[::-1][1:]
                elif math.dist(cur[0], other[-1]) <= tol:
                    cur = other[:-1] + cur
                elif math.dist(cur[0], other[0]) <= tol:
                    cur = other[::-1][:-1] + cur
                else:
                    continue
                pool.pop(i)
                grown = True
                break
        out.append({'kind': 'rail', 'points': cur})
    out.sort(key=lambda l: -sum(math.dist(a, b) for a, b in zip(l['points'], l['points'][1:])))
    return out

def road_class(f):
    c = f.GetField('CLASSIFICA') or ''
    if c.startswith('A Road') or c == 'Primary Road':
        return 'A'
    if c.startswith('B Road'):
        return 'B'
    if c in ('Minor Road', 'Local Street'):
        cx = f.GetGeometryRef().Centroid()
        return 'town' if math.hypot(cx.GetX() - CE, cx.GetY() - CN) < 1600 else None
    return None

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    count = buildings()
    rail = chain(lines('RailwayTrack', lambda f: 'rail'))
    json.dump({'lines': rail}, open(OUT / 'railways.json', 'w'), separators=(',', ':'))
    roads = lines('Road', road_class)
    json.dump({'lines': roads}, open(OUT / 'roads.json', 'w'), separators=(',', ':'))
    print(f'dewidebug osdata railways={len(rail)} roads={len(roads)}')
    tif = DATA / 'work' / 'woodland.tif'
    subprocess.run(['gdal_rasterize', '-q', '-burn', '1', '-ot', 'Byte', '-init', '0', '-at', '-te', str(XMIN), str(YMIN),
                    str(XMAX), str(YMAX), '-tr', '50', '50', str(SHP / 'SN_Woodland.shp'), str(tif)], check=True)
    subprocess.run(['gdal_translate', '-q', '-of', 'ENVI', str(tif), str(DATA / 'work' / 'woodland.envi')], check=True)
    (OUT / 'woodland.bin').write_bytes((DATA / 'work' / 'woodland.envi').read_bytes())
    meta = {
        'buildings': {'count': count, 'encoding': 'float32 LE x5: easting, northing, width, depth, angle (radians)'},
        'woodland': {'encoding': 'uint8 680x680 at 50m from the north-west corner, 1 = OS mapped woodland today'},
        'source': 'Contains OS data © Crown copyright and database right 2026 (OS Open Map Local, Open Government Licence v3.0)',
    }
    json.dump(meta, open(OUT / 'osdata.json', 'w'), indent=2)

if __name__ == '__main__':
    sys.exit(main())
