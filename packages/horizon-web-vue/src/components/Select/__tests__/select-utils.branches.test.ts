import { Fragment, computed, h, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import {
  getSymbolNodeChildren,
  isEmpty,
  isEmptyArray,
  isEqualLoose,
  isMap,
  isSet,
} from '../src/utils/utils';
import { wrapValueFormattedValue } from '../src/utils/valueFormat';
import {
  isEqualIgnoreCtx,
  isModelValueMatchingOption,
  isOptionChecked,
  isValueFormatWrapped,
  isValueHasCtx,
  removeObjectCtx,
  removeValueFormatMetadata,
  unwrapValueFormattedValue,
} from '../src/utils/valueFormat';
import useCheckAll from '../src/hooks/useCheckAll';
import { transformOptionList } from '../src/hooks/useVirtualList';

describe('Select utils branches', () => {
  test.each([
    [null, true],
    [undefined, true],
    ['', false],
    [[], true],
    [[1], false],
    [0, false],
    [1, false],
    [{}, false],
    [new Map(), true],
    [new Map([['a', 1]]), false],
    [new Set(), true],
    [new Set([1]), false],
    [false, false],
    [Symbol('value'), true],
  ])('reports public emptiness for %o', (value, expected) => {
    expect(isEmpty(value)).toBe(expected);
  });

  test('recognizes cross-realm-style Map and Set values and empty arrays', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Set())).toBe(false);
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new Map())).toBe(false);
    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray([1])).toBe(false);
    expect(isEmptyArray(null)).toBe(false);
  });

  test('compares empty, public formatted, wrapped and unwrapped values loosely', () => {
    expect(isEqualLoose(undefined, null)).toBe(true);
    expect(isEqualLoose({ value: 1 }, { value: 1 })).toBe(true);

    const first = wrapValueFormattedValue({ label: 'A' }, 'a');
    const second = wrapValueFormattedValue({ label: 'A' }, 'a');
    expect(isEqualLoose(first, second)).toBe(true);
    expect(isEqualLoose([first], ['a'])).toBe(true);
    expect(isEqualLoose(first, 'a')).toBe(true);
    expect(isEqualLoose(['a'], [second])).toBe(true);
    expect(isEqualLoose(['a'], ['b'])).toBe(false);
  });

  test('flattens fragment VNodes while ignoring primitive slot children', () => {
    const one = h('span', { id: 'one' });
    const two = h('span', { id: 'two' });
    const slots = {
      default: () => [h(Fragment, null, [one, h(Fragment, null, [two, 'text'])]), 'outside'],
    } as any;

    expect(getSymbolNodeChildren(slots, 'default')).toEqual([one, two]);
    expect(getSymbolNodeChildren({}, 'missing')).toEqual([]);
  });

  test('covers formatted-value metadata, legacy values and context-insensitive equality', () => {
    const wrappedObject = wrapValueFormattedValue({ label: 'A' }, { id: 1 });
    const wrappedArray = wrapValueFormattedValue(['A'] as any, 'a');
    expect(isValueFormatWrapped(wrappedObject)).toBe(true);
    expect(isValueFormatWrapped({ label: 'A' })).toBe(false);
    expect(unwrapValueFormattedValue(wrappedObject)).toEqual({ id: 1 });
    expect(unwrapValueFormattedValue('plain')).toBe('plain');
    expect(removeValueFormatMetadata(wrappedObject)).toEqual({ label: 'A' });
    expect(removeValueFormatMetadata(wrappedArray)).toEqual(['A']);
    expect(removeValueFormatMetadata('plain')).toBe('plain');

    expect(isValueHasCtx({ _ctx: 1 })).toBe(true);
    expect(isValueHasCtx({})).toBe(false);
    expect(removeObjectCtx({ id: 1, _ctx: 2 })).toEqual({ id: 1 });
    expect(removeObjectCtx(1)).toBe(1);
    expect(isEqualIgnoreCtx({ id: 1, _ctx: 1 }, { id: 1, _ctx: 2 })).toBe(true);
    expect(isEqualIgnoreCtx('a', 'a')).toBe(true);

    expect(isModelValueMatchingOption({ id: 1 }, { id: 1 })).toBe(true);
    expect(isModelValueMatchingOption({ label: 'A' }, 'a', { value: { label: 'A' } })).toBe(true);
    expect(isModelValueMatchingOption({ value: 'a' }, 'a')).toBe(true);
    expect(isModelValueMatchingOption('b', 'a')).toBe(false);
    expect(isOptionChecked(new Set([wrappedObject]), { id: 1 })).toBe(true);
    expect(isOptionChecked(new Set([{ label: 'A' }]), 'a', () => ({ label: 'A' }))).toBe(true);
    expect(isOptionChecked(new Set(['b']), 'a')).toBe(false);
  });

  test('covers check-all counts, filtered state, toggling and confirm modes', () => {
    const props = reactive({
      useCheckAllCount: true,
      checkAllCountConsiderFilter: true,
    }) as any;
    const visible = ref<any[]>([
      { props: { value: 'a' }, active: true, disabled: false },
      { props: { value: 'b' }, active: false, disabled: false },
      { props: { value: 'c' }, active: false, disabled: true },
    ]);
    const selected = ref(new Set<any>(['a']));
    const handleConfirm = vi.fn();
    const needConfirm = ref(false);
    const state = useCheckAll(props, {
      optionsMap: reactive(new Map([['a', {}], ['b', {}], ['c', {}]])) as any,
      visibleOptions: computed(() => visible.value),
      presetModelValueSet: selected,
      needConfirm: computed(() => needConfirm.value),
      handleConfirm,
      isModelValueSetHasValue: (set, value) => set.has(value),
      modelValueSetDeleteValue: (set, value) => set.delete(value),
    });

    expect(state.isCheckAll.value).toBe(false);
    expect(state.isIndeterminate.value).toBe(true);
    expect(state.checkAllCountShowText.value).toBe('1/3');
    expect(state.isCheckAllTextActive.value).toBe(true);
    state.toggleCheckAll();
    expect([...selected.value]).toEqual(['a', 'b']);
    expect(handleConfirm).toHaveBeenCalledWith(false, false);

    visible.value = visible.value.map(option => ({ ...option, active: !option.disabled }));
    state.toggleCheckAll();
    expect([...selected.value]).toEqual([]);

    needConfirm.value = true;
    handleConfirm.mockClear();
    visible.value = visible.value.map(option => ({ ...option, active: false }));
    state.toggleCheckAll();
    expect([...selected.value]).toEqual(['a', 'b']);
    expect(handleConfirm).not.toHaveBeenCalled();

    visible.value = [{ props: { value: 'c' }, active: false, disabled: true }];
    state.toggleCheckAll();
    expect([...selected.value]).toEqual(['a', 'b']);

    props.checkAllCountConsiderFilter = false;
    selected.value = new Set(['a']);
    expect(state.checkAllCountShowText.value).toBe('1/3');
    expect(state.isCheckAllTextActive.value).toBe(true);
    selected.value = new Set();
    expect(state.checkAllCountShowText.value).toBe('3');
    props.useCheckAllCount = false;
    expect(state.checkAllCountShowText.value).toBe('');
  });

  test('transforms virtual options with active, disabled and multiple-limit contracts', () => {
    const props = reactive({
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
      ],
      valueFormat: undefined,
      multipleLimit: 1,
    }) as any;
    const selected = ref(new Set<any>(['a']));
    const disabled = ref(false);
    const transformed = transformOptionList(props, {
      presetModelValueSet: selected,
      isDisabled: computed(() => disabled.value),
    });

    expect(transformed.value).toHaveLength(2);
    expect(transformed.value[0].active.value).toBe(true);
    expect(transformed.value[0].disabled.value).toBe(false);
    expect(transformed.value[1].disabled.value).toBe(true);
    const scrollTo = Reflect.get(transformed.value[0], 'scrollTo');
    expect(scrollTo).toBeTypeOf('function');
    expect(scrollTo()).toBeUndefined();
    disabled.value = true;
    expect(transformed.value[0].disabled.value).toBe(true);

    disabled.value = false;
    props.valueFormat = ({ value }: { value: string }) => ({ normalized: value });
    selected.value = new Set([{ normalized: 'b' }]);
    expect(transformed.value[1].active.value).toBe(true);
    expect(transformed.value[1].disabled.value).toBe(true);
    expect(transformed.value[0].disabled.value).toBe(true);
    props.options = undefined;
    expect(transformed.value).toEqual([]);
  });
});
