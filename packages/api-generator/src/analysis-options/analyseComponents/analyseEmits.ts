import type { Project, PropertyAssignment, ArrowFunction } from 'ts-morph';
import type { ApiGeneratorAnalysedEmitType, ApiGeneratorExportedComponent } from '@aurora/utils';
import { ts } from 'ts-morph';
import analysisFileElements from '../../utils/analyseFileElements';
import checkInvisibleTagExits from '../../utils/checkInvisibleTagExist';
import analysisJsDocs from '../../utils/analyseJsDocs';
import completeFileExtName from '../../utils/completeFileExtName';

const ignoreEmitNames: string[] = [];

function analysisPropertyAssignment(
  property: PropertyAssignment,
): ApiGeneratorAnalysedEmitType | undefined {
  if (checkInvisibleTagExits(property.compilerNode)) {
    return undefined;
  }

  const emitName = property.getName().replaceAll(/['"]/g, '');
  const jsDoc = analysisJsDocs(property.compilerNode);

  if (ignoreEmitNames.includes(emitName)) {
    return undefined;
  }

  const res: ApiGeneratorAnalysedEmitType = {
    desc: jsDoc.comment,
    descLocales: jsDoc.locales,
    name: emitName,
    params: [],
    version: jsDoc.tags.version?.default,
  };

  // () => void 0,
  const arrowFunction = property.getChildrenOfKind(
    ts.SyntaxKind.ArrowFunction,
  )?.[0] as ArrowFunction;
  if (arrowFunction) {
    const parameters = arrowFunction.getParameters();
    for (const parameter of parameters) {
      const paramFieldName = parameter.getName().replace(/'"/, '');
      const desc = (jsDoc.tags.param || jsDoc.tags.params)?.[paramFieldName] || '';

      res.params.push({
        field: paramFieldName,
        value: parameter.getLastChild()?.getText() || '',
        desc,
        descLocales: jsDoc.tags.paramEn?.[paramFieldName]
          ? { en: jsDoc.tags.paramEn[paramFieldName] }
          : undefined,
      });
    }
  }

  // 暂未见到其他的emit声明方式，如果有的话会继续增加

  return res;
}

export default function analyseEmits(
  project: Project,
  componentInfo: ApiGeneratorExportedComponent,
): ApiGeneratorAnalysedEmitType[] {
  const emits: ApiGeneratorAnalysedEmitType[] = [];
  if (componentInfo.emitsVariableFilePath) {
    const filePathWithExtName = completeFileExtName(componentInfo.emitsVariableFilePath);

    if (!filePathWithExtName) {
      throw new Error(`This file cannot be found: ${componentInfo.emitsVariableFilePath}.ts(x)`);
    }

    const sourceFile = project.addSourceFileAtPathIfExists(filePathWithExtName);

    if (sourceFile) {
      const fileElements = analysisFileElements(sourceFile);

      if (fileElements.variables[componentInfo.emitsVariableName]) {
        for (const properties of fileElements.variables[
          componentInfo.emitsVariableName
        ]?.getChildrenOfKind(ts.SyntaxKind.PropertyAssignment) ?? []) {
          const emit = analysisPropertyAssignment(properties);
          emit && emits.push(emit);
        }
      }
    }
  }

  return emits;
}
