import { Project } from 'ts-morph';
import { apiGeneratorOutPut, horizonwebProjectRoot } from '@root/scripts/paths';
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
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { monorepoRoot } from '@root/scripts/paths';

function getEnglishDescription(type: 'methods' | 'directives', name: string) {
  const file = resolve(monorepoRoot, 'packages/docs/en/demos', type, `${name}.md`);
  if (!existsSync(file)) return undefined;
  return readFileSync(file, 'utf8').split(/\r?\n/).map(line => line.trim())
    .find(line => line && !line.startsWith('#') && !line.startsWith(':::'));
}

function analyseMethod(methodInfo: ApiGeneratorExportedMethod): ApiGeneratorAnalysedMethodDetail {
  const methodNameWithoutPrefix = methodInfo.name.replace(/^H/, '');

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
    descLocales: (() => { const en = getEnglishDescription('methods', methodNameWithoutPrefix); return en ? { en } : undefined; })(),
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
