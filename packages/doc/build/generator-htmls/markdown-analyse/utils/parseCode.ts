import { traverseContent } from './utils';
import path from 'path';
import fs from 'fs';

export default function (content: string, filePath: string, root: string) {
  return traverseContent({
    startTag: '<!--code-path:',
    endTag: ':code-path-->',
    content,
    looping: ({ commentContent, output }) => {
      const codeFilePath = path.join(path.dirname(filePath), commentContent.trim());
      const textContent = fs.readFileSync(codeFilePath, 'utf-8');

      output.push(
        `<CodeViewer ext="${path.extname(codeFilePath).replace('.', '')}" source="${encodeURIComponent(textContent)}" />`,
      );
    },
  });
}
