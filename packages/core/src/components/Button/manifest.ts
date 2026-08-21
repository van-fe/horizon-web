import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  ButtonCommandMap,
  ButtonEventMap,
  ButtonGroupRegionMap,
  ButtonRegionMap,
} from './contract';
import { buttonApiContract, buttonGroupApiContract } from './contract';

export const buttonManifest = createComponentManifest({
  name: 'Button',
  category: 'basic',
  description: {
    zh: '触发即时操作或导航。',
    en: 'Triggers an immediate action or navigation.',
  },
  semantics: ['press', 'link navigation', 'application navigation', 'guarded async action'],
  accessibility: ['native button or anchor semantics', 'disabled action blocking', 'focus-visible'],
  testVectors: [
    'disabled and loading',
    'action priority',
    'async deduplication',
    'async rejection',
    'destroyed result',
  ],
  contract: {
    props: createPropManifestFields(buttonApiContract, {
      variant: {
        type: 'ButtonVariant',
        description: { zh: '视觉类型', en: 'Visual variant' },
      },
      size: { type: 'ButtonSize', description: { zh: '尺寸', en: 'Size' } },
      round: { type: 'boolean', description: { zh: '椭圆外观', en: 'Pill shape' } },
      plain: { type: 'boolean', description: { zh: '简洁外观', en: 'Plain treatment' } },
      ghost: { type: 'boolean', description: { zh: '幽灵外观', en: 'Ghost treatment' } },
      text: { type: 'boolean', description: { zh: '文字外观', en: 'Text treatment' } },
      link: { type: 'boolean', description: { zh: '链接外观', en: 'Link treatment' } },
      block: { type: 'boolean', description: { zh: '填满容器', en: 'Block width' } },
      active: { type: 'boolean', description: { zh: '激活状态', en: 'Active state' } },
      loading: { type: 'boolean', description: { zh: '加载状态', en: 'Loading state' } },
      disabled: { type: 'boolean', description: { zh: '禁用状态', en: 'Disabled state' } },
      autoFit: { type: 'boolean', description: { zh: '按内容收缩', en: 'Content fitting' } },
      borderStyle: {
        type: 'ButtonBorderStyle',
        description: { zh: '边框样式', en: 'Border style' },
      },
      color: { type: 'string', description: { zh: '自定义颜色', en: 'Custom color' } },
      href: { type: 'string', description: { zh: '原生链接', en: 'Native link URL' } },
      target: { type: 'ButtonTarget', description: { zh: '链接目标', en: 'Link target' } },
      replace: {
        type: 'boolean',
        description: { zh: '替换导航记录', en: 'Replace navigation entry' },
      },
      asyncAction: {
        type: '() => unknown | PromiseLike<unknown>',
        description: { zh: '异步操作', en: 'Async action' },
      },
      asyncState: {
        type: 'ButtonAsyncState',
        description: { zh: '异步视觉状态', en: 'Async visual state' },
      },
    }),
    emits: createManifestFields<ButtonEventMap>({
      press: { type: 'unknown', description: { zh: '普通操作', en: 'Regular action' } },
      actionFinished: {
        type: 'void',
        description: { zh: '异步完成', en: 'Async action completed' },
      },
      actionError: {
        type: 'unknown',
        description: { zh: '异步失败', en: 'Async action failed' },
      },
    }),
    slots: createManifestFields<ButtonRegionMap>({
      content: { type: 'void', description: { zh: '按钮内容', en: 'Button content' } },
      icon: { type: 'void', description: { zh: '前置图标', en: 'Leading icon' } },
      suffix: { type: 'void', description: { zh: '后置内容', en: 'Trailing content' } },
    }),
    exposes: createManifestFields<ButtonCommandMap>({
      focus: {
        type: '() => void',
        description: { zh: '聚焦按钮', en: 'Focuses the button' },
      },
    }),
  },
});

export const buttonGroupManifest = createComponentManifest({
  name: 'ButtonGroup',
  category: 'basic',
  description: {
    zh: '将一组相关按钮组织为连续控件。',
    en: 'Groups related buttons into a connected control.',
  },
  semantics: ['shared variant', 'shared size', 'connected actions'],
  accessibility: ['group semantics', 'independent native buttons'],
  testVectors: ['variant inheritance', 'size inheritance', 'nested content'],
  contract: {
    props: createPropManifestFields(buttonGroupApiContract, {
      variant: {
        type: 'ButtonVariant',
        description: { zh: '组内视觉类型', en: 'Grouped variant' },
      },
      size: { type: 'ButtonSize', description: { zh: '组内尺寸', en: 'Grouped size' } },
    }),
    emits: [],
    slots: createManifestFields<ButtonGroupRegionMap>({
      content: { type: 'void', description: { zh: '组内按钮', en: 'Grouped buttons' } },
    }),
    exposes: [],
  },
});
