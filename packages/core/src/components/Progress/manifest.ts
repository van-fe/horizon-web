import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { ProgressCommandMap, ProgressEventMap, ProgressRegionMap } from './contract';
import { progressApiContract } from './contract';

export const progressManifest = createComponentManifest({
  name: 'Progress',
  category: 'feedback',
  description: { zh: '展示任务或流程的完成程度。', en: 'Displays task or process completion.' },
  semantics: ['percentage', 'line', 'circle', 'dashboard', 'status', 'color stops'],
  accessibility: ['progressbar role', 'value range', 'readable value text'],
  testVectors: ['zero', 'complete', 'status', 'custom formatter', 'color stops', 'clamping'],
  contract: {
    props: createPropManifestFields(progressApiContract, {
      type: { type: 'ProgressType', description: { zh: '进度类型', en: 'Progress type' } },
      percentage: {
        type: 'number',
        required: true,
        description: { zh: '百分比', en: 'Percentage' },
      },
      status: { type: 'ProgressStatus', description: { zh: '状态', en: 'Status' } },
      duration: { type: 'number', description: { zh: '动画时长', en: 'Animation duration' } },
      size: { type: 'ProgressSize', description: { zh: '尺寸', en: 'Size' } },
      format: {
        type: 'ProgressFormatter',
        description: { zh: '文本格式化', en: 'Text formatter' },
      },
      content: {
        type: 'string | number | boolean',
        description: { zh: '自定义文本', en: 'Custom text' },
      },
      placement: {
        type: 'ProgressPlacement',
        description: { zh: '文本位置', en: 'Text placement' },
      },
      textBold: { type: 'boolean', description: { zh: '文本加粗', en: 'Bold text' } },
      showText: { type: 'boolean', description: { zh: '显示文本', en: 'Show text' } },
      color: { type: 'ProgressColor', description: { zh: '自定义颜色', en: 'Custom color' } },
    }),
    emits: createManifestFields<ProgressEventMap>({}),
    slots: createManifestFields<ProgressRegionMap>({
      label: { type: 'content', description: { zh: '进度文本', en: 'Progress text' } },
    }),
    exposes: createManifestFields<ProgressCommandMap>({}),
  },
});
