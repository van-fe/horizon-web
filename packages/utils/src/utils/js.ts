// import type { PropOptions, WithDeprecatedPropsTyped } from './tsHelper';
import isRegExp from 'lodash/isRegExp';
import type { PropsTyped } from './tsHelper';
// import { isDefined } from './validate';

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

declare module '@vue/runtime-core' {
  interface PropOptions {
    deprecated?: boolean | string;
  }
}

// export function declarePropType<T extends WithDeprecatedPropsTyped, Key extends keyof T = keyof T>(
//   val: T,
//   plugin?: string,
// ): { [K in Key]: Omit<T[Key], 'deprecated'> } {
//   Object.keys(val).forEach(key => {
//     const curr = val[key];
//     if (!Array.isArray(curr) && typeof curr === 'object' && curr.deprecated !== undefined) {
//       curr.validator = (value: unknown): boolean => {
//         if (isDefined(value)) {
//           // type = Boolean, the default value is false. Whether set value to it or not.
//           if (curr.type === Boolean && value === false) {
//             return true;
//           }
//
//           console.warn(
//             `${plugin} prop (${key}) is deprecated.${
//               curr.deprecated !== false ? ` Please use ${curr.deprecated}` : ''
//             }`,
//           );
//           return false;
//         }
//
//         return true;
//       };
//     }
//   });
//
//   return val;
// }

export function declarePropType<T extends PropsTyped>(val: T): T {
  return val;
}
