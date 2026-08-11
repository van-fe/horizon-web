export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isObject(value: unknown): value is object {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isDef<T = unknown>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNil(value: unknown): value is undefined | null {
  return isUndefined(value) || value === null;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

export function isPropertyKey(value: unknown): value is PropertyKey {
  return isNumber(value) || isString(value) || isSymbol(value);
}

export function isDefined<T>(value: T): value is Exclude<T, undefined | null> {
  return value !== undefined && value !== null;
}

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

export function isSet(value: unknown): value is Set<unknown> {
  return Object.prototype.toString.call(value) === '[object Set]';
}
