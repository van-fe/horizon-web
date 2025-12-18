import type {
  ImportDeclaration,
  SourceFile,
  VariableDeclaration,
  VariableStatement,
  Project,
  ExportDeclaration,
} from 'ts-morph';
import { ts } from 'ts-morph';
import type { ApiGeneratorExportedPluginType, ApiGeneratorExportedMethod } from '@aurora/shared';
import { analyseMethod } from './analyseMethod';
import { analyseImportExportStatement } from '../../utils/analyseImportExportStatement';
import { analyseExportedTypes } from '../../utils/analysisType/analyseExportedTypes';

export function analyseMethodExports(
  sourceFile: SourceFile,
  path: string,
  project: Project,
): [ApiGeneratorExportedMethod[], ApiGeneratorExportedPluginType[]] {
  const dirName = path.match(/(?<=methods\/)(\w+)/g)?.[0] ?? '';
  const defaultExportedPluginName =
    sourceFile
      .getStatementByKind(ts.SyntaxKind.ExportAssignment)
      ?.getChildrenOfKind(ts.SyntaxKind.Identifier)
      .at(0)
      ?.getText() ?? '';
  const exportedMethods: ApiGeneratorExportedMethod[] = [];
  const exportedTypes: ApiGeneratorExportedPluginType[] = [];
  const statements = sourceFile.getStatements();
  let imports: Record<string, string> = {};

  for (const statement of statements) {
    switch (statement.getKind()) {
      case ts.SyntaxKind.ImportDeclaration:
        imports = { ...imports, ...analyseImportExportStatement(statement as ImportDeclaration) };
        break;
      case ts.SyntaxKind.ExportDeclaration:
        exportedTypes.push(
          ...analyseExportedTypes(
            statement as ExportDeclaration,
            defaultExportedPluginName,
            path,
            dirName,
          ),
        );
        break;
      case ts.SyntaxKind.VariableStatement:
        const declarationList = (statement as VariableStatement).getDeclarationList().getChildren();
        const syntax =
          (declarationList
            .filter(curr => curr.getKind() === ts.SyntaxKind.SyntaxList)?.[0]
            ?.getFirstChild() as VariableDeclaration) || null;
        if (syntax) {
          const exportedVariableName = syntax.getFirstChild()?.getText() || '';
          const instanceVariableName = syntax.getLastChild()?.getText() || '';

          if (!instanceVariableName || !exportedVariableName) {
            continue;
          }

          if (/^N/.test(exportedVariableName)) {
            const res: ApiGeneratorExportedMethod = {
              dirName,
              name: exportedVariableName,
              desc: '',
              entranceFilePath: path,
              methodExportedName: instanceVariableName,
              methodDefinedFilePath: imports[instanceVariableName].replace(
                /^.\//,
                path.replace(/\w+\.\w+$/, ''),
              ),
              optionsVariableFilePath: '',
              optionsVariableName: '',
              methodsVariableName: '',
              methodsVariableFilePath: '',
            };

            exportedMethods.push(analyseMethod(res, project));
          }
        }
        break;
    }
  }
  return [exportedMethods, exportedTypes];
}
