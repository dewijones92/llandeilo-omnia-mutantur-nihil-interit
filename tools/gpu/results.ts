// What a GPU run writes to test-results-gpu/, and the one-line summary run.sh prints from it.
import type { FrameStats } from '../frame-timing.ts';

export const WEBGPU_FILE = 'webgpu.json';
export const FRAMES_FILE = 'frames.json';
export const PASSES = ['gpu', 'e2e'] as const;
export type Pass = (typeof PASSES)[number];
export const reportFile = (pass: Pass): string => `report-${pass}.json`;
export const RUN_FILE = 'run.json';

// Babylon reports WebGPU uncaptured errors and a lost device through Logger.Warn (console.warn), and
// its other WebGPU failures through Logger.Error with a "BJS -" prefix that never says "webgpu", so the
// guard has to read warnings as well as errors.
const GPU_FAILURE_TEXT =
  /webgpu|wgsl|GPUValidationError|context lost|device (was )?lost|uncaptured|pipeline|shader/i;
export function isGpuError(type: string, text: string): boolean {
  if (text.includes('webgpu init failed') || text.includes('app failed')) return true;
  if (type !== 'error' && type !== 'warning') return false;
  return text.startsWith('BJS -') || GPU_FAILURE_TEXT.test(text);
}

export const isSoftwareAdapter = (gpu: string): boolean =>
  /swiftshader|basic render|warp|llvmpipe|softpipe|software/i.test(gpu);

export interface RunInfo {
  readonly commit: string;
  // Files changed in the working tree when the run started (the kit packs the tree, not HEAD).
  readonly dirty: number;
  readonly skipBuild: boolean;
}

export interface WebGpuResult {
  readonly backend: string;
  readonly gpu: string;
  readonly userAgent: string;
  readonly errors: readonly string[];
}

export interface FramesResult {
  readonly url: string;
  readonly graphics: string;
  readonly viewport: string;
  // True when vsync and Chrome's frame-rate limit were off, so idle fps shows the real frame cost.
  readonly uncapped: boolean;
  readonly idle: FrameStats;
  readonly orbit: FrameStats;
  readonly scrub: FrameStats;
}

export interface PassStats {
  readonly passed: number;
  readonly failed: number;
  readonly flaky: number;
  readonly skipped: number;
}

export interface RunSummary {
  readonly webgpu: WebGpuResult | undefined;
  readonly frames: FramesResult | undefined;
  readonly passes: Readonly<Partial<Record<Pass, PassStats>>>;
  readonly seconds: number;
  readonly exitCode: number;
  readonly run?: RunInfo | undefined;
}

const field = (o: unknown, key: string): unknown =>
  o !== null && typeof o === 'object' ? Reflect.get(o, key) : undefined;
const num = (o: unknown, key: string): number | undefined => {
  const v = field(o, key);
  return typeof v === 'number' ? v : undefined;
};
const str = (o: unknown, key: string): string | undefined => {
  const v = field(o, key);
  return typeof v === 'string' ? v : undefined;
};

function frameStatsOf(o: unknown): FrameStats | undefined {
  const [frames, fps, medianMs, p90Ms, p99Ms, worstMs] = [
    'frames',
    'fps',
    'medianMs',
    'p90Ms',
    'p99Ms',
    'worstMs',
  ].map((k) => num(o, k));
  if (
    frames === undefined ||
    fps === undefined ||
    medianMs === undefined ||
    p90Ms === undefined ||
    p99Ms === undefined ||
    worstMs === undefined
  )
    return undefined;
  return { frames, fps, medianMs, p90Ms, p99Ms, worstMs };
}

export function parseRunInfo(json: unknown): RunInfo | undefined {
  const commit = str(json, 'commit');
  const dirty = num(json, 'dirty');
  const skipBuild = field(json, 'skipBuild');
  if (!commit || dirty === undefined || typeof skipBuild !== 'boolean') return undefined;
  return { commit, dirty, skipBuild };
}

