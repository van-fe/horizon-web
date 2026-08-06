import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const resolveSource = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  build: {
    target: 'es2018',
    lib: {
      entry: resolveSource('./src/index.ts'),
      name: 'localeReact',
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['react', '@aurora/locale'],
      output: [
        {
          format: 'es',
          dir: resolveSource('./dist'),
          exports: 'named',
          entryFileNames: 'index.js',
        },
        {
          format: 'cjs',
          dir: resolveSource('./dist'),
          exports: 'named',
          entryFileNames: 'index.cjs',
        },
        {
          name: 'localeReact',
          format: 'umd',
          dir: resolveSource('./dist'),
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            react: 'React',
          },
          entryFileNames: 'locale-react.umd.js',
        },
      ],
    },
  },
});
