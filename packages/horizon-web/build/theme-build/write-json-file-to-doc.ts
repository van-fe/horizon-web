import type { OneDeepRecordType } from './utils';
import fs from 'fs';
import { docDemoThemesConfig, docThemesConfig } from '@aurora/utils/plugins';
import { resolve } from 'path';
import { snakeCase } from 'lodash';

export default function (
  basicElementTokensTree: OneDeepRecordType,
  pluginsCssVariables: Record<string, Record<string, string>>,
) {
  function recursionTransformCssVariableKeyToJsKey(tree: OneDeepRecordType): OneDeepRecordType {
    return Object.fromEntries(
      Object.entries(tree).map(([key, value]) => {
        if (typeof value === 'string') {
          return [snakeCase(key.replace(/^--n-/, '')), value];
        } else {
          return [key, recursionTransformCssVariableKeyToJsKey(value)];
        }
      }),
    );
  }

  const defaultThemeData = JSON.stringify(
    recursionTransformCssVariableKeyToJsKey({
      ...pluginsCssVariables,
      ...basicElementTokensTree,
    }),
  );

  fs.writeFileSync(resolve(docThemesConfig, 'default.json'), defaultThemeData, 'utf-8');

  fs.writeFileSync(resolve(docDemoThemesConfig, 'theme.json'), defaultThemeData, 'utf-8');
}
