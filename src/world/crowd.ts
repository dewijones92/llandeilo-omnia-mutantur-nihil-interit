import { Mesh, MeshBuilder, type Scene } from './babylon.ts';
import type { ActorGroup, ActorKind } from '../domain/cutscene.ts';
import { toWorld } from '../domain/geo.ts';
import { box, cylinder, merge, paint, place, type Colour } from './meshkit.ts';
import { bodyParts, CLOTHES, PERSON_HEIGHT, type Dress } from './people.ts';
import type { Ground } from './structures.ts';

const H = PERSON_HEIGHT;
const MAIL: Dress = { body: '#8e918f', accent: '#6b4a2e' };
const TUNIC: Dress = { body: '#9b5a3c', accent: '#5e4430' };
const PIONEER: Dress = { body: '#a38b68', accent: '#5e4430' };
const SERVANT: Dress = { body: '#b49a74', accent: '#7a6248' };
const IRON = '#7d7f80';
const SHIELD = '#8a3b2c';
const WOOD = '#6e5136';
const BRONZE = '#b38b3f';
const BAY = '#6c482c';
const GREY_MULE = '#7c7064';
const PACK = '#a08860';

// Steps a second, for the bob of a walking figure (the figures have no legs).
const STRIDE_HZ = 1.9;

// A flat oval facing sideways (along x): a shield, seen from the side of the column.
function oval(scene: Scene, width: number, height: number, colour: Colour): Mesh {
  const m = MeshBuilder.CreateCylinder('o', { diameter: 1, height: 1, tessellation: 12 }, scene);
  m.scaling.set(height, 0.05, width);
  m.rotation.z = Math.PI / 2;
  m.bakeCurrentTransformIntoVertices();
  return paint(m, colour);
}

function pole(scene: Scene, length: number, colour: Colour, x: number, z: number, tiltX = 0, y = 0): Mesh {
  const m = cylinder(scene, 0.045, length, colour, 5);
  m.rotation.x = tiltX;
  m.position.set(x, y, z);
  m.bakeCurrentTransformIntoVertices();
  return m;
}

function at(m: Mesh, x: number, y: number, z: number): Mesh {
  return place(m, x, y, z);
}

function soldier(scene: Scene, dress: Dress, capped: boolean): Mesh[] {
  const parts = bodyParts(scene, dress, H, false, 0, 0, 0, 0);
  if (capped) parts.push(at(cylinder(scene, H * 0.22, H * 0.09, IRON, 8, H * 0.15), 0, H * 0.79, 0));
  return parts;
}

function horse(scene: Scene, coat: Colour, s: number): Mesh[] {
  const legs = [-1, 1].flatMap((side) =>
    [-1, 1].map((end) =>
      at(
        box(scene, H * 0.09 * s, H * 0.55 * s, H * 0.09 * s, coat),
        side * H * 0.13 * s,
        0,
        end * H * 0.36 * s,
      ),
    ),
  );
  return [
    ...legs,
    at(box(scene, H * 0.34 * s, H * 0.36 * s, H * 0.95 * s, coat), 0, H * 0.52 * s, 0),
    at(box(scene, H * 0.18 * s, H * 0.42 * s, H * 0.2 * s, coat), 0, H * 0.72 * s, H * 0.48 * s),
    at(box(scene, H * 0.16 * s, H * 0.17 * s, H * 0.34 * s, coat), 0, H * 1.04 * s, H * 0.62 * s),
    at(box(scene, H * 0.06 * s, H * 0.4 * s, H * 0.06 * s, '#3b2a1c'), 0, H * 0.48 * s, -H * 0.5 * s),
  ];
}

