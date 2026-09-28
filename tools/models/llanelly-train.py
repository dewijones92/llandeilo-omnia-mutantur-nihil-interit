import math
import sys

import bpy

OUT = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "public/models/llanelly-train.glb"
PREVIEW = sys.argv[sys.argv.index("--") + 2] if "--" in sys.argv and len(sys.argv) > sys.argv.index("--") + 2 else None

GAUGE_HALF = 0.72
WHEEL_R = 0.61
WHEELBASE = 2.59

COLOURS = {
    "boiler": "#3d5a45",
    "brass": "#c9a24a",
    "black": "#232527",
    "copper": "#b5653a",
    "wheel": "#5b2620",
    "beam": "#9a3326",
    "wood": "#6b4a2c",
    "iron": "#2c2c2c",
    "coal": "#161616",
    "fire": "#e0772e",
    "carriage": "#6e2c24",
    "window": "#d8c7a0",
    "roof": "#7d7f80",
}


def rgba(name):
    h = COLOURS[name].lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)


parts = []


def finish(obj, colour):
    mesh = obj.data
    attr = mesh.color_attributes.new(name="Col", type="BYTE_COLOR", domain="CORNER")
    c = rgba(colour)
    for datum in attr.data:
        datum.color = c
    mesh.color_attributes.active_color = attr
    parts.append(obj)
    return obj


def box(x, y, z, sx, sy, sz, colour):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    obj = bpy.context.active_object
    obj.scale = (sx, sy, sz)
    return finish(obj, colour)


def cyl(x, y, z, r, depth, colour, axis="Z", verts=12):
    rot = {"Z": (0, 0, 0), "X": (0, math.pi / 2, 0), "Y": (math.pi / 2, 0, 0)}[axis]
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=(x, y, z), rotation=rot)
    return finish(bpy.context.active_object, colour)


def cone(x, y, z, r1, r2, depth, colour, verts=12):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r1, radius2=r2, depth=depth, location=(x, y, z))
    return finish(bpy.context.active_object, colour)


def wheel(x, y, r, colour="wheel"):
    cyl(x, y, r, r, 0.12, colour, axis="Y", verts=14)
    cyl(x, y + (0.07 if y > 0 else -0.07), r, r * 0.22, 0.06, "iron", axis="Y", verts=8)


def engine():
    boiler_z = 1.7
    cyl(0.08, 0, boiler_z, 0.65, 3.66, "boiler", axis="X", verts=16)
    for x in (-1.2, 0.08, 1.36):
        cyl(x, 0, boiler_z, 0.66, 0.06, "brass", axis="X", verts=16)
    cyl(0.08, 0, 2.5, 0.3, 0.35, "brass")
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=6, radius=0.3, location=(0.08, 0, 2.68))
    finish(bpy.context.active_object, "brass")
    box(-1.95, 0, 1.65, 0.4, 1.45, 1.4, "black")
    box(-2.16, 0, 1.45, 0.02, 0.45, 0.4, "fire")
    cyl(-1.95, 0, 3.05, 0.19, 1.6, "black")
    cyl(-1.95, 0, 3.9, 0.26, 0.14, "copper")
    for sx in (-1, 1):
        for x in (-WHEELBASE / 2, 0, WHEELBASE / 2):
            wheel(x, sx * GAUGE_HALF, WHEEL_R)
        cyl(1.35, sx * 0.98, 1.0, 0.19, 0.8, "black", axis="X", verts=10)
        box(0.65, sx * 0.86, 0.8, 1.4, 0.05, 0.08, "iron")
        box(0, sx * 0.82, 0.78, WHEELBASE + 0.2, 0.04, 0.07, "iron")
    box(0.05, 0, 1.0, 4.4, 1.1, 0.16, "iron")
    box(2.1, 0, 1.12, 0.62, 1.9, 0.07, "wood")
    for sy in (-0.9, 0.9):
        cyl(2.38, sy, 1.55, 0.025, 0.9, "iron", verts=6)
    box(2.38, 0, 1.98, 0.05, 1.85, 0.05, "iron")
    cyl(1.95, 0, 1.55, 0.05, 0.9, "brass", verts=8)
    for x, z in ((2.48, 1.0), (-2.3, 1.0)):
        box(x, 0, z, 0.14, 2.1, 0.3, "beam")
        for sy in (-0.7, 0.7):
            cyl(x + (0.12 if x > 0 else -0.12), sy, z, 0.11, 0.18, "black", axis="X", verts=8)


def tender(x0):
    length = 3.2
    cx = x0 - length / 2
    for x in (x0 - 0.7, x0 - length + 0.7):
        for sy in (-1, 1):
            wheel(x, sy * GAUGE_HALF, 0.5, "iron")
    box(cx, 0, 0.95, length, 1.7, 0.18, "iron")
    box(cx - 0.35, 0, 1.55, length - 0.7, 1.9, 1.05, "wood")
    for x in (cx - length / 2 + 0.4, cx + 0.2):
        box(x, 0, 1.55, 0.05, 1.93, 1.07, "iron")
    box(x0 - 0.35, 0, 1.2, 0.6, 1.7, 0.35, "coal")
    return x0 - length


def carriage(x0):
    length = 4.6
    cx = x0 - length / 2
    for x in (x0 - 1.0, x0 - length + 1.0):
        for sy in (-1, 1):
            wheel(x, sy * GAUGE_HALF, 0.5, "iron")
    box(cx, 0, 0.95, length, 1.8, 0.2, "iron")
    box(cx, 0, 1.85, length, 2.3, 1.55, "carriage")
    box(cx, 0, 2.15, length - 0.4, 2.32, 0.42, "window")
    for k in range(3):
        box(x0 - 0.75 - k * 1.55, 0, 2.15, 0.12, 2.34, 0.44, "carriage")
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=1.2, depth=length + 0.1, location=(cx, 0, 2.6), rotation=(0, math.pi / 2, 0))
    roof = bpy.context.active_object
    roof.scale = (0.25, 1, 1)
    finish(roof, "roof")
    return x0 - length


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    engine()
    x = tender(-2.55)
    for _ in range(3):
        x = carriage(x - 0.4)
    bpy.ops.object.select_all(action="DESELECT")
    for p in parts:
        p.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    bpy.ops.object.join()
    train = bpy.context.active_object
    train.name = "llanelly-train"
    train.data.name = "llanelly-train"
    bpy.ops.object.shade_flat()
    bpy.ops.object.empty_add(location=(-1.95, 0, 3.97))
    bpy.context.active_object.name = "chimney"
    print(f"dewidebug train verts={len(train.data.vertices)} faces={len(train.data.polygons)} length={train.dimensions.x:.2f}m")
    bpy.ops.export_scene.gltf(
        filepath=OUT,
        export_format="GLB",
        export_colors=True,
        export_normals=True,
        export_materials="NONE",
        export_yup=True,
    )
    print(f"dewidebug train exported {OUT}")
    if PREVIEW:
        scene = bpy.context.scene
        scene.render.engine = "BLENDER_WORKBENCH"
        scene.display.shading.color_type = "VERTEX"
        scene.display.shading.light = "STUDIO"
        scene.render.resolution_x = 1400
        scene.render.resolution_y = 700
        scene.render.filepath = PREVIEW
        bpy.ops.object.camera_add(location=(4, -16, 6), rotation=(math.radians(74), 0, math.radians(14)))
        scene.camera = bpy.context.active_object
        scene.camera.data.lens = 38
        bpy.ops.render.render(write_still=True)
        print(f"dewidebug train preview {PREVIEW}")


main()
