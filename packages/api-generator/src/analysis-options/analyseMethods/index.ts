import type { Project } from 'ts-morph';
import { apiGeneratorOutPut } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import type {
  ApiGeneratorAnalysedMethodDetail,
  ApiGeneratorAnalysedMethodType,
  ApiGeneratorAnalysedOptionType,
  ApiGeneratorExportedMethod,
} from '@aurora/utils';
import analyseOptions from './analyseOptions';
import analyseMethods from './analyseMethods';
import methodsData from '../../../dist/methods-dependencies.json';

function analyseMethod(
  project: Project,
  methodInfo: ApiGeneratorExportedMethod,
): ApiGeneratorAnalysedMethodDetail {
  const methodNameWithoutPrefix = methodInfo.name.replace(/^H/, '');

  const options: ApiGeneratorAnalysedOptionType[] = analyseOptions(project, methodInfo);
  const methods: ApiGeneratorAnalysedMethodType[] = analyseMethods(project, methodInfo);

  return {
    name: methodNameWithoutPrefix,
    desc: methodInfo.desc,
    descLocales: methodInfo.descLocales,
    dirName: methodInfo.dirName,
    optionsVariableName: methodInfo.optionsVariableName,
    options,
    methodsVariableName: methodInfo.methodsVariableName,
    methods,
  };
}

export default async function (project: Project) {
  const methods: ApiGeneratorAnalysedMethodDetail[] = [];

  methodsData.forEach(data => {
    methods.push(analyseMethod(project, data));
  });

  writeJsonFile(apiGeneratorOutPut, 'methods-analysis.json', JSON.stringify(methods, null, 2));
}
