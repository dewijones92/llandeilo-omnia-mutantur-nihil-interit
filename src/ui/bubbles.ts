import { Matrix, Vector3, type Scene } from '../world/babylon.ts';
import type { Conversation, ConversationId } from '../domain/model.ts';
import type { Group } from '../world/people.ts';
import { h } from './dom.ts';
import type { LangStore } from './store.ts';

interface Bubble {
  readonly group: Group;
  readonly el: HTMLButtonElement;
  readonly text: HTMLElement;
  readonly info: HTMLElement;
}

export class Bubbles {
  readonly el = h('div', { class: 'bubbles' });
  private readonly bubbles: Bubble[] = [];
  readonly visible: DOMRect[] = [];

  constructor(
    private readonly scene: Scene,
    groups: Iterable<Group>,
    private readonly store: LangStore,
    onOpen: (c: Conversation) => void,
  ) {
    for (const group of groups) {
      const text = h('span', { class: 'bubble-text' });
      const info = h('span', { class: 'bubble-info' });
      const el = h(
        'button',
        { class: 'bubble', type: 'button' },
        text,
        h('span', { class: 'bubble-i', 'aria-hidden': 'true' }, 'i'),
        info,
      );
      el.addEventListener('click', () => {
        onOpen(group.conversation);
      });
      this.bubbles.push({ group, el, text, info });
      this.el.append(el);
    }
  }

  update(active: ReadonlySet<ConversationId>, now: number): void {
    const camera = this.scene.activeCamera;
    if (!camera) return;
    const engine = this.scene.getEngine();
    const w = engine.getRenderWidth();
    const hgt = engine.getRenderHeight();
    const scale = window.innerWidth / w;
    const viewport = camera.viewport.toGlobal(w, hgt);
    const transform = this.scene.getTransformMatrix();
    const lang = this.store.lang;
    this.visible.length = 0;
    for (const b of this.bubbles) {
      const c = b.group.conversation;
      const on = active.has(c.id);
      const distance = Vector3.Distance(camera.globalPosition, b.group.anchor);
      const p = on
        ? Vector3.Project(b.group.anchor, Matrix.IdentityReadOnly, transform, viewport)
        : undefined;
      const visible = p !== undefined && p.z > 0 && p.z < 1 && p.x > 0 && p.x < w && p.y > 0 && p.y < hgt;
      b.el.style.display = visible ? '' : 'none';
      if (!visible) continue;
      const near = distance < 1400;
      b.el.classList.toggle('far', !near);
      const index = Math.floor(now / 4200) % c.lines.length;
      const line = c.lines[index];
      const next = near && line ? line.translation[lang] : c.title[lang];
      if (b.text.textContent !== next) b.text.textContent = next;
      const why = `${this.store.t('imaginedBecause')}: ${c.provenance.kind === 'imagined' ? c.provenance.groundedIn[lang] : ''}`;
      if (b.info.textContent !== why) {
        b.info.textContent = why;
        b.el.title = why;
      }
      const pos = `translate(${Math.round(p.x * scale)}px, ${Math.round(p.y * scale)}px)`;
      if (b.el.style.transform !== pos) b.el.style.transform = pos;
      this.visible.push(b.el.getBoundingClientRect());
    }
  }
}
