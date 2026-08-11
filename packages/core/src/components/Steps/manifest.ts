import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { StepsEventMap, StepsRegionMap, StepsCommandMap } from './contract';
import { stepsApiContract } from './contract';

export const stepsManifest = createComponentManifest({
  name: 'Steps',
  category: 'navigation',
  description: {
    zh: '展示多阶段流程的当前位置、完成状态和可选导航。',
    en: 'Shows position, completion state and optional navigation in a multi-stage flow.',
  },
  semantics: ['active step', 'ordered stages', 'async change guard', 'dynamic indexes'],
  accessibility: ['ordered list', 'native step action', 'current step', 'disabled step'],
  testVectors: ['status', 'indexes', 'controlled state', 'guard', 'keyboard', 'layout'],
  contract: {
    props: createPropManifestFields(stepsApiContract, {
      value: { type: 'number', description: { zh: '当前步骤', en: 'Current step' } },
      defaultValue: {
        type: 'number',
        description: { zh: '默认步骤', en: 'Default step' },
      },
      direction: { type: 'StepsDirection', description: { zh: '方向', en: 'Orientation' } },
      labelPlacement: {
        type: 'StepsLabelPlacement',
        description: { zh: '标签位置', en: 'Label placement' },
      },
      size: { type: 'StepsSize', description: { zh: '尺寸', en: 'Size' } },
      status: { type: 'StepsStatus', description: { zh: '当前状态', en: 'Current status' } },
      progressDot: { type: 'boolean', description: { zh: '点状节点', en: 'Dot nodes' } },
      clickable: { type: 'boolean', description: { zh: '允许交互', en: 'Interactive' } },
      controllable: {
        type: 'boolean',
        description: { zh: '点击自动切换', en: 'Click updates current step' },
      },
      initial: { type: 'number', description: { zh: '起始索引', en: 'Starting index' } },
      labelAlign: {
        type: 'StepsLabelAlign',
        description: { zh: '标签对齐', en: 'Label alignment' },
      },
      beforeChange: {
        type: 'StepsBeforeChange',
        description: { zh: '切换前守卫', en: 'Pre-change guard' },
      },
    }),
    emits: createManifestFields<StepsEventMap>({
      change: { type: 'number', description: { zh: '步骤变化', en: 'Step changed' } },
    }),
    slots: createManifestFields<StepsRegionMap>({
      content: { type: 'void', description: { zh: '步骤条目', en: 'Step items' } },
    }),
    exposes: createManifestFields<StepsCommandMap>({
      focus: {
        type: '(index?: number) => void',
        description: { zh: '聚焦步骤', en: 'Focuses a step' },
      },
    }),
  },
});
