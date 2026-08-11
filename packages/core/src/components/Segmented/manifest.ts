import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { SegmentedCommandMap, SegmentedEventMap, SegmentedRegionMap } from './contract';
import { segmentedApiContract } from './contract';

export const segmentedManifest = createComponentManifest({
  name: 'Segmented',
  category: 'form',
  description: {
    zh: '在少量互斥选项间切换。',
    en: 'Switches between a small set of exclusive options.',
  },
  semantics: ['controlled value', 'uncontrolled value', 'disabled item', 'overflow navigation'],
  accessibility: ['tablist role', 'roving focus', 'arrow, Home and End keys'],
  testVectors: ['controlled', 'uncontrolled', 'disabled', 'keyboard', 'block', 'overflow'],
  contract: {
    props: createPropManifestFields(segmentedApiContract, {
      value: { type: 'SegmentedValue', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'SegmentedValue', description: { zh: '初始值', en: 'Initial value' } },
      size: { type: 'SegmentedSize', description: { zh: '尺寸', en: 'Size' } },
      scrollable: { type: 'boolean', description: { zh: '允许滚动', en: 'Allows scrolling' } },
      focusable: {
        type: 'boolean',
        description: { zh: '选中后定位', en: 'Focuses selected items' },
      },
      arrow: { type: 'boolean', description: { zh: '显示滚动箭头', en: 'Shows scroll arrows' } },
      block: { type: 'boolean', description: { zh: '撑满容器', en: 'Fills its container' } },
    }),
    emits: createManifestFields<SegmentedEventMap>({
      change: { type: 'SegmentedValue', description: { zh: '选项变化', en: 'Selection changed' } },
    }),
    slots: createManifestFields<SegmentedRegionMap>({
      content: { type: 'content', description: { zh: '选项内容', en: 'Option content' } },
    }),
    exposes: createManifestFields<SegmentedCommandMap>({
      focus: {
        type: '() => void',
        description: { zh: '聚焦当前选项', en: 'Focuses the current option' },
      },
    }),
  },
});
