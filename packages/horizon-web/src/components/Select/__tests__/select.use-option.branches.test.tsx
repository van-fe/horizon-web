import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { useSelectEmits } from '../src/composables/useEmits';
import useOption from '../src/hooks/useOption';
import type { SelectCollectedOptionData } from '../src/utils/injectKeys';

function makeOption(
  value: unknown,
  overrides: Record<string, unknown> = {},
): SelectCollectedOptionData<'option'> {
  const element = document.createElement('div');
  element.className = 'h-select-option';
  return {
    type: 'option',
    props: { value, label: String(value), disabled: false, ...overrides },
    slots: {},
    attrs: {},
    el: ref(element),
    active: computed(() => false),
    disabled: computed(() => Boolean(overrides.disabled)),
    children: null,
  } as SelectCollectedOptionData<'option'>;
}

function mountOptionHook(overrides: Record<string, unknown> = {}) {
  const props = reactive({
    options: undefined,
    valueFormat: undefined,
    allowCreate: false,
    panelFilterOption: false,
    useBuildInPanelFilter: false,
    panelFilterInputValue: '',
    selectedVisible: true,
    multiple: false,
    multipleLimit: Infinity,
    needConfirm: false,
    reserveKeyword: false,
    beforeCreate: undefined,
    ...overrides,
  }) as any;
  const root = document.createElement('div');
  const view = document.createElement('div');
  root.append(view);
  const options = {
    domRefs: {
      pickerDomRef: ref({ popoverDom: () => root }),
      scrollbarDomRef: ref({ viewRef: view }),
    },
    optionsMap: reactive(new Map<unknown, SelectCollectedOptionData<'option'>>()),
    focusedOptionValue: ref<unknown>(),
    prevOptionValue: undefined,
    isFilterable: ref(false),
    filterMethod: computed(() => (input: string, option: Record<string, unknown>) =>
      String(option.label).toLowerCase().includes(input.toLowerCase()),
    ),
    filterInputValue: ref(''),
    inputValue: ref(''),
    modelValueSet: ref(new Set<unknown>()),
    presetModelValueSet: ref(new Set<unknown>()),
    changeIsAddValue: ref(false),
    isDisabled: computed(() => false),
    handleConfirm: vi.fn(),
    setPopperVisible: vi.fn(),
    delInput: vi.fn(),
    judgeWhetherInputCanFocus: vi.fn(),
  } as any;
  let api!: ReturnType<typeof useOption>;
  const Harness = defineComponent({
    emits: useSelectEmits,
    setup(_, context) {
      api = useOption(props, context as any, options);
      return () => <div data-option-hook />;
    },
  });
  const wrapper = mount(Harness);
  return { wrapper, props, options, api, root, view };
}

