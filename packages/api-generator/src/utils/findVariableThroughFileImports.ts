import type { SourceFile } from 'ts-morph';
import analysisFileElements from './analyseFileElements';
import * as path from 'path';
import completeFileExtName from './completeFileExtName';
import { ts } from 'ts-morph';

/**
 * 根据import引用关系，寻找变量的具体位置
 */
function findVariableThroughFileImports(
  sourceFile: SourceFile,
  variableName: string,
): {
  path: string;
  variableName: string;
} {
  const elements = analysisFileElements(sourceFile);

  if (elements.variables[variableName]) {
    const variable = elements.variables[variableName];

    if (variable) {
      const variableText = variable?.getText();

      if (variable.getKind() !== ts.SyntaxKind.Identifier) {
        return {
          path: sourceFile.getFilePath(),
          variableName,
        };
      } else if (elements.variables[variableText]) {
        return {
          path: sourceFile.getFilePath(),
          variableName: variableText,
        };
      } else if (elements.imports[variableText]) {
        const fullPath = path.resolve(
          sourceFile.getDirectoryPath(),
          elements.imports[variable.getText()],
        );
        const filePathWithExtName = completeFileExtName(fullPath);

        if (!filePathWithExtName) {
          throw new Error(`This file could not be found: ${fullPath}`);
        }

        const targetSourceFile = sourceFile.getProject().addSourceFileAtPath(filePathWithExtName);

        return findVariableThroughFileImports(targetSourceFile, variable.getText());
      }
    }

    return {
      path: '',
      variableName: '',
    };
  } else {
    let targetFilePath: string;

    try {
      targetFilePath = path.resolve(
        path.dirname(sourceFile.getFilePath()),
        elements.imports[variableName],
      );
    } catch (e) {
      console.warn(elements, variableName, sourceFile.getFilePath());
      throw new Error(
        `This variable (${variableName}) in (${sourceFile.getFilePath()}) may add @invisible tag. Please confirm your export component should be exported to use directly.`,
      );
    }

    const realFilePathWithExtName = completeFileExtName(targetFilePath);

    if (!realFilePathWithExtName) {
      throw new Error(`There is no files' basename such like ${targetFilePath}`);
    }

    const targetFileSourceFile = sourceFile
      .getProject()
      .addSourceFileAtPathIfExists(realFilePathWithExtName);

    if (!targetFileSourceFile) {
      throw new Error(`Cannot find file: ${targetFilePath}.ts(x)`);
    }

    return findVariableThroughFileImports(targetFileSourceFile, variableName);
  }
}

export default findVariableThroughFileImports;
