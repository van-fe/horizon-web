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
    render(tokens: Token[], idx: number, _options: unknown, env: Record<string, unknown> = {}) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)\s*:::$/);

      if (tokens[idx].nesting === 1) {
        const demoPath = m?.[1]?.trim() || '';
        const docsRoot = path.resolve(__dirname, '../../');
        const markdownPath = typeof env.path === 'string' ? env.path : '';
        const localPath = markdownPath
          ? path.resolve(path.dirname(markdownPath), demoPath)
          : '';
        let fullPath = demoPath.startsWith('./') || demoPath.startsWith('../')
          ? localPath
          : path.resolve(docsRoot, 'demos', demoPath);

        // VitePress may expose `env.path` without the locale directory. Try
        // the localized source trees when the first relative resolution fails.
        if (!fs.existsSync(fullPath) && localPath) {
          const relativePath = path.relative(docsRoot, localPath);
          for (const locale of ['zh', 'en']) {
            const localizedPath = path.resolve(docsRoot, locale, relativePath);
            if (fs.existsSync(localizedPath)) {
              fullPath = localizedPath;
              break;
            }
          }
        }

        if (!fullPath || !fs.existsSync(fullPath)) {
          throw new Error(`Demo file not found: ${demoPath} (from ${markdownPath || 'docs root'})`);
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // 计算相对于 packages/docs 的路径，用于动态导入
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
