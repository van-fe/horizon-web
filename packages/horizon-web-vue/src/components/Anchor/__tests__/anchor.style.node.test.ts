import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, test } from 'vitest';
import { testScssOptions } from '~/__tests__/sass-options';

describe('Anchor styles', () => {
  test('keeps its presentation above contextual link styles', () => {
    const css = compile(resolve(__dirname, '../src/style/index.scss'), testScssOptions).css;

    // Two component classes outrank contextual element rules such as `.vp-doc a`.
    expect(css).toContain('.h-anchor__link-title-txt.h-anchor__link-title-txt {');
    expect(css).toContain('font-weight: inherit;');
    expect(css).toContain('text-underline-offset: auto;');
    expect(css).toContain(
      '.h-anchor__link-title-txt.h-anchor__link-title-txt:hover, .h-anchor__link-title-txt.h-anchor__link-title-txt:active {',
    );
  });
});
