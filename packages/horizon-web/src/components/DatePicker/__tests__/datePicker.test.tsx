import { mount } from '@vue/test-utils';
import HDatePicker from '../src/DatePicker';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('DatePicker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HDatePicker v-model={modelValue.value} />);
    const element = wrapper.findComponent(HDatePicker);

    expect(element.exists()).toBe(true);
  });
});