describe('Select useOption browser branches', () => {
  test('resolves raw, formatted and legacy values and applies every visible filter', () => {
    const state = mountOptionHook();
    const alpha = makeOption('a');
    const beta = makeOption('b');
    beta.attrs.region = 'east';
    state.options.optionsMap.set('a', alpha);
    state.options.optionsMap.set('b', beta);

    const lookupNullable = state.api.getOptionDataByValue as unknown as (value: null) => null;
    expect(lookupNullable(null)).toBeNull();
    expect(state.api.getOptionDataByValue(undefined)).toBeUndefined();
    expect(state.api.getOptionDataByValue('a')?.props).toMatchObject({ value: 'a' });
    expect(state.api.getOptionDataByValue({ value: 'b' })?.props).toMatchObject({ value: 'b' });
    expect(state.api.getOptionDataByValue('missing')).toBeUndefined();

    state.props.valueFormat = ({ value, label }: Record<string, unknown>) => ({ value, label });
    expect(state.api.getOptionDataByValue({ value: 'a', label: 'a' })?.props).toMatchObject({
      value: 'a',
    });
    expect(state.api.isModelValueSetHasValue(new Set([{ value: 'a', label: 'a' }]), 'a')).toBe(
      true,
    );
    expect(state.api.isModelValueSetHasValue(new Set(), 'a')).toBe(false);
    expect(state.api.modelValueSetDeleteValue(new Set(), 'a')).toBe(false);

    state.options.isFilterable.value = true;
    state.options.filterInputValue.value = 'alp';
    alpha.props.label = 'Alpha';
    expect(state.api.visibleOptions.value.map(option => option.props.value)).toEqual(['a']);

    state.options.isFilterable.value = false;
    state.props.panelFilterOption = true;
    state.props.useBuildInPanelFilter = false;
    state.props.panelFilterInputValue = 'bet';
    beta.props.label = 'Beta';
    expect(state.api.visibleOptions.value.map(option => option.props.value)).toEqual(['b']);

    state.props.useBuildInPanelFilter = true;
    state.options.filterInputValue.value = 'alp';
    expect(state.api.visibleOptions.value.map(option => option.props.value)).toEqual(['a']);

    state.props.panelFilterOption = false;
    state.props.selectedVisible = false;
    state.options.modelValueSet.value = new Set(['a']);
    expect(state.api.visibleOptions.value.map(option => option.props.value)).toEqual(['b']);
    state.wrapper.unmount();
  });

  test('picks single and multiple options across clear, confirm, limit and keyword modes', () => {
    const state = mountOptionHook();
    const alpha = makeOption('a');
    const beta = makeOption('b');
    const disabled = makeOption('disabled', { disabled: true });
    state.options.optionsMap.set('a', alpha);
    state.options.optionsMap.set('b', beta);
    state.options.optionsMap.set('disabled', disabled);

    state.api.pickOption('disabled');
    expect(state.options.handleConfirm).not.toHaveBeenCalled();

    const event = new MouseEvent('click', { cancelable: true });
    state.api.pickOption('a', true, false, event);
    expect(event.defaultPrevented).toBe(true);
    expect([...state.options.presetModelValueSet.value]).toEqual(['a']);
    expect(state.options.handleConfirm).toHaveBeenCalledWith(true, false);

    state.api.pickOption('a', true, false, undefined, true);
    expect([...state.options.presetModelValueSet.value]).toEqual([]);
    expect(state.options.changeIsAddValue.value).toBe(false);
    state.api.pickOption('b', true, false, undefined, true);
    expect([...state.options.presetModelValueSet.value]).toEqual(['b']);

    state.props.needConfirm = true;
    state.options.handleConfirm.mockClear();
    state.api.pickOption('a');
    expect(state.options.handleConfirm).not.toHaveBeenCalled();
    state.api.pickOption('a', true, true);
    expect(state.options.handleConfirm).toHaveBeenCalled();

    state.props.multiple = true;
    state.props.needConfirm = false;
    state.props.multipleLimit = 1;
    state.props.reserveKeyword = false;
    state.options.presetModelValueSet.value = new Set(['a']);
    state.api.pickOption('a');
    expect([...state.options.presetModelValueSet.value]).toEqual([]);
    expect(state.wrapper.emitted('deselect')).toEqual([['a']]);
    expect(state.options.delInput).toHaveBeenCalledWith('', true, false);

    state.api.pickOption('b');
    expect([...state.options.presetModelValueSet.value]).toEqual(['b']);
    state.api.pickOption('a');
    expect([...state.options.presetModelValueSet.value]).toEqual(['b']);

    state.props.reserveKeyword = true;
    state.options.delInput.mockClear();
    state.options.presetModelValueSet.value = new Set();
    state.api.pickOption('a');
    expect(state.options.delInput).not.toHaveBeenCalled();
    state.props.reserveKeyword = 'reserve-special';
    state.api.pickOption('a');
    expect(state.options.delInput).toHaveBeenCalledWith('', true, false);
    state.wrapper.unmount();
  });

  test('creates guarded options, registers groups and returns DOM order', async () => {
    const state = mountOptionHook();
    state.options.inputValue.value = 'created';
    state.api.onClickCreateOption();
    await nextTick();
    await nextTick();
    expect(state.api.tempCreateOptions.value).toEqual(['created']);
    expect(state.options.setPopperVisible).toHaveBeenCalledWith(false);

    state.props.beforeCreate = vi.fn(() => false);
    state.options.inputValue.value = 'blocked';
    state.api.onClickCreateOption();
    await Promise.resolve();
    await nextTick();
    expect(state.api.tempCreateOptions.value).not.toContain('blocked');

    state.props.multiple = true;
    state.props.beforeCreate = vi.fn(async () => true);
    state.options.inputValue.value = 'async';
    state.api.onClickCreateOption();
    await Promise.resolve();
    await nextTick();
    await nextTick();
    expect(state.api.tempCreateOptions.value).toContain('async');
    expect(state.options.judgeWhetherInputCanFocus).toHaveBeenCalled();

    const alpha = makeOption('a');
    const beta = makeOption('b');
    const group = {
      type: 'option-group',
      children: new Map([['a', alpha], ['b', beta]]),
    } as SelectCollectedOptionData<'option-group'>;
    state.api.addOption(group);
    expect(state.options.optionsMap.has('a')).toBe(true);
    state.api.addOption(
      { type: 'option-group', children: null } as unknown as SelectCollectedOptionData<'option-group'>,
    );
    state.api.removeOption('b');
    expect(state.options.optionsMap.has('b')).toBe(false);

    const parent = document.createElement('div');
    const first = alpha.el.value!;
    const second = makeOption('c');
    const secondElement = second.el.value!;
    first.style.order = '2';
    secondElement.style.order = '1';
    parent.append(first, secondElement);
    state.view.append(parent);
    state.options.optionsMap.set('c', second);
    expect(state.api.getAllOptionsInDom().map(option => option.props.value)).toEqual(['c', 'a']);

    const spacer = document.createElement('div');
    const otherParent = document.createElement('div');
    const third = makeOption('d');
    otherParent.append(third.el.value!);
    state.view.prepend(spacer);
    state.view.append(otherParent);
    state.options.optionsMap.set('d', third);
    expect(state.api.getAllOptionsInDom().map(option => option.props.value)).toEqual([
      'c',
      'a',
      'd',
    ]);

    state.options.domRefs.scrollbarDomRef.value = undefined;
    expect(state.api.getAllOptionsInDom()).toHaveLength(3);

    state.options.modelValueSet.value = new Set(['a']);
    state.api.focusOnFirstModelValue();
    expect(state.options.focusedOptionValue.value).toBe('a');
    state.options.modelValueSet.value = new Set();
    state.api.focusOnFirstModelValue();
    expect(state.options.focusedOptionValue.value).toBeUndefined();
    state.wrapper.unmount();
  });
});
