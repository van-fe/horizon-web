import type { Project } from 'ts-morph';
import { apiGeneratorOutPut } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import type {
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedOptionType,
  ApiGeneratorExportedDirectives,
} from '@aurora/utils';
import analyseOptions from './analyseOptions';
import directivesData from '../../../dist/directives-dependencies.json';

function analyseDirectives(
  project: Project,
  directiveInfo: ApiGeneratorExportedDirectives,
): ApiGeneratorAnalysedDirectiveDetail {
  const directiveNameWithoutPrefix = directiveInfo.name.replace(/^HV/, '');

  const options: ApiGeneratorAnalysedOptionType[] = analyseOptions(project, directiveInfo);

  return {
    name: directiveNameWithoutPrefix,
    desc: directiveInfo.desc,
    descLocales: directiveInfo.descLocales,
    optionsVariableName: directiveInfo.optionsVariableName,
    options,
  };
}

export default async function (project: Project) {
  const directives: ApiGeneratorAnalysedDirectiveDetail[] = [];

  directivesData.forEach(data => {
    directives.push(analyseDirectives(project, data));
  });

  writeJsonFile(
    apiGeneratorOutPut,
    'directives-analysis.json',
    JSON.stringify(directives, null, 2),
  );
}
