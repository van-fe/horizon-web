import { afterEach, describe, expect, it } from 'vitest';
import {
  cls,
  ComponentClassBlock,
  createCssVariableMap,
  cssVariable,
  DEFAULT_NAMESPACE,
  setNamespace,
} from '..';

describe('@aurora/theme', () => {
  afterEach(() => setNamespace(DEFAULT_NAMESPACE));

  it('preserves the existing Horizon class contract', () => {
    const block = new ComponentClassBlock('button');

    expect(block.block).toBe('h-button');
    expect(block.e('content')).toBe('h-button__content');
    expect(block.m('primary')).toBe('h-button--primary');
    expect(block.is('disabled')).toBe('is-disabled');
    expect(cls(block.block, block.is('disabled'))).toBe('h-button is-disabled');
  });

  it('supports a shared configurable namespace', () => {
    setNamespace('S');

    expect(new ComponentClassBlock('button').block).toBe('s-button');
    expect(cssVariable('text', 'primary')).toBe('var(--s-text-primary)');
  });

  it('creates web variables from platform-neutral tokens', () => {
    expect(createCssVariableMap({ color: { brand: '#3475f8' }, radius: { medium: 4 } })).toEqual({
      '--h-color-brand': '#3475f8',
      '--h-radius-medium': '4',
    });
  });
});
