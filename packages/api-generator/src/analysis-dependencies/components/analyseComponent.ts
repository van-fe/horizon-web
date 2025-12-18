import type { ApiGeneratorExportedComponent } from '@aurora/shared';
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
 * 只可读取两种模式（以props举例）:
 * 1. props: useXXXProps
 * 2. props: {...useXXXProps, ...useXXXProps}
 *
 * 第二种的只会摘取第一个对象
 */
function analysisComponentDefinedVariable(
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

export function analyseComponent(componentInfo: ApiGeneratorExportedComponent, project: Project) {
  const filePathWithExtName = completeFileExtName(componentInfo.componentDefinedFilePath);

  if (!filePathWithExtName) {
    throw new Error(
      `Cannot find file when analysis component begin: ${componentInfo.componentDefinedFilePath}`,
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
            'defineComponent';
          if (isDefineComponent) {
            const definedObject = callExpression?.getChildrenOfKind(
              ts.SyntaxKind.ObjectLiteralExpression,
            );
            definedObject[0].getChildrenOfKind(ts.SyntaxKind.PropertyAssignment).forEach(curr => {
              const identifier = curr.getChildrenOfKind(ts.SyntaxKind.Identifier)?.[0];
              if (identifier) {
                switch (identifier.getText()) {
                  case 'desc':
                    componentInfo.desc =
                      curr
                        .getChildrenOfKind(ts.SyntaxKind.StringLiteral)?.[0]
                        ?.getText()
                        .trim()
                        .replace(/(^'|'$)/g, '') || '';
                    break;
                  case 'props':
                    const propsRes = analysisComponentDefinedVariable(
                      curr,
                      identifier,
                      imports,
                      sourceFile,
                    );
                    if (propsRes) {
                      [componentInfo.propsVariableName, componentInfo.propsVariableFilePath] =
                        propsRes;
                    } else {
                      console.warn(`Component: ${componentInfo.name}'s props cannot be analysed!`);
                    }
                    break;
                  case 'emits':
                    const emitsRes = analysisComponentDefinedVariable(
                      curr,
                      identifier,
                      imports,
                      sourceFile,
                    );
                    if (emitsRes) {
                      [componentInfo.emitsVariableName, componentInfo.emitsVariableFilePath] =
                        emitsRes;
                    } else {
                      console.warn(`Component: ${componentInfo.name}'s emits cannot be analysed!`);
                    }
                    break;
                  case 'slots':
                    const slotsRes = analysisComponentDefinedVariable(
                      curr,
                      identifier,
                      imports,
                      sourceFile,
                    );
                    if (slotsRes) {
                      [componentInfo.slotsVariableName, componentInfo.slotsVariableFilePath] =
                        slotsRes;
                    } else {
                      console.warn(`Component: ${componentInfo.name}'s slots cannot be analysed!`);
                    }
                    break;
                  case 'exposes':
                    const exposesRes = analysisComponentDefinedVariable(
                      curr,
                      identifier,
                      imports,
                      sourceFile,
                    );
                    if (exposesRes) {
                      [componentInfo.exposesVariableName, componentInfo.exposesVariableFilePath] =
                        exposesRes;
                    } else {
                      console.warn(
                        `Component: ${componentInfo.name}'s exposes cannot be analysed!`,
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

  return componentInfo;
}
