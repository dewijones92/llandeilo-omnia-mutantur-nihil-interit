import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/domain/**', 'src/content/**'],
      exclude: ['**/*.test.ts', 'src/content/generated/**'],
      reporter: ['text-summary'],
      thresholds: { statements: 95, branches: 87, functions: 100, lines: 97 },
    },
  },
});
