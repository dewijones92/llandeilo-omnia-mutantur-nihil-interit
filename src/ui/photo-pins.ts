import { Vector3, type Scene } from '../world/babylon.ts';
import { toWorld } from '../domain/geo.ts';
import type { Photograph, PhotoId } from '../domain/model.ts';
import { isPlaced, pinAnchors } from '../domain/photos.ts';
import { h } from './dom.ts';
import { overlaps, projector, type Box } from './screen-space.ts';
import type { LangStore } from './store.ts';

const SVG = 'http://www.w3.org/2000/svg';
const PIN_PX = 32;
const PIN_STEM_PX = 8;
const PIN_LIFT = 6;

interface Pin {
  readonly photo: Photograph;
  readonly el: HTMLButtonElement;
  readonly world: Vector3;
}

function cameraGlyph(): SVGElement {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('aria-hidden', 'true');
  const body = document.createElementNS(SVG, 'path');
  body.setAttribute(
    'd',
    'M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z',
  );
  body.setAttribute('fill', 'currentColor');
  const lens = document.createElementNS(SVG, 'circle');
  lens.setAttribute('cx', '12');
  lens.setAttribute('cy', '13');
  lens.setAttribute('r', '3.4');
  lens.setAttribute('fill', '#fff');
  svg.append(body, lens);
  return svg;
}

/**
 * A camera pin for each placed photograph, standing over the spot it was taken. Pins are page
 * elements projected from the scene like the labels and the conversation bubbles, so they stay crisp
 * and reachable by keyboard; one that would overlap an earlier pin waits until the camera is nearer.
 */
export class PhotoPins {
  readonly el = h('div', { class: 'pins' });
  readonly visible: Box[] = [];
  private readonly pins: Pin[] = [];
  private shown = new Set<PhotoId>();

  constructor(
    private readonly scene: Scene,
    photos: readonly Photograph[],
    ground: (x: number, z: number) => number,
    private readonly store: LangStore,
    onOpen: (photo: Photograph) => void,
  ) {
    this.el.style.setProperty('--pin-px', `${String(PIN_PX)}px`);
    this.el.style.setProperty('--pin-stem', `${String(PIN_STEM_PX)}px`);
    const anchors = pinAnchors(photos);
    for (const photo of photos.filter(isPlaced)) {
      const at = anchors.get(photo.id) ?? photo.placement.at;
      const { x, z } = toWorld(at);
      const el = h(
        'button',
        { class: 'pin', type: 'button', 'data-photo': photo.id, style: 'display:none' },
        cameraGlyph(),
      );
      el.addEventListener('click', () => {
        onOpen(photo);
      });
      this.pins.push({ photo, el, world: new Vector3(x, ground(x, z) + PIN_LIFT, z) });
      this.el.append(el);
    }
    this.label();
    store.onChange(() => {
      this.label();
    });
  }

  private label(): void {
    for (const { photo, el } of this.pins) {
      const text = `${this.store.t('photo')}: ${photo.where}`;
      el.setAttribute('aria-label', text);
      el.title = text;
    }
  }

  setShown(photos: readonly Photograph[]): void {
    this.shown = new Set(photos.map((p) => p.id));
  }

  has(id: PhotoId): boolean {
    return this.shown.has(id);
  }

  update(avoid: readonly Box[]): void {
    this.visible.length = 0;
    const project = projector(this.scene);
    if (!project) return;
    for (const pin of this.pins) {
      const on = this.shown.has(pin.photo.id);
      const p = on ? project(pin.world) : undefined;
      let display = 'none';
      if (p?.inView === true) {
        const { x: sx, y: sy } = p;
        const box = new DOMRect(sx - PIN_PX / 2, sy - PIN_PX - PIN_STEM_PX, PIN_PX, PIN_PX + PIN_STEM_PX);
        const covered = [...avoid, ...this.visible].some((b) => overlaps(box, b));
        if (!covered) {
          display = '';
          this.visible.push(box);
          const next = `translate(${String(Math.round(sx))}px, ${String(Math.round(sy))}px)`;
          if (pin.el.style.transform !== next) pin.el.style.transform = next;
        }
      }
      if (pin.el.style.display !== display) pin.el.style.display = display;
    }
  }
}
