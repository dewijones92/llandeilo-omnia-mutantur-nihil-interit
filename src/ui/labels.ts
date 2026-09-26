import { Matrix, Vector3, type Scene } from '../world/babylon.ts';
import { toWorld } from '../domain/geo.ts';
import type { Place } from '../domain/model.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

interface Label {
  readonly place: Place;
  readonly el: HTMLButtonElement;
  readonly world: Vector3;
  readonly note: HTMLElement;
}

export class PlaceLabels {
  readonly el = h('div', { class: 'labels' });
  private readonly labels: Label[] = [];
  private lastYear = Number.NaN;

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
      this.labels.push({ place, el, world, note });
      store.onChange(() => {
        el.title = `${store.t('flyTo')} ${place.name}`;
        const y = this.lastYear;
        this.lastYear = Number.NaN;
        if (!Number.isNaN(y)) this.setYear(y);
      });
      this.el.append(el);
    }
  }

  setYear(year: number): void {
    if (year === this.lastYear) return;
    this.lastYear = year;
    for (const l of this.labels) {
      const early = l.place.namedFrom !== undefined && year < l.place.namedFrom;
      l.el.classList.toggle('anachronistic', early);
      const text = early ? ` (${this.store.t('todayName')})` : '';
      if (l.note.textContent !== text) l.note.textContent = text;
    }
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
    for (const l of this.labels) {
      const p = Vector3.Project(l.world, Matrix.IdentityReadOnly, transform, viewport);
      const visible = p.z > 0 && p.z < 1 && p.x > 0 && p.x < w && p.y > 0 && p.y < hgt;
      const sx = p.x * scale;
      const sy = p.y * scale;
      const halfWidth = l.place.name.length * 4.2 + 30;
      const covered = avoid.some(
        (b) => sx + halfWidth > b.left && sx - halfWidth < b.right && sy > b.top && sy - 26 < b.bottom,
      );
      const display = visible && !covered ? '' : 'none';
      if (l.el.style.display !== display) l.el.style.display = display;
      if (!visible || covered) continue;
      const next = `translate(${Math.round(p.x * scale)}px, ${Math.round(p.y * scale)}px)`;
      if (l.el.style.transform !== next) l.el.style.transform = next;
    }
  }
}
