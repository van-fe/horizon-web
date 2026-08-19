import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import HAutoComplete from '../src/AutoComplete';
import HPicker from '../../Picker/src/Picker';
import HPickerInput from '../../Picker/src/components/PickerInput';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import HTooltip from '../../Tooltip/src/Tooltip';
import SimpleOption from '../src/components/SimpleOption';
import AutoCompleteHelper from './autoCompleteHelper';
import { sleep } from '~/utils/tools';
import { useAutoCompleteEmits } from '../src/composables/useEmits';

const suggestions = [
  { label: 'Alpha', value: 'a', description: 'First option' },
  { label: 'Beta', value: 'b', description: 'Second option' },
];

describe('AutoComplete public API contracts', () => {
  test('forwards picker props and renders external styles and classes', () => {
    const wrapper = mount(HAutoComplete, {
      props: {
        options: suggestions,
        disabled: true,
        clearable: true,
        placement: 'top-end',
        toBody: false,
        inputStyle: 'no-border',
        size: 'small',
        placeholder: 'Find item',
        emptyText: 'No suggestions',
        destroyOnHide: true,
        popoverOptions: { distance: 18 },
        fitInputWidth: 'fit-content',
        hoverShowDelay: 12,
        hoverHideDelay: 34,
        dropdownIcon: false,
        externalStyle: { width: '320px' },
        externalClass: 'external-auto-complete',
        externalPanelStyle: { width: '240px' },
        externalPanelClass: 'external-panel',
        loading: true,
        loadingText: 'Loading suggestions',
        inputStatus: 'warning',
        searchIcon: false,
      },
    });
    const picker = wrapper.getComponent(HPicker);

    expect(picker.props()).toMatchObject({
      disabled: true,
      clearable: true,
      placement: 'top-end',
      toBody: false,
      inputStyle: 'no-border',
      size: 'small',
      placeholder: 'Find item',
      emptyText: 'No suggestions',
      destroyOnHide: true,
      fitInputWidth: 'fit-content',
      hoverShowDelay: 12,
      hoverHideDelay: 34,
      dropdownIcon: false,
      panelClass: 'external-panel',
      loading: true,
      loadingText: 'Loading suggestions',
      inputStatus: 'warning',
      searchIcon: false,
    });
    expect(picker.props('popoverOptions')).toEqual({ distance: 18 });
    expect(picker.attributes('style')).toContain('width: 320px');
    expect(picker.classes()).toContain('external-auto-complete');
  });

  test('configures virtual list sizing, description layout, expansion and tooltip delays', async () => {
    const instance = new AutoCompleteHelper({
      options: suggestions,
      optionListMaxHeight: 180,
      descriptionPosition: 'bottom',
      expandPanelByChildren: true,
      tooltipShowAfter: 11,
      tooltipHideAfter: 22,
    });
    await instance.open(0);
    const scroller = instance.wrapper.getComponent(HVirtualScroller);
    expect(scroller.props()).toMatchObject({
      scrollerMaxHeight: 180,
      minItemSize: 57,
      expandWrapperByChildren: true,
    });
    expect(instance.wrapper.get('.h-auto-complete-option').classes()).toContain(
      'is-description-bottom',
    );
    expect(
      instance.wrapper
        .findAllComponents(HTooltip)
        .some(tooltip => tooltip.props('showAfter') === 11 && tooltip.props('hideAfter') === 22),
    ).toBe(true);
    const tooltips = instance.wrapper.findComponent(SimpleOption).findAllComponents(HTooltip);
    expect(tooltips[0].vm.$slots.content?.()[0]?.children).toBe('Alpha');
    expect(tooltips[0].vm.$slots.default?.()[0]?.children).toEqual(['Alpha']);
    expect(tooltips[1].vm.$slots.content?.()[0]?.children).toBe('First option');
    expect(tooltips[1].vm.$slots.default?.()[0]?.children).toEqual(['First option']);
  });

  test('debounces real input and emits update:modelValue, focus, blur and clear', async () => {
    const update = vi.fn();
    const focus = vi.fn();
    const blur = vi.fn();
    const clear = vi.fn();
    const search = vi.fn();
    const wrapper = mount(HAutoComplete, {
      props: {
        options: suggestions,
        modelValue: 'Alpha',
        clearable: true,
        toBody: false,
        inputEmitFrequency: 20,
        'onUpdate:modelValue': update,
        onFocus: focus,
        onBlur: blur,
        onClear: clear,
        onSearch: search,
      },
      attachTo: document.body,
    });
    const input = wrapper.get('input');
    await input.trigger('focus');
    await input.setValue('Beta');
    expect(search).not.toHaveBeenCalledWith('Beta');
    await sleep(25);
    expect(search).toHaveBeenLastCalledWith('Beta');
    expect(update).toHaveBeenLastCalledWith('Beta');
    await input.trigger('blur');
    expect(focus).toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();

    await wrapper.getComponent(HPickerInput).trigger('mouseenter');
    await wrapper.get('.h-picker__input--icon.is-clear').trigger('click');
    expect(clear).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenLastCalledWith('');
  });

  test('replaces a pending scheduler when the debounce frequency changes', async () => {
    const search = vi.fn();
    const wrapper = mount(HAutoComplete, {
      props: {
        options: suggestions,
        inputEmitFrequency: 100,
        toBody: false,
        onSearch: search,
      },
      attachTo: document.body,
    });
    const input = wrapper.get('input');
    await input.setValue('stale');
    await wrapper.setProps({ inputEmitFrequency: 0 });
    await input.setValue('fresh');
    await sleep(10);
    expect(search).toHaveBeenLastCalledWith('fresh');
    await sleep(110);
    expect(search).not.toHaveBeenCalledWith('stale');
  });

  test('emits optionListReachBottom through real keyboard traversal unless loading', async () => {
    const reachBottom = vi.fn();
    const wrapper = mount(HAutoComplete, {
      props: { options: suggestions, toBody: false, onOptionListReachBottom: reachBottom },
      attachTo: document.body,
    });
    await wrapper.getComponent(HPicker).trigger('click');
    const input = wrapper.get('input');
    for (let index = 0; index < 4; index += 1) {
      await input.trigger('keydown', { key: 'ArrowDown' });
      await sleep(110);
    }
    expect(reachBottom).toHaveBeenCalled();
    expect(reachBottom.mock.calls.at(-1)?.[0]).toBeInstanceOf(KeyboardEvent);

    await wrapper.setProps({ loading: true });
    reachBottom.mockClear();
    await input.trigger('keydown', { key: 'ArrowDown' });
    await sleep(110);
    expect(reachBottom).not.toHaveBeenCalled();
  });

  test('moves the selected option to the top only when the panel reopens', async () => {
    const instance = new AutoCompleteHelper({
      options: suggestions,
      modelValue: 'b',
      selectedOptionOrderToTop: true,
    });
    await instance.open(0);
    await nextTick();
    expect(instance.getAllComponents()[0].text()).toContain('Beta');
  });

  test('uses label fallback for options without a value or description', async () => {
    const onSelect = vi.fn();
    const instance = new AutoCompleteHelper({
      options: [{ label: 'Label only' }],
      modelValue: 'Label only',
      onSelect,
    });
    await instance.open(0);
    const option = instance.getAllComponents()[0];
    expect(option.attributes('aria-selected')).toBe('true');
    expect(option.find('.h-auto-complete-option__description').exists()).toBe(false);
    await option.trigger('click');
    expect(onSelect).toHaveBeenLastCalledWith('Label only');
  });

  test('renders panel header/footer and picker inner/container slots', async () => {
    const inner = new AutoCompleteHelper(
      { options: suggestions },
      { pickerInner: () => [<span class="picker-inner-slot">Inner</span>] },
    );
    expect(inner.wrapper.get('.picker-inner-slot').text()).toBe('Inner');

    const instance = new AutoCompleteHelper(
      { options: suggestions },
      {
        panelHeaderRender: () => [<div class="panel-header-slot">Header</div>],
        panelFooterRender: () => [<div class="panel-footer-slot">Footer</div>],
        pickerContainer: () => [<span class="picker-container-slot">Container</span>],
      },
    );
    expect(instance.wrapper.get('.picker-container-slot').text()).toBe('Container');
    await instance.open(0);
    expect(instance.wrapper.get('.panel-header-slot').text()).toBe('Header');
    expect(instance.wrapper.get('.panel-footer-slot').text()).toBe('Footer');
  });

  test('exposes semantic commands, scoped options and combobox aria state', async () => {
    const wrapper = mount(HAutoComplete, {
      props: { options: suggestions, modelValue: 'a', toBody: false },
      slots: {
        option: ({ option, active, selected }: any) => (
          <span class="scoped-option">
            {option.label}:{String(active)}:{String(selected)}
          </span>
        ),
      },
      attachTo: document.body,
    });
    const component = wrapper.vm as any;
    const input = wrapper.get('input');

    component.open();
    await nextTick();
    await nextTick();
    expect(input.attributes('role')).toBe('combobox');
    expect(input.attributes('aria-expanded')).toBe('true');
    expect(wrapper.get('[role="listbox"]').attributes('id')).toBe(
      input.attributes('aria-controls'),
    );
    expect(wrapper.get('.scoped-option').text()).toContain('Alpha:false:true');

    component.focus();
    await nextTick();
    expect(document.activeElement).toBe(input.element);
    component.blur();
    await nextTick();
    expect(document.activeElement).not.toBe(input.element);
    component.clear();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['']);
    component.close();
    await sleep(300);
    expect(input.attributes('aria-expanded')).toBe('false');
  });

  test('validates all public emit payload boundaries', () => {
    const event = new Event('scroll');
    expect(useAutoCompleteEmits['update:modelValue']('value')).toBe(true);
    expect(useAutoCompleteEmits['update:modelValue'](null)).toBe(true);
    expect(useAutoCompleteEmits.dropdownVisibleChange(true)).toBe(true);
    expect(useAutoCompleteEmits.dropdownVisibleChange('true' as never)).toBe(false);
    expect(useAutoCompleteEmits.focus()).toBe(true);
    expect(useAutoCompleteEmits.blur()).toBe(true);
    expect(useAutoCompleteEmits.search('query')).toBe(true);
    expect(useAutoCompleteEmits.search(null)).toBe(true);
    expect(useAutoCompleteEmits.search(1 as never)).toBe(false);
    expect(useAutoCompleteEmits.optionListReachBottom(event)).toBe(true);
    expect(useAutoCompleteEmits.optionListReachBottom({} as Event)).toBe(false);
    expect(useAutoCompleteEmits.clear()).toBe(true);
    expect(useAutoCompleteEmits.change('value')).toBe(true);
    expect(useAutoCompleteEmits.change(undefined)).toBe(true);
    expect(useAutoCompleteEmits.select('value')).toBe(true);
    expect(useAutoCompleteEmits.select(1 as never)).toBe(false);
  });
});
