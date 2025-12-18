import { defineConfig } from 'vite';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'locale',
      formats: ['cjs', 'es', 'umd'],
      fileName: format => {
        switch (format) {
          case 'cjs':
            return 'locale.cjs';
          case 'umd':
            return 'locale.umd.js';
          case 'es':
          default:
            return 'locale.js';
        }
      },
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
