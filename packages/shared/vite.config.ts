import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: 'es2015',
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'shared',
      formats: ['cjs', 'es', 'umd'],
      fileName: format => {
        switch (format) {
          case 'cjs':
            return 'shared.cjs';
          case 'umd':
            return 'shared.umd.js';
          case 'es':
          default:
            return 'shared.js';
        }
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        sourcemap: true,
      },
    },
  },
  optimizeDeps: {
    include: ['vue'],
  },
});
