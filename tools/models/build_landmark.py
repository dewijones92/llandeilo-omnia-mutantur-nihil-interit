"""Build one landmark's Blender models from its build sheets (ADR 0053).

Run headless: blender -b --factory-startup -P tools/models/build_landmark.py -- <out dir> <sheet.json>...

TypeScript decides, Blender dresses: every measurement comes from the sheet, worked out by
src/domain/buildsheet.ts from the typed plan and the kit catalogue (src/content/kits.ts). This script
holds no history. What it adds on its own is finish that claims nothing: bevels and a small,
seeded variation in colour.

Blender X is east, Y is north and Z is up, in metres from the feature's grid reference, which is kept
in the scene's custom properties, never in vertex positions.
"""

import json
import math
import os
import random
import re
import sys

import bmesh
import bpy

SCRIPT_VERSION = "1"
BLENDER = (4, 0)
STEP = 6.0
BEVEL = 0.025
GAP = 0.03


def fail(message):
    print(f"dewidebug landmark build failed: {message}")
    sys.exit(1)


def rgb(hex_colour):
    h = hex_colour.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def shade(c, k):
    return (min(1, c[0] * k), min(1, c[1] * k), min(1, c[2] * k))


def toward(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))


class Solids:
    """Closed solids with shared vertices, so bevels have edges to work on; one colour per face."""

    def __init__(self, seed):
        self.v = []
        self.f = []
        self.c = []
        self.bevelled = []
        self.random = random.Random(seed)

    def jitter(self, colour, spread=0.07):
        return shade(colour, 1 + (self.random.random() * 2 - 1) * spread)

    def solid(self, verts, faces, cols, bevel=False):
        base = len(self.v)
        self.v.extend(verts)
        for face, col in zip(faces, cols):
            self.f.append(tuple(base + i for i in face))
            self.c.append(col)
            self.bevelled.append(bevel)

    def prism(self, outline, z0, z1, col, top=None, bevel=False):
        n = len(outline)
        if area(outline) < 0:
            outline = list(reversed(outline))
        verts = [(x, y, z0) for x, y in outline] + [(x, y, z1) for x, y in outline]
        faces = [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
        faces.append(tuple(range(n, 2 * n)))
        faces.append(tuple(reversed(range(n))))
        cols = [col] * n + [top or col, col]
        self.solid(verts, faces, cols, bevel)

    def box(self, cx, cy, length, width, z0, z1, turn, col, top=None, bevel=False):
        self.prism(rect(cx, cy, length, width, turn), z0, z1, col, top, bevel)

    def timber(self, cx, cy, length, width, z0, z1, turn, col):
        """A squared timber: the one kind of solid whose edges are bevelled, so posts and beams catch the light."""
        self.box(cx, cy, length, width, z0, z1, turn, col, bevel=True)

    def beam(self, a, b, w, h, col):
        """A squared timber from point a to point b (3D), w wide and h deep."""
        d = [b[i] - a[i] for i in range(3)]
        length = math.sqrt(sum(x * x for x in d)) or 1
        d = [x / length for x in d]
        up = (0, 0, 1) if abs(d[2]) < 0.9 else (1, 0, 0)
        s = cross(d, up)
        sl = math.sqrt(sum(x * x for x in s)) or 1
        s = [x / sl * w / 2 for x in s]
        u = cross(s, d)
        ul = math.sqrt(sum(x * x for x in u)) or 1
        u = [x / ul * h / 2 for x in u]
        corners = [(-1, -1), (1, -1), (1, 1), (-1, 1)]
        verts = []
        for p in (a, b):
            for i, j in corners:
                verts.append(tuple(p[k] + s[k] * i + u[k] * j for k in range(3)))
        faces = [(0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7), (3, 2, 1, 0), (4, 5, 6, 7)]
        self.solid(verts, faces, [col] * 6, bevel=True)

    def loft(self, rings, cols):
        """Rings of the same count joined in order, capped at both ends: one solid along a path."""
        n = len(rings[0])
        verts = [p for ring in rings for p in ring]
        faces = []
        fcols = []
        for i in range(len(rings) - 1):
            for j in range(n):
                a = i * n + j
                b = i * n + (j + 1) % n
                faces.append((a, b, b + n, a + n))
                fcols.append(cols[j])
        last = (len(rings) - 1) * n
        faces.append(tuple(reversed(range(n))))
        faces.append(tuple(range(last, last + n)))
        fcols += [cols[0], cols[0]]
        self.solid(verts, faces, fcols)

    def triangles(self):
        return sum(len(f) - 2 for f in self.f)


def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def area(pts):
    return sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts))) / 2


