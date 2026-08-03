import isRegExp from 'lodash/isRegExp';
import type { PropsTyped } from './tsHelper';

/**
 *
 */
export function throttle(callback: () => void, limit = 300): () => void {
  let wait = false;
  return function Func(this: any) {
    if (!wait) {
      callback.call(this);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

/**
 *
 */
export function pickFromObject(obj: Record<string, any>, keys: (string | RegExp)[]): Object {
  const result: any = {};
  keys.forEach(key => {
    if (isRegExp(key)) {
      Object.keys(obj)
        .filter(curr => key.test(curr))
        .forEach(curr => {
          result[curr] = obj[curr];
        });
    } else {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = obj[key];
      }
    }
  });
  return result;
}

export function getBooleanProp(prop: unknown): boolean {
  if (prop === '') {
    return true;
  }
  return Boolean(prop);
}

export function declarePropType<T extends PropsTyped>(val: T): T {
  return val;
}
