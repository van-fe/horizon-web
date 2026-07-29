import type { Node } from 'ts-morph';
import { ts } from 'ts-morph';
import type { FileElements } from './analyseFileElements';
import { ApiGeneratorAnalysedBaseType } from '@aurora/utils';

/**
 * Converts a TypeScript node to the small set of types consumed by the API
 * documentation.  Keep this function deliberately lossless for syntax that
 * cannot be classified: the caller still has the original `getText()` value
 * and should never receive an empty type because a new TS syntax was added.
 */
export default function formatTsTypeToUnitType(
  typeNode: Node,
  fileElements: FileElements,
  resolving = new Set<string>(),
): ApiGeneratorAnalysedBaseType {
  if (!typeNode) return ApiGeneratorAnalysedBaseType.Unknown;

  switch (typeNode.getKind()) {
    case ts.SyntaxKind.FunctionType:
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.ConstructorType:
      return ApiGeneratorAnalysedBaseType.Function;

    case ts.SyntaxKind.TypeLiteral:
    case ts.SyntaxKind.ObjectKeyword:
    case ts.SyntaxKind.InterfaceDeclaration:
    case ts.SyntaxKind.MappedType:
    case ts.SyntaxKind.IntersectionType:
      return ApiGeneratorAnalysedBaseType.Object;

    case ts.SyntaxKind.StringKeyword:
      return ApiGeneratorAnalysedBaseType.String;
    case ts.SyntaxKind.NumberKeyword:
    case ts.SyntaxKind.BigIntKeyword:
      return ApiGeneratorAnalysedBaseType.Number;
    case ts.SyntaxKind.BooleanKeyword:
      return ApiGeneratorAnalysedBaseType.Boolean;

    case ts.SyntaxKind.ArrayType:
    case ts.SyntaxKind.ArrayLiteralExpression:
    case ts.SyntaxKind.TupleType:
      return ApiGeneratorAnalysedBaseType.Array;

    case ts.SyntaxKind.UnionType: {
      const members = typeNode
        .asKind(ts.SyntaxKind.UnionType)
        ?.getTypeNodes()
        .map(member => formatTsTypeToUnitType(member, fileElements, resolving));
      if (members?.length && members.every(member => member === members[0])) {
        return members[0];
      }
      return ApiGeneratorAnalysedBaseType.Unknown;
    }

    case ts.SyntaxKind.LiteralType: {
      const literal = typeNode.getFirstChild();
      switch (literal?.getKind()) {
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
          return ApiGeneratorAnalysedBaseType.String;
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.BigIntLiteral:
          return ApiGeneratorAnalysedBaseType.Number;
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
          return ApiGeneratorAnalysedBaseType.Boolean;
        default:
          return ApiGeneratorAnalysedBaseType.Unknown;
      }
    }

    case ts.SyntaxKind.TypeReference: {
      const typeName = typeNode.getTypeName?.().getText() || typeNode.getText();
      const normalized = typeName.replace(/^globalThis\./, '');
      switch (normalized) {
        case 'Function':
          return ApiGeneratorAnalysedBaseType.Function;
        case 'String':
        case 'string':
          return ApiGeneratorAnalysedBaseType.String;
        case 'Number':
        case 'number':
        case 'bigint':
          return ApiGeneratorAnalysedBaseType.Number;
        case 'Boolean':
        case 'boolean':
          return ApiGeneratorAnalysedBaseType.Boolean;
        case 'Object':
        case 'Date':
        case 'RegExp':
        case 'Record':
        case 'Partial':
        case 'Pick':
        case 'Omit':
          return ApiGeneratorAnalysedBaseType.Object;
        case 'Array':
        case 'ReadonlyArray':
        case 'Set':
        case 'Map':
          return ApiGeneratorAnalysedBaseType.Array;
      }

      // Resolve local aliases, but guard against recursive aliases such as
      // `type Tree = { children: Tree[] }`.
      if (!resolving.has(normalized)) {
        const type = fileElements.interfaces[normalized] || fileElements.types[normalized];
        if (type) {
          const next = new Set(resolving).add(normalized);
          return formatTsTypeToUnitType(type, fileElements, next);
        }
      }
      return ApiGeneratorAnalysedBaseType.Unknown;
    }

    case ts.SyntaxKind.PropertySignature:
      return typeNode.getTypeNode()
        ? formatTsTypeToUnitType(typeNode.getTypeNode()!, fileElements, resolving)
        : ApiGeneratorAnalysedBaseType.Unknown;

    case ts.SyntaxKind.ParenthesizedType:
      return formatTsTypeToUnitType(typeNode.getTypeNode()!, fileElements, resolving);
    case ts.SyntaxKind.TypeOperator:
    case ts.SyntaxKind.IndexedAccessType:
    case ts.SyntaxKind.ConditionalType:
    case ts.SyntaxKind.TemplateLiteralType:
    case ts.SyntaxKind.TypeQuery:
    case ts.SyntaxKind.AnyKeyword:
    case ts.SyntaxKind.UnknownKeyword:
    case ts.SyntaxKind.NeverKeyword:
    case ts.SyntaxKind.VoidKeyword:
    case ts.SyntaxKind.NullKeyword:
    case ts.SyntaxKind.UndefinedKeyword:
    default:
      return ApiGeneratorAnalysedBaseType.Unknown;
  }
}
