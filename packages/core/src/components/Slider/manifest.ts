import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { SliderCommandMap, SliderEventMap } from './contract';
import { sliderApiContract } from './contract';

export const sliderManifest = createComponentManifest({
  name: 'Slider',
  category: 'form',
  description: { zh: '在连续或离散区间内选择单值或范围。', en: 'Selects a value or range.' },
  semantics: ['controlled value', 'uncontrolled value', 'range', 'step', 'tooltip'],
  accessibility: ['slider role', 'value aria', 'keyboard adjustment', 'disabled semantics'],
  testVectors: ['single', 'range', 'track', 'pointer', 'keyboard', 'step', 'bounds'],
  contract: {
    props: createPropManifestFields(sliderApiContract, {
      value: { type: 'SliderValue', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'SliderValue', description: { zh: '初始值', en: 'Initial value' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      max: { type: 'number', description: { zh: '最大值', en: 'Maximum' } },
      min: { type: 'number', description: { zh: '最小值', en: 'Minimum' } },
      step: { type: 'number', description: { zh: '步长', en: 'Step' } },
      showSeparators: { type: 'boolean', description: { zh: '显示刻度', en: 'Shows ticks' } },
      tone: { type: 'SliderTone', description: { zh: '语义色', en: 'Semantic tone' } },
      color: { type: 'string', description: { zh: '自定义颜色', en: 'Custom color' } },
      range: { type: 'boolean', description: { zh: '范围模式', en: 'Range mode' } },
      trackClickable: { type: 'boolean', description: { zh: '轨道可点击', en: 'Clickable track' } },
      showInput: { type: 'boolean', description: { zh: '显示数字输入', en: 'Shows number input' } },
      keyboard: { type: 'boolean', description: { zh: '键盘控制', en: 'Keyboard control' } },
      showTooltip: { type: 'boolean', description: { zh: '显示提示', en: 'Shows tooltip' } },
      tooltipPlacement: {
        type: 'SliderTooltipPlacement',
        description: { zh: '提示位置', en: 'Tooltip placement' },
      },
      formatTooltip: {
        type: 'SliderTooltipFormatter',
        description: { zh: '提示格式化', en: 'Tooltip formatter' },
      },
    }),
    emits: createManifestFields<SliderEventMap>({
      change: { type: 'SliderValue', description: { zh: '值变化', en: 'Value changed' } },
      focus: { type: 'unknown', description: { zh: '聚焦', en: 'Focused' } },
      blur: { type: 'unknown', description: { zh: '失焦', en: 'Blurred' } },
    }),
    slots: [],
    exposes: createManifestFields<SliderCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦滑块', en: 'Focuses the slider' } },
    }),
  },
});
