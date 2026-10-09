import { narrationKey } from '../content/voices.ts';
import {
  advance,
  cuesBetween,
  frameAt,
  START,
  type CaptionTrack,
  type Clock,
  type CueSound,
  type Cutscene,
  type Frame,
} from '../domain/cutscene.ts';
import type { Source } from '../domain/provenance.ts';
import { h } from './dom.ts';
import { provenanceBadge } from './provenance.ts';
import type { LangStore } from './store.ts';

export interface CutsceneHooks {
  onStart(scene: Cutscene): void;
  onEnd(scene: Cutscene, skipped: boolean): void;
  soundOn(): boolean;
  cue(sound: CueSound, seconds: number): void;
}

/**
 * Plays one cutscene at a time: runs the domain clock, shows the letterbox, captions and Skip,
 * reads each caption aloud when sound is on, and hands every frame back for the world to draw.
 */
export class CutscenePlayer {
  readonly el = h('div', { class: 'cutscene', hidden: true });
  private readonly title = h('span', { class: 'cs-title' });
  private readonly note = h('span', { class: 'cs-note' });
  private readonly about = h('span', { class: 'cs-about' });
  private readonly skipButton = h('button', { class: 'tool cs-skip', type: 'button' });
  private readonly caption = h('p', { class: 'cs-caption', 'aria-live': 'polite' });
  private readonly captionBadge = h('span', { class: 'cs-caption-prov' });
  private readonly progress = h('span', { class: 'cs-progress-bar' });
  private scene: Cutscene | undefined;
  private clock: Clock = START;
  private shown: CaptionTrack | undefined;
  private voice: HTMLAudioElement | undefined;
  private paused = false;
  private voiceHeld = false;

  constructor(
    private readonly store: LangStore,
    private readonly sources: ReadonlyMap<string, Source>,
    private readonly hooks: CutsceneHooks,
  ) {
    this.skipButton.addEventListener('click', () => {
      this.skip('button');
    });
    this.el.append(
      h(
        'div',
        { class: 'cs-bar cs-top' },
        h('div', { class: 'cs-heading' }, this.title, this.note),
        this.about,
        this.skipButton,
      ),
      h(
        'div',
        { class: 'cs-bar cs-bottom' },
        h('div', { class: 'cs-line' }, this.caption, this.captionBadge),
        h('span', { class: 'cs-progress', 'aria-hidden': 'true' }, this.progress),
      ),
    );
    store.onChange(() => {
      if (!this.scene) return;
      this.label(this.scene);
      const shown = this.shown;
      this.shown = undefined;
      this.showCaption(shown, false);
    });
  }

  get playing(): Cutscene | undefined {
    return this.scene;
  }

  play(scene: Cutscene): void {
    if (this.scene) this.finish(true, 'replaced');
    this.scene = scene;
    this.clock = START;
    this.shown = undefined;
    this.paused = false;
    this.voiceHeld = false;
    this.el.classList.remove('paused');
    this.label(scene);
    this.caption.textContent = '';
    this.captionBadge.replaceChildren();
    this.el.hidden = false;
    document.documentElement.classList.add('cutscene-playing');
    console.info(`dewidebug cutscene play id=${scene.id} duration=${String(scene.duration)}s`);
    this.hooks.onStart(scene);
    for (const c of cuesBetween(scene, -1, 0)) this.hooks.cue(c.sound, c.to - c.from);
    this.skipButton.focus();
  }

  skip(reason: string): void {
    if (!this.scene) return;
    console.info(`dewidebug cutscene skip reason=${reason} at=${this.clock.s.toFixed(1)}s`);
    this.finish(true, reason);
  }

