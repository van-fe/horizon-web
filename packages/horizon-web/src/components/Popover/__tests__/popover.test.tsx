import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { nextTick, Transition } from 'vue';
import HPopover from '../src/Popover';
import HButton from '../../Button';

describe('Popover.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HPopover />);
    const element = wrapper.findComponent(HPopover);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('click keeps the popper open until clicking outside', async () => {
      const wrapper = mount(() => (
        <HPopover toBody={false} trigger="click">
          {{
            reference: () => <HButton>Trigger</HButton>,
            popper: () => <div class="popper">Popper</div>,
          }}
        </HPopover>
      ));

      await wrapper.findComponent(HButton).trigger('click');
      await new Promise(resolve => window.setTimeout(resolve));

      const popper = wrapper.find('.popper');
      expect(popper.exists()).toBe(true);

      await popper.trigger('click');
      expect(wrapper.find('.popper').exists()).toBe(true);

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();

      expect(wrapper.find('.popper').exists()).toBe(false);
    });

    test('toBody', async () => {
      const wrapper = mount(() => <HPopover toBody={true} trigger="manual" visible={true} />);
      const element = wrapper.findComponent(Transition);

      expect(element.element.parentElement).toBe(document.body);
    });

    test('to', async () => {
      const el = document.createElement('div');
      el.id = 'target';
      document.body.appendChild(el);

      const wrapper = mount(() => <HPopover to="#target" trigger="manual" visible={true} />);
      const element = wrapper.findComponent(Transition);

      expect(element.element.parentElement).toBe(el);

      wrapper.unmount();
      el.remove();
    });
  });
});
