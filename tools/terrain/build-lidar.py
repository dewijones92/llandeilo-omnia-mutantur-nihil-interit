#!/usr/bin/env python3
"""Builds the close-up LiDAR terrain tiles in public/data/lidar/ from the raw Welsh Government DTM.

Run tools/terrain/fetch-lidar.sh first. Needs GDAL's command-line tools and numpy; it does not use
GDAL's Python raster API (it breaks under numpy 2).

`--verify` rebuilds nothing: it checks every raw raster listed in links.txt against the size and SHA-256
recorded in public/data/lidar/lidar.json, and that no other .tif sits in the raw folder.

Every tile is a square of `tileSize` metres on the OS grid, stored as a grid of VERTEX heights, so
neighbouring tiles share their edge vertices exactly. Heights are uint16 centimetres, row-major from
the north-west corner. There are several regions, each a rectangle of tiles cut into the coarse terrain
on its own (ADR 0049, amended 2026-10-23); the tiles go into the data file region by region, in the
order lidar-areas.json lists them, so adding a region after the others leaves every earlier tile at the
same offset with the same bytes. Tiles in a priority area keep every `detailStep` metres; the rest of a
region keeps every `contextStep` metres. Each region's detail raster is the 1m DTM averaged to 2m, and
the context vertices are taken from that same raster, so the two resolutions agree where they meet.
"""
import hashlib, json, math, os, re, subprocess, sys
from pathlib import Path

import numpy as np

DATA = Path(os.environ.get('DATA', Path.home() / 'code/data/llandeilo'))
HERE = Path(__file__).resolve().parent
OUT = HERE.parents[1] / 'public' / 'data' / 'lidar'
WORK = DATA / 'lidar' / 'work'
RAW = DATA / 'lidar' / 'raw'
CATALOGUE = DATA / 'lidar' / 'catalogue.json'
LINKS = DATA / 'lidar' / 'links.txt'
CREDIT_TS = HERE.parents[1] / 'src' / 'content' / 'generated' / 'lidar-credit.ts'
HEIGHT_SCALE = 0.01
DATA_FILE = 'lidar.bin'

def credit(flown):
    return (
        'Contains Welsh Government data (LiDAR 1m DTM from the 2020-22 national survey, '
        f'these tiles dated {flown[0]} to {flown[1]} in their file names), via DataMapWales. '
        'Licence stated on the DataMapWales download page: Open Government Licence v3.0.'
    )


def listed_rasters():
    """The rasters fetch-lidar.sh listed for the region, so a stray file in raw/ is never built or credited."""
    if not LINKS.exists():
        sys.exit(f'{LINKS} is missing: run tools/terrain/fetch-lidar.sh first')
    names = [line.split()[1].rsplit('/', 1)[-1] for line in LINKS.read_text().splitlines() if line.strip()]
    missing = [n for n in names if not (RAW / n).exists()]
    if missing:
        sys.exit(f'{len(missing)} listed rasters are not in {RAW}: {missing[:3]}')
    return sorted(RAW / n for n in names)


def verify():
    manifest = json.loads((OUT / 'lidar.json').read_text())
    recorded = {t['file']: t for t in manifest['source']['tiles']}
    listed = {p.name: p for p in listed_rasters()}
    problems = []
    for name in sorted(set(recorded) | set(listed)):
        if name not in listed:
            problems.append(f'{name}: recorded in the manifest but not listed in links.txt')
        elif name not in recorded:
            problems.append(f'{name}: listed in links.txt but not in the manifest')
        else:
            data = listed[name].read_bytes()
            if len(data) != recorded[name]['bytes']:
                problems.append(f'{name}: {len(data)} bytes, manifest has {recorded[name]["bytes"]}')
            elif hashlib.sha256(data).hexdigest() != recorded[name]['sha256']:
                problems.append(f'{name}: SHA-256 differs from the manifest')
    strays = sorted(p.name for p in RAW.glob('*.tif') if p.name not in listed)
    problems += [f'{n}: in raw/ but not listed in links.txt' for n in strays]
    if problems:
        sys.exit('dewidebug lidar verify FAILED\n' + '\n'.join(problems))
    print(f'dewidebug lidar verify ok: {len(listed)} rasters match the manifest, none extra')


