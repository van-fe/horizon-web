import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { SpinCommandMap, SpinEventMap, SpinRegionMap } from './contract';
import { spinApiContract } from './contract';

export const spinManifest = createComponentManifest({
  name: 'Spin',
  category: 'feedback',
  description: {
    zh: '展示内联、区域或全屏加载状态。',
    en: 'Displays inline, regional, or fullscreen loading state.',
  },
  semantics: ['loading state', 'delayed visibility', 'size', 'mask', 'fullscreen'],
  accessibility: ['status role', 'live loading label', 'busy content'],
  testVectors: ['inline', 'nested', 'delay', 'stale timer', 'custom indicator', 'fullscreen'],
  contract: {
    props: createPropManifestFields(spinApiContract, {
      spinning: {
        type: 'boolean',
        description: { zh: '是否处于加载状态', en: 'Whether the component is loading' },
      },
      size: { type: 'SpinSize', description: { zh: '指示器尺寸', en: 'Indicator size' } },
      delay: {
        type: 'number',
        description: { zh: '延迟显示毫秒数', en: 'Delay before showing in milliseconds' },
      },
      tip: { type: 'string', description: { zh: '加载提示文字', en: 'Loading tip text' } },
      mask: {
        type: 'boolean',
        description: { zh: '区域内容遮罩', en: 'Mask over regional content' },
      },
      fullscreen: {
        type: 'boolean',
        description: { zh: '覆盖整个视口', en: 'Covers the viewport' },
      },
    }),
    emits: createManifestFields<SpinEventMap>({}),
    slots: createManifestFields<SpinRegionMap>({
      content: { type: 'content', description: { zh: '被覆盖内容', en: 'Covered content' } },
      indicator: {
        type: 'content',
        description: { zh: '自定义加载指示器', en: 'Custom loading indicator' },
      },
      tip: { type: 'content', description: { zh: '自定义提示内容', en: 'Custom tip content' } },
    }),
    exposes: createManifestFields<SpinCommandMap>({}),
  },
});
