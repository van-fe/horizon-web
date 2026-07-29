import type { Project, PropertyAssignment } from 'ts-morph';
import { ts } from 'ts-morph';
import type { ApiGeneratorAnalysedExposeType, ApiGeneratorExportedComponent } from '@aurora/utils';
import type { FileElements } from '../../utils/analyseFileElements';
import analyseFileElements from '../../utils/analyseFileElements';
import completeFileExtName from '../../utils/completeFileExtName';
import analyseJsDocs from '../../utils/analyseJsDocs';
import { analyseObjectExpression } from '../../utils/analysisType/analyseObject';
import { analyseFunctionExpression } from '../../utils/analysisType/analyseFunction';
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';

function analysePropertyAssignment(
  property: PropertyAssignment,
  fileElements: FileElements,
): ApiGeneratorAnalysedExposeType {
  const jsDoc = analyseJsDocs(property.compilerNode);

  const res: ApiGeneratorAnalysedExposeType = {
    desc: jsDoc.comment,
    descLocales: jsDoc.locales,
    name: property.getName(),
    type: '',
    nativeType: ApiGeneratorAnalysedBaseType.Unknown,
    params: [],
    returns: [],
    returnText: '',
    deprecated: jsDoc.tags.deprecated?.default,
    version: jsDoc.tags.version?.default,
  };

  try {
    const declare = property.getLastChild();
    if (declare) {
      switch (declare.getKind()) {
        // field: Object as ApiGeneratorAnalysedExposeType<>
        case ts.SyntaxKind.AsExpression:
          const typeReference = declare.getChildrenOfKind(ts.SyntaxKind.TypeReference)?.[0];

          const wrapperAsTypeName = typeReference?.getTypeName().getText();

          const currType = declare.getFirstChild()?.getText().toLowerCase();

          if (wrapperAsTypeName === 'ExposeType') {
            switch (currType) {
              case 'object':
                res.nativeType = ApiGeneratorAnalysedBaseType.Object;
                res.type = typeReference?.getTypeArguments()?.[0]?.getText() || '';
                res.params = analyseObjectExpression(
                  typeReference?.getTypeArguments()?.[0],
                  jsDoc,
                  fileElements,
                );
                break;
              case 'function':
                res.nativeType = ApiGeneratorAnalysedBaseType.Function;
                res.type = typeReference?.getTypeArguments()?.[0].getText() || '';
                ({
                  params: res.params,
                  returns: res.returns,
                  returnText: res.returnText,
                } = analyseFunctionExpression(
                  typeReference?.getTypeArguments()?.[0],
                  jsDoc,
                  fileElements,
                ));
                break;
              default:
                res.type = typeReference
                  ?.getChildrenOfKind(ts.SyntaxKind.SyntaxList)?.[0]
                  ?.getText();
                break;
            }
          } else {
            res.type = currType || '';
          }
          break;
        // field: Object
        default:
          res.type = declare.getText().toLowerCase();
          break;
      }
    }
  } catch (e) {
    console.error(e);
    debugger;
  }

  return res;
}

export default function analyseExposes(
  project: Project,
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedExposeType[] {
  const exposes: ApiGeneratorAnalysedExposeType[] = [];
  if (componentInfo.exposesVariableFilePath) {
    const filePathWithExtName = completeFileExtName(componentInfo.exposesVariableFilePath);

    if (!filePathWithExtName) {
      throw new Error(`This file cannot be found: ${componentInfo.exposesVariableFilePath}.ts(x)`);
    }

    const sourceFile = project.addSourceFileAtPathIfExists(filePathWithExtName);

    if (sourceFile) {
      const fileElements = analyseFileElements(sourceFile);

      if (fileElements.variables[componentInfo.exposesVariableName]) {
        for (const properties of fileElements.variables[
          componentInfo.exposesVariableName
        ]?.getChildrenOfKind(ts.SyntaxKind.PropertyAssignment) || []) {
          exposes.push(analysePropertyAssignment(properties, fileElements));
        }
      }
    }
  }

  return exposes;
}
