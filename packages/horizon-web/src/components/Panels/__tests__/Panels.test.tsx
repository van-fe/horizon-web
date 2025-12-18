import { mount } from '@vue/test-utils';
import { NPanels, NPanel } from '../index';
import { describe, test, expect } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Panels', () => {
  test('should renders correct panel content', async () => {
    const modelValue = ref('p1');

    const wrapper = mount(() => (
      <NPanels modelValue={modelValue.value}>
        <NPanel name="p1">panel1</NPanel>
        <NPanel name="p2">panel2</NPanel>
        <NPanel name="p3">panel3</NPanel>
      </NPanels>
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
      <NPanels modelValue={modelValue.value} animated={animated.value}>
        <NPanel name="p1">panel1</NPanel>
        <NPanel name="p2">panel2</NPanel>
        <NPanel name="p3">panel3</NPanel>
      </NPanels>
    ));
    expect(wrapper.html()).toMatchSnapshot();
    modelValue.value = 'p1';
    animated.value = false;
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
