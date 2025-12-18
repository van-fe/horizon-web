import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { Transition } from 'vue';
import NPopover from '../src/Popover';

describe('Popover.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NPopover />);
    const element = wrapper.findComponent(NPopover);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('toBody', async () => {
      const wrapper = mount(() => <NPopover toBody={true} trigger="manual" visible={true} />);
      const element = wrapper.findComponent(Transition);

      expect(element.element.parentElement).toBe(document.body);
    });

    test('to', async () => {
      const el = document.createElement('div');
      el.id = 'target';
      document.body.appendChild(el);

      const wrapper = mount(() => <NPopover to="#target" trigger="manual" visible={true} />);
      const element = wrapper.findComponent(Transition);

      expect(element.element.parentElement).toBe(el);

      document.body.innerHTML = '';
    });
  });
});
