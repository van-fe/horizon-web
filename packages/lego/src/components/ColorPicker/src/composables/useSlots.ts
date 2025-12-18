import type { SlotsType } from 'vue';
import type ColorPickerColor from '~/components/ColorPicker/src/utils/ColorPickerColor';

export const useColorPickerSlots = Object as SlotsType<{
  /**
   * 自定义触发 `popover` 的元素
   * @param color 当前颜色
   */
  trigger?: ColorPickerColor;
  /**
   * 在 `triggerType = 'square'` 后，自定义文字内容
   * @param color 当前颜色
   * @version 2.3.0
   */
  squareText?: ColorPickerColor;
}>;

export type ColorPickerSlots = typeof useColorPickerSlots;
