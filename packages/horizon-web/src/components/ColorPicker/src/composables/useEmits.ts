import { isString } from '@aurora/utils';

export const useColorPickerEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: string) => isString(value),
  /**
   * 当 model-value 变化时触发
   * @param value 颜色值，格式由 format 指定
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: string) => isString(value),
  /**
   * 当面板中颜色时刻变化时触发
   * @param value 颜色值，格式由 format 指定
   * @paramEn value The value value.
    * @en Emitted when active change changes.
   */
  activeChange: (value: string) => isString(value),
  /**
   * 失焦时触发
    * @en Emitted when blur changes.
   */
  blur: () => true,
  /**
   * 当 currentEditMode 改变时触发
   * @param value 编辑色值类型
   * @paramEn value The value value.
    * @en Emitted when update:edit mode changes.
   */
  'update:editMode': (value: 'hex' | 'rgb' | 'hsl' | 'hsv') => isString(value),
};

export type ColorPickerEmits = typeof useColorPickerEmits;
