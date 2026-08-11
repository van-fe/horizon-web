import { mount } from '@vue/test-utils';
import HPopover from '../src/Popover';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HButton from '../../Button';

describe('Popover.disabled.tsx', () => {
  test('disabled', async () => {
    const disabled = ref(false);

    const wrapper = mount(() => (
      <HPopover toBody={false} trigger="click" disabled={disabled.value}>
        {{
          reference: () => <HButton>Trigger</HButton>,
          popper: () => <div class="popper">Popper</div>,
        }}
      </HPopover>
    ));

    const trigger = wrapper.findComponent(HButton);

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
      <HPopover toBody={false} trigger="click" disabled={disabled.value}>
        {{
          reference: () => <HButton>Trigger</HButton>,
          popper: () => <div class="popper">Popper</div>,
        }}
      </HPopover>
    ));

    const trigger = wrapper.findComponent(HButton);

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
      <HPopover
        toBody={false}
        visible={visible.value}
        trigger="manual"
        disabled={disabled.value}
        onHide={() => (visible.value = false)}
      >
        {{
          reference: () => <HButton>Trigger</HButton>,
          popper: () => <div class="popper">Popper</div>,
        }}
      </HPopover>
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

  test('manual trigger covers enabled no-op events and every disabled event guard', async () => {
    const onEnterReference = vi.fn();
    const onLeaveReference = vi.fn();
    const onClick = vi.fn();
    const onShow = vi.fn();
    const wrapper = mount(HPopover, {
      props: {
        toBody: false,
        trigger: 'manual',
        visible: false,
        destroyOnHide: false,
        onEnterReference,
        onLeaveReference,
        onClick,
        onShow,
      },
      slots: {
        reference: () => <button data-test="manual-reference">Manual</button>,
        popper: () => <span data-test="manual-popper">Popup</span>,
      },
    });
    const reference = wrapper.get('.h-popover__reference');

    await wrapper.setProps({ visible: true });
    await new Promise(resolve => window.setTimeout(resolve));
    expect(onShow).toHaveBeenCalledOnce();
    await reference.trigger('mouseenter');
    await reference.trigger('mouseleave');
    await reference.trigger('mousedown');
    await reference.trigger('mouseup');
    await reference.trigger('click');
    const popper = wrapper.get('.h-popover__popper');
    await popper.trigger('click');
    await popper.trigger('mouseenter');
    expect(onEnterReference).toHaveBeenCalledOnce();
    expect(onLeaveReference).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();

    await wrapper.setProps({ disabled: true, visible: false });
    await nextTick();
    await reference.trigger('mouseenter');
    await reference.trigger('mouseleave');
    await reference.trigger('mousedown');
    await reference.trigger('mouseup');
    await reference.trigger('click');
    await popper.trigger('click');
    await popper.trigger('mouseenter');
    (wrapper.vm as unknown as { switchVisible: (visible: boolean) => void }).switchVisible(true);
    await nextTick();
    expect(onEnterReference).toHaveBeenCalledOnce();
    expect(onLeaveReference).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
    expect(wrapper.get('.h-popover__popper').attributes('style')).toContain('display: none');
  });
});
