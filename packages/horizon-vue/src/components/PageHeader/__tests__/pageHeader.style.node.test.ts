import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';
import { testScssOptions } from '~/__tests__/sass-options';

describe('PageHeader style entry', () => {
  it('loads the shared Theme component and variables', () => {
    const component = compile(resolve(__dirname, '../src/style/index.scss'), testScssOptions).css;
    const foundations = compile(
      resolve(__dirname, '../../../../../theme/styles/foundations.scss'),
      testScssOptions,
    ).css;

    expect(component).toContain('.h-page-header');
    expect(component).toContain('@media (width <= 480px)');
    expect(foundations).toContain('--h-page-header-size-title-max-width: 480px');
  });
});
