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
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';
import type {
  ComponentManifestField,
  RendererComponentManifest,
  VueComponentManifestExtension,
} from '@aurora/core';
import analyseProps from './analyseProps';
import analyseEmits from './analyseEmits';
import analyseSlots from './analyseSlots';
import analysisExposes from './analyseExposes';
import componentsData from '../../../dist/components-dependencies.json';
import { vueComponentManifests } from '@root/scripts/generateComponentContracts';

function manifestDescription(field: ComponentManifestField) {
  return {
    desc: field.description.zh,
    descLocales: { en: field.description.en },
  };
}

function manifestBaseType(field: ComponentManifestField): string {
  if (typeof field.runtimeType === 'string') return field.runtimeType;
  if (field.runtimeType) return field.runtimeType.join(' | ');
  return field.type;
}

function manifestProps(fields: readonly ComponentManifestField[]): ApiGeneratorAnalysedPropType[] {
  return fields.map(field => ({
    name: field.name,
    ...manifestDescription(field),
    type: field.type,
    baseType: manifestBaseType(field),
    options: [],
    required: field.required ?? false,
    default: field.defaultValue ?? '',
  }));
}

function manifestEmits(fields: readonly ComponentManifestField[]): ApiGeneratorAnalysedEmitType[] {
  return fields.map(field => ({
    name: field.name,
    ...manifestDescription(field),
    params:
      field.type === 'void'
        ? []
        : [
            {
              field: 'argument',
              value: field.type,
              desc: field.description.zh,
              descLocales: { en: field.description.en },
            },
          ],
  }));
}

function manifestSlots(fields: readonly ComponentManifestField[]): ApiGeneratorAnalysedSlotType[] {
  return fields.map(field => ({
    name: field.name,
    ...manifestDescription(field),
    type: field.type,
    params: [],
  }));
}

function manifestExposes(
  fields: readonly ComponentManifestField[],
): ApiGeneratorAnalysedExposeType[] {
  return fields.map(field => ({
    name: field.name,
    ...manifestDescription(field),
    type: field.type,
    nativeType:
      field.runtimeType === 'function'
        ? ApiGeneratorAnalysedBaseType.Function
        : ApiGeneratorAnalysedBaseType.Unknown,
    params: [],
    returns: [],
    returnText: '',
  }));
}

function findRuntimeManifest(
  componentName: string,
): RendererComponentManifest<VueComponentManifestExtension> | undefined {
  return vueComponentManifests.find(
    manifest =>
      manifest.common.name === componentName &&
      manifest.common.contract.props.some(field => field.runtimeType !== undefined),
  );
}

function analysisComponents(
  project: Project,
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedComponentDetail {
  const componentNameWithoutPrefix = componentInfo.name.replace(/^H/, '');
  const rendererManifest = findRuntimeManifest(componentNameWithoutPrefix);

  const props: ApiGeneratorAnalysedPropType[] = rendererManifest
    ? manifestProps(rendererManifest.api.props)
    : analyseProps(project, componentInfo);
  const emits: ApiGeneratorAnalysedEmitType[] = rendererManifest
    ? manifestEmits(rendererManifest.api.emits)
    : analyseEmits(project, componentInfo);
  const slots: ApiGeneratorAnalysedSlotType[] = rendererManifest
    ? manifestSlots(rendererManifest.api.slots)
    : analyseSlots(project, componentInfo);
  const exposes: ApiGeneratorAnalysedExposeType[] = rendererManifest
    ? manifestExposes(rendererManifest.api.exposes)
    : analysisExposes(project, componentInfo);

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
