import type { Arrayable } from './types';

export function arrayableToArray<T>(maybeArray: Arrayable<T>): Array<T> {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
