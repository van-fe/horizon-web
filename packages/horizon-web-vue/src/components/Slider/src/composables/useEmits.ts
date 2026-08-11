import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  SliderEventMap,
} from '@aurora/core';
import { isSliderNumber, isSliderValue } from '@aurora/core';

type SliderVueValue = number | [number, number];

type SliderVueEventMap = AdaptComponentApiShape<
  SliderEventMap<FocusEvent>,
  {},
  'change',
  { 'update:modelValue': [value: SliderVueValue] }
>;

export const useSliderEmits = {
  /** 值更新时触发。@en Emitted when the bound value changes. */
  'update:modelValue': (value: SliderVueValue) => isSliderValue(value),
  /** 聚焦时触发。@en Emitted when a thumb receives focus. */
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  /** 失焦时触发。@en Emitted when a thumb loses focus. */
  blur: (event: FocusEvent) => event instanceof FocusEvent,
} satisfies ComponentEventValidators<SliderVueEventMap>;

/** @invisible */
export const useSliderCursorEmits = {
  'update:modelValue': (value: number) => isSliderNumber(value),
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
};

export type SliderEmits = typeof useSliderEmits;
export type SliderCursorEmits = typeof useSliderCursorEmits;