function kit(scene: Scene, actor: ActorKind): Mesh[] {
  switch (actor) {
    case 'auxiliary':
      return [
        ...soldier(scene, MAIL, true),
        at(oval(scene, H * 0.32, H * 0.5, SHIELD), -H * 0.21, H * 0.18, 0.05),
        pole(scene, H * 1.45, WOOD, H * 0.2, 0.08),
        at(cylinder(scene, 0.09, H * 0.12, IRON, 4, 0), H * 0.2, H * 1.45, 0.08),
      ];
    case 'scout':
      return [...soldier(scene, TUNIC, false), pole(scene, H * 1.15, WOOD, H * 0.2, 0.05)];
    case 'pioneer':
      return [
        ...soldier(scene, PIONEER, true),
        // A pick-axe over the shoulder, its head behind.
        pole(scene, H * 0.75, WOOD, H * 0.16, H * 0.1, -0.9, H * 0.3),
        at(box(scene, 0.06, H * 0.08, H * 0.26, IRON), H * 0.16, H * 0.62, -H * 0.5),
        at(box(scene, H * 0.24, H * 0.18, H * 0.14, '#7a6a4f'), 0, H * 0.5, -H * 0.19),
      ];
    case 'standard':
      return [
        ...soldier(scene, MAIL, true),
        pole(scene, H * 2.1, WOOD, H * 0.18, 0.1),
        at(box(scene, H * 0.36, H * 0.26, 0.04, '#9c2a22'), H * 0.18, H * 1.62, 0.1),
        ...[0, 1, 2].map((i) =>
          at(cylinder(scene, H * 0.13, 0.05, BRONZE, 8), H * 0.18, H * (1.1 + i * 0.14), 0.13),
        ),
      ];
    case 'trumpeter': {
      const horn = MeshBuilder.CreateTorus(
        'cornu',
        { diameter: H * 0.62, thickness: 0.07, tessellation: 14 },
        scene,
      );
      horn.rotation.z = Math.PI / 2;
      horn.position.set(H * 0.05, H * 0.62, 0);
      horn.bakeCurrentTransformIntoVertices();
      return [...soldier(scene, MAIL, true), paint(horn, BRONZE)];
    }
    case 'rider':
      return [
        ...horse(scene, BAY, 1),
        ...bodyParts(scene, MAIL, H * 0.78, false, 0, H * 0.62, 0, 0),
        at(cylinder(scene, H * 0.17, H * 0.08, IRON, 8, H * 0.12), 0, H * 0.62 + H * 0.78 * 0.79, 0),
        at(oval(scene, H * 0.3, H * 0.44, SHIELD), -H * 0.22, H * 0.68, 0),
        pole(scene, H * 1.6, WOOD, H * 0.2, 0.2),
      ];
    case 'mule':
      return [
        ...horse(scene, GREY_MULE, 0.78),
        ...[-1, 1].map((side) =>
          at(box(scene, H * 0.14, H * 0.24, H * 0.42, PACK), side * H * 0.2, H * 0.36, 0),
        ),
        at(box(scene, H * 0.26, H * 0.14, H * 0.34, '#8e7a58'), 0, H * 0.7, 0),
      ];
    case 'servant':
      return [
        ...bodyParts(scene, SERVANT, H * 0.96, false, 0, 0, 0, 0),
        pole(scene, H * 0.9, WOOD, H * 0.18, 0.12),
      ];
    case 'farmer':
      return bodyParts(scene, CLOTHES['iron-age'], H, false, 0, 0, 0, 0);
  }
}

const KINDS: readonly ActorKind[] = [
  'scout',
  'rider',
  'pioneer',
  'standard',
  'trumpeter',
  'auxiliary',
  'mule',
  'servant',
  'farmer',
];

interface Herd {
  readonly mesh: Mesh;
  buffer: Float32Array;
}

/**
 * Every figure a cutscene moves, drawn as one thin-instanced mesh per kind of actor, so a column of
 * a thousand costs nine draw calls. The domain says where each one stands; this only draws it.
 */
export class Crowd {
  private readonly herds = new Map<ActorKind, Herd>();
  private shown = '';

  constructor(
    scene: Scene,
    private readonly ground: Ground,
  ) {
    for (const actor of KINDS) {
      const mesh = merge(`crowd-${actor}`, kit(scene, actor));
      mesh.alwaysSelectAsActiveMesh = true;
      mesh.receiveShadows = true;
      const buffer = new Float32Array(16 * 64);
      mesh.thinInstanceSetBuffer('matrix', buffer, 16, false);
      mesh.thinInstanceCount = 0;
      mesh.setEnabled(false);
      this.herds.set(actor, { mesh, buffer });
    }
  }

  show(groups: readonly ActorGroup[], timeMs: number): void {
    const counts = new Map<ActorKind, number>();
    for (const g of groups) counts.set(g.actor, (counts.get(g.actor) ?? 0) + g.members.length);
    for (const [actor, herd] of this.herds) {
      const n = counts.get(actor) ?? 0;
      if (herd.buffer.length < n * 16) {
        herd.buffer = new Float32Array(Math.max(n, herd.buffer.length / 8) * 16);
        herd.mesh.thinInstanceSetBuffer('matrix', herd.buffer, 16, false);
      }
      herd.mesh.setEnabled(n > 0);
    }
    const filled = new Map<ActorKind, number>();
    const t = timeMs / 1000;
    for (const g of groups) {
      const herd = this.herds.get(g.actor);
      if (!herd) continue;
      let i = filled.get(g.actor) ?? 0;
      const four = g.actor === 'rider' || g.actor === 'mule';
      for (const m of g.members) {
        const { x, z } = toWorld(m.at);
        const stride = m.walking
          ? Math.abs(Math.sin((t * STRIDE_HZ * (four ? 0.8 : 1) + m.phase) * Math.PI))
          : 0;
        const y = this.ground(x, z) + stride * H * (four ? 0.03 : 0.05);
        const a = (m.heading * Math.PI) / 180;
        const c = Math.cos(a);
        const s = Math.sin(a);
        // Babylon is row-vector and left-handed: this turns +z (a figure's front) to the heading.
        herd.buffer.set([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, x, y, z, 1], i * 16);
        i++;
      }
      filled.set(g.actor, i);
    }
    for (const [actor, herd] of this.herds) {
      herd.mesh.thinInstanceCount = filled.get(actor) ?? 0;
      herd.mesh.thinInstanceBufferUpdated('matrix');
    }
    // Kinds and a rounded total, so the line changes with the shot rather than every frame.
    const total = [...filled.values()].reduce((a, b) => a + b, 0);
    const said = `${[...filled.keys()].join(',') || 'none'} ~${String(Math.round(total / 100) * 100)}`;
    if (said !== this.shown) {
      this.shown = said;
      console.info(`dewidebug crowd shown ${said}`);
    }
  }

  clear(): void {
    this.show([], 0);
  }
}
