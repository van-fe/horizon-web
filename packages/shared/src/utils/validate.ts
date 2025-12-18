import type { VNodeNormalizedChildren } from 'vue';

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}

export function isObject(val: unknown): val is object {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export function isDef<T = any>(val: T | undefined): val is T {
  return typeof val !== 'undefined';
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isNil(val: unknown): val is undefined | null {
  return isUndefined(val) || val === null;
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined;
}

export function isDate(val: unknown): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]';
}

export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol';
}

export function isPropertyKey(key: unknown): key is symbol | number | string {
  return isNumber(key) || isString(key) || isSymbol(key);
}

export function isDefined<T>(val: T): val is Exclude<T, undefined | null> {
  return val !== undefined && val !== null;
}

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

export function isSet(value: unknown): value is Set<unknown> {
  return Object.prototype.toString.call(value) === '[object Set]';
}

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
