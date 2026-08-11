import { defineConfig } from 'vitepress';
import DefineOptions from 'unplugin-vue-define-options/vite';
import ResolveComponentsAlias from './resolveComponentsAlias';
import watchDemos from './watchDemos';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { liveDemoPlugin } from './liveDemoPlugin';
import { scssPreprocessorOptions } from '../../../horizon-web-vue/build/sass-options';
import { legacyVueDocsRedirectPlugin } from './legacyVueDocsRedirectPlugin';
import { reactDocsTsxPlugin } from './reactDocsTsxPlugin';

const docsBase = process.env.DOCS_BASE || '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Horizon Web',
  base: docsBase,
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
    logo: '/logo.png',
    nav: [{ text: 'Home', link: '/' }],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/van-fe/horizon-web',
      },
    ],
    search: {
      provider: 'local',
    },
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
          ...scssPreprocessorOptions.scss,
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
          find: /^@aurora\/horizon-web-vue$/,
          replacement: path.join(__dirname, '../../../../node_modules/@aurora/horizon-web-vue/src/'),
        },
        {
          find: /^@aurora\/horizon-web-react$/,
          replacement: path.join(__dirname, '../../../horizon-web-react/src/index.ts'),
        },
        {
          find: /^@aurora\/core$/,
          replacement: path.join(__dirname, '../../../core/src/index.ts'),
        },
        {
          find: /^@aurora\/horizon-web-core$/,
          replacement: path.join(__dirname, '../../../horizon-web-core/src/index.ts'),
        },
        {
          find: /^@aurora\/theme$/,
          replacement: path.join(__dirname, '../../../theme/src/index.ts'),
        },
        {
          find: /^react$/,
          replacement: path.join(__dirname, '../../../horizon-web-react/node_modules/react'),
        },
        {
          find: /^react\/(.*)$/,
          replacement: path.join(__dirname, '../../../horizon-web-react/node_modules/react/$1'),
        },
        {
          find: /^react-dom\/(.*)$/,
          replacement: path.join(
            __dirname,
            '../../../horizon-web-react/node_modules/react-dom/$1',
          ),
        },
        {
          find: /^@aurora\/upload-adapters\/(.*)$/,
          replacement: path.join(__dirname, '../../../../packages/upload-adapters/src/$1'),
        },
        ...[
          'colors',
          'utils',
          'icon',
          'locale-vue',
          'locale-react',
          'locale',
          'upload-adapters',
        ].map(name => ({
          find: new RegExp(`^@aurora\\/${name}$`),
          replacement: path.join(__dirname, `../../../../packages/${name}/src`),
        })),
        {
          find: /^horizon-web-package\//,
          replacement: path.join(__dirname, '../../../../node_modules/@aurora/horizon-web-vue/'),
        },
        {
          // Demos are compiled from the docs workspace, while these runtime
          // dependencies are declared by the component package.
          find: /^dayjs$/,
          replacement: path.join(__dirname, '../../../../packages/horizon-web-vue/node_modules/dayjs'),
        },
        {
          find: /^decimal\.js$/,
          replacement: path.join(
            __dirname,
            '../../../../packages/horizon-web-vue/node_modules/decimal.js',
          ),
        },
        {
          find: /^lodash-es$/,
          replacement: path.join(
            __dirname,
            '../../../../packages/horizon-web-vue/node_modules/lodash-es/lodash.js',
          ),
        },
      ],
    },
    plugins: [
      legacyVueDocsRedirectPlugin(docsBase),
      liveDemoPlugin(),
      reactDocsTsxPlugin(),
      vueJsx({
        exclude: [/horizon-web-react[\\/]/, /docs[\\/]demos[\\/]react[\\/]/],
      }),
      DefineOptions(),
      ResolveComponentsAlias(),
      watchDemos(),
    ],
    server: {
      hmr: {
        // Live demo compiler errors are rendered inside DemoBlock. Keeping the
        // global overlay disabled prevents incomplete edits from covering docs.
        overlay: false,
      },
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
