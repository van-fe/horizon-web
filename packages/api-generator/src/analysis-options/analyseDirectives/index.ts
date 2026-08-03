import { Project } from 'ts-morph';
import { apiGeneratorOutPut, horizonwebProjectRoot } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import type {
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedOptionType,
  ApiGeneratorExportedDirectives,
} from '@aurora/utils';
import analyseOptions from './analyseOptions';
import directivesData from '../../../dist/directives-dependencies.json';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { monorepoRoot } from '@root/scripts/paths';
import { kebabCase } from '@aurora/utils';

function getEnglishDescription(name: string) {
  const file = resolve(monorepoRoot, 'packages/docs/en/demos/directives', `v-${kebabCase(name.replace(/^v-/, ''))}.md`);
  if (!existsSync(file)) return undefined;
  return readFileSync(file, 'utf8').split(/\r?\n/).map(line => line.trim())
    .find(line => line && !line.startsWith('#') && !line.startsWith(':::'));
}

function analyseDirectives(
  directiveInfo: ApiGeneratorExportedDirectives,
): ApiGeneratorAnalysedDirectiveDetail {
  const directiveNameWithoutPrefix = directiveInfo.name.replace(/^HV/, '');

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
    descLocales: (() => { const en = getEnglishDescription(directiveNameWithoutPrefix); return en ? { en } : undefined; })(),
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
