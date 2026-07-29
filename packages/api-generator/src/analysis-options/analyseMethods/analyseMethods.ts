import type { MethodDeclaration, Project, PropertyAssignment, ArrowFunction } from 'ts-morph';
import { ts } from 'ts-morph';
import type { ApiGeneratorExportedMethod, ApiGeneratorAnalysedMethodType } from '@aurora/utils';
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';
import type { FileElements } from '../../utils/analyseFileElements';
import analyseFileElements from '../../utils/analyseFileElements';
import completeFileExtName from '../../utils/completeFileExtName';
import analyseJsDocs from '../../utils/analyseJsDocs';
import formatTsTypeToUnitType from '../../utils/formatTsTypeToUnitType';

function analysePropertyAssignment(
  property: PropertyAssignment | MethodDeclaration,
  fileElements: FileElements,
): ApiGeneratorAnalysedMethodType {
  const jsDoc = analyseJsDocs(property.compilerNode);

  const res: ApiGeneratorAnalysedMethodType = {
    returnText: '',
    returns: [],
    desc: jsDoc.comment,
    descLocales: jsDoc.locales,
    name: property.getName(),
    type: '',
    nativeType: ApiGeneratorAnalysedBaseType.Function,
    params: [],
    deprecated: jsDoc.tags.deprecated?.default,
    version: jsDoc.tags.version?.default,
    return: 'void',
  };

  function analyseFuncType(node: ArrowFunction | MethodDeclaration) {
    const children = node.forEachChildAsArray();
    const paramsAndReturn = node.forEachChildAsArray().slice(
      0,
      children.findIndex(curr => curr.getKind() === ts.SyntaxKind.EqualsGreaterThanToken),
    );

    for (const child of paramsAndReturn) {
      switch (child.getKind()) {
        case ts.SyntaxKind.Parameter:
          const field = child.getFirstChildByKind(ts.SyntaxKind.Identifier)?.getText() ?? '';
          const parameterType = child.getTypeNode();
          const value = parameterType?.getText() || child.getType().getText() || 'unknown';
          if (field && value) {
            res.params.push({
              returnText: '',
              returns: [],
              field,
              value,
              desc: (jsDoc.tags.params || jsDoc.tags.param)?.[field] ?? '',
              descLocales: jsDoc.tags.paramEn?.[field]
                ? { en: jsDoc.tags.paramEn[field] }
                : undefined,
              nativeType: parameterType
                ? formatTsTypeToUnitType(parameterType, fileElements)
                : ApiGeneratorAnalysedBaseType.Unknown,
              params: [],
            });
          }
          break;
        default:
          if (child.getKind() !== ts.SyntaxKind.Identifier) res.return = child.getText();
          break;
      }
    }

    res.type = `(${res.params.map(param => `${param.field}: ${param.value}`).join(', ')}) => ${
      res.return
    }`;
  }

  switch (property.getKind()) {
    case ts.SyntaxKind.PropertyAssignment:
      const arrowFunction = property.getFirstChildByKind(ts.SyntaxKind.ArrowFunction);
      if (arrowFunction) {
        analyseFuncType(arrowFunction);
      }
      break;
    case ts.SyntaxKind.MethodDeclaration:
      analyseFuncType(property as MethodDeclaration);
      break;
  }

  return res;
}

export default function analyseMethods(
  project: Project,
  methodInfo: ApiGeneratorExportedMethod,
): ApiGeneratorAnalysedMethodType[] {
  const methods: ApiGeneratorAnalysedMethodType[] = [];
  if (methodInfo.methodsVariableFilePath) {
    const filePathWithExtName = completeFileExtName(methodInfo.methodsVariableFilePath);

    if (!filePathWithExtName) {
      throw new Error(`This file cannot be found: ${methodInfo.methodsVariableFilePath}.ts(x)`);
    }

    const sourceFile = project.addSourceFileAtPathIfExists(filePathWithExtName);

    if (sourceFile) {
      const fileElements = analyseFileElements(sourceFile);

      if (fileElements.variables[methodInfo.methodsVariableName]) {
        for (const properties of fileElements.variables[methodInfo.methodsVariableName]
          ?.forEachChildAsArray()
          ?.filter(curr =>
            [ts.SyntaxKind.PropertyAssignment, ts.SyntaxKind.MethodDeclaration].includes(
              curr.getKind(),
            ),
          ) || []) {
          methods.push(
            analysePropertyAssignment(
              properties as PropertyAssignment | MethodDeclaration,
              fileElements,
            ),
          );
        }
      }
    }
  }

  return methods;
}
