import type {
  AdaptComponentApiShape,
  ChoiceValue,
  ComponentEventValidators,
  RadioEventMap,
} from '@aurora/core';
import { isChoiceValue } from '@aurora/core';

type RadioVueEventMap = AdaptComponentApiShape<
  RadioEventMap<FocusEvent>,
  {},
  never,
  { 'update:modelValue': [value: ChoiceValue] }
>;

export const useRadioEmits = {
  /**
   * 绑定值变化时触发的事件
   * @param value 选中的 value 值
   * @paramEn value The value value.
   * @en Emitted when change changes.
   */
  change: (value: ChoiceValue) => isChoiceValue(value),
  /**
   *  更新 `modelValue`
   * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: ChoiceValue) => isChoiceValue(value),
  /**
   * 失焦时触发
   * @param evt 失焦事件
   * @paramEn evt The evt value.
   * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
} satisfies ComponentEventValidators<RadioVueEventMap>;

export type RadioEmits = typeof useRadioEmits;
