import { mount } from '@vue/test-utils';
import HPicker from '../src/Picker';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Picker.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HPicker modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HPicker);

    expect(element.exists()).toBe(true);
  });
});
