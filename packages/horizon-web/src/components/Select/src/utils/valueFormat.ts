import type { OptionProps } from '../composables/useProps';
import { isObject } from '@aurora/utils';
import isEqual from 'lodash/isEqual';
import type { ModelValueSingleType, ModelValueFormattedType } from './types';
import { HSelectValueFormatSymbol } from './types';

export type ObjectWithCtx = Record<string & '_ctx', unknown>;
export type ObjectWithoutCtx = Omit<ObjectWithCtx, '_ctx'>;

export function isEqualIgnoreCtx(val1: unknown, val2: unknown) {
  if (val1 === val2) return true;
  return isEqual(removeObjectCtx(val1), removeObjectCtx(val2));
}

export function isValueFormatWrapped(val: unknown): val is Required<ModelValueFormattedType> {
  return isObject(val) && HSelectValueFormatSymbol in val;
}

export function isValueHasCtx(val: unknown): val is ObjectWithCtx {
  return isObject(val) && '_ctx' in val;
}

export function removeObjectCtx<T = any>(
  val: T,
): T extends object ? ObjectWithoutCtx : Exclude<any, object> {
  if (!isValueHasCtx(val)) return val as Exclude<any, object> | ObjectWithoutCtx;

  const shallowCopyVal = Object.assign({}, val);

  delete shallowCopyVal['_ctx'];

  return shallowCopyVal;
}

export function unwrapValueFormattedValue(val: ModelValueSingleType | undefined | null) {
  if (isValueFormatWrapped(val)) {
    return val[HSelectValueFormatSymbol];
  } else {
    return val;
  }
}

export function isOptionChecked(
  modelValue: Set<ModelValueSingleType>,
  optionValue: OptionProps['value'],
) {
  if (modelValue.has(optionValue)) {
    return true;
  } else {
    return Array.from(modelValue.values()).some(curr => {
      const unwrapValue = unwrapValueFormattedValue(curr);

      return !isObject(unwrapValue)
        ? isEqualIgnoreCtx(unwrapValue, optionValue)
        : isEqualIgnoreCtx(unwrapValue, optionValue) ||
            ('value' in unwrapValue ? isEqualIgnoreCtx(unwrapValue?.value, optionValue) : false);
    });
  }
}
