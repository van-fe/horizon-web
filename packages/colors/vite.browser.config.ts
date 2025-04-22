import { defineConfig } from 'vite';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'colors',
      formats: ['iife'],
      fileName: () => `colors-browser.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
        sourcemap: true,
      },
    },
  },
});
