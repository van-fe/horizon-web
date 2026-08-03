import isArrayLike from 'lodash/isArrayLike';
import { isBoolean, isMap, isNumber, isObject, isSet } from '@aurora/utils';
import isEqual from 'lodash/isEqual';
import type { ModelValueType } from '../composables/useProps';

export function isEmpty(value: unknown) {
  if (value == null) return true;

  if (typeof value === 'string') {
    return false;
  }

  if (isArrayLike(value) && (Array.isArray(value) || typeof value === 'string')) {
    return !value.length;
  }

  if (isNumber(value)) {
    return false;
  }

  if (isObject(value)) {
    return false;
  }

  if (isMap(value) || isSet(value)) {
    return !value.size;
  }

  if (isBoolean(value)) {
    return false;
  }

  return true;
}

/**
 * whether the two values are equal in loose mode
 * if the two values are in undefined / null / [], then judge them are equal
 */
export function isEqualLoose(value1: ModelValueType, value2: ModelValueType): boolean {
  if (isEmpty(value1) && isEmpty(value2)) return true;

  return isEqual(value1, value2);
}
