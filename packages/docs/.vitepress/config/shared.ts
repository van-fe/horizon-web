import { defineConfig } from 'vitepress';
import DefineOptions from 'unplugin-vue-define-options/vite';
import ResolveComponentsAlias from './resolveComponentsAlias';
import watchDemos from './watchDemos';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { liveDemoPlugin } from './liveDemoPlugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Horizon Web',
  base: process.env.DOCS_BASE || '/',
  cleanUrls: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      dir: 'src',
    },
    en: {
      label: 'English',
      lang: 'en',
    },
  },
  themeConfig: {
    appearance: true,
    logo: '/logo.png',
    nav: [{ text: 'Home', link: '/' }],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/van-fe/horizon-web',
      },
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag === 'demo-render',
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: [
        {
          // Only replace the Vue package root. A string alias also rewrites
          // `vue/dist/...` imports used by VitePress SSR into invalid paths.
          find: /^vue$/,
          replacement: 'vue/dist/vue.esm-bundler.js',
        },
        {
          find: /^@aurora\/horizon-web$/,
          replacement: path.join(__dirname, '../../../../node_modules/@aurora/horizon-web/src/'),
        },
        {
          find: /^@aurora\/upload-adapters\/(.*)$/,
          replacement: path.join(__dirname, '../../../../packages/upload-adapters/src/$1'),
        },
        ...['colors', 'utils', 'icon', 'locale-vue', 'locale', 'upload-adapters'].map(name => ({
          find: new RegExp(`^@aurora\\/${name}$`),
          replacement: path.join(__dirname, `../../../../packages/${name}/src`),
        })),
        {
          find: /^horizon-web-package\//,
          replacement: path.join(__dirname, '../../../../node_modules/@aurora/horizon-web/'),
        },
        {
          // Demos are compiled from the docs workspace, while these runtime
          // dependencies are declared by the component package.
          find: /^dayjs$/,
          replacement: path.join(__dirname, '../../../../packages/horizon-web/node_modules/dayjs'),
        },
        {
          find: /^decimal\.js$/,
          replacement: path.join(
            __dirname,
            '../../../../packages/horizon-web/node_modules/decimal.js',
          ),
        },
        {
          find: /^lodash\/(.*)$/,
          replacement: path.join(
            __dirname,
            '../../../../packages/horizon-web/node_modules/lodash/$1',
          ),
        },
      ],
    },
    plugins: [liveDemoPlugin(), vueJsx(), DefineOptions(), ResolveComponentsAlias(), watchDemos()],
    server: {
      watch: {
        // 确保配置文件目录和 demos 目录被监听（使用 ! 前缀表示不忽略）
        ignored: [
          '**/.vitepress/dist/**',
          '**/.vitepress/cache/**',
          '!**/demos/**',
          '!**/zh/**',
          '!**/en/**',
        ],
      },
    },
  },
});
