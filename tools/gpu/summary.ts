// node tools/gpu/summary.ts <results dir> <seconds> <exit code>: prints run.sh's one-line summary.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  FRAMES_FILE,
  PASSES,
  RUN_FILE,
  WEBGPU_FILE,
  parseFrames,
  parseReportStats,
  parseRunInfo,
  parseWebGpu,
  reportFile,
  summaryLine,
  type Pass,
  type PassStats,
} from './results.ts';

const [dir = 'test-results-gpu', seconds = '0', exitCode = '0'] = process.argv.slice(2);

const read = (name: string): unknown => {
  const path = join(dir, name);
  if (!existsSync(path)) return undefined;
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
    return parsed;
  } catch (err) {
    console.error(`dewidebug gpu summary could not parse ${path}`, err);
    return undefined;
  }
};

const passes: Partial<Record<Pass, PassStats>> = {};
for (const p of PASSES) {
  const stats = parseReportStats(read(reportFile(p)));
  if (stats) passes[p] = stats;
}

console.log(
  summaryLine({
    webgpu: parseWebGpu(read(WEBGPU_FILE)),
    frames: parseFrames(read(FRAMES_FILE)),
    passes,
    run: parseRunInfo(read(RUN_FILE)),
    seconds: Number(seconds),
    exitCode: Number(exitCode),
  }),
);
