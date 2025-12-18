import type { Project, PropertyAssignment } from 'ts-morph';
import type { ApiGeneratorAnalysedSlotType, ApiGeneratorExportedComponent } from '@aurora/shared';
import { ts } from 'ts-morph';
import type { FileElements } from '../../utils/analyseFileElements';
import analysisFileElements from '../../utils/analyseFileElements';
import completeFileExtName from '../../utils/completeFileExtName';
import analysisJsDocs from '../../utils/analyseJsDocs';

function analysisPropertyAssignment(
  property: PropertyAssignment,
  fileElements: FileElements,
): ApiGeneratorAnalysedSlotType {
  const jsDoc = analysisJsDocs(property.compilerNode);

  const res: ApiGeneratorAnalysedSlotType = {
    desc: jsDoc.comment,
    name: property.getName(),
    type: '',
    params: [],
    deprecated: jsDoc.tags.deprecated?.default,
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
          props.push(analysisPropertyAssignment(properties, fileElements));
        }
      }
    }
  }

  return props;
}
