import { Matrix, Vector3, type Scene } from '@babylonjs/core';
import { toWorld } from '../domain/geo.ts';
import type { Place } from '../domain/model.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

interface Label {
  readonly place: Place;
  readonly el: HTMLButtonElement;
  readonly world: Vector3;
}

export class PlaceLabels {
  readonly el = h('div', { class: 'labels' });
  private readonly labels: Label[] = [];

  constructor(
    private readonly scene: Scene,
    places: readonly Place[],
    ground: (x: number, z: number) => number,
    store: LangStore,
    onVisit: (place: Place, at: Vector3) => void,
  ) {
    for (const place of places) {
      if (!place.visitable) continue;
      const { x, z } = toWorld(place.at);
      const world = new Vector3(x, ground(x, z) + 26, z);
      const el = h(
        'button',
        { class: 'label', type: 'button', title: `${store.t('flyTo')} ${place.name}` },
        h('span', { class: 'label-name' }, place.name),
      );
      el.addEventListener('click', () => {
        onVisit(place, new Vector3(x, ground(x, z), z));
      });
      this.labels.push({ place, el, world });
      this.el.append(el);
    }
  }

  update(): void {
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
      l.el.style.display = visible ? '' : 'none';
      if (visible)
        l.el.style.transform = `translate(${(p.x * scale).toFixed(1)}px, ${(p.y * scale).toFixed(1)}px)`;
    }
  }
}
