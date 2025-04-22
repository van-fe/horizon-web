import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: { preprocessorOptions: { scss: { charset: false } } },
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      formats: ['iife', 'es', 'umd'],
      name: 'legoPad',
      fileName: format => {
        switch (format) {
          case 'iife':
            return 'lego-pad-browser.iife.js';
          case 'umd':
            return 'lego-pad-browser.umd.js';
          case 'es':
          default:
            return 'lego-pad-browser.mjs';
        }
      },
    },
    rollupOptions: {
      external: ['vue', '@nio-fe/icon', '@nio-fe/shared', '@nio-fe/locale-vue', '@nio-fe/lego'],
      preserveEntrySignatures: 'strict',
      output: {
        globals: {
          vue: 'Vue',
          '@nio-fe/locale-vue': 'localeVue',
          '@nio-fe/shared': 'shared',
          '@nio-fe/lego': 'lego',
        },
        minifyInternalExports: false,
        externalLiveBindings: false,
        exports: 'named',
        dynamicImportInCjs: false,
        inlineDynamicImports: true,
        dir: path.resolve(__dirname, '../dist'),
        sourcemap: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^~\//,
        replacement: path.join(__dirname, '../src/'),
      },
      {
        find: /^~root\//,
        replacement: path.join(__dirname, '../../'),
      },
      {
        find: /^@\//,
        replacement: path.join(__dirname, '../node_modules/'),
      },
    ],
  },
  plugins: [vue(), vueJsx()],
});
