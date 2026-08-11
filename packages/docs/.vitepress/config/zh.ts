import { defineConfig } from 'vitepress';
import demosSidebar from './demos-sidebar.json';
import version from './version.json';

const createVueSidebar = () =>
  demosSidebar.map(category => ({
    text: category.zh,
    collapsed: false,
    items: category.items.map(item => ({
      text: item.zh,
      link: item.link,
    })),
  }));

const reactSidebar = [
  {
    text: '基础组件',
    collapsed: false,
    items: [
      { text: 'Button 按钮', link: 'components/Button' },
      { text: 'Avatar 头像', link: 'components/Avatar' },
      { text: 'Badge 徽标', link: 'components/Badge' },
      { text: 'Card 卡片', link: 'components/Card' },
      { text: 'Count 计数', link: 'components/Count' },
      { text: 'Divider 分割线', link: 'components/Divider' },
      { text: 'Typography 排版', link: 'components/Typography' },
      { text: 'Statistic 统计数值', link: 'components/Statistic' },
      { text: 'Space 间距', link: 'components/Space' },
      { text: 'Tooltip 文字提示', link: 'components/Tooltip' },
    ],
  },
  {
    text: '表单组件',
    collapsed: false,
    items: [
      { text: 'Checkbox 多选框', link: 'components/Checkbox' },
      { text: 'Rate 评分', link: 'components/Rate' },
      { text: 'Radio 单选框', link: 'components/Radio' },
      { text: 'Segmented 分段控制器', link: 'components/Segmented' },
      { text: 'Select 选择器', link: 'components/Select' },
      { text: 'Slider 滑块', link: 'components/Slider' },
      { text: 'Switch 开关', link: 'components/Switch' },
    ],
  },
  {
    text: '反馈组件',
    collapsed: false,
    items: [
      { text: 'Alert 提示', link: 'components/Alert' },
      { text: 'Empty 空状态', link: 'components/Empty' },
      { text: 'Progress 进度', link: 'components/Progress' },
      { text: 'Result 结果', link: 'components/Result' },
      { text: 'Skeleton 骨架屏', link: 'components/Skeleton' },
    ],
  },
];

const zhGuideSidebar = [
  {
    text: '指引',
    collapsed: false,
    items: [
      { text: '为什么选用 Horizon Web ?', link: 'why-choose-horizon-web' },
      { text: '快速开始', link: 'start' },
      { text: '按需引入', link: 'on-demand-import' },
      { text: '命名空间', link: 'namespace' },
      { text: 'Aurora 多产品整改指南', link: 'multi-platform-refactor' },
      { text: 'Aurora 多产品项目计划', link: 'multi-platform-project-plan' },
      { text: 'Web 双 renderer MVP 验收', link: 'mvp-acceptance-report' },
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
  description: 'Horizon Web Vue 3 与 React 组件库',
  lang: 'zh',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/why-choose-horizon-web', activeMatch: '/guide/' },
      { text: 'Vue 3', link: '/vue/index', activeMatch: '/vue/' },
      { text: 'React', link: '/react/index', activeMatch: '/react/' },
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
      '/vue/': {
        base: '/vue/',
        items: createVueSidebar(),
      },
      '/react/': {
        base: '/react/',
        items: reactSidebar,
      },
      '/extensions/': {
        items: [
          {
            text: '扩展',
            collapsed: false,
            items: [
              { text: '概览', link: '/extensions/' },
              { text: 'Locale Vue', link: '/extensions/locale-vue' },
              { text: 'Locale React', link: '/extensions/locale-react' },
              { text: 'Upload Adapters', link: '/extensions/upload-adapters' },
            ],
          },
        ],
      },
    },
  },
});
