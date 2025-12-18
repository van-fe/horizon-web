import type { Arrayable } from '../utils';

export function arrayableToArray<T>(maybeArray: Arrayable<T>): Array<T> {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