def turned(x, y, turn):
    a = math.radians(turn)
    return (x * math.cos(a) - y * math.sin(a), x * math.sin(a) + y * math.cos(a))


def rect(cx, cy, length, width, turn):
    out = []
    for x, y in ((-length / 2, -width / 2), (length / 2, -width / 2), (length / 2, width / 2), (-length / 2, width / 2)):
        dx, dy = turned(x, y, turn)
        out.append((cx + dx, cy + dy))
    return out


def outline_of(shape, size, turn, cx, cy):
    r = size / 2
    if shape == "square":
        return rect(cx, cy, size, size, turn)
    sides = {"round": 12, "hexagonal": 6, "octagonal": 8}[shape]
    k = r / math.cos(math.pi / sides) if shape != "round" else r
    return [(cx + k * math.cos(math.radians(turn) + 2 * math.pi * i / sides), cy + k * math.sin(math.radians(turn) + 2 * math.pi * i / sides)) for i in range(sides)]


def resample(path, step):
    out = [tuple(path[0])]
    for a, b in zip(path, path[1:]):
        length = math.hypot(b[0] - a[0], b[1] - a[1])
        n = max(1, math.ceil(length / step))
        for k in range(1, n + 1):
            t = k / n
            out.append((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t))
    return out


def frames(path, closed):
    """Each station's right-hand normal, mitred so an offset line keeps its width round a bend."""
    n = len(path)
    out = []
    for i in range(n):
        prev = path[i - 1] if (i > 0 or closed) else None
        nxt = path[(i + 1) % n] if (i < n - 1 or closed) else None
        dirs = []
        for a, b in ((prev, path[i]), (path[i], nxt)):
            if a is None or b is None:
                continue
            length = math.hypot(b[0] - a[0], b[1] - a[1]) or 1
            dirs.append(((b[0] - a[0]) / length, (b[1] - a[1]) / length))
        tx = sum(d[0] for d in dirs)
        ty = sum(d[1] for d in dirs)
        tl = math.hypot(tx, ty) or 1
        tx, ty = tx / tl, ty / tl
        miter = 1 / max(0.35, dirs[0][0] * tx + dirs[0][1] * ty)
        out.append(((ty * miter, -tx * miter), (tx, ty)))
    return out


