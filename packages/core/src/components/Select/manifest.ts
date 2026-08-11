import { createComponentManifest } from '../_shared/manifest';

export const selectManifest = createComponentManifest({
  name: 'Select',
  category: 'form',
  description: {
    zh: '从同类选项集合中选择一个值。',
    en: 'Chooses one value from a collection of related options.',
  },
  semantics: ['controlled value', 'controlled popup', 'option collection', 'filter', 'highlight'],
  accessibility: ['combobox role', 'listbox ownership', 'active descendant', 'keyboard selection'],
  testVectors: ['dynamic option', 'duplicate value', 'disabled skip', 'filter', 'value format'],
  contract: {
    props: [
      { name: 'value', type: 'SelectValue', description: { zh: '受控选中值', en: 'Controlled selected value' } },
      { name: 'defaultValue', type: 'SelectValue', description: { zh: '初始选中值', en: 'Initial selected value' } },
      { name: 'open', type: 'boolean', description: { zh: '受控面板状态', en: 'Controlled popup state' } },
      { name: 'filterable', type: 'boolean', defaultValue: 'false', description: { zh: '是否可筛选', en: 'Whether filterable' } },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: { zh: '是否禁用', en: 'Whether disabled' } },
      { name: 'clearable', type: 'boolean', defaultValue: 'false', description: { zh: '是否可清空', en: 'Whether clearable' } },
    ],
    emits: [
      { name: 'change', type: '{ value: SelectValue; reason: SelectChangeReason }', description: { zh: '选中值变化', en: 'Selected value changed' } },
      { name: 'openChange', type: '{ open: boolean; reason: SelectOpenReason }', description: { zh: '面板状态变化', en: 'Popup state changed' } },
    ],
    slots: [
      { name: 'option', type: 'SelectOption', description: { zh: '选项内容', en: 'Option content' } },
      { name: 'empty', type: 'content', description: { zh: '空状态', en: 'Empty state' } },
      { name: 'header', type: 'content', description: { zh: '面板头部', en: 'Popup header' } },
      { name: 'footer', type: 'content', description: { zh: '面板底部', en: 'Popup footer' } },
    ],
    exposes: [
      { name: 'focus', type: '() => void', description: { zh: '聚焦', en: 'Focuses the trigger' } },
      { name: 'open', type: '() => void', description: { zh: '打开面板', en: 'Opens the popup' } },
      { name: 'close', type: '() => void', description: { zh: '关闭面板', en: 'Closes the popup' } },
      { name: 'clear', type: '() => void', description: { zh: '清空选中值', en: 'Clears the value' } },
    ],
  },
});
