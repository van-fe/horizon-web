import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { SpaceCommandMap, SpaceEventMap, SpaceRegionMap } from './contract';
import { spaceApiContract } from './contract';

export const spaceManifest = createComponentManifest({
  name: 'Space',
  category: 'basic',
  description: {
    zh: '统一排列内容之间的间距。',
    en: 'Applies consistent spacing between content.',
  },
  semantics: ['direction', 'gap', 'alignment', 'wrapping', 'separator'],
  accessibility: ['preserves child semantics', 'decorative separator'],
  testVectors: ['preset gap', 'custom gap', 'vertical', 'wrap', 'separator'],
  contract: {
    props: createPropManifestFields(spaceApiContract, {
      block: {
        type: 'boolean',
        description: { zh: '是否占满宽度', en: 'Whether it fills the width' },
      },
      align: {
        type: 'SpaceAlign',
        description: { zh: '对齐方式', en: 'Alignment' },
      },
      size: {
        type: 'SpaceSize',
        description: { zh: '间距', en: 'Gap size' },
      },
      direction: {
        type: 'SpaceDirection',
        description: { zh: '方向', en: 'Direction' },
      },
      wrap: {
        type: 'boolean',
        description: { zh: '是否换行', en: 'Whether wrapping is enabled' },
      },
    }),
    emits: createManifestFields<SpaceEventMap>({}),
    slots: createManifestFields<SpaceRegionMap>({
      content: {
        type: 'content[]',
        description: { zh: '排列内容', en: 'Arranged content' },
      },
      separator: {
        type: 'content',
        description: { zh: '分隔内容', en: 'Separator content' },
      },
    }),
    exposes: createManifestFields<SpaceCommandMap>({}),
  },
});
