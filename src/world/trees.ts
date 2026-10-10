import {
  Color3,
  Matrix,
  Mesh,
  MeshBuilder,
  Quaternion,
  StandardMaterial,
  Vector3,
  VertexData,
  type Scene,
} from './babylon.ts';
import { snowCover, type SeasonLook } from '../domain/daylight.ts';
import { leafRolls, treeSites } from '../domain/tree.ts';
import { COVER_CODE } from './landcover.ts';
import type { Terrain } from './terrain.ts';

type Rgb3 = readonly [number, number, number];

interface Candidate {
  readonly tri: number;
  readonly seed: number;
  readonly x: number;
  readonly z: number;
  // Uniform in [0, 1): the tree is drawn when this is below the quality's tree density.
  readonly rank: number;
  readonly matrix: Float32Array;
  readonly shade: number;
  readonly conifer: boolean;
  readonly heightM: number;
  readonly north: number;
  readonly jitter: number;
}

const LEAF: Readonly<Record<'spring' | 'summer', Rgb3>> = {
  spring: [0.4, 0.62, 0.28],
  summer: [0.28, 0.5, 0.26],
};
const CONIFER: Rgb3 = [0.2, 0.42, 0.3];
const AUTUMN: readonly Rgb3[] = [
  [0.62, 0.4, 0.16],
  [0.58, 0.33, 0.13],
  [0.49, 0.27, 0.13],
  [0.5, 0.45, 0.19],
  [0.64, 0.48, 0.18],
];
const BARE: Rgb3 = [0.5, 0.45, 0.4];
const BLOSSOM: readonly Rgb3[] = [
  [0.97, 0.93, 0.9],
  [0.96, 0.8, 0.86],
];
const SNOW: Rgb3 = [0.93, 0.95, 0.97];

function pick<T>(list: readonly T[], r: number, fallback: T): T {
  return list[Math.floor(r * list.length) % list.length] ?? fallback;
}

function mix3(a: Rgb3, b: Rgb3, t: number): Rgb3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function treeColour(c: Candidate, look: SeasonLook): Rgb3 {
  const snow = snowCover(look, c.heightM, c.north, c.jitter);
  let base: Rgb3;
  if (c.conifer) {
    base = CONIFER;
  } else {
    const roll = leafRolls(c.seed);
    const leaf = look.season === 'spring' ? LEAF.spring : LEAF.summer;
    if (roll.season < look.bare) base = BARE;
    else if (roll.season < look.bare + look.turned * (1 - look.bare)) base = pick(AUTUMN, roll.autumn, leaf);
    else if (roll.blossom < look.blossom) base = pick(BLOSSOM, roll.blossomPick, leaf);
    else base = leaf;
  }
  const shaded: Rgb3 = [base[0] * c.shade, base[1] * c.shade, base[2] * c.shade];
  return snow > 0.01 ? mix3(shaded, SNOW, snow * (c.conifer ? 0.45 : 0.6)) : shaded;
}

export class Forest {
  private readonly broadleaf: Mesh;
  private readonly conifer: Mesh;
  private readonly candidates: readonly Candidate[];
  private look: SeasonLook | undefined;
  private drawn = 0;

  constructor(
    scene: Scene,
    private readonly terrain: Terrain,
    private density: number,
  ) {
    const mat = new StandardMaterial('tree-mat', scene);
    mat.specularColor = new Color3(0.03, 0.03, 0.03);
    this.broadleaf = makeBroadleaf(scene, mat);
    this.conifer = makeConifer(scene, mat);
    const list: Candidate[] = [];
    const t = terrain.tris;
    for (const site of treeSites(t)) {
      const { traits } = site;
      const rot = Quaternion.RotationAxis(Vector3.Up(), traits.spin);
      const y = terrain.inDetail(site.x, site.z) ? terrain.surfaceAt(site.x, site.z) : (t.cy[site.tri] ?? 0);
      const m = Matrix.Compose(
        new Vector3(traits.scale, traits.scale * traits.tallness, traits.scale),
        rot,
        new Vector3(site.x, y - 0.3, site.z),
      );
      const arr = new Float32Array(16);
      m.copyToArray(arr);
      list.push({
        tri: site.tri,
        seed: site.seed,
        x: site.x,
        z: site.z,
        rank: traits.rank,
        matrix: arr,
        shade: traits.shade,
        conifer: site.conifer,
        heightM: site.heightM,
        north: t.north[site.tri] ?? 0,
        jitter: t.mix[site.tri] ?? 0.5,
      });
    }
    this.candidates = list;
    console.info(`dewidebug forest candidates=${list.length}`);
  }

