import mdContainer from 'markdown-it-container';
import type { default as MarkdownIt } from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import path from 'path';
import fs from 'fs';

export default (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)\s*:::$/);

      if (tokens[idx].nesting === 1) {
        const demoPath = m?.[1]?.trim() || '';
        const fullPath = path.resolve(__dirname, '../../demos/', demoPath);
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // 计算相对于 packages/docs 的路径，用于动态导入
        // VitePress 会从项目根目录解析，所以需要相对于 packages/docs
        const docsRoot = path.resolve(__dirname, '../../');
        const relativePath = path.relative(docsRoot, fullPath).replace(/\\/g, '/');

        return `<demo-block source="${md.utils.escapeHtml(content)}" path="${relativePath}" />`;
      }
      return '';
    },
  });

  md.use(mdContainer, 'code', {
    validate(params: string) {
      return params.trim().match(/^code\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^code\s*(.*?)\s*:::$/);
      if (m) {
        return `<code-block src="${m?.[1]}" />`;
      } else {
        return '';
      }
    },
  });
};
