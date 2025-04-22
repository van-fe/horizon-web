import { mount } from '@vue/test-utils';
import NGuide from '../src/Guide';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Guide.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <NGuide modelValue={modelValue.value} />);
    const element = wrapper.findComponent(NGuide);

    expect(element.exists()).toBe(true);
  });
});
