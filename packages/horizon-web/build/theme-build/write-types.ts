import { snakeCase } from '@aurora/shared';
import { styleRoot } from '@aurora/shared/plugins';
import * as fs from 'fs';
import { resolve } from 'path';

export default function (sumVariables: Record<string, string>) {
  let typesContent = 'export interface ThemeType {\n';

  Object.entries(sumVariables).forEach(([name]) => {
    typesContent += `  ${snakeCase(name.replace(/^--n-/, ''))}?: string;\n`;
  });

  typesContent += '}';

  fs.writeFileSync(resolve(styleRoot, 'theme-types.ts'), typesContent, 'utf-8');
}
