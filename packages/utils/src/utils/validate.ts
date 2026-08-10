import type { VNodeNormalizedChildren } from 'vue';
import { isObject } from '@aurora/core';

export {
  isBigInt,
  isBoolean,
  isDate,
  isDef,
  isDefined,
  isFunction,
  isMap,
  isNil,
  isNull,
  isNumber,
  isObject,
  isPropertyKey,
  isSet,
  isString,
  isSymbol,
  isUndefined,
} from '@aurora/core';

export function isFile(val: unknown): val is File {
  return Object.prototype.toString.call(val) === '[object File]';
}

export function isBlob(val: unknown): val is Blob {
  return Object.prototype.toString.call(val) === '[object Blob]';
}

export function isFileList(val: unknown): val is FileList {
  return Object.prototype.toString.call(val) === '[object FileList]';
}

export function isRawSlotsForVNodeNormalizedChildren(
  val: VNodeNormalizedChildren,
): val is Record<string, Function> {
  return isObject(val) && !Array.isArray(val);
}
