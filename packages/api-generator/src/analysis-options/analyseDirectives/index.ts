import { Project } from 'ts-morph';
import { apiGeneratorOutPut, horizonwebProjectRoot, writeJsonFile } from '@aurora/utils/plugins';
import type {
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedOptionType,
  ApiGeneratorExportedDirectives,
} from '@aurora/utils';
import analyseOptions from './analyseOptions';
import directivesData from '../../../dist/directives-dependencies.json';

function analyseDirectives(
  directiveInfo: ApiGeneratorExportedDirectives,
): ApiGeneratorAnalysedDirectiveDetail {
  const directiveNameWithoutPrefix = directiveInfo.name.replace(/^NV/, '');

  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      baseUrl: horizonwebProjectRoot,
      preserveSymlinks: true,
    },
    tsConfigFilePath: horizonwebProjectRoot + '/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  const options: ApiGeneratorAnalysedOptionType[] = analyseOptions(project, directiveInfo);

  return {
    name: directiveNameWithoutPrefix,
    desc: directiveInfo.desc,
    optionsVariableName: directiveInfo.optionsVariableName,
    options,
  };
}

export default async function () {
  const directives: ApiGeneratorAnalysedDirectiveDetail[] = [];

  directivesData.forEach(data => {
    directives.push(analyseDirectives(data));
  });

  writeJsonFile(
    apiGeneratorOutPut,
    'directives-analysis.json',
    JSON.stringify(directives, null, 2),
  );
}
