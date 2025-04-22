/// <reference types="vitest" />
import { defineConfig } from 'vite';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'colors',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => {
        switch (format) {
          case 'cjs':
            return 'colors.cjs';
          case 'umd':
            return 'colors.umd.js';
          case 'es':
          default:
            return 'colors.js';
        }
      },
    },
    rollupOptions: {
      output: {
        exports: 'named',
        sourcemap: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    css: true,
  },
});
