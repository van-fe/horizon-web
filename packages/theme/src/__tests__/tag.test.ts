import { describe, expect, test } from 'vitest';
import { createTagColorPalette, createTagColorStyle, resolveTagColor } from '..';

describe('Tag theme', () => {
  test('resolves built-in and custom colors', () => {
    expect(resolveTagColor('brand')).toBe('#3475F8');
    expect(resolveTagColor('#123456')).toBe('#123456');
    expect(resolveTagColor('not-a-color')).toBeUndefined();
  });

  test('creates plain and filled palettes', () => {
    expect(createTagColorPalette('#1677ff', '#fff', true).background.default).toBe('#FFF');
    expect(createTagColorPalette('#fff').border.default).toBe('transparent');
  });

  test('selects interaction states and background-only styles', () => {
    expect(createTagColorStyle({ background: '#eee' })).toEqual({ background: '#eee !important' });
    expect(createTagColorStyle({ color: 'brand', clickable: true, hovered: true })).toHaveProperty(
      'borderColor',
    );
    expect(createTagColorStyle({ color: 'brand', clickable: true, pressed: true })).toHaveProperty(
      'background',
    );
    expect(createTagColorStyle({ color: 'brand', active: true })).toHaveProperty('color');
    expect(createTagColorStyle({ color: 'brand', disabled: true })?.color).toContain('important');
  });
});
