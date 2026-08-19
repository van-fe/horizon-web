import type { SlotsType } from 'vue';
import type ColorPickerColor from '~/components/ColorPicker/src/utils/ColorPickerColor';

export const useColorPickerSlots = Object as SlotsType<{
  /**
   * 自定义触发 `popover` 的元素
   * @param color 当前颜色
   * @paramEn color The color value.
    * @en Custom content for the trigger slot.
   */
  trigger?: ColorPickerColor;
  /**
   * 在 `triggerType = 'square'` 后，自定义文字内容
   * @param color 当前颜色
   * @paramEn color The color value.
    * @en Custom content for the square text slot.
   */
  squareText?: ColorPickerColor;
}>;

export type ColorPickerSlots = typeof useColorPickerSlots;
