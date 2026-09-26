import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const base = process.env['PAGES_BASE'] ?? '/';
const localChromium = `${process.env['HOME'] ?? ''}/.cache/ms-playwright/chromium-1169/chrome-linux/chrome`;

export default defineConfig({
  testDir: 'e2e',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  retries: 0,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: `http://localhost:4173${base}`,
    viewport: { width: 1440, height: 860 },
    launchOptions: {
      ...(existsSync(localChromium) ? { executablePath: localChromium } : {}),
      args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    },
  },
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: `http://localhost:4173${base}`,
    reuseExistingServer: !process.env['CI'],
    timeout: 60_000,
  },
});
