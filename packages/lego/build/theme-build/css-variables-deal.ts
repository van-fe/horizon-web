import { componentRoot, directiveRoot, methodsRoot, styleRoot } from '@nio-fe/shared/plugins';
import { resolve } from 'path';
import type { OneDeepRecordType } from './utils';
import {
  getBasicElementCssVariables,
  getScssProperties,
  getVariablesFile,
  recursionCollectFiles,
} from './utils';

function recursionTransformScssFileToProperties(filesPathTree: OneDeepRecordType) {
  const res: OneDeepRecordType = {};

  Object.entries(filesPathTree).forEach(([name, pathOrTree]) => {
    if (typeof pathOrTree === 'string') {
      res[name] = getBasicElementCssVariables(pathOrTree, false);
    } else {
      res[name] = recursionTransformScssFileToProperties(pathOrTree);
    }
  });

  return res;
}

export function getGroupedBasicAndElementToken() {
  const filesPathTree = {
    basic: recursionCollectFiles(resolve(styleRoot, 'basic')),
    element: recursionCollectFiles(resolve(styleRoot, 'element')),
  };

  return recursionTransformScssFileToProperties(filesPathTree);
}

export function flatTreeCssProperties(propertiesTree: OneDeepRecordType) {
  let res: Record<string, string> = {};

  Object.entries(propertiesTree).forEach(([key, value]) => {
    if (typeof value === 'string') {
      res[key] = value;
    } else {
      res = { ...res, ...flatTreeCssProperties(value) };
    }
  });

  return res;
}

export default function () {
  const basicElementTokensTree = getGroupedBasicAndElementToken();
  const basicTokens = flatTreeCssProperties(basicElementTokensTree.basic as OneDeepRecordType);
  const elementTokens = flatTreeCssProperties(basicElementTokensTree.element as OneDeepRecordType);

  let sumCssVariables: Record<string, string> = {
    ...flatTreeCssProperties(basicElementTokensTree),
  };

  const pluginsCssVariables: Record<string, Record<string, string>> = {
    basic: basicTokens,
    element: elementTokens,
  };

  const pluginCssVariableFilePaths: string[] = [
    ...getVariablesFile(componentRoot),
    ...getVariablesFile(directiveRoot),
    ...getVariablesFile(methodsRoot),
  ];

  pluginCssVariableFilePaths.forEach(path => {
    const propertyNameMap = getScssProperties(path);

    sumCssVariables = { ...sumCssVariables, ...propertyNameMap };

    const pluginName = path.match(/src\/(components|directives|methods)\/([\w-]+)\/src/);

    if (pluginName) {
      const pluginInsName = pluginName[2];
      pluginsCssVariables[pluginInsName] = propertyNameMap;
    }
  });

  return {
    sumCssVariables,
    pluginsCssVariables,
    basicTokens,
    elementTokens,
    basicElementTokensTree,
  };
}
