import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { CardCommandMap, CardEventMap, CardRegionMap } from './contract';
import { cardApiContract } from './contract';

export const cardManifest = createComponentManifest({
  name: 'Card',
  category: 'basic',
  description: {
    zh: '承载一组相关内容和操作。',
    en: 'Contains a related group of content and actions.',
  },
  semantics: ['header', 'body', 'footer', 'dividers', 'border and radius'],
  accessibility: ['semantic content regions', 'heading ownership'],
  testVectors: ['title', 'custom header', 'footer', 'dividers', 'border', 'radius'],
  contract: {
    props: createPropManifestFields(cardApiContract, {
      title: { type: 'string', description: { zh: '默认标题', en: 'Default title' } },
      topDivider: { type: 'boolean', description: { zh: '顶部线', en: 'Top divider' } },
      bottomDivider: { type: 'boolean', description: { zh: '底部线', en: 'Bottom divider' } },
      radius: { type: 'CardRadius', description: { zh: '圆角', en: 'Radius' } },
      border: { type: 'boolean', description: { zh: '边框', en: 'Border' } },
    }),
    emits: createManifestFields<CardEventMap>({}),
    slots: createManifestFields<CardRegionMap>({
      content: { type: 'content', description: { zh: '主体内容', en: 'Body content' } },
      header: { type: 'content', description: { zh: '头部内容', en: 'Header content' } },
      footer: { type: 'content', description: { zh: '底部内容', en: 'Footer content' } },
    }),
    exposes: createManifestFields<CardCommandMap>({}),
  },
});
