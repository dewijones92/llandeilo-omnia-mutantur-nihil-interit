// Frame timing for a running page, shared by tools/frames.mjs and e2e/gpu.spec.ts.
import type { Page } from '@playwright/test';

export interface FrameStats {
  readonly frames: number;
  readonly fps: number;
  readonly medianMs: number;
  readonly p90Ms: number;
  readonly p99Ms: number;
  readonly worstMs: number;
}

// fps counts the frames that landed in the window, so a stalled page reads low rather than
// averaging a few long frames away.
export function frameStats(intervals: readonly number[], windowMs: number): FrameStats {
  const sorted = [...intervals].sort((a, b) => a - b);
  const at = (p: number): number =>
    sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? Number.NaN;
  return {
    frames: sorted.length,
    fps: windowMs > 0 ? sorted.length / (windowMs / 1000) : Number.NaN,
    medianMs: at(0.5),
    p90Ms: at(0.9),
    p99Ms: at(0.99),
    worstMs: sorted.at(-1) ?? Number.NaN,
  };
}

export const formatFrameStats = (s: FrameStats): string =>
  `fps=${s.fps.toFixed(1)} median=${s.medianMs.toFixed(1)}ms p90=${s.p90Ms.toFixed(1)}ms`;

// Frame intervals over `ms`, optionally turning the ?debug camera a little every frame.
export async function measureFrames(page: Page, ms: number, orbit: boolean): Promise<FrameStats> {
  const intervals = await page.evaluate(
    async ([ms, orbit]) => {
      const debug: unknown = Reflect.get(window, 'llandeiloDebug');
      const scene: unknown = debug && typeof debug === 'object' ? Reflect.get(debug, 'scene') : undefined;
      const camera: unknown =
        scene && typeof scene === 'object' ? Reflect.get(scene, 'activeCamera') : undefined;
      const out: number[] = [];
      let last = performance.now();
      const end = last + ms;
      await new Promise<void>((done) => {
        const step = (t: number): void => {
          out.push(t - last);
          last = t;
          if (orbit && camera && typeof camera === 'object')
            Reflect.set(camera, 'alpha', Number(Reflect.get(camera, 'alpha')) + 0.004);
          if (t < end) requestAnimationFrame(step);
          else done();
        };
        requestAnimationFrame(step);
      });
      return out;
    },
    [ms, orbit] as const,
  );
  return frameStats(intervals, ms);
}

// Frames while the timeline is scrubbed back and forth with the arrow keys, ten presses a second.
export async function measureScrub(page: Page, ms: number): Promise<FrameStats> {
  await page.getByRole('slider', { name: /Timeline/ }).focus();
  const frames = measureFrames(page, ms, false);
  const presses = Math.floor((ms - 1000) / 100);
  for (let i = 0; i < presses; i++) {
    await page.keyboard.press(i % 40 < 20 ? 'ArrowRight' : 'ArrowLeft');
    await page.waitForTimeout(100);
  }
  return frames;
}
