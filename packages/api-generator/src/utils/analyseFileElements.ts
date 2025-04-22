import type {
  EnumDeclaration,
  EnumMember,
  ImportDeclaration,
  ObjectLiteralExpression,
  SourceFile,
  TypeAliasDeclaration,
  VariableStatement,
  InterfaceDeclaration,
  TypeReferenceNode,
  ArrowFunction,
} from 'ts-morph';
import { ts } from 'ts-morph';
import { analyseImportExportStatement } from './analyseImportExportStatement';
import checkInvisibleTagExist from './checkInvisibleTagExist';

export type FileElementsVariablesType = ObjectLiteralExpression | ArrowFunction | undefined;

export type FileElements = {
  imports: Record<string, string>;
  types: Record<string, TypeReferenceNode>;
  interfaces: Record<string, InterfaceDeclaration>;
  enums: Record<string, EnumMember[]>;
  variables: Record<string, FileElementsVariablesType>;
  variablesWithRawDeclaration: Record<string, VariableStatement>;
};

export default function (sourceFile: SourceFile): FileElements {
  const statements = sourceFile.getChildSyntaxList()?.getChildren() || [];
  let imports: Record<string, string> = {};
  const types: Record<string, TypeReferenceNode> = {};
  const interfaces: Record<string, InterfaceDeclaration> = {};
  const enums: Record<string, EnumMember[]> = {};
  const variables: Record<string, FileElementsVariablesType> = {};
  const variablesWithRawDeclaration: Record<string, VariableStatement> = {};

  for (const statement of statements) {
    if (checkInvisibleTagExist(statement.compilerNode)) {
      continue;
    }

    switch (statement.getKind()) {
      case ts.SyntaxKind.ImportDeclaration:
        imports = { ...imports, ...analyseImportExportStatement(statement as ImportDeclaration) };
        break;
      // todo:: analyse export statements
      // case ts.SyntaxKind.ExportAssignment:
      //   imports = { ...imports, ...analysisImportExportStatement(statement as ExportDeclaration) };
      //   break;
      case ts.SyntaxKind.EnumDeclaration:
        const enumName = (statement as EnumDeclaration)?.getName();
        enums[enumName] = (statement as EnumDeclaration)?.getMembers();
        break;
      case ts.SyntaxKind.InterfaceDeclaration:
        const interfaceName = (statement as InterfaceDeclaration)?.getName();
        interfaces[interfaceName] = statement as InterfaceDeclaration;
        break;
      case ts.SyntaxKind.TypeAliasDeclaration:
        const typeName = (statement as TypeAliasDeclaration)?.getName();
        const typeChildren = (statement as TypeAliasDeclaration).forEachChildAsArray();
        const lastTypeChild = typeChildren[typeChildren.length - 1];

        if (!lastTypeChild) continue;
        types[typeName] = lastTypeChild as TypeReferenceNode;
        break;
      case ts.SyntaxKind.VariableStatement:
        const variableDeclaration = (statement as VariableStatement)
          .getDeclarationList()
          .getDeclarations()?.[0];
        const variableName = variableDeclaration?.getName();
        if (variableName) {
          const last = variableDeclaration?.getLastChild();
          if (last) {
            if (last.getKind() === ts.SyntaxKind.CallExpression) {
              const lastDefined = last.forEachChildAsArray().at(-1);
              if (lastDefined) {
                variables[variableName] = lastDefined as ObjectLiteralExpression | ArrowFunction;
                variablesWithRawDeclaration[variableName] = statement as VariableStatement;
              } else {
                variables[variableName] = undefined;
              }
            } else {
              variables[variableName] = last as ObjectLiteralExpression;
            }
          }
        }
        break;
    }
  }

  return {
    imports,
    types,
    interfaces,
    enums,
    variables,
    variablesWithRawDeclaration,
  };
}
