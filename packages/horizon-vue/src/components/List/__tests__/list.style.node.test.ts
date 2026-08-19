import { compile } from 'sass';
import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { testScssOptions } from '~/__tests__/sass-options';

describe('List shared style', () => {
  it('compiles the canonical footer selector and semantic border variable', () => {
    const componentCss = compile(
      resolve(__dirname, '../src/style/index.scss'),
      testScssOptions,
    ).css;
    const foundationsCss = compile(
      resolve(__dirname, '../../../../../theme/styles/foundations.scss'),
      testScssOptions,
    ).css;

    expect(componentCss).toContain('.h-list__footer');
    expect(componentCss).toContain('border-top: var(--h-list-border)');
    expect(foundationsCss).toContain('--h-list-border:');
  });
});
