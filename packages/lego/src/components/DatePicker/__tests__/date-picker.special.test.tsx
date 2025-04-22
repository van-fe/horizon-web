import { mount } from '@vue/test-utils';
import NDatePicker from '../';
import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';

describe('DatePicker.tsx special', () => {
  test('click clear icon should not focus panel', async () => {
    const onFocus = vi.fn();
    const modelValue = ref();
    const wrapper = mount(() => (
      <NDatePicker v-model={modelValue.value} clearable toBody={false} onFocus={onFocus} />
    ));

    const trigger = wrapper.find('.n-date-picker-trigger input');
    await trigger.trigger('focus');
    expect(onFocus).toHaveBeenCalledOnce();

    const today = wrapper.find('.n-date-picker-panel-table__render-box--current');
    await today.trigger('click');

    expect(modelValue.value).not.toBeUndefined();

    const clearIcon = wrapper.find('.n-date-picker-trigger-content__icon-wrapper');
    await clearIcon.trigger('click');

    expect(modelValue.value).toBeNull();
    expect(onFocus).toHaveBeenCalledOnce();
  });
});
