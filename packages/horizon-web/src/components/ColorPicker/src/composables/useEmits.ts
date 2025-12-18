import { isString } from '@aurora/shared';

export const useColorPickerEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: string) => isString(value),
  /**
   * 当 model-value 变化时触发
   * @param value 颜色值，格式由 format 指定
   */
  change: (value: string) => isString(value),
  /**
   * 当面板中颜色时刻变化时触发
   * @param value 颜色值，格式由 format 指定
   */
  activeChange: (value: string) => isString(value),
  /**
   * 失焦时触发
   */
  blur: () => true,
  /**
   * 当 currentEditMode 改变时触发
   * @param value 编辑色值类型
   * @version 2.10.0
   */
  'update:editMode': (value: 'hex' | 'rgb' | 'hsl' | 'hsv') => isString(value),
};

export type ColorPickerEmits = typeof useColorPickerEmits;
