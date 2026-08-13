import type { CascaderItemProps } from '../composables/useProps';
import { looselyEqualCascaderValues } from '@aurora/core';
import { isObject } from '@aurora/utils';

export type ObjectWithCtx = Record<string & '_ctx', unknown>;
export type ObjectWithoutCtx = Omit<ObjectWithCtx, '_ctx'>;

export function isEqualIgnoreCtx(val1: unknown, val2: unknown) {
  return looselyEqualCascaderValues(removeObjectCtx(val1), removeObjectCtx(val2));
}

export function isValueHasCtx(val: unknown): val is ObjectWithCtx {
  return isObject(val) && Object.hasOwn(val, '_ctx');
}

export function removeObjectCtx<T = any>(
  val: T,
): T extends object ? ObjectWithoutCtx : Exclude<any, object> {
  if (!isValueHasCtx(val)) return val as Exclude<any, object> | ObjectWithoutCtx;

  const shallowCopyVal = Object.assign({}, val);

  delete shallowCopyVal['_ctx'];

  return shallowCopyVal;
}

export function isOptionChecked(modelValue: Set<any>, optionValue: CascaderItemProps['value']) {
  return modelValue.has(optionValue);
}
