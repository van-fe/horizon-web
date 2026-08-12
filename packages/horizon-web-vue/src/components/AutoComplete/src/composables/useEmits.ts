import type {
  AdaptComponentApiShape,
  AutoCompleteEventMap,
  ComponentEventValidators,
} from '@aurora/core';
import type { ModelValueType } from './useProps';
import { isBoolean, isDefined, isNil, isString } from '@aurora/utils';

type AutoCompleteVueEvents = AdaptComponentApiShape<
  AutoCompleteEventMap<Event, Event>,
  { valueChange: 'update:modelValue'; openChange: 'dropdownVisibleChange' }
>;

export const useAutoCompleteEmits = {
  /**
   * modelValue 变更通知
   * @param value modelValue 值
   * @paramEn value The model value.
   * @en Emitted when modelValue changes.
   */
  'update:modelValue': (value: ModelValueType) => isDefined(value) || isNil(value),
  /**
   * 下拉面板显隐切换时通知
   * @param visible 是否显示
   * @paramEn visible Whether the popup is visible.
   * @en Emitted when popup visibility changes.
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 聚焦时通知
   * @en Emitted when the input receives focus.
   */
  focus: () => true,
  /**
   * 失焦时通知
   * @en Emitted when the input loses focus.
   */
  blur: () => true,
  /**
   * 输入文字时触发
   * @param inputValue 输入文字
   * @paramEn inputValue The search text.
   * @en Emitted when search text changes.
   */
  search: (inputValue: string | null | undefined) => isString(inputValue) || isNil(inputValue),
  /**
   * 选项列表到达底部时触发
   * @param evt 滚动或键盘事件
   * @paramEn evt The scroll or keyboard event.
   * @en Emitted when navigation or scrolling reaches the list end.
   */
  optionListReachBottom: (evt: Event) => evt instanceof Event,
  /** 清空时触发。 @en Emitted when the input is cleared. */
  clear: () => true,
  /**
   * 选中值变化时触发
   * @param value 选中值
   * @paramEn value The selected value.
   * @en Emitted when the selected value changes.
   */
  change: (value: string | null | undefined) => isString(value) || isNil(value),
  /**
   * 选中建议项时触发
   * @param value 选中值
   * @paramEn value The selected value.
   * @en Emitted when a suggestion is selected.
   */
  select: (value: string | null | undefined) => isString(value) || isNil(value),
} satisfies ComponentEventValidators<
  Omit<AutoCompleteVueEvents, 'focus' | 'blur' | 'change' | 'select'> & {
    focus: [];
    blur: [];
    change: [value: ModelValueType];
    select: [value: ModelValueType];
  }
>;

export type AutoCompleteEmits = typeof useAutoCompleteEmits;
