"""Turn one library photograph into a texture the landmark models use (ADR 0055).

python3 -I tools/textures/process.py <in.jpg> <out.webp> <size> color <detail>
python3 -I tools/textures/process.py <in.jpg> <out.webp> <size> normal

A colour map is divided by its own mean, so its average is mid-grey: the app multiplies it by the material's
own colour (src/domain/materials.ts) and by two, so a model keeps the valley's palette and the photograph adds
only its light and dark. `detail` scales how far it strays from that mean. A normal map is resized and its
vectors made unit length again; its strength is set in the app.
"""

import sys

import numpy as np
from PIL import Image

QUALITY = {"color": 82, "normal": 80}
TINY = 1e-6


def main():
    src, out, size, kind = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
    img = Image.open(src).convert("RGB").resize((size, size), Image.Resampling.LANCZOS)
    a = np.asarray(img, dtype=np.float64) / 255
    if kind == "color":
        detail = float(sys.argv[5])
        mean = a.reshape(-1, 3).mean(axis=0)
        a = 0.5 * (1 + detail * (a / mean - 1))
    elif kind == "normal":
        v = a * 2 - 1
        v /= np.maximum(np.linalg.norm(v, axis=2, keepdims=True), TINY)
        a = (v + 1) / 2
    else:
        raise SystemExit(f"unknown map kind {kind}")
    rgb = np.clip(np.round(a * 255), 0, 255).astype(np.uint8)
    Image.fromarray(rgb, "RGB").save(out, "WEBP", quality=QUALITY[kind], method=6)
    print(f"dewidebug texture {out} size={size} kind={kind}")


main()
