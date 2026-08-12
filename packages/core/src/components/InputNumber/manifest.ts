import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { InputNumberCommandMap, InputNumberEventMap, InputNumberRegionMap } from './contract';
import { inputNumberApiContract } from './contract';

export const inputNumberManifest = createComponentManifest({
  name: 'InputNumber',
  category: 'form',
  description: {
    zh: '输入、校验并步进高精度数值。',
    en: 'Enters, validates and steps precision numeric values.',
  },
  semantics: ['numeric input', 'precision', 'boundaries', 'stepping', 'formatting'],
  accessibility: ['native input', 'label association', 'invalid state', 'step controls'],
  testVectors: ['empty', 'precision', 'string mode', 'min/max', 'step', 'formatter/parser'],
  contract: {
    props: createPropManifestFields(inputNumberApiContract, {
      value: { type: 'InputNumberValue', description: { zh: '当前值', en: 'Current value' } },
      defaultValue: {
        type: 'InputNumberValue',
        description: { zh: '初始值', en: 'Initial value' },
      },
      variant: {
        type: 'InputNumberVariant',
        description: { zh: '视觉样式', en: 'Visual variant' },
      },
      min: { type: 'number | string', description: { zh: '最小值', en: 'Minimum value' } },
      max: { type: 'number | string', description: { zh: '最大值', en: 'Maximum value' } },
      step: { type: 'number', description: { zh: '步长', en: 'Step size' } },
      stepStrictly: { type: 'boolean', description: { zh: '严格步长', en: 'Strict stepping' } },
      precision: { type: 'number', description: { zh: '小数精度', en: 'Decimal precision' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      controls: { type: 'boolean', description: { zh: '显示步进按钮', en: 'Shows step controls' } },
      controlsPosition: {
        type: 'InputNumberControlPosition',
        description: { zh: '按钮位置', en: 'Control position' },
      },
      name: { type: 'string', description: { zh: '字段名', en: 'Field name' } },
      placeholder: { type: 'string', description: { zh: '占位文字', en: 'Placeholder' } },
      clearable: { type: 'boolean', description: { zh: '可清空', en: 'Clearable' } },
      readOnly: { type: 'boolean', description: { zh: '只读', en: 'Read-only' } },
      longPress: { type: 'boolean', description: { zh: '长按步进', en: 'Long-press stepping' } },
      longPressInterval: {
        type: 'number',
        description: { zh: '长按间隔', en: 'Long-press interval' },
      },
      prefixIcon: { type: 'unknown', description: { zh: '前缀图标', en: 'Prefix icon' } },
      suffixIcon: { type: 'unknown', description: { zh: '后缀图标', en: 'Suffix icon' } },
      status: {
        type: 'InputNumberStatus',
        description: { zh: '校验状态', en: 'Validation status' },
      },
      stringMode: { type: 'boolean', description: { zh: '字符串模式', en: 'String mode' } },
      wheelToChange: {
        type: 'boolean',
        description: { zh: '滚轮改值', en: 'Wheel changes value' },
      },
      formatter: { type: 'function', description: { zh: '格式化函数', en: 'Formatter' } },
      parser: { type: 'function', description: { zh: '解析函数', en: 'Parser' } },
    }),
    emits: createManifestFields<InputNumberEventMap>({
      valueChange: { type: 'InputNumberValue', description: { zh: '值更新', en: 'Value changed' } },
      input: { type: 'InputNumberValue', description: { zh: '输入', en: 'Input' } },
      change: { type: 'InputNumberValue', description: { zh: '变更确认', en: 'Change committed' } },
      focus: { type: 'FocusEvent', description: { zh: '聚焦', en: 'Focused' } },
      blur: { type: 'FocusEvent', description: { zh: '失焦', en: 'Blurred' } },
      clear: { type: 'void', description: { zh: '清空', en: 'Cleared' } },
      keyDown: { type: 'KeyboardEvent', description: { zh: '按键按下', en: 'Key down' } },
      keyPress: { type: 'KeyboardEvent', description: { zh: '按键', en: 'Key press' } },
      keyUp: { type: 'KeyboardEvent', description: { zh: '按键抬起', en: 'Key up' } },
      wheel: { type: 'WheelEvent', description: { zh: '滚轮', en: 'Wheel' } },
    }),
    slots: createManifestFields<InputNumberRegionMap>({
      prefix: { type: 'void', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'void', description: { zh: '后缀', en: 'Suffix' } },
      prepend: { type: 'void', description: { zh: '前置内容', en: 'Prepended content' } },
      append: { type: 'void', description: { zh: '后置内容', en: 'Appended content' } },
    }),
    exposes: createManifestFields<InputNumberCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦', en: 'Focuses' } },
      blur: { type: '() => void', description: { zh: '失焦', en: 'Blurs' } },
      increase: { type: '() => void', description: { zh: '增加', en: 'Increases' } },
      decrease: { type: '() => void', description: { zh: '减少', en: 'Decreases' } },
      clear: { type: '() => void', description: { zh: '清空', en: 'Clears' } },
    }),
  },
});
