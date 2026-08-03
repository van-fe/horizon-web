import type { Node, FunctionTypeNode } from 'ts-morph';
import { ts } from 'ts-morph';
import type { StatementJsDoc } from '../analyseJsDocs';
import type { FileElements } from '../analyseFileElements';
import formatTsTypeToUnitType from '../formatTsTypeToUnitType';
import { analyseObjectExpression } from './analyseObject';
import type {
  ApiGeneratorAnalysedExposeParamType,
  ApiGeneratorAnalysedOptionParamType,
  ApiGeneratorAnalysedExposeReturnType,
} from '@aurora/utils';
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';

export function analyseFunctionExpression(
  node: Node,
  jsDoc: StatementJsDoc,
  fileElements: FileElements,
): {
  params: Array<ApiGeneratorAnalysedExposeParamType | ApiGeneratorAnalysedOptionParamType>;
  returns: Array<ApiGeneratorAnalysedExposeReturnType>;
  returnText: string;
  returnType: string;
} {
  let funcNode =
    node.getChildrenOfKind(ts.SyntaxKind.FunctionType)[0] ||
    node.forEachChildAsArray().find(curr => curr.getKind() === ts.SyntaxKind.ArrowFunction);

  if (
    !funcNode &&
    [ts.SyntaxKind.ArrowFunction, ts.SyntaxKind.FunctionType].includes(node.getKind())
  ) {
    funcNode = node as FunctionTypeNode;
  }

  const params: ApiGeneratorAnalysedExposeParamType[] = [];

  funcNode?.getParameters()?.forEach(parameter => {
    // The last child is not necessarily the type (`foo = 1` ends in an
    // initializer). Use ts-morph's semantic accessors so optional/default
    // parameters and rest parameters are parsed consistently.
    const field = parameter.getName();
    const typeNode = parameter.getTypeNode();
    const value = typeNode?.getText() || parameter.getType().getText() || 'unknown';
    const nativeType = typeNode
      ? formatTsTypeToUnitType(typeNode, fileElements)
      : ApiGeneratorAnalysedBaseType.Unknown;

    const temp: ApiGeneratorAnalysedExposeParamType = {
      desc: (jsDoc.tags.param || jsDoc.tags.params)?.[field] ?? '',
      descLocales: jsDoc.tags.paramEn?.[field] ? { en: jsDoc.tags.paramEn[field] } : undefined,
      field,
      nativeType,
      params: [],
      returns: [],
      returnText: '',
      returnType: '',
      value,
    };

    switch (nativeType) {
      case ApiGeneratorAnalysedBaseType.Object:
        if (typeNode) {
          temp.params = analyseObjectExpression(typeNode, jsDoc, fileElements);
        }
        break;
      case ApiGeneratorAnalysedBaseType.Function:
        if (typeNode) {
          ({
            params: temp.params,
            returns: temp.returns,
            returnText: temp.returnText,
          } = analyseFunctionExpression(typeNode, jsDoc, fileElements));
        }
        break;
    }

    params.push(temp);
  });

  const returns: ApiGeneratorAnalysedExposeReturnType[] = [];
  const returnText = funcNode?.getReturnTypeNode()?.getText() || '';
  const returnType = funcNode?.getReturnType().getText() || '';

  const returnNode = funcNode?.getReturnTypeNode();

  if (returnNode) {
    switch (returnNode.getKind()) {
      case ts.SyntaxKind.TypeLiteral:
        returns.push(...analyseObjectExpression(returnNode, jsDoc, fileElements));
        break;
      case ts.SyntaxKind.TypeReference:
        returns.push({
          field: 'default',
          value: returnNode.getText(),
          desc: jsDoc.tags.return?.default ?? jsDoc.tags.param?.[returnNode.getText()] ?? '',
          nativeType: ApiGeneratorAnalysedBaseType.Object,
          params: [],
        });
        break;
      case ts.SyntaxKind.ArrayType:
        const typeNode = returnNode.forEachChildAsArray()[0];
        returns.push({
          field: 'default',
          value: typeNode.getText(),
          desc: jsDoc.tags.return?.default ?? jsDoc.tags.param?.[typeNode.getText()] ?? '',
          nativeType: ApiGeneratorAnalysedBaseType.Array,
          params: [],
        });
        break;
    }
  }

  return { params, returns, returnText, returnType };
}
