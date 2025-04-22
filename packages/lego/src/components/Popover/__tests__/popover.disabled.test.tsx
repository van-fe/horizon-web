import { mount } from '@vue/test-utils';
import NPopover from '../src/Popover';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import NButton from '../../Button';

describe('Popover.disabled.tsx', () => {
  test('disabled', async () => {
    const disabled = ref(false);

    const wrapper = mount(() => (
      <NPopover toBody={false} trigger="click" disabled={disabled.value}>
        {{
          reference: () => <NButton>Trigger</NButton>,
          popper: () => <div class="popper">Popper</div>,
        }}
      </NPopover>
    ));

    const trigger = wrapper.findComponent(NButton);

    await trigger.trigger('click');

    const popper = wrapper.find('.popper');

    expect(popper.exists()).eq(true);

    await popper.trigger('click');

    disabled.value = true;

    await trigger.trigger('click');

    expect(wrapper.find('.popper').exists()).eq(false);
  });

  test('disabled modify to true while popper is shown', async () => {
    const disabled = ref(false);

    const wrapper = mount(() => (
      <NPopover toBody={false} trigger="click" disabled={disabled.value}>
        {{
          reference: () => <NButton>Trigger</NButton>,
          popper: () => <div class="popper">Popper</div>,
        }}
      </NPopover>
    ));

    const trigger = wrapper.findComponent(NButton);

    await trigger.trigger('click');

    const popper = wrapper.find('.popper');

    expect(popper.exists()).eq(true);

    disabled.value = true;

    await nextTick();

    expect(wrapper.find('.popper').exists()).eq(false);
  });

  test('disabled on manual control', async () => {
    const visible = ref(true);
    const disabled = ref(false);

    const wrapper = mount(() => (
      <NPopover
        toBody={false}
        visible={visible.value}
        trigger="manual"
        disabled={disabled.value}
        onHide={() => (visible.value = false)}
      >
        {{
          reference: () => <NButton>Trigger</NButton>,
          popper: () => <div class="popper">Popper</div>,
        }}
      </NPopover>
    ));

    const popper = wrapper.find('.popper');

    expect(popper.exists()).eq(true);

    disabled.value = true;

    await nextTick();

    expect(wrapper.find('.popper').exists()).eq(false);

    expect(visible.value).eq(false);

    visible.value = true;

    await nextTick();

    expect(wrapper.find('.popper').exists()).eq(false);
  });
});
