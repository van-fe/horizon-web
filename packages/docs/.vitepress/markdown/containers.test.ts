import path from 'node:path';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import containers from './containers';

const require = createRequire(import.meta.url);
const vitepressEntry = require.resolve('vitepress');
const markdownItPath = require.resolve('markdown-it', { paths: [path.dirname(vitepressEntry)] });
const MarkdownIt = require(markdownItPath) as typeof import('markdown-it').default;

describe('code container', () => {
  it('renders an external source file as a highlighted fence', () => {
    const markdown = new MarkdownIt().use(containers);
    const markdownPath = path.resolve(__dirname, '../../en/demos/components/Tabs.md');

    const result = markdown.render(':::code ./demos/design-token.scss :::', {
      path: markdownPath,
    });

    expect(result).toContain('<code class="language-scss">');
    expect(result).toContain('--h-tabs-height--underline--line');
    expect(result).not.toContain('<code-block');
  });

  it('fails with the referencing document in the error message', () => {
    const markdown = new MarkdownIt().use(containers);
    const markdownPath = path.resolve(__dirname, '../../en/missing.md');

    expect(() => markdown.render(':::code ./missing.ts :::', { path: markdownPath })).toThrow(
      `Code file not found: ./missing.ts (from ${markdownPath})`,
    );
  });
});
