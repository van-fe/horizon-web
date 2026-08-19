import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    include: [
      'dayjs',
      'dayjs/locale/de.js',
      'dayjs/locale/en.js',
      'dayjs/locale/en-sg.js',
      'dayjs/locale/nb.js',
      'dayjs/locale/sv.js',
      'dayjs/locale/zh-cn.js',
      'dayjs/locale/zh-tw.js',
      'dayjs/plugin/advancedFormat.js',
    ],
  },
  test: {
    include: ['src/**/*.browser.test.ts'],
    browser: {
      api: { host: '127.0.0.1' },
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
