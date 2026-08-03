import type {
  SourceFile,
  Project,
  ExportDeclaration,
  ImportDeclaration,
  VariableDeclaration,
  VariableStatement,
} from 'ts-morph';
import type {
  ApiGeneratorExportedDirectives,
  ApiGeneratorExportedPluginType,
} from '@aurora/utils';
import { ts } from 'ts-morph';
import { analyseImportExportStatement } from '../../utils/analyseImportExportStatement';
import { analyseExportedTypes } from '../../utils/analysisType/analyseExportedTypes';
import { analyseDirective } from './analyseDirective';

export function analyseDirectiveExports(
  sourceFile: SourceFile,
  path: string,
  project: Project,
): [ApiGeneratorExportedDirectives[], ApiGeneratorExportedPluginType[]] {
  const dirName = path.match(/(?<=directives\/)([\w-]+)/g)?.[0] ?? '';
  const defaultExportedPluginName =
    sourceFile
      .getStatementByKind(ts.SyntaxKind.ExportAssignment)
      ?.getChildrenOfKind(ts.SyntaxKind.Identifier)
      .at(0)
      ?.getText() ?? '';
  const exportedDirectives: ApiGeneratorExportedDirectives[] = [];
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
          const functionWrappedVariable = syntax.getLastChild();
          const insureVariables =
            functionWrappedVariable
              ?.getChildrenOfKind(ts.SyntaxKind.SyntaxList)?.[0]
              ?.getChildren() || [];
          if (insureVariables.length === 0) continue;

          const insureVariableName = insureVariables[0].getText();

          if (/^H/.test(exportedVariableName)) {
            // try {
            const res: ApiGeneratorExportedDirectives = {
              dirName,
              name: exportedVariableName,
              desc: '',
              entranceFilePath: path,
              directiveDefinedFilePath: imports[insureVariableName].replace(
                /^.\//,
                path.replace(/\w+\.\w+$/, ''),
              ),
              optionsVariableName: '',
              optionsVariableFilePath: '',
            };

            exportedDirectives.push(analyseDirective(res, project));
            // } catch (e) {
            //   console.warn(insureVariables[0].getText(), imports);
            //   console.error(e);
            //   debugger
            // }
          }
        }
        break;
    }
  }

  return [exportedDirectives, exportedTypes];
}
