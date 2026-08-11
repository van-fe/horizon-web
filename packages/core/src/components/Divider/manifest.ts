import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { DividerCommandMap, DividerEventMap, DividerRegionMap } from './contract';
import { dividerApiContract } from './contract';

export const dividerManifest = createComponentManifest({
  name: 'Divider',
  category: 'basic',
  description: { zh: '分隔相邻内容或区块。', en: 'Separates adjacent content or sections.' },
  semantics: ['direction', 'visual strength', 'line style', 'optional title'],
  accessibility: ['decorative separator role', 'orientation'],
  testVectors: ['horizontal', 'vertical', 'title placement', 'variant alias'],
  contract: {
    props: createPropManifestFields(dividerApiContract, {
      variant: {
        type: 'DividerVariant',
        description: { zh: '视觉强度', en: 'Visual strength' },
      },
      direction: {
        type: 'DividerDirection',
        description: { zh: '方向', en: 'Direction' },
      },
      lineStyle: {
        type: 'DividerLineStyle',
        description: { zh: '线型', en: 'Line style' },
      },
      titlePlacement: {
        type: 'DividerTitlePlacement',
        description: { zh: '标题位置', en: 'Title placement' },
      },
      verticalMargin: {
        type: 'string | number',
        description: { zh: '垂直分割线边距', en: 'Vertical divider margin' },
      },
      horizontalMargin: {
        type: 'string | number',
        description: { zh: '水平分割线边距', en: 'Horizontal divider margin' },
      },
    }),
    emits: createManifestFields<DividerEventMap>({}),
    slots: createManifestFields<DividerRegionMap>({
      title: {
        type: 'content',
        description: { zh: '标题内容', en: 'Title content' },
      },
    }),
    exposes: createManifestFields<DividerCommandMap>({}),
  },
});