def outward(path):
    """+1 if a path's right hand points away from the anchor (outside a ring drawn round it), else -1."""
    mid = path[len(path) // 2]
    a, b = path[max(0, len(path) // 2 - 1)], path[min(len(path) - 1, len(path) // 2 + 1)]
    right = (b[1] - a[1], -(b[0] - a[0]))
    return 1 if right[0] * mid[0] + right[1] * mid[1] >= 0 else -1


def along_path(path, spacing):
    """Points every `spacing` metres along a path, with the direction there, ends included."""
    total = sum(math.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(path, path[1:]))
    n = max(1, round(total / spacing))
    out = []
    for k in range(n + 1):
        want = total * k / n
        for a, b in zip(path, path[1:]):
            length = math.hypot(b[0] - a[0], b[1] - a[1])
            if want <= length + 1e-9 or b == path[-1]:
                t = 0 if length == 0 else min(1, want / length)
                out.append(((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t), math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))))
                break
            want -= length
    return out


# Walls ----------------------------------------------------------------------------------------------


def wall(m, sheet, part, near):
    s = part["shape"]
    if s["battlements"]:
        fail(f"{part['id']}: battlements are not modelled yet")
    path = resample(s["path"], STEP)
    if s["closed"]:
        path = path[:-1]
    col = rgb(sheet["palette"][part["material"]])
    half = s["thickness"] / 2
    if near and "turf-courses" in part["kits"]:
        turf_bank(m, sheet, part, path, col, half)
    elif near and "post-and-board-breastwork" in part["kits"]:
        breastwork(m, sheet, part, path, col, half)
    else:
        section = [(half, s["bottom"]), (half * s["taper"], s["top"]), (-half * s["taper"], s["top"]), (-half, s["bottom"])]
        loft_along(m, path, s["closed"], section, [col, col, col, col])


def loft_along(m, path, closed, section, cols):
    fr = frames(path, closed)
    rings = [[(p[0] + r[0] * a, p[1] + r[1] * a, z) for a, z in section] for p, (r, _) in zip(path, fr)]
    if closed:
        rings.append(rings[0])
    m.loft(rings, cols)


def turf_bank(m, sheet, part, path, col, half):
    s = part["shape"]
    course = sheet["kits"]["turf-courses"]["course"]
    n = max(2, round(s["top"] / course))
    top_half = half * s["taper"]
    grass = col
    cut = (col[0] * 0.78, col[1] * 0.72, col[2] * 0.6)
    widths = [half + (top_half - half) * k / (n - 1) for k in range(n)]
    right = [(widths[0], s["bottom"])]
    for k, w in enumerate(widths):
        z = s["top"] * (k + 1) / n
        right.append((w, z))
        if k + 1 < n:
            right.append((widths[k + 1], z))
    left = [(-a, z) for a, z in reversed(right)]
    section = right + left
    cols = []
    for i in range(len(section)):
        a, b = section[i], section[(i + 1) % len(section)]
        flat = abs(a[1] - b[1]) < 1e-6
        cols.append(m.jitter(grass, 0.05) if flat else m.jitter(cut, 0.06))
    loft_along(m, path, s["closed"], section, cols)


def breastwork(m, sheet, part, path, col, half):
    s = part["shape"]
    k = sheet["kits"]["post-and-board-breastwork"]
    side = outward(path)
    fr = frames(path, s["closed"])
    seat = s["bottom"]
    for p, turn in along_path(path, k["spacing"]):
        m.box(p[0], p[1], k["post"], k["post"], seat, s["top"] + 0.12, turn, m.jitter(shade(col, 0.9)))
    boards = max(1, round((s["top"] - seat) / k["board"]))
    offset = side * (k["post"] / 2 + 0.04)
    for b in range(boards):
        z0 = seat + (s["top"] - seat) * b / boards
        z1 = seat + (s["top"] - seat) * (b + 1) / boards - GAP
        rings = []
        for p, (r, _) in zip(path, fr):
            rings.append([(p[0] + r[0] * (offset + a), p[1] + r[1] * (offset + a), z) for a, z in ((0.04, z0), (0.04, z1), (-0.04, z1), (-0.04, z0))])
        m.loft(rings, [m.jitter(col)] * 4)


# Towers ---------------------------------------------------------------------------------------------


def tower(m, sheet, part, near):
    s = part["shape"]
    col = rgb(sheet["palette"][part["material"]])
    cx, cy = s["at"]
    kit = next((k for k in ("post-tower-six", "post-tower-four") if k in part["kits"]), None) if near else None
    if kit and s["outline"] == "square":
        post_tower(m, sheet, part, kit, col)
    else:
        m.prism(outline_of(s["outline"], s["size"], s["turn"], cx, cy), s["bottom"], s["top"], col)
    if s["roof"]:
        roof_col = rgb(sheet["palette"][s["roof"]["material"]])
        shingled = near and "shingle-roof" in part["kits"]
        pyramid(m, sheet, cx, cy, s["roof"], s["top"], s["turn"], roof_col, shingled)


def post_tower(m, sheet, part, kit, col):
    s = part["shape"]
    k = sheet["kits"][kit]
    cx, cy = s["at"]
    size = s["size"]
    edge = size / 2 - k["post"] / 2
    xs = (-edge, 0, edge) if kit == "post-tower-six" else (-edge, edge)
    for x in xs:
        for y in (-edge, edge):
            px, py = turned(x, y, s["turn"])
            m.timber(cx + px, cy + py, k["post"], k["post"], s["bottom"], s["top"], s["turn"], m.jitter(shade(col, 0.85)))
    floor = s["top"] - k["stage"]
    m.box(cx, cy, size + 0.1, size + 0.1, floor - 0.15, floor, s["turn"], m.jitter(col))
    boards = max(1, round(k["stage"] / k["board"]))
    for b in range(boards):
        z0 = floor + k["stage"] * b / boards
        z1 = floor + k["stage"] * (b + 1) / boards - GAP
        ring = rect(0, 0, size + 0.16, size + 0.16, 0)
        inner = rect(0, 0, size + 0.04, size + 0.04, 0)
        board_col = m.jitter(col)
        for i in range(4):
            a, c = ring[i], ring[(i + 1) % 4]
            ai, ci = inner[i], inner[(i + 1) % 4]
            quad = [turned(*p, s["turn"]) for p in (a, c, ci, ai)]
            quad = [(cx + x, cy + y) for x, y in quad]
            m.prism(quad, z0, z1, board_col)


def pyramid(m, sheet, cx, cy, roof, base, turn, col, shingled):
    w = roof["length"] / 2
    rise = roof["rise"]
    if roof["kind"] == "cone" or not shingled:
        sides = 12 if roof["kind"] == "cone" else 4
        ring = outline_of("round" if sides == 12 else "square", roof["length"], turn + (0 if sides == 12 else 0), cx, cy)
        verts = [(x, y, base) for x, y in ring] + [(cx, cy, base + rise)]
        n = len(ring)
        faces = [(i, (i + 1) % n, n) for i in range(n)] + [tuple(reversed(range(n)))]
        m.solid(verts, faces, [col] * (n + 1))
        return
    course = sheet["kits"]["shingle-roof"]["course"]
    slope = math.hypot(w, rise)
    n = max(2, math.ceil(slope / course))
    for i in range(n):
        t0, t1 = i / n, min(1, (i + 1) / n + 0.25 / n)
        lip = 0.04
        lo = rect(cx, cy, 2 * (w * (1 - t0) + lip), 2 * (w * (1 - t0) + lip), turn)
        hi = rect(cx, cy, 2 * w * (1 - t1), 2 * w * (1 - t1), turn) if t1 < 1 else None
        z0, z1 = base + rise * t0 - lip, base + rise * t1
        c = m.jitter(col, 0.08)
        if hi is None:
            verts = [(x, y, z0) for x, y in lo] + [(cx, cy, z1)]
            m.solid(verts, [(0, 1, 4), (1, 2, 4), (2, 3, 4), (3, 0, 4), (3, 2, 1, 0)], [c] * 5)
        else:
            verts = [(x, y, z0) for x, y in lo] + [(x, y, z1) for x, y in hi]
            faces = [(j, (j + 1) % 4, 4 + (j + 1) % 4, 4 + j) for j in range(4)] + [(4, 5, 6, 7), (3, 2, 1, 0)]
            m.solid(verts, faces, [c] * 6)


# Halls ----------------------------------------------------------------------------------------------


def hall(m, sheet, part, near):
    s = part["shape"]
    col = rgb(sheet["palette"][part["material"]])
    hinge = part.get("hinge")
    kits = part["kits"] if near else []
    if "ledged-leaf" in kits and hinge:
        leaf(m, sheet, part, col)
        return
    if "plank-deck" in kits:
        deck(m, sheet, part, col)
        return
    cx, cy = (0.0, 0.0) if hinge else s["at"]
    if hinge:
        cx = s["length"] / 2
    turn = 0 if hinge else s["turn"]
    if "timber-frame" in kits:
        framed(m, sheet, part, col, cx, cy, turn)
    else:
        m.box(cx, cy, s["length"], s["width"], s["bottom"], s["top"], turn, col)
    roof = s["roof"]
    if roof:
        roof_col = rgb(sheet["palette"][roof["material"]])
        gable(m, sheet, part, roof, cx, cy, turn, roof_col, col, kits)


def framed(m, sheet, part, col, cx, cy, turn):
    s = part["shape"]
    k = sheet["kits"]["timber-frame"]
    timber = rgb(sheet["palette"]["timber"])
    m.box(cx, cy, s["length"] - 0.06, s["width"] - 0.06, s["bottom"], s["top"], turn, m.jitter(col, 0.04))
    corners = rect(0, 0, s["length"], s["width"], 0)
    for i in range(4):
        a, b = corners[i], corners[(i + 1) % 4]
        length = math.hypot(b[0] - a[0], b[1] - a[1])
        n = max(1, round(length / k["spacing"]))
        heading = math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))
        for j in range(n):
            x = a[0] + (b[0] - a[0]) * j / n
            y = a[1] + (b[1] - a[1]) * j / n
            px, py = turned(x, y, turn)
            post = m.timber if j == 0 else m.box
            post(cx + px, cy + py, k["post"], k["post"], s["bottom"], s["top"], turn + heading, m.jitter(shade(timber, 0.9), 0.05))
        mx, my = turned((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, turn)
        for z0, z1 in ((max(s["bottom"], 0), max(s["bottom"], 0) + k["sill"]), (s["top"] - k["plate"], s["top"])):
            m.timber(cx + mx, cy + my, length + k["post"], k["post"] * 0.8, z0, z1, turn + heading, m.jitter(timber, 0.05))


def gable(m, sheet, part, roof, cx, cy, turn, col, wall_col, kits):
    s = part["shape"]
    top = s["top"]
    L = roof["length"] / 2
    W = roof["width"] / 2
    rise = roof["rise"]

    def at(x, y, z):
        px, py = turned(x, y, turn)
        return (cx + px, cy + py, z)

    thatch = "thatch-roof" in kits
    shingled = "shingle-roof" in kits
    if not (thatch or shingled):
        verts = [at(-L, -W, top), at(L, -W, top), at(L, W, top), at(-L, W, top), at(-L, 0, top + rise), at(L, 0, top + rise)]
        faces = [(0, 1, 5, 4), (2, 3, 4, 5), (1, 2, 5), (3, 0, 4), (3, 2, 1, 0)]
        m.solid(verts, faces, [col] * 5)
        return
    wall_half = s["width"] / 2
    for x in (-s["length"] / 2 + 0.03, s["length"] / 2 - 0.03):
        verts = [at(x - 0.05, -wall_half, top), at(x - 0.05, wall_half, top), at(x - 0.05, 0, top + rise), at(x + 0.05, -wall_half, top), at(x + 0.05, wall_half, top), at(x + 0.05, 0, top + rise)]
        faces = [(0, 1, 2), (5, 4, 3), (0, 3, 4, 1), (1, 4, 5, 2), (2, 5, 3, 0)]
        m.solid(verts, faces, [m.jitter(wall_col, 0.04)] * 5)
    if thatch:
        t = sheet["kits"]["thatch-roof"]["thickness"]
        for side in (-1, 1):
            verts = [
                at(-L, side * W, top - 0.1), at(L, side * W, top - 0.1), at(L, 0, top + rise), at(-L, 0, top + rise),
                at(-L, side * (W - 0.05), top - 0.1 + t), at(L, side * (W - 0.05), top - 0.1 + t), at(L, 0, top + rise + t), at(-L, 0, top + rise + t),
            ]
            faces = [(0, 1, 2, 3), (7, 6, 5, 4), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)]
            m.solid(verts, faces, [m.jitter(col, 0.05)] * 6)
        ring = [(math.cos(a) * t * 0.7, math.sin(a) * t * 0.7) for a in (math.pi * i / 4 for i in range(8))]
        rings = [[at(x, y, top + rise + t * 0.6 + z) for y, z in ring] for x in (-L - 0.05, L + 0.05)]
        m.loft(rings, [shade(col, 0.92)] * 8)
        return
    course = sheet["kits"]["shingle-roof"]["course"]
    slope = math.hypot(W, rise)
    n = max(2, math.ceil(slope / course))
    for side in (-1, 1):
        for i in range(n):
            t0, t1 = i / n, min(1, (i + 1) / n + 0.3 / n)
            y0, y1 = side * W * (1 - t0), side * W * (1 - t1)
            z0, z1 = top + rise * t0 - 0.03, top + rise * t1
            th = 0.05
            c = m.jitter(col, 0.08)
            verts = [at(-L, y0, z0), at(L, y0, z0), at(L, y1, z1), at(-L, y1, z1), at(-L, y0, z0 + th), at(L, y0, z0 + th), at(L, y1, z1 + th), at(-L, y1, z1 + th)]
            faces = [(0, 1, 2, 3), (7, 6, 5, 4), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)]
            m.solid(verts, faces, [c] * 6)
    m.beam(at(-L - 0.1, 0, top + rise + 0.05), at(L + 0.1, 0, top + rise + 0.05), 0.22, 0.18, shade(col, 0.8))


