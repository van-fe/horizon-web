import { ${namespaceName} } from '..';
import { describe, expect, test } from 'vitest';

describe('${capitalName}.tsx', () => {
  test('basic', async () => {
    ${namespaceName}({});

    expect(document.body.querySelector('.h-${kebabName}')).not.eq(undefined);
  });
});
