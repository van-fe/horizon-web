import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { TimelineRegionMap } from './contract';
import { timelineApiContract } from './contract';

export const timelineManifest = createComponentManifest({
  name: 'Timeline',
  category: 'navigation',
  description: {
    zh: '按时间展示里程碑、状态变化或活动记录。',
    en: 'Displays milestones, state changes or activity records over time.',
  },
  semantics: ['chronological records', 'node presentation', 'endpoint override', 'fold range'],
  accessibility: ['list semantics', 'fold control', 'descriptive timestamps'],
  testVectors: ['source order', 'chronological sort', 'timestamp format', 'fold', 'regions'],
  contract: {
    props: createPropManifestFields(timelineApiContract, {
      sort: { type: 'TimelineSort', description: { zh: '时间排序', en: 'Chronological sort' } },
      first: {
        type: 'TimelineDotCommonProps',
        description: { zh: '首节点覆盖', en: 'First node overrides' },
      },
      last: {
        type: 'TimelineDotCommonProps',
        description: { zh: '尾节点覆盖', en: 'Final node overrides' },
      },
    }),
    emits: [],
    slots: createManifestFields<TimelineRegionMap>({
      content: { type: 'void', description: { zh: '时间线条目', en: 'Timeline items' } },
    }),
    exposes: [],
  },
});
