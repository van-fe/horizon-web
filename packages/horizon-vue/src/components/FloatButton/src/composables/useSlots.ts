import type {
  AdaptComponentApiShape,
  FloatButtonGroupRegionMap,
  FloatButtonRegionMap,
} from '@aurora/core';
import type { SlotsType } from 'vue';

type FloatButtonVueSlots = AdaptComponentApiShape<FloatButtonRegionMap>;
type FloatButtonGroupVueSlots = AdaptComponentApiShape<
  FloatButtonGroupRegionMap,
  { content: 'default' }
>;

export const useFloatButtonSlots = Object as SlotsType<{
  /** 图标。 @en Icon content. */
  icon?: FloatButtonVueSlots['icon'];
  /** 描述文字。 @en Description content. */
  description?: FloatButtonVueSlots['description'];
}>;

export const useFloatButtonGroupSlots = Object as SlotsType<{
  /** 组内悬浮按钮。 @en Floating actions in the group. */
  default?: FloatButtonGroupVueSlots['default'];
}>;

export type FloatButtonSlots = typeof useFloatButtonSlots;
export type FloatButtonGroupSlots = typeof useFloatButtonGroupSlots;
