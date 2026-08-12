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
      { text: 'Container 布局容器', link: 'components/Container' },
      { text: 'Layout 栅格布局', link: 'components/Layout' },
      { text: 'Hover 悬停状态', link: 'components/Hover' },
      { text: 'Count 计数', link: 'components/Count' },
      { text: 'Divider 分割线', link: 'components/Divider' },
      { text: 'Typography 排版', link: 'components/Typography' },
      { text: 'Statistic 统计数值', link: 'components/Statistic' },
      { text: 'Space 间距', link: 'components/Space' },
      { text: 'Tooltip 文字提示', link: 'components/Tooltip' },
      { text: 'Popover 气泡卡片', link: 'components/Popover' },
      { text: 'Dropdown 下拉菜单', link: 'components/Dropdown' },
      { text: 'Popconfirm 气泡确认框', link: 'components/Popconfirm' },
      { text: 'Dialog 对话框', link: 'components/Dialog' },
      { text: 'Drawer 抽屉', link: 'components/Drawer' },
      { text: 'FloatButton 悬浮按钮', link: 'components/FloatButton' },
      { text: 'Backtop 回到顶部', link: 'components/Backtop' },
      { text: 'Affix 固钉', link: 'components/Affix' },
      { text: 'Anchor 锚点导航', link: 'components/Anchor' },
      { text: 'Application 应用配置', link: 'components/Application' },
    ],
  },
  {
    text: '表单组件',
    collapsed: false,
    items: [
      { text: 'Form 表单', link: 'components/Form' },
      { text: 'Checkbox 多选框', link: 'components/Checkbox' },
      { text: 'Input 输入框', link: 'components/Input' },
      { text: 'Rate 评分', link: 'components/Rate' },
      { text: 'Radio 单选框', link: 'components/Radio' },
      { text: 'Segmented 分段控制器', link: 'components/Segmented' },
      { text: 'Select 选择器', link: 'components/Select' },
      { text: 'Slider 滑块', link: 'components/Slider' },
      { text: 'Switch 开关', link: 'components/Switch' },
    ],
  },
  {
    text: '导航组件',
    collapsed: false,
    items: [
      { text: 'Link 文字链接', link: 'components/Link' },
      { text: 'Breadcrumb 面包屑', link: 'components/Breadcrumb' },
      { text: 'Collapse 折叠面板', link: 'components/Collapse' },
      { text: 'Tabs 页签', link: 'components/Tabs' },
      { text: 'Steps 步骤条', link: 'components/Steps' },
      { text: 'Pagination 分页', link: 'components/Pagination' },
      { text: 'Timeline 时间轴', link: 'components/Timeline' },
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
