import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const stylesRoot = resolve(__dirname, '..');

describe('accessibility styles', () => {
  it('ships the shared focus ring through the on-demand base stylesheet', () => {
    const css = compile(resolve(stylesRoot, 'base.scss')).css;

    expect(css).toContain('[data-focus-visible-proxy]');
    expect(css).toContain('[data-focus-visible-inset]');
    expect(css).toContain('box-shadow: 0 0 0 2px var(--h-border-focused);');
    expect(css).not.toContain('var(--h-border-brand-press)');
    expect(css).toContain('@media (forced-colors: active)');
  });

  it('keeps accessibility last in both the generated index and its generator', () => {
    const styleIndex = readFileSync(resolve(stylesRoot, 'index.scss'), 'utf8').trim();
    const buildIndex = readFileSync(resolve(stylesRoot, '../../build/build-index.ts'), 'utf8');

    expect(styleIndex.endsWith("@forward './accessibility';")).toBe(true);
    expect(buildIndex).toContain("@forward './accessibility';");
  });
});
