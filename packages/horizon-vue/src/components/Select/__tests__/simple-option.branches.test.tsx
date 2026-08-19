import { mount } from '@vue/test-utils';
import { nextTick, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HCheckbox from '../../Checkbox/src/Checkbox';
import SimpleOption from '../src/components/SimpleOption';
import {
  HSelectFocusedOptionValueInjectKey,
  HSelectFilterInputValueInjectKey,
  HSelectHighlightContentRangesInjectKey,
  HSelectHighlightDescriptionRangesInjectKey,
  HSelectMouseOverOptionInjectKey,
  HSelectPickOptionInjectKey,
  HSelectPresetModelValueInjectKey,
  HSelectPropsInjectKey,
  HSelectVirtualScrollListIsScrollingInjectKey,
} from '../src/utils/injectKeys';

function mountOption(
  optionProps: Record<string, unknown> = {},
  parentOverrides: Record<string, unknown> = {},
) {
  const presetModelValue = ref(new Set<any>());
  const parentProps = reactive({
    multiple: false,
    multipleLimit: Infinity,
    valueFormat: undefined,
    showSelectedIcon: false,
    selectedIcon: 'check',
    descriptionPosition: 'right',
    optionMaxLines: 2,
    tooltipShowAfter: 0,
    tooltipHideAfter: 0,
    panelFilterInputValue: '',
    descriptionFilterable: false,
    ...parentOverrides,
  });
  const pickOption = vi.fn();
  const focusedOptionValue = ref<any>();
  const isScrolling = ref(false);
  const onMouseOverOption = vi.fn((value: unknown) => {
    focusedOptionValue.value = value;
  });
  const wrapper = mount(SimpleOption, {
    props: { value: 'a', label: 'Alpha', ...optionProps },
    attrs: { 'data-extra': 'forwarded' },
    global: {
      provide: {
        [HSelectPresetModelValueInjectKey as symbol]: presetModelValue,
        [HSelectPropsInjectKey as symbol]: parentProps,
        [HSelectPickOptionInjectKey as symbol]: pickOption,
        [HSelectFocusedOptionValueInjectKey as symbol]: focusedOptionValue,
        [HSelectVirtualScrollListIsScrollingInjectKey as symbol]: isScrolling,
        [HSelectMouseOverOptionInjectKey as symbol]: onMouseOverOption,
        [HSelectFilterInputValueInjectKey as symbol]: ref(''),
        [HSelectHighlightContentRangesInjectKey as symbol]: ref(new Map()),
        [HSelectHighlightDescriptionRangesInjectKey as symbol]: ref(new Map()),
      },
    },
  });
  return {
    wrapper,
    presetModelValue,
    parentProps,
    pickOption,
    focusedOptionValue,
    isScrolling,
    onMouseOverOption,
  };
}

describe('Select SimpleOption browser branches', () => {
  test('emits native click payloads and tracks pointer focus', async () => {
    const state = mountOption({ description: 'More details' });

    expect(state.wrapper.get('.h-select-option__content').text()).toBe('Alpha');
    expect(state.wrapper.get('.h-select-option__description').text()).toBe('More details');
    await state.wrapper.trigger('mouseenter');
    expect(state.onMouseOverOption).toHaveBeenCalledWith('a');
    expect(state.wrapper.classes()).toContain('is-focus');

    await state.wrapper.trigger('click');
    expect(state.pickOption).toHaveBeenCalledWith('a');
    const [value, props, event] = state.wrapper.emitted('click')![0];
    expect(value).toBe('a');
    expect(props).toMatchObject({ label: 'Alpha', 'data-extra': 'forwarded' });
    expect(event).toBeInstanceOf(MouseEvent);

    await state.wrapper.trigger('mouseleave');
    state.wrapper.unmount();
  });

  test('renders checked multiple state, checkbox and selected icon', async () => {
    const state = mountOption(
      {},
      { multiple: true, showSelectedIcon: true, descriptionPosition: 'right' },
    );
    state.presetModelValue.value = new Set(['a']);
    await nextTick();

    expect(state.wrapper.classes()).toContain('is-active');
    expect(state.wrapper.classes()).toContain('has-icon');
    expect(state.wrapper.classes()).toContain('is-description-bottom');
    expect(state.wrapper.getComponent(HCheckbox).props('modelValue')).toBe(true);
    expect(state.wrapper.find('.h-select-option__icon svg').exists()).toBe(true);
  });

  test('blocks disabled and multiple-limit interactions', async () => {
    const disabled = mountOption({ disabled: true });
    await disabled.wrapper.trigger('mouseenter');
    await disabled.wrapper.trigger('click');
    expect(disabled.wrapper.classes()).toContain('is-disabled');
    expect(disabled.onMouseOverOption).not.toHaveBeenCalled();
    expect(disabled.pickOption).not.toHaveBeenCalled();

    const limited = mountOption({}, { multiple: true, multipleLimit: 1 });
    limited.presetModelValue.value = new Set(['other']);
    await limited.wrapper.trigger('click');
    expect(limited.wrapper.classes()).toContain('is-disabled');
    expect(limited.pickOption).not.toHaveBeenCalled();
  });

  test('uses valueFormat for object equality and suppresses auto-scroll while scrolling', async () => {
    const valueFormat = ({ value }: any) => ({ normalized: value.id });
    const state = mountOption(
      { value: { id: 1 }, label: 'Object' },
      { valueFormat, showSelectedIcon: true },
    );
    state.presetModelValue.value = new Set([{ normalized: 1 }]);
    await nextTick();
    expect(state.wrapper.classes()).toContain('is-active');

    const scrollIntoView = vi.fn();
    Object.defineProperty(state.wrapper.element, 'scrollIntoView', { value: scrollIntoView });
    state.isScrolling.value = true;
    state.focusedOptionValue.value = { id: 1 };
    await nextTick();
    expect(scrollIntoView).not.toHaveBeenCalled();

    state.isScrolling.value = false;
    state.focusedOptionValue.value = undefined;
    await nextTick();
    state.focusedOptionValue.value = { id: 1 };
    await nextTick();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest' });
  });
});
