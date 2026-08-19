import type { Slot, SlotsType } from 'vue';
import type { AdaptComponentApiShape, InputRegionMap } from '@aurora/core';

type InputVueSlots = AdaptComponentApiShape<InputRegionMap>;

export const useInputSlots = Object as SlotsType<{
  [Name in keyof InputVueSlots]?: Slot;
}>;

export type InputSlots = typeof useInputSlots;
