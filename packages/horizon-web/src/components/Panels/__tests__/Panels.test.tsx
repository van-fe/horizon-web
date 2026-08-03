import { mount } from '@vue/test-utils';
import { HPanels, HPanel } from '../index';
import { describe, test, expect } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Panels', () => {
  test('should renders correct panel content', async () => {
    const modelValue = ref('p1');

    const wrapper = mount(() => (
      <HPanels modelValue={modelValue.value}>
        <HPanel name="p1">panel1</HPanel>
        <HPanel name="p2">panel2</HPanel>
        <HPanel name="p3">panel3</HPanel>
      </HPanels>
    ));
    expect(wrapper.text()).toMatchSnapshot();
    modelValue.value = 'p2';
    await nextTick();
    expect(wrapper.text()).toMatchSnapshot();
    modelValue.value = 'p3';
    await nextTick();
    expect(wrapper.text()).toMatchSnapshot();
  });

  test('should enabled animated or not', async () => {
    const modelValue = ref('p1');
    const animated = ref(true);

    const wrapper = mount(() => (
      <HPanels modelValue={modelValue.value} animated={animated.value}>
        <HPanel name="p1">panel1</HPanel>
        <HPanel name="p2">panel2</HPanel>
        <HPanel name="p3">panel3</HPanel>
      </HPanels>
    ));
    expect(wrapper.html()).toMatchSnapshot();
    modelValue.value = 'p1';
    animated.value = false;
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
