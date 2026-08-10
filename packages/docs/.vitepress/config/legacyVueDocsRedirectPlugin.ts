import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

interface RedirectEntry {
  fileName: string;
  target: string;
}

function collectMarkdownFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.resolve(root, entry.name);
    if (entry.isDirectory()) return collectMarkdownFiles(entryPath);
    return entry.name.endsWith('.md') ? [entryPath] : [];
  });
}

export function redirectEntries(docsRoot: string): RedirectEntry[] {
  return [
    { localeRoot: path.resolve(docsRoot, 'zh/vue'), oldPrefix: 'demos', targetPrefix: '/vue' },
    {
      localeRoot: path.resolve(docsRoot, 'en/vue'),
      oldPrefix: 'en/demos',
      targetPrefix: '/en/vue',
    },
  ].flatMap(({ localeRoot, oldPrefix, targetPrefix }) =>
    collectMarkdownFiles(localeRoot).map(file => {
      const relativePath = path.relative(localeRoot, file).replace(/\\/g, '/').replace(/\.md$/, '');
      return {
        fileName: `${oldPrefix}/${relativePath}.html`,
        target: `${targetPrefix}/${relativePath}`,
      };
    }),
  );
}

export function redirectHtml(target: string): string {
  const encodedTarget = JSON.stringify(target);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><script>location.replace(${encodedTarget}+location.search+location.hash)</script></head><body><a href="${target}">Redirecting…</a></body></html>`;
}

export function legacyVueDocsRedirectPlugin(base: string): Plugin {
  const docsRoot = path.resolve(__dirname, '../..');
  const normalizedBase = base === '/' ? '' : `/${base.replace(/^\/+|\/+$/g, '')}`;

  return {
    name: 'horizon-legacy-vue-docs-redirects',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url || '/', 'http://horizon.local');
        const pathname =
          !normalizedBase ||
          url.pathname === normalizedBase ||
          url.pathname.startsWith(`${normalizedBase}/`)
            ? url.pathname.slice(normalizedBase.length) || '/'
            : url.pathname;
        const target = pathname.startsWith('/en/demos/')
          ? pathname.replace('/en/demos/', '/en/vue/')
          : pathname.startsWith('/demos/')
            ? pathname.replace('/demos/', '/vue/')
            : undefined;
        if (!target) return next();
        response.statusCode = 302;
        response.setHeader('Location', `${normalizedBase}${target}${url.search}${url.hash}`);
        response.end();
      });
    },
    generateBundle() {
      redirectEntries(docsRoot).forEach(entry => {
        const target = `${normalizedBase}${entry.target}` || '/';
        this.emitFile({
          type: 'asset',
          fileName: entry.fileName,
          source: redirectHtml(target),
        });
      });
    },
  };
}
