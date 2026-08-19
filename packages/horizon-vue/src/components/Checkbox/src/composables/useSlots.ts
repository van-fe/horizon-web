import type { SlotsType } from 'vue';
import type {
  AdaptComponentApiShape,
  CheckboxGroupRegionMap,
  CheckboxRegionMap,
} from '@aurora/core';

type CheckboxVueSlots = AdaptComponentApiShape<CheckboxRegionMap, { label: 'default' }>;
type CheckboxGroupVueSlots = AdaptComponentApiShape<CheckboxGroupRegionMap, { content: 'default' }>;

export const useCheckboxSlots = Object as SlotsType<
  Partial<CheckboxVueSlots> & {
    /**
     * 默认展示的内容
     * @en Custom content for the default slot.
     */
    default?: CheckboxVueSlots['default'];
  }
>;

export type CheckboxSlots = typeof useCheckboxSlots;

export const useCheckboxButtonSlots = Object as SlotsType<
  Partial<CheckboxVueSlots> & {
    /**
     * 默认展示的内容
     * @en Custom content for the default slot.
     */
    default?: CheckboxVueSlots['default'];
  }
>;

export type CheckboxButtonSlots = typeof useCheckboxButtonSlots;

export const useCheckboxGroupSlots = Object as SlotsType<
  Partial<CheckboxGroupVueSlots> & {
    /**
     * 默认展示的内容
     * @en Custom content for the default slot.
     */
    default?: CheckboxGroupVueSlots['default'];
  }
>;

export type CheckboxGroupSlots = typeof useCheckboxGroupSlots;
