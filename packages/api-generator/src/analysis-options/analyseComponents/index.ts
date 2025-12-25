import { Project } from 'ts-morph';
import { apiGeneratorOutPut, horizonwebProjectRoot } from '@root/scripts/paths';
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

  return {
    name: componentNameWithoutPrefix,
    parentComponentName: componentInfo.dirName,
    desc: componentInfo.desc,
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
