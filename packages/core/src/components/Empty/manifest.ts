import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { EmptyCommandMap, EmptyEventMap, EmptyRegionMap } from './contract';
import { emptyApiContract } from './contract';

export const emptyManifest = createComponentManifest({
  name: 'Empty',
  category: 'feedback',
  description: {
    zh: '展示无数据或无内容状态。',
    en: 'Displays an empty-data or empty-content state.',
  },
  semantics: ['illustration', 'description', 'follow-up content'],
  accessibility: ['decorative image', 'readable description'],
  testVectors: ['default image', 'custom image', 'preset size', 'numeric size', 'description'],
  contract: {
    props: createPropManifestFields(emptyApiContract, {
      image: { type: 'string', description: { zh: '图片地址', en: 'Image source' } },
      size: { type: 'EmptySize', description: { zh: '图片尺寸', en: 'Image size' } },
      description: { type: 'string', description: { zh: '描述', en: 'Description' } },
    }),
    emits: createManifestFields<EmptyEventMap>({}),
    slots: createManifestFields<EmptyRegionMap>({
      footer: { type: 'content', description: { zh: '底部内容', en: 'Footer content' } },
      image: { type: 'content', description: { zh: '图片', en: 'Image' } },
      description: { type: 'content', description: { zh: '描述', en: 'Description' } },
    }),
    exposes: createManifestFields<EmptyCommandMap>({}),
  },
});
