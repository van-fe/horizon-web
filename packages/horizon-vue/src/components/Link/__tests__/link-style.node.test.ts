import { compile } from 'sass';
import { describe, expect, test } from 'vitest';
import { resolve } from 'node:path';
import { testScssOptions } from '~/__tests__/sass-options';

describe('Link styles', () => {
  test('keeps its presentation above contextual link styles', () => {
    const css = compile(resolve(__dirname, '../src/style/index.scss'), testScssOptions).css;

    // Two component classes outrank contextual element rules such as `.vp-doc a`.
    expect(css).toContain('.h-link.h-link {');
    expect(css).toContain('.h-link.h-link--primary {');
    expect(css).toContain('.h-link__anchor.h-link__anchor {');
    expect(css).toContain('font-weight: inherit;');
    expect(css).toContain('text-underline-offset: auto;');
  });
});