def deck(m, sheet, part, col):
    s = part["shape"]
    k = sheet["kits"]["plank-deck"]
    cx, cy = s["at"]
    turn = s["turn"]
    floor = s["bottom"]
    for y in (-(s["width"] / 2 - k["beam"] / 2), s["width"] / 2 - k["beam"] / 2):
        px, py = turned(0, y, turn)
        m.timber(cx + px, cy + py, s["length"] + 0.8, k["beam"], floor, floor + k["beam"], turn, m.jitter(shade(col, 0.85)))
    planks = max(1, round(s["length"] / k["plank"]))
    for i in range(planks):
        x = -s["length"] / 2 + s["length"] * (i + 0.5) / planks
        px, py = turned(x, 0, turn)
        m.box(cx + px, cy + py, s["length"] / planks - GAP, s["width"], floor + k["beam"], floor + k["beam"] + 0.08, turn, m.jitter(col))
    for y in (-s["width"] / 2 + 0.04, s["width"] / 2 - 0.04):
        px, py = turned(0, y, turn)
        m.box(cx + px, cy + py, s["length"], 0.08, floor + k["beam"], s["top"], turn, m.jitter(col))


def leaf(m, sheet, part, col):
    s = part["shape"]
    k = sheet["kits"]["ledged-leaf"]
    length = s["length"]
    width = s["width"]
    z0 = 0.05
    planks = max(1, round(length / k["plank"]))
    for i in range(planks):
        x = length * (i + 0.5) / planks
        m.box(x, width * 0.15, length / planks - GAP, width * 0.5, z0, s["top"], 0, m.jitter(col))
    back = -width * 0.25
    ledge_col = shade(col, 0.82)
    heights = (z0 + 0.35, (z0 + s["top"]) / 2, s["top"] - 0.35)
    for z in heights:
        m.timber(length / 2, back, length - 0.1, width * 0.4, z - k["ledge"] / 2, z + k["ledge"] / 2, 0, ledge_col)
    m.beam((0.15, back, heights[0]), (length - 0.15, back, heights[1]), k["ledge"] * 0.8, width * 0.4, ledge_col)
    m.beam((0.15, back, heights[1]), (length - 0.15, back, heights[2]), k["ledge"] * 0.8, width * 0.4, ledge_col)


