import type { AdaptComponentApiShape, ButtonGroupRegionMap, ButtonRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';

type ButtonVueSlots = AdaptComponentApiShape<ButtonRegionMap, { content: 'default' }>;
type ButtonGroupVueSlots = AdaptComponentApiShape<ButtonGroupRegionMap, { content: 'default' }>;

export const useButtonSlots = Object as SlotsType<{
  /**
   * 默认文字插槽
   * @en Custom content for the default slot.
   */
  default?: ButtonVueSlots['default'];
  /**
   * `icon` 插槽
   * @en Custom content for the icon slot.
   */
  icon?: ButtonVueSlots['icon'];
  /**
   * 后缀插槽
   * @en Custom content for the suffix slot.
   */
  suffix?: ButtonVueSlots['suffix'];
}>;

export const useButtonGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽，用来放置 `h-button`
   * @en Custom content for the default slot.
   */
  default?: ButtonGroupVueSlots['default'];
}>;

export type ButtonSlots = typeof useButtonSlots;
export type ButtonGroupSlots = typeof useButtonGroupSlots;
