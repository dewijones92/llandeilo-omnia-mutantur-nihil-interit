import { describe, expect, it } from 'vitest';
import { formatFrameStats, frameStats } from '../tools/frame-timing.ts';
import {
  parseFrames,
  parseReportStats,
  parseWebGpu,
  summaryLine,
  type RunSummary,
} from '../tools/gpu/results.ts';

describe('frame statistics', () => {
  it('counts the frames in the window and reads the percentiles from the sorted intervals', () => {
    const intervals = [...Array<number>(90).fill(10), ...Array<number>(9).fill(30), 100];
    const s = frameStats(intervals.reverse(), 2000);
    expect(s.frames).toBe(100);
    expect(s.fps).toBe(50);
    expect(s.medianMs).toBe(10);
    expect(s.p90Ms).toBe(30);
    expect(s.p99Ms).toBe(100);
    expect(s.worstMs).toBe(100);
    expect(formatFrameStats(s)).toBe('fps=50.0 median=10.0ms p90=30.0ms');
  });

  it('reads no frames as NaN, not as a fast page', () => {
    const s = frameStats([], 1000);
    expect(s.fps).toBe(0);
    expect(s.medianMs).toBeNaN();
    expect(s.worstMs).toBeNaN();
    expect(frameStats([16], 0).fps).toBeNaN();
  });
});

const stats = { frames: 360, fps: 60, medianMs: 16.7, p90Ms: 17.4, p99Ms: 20, worstMs: 33 };
const webgpu = { backend: 'webgpu', gpu: 'nvidia lovelace', userAgent: 'Chrome/155', errors: [] };
const frames = {
  url: '?debug&year=1903',
  graphics: 'quality high  shadows 4096/pcss',
  viewport: '1920x1080',
  uncapped: false,
  idle: stats,
  orbit: { ...stats, fps: 45.4, p90Ms: 30.2 },
  scrub: { ...stats, fps: 30, p90Ms: 52.6 },
};

describe('the GPU run results', () => {
  it('reads back what gpu.spec.ts writes, and rejects anything incomplete', () => {
    expect(parseWebGpu(JSON.parse(JSON.stringify(webgpu)))).toEqual(webgpu);
    expect(parseWebGpu({ ...webgpu, errors: 'none' })).toBeUndefined();
    expect(parseWebGpu(undefined)).toBeUndefined();
    expect(parseFrames(JSON.parse(JSON.stringify(frames)))).toEqual(frames);
    expect(parseFrames({ ...frames, scrub: { ...stats, p99Ms: '20' } })).toBeUndefined();
    expect(parseFrames({ ...frames, url: '' })).toBeUndefined();
    expect(parseFrames({ ...frames, uncapped: 'no' })).toBeUndefined();
  });

  it("reads Playwright's JSON report stats as passed and failed", () => {
    expect(parseReportStats({ stats: { expected: 50, unexpected: 2, flaky: 1, skipped: 3 } })).toEqual({
      passed: 50,
      failed: 2,
      flaky: 1,
      skipped: 3,
    });
    expect(parseReportStats({ stats: { expected: 7, unexpected: 0 } })).toEqual({
      passed: 7,
      failed: 0,
      flaky: 0,
      skipped: 0,
    });
    expect(parseReportStats({ suites: [] })).toBeUndefined();
  });

  const run: RunSummary = {
    webgpu,
    frames,
    passes: {
      gpu: { passed: 7, failed: 0, flaky: 0, skipped: 0 },
      e2e: { passed: 50, failed: 1, flaky: 0, skipped: 2 },
    },
    seconds: 431,
    exitCode: 1,
  };

  it('sums a run up in one line: the engine, the frame rates, each pass, the time and the exit code', () => {
    expect(summaryLine(run)).toBe(
      'GPU e2e: WebGPU yes (backend webgpu, nvidia lovelace) | high at 1920x1080: idle 60fps (p90 17ms), ' +
        'orbit 45fps (p90 30ms), scrub 30fps (p90 53ms) | gpu 7 passed 0 failed, e2e 50 passed 1 failed ' +
        '(2 skipped) | 7m11s | exit 1',
    );
  });

  it('says NO when the engine fell back to WebGL or WebGPU logged errors, and says what never ran', () => {
    const fellBack = summaryLine({ ...run, webgpu: { ...webgpu, backend: 'webgl2' } });
    expect(fellBack).toContain('WebGPU NO (backend webgl2, nvidia lovelace)');
    const errored = summaryLine({ ...run, webgpu: { ...webgpu, errors: ['device lost'] } });
    expect(errored).toContain('WebGPU NO (backend webgpu, nvidia lovelace, 1 errors)');
    expect(summaryLine({ ...run, frames: { ...frames, uncapped: true } })).toContain(
      'high at 1920x1080 uncapped: idle',
    );
    const nothing = summaryLine({
      webgpu: undefined,
      frames: undefined,
      passes: {},
      seconds: 59.6,
      exitCode: 12,
    });
    expect(nothing).toBe(
      'GPU e2e: WebGPU unknown (no result) | frames not measured | gpu not run, e2e not run | 1m00s | exit 12',
    );
  });
});
