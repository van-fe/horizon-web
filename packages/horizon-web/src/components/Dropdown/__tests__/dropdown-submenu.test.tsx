import { mount } from '@vue/test-utils';
import NDropdown from '../src/Dropdown';
import { describe, expect, test } from 'vitest';
import NButton from '../../Button';
import { NDropdownItem, NDropdownMenu, NDropdownSubmenu } from '../index';
import { sleep } from '../../../utils/tools';
import NPopover from '../../Popover';
import { Fragment, nextTick } from 'vue';

describe('DropdownSubmenu.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(
      () => (
        <Fragment>
          <NDropdown toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownSubmenu title="Submenu">
                    <NDropdownItem>1</NDropdownItem>
                    <NDropdownItem>2</NDropdownItem>
                    <NDropdownItem>3</NDropdownItem>
                  </NDropdownSubmenu>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    const triggerEle = wrapper.findComponent(NPopover);

    await triggerEle.trigger('mouseenter');

    await sleep(200);

    expect(wrapper.findComponent(NDropdownSubmenu).exists()).toBeTruthy();
    expect(wrapper.findComponent(NDropdownSubmenu).text()).eq('Submenu123');
  });

  describe('props', () => {
    test('disabled', async () => {
      const wrapper = mount(
        () => (
          <>
            <NDropdown toBody={false}>
              {{
                default: () => <NButton>Trigger</NButton>,
                dropdown: () => (
                  <NDropdownMenu>
                    <NDropdownSubmenu disabled={true}>
                      <NDropdownItem>1</NDropdownItem>
                      <NDropdownItem>2</NDropdownItem>
                      <NDropdownItem>3</NDropdownItem>
                    </NDropdownSubmenu>
                  </NDropdownMenu>
                ),
              }}
            </NDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(NDropdownSubmenu).classes('is-disabled')).toBeTruthy();
    });

    test('icon', async () => {
      const wrapper = mount(
        () => (
          <>
            <NDropdown toBody={false}>
              {{
                default: () => <NButton>Trigger</NButton>,
                dropdown: () => (
                  <NDropdownMenu>
                    <NDropdownSubmenu title="Submenu" icon="eye">
                      <NDropdownItem>1</NDropdownItem>
                      <NDropdownItem>2</NDropdownItem>
                      <NDropdownItem>3</NDropdownItem>
                    </NDropdownSubmenu>
                  </NDropdownMenu>
                ),
              }}
            </NDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(NDropdownSubmenu).find('.a-icon').exists()).toBeTruthy();
    });

    test('active', async () => {
      const wrapper = mount(
        () => (
          <>
            <NDropdown toBody={false}>
              {{
                default: () => <NButton>Trigger</NButton>,
                dropdown: () => (
                  <NDropdownMenu>
                    <NDropdownSubmenu title="Submenu" active={true}>
                      <NDropdownItem>1</NDropdownItem>
                      <NDropdownItem>2</NDropdownItem>
                      <NDropdownItem>3</NDropdownItem>
                    </NDropdownSubmenu>
                  </NDropdownMenu>
                ),
              }}
            </NDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(NDropdownSubmenu).classes('is-active')).toBeTruthy();
    });

    test('trigger', async () => {
      const wrapper = mount(
        () => (
          <>
            <NDropdown trigger="click" toBody={false}>
              {{
                default: () => <NButton>Trigger</NButton>,
                dropdown: () => (
                  <NDropdownMenu>
                    <NDropdownSubmenu trigger="click" title="Submenu">
                      <NDropdownItem>1</NDropdownItem>
                      <NDropdownItem>2</NDropdownItem>
                      <NDropdownItem>3</NDropdownItem>
                    </NDropdownSubmenu>
                    <NDropdownSubmenu trigger="click" title="Submenu2">
                      <NDropdownItem>4</NDropdownItem>
                      <NDropdownItem>5</NDropdownItem>
                      <NDropdownItem>6</NDropdownItem>
                    </NDropdownSubmenu>
                  </NDropdownMenu>
                ),
              }}
            </NDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NButton);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(NDropdownMenu).exists()).toBeFalsy();

      await triggerEle.trigger('click');

      await nextTick();

      await expect(wrapper.findComponent(NDropdownMenu).exists()).toBeTruthy();
    });
  });
});
