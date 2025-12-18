import type { SliderProps } from '../composables/useProps';
import { getPrecision, remainderValue, subValue } from '@aurora/shared';
import round from 'lodash/round';
import { clamp } from '@vueuse/core';

export function transformValue(
  oldValue: number | [number, number],
  props: SliderProps,
): [number, number] {
  let result = [];

  if (!props.range) {
    if (Array.isArray(oldValue)) {
      result = oldValue.length > 0 ? [oldValue[0], 0] : [props.min, 0];
    } else {
      result = [oldValue, 0];
    }
  } else {
    if (Array.isArray(oldValue)) {
      result = oldValue.length === 2 ? oldValue : [oldValue[0], props.max];
    } else {
      result = [oldValue, props.max];
    }
  }

  result[0] = clamp(result[0], props.min, props.max);
  result[1] = clamp(result[1], props.min, props.max);

  return result as [number, number];
}

export function getStepPrecision(step: number) {
  return getPrecision(step);
}

export function getCorrectedValue(val: number, props: SliderProps, enableCorrect = false) {
  let distanceOfStep = remainderValue(subValue(val, props.min), props.step);

  if (enableCorrect) {
    if (distanceOfStep > props.step / 2) {
      distanceOfStep += -props.step;
    }
  }

  return Math.min(
    Math.max(round(val - distanceOfStep, getStepPrecision(props.step)), props.min),
    props.max,
  );
}
