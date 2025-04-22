import { mount } from '@vue/test-utils';
import NDatePickerV2 from '../src/DatePickerV2';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('DatePickerV2.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <NDatePickerV2 v-model={modelValue.value} />);
    const element = wrapper.findComponent(NDatePickerV2);

    expect(element.exists()).toBe(true);
  });
});
