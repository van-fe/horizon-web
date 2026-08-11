import { createComponentManifest } from '../_shared/manifest';

export const switchManifest = createComponentManifest({
  name: 'Switch',
  category: 'form',
  description: {
    zh: '在两个互斥状态之间切换。',
    en: 'Toggles between two mutually exclusive states.',
  },
  semantics: ['controlled value', 'uncontrolled value', 'guarded toggle'],
  accessibility: ['switch role', 'aria-checked', 'disabled and readonly semantics'],
  testVectors: ['normal', 'disabled', 'readonly', 'pending', 'async guard race'],
  contract: {
    props: [
      { name: 'value', type: 'boolean', description: { zh: '受控值', en: 'Controlled value' } },
      { name: 'defaultValue', type: 'boolean', defaultValue: 'false', description: { zh: '初始值', en: 'Initial value' } },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: { zh: '是否禁用', en: 'Whether disabled' } },
      { name: 'readOnly', type: 'boolean', defaultValue: 'false', description: { zh: '是否只读', en: 'Whether read-only' } },
      { name: 'size', type: 'SwitchSize', defaultValue: 'medium', description: { zh: '尺寸', en: 'Size' } },
    ],
    emits: [
      { name: 'change', type: '{ value: boolean; reason: SwitchChangeReason }', description: { zh: '值变化', en: 'Value changed' } },
    ],
    slots: [
      { name: 'label', type: 'content', description: { zh: '标签内容', en: 'Label content' } },
      { name: 'status', type: 'content', description: { zh: '状态内容', en: 'Status content' } },
    ],
    exposes: [
      { name: 'focus', type: '() => void', description: { zh: '聚焦开关', en: 'Focuses the switch' } },
    ],
  },
});
