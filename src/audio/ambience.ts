import { AMBIENT_BEDS, type AmbientBed } from '../domain/model.ts';

type Levels = Readonly<Record<AmbientBed, number>>;

function noiseBuffer(ctx: AudioContext, seconds: number, pink: boolean): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    if (!pink) {
      data[i] = white * 0.5;
      continue;
    }
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.963 * b1 + white * 0.2965164;
    b2 = 0.57 * b2 + white * 1.0526913;
    data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.11;
  }
  return buffer;
}

function impulse(ctx: AudioContext, seconds: number): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buffer.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  return buffer;
}

export class Ambience {
  private readonly ctx: AudioContext;
  private readonly master: GainNode;
  private readonly reverb: ConvolverNode;
  private readonly beds = new Map<AmbientBed, GainNode>();
  private levels: Levels | undefined;
  private on = false;
  private readonly timer: number;
  private readonly white: AudioBuffer;
  private readonly pink: AudioBuffer;

  constructor() {
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = impulse(this.ctx, 3);
    const wet = this.ctx.createGain();
    wet.gain.value = 0.35;
    this.reverb.connect(wet).connect(this.master);
    this.white = noiseBuffer(this.ctx, 4, false);
    this.pink = noiseBuffer(this.ctx, 4, true);
    for (const bed of AMBIENT_BEDS) {
      const g = this.ctx.createGain();
      g.gain.value = 0;
      g.connect(this.master);
      if (bed === 'bells' || bed === 'chant' || bed === 'birds') g.connect(this.reverb);
      this.beds.set(bed, g);
    }
    this.loop('wind', this.pink, 'lowpass', 420, 0.4, 0.09, 0.9);
    this.loop('river', this.white, 'bandpass', 1400, 0.5, 0.22, 0.25);
    this.loop('forest', this.white, 'highpass', 3200, 0.5, 0.05, 0.6);
    this.loop('traffic', this.pink, 'lowpass', 260, 0.6, 0.02, 1.4);
    this.loop('market', this.pink, 'bandpass', 520, 1.2, 0.06, 0.7);
    this.timer = window.setInterval(() => {
      this.tick();
    }, 200);
    console.info(`dewidebug audio started sampleRate=${this.ctx.sampleRate}`);
  }

  private bed(name: AmbientBed): GainNode {
    const g = this.beds.get(name);
    if (!g) throw new Error(`No bed ${name}`);
    return g;
  }

  private loop(
    name: AmbientBed,
    buffer: AudioBuffer,
    type: BiquadFilterType,
    freq: number,
    q: number,
    lfoRate: number,
    lfoDepth: number,
  ): void {
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const amp = this.ctx.createGain();
    amp.gain.value = 0.6;
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = lfoRate;
    const depth = this.ctx.createGain();
    depth.gain.value = 0.35 * lfoDepth;
    lfo.connect(depth).connect(amp.gain);
    const fdepth = this.ctx.createGain();
    fdepth.gain.value = freq * 0.25 * lfoDepth;
    lfo.connect(fdepth).connect(filter.frequency);
    src.connect(filter).connect(amp).connect(this.bed(name));
    src.start();
    lfo.start();
  }

  private voice(name: AmbientBed, at: number, build: (out: GainNode, t: number) => void): void {
    const pan = this.ctx.createStereoPanner();
    pan.pan.value = Math.random() * 1.6 - 0.8;
    const out = this.ctx.createGain();
    out.connect(pan).connect(this.bed(name));
    build(out, at);
  }