export function parseWebGpu(json: unknown): WebGpuResult | undefined {
  const backend = str(json, 'backend');
  const gpu = str(json, 'gpu');
  const userAgent = str(json, 'userAgent');
  const errors = field(json, 'errors');
  if (backend === undefined || gpu === undefined || userAgent === undefined || !Array.isArray(errors))
    return undefined;
  return { backend, gpu, userAgent, errors: errors.map(String) };
}

export function parseFrames(json: unknown): FramesResult | undefined {
  const url = str(json, 'url');
  const graphics = str(json, 'graphics');
  const viewport = str(json, 'viewport');
  const uncapped = field(json, 'uncapped');
  const idle = frameStatsOf(field(json, 'idle'));
  const orbit = frameStatsOf(field(json, 'orbit'));
  const scrub = frameStatsOf(field(json, 'scrub'));
  if (
    !url ||
    graphics === undefined ||
    !viewport ||
    typeof uncapped !== 'boolean' ||
    !idle ||
    !orbit ||
    !scrub
  )
    return undefined;
  return { url, graphics, viewport, uncapped, idle, orbit, scrub };
}

// Playwright's JSON reporter: stats.expected passed, stats.unexpected failed.
export function parseReportStats(json: unknown): PassStats | undefined {
  const stats = field(json, 'stats');
  const passed = num(stats, 'expected');
  const failed = num(stats, 'unexpected');
  if (passed === undefined || failed === undefined) return undefined;
  return { passed, failed, flaky: num(stats, 'flaky') ?? 0, skipped: num(stats, 'skipped') ?? 0 };
}

const fps = (s: FrameStats): string => `${s.fps.toFixed(0)}fps (p90 ${s.p90Ms.toFixed(0)}ms)`;
const duration = (seconds: number): string => {
  const total = Math.round(seconds);
  return `${String(Math.floor(total / 60))}m${String(total % 60).padStart(2, '0')}s`;
};

function passLine(pass: Pass, s: PassStats | undefined): string {
  if (!s) return `${pass} not run`;
  const extra = [s.flaky ? `${String(s.flaky)} flaky` : '', s.skipped ? `${String(s.skipped)} skipped` : '']
    .filter(Boolean)
    .join(', ');
  return `${pass} ${String(s.passed)} passed ${String(s.failed)} failed${extra ? ` (${extra})` : ''}`;
}

export function summaryLine(r: RunSummary): string {
  const engine = r.webgpu
    ? `WebGPU ${r.webgpu.backend === 'webgpu' && r.webgpu.errors.length === 0 && !isSoftwareAdapter(r.webgpu.gpu) ? 'yes' : 'NO'} (backend ${r.webgpu.backend}, ${r.webgpu.gpu}${r.webgpu.errors.length ? `, ${String(r.webgpu.errors.length)} errors` : ''})`
    : 'WebGPU unknown (no result)';
  const quality = r.frames ? /^quality (\S+)/.exec(r.frames.graphics)?.[1] : undefined;
  const frames = r.frames
    ? `${quality ?? '?'} at ${r.frames.viewport}${r.frames.uncapped ? ' uncapped' : ''}: idle ${fps(r.frames.idle)}, orbit ${fps(r.frames.orbit)}, scrub ${fps(r.frames.scrub)}`
    : 'frames not measured';
  const passes = PASSES.map((p) => passLine(p, r.passes[p])).join(', ');
  const build = r.run
    ? ` [${r.run.commit.slice(0, 7)}${r.run.dirty ? `+dirty ${String(r.run.dirty)}` : ''}${r.run.skipBuild ? ', dist not rebuilt' : ''}]`
    : '';
  return `GPU e2e${build}: ${engine} | ${frames} | ${passes} | ${duration(r.seconds)} | exit ${String(r.exitCode)}`;
}
