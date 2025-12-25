import { Project } from 'ts-morph';
import { apiGeneratorOutPut, horizonwebProjectRoot, writeJsonFile } from '@aurora/utils/plugins';
import type {
  ApiGeneratorAnalysedMethodDetail,
  ApiGeneratorAnalysedMethodType,
  ApiGeneratorAnalysedOptionType,
  ApiGeneratorExportedMethod,
} from '@aurora/utils';
import analyseOptions from './analyseOptions';
import analyseMethods from './analyseMethods';
import methodsData from '../../../dist/methods-dependencies.json';

function analyseMethod(methodInfo: ApiGeneratorExportedMethod): ApiGeneratorAnalysedMethodDetail {
  const methodNameWithoutPrefix = methodInfo.name.replace(/^N/, '');

  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      baseUrl: horizonwebProjectRoot,
      preserveSymlinks: true,
    },
    tsConfigFilePath: horizonwebProjectRoot + '/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  const options: ApiGeneratorAnalysedOptionType[] = analyseOptions(project, methodInfo);
  const methods: ApiGeneratorAnalysedMethodType[] = analyseMethods(project, methodInfo);

  return {
    name: methodNameWithoutPrefix,
    desc: methodInfo.desc,
    dirName: methodInfo.dirName,
    optionsVariableName: methodInfo.optionsVariableName,
    options,
    methodsVariableName: methodInfo.methodsVariableName,
    methods,
  };
}

export default async function () {
  const methods: ApiGeneratorAnalysedMethodDetail[] = [];

  methodsData.forEach(data => {
    methods.push(analyseMethod(data));
  });

  writeJsonFile(apiGeneratorOutPut, 'methods-analysis.json', JSON.stringify(methods, null, 2));
}
