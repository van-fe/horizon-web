import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { useSelectEmits } from '../src/composables/useEmits';
import useInput from '../src/hooks/useInput';

function mountInput(overrides: Record<string, unknown> = {}, withTagSlot = false) {
  const filterInput = document.createElement('input');
  const pickerInput = document.createElement('input');
  document.body.append(filterInput, pickerInput);
  const props = reactive({
    allowCreate: false,
    filterable: false,
    filterMethod: undefined,
    descriptionFilterable: false,
    panelFilterOption: false,
    multiple: false,
    useStatistic: false,
    reserveKeyword: false,
    showSearch: false,
    needConfirm: false,
    inputEmitFrequency: 0,
    ...overrides,
  }) as any;
  const options = {
    domRefs: {
      filterInputDomRef: ref(filterInput),
      pickerDomRef: ref({
        focus: vi.fn(() => pickerInput.focus()),
        blur: vi.fn(() => pickerInput.blur()),
      }),
    },
    inputValue: ref(''),
    filterInputValue: ref(''),
    popperVisible: ref(false),
    optionsMap: reactive(new Map<any, any>()),
    focusedOptionValue: ref<any>(),
    modelValueSet: ref(new Set<any>()),
    renderedModelValueTags: ref<any[]>([]),
    isFilterable: computed(() => props.filterable || Boolean(props.panelFilterOption)),
    isInputable: computed(() => props.filterable || props.allowCreate),
    emitChange: vi.fn(),
    changeIsAddValue: ref(false),
    setPopperVisible: vi.fn((visible: boolean) => {
      options.popperVisible.value = visible;
    }),
  } as any;
  let api!: ReturnType<typeof useInput>;
  const Harness = defineComponent({
    emits: useSelectEmits,
    setup(_, context) {
      api = useInput(props, context as any, options);
      return () => (
        <input
          data-input
          onFocus={() => {
            api.handleInputFocus();
            api.handleFocus();
          }}
          onBlur={() => {
            api.handleInputBlur();
            api.handleBlur();
          }}
        />
      );
    },
  });
  const wrapper = mount(Harness, {
    attachTo: document.body,
    slots: withTagSlot ? { tagRender: () => [] } : {},
  });
  return { wrapper, props, options, api, filterInput, pickerInput };
}

describe('Select useInput browser contracts', () => {
  test('computes create-option visibility for empty, matching and new labels', async () => {
    const state = mountInput({ allowCreate: true });
    expect(state.api.isCreateOptionVisible.value).toBe(true);

    state.options.optionsMap.set('a', { props: { label: ' Existing ' } });
    state.options.inputValue.value = 'Existing';
    await nextTick();
    expect(state.api.isCreateOptionVisible.value).toBe(false);
    expect(state.options.focusedOptionValue.value).toBe('Existing');
    expect(state.wrapper.emitted('input')?.at(-1)).toEqual(['Existing']);

    state.options.inputValue.value = 'new';
    await nextTick();
    expect(state.api.isCreateOptionVisible.value).toBe(true);
    state.props.allowCreate = false;
    expect(state.api.isCreateOptionVisible.value).toBe(false);
    state.wrapper.unmount();
  });

  test('uses custom, label, description and panel filter methods', () => {
    const state = mountInput({ filterable: true, descriptionFilterable: true });
    expect(state.api.filterMethod.value('alp', { label: 'Alpha' } as any)).toBe(true);
    expect(
      state.api.filterMethod.value('details', { label: 'Other', description: 'DETAILS' } as any),
    ).toBe(true);
    expect(state.api.filterMethod.value('none', { label: 'Other', description: 1 } as any)).toBe(
      false,
    );

    const custom = vi.fn(() => true);
    state.props.filterMethod = custom;
    expect(state.api.filterMethod.value('x', { label: 'x' } as any)).toBe(true);
    expect(custom).toHaveBeenCalled();

    state.props.filterable = false;
    state.props.panelFilterOption = (input: string) => input === 'panel';
    expect(state.api.filterMethod.value('panel', {} as any)).toBe(true);
    state.props.panelFilterOption = true;
    expect(state.api.filterMethod.value('other', { label: 'Other' } as any)).toBe(true);
    state.wrapper.unmount();
  });

  test('covers every input hiding mode including statistic, tags and tagRender', () => {
    const state = mountInput({ multiple: true, useStatistic: true });
    state.options.modelValueSet.value = new Set(['a']);
    expect(state.api.isInputShouldHide.value).toBe(true);

    state.props.useStatistic = false;
    state.options.modelValueSet.value = new Set();
    state.options.renderedModelValueTags.value = ['a'];
    expect(state.api.isInputShouldHide.value).toBe(true);

    state.props.filterable = true;
    state.options.modelValueSet.value = new Set(['a']);
    expect(state.api.isInputShouldHide.value).toBe(true);

    const single = mountInput({}, true);
    single.options.modelValueSet.value = new Set(['a']);
    expect(single.api.isInputShouldHide.value).toBe(true);
    state.wrapper.unmount();
    single.wrapper.unmount();
  });

  test('updates input/search state, respects composition and reserve-special', async () => {
    const state = mountInput({ allowCreate: true, showSearch: true });
    state.api.delInput('search');
    expect(state.options.emitChange).toHaveBeenCalledWith(false, 'search');
    expect(state.options.filterInputValue.value).toBe('search');
    expect(state.wrapper.emitted('search')).toEqual([['search']]);
    await nextTick();
    expect(state.options.setPopperVisible).toHaveBeenCalledWith(true);

    state.api.isDuringComposition.value = true;
    state.api.delInput('ignored');
    expect(state.options.inputValue.value).toBe('search');

    state.api.isDuringComposition.value = false;
    state.props.reserveKeyword = 'reserve-special';
    state.api.delInput('reserved', false, false);
    expect(state.options.inputValue.value).toBe('reserved');
    expect(state.options.filterInputValue.value).toBe('search');
    state.wrapper.unmount();
  });

  test('focuses and blurs real inputs and applies the delayed focus guard', async () => {
    const state = mountInput({ allowCreate: true });
    const input = state.wrapper.get('[data-input]').element as HTMLInputElement;
    input.focus();
    expect(state.api.isInputFocus.value).toBe(true);
    expect(state.api.isSelectFocus.value).toBe(true);
    expect(state.wrapper.emitted('focus')).toHaveLength(1);
    input.blur();
    expect(state.api.isInputFocus.value).toBe(false);
    expect(state.wrapper.emitted('blur')).toHaveLength(1);

    state.api.focusInput();
    expect(document.activeElement).toBe(state.pickerInput);
    state.api.blurInput();
    expect(document.activeElement).not.toBe(state.pickerInput);

    state.options.popperVisible.value = true;
    state.api.judgeWhetherInputCanFocus();
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(state.options.domRefs.pickerDomRef.value.focus).toHaveBeenCalledTimes(2);
    state.wrapper.unmount();
  });
});
