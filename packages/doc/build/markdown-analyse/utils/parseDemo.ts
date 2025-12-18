import { escapeHtml, traverseContent } from './utils';
import path from 'path';
import fs from 'fs';

const gitDocBaseUrl = 'https://git.nevint.com/horizon-web/horizon-web/blob/feature/packages/doc/docs';

export default function (content: string, filePath: string, root: string) {
  const noCode = '--no-code.vue';
  const importScripts: string[] = [];
  let id = 0; // demo 的 id

  const output = traverseContent({
    startTag: '<!--element-demo:',
    endTag: ':element-demo-->',
    content,
    looping: ({ commentContent, output }) => {
      const componentPath = path.join(path.dirname(filePath), commentContent.trim());
      const componentName = `DemoComponent${id}`;
      if (commentContent.includes(noCode)) {
        output.push(`<template v-slot:source><${componentName} /></template>`);
      } else {
        const textContent = fs.readFileSync(componentPath, 'utf-8');
        const escaped = escapeHtml(textContent);
        let gitUrl = gitDocBaseUrl;
        const pathArr = componentPath.split('packages/doc/docs');
        if (pathArr && pathArr[1]) {
          gitUrl += pathArr[1];
        }
        output.push(
          `<template v-slot:gitUrl>${gitUrl}</template><template v-slot:source><${componentName} /></template><template v-slot:highlight><div>${escaped}</div></template>`,
        );
      }

      importScripts.push(`import ${componentName} from '${path.resolve(root, componentPath)}';`);
      // 重新计算下一次的位置
      id++;
    },
  });

  return {
    output,
    importScripts,
  };
}
