import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import * as path from 'path';
import { scssPreprocessorOptions } from './build/sass-options';

export default defineConfig({
  css: { preprocessorOptions: scssPreprocessorOptions },
  optimizeDeps: {
    force: true,
    include: [
      'async-validator',
      'dayjs',
      'dayjs/locale/de',
      'dayjs/locale/en',
      'dayjs/locale/en-sg',
      'dayjs/locale/nb',
      'dayjs/locale/se',
      'dayjs/locale/sv',
      'dayjs/locale/zh-cn',
      'dayjs/locale/zh-tw',
      'dayjs/plugin/advancedFormat',
      'dayjs/plugin/arraySupport',
      'dayjs/plugin/customParseFormat',
      'dayjs/plugin/isSameOrAfter',
      'dayjs/plugin/isSameOrBefore',
      'dayjs/plugin/isoWeek',
      'dayjs/plugin/localizedFormat',
      'dayjs/plugin/minMax',
      'dayjs/plugin/objectSupport',
      'dayjs/plugin/timezone',
      'dayjs/plugin/toObject',
      'dayjs/plugin/utc',
      'dayjs/plugin/weekOfYear',
      'dayjs/plugin/weekYear',
      'dayjs/plugin/weekday',
      'decimal.js',
      'deepmerge',
      'dompurify',
      'lodash-es',
      'qrcode',
      'vue/server-renderer',
    ],
  },
  root: __dirname,
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'src/**/*.node.test.{ts,tsx}',
      'src/__tests__/bun-runtime.test.ts',
    ],
    setupFiles: [path.join(__dirname, './vitest.setup.ts')],
    testTimeout: 10000,
    browser: {
      api: { host: '127.0.0.1' },
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
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
