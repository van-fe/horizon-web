import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { TimeCommandMap, TimeEventMap, TimeRegionMap } from './contract';
import { timeApiContract } from './contract';

export const timeManifest = createComponentManifest({
  name: 'Time',
  category: 'basic',
  description: {
    zh: '展示倒计时、正向计时或两个时间点的差值。',
    en: 'Displays a countdown, elapsed timer, or difference between two times.',
  },
  semantics: ['countdown', 'elapsed time', 'deadline', 'static duration'],
  accessibility: ['timer role', 'live completion state'],
  testVectors: ['seconds', 'milliseconds', 'date', 'countdown', 'forward', 'calculative'],
  contract: {
    props: createPropManifestFields(timeApiContract, {
      time: {
        type: 'TimeValue',
        description: { zh: '时长或开始时间', en: 'Duration or start time' },
      },
      endTime: { type: 'TimeValue', description: { zh: '结束时间', en: 'End time' } },
      forward: { type: 'boolean', description: { zh: '正向计时', en: 'Counts upwards' } },
      calculative: {
        type: 'boolean',
        description: { zh: '静态计算差值', en: 'Shows a static difference' },
      },
    }),
    emits: createManifestFields<TimeEventMap>({
      finished: { type: 'event', description: { zh: '倒计时结束', en: 'Countdown finished' } },
    }),
    slots: createManifestFields<TimeRegionMap>({
      content: {
        type: 'content',
        description: { zh: '自定义时间内容', en: 'Custom time content' },
      },
    }),
    exposes: createManifestFields<TimeCommandMap>({}),
  },
});
