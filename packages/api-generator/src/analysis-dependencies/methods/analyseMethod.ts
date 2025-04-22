import type { ApiGeneratorExportedMethod } from '@nio-fe/shared';
import type {
  Project,
  ImportDeclaration,
  ExportAssignment,
  SpreadAssignment,
  Identifier,
  PropertyAssignment,
  SourceFile,
  CallExpression,
  ShorthandPropertyAssignment,
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
 * 3. props (即省略写法）
 *
 * 第二种的只会摘取第一个对象
 */
function analysisMethodDefinedVariable(
  curr: PropertyAssignment | ShorthandPropertyAssignment,
  identifier: Identifier,
  imports: Record<string, string>,
  sourceFile: SourceFile,
): undefined | [string, string] {
  let variableName;

  if (curr.getKind() === ts.SyntaxKind.ShorthandPropertyAssignment) {
    variableName = identifier.getText();
  } else {
    const isFirstKind = curr.getChildrenOfKind(ts.SyntaxKind.Identifier).length === 2;
    if (isFirstKind) {
      variableName = curr
        .getLastChildByKind(ts.SyntaxKind.Identifier)
        ?.getText()
        .replace(/'"/g, '');
    } else {
      const object = curr.getLastChildByKind(ts.SyntaxKind.ObjectLiteralExpression);
      const firstPropsVariable = object?.getFirstChildByKind(ts.SyntaxKind.SpreadAssignment);
      variableName = (firstPropsVariable as SpreadAssignment)
        .getExpressionIfKind(ts.SyntaxKind.Identifier)
        ?.getText();
    }
  }

  if (variableName) {
    const { path: filePath, variableName: realVariableName } = findVariableThroughFileImports(
      sourceFile,
      variableName,
    );

    return [realVariableName, filePath];
  }
}

export function analyseMethod(methodInfo: ApiGeneratorExportedMethod, project: Project) {
  const filePathWithExtName = completeFileExtName(methodInfo.methodDefinedFilePath);
  let imports: Record<string, string> = {};
  let variables: Record<string, CallExpression> = {};
  let analysedDefinedMethod = false;
  let methodActuallyName = '';

  if (!filePathWithExtName) {
    throw new Error(
      `Cannot find file when analysis method begin: ${methodInfo.methodDefinedFilePath}`,
    );
  }

  function analyseDefinedMethod(statement: CallExpression) {
    const isDefineMethod =
      statement?.getChildrenOfKind(ts.SyntaxKind.Identifier)?.[0].getText() === 'defineMethod';
    if (isDefineMethod) {
      const definedObject = statement?.getFirstChildByKind(ts.SyntaxKind.ObjectLiteralExpression);
      definedObject
        ?.forEachChildAsArray()
        ?.filter(curr =>
          [ts.SyntaxKind.PropertyAssignment, ts.SyntaxKind.ShorthandPropertyAssignment].includes(
            curr.getKind(),
          ),
        )
        .forEach(curr => {
          const identifier = curr.getFirstChildByKind(ts.SyntaxKind.Identifier);
          if (identifier) {
            switch (identifier.getText()) {
              case 'desc':
                methodInfo.desc =
                  curr
                    .getChildrenOfKind(ts.SyntaxKind.StringLiteral)?.[0]
                    ?.getText()
                    .trim()
                    .replace(/(^'|'$)/g, '') || '';
                break;
              case 'options':
                const optionsRes = analysisMethodDefinedVariable(
                  curr as PropertyAssignment | ShorthandPropertyAssignment,
                  identifier,
                  imports,
                  sourceFile,
                );
                if (optionsRes) {
                  [methodInfo.optionsVariableName, methodInfo.optionsVariableFilePath] = optionsRes;
                } else {
                  console.warn(`Method: ${methodInfo.name}'s options cannot be analysed!`);
                }
                break;
              case 'methods':
                const methodsRes = analysisMethodDefinedVariable(
                  curr as PropertyAssignment | ShorthandPropertyAssignment,
                  identifier,
                  imports,
                  sourceFile,
                );
                if (methodsRes) {
                  [methodInfo.methodsVariableName, methodInfo.methodsVariableFilePath] = methodsRes;
                } else {
                  console.warn(`Method: ${methodInfo.name}'s options cannot be analysed!`);
                }
                break;
            }
          }
        });

      analysedDefinedMethod = true;
    }
  }

  const sourceFile = project.addSourceFileAtPath(filePathWithExtName);

  if (sourceFile) {
    const statements = sourceFile.getStatements();

    for (const statement of statements) {
      switch (statement.getKind()) {
        case ts.SyntaxKind.FunctionDeclaration:
          const functionName =
            statement.getChildrenOfKind(ts.SyntaxKind.Identifier)?.[0].getText() || '';

          if (functionName === methodInfo.methodExportedName && !methodActuallyName) {
            const actuallyDefined = statements.find(
              curr =>
                curr.getKind() === ts.SyntaxKind.FunctionDeclaration &&
                curr.getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier).getText() ===
                  functionName &&
                curr.forEachChildAsArray().some(curr => curr.getKind() === ts.SyntaxKind.Block),
            );

            if (actuallyDefined) {
              const actuallyDefinedMethodBlock = actuallyDefined
                .forEachChildAsArray()
                .find(curr => curr.getKind() === ts.SyntaxKind.Block);

              methodActuallyName =
                actuallyDefinedMethodBlock
                  ?.getLastChildByKind(ts.SyntaxKind.ReturnStatement)
                  ?.getFirstChildByKind(ts.SyntaxKind.CallExpression)
                  ?.getFirstChildByKind(ts.SyntaxKind.Identifier)
                  ?.getText() || '';
            }
          }
          break;
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
          analyseDefinedMethod(callExpression as CallExpression);
          break;
        case ts.SyntaxKind.VariableStatement:
          {
            const variableDeclaration = statement
              .getFirstChildByKind(ts.SyntaxKind.VariableDeclarationList)
              ?.getDeclarations()?.[0];
            const callExpression = variableDeclaration?.getFirstChildByKind(
              ts.SyntaxKind.CallExpression,
            );
            if (variableDeclaration && callExpression) {
              variables = {
                ...variables,
                [variableDeclaration.getFirstChildByKind(ts.SyntaxKind.Identifier)?.getText() ??
                '']: callExpression,
              };
            }
          }
          break;
      }
    }

    if (!analysedDefinedMethod) {
      if (variables[methodActuallyName]) {
        analyseDefinedMethod(variables[methodActuallyName]);
      }
    }
  }

  return methodInfo;
}
