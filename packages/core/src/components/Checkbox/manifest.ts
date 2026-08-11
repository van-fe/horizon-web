import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { CheckboxCommandMap, CheckboxEventMap, CheckboxRegionMap } from './contract';
import { checkboxApiContract } from './contract';

export const checkboxManifest = createComponentManifest({
  name: 'Checkbox',
  category: 'form',
  description: { zh: '从一组备选项中选择零项或多项。', en: 'Selects zero or more options.' },
  semantics: ['controlled value', 'uncontrolled value', 'group selection', 'indeterminate'],
  accessibility: ['native checkbox', 'mixed state', 'keyboard toggle', 'disabled semantics'],
  testVectors: ['standalone', 'group', 'true and false values', 'button', 'readonly'],
  contract: {
    props: createPropManifestFields(checkboxApiContract, {
      value: { type: 'CheckboxValue', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'CheckboxValue', description: { zh: '初始值', en: 'Initial value' } },
      optionValue: { type: 'ChoiceValue', description: { zh: '选项值', en: 'Option value' } },
      trueValue: { type: 'ChoiceValue', description: { zh: '选中值', en: 'Checked value' } },
      falseValue: { type: 'ChoiceValue', description: { zh: '未选中值', en: 'Unchecked value' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      readOnly: { type: 'boolean', description: { zh: '只读展示', en: 'Read-only display' } },
      bordered: { type: 'boolean', description: { zh: '显示边框', en: 'Shows a border' } },
      indeterminate: { type: 'boolean', description: { zh: '不确定状态', en: 'Mixed state' } },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      variant: { type: 'CheckboxVariant', description: { zh: '外观类型', en: 'Visual variant' } },
      fill: { type: 'string', description: { zh: '选中填充色', en: 'Checked fill color' } },
    }),
    emits: createManifestFields<CheckboxEventMap>({
      change: {
        type: '[CheckboxValue, CheckboxChangeDetails]',
        description: { zh: '值变化', en: 'Value changed' },
      },
      blur: { type: 'unknown', description: { zh: '失焦', en: 'Blurred' } },
      click: { type: 'unknown', description: { zh: '点击', en: 'Clicked' } },
    }),
    slots: createManifestFields<CheckboxRegionMap>({
      label: {
        type: 'CheckboxLabelRegionContext',
        description: { zh: '标签内容', en: 'Label content' },
      },
    }),
    exposes: createManifestFields<CheckboxCommandMap>({
      toggle: { type: '() => void', description: { zh: '切换状态', en: 'Toggles the state' } },
    }),
  },
});