# Objects, collections and export -------------------------------------------------------------------


BUILDERS = {"wall": wall, "tower": tower, "hall": hall}
KNOWN_KITS = {
    "post-tower-six",
    "post-tower-four",
    "turf-courses",
    "post-and-board-breastwork",
    "plank-deck",
    "ledged-leaf",
    "timber-frame",
    "shingle-roof",
    "thatch-roof",
}


def group_of(part_id):
    pieces = part_id.split("/")
    if len(pieces) >= 3:
        return pieces[1]
    return re.sub(r"(-(ne|nw|sw|se|north|south))?(-\d+)?$", "", pieces[-1])


def collection(name, parent):
    c = bpy.data.collections.new(name)
    parent.children.link(c)
    return c


def empty(name, coll, parent=None, location=(0, 0, 0)):
    e = bpy.data.objects.new(name, None)
    e.location = location
    coll.objects.link(e)
    if parent:
        e.parent = parent
    return e


def make_object(name, solids, coll, parent, part_id, near):
    me = bpy.data.meshes.new(name)
    me.from_pydata(solids.v, [], solids.f)
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    weight = bm.edges.layers.float.new("bevel_weight_edge")
    bm.faces.ensure_lookup_table()
    bevelled = 0
    for face in bm.faces:
        if solids.bevelled[face.index]:
            for edge in face.edges:
                edge[weight] = 1.0
            bevelled += 1
    bm.to_mesh(me)
    bm.free()
    attr = me.color_attributes.new(name="Col", type="BYTE_COLOR", domain="CORNER")
    for poly in me.polygons:
        c = solids.c[poly.index]
        for li in poly.loop_indices:
            attr.data[li].color = (c[0], c[1], c[2], 1.0)
    me.color_attributes.active_color = attr
    obj = bpy.data.objects.new(name, me)
    coll.objects.link(obj)
    obj.parent = parent
    obj["part"] = part_id
    if obj.name != name:
        fail(f"object {name} was renamed {obj.name}: part ids must be unique and at most 60 characters")
    if near and bevelled:
        bevel = obj.modifiers.new("finish", "BEVEL")
        bevel.width = BEVEL
        bevel.segments = 1
        bevel.limit_method = "WEIGHT"
    return obj


