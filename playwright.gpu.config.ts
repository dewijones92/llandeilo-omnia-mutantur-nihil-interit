import { defineConfig } from '@playwright/test';
import { reportFile, PASSES, type Pass } from './tools/gpu/results.ts';

// Runs on WINDOWS, under tools/gpu/run.sh: Windows Chrome on the laptop's own GPU, loading a preview
// that runs in WSL (Windows reaches WSL's localhost; WSL cannot reach a Windows browser). Graphics stay
// at the visitor's default, High. Each worker launches its own Chrome with a throwaway profile, so the
// person's own Chrome windows are never touched.
const baseURL = process.env['GPU_E2E_BASE_URL'];
if (!baseURL) throw new Error('GPU_E2E_BASE_URL is not set: run this through tools/gpu/run.sh');
const results = process.env['GPU_RESULTS_DIR'] ?? 'test-results-gpu';
const passName = process.env['GPU_PASS'];
const pass: Pass | undefined = PASSES.find((p) => p === passName);

export default defineConfig({
  testDir: 'e2e',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  retries: 0,
  // A stalled run must end on its own, so the kit (and a CI job) is never left waiting.
  globalTimeout: 30 * 60_000,
  fullyParallel: true,
  workers: 2,
  reporter: [['list'], ['json', { outputFile: `${results}/${reportFile(pass ?? 'e2e')}` }]],
  outputDir: `${results}/output-${pass ?? 'all'}`,
  use: {
    baseURL,
    channel: 'chrome',
    headless: true,
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 860 },
  },
  projects: [
    // One test at a time, so the frame timings never share the GPU with another page.
    { name: 'gpu', testMatch: 'gpu.spec.ts', fullyParallel: false },
    { name: 'e2e', testIgnore: 'gpu.spec.ts' },
  ],
});
