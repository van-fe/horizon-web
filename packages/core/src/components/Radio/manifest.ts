import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { RadioCommandMap, RadioEventMap, RadioRegionMap } from './contract';
import { radioApiContract } from './contract';

export const radioManifest = createComponentManifest({
  name: 'Radio',
  category: 'form',
  description: { zh: '从一组互斥选项中选择一项。', en: 'Selects one mutually exclusive option.' },
  semantics: ['controlled value', 'uncontrolled value', 'group selection', 'button variant'],
  accessibility: ['native radio', 'keyboard selection', 'group naming', 'disabled semantics'],
  testVectors: ['standalone', 'group', 'button', 'readonly', 'keyboard'],
  contract: {
    props: createPropManifestFields(radioApiContract, {
      value: { type: 'ChoiceValue', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: { type: 'ChoiceValue', description: { zh: '初始值', en: 'Initial value' } },
      optionValue: { type: 'ChoiceValue', description: { zh: '选项值', en: 'Option value' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      readOnly: { type: 'boolean', description: { zh: '只读展示', en: 'Read-only display' } },
      bordered: { type: 'boolean', description: { zh: '显示边框', en: 'Shows a border' } },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      variant: { type: 'RadioVariant', description: { zh: '外观类型', en: 'Visual variant' } },
      fill: { type: 'string', description: { zh: '选中填充色', en: 'Checked fill color' } },
      name: { type: 'string', description: { zh: '原生名称', en: 'Native name' } },
    }),
    emits: createManifestFields<RadioEventMap>({
      change: { type: 'ChoiceValue', description: { zh: '值变化', en: 'Value changed' } },
      blur: { type: 'unknown', description: { zh: '失焦', en: 'Blurred' } },
    }),
    slots: createManifestFields<RadioRegionMap>({
      label: {
        type: 'RadioLabelRegionContext',
        description: { zh: '标签内容', en: 'Label content' },
      },
    }),
    exposes: createManifestFields<RadioCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦选项', en: 'Focuses the option' } },
    }),
  },
});
