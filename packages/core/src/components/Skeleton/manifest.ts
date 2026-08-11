import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { SkeletonCommandMap, SkeletonEventMap, SkeletonRegionMap } from './contract';
import { skeletonApiContract } from './contract';

export const skeletonManifest = createComponentManifest({
  name: 'Skeleton',
  category: 'feedback',
  description: {
    zh: '在内容加载期间展示结构占位。',
    en: 'Shows structural placeholders while content loads.',
  },
  semantics: [
    'loading placeholder',
    'custom template',
    'loaded content',
    'animation',
    'item shapes',
  ],
  accessibility: ['aria-busy ownership', 'decorative placeholders', 'loaded-content replacement'],
  testVectors: [
    'default placeholder',
    'custom placeholder',
    'loaded content',
    'animation',
    'item shape',
  ],
  contract: {
    props: createPropManifestFields(skeletonApiContract, {
      loading: { type: 'boolean', description: { zh: '加载状态', en: 'Loading state' } },
      animated: { type: 'boolean', description: { zh: '动画', en: 'Animation' } },
    }),
    emits: createManifestFields<SkeletonEventMap>({}),
    slots: createManifestFields<SkeletonRegionMap>({
      content: { type: 'content', description: { zh: '真实内容', en: 'Loaded content' } },
      placeholder: { type: 'content', description: { zh: '骨架模板', en: 'Placeholder template' } },
    }),
    exposes: createManifestFields<SkeletonCommandMap>({}),
  },
});
