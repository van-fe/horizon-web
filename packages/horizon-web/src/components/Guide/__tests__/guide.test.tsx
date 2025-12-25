import { mount } from '@vue/test-utils';
import HGuide from '../src/Guide';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Guide.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HGuide modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HGuide);

    expect(element.exists()).toBe(true);
  });
});
