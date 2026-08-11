import { describe, expect, it, vi } from 'vitest';
import {
  findNextEnabledOption,
  isSelectValueEqual,
  normalizeSelectValues,
  removeSelectValueMetadata,
  SELECT_VALUE_FORMAT_SYMBOL,
  SelectController,
  SelectOptionCollection,
  unwrapSelectValue,
  wrapSelectFormattedValue,
} from '..';

const options = [
  { id: 'alpha', value: 'alpha', label: 'Alpha' },
  { id: 'blocked', value: 'blocked', label: 'Blocked', disabled: true },
  { id: 'beta', value: 'beta', label: 'Beta' },
];

describe('Select value protocol', () => {
  it('normalizes empty, single and multiple values', () => {
    expect([...normalizeSelectValues(undefined)]).toEqual([]);
    expect([...normalizeSelectValues('a')]).toEqual(['a']);
    expect([...normalizeSelectValues(['a', 'b'], true)]).toEqual(['a', 'b']);
  });

  it('wraps formatted values without exposing metadata', () => {
    const source = { label: 'Alpha' };
    const wrapped = wrapSelectFormattedValue(source, 'alpha');
    expect(wrapped).not.toBe(source);
    expect(unwrapSelectValue(wrapped)).toBe('alpha');
    expect(Object.keys(wrapped)).toEqual(['label']);
    expect(removeSelectValueMetadata(wrapped)).toEqual(source);
    expect(SELECT_VALUE_FORMAT_SYMBOL in removeSelectValueMetadata(wrapped)).toBe(false);
  });

  it('compares structured values while ignoring renderer context', () => {
    expect(isSelectValueEqual({ id: 1, _ctx: {} }, { id: 1, _ctx: { app: true } })).toBe(true);
    expect(isSelectValueEqual([1, { id: 2 }], [1, { id: 2 }])).toBe(true);
    expect(isSelectValueEqual({ id: 1 }, { id: 2 })).toBe(false);
  });
});

describe('Select option collection', () => {
  it('replaces duplicate values in place and unregisters dynamically', () => {
    const collection = new SelectOptionCollection([{ id: 'a', value: { id: 1 }, label: 'A' }]);
    const unregister = collection.register({ id: 'next', value: { id: 1 }, label: 'Next' });
    expect(collection.values).toHaveLength(1);
    expect(collection.values[0]?.id).toBe('next');
    unregister();
    expect(collection.values).toHaveLength(0);
  });

  it('skips disabled options during keyboard navigation', () => {
    expect(findNextEnabledOption(options, 'alpha', 1)?.value).toBe('beta');
    expect(findNextEnabledOption(options, 'alpha', -1)?.value).toBe('beta');
  });
});

describe('SelectController', () => {
  it('filters, highlights and selects with ordered callbacks', () => {
    const events: string[] = [];
    const controller = new SelectController({
      options,
      onOpenChange: open => events.push(`open:${open}`),
      onInputValueChange: input => events.push(`input:${input}`),
      onHighlightChange: value => events.push(`highlight:${value}`),
      onChange: (value, details) => events.push(`change:${value}:${details.reason}`),
    });
    controller.open('trigger');
    controller.setInputValue('be');
    expect(controller.visibleOptions.map(option => option.value)).toEqual(['beta']);
    expect(controller.highlight(1)).toBe('beta');
    expect(controller.highlightValue('alpha')).toBe(false);
    expect(controller.highlightValue('beta')).toBe(true);
    expect(controller.selectHighlighted()).toBe(true);
    controller.close('select');
    expect(events).toEqual([
      'open:true',
      'input:be',
      'highlight:beta',
      'highlight:beta',
      'highlight:beta',
      'change:beta:keyboard',
      'open:false',
    ]);
  });

  it('supports controlled synchronization without echoing callbacks', () => {
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    const controller = new SelectController({ options, onChange, onOpenChange });
    controller.syncState({ value: 'alpha', open: true });
    expect(controller.snapshot.value).toBe('alpha');
    expect(controller.snapshot.open).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('blocks disabled options and ignores work after destroy', () => {
    const onChange = vi.fn();
    const controller = new SelectController({ options, onChange });
    expect(controller.select('blocked')).toBe(false);
    controller.destroy();
    expect(controller.select('alpha')).toBe(false);
    expect(controller.allOptions).toEqual([]);
  });
});
