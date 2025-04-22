import { mount } from '@vue/test-utils';
import NDropdown from '../src/Dropdown';
import { describe, expect, test, vi } from 'vitest';
import { Fragment, nextTick, ref } from 'vue';
import type { DropdownProps } from '../src/composables/useProps';
import NButton from '../../Button';
import { NDropdownItem, NDropdownMenu } from '../index';
import { sleep } from '~/utils/tools';
import NPopover from '../../Popover';
import type { DomEventNameWithModifier } from '@vue/test-utils/dist/constants/dom-events';

describe('Dropdown.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NDropdown />);
    const element = wrapper.findComponent(NDropdown);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('theme', async () => {
      const theme = ref<DropdownProps['theme']>('default');
      const wrapper = mount(() => <NDropdown theme={theme.value} toBody={false} />);
      const element = wrapper.findComponent(NDropdown);

      expect(element.classes('n-dropdown--default')).toBeTruthy();

      theme.value = 'midnight';

      await nextTick();

      expect(element.classes('n-dropdown--midnight')).toBeTruthy();
    });

    test('trigger & visible', async () => {
      const visible = ref(false);
      const trigger = ref<DropdownProps['trigger']>('hover');
      const wrapper = mount(
        () => (
          <Fragment>
            <NDropdown trigger={trigger.value} visible={visible.value} toBody={false}>
              {{
                default: () => <NButton>Trigger</NButton>,
                dropdown: () => (
                  <NDropdownMenu>
                    <NDropdownItem>1</NDropdownItem>
                    <NDropdownItem>2</NDropdownItem>
                    <NDropdownItem>3</NDropdownItem>
                  </NDropdownMenu>
                ),
              }}
            </NDropdown>
            <NButton class="outer-btn">Outer</NButton>
          </Fragment>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NPopover);

      const triggerFn = async (eventString: DomEventNameWithModifier) => {
        await nextTick();

        await triggerEle.trigger(eventString);

        await sleep(200);
      };

      await triggerFn('mouseenter');

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      await triggerEle.trigger('mouseleave');

      await sleep(200);

      trigger.value = 'click';

      await triggerFn('mouseenter');

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();

      await triggerFn('click');

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      await wrapper.find('.outer-btn').trigger('click');

      trigger.value = 'manual';

      await triggerFn('mouseenter');

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();

      await triggerFn('click');

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();

      visible.value = true;

      await nextTick();

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      visible.value = false;

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();
    });

    test('disabled', async () => {
      const disabled = ref(false);
      const wrapper = mount(() => (
        <NDropdown disabled={disabled.value} toBody={false}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      await triggerEle.trigger('mouseleave');

      await sleep(200);

      disabled.value = true;

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();
    });

    test('align', async () => {
      const align = ref<DropdownProps['align']>('left');
      const wrapper = mount(() => (
        <NDropdown align={align.value} toBody={false}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(620);

      expect(wrapper.find('.n-popover__popper').attributes('data-popper-placement')).eq(
        'bottom-start',
      );

      align.value = 'center';

      await nextTick();

      expect(wrapper.find('.n-popover__popper').attributes('data-popper-placement')).eq('bottom');

      align.value = 'right';

      await nextTick();

      expect(wrapper.find('.n-popover__popper').attributes('data-popper-placement')).eq(
        'bottom-end',
      );
    });

    test('placement', async () => {
      const placement = ref<DropdownProps['placement']>('top');
      const wrapper = mount(() => (
        <NDropdown placement={placement.value} toBody={false}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(620);

      expect(wrapper.find('.n-popover__popper').attributes('data-popper-placement')).eq('top');

      placement.value = 'left';

      await nextTick();

      expect(wrapper.find('.n-popover__popper').attributes('data-popper-placement')).eq('left');
    });

    test('menu', async () => {
      const menuObj = (
        <NDropdownMenu>
          <NDropdownItem>Custom Menu</NDropdownItem>
        </NDropdownMenu>
      );

      const wrapper = mount(() => (
        <NDropdown menu={menuObj} toBody={false}>
          <NButton>Trigger</NButton>
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.findComponent(NDropdownMenu).text()).eq('Custom Menu');
    });

    test('popper-class', async () => {
      const wrapper = mount(() => (
        <NDropdown toBody={false} popperClass="custom-popper-class">
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').classes('custom-popper-class')).toBeTruthy();
    });

    test('to-body', async () => {
      const toBody = ref(false);
      const wrapper = mount(
        () => (
          <NDropdown toBody={toBody.value}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem>1</NDropdownItem>
                  <NDropdownItem>2</NDropdownItem>
                  <NDropdownItem>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      await triggerEle.trigger('mouseleave');

      await sleep(200);

      toBody.value = true;

      await nextTick();

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();

      expect(document.body.querySelector('.n-popover__popper')).not.toBeUndefined();
    });

    test('show-after', async () => {
      const wrapper = mount(() => (
        <NDropdown toBody={false} showAfter={300}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();

      await sleep(100);

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();
    });

    test('hide-after', async () => {
      const wrapper = mount(() => (
        <NDropdown toBody={false} hideAfter={200}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await triggerEle.trigger('mouseleave');

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      await sleep(100);

      expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      await sleep(100);

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();
    });

    test('z-index', async () => {
      const wrapper = mount(() => (
        <NDropdown toBody={false} zIndex={1000}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(620);

      expect(wrapper.find('.n-popover__popper').attributes('style')).toContain('z-index: 2013;');
    });
  });

  describe('emit', () => {
    test('visible-change & update:visible', async () => {
      const onVisibleChange = vi.fn();
      const updateVisible = vi.fn();

      const wrapper = mount(() => (
        <NDropdown
          toBody={false}
          onVisibleChange={onVisibleChange}
          onUpdate:visible={updateVisible}
        >
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem>1</NDropdownItem>
                <NDropdownItem>2</NDropdownItem>
                <NDropdownItem>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      expect(onVisibleChange).toHaveBeenCalledWith(true);
      expect(updateVisible).toHaveBeenCalledWith(true);
    });

    test('command', async () => {
      const onCommand = vi.fn();

      const wrapper = mount(() => (
        <NDropdown toBody={false} onCommand={onCommand}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem command={1}>1</NDropdownItem>
                <NDropdownItem command={2}>2</NDropdownItem>
                <NDropdownItem command={3}>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      const dropdownItems = wrapper.findAllComponents(NDropdownItem);

      await dropdownItems[0].trigger('click');

      expect(onCommand).toHaveBeenCalledWith(1);

      await dropdownItems[2].trigger('click');

      expect(onCommand).toHaveBeenLastCalledWith(3);
    });
  });

  describe('exposes', () => {
    test('handleOpen & handleClose', async () => {
      const dropdownRef = ref<typeof NDropdown | null>(null);

      const wrapper = mount(() => (
        <NDropdown ref={dropdownRef} toBody={false}>
          {{
            default: () => <NButton>Trigger</NButton>,
            dropdown: () => (
              <NDropdownMenu>
                <NDropdownItem command={1}>1</NDropdownItem>
                <NDropdownItem command={2}>2</NDropdownItem>
                <NDropdownItem command={3}>3</NDropdownItem>
              </NDropdownMenu>
            ),
          }}
        </NDropdown>
      ));

      await nextTick();

      dropdownRef.value?.handleOpen();

      await nextTick();

      await expect(wrapper.find('.n-popover__popper').exists()).toBeTruthy();

      dropdownRef.value?.handleClose();

      await nextTick();
      await nextTick();

      expect(wrapper.find('.n-popover__popper').exists()).toBeFalsy();
    });
  });

  describe('special', () => {
    test('stop propagation when trigger = click', async () => {
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <div onClick={onClick}>
          <NDropdown trigger="click" toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem command={1}>1</NDropdownItem>
                  <NDropdownItem command={2}>2</NDropdownItem>
                  <NDropdownItem command={3}>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        </div>
      ));

      const button = wrapper.findComponent(NButton);

      await button.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });
});
