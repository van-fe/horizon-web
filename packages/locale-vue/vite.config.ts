import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'locale-vue',
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue', /^dayjs/, /@aurora\//, /^lodash/],
      output: [
        {
          format: 'es',
          dir: path.resolve(__dirname, 'es'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            '@aurora/utils': 'utils',
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          dir: path.resolve(__dirname, 'lib'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            '@aurora/utils': 'utils',
            vue: 'Vue',
          },
          entryFileNames: '[name].js',
        },
        {
          name: 'localeVue',
          format: 'umd',
          dir: path.resolve(__dirname, 'dist'),
          preserveModules: false,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            '@aurora/utils': 'utils',
            vue: 'Vue',
          },
          entryFileNames: '[name].umd.js',
        },
        {
          name: 'localeVue',
          format: 'umd',
          dir: path.resolve(__dirname, 'dist'),
          preserveModules: false,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            '@aurora/utils': 'utils',
            vue: 'Vue',
          },
          entryFileNames: 'locale-vue.umd.js',
        },
        {
          name: 'localeVue',
          format: 'es',
          dir: path.resolve(__dirname, 'dist'),
          preserveModules: false,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            '@aurora/utils': 'utils',
            vue: 'Vue',
          },
          entryFileNames: 'locale-vue.js',
        },
        {
          name: 'localeVue',
          format: 'cjs',
          dir: path.resolve(__dirname, 'dist'),
          preserveModules: false,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            '@aurora/locale': 'locale',
            '@aurora/utils': 'utils',
            vue: 'Vue',
          },
          entryFileNames: 'locale-vue.cjs',
        },
      ],
    },
  },
  plugins: [vue(), vueJsx()],
});