  private tone(
    out: AudioNode,
    t: number,
    freq: number,
    dur: number,
    peak: number,
    type: OscillatorType,
    sweepTo?: number,
  ): void {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (sweepTo) o.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + Math.min(0.02, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private burst(out: AudioNode, t: number, dur: number, freq: number, peak: number): void {
    const s = this.ctx.createBufferSource();
    s.buffer = this.white;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(out);
    s.start(t, Math.random() * 3);
    s.stop(t + dur + 0.05);
  }

  private chance(name: AmbientBed, perSecond: number): boolean {
    const level = this.levels?.[name] ?? 0;
    return level > 0.03 && Math.random() < perSecond * 0.2 * level;
  }

  private tick(): void {
    if (!this.on) return;
    const t = this.ctx.currentTime + 0.05;
    if (this.chance('birds', 1.6)) {
      this.voice('birds', t, (out, at) => {
        const base = 2200 + Math.random() * 2600;
        const notes = 2 + Math.floor(Math.random() * 5);
        for (let i = 0; i < notes; i++)
          this.tone(
            out,
            at + i * (0.08 + Math.random() * 0.07),
            base * (0.85 + Math.random() * 0.4),
            0.06 + Math.random() * 0.08,
            0.05,
            'sine',
            base * (0.7 + Math.random() * 0.8),
          );
      });
    }
    if (this.chance('livestock', 0.12)) {
      this.voice('livestock', t, (out, at) => {
        const cow = Math.random() < 0.55;
        const f = cow ? 105 + Math.random() * 30 : 290 + Math.random() * 60;
        const dur = cow ? 1.4 : 0.7;
        const filt = this.ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.value = cow ? 520 : 900;
        filt.Q.value = 1.4;
        filt.connect(out);
        this.tone(filt, at, f, dur, 0.18, 'sawtooth', f * (cow ? 0.8 : 0.9));
      });
    }
    if (this.chance('forge', 0.35)) {
      this.voice('forge', t, (out, at) => {
        const hits = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < hits; i++)
          for (const p of [1180, 2750, 4130])
            this.tone(out, at + i * 0.42, p * (0.98 + Math.random() * 0.04), 0.35, 0.03, 'sine');
      });
    }
    if (this.chance('bells', 0.05)) {
      this.voice('bells', t, (out, at) => {
        for (let i = 0; i < 4; i++)
          for (const [ratio, amp] of [
            [0.5, 0.05],
            [1, 0.07],
            [1.19, 0.035],
            [1.5, 0.03],
            [2, 0.025],
          ] as const)
            this.tone(out, at + i * 1.6, 392 * ratio, 3.6, amp, 'sine');
      });
    }
    if (this.chance('chant', 0.06)) {
      this.voice('chant', t, (out, at) => {
        const mode = [146.8, 164.8, 174.6, 196, 220, 246.9, 261.6, 293.7];
        let time = at;
        for (let i = 0; i < 6; i++) {
          const f = mode[Math.floor(Math.random() * mode.length)] ?? 196;
          this.tone(out, time, f, 1.3, 0.04, 'triangle');
          this.tone(out, time, f * 2, 1.3, 0.01, 'sine');
          time += 1.1;
        }
      });
    }
    if (this.chance('train', 0.08)) {
      this.voice('train', t, (out, at) => {
        for (let i = 0; i < 16; i++) this.burst(out, at + i * (0.34 - i * 0.008), 0.18, 900, 0.22);
        if (Math.random() < 0.4) {
          this.tone(out, at + 0.2, 880, 1.4, 0.05, 'square');
          this.tone(out, at + 0.2, 1108, 1.4, 0.04, 'square');
        }
      });
    }
    if (this.chance('market', 0.5)) {
      this.voice('market', t, (out, at) => {
        const f = 180 + Math.random() * 160;
        const filt = this.ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.value = 700 + Math.random() * 900;
        filt.Q.value = 3;
        filt.connect(out);
        this.tone(filt, at, f, 0.25 + Math.random() * 0.3, 0.05, 'sawtooth', f * (0.8 + Math.random() * 0.5));
      });
    }
  }

  set(levels: Levels): void {
    this.levels = levels;
    const now = this.ctx.currentTime;
    const gain: Readonly<Record<AmbientBed, number>> = {
      wind: 0.5,
      river: 0.22,
      birds: 0.9,
      forest: 0.35,
      livestock: 0.6,
      forge: 0.6,
      bells: 0.7,
      market: 0.5,
      train: 0.5,
      traffic: 0.6,
      chant: 0.8,
    };
    for (const [bed, g] of this.beds) g.gain.setTargetAtTime(levels[bed] * gain[bed], now, 0.6);
  }

  enable(on: boolean): void {
    this.on = on;
    if (on) void this.ctx.resume();
    this.master.gain.setTargetAtTime(on ? 0.8 : 0, this.ctx.currentTime, 0.4);
    if (!on) {
      window.setTimeout(() => {
        if (!this.on) void this.ctx.suspend();
      }, 1500);
    }
    console.info(`dewidebug audio ${on ? 'on' : 'off'}`);
  }

  dispose(): void {
    window.clearInterval(this.timer);
    void this.ctx.close();
  }
}
