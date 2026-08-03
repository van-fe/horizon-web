import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [vue(), vueJsx()],
  test: {
    include: ['src/**/*.browser.test.{ts,tsx}'],
    browser: {
      api: { host: '127.0.0.1' },
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
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
