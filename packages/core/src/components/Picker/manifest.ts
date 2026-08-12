import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { PickerCommandMap, PickerEventMap, PickerRegionMap } from './contract';
import { pickerApiContract } from './contract';

export const pickerManifest = createComponentManifest({
  name: 'Picker',
  category: 'form',
  description: {
    zh: '为选择类组件提供统一触发器、浮层、状态与确认操作的基础组件。',
    en: 'Provides the shared trigger, popup, state, and confirmation foundation for pickers.',
  },
  semantics: ['controlled value', 'controlled popup', 'editable trigger', 'confirmation area'],
  accessibility: ['combobox ownership', 'expanded state', 'keyboard dismissal', 'focus restore'],
  testVectors: ['controlled state', 'disabled close', 'outside dismissal', 'confirmation', 'IME'],
  contract: {
    props: createPropManifestFields(pickerApiContract, {
      value: { type: 'PickerValue', description: { zh: '受控值', en: 'Controlled value' } },
      defaultValue: {
        type: 'PickerValue',
        description: { zh: '非受控初始值', en: 'Initial uncontrolled value' },
      },
      open: { type: 'boolean', description: { zh: '受控面板状态', en: 'Controlled popup state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始面板状态', en: 'Initial popup state' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      loading: { type: 'boolean', description: { zh: '加载中', en: 'Loading' } },
      clearable: { type: 'boolean', description: { zh: '可清空', en: 'Clearable' } },
      trigger: { type: 'PickerTrigger', description: { zh: '触发方式', en: 'Trigger mode' } },
      placement: {
        type: 'PopoverPlacement',
        description: { zh: '面板位置', en: 'Popup placement' },
      },
      distance: { type: 'number', description: { zh: '面板间距', en: 'Popup distance' } },
      skidding: { type: 'number', description: { zh: '面板偏移', en: 'Popup offset' } },
      portal: { type: 'boolean', description: { zh: '使用 Portal', en: 'Uses a portal' } },
      inputable: { type: 'boolean', description: { zh: '可输入', en: 'Editable' } },
      readonly: { type: 'boolean', description: { zh: '只读', en: 'Read-only' } },
      inputVariant: {
        type: 'PickerInputVariant',
        description: { zh: '视觉变体', en: 'Visual variant' },
      },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      placeholder: { type: 'string', description: { zh: '占位文字', en: 'Placeholder' } },
      arrow: { type: 'boolean', description: { zh: '面板箭头', en: 'Popup arrow' } },
      panelStatus: {
        type: 'PickerPanelStatus',
        description: { zh: '面板状态', en: 'Panel status' },
      },
      needConfirm: {
        type: 'boolean',
        description: { zh: '需要确认', en: 'Requires confirmation' },
      },
      confirmText: { type: 'string', description: { zh: '确认文字', en: 'Confirm text' } },
      cancelText: { type: 'string', description: { zh: '取消文字', en: 'Cancel text' } },
      clearText: { type: 'string', description: { zh: '清空文字', en: 'Clear text' } },
      confirmButtonOptions: {
        type: 'unknown',
        description: { zh: '确认按钮参数', en: 'Confirm button options' },
      },
      cancelButtonOptions: {
        type: 'unknown',
        description: { zh: '取消按钮参数', en: 'Cancel button options' },
      },
      confirmDisabled: {
        type: 'boolean',
        description: { zh: '禁用确认', en: 'Disables confirmation' },
      },
      cancelDisabled: {
        type: 'boolean',
        description: { zh: '禁用取消', en: 'Disables cancellation' },
      },
      showConfirmAction: {
        type: 'boolean',
        description: { zh: '显示确认操作', en: 'Shows confirmation' },
      },
      showCancelAction: {
        type: 'boolean',
        description: { zh: '显示取消操作', en: 'Shows cancellation' },
      },
      showClearAction: {
        type: 'boolean',
        description: { zh: '显示清空操作', en: 'Shows clear action' },
      },
      confirmAreaSize: {
        type: 'PickerConfirmAreaSize',
        description: { zh: '确认区尺寸', en: 'Confirmation-area size' },
      },
      destroyOnHide: {
        type: 'boolean',
        description: { zh: '隐藏后销毁', en: 'Unmounts when hidden' },
      },
      inputStatus: {
        type: 'PickerInputStatus',
        description: { zh: '输入状态', en: 'Input status' },
      },
      fitInputWidth: {
        type: 'PickerFitInputWidth',
        description: { zh: '面板宽度策略', en: 'Popup width policy' },
      },
      hoverShowDelay: {
        type: 'number',
        description: { zh: '悬浮显示延迟', en: 'Hover show delay' },
      },
      hoverHideDelay: {
        type: 'number',
        description: { zh: '悬浮隐藏延迟', en: 'Hover hide delay' },
      },
      canOpen: { type: 'boolean', description: { zh: '允许打开', en: 'Can open' } },
    }),
    emits: createManifestFields<PickerEventMap>({
      valueChange: { type: 'PickerValue', description: { zh: '值变化', en: 'Value changed' } },
      openChange: {
        type: '{ open: boolean; reason: PickerOpenReason }',
        description: { zh: '面板状态变化', en: 'Popup state changed' },
      },
      show: { type: 'void', description: { zh: '已显示', en: 'Shown' } },
      hide: { type: 'void', description: { zh: '已隐藏', en: 'Hidden' } },
      focus: { type: 'Event', description: { zh: '获得焦点', en: 'Focused' } },
      blur: { type: 'Event', description: { zh: '失去焦点', en: 'Blurred' } },
      input: { type: 'Event', description: { zh: '输入', en: 'Input' } },
      click: { type: 'Event', description: { zh: '点击', en: 'Clicked' } },
      confirm: { type: 'Event', description: { zh: '确认', en: 'Confirmed' } },
      cancel: { type: 'Event', description: { zh: '取消', en: 'Cancelled' } },
      clear: { type: 'Event', description: { zh: '清空', en: 'Cleared' } },
      keyDown: { type: 'Event', description: { zh: '键盘操作', en: 'Keyboard interaction' } },
    }),
    slots: createManifestFields<PickerRegionMap>({
      content: { type: 'content', description: { zh: '面板内容', en: 'Popup content' } },
      trigger: { type: 'content', description: { zh: '触发器', en: 'Trigger' } },
      prefix: { type: 'content', description: { zh: '触发器前缀', en: 'Trigger prefix' } },
      suffix: { type: 'content', description: { zh: '触发器后缀', en: 'Trigger suffix' } },
      panelHeader: { type: 'content', description: { zh: '面板头部', en: 'Popup header' } },
      panelFooter: { type: 'content', description: { zh: '面板底部', en: 'Popup footer' } },
      empty: { type: 'content', description: { zh: '空状态', en: 'Empty state' } },
      loading: { type: 'content', description: { zh: '加载状态', en: 'Loading state' } },
      actions: { type: 'content', description: { zh: '确认操作区', en: 'Confirmation actions' } },
    }),
    exposes: createManifestFields<PickerCommandMap>({
      focus: { type: '() => void', description: { zh: '聚焦', en: 'Focuses' } },
      blur: { type: '() => void', description: { zh: '失焦', en: 'Blurs' } },
      open: { type: '() => void', description: { zh: '打开', en: 'Opens' } },
      close: { type: '() => void', description: { zh: '关闭', en: 'Closes' } },
      clear: { type: '() => void', description: { zh: '清空', en: 'Clears' } },
      updatePosition: {
        type: '() => void',
        description: { zh: '更新位置', en: 'Updates position' },
      },
    }),
  },
});
