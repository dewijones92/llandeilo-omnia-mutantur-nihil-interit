#!/usr/bin/env python3
"""Builds the close-up LiDAR terrain tiles in public/data/lidar/ from the raw Welsh Government DTM.

Run tools/terrain/fetch-lidar.sh first. Needs GDAL's command-line tools and numpy; it does not use
GDAL's Python raster API (it breaks under numpy 2).

Every tile is a square of `tileSize` metres on the OS grid, stored as a grid of VERTEX heights, so
neighbouring tiles share their edge vertices exactly. Heights are uint16 centimetres, row-major from
the north-west corner. Tiles in a priority area keep every `detailStep` metres; the rest of the
region keeps every `contextStep` metres. The detail raster is the 1m DTM averaged to 2m, and the
context vertices are taken from that same raster, so the two resolutions agree where they meet.
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
HEIGHT_SCALE = 0.01

def credit(flown):
    return (
        'Contains Welsh Government data (LiDAR 1m DTM from the 2020-22 national survey, '
        f'these tiles dated {flown[0]} to {flown[1]} in their file names), via DataMapWales. '
        'Licence stated on the DataMapWales download page: Open Government Licence v3.0.'
    )


def run(*args):
    subprocess.run([str(a) for a in args], check=True)


def tile_range(lo, hi, size):
    return range(lo, hi, size)


def intersects(area, te, tn, size):
    return (
        te < area['eMax'] and te + size > area['eMin'] and tn < area['nMax'] and tn + size > area['nMin']
    )


def main():
    cfg = json.loads((HERE / 'lidar-areas.json').read_text())
    size, fine, coarse = cfg['tileSize'], cfg['detailStep'], cfg['contextStep']
    r = cfg['region']
    for k in ('eMin', 'eMax', 'nMin', 'nMax'):
        if r[k] % size:
            sys.exit(f'region {k}={r[k]} is not a multiple of the tile size {size}')
    if coarse % fine or size % coarse:
        sys.exit('contextStep must be a multiple of detailStep and divide the tile size')

    areas = []
    for a in cfg['areas']:
        h = a['halfSize']
        areas.append(
            {
                'id': a['id'],
                'name': a['name'],
                'centre': a['centre'],
                'eMin': a['centre']['e'] - h,
                'eMax': a['centre']['e'] + h,
                'nMin': a['centre']['n'] - h,
                'nMax': a['centre']['n'] + h,
            }
        )

    WORK.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    rasters = sorted(RAW.glob('*.tif'))
    if not rasters:
        sys.exit(f'no GeoTIFFs in {RAW}: run tools/terrain/fetch-lidar.sh first')
    vrt = WORK / 'dtm.vrt'
    run('gdalbuildvrt', '-q', '-a_srs', 'EPSG:27700', vrt, *rasters)

    half = fine / 2
    width = (r['eMax'] - r['eMin']) // fine + 1
    height = (r['nMax'] - r['nMin']) // fine + 1
    tif = WORK / 'dtm-detail.tif'
    run(
        'gdalwarp', '-q', '-overwrite', '-te', r['eMin'] - half, r['nMin'] - half, r['eMax'] + half,
        r['nMax'] + half, '-tr', fine, fine, '-r', 'average', '-ot', 'Float32', '-dstnodata', '-9999', vrt, tif,
    )
    raw = WORK / 'dtm-detail.f32'
    run('gdal_translate', '-q', '-of', 'ENVI', '-ot', 'Float32', tif, raw)
    grid = np.fromfile(raw, dtype='<f4').reshape(height, width)
    if (grid == -9999).any() or not np.isfinite(grid).all():
        sys.exit('the DTM has holes inside the region')
    print(f'dewidebug lidar detail raster {width}x{height} at {fine}m, heights {grid.min():.2f}-{grid.max():.2f} m')

    tiles = []
    total = 0
    for tn in tile_range(r['nMin'], r['nMax'], size):
        for te in tile_range(r['eMin'], r['eMax'], size):
            priority = [a['id'] for a in areas if intersects(a, te, tn, size)]
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
            name = f'{te}_{tn}.bin'
            (OUT / name).write_bytes(data.tobytes())
            total += data.nbytes
            tiles.append(
                {
                    'e': te,
                    'n': tn,
                    'step': step,
                    'file': name,
                    'bytes': data.nbytes,
                    'minHeight': float(data.min()) * HEIGHT_SCALE,
                    'maxHeight': float(data.max()) * HEIGHT_SCALE,
                    'areas': priority,
                }
            )
    keep = {t['file'] for t in tiles}
    for stale in OUT.glob('*.bin'):
        if stale.name not in keep:
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
        'tileSize': size,
        'heightScale': HEIGHT_SCALE,
        'blendMetres': cfg['blendMetres'],
        'region': r,
        'areas': areas,
        'encoding': 'uint16 little-endian, centimetres, row-major from the north-west corner; (tileSize/step + 1) vertices per side, edge vertices shared with the neighbouring tile',
        'tiles': tiles,
        'source': {
            'product': 'Welsh Government LiDAR tile catalogue 2020-2023, 1m DTM (bare earth)',
            'publisher': 'Welsh Government, via DataMapWales (https://datamap.gov.wales/)',
            'credit': credit(flown),
            'tiles': sources,
        },
    }
    (OUT / 'lidar.json').write_text(json.dumps(manifest, indent=1) + '\n')
    fine_tiles = sum(1 for t in tiles if t['step'] == fine)
    print(
        f'dewidebug lidar wrote {len(tiles)} tiles ({fine_tiles} at {fine}m, {len(tiles) - fine_tiles} at {coarse}m), '
        f'{total} bytes of heights, {len(sources)} source rasters'
    )


main()
