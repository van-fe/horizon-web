import { describe, expect, it } from 'vitest';

describe('Vitest runtime', () => {
  it('runs with Bun', () => {
    expect(process.versions.bun).toBeDefined();
  });
});
