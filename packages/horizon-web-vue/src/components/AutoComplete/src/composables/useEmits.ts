import type { ModelValueType } from './useProps';
import { isBoolean, isDefined, isNil, isString } from '@aurora/utils';

export const useAutoCompleteEmits = {
  /**
   * modelValue 变更通知
   * @param value modelValue值
   * @paramEn value The value value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: ModelValueType) => isDefined(value) || isNil(value),
  /**
   * 下拉面板显隐切换时通知
   * @param visible 是否显示
   * @paramEn visible The visible value.
    * @en Emitted when dropdown visible change changes.
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 聚焦时通知
    * @en Emitted when focus changes.
   */
  focus: () => true,
  /**
   * 失焦时通知
    * @en Emitted when blur changes.
   */
  blur: () => true,
  /**
   * 输入文字时触发
   * @param inputValue 输入的文字
   * @paramEn inputValue The input value value.
    * @en Emitted when search changes.
   */
  search: (inputValue: string | null | undefined) => isString(inputValue) || isNil(inputValue),
  /**
   * 在 `option` 列表滚动到底部时触发，可以做动态载入选项的回调
   * @param evt 滚动事件或者键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when option list reach bottom changes.
   */
  optionListReachBottom: (evt: Event) => evt instanceof Event,
  /**
   * 清空时触发
    * @en Emitted when clear changes.
   */
  clear: () => true,
  /**
   * 选中选项更改时触发
   * @param value 选项值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: string | null | undefined) => isString(value) || isNil(value),
  /**
   * 选中选项时触发
   * @param value 选项值
   * @paramEn value The value value.
    * @en Emitted when select changes.
   */
  select: (value: string | null | undefined) => isString(value) || isNil(value),
};

export type AutoCompleteEmits = typeof useAutoCompleteEmits;