def build_level(sheet, level, phase_coll):
    near = level == "near"
    suffix = "" if near else "@far"
    coll = collection(f"{sheet['feature']}:{level}", phase_coll)
    root = empty(f"{sheet['feature']}{suffix}", coll)
    probe = empty(f"_probe{suffix}", coll, root, (sheet["probe"][0], sheet["probe"][1], 0))
    probe["probe"] = 1
    groups = {}
    wanted = set(sheet["levels"][level])
    triangles = 0
    for part in sheet["parts"]:
        if part["id"] not in wanted:
            continue
        for kit in part["kits"]:
            if kit not in KNOWN_KITS:
                fail(f"{part['id']}: unknown kit {kit}")
        g = group_of(part["id"])
        if g not in groups:
            groups[g] = (collection(f"{sheet['feature']}:{level}:{g}", coll), empty(f"{sheet['feature']}/{g}{suffix}", coll, root))
        gcoll, gparent = groups[g]
        solids = Solids(f"{part['id']}:{level}")
        BUILDERS[part["shape"]["type"]](solids, sheet, part, near)
        obj = make_object(f"{part['id']}{suffix}", solids, gcoll, gparent, part["id"], near)
        hinge = part.get("hinge")
        if hinge:
            obj.location = (hinge["at"][0], hinge["at"][1], 0)
            obj.rotation_euler = (0, 0, math.radians(hinge["drawn"]))
            obj["hinge_closed"] = hinge["closed"]
            obj["hinge_drawn"] = hinge["drawn"]
        triangles += solids.triangles()
    print(f"dewidebug landmark {sheet['feature']} {level} parts={len(wanted)} groups={len(groups)} triangles_before_bevel={triangles}")
    return coll


