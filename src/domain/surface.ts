export class Surface {
  private readonly buckets = new Map<number, number[]>();
  private readonly minX: number;
  private readonly minZ: number;
  private readonly columns: number;

  constructor(
    private readonly positions: ArrayLike<number>,
    private readonly cell = 25,
  ) {
    let minX = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    for (let i = 0; i < positions.length; i += 3) {
      minX = Math.min(minX, positions[i] ?? 0);
      maxX = Math.max(maxX, positions[i] ?? 0);
      minZ = Math.min(minZ, positions[i + 2] ?? 0);
    }
    this.minX = minX;
    this.minZ = minZ;
    this.columns = Math.max(1, Math.ceil((maxX - minX) / cell) + 1);
    for (let t = 0; t * 9 < positions.length; t++) {
      const xs = [positions[t * 9] ?? 0, positions[t * 9 + 3] ?? 0, positions[t * 9 + 6] ?? 0];
      const zs = [positions[t * 9 + 2] ?? 0, positions[t * 9 + 5] ?? 0, positions[t * 9 + 8] ?? 0];
      const c0 = this.col(Math.min(...xs));
      const c1 = this.col(Math.max(...xs));
      const r0 = this.row(Math.min(...zs));
      const r1 = this.row(Math.max(...zs));
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const k = r * this.columns + c;
          const list = this.buckets.get(k);
          if (list) list.push(t);
          else this.buckets.set(k, [t]);
        }
      }
    }
  }

  private col(x: number): number {
    return Math.floor((x - this.minX) / this.cell);
  }

  private row(z: number): number {
    return Math.floor((z - this.minZ) / this.cell);
  }

  heightAt(x: number, z: number): number | undefined {
    const list = this.buckets.get(this.row(z) * this.columns + this.col(x));
    if (!list) return undefined;
    const p = this.positions;
    for (const t of list) {
      const ax = p[t * 9] ?? 0;
      const ay = p[t * 9 + 1] ?? 0;
      const az = p[t * 9 + 2] ?? 0;
      const bx = p[t * 9 + 3] ?? 0;
      const by = p[t * 9 + 4] ?? 0;
      const bz = p[t * 9 + 5] ?? 0;
      const cx = p[t * 9 + 6] ?? 0;
      const cy = p[t * 9 + 7] ?? 0;
      const cz = p[t * 9 + 8] ?? 0;
      const det = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
      if (det === 0) continue;
      const u = ((bz - cz) * (x - cx) + (cx - bx) * (z - cz)) / det;
      const v = ((cz - az) * (x - cx) + (ax - cx) * (z - cz)) / det;
      const w = 1 - u - v;
      const e = -1e-9;
      if (u >= e && v >= e && w >= e) return u * ay + v * by + w * cy;
    }
    return undefined;
  }
}
