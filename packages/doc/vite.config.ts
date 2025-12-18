import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import resolveExtensionVue from 'vite-plugin-resolve-extension-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Markdown from './build/plugin-mk-code';
import path from 'path';
import resolveComponentsAlias from './build/resolveComponentsAlias';
import { prismjsPlugin } from 'vite-plugin-prismjs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
  server: {
    open: true
  },
  base: process.env.FX_BASE,
  resolve: {
    alias: [
      {
        find: /^~root\//,
        replacement: path.join(__dirname, '../'),
      },
      {
        find: /^@\//,
        replacement: path.join(__dirname, 'node_modules/'),
      },
      {
        find: /^@nio-fe\/lego$/,
        replacement: path.join(__dirname, 'node_modules/@nio-fe/lego/src/'),
      },
      {
        find: /^@nio-fe\/lego-pad$/,
        replacement: path.join(__dirname, 'node_modules/@nio-fe/lego-pad/src/'),
      },
      {
        find: /^lego-package\//,
        replacement: path.join(__dirname, 'node_modules/@nio-fe/lego/'),
      },
      {
        find: /^lego-pad-package\//,
        replacement: path.join(__dirname, 'node_modules/@nio-fe/lego-pad/'),
      },
      {
        find: /^~\//,
        replacement: path.join(__dirname, './src/'),
      },
    ],
  },
  define: {
    'process.env': {},
  },
  plugins: [
    Components({
      dts: false,
      // resolvers: [LegoPluginResolvers()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    resolveExtensionVue(),
    Markdown(),
    vueJsx(),
    resolveComponentsAlias(),
    prismjsPlugin({
      languages: ['xml', 'typescript', 'css', 'scss', 'json'],
    }),
  ],
});
