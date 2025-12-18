import type { OneDeepRecordType } from './utils';
import fs from 'fs';
import { resolve } from 'path';
import { styleRoot } from '@aurora/utils/plugins';

export default function (tokensTree: OneDeepRecordType) {
  const basic = tokensTree.basic;
  const element = tokensTree.element;

  const basicContent = `export default ${JSON.stringify(basic, null, 2)};\n`;
  const elementContent = `export default ${JSON.stringify(element, null, 2)};\n`;

  fs.writeFileSync(resolve(styleRoot, 'basicTokens.ts'), basicContent, 'utf-8');
  fs.writeFileSync(resolve(styleRoot, 'elementTokens.ts'), elementContent, 'utf-8');
}
