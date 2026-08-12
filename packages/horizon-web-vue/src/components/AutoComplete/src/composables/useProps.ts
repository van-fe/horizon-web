import type {
  AdaptComponentApiShape,
  AutoCompleteCommonProps,
  AutoCompleteOption,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import {
  AUTO_COMPLETE_DEFAULTS,
  isAutoCompleteDelay,
  isAutoCompleteDescriptionPosition,
  isAutoCompleteFitInputWidth,
  isAutoCompleteListHeight,
  isAutoCompleteTrigger,
  isInputVariant,
  isPopoverPlacement,
} from '@aurora/core';
import type { CSSProperties, ExtractPropTypes, PropType, StyleValue, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType } from '~/utils/useIcon';
import type { PickerInputStatusType } from '~/components/Picker/src/composables/useProps';

export type ModelValueType = string | undefined | null;
export type HAutoCompleteOption = AutoCompleteOption<string | VNode>;

type AutoCompleteVueProps = AdaptComponentApiShape<
  AutoCompleteCommonProps<string | VNode>,
  { value: 'modelValue'; inputVariant: 'inputStyle'; portal: 'toBody' },
  'defaultValue' | 'open' | 'defaultOpen',
  {
    emptyText?: string | VNode;
    popoverOptions?: Partial<PopoverProps>;
    dropdownIcon?: unknown | false;
    externalStyle?: StyleValue;
    externalClass?: string;
    externalPanelStyle?: CSSProperties;
    externalPanelClass?: string;
    loadingText?: string | VNode;
    inputStatus?: PickerInputStatusType;
    searchIcon?: unknown | false;
  }
>;

export const useAutoCompleteProps = declarePropType({
  /** 输入值。 @en Input value. */
  modelValue: {
    type: [String, Object] as PropType<ModelValueType>,
    default: undefined,
  },
  /** 是否禁用。 @en Whether interaction is disabled. */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否允许清空。 @en Whether the input can be cleared. */
  clearable: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.clearable,
  },
  /** 面板触发方式。 @en Popup trigger mode. */
  trigger: {
    type: String as PropType<AutoCompleteVueProps['trigger']>,
    default: AUTO_COMPLETE_DEFAULTS.trigger,
    validator: isAutoCompleteTrigger,
  },
  /** 面板位置。 @en Popup placement. */
  placement: {
    type: String as PropType<AutoCompleteVueProps['placement']>,
    default: AUTO_COMPLETE_DEFAULTS.placement,
    validator: isPopoverPlacement,
  },
  /** 是否将面板传送到 body。 @en Whether the popup is teleported to body. */
  toBody: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.portal,
  },
  /** 输入框视觉变体。 @en Input visual variant. */
  inputStyle: {
    type: String as PropType<AutoCompleteVueProps['inputStyle']>,
    default: AUTO_COMPLETE_DEFAULTS.inputVariant,
    validator: isInputVariant,
  },
  /** 输入框尺寸。 @en Input size. */
  size: {
    type: String as PropType<AutoCompleteVueProps['size']>,
  },
  /** 占位文字。 @en Placeholder text. */
  placeholder: String,
  /** 空状态内容。 @en Empty-state content. */
  emptyText: [String, Object] as PropType<string | VNode>,
  /** 隐藏后销毁面板。 @en Unmounts the popup after it closes. */
  destroyOnHide: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.destroyOnHide,
  },
  /** Popover 扩展参数。 @en Additional Popover options. */
  popoverOptions: Object as PropType<Partial<PopoverProps>>,
  /** 面板宽度策略。 @en Popup width policy. */
  fitInputWidth: {
    type: [Boolean, String] as PropType<AutoCompleteVueProps['fitInputWidth']>,
    default: AUTO_COMPLETE_DEFAULTS.fitInputWidth,
    validator: isAutoCompleteFitInputWidth,
  },
  /** hover 打开延迟。 @en Hover open delay in milliseconds. */
  hoverShowDelay: {
    type: Number,
    default: AUTO_COMPLETE_DEFAULTS.hoverShowDelay,
    validator: isAutoCompleteDelay,
  },
  /** hover 关闭延迟。 @en Hover close delay in milliseconds. */
  hoverHideDelay: {
    type: Number,
    default: AUTO_COMPLETE_DEFAULTS.hoverHideDelay,
    validator: isAutoCompleteDelay,
  },
  /** 下拉图标。 @en Dropdown icon. */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /** 根元素样式。 @en Root style. */
  externalStyle: [String, Object, Array] as PropType<StyleValue>,
  /** 根元素 class。 @en Root class name. */
  externalClass: {
    type: String,
    default: '',
  },
  /** 面板样式。 @en Popup style. */
  externalPanelStyle: Object as PropType<CSSProperties>,
  /** 面板 class。 @en Popup class name. */
  externalPanelClass: String,
  /** 空列表时隐藏面板。 @en Prevents opening for an empty option list. */
  hidePanelWhenEmptyList: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.hidePanelWhenEmptyList,
  },
  /** 加载状态。 @en Whether suggestions are loading. */
  loading: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.loading,
  },
  /** 加载状态内容。 @en Loading-state content. */
  loadingText: [String, Object] as PropType<string | VNode>,
  /** 打开时将当前选项置顶。 @en Moves the selected suggestion to the front while open. */
  selectedOptionOrderToTop: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.selectedOptionOrderToTop,
  },
  /** 输入框状态。 @en Input status. */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /** 列表最大高度。 @en Maximum suggestion-list height. */
  optionListMaxHeight: {
    type: [String, Number],
    default: AUTO_COMPLETE_DEFAULTS.optionListMaxHeight,
    validator: isAutoCompleteListHeight,
  },
  /** 说明文字位置。 @en Description placement. */
  descriptionPosition: {
    type: String as PropType<AutoCompleteVueProps['descriptionPosition']>,
    default: AUTO_COMPLETE_DEFAULTS.descriptionPosition,
    validator: isAutoCompleteDescriptionPosition,
  },
  /** 输入与搜索通知的防抖时间。 @en Debounce for value and search notifications. */
  inputEmitFrequency: {
    type: Number,
    default: AUTO_COMPLETE_DEFAULTS.inputEmitFrequency,
    validator: isAutoCompleteDelay,
  },
  /** 搜索图标。 @en Search icon. */
  searchIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /** Tooltip 打开延迟。 @en Tooltip open delay. */
  tooltipShowAfter: {
    type: Number,
    default: AUTO_COMPLETE_DEFAULTS.tooltipShowAfter,
    validator: isAutoCompleteDelay,
  },
  /** Tooltip 关闭延迟。 @en Tooltip close delay. */
  tooltipHideAfter: {
    type: Number,
    default: AUTO_COMPLETE_DEFAULTS.tooltipHideAfter,
    validator: isAutoCompleteDelay,
  },
  /** 建议项。 @en Suggestion options. */
  options: {
    type: Array as PropType<HAutoCompleteOption[]>,
    default: () => [],
  },
  /** 允许内容撑开列表。 @en Allows content to expand the suggestion list. */
  expandPanelByChildren: {
    type: Boolean,
    default: AUTO_COMPLETE_DEFAULTS.expandPanelByChildren,
  },
} satisfies ComponentRendererPropDefinitions<AutoCompleteVueProps>);

export type AutoCompleteProps = ExtractPropTypes<typeof useAutoCompleteProps>;
