import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';
import { testScssOptions } from '~/__tests__/sass-options';

describe('Panels shared style', () => {
  it('compiles the Vue proxy and shared foundations', () => {
    const component = compile(resolve(__dirname, '../src/style/index.scss'), testScssOptions).css;
    const foundations = compile(
      resolve(__dirname, '../../../../../theme/styles/foundations.scss'),
      testScssOptions,
    ).css;

    expect(component).toContain('.h-panels');
    expect(component).toContain('aurora-panels-enter-left');
    expect(foundations).toContain(':root');
  });
});
