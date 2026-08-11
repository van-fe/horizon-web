import { mount } from '@vue/test-utils';
import { defineComponent, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { useSelectEmits } from '../src/composables/useEmits';
import useEvents from '../src/hooks/useEvents';
import { HFormItemTriggerInjectedKey } from '../../Form/src/utils/injectedKeys';

const waitForThrottle = () => new Promise(resolve => setTimeout(resolve, 110));

function mountEvents(
  overrides: Record<string, unknown> = {},
  formItemTrigger?: (trigger: 'blur') => void,
) {
  const wrapperElement = document.createElement('div');
  const popoverElement = document.createElement('div');
  const handleInputFocus = vi.fn();
  const handleInputBlur = vi.fn();
  const virtualScrollList = { scrollToIndex: vi.fn() };
  const optionData = [
    { type: 'option', props: { value: 'a', label: 'A', disabled: false } },
    { type: 'option', props: { value: 'b', label: 'B', disabled: false } },
    { type: 'option', props: { value: 'disabled', label: 'Disabled', disabled: true } },
  ] as any[];
  const props = reactive({
    multiple: false,
    needConfirm: false,
    useCheckAll: false,
    panelFilterOption: false,
    loading: false,
    options: undefined,
    ...overrides,
  }) as any;
  const options = {
    domRefs: {
      pickerDomRef: ref({
        handleInputFocus,
        handleInputBlur,
        wrapperDom: () => wrapperElement,
        popoverDom: () => popoverElement,
      }),
      virtualScrollListDomRef: ref(virtualScrollList),
    },
    inputValue: ref(''),
    isInputable: ref(true),
    filterInputValue: ref('filter text'),
    modelValueSet: ref(new Set<any>()),
    presetModelValueSet: ref(new Set<any>()),
    prevOptionValue: undefined,
    prevScrollTop: 0,
    visibleOptions: ref(optionData),
    isDisabled: ref(false),
    focusedOptionValue: ref<any>(undefined),
    isCreateOptionVisible: ref(false),
    getOptionDataByValue: vi.fn((value: unknown) =>
      optionData.find(option => option.props.value === value),
    ),
    pickOption: vi.fn(),
    toggleCheckAll: vi.fn(),
    onClickCreateOption: vi.fn(),
    popperVisible: ref(false),
    setPopperVisible: vi.fn((visible: boolean) => {
      options.popperVisible.value = visible;
    }),
    changeIsAddValue: ref(false),
    emitChange: vi.fn(),
    judgeWhetherInputCanFocus: vi.fn(),
    getAllOptionsInDom: vi.fn(() => optionData),
    delInput: vi.fn(),
    delInputDebounced: vi.fn(),
  } as any;
  let events!: ReturnType<typeof useEvents>;
  const Harness = defineComponent({
    emits: useSelectEmits,
    setup(_, context) {
      events = useEvents(props, context as any, options);
      return () => (
        <div>
          <input
            data-input
            onInput={events.handleInput}
            onFocus={events.handleFocus}
            onBlur={events.handleBlur}
            onCompositionstart={events.onCompositionStart}
            onCompositionend={events.onCompositionEnd}
            onKeydown={events.handleKeydown}
          />
          <input
            data-suffix-input
            onFocus={events.onTagGroupSuffixInputFocus}
            onBlur={events.onTagGroupSuffixInputBlur}
          />
          <button data-clear onClick={events.handleClear}>clear</button>
          <button data-picker onClick={events.handleClick}>picker</button>
          <button data-reach onClick={events.onReachBottom}>reach</button>
        </div>
      );
    },
  });
  const wrapper = mount(Harness, {
    attachTo: document.body,
    global: {
      provide: {
        [HFormItemTriggerInjectedKey as symbol]: formItemTrigger,
      },
    },
  });

  return {
    wrapper,
    events,
    props,
    options,
    optionData,
    wrapperElement,
    popoverElement,
    handleInputFocus,
    handleInputBlur,
    virtualScrollList,
  };
}

describe('Select useEvents browser contracts', () => {
  test('handles native input, focus, blur, click, mouseover, scroll and reach-bottom events', async () => {
    const state = mountEvents();
    const input = state.wrapper.get('[data-input]');

    await input.setValue('typed');
    expect(state.options.delInput).toHaveBeenCalledWith('typed');

    (input.element as HTMLInputElement).focus();
    expect(state.events.isSelectFocus.value).toBe(true);
    expect(state.wrapper.emitted('focus')).toHaveLength(1);
    await state.wrapper.get('[data-picker]').trigger('click');
    expect(state.options.judgeWhetherInputCanFocus).toHaveBeenCalled();
    expect(state.wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent);

    state.events.onScroll({ scrollLeft: 1, scrollTop: 88 });
    expect(state.options.prevScrollTop).toBe(88);
    state.events.onMouseOverOption('b');
    expect(state.options.focusedOptionValue.value).toBe('b');

    await state.wrapper.get('[data-reach]').trigger('click');
    expect(state.wrapper.emitted('optionListReachBottom')?.[0]?.[1]).toBe('filter text');
    state.props.loading = true;
    await state.wrapper.get('[data-reach]').trigger('click');
    expect(state.wrapper.emitted('optionListReachBottom')).toHaveLength(1);

    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();
    expect(state.events.isSelectFocus.value).toBe(false);
    expect(state.wrapper.emitted('blur')).toHaveLength(1);
    outside.remove();
    state.wrapper.unmount();
  });

  test('keeps or closes the panel according to the real suffix-input related target', () => {
    const state = mountEvents();
    const inside = document.createElement('button');
    const outside = document.createElement('button');
    state.wrapperElement.append(inside);

    state.events.onTagGroupSuffixInputFocus(new FocusEvent('focus'));
    state.events.onTagGroupSuffixInputBlur(new FocusEvent('blur', { relatedTarget: inside }));
    expect(state.handleInputFocus).toHaveBeenCalledOnce();
    expect(state.options.setPopperVisible).not.toHaveBeenCalled();

    state.events.onTagGroupSuffixInputBlur(new FocusEvent('blur', { relatedTarget: outside }));
    expect(state.options.setPopperVisible).toHaveBeenCalledWith(false);
    expect(state.handleInputBlur).toHaveBeenCalledTimes(2);
    state.wrapper.unmount();
  });

  test('clears single and multiple values while preserving disabled options', async () => {
    const single = mountEvents();
    single.options.modelValueSet.value = new Set(['a']);
    await single.wrapper.get('[data-clear]').trigger('click');
    expect(single.options.modelValueSet.value.size).toBe(0);
    expect(single.options.delInput).toHaveBeenCalledWith('', false, true, false);
    expect(single.wrapper.emitted('clear')).toHaveLength(1);

    const singleEmpty = mountEvents();
    singleEmpty.events.handleClear();
    expect(singleEmpty.options.delInput).toHaveBeenCalledWith('', false, true, true);

    const multiple = mountEvents({ multiple: true });
    multiple.options.modelValueSet.value = new Set(['a', 'disabled']);
    await multiple.wrapper.get('[data-clear]').trigger('click');
    expect([...multiple.options.modelValueSet.value]).toEqual(['disabled']);
    expect(multiple.options.delInput).toHaveBeenCalledWith('', false, true, false);

    const empty = mountEvents({ multiple: true });
    await empty.wrapper.get('[data-clear]').trigger('click');
    expect(empty.options.delInput).toHaveBeenCalledWith('', false, true, true);

    single.wrapper.unmount();
    singleEmpty.wrapper.unmount();
    multiple.wrapper.unmount();
    empty.wrapper.unmount();
  });

  test('routes Enter to create, check-all, option selection and panel opening', async () => {
    const state = mountEvents();
    const input = state.wrapper.get('[data-input]');
    state.options.popperVisible.value = true;
    state.options.inputValue.value = 'new option';
    state.options.focusedOptionValue.value = 'new option';
    state.options.isCreateOptionVisible.value = true;
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.onClickCreateOption).toHaveBeenCalledOnce();

    state.options.isCreateOptionVisible.value = false;
    state.props.useCheckAll = true;
    state.options.focusedOptionValue.value = '__checkAll';
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.toggleCheckAll).toHaveBeenCalledOnce();

    state.props.useCheckAll = false;
    state.options.focusedOptionValue.value = 'a';
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.pickOption).toHaveBeenCalledWith('a', false);
    expect(state.options.setPopperVisible).toHaveBeenCalledWith(false);

    state.options.setPopperVisible.mockClear();
    state.options.popperVisible.value = true;
    state.options.focusedOptionValue.value = 'a';
    state.props.multiple = true;
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.pickOption).toHaveBeenLastCalledWith('a', false);
    expect(state.options.setPopperVisible).not.toHaveBeenCalledWith(false);

    state.options.setPopperVisible.mockClear();
    state.options.popperVisible.value = false;
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.setPopperVisible).toHaveBeenCalledWith(true);

    state.options.setPopperVisible.mockClear();
    state.options.isDisabled.value = true;
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.setPopperVisible).not.toHaveBeenCalled();
    state.wrapper.unmount();
  });

  test('respects IME composition and removes the last multiple tag with Backspace', async () => {
    const state = mountEvents({ multiple: true, needConfirm: true });
    const input = state.wrapper.get('[data-input]');
    state.options.popperVisible.value = true;
    state.options.focusedOptionValue.value = 'a';
    await input.trigger('compositionstart');
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.options.pickOption).not.toHaveBeenCalled();

    await input.trigger('compositionend');
    state.options.inputValue.value = '';
    state.options.modelValueSet.value = new Set(['a', 'b']);
    await input.trigger('keydown', { key: 'Backspace' });
    expect(state.options.pickOption).toHaveBeenCalledWith('b', true, true);
    expect(state.options.judgeWhetherInputCanFocus).toHaveBeenCalled();

    await input.trigger('keydown', { key: 'Escape' });
    expect(state.options.setPopperVisible).toHaveBeenCalledWith(false);
    state.wrapper.unmount();
  });

  test('navigates create/check-all/virtual options and reports the bottom boundary', async () => {
    const state = mountEvents({ useCheckAll: true, options: [{ value: 'a' }, { value: 'b' }] });
    const input = state.wrapper.get('[data-input]');
    state.options.popperVisible.value = true;
    state.options.modelValueSet.value = new Set(['a']);

    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(state.options.focusedOptionValue.value).toBe('b');
    expect(state.virtualScrollList.scrollToIndex).toHaveBeenCalledWith(1, true);

    await waitForThrottle();
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(state.wrapper.emitted('optionListReachBottom')).toHaveLength(1);

    state.options.isCreateOptionVisible.value = true;
    state.options.inputValue.value = 'created';
    state.options.focusedOptionValue.value = 'a';
    await waitForThrottle();
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(state.options.focusedOptionValue.value).toBe('created');

    await waitForThrottle();
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(state.options.focusedOptionValue.value).toBe('__checkAll');
    state.wrapper.unmount();
  });

  test('covers non-virtual empty navigation and every related-target boundary', async () => {
    const formItemTrigger = vi.fn();
    const state = mountEvents({ useCheckAll: true }, formItemTrigger);
    const input = state.wrapper.get('[data-input]');
    state.options.popperVisible.value = true;
    state.options.focusedOptionValue.value = undefined;
    state.options.modelValueSet.value = new Set();

    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(state.options.getAllOptionsInDom).toHaveBeenCalled();
    expect(state.options.focusedOptionValue.value).toBe('__checkAll');

    state.options.isCreateOptionVisible.value = true;
    state.options.inputValue.value = 'created';
    state.options.focusedOptionValue.value = undefined;
    await waitForThrottle();
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(state.options.focusedOptionValue.value).toBe('__checkAll');

    state.options.getAllOptionsInDom.mockReturnValue([]);
    state.options.isCreateOptionVisible.value = false;
    state.props.useCheckAll = false;
    state.options.focusedOptionValue.value = 'missing';
    state.props.loading = true;
    const reachCount = state.wrapper.emitted('optionListReachBottom')?.length ?? 0;
    await waitForThrottle();
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(state.options.focusedOptionValue.value).toBeUndefined();
    expect(state.wrapper.emitted('optionListReachBottom')?.length ?? 0).toBe(reachCount);

    state.events.onTagGroupSuffixInputBlur(new FocusEvent('blur'));
    expect(state.options.setPopperVisible).not.toHaveBeenCalledWith(false);
    const popoverChild = document.createElement('button');
    state.popoverElement.append(popoverChild);
    state.events.onTagGroupSuffixInputBlur(
      new FocusEvent('blur', { relatedTarget: popoverChild }),
    );
    expect(state.options.setPopperVisible).not.toHaveBeenCalledWith(false);

    state.options.domRefs.pickerDomRef.value = undefined;
    expect(() => state.events.onTagGroupSuffixInputFocus(new FocusEvent('focus'))).not.toThrow();
    expect(() => state.events.onTagGroupSuffixInputBlur(new FocusEvent('blur'))).not.toThrow();

    state.props.multiple = true;
    state.options.modelValueSet.value = new Set(['missing']);
    await state.wrapper.get('[data-clear]').trigger('click');
    expect(state.options.modelValueSet.value.size).toBe(0);

    state.props.panelFilterOption = false;
    state.options.pickOption.mockClear();
    state.options.inputValue.value = '';
    await input.trigger('keydown', { key: 'Backspace' });
    expect(state.options.pickOption).not.toHaveBeenCalled();

    state.options.getAllOptionsInDom.mockReturnValue(state.optionData);
    state.options.getOptionDataByValue.mockReturnValue(undefined);
    state.options.modelValueSet.value = new Set([{ value: 'legacy' }]);
    state.options.focusedOptionValue.value = undefined;
    state.options.popperVisible.value = true;
    await waitForThrottle();
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(state.options.focusedOptionValue.value).toBe('a');

    state.props.panelFilterOption = true;
    state.options.pickOption.mockClear();
    await input.trigger('keydown', { key: 'Backspace' });
    expect(state.options.pickOption).not.toHaveBeenCalled();
    expect(() => state.events.handleClear()).not.toThrow();
    state.events.handleBlur();
    await Promise.resolve();
    expect(formItemTrigger).toHaveBeenCalledWith('blur');
    state.wrapper.unmount();
  });
});
