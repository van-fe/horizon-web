import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import buildTheme from './build/css-plugin/vite.css.plugin';

export default defineConfig({
  css: {
    preprocessorOptions: { scss: { charset: false } },
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    cssCodeSplit: true,
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        'video.js',
        /^dayjs/,
        /@vue/,
        /@nio-fe\//,
        /^lodash/,
        /@popperjs/,
        /^@vueuse/,
        'async-validator',
        'deepmerge',
        'dompurify',
        'nanoid',
        'resize-observer-polyfill',
        'decimal.js',
      ],
      output: [
        {
          format: 'es',
          dir: path.resolve(__dirname, 'es'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          dir: path.resolve(__dirname, 'lib'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          minifyInternalExports: false,
          externalLiveBindings: false,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
        },
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: /^~\//,
        replacement: path.join(__dirname, 'src/'),
      },
      {
        find: /^~root\//,
        replacement: path.join(__dirname, '../'),
      },
      {
        find: /^@\//,
        replacement: path.join(__dirname, 'node_modules/'),
      },
    ],
  },
  define: {
    'process.env': {},
  },
  plugins: [vue(), vueJsx(), buildTheme()],
});
