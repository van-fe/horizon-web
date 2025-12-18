import type { Node } from 'ts-morph';
import { ts } from 'ts-morph';
import type { StatementJsDoc } from '../analyseJsDocs';
import analyseJsDocs from '../analyseJsDocs';
import type { FileElements } from '../analyseFileElements';
import formatTsTypeToUnitType from '../formatTsTypeToUnitType';
import { analyseFunctionExpression } from './analyseFunction';
import type { ApiGeneratorAnalysedExposeParamType } from '@aurora/utils';
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';
import deepmerge from 'deepmerge';

export function analyseObjectExpression(
  node: Node,
  jsDoc: StatementJsDoc,
  fileElements: FileElements,
): ApiGeneratorAnalysedExposeParamType[] {
  const params: ApiGeneratorAnalysedExposeParamType[] = [];

  switch (node.getKind()) {
    // {a: () => void; b: () => void}
    case ts.SyntaxKind.TypeLiteral:
    case ts.SyntaxKind.InterfaceDeclaration:
      const objectParams =
        node
          .getLastChildByKind(ts.SyntaxKind.SyntaxList)
          ?.getChildrenOfKind(ts.SyntaxKind.PropertySignature) || [];

      objectParams.forEach(param => {
        const field = param.getName();
        const nativeType = formatTsTypeToUnitType(param, fileElements);
        const currentJsDoc = deepmerge(analyseJsDocs(param.compilerNode), jsDoc);
        const temp: ApiGeneratorAnalysedExposeParamType = {
          returnText: '',
          returns: [],
          returnType: '',
          field,
          value: param.getTypeNode()?.getText() ?? param.getType().getText(),
          desc:
            (currentJsDoc.tags.param || currentJsDoc.tags.params)?.[field] ||
            currentJsDoc.tags.return?.default ||
            currentJsDoc.comment ||
            '',
          nativeType,
          params: [],
        };

        switch (nativeType) {
          case ApiGeneratorAnalysedBaseType.Object:
            temp.params = analyseObjectExpression(
              param,
              analyseJsDocs(param.compilerNode),
              fileElements,
            );
            break;
          case ApiGeneratorAnalysedBaseType.Function:
            ({
              params: temp.params,
              returnText: temp.returnText,
              returnType: temp.returnType,
              returns: temp.returns,
            } = analyseFunctionExpression(param, analyseJsDocs(param.compilerNode), fileElements));
            break;
        }

        params.push(temp);
      });
      break;
    // 1. Ref<sth>
    // 2. current/other file declared type/interface
    case ts.SyntaxKind.TypeReference:
      // 1. Ref<sth>
      if (node.getChildren().length > 1) {
        // don't analyse
      } else {
        // 2. current/other file declared type/interface
        const typeName = node.getText();
        const declareType = fileElements.types[typeName] || fileElements.interfaces[typeName];

        if (
          declareType &&
          (declareType.getKind() === ts.SyntaxKind.InterfaceDeclaration ||
            declareType.getKind() === ts.SyntaxKind.TypeLiteral)
        ) {
          const objectAnalysis = analyseObjectExpression(declareType, jsDoc, fileElements);

          params.push({
            returnText: '',
            returnType: '',
            returns: [],
            field: typeName,
            value: declareType.getText().replace(/\/\*(.|[\r\n])*?\*\//g, ''),
            desc:
              (jsDoc.tags.param || jsDoc.tags.params)?.[typeName] ||
              jsDoc.tags.return?.[typeName] ||
              '',
            nativeType: ApiGeneratorAnalysedBaseType.Object,
            params: objectAnalysis,
          });
        }
      }
      break;
    // object, number and other build-in type
    default:
      break;
  }

  return params;
}
