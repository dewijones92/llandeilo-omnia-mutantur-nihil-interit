"""Builds an editable Blender terrain of one LiDAR area from the committed tiles.

    blender -b -P tools/terrain/export-blender.py -- <area id> <out.blend> [step metres]

The area ids are those in tools/terrain/lidar-areas.json ("llandeilo", "roman-forts", "dinefwr-castle",
"carreg-cennen-castle", "dryslwyn-castle"), whichever region holds them. The terrain is
one mesh object per 500m tile, named terrain_<easting>_<northing>_<step>m, under an empty named for
the area. Blender's axes are the OS grid's: X east, Y north, Z up, all in metres, with the empty at the
grid reference stored in its custom properties (os_origin_e, os_origin_n), so a model built in the
scene lands on the right ground. Tile edges share vertices, so the tiles join without a seam. The
height is the LiDAR's own (bare earth, metres above Ordnance Datum); nothing is exaggerated.
"""
import json
import sys
from pathlib import Path

import bpy
import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DATA = ROOT / 'public' / 'data' / 'lidar'

args = sys.argv[sys.argv.index('--') + 1 :] if '--' in sys.argv else []
if len(args) < 2:
    sys.exit('usage: blender -b -P tools/terrain/export-blender.py -- <area id> <out.blend> [step metres]')
area_id, out = args[0], Path(args[1])
manifest = json.loads((DATA / 'lidar.json').read_text())
area = next((a for a in manifest['areas'] if a['id'] == area_id), None)
if area is None:
    sys.exit(f"no area {area_id!r}; the areas are {[a['id'] for a in manifest['areas']]}")
size = manifest['tileSize']
scale = manifest['heightScale']
tiles = [
    t
    for t in manifest['tiles']
    if t['e'] < area['eMax'] and t['e'] + size > area['eMin'] and t['n'] < area['nMax'] and t['n'] + size > area['nMin']
]
finest = min(t['step'] for t in tiles)
step = int(args[2]) if len(args) > 2 else finest
if step % finest or size % step:
    sys.exit(f'step {step} must be a multiple of {finest} that divides {size}')

origin_e = min(t['e'] for t in tiles)
origin_n = min(t['n'] for t in tiles)

bpy.ops.wm.read_factory_settings(use_empty=True)
collection = bpy.context.scene.collection
root = bpy.data.objects.new(f'terrain_{area_id}', None)
root.empty_display_type = 'PLAIN_AXES'
root['crs'] = manifest['crs']
root['os_origin_e'] = origin_e
root['os_origin_n'] = origin_n
root['vertical_datum'] = 'not stated by the source; agrees with OS Terrain 50 (Ordnance Datum Newlyn) to about 0.2m on average'
root['source'] = manifest['source']['credit']
root['licence_note'] = 'Open Government Licence v3.0 per the DataMapWales LiDAR download page; the tile catalogue entry states none'
root['area'] = area['name']
collection.objects.link(root)

total_vertices = 0
total_faces = 0
for t in sorted(tiles, key=lambda t: (t['n'], t['e'])):
    stored = size // t['step'] + 1
    grid = (
        np.fromfile(DATA / manifest['data'], dtype='<u2', count=stored * stored, offset=t['offset'])
        .reshape(stored, stored)
        .astype(np.float64)
        * scale
    )
    stride = step // t['step']
    grid = grid[::stride, ::stride]
    side = grid.shape[0]
    cols, rows = np.meshgrid(np.arange(side) * step, np.arange(side) * step)
    xs = (t['e'] - origin_e) + cols
    ys = (t['n'] + size - origin_n) - rows
    verts = np.column_stack([xs.ravel(), ys.ravel(), grid.ravel()])
    idx = np.arange(side * side).reshape(side, side)
    a, b, c, d = idx[:-1, :-1].ravel(), idx[:-1, 1:].ravel(), idx[1:, 1:].ravel(), idx[1:, :-1].ravel()
    faces = np.column_stack([a, d, c, b])
    mesh = bpy.data.meshes.new(f"terrain_{t['e']}_{t['n']}_{step}m")
    mesh.from_pydata(verts.tolist(), [], faces.tolist())
    mesh.update()
    obj = bpy.data.objects.new(mesh.name, mesh)
    obj.parent = root
    obj.location = (0, 0, 0)
    obj['tile_e'] = t['e']
    obj['tile_n'] = t['n']
    obj['source_step_m'] = t['step']
    collection.objects.link(obj)
    total_vertices += len(verts)
    total_faces += len(faces)

out.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(out))
print(
    f'dewidebug blender {area_id}: {len(tiles)} tile objects, {total_vertices} vertices, {total_faces} quads at {step}m, '
    f'origin E {origin_e} N {origin_n}, saved {out} ({out.stat().st_size} bytes)'
)
