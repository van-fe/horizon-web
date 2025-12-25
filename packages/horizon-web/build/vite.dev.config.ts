import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dtsPlugin from 'vite-plugin-dts';
import { genedBundlePlugin, green } from '../../../scripts/log';
import { rollupTheme } from './rollup-theme';

export default defineConfig({
  css: {
    preprocessorOptions: { scss: { charset: false } },
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
    },
    cssCodeSplit: true,
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        'video.js',
        /^dayjs/,
        /@aurora\//,
        /^lodash/,
        /@popperjs/,
        /^@vueuse/,
        'async-validator',
        'deepmerge',
        'dompurify',
        'nanoid',
        'resize-observer-polyfill',
      ],
      output: [
        {
          format: 'es',
          dir: path.resolve(__dirname, '../es'),
          preserveModules: true,
          preserveModulesRoot: 'src',
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
  plugins: [
    vue(),
    vueJsx(),
    dtsPlugin({
      outDir: ['./es', './lib'],
      async afterBuild() {
        green('Start to build styles');
        await rollupTheme();
        green('Build styles success');
      },
    }),
    genedBundlePlugin(true),
  ],
});
