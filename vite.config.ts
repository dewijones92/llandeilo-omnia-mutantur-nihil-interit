import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env['PAGES_BASE'] ?? '/',
  build: { target: 'es2023', chunkSizeWarningLimit: 1700 },
  server: { host: true },
});
