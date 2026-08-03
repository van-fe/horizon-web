import { escapeHtml, traverseContent } from './utils';
import path from 'path';
import fs from 'fs';

const gitDocBaseUrl = 'https://git.nevint.com/horizon-web/horizon-web/blob/feature/packages/docs/demos';

export default function (content: string, filePath: string, root: string) {
  const noCode = '--no-code.vue';
  const importScripts: string[] = [];
  let id = 0; // demo 的 id

  // 计算 demos 目录的路径
  // 如果 filePath 在 packages/docs/zh/demos/... 或 packages/docs/en/demos/...
  // 则 demos 目录在 packages/docs/demos/
  const docsRoot = path.resolve(root, 'packages/docs');
  const demosRoot = path.join(docsRoot, 'demos');

  const output = traverseContent({
    startTag: '<!--element-demo:',
    endTag: ':element-demo-->',
    content,
    looping: ({ commentContent, output }) => {
      // demo 路径是相对于 demos 目录的，例如: components/Empty/size.vue
      const componentPath = path.join(demosRoot, commentContent.trim());
      const componentName = `DemoComponent${id}`;
      if (commentContent.includes(noCode)) {
        output.push(`<template v-slot:source><${componentName} /></template>`);
      } else {
        const textContent = fs.readFileSync(componentPath, 'utf-8');
        const escaped = escapeHtml(textContent);
        let gitUrl = gitDocBaseUrl;
        const pathArr = componentPath.split('packages/docs/demos');
        if (pathArr && pathArr[1]) {
          gitUrl += pathArr[1].replace(/\\/g, '/');
        }
        output.push(
          `<template v-slot:gitUrl>${gitUrl}</template><template v-slot:source><${componentName} /></template><template v-slot:highlight><div>${escaped}</div></template>`,
        );
      }

      importScripts.push(`import ${componentName} from '${componentPath}';`);
      // 重新计算下一次的位置
      id++;
    },
  });

  return {
    output,
    importScripts,
  };
}
