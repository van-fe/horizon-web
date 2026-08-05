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

  test('limits compact typography to the empty new-energy placeholder', () => {
    const newEnergyRules = style.match(
      /@include mixins\.m\('new-energy'\) \{([\s\S]*?)\n    \}/,
    )?.[1];
    const placeholderRules = style.match(
      /@include mixins\.m\('new-energy-placeholder'\) \{([\s\S]*?)\n    \}/,
    )?.[1];

    expect(newEnergyRules).toBeDefined();
    expect(newEnergyRules).not.toContain('font-size:');
    expect(newEnergyRules).not.toContain('font-weight:');
    expect(placeholderRules).toContain('font-size:');
    expect(placeholderRules).toContain('font-weight: 400;');
  });

  test('lets the keyboard grid own spacing between Horizon buttons', () => {
    expect(style).toMatch(/& \+ & \{\s+margin-left: 0 !important;/);
  });
});
