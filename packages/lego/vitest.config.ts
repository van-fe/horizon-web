// some config is conflict with vite.config.ts set.
// do not merge this config to vite.config.ts!
import { defineConfig } from 'vitest/config';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    environment: 'happy-dom',
    css: true,
    testTimeout: 10000,
    dangerouslyIgnoreUnhandledErrors: true,
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
  define: { global: 'window' },
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
