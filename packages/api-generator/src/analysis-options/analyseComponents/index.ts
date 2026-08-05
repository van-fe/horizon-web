import type { Project } from 'ts-morph';
import { apiGeneratorOutPut } from '@root/scripts/paths';
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
  project: Project,
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedComponentDetail {
  const componentNameWithoutPrefix = componentInfo.name.replace(/^H/, '');

  const props: ApiGeneratorAnalysedPropType[] = analyseProps(project, componentInfo);
  const emits: ApiGeneratorAnalysedEmitType[] = analyseEmits(project, componentInfo);
  const slots: ApiGeneratorAnalysedSlotType[] = analyseSlots(project, componentInfo);
  const exposes: ApiGeneratorAnalysedExposeType[] = analysisExposes(project, componentInfo);

  return {
    name: componentNameWithoutPrefix,
    parentComponentName: componentInfo.dirName,
    desc: componentInfo.desc,
    descLocales: componentInfo.descLocales,
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

export default async function (project: Project) {
  const components: ApiGeneratorAnalysedComponentDetail[] = [];

  componentsData.forEach(data => {
    components.push(analysisComponents(project, data));
  });

  writeJsonFile(
    apiGeneratorOutPut,
    'components-analysis.json',
    JSON.stringify(components, null, 2),
  );
}
