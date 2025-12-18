import { useSessionStorage } from '@vueuse/core';
import { useLowCaseNamespace } from './useNamespace';
import { version } from '../version.json';

const versionPrefix = version.split('.').slice(0, 2).join('-');

let cssVariableUseVersion = useSessionStorage(`${versionPrefix}-css-variable-use-version`, false);

export function setCssVariableUseVersion(whetherUseVersion: boolean, storedKey?: string) {
  if (storedKey) {
    cssVariableUseVersion = useSessionStorage(storedKey, false);
  }

  cssVariableUseVersion.value = whetherUseVersion;
}

export function cssVariableKey(...args: string[]) {
  const res = ['-', useLowCaseNamespace()];

  if (cssVariableUseVersion.value) {
    res.push(versionPrefix);
  }

  return res.concat(args).join('-');
}

export function cssVariable(...args: string[]) {
  return `var(${cssVariableKey(...args)})`;
}
