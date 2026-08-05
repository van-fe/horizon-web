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

/**
 * 为格式化值附加不可枚举的原始选项值，避免修改 `valueFormat` 的返回对象。
 */
export function wrapValueFormattedValue(
  formattedValue: ModelValueFormattedType & Record<string, unknown>,
  optionValue: OptionProps['value'],
): Required<ModelValueFormattedType> & Record<string, unknown> {
  const wrappedValue = (
    Array.isArray(formattedValue) ? [...formattedValue] : { ...formattedValue }
  ) as Required<ModelValueFormattedType> & Record<string, unknown>;

  Object.defineProperty(wrappedValue, HSelectValueFormatSymbol, {
    configurable: true,
    value: optionValue,
  });

  return wrappedValue;
}

/**
 * 比较模型值与选项。优先使用规范原始值，其次比较 `valueFormat` 结果，最后兼容旧的
 * `{ value }` 格式化值。
 */
export function isModelValueMatchingOption(
  modelValue: ModelValueSingleType,
  optionValue: OptionProps['value'],
  formattedOptionValue?: { value: ModelValueFormattedType & Record<string, unknown> },
) {
  const unwrappedValue = unwrapValueFormattedValue(modelValue);

  if (isEqualIgnoreCtx(unwrappedValue, optionValue)) {
    return true;
  }

  if (
    formattedOptionValue &&
    isEqualIgnoreCtx(removeValueFormatMetadata(modelValue), formattedOptionValue.value)
  ) {
    return true;
  }

  return isObject(unwrappedValue) && 'value' in unwrappedValue
    ? isEqualIgnoreCtx(unwrappedValue.value, optionValue)
    : false;
}

/**
 * 移除格式化值上的内部元数据，仅保留向用户公开的数据结构。
 */
export function removeValueFormatMetadata<T>(value: T): T {
  if (!isValueFormatWrapped(value)) return value;

  const publicValue = (Array.isArray(value) ? [...value] : { ...value }) as T &
    ModelValueFormattedType;

  delete publicValue[HSelectValueFormatSymbol];

  return publicValue;
}

export function isOptionChecked(
  modelValue: Set<ModelValueSingleType>,
  optionValue: OptionProps['value'],
  getFormattedOptionValue?: () => ModelValueFormattedType & Record<string, unknown>,
) {
  const values = Array.from(modelValue.values());

  if (
    modelValue.has(optionValue) ||
    values.some(curr => isEqualIgnoreCtx(unwrapValueFormattedValue(curr), optionValue))
  ) {
    return true;
  }

  const shouldCompareFormattedValue = values.some(
    curr => isObject(curr) && !isValueFormatWrapped(curr),
  );
  const formattedOptionValue = shouldCompareFormattedValue
    ? getFormattedOptionValue?.()
    : undefined;

  return values.some(curr =>
    isModelValueMatchingOption(
      curr,
      optionValue,
      formattedOptionValue ? { value: formattedOptionValue } : undefined,
    ),
  );
}
