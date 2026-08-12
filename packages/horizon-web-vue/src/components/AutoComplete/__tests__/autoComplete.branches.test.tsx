import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HAutoComplete from '../src/AutoComplete';
import HPicker from '../../Picker/src/Picker';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import AutoCompleteHelper from './autoCompleteHelper';
import { HFormItemErrorInjectedKey } from '../../Form/src/utils/injectedKeys';
import { sleep } from '~/utils/tools';

describe('AutoComplete defensive and interaction branches', () => {
  test('sorts label-only options and selects the hovered label with the keyboard', async () => {
    const onSelect = vi.fn();
    const instance = new AutoCompleteHelper({
      options: [{ label: 'Alpha' }, { label: 'Beta' }],
      modelValue: 'Beta',
      selectedOptionOrderToTop: true,
      onSelect,
    });

    await instance.open(0);
    await nextTick();
    expect(instance.getAllComponents()[0].text()).toContain('Beta');

    const alpha = instance.getAllComponents().find(option => option.text().includes('Alpha'))!;
    await alpha.trigger('mouseenter');
    await instance.picker.find('input').trigger('keydown', { key: 'Enter' });
    expect(onSelect).toHaveBeenLastCalledWith('Alpha');
  });

  test('defers search during composition and handles arrow, escape and disabled enter paths', async () => {
    const onSearch = vi.fn();
    const onSelect = vi.fn();
    const onDropdownVisibleChange = vi.fn();
    const wrapper = mount(HAutoComplete, {
      props: {
        options: [{ label: 'Alpha' }, { label: 'Beta', value: 'beta-value' }],
        inputEmitFrequency: 0,
        toBody: false,
        onSearch,
        onSelect,
        onDropdownVisibleChange,
      },
      attachTo: document.body,
    });
    const picker = wrapper.getComponent(HPicker);
    const input = wrapper.get('input');

    await picker.trigger('click');
    await input.trigger('compositionstart');
    await input.setValue('中');
    await sleep(10);
    expect(onSearch).not.toHaveBeenCalledWith('中');

    await input.trigger('keydown', { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
    await input.trigger('compositionend');
    await input.setValue('中文');
    await sleep(10);
    expect(onSearch).toHaveBeenLastCalledWith('中文');

    await input.trigger('keydown', { key: 'ArrowDown' });
    await sleep(110);
    await input.trigger('keydown', { key: 'ArrowUp' });
    await sleep(110);
    await input.trigger('keydown', { key: 'Escape' });
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);

    await wrapper.setProps({ disabled: true });
    await input.trigger('keydown', { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('reopens when focused options arrive and reflects a form error', async () => {
    const formError = ref('Required');
    const visible = vi.fn();
    const wrapper = mount(HAutoComplete, {
      props: {
        options: [],
        toBody: false,
        onDropdownVisibleChange: visible,
      },
      global: {
        provide: {
          [HFormItemErrorInjectedKey as symbol]: formError,
        },
      },
      attachTo: document.body,
    });

    expect(wrapper.getComponent(HPicker).props('inputStatus')).toBe('error');
    await wrapper.get('input').trigger('focus');
    await wrapper.setProps({ options: [{ label: 'Arrived later' }] });
    await nextTick();
    await nextTick();
    expect(visible).toHaveBeenCalledWith(true);
  });

  test('uses real option hover/click while virtual scrolling starts and stops', async () => {
    const scrollIntoView = vi
      .spyOn(HTMLElement.prototype, 'scrollIntoView')
      .mockImplementation(() => undefined);
    const onSelect = vi.fn();
    const instance = new AutoCompleteHelper({
      options: [{ label: 'Alpha' }, { label: 'Beta' }],
      onSelect,
    });
    await instance.open(0);
    const scroller = instance.wrapper.getComponent(HVirtualScroller);
    scroller.vm.$emit('scrollBegin');
    await instance.getAllComponents()[0].trigger('mouseenter');
    expect(scrollIntoView).not.toHaveBeenCalled();

    scroller.vm.$emit('scrollStop');
    await instance.getAllComponents()[1].trigger('mouseenter');
    expect(scrollIntoView).toHaveBeenCalled();
    await instance.getAllComponents()[1].trigger('click');
    expect(onSelect).toHaveBeenLastCalledWith('Beta');
  });
});
