import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { AffixCommandMap, AffixEventMap, AffixRegionMap } from './contract';
import { affixApiContract } from './contract';

export const affixManifest = createComponentManifest({
  name: 'Affix',
  category: 'navigation',
  description: {
    zh: '将内容固定在视口或滚动容器的指定边界。',
    en: 'Pins content to a configured viewport or scrolling-container boundary.',
  },
  semantics: ['top or bottom edge', 'scroll boundary', 'space-preserving placeholder'],
  accessibility: ['content semantics preserved', 'placeholder hidden from accessibility tree'],
  testVectors: ['viewport top', 'viewport bottom', 'element target', 'responsive remeasure'],
  contract: {
    props: createPropManifestFields(affixApiContract, {
      offset: { type: 'number', description: { zh: '边界偏移', en: 'Boundary offset' } },
      position: { type: 'AffixPosition', description: { zh: '固定边缘', en: 'Pinned edge' } },
      target: { type: 'unknown', description: { zh: '滚动目标', en: 'Scroll target' } },
      zIndex: { type: 'number', description: { zh: '固定层级', en: 'Affixed z-index' } },
    }),
    emits: createManifestFields<AffixEventMap>({
      change: { type: 'boolean', description: { zh: '固定状态变化', en: 'Affixed state changed' } },
    }),
    slots: createManifestFields<AffixRegionMap>({
      content: { type: 'void', description: { zh: '固定内容', en: 'Affixed content' } },
    }),
    exposes: createManifestFields<AffixCommandMap>({
      updatePosition: {
        type: '() => void',
        description: { zh: '重新计算位置', en: 'Recalculates position' },
      },
    }),
  },
});
