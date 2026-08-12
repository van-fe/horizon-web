import { describe, expect, it, vi } from 'vitest';
import {
  AutoCompleteController,
  AUTO_COMPLETE_DEFAULTS,
  autoCompleteApiContract,
  isAutoCompleteDelay,
  isAutoCompleteDescriptionPosition,
  isAutoCompleteFitInputWidth,
  isAutoCompleteListHeight,
  isAutoCompleteTrigger,
  normalizeAutoCompleteOptions,
  normalizeAutoCompleteValue,
  orderAutoCompleteOptions,
  resolveAutoCompleteNavigation,
  resolveAutoCompleteOptionHeight,
} from '..';

const suggestions = [
  { label: 'Alpha', value: 'a', description: 'First' },
  { label: 'Beta', value: 'b', description: 'Second' },
];

describe('AutoComplete contract and algorithms', () => {
  it('exposes defaults and validates shared values', () => {
    expect(autoCompleteApiContract.defaults).toBe(AUTO_COMPLETE_DEFAULTS);
    expect(isAutoCompleteTrigger('click')).toBe(true);
    expect(isAutoCompleteTrigger('focus')).toBe(false);
    expect(isAutoCompleteDescriptionPosition('bottom')).toBe(true);
    expect(isAutoCompleteDescriptionPosition('left')).toBe(false);
    expect(isAutoCompleteFitInputWidth('fit-content')).toBe(true);
    expect(isAutoCompleteFitInputWidth('stretch')).toBe(false);
    expect(isAutoCompleteDelay(0)).toBe(true);
    expect(isAutoCompleteDelay(-1)).toBe(false);
    expect(isAutoCompleteListHeight('18rem')).toBe(true);
    expect(isAutoCompleteListHeight('')).toBe(false);
  });

  it('normalizes values and options deterministically', () => {
    expect(normalizeAutoCompleteValue(null)).toBe('');
    expect(normalizeAutoCompleteValue('value')).toBe('value');
    expect(
      normalizeAutoCompleteOptions(
        [{ label: 'Alpha', value: 'old' }, { label: 'Beta' }, { label: 'Alpha', value: 'new' }],
        'suggestion',
      ),
    ).toEqual([
      { id: 'suggestion-0', label: 'Alpha', value: 'new' },
      { id: 'suggestion-1', label: 'Beta', value: 'Beta' },
    ]);
  });

  it('orders the selected value first without mutating source order', () => {
    const normalized = normalizeAutoCompleteOptions(suggestions);
    expect(orderAutoCompleteOptions(normalized, 'b', true).map(option => option.value)).toEqual([
      'b',
      'a',
    ]);
    expect(normalized.map(option => option.value)).toEqual(['a', 'b']);
    expect(orderAutoCompleteOptions(normalized, null, true)).toEqual(normalized);
    expect(orderAutoCompleteOptions(normalized, 'missing', true)).toEqual(normalized);
  });

  it('clamps keyboard navigation and reports crossing the end', () => {
    expect(resolveAutoCompleteNavigation(2, -1, 1)).toEqual({ index: 0, reachedEnd: false });
    expect(resolveAutoCompleteNavigation(2, 1, 1)).toEqual({ index: 1, reachedEnd: true });
    expect(resolveAutoCompleteNavigation(2, 0, -1)).toEqual({ index: 0, reachedEnd: false });
    expect(resolveAutoCompleteNavigation(0, -1, 1)).toEqual({ index: -1, reachedEnd: true });
    expect(resolveAutoCompleteOptionHeight('right')).toBe(40);
    expect(resolveAutoCompleteOptionHeight('bottom')).toBe(57);
  });
});

describe('AutoComplete controller', () => {
  it('coordinates input, IME, open state, navigation, selection and clear', () => {
    const onValueChange = vi.fn();
    const onSearch = vi.fn();
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();
    const onReachEnd = vi.fn();
    const onHighlightChange = vi.fn();
    const controller = new AutoCompleteController({
      options: suggestions,
      onValueChange,
      onSearch,
      onOpenChange,
      onSelect,
      onReachEnd,
      onHighlightChange,
    });

    controller.input('A');
    expect(onSearch).toHaveBeenCalledWith('A');
    controller.startComposition();
    controller.input('阿');
    expect(onValueChange).toHaveBeenLastCalledWith('阿');
    expect(onSearch).not.toHaveBeenCalledWith('阿');
    controller.endComposition();

    expect(controller.open('keyboard')).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'keyboard' });
    expect(controller.navigate(1)).toBe(0);
    expect(controller.navigate(1)).toBe(1);
    expect(controller.navigate(1)).toBe(1);
    expect(onReachEnd).toHaveBeenCalledOnce();
    expect(controller.select()).toBe('b');
    expect(onSelect).toHaveBeenCalledWith('b', expect.objectContaining({ index: 1 }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'select' });

    expect(controller.clear()).toBe(true);
    expect(controller.snapshot.value).toBe('');
    expect(onSearch).toHaveBeenLastCalledWith('');
    expect(onHighlightChange).toHaveBeenCalled();
  });

  it('enforces disabled, empty, loading, updates, invalid selections and destruction', () => {
    const onReachEnd = vi.fn();
    const controller = new AutoCompleteController({
      hidePanelWhenEmptyList: true,
      onReachEnd,
    });
    expect(controller.open()).toBe(false);
    controller.setOptions({ options: suggestions, loading: true });
    expect(controller.open()).toBe(true);
    controller.navigate(1);
    controller.navigate(1);
    controller.navigate(1);
    expect(onReachEnd).not.toHaveBeenCalled();
    expect(controller.highlight(-1)).toBe(false);
    expect(controller.highlight(99)).toBe(false);
    expect(controller.select(99)).toBeUndefined();

    controller.setDisabled(true);
    expect(controller.snapshot.open).toBe(false);
    expect(controller.open()).toBe(false);
    expect(controller.clear()).toBe(false);
    controller.syncState({ disabled: false, value: 'b', open: true });
    controller.setOptions({ selectedOptionOrderToTop: true });
    expect(controller.visibleOptions[0].value).toBe('b');
    controller.destroy();
    controller.input('ignored');
    expect(controller.snapshot.value).toBe('b');
  });
});