def raster_square(path):
    """The 1km square a raster covers, from its name (wg_del_<delivery>_<eee><nnn>_<date>dtm.tif, kilometres)."""
    m = re.search(r'_(\d{3})(\d{3})_\d{8}dtm\.tif$', path.name)
    if not m:
        sys.exit(f'{path.name}: cannot read its grid square from the name')
    return int(m.group(1)) * 1000, int(m.group(2)) * 1000


def region_rasters(rasters, region):
    """The rasters that reach inside a region, as fetch-lidar.sh chose them for it. A raster only touching the
    region's edge is left out: it would change the averaged 2m cells on the rim, and with them tiles built before
    a neighbouring region's rasters were downloaded."""
    out = []
    for path in rasters:
        e, n = raster_square(path)
        if e < region['eMax'] and e + 1000 > region['eMin'] and n < region['nMax'] and n + 1000 > region['nMin']:
            out.append(path)
    return out


def run(*args):
    subprocess.run([str(a) for a in args], check=True)


def tile_range(lo, hi, size):
    return range(lo, hi, size)


def intersects(area, te, tn, size):
    return (
        te < area['eMax'] and te + size > area['eMin'] and tn < area['nMax'] and tn + size > area['nMin']
    )


def main():
    if '--verify' in sys.argv[1:]:
        verify()
        return
    cfg = json.loads((HERE / 'lidar-areas.json').read_text())
    size, fine, coarse = cfg['tileSize'], cfg['detailStep'], cfg['contextStep']
    if coarse % fine or size % coarse:
        sys.exit('contextStep must be a multiple of detailStep and divide the tile size')
    regions, areas = [], []
    for r in cfg['regions']:
        for k in ('eMin', 'eMax', 'nMin', 'nMax'):
            if r[k] % size:
                sys.exit(f'region {r["id"]} {k}={r[k]} is not a multiple of the tile size {size}')
        regions.append({k: r[k] for k in ('id', 'name', 'eMin', 'eMax', 'nMin', 'nMax')})
        for a in r['areas']:
            h = a['halfSize']
            areas.append(
                {
                    'id': a['id'],
                    'name': a['name'],
                    'region': r['id'],
                    'centre': a['centre'],
                    'eMin': a['centre']['e'] - h,
                    'eMax': a['centre']['e'] + h,
                    'nMin': a['centre']['n'] - h,
                    'nMax': a['centre']['n'] + h,
                }
            )

    WORK.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    rasters = listed_rasters()

    tiles = []
    blob = bytearray()
    half = fine / 2
    for r in regions:
        width = (r['eMax'] - r['eMin']) // fine + 1
        height = (r['nMax'] - r['nMin']) // fine + 1
        own = region_rasters(rasters, r)
        vrt = WORK / f'dtm-{r["id"]}.vrt'
        run('gdalbuildvrt', '-q', '-overwrite', '-a_srs', 'EPSG:27700', vrt, *own)
        tif = WORK / f'dtm-detail-{r["id"]}.tif'
        run(
            'gdalwarp', '-q', '-overwrite', '-te', r['eMin'] - half, r['nMin'] - half, r['eMax'] + half,
            r['nMax'] + half, '-tr', fine, fine, '-r', 'average', '-ot', 'Float32', '-dstnodata', '-9999', vrt, tif,
        )
        raw = WORK / f'dtm-detail-{r["id"]}.f32'
        run('gdal_translate', '-q', '-of', 'ENVI', '-ot', 'Float32', tif, raw)
        grid = np.fromfile(raw, dtype='<f4').reshape(height, width)
        if (grid == -9999).any() or not np.isfinite(grid).all():
            sys.exit(f'the DTM has holes inside the region {r["id"]}')
        print(
            f'dewidebug lidar region {r["id"]} from {len(own)} rasters, detail raster {width}x{height} at {fine}m, '
            f'heights {grid.min():.2f}-{grid.max():.2f} m'
        )
        mine = [a for a in areas if a['region'] == r['id']]
        for tn in tile_range(r['nMin'], r['nMax'], size):
            for te in tile_range(r['eMin'], r['eMax'], size):
                priority = [a['id'] for a in mine if intersects(a, te, tn, size)]
                step = fine if priority else coarse
                stride = step // fine
                n = size // step
                r0 = (r['nMax'] - (tn + size)) // fine
                c0 = (te - r['eMin']) // fine
                block = grid[r0 : r0 + n * stride + 1 : stride, c0 : c0 + n * stride + 1 : stride]
                cm = np.rint(block * 100)
                if cm.min() < 0 or cm.max() > 65535:
                    sys.exit(f'tile {te},{tn} has heights outside the uint16 centimetre range')
                data = cm.astype('<u2')
                offset = len(blob)
                blob += data.tobytes()
                tiles.append(
                    {
                        'e': te,
                        'n': tn,
                        'step': step,
                        'offset': offset,
                        'bytes': data.nbytes,
                        'minHeight': float(data.min()) * HEIGHT_SCALE,
                        'maxHeight': float(data.max()) * HEIGHT_SCALE,
                        'areas': priority,
                    }
                )
    (OUT / DATA_FILE).write_bytes(bytes(blob))
    for stale in OUT.glob('*.bin'):
        if stale.name != DATA_FILE:
            stale.unlink()

    catalogue = {
        f['properties']['dtm_link'].split('/')[-1]: f['properties']
        for f in json.loads(CATALOGUE.read_text())['features']
    }
    stamps = sorted(re.search(r'_(\d{8})dtm\.tif$', p.name).group(1) for p in rasters)
    pretty = lambda d: f'{d[6:8]}/{d[4:6]}/{d[0:4]}'
    flown = (pretty(stamps[0]), pretty(stamps[-1]))
    sources = []
    for path in rasters:
        props = catalogue.get(path.name, {})
        sources.append(
            {
                'grid': props.get('british_gr'),
                'file': path.name,
                'surveyDate': props.get('date'),
                'fileDate': re.search(r'_(\d{8})dtm\.tif$', path.name).group(1),
                'bytes': path.stat().st_size,
                'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            }
        )

    manifest = {
        'crs': cfg['crs'],
        'data': DATA_FILE,
        'tileSize': size,
        'heightScale': HEIGHT_SCALE,
        'blendMetres': cfg['blendMetres'],
        'sceneOrigin': cfg['sceneOrigin'],
        'regions': regions,
        'areas': areas,
        'encoding': 'one file of every tile one after another (each tile at its offset, in bytes): uint16 little-endian, centimetres, row-major from the north-west corner; (tileSize/step + 1) vertices per side, edge vertices shared with the neighbouring tile',
        'tiles': tiles,
        'source': {
            'product': 'Welsh Government LiDAR tile catalogue 2020-2023, 1m DTM (bare earth)',
            'publisher': 'Welsh Government, via DataMapWales (https://datamap.gov.wales/)',
            'credit': credit(flown),
            'tiles': sources,
        },
    }
    (OUT / 'lidar.json').write_text(json.dumps(manifest, indent=1) + '\n')
    CREDIT_TS.write_text(
        '// Generated by tools/terrain/build-lidar.py from the manifest. Do not edit by hand.\n'
        f'export const LIDAR_CREDIT = {json.dumps(manifest["source"]["credit"])};\n'
    )
    fine_tiles = sum(1 for t in tiles if t['step'] == fine)
    print(
        f'dewidebug lidar wrote {len(tiles)} tiles ({fine_tiles} at {fine}m, {len(tiles) - fine_tiles} at {coarse}m) '
        f'in {len(regions)} regions into {DATA_FILE}, {len(blob)} bytes of heights, {len(sources)} source rasters'
    )


main()
