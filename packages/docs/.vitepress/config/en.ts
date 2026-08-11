import { defineConfig } from 'vitepress';
import demosSidebar from './demos-sidebar.json';
import version from './version.json';

const createVueSidebar = () =>
  demosSidebar.map(category => ({
    text: category.en,
    collapsed: false,
    items: category.items.map(item => ({
      text: item.en,
      link: item.link,
    })),
  }));

const reactSidebar = [
  {
    text: 'Basic Components',
    collapsed: false,
    items: [
      { text: 'Button', link: 'components/Button' },
      { text: 'Avatar', link: 'components/Avatar' },
      { text: 'Badge', link: 'components/Badge' },
      { text: 'Card', link: 'components/Card' },
      { text: 'Count', link: 'components/Count' },
      { text: 'Divider', link: 'components/Divider' },
      { text: 'Typography', link: 'components/Typography' },
      { text: 'Statistic', link: 'components/Statistic' },
      { text: 'Space', link: 'components/Space' },
      { text: 'Tooltip', link: 'components/Tooltip' },
    ],
  },
  {
    text: 'Form Components',
    collapsed: false,
    items: [
      { text: 'Checkbox', link: 'components/Checkbox' },
      { text: 'Input', link: 'components/Input' },
      { text: 'Rate', link: 'components/Rate' },
      { text: 'Radio', link: 'components/Radio' },
      { text: 'Segmented', link: 'components/Segmented' },
      { text: 'Select', link: 'components/Select' },
      { text: 'Slider', link: 'components/Slider' },
      { text: 'Switch', link: 'components/Switch' },
    ],
  },
  {
    text: 'Navigation Components',
    collapsed: false,
    items: [
      { text: 'Link', link: 'components/Link' },
      { text: 'Breadcrumb', link: 'components/Breadcrumb' },
      { text: 'Steps', link: 'components/Steps' },
      { text: 'Pagination', link: 'components/Pagination' },
      { text: 'Timeline', link: 'components/Timeline' },
    ],
  },
  {
    text: 'Feedback Components',
    collapsed: false,
    items: [
      { text: 'Alert', link: 'components/Alert' },
      { text: 'Empty', link: 'components/Empty' },
      { text: 'Progress', link: 'components/Progress' },
      { text: 'Result', link: 'components/Result' },
      { text: 'Skeleton', link: 'components/Skeleton' },
    ],
  },
];

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
  description: 'Horizon Web component libraries for Vue 3 and React',
  lang: 'en',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/en/guide/why-choose-horizon-web',
        activeMatch: '/en/guide/',
      },
      { text: 'Vue 3', link: '/en/vue/index', activeMatch: '/en/vue/' },
      { text: 'React', link: '/en/react/index', activeMatch: '/en/react/' },
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
      '/en/vue/': {
        base: '/en/vue/',
        items: createVueSidebar(),
      },
      '/en/react/': {
        base: '/en/react/',
        items: reactSidebar,
      },
      '/en/extensions/': {
        items: [
          {
            text: 'Extensions',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/en/extensions/' },
              { text: 'Locale Vue', link: '/en/extensions/locale-vue' },
              { text: 'Locale React', link: '/en/extensions/locale-react' },
              { text: 'Upload Adapters', link: '/en/extensions/upload-adapters' },
            ],
          },
        ],
      },
    },
  },
});
