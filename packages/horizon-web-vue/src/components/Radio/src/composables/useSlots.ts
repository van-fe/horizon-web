import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, RadioGroupRegionMap, RadioRegionMap } from '@aurora/core';

type RadioVueSlots = AdaptComponentApiShape<RadioRegionMap, { label: 'default' }>;
type RadioGroupVueSlots = AdaptComponentApiShape<RadioGroupRegionMap, { content: 'default' }>;

export const useRadioSlots = Object as SlotsType<
  Partial<RadioVueSlots> & {
    /**
     * 默认展示的内容
     * @en Custom content for the default slot.
     */
    default?: RadioVueSlots['default'];
  }
>;

export type RadioSlots = typeof useRadioSlots;

export const useRadioGroupSlots = Object as SlotsType<
  Partial<RadioGroupVueSlots> & {
    /**
     * 默认展示的内容
     * @en Custom content for the default slot.
     */
    default?: RadioGroupVueSlots['default'];
  }
>;

export type RadioGroupSlots = typeof useRadioGroupSlots;
