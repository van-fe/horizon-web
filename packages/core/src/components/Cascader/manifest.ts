import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { CascaderCommandMap, CascaderEventMap, CascaderRegionMap } from './contract';
import { cascaderApiContract } from './contract';

export const cascaderManifest = createComponentManifest({
  name: 'Cascader',
  category: 'form',
  description: {
    zh: '通过逐级面板选择层级数据。',
    en: 'Selects hierarchical data through progressive panels.',
  },
  semantics: [
    'value paths',
    'single or multiple selection',
    'staged confirmation',
    'filtering',
    'dynamic loading',
  ],
  accessibility: ['combobox ownership', 'keyboard panels', 'expanded state', 'disabled options'],
  testVectors: [
    'field mapping',
    'loose values',
    'filter limit',
    'multiple limit',
    'dynamic load races',
    'keyboard navigation',
  ],
  contract: {
    props: createPropManifestFields(cascaderApiContract, {
      modelValue: {
        type: 'CascaderModelValue',
        description: { zh: '选中值', en: 'Selected value' },
      },
      defaultValue: {
        type: 'CascaderModelValue',
        description: { zh: '初始选中值', en: 'Initial selected value' },
      },
      options: {
        type: 'readonly CascaderOption[]',
        required: true,
        description: { zh: '选项树', en: 'Option tree' },
      },
      trigger: {
        type: 'CascaderTrigger',
        description: { zh: '面板触发方式', en: 'Panel trigger' },
      },
      expandTrigger: {
        type: 'CascaderExpandTrigger',
        description: { zh: '展开触发方式', en: 'Expansion trigger' },
      },
      clearable: { type: 'boolean', description: { zh: '支持清除', en: 'Clearable' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      multiple: { type: 'boolean', description: { zh: '多选', en: 'Multiple' } },
      multipleLimit: { type: 'number', description: { zh: '多选限制', en: 'Multiple limit' } },
      checkStrictly: {
        type: 'boolean',
        description: { zh: '父子选择独立', en: 'Independent parent selection' },
      },
      expandStrictly: { type: 'boolean', description: { zh: '严格展开', en: 'Strict expansion' } },
      showCheckedStrategy: {
        type: 'CascaderShowStrategy',
        description: { zh: '标签展示策略', en: 'Label strategy' },
      },
      pathSeparator: { type: 'string', description: { zh: '路径分隔符', en: 'Path separator' } },
      needConfirm: {
        type: 'boolean',
        description: { zh: '需要确认', en: 'Requires confirmation' },
      },
      filter: {
        type: 'boolean | CascaderSearchParams',
        description: { zh: '过滤配置', en: 'Filter options' },
      },
      filterable: { type: 'boolean', description: { zh: '支持过滤', en: 'Filterable' } },
      filterMethod: {
        type: 'CascaderFilterFunction',
        description: { zh: '过滤方法', en: 'Filter method' },
      },
      filterMaxResult: { type: 'number', description: { zh: '结果限制', en: 'Result limit' } },
      filterResultSort: {
        type: 'CascaderFilterSortFunction',
        description: { zh: '结果排序', en: 'Result sorting' },
      },
      reserveKeyword: {
        type: 'CascaderReserveKeyword',
        description: { zh: '保留关键词', en: 'Reserve keyword' },
      },
      fieldMap: { type: 'CascaderFieldMap', description: { zh: '字段映射', en: 'Field mapping' } },
    }),
    emits: createManifestFields<CascaderEventMap>({
      valueChange: {
        type: 'CascaderModelValue',
        description: { zh: '选中值变化', en: 'Value changed' },
      },
      dropdownVisibleChange: {
        type: 'boolean',
        description: { zh: '面板显隐变化', en: 'Visibility changed' },
      },
      focus: { type: 'void', description: { zh: '聚焦', en: 'Focused' } },
      blur: { type: 'void', description: { zh: '失焦', en: 'Blurred' } },
      input: { type: 'string', description: { zh: '输入变化', en: 'Input changed' } },
      search: { type: 'string', description: { zh: '搜索变化', en: 'Search changed' } },
      optionsChange: {
        type: 'readonly CascaderOption[]',
        description: { zh: '选项变化', en: 'Options changed' },
      },
      change: {
        type: '[boolean?, CascaderNormalizedOption?]',
        description: { zh: '单项变化', en: 'Option changed' },
      },
      clear: { type: 'void', description: { zh: '清空', en: 'Cleared' } },
      select: {
        type: '[CascaderValuePath?, CascaderNormalizedOption?]',
        description: { zh: '选择', en: 'Selected' },
      },
      deselect: {
        type: '[CascaderValuePath?, CascaderNormalizedOption?]',
        description: { zh: '取消选择', en: 'Deselected' },
      },
      modify: {
        type: '[CascaderModelValue, boolean?, CascaderNormalizedOption?]',
        description: { zh: '提交值变化', en: 'Committed value changed' },
      },
      confirm: { type: 'CascaderModelValue', description: { zh: '确认', en: 'Confirmed' } },
      cancel: { type: 'CascaderModelValue', description: { zh: '取消', en: 'Cancelled' } },
      panelReachBottom: {
        type: '[unknown, CascaderOption?]',
        description: { zh: '面板触底', en: 'Panel reached end' },
      },
      click: { type: 'unknown', description: { zh: '点击触发器', en: 'Trigger clicked' } },
    }),
    slots: createManifestFields<CascaderRegionMap>({
      trigger: {
        type: 'CascaderTriggerRegionContext',
        description: { zh: '自定义触发器', en: 'Custom trigger' },
      },
      tag: {
        type: 'CascaderNormalizedOption',
        description: { zh: '选中标签', en: 'Selected tag' },
      },
      selection: { type: 'void', description: { zh: '完整选择区', en: 'Selection renderer' } },
      item: {
        type: 'CascaderNormalizedOption',
        description: { zh: '选项', en: 'Option renderer' },
      },
      searchResult: {
        type: 'CascaderSearchRegionContext',
        description: { zh: '搜索结果', en: 'Search result' },
      },
      empty: { type: 'void', description: { zh: '空状态', en: 'Empty state' } },
      confirm: {
        type: 'CascaderConfirmRegionContext',
        description: { zh: '确认区', en: 'Confirmation region' },
      },
      panelHeader: { type: 'void', description: { zh: '面板头部', en: 'Panel header' } },
      panelFooter: { type: 'void', description: { zh: '面板底部', en: 'Panel footer' } },
      confirmLeading: {
        type: 'void',
        description: { zh: '确认区前置内容', en: 'Confirmation leading content' },
      },
    }),
    exposes: createManifestFields<CascaderCommandMap>({
      confirm: { type: '() => void', description: { zh: '确认', en: 'Confirms selection' } },
      cancel: { type: '() => void', description: { zh: '取消', en: 'Cancels selection' } },
      focusOption: {
        type: '(path) => void',
        description: { zh: '聚焦选项', en: 'Focuses an option' },
      },
      setPanelVisible: {
        type: '(visible) => void',
        description: { zh: '设置面板显隐', en: 'Sets panel visibility' },
      },
      enableInput: { type: '() => void', description: { zh: '启用输入', en: 'Enables input' } },
      setInput: { type: '(value) => void', description: { zh: '设置输入', en: 'Sets input' } },
      clear: { type: '() => void', description: { zh: '清空', en: 'Clears selection' } },
      focus: { type: '() => void', description: { zh: '聚焦', en: 'Focuses component' } },
      blur: { type: '() => void', description: { zh: '失焦', en: 'Blurs component' } },
    }),
  },
});
