import type { ImportDeclaration, ExportDeclaration, Statement } from 'ts-morph';
import { ts } from 'ts-morph';

function isImportDeclaration(statement: Statement): statement is ImportDeclaration {
  return statement.getKind() === ts.SyntaxKind.ImportDeclaration;
}

function isExportDeclaration(statement: Statement): statement is ImportDeclaration {
  return statement.getKind() === ts.SyntaxKind.ExportDeclaration;
}

export function analyseImportExportStatement(statement: ImportDeclaration | ExportDeclaration) {
  const imports: Record<string, string> = {};

  if (isImportDeclaration(statement)) {
    const exportedList = statement.getImportClause()?.getNamedBindings()?.getChildren() || [];

    const importPath = statement.getModuleSpecifier().getText().replace(/['"]/g, '');

    // import A from 'path'
    if (exportedList.length === 0) {
      const importClauseName = statement.getImportClause()?.getText();
      importClauseName && (imports[importClauseName] = importPath);
    } else {
      // import {A, B} from 'path'
      for (const exported of exportedList) {
        for (const identifier of exported.getChildren()) {
          const exportedVars = identifier.getChildren();
          // import {A} from 'path'
          if (exportedVars.length === 1) {
            imports[exportedVars[0].getText()] = importPath;
          } else if (exportedVars.length > 1) {
            // import {A as Aa} from 'path'
            imports[exportedVars[exportedVars.length - 1].getText()] = importPath;
          }
        }
      }
    }
  } else if (isExportDeclaration(statement)) {
    // todo:: analysis export statements
    // export {A, B as C} from 'path'
    // const exportedList = statement.getNamedExports();
    //
    // for (const exported of exportedList) {
    //   // imports[];
    // }
  }

  return imports;
}
