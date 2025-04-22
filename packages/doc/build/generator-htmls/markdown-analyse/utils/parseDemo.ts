import { traverseContent } from './utils';
import path from 'path';
import fs from 'fs';

export default function (content: string, filePath: string, root: string) {
  return traverseContent({
    startTag: '<!--element-demo:',
    endTag: ':element-demo-->',
    content,
    looping: ({ commentContent, output }) => {
      const componentPath = path.join(path.dirname(filePath), commentContent.trim());
      const textContent = fs.readFileSync(componentPath, 'utf-8');
      output.push(
        `<DemoViewer source="${encodeURIComponent(textContent)}" ${
          componentPath.includes('--no-code') ? 'no-code ' : ''
        }/>`,
      );
      // 重新计算下一次的位置
    },
  });
}
