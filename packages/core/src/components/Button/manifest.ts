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
    props: createPropManifestFields(buttonApiContract),
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
        runtimeType: 'function',
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
    props: createPropManifestFields(buttonGroupApiContract),
    emits: [],
    slots: createManifestFields<ButtonGroupRegionMap>({
      content: { type: 'void', description: { zh: '组内按钮', en: 'Grouped buttons' } },
    }),
    exposes: [],
  },
});
