import type { ApiGeneratorExportedDirectives } from '@aurora/shared';
import type {
  Project,
  ImportDeclaration,
  ExportAssignment,
  SpreadAssignment,
  Identifier,
  PropertyAssignment,
  SourceFile,
} from 'ts-morph';
import { ts } from 'ts-morph';
import { analyseImportExportStatement } from '../../utils/analyseImportExportStatement';
import findVariableThroughFileImports from '../../utils/findVariableThroughFileImports';
import completeFileExtName from '../../utils/completeFileExtName';

/**
 * 解析组件定义的对象
 * 只可读取两种模式（以options举例）:
 * 1. props: useXXXOptions
 * 2. props: {...useXXXOptions, ...useXXXOptions}
 *
 * 第二种的只会摘取第一个对象
 */
function analysisDirectiveDefinedVariable(
  curr: PropertyAssignment,
  identifier: Identifier,
  imports: Record<string, string>,
  sourceFile: SourceFile,
): undefined | [string, string] {
  const isFirstKind = curr.getChildrenOfKind(ts.SyntaxKind.Identifier).length === 2;
  let variableName;
  if (isFirstKind) {
    variableName = curr.getLastChildByKind(ts.SyntaxKind.Identifier)?.getText().replace(/'"/g, '');
  } else {
    const object = curr.getLastChildByKind(ts.SyntaxKind.ObjectLiteralExpression);
    const firstPropsVariable = object?.getFirstChildByKind(ts.SyntaxKind.SpreadAssignment);
    variableName = (firstPropsVariable as SpreadAssignment)
      .getExpressionIfKind(ts.SyntaxKind.Identifier)
      ?.getText();
  }

  if (variableName) {
    const { path: filePath, variableName: realVariableName } = findVariableThroughFileImports(
      sourceFile,
      variableName,
    );

    return [realVariableName, filePath];
  }
}

export function analyseDirective(directiveInfo: ApiGeneratorExportedDirectives, project: Project) {
  const filePathWithExtName = completeFileExtName(directiveInfo.directiveDefinedFilePath);

  if (!filePathWithExtName) {
    throw new Error(
      `Cannot find file when analysis component begin: ${directiveInfo.directiveDefinedFilePath}`,
    );
  }

  const sourceFile = project.addSourceFileAtPath(filePathWithExtName);

  if (sourceFile) {
    const statements = sourceFile.getStatements();
    let imports: Record<string, string> = {};

    for (const statement of statements) {
      switch (statement.getKind()) {
        case ts.SyntaxKind.ImportDeclaration:
          imports = {
            ...imports,
            ...analyseImportExportStatement(statement as ImportDeclaration),
          };
          break;
        case ts.SyntaxKind.ExportAssignment:
          const callExpression = (statement as ExportAssignment).getExpressionIfKind(
            ts.SyntaxKind.CallExpression,
          );
          const isDefineComponent =
            callExpression?.getChildrenOfKind(ts.SyntaxKind.Identifier)?.[0].getText() ===
            'defineDirective';
          if (isDefineComponent) {
            const definedObject = callExpression?.getChildrenOfKind(
              ts.SyntaxKind.ObjectLiteralExpression,
            );
            definedObject[0].getChildrenOfKind(ts.SyntaxKind.PropertyAssignment).forEach(curr => {
              const identifier = curr.getChildrenOfKind(ts.SyntaxKind.Identifier)?.[0];
              if (identifier) {
                switch (identifier.getText()) {
                  case 'desc':
                    directiveInfo.desc =
                      curr
                        .getChildrenOfKind(ts.SyntaxKind.StringLiteral)?.[0]
                        ?.getText()
                        .trim()
                        .replace(/(^'|'$)/g, '') || '';
                    break;
                  case 'options':
                    const optionsRes = analysisDirectiveDefinedVariable(
                      curr,
                      identifier,
                      imports,
                      sourceFile,
                    );
                    if (optionsRes) {
                      [directiveInfo.optionsVariableName, directiveInfo.optionsVariableFilePath] =
                        optionsRes;
                    } else {
                      console.warn(
                        `Directive: ${directiveInfo.name}'s options cannot be analysis!`,
                      );
                    }
                    break;
                }
              }
            });
          }
          break;
      }
    }
  }

  return directiveInfo;
}
