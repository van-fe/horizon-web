import mdContainer from 'markdown-it-container';
import type { default as MarkdownIt, Token } from 'markdown-it';
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
        const content = fs.readFileSync(path.resolve(__dirname, '../../demos/', m?.[1].trim()), 'utf-8');

        return `<demo-block source="${md.utils.escapeHtml(content)}" />`;
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
