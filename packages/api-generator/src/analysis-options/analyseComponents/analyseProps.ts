import type { Project, PropertyAssignment, AsExpression, Node } from 'ts-morph';
import type { ApiGeneratorAnalysedPropType, ApiGeneratorExportedComponent } from '@aurora/utils';
import { ts } from 'ts-morph';
import type { FileElements } from '../../utils/analyseFileElements';
import analysisFileElements from '../../utils/analyseFileElements';
import checkInvisibleTagExits from '../../utils/checkInvisibleTagExist';
import completeFileExtName from '../../utils/completeFileExtName';
import analysisJsDocs from '../../utils/analyseJsDocs';
import lowerFirst from 'lodash/lowerFirst';

function analysisPropertyAssignment(
  property: PropertyAssignment,
  fileElements: FileElements,
): ApiGeneratorAnalysedPropType | undefined {
  if (checkInvisibleTagExits(property.compilerNode)) {
    return undefined;
  }

  const jsDoc = analysisJsDocs(property.compilerNode);

  const res: ApiGeneratorAnalysedPropType = {
    default: '',
    desc: jsDoc.comment,
    name: property.getName(),
    required: false,
    deprecated: jsDoc.tags.deprecated?.default,
    version: jsDoc.tags.version?.default,
    type: '',
    baseType: '',
    options: [],
  };

  try {
    property.getChildrenOfKind(ts.SyntaxKind.ObjectLiteralExpression)?.[0]?.forEachChild(object => {
      const children: Node[] = object.forEachChildAsArray();

      if (children.length < 2) return;

      const identifier = children[0];
      const announcement = children.at(-1)!;

      switch (identifier.getText()) {
        case 'default':
          if (announcement) {
            switch (announcement.getKind()) {
              case ts.SyntaxKind.PropertyAccessExpression:
                const identifier = announcement.getFirstChild();
                const value = identifier?.getSymbol()?.getValueDeclaration();
                switch (value?.getKind()) {
                  case ts.SyntaxKind.EnumDeclaration:
                    const def = announcement.getLastChild()?.getType().getLiteralValue();
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
          res.required = announcement.getText() === 'true' || false;
          break;
        case 'type':
          switch (announcement?.getKind()) {
            // String
            case ts.SyntaxKind.Identifier:
              res.type = lowerFirst(announcement?.getText());
              res.baseType = res.type;
              break;
            // [String, Number]
            case ts.SyntaxKind.ArrayLiteralExpression:
              res.type = announcement
                ?.getChildrenOfKind(ts.SyntaxKind.SyntaxList)?.[0]
                .getChildrenOfKind(ts.SyntaxKind.Identifier)
                .map(curr => lowerFirst(curr.getText()))
                .join(' | ');
              res.baseType = res.type;
              break;
            // xxx as PropType<xxx>
            case ts.SyntaxKind.AsExpression:
              const announcementChildren = announcement.forEachChildAsArray();

              const baseType = announcementChildren[0];
              const typeReference = announcementChildren[1];

              res.baseType =
                baseType.getKind() === ts.SyntaxKind.ArrayLiteralExpression
                  ? baseType
                      .forEachChildAsArray()
                      .map(curr => curr.getText().toLowerCase())
                      .join(' | ')
                  : baseType.getText().toLowerCase();

              typeReference?.forEachChild(node => {
                switch (node.getKind()) {
                  // PropType<'a' | 'b' | 'c'>
                  case ts.SyntaxKind.UnionType:
                    res.type = node.getText();
                    res.options = node
                      .getChildrenOfKind(ts.SyntaxKind.LiteralType)
                      .map(curr => curr.getText().replace(/['"]/g, ''));
                    break;
                  // PropType<SomeTypeOrEnum>
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
                    } else if (fileElements.variables[node.getText()]) {
                      res.type = fileElements.variables[node.getText()]!.getText();
                    } else if (fileElements.types[node.getText()]) {
                      res.type = fileElements.types[node.getText()].getText();
                    } else {
                      res.type = node.getText();
                    }
                    break;
                  default:
                    res.type = node.getText();
                }
              });
              break;
          }
          break;
      }
    });
  } catch (e) {
    console.error(e);
    
  }

  return res;
}

export default function analyseProps(
  project: Project,
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedPropType[] {
  const props: ApiGeneratorAnalysedPropType[] = [];
  if (componentInfo.propsVariableFilePath) {
    const filePathWithExtName = completeFileExtName(componentInfo.propsVariableFilePath);

    if (!filePathWithExtName) {
      throw new Error(`This file cannot be found: ${componentInfo.propsVariableFilePath}.ts(x)`);
    }

    const sourceFile = project.addSourceFileAtPathIfExists(filePathWithExtName);

    if (sourceFile) {
      const fileElements = analysisFileElements(sourceFile);

      if (fileElements.variables[componentInfo.propsVariableName]) {
        for (const properties of fileElements.variables[
          componentInfo.propsVariableName
        ]?.getChildrenOfKind(ts.SyntaxKind.PropertyAssignment) ?? []) {
          const prop = analysisPropertyAssignment(properties, fileElements);
          prop && props.push(prop);
        }
      }
    }
  }

  return props;
}
