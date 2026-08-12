import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { HoverCommandMap, HoverEventMap, HoverRegionMap } from './contract';
import { hoverApiContract } from './contract';

export const hoverManifest = createComponentManifest({
  name: 'Hover',
  category: 'basic',
  description: {
    zh: '为单个目标提供延迟悬停状态。',
    en: 'Provides delayed hover state to one target.',
  },
  semantics: ['single target', 'show and hide delays', 'imperative visibility commands'],
  accessibility: ['does not add a DOM wrapper', 'hover content must not be the only access path'],
  testVectors: ['mouse enter and leave', 'delays', 'disabled', 'timer cleanup'],
  contract: {
    props: createPropManifestFields(hoverApiContract, {
      disabled: { type: 'boolean', description: { zh: '是否禁用', en: 'Disabled state' } },
      showDelay: { type: 'number', description: { zh: '显示延迟', en: 'Show delay' } },
      hideDelay: { type: 'number', description: { zh: '隐藏延迟', en: 'Hide delay' } },
    }),
    emits: createManifestFields<HoverEventMap>({
      mouseEnter: { type: 'Event', description: { zh: '鼠标进入', en: 'Mouse enter' } },
      mouseMove: { type: 'Event', description: { zh: '鼠标移动', en: 'Mouse move' } },
      mouseLeave: { type: 'Event', description: { zh: '鼠标离开', en: 'Mouse leave' } },
      visibleChange: {
        type: 'boolean',
        description: { zh: '可见状态变化', en: 'Visibility change' },
      },
    }),
    slots: createManifestFields<HoverRegionMap>({
      content: { type: 'content', description: { zh: '目标内容', en: 'Target content' } },
    }),
    exposes: createManifestFields<HoverCommandMap>({
      show: { type: '() => void', description: { zh: '请求显示', en: 'Requests showing' } },
      hide: { type: '() => void', description: { zh: '请求隐藏', en: 'Requests hiding' } },
    }),
  },
});
