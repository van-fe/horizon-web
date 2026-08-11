import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { CountCommandMap, CountEventMap, CountRegionMap } from './contract';
import { countApiContract } from './contract';

export const countManifest = createComponentManifest({
  name: 'Count',
  category: 'basic',
  description: {
    zh: '以可选动画和分组格式展示计数。',
    en: 'Displays a count with optional animation and grouping.',
  },
  semantics: ['start', 'end', 'step', 'timer', 'number formatting'],
  accessibility: ['readable numeric content', 'reduced-motion ownership'],
  testVectors: ['static', 'auto play', 'decimal', 'negative', 'separator', 'change'],
  contract: {
    props: createPropManifestFields(countApiContract, {
      startValue: { type: 'number', description: { zh: '开始值', en: 'Start value' } },
      endValue: { type: 'number', required: true, description: { zh: '结束值', en: 'End value' } },
      decimal: { type: 'number', description: { zh: '小数位', en: 'Decimals' } },
      step: { type: 'number', description: { zh: '步长指数', en: 'Step exponent' } },
      autoPlay: { type: 'boolean', description: { zh: '自动播放', en: 'Auto play' } },
      delay: { type: 'number', description: { zh: '延迟', en: 'Delay' } },
      separator: { type: 'string', description: { zh: '分隔符', en: 'Separator' } },
      extent: { type: 'number', description: { zh: '分组长度', en: 'Group length' } },
      prefix: { type: 'string', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'string', description: { zh: '后缀', en: 'Suffix' } },
    }),
    emits: createManifestFields<CountEventMap>({
      change: { type: 'number', description: { zh: '值变化', en: 'Value changed' } },
    }),
    slots: createManifestFields<CountRegionMap>({
      prefix: { type: 'content', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'content', description: { zh: '后缀', en: 'Suffix' } },
    }),
    exposes: createManifestFields<CountCommandMap>({}),
  },
});
