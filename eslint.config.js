import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const PURE_LAYERS = ['src/domain/**', 'src/content/**'];

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'playwright-report', 'test-results', 'public'] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      eqeqeq: 'error',
    },
  },
  {
    files: PURE_LAYERS,
    languageOptions: { globals: {} },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@babylonjs/*'], message: 'domain/content are pure: no Babylon.js.' },
            { group: ['node:*'], message: 'domain/content are pure: no Node modules.' },
            {
              group: ['**/world/**', '**/ui/**', '**/audio/**', '**/platform/**', '**/main.ts'],
              message: 'domain/content must not import outer layers.',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'AudioContext',
        'navigator',
        'fetch',
        'location',
        'localStorage',
        'sessionStorage',
        'requestAnimationFrame',
        'performance',
        'globalThis',
        'self',
        'setTimeout',
        'setInterval',
      ],
    },
  },
  {
    files: ['src/platform/**', 'src/domain/brand.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    },
  },
  { files: ['**/*.js', '**/*.mjs'], ...tseslint.configs.disableTypeChecked },
);
