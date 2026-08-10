import { useLowCaseNamespace } from './namespace';

export type ThemeTokenValue = string | number;
export type ThemeTokenTree = {
  readonly [key: string]: ThemeTokenValue | ThemeTokenTree;
};

export function defineThemeTokens<const Tokens extends ThemeTokenTree>(tokens: Tokens): Tokens {
  return tokens;
}

export function flattenThemeTokens(
  tokens: ThemeTokenTree,
  prefix: string[] = [],
  result: Record<string, ThemeTokenValue> = {},
): Record<string, ThemeTokenValue> {
  Object.entries(tokens).forEach(([key, value]) => {
    const path = [...prefix, key];
    if (typeof value === 'object') flattenThemeTokens(value, path, result);
    else result[path.join('-')] = value;
  });

  return result;
}

export function createCssVariableMap(
  tokens: ThemeTokenTree,
  namespace = useLowCaseNamespace(),
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(flattenThemeTokens(tokens)).map(([key, value]) => [
      `--${namespace}-${key}`,
      String(value),
    ]),
  );
}
