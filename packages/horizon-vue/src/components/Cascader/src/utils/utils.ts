import { looselyEqualCascaderValues } from '@aurora/core';
import type { ModelValueType } from './types';

/**
 * whether the two values are equal in loose mode
 * if the two values are in undefined / null / [], then judge them are equal
 */
export function isEqualLoose(value1: ModelValueType, value2: ModelValueType): boolean {
  return looselyEqualCascaderValues(value1, value2);
}
