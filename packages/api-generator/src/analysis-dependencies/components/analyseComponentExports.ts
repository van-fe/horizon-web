import type {
  ImportDeclaration,
  SourceFile,
  VariableDeclaration,
  VariableStatement,
  Project,
  ExportDeclaration,
} from 'ts-morph';
import { ts } from 'ts-morph';
import type { ApiGeneratorExportedComponent, ApiGeneratorExportedPluginType } from '@aurora/shared';
import { analyseComponent } from './analyseComponent';
import { analyseImportExportStatement } from '../../utils/analyseImportExportStatement';
import { analyseExportedTypes } from '../../utils/analysisType/analyseExportedTypes';

export function analyseComponentExports(
  sourceFile: SourceFile,
  path: string,
  project: Project,
): [ApiGeneratorExportedComponent[], ApiGeneratorExportedPluginType[]] {
  const dirName = path.match(/(?<=components\/)(\w+)/g)?.[0] ?? '';
  const defaultExportedPluginName =
    sourceFile
      .getStatementByKind(ts.SyntaxKind.ExportAssignment)
      ?.getChildrenOfKind(ts.SyntaxKind.Identifier)
      .at(0)
      ?.getText() ?? '';
  const exportedComponents: ApiGeneratorExportedComponent[] = [];
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

          if (/^N/.test(exportedVariableName)) {
            // try {
            const res: ApiGeneratorExportedComponent = {
              dirName,
              name: exportedVariableName,
              desc: '',
              mainExportComponentName: defaultExportedPluginName,
              entranceFilePath: path,
              componentDefinedFilePath: imports[insureVariableName].replace(
                /^.\//,
                path.replace(/\w+\.\w+$/, ''),
              ),
              emitsVariableFilePath: '',
              emitsVariableName: '',
              propsVariableFilePath: '',
              propsVariableName: '',
              slotsVariableFilePath: '',
              slotsVariableName: '',
              exposesVariableFilePath: '',
              exposesVariableName: '',
            };

            exportedComponents.push(analyseComponent(res, project));
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
  return [exportedComponents, exportedTypes];
}
