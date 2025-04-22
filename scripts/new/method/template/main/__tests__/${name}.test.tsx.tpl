import { ${namespaceName} } from '..';
import { describe, expect, test } from 'vitest';

describe('${capitalName}.tsx', () => {
  test('basic', async () => {
    ${namespaceName}({});

    expect(document.body.querySelector('.n-${kebabName}')).not.eq(undefined);
  });
});
