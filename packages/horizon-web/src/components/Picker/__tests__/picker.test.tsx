import { mount } from '@vue/test-utils';
import NPicker from '../src/Picker';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Picker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <NPicker modelValue={modelValue.value} />);
    const element = wrapper.findComponent(NPicker);

    expect(element.exists()).toBe(true);
  });
});
