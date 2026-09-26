import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env['PAGES_BASE'] ?? '/',
  build: { target: 'es2023', chunkSizeWarningLimit: 4000 },
  server: { host: true },
});
