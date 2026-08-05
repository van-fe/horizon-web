import path from 'node:path';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import autoComponentDocs from './autoComponentDocs';

const require = createRequire(import.meta.url);
const vitepressEntry = require.resolve('vitepress');
const markdownItPath = require.resolve('markdown-it', { paths: [path.dirname(vitepressEntry)] });
const MarkdownIt = require(markdownItPath) as typeof import('markdown-it').default;

describe('automatic component docs', () => {
  it('renders the grouped Layout APIs when there is no standalone Layout metadata', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const markdownPath = path.resolve(__dirname, '../../en/demos/components/Layout.md');

    const result = markdown.render('## CSS Grid Layout', { path: markdownPath });

    expect(result).toContain('Grid Api');
    expect(result).toContain('Grid Props');
    expect(result).toContain('GridItem Api');
    expect(result).toContain('GridItem Props');
    expect(result).toContain('Number&nbsp;of&nbsp;grid&nbsp;columns&nbsp;per&nbsp;row.');
    expect(result).not.toContain('<h1>Grid</h1>');
  });

  it.each(['en', 'zh'])('keeps explicit H1 headings for Icon and Layout in %s docs', locale => {
    for (const component of ['Icon', 'Layout']) {
      const markdownPath = path.resolve(
        __dirname,
        `../../${locale}/demos/components/${component}.md`,
      );
      const source = readFileSync(markdownPath, 'utf8');

      expect(source).toMatch(new RegExp(`^# ${component}$`, 'm'));
    }
  });
});
