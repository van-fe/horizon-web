import type { ApiGeneratorExportedPluginType } from '@aurora/shared';
import type { ExportDeclaration } from 'ts-morph';

export function analyseExportedTypes(
  statement: ExportDeclaration,
  mainComponentName: string,
  path: string,
  dirName: string,
) {
  const exportedTypes: ApiGeneratorExportedPluginType[] = [];

  if (!statement.getText().match(/^export type/)) {
    return exportedTypes;
  }

  const namedExports = statement
    .getNamedExports()
    .filter(exports => /^N[A-Z]/.test(exports.getText()));

  namedExports &&
    exportedTypes.push({
      dirName,
      mainPluginName: mainComponentName,
      isComponent: true,
      path,
      types: namedExports.map(namedExport => namedExport.getText()),
    });

  return exportedTypes;
}
