import { mount, shallowMount } from '@vue/test-utils';
import HRate from '../src/Rate';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Rate.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HRate modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HRate);

    expect(element.exists()).toBe(true);
  });

  test('exposes slider semantics and keyboard controls', async () => {
    const modelValue = ref(2);
    const wrapper = mount(() => <HRate v-model={modelValue.value} count={5} />);
    const slider = wrapper.find('[role="slider"]');

    expect(slider.attributes('aria-valuenow')).toBe('2');
    await slider.trigger('keydown', { key: 'ArrowRight' });
    expect(modelValue.value).toBe(3);
  });
});
