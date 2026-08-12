import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { PageHeaderCommandMap, PageHeaderEventMap, PageHeaderRegionMap } from './contract';
import { pageHeaderApiContract } from './contract';

export const pageHeaderManifest = createComponentManifest({
  name: 'PageHeader',
  category: 'navigation',
  description: {
    zh: '在页面内容上方声明主题、上下文与页面级操作。',
    en: 'Declares page context, supporting information, and page-level actions.',
  },
  semantics: ['page title', 'back action', 'breadcrumb', 'supporting content', 'actions'],
  accessibility: ['heading semantics', 'named back action', 'keyboard activation'],
  testVectors: ['fallback content', 'custom regions', 'back action', 'divider', 'narrow layout'],
  contract: {
    props: createPropManifestFields(pageHeaderApiContract, {
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      content: { type: 'string', description: { zh: '说明文字', en: 'Supporting text' } },
      showBack: { type: 'boolean', description: { zh: '显示返回操作', en: 'Show back action' } },
      useDivider: { type: 'boolean', description: { zh: '显示分割线', en: 'Show divider' } },
      disabledHeaderTooltip: {
        type: 'boolean',
        description: { zh: '禁用标题提示', en: 'Disable title tooltip' },
      },
    }),
    emits: createManifestFields<PageHeaderEventMap>({
      back: { type: 'void', description: { zh: '返回操作', en: 'Back action' } },
    }),
    slots: createManifestFields<PageHeaderRegionMap>({
      body: { type: 'content', description: { zh: '扩展内容', en: 'Extended content' } },
      backIcon: { type: 'content', description: { zh: '返回图标', en: 'Back icon' } },
      header: { type: 'content', description: { zh: '完整标题区', en: 'Complete heading region' } },
      title: { type: 'content', description: { zh: '标题内容', en: 'Title content' } },
      titleContainer: {
        type: 'content',
        description: { zh: '完整标题容器', en: 'Complete title container' },
      },
      tags: { type: 'content', description: { zh: '标签', en: 'Tags' } },
      description: { type: 'content', description: { zh: '说明内容', en: 'Supporting content' } },
      actions: { type: 'content', description: { zh: '页面操作', en: 'Page actions' } },
      breadcrumb: { type: 'content', description: { zh: '面包屑', en: 'Breadcrumb' } },
    }),
    exposes: createManifestFields<PageHeaderCommandMap>({}),
  },
});
