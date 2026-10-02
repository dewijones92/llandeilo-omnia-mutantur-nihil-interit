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

export default defineConfig({
  testDir: 'e2e',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  retries: 0,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: `http://localhost:${String(port)}${base}`,
    viewport: { width: 1440, height: 860 },
    launchOptions: {
      ...(existsSync(localChromium) ? { executablePath: localChromium } : {}),
      args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    },
  },
  webServer: {
    command: `npx vite preview --port ${String(port)} --strictPort`,
    url: `http://localhost:${String(port)}${base}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
