import { Mesh, Vector3, type Scene } from './babylon.ts';
import { toWorld } from '../domain/geo.ts';
import type { Clothing, Conversation, ConversationId, Person } from '../domain/model.ts';
import { cone, cylinder, merge, place } from './meshkit.ts';
import type { Ground } from './structures.ts';

export const PERSON_HEIGHT = 2.6;

const CLOTHES: Readonly<Record<Clothing, { body: string; accent: string; hat?: string }>> = {
  'iron-age': { body: '#8a6a4a', accent: '#a8452f' },
  roman: { body: '#a3362f', accent: '#8f8a80' },
  'medieval-welsh': { body: '#6f7a4a', accent: '#8a6a4a' },
  'medieval-norman': { body: '#3f5a8a', accent: '#c9b07a' },
  clergy: { body: '#e9e4d8', accent: '#3a3a3a' },
  victorian: { body: '#8a2f2a', accent: '#2a2a33', hat: '#1d1d22' },
  'victorian-gentry': { body: '#2b2f38', accent: '#e8e4da', hat: '#1d1d22' },
  modern: { body: '#3f6fb0', accent: '#f0b43c' },
};

const SKIN = '#e2b995';

export interface Group {
  readonly conversation: Conversation;
  readonly root: Mesh;
  readonly anchor: Vector3;
}

export class People {
  readonly groups = new Map<ConversationId, Group>();

  constructor(
    scene: Scene,
    conversations: readonly Conversation[],
    people: readonly Person[],
    ground: Ground,
  ) {
    const byId = new Map(people.map((p) => [p.id, p]));
    for (const c of conversations) {
      const { x, z } = toWorld(c.at);
      const y = ground(x, z);
      const parts: Mesh[] = [];
      c.people.forEach((pid, i) => {
        const person = byId.get(pid);
        if (!person) throw new Error(`Unknown person ${pid} in ${c.id}`);
        const a = (i / c.people.length) * Math.PI * 2 + 0.4;
        const r = c.people.length > 1 ? 1.2 + c.people.length * 0.35 : 0;
        const px = Math.cos(a) * r;
        const pz = Math.sin(a) * r;
        const py = ground(x + px, z + pz) - y;
        parts.push(figure(scene, person, px, py, pz, -a + Math.PI));
      });
      const root = merge(`people-${c.id}`, parts);
      root.position = new Vector3(x, y, z);
      root.isPickable = true;
      root.metadata = { conversation: c.id };
      root.setEnabled(false);
      this.groups.set(c.id, { conversation: c, root, anchor: new Vector3(x, y + PERSON_HEIGHT * 1.35, z) });
    }
  }

  get meshes(): Mesh[] {
    return [...this.groups.values()].map((g) => g.root);
  }

  show(active: ReadonlySet<ConversationId>, time: number): void {
    for (const [id, g] of this.groups) {
      const on = active.has(id);
      g.root.setEnabled(on);
      if (on) g.root.scaling.y = 1 + Math.sin(time * 0.002 + g.anchor.x) * 0.015;
    }
  }
}

function figure(scene: Scene, person: Person, x: number, y: number, z: number, rot: number): Mesh {
  const c = CLOTHES[person.clothing];
  const h = PERSON_HEIGHT * (person.age === 'child' ? 0.68 : person.age === 'elder' ? 0.94 : 1);
  const female = person.voice === 'female';
  const parts: Mesh[] = [
    place(cylinder(scene, female ? h * 0.42 : h * 0.34, h * 0.62, c.body, 8, h * 0.22), x, y, z, rot),
    place(cylinder(scene, h * 0.26, h * 0.12, c.accent, 8), x, y + h * 0.5, z, rot),
    place(cylinder(scene, h * 0.2, h * 0.2, SKIN, 8), x, y + h * 0.62, z, rot),
  ];
  if (c.hat && female)
    parts.push(place(cylinder(scene, h * 0.17, h * 0.34, c.hat, 8, h * 0.13), x, y + h * 0.8, z, rot));
  else if (c.hat) parts.push(place(cylinder(scene, h * 0.19, h * 0.16, c.hat, 8), x, y + h * 0.8, z, rot));
  if (person.clothing === 'clergy')
    parts.push(place(cone(scene, h * 0.24, h * 0.12, c.accent, 8), x, y + h * 0.8, z, rot));
  return merge(`person-${person.id}`, parts);
}
