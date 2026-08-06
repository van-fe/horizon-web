import path from 'node:path';
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import autoComponentDocs, { AUTO_COMPONENT_DOCS_TITLE_MARKER } from './autoComponentDocs';

const require = createRequire(import.meta.url);
const vitepressEntry = require.resolve('vitepress');
const markdownItPath = require.resolve('markdown-it', { paths: [path.dirname(vitepressEntry)] });
const MarkdownIt = require(markdownItPath) as typeof import('markdown-it').default;

const demoRoot = path.resolve(__dirname, '../../en/demos');

describe('automatic component docs', () => {
  it('renders the grouped Layout APIs when there is no standalone Layout metadata', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const markdownPath = path.resolve(__dirname, '../../en/demos/components/Layout.md');

    const result = markdown.render('## CSS Grid Layout', { path: markdownPath });

    expect(result).toContain(
      `<h1 id="layout" tabindex="-1" ${AUTO_COMPONENT_DOCS_TITLE_MARKER}>Layout`,
    );
    expect(result).toContain(
      'Modern&nbsp;responsive&nbsp;layout&nbsp;based&nbsp;on&nbsp;CSS&nbsp;Grid.',
    );
    expect(result).toContain('Grid Api');
    expect(result).toContain(
      '<h3 id="grid-props" class="no-underline h3">Grid Props <a class="header-anchor" href="#grid-props"',
    );
    expect(result).toContain('GridItem Api');
    expect(result).toContain(
      '<h3 id="griditem-props" class="no-underline h3">GridItem Props <a class="header-anchor" href="#griditem-props"',
    );
    expect(result).toContain('Number&nbsp;of&nbsp;grid&nbsp;columns&nbsp;per&nbsp;row.');
    expect(result).not.toContain('<h1>Grid</h1>');
    expect(result).toContain('class="api-table-wrapper"');
    expect(result.lastIndexOf('GridItem Api')).toBeGreaterThan(result.indexOf('CSS Grid Layout'));
  });

  it('matches kebab-case directive pages and appends their API', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const markdownPath = path.resolve(__dirname, '../../en/demos/directives/v-click-outside.md');

    const result = markdown.render('## Basic\n\nDemo content.', { path: markdownPath });

    expect(result).toContain(
      `<h1 id="v-click-outside" tabindex="-1" ${AUTO_COMPONENT_DOCS_TITLE_MARKER}>`,
    );
    expect(result).toContain(
      'Invoke&nbsp;the&nbsp;specified&nbsp;function&nbsp;when&nbsp;clicking&nbsp;outside',
    );
    expect(result).toContain('ClickOutside Api');
    expect(result.lastIndexOf('ClickOutside Api')).toBeGreaterThan(result.indexOf('Demo content.'));
  });

  it('escapes component-like tags from definition descriptions', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const markdownPath = path.resolve(__dirname, '../../zh/demos/components/Container.md');

    const result = markdown.render('Demo content.', { path: markdownPath });

    expect(result).toContain('&lt;h-container&gt;');
    expect(result).not.toContain('<h-container>');
  });

  it('uses the method directory name and appends grouped APIs', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const markdownPath = path.resolve(__dirname, '../../en/demos/methods/MessageBox.md');

    const result = markdown.render('## Alert\n\nDemo content.', { path: markdownPath });

    expect(result).toContain(
      `<h1 id="messagebox" tabindex="-1" ${AUTO_COMPONENT_DOCS_TITLE_MARKER}>`,
    );
    expect(result).toContain('Alert Api');
    expect(result).toContain('Confirm Api');
    expect(result.lastIndexOf('Confirm Api')).toBeGreaterThan(result.indexOf('Demo content.'));
  });

  it('appends defined APIs after every component, directive, and method demo page', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const cases = (['components', 'directives', 'methods'] as const).flatMap(kind =>
      readdirSync(path.join(demoRoot, kind))
        .filter(file => file.endsWith('.md') && file !== 'Icon.md')
        .map(file => ({ kind, file })),
    );

    for (const { kind, file } of cases) {
      const result = markdown.render('Demo content.', {
        path: path.join(demoRoot, kind, file),
      });

      expect(result, `${kind}/${file} should have an injected title`).toContain(
        AUTO_COMPONENT_DOCS_TITLE_MARKER,
      );
      expect(result, `${kind}/${file} should have an injected description`).toMatch(
        /<p class="description">.+<\/p>/,
      );
      expect(
        result.lastIndexOf('class="api-table-wrapper"'),
        `${kind}/${file} should have API content after the demo`,
      ).toBeGreaterThan(result.indexOf('Demo content.'));
      expect(result).not.toContain('<p class="description">undefined</p>');
    }
  });

  it('keeps an authored page title instead of injecting a duplicate h1', () => {
    const markdown = new MarkdownIt().use(autoComponentDocs);
    const markdownPath = path.resolve(__dirname, '../../en/demos/components/AudioPlayer.md');

    const result = markdown.render('# AudioPlayer\n\nManual introduction.', { path: markdownPath });

    expect(result.match(/<h1/g)).toHaveLength(1);
    expect(result).not.toContain(AUTO_COMPONENT_DOCS_TITLE_MARKER);
    expect(result).toContain('AudioPlayer Api');
  });
});
