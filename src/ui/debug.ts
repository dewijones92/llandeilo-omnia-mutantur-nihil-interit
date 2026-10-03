import type { AbstractEngine, ArcRotateCamera } from '../world/babylon.ts';
import { formatYear } from '../domain/time.ts';
import type { Clock, Lighting } from '../domain/daylight.ts';
import type { LampState } from '../domain/lamplight.ts';
import type { Provenance } from '../domain/provenance.ts';
import type { Snapshot, SoundingBed } from '../domain/state.ts';
import { describeGraphics, type GraphicsState } from '../domain/quality.ts';
import { h } from './dom.ts';

const why = (p: Provenance): string => [p.kind, ...p.sources].join(' ');
const heard = (b: SoundingBed): string => {
  const fade =
    b.towards === undefined ? '' : b.towards === 'silence' ? ', fading out' : `, fading to ${why(b.towards)}`;
  return `sound ${b.bed} ${b.level.toFixed(2)} ${why(b.since)}${fade}`;
};

export class DebugOverlay {
  readonly el = h('div', { class: 'debug panel', 'aria-hidden': 'true' });
  private snapshot: Snapshot | undefined;
  private sky = '';

  constructor(
    private readonly engine: AbstractEngine,
    private readonly backend: string,
    private readonly camera: ArcRotateCamera,
    private readonly graphics: () => GraphicsState,
  ) {
    setInterval(() => {
      this.render();
    }, 500);
  }

  update(s: Snapshot): void {
    this.snapshot = s;
  }

  light(clock: Clock, l: Lighting, lamps: LampState): void {
    this.sky = `sky ${clock.season} ${clock.hour.toFixed(2)}h sun ${l.elevation.toFixed(1)}° ${l.moon ? 'moon' : 'sun'} ${l.lightIntensity.toFixed(2)} night ${l.night.toFixed(2)} lamps ${l.lamps.toFixed(2)} (windows ${lamps.windows.toFixed(2)} hearth ${lamps.hearth.toFixed(2)} street ${(lamps.street?.level ?? 0).toFixed(2)})`;
  }

  private render(): void {
    const c = this.camera.target;
    this.el.dataset['camera'] = `${c.x.toFixed(1)},${c.z.toFixed(1)}`;
    const s = this.snapshot;
    if (!s) return;
    const env = s.environment;
    const lines = [
      `backend ${this.backend}  fps ${this.engine.getFps().toFixed(0)}`,
      describeGraphics(this.graphics()),
      `camera x ${c.x.toFixed(0)} z ${c.z.toFixed(0)} r ${this.camera.radius.toFixed(0)}`,
      `t ${s.t.toFixed(4)}  year ${formatYear(s.year, 'en')}  era ${s.era?.id ?? '-'}`,
      `${this.sky}  chill ${s.chill.toFixed(2)}`,
      lampLine(s),
      `forest ${env.forest.toFixed(2)} farm ${env.farmland.toFixed(2)} moor ${env.moor.toFixed(2)} fog ${env.fog.toFixed(2)}`,
      ...s.sound.beds.map(heard),
      `features ${s.features.length}: ${s.features.map((f) => `${f.feature.id}@${f.presence.toFixed(2)}[${f.feature.provenance.kind}]`).join(', ')}`,
      `conversations ${s.conversations.map((c) => c.id).join(', ') || '-'}`,
      `almanac ${s.almanac.length}  language ${s.language?.id ?? '-'}  nearest ${s.nearestEvent?.id ?? '-'}`,
    ];
    this.el.textContent = lines.join('\n');
  }
}

function lampLine(s: Snapshot): string {
  const k = s.lamplight;
  const st = k.streets;
  const streets = st.kind === 'none' || st.kind === 'off' ? st.kind : `${st.kind} in ${st.area.id}`;
  return `light homes ${k.homes} street ${streets} ${k.dated} ${k.year.toFixed(2)} [${k.provenance.kind}] share ${k.windows.toFixed(2)} glow ${k.glow.toFixed(2)} warmth ${k.warmth.toFixed(2)}`;
}