def export(coll, path):
    layer = find_layer(bpy.context.view_layer.layer_collection, coll.name)
    if layer is None:
        fail(f"no layer for {coll.name}")
    bpy.context.view_layer.active_layer_collection = layer
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        use_active_collection=True,
        use_active_collection_with_nested=True,
        export_extras=True,
        export_apply=True,
        export_colors=True,
        export_normals=False,
        export_texcoords=False,
        export_materials="NONE",
        export_yup=True,
    )
    print(f"dewidebug landmark exported {path} bytes={os.path.getsize(path)}")


def find_layer(layer, name):
    if layer.collection.name == name:
        return layer
    for child in layer.children:
        found = find_layer(child, name)
        if found:
            return found
    return None


def preview(coll, path, sheet):
    scene = bpy.context.scene
    for other in bpy.data.collections:
        if other.name.endswith(":near") or other.name.endswith(":far"):
            other.hide_render = other.name != coll.name
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.color_type = "VERTEX"
    scene.display.shading.light = "STUDIO"
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 1000
    scene.render.filepath = path
    cam = bpy.data.objects.get("preview-camera")
    if cam is None:
        cam = bpy.data.objects.new("preview-camera", bpy.data.cameras.new("preview-camera"))
        scene.collection.objects.link(cam)
    target = sheet["levels"]["near"]
    xs = [p["shape"]["at"][0] for p in sheet["parts"] if "at" in p["shape"] and p["id"] in target] or [0]
    ys = [p["shape"]["at"][1] for p in sheet["parts"] if "at" in p["shape"] and p["id"] in target] or [0]
    cx, cy = sum(xs) / len(xs), sum(ys) / len(ys)
    span = max(40, max(xs) - min(xs), max(ys) - min(ys))
    cam.location = (cx - span * 0.55, cy - span * 0.75, span * 0.55)
    direction = (cx - cam.location[0], cy - cam.location[1], -cam.location[2])
    cam.rotation_euler = (math.atan2(math.hypot(direction[0], direction[1]), -direction[2]), 0, math.atan2(direction[1], direction[0]) - math.pi / 2)
    cam.data.lens = 35
    cam.data.clip_end = 5000
    scene.camera = cam
    bpy.ops.render.render(write_still=True)
    print(f"dewidebug landmark preview {path}")


