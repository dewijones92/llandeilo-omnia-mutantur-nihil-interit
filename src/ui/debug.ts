import type { AbstractEngine } from '../world/babylon.ts';
import { formatYear } from '../domain/time.ts';
import type { Clock, Lighting } from '../domain/daylight.ts';
import type { Snapshot } from '../domain/state.ts';
import { h } from './dom.ts';

export class DebugOverlay {
  readonly el = h('div', { class: 'debug panel', 'aria-hidden': 'true' });
  private snapshot: Snapshot | undefined;
  private sky = '';

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

  light(clock: Clock, l: Lighting): void {
    this.sky = `sky ${clock.season} ${clock.hour.toFixed(2)}h sun ${l.elevation.toFixed(1)}° ${l.moon ? 'moon' : 'sun'} ${l.lightIntensity.toFixed(2)} night ${l.night.toFixed(2)} lamps ${l.lamps.toFixed(2)}`;
  }

  private render(): void {
    const s = this.snapshot;
    if (!s) return;
    const env = s.environment;
    const lines = [
      `backend ${this.backend}  fps ${this.engine.getFps().toFixed(0)}`,
      `t ${s.t.toFixed(4)}  year ${formatYear(s.year, 'en')}  era ${s.era?.id ?? '-'}`,
      `${this.sky}  chill ${s.chill.toFixed(2)}`,
      `forest ${env.forest.toFixed(2)} farm ${env.farmland.toFixed(2)} moor ${env.moor.toFixed(2)} fog ${env.fog.toFixed(2)}`,
      `features ${s.features.length}: ${s.features.map((f) => `${f.feature.id}@${f.presence.toFixed(2)}[${f.feature.provenance.kind}]`).join(', ')}`,
      `conversations ${s.conversations.map((c) => c.id).join(', ') || '-'}`,
      `almanac ${s.almanac.length}  language ${s.language?.id ?? '-'}  nearest ${s.nearestEvent?.id ?? '-'}`,
    ];
    this.el.textContent = lines.join('\n');
  }
}
