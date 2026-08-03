import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const style = readFileSync(resolve(__dirname, '../src/style/index.scss'), 'utf8');
const variables = readFileSync(resolve(__dirname, '../src/style/variables.scss'), 'utf8');

describe('LicensePlateInput styles', () => {
  test('keeps the new-energy cell the same width as the other cells', () => {
    const newEnergyRules = style.match(
      /@include mixins\.m\('new-energy'\) \{([\s\S]*?)\n    \}/,
    )?.[1];

    expect(newEnergyRules).toBeDefined();
    expect(newEnergyRules).not.toContain('width:');
    expect(variables).not.toMatch(/new-energy-(?:small|medium|large)/);
  });
});
