import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@aurora/horizon-core > dayjs',
      '@aurora/horizon-core > dayjs/locale/de.js',
      '@aurora/horizon-core > dayjs/locale/en.js',
      '@aurora/horizon-core > dayjs/locale/en-sg.js',
      '@aurora/horizon-core > dayjs/locale/nb.js',
      '@aurora/horizon-core > dayjs/locale/sv.js',
      '@aurora/horizon-core > dayjs/locale/zh-cn.js',
      '@aurora/horizon-core > dayjs/locale/zh-tw.js',
      '@aurora/horizon-core > dayjs/plugin/advancedFormat.js',
      'react',
      'react-dom',
      'react-dom/client',
      'react-dom/server',
    ],
  },
  test: {
    browser: {
      api: { host: '127.0.0.1' },
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
