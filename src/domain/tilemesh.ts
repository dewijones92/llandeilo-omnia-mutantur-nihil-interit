export interface TileGeometry {
  readonly positions: Float32Array;
  readonly normals: Float32Array;
  readonly triangles: number;
  readonly groundTriangles: number;
}

function checkHeights(heights: Float32Array, cells: number): void {
  if (heights.length !== (cells + 1) ** 2)
    throw new Error(
      `a tile of ${String(cells)} cells has ${String(heights.length)} heights, expected ${String((cells + 1) ** 2)}`,
    );
}

// Which way a cell is cut into two triangles: along nw-se when that diagonal is the flatter one.
function cutsNorthWestToSouthEast(nw: number, ne: number, sw: number, se: number): boolean {
  return Math.abs(nw - se) <= Math.abs(ne - sw);
}

export function groundTriangleCount(cells: number): number {
  return cells * cells * 2;
}

// Two triangles a cell, and two for each segment of a skirt along each of the four edges.
export function tileTriangleCount(cells: number): number {
  return groundTriangleCount(cells) + cells * 8;
}

// Flat-shaded triangles for a square tile of `cells` x `cells` cells from its (cells + 1) squared
// vertex `heights`, row by row from the north-west corner. x runs east and z north; (originX,
// originZ) is the north-west corner and `spacing` the size of a cell. The ground triangles come
// first, cell by cell, and then the skirt: for each segment along the edge, north, south, west and
// east in turn. A skirt hangs `skirt` below the edge so a neighbour drawn at another step leaves
// no gap. Triangles are wound as Babylon draws them: a face seen from outside has its cross
// product pointing away.
export function tileGeometry(
  heights: Float32Array,
  cells: number,
  spacing: number,
  originX: number,
  originZ: number,
  skirt: number,
): TileGeometry {
  const side = cells + 1;
  checkHeights(heights, cells);
  const triangles = tileTriangleCount(cells);
  const positions = new Float32Array(triangles * 9);
  const normals = new Float32Array(triangles * 9);
  let o = 0;

  const emit = (
    ax: number,
    ay: number,
    az: number,
    bx: number,
    by: number,
    bz: number,
    cx: number,
    cy: number,
    cz: number,
    outX: number,
    outZ: number,
  ): void => {
    const nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    const ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    const nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    const toward = outX === 0 && outZ === 0 ? ny : nx * outX + nz * outZ;
    const swap = toward > 0;
    const scale = (swap ? 1 : -1) / (Math.hypot(nx, ny, nz) || 1);
    const sx = nx * scale;
    const sy = ny * scale;
    const sz = nz * scale;
    positions[o] = ax;
    positions[o + 1] = ay;
    positions[o + 2] = az;
    positions[o + 3] = swap ? cx : bx;
    positions[o + 4] = swap ? cy : by;
    positions[o + 5] = swap ? cz : bz;
    positions[o + 6] = swap ? bx : cx;
    positions[o + 7] = swap ? by : cy;
    positions[o + 8] = swap ? bz : cz;
    for (let v = 0; v < 3; v++) {
      normals[o + v * 3] = sx;
      normals[o + v * 3 + 1] = sy;
      normals[o + v * 3 + 2] = sz;
    }
    o += 9;
  };

  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      const x0 = originX + j * spacing;
      const x1 = x0 + spacing;
      const z0 = originZ - i * spacing;
      const z1 = z0 - spacing;
      const nw = heights[i * side + j] ?? 0;
      const ne = heights[i * side + j + 1] ?? 0;
      const sw = heights[(i + 1) * side + j] ?? 0;
      const se = heights[(i + 1) * side + j + 1] ?? 0;
      if (cutsNorthWestToSouthEast(nw, ne, sw, se)) {
        emit(x0, nw, z0, x1, ne, z0, x1, se, z1, 0, 0);
        emit(x0, nw, z0, x1, se, z1, x0, sw, z1, 0, 0);
      } else {
        emit(x0, nw, z0, x1, ne, z0, x0, sw, z1, 0, 0);
        emit(x1, ne, z0, x1, se, z1, x0, sw, z1, 0, 0);
      }
    }
  }

  const hang = (
    ax: number,
    ay: number,
    az: number,
    bx: number,
    by: number,
    bz: number,
    outX: number,
    outZ: number,
  ): void => {
    emit(ax, ay, az, bx, by, bz, bx, by - skirt, bz, outX, outZ);
    emit(ax, ay, az, bx, by - skirt, bz, ax, ay - skirt, az, outX, outZ);
  };
  const lastRow = cells * side;
  const farX = originX + cells * spacing;
  const farZ = originZ - cells * spacing;
  for (let k = 0; k < cells; k++) {
    const x0 = originX + k * spacing;
    const x1 = x0 + spacing;
    const z0 = originZ - k * spacing;
    const z1 = z0 - spacing;
    hang(x0, heights[k] ?? 0, originZ, x1, heights[k + 1] ?? 0, originZ, 0, 1);
    hang(x0, heights[lastRow + k] ?? 0, farZ, x1, heights[lastRow + k + 1] ?? 0, farZ, 0, -1);
    hang(originX, heights[k * side] ?? 0, z0, originX, heights[(k + 1) * side] ?? 0, z1, -1, 0);
    hang(farX, heights[k * side + cells] ?? 0, z0, farX, heights[(k + 1) * side + cells] ?? 0, z1, 1, 0);
  }
  return { positions, normals, triangles, groundTriangles: groundTriangleCount(cells) };
}

// The height of the surface `tileGeometry` draws at (x, z), from the same (cells + 1) squared `heights` and
// the same cut of each cell into triangles; undefined outside the tile.
export function tileSurfaceAt(
  heights: Float32Array,
  cells: number,
  spacing: number,
  originX: number,
  originZ: number,
  x: number,
  z: number,
): number | undefined {
  checkHeights(heights, cells);
  const side = cells + 1;
  const east = (x - originX) / spacing;
  const south = (originZ - z) / spacing;
  if (east < 0 || south < 0 || east > cells || south > cells) return undefined;
  const j = Math.min(cells - 1, Math.floor(east));
  const i = Math.min(cells - 1, Math.floor(south));
  const u = east - j;
  const v = south - i;
  const nw = heights[i * side + j] ?? 0;
  const ne = heights[i * side + j + 1] ?? 0;
  const sw = heights[(i + 1) * side + j] ?? 0;
  const se = heights[(i + 1) * side + j + 1] ?? 0;
  if (cutsNorthWestToSouthEast(nw, ne, sw, se))
    return u >= v ? nw + u * (ne - nw) + v * (se - ne) : nw + u * (se - sw) + v * (sw - nw);
  return u + v <= 1 ? nw + u * (ne - nw) + v * (sw - nw) : se + (1 - u) * (sw - se) + (1 - v) * (ne - se);
}
