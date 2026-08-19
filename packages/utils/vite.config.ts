import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: 'es2015',
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'utils',
      formats: ['cjs', 'es', 'umd'],
      fileName: format => {
        switch (format) {
          case 'cjs':
            return 'utils.cjs';
          case 'umd':
            return 'utils.umd.js';
          case 'es':
          default:
            return 'utils.js';
        }
      },
    },
    rollupOptions: {
      external: ['vue', '@aurora/core', '@aurora/horizon-core', '@aurora/theme'],
      output: {
        sourcemap: true,
        globals: {
          '@aurora/core': 'AuroraCore',
          '@aurora/horizon-core': 'HorizonWebCore',
          '@aurora/theme': 'AuroraTheme',
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['vue'],
  },
});