  /** Moves the scene on by `dtMs` and returns what to draw; nothing once no scene is playing. */
  tick(dtMs: number): Frame | undefined {
    const scene = this.scene;
    if (!scene) return undefined;
    // An ⓘ showing in the letterbox holds the clock and the narration, so its sources can be read.
    const reading =
      this.el.querySelector('.prov-wrap.open, .prov-wrap:focus-within, .prov-wrap:hover') !== null;
    if (reading !== this.paused) this.pause(reading);
    if (reading) return frameAt(scene, this.clock.s);
    const before = this.clock.s;
    this.clock = advance(this.clock, dtMs / 1000, scene.duration);
    for (const c of cuesBetween(scene, before, this.clock.s)) this.hooks.cue(c.sound, c.to - c.from);
    const frame = frameAt(scene, this.clock.s);
    this.showCaption(frame.caption, true);
    this.progress.style.width = `${((this.clock.s / scene.duration) * 100).toFixed(2)}%`;
    if (!this.clock.ended) return frame;
    this.finish(false, 'ended');
    return undefined;
  }

  private pause(paused: boolean): void {
    this.paused = paused;
    this.el.classList.toggle('paused', paused);
    this.note.textContent = this.store.t(paused ? 'cutscenePaused' : 'cutsceneCompressed');
    const voice = this.voice;
    // Only a clip that was still being read resumes; play() on a finished clip would read it again.
    if (paused) {
      this.voiceHeld = voice !== undefined && !voice.paused && !voice.ended;
      voice?.pause();
    } else if (this.voiceHeld) {
      this.voiceHeld = false;
      voice?.play().catch((err: unknown) => {
        console.warn('dewidebug narration resume failed', err);
      });
    }
    console.info(
      `dewidebug cutscene paused=${String(paused)} at=${this.clock.s.toFixed(1)}s reason=${paused ? 'an ⓘ is showing' : 'no ⓘ showing'} voiceHeld=${String(this.voiceHeld)}`,
    );
  }

  private label(scene: Cutscene): void {
    const lang = this.store.lang;
    this.title.textContent = `${this.store.t('cutscene')}: ${scene.title[lang]}`;
    this.note.textContent = this.store.t(this.paused ? 'cutscenePaused' : 'cutsceneCompressed');
    this.about.replaceChildren(provenanceBadge(scene.provenance, this.store, this.sources));
    this.skipButton.textContent = `${this.store.t('skip')} (Esc)`;
    this.skipButton.setAttribute('aria-keyshortcuts', 'Escape');
  }

  private showCaption(caption: CaptionTrack | undefined, speak: boolean): void {
    if (caption === this.shown) return;
    this.shown = caption;
    const scene = this.scene;
    if (!scene) return;
    const lang = this.store.lang;
    this.caption.textContent = caption ? caption.text[lang] : '';
    this.captionBadge.replaceChildren(
      caption ? provenanceBadge(caption.provenance, this.store, this.sources) : '',
    );
    const index = caption ? scene.tracks.filter((t) => t.kind === 'caption').indexOf(caption) : -1;
    console.info(`dewidebug cutscene caption index=${String(index)} at=${this.clock.s.toFixed(1)}s`);
    if (!speak || !caption) return;
    this.stopVoice();
    if (!this.hooks.soundOn()) {
      console.info('dewidebug cutscene narration skipped: sound is off');
      return;
    }
    const key = narrationKey(scene, index, lang);
    const audio = new Audio(`${import.meta.env.BASE_URL}voices/${key}.mp3`);
    this.voice = audio;
    audio.addEventListener('error', () => {
      console.warn(`dewidebug narration failed to load ${key}`);
    });
    audio.play().catch((err: unknown) => {
      console.warn(`dewidebug narration play failed ${key}`, err);
    });
    console.info(`dewidebug narration play ${key}`);
  }

  private stopVoice(): void {
    this.voice?.pause();
    this.voice = undefined;
  }

  private finish(skipped: boolean, reason: string): void {
    const scene = this.scene;
    if (!scene) return;
    this.scene = undefined;
    this.stopVoice();
    this.paused = false;
    this.voiceHeld = false;
    this.el.classList.remove('paused');
    this.shown = undefined;
    this.el.hidden = true;
    document.documentElement.classList.remove('cutscene-playing');
    console.info(`dewidebug cutscene end id=${scene.id} skipped=${String(skipped)} reason=${reason}`);
    this.hooks.onEnd(scene, skipped);
  }
}
