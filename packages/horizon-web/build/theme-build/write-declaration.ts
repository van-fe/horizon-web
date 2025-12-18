import { snakeCase } from '@aurora/shared';
import { styleRoot } from '@aurora/shared/plugins';
import * as fs from 'fs';
import { resolve } from 'path';

export default function (
  sumVariables: Record<string, string>,
  variablesParted: Record<string, Record<string, string>>,
) {
  const results: Record<string, Record<string, string>> = {};
  const sumResults: Record<string, string> = {};
  const mapping: Record<string, string> = {};

  Object.entries(variablesParted).forEach(([name, value]) => {
    results[snakeCase(name)] = Object.fromEntries(
      Object.entries(value).map(([key, value]) => [snakeCase(key.replace(/^--n-/, '')), value]),
    );
  });

  Object.entries(sumVariables).forEach(([key, value]) => {
    sumResults[snakeCase(key.replace(/^--n-/, ''))] = value;
    mapping[snakeCase(key.replace(/^--n-/, ''))] = key;
  });

  try {
    fs.rmdirSync(resolve(styleRoot, 'theme-types'));
  } catch (e) {
    // ignore
  }

  const content = `import type { ThemeType } from './theme-types';

export const themeConfig: Record<string, ThemeType> = ${JSON.stringify(results, null, 2)};

export const sumThemeConfig: ThemeType = ${JSON.stringify(sumResults, null, 2)};

export const themeConfigMapping: Record<string, string> = ${JSON.stringify(mapping, null, 2)};
`;

  fs.writeFileSync(resolve(styleRoot, 'theme-config.ts'), content, 'utf-8');
}
