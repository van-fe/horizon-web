import { mount } from '@vue/test-utils';
import HDropdown from '../src/Dropdown';
import { describe, expect, test, vi } from 'vitest';
import { Fragment, nextTick, ref } from 'vue';
import type { DropdownProps } from '../src/composables/useProps';
import HButton from '../../Button/src/Button';
import { HDropdownItem, HDropdownMenu } from '../index';
import { sleep } from '~/utils/tools';
import HPopover from '../../Popover/src/Popover';

describe.skip('Dropdown.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HDropdown />);
    const element = wrapper.findComponent(HDropdown);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('theme', async () => {
      const theme = ref<DropdownProps['theme']>('default');
      const wrapper = mount(() => <HDropdown theme={theme.value} toBody={false} />);
      const element = wrapper.findComponent(HDropdown);

      expect(element.classes('h-dropdown--default')).toBeTruthy();

      theme.value = 'midnight';

      await nextTick();

      expect(element.classes('h-dropdown--midnight')).toBeTruthy();
    });

    test('trigger & visible', async () => {
      const visible = ref(false);
      const trigger = ref<DropdownProps['trigger']>('hover');
      const wrapper = mount(
        () => (
          <Fragment>
            <HDropdown trigger={trigger.value} visible={visible.value} toBody={false}>
              {{
                default: () => <HButton>Trigger</HButton>,
                dropdown: () => (
                  <HDropdownMenu>
                    <HDropdownItem>1</HDropdownItem>
                    <HDropdownItem>2</HDropdownItem>
                    <HDropdownItem>3</HDropdownItem>
                  </HDropdownMenu>
                ),
              }}
            </HDropdown>
            <HButton class="outer-btn">Outer</HButton>
          </Fragment>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(HPopover);

      const triggerFn = async (eventString: Parameters<typeof triggerEle.trigger>[0]) => {
        await nextTick();

        await triggerEle.trigger(eventString);

        await sleep(200);
      };

      await triggerFn('mouseenter');

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      await triggerEle.trigger('mouseleave');

      await sleep(200);

      trigger.value = 'click';

      await triggerFn('mouseenter');

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();

      await triggerFn('click');

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      await wrapper.find('.outer-btn').trigger('click');

      trigger.value = 'manual';

      await triggerFn('mouseenter');

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();

      await triggerFn('click');

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();

      visible.value = true;

      await nextTick();

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      visible.value = false;

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();
    });

    test('disabled', async () => {
      const disabled = ref(false);
      const wrapper = mount(() => (
        <HDropdown disabled={disabled.value} toBody={false}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      await triggerEle.trigger('mouseleave');

      await sleep(200);

      disabled.value = true;

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();
    });

    test('align', async () => {
      const align = ref<DropdownProps['align']>('left');
      const wrapper = mount(() => (
        <HDropdown align={align.value} toBody={false}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(620);

      expect(wrapper.find('.h-popover__popper').attributes('data-popper-placement')).eq(
        'bottom-start',
      );

      align.value = 'center';

      await nextTick();

      expect(wrapper.find('.h-popover__popper').attributes('data-popper-placement')).eq('bottom');

      align.value = 'right';

      await nextTick();

      expect(wrapper.find('.h-popover__popper').attributes('data-popper-placement')).eq(
        'bottom-end',
      );
    });

    test('placement', async () => {
      const placement = ref<DropdownProps['placement']>('top');
      const wrapper = mount(() => (
        <HDropdown placement={placement.value} toBody={false}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(620);

      expect(wrapper.find('.h-popover__popper').attributes('data-popper-placement')).eq('top');

      placement.value = 'left';

      await nextTick();

      expect(wrapper.find('.h-popover__popper').attributes('data-popper-placement')).eq('left');
    });

    test('menu', async () => {
      const menuObj = (
        <HDropdownMenu>
          <HDropdownItem>Custom Menu</HDropdownItem>
        </HDropdownMenu>
      );

      const wrapper = mount(() => (
        <HDropdown menu={menuObj} toBody={false}>
          <HButton>Trigger</HButton>
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.findComponent(HDropdownMenu).text()).eq('Custom Menu');
    });

    test('popper-class', async () => {
      const wrapper = mount(() => (
        <HDropdown toBody={false} popperClass="custom-popper-class">
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').classes('custom-popper-class')).toBeTruthy();
    });

    test('to-body', async () => {
      const toBody = ref(false);
      const wrapper = mount(
        () => (
          <HDropdown toBody={toBody.value}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem>1</HDropdownItem>
                  <HDropdownItem>2</HDropdownItem>
                  <HDropdownItem>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      await triggerEle.trigger('mouseleave');

      await sleep(200);

      toBody.value = true;

      await nextTick();

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();

      expect(document.body.querySelector('.h-popover__popper')).not.toBeUndefined();
    });

    test('show-after', async () => {
      const wrapper = mount(() => (
        <HDropdown toBody={false} showAfter={300}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();

      await sleep(100);

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();
    });

    test('hide-after', async () => {
      const wrapper = mount(() => (
        <HDropdown toBody={false} hideAfter={200}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await triggerEle.trigger('mouseleave');

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      await sleep(100);

      expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      await sleep(100);

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();
    });

    test('z-index', async () => {
      const wrapper = mount(() => (
        <HDropdown toBody={false} zIndex={1000}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(620);

      expect(wrapper.find('.h-popover__popper').attributes('style')).toContain('z-index: 2013;');
    });
  });

  describe('emit', () => {
    test('visible-change & update:visible', async () => {
      const onVisibleChange = vi.fn();
      const updateVisible = vi.fn();

      const wrapper = mount(() => (
        <HDropdown
          toBody={false}
          onVisibleChange={onVisibleChange}
          onUpdate:visible={updateVisible}
        >
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem>1</HDropdownItem>
                <HDropdownItem>2</HDropdownItem>
                <HDropdownItem>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(onVisibleChange).toHaveBeenCalledWith(true);
      expect(updateVisible).toHaveBeenCalledWith(true);
    });

    test('command', async () => {
      const onCommand = vi.fn();

      const wrapper = mount(() => (
        <HDropdown toBody={false} onCommand={onCommand}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem command={1}>1</HDropdownItem>
                <HDropdownItem command={2}>2</HDropdownItem>
                <HDropdownItem command={3}>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      const dropdownItems = wrapper.findAllComponents(HDropdownItem);

      await dropdownItems[0].trigger('click');

      expect(onCommand).toHaveBeenCalledWith(1);

      await dropdownItems[2].trigger('click');

      expect(onCommand).toHaveBeenLastCalledWith(3);
    });
  });

  describe('exposes', () => {
    test('handleOpen & handleClose', async () => {
      const dropdownRef = ref<typeof HDropdown | null>(null);

      const wrapper = mount(() => (
        <HDropdown ref={dropdownRef} toBody={false}>
          {{
            default: () => <HButton>Trigger</HButton>,
            dropdown: () => (
              <HDropdownMenu>
                <HDropdownItem command={1}>1</HDropdownItem>
                <HDropdownItem command={2}>2</HDropdownItem>
                <HDropdownItem command={3}>3</HDropdownItem>
              </HDropdownMenu>
            ),
          }}
        </HDropdown>
      ));

      await nextTick();

      dropdownRef.value?.handleOpen();

      await nextTick();

      await expect(wrapper.find('.h-popover__popper').exists()).toBeTruthy();

      dropdownRef.value?.handleClose();

      await nextTick();
      await nextTick();

      expect(wrapper.find('.h-popover__popper').exists()).toBeFalsy();
    });
  });

  describe('special', () => {
    test('stop propagation when trigger = click', async () => {
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <div onClick={onClick}>
          <HDropdown trigger="click" toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem command={1}>1</HDropdownItem>
                  <HDropdownItem command={2}>2</HDropdownItem>
                  <HDropdownItem command={3}>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        </div>
      ));

      const button = wrapper.findComponent(HButton);

      await button.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });
});
