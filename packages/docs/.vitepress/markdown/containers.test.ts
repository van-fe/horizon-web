import path from 'node:path';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import containers from './containers';

const require = createRequire(import.meta.url);
const vitepressEntry = require.resolve('vitepress');
const markdownItPath = require.resolve('markdown-it', { paths: [path.dirname(vitepressEntry)] });
const MarkdownIt = require(markdownItPath) as typeof import('markdown-it').default;

describe('demo container', () => {
  it('adds the document locale to the demo frame', () => {
    const markdown = new MarkdownIt().use(containers);
    const markdownPath = path.resolve(__dirname, '../../en/demos/components/Button.md');

    const result = markdown.render(
      '## Basic `type`\n\nChoose a semantic type for the action.\n\n:::demo components/Button/basic.vue :::',
      { path: markdownPath },
    );

    expect(result).toContain('locale="en"');
    expect(result).toContain('path="demos/components/Button/basic.vue"');
    expect(result).not.toContain('title="Basic type"');
  });

  it('defaults documents outside the English tree to Chinese', () => {
    const markdown = new MarkdownIt().use(containers);
    const markdownPath = path.resolve(__dirname, '../../zh/demos/components/Button.md');

    const result = markdown.render('## 基础用法\n\n:::demo components/Button/basic.vue :::', {
      path: markdownPath,
    });

    expect(result).toContain('locale="zh"');
  });
});

describe('code container', () => {
  it('renders an external source file as a highlighted fence', () => {
    const markdown = new MarkdownIt().use(containers);
    const markdownPath = path.resolve(__dirname, '../../en/demos/components/Tabs.md');

    const result = markdown.render(':::code ./demos/design-token.scss :::', {
      path: markdownPath,
    });

    expect(result).toContain('<code class="language-scss">');
    expect(result).toContain('--h-tabs-size-underline-line-height');
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
