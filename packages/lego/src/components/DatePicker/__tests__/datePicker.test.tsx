import { mount } from '@vue/test-utils';
import NDatePicker from '../src/DatePicker';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('DatePicker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <NDatePicker v-model={modelValue.value} />);
    const element = wrapper.findComponent(NDatePicker);

    expect(element.exists()).toBe(true);
  });
});
