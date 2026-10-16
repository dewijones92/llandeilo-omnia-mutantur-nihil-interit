import { describe, expect, it } from 'vitest';
import type { Part, PartMeta, PartShape } from './plan.ts';
import { isTextured, partSurfaces, surfacesOf, TEXTURE_SIZE, TEXTURED, textureFile } from './surfaces.ts';

const part = (shape: PartShape, meta: PartMeta = {}): Part => ({ ...shape, ...meta });
const bank: PartShape = {
  type: 'wall',
  path: [
    [0, 0],
    [10, 0],
  ],
  height: 3,
  thickness: 4,
  top: 'plain',
  material: 'turf',
};
const tower: PartShape = {
  type: 'tower',
  at: [0, 0],
  shape: 'square',
  size: 4,
  height: 8,
  top: 'pyramid',
  material: 'timber',
  roofMaterial: 'timber',
};
const barrack: PartShape = {
  type: 'hall',
  at: [0, 0],
  length: 30,
  width: 8,
  angle: 0,
  height: 3,
  roof: 'gable',
  material: 'daub',
  roofMaterial: 'timber',
};

describe('the surfaces a part’s model shows (ADR 0055)', () => {
  it('shows a turf bank with laid courses as grass on its walk and cut earth on its faces, and a plain bank as its material', () => {
    expect(partSurfaces(part(bank, { kits: ['turf-courses'] }))).toEqual(['turf', 'turf-face']);
    expect(partSurfaces(part(bank))).toEqual(['turf']);
  });

  it('roofs a tower in shingle only where it asks for the shingle kit, and never shingles a cone', () => {
    expect(partSurfaces(part(tower, { kits: ['post-tower-six', 'shingle-roof'] }))).toEqual([
      'shingle',
      'timber',
    ]);
    expect(partSurfaces(part(tower))).toEqual(['timber']);
    expect(
      partSurfaces(part({ ...tower, top: 'cone', roofMaterial: 'thatch' }, { kits: ['shingle-roof'] })),
    ).toEqual(['thatch', 'timber']);
    expect(partSurfaces(part({ ...tower, top: 'plain' }))).toEqual(['timber']);
  });

  it('frames a daub hall in timber, and gives a shingle roof its ridge beam’s timber and a thatch roof thatch', () => {
    expect(partSurfaces(part(barrack, { kits: ['timber-frame', 'shingle-roof'] }))).toEqual([
      'daub',
      'shingle',
      'timber',
    ]);
    expect(
      partSurfaces(part({ ...barrack, roofMaterial: 'thatch' }, { kits: ['timber-frame', 'thatch-roof'] })),
    ).toEqual(['daub', 'thatch', 'timber']);
    expect(partSurfaces(part(barrack))).toEqual(['daub', 'timber']);
    expect(partSurfaces(part({ ...barrack, roof: 'none' }))).toEqual(['daub']);
  });

  it('draws a hinged leaf and a plank deck in their material alone', () => {
    const leaf = part(
      { ...barrack, material: 'timber', roof: 'none' },
      { kits: ['ledged-leaf'], hinge: { at: [0, 0], closed: 0, drawn: 30 } },
    );
    expect(partSurfaces(leaf)).toEqual(['timber']);
    expect(partSurfaces(part({ ...barrack, material: 'timber' }, { kits: ['plank-deck'] }))).toEqual([
      'timber',
    ]);
    // The same leaf kit on a part with no hinge is not drawn as a leaf.
    expect(
      surfacesOf({ type: 'hall', material: 'timber', kits: ['ledged-leaf'], roof: null, hinged: false }),
    ).toEqual(['timber']);
  });

  it('shows nothing of its own for a part the app draws on the ground', () => {
    expect(partSurfaces(part({ type: 'road', path: [[0, 0]], width: 4, material: 'rubble' }))).toEqual([]);
    expect(partSurfaces(part({ type: 'ditch', path: [[0, 0]], width: 4 }))).toEqual([]);
  });

  it('textures only the forts’ timber, turf, earth, daub and thatch: no stone, tile or limewash (ADR 0046)', () => {
    expect([...TEXTURED].sort()).toEqual(['daub', 'shingle', 'thatch', 'timber', 'turf', 'turf-face']);
    expect(isTextured('rubble')).toBe(false);
    expect(isTextured('render')).toBe(false);
    expect(isTextured('timber')).toBe(true);
  });

  it('publishes each texture at full size for High and half for Medium', () => {
    expect(TEXTURE_SIZE).toEqual({ high: 1024, medium: 512 });
    expect(textureFile('turf-face', 'normal', 512)).toBe('textures/landmarks/turf-face-normal-512.webp');
  });
});
