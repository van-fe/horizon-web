import { mount, shallowMount } from '@vue/test-utils';
import NTimePicker from '../';
import panelTrigger from '../src/time-components/panel-trigger';
import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import type { TimePickerExposes } from '../src/composables/useExposes';
import NButton from '../../Button';

describe('TimePicker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <NTimePicker modelValue={modelValue.value} />);
    const element = wrapper.findComponent(NTimePicker);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('timerange with error status', () => {
      const wrapper = mount(() => <NTimePicker is-range={true} inputStatus="error" />);

      expect(wrapper.findComponent(panelTrigger).classes()).toContain('is-error');
    });

    test('default with error status', () => {
      const wrapper = mount(() => <NTimePicker inputStatus="error" />);

      expect(wrapper.find('.n-input').classes()).toContain('n-input__error--normal');
    });

    test('remove clearable', () => {
      const wrapper = mount(() => <NTimePicker clearable={false} />);
      const input = wrapper.find('.n-input__suffix');
      expect(input.exists()).toBe(false);
    });

    test('select time range', async () => {
      const modelValue = ref();
      const wrapper = mount(
        () => (
          <NTimePicker
            v-model={modelValue.value}
            type="time"
            value-format="HH:mm"
            toBody={false}
            is-range={true}
          />
        ),
        {
          attachTo: document.body,
        },
      );

      const trigger = wrapper.find('.n-time-picker-trigger input');
      await trigger.trigger('focus');

      // 选时间
      const pickers = wrapper.findAll('.n-panel-time');
      const leftCell = pickers[0].findAll('.n-time-select__item')[0];
      const rightCell = pickers[1].findAll('.n-time-select__item')[2];

      await leftCell.trigger('click');
      await rightCell.trigger('click');

      const buttons = wrapper.findAllComponents(NButton);
      const confirmBtn = buttons.at(-1);
      await confirmBtn?.trigger('click');

      expect(Array.isArray(modelValue.value)).toBe(true);
      expect(modelValue.value[0]).toBe('00:00');
      expect(modelValue.value[1]).toBe('01:00');
    });
  });

  describe('event', () => {
    test('clear', async () => {
      const timePickerRef = ref<(typeof NTimePicker & TimePickerExposes) | null>(null);
      const modelValue = ref(new Date());
      const onFocus = vi.fn();

      const wrapper = mount(() => (
        <NTimePicker ref={timePickerRef} v-model={modelValue.value} onFocus={onFocus} />
      ));

      const timePickerTrigger = wrapper.find('.n-date-picker-trigger-content');

      await timePickerTrigger.trigger('mouseenter');

      const clearIcon = wrapper.find('.n-date-picker-trigger-content__icon');

      expect(clearIcon.exists()).toBe(true);

      await clearIcon.trigger('click');

      expect(modelValue.value).eq(null);
      // happy-dom bug
      // expect(onFocus).toHaveBeenCalled();
    });

    test('popperChange', async () => {
      const visible = ref(false);
      const popperChange = (value: boolean) => {
        visible.value = value;
      };
      const value = ref();
      const wrapper = mount(
        () => (
          <NTimePicker
            v-model={value.value}
            type="time"
            toBody={false}
            onPopperChange={popperChange}
          />
        ),
        {
          attachTo: document.body,
        },
      );

      const trigger = wrapper.find('.n-time-picker-trigger input');
      await trigger.trigger('focus');

      expect(visible.value).eq(true);

      const dates = wrapper.find('.n-time-select__item');
      await dates.trigger('click');

      expect(visible.value).eq(false);
    });
  });
});
