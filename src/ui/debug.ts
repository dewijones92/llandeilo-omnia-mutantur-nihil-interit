import type { AbstractEngine } from '@babylonjs/core';
import { formatYear } from '../domain/time.ts';
import type { Snapshot } from '../domain/state.ts';
import { h } from './dom.ts';

/** ?debug overlay: the first tool for "why does this year look wrong?". */
export class DebugOverlay {
  readonly el = h('div', { class: 'debug panel', 'aria-hidden': 'true' });
  private snapshot: Snapshot | undefined;

  constructor(
    private readonly engine: AbstractEngine,
    private readonly backend: string,
  ) {
    setInterval(() => {
      this.render();
    }, 500);
  }

  update(s: Snapshot): void {
    this.snapshot = s;
  }

  private render(): void {
    const s = this.snapshot;
    if (!s) return;
    const env = s.environment;
    const lines = [
      `backend ${this.backend}  fps ${this.engine.getFps().toFixed(0)}`,
      `t ${s.t.toFixed(4)}  year ${formatYear(s.year, 'en')}  era ${s.era?.id ?? '-'}`,
      `forest ${env.forest.toFixed(2)} farm ${env.farmland.toFixed(2)} moor ${env.moor.toFixed(2)} fog ${env.fog.toFixed(2)}`,
      `features ${s.features.length}: ${s.features.map((f) => `${f.feature.id}@${f.presence.toFixed(2)}[${f.feature.provenance.kind}]`).join(', ')}`,
      `conversations ${s.conversations.map((c) => c.id).join(', ') || '-'}`,
      `almanac ${s.almanac.length}  language ${s.language?.id ?? '-'}  nearest ${s.nearestEvent?.id ?? '-'}`,
    ];
    this.el.textContent = lines.join('\n');
  }
}
