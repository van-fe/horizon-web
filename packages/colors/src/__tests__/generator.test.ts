import { describe, expect, test } from 'vitest';
import { generator } from '../index';

describe('generator test', () => {
  test('generator success', () => {
    const colors = generator('#1890FF');

    expect(colors.toString()).eq(
      '#E6F7FF,#BAE7FF,#91D5FF,#69C0FF,#40A9FF,#1890FF,#096DD9,#0050B3,#003A8C,#002766'.toLowerCase(),
    );
  });
});
