import { createComponentManifest } from '../_shared/manifest';

export const buttonManifest = createComponentManifest({
  name: 'Button',
  category: 'basic',
  description: {
    zh: '触发即时操作或导航。',
    en: 'Triggers an immediate action or navigation.',
  },
  semantics: ['press', 'link navigation', 'application navigation', 'async action'],
  accessibility: ['native button or anchor semantics', 'disabled action blocking', 'focus-visible'],
  testVectors: ['disabled', 'loading', 'href priority', 'route priority', 'async deduplication'],
  contract: {
    props: [
      { name: 'variant', type: 'ButtonVariant', defaultValue: 'primary', description: { zh: '视觉类型', en: 'Visual variant' } },
      { name: 'size', type: 'ButtonSize', defaultValue: 'medium', description: { zh: '尺寸', en: 'Size' } },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: { zh: '是否禁用', en: 'Whether disabled' } },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: { zh: '是否加载中', en: 'Whether loading' } },
      { name: 'href', type: 'string', description: { zh: '原生链接', en: 'Native link target' } },
      { name: 'asyncState', type: 'ButtonAsyncState', defaultValue: 'none', description: { zh: '异步状态', en: 'Async visual state' } },
    ],
    emits: [
      { name: 'press', type: 'PointerEvent', description: { zh: '触发普通操作', en: 'Triggers a regular action' } },
      { name: 'actionFinished', type: 'void', description: { zh: '异步操作完成', en: 'Async action completed' } },
      { name: 'actionError', type: 'unknown', description: { zh: '异步操作失败', en: 'Async action failed' } },
    ],
    slots: [
      { name: 'default', type: 'content', description: { zh: '按钮内容', en: 'Button content' } },
      { name: 'icon', type: 'content', description: { zh: '前置图标', en: 'Leading icon' } },
      { name: 'suffix', type: 'content', description: { zh: '后置内容', en: 'Trailing content' } },
    ],
    exposes: [
      { name: 'focus', type: '() => void', description: { zh: '聚焦按钮', en: 'Focuses the button' } },
    ],
  },
});
