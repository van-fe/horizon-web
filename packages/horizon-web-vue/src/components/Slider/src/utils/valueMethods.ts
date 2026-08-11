import type { SliderProps } from '../composables/useProps';
import { correctSliderValue, getPrecision, normalizeSliderValue } from '@aurora/core';

export function transformValue(
  oldValue: SliderProps['modelValue'],
  props: Pick<SliderProps, 'range' | 'min' | 'max' | 'step'>,
): [number, number] {
  const { first, second } = normalizeSliderValue(
    oldValue,
    props.range,
    props.min,
    props.max,
    props.step,
    false,
  );
  return [first, second];
}

export function getStepPrecision(step: number): number {
  return getPrecision(step);
}

export function getCorrectedValue(
  value: number,
  props: Pick<SliderProps, 'min' | 'max' | 'step'>,
  enableCorrect = false,
): number {
  return correctSliderValue(value, props.min, props.max, props.step, enableCorrect);
}
