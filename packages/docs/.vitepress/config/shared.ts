import { defineConfig } from 'vitepress'
import DefineOptions from 'unplugin-vue-define-options/vite';
import ResolveComponentsAlias from './resolveComponentsAlias';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Horizon Web",
  cleanUrls: true,
  rewrites: {
    'zh/:rest*': ':rest*'
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      dir: 'src'
    },
    en: {
      label: 'English',
      lang: 'en',
    }
  },
  themeConfig: {
    logo: './logo.svg',
    nav: [
      { text: 'Home', link: '/' },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/van-fe/horizon-web'
      },
    ]
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'demo-render',
      }
    }
  },
  vite: {
    resolve: {
      alias: [
        {
          find: 'vue',
          replacement: 'vue/dist/vue.esm-bundler.js',
        },
        {
          find: /^@aurora\/horizon-web$/,
          replacement: path.join(__dirname, '../../../../node_modules/@aurora/horizon-web/src/'),
        },
        {
          find: /^horizon-web-package\//,
          replacement: path.join(__dirname, '../../../../node_modules/@aurora/horizon-web/'),
        },
      ]
    },
    plugins: [vueJsx(), DefineOptions(), ResolveComponentsAlias()],
  }
})
