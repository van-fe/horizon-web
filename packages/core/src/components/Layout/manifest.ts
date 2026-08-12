import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  GridCommandMap,
  GridEventMap,
  GridItemCommandMap,
  GridItemEventMap,
  GridItemRegionMap,
  GridRegionMap,
} from './contract';
import { gridApiContract, gridItemApiContract } from './contract';

export const gridManifest = createComponentManifest({
  name: 'Grid',
  category: 'basic',
  description: { zh: '基于 CSS Grid 的响应式栅格容器。', en: 'Responsive CSS Grid container.' },
  semantics: ['responsive tracks', 'directional gaps', 'item alignment'],
  accessibility: ['configurable semantic element', 'preserves document order'],
  testVectors: ['scalar values', 'responsive values', 'alignment', 'custom tag'],
  contract: {
    props: createPropManifestFields(gridApiContract, {
      tag: { type: 'string', description: { zh: '渲染元素', en: 'Rendered element' } },
      cols: { type: 'GridValue', description: { zh: '列数', en: 'Column count' } },
      gap: { type: 'GridValue', description: { zh: '行列间距', en: 'Row and column gap' } },
      columnGap: { type: 'GridValue', description: { zh: '列间距', en: 'Column gap' } },
      rowGap: { type: 'GridValue', description: { zh: '行间距', en: 'Row gap' } },
      align: { type: 'GridAlignment', description: { zh: '垂直对齐', en: 'Vertical alignment' } },
      justify: {
        type: 'GridAlignment',
        description: { zh: '水平对齐', en: 'Horizontal alignment' },
      },
    }),
    emits: createManifestFields<GridEventMap>({}),
    slots: createManifestFields<GridRegionMap>({
      content: { type: 'content', description: { zh: '网格内容', en: 'Grid content' } },
    }),
    exposes: createManifestFields<GridCommandMap>({}),
  },
});

export const gridItemManifest = createComponentManifest({
  name: 'GridItem',
  category: 'basic',
  description: { zh: '响应式栅格中的单个网格项。', en: 'An item within a responsive grid.' },
  semantics: ['responsive span', 'responsive offset', 'zero-span visibility'],
  accessibility: ['preserves content order', 'hidden state follows responsive span'],
  testVectors: ['standalone item', 'zero span', 'oversized span and offset'],
  contract: {
    props: createPropManifestFields(gridItemApiContract, {
      span: { type: 'GridValue', description: { zh: '占据列数', en: 'Occupied columns' } },
      offset: { type: 'GridValue', description: { zh: '左侧偏移', en: 'Leading offset' } },
    }),
    emits: createManifestFields<GridItemEventMap>({}),
    slots: createManifestFields<GridItemRegionMap>({
      content: { type: 'content', description: { zh: '网格项内容', en: 'Grid item content' } },
    }),
    exposes: createManifestFields<GridItemCommandMap>({}),
  },
});
