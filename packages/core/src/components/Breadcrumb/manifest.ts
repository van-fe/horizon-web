import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { BreadcrumbEventMap, BreadcrumbRegionMap } from './contract';
import { breadcrumbApiContract } from './contract';

export const breadcrumbManifest = createComponentManifest({
  name: 'Breadcrumb',
  category: 'navigation',
  description: {
    zh: '展示当前位置在信息层级中的路径。',
    en: 'Shows the current location within an information hierarchy.',
  },
  semantics: ['hierarchy path', 'item action', 'route navigation', 'responsive collapse'],
  accessibility: ['navigation landmark', 'ordered hierarchy', 'native link', 'keyboard action'],
  testVectors: ['items', 'composition', 'separator', 'navigation', 'collapse', 'keyboard'],
  contract: {
    props: createPropManifestFields(breadcrumbApiContract, {
      separator: { type: 'string', description: { zh: '默认分隔符', en: 'Default separator' } },
      title: { type: 'boolean', description: { zh: '强调末级', en: 'Emphasizes the last item' } },
      items: {
        type: 'readonly BreadcrumbItemCommonProps[]',
        description: { zh: '层级条目', en: 'Hierarchy items' },
      },
      size: { type: 'BreadcrumbSize', description: { zh: '尺寸', en: 'Size' } },
      displayType: {
        type: 'BreadcrumbDisplayType',
        description: { zh: '溢出展示方式', en: 'Overflow display strategy' },
      },
    }),
    emits: createManifestFields<BreadcrumbEventMap>({
      itemClick: {
        type: '[BreadcrumbItemCommonProps, unknown]',
        description: { zh: '点击可交互条目', en: 'Interactive item clicked' },
      },
    }),
    slots: createManifestFields<BreadcrumbRegionMap>({
      content: { type: 'void', description: { zh: '层级条目', en: 'Hierarchy items' } },
      separator: {
        type: 'void',
        description: { zh: '默认分隔内容', en: 'Default separator content' },
      },
    }),
    exposes: [],
  },
});
