import type {
  AdaptComponentApiShape,
  CheckboxEventMap,
  ChoiceValue,
  ComponentEventValidators,
} from '@aurora/core';
import { isCheckboxValue } from '@aurora/core';

type CheckboxVueValue = ChoiceValue | ChoiceValue[];

type CheckboxVueEventMap = AdaptComponentApiShape<
  CheckboxEventMap<FocusEvent, MouseEvent>,
  {},
  'change',
  {
    change: [value: CheckboxVueValue];
    'update:modelValue': [value: CheckboxVueValue];
  }
>;

export const useCheckboxEmits = {
  /**
   * 绑定值变化时触发的事件
   * @param value 复选框的值
   * @paramEn value The value value.
   * @en Emitted when change changes.
   */
  change: (value: CheckboxVueValue) => isCheckboxValue(value),
  /**
   *  更新 `modelValue`
   * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: CheckboxVueValue) => isCheckboxValue(value),
  /**
   * 当失焦时触发
   * @param evt 失焦事件
   * @paramEn evt The evt value.
   * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 点击事件
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
   * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
} satisfies ComponentEventValidators<CheckboxVueEventMap>;

export type CheckboxEmits = typeof useCheckboxEmits;
