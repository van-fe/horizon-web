import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      formats: ['cjs', 'es', 'umd'],
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'lego-sensor-tracker',
      fileName: format => {
        switch (format) {
          case 'cjs':
            return 'lego-sensor-tracker.cjs';
          case 'umd':
            return 'lego-sensor-tracker.umd.js';
          case 'es':
          default:
            return 'lego-sensor-tracker.js';
        }
      },
    },
    rollupOptions: {
      external: [/^@nio-fe\//, 'sa-sdk-javascript', 'vue'],
    },
  },
});
