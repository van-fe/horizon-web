import { describe, expect, it } from 'vitest';
import { BUTTON_BUILTIN_COLORS, createButtonColorStyle, resolveButtonColor } from '..';

describe('Button visual utilities', () => {
  it('resolves built-in and literal colors without accepting invalid values', () => {
    expect(resolveButtonColor('brand')).toBe(BUTTON_BUILTIN_COLORS.brand);
    expect(resolveButtonColor('#476582')).toBe('#476582');
    expect(resolveButtonColor('not-a-color')).toBeUndefined();
  });

  it('creates namespace-aware variables for every appearance', () => {
    expect(createButtonColorStyle({ color: '#476582', namespace: 'X' })).toMatchObject({
      '--x-button-background-primary': expect.any(String),
    });
    expect(createButtonColorStyle({ color: '#476582', appearance: 'plain' })).toHaveProperty(
      '--h-button-color-primary-plain',
    );
    expect(createButtonColorStyle({ color: '#476582', appearance: 'ghost' })).toHaveProperty(
      '--h-button-color-primary-plain-ghost',
    );
    expect(createButtonColorStyle({ color: '#476582', appearance: 'link' })).toHaveProperty(
      '--h-button-color-primary-link',
    );
    expect(createButtonColorStyle({ color: '#476582', appearance: 'text' })).toHaveProperty(
      '--h-button-color-primary-text',
    );
    expect(createButtonColorStyle({ color: 'invalid' })).toBeUndefined();
  });
});
