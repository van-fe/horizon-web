import { defineConfig } from 'vitepress'
import DefineOptions from 'unplugin-vue-define-options/vite';
import ResolveComponentsAlias from './resolveComponentsAlias';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HORIZONWEB",
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
        icon: {
          svg: '<svg role="img" viewBox="0 0 28 24" fill="none"><path fill="currentColor" d="M6.335 20.83A75 75 0 0 0 2.4 23.097C.683 23.993-.254 22.533.06 21.4l.018-.04-.008.007q.026-.085.06-.168L9.768 2.725a4.634 4.634 0 0 1 7.76 0l4.181 7.975c-.91.177-1.916.398-2.845.61L15.2 4.374a1.854 1.854 0 0 0-3.104 0L5.278 17.343c-.225.472.02.76.527.535 3.003-1.547 6.386-2.907 10.019-3.982 4.23-1.252 8.374-1.99 12.176-2.236v.407a2.734 2.734 0 0 1-2.4 2.71c-2.854.345-5.89.967-9.001 1.888-3.793 1.122-7.266 2.547-10.266 4.155zM23.86 23.245c2.833.564 3.375-1.74 2.597-3.463l-1.646-3.143c-.997.142-1.942.3-2.905.486l1.067 2.042c.213.403-.139.878-.575.78-2.1-.468-4.22-.827-6.496-1.052-1.281-.126-2.918.723-3.176 2.19-.059.439-.058.446-.058.446v.009c3.991.17 7.727.785 11.193 1.705"></path></svg>'
        },
        link: 'https://aurora-design.nio.com'
      }, {
        icon: {
          svg: '<svg role="img" viewBox="0 0 380 380"><g id="LOGO"><path class="cls-1" d="M282.83,170.73l-.27-.69-26.14-68.22a6.81,6.81,0,0,0-2.69-3.24,7,7,0,0,0-8,.43,7,7,0,0,0-2.32,3.52l-17.65,54H154.29l-17.65-54A6.86,6.86,0,0,0,134.32,99a7,7,0,0,0-8-.43,6.87,6.87,0,0,0-2.69,3.24L97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82,19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91,40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"/><path class="cls-2" d="M282.83,170.73l-.27-.69a88.3,88.3,0,0,0-35.15,15.8L190,229.25c19.55,14.79,36.57,27.64,36.57,27.64l40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"/><path class="cls-3" d="M153.43,256.89l19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91S209.55,244,190,229.25C170.45,244,153.43,256.89,153.43,256.89Z"/><path class="cls-2" d="M132.58,185.84A88.19,88.19,0,0,0,97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82s17-12.85,36.57-27.64Z"/></g><</svg>'
        },
        link: 'https://git.nevint.com/horizon-web/horizon-web'
      },
    ]
  },
  vite: {
    resolve: {
      alias: [
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
