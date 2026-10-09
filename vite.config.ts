import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env['PAGES_BASE'] ?? '/',
  build: { target: 'es2023', chunkSizeWarningLimit: 1700 },
  server: {
    host: true,
    // Agents build in .claude/worktrees; watching them reloaded the always-on dev server's tab on every
    // worktree build and left its dependency cache stale ("504 Outdated Optimize Dep").
    watch: { ignored: ['**/.claude/**', '**/test-results*/**', '**/dist/**'] },
  },
  // Scan only the app's own entry, not every HTML file a worktree's dist leaves under the root.
  optimizeDeps: { entries: ['index.html'] },
});
