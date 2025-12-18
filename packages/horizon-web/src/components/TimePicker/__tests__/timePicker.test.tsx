import { mount } from '@vue/test-utils';
import NTimePicker from '../src/TimePicker';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('TimePicker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <NTimePicker modelValue={modelValue.value} />
    ));
    const element = wrapper.findComponent(NTimePicker);

    expect(element.exists()).toBe(true);
  });
});
