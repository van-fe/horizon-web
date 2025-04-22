import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import resolveExtensionVue from 'vite-plugin-resolve-extension-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Markdown from './build/plugin-mk-code';
import path from 'path';
import * as fs from 'fs';
import resolveComponentsAlias from './build/resolveComponentsAlias';
import { prismjsPlugin } from 'vite-plugin-prismjs';

function searchInRootNodeModules(moduleName: string) {
  const currPath = path.resolve(__dirname, '../../node_modules/.pnpm');
  const dirs = fs.readdirSync(currPath, 'utf-8');
  const dir = dirs.find(dir => new RegExp(`${moduleName}@`).test(dir));

  if (dir) {
    return path.resolve(currPath, dir, 'node_modules', moduleName);
  } else {
    throw new Error(`Cannot find ${moduleName} in root node_modules/.pnpm`);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
  base: process.env.FX_BASE,
  resolve: {
    alias: [
      {
        find: '~xe-utils',
        replacement: searchInRootNodeModules('xe-utils'),
      },
      {
        find: '~vxe-table',
        replacement: searchInRootNodeModules('vxe-table'),
      },
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
