import type { Node } from 'ts-morph';
import { ts } from 'ts-morph';
import type { FileElements } from './analyseFileElements';
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';

export default function formatTsTypeToUnitType(
  typeNode: Node,
  fileElements: FileElements,
): ApiGeneratorAnalysedBaseType {
  switch (typeNode.getKind()) {
    case ts.SyntaxKind.FunctionType:
    case ts.SyntaxKind.ArrowFunction:
      return ApiGeneratorAnalysedBaseType.Function;
    case ts.SyntaxKind.TypeLiteral:
    case ts.SyntaxKind.ObjectKeyword:
      return ApiGeneratorAnalysedBaseType.Object;
    case ts.SyntaxKind.StringKeyword:
      return ApiGeneratorAnalysedBaseType.String;
    case ts.SyntaxKind.NumberKeyword:
      return ApiGeneratorAnalysedBaseType.Number;
    case ts.SyntaxKind.ArrayType:
    case ts.SyntaxKind.ArrayLiteralExpression:
    case ts.SyntaxKind.TupleType:
      return ApiGeneratorAnalysedBaseType.Array;
    case ts.SyntaxKind.LiteralType:
      switch (typeNode.getFirstChild()?.getKind()) {
        case ts.SyntaxKind.StringLiteral:
          return ApiGeneratorAnalysedBaseType.String;
        case ts.SyntaxKind.NumericLiteral:
          return ApiGeneratorAnalysedBaseType.Number;
        default:
          return ApiGeneratorAnalysedBaseType.Unknown;
      }
    case ts.SyntaxKind.TypeReference: {
      const typeName = typeNode.getType().getText();

      switch (typeName) {
        case 'Function':
          return ApiGeneratorAnalysedBaseType.Function;
        case 'String':
          return ApiGeneratorAnalysedBaseType.String;
        case 'Number':
          return ApiGeneratorAnalysedBaseType.Number;
        case 'Object':
        case 'Date':
        case 'RegExp':
          return ApiGeneratorAnalysedBaseType.Object;
        case 'Array':
          return ApiGeneratorAnalysedBaseType.Array;
      }

      const type = fileElements.interfaces[typeName] || fileElements.types[typeName];
      if (type) {
        return formatTsTypeToUnitType(type, fileElements);
      } else {
        return ApiGeneratorAnalysedBaseType.Unknown;
      }
    }
    case ts.SyntaxKind.PropertySignature:
      return formatTsTypeToUnitType(typeNode.forEachChildAsArray().at(-1)!, fileElements);
    case ts.SyntaxKind.UnknownKeyword:
    default:
      return ApiGeneratorAnalysedBaseType.Unknown;
  }
}
