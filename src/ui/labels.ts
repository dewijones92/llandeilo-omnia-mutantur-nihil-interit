import { Matrix, Vector3, type Scene } from '../world/babylon.ts';
import { toWorld } from '../domain/geo.ts';
import type { Place, PlaceId } from '../domain/model.ts';
import { namedLater } from '../domain/places.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

interface Label {
  readonly place: Place;
  readonly el: HTMLButtonElement;
  readonly world: Vector3;
  readonly note: HTMLElement;
  // Measured size in CSS px, cleared when the text changes; the label is centred above its anchor.
  size: { readonly width: number; readonly height: number } | undefined;
}

export class PlaceLabels {
  readonly el = h('div', { class: 'labels' });
  private readonly labels: Label[] = [];
  private lastYear = Number.NaN;
  private focus: PlaceId | undefined;
  // Placement priority: the current moment's place, then names in use at this date, then content order.
  private order: Label[] = [];

  constructor(
    private readonly scene: Scene,
    places: readonly Place[],
    ground: (x: number, z: number) => number,
    private readonly store: LangStore,
    onVisit: (place: Place, at: Vector3) => void,
  ) {
    for (const place of places) {
      if (!place.visitable) continue;
      const { x, z } = toWorld(place.at);
      const world = new Vector3(x, ground(x, z) + 26, z);
      const note = h('span', { class: 'label-note' });
      const el = h(
        'button',
        { class: 'label', type: 'button', title: `${store.t('flyTo')} ${place.name}` },
        h('span', { class: 'label-name' }, place.name, note),
      );
      el.addEventListener('click', () => {
        onVisit(place, new Vector3(x, ground(x, z), z));
      });
      this.labels.push({ place, el, world, note, size: undefined });
      store.onChange(() => {
        el.title = `${store.t('flyTo')} ${place.name}`;
        const y = this.lastYear;
        this.lastYear = Number.NaN;
        if (!Number.isNaN(y)) this.setYear(y);
      });
      this.el.append(el);
    }
    this.order = [...this.labels];
    // Sizes taken before the web font arrives are in the fallback font, so measure again after it.
    void document.fonts.ready.then(() => {
      for (const l of this.labels) l.size = undefined;
    });
  }

  setYear(year: number): void {
    if (year === this.lastYear) return;
    this.lastYear = year;
    for (const l of this.labels) {
      const early = namedLater(l.place, year);
      l.el.classList.toggle('anachronistic', early);
      const text = early ? ` (${this.store.t('todayName')})` : '';
      if (l.note.textContent !== text) {
        l.note.textContent = text;
        l.size = undefined;
      }
    }
    this.reorder();
  }

  setFocus(place: PlaceId | undefined): void {
    if (place === this.focus) return;
    this.focus = place;
    this.reorder();
  }

  private reorder(): void {
    const rank = (l: Label): number =>
      l.place.id === this.focus ? 0 : namedLater(l.place, this.lastYear) ? 2 : 1;
    this.order = [...this.labels].sort((a, b) => rank(a) - rank(b));
  }

  update(avoid: readonly DOMRect[] = []): void {
    const camera = this.scene.activeCamera;
    if (!camera) return;
    const engine = this.scene.getEngine();
    const w = engine.getRenderWidth();
    const hgt = engine.getRenderHeight();
    const scale = window.innerWidth / w;
    const viewport = camera.viewport.toGlobal(w, hgt);
    const transform = this.scene.getTransformMatrix();
    // Labels are placed in priority order; one that would overlap an earlier label waits its turn.
    const placed: Box[] = [];
    for (const l of this.order) {
      const p = Vector3.Project(l.world, Matrix.IdentityReadOnly, transform, viewport);
      const visible = p.z > 0 && p.z < 1 && p.x > 0 && p.x < w && p.y > 0 && p.y < hgt;
      const sx = p.x * scale;
      const sy = p.y * scale;
      if (!l.size && l.el.style.display === '' && l.el.offsetWidth > 0) {
        l.size = { width: l.el.offsetWidth, height: l.el.offsetHeight };
      }
      // Until measured, estimate from the text: about 8px a character plus the padding.
      const size = l.size ?? { width: l.el.textContent.length * 8 + 24, height: 26 };
      const box = {
        left: sx - size.width / 2,
        right: sx + size.width / 2,
        top: sy - size.height,
        bottom: sy,
      };
      const covered = avoid.some((b) => overlaps(box, b)) || placed.some((b) => overlaps(box, b));
      const display = visible && !covered ? '' : 'none';
      if (l.el.style.display !== display) l.el.style.display = display;
      if (!visible || covered) continue;
      placed.push(box);
      const next = `translate(${Math.round(p.x * scale)}px, ${Math.round(p.y * scale)}px)`;
      if (l.el.style.transform !== next) l.el.style.transform = next;
    }
  }
}

interface Box {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

function overlaps(a: Box, b: Box): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}