  get meshes(): readonly Mesh[] {
    return [this.broadleaf, this.conifer];
  }

  get treesDrawn(): number {
    return this.drawn;
  }

  setDensity(density: number): void {
    if (density === this.density) return;
    this.density = density;
    if (this.look) this.update(this.look);
  }

  update(look: SeasonLook): void {
    this.look = look;
    const code = COVER_CODE.wood;
    const broad: Candidate[] = [];
    const con: Candidate[] = [];
    for (const c of this.candidates) {
      if (c.rank < this.density && this.terrain.coverAt(c.x, c.z, c.tri) === code)
        (c.conifer ? con : broad).push(c);
    }
    this.drawn = broad.length + con.length;
    console.info(`dewidebug forest visible=${String(this.drawn)} density=${this.density.toFixed(2)}`);
    apply(this.broadleaf, broad, look);
    apply(this.conifer, con, look);
  }
}

function apply(mesh: Mesh, list: readonly Candidate[], look: SeasonLook): void {
  const matrices = new Float32Array(Math.max(1, list.length) * 16);
  const colours = new Float32Array(Math.max(1, list.length) * 4);
  list.forEach((c, i) => {
    matrices.set(c.matrix, i * 16);
    const colour = treeColour(c, look);
    colours.set([colour[0], colour[1], colour[2], 1], i * 4);
  });
  mesh.thinInstanceSetBuffer('matrix', matrices, 16, false);
  mesh.thinInstanceSetBuffer('color', colours, 4, false);
  mesh.thinInstanceCount = list.length;
  mesh.isVisible = list.length > 0;
}

function makeBroadleaf(scene: Scene, mat: StandardMaterial): Mesh {
  const crown = MeshBuilder.CreateIcoSphere('crown', { radius: 1, subdivisions: 1, flat: true }, scene);
  crown.scaling = new Vector3(1, 0.85, 1);
  crown.position.y = 1.55;
  crown.bakeCurrentTransformIntoVertices();
  const trunk = MeshBuilder.CreateCylinder(
    'trunk',
    { height: 1, diameterTop: 0.18, diameterBottom: 0.26, tessellation: 5 },
    scene,
  );
  trunk.position.y = 0.5;
  trunk.bakeCurrentTransformIntoVertices();
  return merge('broadleaf', crown, trunk, mat);
}

function makeConifer(scene: Scene, mat: StandardMaterial): Mesh {
  const lower = MeshBuilder.CreateCylinder(
    'lower',
    { height: 1.6, diameterTop: 0, diameterBottom: 1.5, tessellation: 6 },
    scene,
  );
  lower.position.y = 1.3;
  lower.bakeCurrentTransformIntoVertices();
  const upper = MeshBuilder.CreateCylinder(
    'upper',
    { height: 1.2, diameterTop: 0, diameterBottom: 1.05, tessellation: 6 },
    scene,
  );
  upper.position.y = 2.1;
  upper.bakeCurrentTransformIntoVertices();
  const trunk = MeshBuilder.CreateCylinder('ctrunk', { height: 0.7, diameter: 0.2, tessellation: 5 }, scene);
  trunk.position.y = 0.35;
  trunk.bakeCurrentTransformIntoVertices();
  const top = merge('conifer-top', lower, upper, mat);
  return merge('conifer', top, trunk, mat);
}

function merge(name: string, a: Mesh, b: Mesh, mat: StandardMaterial): Mesh {
  const tint = (m: Mesh, c: number): void => {
    const count = m.getTotalVertices();
    const cols = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) cols.set([c, c, c, 1], i * 4);
    m.setVerticesData('color', cols);
  };
  tint(a, 1);
  tint(b, 0.55);
  const merged = Mesh.MergeMeshes([a, b], true, true);
  if (!merged) throw new Error(`Could not merge ${name}`);
  merged.name = name;
  merged.material = mat;
  merged.useVertexColors = true;
  merged.isPickable = false;
  merged.receiveShadows = true;
  const data = VertexData.ExtractFromMesh(merged);
  data.applyToMesh(merged);
  return merged;
}
