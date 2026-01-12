import { defineConfig } from 'vitepress'
import DefineOptions from 'unplugin-vue-define-options/vite';
import ResolveComponentsAlias from './resolveComponentsAlias';
import watchDemos from './watchDemos';
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
    plugins: [
      vueJsx(), 
      DefineOptions(), 
      ResolveComponentsAlias(),
      watchDemos(),
      // // 添加文件监听插件，确保配置文件目录变更能被检测到
      // {
      //   name: 'watch-config',
      //   configureServer(server) {
      //     const configDir = path.join(__dirname, '../config');
      //     // 监听配置文件目录
      //     server.watcher.add(configDir);
      //     // 当配置文件变更时，输出提示信息
      //     server.watcher.on('change', (file) => {
      //       if (file.includes('.vitepress/config/')) {
      //         console.info(`\n[VitePress] 检测到配置文件变更: ${file}`);
      //         console.info('[VitePress] 配置文件需要重启开发服务器才能生效\n');
      //       }
      //     });
      //   },
      // },
    ],
    server: {
      watch: {
        // 确保配置文件目录和 demos 目录被监听（使用 ! 前缀表示不忽略）
        ignored: ['!**/.vitepress/config/**', '!**/demos/**'],
      },
    },
  }
})
