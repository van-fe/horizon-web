import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const resolveSource = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  build: {
    target: 'es2018',
    outDir: './dist',
    sourcemap: true,
    lib: {
      entry: resolveSource('./src/index.ts'),
      cssFileName: 'style',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@aurora/core',
        '@aurora/horizon-web-core',
        '@aurora/theme',
      ],
      output: {
        exports: 'named',
      },
    },
  },
});
