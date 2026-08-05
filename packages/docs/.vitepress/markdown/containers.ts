import mdContainer from 'markdown-it-container';
import type { default as MarkdownIt } from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import path from 'path';
import fs from 'fs';

function getDocumentLocale(docsRoot: string, markdownPath: string) {
  const relativePath = path.relative(docsRoot, markdownPath).replace(/\\/g, '/');
  return relativePath === 'en' || relativePath.startsWith('en/') ? 'en' : 'zh';
}

function resolveReferencedFile(docsRoot: string, markdownPath: string, sourcePath: string) {
  const localPath = markdownPath
    ? path.resolve(path.dirname(markdownPath), sourcePath)
    : path.resolve(docsRoot, sourcePath);
  const fullPath =
    sourcePath.startsWith('./') || sourcePath.startsWith('../')
      ? localPath
      : path.resolve(docsRoot, 'demos', sourcePath);

  if (!fs.existsSync(fullPath) && markdownPath) {
    // Component pages historically use `./demos/file` while their auxiliary
    // sources live beside the component demos in the shared demos tree.
    const componentDemoPath = path.resolve(
      docsRoot,
      'demos/components',
      path.basename(markdownPath, path.extname(markdownPath)),
      path.basename(sourcePath),
    );
    if (fs.existsSync(componentDemoPath)) return componentDemoPath;

    const relativePath = path.relative(docsRoot, localPath);
    for (const locale of ['zh', 'en']) {
      const localizedPath = path.resolve(docsRoot, locale, relativePath);
      if (fs.existsSync(localizedPath)) return localizedPath;
    }
  }

  return fullPath;
}

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
        const fullPath = resolveReferencedFile(docsRoot, markdownPath, demoPath);

        if (!fullPath || !fs.existsSync(fullPath)) {
          throw new Error(`Demo file not found: ${demoPath} (from ${markdownPath || 'docs root'})`);
        }

        const content = fs.readFileSync(fullPath, 'utf-8');

        // 计算相对于 packages/docs 的路径，用于动态导入
        const relativePath = path.relative(docsRoot, fullPath).replace(/\\/g, '/');
        const locale = getDocumentLocale(docsRoot, markdownPath);

        return `<demo-block source="${md.utils.escapeHtml(content)}" path="${relativePath}" locale="${locale}" />`;
      }
      return '';
    },
  });

  md.use(mdContainer, 'code', {
    validate(params: string) {
      return params.trim().match(/^code\s*(.*)$/);
    },
    render(tokens: Token[], idx: number, _options: unknown, env: Record<string, unknown> = {}) {
      const m = tokens[idx].info.trim().match(/^code\s*(.*?)\s*:::$/);
      if (!m || tokens[idx].nesting !== 1) return '';

      const sourcePath = m[1]?.trim() || '';
      const docsRoot = path.resolve(__dirname, '../../');
      const markdownPath = typeof env.path === 'string' ? env.path : '';
      const fullPath = resolveReferencedFile(docsRoot, markdownPath, sourcePath);
      if (!sourcePath || !fs.existsSync(fullPath)) {
        throw new Error(`Code file not found: ${sourcePath} (from ${markdownPath || 'docs root'})`);
      }

      const TokenConstructor = tokens[idx].constructor as new (
        type: string,
        tag: string,
        nesting: number,
      ) => Token;
      const fence = new TokenConstructor('fence', 'code', 0);
      fence.content = fs.readFileSync(fullPath, 'utf-8');
      fence.info = path.extname(fullPath).slice(1) || 'text';
      fence.map = tokens[idx].map;
      return md.renderer.render([fence], md.options, env);
    },
  });
};
