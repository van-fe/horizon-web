import type { Project, PropertyAssignment, AsExpression } from 'ts-morph';
import { ts } from 'ts-morph';
import type { FileElements } from '../../utils/analyseFileElements';
import analysisFileElements from '../../utils/analyseFileElements';
import checkInvisibleTagExits from '../../utils/checkInvisibleTagExist';
import completeFileExtName from '../../utils/completeFileExtName';
import type { ApiGeneratorAnalysedOptionType, ApiGeneratorExportedMethod } from '@aurora/utils';
import analyseJsDocs from '../../utils/analyseJsDocs';
import { analyseFunctionExpression } from '../../utils/analysisType/analyseFunction';

function analysisPropertyAssignment(
  property: PropertyAssignment,
  fileElements: FileElements,
): ApiGeneratorAnalysedOptionType | undefined {
  if (checkInvisibleTagExits(property.compilerNode)) {
    return undefined;
  }

  const jsDoc = analyseJsDocs(property.compilerNode);

  const res: ApiGeneratorAnalysedOptionType = {
    default: '',
    desc: jsDoc.comment,
    name: property.getName(),
    required: false,
    type: '',
    baseType: '',
    deprecated: jsDoc.tags.deprecated?.default,
    version: jsDoc.tags.version?.default,
    options: [],
  };

  try {
    property.getChildrenOfKind(ts.SyntaxKind.ObjectLiteralExpression)[0].forEachChild(object => {
      switch (object.getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getText()) {
        case 'default':
          const lastChild = object.getLastChild();
          if (lastChild) {
            switch (lastChild.getKind()) {
              case ts.SyntaxKind.PropertyAccessExpression:
                const identifier = lastChild.getFirstChild();
                const value = identifier?.getSymbol()?.getValueDeclaration();
                switch (value?.getKind()) {
                  case ts.SyntaxKind.EnumDeclaration:
                    const def = lastChild.getLastChild()?.getType().getLiteralValue();
                    if (typeof def === 'string') {
                      res.default = `'${def}'`;
                    } else if (def !== undefined) {
                      res.default = def.toString();
                    }
                    break;
                }
                break;
              // string | number | object
              default:
                res.default = object.getLastChild()?.getText() || '';
                break;
            }
          }
          break;
        case 'required':
          res.required = object.getLastChild()?.getText() === 'true' || false;
          break;
        case 'type':
          const statement = object.getLastChild();
          switch (statement?.getKind()) {
            // String
            case ts.SyntaxKind.Identifier:
              res.type = statement?.getText().toLowerCase();
              res.baseType = res.type;
              break;
            // [String, Number]
            case ts.SyntaxKind.ArrayLiteralExpression:
              res.type = statement
                ?.getChildrenOfKind(ts.SyntaxKind.SyntaxList)?.[0]
                .getChildrenOfKind(ts.SyntaxKind.Identifier)
                .map(curr => curr.getText().toLowerCase())
                .join(' | ');
              res.baseType = res.type;
              break;
            // as OptionType<xxx>
            case ts.SyntaxKind.AsExpression:
              const propTypeDefined = statement?.getChildrenOfKind(
                ts.SyntaxKind.TypeReference,
              )?.[0];
              res.baseType = (statement as AsExpression).getExpression().getText().toLowerCase();

              propTypeDefined?.forEachChild(node => {
                switch (node.getKind()) {
                  // OptionType<'a' | 'b' | 'c'>
                  case ts.SyntaxKind.UnionType:
                    res.type = node.getText();
                    res.options = node
                      .getChildrenOfKind(ts.SyntaxKind.LiteralType)
                      .map(curr => curr.getText().replace(/['"]/g, ''));
                    break;
                  // OptionType<SomeTypeOrEnum>
                  case ts.SyntaxKind.TypeReference:
                    // 检查 enum
                    if (fileElements.enums[node.getText()]) {
                      res.options = fileElements.enums[node.getText()].map((curr, index) => {
                        // Large = 'large'
                        if (curr.getChildCount() > 1) {
                          return curr.getLastChild()?.getText().replace(/['"]/g, '') || '';
                        } else {
                          return index; // enum 没有指定数值时，按 index = 0 开始取值
                        }
                      });
                      res.type = res.options.join(' | ');
                    }
                    // 检查 variable
                    if (fileElements.variables[node.getText()]) {
                      res.type = fileElements.variables[node.getText()]!.getText();
                    }
                    // 检查 type
                    if (fileElements.types[node.getText()]) {
                      res.type = fileElements.types[node.getText()].getText();
                    }
                    break;
                  case ts.SyntaxKind.FunctionType:
                  case ts.SyntaxKind.ArrowFunction:
                    res.type = node.getText();
                    res.params = analyseFunctionExpression(node, jsDoc, fileElements).params;
                    break;
                }
              });
              break;
          }
          break;
      }
    });
  } catch (e) {
    console.error(e);
    debugger;
  }

  return res;
}

export default function analyseOptions(
  project: Project,
  methodInfo: ApiGeneratorExportedMethod,
): ApiGeneratorAnalysedOptionType[] {
  const options: ApiGeneratorAnalysedOptionType[] = [];
  if (methodInfo.optionsVariableFilePath) {
    const filePathWithExtName = completeFileExtName(methodInfo.optionsVariableFilePath);

    if (!filePathWithExtName) {
      throw new Error(`This file cannot be found: ${methodInfo.optionsVariableFilePath}.ts(x)`);
    }

    const sourceFile = project.addSourceFileAtPathIfExists(filePathWithExtName);

    if (sourceFile) {
      const fileElements = analysisFileElements(sourceFile);

      if (fileElements.variables[methodInfo.optionsVariableName]) {
        const variable = fileElements.variables[methodInfo.optionsVariableName];

        if (variable) {
          // 1. defineXXX({})
          if (variable.getKind() === ts.SyntaxKind.ObjectLiteralExpression) {
            for (const properties of variable.getChildrenOfKind(ts.SyntaxKind.PropertyAssignment)) {
              const option = analysisPropertyAssignment(properties, fileElements);
              option && options.push(option);
            }
          } else if (variable.getKind() === ts.SyntaxKind.ArrowFunction) {
            // 2. defineXXX(() => true)
            const rawVariable =
              fileElements.variablesWithRawDeclaration[methodInfo.optionsVariableName];
            const jsDoc = analyseJsDocs(rawVariable.compilerNode);

            options.push({
              name: '-',
              desc: jsDoc.comment,
              type: variable.getText(),
              baseType: 'function',
              options: [],
              required: true,
              default: '',
              params: analyseFunctionExpression(variable.getParent(), jsDoc, fileElements).params,
            });
          }
        }
      }
    }
  }

  return options;
}
