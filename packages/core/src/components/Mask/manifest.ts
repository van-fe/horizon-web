import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { MaskCommandMap, MaskEventMap, MaskRegionMap } from './contract';
import { maskApiContract } from './contract';

export const maskManifest = createComponentManifest({
  name: 'Mask',
  category: 'overlay',
  description: {
    zh: '在内容上方显示遮罩与可选操作区域。',
    en: 'Displays a scrim and optional action content above a surface.',
  },
  semantics: ['visibility', 'visual strength', 'custom color', 'content region'],
  accessibility: ['hidden masks are inert', 'scrim click is isolated from content'],
  testVectors: ['variants', 'custom appearance', 'fuzzification', 'visibility', 'scrim press'],
  contract: {
    props: createPropManifestFields(maskApiContract, {
      variant: {
        type: 'MaskVariant',
        description: { zh: '遮罩视觉类型', en: 'Mask visual variant' },
      },
      visible: {
        type: 'boolean',
        description: { zh: '是否显示', en: 'Whether the mask is visible' },
      },
      absolute: {
        type: 'boolean',
        description: { zh: '是否绝对定位', en: 'Whether to use absolute positioning' },
      },
      opacity: {
        type: 'number | string',
        description: { zh: '遮罩透明度', en: 'Scrim opacity' },
      },
      color: {
        type: 'string',
        description: { zh: '自定义遮罩颜色', en: 'Custom scrim color' },
      },
      zIndex: {
        type: 'number',
        description: { zh: '根层级', en: 'Root stacking level' },
      },
      fuzzified: {
        type: 'boolean',
        description: { zh: '半透明模糊效果', en: 'Translucent blur treatment' },
      },
      contentFullSize: {
        type: 'boolean',
        description: { zh: '内容区域占满遮罩', en: 'Content region fills the mask' },
      },
    }),
    emits: createManifestFields<MaskEventMap>({
      maskClick: {
        type: 'Event',
        description: { zh: '点击遮罩背景', en: 'Scrim background pressed' },
      },
    }),
    slots: createManifestFields<MaskRegionMap>({
      content: {
        type: 'content',
        description: { zh: '遮罩上方内容', en: 'Content above the scrim' },
      },
    }),
    exposes: createManifestFields<MaskCommandMap>({}),
  },
});
