import { useLowCaseNamespace } from './useNamespace';

export function cssVariableKey(...args: string[]) {
  return ['-', useLowCaseNamespace(), ...args].join('-');
}

export function cssVariable(...args: string[]) {
  return `var(${cssVariableKey(...args)})`;
}