def main():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    if len(argv) < 2:
        fail("usage: -- <out dir> <sheet.json>... [--preview]")
    want_preview = "--preview" in argv
    argv = [a for a in argv if a != "--preview"]
    out, sheets = argv[0], argv[1:]
    if tuple(bpy.app.version[:2]) != BLENDER and os.environ.get("LANDMARK_ANY_BLENDER") != "1":
        fail(f"Blender {bpy.app.version_string} is not {BLENDER}: set LANDMARK_ANY_BLENDER=1 to build anyway, then rebuild every model")
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0
    loaded = [json.load(open(p, encoding="utf-8")) for p in sheets]
    landmarks = {s["landmark"] for s in loaded}
    if len(landmarks) != 1:
        fail(f"one landmark per run, got {sorted(landmarks)}")
    landmark = landmarks.pop()
    top = collection(f"landmark:{landmark}", scene.collection)
    scene["landmark"] = landmark
    scene["script"] = SCRIPT_VERSION
    for sheet in loaded:
        if sheet["format"] != 1:
            fail(f"{sheet['feature']}: sheet format {sheet['format']} is not 1")
        phase = collection(f"phase:{sheet['feature']}", top)
        phase["crs"] = sheet["crs"]
        phase["anchor_e"] = sheet["anchor"]["e"]
        phase["anchor_n"] = sheet["anchor"]["n"]
        for level in ("near", "far"):
            coll = build_level(sheet, level, phase)
            export(coll, os.path.join(out, f"{sheet['feature']}.{level}.raw.glb"))
            if want_preview and level == "near":
                preview(coll, os.path.join(out, f"{sheet['feature']}.{level}.png"), sheet)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out, f"{landmark}.blend"))
    print(f"dewidebug landmark {landmark} built {len(loaded)} features")


main()
