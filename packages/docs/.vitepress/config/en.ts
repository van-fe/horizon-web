import { defineConfig } from 'vitepress';
import demosSidebar from './demos-sidebar.json';
import version from './version.json';

const createDemosSidebar = () =>
  demosSidebar.map(category => ({
    text: category.en,
    collapsed: false,
    items: category.items.map(item => ({
      text: item.en,
      link: item.link,
    })),
  }));

const guideSidebar = [
  {
    text: 'Guide',
    collapsed: false,
    items: [
      { text: 'Why Horizon Web?', link: 'why-choose-horizon-web' },
      { text: 'Getting started', link: 'start' },
      { text: 'On-demand imports', link: 'on-demand-import' },
      { text: 'Namespace', link: 'namespace' },
      { text: 'FAQ', link: 'FAQ' },
    ],
  },
  {
    text: 'Configuration',
    collapsed: false,
    items: [
      { text: 'HorizonWeb', link: 'config-horizon-web' },
      { text: 'UnpluginResolver', link: 'config-unplugin-resolver' },
    ],
  },
];

export default defineConfig({
  description: 'A modern Vue 3 component library',
  lang: 'en',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/en/guide/why-choose-horizon-web',
        activeMatch: '/en/guide/',
      },
      { text: 'API & Demos', link: '/en/demos/index', activeMatch: '/en/demos/' },
      { text: 'Extensions', link: '/en/extensions/', activeMatch: '/en/extensions/' },
      {
        text: version.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/van-fe/horizon-web/releases',
          },
          {
            text: 'Report an issue',
            link: 'https://github.com/van-fe/horizon-web/issues',
          },
        ],
      },
    ],
    sidebar: {
      '/en/guide/': {
        base: '/en/guide/',
        items: guideSidebar,
      },
      '/en/demos/': {
        base: '/en/demos/',
        items: createDemosSidebar(),
      },
      '/en/extensions/': {
        items: [
          {
            text: 'Extensions',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/en/extensions/' },
              { text: 'Upload Adapters', link: '/en/extensions/upload-adapters' },
            ],
          },
        ],
      },
    },
  },
});
