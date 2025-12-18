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
} from '@nio-fe/shared';
import { ApiGeneratorAnalysedBaseType } from '@nio-fe/shared';

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
    const field = parameter.forEachChildAsArray()[0]!.getText();
    const typeNode = parameter.forEachChildAsArray().at(-1)!;
    const nativeType = formatTsTypeToUnitType(typeNode, fileElements);

    const temp: ApiGeneratorAnalysedExposeParamType = {
      desc: (jsDoc.tags.param || jsDoc.tags.params)?.[field] ?? '',
      field,
      nativeType,
      params: [],
      returns: [],
      returnText: '',
      returnType: '',
      value: typeNode.getText(),
    };

    switch (nativeType) {
      case ApiGeneratorAnalysedBaseType.Object:
        temp.params = analyseObjectExpression(typeNode, jsDoc, fileElements);
        break;
      case ApiGeneratorAnalysedBaseType.Function:
        ({
          params: temp.params,
          returns: temp.returns,
          returnText: temp.returnText,
        } = analyseFunctionExpression(typeNode, jsDoc, fileElements));
        break;
    }

    params.push(temp);
  });

  const returns: ApiGeneratorAnalysedExposeReturnType[] = [];
  const returnText = funcNode?.getReturnTypeNode()?.getText() || '';
  const returnType = funcNode?.getReturnType().getText();

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
