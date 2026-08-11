// Node/Bun-only project for source-analysis, build-tool, and runtime smoke tests.
// Component and DOM-dependent tests belong in vitest.browser.config.ts.
import { defineConfig } from 'vitest/config';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { scssPreprocessorOptions } from './build/sass-options';

export default defineConfig({
  css: { preprocessorOptions: scssPreprocessorOptions },
  root: __dirname,
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.node.test.{ts,tsx}', 'src/__tests__/bun-runtime.test.ts'],
    testTimeout: 10000,
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
  resolve: {
    alias: [
      {
        find: /^~\//,
        replacement: path.join(__dirname, './src/'),
      },
      {
        find: /^~root\//,
        replacement: path.join(__dirname, './../'),
      },
      {
        find: /^@\//,
        replacement: path.join(__dirname, './node_modules/'),
      },
    ],
  },
});
