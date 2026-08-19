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
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@aurora/core',
        '@aurora/horizon-core',
        '@aurora/theme',
      ],
      output: [
        {
          format: 'es',
          dir: resolveSource('./dist'),
          preserveModules: true,
          preserveModulesRoot: resolveSource('./src'),
          entryFileNames: '[name].js',
          exports: 'named',
        },
        {
          format: 'cjs',
          dir: resolveSource('./dist'),
          preserveModules: true,
          preserveModulesRoot: resolveSource('./src'),
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
  },
});
