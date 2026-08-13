import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const treeSelectStyles = resolve(packageRoot, 'styles/components/tree-select');

describe('TreeSelect theme', () => {
  it('compiles the canonical renderer-neutral stylesheet', () => {
    const css = compile(resolve(treeSelectStyles, 'index.scss')).css;

    expect(css).toContain('.h-tree-select');
    expect(css).toContain('.h-tree-select__panel');
    expect(css).toContain('.h-tree-select-item');
    expect(css).toContain('.h-tree-select-panel');
    expect(css).toContain('.h-tree-select-search-panel');
    expect(css).toContain('.h-tree-select__values');
    expect(css).toContain('.h-tree-select__tag');
    expect(css).toContain('.h-tree-select__tag-remove');
    expect(css).toContain('.h-tree-select__summary');
  });

  it('supports native renderer DOM, focus visibility, disabled state, long content and motion preferences', () => {
    const itemCss = compile(resolve(treeSelectStyles, 'item.scss')).css;
    const panelCss = compile(resolve(treeSelectStyles, 'panel.scss')).css;

    expect(itemCss).toContain('.h-tree-select-item:is(button):not(.h-button)');
    expect(itemCss).toContain(':focus-visible');
    expect(itemCss).toContain('[aria-disabled=true]');
    expect(itemCss).toContain('overflow-wrap: anywhere');
    expect(itemCss).toContain('@media (prefers-reduced-motion: reduce)');
    const rootCss = compile(resolve(treeSelectStyles, 'index.scss')).css;
    expect(rootCss).toContain('.h-tree-select__tag-remove:focus-visible');
    expect(rootCss).toContain('.h-tree-select__tag-remove:disabled');
    expect(rootCss).toContain('.h-tree-select__tag[aria-disabled=true]');
    expect(rootCss).toContain('overflow-wrap: anywhere');
    const variables = readFileSync(resolve(treeSelectStyles, 'variables.scss'), 'utf8');
    expect(variables).toContain("mixins.css-variable('bg-tertiary')");
    expect(panelCss).toContain('max-width: min(100%, var(--h-tree-select-size-panel-max-inline))');
    expect(panelCss).toContain('min-width: min(100%, var(--h-tree-select-size-panel-min-width))');
  });

  it('publishes TreeSelect variables through shared foundations and package exports', () => {
    const foundations = readFileSync(resolve(packageRoot, 'styles/foundations.scss'), 'utf8');
    const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8')) as {
      exports: Record<string, string | object>;
    };

    expect(foundations).toContain("@use './components/tree-select/variables' as tree-select;");
    expect(foundations).toContain("function.flatten-variables(tree-select.$values, 'tree-select')");
    expect(packageJson.exports['./styles/tree-select']).toBe(
      './styles/components/tree-select/index.scss',
    );
    expect(packageJson.exports['./styles/tree-select-variables']).toBe(
      './styles/components/tree-select/variables.scss',
    );
  });
});
