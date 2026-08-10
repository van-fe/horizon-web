import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const resolveSource = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  build: {
    target: 'es2022',
    outDir: './dist',
    sourcemap: true,
    lib: {
      entry: resolveSource('./src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
