import { mount } from '@vue/test-utils';
import NTimePickerV2 from '../src/TimePickerV2';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('TimePickerV2.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <NTimePickerV2 modelValue={modelValue.value} />
    ));
    const element = wrapper.findComponent(NTimePickerV2);

    expect(element.exists()).toBe(true);
  });
});
