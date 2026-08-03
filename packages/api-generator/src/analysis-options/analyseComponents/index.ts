import { Project } from 'ts-morph';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { apiGeneratorOutPut, horizonwebProjectRoot, monorepoRoot } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedEmitType,
  ApiGeneratorAnalysedExposeType,
  ApiGeneratorAnalysedPropType,
  ApiGeneratorAnalysedSlotType,
  ApiGeneratorExportedComponent,
} from '@aurora/utils';
import analyseProps from './analyseProps';
import analyseEmits from './analyseEmits';
import analyseSlots from './analyseSlots';
import analysisExposes from './analyseExposes';
import componentsData from '../../../dist/components-dependencies.json';

function getEnglishComponentDescription(name: string): string | undefined {
  const file = resolve(monorepoRoot, 'packages/docs/en/demos/components', `${name}.md`);
  if (!existsSync(file)) return undefined;
  const source = readFileSync(file, 'utf8');
  const text = source
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && !line.startsWith(':::'))
    .find(line => !line.startsWith('```'));
  return text;
}

function analysisComponents(
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedComponentDetail {
  const componentNameWithoutPrefix = componentInfo.name.replace(/^H/, '');

  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      baseUrl: horizonwebProjectRoot,
      preserveSymlinks: true,
    },
    tsConfigFilePath: horizonwebProjectRoot + '/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  const props: ApiGeneratorAnalysedPropType[] = analyseProps(project, componentInfo);
  const emits: ApiGeneratorAnalysedEmitType[] = analyseEmits(project, componentInfo);
  const slots: ApiGeneratorAnalysedSlotType[] = analyseSlots(project, componentInfo);
  const exposes: ApiGeneratorAnalysedExposeType[] = analysisExposes(project, componentInfo);

  const enDescription = getEnglishComponentDescription(componentNameWithoutPrefix);

  return {
    name: componentNameWithoutPrefix,
    parentComponentName: componentInfo.dirName,
    desc: componentInfo.desc,
    descLocales: {
      ...componentInfo.descLocales,
      ...(enDescription ? { en: enDescription } : {}),
    },
    propsVariableName: componentInfo.propsVariableName,
    props,
    emitsVariableName: componentInfo.emitsVariableName,
    emits,
    slotsVariableName: componentInfo.slotsVariableName,
    slots,
    exposesVariableName: componentInfo.exposesVariableName,
    exposes,
  };
}

export default async function () {
  const components: ApiGeneratorAnalysedComponentDetail[] = [];

  componentsData.forEach(data => {
    components.push(analysisComponents(data));
  });

  writeJsonFile(
    apiGeneratorOutPut,
    'components-analysis.json',
    JSON.stringify(components, null, 2),
  );
}
