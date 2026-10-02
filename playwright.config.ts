import { defineConfig } from '@playwright/test';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';

const base = process.env['PAGES_BASE'] ?? '/';
// Each checkout gets its own preview port (4200-4999, from its path), so two clones or worktrees
// never share a server. The server is never reused: a run must only test the build it started.
const fromPath =
  4200 +
  (createHash('sha1')
    .update(import.meta.dirname)
    .digest()
    .readUInt16BE(0) %
    800);
const port = process.env['E2E_PORT'] ? Number(process.env['E2E_PORT']) : fromPath;
const localChromium = `${process.env['HOME'] ?? ''}/.cache/ms-playwright/chromium-1169/chrome-linux/chrome`;
// Under WSL with a GPU (/dev/dxg) WebGL can run on it through Mesa's D3D12 driver; CI has no GPU and
// renders on the CPU with SwiftShader. E2E_GPU=0 forces SwiftShader locally.
const gpu = !process.env['CI'] && process.env['E2E_GPU'] !== '0' && existsSync('/dev/dxg');
const renderer = gpu
  ? {
      args: ['--use-angle=gl', '--ignore-gpu-blocklist'],
      env: { ...process.env, GALLIUM_DRIVER: 'd3d12', MESA_D3D12_DEFAULT_ADAPTER_NAME: 'NVIDIA' },
    }
  : { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] };

export default defineConfig({
  testDir: 'e2e',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  retries: 0,
  // Each test loads its own page, so tests in the one spec file can run side by side. Two workers suit
  // GitHub's 4-core runner; every worker renders WebGL on the CPU, so more only contend.
  fullyParallel: true,
  workers: Math.max(1, Number.parseInt(process.env['E2E_WORKERS'] ?? '', 10) || 2),
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: `http://localhost:${String(port)}${base}`,
    viewport: { width: 1440, height: 860 },
    launchOptions: {
      ...(existsSync(localChromium) ? { executablePath: localChromium } : {}),
      ...renderer,
    },
  },
  webServer: {
    command: `npx vite preview --port ${String(port)} --strictPort`,
    url: `http://localhost:${String(port)}${base}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
