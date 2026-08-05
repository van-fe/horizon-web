import { defineConfig } from 'vitepress';
import demosSidebar from './demos-sidebar.json';
import version from './version.json';

const createDemosSidebar = () =>
  demosSidebar.map(category => ({
    text: category.zh,
    collapsed: false,
    items: category.items.map(item => ({
      text: item.zh,
      link: item.link,
    })),
  }));

const zhGuideSidebar = [
  {
    text: '指引',
    collapsed: false,
    items: [
      { text: '为什么选用 Horizon Web ?', link: 'why-choose-horizon-web' },
      { text: '快速开始', link: 'start' },
      { text: '按需引入', link: 'on-demand-import' },
      { text: '命名空间', link: 'namespace' },
      { text: 'FAQ', link: 'FAQ' },
    ],
  },
  {
    text: '基础配置',
    collapsed: false,
    items: [
      { text: 'HorizonWeb', link: 'config-horizon-web' },
      { text: 'UnpluginResolver', link: 'config-unplugin-resolver' },
    ],
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: 'Vue3 现代组件库',
  lang: 'zh',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/why-choose-horizon-web', activeMatch: '/guide/' },
      { text: 'API 及示例', link: '/demos/index', activeMatch: '/demos/' },
      { text: '扩展', link: '/extensions/', activeMatch: '/extensions/' },
      {
        text: version.version,
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/van-fe/horizon-web/releases',
          },
          {
            text: '反馈问题',
            link: 'https://github.com/van-fe/horizon-web/issues',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: zhGuideSidebar,
      },
      '/demos/': {
        base: '/demos/',
        items: createDemosSidebar(),
      },
      '/extensions/': {
        items: [
          {
            text: '扩展',
            collapsed: false,
            items: [
              { text: '概览', link: '/extensions/' },
              { text: 'Upload Adapters', link: '/extensions/upload-adapters' },
            ],
          },
        ],
      },
    },
  },
});
