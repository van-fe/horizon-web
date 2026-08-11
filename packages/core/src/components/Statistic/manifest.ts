import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { StatisticCommandMap, StatisticEventMap, StatisticRegionMap } from './contract';
import { statisticApiContract } from './contract';

export const statisticManifest = createComponentManifest({
  name: 'Statistic',
  category: 'basic',
  description: {
    zh: '展示关键统计值和业务趋势。',
    en: 'Displays a key statistic and business trend.',
  },
  semantics: ['number formatting', 'prefix', 'suffix', 'trend', 'loading'],
  accessibility: ['loading state', 'named trend direction'],
  testVectors: ['number', 'string', 'precision', 'grouping', 'formatter', 'trend', 'loading'],
  contract: {
    props: createPropManifestFields(statisticApiContract, {
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      value: { type: 'StatisticValue', description: { zh: '值', en: 'Value' } },
      precision: { type: 'number', description: { zh: '小数位', en: 'Precision' } },
      useGrouping: { type: 'boolean', description: { zh: '千位分组', en: 'Digit grouping' } },
      locale: { type: 'string', description: { zh: '语言标识', en: 'Locale' } },
      prefix: { type: 'string', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'string', description: { zh: '后缀', en: 'Suffix' } },
      formatter: { type: 'StatisticFormatter', description: { zh: '格式化', en: 'Formatter' } },
      trend: { type: 'StatisticTrend', description: { zh: '趋势', en: 'Trend' } },
      trendValue: { type: 'StatisticValue', description: { zh: '趋势值', en: 'Trend value' } },
      trendType: {
        type: 'StatisticTrendType',
        description: { zh: '趋势语义', en: 'Trend semantics' },
      },
      loading: { type: 'boolean', description: { zh: '加载', en: 'Loading' } },
    }),
    emits: createManifestFields<StatisticEventMap>({}),
    slots: createManifestFields<StatisticRegionMap>({
      title: { type: 'content', description: { zh: '标题', en: 'Title' } },
      value: { type: 'content', description: { zh: '值', en: 'Value' } },
      prefix: { type: 'content', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'content', description: { zh: '后缀', en: 'Suffix' } },
      trend: { type: 'content', description: { zh: '趋势', en: 'Trend' } },
    }),
    exposes: createManifestFields<StatisticCommandMap>({}),
  },
});
