import type { Project, PropertyAssignment } from 'ts-morph';
import type { ApiGeneratorAnalysedSlotType, ApiGeneratorExportedComponent } from '@aurora/utils';
import { ts } from 'ts-morph';
import analysisFileElements from '../../utils/analyseFileElements';
import completeFileExtName from '../../utils/completeFileExtName';
import analysisJsDocs from '../../utils/analyseJsDocs';

function analysisPropertyAssignment(property: PropertyAssignment): ApiGeneratorAnalysedSlotType {
  const jsDoc = analysisJsDocs(property.compilerNode);

  const res: ApiGeneratorAnalysedSlotType = {
    desc: jsDoc.comment,
    descLocales: jsDoc.locales,
    name: property.getName(),
    type: '',
    params: [],
    version: jsDoc.tags.version?.default,
  };

  try {
    // slots 只有 arrow-function
    property.getChildrenOfKind(ts.SyntaxKind.ArrowFunction)?.[0]?.forEachChild(parameter => {
      if (parameter.getKind() === ts.SyntaxKind.Parameter) {
        const paramFieldName = parameter.getFirstChild()!.getText();

        res.params.push({
          field: paramFieldName,
          value: parameter.getLastChild()!.getText(),
          desc: (jsDoc.tags.param || jsDoc.tags.params)?.[paramFieldName] || '',
          descLocales: jsDoc.tags.paramEn?.[paramFieldName]
            ? { en: jsDoc.tags.paramEn[paramFieldName] }
            : undefined,
        });
      }
    });

    res.type =
      '(' + res.params.map(param => `${param.field}: ${[param.value]}`).join(', ') + ') => VNode';
  } catch (e) {
    console.error(e);
    debugger;
  }

  return res;
}

export default function analyseSlots(
  project: Project,
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedSlotType[] {
  const props: ApiGeneratorAnalysedSlotType[] = [];
  if (componentInfo.slotsVariableFilePath) {
    const filePathWithExtName = completeFileExtName(componentInfo.slotsVariableFilePath);

    if (!filePathWithExtName) {
      throw new Error(`This file cannot be found: ${componentInfo.slotsVariableFilePath}.ts(x)`);
    }

    const sourceFile = project.addSourceFileAtPathIfExists(filePathWithExtName);

    if (sourceFile) {
      const fileElements = analysisFileElements(sourceFile);

      if (fileElements.variables[componentInfo.slotsVariableName]) {
        for (const properties of fileElements.variables[
          componentInfo.slotsVariableName
        ]?.getChildrenOfKind(ts.SyntaxKind.PropertyAssignment) ?? []) {
          props.push(analysisPropertyAssignment(properties));
        }
      }
    }
  }

  return props;
}
