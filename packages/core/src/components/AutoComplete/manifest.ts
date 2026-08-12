import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  AutoCompleteCommandMap,
  AutoCompleteEventMap,
  AutoCompleteRegionMap,
} from './contract';
import { autoCompleteApiContract } from './contract';

export const autoCompleteManifest = createComponentManifest({
  name: 'AutoComplete',
  category: 'form',
  description: {
    zh: '根据输入文字展示并选择建议项。',
    en: 'Presents and selects suggestions for typed text.',
  },
  semantics: ['controlled text', 'suggestion list', 'highlight', 'selection', 'composition'],
  accessibility: ['combobox role', 'listbox ownership', 'active descendant', 'keyboard selection'],
  testVectors: [
    'composition',
    'selected option order',
    'boundary navigation',
    'async options',
    'clear',
  ],
  contract: {
    props: createPropManifestFields(autoCompleteApiContract, {
      value: { type: 'string | null', description: { zh: '输入值', en: 'Input value' } },
      defaultValue: {
        type: 'string',
        description: { zh: '初始输入值', en: 'Initial input value' },
      },
      open: {
        type: 'boolean',
        description: { zh: '受控面板状态', en: 'Controlled popup state' },
      },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始面板状态', en: 'Initial popup state' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      clearable: { type: 'boolean', description: { zh: '允许清空', en: 'Clearable' } },
      trigger: { type: 'AutoCompleteTrigger', description: { zh: '触发方式', en: 'Trigger mode' } },
      placement: {
        type: 'PopoverPlacement',
        description: { zh: '面板位置', en: 'Popup placement' },
      },
      portal: {
        type: 'boolean',
        description: { zh: '通过 Portal 渲染', en: 'Render through a portal' },
      },
      inputVariant: {
        type: 'InputVariant',
        description: { zh: '输入框变体', en: 'Input variant' },
      },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      placeholder: { type: 'string', description: { zh: '占位文字', en: 'Placeholder' } },
      destroyOnHide: { type: 'boolean', description: { zh: '隐藏后销毁', en: 'Destroy on hide' } },
      fitInputWidth: {
        type: "boolean | 'fit-content'",
        description: { zh: '面板宽度策略', en: 'Popup width policy' },
      },
      hoverShowDelay: {
        type: 'number',
        description: { zh: 'hover 打开延迟', en: 'Hover open delay' },
      },
      hoverHideDelay: {
        type: 'number',
        description: { zh: 'hover 关闭延迟', en: 'Hover close delay' },
      },
      hidePanelWhenEmptyList: {
        type: 'boolean',
        description: { zh: '空列表时隐藏', en: 'Hide for empty list' },
      },
      loading: { type: 'boolean', description: { zh: '加载状态', en: 'Loading state' } },
      selectedOptionOrderToTop: {
        type: 'boolean',
        description: { zh: '选中项置顶', en: 'Move selection first' },
      },
      optionListMaxHeight: {
        type: 'string | number',
        description: { zh: '列表最大高度', en: 'List max height' },
      },
      descriptionPosition: {
        type: 'AutoCompleteDescriptionPosition',
        description: { zh: '说明位置', en: 'Description position' },
      },
      inputEmitFrequency: { type: 'number', description: { zh: '输入防抖', en: 'Input debounce' } },
      tooltipShowAfter: {
        type: 'number',
        description: { zh: '提示打开延迟', en: 'Tooltip open delay' },
      },
      tooltipHideAfter: {
        type: 'number',
        description: { zh: '提示关闭延迟', en: 'Tooltip close delay' },
      },
      expandPanelByChildren: {
        type: 'boolean',
        description: { zh: '内容撑开面板', en: 'Expand panel by content' },
      },
      options: {
        type: 'readonly AutoCompleteOption[]',
        description: { zh: '建议项', en: 'Suggestion options' },
      },
    }),
    emits: createManifestFields<AutoCompleteEventMap>({
      valueChange: { type: 'string', description: { zh: '输入值变化', en: 'Input value changed' } },
      openChange: {
        type: 'boolean, details',
        description: { zh: '面板状态变化', en: 'Popup state changed' },
      },
      focus: { type: 'event', description: { zh: '获得焦点', en: 'Focused' } },
      blur: { type: 'event', description: { zh: '失去焦点', en: 'Blurred' } },
      search: { type: 'string', description: { zh: '搜索变化', en: 'Search changed' } },
      optionListReachBottom: {
        type: 'event',
        description: { zh: '到达列表底部', en: 'Reached list end' },
      },
      clear: { type: 'void', description: { zh: '清空', en: 'Cleared' } },
      change: { type: 'string, details', description: { zh: '选择变化', en: 'Selection changed' } },
      select: {
        type: 'string, details',
        description: { zh: '选中建议', en: 'Suggestion selected' },
      },
    }),
    slots: createManifestFields<AutoCompleteRegionMap>({
      empty: { type: 'content', description: { zh: '空状态', en: 'Empty state' } },
      loading: { type: 'content', description: { zh: '加载状态', en: 'Loading state' } },
      panelHeader: { type: 'content', description: { zh: '面板头部', en: 'Popup header' } },
      panelFooter: { type: 'content', description: { zh: '面板底部', en: 'Popup footer' } },
      option: { type: 'AutoCompleteOption', description: { zh: '建议项', en: 'Suggestion' } },
      prefix: { type: 'content', description: { zh: '输入前缀', en: 'Input prefix' } },
      suffix: { type: 'content', description: { zh: '输入后缀', en: 'Input suffix' } },
    }),
    exposes: createManifestFields<AutoCompleteCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦', en: 'Focus' } },
      blur: { type: '() => void', description: { zh: '失焦', en: 'Blur' } },
      open: { type: '() => void', description: { zh: '打开', en: 'Open' } },
      close: { type: '() => void', description: { zh: '关闭', en: 'Close' } },
      clear: { type: '() => void', description: { zh: '清空', en: 'Clear' } },
    }),
  },
});
