import type ColorPickerColor from '~/components/ColorPicker/src/utils/ColorPickerColor';
import { isObject } from '@nio-fe/shared';

export const useColorPickerSlots = {
  /**
   * 自定义触发 `popover` 的元素
   * @param color 当前颜色
   */
  trigger: (color: ColorPickerColor) => isObject(color),
  /**
   * 在 `triggerType = 'square'` 后，自定义文字内容
   * @param color 当前颜色
   * @version 2.3.0
   */
  squareText: (color: ColorPickerColor) => isObject(color),
};

export type ColorPickerSlots = typeof useColorPickerSlots;
