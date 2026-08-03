import { mount } from '@vue/test-utils';
import HTimePicker from '../src/TimePicker';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('TimePicker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <HTimePicker modelValue={modelValue.value} />
    ));
    const element = wrapper.findComponent(HTimePicker);

    expect(element.exists()).toBe(true);
  });
});
